import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import { env } from './config/env.js';
import { errorHandler } from './middlewares/errorHandler.js';
import authRoutes from './routes/admin/authRoutes.js';
import productionRoutes from './routes/admin/productionRoutes.js';
import youtubeRoutes from './routes/admin/youtubeRoutes.js';

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/admin/auth', authRoutes);
app.use('/api/admin/production', productionRoutes);
app.use('/api/admin/youtube', youtubeRoutes);

app.use(errorHandler);

app.listen(env.PORT, () => {
  console.log(`Server running on port ${env.PORT}`);
});
