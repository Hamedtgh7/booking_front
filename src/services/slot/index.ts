import api from "@/plugins/api";

export const slotService={
    async getSlots(){
        return await api.get('slots')
    }
}