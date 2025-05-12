import { useMutation, useQueryClient } from '@tanstack/react-query';
import adminFetch from '../api/adminFetch';

export function useDeleteProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => adminFetch(`/api/products/${id}`, {
      method: 'DELETE',
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
    },
  });
} 