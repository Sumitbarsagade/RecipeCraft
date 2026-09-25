import express, {
  Request,
  Response,
  NextFunction,
} from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from '../config/db';
import authRoutes from '../routes/auth.routes';
import recipeRoutes from '../routes/recipe.routes';
import userRoutes from '../routes/user.routes';


dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
  }));





app.use(
  (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const start = Date.now();

    console.log(
      `→ ${req.method} ${req.originalUrl}`
    );

    console.log(
      "Authorization:",
      req.headers.authorization
        ? "Bearer token present"
        : "Not provided"
    );

    res.on("finish", () => {
      const duration =
        Date.now() - start;

      console.log(
        `← ${req.method} ${req.originalUrl} ` +
        `${res.statusCode} ${duration}ms`
      );
    });

    next();
  }
);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/users', userRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
