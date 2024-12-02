/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import AppRoutes from "./routes/AppRoute"; // Importing Routes Component

const App = () => {
  const [showSidebar, setShowSidebar] = useState(false); // State for Sidebar visibility

  return (
    // Wrap the entire app in ThemeProvider and Router
    <ThemeProvider>
      <Router>
        {/* Render the AppRoutes component and pass props */}
        <AppRoutes showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      </Router>
    </ThemeProvider>
  );
};

export default App;
