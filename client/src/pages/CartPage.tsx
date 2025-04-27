import { Cart } from '../components/Cart/Cart';
import { CartItem } from '../types/Product';

interface CartPageProps {
  cartItems: CartItem[];
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
}

export default function CartPage({ cartItems, updateQuantity, removeFromCart }: CartPageProps) {
  return <Cart items={cartItems} onUpdateQuantity={updateQuantity} onRemoveItem={removeFromCart} />;
}
