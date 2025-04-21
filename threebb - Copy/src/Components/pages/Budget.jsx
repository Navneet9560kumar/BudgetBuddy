/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChartPie, FaPlus } from "react-icons/fa";
import BudgetTable from "./BudgetTable";
import BudgetChart from "./BudgetChart";
import AddBudgetModal from "../pages/AddBudgetModalbhai";

const Budget = () => {
  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("authToken");

        const res = await fetch(
          `http://localhost:3000/api/budgets/user/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        if (data) {
          // 👇 Transform the data
          console.log("data hamara hai ",data);
          const transformed = data.map((b) => ({
            id: b._id,
            category: b.product, // or use b.category if you prefer
            allocated: b.amount,
            spent: Math.floor(b.amount * 0.7), // dummy spent (70%)
          }));
          setBudgets(transformed);
        } else {
          setBudgets([]);
        }
      } catch (err) {
        console.error("Error fetching budgets:", err.message);
      }
    };

    fetchBudgets();
  }, []);

  // const [budgets, setBudgets] = useState([

  //   { id: 1, category: "Rent", allocated: 10000, spent: 8000 },
  //   { id: 2, category: "Groceries", allocated: 3000, spent: 3000 },
  //   { id: 3, category: "Entertainment", allocated: 2000, spent: 1000 },
  // ]);

  const [budgets, setBudgets] = useState([]);

  const [showChart, setShowChart] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const toggleChart = () => setShowChart(!showChart);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

// single delte karne ke leye ham iska use karege ham 


const handleDelete = async (budgetId) => {
  const token = localStorage.getItem("authToken");

  if (!window.confirm("Are you sure you want to delete this budget item?")) return;

  try {
    const res = await fetch(`http://localhost:3000/api/budgets/${budgetId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (data.success) {
      setBudgets((prev) => prev.filter((item) => item.id !== budgetId));
    } else {
      console.error("Failed to delete budget item");
    }
  } catch (err) {
    console.error("Error deleting budget item:", err.message);
  }
};






/// delete karne ke leye ham use karte hai 

const deleteAllBudgets = async () => {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("authToken");

  if (!window.confirm("Are you sure you want to delete all budgets?")) return;

  try {
    const res = await fetch(`http://localhost:3000/api/budgets/user/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (data.success) {
      setBudgets([]); // frontend se remove karo
      console.log("All budgets deleted");
    } else {
      console.error("Failed to delete budgets");
    }
  } catch (err) {
    console.error("Error deleting all budgets:", err.message);
  }
};







  const addBudget = async (newBudget) => {
    try {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("authToken");

      const res = await fetch("http://localhost:3000/api/budgets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...newBudget, user: userId }),
      });

      const data = await res.json();
      if (data.success) {
        const addedBudget = {
          id: data.budget._id,
          category: data.budget.product,
          allocated: data.budget.amount,
          spent: Math.floor(data.budget.amount * 0.7),
        };
        setBudgets((prev) => [...prev, addedBudget]);
      }
    } catch (err) {
      console.error("Error adding budget:", err.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-8"
    >
      <div className="flex justify-between items-center mb-6">
        <motion.h1
          initial={{ x: -20 }}
          animate={{ x: 0 }}
          className="text-3xl font-semibold text-gray-800"
        >
          Budget Overview
        </motion.h1>
        <div className="flex flex-wrap gap-4 mb-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleChart}
            className="bg-blue-500 text-white py-2 px-4 rounded-full flex items-center"
          >
            <FaChartPie className="mr-2" />
            {showChart ? "Show Table" : "Show Chart"}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={openModal}
            className="bg-green-500 text-white py-2 px-4 rounded-full flex items-center"
          >
            <FaPlus className="mr-2" />
            Add Budget
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={deleteAllBudgets}
            className="bg-red-500 text-white py-2 px-4 rounded-full flex items-center"
          >
            <FaPlus className="mr-2" />
            Delete All
          </motion.button>
        </div>
      </div>
      <AnimatePresence mode="wait">
        {showChart ? (
          <motion.div
            key="chart"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <BudgetChart budgets={budgets} />
          </motion.div>
        ) : (
          <motion.div
            key="table"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
         <BudgetTable budgets={budgets} handleDelete={handleDelete} />

          </motion.div>
        )}
      </AnimatePresence>
      <AddBudgetModal
        isOpen={showModal}
        onClose={closeModal}
        onAdd={addBudget}
      />
    </motion.div>
  );
};

export default Budget;
