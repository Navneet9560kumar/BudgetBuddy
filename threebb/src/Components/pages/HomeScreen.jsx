/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
'use client';

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import useAuth from '../hook/Useuser';
import { Button } from '../ui/Button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/Avtar';

const HomeScreen = ({ setShowSidebar }) => {
  const navigate = useNavigate();
  const { isSignedIn, user } = useAuth();

  const handleGetStarted = () => {
    setShowSidebar(true); // Show Sidebar when "Get Started" is clicked
    navigate('/dashboard'); // Redirect to Dashboard
  };

  const handleLogout = () => {
    window.Clerk.signOut(); // For Clerk logout
    navigate('/signin');
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background with parallax effect */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
      >
        <img
          src="https://plus.unsplash.com/premium_photo-1681487912304-274bac203320?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Decorative Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      </motion.div>

      {/* Top Left Corner: Logo */}
      <div className="absolute top-4 left-4 z-10">
        <img
          src="logo3.svg"
          alt="Budget Buddy Logo"
          className="h-25 w-auto"
        />
      </div>

      {/* Top Right Corner: Profile or Sign In */}
      <div className="absolute top-4 right-4 z-10">
        {isSignedIn ? (
          <div className="flex items-center gap-4">
            <Avatar className="border-2 border-white">
              <AvatarImage src={user?.profileImageUrl} alt={`${user?.firstName}'s Profile`} />
              <AvatarFallback>{user?.firstName?.[0] || 'U'}</AvatarFallback>
            </Avatar>
            <Button
              variant="destructive"
              onClick={handleLogout}
              className="shadow-lg hover:shadow-red-500/50 transition-all duration-300"
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            variant="secondary"
            onClick={() => navigate('/signin')}
            className="shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
          >
            Sign In
          </Button>
        )}
      </div>

      {/* Main Content */}
      <motion.div
        className="relative z-10 text-center text-white px-6 max-w-4xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Budget Buddy 🦑
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl mb-12 text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Manage your expenses effortlessly with Budget Buddy.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Button
            size="lg"
            onClick={handleGetStarted}
            className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
          >
            Get Started
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => navigate('/learn-more')}
            className="bg-gray-800/50 hover:bg-gray-700/50 text-white border-gray-600 shadow-lg hover:shadow-gray-500/50 transition-all duration-300"
          >
            Learn More
          </Button>
        </motion.div>
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-black/20 to-transparent pointer-events-none" />
    </div>
  );
};

export default HomeScreen;
