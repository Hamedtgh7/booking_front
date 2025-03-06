<template>
  <v-container>

    <v-row class="justify-center align-center">
      <v-btn icon @click="prevMonth">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>

      <h2 class="mx-4">{{ currentYear }} -{{ monthNames[currentMonth.value] }}</h2>

      <v-btn icon @click="nextMonth">
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </v-row>

    <v-row class="mt-4">
      <v-col v-for="day in daysofMonth" :key="day" cols="3">
        <v-btn @click="openSlotDialog(day)" block>
          {{ formatDate(day) }}
        </v-btn>
      </v-col>
    </v-row>

    <v-dialog v-model="openDialog" max-width="600px">
      <v-card>
        <v-card-title>
          {{ slotStore.selectedDate }}
        </v-card-title>

        <v-card-text>
          <v-row>
            <v-col v-for="slot in slotStore.slots" :key="slot.id" cols="6">
              <v-btn :color="slot.isreserved ? 'red' : slotStore.selectedSlots.includes(slot.id) ? 'green' : 'grey'"
              @click="handleSlotClick(slot)"
              block>
                {{ slot.start }}-{{ slot.end }}
                <div v-if="slot.isreserved" class="ml-2" style="font-size: 12px;color: white;">(Was Set)</div>
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-btn color="primary" @click="confirmSLots">
          Confirm
          </v-btn>

          <v-btn @click="()=>{openDialog=false}">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="removeDialog" max-width="600px">
      <v-card>
        <v-card-title>
          Delete Reservation
        </v-card-title>

        <v-card-text>
          Are you want to delete this reservation?
        </v-card-text>

        <v-card-actions>
          <v-btn color="red" @click="removeReservation">Delete</v-btn>
          <v-btn @click="()=>{selectedSchedule.value=null;removeDialog.value=false;}">Cancel</v-btn>
        </v-card-actions>
      </v-card>

    </v-dialog>

  </v-container>
</template>

<script setup>
import { format } from 'date-fns'
import { computed, ref } from 'vue'
import { useSlotStore } from '@/stores/slot'
import { useScheduleStore } from '@/stores/schedule'

const slotStore=useSlotStore()
const scheduleStore=useScheduleStore()

const currentYear=ref(new Date().getFullYear())
const currentMonth=ref(new Date().getMonth())
const openDialog=ref(false)
const selectedSchedule=ref(null)
const removeDialog=ref(false)

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
  slotStore.selectDate(date)

  await slotStore.fetchSlots()
  

  const reservedSchedules=await scheduleStore.getSchedulesofDay(date)
  // const resercedSlotIds=reservedSchedules.map(schedule=>schedule.slotId)

  // slotStore.slots=slotStore.slots.filter(slot=>!resercedSlotIds.includes(slot.id))
  // slotStore.slots.forEach(slot=>{
  //   slot.isreserved=resercedSlotIds.includes(slot.id)
  // })
  slotStore.slots.forEach(slot=>{
    const foundSchedule=reservedSchedules.find(schedule=>schedule.slotId===slot.id)
    if(foundSchedule){
      slot.isreserved=true
      slot.scheduleId=foundSchedule.id
    }else{
      slot.isreserved=false
      slot.scheduleId=null
    }
  })
  openDialog.value=true
}

async function confirmSLots(){
  await scheduleStore.createSchedules({date:slotStore.selectedDate,slots:slotStore.selectedSlots})
  openDialog.value=false
}

function handleSlotClick(slot){
  if (slot.isreserved){
    selectedSchedule.value=slot.scheduleId
    removeDialog.value=true
  }else{
    slotStore.toggleSlot(slot.id)
  }
}

async function removeReservation(){
  await scheduleStore.removeReservation(selectedSchedule.value)
  await slotStore.fetchSlots()
  selectedSchedule.value=null
  removeDialog.value=false
}
</script>
