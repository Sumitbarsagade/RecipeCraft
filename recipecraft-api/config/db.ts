import mongoose from 'mongoose';
import 'dotenv/config';
const MONGO_URI:string = process.env.MONGO_URI || " ";
const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(MONGO_URI as string);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;
