import api from "@/plugins/api";

export const scheduleClientService={
    async getUsers(){
        return await api.get('/users/get-admins-list')
    },

    async getUserSchedules(adminId:number,date:string){
        return await api.get(`/users/get-admins-list/${adminId}/schedule?date=${date}`)
    }
}
