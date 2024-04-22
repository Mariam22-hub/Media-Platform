import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

const db_string = process.env.DATABASE_URL as string;

const connectDB = async () => {

  try {
    mongoose.Promise = Promise;
    await mongoose.connect(db_string);
    
    console.log('Connected to MongoDB');
  } 
  catch (error) {
    console.error('MongoDB connection error:', error);
  }

  mongoose.connection.on("error", (err: Error) => {
    console.error('MongoDB connection error:', err);
  });
}

export default connectDB;