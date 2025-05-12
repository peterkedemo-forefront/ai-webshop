import { useQuery } from '@tanstack/react-query';
import { Product } from '../types/Product';

export function useAdminProduct(id: string | undefined) {
  return useQuery<Product>({
    queryKey: ['admin-product', id],
    queryFn: async () => {
      if (!id) throw new Error('No product ID');
      const res = await fetch(`/api/products/${id}`);
      if (!res.ok) throw new Error('Failed to fetch product');
      return res.json();
    },
    enabled: !!id,
  });
} 