import Job from "../models/jobModel.js";

export const getAllJobs =async(req,res)=>{
    try{
        const jobs = await Job.find();
        return res.status(200).json({
            success:true,
            count:jobs.length,
            jobs
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }

}
export const getJobById=async(req,res)=>{
    try{
        const id = req.params.id;
        const job = await Job.findById(id)
        if(!job){
            return res.status(404).json({
                success:false,
                message:"Job not Found"
            })
        }
        return res.status(200).json({
            success:true,
            job
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }

}
export const searchJobs = async (req,res)=>{
    try{

        const q = req.query.q;

        if(!q){
            return res.status(400).json({
                success:false,
                message:"Search query is required"
            });
        }

        const jobs = await Job.find({
            $or:[
                {
                    title:{
                        $regex:q,
                        $options:"i"
                    }
                },
                {
                    company:{
                        $regex:q,
                        $options:"i"
                    }
                },
                {
                    skills:{
                        $regex:q,
                        $options:"i"
                    }
                }
            ]
        });

        return res.status(200).json({
            success:true,
            count:jobs.length,
            jobs
        });

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}