import { slotService } from "@/services/slot";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

interface SlotData {
  id: number;
  start: string;
  end: string;
}

export const useSlotStore = defineStore("slot", () => {
  const slots = ref<SlotData[]>([]);
  const selectedDate=ref<string|null>(null)
  const selectedSlots=ref<number[]>([])

 async function fetchSlots(){
    return await slotService.getSlots().then(response=>{
      slots.value=response.data.data.map((slot)=>({
        id:slot.id,
        start:slot.startTime,
        end:slot.endTime
      }))
    }).catch(error=>{
      console.log('Error',error.response.data)
      slots.value=[]
      return error
    })
 }

 function selectDate(date:string){
    selectedDate.value=date
    selectedSlots.value=[]
 }

 function toggleSlot(slotId:number){
  if(selectedSlots.value.includes(slotId)){
    selectedSlots.value=selectedSlots.value.filter((id)=>id!==slotId)
  }else{
    selectedSlots.value.push(slotId)
  }
 }

  return {
    slots,
    selectedSlots,
    selectedDate,
    fetchSlots,
    selectDate,
    toggleSlot
  };
});
