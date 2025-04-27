import { Schema, model } from 'mongoose';

export interface Product {
  id: string;
  name?: string;
  description?: string;
  price?: number;
  imageUrl?: string;
  category?: string;
  inStock?: boolean;
}

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    imageUrl: String,
    category: String,
    inStock: { type: Boolean, default: true },
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

export const ProductModel = model<Product>('Product', ProductSchema);
