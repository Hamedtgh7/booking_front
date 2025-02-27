import api from "@/plugins/api";


export const authService={
    async register(data:object){
        return await api.post("/register",data)        
    },

    async login(data:{email:string; password:string}){
        return await api.post("/login",data)
    }
}