import { Container, Title, TextInput, Textarea, NumberInput, Checkbox, Button, Group, Stack, Loader, Text } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';
import { useCreateProduct } from '../hooks/useCreateProduct';
import { useUpdateProduct } from '../hooks/useUpdateProduct';
import { useAdminProduct } from '../hooks/useAdminProduct';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  price: z.number().min(0, 'Price must be positive'),
  imageUrl: z.string().optional(),
  category: z.string().optional(),
  inStock: z.boolean().optional(),
});

export default function AdminProductFormPage() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const form = useForm({
    initialValues: {
      name: '',
      description: '',
      price: 0,
      imageUrl: '',
      category: '',
      inStock: true,
    },
    validate: zodResolver(schema),
  });
  const { mutateAsync: createProduct, isPending: isCreating } = useCreateProduct();
  const { mutateAsync: updateProduct, isPending: isUpdating } = useUpdateProduct();
  const { data: product, isLoading: isLoadingProduct, error: productError } = useAdminProduct(id);
  const navigate = useNavigate();

  useEffect(() => {
    if (isEdit && product) {
      form.setValues({
        name: product.name || '',
        description: product.description || '',
        price: product.price || 0,
        imageUrl: product.imageUrl || '',
        category: product.category || '',
        inStock: product.inStock ?? true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product, isEdit]);

  const handleSubmit = async (values: typeof form.values) => {
    try {
      if (isEdit && id) {
        await updateProduct({ id, data: values });
        showNotification({
          title: 'Product Updated',
          message: 'The product was updated successfully.',
          color: 'green',
        });
      } else {
        await createProduct(values);
        showNotification({
          title: 'Product Added',
          message: 'The product was added successfully.',
          color: 'green',
        });
      }
      navigate('/admin/products');
    } catch (err: any) {
      showNotification({
        title: 'Error',
        message: err.message || 'Failed to save product.',
        color: 'red',
      });
    }
  };

  const handleCancel = () => {
    navigate('/admin/products');
  };

  if (isEdit && isLoadingProduct) {
    return <Container size="sm" py="xl"><Loader /></Container>;
  }
  if (isEdit && productError) {
    return <Container size="sm" py="xl"><Text color="red">Failed to load product.</Text></Container>;
  }

  return (
    <Container size="sm" py="xl">
      <Title order={2} mb="lg">{isEdit ? 'Edit Product' : 'Add Product'}</Title>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput label="Name" {...form.getInputProps('name')} required />
          <Textarea label="Description" {...form.getInputProps('description')} />
          <NumberInput label="Price" {...form.getInputProps('price')} required min={0} step={0.01} />
          <TextInput label="Image URL" {...form.getInputProps('imageUrl')} />
          <TextInput label="Category" {...form.getInputProps('category')} />
          <Checkbox label="In Stock" {...form.getInputProps('inStock', { type: 'checkbox' })} />
          <Group justify="flex-end">
            <Button type="button" variant="default" onClick={handleCancel}>Cancel</Button>
            <Button type="submit" color="green" loading={isCreating || isUpdating}>
              {isEdit ? 'Update Product' : 'Add Product'}
            </Button>
          </Group>
        </Stack>
      </form>
    </Container>
  );
} 