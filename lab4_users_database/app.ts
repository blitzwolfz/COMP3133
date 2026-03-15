import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';

import userRoutes from './routes/users';

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 8081;
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/lab4_users_database';

app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'Lab 4 Users API is running' });
});

app.use('/users', userRoutes);

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
