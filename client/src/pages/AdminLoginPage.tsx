import { useState } from 'react';
import { Container, Card, Title, PasswordInput, Button, Text, Stack } from '@mantine/core';
import useAdminAuth from '../hooks/useAdminAuth';
import { useNavigate } from 'react-router-dom';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login, error, loading } = useAdminAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(password);
    if (success) {
      navigate('/admin/products', { replace: true });
    }
  };

  return (
    <Container size={420} my={80}>
      <Title ta="center" mb="lg">Admin Login</Title>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <form onSubmit={handleLogin}>
          <Stack>
            <PasswordInput
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
              required
              disabled={loading}
            />
            {error && <Text color="red" size="sm">{error}</Text>}
            <Button type="submit" loading={loading} fullWidth>
              Login
            </Button>
          </Stack>
        </form>
      </Card>
    </Container>
  );
} 