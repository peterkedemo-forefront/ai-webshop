import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Product } from './types/Product';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import { useCart } from './hooks/useCart';

function App() {
  const { cart, addOrUpdateCartItem, removeCartItem } = useCart();

  const addToCart = (product: Product) => {
    const existingItem = cart?.items.find((item) => item.product.id === product.id);
    const quantity = existingItem ? existingItem.quantity + 1 : 1;
    addOrUpdateCartItem(product, quantity);
  };

  const updateQuantity = (productId: string, quantity: number) => {
    const product = cart?.items.find((item) => item.product.id === productId)?.product;
    if (product) {
      addOrUpdateCartItem(product, quantity);
    }
  };

  const handleRemoveFromCart = (productId: string) => {
    removeCartItem(productId);
  };

  const totalCartItems = cart?.items.reduce((total: number, item) => total + item.quantity, 0) || 0;

  return (
    <BrowserRouter>
      <Header cartItemsCount={totalCartItems} />
      <Routes>
        <Route path="/" element={<HomePage addToCart={addToCart} />} />
        <Route path="/product/:id" element={<ProductPage addToCart={addToCart} />} />
        <Route
          path="/cart"
          element={
            <CartPage
              cartItems={cart?.items || []}
              updateQuantity={updateQuantity}
              removeFromCart={handleRemoveFromCart}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
