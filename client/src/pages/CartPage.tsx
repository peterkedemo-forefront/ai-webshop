import { Cart } from '../components/Cart/Cart';
import { useCart } from '../hooks/useCart';

export default function CartPage() {
  const { cart, addOrUpdateCartItem, removeCartItem } = useCart();

  const updateQuantity = (productId: string, quantity: number) => {
    const product = cart?.items.find((item) => item.product.id === productId)?.product;
    if (product) {
      addOrUpdateCartItem(product, quantity);
    }
  };

  return <Cart items={cart?.items || []} onUpdateQuantity={updateQuantity} onRemoveItem={removeCartItem} />;
}
