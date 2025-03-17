<template>
    <v-card style="box-shadow: 0 2px 10px rgba(0,0,0,0.1);border-radius: 12px;overflow: hidden;" class="mt-4">

        <v-card-title style="background-color: #f5f5f5; padding: 16px;">
                <h3 style="font-family:sans-serif;font-weight: 600;color: #333;">Inactive Users List</h3>
        </v-card-title>

        <v-container>
            <v-responsive>
                <v-data-table style="height: 100%;width: 100%;padding-bottom: 20px;" :items="analyticStore.inactiveUsers" :headers="headers" density="comfortable"
                                class="elevation-2 my-4 px-4 text-center" :items-per-page="5">
                    <template #item.index="{index}">
                        <strong>{{ index+1 }}</strong>
                    </template>

                    <template #item.name="{ item }">
                        <span class="font-weight-medium">{{ item.name }}</span>
                    </template>
                
                    <template #item.lastActivity="{ item }">
                        <v-chip class="text-white" color="blue-darken-2">
                        {{ item.lastActivity }}
                        </v-chip>
                    </template>
                
                </v-data-table>
            </v-responsive>
        </v-container>

    </v-card>
</template>

<script lang="ts" setup>
import { useAnalyticStore } from '@/stores/analytic';
import { onMounted } from 'vue';

const analyticStore=useAnalyticStore()

onMounted(()=>{
    analyticStore.getInactiveUsers()
})

const headers=[
    {title:'#',key:'index',align:'center', sortable: false},
    {title:'Name',key:'name',align:'center', sortable: false},
    {title:'Last Activity',key:'lastActivity',align:'center', sortable: false},
]
</script>