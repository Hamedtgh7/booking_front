import { notificationService } from "@/services/notification";
import { defineStore } from "pinia";
import { ref } from "vue";


export const useNotificationStore=defineStore('notification',()=>{
    const notifications=ref([])

    async function getNotifications() {
       return await notificationService.get().then(response=>{
        console.log('sdfsdfsdfsdf',response)
        notifications.value=response.data
       }).catch(error=>{
        console.log('Error',error.response.data)
        return error
       })
    }

    return {
        notifications,
        getNotifications
    }
})