<template>
  <v-container class="d-flex justify-center align-center mt-4" style="width: 100vw;">
    <v-card elevation="3">
            <v-card-title class="d-flex justify-space-between align-center px-4">
                <span class="text-h6 font-weight-bold">Notifications</span>
                <v-btn icon @click="notificationStore.getNotifications()" variant="text">
                    <v-icon size="24">mdi-refresh</v-icon>
                </v-btn>
            </v-card-title>

            <v-divider />

            <v-card-text class="py-2">
                <v-list v-if="notificationStore.notifications.length > 0" class="py-0">
        
                    <v-list-item v-for="(notification,index) in notificationStore.notifications" :key="notification.id"
                                :class="{ 'bg-yellow-lighten-4': !notification.read_at }"
                                @click="openDialog(notification)">

                                <template v-slot:propend>
                                    <v-icon :color="notification.read_at ? 'grey' : 'red'" size="24">
                                        {{ notification.read_at ? 'mdi-bell-check' : 'mdi-bell-ring' }}
                                    </v-icon>
                                </template>

                        <v-list-item-title class="font-weight-medium text-body-1">
                            {{ notification.title }}
                        </v-list-item-title>
                        <v-list-item-subtitle class="text-body-2 text-grey-darken-1">
                            {{ notification.message }}
                        </v-list-item-subtitle>

                        <template v-slot:append>
                            <v-chip v-if="notification.read_at" size="small" color="blue-lighten-2" label>
                                Read
                            </v-chip>

                            <v-hover v-if="!notification.read_at" v-slot:default="{isHovering}">
                                <v-btn icon size="small" :color="isHovering ? 'blue-darken-2' : 'blue'"
                                    @click="notificationStore.markAsRead(notification.id)"> 
                                <v-icon>
                                    mdi-eye-check-outline
                                </v-icon>
                            </v-btn>
                            </v-hover>
                            
                        </template>
                        <v-divider v-if="index !== notificationStore.notifications.length - 1"></v-divider>

                    </v-list-item>
                </v-list>

                <v-alert v-else type="info" variant="tonal" class="text-center"> No notifications</v-alert>
            </v-card-text>
        </v-card>

        <v-dialog v-model="dialog">
            <v-card>
                <v-card-title class="text-h6 font-weight-bold">
                    {{ selectedNotification?.title }}
                </v-card-title>

                <v-divider />

                <v-card-text class="text-body-1">
                    {{ selectedNotification.message }}
                </v-card-text>

                <v-divider />

                <v-card-actions class="d-flex justify-end">
                    <v-btn color="blue-darken-1" variant="text" @click="dialog=false">
                        Close
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </v-container>
</template>

<script setup>
import { useNotificationStore } from '@/stores/notification';
import { onMounted, ref } from 'vue';

const notificationStore = useNotificationStore();
const dialog=ref(false)
const selectedNotification=ref(null)


onMounted(() => {
    notificationStore.getNotifications();
});

const openDialog=(notification)=>{
    selectedNotification.value=notification
    dialog.value=true

    if(!notification.read_at){
        notification.markAsRead(notification.id)
    }
}
</script>

<style scoped>

</style>

<style scoped>
.bg-yellow-lighten-4 {
  background-color: #fff3cd !important;
}
</style>