# Checkout & Order Flow Plan

---

## 1. Frontend Changes

### a. Install Dependencies
- **Install Mantine Form and Zod:**
  ```sh
  npm install --workspace client @mantine/form zod
  ```
- **Verify** that both appear in `client/package.json`.

### b. Checkout Page
- Create `CheckoutPage.tsx` in `client/src/pages/`.
- Display a **read-only cart summary**.
- Add a **checkout form** for shipping/contact info.
- **Use Mantine's `useForm` with Zod validation** (via `zodResolver`).

### c. Routing
- Add a `/checkout` route in `App.tsx` to render the new page.

### d. Navigation
- Update the "Checkout" button in the cart to navigate to `/checkout`.

### e. Order Submission
- On form submit, use Zod to validate the form data.
- Send a `POST` request to `/api/orders` with:
  - Form data (name, address, etc.)
  - Cart items

### f. Post-Order UX
- On success:
  - **Clear the cart** (local state and/or via API)
  - **Redirect to a confirmation page** or show a confirmation message with order details/number.
- On error:
  - Show an error message.

### g. Documentation
- Update `client/README.md` to describe:
  - The new checkout flow
  - The use of Zod and Mantine Form for validation
  - Any new dependencies or conventions

---

## 2. Backend Changes

### a. Order Model
- Ensure the Order model/schema exists (fields: customer info, items, order ID, timestamp, etc.).

### b. Order API Endpoint
- Ensure the `POST /api/orders` endpoint:
  - **Validates incoming data with Zod** (as already done)
  - Saves the order to the database
  - Returns a confirmation (order ID, etc.)

### c. Documentation
- Update `server/README.md` to describe:
  - The order endpoint and model
  - The use of Zod for validation
  - Any new dependencies or conventions (if any)

---

## 3. Data Flow Example

1. **User fills out checkout form and submits order.**
2. **Frontend** validates with Zod, then sends order data to **backend**.
3. **Backend** validates again with Zod, saves order, and returns confirmation.
4. **Frontend** clears cart and shows confirmation to user.

---

## 4. No User Accounts or Admin Access
- No login, registration, user order history, or admin/staff order access is needed.
- Each order is standalone and contains all necessary info.

---

## Checklist

- [ ] Install `@mantine/form` and `zod` in the frontend workspace
- [ ] Create `CheckoutPage.tsx` with Mantine + Zod form and cart summary
- [ ] Add `/checkout` route in `App.tsx`
- [ ] Update cart "Checkout" button to navigate to `/checkout`
- [ ] Implement order submission logic (frontend)
- [ ] Implement confirmation page/message (frontend)
- [ ] Update `client/README.md` for new flow and dependencies
- [ ] Ensure Order model/schema exists (backend)
- [ ] Ensure `POST /api/orders` endpoint validates with Zod and saves order
- [ ] Update `server/README.md` for order endpoint and Zod usage 