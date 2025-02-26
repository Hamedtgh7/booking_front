import api from "@/plugins/api";


export const authService={
    async register(data:object){
        try{
            const response=await api.post("/register",data)
            return response.data
        } catch(error:any){
            console.log('Error',error.response?.data?.message)
        }
        
    },

    async login(data:{email:string; password:string}){
        await api.post("/login",data)
    }
}