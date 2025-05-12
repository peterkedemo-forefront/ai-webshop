import { Container, Title, Text, Button, Flex } from '@mantine/core';
import { Link } from 'react-router-dom';

export default function OrderConfirmationPage() {
  return (
    <Container size="lg" py="xl">
      <Flex direction="column" align="center" gap="md">
        <Title order={1} mb="md">Thank you for your order!</Title>
        <Text size="lg">Your order has been placed successfully. A confirmation has been sent to your email.</Text>
        <Button component={Link} to="/" color="blue" mt="lg">Back to Home</Button>
      </Flex>
    </Container>
  );
} 