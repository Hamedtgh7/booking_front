import BaseAnanlyticView from "@/components/analytic/baseAnanlyticView.vue";
import Appointment from "@/components/appointment/appointment.vue";
import Admins from "@/components/client/Admins.vue";
import Schedule from "@/components/client/Schedule.vue";
import Dashboard from "@/components/dashboard/Dashboard.vue";
import Notification from "@/components/notification/notification.vue";
import Slots from "@/components/slot/slots.vue";
import { useAuthStore } from "@/stores/auth";

const authGuard=(role)=>(to,from,next)=>{
    const authStore=useAuthStore()
    if (authStore.role===role){
        next()
    }else{
        authStore.logout()
        next({'name':'login'})
    }
}

const dashboardRoute=[
    {
        path:'/dashboard',
        name:'dashboard',
        component:Dashboard,
        children:[
            {
                path:'/slots',
                name:'slots',
                component:Slots,
                beforeEnter:authGuard('admin')
            },
            {
                path:'/users/get-admins-list',
                name:'admins',
                component:Admins,
                beforeEnter:authGuard('client')
            },
            {
                path:'/users/get-admins-list/:adminId/schedule',
                name:'schedule',
                component:Schedule,
                beforeEnter:authGuard('client')
            },
            {
                path:'/appointments',
                name:'appointment',
                component:Appointment
            },
            {
                path:'/notifications',
                name:'notification',
                component:Notification
            },
            {
                path:'/analytic',
                name:'analytic',
                component:BaseAnanlyticView
            }
        ]
    }
]

export default dashboardRoute