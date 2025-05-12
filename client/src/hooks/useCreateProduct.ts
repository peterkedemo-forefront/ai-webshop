import { useMutation, useQueryClient } from '@tanstack/react-query';
import adminFetch from '../api/adminFetch';
import { Product } from '../types/Product';

export function useCreateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<Product, 'id'>) => adminFetch('/api/products', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
    },
  });
} 