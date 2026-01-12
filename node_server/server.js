import express from "express";
import dotenv from "dotenv";

// Routes
import userRoutes from "./routes/user.route.js"
import authRoutes from "./routes/auth.route.js"
import saveRoutes from "./routes/save.route.js"

// Database
import { connectDB } from "./lib/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3030;

app.use(express.json());

app.use("/api/ussers" , userRoutes);
app.use("/api/auth" , authRoutes);
app.use("/api/save" , saveRoutes);

app.listen(PORT , () => {
    console.log("server is running on port " + PORT);
    connectDB();
})
