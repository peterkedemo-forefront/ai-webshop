import { renderHook, act, waitFor } from '@testing-library/react';
import { useCart } from './useCart';
import * as cartApi from '../api/cartApi';
import { Product, Cart } from '../types/Product';
import { describe, it, expect, vi, beforeEach } from 'vitest';

const TEST_CART_ID = 'test-cart-id';
const TEST_PRODUCT: Product = {
  id: 'prod-1',
  name: 'Test Product',
  description: 'desc',
  price: 10,
  imageUrl: '',
  category: 'cat',
  inStock: true,
};
const TEST_CART: Cart = {
  cartId: TEST_CART_ID,
  items: [{ product: TEST_PRODUCT, quantity: 2 }],
};

describe('useCart', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    localStorage.clear();
  });

  it('creates a cart if none exists and fetches it', async () => {
    vi.spyOn(cartApi, 'createCart').mockResolvedValue({ cartId: TEST_CART_ID });
    vi.spyOn(cartApi, 'getCart').mockResolvedValue(TEST_CART);

    const { result } = renderHook(() => useCart());
    await waitFor(() => {
      expect(result.current.cart?.cartId).toBe(TEST_CART_ID);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
    });
  });

  it('uses existing cartId from localStorage', async () => {
    localStorage.setItem('cartId', TEST_CART_ID);
    vi.spyOn(cartApi, 'getCart').mockResolvedValue(TEST_CART);
    const { result } = renderHook(() => useCart());
    await waitFor(() => {
      expect(result.current.cart?.cartId).toBe(TEST_CART_ID);
    });
  });

  it('addOrUpdateCartItem calls API and refetches', async () => {
    localStorage.setItem('cartId', TEST_CART_ID);
    vi.spyOn(cartApi, 'getCart').mockResolvedValue(TEST_CART);
    const addOrUpdateSpy = vi.spyOn(cartApi, 'addOrUpdateCartItem').mockResolvedValue(TEST_CART);
    const { result } = renderHook(() => useCart());
    await waitFor(() => {
      expect(result.current.cart?.cartId).toBe(TEST_CART_ID);
    });
    await act(async () => {
      await result.current.addOrUpdateCartItem(TEST_PRODUCT, 2);
    });
    expect(addOrUpdateSpy).toHaveBeenCalledWith(TEST_CART_ID, TEST_PRODUCT.id, 2);
  });

  it('removeCartItem calls API and refetches', async () => {
    localStorage.setItem('cartId', TEST_CART_ID);
    vi.spyOn(cartApi, 'getCart').mockResolvedValue(TEST_CART);
    const removeSpy = vi.spyOn(cartApi, 'removeCartItem').mockResolvedValue(TEST_CART);
    const { result } = renderHook(() => useCart());
    await waitFor(() => {
      expect(result.current.cart?.cartId).toBe(TEST_CART_ID);
    });
    await act(async () => {
      await result.current.removeCartItem(TEST_PRODUCT.id);
    });
    expect(removeSpy).toHaveBeenCalledWith(TEST_CART_ID, TEST_PRODUCT.id);
  });

  it('handles NotFoundError by clearing cartId and creating new cart', async () => {
    localStorage.setItem('cartId', TEST_CART_ID);
    const notFound = new Error('Cart not found');
    notFound.name = 'NotFoundError';
    vi.spyOn(cartApi, 'getCart').mockRejectedValueOnce(notFound);
    vi.spyOn(cartApi, 'createCart').mockResolvedValue({ cartId: 'new-cart-id' });
    vi.spyOn(cartApi, 'getCart').mockResolvedValueOnce({ cartId: 'new-cart-id', items: [] });
    const { result } = renderHook(() => useCart());
    await waitFor(() => {
      expect(result.current.cart?.cartId).toBe('new-cart-id');
    });
  });

  it('sets error if getCart fails with other error', async () => {
    localStorage.setItem('cartId', TEST_CART_ID);
    vi.spyOn(cartApi, 'getCart').mockRejectedValue(new Error('fail'));
    const { result } = renderHook(() => useCart());
    await waitFor(() => {
      expect(result.current.error).toBeTruthy();
    });
  });
});
