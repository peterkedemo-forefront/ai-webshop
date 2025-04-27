import * as productService from '../services/productService';
import { Request, Response } from 'express';

export const getProducts = async (req: Request, res: Response): Promise<void> => {
  const products = await productService.getAllProducts();

  res.json(products);
};

export const getProduct = async (req: Request, res: Response): Promise<void> => {
  const product = await productService.getProductById(req.params.id);

  res.json(product);
};
