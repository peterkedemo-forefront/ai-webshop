import { Link, useNavigate } from 'react-router-dom';
import { Container, Group, Burger, ActionIcon, Text, Flex, Box, Indicator } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useCart } from '../../hooks/useCart';

function CartIcon({ count, onClick }: { count: number; onClick: () => void }) {
  const icon = (
    <ActionIcon onClick={onClick} variant="outline" size="lg" aria-label="Cart">
      🛒
    </ActionIcon>
  );
  return count > 0 ? (
    <Indicator label={count} size={16} color="red" withBorder position="top-end">
      {icon}
    </Indicator>
  ) : (
    icon
  );
}

export default function Header() {
  const [opened, { toggle }] = useDisclosure(false);
  const navigate = useNavigate();
  const { cart } = useCart();
  const cartItemsCount = cart?.items.reduce((total, item) => total + item.quantity, 0) || 0;

  const navigateToCart = () => {
    navigate('/cart');
  };

  return (
    <Box component="header" h={60} mb={30} style={{ borderBottom: '1px solid #e9ecef' }}>
      <Container size="lg">
        <Flex justify="space-between" align="center" h={60}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Text fw={700} size="xl">
              Webshop
            </Text>
          </Link>

          <Group>
            <Group visibleFrom="sm">
              <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Text>Home</Text>
              </Link>
            </Group>

            <Flex align="center" gap="xs">
              <CartIcon count={cartItemsCount} onClick={navigateToCart} />
            </Flex>

            <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
          </Group>
        </Flex>
      </Container>
    </Box>
  );
}
