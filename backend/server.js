import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import path from "path";

dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use("/api/auth", authRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
