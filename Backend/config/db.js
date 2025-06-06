import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI;

const connectDB = async () => {
  try{
    await mongoose.connect(MONGO_URI);
    console.log("Server connected to QuestionDB (Cluster 1)")
  }catch(error){
    console.log("error in connecting database to server ");
    process.exit(1);
  }
}

export default connectDB;