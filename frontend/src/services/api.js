import axios from "axios"
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL // dekho bahi yaha par space dena important hai import se pahle 
})

export default api;