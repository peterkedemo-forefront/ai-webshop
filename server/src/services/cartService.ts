import { CartModel, Cart } from '../models/Cart';
import { ProductModel } from '../models/Product';
import { v4 as uuidv4 } from 'uuid';
import { CartNotFoundError, ProductNotFoundError, ProductNotInCartError } from '../errors/CartErrors';

export const createCart = async (): Promise<string> => {
  const cartId = uuidv4();
  await CartModel.create({ cartId, items: [] });

  return cartId;
};

export const getCartById = async (cartId: string): Promise<Cart> => {
  const cart = await CartModel.findOne({ cartId }).populate('items.product');

  if (!cart) {
    throw new CartNotFoundError();
  }
  return cart.toJSON();
};

export const addOrUpdateCartItem = async (cartId: string, productId: string, quantity: number): Promise<Cart> => {
  // Ensure the product exists
  const product = await ProductModel.findById(productId);
  if (!product) {
    throw new ProductNotFoundError();
  }

  // Try to update quantity if item exists
  let cart = await CartModel.findOneAndUpdate(
    { cartId, 'items.product': productId },
    { $set: { 'items.$.quantity': quantity } },
    { new: true }
  )
    .populate('items.product')
    .lean<Cart>();

  // If not found, push new item
  if (!cart) {
    cart = await CartModel.findOneAndUpdate(
      { cartId },
      { $push: { items: { product: productId, quantity } } },
      { new: true }
    )
      .populate('items.product')
      .lean<Cart>();
  }

  if (!cart) {
    throw new CartNotFoundError();
  }
  return cart;
};

export const removeCartItem = async (cartId: string, productId: string): Promise<Cart> => {
  const cart = await CartModel.findOne({ cartId });

  if (!cart) {
    throw new CartNotFoundError();
  }

  const itemIndex = cart.items.findIndex((item) => item.product.toString() === productId);

  if (itemIndex > -1) {
    cart.items.splice(itemIndex, 1);

    await cart.save();
    await cart.populate('items.product');

    const updatedCart = await CartModel.findOne({ cartId }).populate('items.product').lean<Cart>();
    if (!updatedCart) {
      throw new CartNotFoundError();
    }
    return updatedCart;
  }
  throw new ProductNotInCartError();
};
