import axios from "axios";
import router from "@/router";

const api=axios.create({
    baseURL:import.meta.env.VITE_API_URL,
    headers:{
        "Content-Type":'application/json',
        "Accept":'application/json'
    },
    withCredentials:true
})

api.interceptors.request.use((config)=>{
    const token=localStorage.getItem('token')
    if (token){
        config.headers.Authorization=`Bearer ${token}`
    }
    return config
})


api.interceptors.response.use(
    (response)=>response,
    (error)=>{
        if(error.response && error.response.status===401){
            localStorage.removeItem('token')
            router.push({'name':'login'})
        }

        return error
    } 
)

export default api