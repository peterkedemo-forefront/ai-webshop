import {
  Container,
  Title,
  Paper,
  Table,
  Group,
  Text,
  Button,
  NumberInput,
  ActionIcon,
  Divider,
  Flex,
  Image,
} from '@mantine/core';
import { Link } from 'react-router-dom';
import { CartItem } from '../../types/Product';

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
}

export function Cart({ items, onUpdateQuantity, onRemoveItem }: CartProps) {
  const totalPrice = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  if (items.length === 0) {
    return (
      <Container size="lg" py="xl">
        <Title order={1} mb="xl">
          Your Cart
        </Title>
        <Paper p="xl" withBorder>
          <Flex direction="column" align="center" gap="md">
            <Text size="xl">Your cart is empty</Text>
            <Button component={Link} to="/" color="blue">
              Continue Shopping
            </Button>
          </Flex>
        </Paper>
      </Container>
    );
  }

  return (
    <Container size="lg" py="xl">
      <Title order={1} mb="xl">
        Your Cart
      </Title>

      <Paper p="md" withBorder>
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Product</Table.Th>
              <Table.Th>Price</Table.Th>
              <Table.Th>Quantity</Table.Th>
              <Table.Th>Total</Table.Th>
              <Table.Th></Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {items.map((item) => (
              <Table.Tr key={item.product.id}>
                <Table.Td>
                  <Flex gap="md" align="center">
                    <Image src={item.product.imageUrl} width={50} height={50} radius="md" fit="cover" />
                    <Text>{item.product.name}</Text>
                  </Flex>
                </Table.Td>
                <Table.Td>${item.product.price.toFixed(2)}</Table.Td>
                <Table.Td>
                  <Group>
                    <NumberInput
                      value={item.quantity}
                      min={1}
                      max={99}
                      onChange={(value: string | number) => {
                        const qty = typeof value === 'string' ? parseInt(value, 10) : value;
                        if (!isNaN(qty)) {
                          onUpdateQuantity(item.product.id, qty);
                        }
                      }}
                      style={{ width: '80px' }}
                    />
                  </Group>
                </Table.Td>
                <Table.Td>
                  <Text fw={700}>${(item.product.price * item.quantity).toFixed(2)}</Text>
                </Table.Td>
                <Table.Td>
                  <ActionIcon color="red" onClick={() => onRemoveItem(item.product.id)} variant="subtle">
                    ✕
                  </ActionIcon>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>

        <Divider my="lg" />

        <Flex justify="space-between" align="center">
          <Text size="xl" fw={700}>
            Total: ${totalPrice.toFixed(2)}
          </Text>

          <Group>
            <Button component={Link} to="/" variant="outline">
              Continue Shopping
            </Button>
            <Button component={Link} to="/checkout" color="green">Checkout</Button>
          </Group>
        </Flex>
      </Paper>
    </Container>
  );
}
