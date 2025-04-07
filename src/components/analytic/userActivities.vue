<template>
    <v-card style="box-shadow: 0 2px 10px rgba(0,0,0,0.1);border-radius: 12px;overflow: hidden;" class="mt-4">

        <v-card-title style="background-color: #f5f5f5; padding: 16px;">
            <h3 style="font-family:sans-serif;font-weight: 600;color: #333;">User Activties Log</h3>
        </v-card-title>

        <v-container>
            <v-responsive>
                <v-data-table style="height: 100%;width: 100%;padding-bottom: 20px;"  :headers="headers" 
                                class="elevation-2 my-4 px-4"  :items="analyticStore.activities" density="comfortable"
                                :disable-pagination="true"  hide-default-footer>
                    
                    <template #item.description="{ item }">
                        <span class="font-weight-medium">{{ item.description }}</span>
                    </template>
                
                    <template #item.created_at="{ item }">
                            {{ item.created_at }}
                    </template>
                </v-data-table>

                
            </v-responsive>

            <div class="d-flex justify-center align-center mt-6 gap-4">
                    <v-btn color="primary" variant="outlined" rounded="lg" size="small" :disabled="analyticStore.currentActivitiesPage===1" 
                    @click="changePage(analyticStore.currentActivitiesPage-1)"
                    >
                        <v-icon start icon="mdi-chevron-left" />
                        Previous
                    </v-btn>

                    <span class="mx-4" style="font-size: 0.9rem; color: #555;">
                        Page <strong>{{ analyticStore.currentActivitiesPage }}</strong> of <strong>{{ analyticStore.totalActivitiesPages }}</strong></span>

                    <v-btn color="primary" variant="outlined" rounded="lg"
                        size="small" :disabled="analyticStore.currentActivitiesPage===analyticStore.totalActivitiesPages"
                            @click="changePage(analyticStore.currentActivitiesPage+1)"
                    >
                        Next
                        <v-icon end icon="mdi-chevron-right" />
                    </v-btn>

                </div>
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

const changePage=(page:number)=>{
    if (page>=1 && page<=analyticStore.totalActivitiesPages){
        analyticStore.currentActivitiesPage=page
        analyticStore.getUserActivity(page)
    }
}
</script>