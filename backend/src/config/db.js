  import mongoose from "mongoose";
  import { ENV } from "./env.js";

export const connectDB = async(req, res) => {
    try {
        const conn = await mongoose.connect(ENV.MONGO_URI)
        console.log("MongoDB connected successfully:", conn.connection.host);
        
    } catch (error) {
        res.json({success: false,message:error.message})
        
    }
  }