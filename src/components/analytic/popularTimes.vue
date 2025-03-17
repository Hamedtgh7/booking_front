<template>
  <v-container >
    <v-row>

      <v-col cols="12" md="6">
        <v-card style="box-shadow: 0 2px 10px rgba(0,0,0,0.1); border-radius: 12px; overflow: hidden; height: 400px;">

          <v-card-title style="background-color: #f5f5f5; padding: 16px;">
            <h3 style="font-family:sans-serif;font-weight: 600;color: #333;">The Most Popular Times (Count)</h3>
          </v-card-title>

          <v-card-text style="height: 100%;">
            <Bar :data="barData" :options="chartOptions" class="chart" />
          </v-card-text>

        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card style="box-shadow: 0 2px 10px rgba(0,0,0,0.1); border-radius: 12px; overflow: hidden; height: 400px;">

          <v-card-title style="background-color: #f5f5f5; padding: 16px;">
            <h3 style="font-family:sans-serif;font-weight: 600;color: #333;">The Most Popular Times (Percentage)</h3>
          </v-card-title>

          <v-card-text style="height: 100%; padding: 16px;">
            <Bar :data="percentageBarData" :options="chartOptions" class="chart" />
          </v-card-text>

        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { useAnalyticStore } from '@/stores/analytic';
import { computed, onMounted } from 'vue';
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const analyticStore = useAnalyticStore();

onMounted(() => {
analyticStore.getPopularSlots()
});

const barData = computed(() => ({
labels: analyticStore.popularSlots.map((slot) => `${slot.startTime}-${slot.endTime}`),
datasets: [
  {
    label: 'Number of Reservations',
    data: analyticStore.popularSlots.map((slot) => slot.totalBooking),
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    borderColor: '#388E3C',
    borderWidth: 2,
  },
],
}));

const percentageBarData = computed(() => ({
labels: analyticStore.popularSlots.map((slot) => `${slot.startTime}-${slot.endTime}`),
datasets: [
  {
    label: 'Popularity Percentage',
    data: analyticStore.popularSlots.map((slot) => slot.popularity_percentage),
    backgroundColor: '#FF9800',
    borderRadius: 8,
    borderColor: '#E65100',
    borderWidth: 2,
  },
],
}));

const chartOptions = computed(() => ({
responsive: true,
maintainAspectRatio: false,

plugins: {
  legend: {
    display: true,
    position: 'bottom',
    labels: {
      font: {
        size: 14,
        family: "'Roboto',sans-serif"
      },
      padding: 20
    }
  },
  tooltip: {
    enabled: true,
    backgroundColor: '#333',
    titleColor: '#fff',
    bodyColor: '#fff',
    bodyFont: {
      size: 14,
      family: "'Roboto',sans-serif"
    },
    padding: 10,
    displayColors: false
  },
},

scales: {
  x: {
    type: 'category',
    grid: {
      display: false
    },
    title: {
      display: true,
      text: 'Time Slots',
      font: {
        size: 16,
        family: "'Roboto',sans-serif"
      },
      padding: 10
    },
    ticks: {
      autoSkip: true,
      padding: 4
    }
  },

  y: {
    type: 'linear',
    grid: {
      color: '#ddd',
      lineWidth: 1,
      borderDash: [5, 5]
    },
    beginAtZero: true,
    title: {
      display: true,
      text: 'Value',
      font: {
        size: 16,
        family: "'Roboto',sans-serif"
      },
      padding: 0
    },
    ticks: {
      stepSize: 5,
      padding: 4
    }
  }
}
}));
</script>
