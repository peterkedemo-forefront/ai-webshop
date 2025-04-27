import * as cartService from '../services/cartService';
import { Request, Response } from 'express';
import { z } from 'zod';

const addOrUpdateCartItemSchema = z.object({
  productId: z.string(),
  quantity: z.number().int().min(1),
});

export const createCart = async (req: Request, res: Response): Promise<void> => {
  const cartId = await cartService.createCart();

  res.status(201).json({ cartId });
};

export const getCart = async (req: Request, res: Response): Promise<void> => {
  const cart = await cartService.getCartById(req.params.cartId);

  res.json(cart);
};

export const addOrUpdateCartItem = async (req: Request, res: Response): Promise<void> => {
  const { productId, quantity } = addOrUpdateCartItemSchema.parse(req.body);
  const cart = await cartService.addOrUpdateCartItem(req.params.cartId, productId, quantity);

  res.json(cart);
};

export const removeCartItem = async (req: Request, res: Response): Promise<void> => {
  const cart = await cartService.removeCartItem(req.params.cartId, req.params.productId);

  res.json(cart);
};
