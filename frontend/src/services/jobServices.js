import api from "./api.js"
export const getAllJobs = async()=>{
    const response = await api.get("/jobs");
    return response.data;
}