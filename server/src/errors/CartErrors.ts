import { NotFoundError } from './DomainError';

export class CartNotFoundError extends NotFoundError {
  constructor(message = 'Cart not found') {
    super(message);
  }
}

export class ProductNotFoundError extends NotFoundError {
  constructor(message = 'Product not found') {
    super(message);
  }
}

export class ProductNotInCartError extends NotFoundError {
  constructor(message = 'Product not in cart') {
    super(message);
  }
}
