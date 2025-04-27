import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { ProductModel } from './models/Product';
import { products } from './seedData';
import app from './app';

const PORT = process.env.PORT || 4000;

// Connect to in-memory MongoDB
async function startServer() {
  const mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  await mongoose.connect(uri);
  console.log('Connected to in-memory MongoDB');

  // Seed products collection
  await ProductModel.deleteMany({});
  await ProductModel.insertMany(products);
  console.log('Seeded products collection');

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
