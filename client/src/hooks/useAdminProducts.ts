import { useQuery } from '@tanstack/react-query';
import { Product } from '../types/Product';

export function useAdminProducts() {
  return useQuery<Product[]>({
    queryKey: ['admin-products'],
    queryFn: async () => {
      const res = await fetch('/api/products');
      if (!res.ok) throw new Error('Failed to fetch products');
      return res.json();
    },
  });
} 