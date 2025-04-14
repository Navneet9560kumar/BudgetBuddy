// App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoute"; // Clean and single entry point for routes

const App = () => {
  const [showSidebar, setShowSidebar] = useState(false); // State for Sidebar visibility

  return (
 
      <AppRoutes showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
 
  );
};

export default App;
