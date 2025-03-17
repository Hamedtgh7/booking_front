<template>
  <v-container class="d-flex justify-center align-center mt-4" style="width: 100vw;">
    <v-row class="w-full align-center justify-center" style="height:100%">
      
      <v-col cols="12">
        <PopularTimes />
      </v-col>
      
      <v-row class="w-full align-center justify-center">
        <v-col cols="12" md="6">
          <CancellatinRate />
        </v-col>
        <v-col cols="12" md="6">
          <TopClients />
        </v-col>
      </v-row>

      <v-col cols="12">
        <DailyRateReservation />
      </v-col>

      <v-row class="w-full align-center justify-center">
        <v-col cols="12" md="6">
          <TopCancellationClients />
        </v-col>
        <v-col cols="12" md="6">
          <InactiveUsers />
        </v-col>
      </v-row>

      <v-col cols="12">
        <Activities />
      </v-col>

    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import PopularTimes from '@/components/analytic/popularTimes.vue'
import CancellatinRate from '@/components/analytic/cancellationRate.vue'
import TopClients from '@/components/analytic/topClients.vue'
import DailyRateReservation from '@/components/analytic/dailyRateReservation.vue'
import TopCancellationClients from '@/components/analytic/topCancellationClient.vue'
import InactiveUsers from '@/components/analytic/inactiveUsers.vue'
import Activities from '@/components/analytic/userActivities.vue'
</script>
