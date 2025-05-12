import { Container, Title, Text, Loader, Center } from '@mantine/core';
import { ProductList } from '../components/ProductList/ProductList';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import { Product } from '../types/Product';

export default function HomePage() {
  const { data: products, isLoading, error } = useProducts();
  const { addOrUpdateCartItem, cart } = useCart();

  const addToCart = (product: Product) => {
    const existingItem = cart?.items.find((item) => item.product.id === product.id);
    const quantity = existingItem ? existingItem.quantity + 1 : 1;
    addOrUpdateCartItem(product, quantity);
  };

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
