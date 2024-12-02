import express from 'express';
import { requireAuth } from '@clerk/express'; // Correct middleware import for authentication
import User from '../models/User.js'; // Import User model

const router = express.Router();

// Public route (No authentication required)
router.get('/public', (req, res) => {
  res.status(200).json({ message: 'This is a public route.' });
});

// Protected route (Authentication required via Clerk)
router.get('/profile', requireAuth(), async (req, res) => {
  try {
    const { userId, claims } = req.auth; // Clerk attaches user data in req.auth
    const email = claims.email_addresses?.[0]; // Fetch the first email address

    // Check if the user exists in the database
    let userFromDB = await User.findOne({ clerkId: userId });
    if (!userFromDB) {
      // If the user doesn't exist, save them to the database
      const newUser = new User({
        clerkId: userId,
        email,
      });
      userFromDB = await newUser.save();
    }

    res.status(200).json({ message: 'Profile data', user: userFromDB });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile data', error });
  }
});

// Logout route
router.post('/logout', (req, res) => {
  try {
    req.session?.destroy(() => {
      res.status(200).json({ message: 'Successfully logged out' });
    });
  } catch (error) {
    res.status(500).json({ message: 'Error logging out', error });
  }
});

export default router;
