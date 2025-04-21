/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChartPie, FaPlus } from "react-icons/fa";
import BudgetTable from "./BudgetTable";
import BudgetChart from "./BudgetChart";
import AddBudgetModal from "./AddBudgetModal";

const Budget = () => {
  const [budgets, setBudgets] = useState([
    { id: 1, category: "Rent", allocated: 10000, spent: 8000 },
    { id: 2, category: "Groceries", allocated: 3000, spent: 3000 },
    { id: 3, category: "Entertainment", allocated: 2000, spent: 1000 },
  ]);

  const [showChart, setShowChart] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const toggleChart = () => setShowChart(!showChart);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const addBudget = (newBudget) => {
    setBudgets([...budgets, { ...newBudget, id: budgets.length + 1 }]);
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
        <div className="space-x-2">
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
            <BudgetTable budgets={budgets} />
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
