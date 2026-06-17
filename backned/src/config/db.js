import mongoose from "mongoose";

const connectDB = async()=>{
    try{
        const connection =await mongoose.connect(process.env.MONGO_URI);
        console.log("DB has connected");
    }
    catch(error){
        console.log(error.message);
        process.exit(1);
    }
}

export default connectDB;