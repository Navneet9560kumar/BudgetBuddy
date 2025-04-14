// src/routes/expenseRoutes.js
import express from 'express';
import { createExpense, getExpenses, updateExpense, deleteExpense } from '../Controllers/expenseController.js';

import { verifyToken } from '../middlewares/verifyToken.js';
const expenseRoutes = express.Router();

import Expense  from '../models/Expense.js'; // also ham model import kiya hai


// router.use(requireAuth);
expenseRoutes .post('/', verifyToken, createExpense);    // Protected route
expenseRoutes .get('/user/:userId', getExpenses); // is mujhe budget milega       // 
expenseRoutes .put('/:id', verifyToken, updateExpense);  // 
expenseRoutes .delete('/:id', verifyToken, deleteExpense); // 

// new routes :get all expenses, get single expense, delete expense
expenseRoutes.get('/my', verifyToken, async (req, res) => {
      try {
        const userId = req.user.id; // ✅ Token se extracted
    
        const expenses = await Expense.find({ user: userId });
        res.json(expenses);
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch expenses", detail: error.message });
      }
    });
    
export default expenseRoutes ;