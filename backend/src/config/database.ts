import mongoose from 'mongoose';
import config from './index.js';
import logger from '../logger/logger.js';

export const connectDatabase = async (): Promise<void> => {
  try {
    const uri = config.mongodb.uri;
    
    await mongoose.connect(uri, {
      maxPoolSize: config.mongodb.options.maxPoolSize,
      serverSelectionTimeoutMS: config.mongodb.options.serverSelectionTimeoutMS,
      socketTimeoutMS: config.mongodb.options.socketTimeoutMS,
    });

    logger.info('MongoDB connected successfully', { uri: uri.replace(/\/\/.*@/, '//<credentials>@') });

    // Handle connection events
    mongoose.connection.on('error', (err) => {
      logger.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      logger.warn('MongoDB disconnected');
    });

    mongoose.connection.on('reconnected', () => {
      logger.info('MongoDB reconnected');
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      logger.info('MongoDB connection closed through app termination');
      process.exit(0);
    });

  } catch (error) {
    logger.error('MongoDB connection failed:', error);
    throw error;
  }
};

export const disconnectDatabase = async (): Promise<void> => {
  try {
    await mongoose.connection.close();
    logger.info('MongoDB disconnected gracefully');
  } catch (error) {
    logger.error('Error disconnecting from MongoDB:', error);
    throw error;
  }
};

export default { connectDatabase, disconnectDatabase };