/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
'use client';

import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import useAuth from '../hook/Useuser';
import { Button } from '../ui/Button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/Avtar';
import Features from './Features';
import Pricing from './Pricing';
import AboutUs from './AboutUs';
import Contact from './Contact';

const HomeScreen = ({ setShowSidebar }) => {
  const navigate = useNavigate();
  const { isSignedIn, user } = useAuth();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredSection, setHoveredSection] = useState(null);

  const featuresRef = useRef(null);
  const pricingRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);

  const handleGetStarted = () => {
    setShowSidebar(true);
    navigate('/dashboard');
  };

  const handleLogout = () => {
    window.Clerk.signOut();
    navigate('/signin');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background with parallax effect */}
      <motion.div
        className="fixed inset-0 z-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
      >
       <img
          src={
            hoveredSection === 'features'
              ? "https://media.istockphoto.com/id/1484758499/photo/indian-rupee-symbol-with-business-chart-3d-illustration.webp?a=1&b=1&s=612x612&w=0&k=20&c=ey87a2z5d1pAErsTCyQgzi14NHso-pDLsFk6Q1w0oUQ="
              : hoveredSection === 'pricing'
              ? "https://plus.unsplash.com/premium_photo-1677692593965-28c886409cfb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJpY2V8ZW58MHx8MHx8fDA%3D"
              : hoveredSection === 'about'
              ? "https://media.istockphoto.com/id/1363582851/photo/businessman-holding-graph.webp?a=1&b=1&s=612x612&w=0&k=20&c=5lrmpwExixi92SAynKvxFJVu10OoDZ_azhFxpXilyJo="
              : hoveredSection === 'contact'
              ? "https://media.istockphoto.com/id/1167014995/photo/lears-macaw.webp?a=1&b=1&s=612x612&w=0&k=20&c=Ve5vEPOrutuEfMrGmzpBtpe8DM92dye-84OhagzyFDE="
              : "https://plus.unsplash.com/premium_photo-1681487912304-274bac203320?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          alt="Decorative Background"
          className="w-full h-full object-cover transition-opacity duration-500"
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      </motion.div>

      {/* Top Left Corner: Logo */}
      <div className="fixed top-4 left-4 z-20 flex items-center gap-4">
        <motion.img
          src="logo3.svg"
          alt="Budget Buddy Logo"
          className="h-20 w-auto"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Top Right Corner: Profile or Sign In */}
      <div className="fixed top-4 right-4 z-20 flex items-center gap-4">
        {isSignedIn ? (
          <>
            <Avatar className="border-2 border-white">
              <AvatarImage src={user?.profileImageUrl} alt={`${user?.firstName}'s Profile`} />
              <AvatarFallback className="bg-gray-800 text-white">{user?.firstName?.[0] || 'U'}</AvatarFallback>
            </Avatar>
            <Button
              variant="destructive"
              onClick={handleLogout}
              className="shadow-lg hover:shadow-red-500/50 transition-all duration-300"
            >
              Logout
            </Button>
          </>
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

      {/* Menu Button */}
      <div className="fixed top-4 right-40 z-20 flex items-center gap-4">
        <Button
          variant="outline"
          onClick={toggleMenu}
          className="bg-gray-800/50 hover:bg-gray-700/50 text-white border-gray-600 shadow-lg hover:shadow-gray-500/50 transition-all duration-300"
        >
          {isMenuOpen ? 'Close Menu' : 'Menu'}
        </Button>
      </div>

      {/* Sliding Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed top-0 left-0 w-full bg-black/90 text-white p-6 z-30"
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{ height: '45%' }}
          >
            <div className="flex flex-col gap-4 text-white">
              <Button onClick={() => scrollToSection(featuresRef)} className="mb-4">
                Features
              </Button>
              <Button onClick={() => scrollToSection(pricingRef)} className="mb-4">
                Pricing
              </Button>
              <Button onClick={() => scrollToSection(aboutRef)} className="mb-4">
                About Us
              </Button>
              <Button onClick={() => scrollToSection(contactRef)} className="mb-4">
                Contact
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center text-center w-full">
        {/* Hero Section */}
        <motion.section
          className="min-h-screen flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-white px-6 max-w-4xl">
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
              <Link to="/learn-more">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-gray-800/50 hover:bg-gray-700/50 text-white border-gray-600 shadow-lg hover:shadow-gray-500/50 transition-all duration-300"
                >
                  Learn More
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.section>

        {/* Features Section */}
        <div
          ref={featuresRef}
          className="w-full"
          onMouseEnter={() => setHoveredSection('features')}
          onMouseLeave={() => setHoveredSection(null)}
        >
          <Features />
        </div>

        {/* Pricing Section */}
        <div
          ref={pricingRef}
          className="w-full"
          onMouseEnter={() => setHoveredSection('pricing')}
          onMouseLeave={() => setHoveredSection(null)}
        >
          <Pricing />
        </div>

        {/* About Us Section */}
        <div
          ref={aboutRef}
          className="w-full"
          onMouseEnter={() => setHoveredSection('about')}
          onMouseLeave={() => setHoveredSection(null)}
        >
          <AboutUs />
        </div>

        {/* Contact Section */}
        <div
          ref={contactRef}
          className="w-full"
          onMouseEnter={() => setHoveredSection('contact')}
          onMouseLeave={() => setHoveredSection(null)}
        >
          <Contact />
        </div>
      </main>
    </div>
  );
};

export default HomeScreen;

