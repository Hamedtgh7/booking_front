<script lang="ts" setup>
import echo from '@/echo.js'
import { onMounted, onUnmounted, ref } from 'vue';

interface User{
    id:number;
    name:string
}

const onlineUsers=ref<User[]>([])

onMounted(()=>{
    const channel= echo.join('online.users').here((users:User[])=>{
        onlineUsers.value=users
    })
    .joining((user:User)=>{
        onlineUsers.value.push(user)
    })
    .leaving((user:User)=>{
        onlineUsers.value=onlineUsers.value.filter(u=> u.id!==user.id)
    })
})

onUnmounted(()=>{
        echo.leave('online.users')
    })
</script>

<template>
    <v-container class="d-flex align-center mt-4" style="width: 100vw;">
        <v-card elevation="3" width="100%" class="mr-4">
            <v-card-title class="text-h5 font-weight-bold">
                Online members
            </v-card-title>

            <v-divider />

            <v-list>
                <v-list-item v-for="user in onlineUsers" :key="user.id" style="padding: 10px;border-bottom: 1px solid #ddd;">
                    <v-list-item-title style="font-size: 16px; font-weight: 500;">
                        {{ user.name }}
                    </v-list-item-title>
                </v-list-item>
            </v-list>
        </v-card>
    </v-container>
</template>