import express from "express";
import UserRouter from "./routes/userRoutes.js";
const app = express();
app.get("/",(req,res)=>{
    res.send("Hello");
})
app.use(express.json());
app.use("/users",UserRouter);

export default app;