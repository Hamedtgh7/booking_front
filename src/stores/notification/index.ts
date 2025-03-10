import { notificationService } from "@/services/notification";
import { defineStore } from "pinia";
import { ref } from "vue";

interface Notification{
    id:number,
    title:string,
    message:string,
    read_at:string|null,
    created_at:string
}

export const useNotificationStore=defineStore('notification',()=>{
    const notifications=ref<Notification[]>([])

    async function getNotifications() {
       return await notificationService.get().then(response=>{
        notifications.value=response.data.data
       }).catch(error=>{
        console.log('Error',error.response.data)
        return error
       })
    }

    async function markAsRead(id:number) {
        return await notificationService.update(id).then(response=>{
            notifications.value=notifications.value.map(notif=>
                notif.id===id?{...notif,read_at:new Date().toISOString()}:notif
            )
        }).catch(error=>{
            console.log('Error',error.response.data)
            return error
        })        
    }

    return {
        notifications,
        getNotifications,
        markAsRead
    }
})