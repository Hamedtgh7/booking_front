<template>
  <v-container class="d-flex justify-center align-center mt-4" style="width: 100vw;">

        <v-card class="pa-4 rounded-lg" style="max-height: 700px;overflow-y: auto; width: 100%;">
            <v-card-title class="text-h5 font-weight-bold d-flex align-center">
                <v-icon icon="mdi-calendar-check" class="mr-2" color="primary"></v-icon>
                List of Appointments
            </v-card-title>

            <v-divider class="my-3" />

            <v-row v-if="appointmentStore.appointments.length!==0" dense>
                <v-col v-for="appointment in appointmentStore.appointments" :key="appointment.id"
                    cols="12" md="4">
                    <v-card class="pa-4 rounded-lg elevation-3" hover>

                        <v-card-title class="d-flex align-center">
                            <v-icon  class="mr-1" icon="mdi-account-tie" />
                            <span class="text-subtitle-1 font-weight-bold">{{ appointment.name }}</span>
                        </v-card-title>

                        <v-card-text>
                            <v-divider class="my-2" />

                            <div class="d-flex align-center mb-2">
                                <v-chip :color="statusColor[appointment.status]" class="text-uppercase font-weight-bold">
                                    {{ appointment.status }}
                                </v-chip>
                            </div>

                            <div class="text-body-2 d-flex align-center mb-1">
                                <v-icon class="mr-1" icon="mdi-calendar" />
                                {{ format(new Date(appointment.date),"yyyy/MM/dd") }}
                            </div>

                            <div class="text-body-2 d-flex align-center">
                                <v-icon class="mr-1" icon="mdi-clock-time-four-outline" />
                                <span class="font-weight-medium">{{ appointment.start }}-{{ appointment.end }}</span>
                            </div>

                            <v-select v-model="appointment.status" :items="statusOptions" variant="outlined" density="compact"
                                    label="Change status" @update:model-value="(newStatus)=>updateStatus(appointment.id,newStatus)"
                                    class="mt-3" :disabled="appointment.status === 'canceled' || (!isAdmin && appointment.status === 'confirmed')"/>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>

            <v-alert v-else type="info" class="mt-3">
                No Appointments set.
            </v-alert>
        </v-card>
    </v-container>
</template>

<script setup lang="ts">
import { useApoointmentStore } from '@/stores/appointment';
import { computed, onMounted, ref } from 'vue';
import { format } from 'date-fns';

const appointmentStore=useApoointmentStore()
const isAdmin=ref(false)

const statusColor={
    pending:'warning',
    confirmed:'success',
    canceled:'error'
}

onMounted(()=>{
    appointmentStore.getAppointments()
    isAdmin.value=localStorage.getItem('role')==='admin'
})

const statusOptions= computed(()=>isAdmin.value
    ? ['pending','confirmed','canceled']
    : ['pending','canceled']
)

const updateStatus =async(id,status)=>{
    await appointmentStore.changeStatus(id,status)
}
</script>