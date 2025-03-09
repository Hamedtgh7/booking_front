import { authService } from "@/services/auth/index";
import { defineStore } from "pinia";
import { ref } from "vue";

interface RegisterData {
    name:string,
    email:string,
    password:string,
    role:string
}

interface LoginData {
    email:string,
    password:string
}

export const useAuthStore=defineStore('auth',()=>{
    const emptyRegisterForm=()=>{
        return {
            name:'',
            email:'',
            password:'',
            role:'client'
        }
    }

    const emptyLoginForm=()=>{
        return {
            email:'',
            password:''
        }
    }

    const registerForm=ref<RegisterData>(emptyRegisterForm())
    const loginForm=ref<LoginData>(emptyLoginForm())
    const token=ref<string |null>(localStorage.getItem('token'))
    const role=ref<string|null>(localStorage.getItem('role'))
    const name=ref<string|null>(localStorage.getItem('name'))

    async function register(payload:RegisterData) {
       return await authService.register(payload).then(response=>{
        registerForm.value=emptyRegisterForm()
        return response
       }).catch(error=>{
        console.error('Error',error.response.data)
        return error
       })
    }

    async function login(payload:LoginData){
        return await authService.login(payload).then(response=>{
            loginForm.value=emptyLoginForm()

            token.value=response.data.data.token
            role.value=response.data.data.role
            name.value=response.data.data.name

            if (name.value){
                localStorage.setItem('name',name.value)
            }

            if (token.value){   
                localStorage.setItem('token',token.value)
            }

            if (role.value){
                localStorage.setItem('role',role.value)
            }

            return response
        }).catch(error=>{
            console.log('Error',error.response.data)
            return error
        })
    }

    async function logout(){
        return await authService.logout().then(response=>{
            localStorage.removeItem('token')
            localStorage.removeItem('role')
            localStorage.removeItem('name')
            token.value=null
            role.value=null
            name.value=null
            return response
        }).catch(error=>{
            console.error('Error',error.response.data)
            return error
        })
    }

    return {
        registerForm,
        loginForm,
        role,
        register,
        login,
        logout
    }
})