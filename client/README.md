# Client

## Overview

This is the frontend for the project, built with **React**, **Vite**, and **TypeScript**.  
It uses [Mantine](https://mantine.dev/) for UI components and styling, and [React Router](https://reactrouter.com/) for routing.

## Admin UI

### Overview
The Admin UI provides a secure interface for managing products. It is accessible only to authenticated admins and is built using Mantine components for a modern, consistent look.

### Access & Authentication
- **Route:** `/admin`
- **Authentication:** JWT-based. Admins log in with a password (stored in backend `.env`).
- **Login Flow:**
  - Visit `/admin` to access the login page.
  - On successful login, a JWT is stored in localStorage and used for all admin API requests.
  - Logging out clears the JWT and redirects to the login page.
- **Route Guard:** All `/admin/*` routes except `/admin` require authentication. Unauthenticated users are redirected to `/admin`.

### Admin Routes
- `/admin` — Login page
- `/admin/products` — Product list (CRUD actions)
- `/admin/products/new` — Add new product
- `/admin/products/:id/edit` — Edit existing product

### Layout
- Uses Mantine's `AppShell` for a sidebar, header, and main content area.
- **Responsive:** The sidebar (navbar) is now collapsible on mobile devices. A burger menu in the header toggles the sidebar visibility on small screens.
- Sidebar navigation for admin sections (currently just Products).
- Header includes a logout button.

### Product Management Features
- **List:** View all products in a table with edit/delete actions.
- **Add:** Create new products via a form with validation.
- **Edit:** Update existing products via a pre-filled form.
- **Delete:** Remove products with confirmation modal.
- All actions provide success/error feedback via notifications.

### Forms & Validation
- All admin forms use Mantine's `useForm` and [Zod](https://zod.dev/) for schema validation.
- Forms support both add and edit modes.

### Custom Hooks & Utilities
- **Authentication:** `useAdminAuth` manages login, logout, and JWT storage.
- **Route Guard:** `RequireAdmin` component protects admin routes.
- **Product CRUD:**
  - `useAdminProducts` — fetch all products
  - `useCreateProduct` — create product
  - `useUpdateProduct` — update product
  - `useDeleteProduct` — delete product
- **Type Safety:** All hooks and components use a shared `Product` TypeScript interface (`src/types/Product.ts`).
- **API Helper:** `adminFetch` wraps `fetch` to include JWT and handle errors.

### Notifications & Modals
- Uses Mantine's notifications for all feedback (success/error).
- Uses Mantine's `openConfirmModal` for delete confirmations (requires `ModalsProvider` at app root).

### Extending the Admin UI
- Add new admin sections by creating new routes under `/admin` and updating the sidebar.
- Use the same authentication and layout patterns for consistency.
- **If you add new sidebar links, ensure they work with the responsive sidebar and burger menu.**
- Place new admin hooks in `src/hooks/` and types in `src/types/`.
- Use Mantine and Zod for all new forms.

### Developer Notes
- All admin dependencies are in `client/package.json`.
- See code in `src/pages/admin/`, `src/hooks/`, and `src/types/` for implementation details.
- For onboarding, see the authentication and product management flows above.

## Setup

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Start the development server:**
   ```sh
   npm run dev
   ```
3. **Build for production:**
   ```sh
   npm run build
   ```
4. **Preview the production build:**
   ```sh
   npm run preview
   ```

## Checkout Flow

- The app now includes a checkout step, accessible via the `/checkout` route.
- The checkout page displays a read-only cart summary and a shipping/contact form.
- The form uses [Mantine Form](https://mantine.dev/form/use-form/) and [Zod](https://zod.dev/) for validation.
- On submission, the form is validated with Zod before the order is sent to the backend.
- New dependencies: `@mantine/form`, `zod` (see package.json).

## Folder Structure

```
client/
├── public/                # Static assets (e.g., cart.svg)
├── src/
│   ├── api/               # API request modules (e.g., cartApi.ts)
│   ├── components/        # Reusable UI components (grouped by feature)
│   ├── hooks/             # Custom React hooks (e.g., useCart.ts)
│   ├── pages/             # Top-level pages/routes (e.g., HomePage.tsx)
│   ├── types/             # TypeScript type definitions (e.g., Product.ts)
│   ├── App.tsx            # Main app component
│   ├── main.tsx           # App entry point
│   └── vite-env.d.ts      # Vite environment types
├── index.html             # HTML template
├── package.json           # Project metadata and scripts
├── vite.config.ts         # Vite configuration
├── tsconfig.json          # TypeScript configuration
└── ...
```

- **api/**: Functions for communicating with the backend API.
- **components/**: Shared and feature-specific UI components.
- **hooks/**: Custom hooks for state and logic reuse.
- **pages/**: Route-based pages for the app.
- **types/**: TypeScript interfaces and types.

## Development Standards

- Use **Prettier** and **ESLint** for code formatting and linting (see config files).
- Use **functional components** and **React hooks**.
- Add new components in `src/components/`.
- Use **Mantine** for UI and styling.
- Use **React Router** for navigation.
- **Keep custom CSS to a minimum; prefer Mantine components and their props for styling and layout.**
- API calls are done using `fetch` in the `src/api/` folder.
- Components always use hooks for fetching and mutating data.

## Routing (React Router v6.4+)

- The app uses the object-based router config with `createBrowserRouter` and `RouterProvider`.
- The main route layout is defined in `src/App.tsx` (renders the header and an `<Outlet />`).
- All routes are defined in `src/router.tsx`.
- The router is provided to the app in `src/main.tsx` using `<RouterProvider />`.
- To add a new page/route, update `src/router.tsx`.
- **Cart state is accessed via the `useCart` hook in any component/page that needs it. No prop drilling or custom context is required.**

## Testing

- **Vitest** and **React Testing Library** are used for unit and integration tests.
- **Unit tests for modules (components, hooks, utilities, etc.) should always be placed next to the SUT** (System Under Test), in the same directory as the file being tested (e.g., `useCart.test.ts` next to `useCart.ts`).
- The `src/__tests__/` directory is reserved for integration tests or special cases that do not fit next to a specific module.
- Use the custom `render` function from `