import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import bookRoutes from './routes/bookRoutes.js';

import authRoutes from './routes/authRoutes.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/books', bookRoutes);

app.use('/api/auth', authRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));
