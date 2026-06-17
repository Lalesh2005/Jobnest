import User from "../models/userModel.js";
import bcrypt from "bcrypt";

export const CreateUser =async(req,res)=>{
    try{
        const {name,email,password} = req.body;
        if(!name || !password || !email){
            return res.status(400).json({
                success:false,
                message:"Invalid"
            });
        }
        const isExist = await User.findOne({email});
        if(isExist){
            return res.status(400).json({
                success:false,
                message:"User already exist."
            });
        }
        const hashPassword =await  bcrypt.hash(password,10);
        const user =await User.create({
            name,
            email,
            password:hashPassword
        });
        return res.status(201).json({
            success:true,
            user:{name,email}
        })

    }
    catch(error)
    {
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}