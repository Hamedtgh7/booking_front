<template>
    <v-card class="mt-4 elevation-3 rounded-lg overflow-hidden">
        
      <v-card-title class="bg-grey-lighten-3 py-3 px-4">
        <h3 class="text-h6 font-weight-bold">Daily Rate Reservation</h3>
      </v-card-title>
  
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-card class="pa-4">
              <v-container style="height: 300px;">
                <Line :data="chartData" :options="chartOptions" />
              </v-container>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </template>
  
  <script lang="ts" setup>
  import { useAnalyticStore } from '@/stores/analytic';
  import { computed, onMounted } from 'vue';
  import { Line } from 'vue-chartjs';
  import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js';
  
  ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale);
  
  const analyticStore = useAnalyticStore();
  
  onMounted(() => {
    analyticStore.getDailyRateReservation();
  });
  
  const chartData = computed(() => ({
    labels: analyticStore.dailyRates.map((item) => item.formatted_date),
    datasets: [
      {
        label: 'Fill Rate (%)',
        data: analyticStore.dailyRates.map((item) => item.fillRate),
        borderColor: '#42A5F5',
        backgroundColor: 'rgba(66, 165, 245, 0.2)',
        tension: 0.3,
        pointRadius: 5,
        pointHoverRadius: 7
      }
    ]
  }));
  
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom'
      },
      tooltip: {
        enabled: true,
        mode: 'nearest',
        intersect: false,
        callbacks: {
          title: (tooltipItems: any) => `Date: ${tooltipItems[0].label}`,
          label: (tooltipItem: any) => `Fill Rate: ${tooltipItem.raw}%`
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        suggestedMax: Math.max(...analyticStore.dailyRates.map((item) => item.fillRate)) + 10,
        title: {
          display: true,
          text: 'Fill Rate (%)'
        },
        ticks: {
          padding: 8
        }
      },
      x: {
        ticks: {
          display:false,
          padding: 10
        }
      }
    }
  };
  </script>
  