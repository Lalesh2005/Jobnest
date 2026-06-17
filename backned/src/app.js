import express from "express";
import AuthRouter from "./routes/authRoutes.js";
const app = express();
app.get("/",(req,res)=>{
    res.send("Hello");
})
app.use(express.json());
app.use("/auth",AuthRouter);

export default app; 