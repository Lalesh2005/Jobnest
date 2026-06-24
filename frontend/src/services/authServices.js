import api from "./api"

export const loginUser =async (userData)=>{
    const response = await api.post(
        "auth/login",
        userData);
    return response.data;
}

export const registerUser = async (registerData)=>{
    const response = await api.post(
        "auth/register",
        registerData
    );
    return response.data;
}