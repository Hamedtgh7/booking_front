<template>
  <v-container class="d-flex justify-center align-center" style="min-height:100vh;width: 100vw;">
    <v-card class="pa-6" style="min-width: 400px;">
  
      <v-card-title class="text-center text-h5 font-weight-bold">
        Login
      </v-card-title>
  
      <v-card-text>
  
        <v-form ref="form" @submit.prevent="handleLogin">
          <v-text-field v-model="loginForm.email" label="email" variant="outlined" required type="email" />
          <v-text-field v-model="loginForm.password" label="password" variant="outlined" required type="password" />
          <v-btn color="primary" class="mt-4 w-50 mx-auto d-block" type="submit">
            login
          </v-btn>
        </v-form>

        <p class="text-center mt-3">
          Don't have as account?
          <router-link :to="{name:'register'}" class="font-weight-bold text-primary">Register</router-link>
        </p>
  
      </v-card-text>
    </v-card>

    <v-alert v-if="errorMessage" type="error" style="position: fixed; top:20px;right: 20px;z-index: 9999; max-width: 300px;" dense>
      {{ errorMessage }}
    </v-alert>
  </v-container>
</template>
  
<script setup lang="ts">
import { useAuthStore } from '@/stores/auth/index';
import router from '@/router';
import { ref } from 'vue';
  
const userStore=useAuthStore()
const{loginForm,login} =userStore
const errorMessage=ref('')


const handleLogin=async ()=>{
  const response= await login({...loginForm})
  
  if (response.errorResponse){
    errorMessage.value=response.message
  } else{
    errorMessage.value=''
    router.push({'name':'dashboard'})
  }
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