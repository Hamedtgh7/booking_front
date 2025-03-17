import api from "@/plugins/api";

export const analyticService={
    async getPopularSlots(){
        return await api.get('/analytics/popular-slots')
    },

    async getCancelRate(){
        return await api.get('/analytics/cancel-rate')
    },

    async getTopReservationClients(){
        return await api.get('/analytics/top-reservation-clients')
    },

    async getDailyRateReservation(){
        return await api.get('/analytics/daily-booking-rate')
    },

    async getTopCanceledClients(){
        return await api.get('/analytics/top-cancel-reserve-clients')
    },

    async getInactiveUsers(page:number){
        return await api.get(`/analytics/inactive-users?page=${page}`)
    },

    async userActivity(page:number){
        return await api.get(`/analytics/user-activities?page=${page}`)
    }

}