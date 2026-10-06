import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import { env } from './config/env.js';
import { errorHandler } from './middlewares/errorHandler.js';
import authRoutes from './routes/admin/authRoutes.js';
import productionRoutes from './routes/admin/productionRoutes.js';
import youtubeRoutes from './routes/admin/youtubeRoutes.js';
import strategyRoutes from './routes/admin/strategyRoutes.js';
import ideaRoutes from './routes/admin/ideaRoutes.js';
import pipelineRoutes from './routes/admin/pipelineRoutes.js';

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/admin/auth', authRoutes);
app.use('/api/admin/production', productionRoutes);
app.use('/api/admin/youtube', youtubeRoutes);
app.use('/api/admin/strategy', strategyRoutes);
app.use('/api/admin/ideas', ideaRoutes);
app.use('/api/admin/pipeline', pipelineRoutes);

app.use(errorHandler);

app.listen(env.PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${env.PORT}`);
});
