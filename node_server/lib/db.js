import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB database connected successfully");
    } catch (error) {
        console.log("Unable to connect to MongoDB database: ", error);
        process.exit(1);
    }
}