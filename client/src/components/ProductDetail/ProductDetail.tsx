import { Container, Grid, Image, Title, Text, Badge, Button, Group, Paper, Flex } from '@mantine/core';
import { Product } from '../../types/Product';

interface ProductDetailProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductDetail({ product, onAddToCart }: ProductDetailProps) {
  const { name, description, price, imageUrl, inStock, category } = product;

  return (
    <Container size="lg" py="xl">
      <Paper p="md" shadow="md" radius="md">
        <Grid gutter="lg">
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Image src={imageUrl} radius="md" alt={name} height={300} fit="cover" />
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 6 }}>
            <Flex direction="column" gap="md">
              <Title order={1}>{name}</Title>

              <Group>
                <Badge color={inStock ? 'green' : 'red'}>{inStock ? 'In Stock' : 'Out of Stock'}</Badge>
                <Badge color="blue">{category}</Badge>
              </Group>

              <Text fw={700} size="xl" color="blue">
                ${price.toFixed(2)}
              </Text>

              <Text>{description}</Text>

              <Button
                onClick={() => onAddToCart(product)}
                disabled={!inStock}
                size="lg"
                color="blue"
                mt="auto"
                fullWidth
              >
                {inStock ? 'Add to Cart' : 'Out of Stock'}
              </Button>
            </Flex>
          </Grid.Col>
        </Grid>
      </Paper>
    </Container>
  );
}
