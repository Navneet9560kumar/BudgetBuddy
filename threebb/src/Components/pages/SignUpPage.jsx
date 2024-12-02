/* eslint-disable no-unused-vars */
import React from "react";

const SignUpPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Full Name:</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email:</label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Password:</label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded"
              placeholder="Create a password"
            />
          </div>
          <button className="w-full bg-blue-600 text-white py-2 rounded">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
