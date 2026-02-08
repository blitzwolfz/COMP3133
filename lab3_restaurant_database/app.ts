import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';

import restaurantRoutes from './routes/restaurants';

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 3000;
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/lab3_restaurant_database';

app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'Lab 3 Restaurant API is running' });
});

app.use('/restaurants', restaurantRoutes);

mongoose
  .connect(mongoUri)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((error: Error) => {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  });
