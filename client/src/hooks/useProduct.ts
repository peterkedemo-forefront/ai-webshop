import { useState, useEffect } from 'react';
import { Product } from '../types/Product';

export function useProduct(id?: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) {
      return;
    }
    setIsLoading(true);
    setError(null);
    fetch(`/api/products/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Product not found');
        }
        return res.json();
      })
      .then((data) => setProduct(data))
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  }, [id]);

  return { product, isLoading, error };
}
