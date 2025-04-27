import { Schema, model, Types, Document, ObjectId } from 'mongoose';
import { Product } from './Product';

const CartItemSchema = new Schema(
  {
    product: { type: Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, min: 1 },
  },
  {
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        return ret;
      },
    },
  }
);

const CartSchema = new Schema(
  {
    cartId: { type: String, required: true, unique: true },
    items: [CartItemSchema],
    createdAt: { type: Date, default: Date.now },
  },
  {
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

type CartDocument = Cart & Document;
const CartModel = model<CartDocument>('Cart', CartSchema);
export { CartModel };

export interface CartItem {
  product: Product | string | ObjectId;
  quantity: number;
}

export interface Cart {
  cartId: string;
  items: CartItem[];
  createdAt?: Date;
}
