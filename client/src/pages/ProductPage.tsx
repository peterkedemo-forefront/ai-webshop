import { useParams, useNavigate } from 'react-router-dom';
import { Container, Text, Button, Center, Loader, Flex } from '@mantine/core';
import { ProductDetail } from '../components/ProductDetail/ProductDetail';
import { Product } from '../types/Product';
import { useProduct } from '../hooks/useProduct';

interface ProductPageProps {
  addToCart: (product: Product) => void;
}

export default function ProductPage({ addToCart }: ProductPageProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { product, isLoading, error } = useProduct(id);

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
