import { createRouter, createWebHistory } from 'vue-router'
import authRoute from './auth/authRoute'
import dashboardRoute from './dahsboard/dashboardRoute'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path:'/',
      redirect:(to)=>{
        const token=localStorage.getItem('token')
        return token ? {'name':'dashboard'} :{'name':'login'}
      }
    },
      ...authRoute,
      ...dashboardRoute,
    ],
})

router.beforeEach((to,from,next)=>{
  const token=localStorage.getItem('token')

  if(token && (to.name==='login'|| to.name==='register')){
    next({'name':'dashboard'})
  }
  else if (to.meta.requiresAuth && !token){
    next({'name':'login'})
  }else{
    next()
  }
})

export default router
