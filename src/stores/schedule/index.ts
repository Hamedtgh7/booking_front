import { scheduleService } from "@/services/schedule";
import { defineStore } from "pinia";
import { ref } from "vue";

interface ScheduleAdminData {
    id: number;
    adminId:number;
    date:string;
    slot:{
      id:number;
      start:string;
      end:string;
    }
  }

interface ScheduleData{
    date:string,
    slots:number[]
}

export const useScheduleStore=defineStore('schedule',()=>{
    const schedules = ref<ScheduleAdminData[]>([]);
    const selectedDate=ref<string|null>(null)
    const selectedSchedules=ref<number[]>([])

    async function fetchSchedules(date:string){
        return await scheduleService.get(date).then(response=>{
            schedules.value=response.data.data
        }).catch(error=>{
          console.log('Error',error.response.data)
          schedules.value=[]
          return error
        })
     }

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

    function selectDate(date:string){
        selectedDate.value=date
        selectedSchedules.value=[]
     }
    
     function toggleSchedule(scheduleId:number){
      if(selectedSchedules.value.includes(scheduleId)){
        selectedSchedules.value=[]
      }else{
        selectedSchedules.value=[scheduleId]
      }
     }

    return {
        schedules,
        selectedSchedules,
        selectedDate,
        fetchSchedules,
        selectDate,
        toggleSchedule,
        createSchedules,
        getSchedulesofDay,
        removeReservation
    }
})