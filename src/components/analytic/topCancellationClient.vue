<template>
    <v-card style="box-shadow: 0 2px 10px rgba(0,0,0,0.1);border-radius: 12px;overflow: hidden;" class="mt-4">

        <v-card-title style="background-color: #f5f5f5; padding: 16px;">
            <h3 style="font-family:sans-serif;font-weight: 600;color: #333;">Top Cancellation Clients</h3>
        </v-card-title>

        <v-container>
            <v-responsive>
                <v-data-table style="height:100% ;width: 100%;" :items="analyticStore.topCanceledClients" :headers="headers" density="comfortable"
                                class="elevation-2 my-4 px-4 text-center" hide-default-footer>
                    <template #item.index="{index}">
                        <strong>{{ index+1 }}</strong>
                    </template>

                    <template #item.name="{ item }">
                        <span class="font-weight-medium">{{ item.name }}</span>
                    </template>
                
                    <template #item.cacnceledCount="{ item }">
                        <v-chip class="text-white" color="blue-darken-2">
                        {{ item.cacnceledCount }}
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
    analyticStore.getTopCanceledClients()
})

const headers=[
    {title:'#',key:'index',align:'center', sortable: false},
    {title:'Client Name',key:'name',align:'center', sortable: false},
    {title:'Cancellation',key:'cacnceledCount',align:'center', sortable: false},
]
</script>