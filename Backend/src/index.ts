import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import cookieParser from "cookie-parser";
import connectDB from "./lib/connectDB.js";
import authRoute from './routes/authRoute.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
  credentials: true
}));

app.use('/',authRoute);

app.listen(PORT, async () => {
  console.log(`Server is running on PORT ${PORT}`);
  await connectDB(process.env.MONGODB_URL || "");
});
