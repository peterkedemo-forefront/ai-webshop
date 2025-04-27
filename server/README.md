# Server

## Overview

This folder contains the backend server for the project. It handles API requests, authentication, and database interactions using Express and Mongoose, with an in-memory MongoDB for development.

## Folder Structure

```
server/
├── package.json         # Project metadata and scripts
├── tsconfig.json        # TypeScript configuration
├── src/
│   ├── controllers/     # Business logic for handling requests
│   ├── errors/          # Custom error classes for domain and cart errors
│   ├── middleware/      # Express middleware (e.g., error handling)
│   ├── models/          # Mongoose database models and schemas
│   ├── routes/          # API route definitions
│   ├── services/        # Service layer for business logic
│   ├── seedData.ts      # Initial data for seeding the database
│   └── index.ts         # Main entry point for the server
└── ...
```

- **controllers/**: Functions that handle incoming requests and interact with services/models.
- **errors/**: Custom error classes for domain-specific and cart-related errors.
- **middleware/**: Express middleware, such as error handling.
- **models/**: Mongoose schemas and models for database collections.
- **routes/**: API endpoint definitions, mapping routes to controllers.
- **services/**: Business logic and data manipulation, separated from controllers.
- **seedData.ts**: Contains initial product data for seeding the database.
- **index.ts**: Main entry point; sets up Express, connects to MongoDB, seeds data, and starts the server.

## Setup

1. Install dependencies:
   ```sh
   npm install
   ```
2. Start the server in development mode:
   ```sh
   npm run dev
   ```
   This uses `ts-node-dev` to run `src/index.ts` with hot-reloading.

## Development Standards

- Use Prettier and ESLint for code formatting and linting (see config files).
- Add new routes in `src/routes/` and corresponding handlers in `src/controllers/`.
- Use async/await for asynchronous code.
- Validate all input data (e.g., with Zod).
- Place custom error classes in `src/errors/`.
- Add middleware in `src/middleware/` and register in `src/index.ts`.

## Testing

- Tests are written using [Jest](https://jestjs.io/) with [ts-jest](https://kulshekhar.github.io/ts-jest/) for TypeScript support.
- All test files **must** be named with the `.test.ts` suffix and placed in `src/__tests__/`.
- To run all tests:
  ```sh
  npm test
  ```
- Jest is configured via `jest.config.js` in the server root.

## Common Workflows

- To seed the database, modify `src/seedData.ts`.
- For new features, follow the folder structure and keep business logic in services.
