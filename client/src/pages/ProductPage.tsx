import { useParams, useNavigate } from 'react-router-dom';
import { Container, Text, Button, Center, Loader, Flex } from '@mantine/core';
import { ProductDetail } from '../components/ProductDetail/ProductDetail';
import { useProduct } from '../hooks/useProduct';
import { useCart } from '../hooks/useCart';

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: product, isLoading, error } = useProduct(id);
  const { addOrUpdateCartItem, cart } = useCart();

  const addToCart = () => {
    if (!product) return;
    const existingItem = cart?.items.find((item) => item.product.id === product.id);
    const quantity = existingItem ? existingItem.quantity + 1 : 1;
    addOrUpdateCartItem(product, quantity);
  };

  if (isLoading) {
    return (
      <Container size="lg" py="xl">
        <Center mih={300}>
          <Loader size="lg" />
        </Center>
      </Container>
    );
  }

  if (error || !product) {
    return (
      <Container size="lg" py="xl">
        <Flex mih={300} direction="column" gap="1rem" align="center" justify="center">
          <Text size="xl">Product not found</Text>
          <Button onClick={() => navigate('/')} variant="filled" color="blue">
            Back to Home
          </Button>
        </Flex>
      </Container>
    );
  }

  return <ProductDetail product={product} onAddToCart={addToCart} />;
}
