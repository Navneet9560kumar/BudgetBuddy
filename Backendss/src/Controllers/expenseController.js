import Expense from '../models/Expense.js'; // Updated model

// Controller function to add a new expense
export const addExpense = async (req, res) => {
  const { amount, name, icon } = req.body; // Added 'name' and 'icon'
  const userId = req.auth.userId; // Clerk se userId

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const newExpense = new Expense({
      amount,
      name, // Expense name
      icon: icon || 'default-icon.png', // Default icon if none provided
      createdBy: userId, // UserId linked to expense
    });

    await newExpense.save();

    res.status(201).json({ message: "Expense added successfully", newExpense });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add expense" });
  }
};

// Controller function to get all expenses for the authenticated user
export const getExpenses = async (req, res) => {
  const userId = req.auth.userId; // Clerk se user info milta hai

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const expenses = await Expense.find({ createdBy: userId }); // Filter expenses by userId
    res.status(200).json({ expenses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch expenses" });
  }
};
