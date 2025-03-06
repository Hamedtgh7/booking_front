import api from "@/plugins/api";

export const notificationService={
    async get(){
        return await api.get('/notifications')
    }
} 