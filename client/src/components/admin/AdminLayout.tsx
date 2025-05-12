import { AppShell, Button, Group, Title, NavLink, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Outlet, useNavigate } from 'react-router-dom';
import useAdminAuth from '../../hooks/useAdminAuth';

export default function AdminLayout() {
  const { logout } = useAdminAuth();
  const navigate = useNavigate();
  const [opened, { toggle }] = useDisclosure();

  const handleLogout = () => {
    logout();
    navigate('/admin', { replace: true });
  };

  return (
    <AppShell
      navbar={{ width: 200, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      header={{ height: 60 }}
      padding="md"
    >
      <AppShell.Header>
        <Group justify="space-between" align="center" h="100%" px="md" style={{ height: 60 }}>
          <Group align="center" gap="xs">
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <Title order={3} m={0}>Admin Panel</Title>
          </Group>
          <Button color="red" variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <NavLink label="Products" onClick={() => navigate('/admin/products')} active={window.location.pathname === '/admin/products'} />
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
} 