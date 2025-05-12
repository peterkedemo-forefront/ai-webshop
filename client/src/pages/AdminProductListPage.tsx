import { useAdminProducts } from '../hooks/useAdminProducts';
import { Table, Button, Container, Title, Loader, Text, Group } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useDeleteProduct } from '../hooks/useDeleteProduct';
import { showNotification } from '@mantine/notifications';
import { openConfirmModal } from '@mantine/modals';

export default function AdminProductListPage() {
  const { data: products, isLoading, error } = useAdminProducts();
  const navigate = useNavigate();
  const { mutateAsync: deleteProduct, isPending: isDeleting } = useDeleteProduct();

  const handleAddProduct = () => {
    navigate('/admin/products/new');
  };

  const handleEditProduct = (id: string) => {
    navigate(`/admin/products/${id}/edit`);
  };

  const handleDeleteProduct = (id: string) => {
    openConfirmModal({
      title: 'Delete product',
      children: 'Are you sure you want to delete this product?',
      labels: { confirm: 'Delete', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onConfirm: async () => {
        try {
          await deleteProduct(id);
          showNotification({
            title: 'Product Deleted',
            message: 'The product was deleted successfully.',
            color: 'green',
          });
        } catch (err: any) {
          showNotification({
            title: 'Error',
            message: err.message || 'Failed to delete product.',
            color: 'red',
          });
        }
      },
    });
  };

  return (
    <Container size="lg" py="xl">
      <Group justify="space-between" align="center" mb="md">
        <Title order={2}>Products</Title>
        <Button color="green" onClick={handleAddProduct}>Add Product</Button>
      </Group>
      {isLoading && <Loader />}
      {error && <Text color="red">Failed to load products.</Text>}
      {products && (
        <Table striped highlightOnHover withTableBorder>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Name</Table.Th>
              <Table.Th>Price</Table.Th>
              <Table.Th>Category</Table.Th>
              <Table.Th>In Stock</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {products.map((product: any) => (
              <Table.Tr key={product.id}>
                <Table.Td>{product.name}</Table.Td>
                <Table.Td>${product.price?.toFixed(2)}</Table.Td>
                <Table.Td>{product.category || '-'}</Table.Td>
                <Table.Td>{product.inStock ? 'Yes' : 'No'}</Table.Td>
                <Table.Td>
                  <Button size="xs" variant="outline" color="blue" mr="xs" onClick={() => handleEditProduct(product.id)}>Edit</Button>
                  <Button size="xs" variant="outline" color="red" onClick={() => handleDeleteProduct(product.id)} loading={isDeleting}>Delete</Button>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      )}
    </Container>
  );
} 