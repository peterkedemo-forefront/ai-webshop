import request from 'supertest';
import app from '../app';

jest.mock('../services/cartService', () => ({
  createCart: jest.fn(),
  getCartById: jest.fn(),
  addOrUpdateCartItem: jest.fn(),
  removeCartItem: jest.fn(),
}));

import * as cartService from '../services/cartService';
import { Cart } from '../models/Cart';
import { CartNotFoundError, ProductNotFoundError, ProductNotInCartError } from '../errors/CartErrors';

type MockedCartService = jest.Mocked<typeof cartService>;
const mockedCartService = cartService as MockedCartService;

describe('Cart Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new cart', async () => {
    mockedCartService.createCart.mockResolvedValue('mock-cart-id');

    const createRes = await request(app).post('/api/cart').send();

    expect(createRes.status).toBe(201);
    expect(createRes.body).toHaveProperty('cartId', 'mock-cart-id');
    expect(mockedCartService.createCart).toHaveBeenCalled();
  });

  it('should retrieve a cart by ID', async () => {
    mockedCartService.getCartById.mockResolvedValue({
      cartId: 'mock-cart-id',
      items: [],
    });

    const getRes = await request(app).get(`/api/cart/mock-cart-id`);

    expect(getRes.status).toBe(200);
    expect(getRes.body).toHaveProperty('cartId', 'mock-cart-id');
    expect(getRes.body).toHaveProperty('items');
    expect(Array.isArray(getRes.body.items)).toBe(true);
    expect(mockedCartService.getCartById).toHaveBeenCalledWith('mock-cart-id');
  });

  it('should return 404 if cart does not exist (getCart)', async () => {
    mockedCartService.getCartById.mockRejectedValue(new CartNotFoundError());

    const res = await request(app).get('/api/cart/nonexistent');

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('error');
  });

  it('should add a new item to the cart', async () => {
    mockedCartService.addOrUpdateCartItem.mockResolvedValue({
      cartId: 'mock-cart-id',
      items: [{ product: { id: 'prod1' }, quantity: 2 }],
    } as Cart);

    const res = await request(app).post('/api/cart/mock-cart-id/items').send({ productId: 'prod1', quantity: 2 });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('items');
    expect(mockedCartService.addOrUpdateCartItem).toHaveBeenCalledWith('mock-cart-id', 'prod1', 2);
  });

  it('should update quantity if item already exists', async () => {
    mockedCartService.addOrUpdateCartItem.mockResolvedValue({
      cartId: 'mock-cart-id',
      items: [{ product: { id: 'prod1' }, quantity: 5 }],
    } as Cart);

    const res = await request(app).post('/api/cart/mock-cart-id/items').send({ productId: 'prod1', quantity: 5 });

    expect(res.status).toBe(200);
    expect(res.body.items[0].quantity).toBe(5);
  });

  it('should return 404 if cart does not exist (addOrUpdateCartItem)', async () => {
    mockedCartService.addOrUpdateCartItem.mockRejectedValue(new CartNotFoundError());

    const res = await request(app).post('/api/cart/nonexistent/items').send({ productId: 'prod1', quantity: 1 });

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 404 if product does not exist (addOrUpdateCartItem)', async () => {
    mockedCartService.addOrUpdateCartItem.mockRejectedValue(new ProductNotFoundError());

    const res = await request(app).post('/api/cart/mock-cart-id/items').send({ productId: 'badprod', quantity: 1 });

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('error');
  });

  it('should remove an item from the cart', async () => {
    mockedCartService.removeCartItem.mockResolvedValue({
      cartId: 'mock-cart-id',
      items: [],
    } as Cart);

    const res = await request(app).delete('/api/cart/mock-cart-id/items/prod1');

    expect(res.status).toBe(200);
    expect(res.body.items).toEqual([]);
    expect(mockedCartService.removeCartItem).toHaveBeenCalledWith('mock-cart-id', 'prod1');
  });

  it('should return 404 if cart does not exist (removeCartItem)', async () => {
    mockedCartService.removeCartItem.mockRejectedValue(new CartNotFoundError());

    const res = await request(app).delete('/api/cart/nonexistent/items/prod1');

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 404 if product is not in cart (removeCartItem)', async () => {
    mockedCartService.removeCartItem.mockRejectedValue(new ProductNotInCartError());

    const res = await request(app).delete('/api/cart/mock-cart-id/items/badprod');

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 400 if addOrUpdateCartItem body is invalid', async () => {
    const res = await request(app).post('/api/cart/mock-cart-id/items').send({ productId: 'prod1' });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });
});
