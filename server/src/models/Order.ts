import { Schema, model, Types, Document, ObjectId } from 'mongoose';
import { Product } from './Product';

const OrderItemSchema = new Schema(
  {
    product: { type: Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, min: 1 },
  },
  { _id: false }
);

const OrderSchema = new Schema(
  {
    orderId: { type: String, required: true, unique: true },
    cartId: { type: String, required: true },
    customer: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    items: [OrderItemSchema],
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

type OrderDocument = Order & Document;
const OrderModel = model<OrderDocument>('Order', OrderSchema);
export { OrderModel };

export interface OrderItem {
  product: Product | string | ObjectId;
  quantity: number;
}

export interface Order {
  orderId: string;
  cartId: string;
  customer: {
    name: string;
    email: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  items: OrderItem[];
  createdAt?: Date;
} 