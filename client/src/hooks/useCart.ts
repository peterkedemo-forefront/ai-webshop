import { useState, useEffect, useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createCart,
  getCart,
  addOrUpdateCartItem as apiAddOrUpdateCartItem,
  removeCartItem as apiRemoveCartItem,
} from '../api/cartApi';
import { Product, Cart } from '../types/Product';

const CART_ID_KEY = 'cartId';

function useCartId() {
  const [cartId, setCartId] = useState<string | null>(null);

  useEffect(() => {
    if (cartId !== null) return;
    const ensureCartId = async () => {
      let id = localStorage.getItem(CART_ID_KEY);
      if (!id) {
        const { cartId: newCartId } = await createCart();
        localStorage.setItem(CART_ID_KEY, newCartId);
        id = newCartId;
      }
      setCartId(id);
    };
    ensureCartId();
  }, [cartId]);

  const clearCartId = useCallback(() => {
    localStorage.removeItem(CART_ID_KEY);
    setCartId(null);
  }, []);

  return { cartId, setCartId, clearCartId };
}

export function useCart() {
  const { cartId, clearCartId } = useCartId();
  const queryClient = useQueryClient();

  const {
    data: cart,
    isLoading,
    error,
    refetch,
  } = useQuery<Cart, Error>({
    queryKey: ['cart', cartId],
    queryFn: () => getCart(cartId!),
    enabled: !!cartId,
    retry: false,
  });

  // Handle NotFoundError by clearing cartId
  useEffect(() => {
    if (error && error.name === 'NotFoundError') {
      clearCartId();
    }
  }, [error, clearCartId]);

  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState<Error | null>(null);

  const addOrUpdateCartItem = useCallback(
    async (product: Product, quantity: number) => {
      if (!cartId) return;
      setActionLoading(true);
      setActionError(null);
      try {
        await apiAddOrUpdateCartItem(cartId, product.id, quantity);
        await queryClient.invalidateQueries({ queryKey: ['cart', cartId] });
      } catch (err) {
        setActionError(err as Error);
      } finally {
        setActionLoading(false);
      }
    },
    [cartId, queryClient]
  );

  const removeCartItem = useCallback(
    async (productId: string) => {
      if (!cartId) return;
      setActionLoading(true);
      setActionError(null);
      try {
        await apiRemoveCartItem(cartId, productId);
        await queryClient.invalidateQueries({ queryKey: ['cart', cartId] });
      } catch (err) {
        setActionError(err as Error);
      } finally {
        setActionLoading(false);
      }
    },
    [cartId, queryClient]
  );

  const clearCart = useCallback(() => {
    clearCartId();
    queryClient.removeQueries({ queryKey: ['cart', cartId] });
  }, [clearCartId, queryClient, cartId]);

  return {
    cart,
    cartId,
    isLoading: isLoading || actionLoading,
    error: error || actionError,
    addOrUpdateCartItem,
    removeCartItem,
    refetch,
    clearCart,
  };
}
