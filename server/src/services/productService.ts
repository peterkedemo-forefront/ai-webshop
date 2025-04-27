import { ProductModel } from '../models/Product';
import { ProductNotFoundError } from '../errors/CartErrors';

export const getAllProducts = async () => {
  return ProductModel.find();
};

export const getProductById = async (id: string) => {
  const product = await ProductModel.findById(id);

  if (!product) {
    throw new ProductNotFoundError();
  }
  
  return product.toJSON();
};
