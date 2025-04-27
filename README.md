# Webshop

## Overview

This project is a simple e-commerce web application, structured as a monorepo with separate frontend and backend workspaces. Users can browse products and manage a shopping cart.

## Monorepo Structure

The repository uses [npm workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces) to manage two main packages:

```
/
├── client/   # Frontend (React, Vite, TypeScript)
├── server/   # Backend (Express, TypeScript, MongoDB)
└── package.json  # Root workspace configuration and scripts
```

- **client/**: Contains all frontend code, UI components, and related configuration.  
  See [`client/README.md`](client/README.md) for details on setup, development, and conventions.

- **server/**: Contains all backend code, API endpoints, and related configuration.  
  See [`server/README.md`](server/README.md) for details on setup, development, and conventions.

## Getting Started

To install dependencies for all workspaces:

```sh
npm install
```

To start both the frontend and backend in development mode:

```sh
npm run dev
```

## Scripts

Common scripts are defined in the root `package.json` for convenience:

- `npm run dev` — Start both client and server in development mode
- `npm run build` — Build the frontend for production
- `npm run format` — Format codebase with Prettier
- `npm run lint` — Lint the codebase with ESLint
- `npm run test` — Run all tests in both workspaces

## License

This project is for educational/demo purposes.
