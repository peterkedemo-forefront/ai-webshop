import express from 'express';
import cors from 'cors';
import productRoutes from './routes/productRoutes';
import cartRoutes from './routes/cartRoutes';
import { errorMiddleware } from './middleware/errorMiddleware';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);

app.use(errorMiddleware);

export default app;
