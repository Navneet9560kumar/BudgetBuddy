/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import HomeScreen from "../Components/pages/HomeScreen";
import Dashboard from "../Components/pages/Dashbord";
import Budget from "../Components/pages/Budget";
import AddExpense from "../Components/pages/AddExpense";
import Profile from "../Components/pages/Profile";
import SignInPage from "../Components/pages/SignInPage";
import SignUpPage from "../Components/pages/SignUpPage";
import LearnMore from "../Components/pages/LearnMore"; // Import the new LearnMore component

const AppRoutes = ({ showSidebar, setShowSidebar }) => {
  const location = useLocation();

  // Check if the sidebar should be shown for specific routes
  const routesWithSidebar = ["/dashboard", "/budget", "/add-expense", "/profile"];
  const shouldShowSidebar = routesWithSidebar.includes(location.pathname);

  return (
    <div className="flex">
      {/* Conditionally render the Sidebar */}
      {shouldShowSidebar && <Sidebar />}

      <div className={shouldShowSidebar ? "flex-1 p-8" : "w-full"}>
        {/* Define all your routes here */}
        <Routes>
          <Route
            path="/"
            element={<HomeScreen setShowSidebar={setShowSidebar} />}
          />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/add-expense" element={<AddExpense />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/learn-more" element={<LearnMore />} /> {/* Add the new LearnMore route */}
        </Routes>
      </div>
    </div>
  );
};

export default AppRoutes;

