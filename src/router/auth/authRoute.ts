import Login from '@/components/auth/login.vue';
import Register from '@/components/auth/register.vue';

const authRoute = [
{
    path: '/register',
    name: 'register',
    component: Register,
},
{
    path:'/login',
    name:'login',
    component:Login
}
];


export default authRoute;
