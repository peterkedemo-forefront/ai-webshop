# Migration Plan: Switch to Object-Based Router Config (React Router v6.4+)

## 1. Refactor `App.tsx`
- Remove all cart logic from `App`.
- Make `App` a pure layout: render only `<Header />` and `<Outlet />`.

## 2. Move Cart Logic to `Header`
- Call `useCart()` inside `Header` to get the cart item count.
- Remove the `cartItemsCount` prop from `Header` and its usage in `App`.

## 3. Update All Pages
- Remove any cart-related props from `HomePage`, `ProductPage`, and `CartPage`.
- In each page/component that needs cart state or actions, call `useCart()` directly.

## 4. Create `router.tsx`
- Define your routes using `createBrowserRouter`.
- Use `App` as the layout route, and nest all pages as children.

**Example:**
```tsx
import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'product/:id', element: <ProductPage /> },
      { path: 'cart', element: <CartPage /> },
      { path: 'checkout', element: <CheckoutPage /> },
      { path: 'order-confirmation', element: <OrderConfirmationPage /> },
    ],
  },
]);
```

## 5. Update `main.tsx`
- Replace `BrowserRouter` with `RouterProvider`.
- Import and use your new `router`.

**Example:**
```tsx
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
// ...other imports

<RouterProvider router={router} />
```

## 6. Update Documentation
- Update `client/README.md` to explain the new routing setup:
  - Mention the use of object-based router config.
  - Note that cart state is accessed via `useCart()` in any component/page.

## 7. Test the App
- Verify navigation, cart functionality, and checkout flow.
- Ensure no cart-related props are missing and everything works as before. 