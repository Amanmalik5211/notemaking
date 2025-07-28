import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser";
import connectDB from "./src/lib/connectDB.js";

const app = express();
const PORT = 4000;
dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    credentials: true 
}));


app.listen(PORT, async()=>{
    console.log(`server is started at PORT ${PORT}`)
    await connectDB(process.env.MONGODB_URL)
})