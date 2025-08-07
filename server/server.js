//server/server.js
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import router from "./routes/authRoutes.js";
import cors from 'cors';
import cookieParser from "cookie-parser";
import protectedRoute from "./routes/protectedRoutes.js";
import uploadRoute from "./routes/upload.js";
import Geminirouter from "./routes/geminiRoutes.js";
import adminRouter from "./routes/adminRoutes.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 5000;
app.use(cors({
     origin: 'http://localhost:5173',
  credentials: true    
}));

app.use("/api", router);
app.use("/api", protectedRoute);
app.use("/api", uploadRoute);
app.use("/api", Geminirouter);
app.use("/api", adminRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});

