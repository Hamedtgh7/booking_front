<template>
  <v-container class="d-flex justify-center align-center" style="width: 100vw;">


    <v-progress-circular v-if="clientStore.admins.length===0" indeterminate color="primary"/>

    <v-row v-else class="d-flex justify-center">
        <v-col cols="12" class="text-center mb-4">
            <h3 class="font-weight-bold text-h4">List of Admins</h3>
            <v-divider />
        </v-col>
        
        <v-col v-for="admin in clientStore.admins" :key="admin.id" cols="12" md="4" class="mb-4" >
            <v-card class="rounded-lg elevation-2" hover @click="handleAdminClick(admin.id)">

                <v-card-title class="d-flex align-center justify-space-between">
                    <span class="font-weight-bold">{{ admin.name }}</span>
                </v-card-title>

                <v-card-subtitle class="text-body-2">
                    <span class="grey--text">Tap to view schedule</span>
                </v-card-subtitle>
            </v-card>
        </v-col>
    </v-row>
   </v-container>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { useClientStore } from '@/stores/client';
import { useRouter } from 'vue-router';

const clientStore=useClientStore()
const router=useRouter()

onMounted(()=>{
    clientStore.fetchAdmins()
})

function handleAdminClick(adminId:number){
    router.push({'name':'schedule',params:{adminId:adminId}})
}

</script>

<style scoped>

.v-card:hover {
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  transform: translateY(-5px);
}
</style>