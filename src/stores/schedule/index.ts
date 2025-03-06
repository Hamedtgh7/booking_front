import { scheduleService } from "@/services/schedule";
import { defineStore } from "pinia";

interface ScheduleData{
    date:string,
    slots:number[]
}

export const useScheduleStore=defineStore('schedule',()=>{
    async function createSchedules(payload:ScheduleData){
        return await scheduleService.create(payload).then(response=>{
            return response
        }).catch(error=>{
            console.log('Error',error.response.data)
            return error
        })

    }

    async function getSchedulesofDay(date:string){
        return await scheduleService.get(date).then(response=>{
            return response.data.data
        }).catch(error=>{
            console.log('Error',error.response.data)
            return error
        })
    }

    async function removeReservation(schedule:number){
        return await scheduleService.delete(schedule).then(response=>{
            return response.data
        }).catch(error=>{
            console.log('error',error.response.data)
            return error
        })
    }

    return {
        createSchedules,
        getSchedulesofDay,
        removeReservation
    }
})