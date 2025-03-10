import api from "@/plugins/api";

export const notificationService={
    async get(){
        return await api.get('/notifications')
    },
    
    async update(id:number){
        return await api.put(`/notifications/${id}`)
    }
} 