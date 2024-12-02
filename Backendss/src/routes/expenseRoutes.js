import express from 'express';
import { addExpense, getExpenses } from '../Controllers/expenseController.js';
import { requireAuth } from '@clerk/express'; // Importing Clerk's requireAuth middleware

const router = express.Router();

// Add an expense (protected route)
router.post('/', requireAuth(), addExpense);

// Get all expenses (protected route)
router.get('/', requireAuth(), getExpenses);

export default router;
