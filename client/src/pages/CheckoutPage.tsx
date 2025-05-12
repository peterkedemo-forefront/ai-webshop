import { Container, Title, Paper, Table, Text, Button, Divider, Flex, Group, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';
import { useCart } from '../hooks/useCart';
import { placeOrder } from '../api/orderApi';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const checkoutSchema = z.object({
  name: z.string().min(2, 'Name must have at least 2 letters'),
  email: z.string().email('Invalid email'),
  address: z.string().min(5, 'Address too short'),
  city: z.string().min(2, 'City required'),
  postalCode: z.string().min(2, 'Postal code required'),
  country: z.string().min(2, 'Country required'),
});

export default function CheckoutPage() {
  const { cart, cartId, clearCart } = useCart();
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      address: '',
      city: '',
      postalCode: '',
      country: '',
    },
    validate: zodResolver(checkoutSchema),
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const totalPrice = cart?.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0) || 0;

  const handleSubmit = async (values: typeof form.values) => {
    if (!cart || !cartId || cart.items.length === 0) return;
    setError(null);
    setLoading(true);
    try {
      await placeOrder({
        cartId,
        customer: values,
      });
      clearCart();
      navigate('/order-confirmation');
    } catch (err) {
      setError('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size="lg" py="xl">
      <Title order={1} mb="xl">Checkout</Title>
      <Flex gap="xl" align="flex-start" direction={{ base: 'column', md: 'row' }}>
        {/* Cart Summary */}
        <Paper p="md" withBorder style={{ flex: 1, minWidth: 320 }}>
          <Title order={2} size="h3" mb="md">Order Summary</Title>
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Product</Table.Th>
                <Table.Th>Price</Table.Th>
                <Table.Th>Quantity</Table.Th>
                <Table.Th>Total</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {cart?.items.map((item) => (
                <Table.Tr key={item.product.id}>
                  <Table.Td>{item.product.name}</Table.Td>
                  <Table.Td>${item.product.price.toFixed(2)}</Table.Td>
                  <Table.Td>{item.quantity}</Table.Td>
                  <Table.Td>${(item.product.price * item.quantity).toFixed(2)}</Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
          <Divider my="lg" />
          <Flex justify="space-between" align="center">
            <Text size="xl" fw={700}>Total: ${totalPrice.toFixed(2)}</Text>
          </Flex>
        </Paper>

        {/* Checkout Form */}
        <Paper p="md" withBorder style={{ flex: 1, minWidth: 320 }}>
          <Title order={2} size="h3" mb="md">Shipping Information</Title>
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput label="Name" {...form.getInputProps('name')} required mb="sm" />
            <TextInput label="Email" {...form.getInputProps('email')} required mb="sm" />
            <TextInput label="Address" {...form.getInputProps('address')} required mb="sm" />
            <TextInput label="City" {...form.getInputProps('city')} required mb="sm" />
            <TextInput label="Postal Code" {...form.getInputProps('postalCode')} required mb="sm" />
            <TextInput label="Country" {...form.getInputProps('country')} required mb="sm" />
            {error && <Text color="red" mt="sm">{error}</Text>}
            <Group mt="md">
              <Button type="submit" color="green" loading={loading}>Place Order</Button>
            </Group>
          </form>
        </Paper>
      </Flex>
    </Container>
  );
} 