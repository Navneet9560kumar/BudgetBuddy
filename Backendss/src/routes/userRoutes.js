const express = require('express');
const router = express.Router();

const { createExpense, getExpenses, updateExpense, deleteExpense } = require('../Controllers/expenseController');
const { requireAuth } = require('@clerk/express'); // Importing requireAuth from Clerk's Express SDK

router.post('/', requireAuth, createExpense);

//get all expenses for a user
router.post('/', requireAuth, createExpense);

// get expenses for a user    
router.get('/:userId', requireAuth, getExpensesByUser);

// Update an expense by ID
router.put('/:id', requireAuth, updateExpense);

// ❌ Delete an expense
router.delete('/:id', requireAuth, deleteExpense);


module.exports = router;