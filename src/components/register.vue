<template>
  <v-container class="d-flex justify-center align-center" style="min-height:100vh ;">
    <v-card class="pa-6" style="min-width: 400px;">

      <v-card-title class="text-center text-h5 font-weight-bold">
        Register
      </v-card-title>

      <v-card-text>

        <v-form ref="form" @submit.prevent="handleRegister">
          <v-text-field v-model="registerForm.name" label="name" variant="outlined" required />
          <v-text-field v-model="registerForm.email" label="email" variant="outlined" required type="email" />
          <v-text-field v-model="registerForm.password" label="password" variant="outlined" required type="password" />
          <v-select v-model="registerForm.role" label="role" :items="['Client','Admin']" variant="outlined" required />
          <v-btn color="primary" block class="mt-4" type="submit">
            register
          </v-btn>
        </v-form>

      </v-card-text>

    </v-card>
  </v-container>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore';

const userStore=useAuthStore()
const{registerForm,register} =userStore

const handleRegister=async ()=>{
  await register(registerForm)
  console.log('register successful')
}
 
</script>

<style>

</style>