<template>
  <v-container class="d-flex justify-center align-center" style="min-height:100vh;width: 100vw;">

    

    <v-row class="mt-4" no-gutters>

      <v-container>
        <v-row class="justify-center align-center" no-gutters>
          <v-btn icon @click="prevMonth" class="mx-2" rounded v-if="isPreviewMode">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>

          <h2 class="mx-4">{{ currentYear }} -{{ monthNames[currentMonth] }}</h2>

          <v-btn icon @click="nextMonth" class="mx-2" rounded>
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-row>
      </v-container>

      <v-col v-for="day in daysofMonth" :key="day" cols="3" class="mb-4">
        <v-card @click="openSlotDialog(day)" block class="elevation-2 rounded-lg hoverable">
          <v-card-title class="d-flex justify-center align-center">
            {{ formatDate(day) }}
          </v-card-title>
          
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="openDialog" max-width="600px">
      <v-card>
        <v-card-title class="d-flex justify-between align-center">
          <span>{{ scheduleStore.selectedDate }}</span>
        </v-card-title>

        <v-card-text>
          <v-row>
            <v-col v-for="schedule in scheduleStore.schedules" :key="schedule.id" cols="6" class="mb-3">
              <v-btn :color="scheduleStore.selectedSchedules.includes(schedule.id) ? 'green' : 'grey'"
              @click="handleSlotClick(schedule)"
              block>
                {{ schedule.slot.startTime }}-{{ schedule.slot.endTime }}
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-btn @click="()=>{openDialog=false}">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="removeDialog" max-width="400px">
      <v-card>
        <v-card-title class="text-h6">
          Delete schedule
        </v-card-title>

        <v-card-text>
          Are You want to delete this schedule?
        </v-card-text>

        <v-card-actions>
          <v-btn color="red" @click="deleteSchedule">
            Delete
          </v-btn>
          <v-btn @click="removeDialog=false">
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-container>
</template>

<script setup>
import { format } from 'date-fns'
import { computed, ref } from 'vue'
import { useScheduleStore } from '@/stores/schedule'

const scheduleStore=useScheduleStore()

const currentYear=ref(new Date().getFullYear())
const currentMonth=ref(new Date().getMonth())
const openDialog=ref(false)
const removeDialog=ref(false)
const selectedSchedule=ref(null)

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
  for (let day=1; day<=daysinMonth;day++){
    days.push(`${currentYear.value}-${currentMonth.value+1}-${day}`)
  }
  return days
})

const formatDate=(date)=>format(new Date(date),"dd MMM")

async function openSlotDialog(date){
  scheduleStore.selectDate(date)
  await scheduleStore.fetchSchedules(date)
  openDialog.value=true
}

function handleSlotClick(schedule){
  selectedSchedule.value=schedule.id
  removeDialog.value=true
}

async function deleteSchedule(){
  await scheduleStore.removeReservation(selectedSchedule.value)
  await scheduleStore.fetchSchedules(scheduleStore.selectedDate)
  selectedSchedule.value=null
  removeDialog.value=false
}

const isPreviewMode=computed(()=>{
    const current=new Date()

    const prevMonthDate=new Date(currentYear.value,currentMonth.value)
    return prevMonthDate>current
})
</script>
