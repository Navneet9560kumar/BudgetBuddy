// src/models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  clerkId: String,
  email: String,
});

const User = mongoose.model('User', userSchema);

export default User;  // Default export
