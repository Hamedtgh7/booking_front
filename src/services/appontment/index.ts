import api from "@/plugins/api";

export const appoitmentService={
    async create(data:object){
        return await api.post('/appointments',data)
    },

    async get(){
        return await api.get('/appointments')
    },

    async put(data:object,id:number){
        return await api.put(`/appointments/${id}`,data)
    }
}