# Implementation Plan: Migrating Custom Hooks to TanStack Query v5

## 1. Preparation

- [ ] Review the current data-fetching logic in all custom hooks (`useProduct`, `useProducts`, `useCart`).
- [ ] Identify all components and tests that consume these hooks.
- [ ] Read the TanStack Query v5 documentation, especially the migration guide and new object syntax for hooks.

---

## 2. Install TanStack Query

- [ ] Install `@tanstack/react-query` in the `client` workspace:
  ```sh
  npm install --workspace client @tanstack/react-query
  ```
- [ ] Verify the dependency is added to `client/package.json`.

---

## 3. Set Up Query Provider

- [ ] In `client/src/main.tsx`, import and create a `QueryClient`.
- [ ] Wrap the app in a `QueryClientProvider` to provide the query client context to all components.

---

## 4. Refactor Data Hooks

### a. `useProduct` and `useProducts`
- [ ] Replace manual `useState`/`useEffect` logic with `useQuery` from TanStack Query.
- [ ] Use the v5 object syntax:
  ```ts
  useQuery({
    queryKey: [...],
    queryFn: ...,
    enabled: ... // if needed
  })
  ```
- [ ] Remove manual loading and error state management.
- [ ] Update the return value to be the full query result object.

### b. `useCart`
- [ ] Use `useQuery` for fetching the cart, with a query key that includes the cart ID.
- [ ] Use `useQueryClient` and async functions for cart mutations (add/update/remove).
- [ ] After each mutation, call `invalidateQueries` to refresh the cart data.
- [ ] Manage `cartId` using a custom hook, with localStorage and API fallback.
- [ ] Use a `useEffect` to handle cart not found errors by clearing the cart ID.
- [ ] Retain manual loading/error state for mutation actions if needed.

---

## 5. Update Hook Usages in Components

- [ ] Update all components that use `useProduct` and `useProducts` to destructure the result as `{ data: product, isLoading, error }` and `{ data: products, isLoading, error }`.
- [ ] Provide a fallback (e.g., `products || []`) when passing possibly undefined data to child components.
- [ ] Ensure `useCart` usage in components and tests matches the new return shape.

---

## 6. Update Documentation

- [ ] Add a section to `client/README.md` describing:
  - The use of TanStack Query for data fetching and mutations.
  - How to add new queries/mutations.
  - Conventions for query keys and cache invalidation.

---

## 7. Testing and Validation

- [ ] Run all existing tests to ensure compatibility.
- [ ] Update or add tests for new async patterns if needed.
- [ ] Manually test the app for correct loading, error, and data states.

---

## 8. Code Review and Cleanup

- [ ] Review all changes for consistency and adherence to project conventions.
- [ ] Remove any unused code or comments from the old data-fetching logic.
- [ ] Ensure all linter and TypeScript errors are resolved. 