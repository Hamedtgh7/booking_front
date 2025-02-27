import { authService } from "@/services/auth/index";
import { defineStore } from "pinia";
import { ref } from "vue";

interface RegisterData {
    name:string,
    email:string,
    password:string,
    role:string
}

export const useAuthStore=defineStore('auth',()=>{
    const emptyForm=()=>{
        return {
            name:'',
            email:'',
            password:'',
            role:'client'
        }
    }

    const registerForm=ref<RegisterData>(emptyForm())

    async function register(payload:RegisterData) {
       return await authService.register(payload).then(response=>{
        registerForm.value=emptyForm()
        return response
       }).catch(error=>{
        console.error('Error',error)
        return error
       })
    }

    return {
        registerForm,
        register
    }
})