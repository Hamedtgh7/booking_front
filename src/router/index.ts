import { createRouter, createWebHistory } from 'vue-router'
import Register from '@/components/register.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
  ],
})

export default router
