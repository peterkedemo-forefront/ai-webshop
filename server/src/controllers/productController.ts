import * as productService from '../services/productService';
import { Request, Response } from 'express';
import { z } from 'zod';

const ProductSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  price: z.number(),
  imageUrl: z.string().optional(),
  category: z.string().optional(),
  inStock: z.boolean().optional(),
});

export const getProducts = async (req: Request, res: Response): Promise<void> => {
  const products = await productService.getAllProducts();

  res.json(products);
};

export const getProduct = async (req: Request, res: Response): Promise<void> => {
  const product = await productService.getProductById(req.params.id);

  res.json(product);
};

export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = ProductSchema.parse(req.body);
    const product = await productService.createProduct(data);
    res.status(201).json(product);
  } catch (err) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ message: 'Invalid product data', errors: err.errors });
      return;
    }
    res.status(500).json({ message: 'Failed to create product' });
  }
};

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = ProductSchema.partial().parse(req.body);
    const product = await productService.updateProduct(req.params.id, data);
    res.json(product);
  } catch (err) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ message: 'Invalid product data', errors: err.errors });
      return;
    }
    res.status(500).json({ message: 'Failed to update product' });
  }
};

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await productService.deleteProduct(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete product' });
  }
};
