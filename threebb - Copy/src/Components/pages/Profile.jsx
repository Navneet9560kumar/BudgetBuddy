/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// eslint-disable-next-line no-unused-vars
import { useUser, UserButton, useAuth } from '@clerk/clerk-react';
import { FaEnvelope, FaCalendar, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import ProfileSkeleton from './ProfileSkeleton';
import ProfileCompletionBar from './ProfileCompletionBar';
import ProfilePictureModal from './ProfilePictureModal';
import AnimatedBackground from './AnimatedBackground';

const Profile = () => {
  const { user, isLoaded } = useUser();
  const { signOut } = useAuth();
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
  const [showModal, setShowModal] = useState(false);

  if (!isLoaded) return <ProfileSkeleton />;

  const toggleAdditionalInfo = () => setShowAdditionalInfo(!showAdditionalInfo);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative p-8 max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden"
    >
      <AnimatedBackground />
      <div className="relative z-10">
        <div className="text-center">
          <motion.img
            src={user?.profileImageUrl || 'https://via.placeholder.com/100'}
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto cursor-pointer"
            whileHover={{ scale: 1.1 }}
            onClick={openModal}
          />
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-bold mt-4"
          >
            {user?.fullName || 'Guest User'}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-500 flex items-center justify-center"
          >
            <FaEnvelope className="mr-2" />
            {user?.emailAddresses[0]?.emailAddress || 'No Email'}
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-500 flex items-center justify-center"
          >
            <FaCalendar className="mr-2" />
            Joined: {new Date(user?.createdAt).toLocaleDateString()}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6"
        >
          <ProfileCompletionBar user={user} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 space-y-4"
        >
          <button
            onClick={() => window.open('/user', '_self')}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded transition duration-300 ease-in-out hover:bg-blue-600"
          >
            Edit Profile
          </button>
          <button
            onClick={signOut}
            className="w-full bg-red-500 text-white py-2 px-4 rounded transition duration-300 ease-in-out hover:bg-red-600"
          >
            Logout
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-6"
        >
          <button
            onClick={toggleAdditionalInfo}
            className="flex items-center justify-between w-full py-2 px-4 bg-gray-100 rounded"
          >
            <span>Additional Information</span>
            {showAdditionalInfo ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          <AnimatePresence>
            {showAdditionalInfo && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 bg-gray-50 p-4 rounded"
              >
                <p>Username: {user?.username || 'N/A'}</p>
                <p>Last Updated: {new Date(user?.updatedAt).toLocaleString()}</p>
                {/* Add more user information here */}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      <ProfilePictureModal
        isOpen={showModal}
        onClose={closeModal}
        imageUrl={user?.profileImageUrl}
      />
    </motion.div>
  );
};

export default Profile;
