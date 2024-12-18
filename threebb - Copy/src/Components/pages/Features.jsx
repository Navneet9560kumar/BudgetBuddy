/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';

const Features = () => {
  return (
    <motion.section
      className="min-h-screen flex items-center justify-center bg-gray-900/80 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="text-white px-6 max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
          Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: "Easy Budgeting", description: "Create and manage budgets with just a few clicks." },
            { title: "Expense Tracking", description: "Keep track of all your expenses in one place." },
            { title: "Financial Insights", description: "Get valuable insights into your spending habits." },
            { title: "Goal Setting", description: "Set and track your financial goals effortlessly." },
            { title: "Bill Reminders", description: "Never miss a bill payment with our reminder system." },
            { title: "Secure & Private", description: "Your financial data is always safe and secure with us." },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="bg-gray-800/50 p-6 rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Features;

