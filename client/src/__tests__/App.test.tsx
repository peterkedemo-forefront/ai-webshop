import { render, screen } from '../test-utils';
import App from '../App';
import { describe, it, expect, vi, beforeAll, afterEach } from 'vitest';

// Mock fetch for all tests using vi.spyOn and vi.fn
beforeAll(() => {
  vi.spyOn(global, 'fetch').mockImplementation(
    vi.fn((input, options) => {
      if (typeof input === 'string' && input === '/api/cart' && options?.method === 'POST') {
        return Promise.resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve({ cartId: 'test-cart-id' }),
        } as Response);
      }
      return Promise.reject(new Error('Unhandled fetch: ' + input));
    })
  );
});
afterEach(() => {
  vi.restoreAllMocks();
});

describe('App', () => {
  it('renders without crashing', async () => {
    render(<App />);

    expect(await screen.findByText('Webshop')).toBeInTheDocument();
  });
});
