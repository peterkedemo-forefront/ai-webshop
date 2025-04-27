import { SimpleGrid, Container, Title, Text } from '@mantine/core';
import { ProductCard } from '../ProductCard/ProductCard';
import { Product } from '../../types/Product';

interface ProductListProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  title?: string;
}

export function ProductList({ products, onAddToCart, title = 'Products' }: ProductListProps) {
  return (
    <Container size="lg" py="xl">
      <Title order={2} mb="lg">
        {title}
      </Title>

      {products.length === 0 ? (
        <Text color="dimmed" size="lg" ta="center">
          No products found.
        </Text>
      ) : (
        <SimpleGrid cols={{ base: 1, sm: 1, md: 2, lg: 3 }} spacing={{ base: 'sm', sm: 'sm', md: 'md', lg: 'lg' }}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
          ))}
        </SimpleGrid>
      )}
    </Container>
  );
}
