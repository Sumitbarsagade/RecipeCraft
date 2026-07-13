import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from '../config/db';
import authRoutes from '../routes/auth.routes';
import recipeRoutes from '../routes/recipe.routes';
import userRoutes from '../routes/user.routes';
import commentRoutes from '../routes/comment.routes';

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/users', userRoutes);
app.use('/api/comments', commentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
