<template>
   <v-container>
    <v-row v-if="clientStore.admins.length" class="d-flex justify-center">
        <v-col v-for="admin in clientStore.admins" :key="admin.id" cols="12" class="mb-4" >
            <v-card @click="handleAdminClick(admin.id)">
                <v-card-title>
                    {{ admin.name }}
                </v-card-title>
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