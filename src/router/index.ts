import { createRouter, createWebHistory } from 'vue-router'
import registerRoute from './auth/registerRoute'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      ...registerRoute
    },
  ],
})

export default router
