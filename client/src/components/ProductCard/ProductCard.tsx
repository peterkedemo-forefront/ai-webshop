import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const { id, name, description, price, imageUrl, inStock } = product;

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      role="region"
      aria-label={`Product: ${name}`}
    >
      <Card.Section>
        <Image src={imageUrl} height={160} alt={name} fit="cover" />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{name}</Text>
        <Badge color={inStock ? 'green' : 'red'}>{inStock ? 'In Stock' : 'Out of Stock'}</Badge>
      </Group>

      <Text size="sm" color="dimmed" lineClamp={2}>
        {description}
      </Text>

      <Text fw={700} size="xl" mt="md">
        ${price.toFixed(2)}
      </Text>

      <Group justify="space-between" mt="md">
        <Button
          component={Link}
          to={`/product/${id}`}
          variant="light"
          color="blue"
          radius="md"
          aria-label={`View details for ${name}`}
        >
          Details
        </Button>
        <Button
          onClick={() => onAddToCart(product)}
          variant="filled"
          color="blue"
          radius="md"
          disabled={!inStock}
          aria-label={`Add ${name} to cart`}
        >
          Add to cart
        </Button>
      </Group>
    </Card>
  );
}
