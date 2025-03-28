<template>
    <v-card style="box-shadow: 0 2px 10px rgba(0,0,0,0.1);border-radius: 12px;overflow: hidden;" class="mt-4">

        <v-card-title style="background-color: #f5f5f5; padding: 16px;">
            <h3 style="font-family:sans-serif;font-weight: 600;color: #333;">User Activties Log</h3>
        </v-card-title>

        <v-container>
            <v-responsive>
                <v-data-table style="height: 100%;width: 100%;padding-bottom: 20px;" :items="analyticStore.activities" :headers="headers" density="comfortable"
                                class="elevation-2 my-4 px-4"  v-model="analyticStore.currentActivitiesPage" :page-count="analyticStore.totalActivitiesPages"
                                @update:page="(page)=>analyticStore.getUserActivity(page)" :items-per-page="10">
                    
                    <template #item.description="{ item }">
                        <span class="font-weight-medium">{{ item.description }}</span>
                    </template>
                
                    <template #item.created_at="{ item }">
                            {{ item.created_at }}
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
    analyticStore.getUserActivity()
})

const headers=[
    {title:'Description Name',key:'description',align:'start', sortable: false},
    {title:'Date',key:'created_at',align:'center', sortable: false},
]
</script>