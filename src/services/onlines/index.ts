import api from "@/plugins/api";

export const onlineUsersService={
    async get(){
        return await api.get('/online-users')
    },
} 