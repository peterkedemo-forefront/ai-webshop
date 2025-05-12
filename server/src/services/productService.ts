import { Product, ProductModel } from '../models/Product';
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

export const createProduct = async (data: Partial<Product>) => {
  const product = new ProductModel(data);
  await product.save();
  return product.toJSON();
};

export const updateProduct = async (id: string, data: Partial<Product>) => {
  const product = await ProductModel.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  if (!product) {
    throw new ProductNotFoundError();
  }
  return product.toJSON();
};

export const deleteProduct = async (id: string) => {
  const product = await ProductModel.findByIdAndDelete(id);
  if (!product) {
    throw new ProductNotFoundError();
  }
  return { id };
};
