import { Container, Title, Text, Loader, Center } from '@mantine/core';
import { ProductList } from '../components/ProductList/ProductList';
import { useProducts } from '../hooks/useProducts';
import { Product } from '../types/Product';

interface HomePageProps {
  addToCart: (product: Product) => void;
}

export default function HomePage({ addToCart }: HomePageProps) {
  const { data: products, isLoading, error } = useProducts();

  if (isLoading) {
    return (
      <Container size="lg">
        <Center mih={300}>
          <Loader size="lg" />
        </Center>
      </Container>
    );
  }

  if (error) {
    return (
      <Container size="lg">
        <Text c="red">Failed to load products.</Text>
      </Container>
    );
  }

  return (
    <Container size="lg">
      <Title order={1} mb="md">
        Welcome to our Webshop
      </Title>
      <Text c="dimmed" mb="xl">
        Browse our collection of high-quality products
      </Text>
      <ProductList products={products || []} onAddToCart={addToCart} title="Featured Products" />
    </Container>
  );
}
