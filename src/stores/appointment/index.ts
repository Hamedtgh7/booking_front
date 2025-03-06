import { appoitmentService } from "@/services/appontment";
import { defineStore } from "pinia";
import { ref } from "vue";


export const useApoointmentStore=defineStore('appointment',()=>{
    const appointment=ref(null)
    const appointments=ref([])

    async function createAppointment(scheduleId:number){
      return await appoitmentService.create({scheduleId:scheduleId}).then(response=>{
        appointment.value=response.data
      }).catch(error=>{
        console.log('Error',error.response.data)
        return error
      })
    }

    async function getAppointments() {
        return await appoitmentService.get().then(response=>{
            appointments.value=response.data.data
        }).catch(error=>{
            console.log('Error',error.response.data)
            return error
        })
    }

    async function changeStatus(id:number,status:string){
        return await appoitmentService.put({status:status},id).then(response=>{
            const index=appointments.value.findIndex(appo => appo.id===id)
            if (index!==-1){
                appointments.value[index].status=status
            }
        }).catch(error=>{
            console.log('Error',error.response.data)
            return error
        })
    }

    return {
        appointment,
        appointments,
        createAppointment,
        getAppointments,
        changeStatus
    }
})