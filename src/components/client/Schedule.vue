<template>
    <v-container>

        <v-row class="justify-center align-center">
            <v-btn icon @click="prevMonth">
                <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
       

            <h2 class="mx-4">{{ currentYear }}- {{ monthNames[currentMonth] }}</h2>

            <v-btn icon @click="nextMonth">
                <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
        </v-row>

        <v-row class="mt-4">
            <v-col v-for="day in daysofMonth" :key="day" cols="3">
                <v-btn @click="openSchedulesDialog(day)" block>
                    {{ formatDate(day) }}
                </v-btn>
            </v-col>
        </v-row>

        <v-dialog v-model="openDialog" max-width="600px">
            <v-card>
                <v-card-title>
                    {{ clientStore.selectedDate }}
                </v-card-title>

                <v-card-text>
                    <v-row>
                        <v-col v-for="schedule in clientStore.schedules" :key="schedule.id" cols="6">
                            <v-btn :color="selectedSchedule?.id===schedule.id ? 'primary' : 'default'"
                            @click="toggleSchedule(schedule)" block>
                                {{ schedule.slot.start }}-{{ schedule.slot.end }}
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-card-text>

                <v-card-actions>
                    <v-btn color="primary" @click="confirm(selectedSchedule.id)">
                        Confirm
                    </v-btn>

                    <v-btn @click="()=>{openDialog=false}">
                        Close
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useClientStore } from '@/stores/client';
import { useRoute } from 'vue-router';
import { format } from 'date-fns';
import { useApoointmentStore } from '@/stores/appointment';

const route=useRoute()
const clientStore=useClientStore()
const currentMonth=ref(new Date().getMonth())
const currentYear=ref(new Date().getFullYear())
const adminId=ref(route.params.adminId)
const openDialog=ref(false)
const selectedSchedule=ref(null)
const appointmentStore=useApoointmentStore()

const formatDate=(date)=>format(new Date(date),"dd MMM")

const monthNames=[
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
]

function prevMonth(){
    if(currentMonth.value===0){
        currentYear.value--
        currentMonth.value=11
    }else{
        currentMonth.value--
    }
}

function nextMonth(){
    if(currentMonth.value===11){
        currentYear.value++
        currentMonth.value=0
    }else{
        currentMonth.value++
    }
}

const daysofMonth=computed(()=>{
    const days=[]
    const daysinMonth=new Date(currentYear.value,currentMonth.value+1,0).getDate()
    for (let day=1;day<=daysinMonth;day++){
        days.push(`${currentYear.value}-${currentMonth.value+1}-${day}`)
    }
    return days
})

async function openSchedulesDialog(date){
    clientStore.selectedDate=date
    await clientStore.getAdminSchedules(adminId.value,date)
    openDialog.value=true
}

function toggleSchedule(schedule){
    selectedSchedule.value=schedule
}

async function confirm(scheduleId){
    if(!scheduleId){
        alert('select a schedule first.')
        return
    }
    await appointmentStore.createAppointment(scheduleId)
    openDialog.value=false
}

</script>