import mongoose from "mongoose";
import dotenv from 'dotenv'; 

dotenv.config();

const uri = process.env.MONGODB_URI || process.env.LOCAL_MONGO_URI;

if (!uri) {
  throw new Error("MongoDB URI is not defined in environment variables.");
}

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(uri, {
      autoIndex: true,
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000,
    });
    console.log("✅ MongoDB database connected!");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
};
