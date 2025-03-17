<template>
  <v-card style="box-shadow: 0 2px 10px rgba(0,0,0,0.1);border-radius: 12px;overflow: hidden;" class="mt-4">

    <v-card-title style="background-color: #f5f5f5;padding: 16px;">
      <h3 style="font-family: sans-serif;font-weight: 600;color: #333;">Cancellation Rate</h3>
    </v-card-title>

    
    <v-card-text class="d-flex justify-center align-center" style="height: 200px;">
      <v-progress-circular :model-value="analyticStore.cancelRate.rate" color="red" size="100" width="10">
        <strong class="text-h6">{{ analyticStore.cancelRate.rate.toFixed(1) }}%</strong>
      </v-progress-circular>
    </v-card-text>

  </v-card>
</template>

<script lang="ts" setup>
import { useAnalyticStore } from '@/stores/analytic';
import { onMounted } from 'vue';

const analyticStore=useAnalyticStore()

onMounted(()=>{
  analyticStore.getCancelRate()
})
</script>