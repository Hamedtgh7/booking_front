<template>
    
    <v-navigation-drawer app width="300" elevation="4" style="position: fixed; left: 0;border-right: 1px solid #E0E0E0;">

        <v-row class="pa-4 align-center">
            <v-col class="d-flex align-center">
                <div>
                <div class="font-weight-bold">Welcome {{ name }}</div>
                <div class="text-body-2">Role: {{ role }}</div>
            </div>
            </v-col>

            <v-col class="text-right">
                <v-btn icon class="mdi mdi-logout" @click="logout" color="#616161" /> 
            </v-col>
        </v-row>

        <v-divider class="my-3"></v-divider>

        <v-list>
            <v-list-item v-for="item in sidebarItems" :key="item.route" link @click="clicker(item.route)"
                            :class="{'selected-item':currentRoute===item.route.name}">
                    
                    <v-list-item-title style="font-weight: 500;font-size: 14px;">
                        <v-icon>{{ item.icon }}</v-icon>
                        {{ item.title }}
                    </v-list-item-title>
            </v-list-item>
        </v-list>

    </v-navigation-drawer>
</template>

<script setup>
import router from '@/router';
import { computed, ref, watchEffect } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRoute } from 'vue-router';

const authStore=useAuthStore()
const name=localStorage.getItem('name')
const route=useRoute()

const props=defineProps({
    role:String
})

const currentRoute=ref(route.name)

watchEffect(()=>{
    currentRoute.value=route.name
})

const sidebarItems=computed(()=>{
    return props.role ==='admin' ?
        [
            {'title':"Add meeting time",route:{'name':'slots'},icon:'mdi-calendar-plus'},
            {'title':'Appointments',route:{'name':'appointment'},icon:'mdi-calendar-check'},
        ] :
        [
            {'title':'Schedules',route:{'name':'admins'},icon:'mdi-calendar-clock'},
            {'title':'Appointments',route:{'name':'appointment'},icon:'mdi-calendar-edit'},
            {'title':'Notifications',route:{'name':'notification'},icon:'mdi-bell'}
        ]
})

const clicker=(route)=>{
    router.push(route)
}

const logout= async()=>{
    await authStore.logout()
    router.push({'name':'login'})
}
</script>

<style scoped>
.selected-item{
    background-color: #E3F2FD;
    color:  #1565C0;
    border-radius: 8px;
}
</style>