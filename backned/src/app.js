import express from "express";
import AuthRouter from "./routes/authRoutes.js";
import JobRouter from "./routes/jobRoutes.js";
const app = express();
app.get("/",(req,res)=>{
    res.send("Hello");
})
app.use(express.json());
app.use("/auth",AuthRouter);
app.use("/jobs",JobRouter);
export default app; 