<template>
    
    <v-navigation-drawer app width="250" elevation="4" style="position: fixed; left: 0;">

        <v-row class="pa-4 align-center justify-Space-between">
            <v-col>
                <div class="font-weight-bold">{{ name }}</div>
                <div class="text-body-2">{{ role }}</div>
            </v-col>

            <v-col class="text-right">
                <v-btn icon class="mdi mdi-logout" @click="logout" /> 
            </v-col>
        </v-row>

        <v-list>
            <v-list-item v-for="item in sidebarItems" :key="item.route" link @click="clicker(item.route)">
                    <v-list-item-title>
                        {{ item.title }}
                    </v-list-item-title>
            </v-list-item>
        </v-list>

    </v-navigation-drawer>
</template>

<script setup>
import router from '@/router';
import { computed } from 'vue';
import { useAuthStore } from '@/stores/auth';

const authStore=useAuthStore()
const name=localStorage.getItem('name')

const props=defineProps({
    role:String
})

const sidebarItems=computed(()=>{
    return props.role ==='admin' ?
        [
            {'title':"Add meeting time",route:{'name':'slots'}},
            {'title':'Appointments',route:{'name':'appointment'}},
        ] :
        [
            {'title':'Schedules',route:{'name':'admins'}},
            {'title':'Appointments',route:{'name':'appointment'}},
            {'title':'Notifications',route:{'name':'notification'}}
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
