/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import useAuth from "../hook/Useuser"; // Adjust path if necessary

const Dashboard = () => {
  const { isSignedIn, user, isLoading } = useAuth();
  const navigate = useNavigate();

  // Example financial summary data
  const summary = {
    income: 30000,
    expenses: 30000,
    balance: 20000,
  };

  const pieData = [
    { name: "Income", value: summary.income },
    { name: "Expenses", value: summary.expenses },
    { name: "Balance", value: summary.balance },
  ];

  const barData = [
    { month: "Jan", income: 12000, expenses: 8000 },
    { month: "Feb", income: 13000, expenses: 10000 },
    { month: "Mar", income: 17000, expenses: 12000 },
  ];

  const COLORS = ["#00C49F", "#FF8042", "#0088FE"]; // Colors for pie chart

  useEffect(() => {
    if (!isLoading && !isSignedIn) {
      navigate("/signin");
    }
  }, [isLoading, isSignedIn, navigate]);

  if (isLoading) {
    return <div className="text-center p-8">Loading...</div>;
  }

  return (
    <div className="p-8">
      {isSignedIn ? (
        <>
          <h1 className="text-3xl font-bold mb-6">
            Welcome {user?.firstName}!
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Pie Chart */}
            <div className="p-4 bg-gray-100 rounded shadow">
              <h2 className="font-semibold text-xl mb-4">Financial Overview</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Bar Chart */}
            <div className="p-4 bg-gray-100 rounded shadow">
              <h2 className="font-semibold text-xl mb-4">
                Monthly Performance
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="income" fill="#00C49F" />
                  <Bar dataKey="expenses" fill="#FF8042" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      ) : (
        <p>Redirecting to sign-in...</p>
      )}
    </div>
  );
};

export default Dashboard;
