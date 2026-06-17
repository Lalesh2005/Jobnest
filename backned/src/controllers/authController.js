import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const RegisterUser =async(req,res)=>{
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
export const LoginUser =async (req,res)=>{
    try{
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"All field are necessary"
            })
        }
        const user =await User.findOne({email});
        if(!user){
            return res.status(401).json({
                success:false,
                message:"Invalid credentials"
            })
        }
        const checkPassword =await bcrypt.compare(password,user.password);
        if(!checkPassword){
            return res.status(401).json({
                success:false,
                message:"Invalid credentials"
            })
        }
        const token = jwt.sign({
            id:user._id,

        },process.env.JWT_SECRET,{
            expiresIn:"7d"
        }
    );
        return res.status(200).json({
            success:true,
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
            },
            token
        })

    }
    catch(error){
        return  res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
export const getProfile =async (req,res)=>{
    try{
        const id = req.user.id;
       const user = await User.findById(id).select("-password"); // password nahi laaayega ye 
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User did not exist"
            })
        }
        return res.status(200).json({
            success:true,
            user
        })
    }
    catch(error)
    {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
export const LogoutUser = (req,res)=>{

}