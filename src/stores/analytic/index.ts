import { analyticService } from "@/services/analytic";
import { defineStore } from "pinia";
import { ref } from "vue";


export const useAnalyticStore=defineStore('analytic',()=>{
    const popularSlots=ref([])
    const cancelRate=ref({
        rate:0,
        cancelAppointment:0,
        allAppointments:0
    })
    const topClients=ref([])
    const dailyRates = ref<{ formatted_date: string; booked_slot: number; total_slots: number; fillRate: number }[]>([]);
    const topCanceledClients=ref<{client_id:number,name:string,canceledRate:number}[]>([])

    const inactiveUsers = ref<{id:number,name:string,lastActivity:string}[]>([]);
    const totalInactiveUsersPages=ref(1)
    const currentInactiveUsersPages=ref(1)

    const activities=ref([])
    const totalActivitiesPages=ref(1)
    const currentActivitiesPage=ref(1)
    

    async function getPopularSlots(){
        return await analyticService.getPopularSlots().then(response=>{
            popularSlots.value=response.data.data
        }).catch(error=>{
            console.log('Error',error)
            return error
        })
    }


    async function getCancelRate(){
        return await analyticService.getCancelRate().then(response=>{
            cancelRate.value=response.data.data
        }).catch(error=>{
            console.log('Error',error)
            return error
        })
    }

    async function getTopReservationClients(){
        return await analyticService.getTopReservationClients().then(response=>{
            topClients.value=response.data.data
        }).catch(error=>{
            console.log('Error',error)
            return error
        })
    }

    async function getDailyRateReservation(){
        return await analyticService.getDailyRateReservation().then(response=>{
            dailyRates.value=response.data.data
        }).catch(error=>{
            console.log('Error',error)
            return error
        })
    }

    async function getTopCanceledClients(){
        return await analyticService.getTopCanceledClients().then(response=>{
            topCanceledClients.value=response.data.data
        }).catch(error=>{
            console.log('Error',error)
            return error
        })
    }

    async function getInactiveUsers(page=1){
        return await analyticService.getInactiveUsers(page).then(response=>{
            inactiveUsers.value=response.data.data.data
            totalInactiveUsersPages.value=response.data.meta.last_page
            currentInactiveUsersPages.value=response.data.meta.currnet_page
        }).catch(error=>{
            console.log('Error',error)
            return error
        })
    }

    async function getUserActivity(page=1){
        return await analyticService.userActivity(page).then(response=>{
            activities.value=response.data.data.data
            totalActivitiesPages.value=response.data.meta.last_page
            totalActivitiesPages.value=response.data.meta.currnet_page
        }).catch(error=>{
            console.log('Error',error)
            return error
        })
    }

    

    return {
        popularSlots,
        cancelRate,
        topClients,
        dailyRates,
        topCanceledClients,
        inactiveUsers,
        totalInactiveUsersPages,
        currentInactiveUsersPages,
        activities,
        totalActivitiesPages,
        currentActivitiesPage,
        getPopularSlots,
        getCancelRate,
        getTopReservationClients,
        getDailyRateReservation,
        getTopCanceledClients,
        getInactiveUsers,
        getUserActivity
    }
})