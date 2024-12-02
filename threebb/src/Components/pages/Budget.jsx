/* eslint-disable no-unused-vars */
import React from "react";

const Budget = () => {
  const budgets = [
    { id: 1, category: "Rent", allocated: 10000, spent: 8000 },
    { id: 2, category: "Groceries", allocated: 5000, spent: 3000 },
    { id: 3, category: "Entertainment", allocated: 2000, spent: 1000 },
  ];

  // Calculate progress as percentage
  const calculateProgress = (spent, allocated) => {
    return (spent / allocated) * 100;
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">Budget Overview</h1>
      <div className="overflow-x-auto shadow-xl rounded-lg">
        <table className="w-full text-left table-auto border-separate space-y-4">
          <thead className="bg-gray-700 text-white">
            <tr>
              <th className="py-3 px-6">Category</th>
              <th className="py-3 px-6">Allocated</th>
              <th className="py-3 px-6">Spent</th>
              <th className="py-3 px-6">Progress</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {budgets.map((budget) => (
              <tr
                key={budget.id}
                className="hover:bg-gray-100 transition-colors duration-300"
              >
                <td className="py-4 px-6 text-gray-700">{budget.category}</td>
                <td className="py-4 px-6 text-gray-700">₹{budget.allocated}</td>
                <td className="py-4 px-6 text-gray-700">₹{budget.spent}</td>
                <td className="py-4 px-6">
                  <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-teal-600 bg-teal-200">
                        {Math.round(calculateProgress(budget.spent, budget.allocated))}%
                      </span>
                    </div>
                    <div className="flex mb-2">
                      <div className="relative flex w-full flex-col">
                        <div className="flex mb-2 items-center justify-between">
                          <div className="w-full bg-gray-200 rounded-full">
                            <div
                              style={{
                                width: `${calculateProgress(budget.spent, budget.allocated)}%`,
                              }}
                              className={`bg-teal-500 h-2 rounded-full`}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Budget;
