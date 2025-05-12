import { Request, Response } from 'express';
import { z } from 'zod';
import { clearCart, getCartItems } from '../services/cartService';
import { OrderModel } from '../models/Order';
import { v4 as uuidv4 } from 'uuid';

const placeOrderSchema = z.object({
  cartId: z.string(),
  customer: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    address: z.string().min(5),
    city: z.string().min(2),
    postalCode: z.string().min(2),
    country: z.string().min(2),
  }),
});

export const placeOrder = async (req: Request, res: Response) => {
  const data = placeOrderSchema.parse(req.body);
  const orderId = uuidv4();
  const items = await getCartItems(data.cartId);
  const order = await OrderModel.create({
    orderId,
    cartId: data.cartId,
    customer: data.customer,
    items,
  });
  await clearCart(data.cartId);
  res.status(201).json({ orderId: order.orderId });
}; 