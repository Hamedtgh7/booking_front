<template>
  <v-container class="d-flex justify-center align-center" style="min-height:100vh;width: 100vw;">
    <v-card class="pa-6" style="min-width: 400px;">

      <v-card-title class="text-center text-h5 font-weight-bold">
        Register
      </v-card-title>

      <v-card-text>

        <v-form ref="form" @submit.prevent="handleRegister">
          <v-text-field v-model="registerForm.name" label="name" variant="outlined" required />
          <v-text-field v-model="registerForm.email" label="email" variant="outlined" required type="email" />
          <v-text-field v-model="registerForm.password" label="password" variant="outlined" required type="password" />
          <v-btn color="primary" class="mt-4 w-50 mx-auto d-block" type="submit">
            register
          </v-btn>
        </v-form>

        <p class="text-center mt-3">
          Alradey have account?
          <router-link :to="{name:'login'}" class="font-weight-bold text-primary">Login</router-link>
        </p>

      </v-card-text>

    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth/index';
import { useRouter } from 'vue-router'; 

const userStore=useAuthStore()
const{registerForm,register} =userStore
const router=useRouter()

const handleRegister=async ()=>{
  await register(registerForm)
  router.push({name:'login'})
}
 
</script>

<style>
html,body{
  padding: 0;
  height: 100%;
  width: 100%;
  margin: 0
}
</style>