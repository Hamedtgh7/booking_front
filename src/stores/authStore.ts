import { authService } from "@/services/authService";
import { defineStore } from "pinia";
import { ref } from "vue";

interface RegisterData {
    name:string,
    email:string,
    password:string,
    role:string
}

export const useAuthStore=defineStore('auth',()=>{
    const registerForm=ref<RegisterData>({
        name:'',
        email:'',
        password:'',
        role:'client'
    })


    async function register(payload:RegisterData) {
       try{
        const response=await authService.register(payload)
        return response
       } catch(error){
        console.error('Error',error)
       }
    }

    return {
        registerForm,
        register
    }
})