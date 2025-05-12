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
- Validate all input with Zod.
- Place custom error classes in `src/errors/`.
- Add middleware in `src/middleware/` and register in `src/index.ts`.

## Orders API

### POST /api/orders

Creates a new order from a cart and customer information. Validates input with Zod.

**Request body:**
```json
{
  "cartId": "string",
  "customer": {
    "name": "string",
    "email": "string",
    "address": "string",
    "city": "string",
    "postalCode": "string",
    "country": "string"
  }
}
```

- The backend will look up the cart by `cartId`, copy its items, and save a new order.
- The cart is deleted after the order is placed.

**Response:**
```json
{
  "orderId": "string"
}
```

### Order Model
- `orderId` (string, unique): The order's unique identifier (UUID)
- `cartId` (string): The cart this order was created from
- `customer` (object): Customer info (name, email, address, city, postalCode, country)
- `items` (array): List of products and quantities
- `createdAt` (date): Timestamp

### Validation
- All input is validated with Zod in the controller before processing.

## Admin/Product Management API

### Admin Authentication
- **Endpoint:** `POST /api/auth/login`
- **How it works:**
  - Accepts `{ password: string }` in the request body.
  - Validates password against the `ADMIN_PASSWORD` in `.env`.
  - On success, returns a JWT for use in admin requests.
- **JWT:** Must be included as a Bearer token in the `Authorization` header for all admin/product management endpoints.
- **Environment Variable:**
  - `ADMIN_PASSWORD` — required for admin login.
  - `JWT_SECRET` — used to sign/verify JWTs.

### Product Management Endpoints (Admin Only)
- All endpoints below require a valid admin JWT.

#### Create Product
- `POST /api/products`
- **Body:** `{ name, description, price, imageUrl }`
- **Response:** Created product object

#### Update Product
- `PUT /api/products/:id`
- **Body:** `{ name, description, price, imageUrl }`
- **Response:** Updated product object

#### Delete Product
- `DELETE /api/products/:id`
- **Response:** `{ success: true }`

#### List Products
- `GET /api/products`
- **Response:** Array of product objects (public, no auth required)

#### Get Product by ID
- `GET /api/products/:id`
- **Response:** Product object (public, no auth required)

### Example: Admin Login
```sh
curl -X POST http://localhost:3001/api/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"password": "<your-admin-password>"}'
```
**Response:** `{ "token": "<jwt>" }`

### Example: Authenticated Product Creation
```sh
curl -X POST http://localhost:3001/api/products \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer <jwt>' \
  -d '{"name": "Test Product", "description": "Desc", "price": 10, "imageUrl": "..."}'
```

### Security Notes
- Only users with the correct admin password (from `.env`) can obtain a JWT and access admin endpoints.
- JWTs should be kept secret and sent only over HTTPS in production.
- All input is validated with Zod.

### Developer Notes
- See `src/routes/`, `src/controllers/`, and `src/middleware/` for implementation details.
- Update `.env` with `ADMIN_PASSWORD` and `JWT_SECRET` before running in production.

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
