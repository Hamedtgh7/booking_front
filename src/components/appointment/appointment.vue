<template>
    <v-container>

        <v-card class="pa-4">
            <v-card-title class="text-h5 font-weight-bold">
                List of Appointments
            </v-card-title>

            <v-divider class="my-3" />

            <v-row dense>
                <v-col v-for="appointment in appointmentStore.appointments" :key="appointment.id"
                    cols="12">
                    <v-card class="pa-3" elevation="3">

                        <v-card-title>
                            <v-icon  class="mr-1" icon="mdi-account-tie" />
                            {{ appointment.name }}
                        </v-card-title>

                        <v-card-text>
                            <v-chip :color="statusColor[appointment.status]" class="mb-2">
                                {{ appointment.status }}
                            </v-chip>

                            <p>
                                <v-icon class="mr-1" icon="mdi-calendar" />
                                {{ format(new Date(appointment.date),"yyyy/MM/dd") }}
                            </p>

                            <p class="m-0" style="font-size: 14px;" color="#555">
                                <v-icon class="mr-1" icon="mdi-clock-time-four-outline" />
                                {{ appointment.start }}-{{ appointment.end }}
                            </p>

                            <v-select v-if="isAdmin" v-model="appointment.status" :items="statusOptions"
                                    label="Change status" @update:model-value="(newStatus)=>updateStatus(appointment.id,newStatus)"
                                    class="mt-2"/>
                        </v-card-text>

                    </v-card>
                </v-col>
            </v-row>

            <v-alert v-if="appointmentStore.appointments.length===0" type="info" class="mt-3">
                No Appointments sets.
            </v-alert>
        </v-card>
    </v-container>
</template>

<script setup>
import { useApoointmentStore } from '@/stores/appointment';
import { onMounted, ref } from 'vue';
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

const statusOptions=[
    'pending','confirmed','canceled'
]

const updateStatus =async(id,status)=>{
    await appointmentStore.changeStatus(id,status)
}
</script>