import { useState, useEffect, useCallback } from 'react';
import {
  createCart,
  getCart,
  addOrUpdateCartItem as apiAddOrUpdateCartItem,
  removeCartItem as apiRemoveCartItem,
} from '../api/cartApi';
import { Product, Cart } from '../types/Product';

const CART_ID_KEY = 'cartId';

function useCartState() {
  const [cartId, setCartId] = useState<string | null>(null);
  const [cart, setCart] = useState<Cart | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Effect 1: Ensure cartId exists in state (from localStorage or by creating)
  useEffect(() => {
    if (cartId !== null) {
      return;
    }
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

  // Effect 2: Fetch cart when cartId changes
  const fetchCart = useCallback(async () => {
    if (!cartId) {
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const cartData = await getCart(cartId);
      setCart(cartData);
    } catch (err) {
      if (err instanceof Error && err.name === 'NotFoundError') {
        localStorage.removeItem(CART_ID_KEY);
        setCartId(null); // triggers Effect 1 to create a new cartId
      } else {
        setError(err as Error);
      }
    } finally {
      setIsLoading(false);
    }
  }, [cartId]);

  useEffect(() => {
    fetchCart();
  }, [cartId, fetchCart]);

  // refetch just re-fetches the cart with the current cartId
  const refetch = useCallback(() => {
    fetchCart();
  }, [fetchCart]);

  return { cart, cartId, isLoading, error, refetch };
}

export function useCart() {
  const { cart, cartId, isLoading, error, refetch } = useCartState();

  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState<Error | null>(null);

  const addOrUpdateCartItem = useCallback(
    async (product: Product, quantity: number) => {
      if (!cartId) {
        return;
      }
      setActionLoading(true);
      setActionError(null);
      try {
        await apiAddOrUpdateCartItem(cartId, product.id, quantity);
        refetch();
      } catch (err) {
        setActionError(err as Error);
      } finally {
        setActionLoading(false);
      }
    },
    [cartId, refetch]
  );

  const removeCartItem = useCallback(
    async (productId: string) => {
      if (!cartId) {
        return;
      }
      setActionLoading(true);
      setActionError(null);
      try {
        await apiRemoveCartItem(cartId, productId);
        refetch();
      } catch (err) {
        setActionError(err as Error);
      } finally {
        setActionLoading(false);
      }
    },
    [cartId, refetch]
  );

  return {
    cart,
    isLoading: isLoading || actionLoading,
    error: error || actionError,
    addOrUpdateCartItem,
    removeCartItem,
    refetch,
  };
}
