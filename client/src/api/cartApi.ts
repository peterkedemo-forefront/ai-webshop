import { Cart } from '../types/Product';

const API_BASE = '/api/cart';

class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
  }
}

export async function createCart(): Promise<{ cartId: string }> {
  const res = await fetch(`${API_BASE}`, { method: 'POST' });
  if (!res.ok) {
    throw new Error('Failed to create cart');
  }
  return res.json();
}

export async function getCart(cartId: string): Promise<Cart> {
  const res = await fetch(`${API_BASE}/${cartId}`);
  if (!res.ok) {
    if (res.status === 404) {
      throw new NotFoundError('Cart not found');
    }
    throw new Error('Failed to fetch cart');
  }
  return res.json();
}

export async function addOrUpdateCartItem(cartId: string, productId: string, quantity: number): Promise<Cart> {
  const res = await fetch(`${API_BASE}/${cartId}/items`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productId, quantity }),
  });
  if (!res.ok) {
    throw new Error('Failed to update cart item');
  }
  return res.json();
}

export async function removeCartItem(cartId: string, productId: string): Promise<Cart> {
  const res = await fetch(`${API_BASE}/${cartId}/items/${productId}`, { method: 'DELETE' });
  if (!res.ok) {
    throw new Error('Failed to remove cart item');
  }
  return res.json();
}
