<template>
    <v-container  style="min-height:100vh;width: 450px">
        <v-card>
            <v-card-title>Notifications</v-card-title>
            <v-card-text>
                <v-list>
                    <v-list-item v-if="notificationStore.notifications.length === 0">
                        <v-list-item-title>No notifications</v-list-item-title>
                    </v-list-item>
                    <v-list-item v-for="(notification, index) in notificationStore.notifications" :key="index">
                        <v-list-item-title>
                            {{ notification.title }}
                        </v-list-item-title>
                        <v-list-item-subtitle style="white-space: normal; word-wrap: break-word; overflow-wrap: break-word;">
                            {{ notification.message }}
                        </v-list-item-subtitle>
                    </v-list-item>
                </v-list>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script setup>
import { useNotificationStore } from '@/stores/notification';
import { onMounted } from 'vue';

const notificationStore = useNotificationStore();

onMounted(() => {
    notificationStore.getNotifications();
});
</script>

<style scoped>

</style>
