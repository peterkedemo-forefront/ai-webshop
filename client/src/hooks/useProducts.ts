import { useQuery } from '@tanstack/react-query';
import { Product } from '../types/Product';

export function useProducts() {
  return useQuery<Product[], Error>({
    queryKey: ['products'],
    queryFn: () =>
      fetch('/api/products').then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch products');
        }
        return res.json();
      }),
  });
}
