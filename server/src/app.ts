import express from 'express';
import cors from 'cors';
import productRoutes from './routes/productRoutes';
import cartRoutes from './routes/cartRoutes';
import orderRoutes from './routes/orderRoutes';
import authRoutes from './routes/authRoutes';
import { errorMiddleware } from './middleware/errorMiddleware';
import path from 'path';
import { ProductModel } from './models/Product';
import { products } from './seedData';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/auth', authRoutes);

// Test-only DB reset endpoint
if (process.env.NODE_ENV === 'test') {
  app.post('/api/test/reset-db', async (req, res) => {
    await ProductModel.deleteMany({});
    await ProductModel.insertMany(products);
    res.status(200).send({ ok: true });
  });
}

// Serve static files from client/dist
const clientDistPath = path.join(__dirname, '../../client/dist');
app.use(express.static(clientDistPath));


app.use(errorMiddleware);

export default app;
