import express from "express";
import {CreateUser} from "../controllers/userController.js";

const router = express.Router();
router.post("/",CreateUser);
export default router;