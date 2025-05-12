import { useQuery } from '@tanstack/react-query';
import { Product } from '../types/Product';

export function useProduct(id?: string) {
  return useQuery<Product, Error>({
    queryKey: ['product', id],
    queryFn: () =>
      fetch(`/api/products/${id}`).then((res) => {
        if (!res.ok) {
          throw new Error('Product not found');
        }
        return res.json();
      }),
    enabled: !!id,
  });
}
