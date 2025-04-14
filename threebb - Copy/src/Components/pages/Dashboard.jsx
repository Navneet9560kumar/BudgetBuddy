import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  // BarChart, Bar, XAxis, YAxis, CartesianGrid
} from "recharts";
import { motion } from "framer-motion";
import { FaPlus } from "react-icons/fa";
import { useAuthContext } from "../Context/AuthContext";
import AddBudgetModal from "../../AddBudgetModal";

const Dashboard = () => {
  const { isLoggedIn, data, isLoading } = useAuthContext();
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const [budgets, setBudgets] = useState();
  const [loadingExpenses, setLoadingExpenses] = useState(true);
  const [showBudgetModal, setShowBudgetModal] = useState(false);

  useEffect(() => {
    if (!isLoggedIn && !isLoading) {
      navigate("/signin");
    }
  }, [isLoggedIn, isLoading, navigate]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("authToken");
        const res = await fetch(`http://localhost:5000/api/budgets/user/${userId}`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        console.log("Expenses data:", data);
        if(!data.success) 
        {setExpenses([])}
        else {
          setExpenses(data)
        }
        
      } catch (err) {
        console.error("Error fetching expenses:", err.message);
      } finally {
        setLoadingExpenses(false);
      }
    };

    const fetchBudgets = async () => { // ye mera budget de raha hai

      try {
        const userId = localStorage.getItem("userId");
        console.log("user id", userId);
        const res = await fetch(`http://localhost:5000/api/expenses/user/${userId}`);

      
        const data = await res.json();
        console.log("budgets", data);
        setBudgets(data.amount);
      } catch (err) {
        console.error("Error fetching budgets:", err.message);
      }
    };

    if (isLoggedIn) {
      fetchExpenses();
      fetchBudgets();
    }
  }, [isLoggedIn]);

  const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);
 
  const income = budgets;
  // eslint-disable-next-line no-unused-vars
  const balance = income - totalExpenses;

  const pieData = [
    { name: "Income", value: income },
    { name: "Expenses", value: totalExpenses },
    { name: "Budget", value: balance },
  ];

  const COLORS = ["#00C49F", "#FF8042", "#0088FE"];

  if (isLoading || loadingExpenses) {
    return <div className="text-center p-8">Loading Dashboard...</div>;
  }

  return (
    <div className="p-8">
      {isLoggedIn && (
        <>
          <h1 className="text-3xl font-bold mb-6">Welcome {data.name}!</h1>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowBudgetModal(true)}
            className="bg-green-500 text-white py-2 px-4 rounded-full flex items-center mb-4"
          >
            <FaPlus className="mr-2" />
            Add Expnse
          </motion.button>

          {showBudgetModal && (
            
            <AddBudgetModal
              closeModal={() => setShowBudgetModal(false)}
              onBudgetAdded={(newBudget) => setExpenses([...expenses, newBudget])}
            />
            
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="p-4 bg-gray-100 rounded shadow">
              <h2 className="font-semibold text-xl mb-4">Financial Overview</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="p-4 bg-gray-100 rounded shadow">
              <h2 className="font-semibold text-xl mb-4">Recent Expenses</h2>
              {expenses.length === 0 ? (
                <p>No expenses found.</p>
              ) : (
                <ul className="space-y-3">
                  {expenses.map((exp) => (
                    <li key={exp._id || exp.createdAt} className="bg-white rounded p-3 shadow-sm">
                      <p><strong>Product:</strong> {exp.product}</p>
                      <p><strong>Amount:</strong> ₹{exp.amount}</p>
                      <p className="text-sm text-gray-500">
                        <strong>Date:</strong> {new Date(exp.createdAt).toLocaleDateString()}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
