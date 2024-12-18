/* eslint-disable no-unused-vars */
import React from "react";
import { SignIn } from "@clerk/clerk-react";

const SignInPage = () => {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-gray-100">
      {/* Left Side: Image with Text */}
      <div className="relative hidden lg:flex items-center justify-center bg-blue-600">
        <img
          src="https://plus.unsplash.com/premium_photo-1681487912304-274bac203320?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Welcome"
          className="w-full h-full object-cover"
        />

        {/* Overlay Text */}
        <div className="absolute text-left text-white px-12 w-full bottom-12">
        <h2 className="text-4xl font-bold sm:text-5xl lg:text-6xl mb-4 text-[#2A547E]">
  Welcome to Budget Buddy 🦑
</h2>
<p className="text-[#36454F] text-lg sm:text-xl leading-relaxed max-w-lg">
  Simplify your financial management and take control of your budget effortlessly with Budget Buddy.
</p>

        </div>
      </div>

      {/* Right Side: Sign-In Form */}
      <div className="flex items-center justify-center p-6 bg-white">
        <div className="p-8 shadow-lg rounded-lg max-w-md w-full">
          <h2 className="text-3xl font-bold text-center mb-6 text-[#54B2DF]">
            Welcome Back!
          </h2>
          <p className="text-gray-600 text-center mb-6">
            Sign in to access your personalized dashboard.
          </p>
          <SignIn
            appearance={{
              elements: {
                card: "shadow-none border border-gray-300 rounded-lg",
                formButtonPrimary:
                  "bg-[#54B2DF] hover:bg-[#469dc3] text-white font-semibold py-3 px-6 rounded w-full",
              },
            }}
          />
          <p className="text-center mt-4 text-sm text-gray-500">
            Don’t have an account?{" "}
            <a href="/sign-up" className="text-[#54B2DF] font-medium hover:underline">
              Sign up here.
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
