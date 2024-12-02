/* eslint-disable no-unused-vars */
import React from 'react';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { ClerkProvider } from '@clerk/clerk-react';
import './index.css';
import App from './App.jsx';

// Load the Clerk key from environment variables
const clerkKey = import.meta.env.VITE_CLERK_KEY;

// Validate if the Clerk key is provided
if (!clerkKey) {
  console.error("Error: Clerk publishable key not found in environment variables.");
  throw new Error("Clerk publishable key is required but was not found. Check your environment configuration.");
}

// Log the Clerk key for debugging purposes (optional, remove for production)
console.log("Clerk Publishable Key:", clerkKey);

createRoot(document.getElementById('root')).render(
 
    <ClerkProvider publishableKey={clerkKey}>
      <App />
    </ClerkProvider>
  
);
