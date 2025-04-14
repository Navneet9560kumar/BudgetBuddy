import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/authRouter.js"; // ✅
import expenseRoutes from "./src/routes/expenseRoutes.js";
import cookieParser from "cookie-parser";
import budgetRoutes from "./src/routes/budgetRoutes.js"

dotenv.config();

const app = express();
app.use(cookieParser());
connectDB();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

app.use("/api/budgets", budgetRoutes)

// ✅ Protected Routes
app.use("/api/expenses", expenseRoutes);


// Keep this at the end:
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
