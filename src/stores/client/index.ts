import { scheduleClientService } from "@/services/client";
import { defineStore } from "pinia";
import { ref } from "vue";


export const useClientStore=defineStore('client',()=>{
    const admins=ref([])
    const selectedDate=ref<string|null>(null)
    const schedules=ref([])

    async function fetchAdmins(){
        return await scheduleClientService.getUsers().then(response=>{
            admins.value=response.data.data.data
        }).catch(error=>{
            console.log('Error',error.response.data)
            return error
        })
    }

    async function getAdminSchedules(adminId:number,date:string){
        return await scheduleClientService.getUserSchedules(adminId,date).then(response=>{
            schedules.value=[...response.data.data]
        }).catch(error=>{
            console.log('Error',error.response.data)
            return error
        })
    }

    return {
        admins,
        selectedDate,
        schedules,
        fetchAdmins,
        getAdminSchedules
    }
})