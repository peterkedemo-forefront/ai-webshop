# MVP Admin Product Management Plan

---

## 1. Authentication

### Backend
- Add `.env` variables: `ADMIN_PASSWORD` and `JWT_SECRET`.
- Create `/api/auth/login` endpoint:
  - Accepts a password, checks against `.env`.
  - If correct, returns a signed JWT with `{ role: "admin" }`.
- Add JWT verification middleware.
- Add admin-only middleware (checks for `role: "admin"` in JWT).
- Protect product create, update, and delete endpoints with admin middleware.

### Frontend
- Create `/admin` login page.
- On successful login, store JWT (e.g., in `localStorage`).
- Use a `RequireAdmin` route guard to protect all `/admin/*` routes except `/admin`.

---

## 2. Admin Layout with Mantine AppShell

- Create `AdminLayout` using Mantine's `AppShell`.
  - **Header:** "Admin Panel" title and Logout button.
  - **Navbar:** Navigation link to "Products".
  - **Main:** Renders current admin page via React Router's `Outlet`.
- Logout button removes JWT and redirects to `/admin`.

---

## 3. Routing

- `/admin` — Login page (public, no layout)
- `/admin/products` — Product list (protected, uses `AdminLayout`)
- `/admin/products/new` — Create product form (protected, uses `AdminLayout`)
- `/admin/products/:id/edit` — Edit product form (protected, uses `AdminLayout`)
- All admin routes (except login) are protected by `RequireAdmin`.

---

## 4. Product Management Features

- **Product List Page:**
  - Table of products with Edit and Delete actions.
  - "Add Product" button.
- **Product Form Page:**
  - For both create and edit.
  - Fields: name, description, price, image URL, category, inStock.
  - On submit: create or update product, then redirect to list.
  - **Use Mantine's `useForm` hook with Zod validation for all admin forms.**
- **Delete Product:**
  - Confirm before deleting.
  - On success, refresh list and show notification.

---

## 5. API Calls via Custom Hooks and adminFetch

- Create an `adminFetch` helper:
  - Reads JWT from storage.
  - Adds `Authorization: Bearer <token>` header.
  - Makes the API call and returns JSON.
- Create hooks in `src/hooks/` (e.g., `useAdminProducts`, `useCreateProduct`, `useUpdateProduct`, `useDeleteProduct`).
  - Use TanStack Query for data fetching and mutations.
  - Use `adminFetch` for all protected admin API calls.
  - **All admin forms should use Mantine's `useForm` hook with Zod validation for state management and validation.**

---

## 6. Notifications for Feedback

- Set up Mantine's Notifications provider in `main.tsx`.
- Use notifications for:
  - Success (e.g., "Product created!")
  - Error (e.g., "Failed to delete product")
  - Login errors

---

## 7. Documentation

- Update `client/README.md`:
  - Describe admin routes, layout, authentication, notification usage, and `adminFetch`.
  - **Document the use of Mantine's `useForm` and Zod for admin forms.**
- Update `server/README.md`:
  - Document new endpoints, authentication, and environment variables.
