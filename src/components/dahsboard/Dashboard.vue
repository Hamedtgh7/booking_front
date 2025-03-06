<template>
    <v-app>
        <Sidebar :role="role" />

        <v-main>
            <router-view />
        </v-main>
    </v-app>

</template>

<script setup>
import Sidebar from "@/components/Sidebar.vue"
import { useAuthStore } from '@/stores/auth/index'

const authStore=useAuthStore()
const role=authStore.role


</script>
