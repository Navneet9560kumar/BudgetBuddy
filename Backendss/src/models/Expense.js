import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
  amount: { type: Number, required: true }, // Amount of the expense
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // User who created this expense
  icon: { type: String, default: 'default-icon.png' }, // Icon for the expense
  name: { type: String, required: true }, // Name of the expense
  createdAt: { type: Date, default: Date.now }, // Timestamp when the expense was created
});

const Expense = mongoose.model('Expense', expenseSchema);

export default Expense;
