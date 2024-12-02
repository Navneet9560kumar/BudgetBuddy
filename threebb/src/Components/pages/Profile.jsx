/* eslint-disable no-unused-vars */
import React from 'react';
// eslint-disable-next-line no-unused-vars
import { useUser, UserButton, useAuth } from '@clerk/clerk-react'; // Clerk hooks

const Profile = () => {
  const { user } = useUser(); // Fetch logged-in user's data
  const { signOut } = useAuth(); // Access Clerk's sign-out functionality

  return (
    <div className="p-8 max-w-md mx-auto bg-white shadow-lg rounded-lg">
      <div className="text-center">
        {/* Display profile picture */}
        <img
          src={user?.profileImageUrl || 'https://via.placeholder.com/100'}
          alt="Profile"
          className="w-24 h-24 rounded-full mx-auto"
        />
        {/* User details */}
        <h1 className="text-2xl font-bold mt-4">
          {user?.fullName || 'Guest User'}
        </h1>
        <p className="text-gray-500">{user?.emailAddresses[0]?.emailAddress || 'No Email'}</p>
        <p className="text-gray-500">Joined: {new Date(user?.createdAt).toLocaleDateString()}</p>
      </div>
      <div className="mt-6 space-y-4">
        {/* Edit Profile with Clerk */}
        <button
          onClick={() => window.open('/user', '_self')} // Redirect to Clerk's user management page
          className="w-full bg-blue-500 text-white py-2 px-4 rounded"
        >
          Edit Profile
        </button>
        {/* Logout button */}
        <button
          onClick={signOut}
          className="w-full bg-red-500 text-white py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
