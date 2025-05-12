# Client

## Overview

This is the frontend for the project, built with **React**, **Vite**, and **TypeScript**.  
It uses [Mantine](https://mantine.dev/) for UI components and styling, and [React Router](https://reactrouter.com/) for routing.

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

## Testing

- **Vitest** and **React Testing Library** are used for unit and integration tests.
- **Unit tests for modules (components, hooks, utilities, etc.) should always be placed next to the SUT** (System Under Test), in the same directory as the file being tested (e.g., `useCart.test.ts` next to `useCart.ts`).
- The `src/__tests__/` directory is reserved for integration tests or special cases that do not fit next to a specific module.
- Use the custom `render` function from `src/test-utils.tsx` to automatically wrap components in `MantineProvider` for tests. This avoids repeating provider setup in every test.
- Example usage in a test:

  ```tsx
  import { render, screen } from '../test-utils';
  import App from '../App';

  it('renders App', () => {
    render(<App />);
    // assertions
  });
  ```

- Run all tests with:
  ```sh
  npm run test
  ```

## Common Workflows

- **Add a new page:** Create a new file in `src/pages/` and add a route in `App.tsx`.
- **Add a new component:** Create a new folder or file in `src/components/`.
- **Add a new hook:** Place it in `src/hooks/`.
- **Update types:** Edit or add files in `src/types/`.

## Troubleshooting

- If you see a blank page or errors, check the browser console for details.
- Ensure all dependencies are installed and you are using a compatible Node.js version.
