import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './src/config/db.js'; // Importing connectDB from db.js
import authRoutes from './src/routes/authRight.js';
import expenseRoutes from './src/routes/expenseRoutes.js';
import { ClerkExpress } from '@clerk/express'; // Import Clerk's ClerkExpress middleware

// Load environment variables
dotenv.config();

const app = express();

// Connect to the database
connectDB(); // Call connectDB to establish the database connection

// Middlewares
app.use(cors());
app.use(express.json());

// Public routes
app.use('/api/auth', authRoutes);

// Protected routes (Only authenticated users can access)
app.use('/api/expenses', ClerkExpress(), expenseRoutes); // Clerk's ClerkExpress added

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

export default app;
