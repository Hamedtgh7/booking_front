import api from "@/plugins/api";

export const scheduleClientService={
    async getAdmins(){
        return await api.get('/admins')
    },

    async getAdminSchedules(adminId:number,date:string){
        return await api.get(`/admins/${adminId}?date=${date}`)
    }
}
