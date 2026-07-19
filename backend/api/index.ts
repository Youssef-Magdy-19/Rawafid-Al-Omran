import app from '../src/app.js';
import { connectDatabase } from '../src/config/database.js';
import mongoose from 'mongoose';

// Cache the database connection
let isConnected = false;

const connectDB = async (): Promise<void> => {
  // If already connected, skip
  if (mongoose.connection.readyState === 1) {
    return;
  }

  // If already connecting, skip
  if (isConnected) {
    return;
  }

  try {
    await connectDatabase();
    isConnected = true;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

// Connect to database on cold start
await connectDB();

// Export the Express app for Vercel
export default app;