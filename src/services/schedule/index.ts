import api from "@/plugins/api";

export const scheduleService={
    async create(data:object){
        return await api.post('/schedules',data)
    },

    async get(date:string){
        return await api.get(`/schedules?date=${date}`)
    },

    async delete(schedule:number){
        return await api.delete(`/schedules/${schedule}`)
    }
}