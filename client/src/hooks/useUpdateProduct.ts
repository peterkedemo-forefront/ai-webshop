import { useMutation, useQueryClient } from '@tanstack/react-query';
import adminFetch from '../api/adminFetch';
import { Product } from '../types/Product';

export function useUpdateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Omit<Product, 'id'> }) => adminFetch(`/api/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      queryClient.invalidateQueries({ queryKey: ['admin-product', variables.id] });
    },
  });
} 