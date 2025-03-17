<template>
        <Sidebar :role="role" />
        <router-view />
</template>

<script setup>
import Sidebar from "@/components/Sidebar.vue"
import { useAuthStore } from '@/stores/auth/index'

const authStore=useAuthStore()
const role=authStore.role


</script>
