<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-50">
    <div class="flex flex-col md:flex-row items-center gap-8">
      
      <!-- Left Image and Welcome Text -->
      <div class="flex flex-col items-center">
        <img src="@/assets/Authen/signin.png" alt="hero" class="w-64 h-64 object-contain" />
        <h1 class="text-2xl font-bold mt-4">Welcome to SportSphere</h1>
      </div>

      <!-- Right Form -->
      <AuthCard>
        <h2 class="text-xl font-semibold mb-6 text-center">Join with Us</h2>
        <form class="flex flex-col gap-4" @submit.prevent="submitForm">
          <div class="flex gap-2">
            <InputField id="firstName" v-model="form.firstName" label="First name" placeholder="Enter first name" />
            <InputField id="lastName" v-model="form.lastName" label="Last name" placeholder="Enter last name" />
          </div>
          <InputField id="email" v-model="form.email" label="Email address" placeholder="Enter email" />
          <InputField id="phone" v-model="form.phone" label="Phone number" placeholder="Enter phone" />
          <InputField id="password" v-model="form.password" type="password" label="Password" placeholder="Enter password" />
          
          <ButtonPrimary>Sign Up</ButtonPrimary>
        </form>
        
        <p class="text-xs text-gray-500 mt-4 text-center">
          By signing up, you agree to SparkFoot’s Term & Condition
        </p>
        <p class="text-sm text-center mt-2">
          Already have account? 
          <a href="/login" class="text-teal-400 font-semibold hover:underline">Log in</a>
        </p>
      </AuthCard>

    </div>
  </div>
</template>

<script setup>
import InputField from '@/components/Authen/InputField.vue'
import ButtonPrimary from '@/components/Authen/ButtonPrimary.vue'
import AuthCard from '@/components/Authen/AuthCard.vue'

import { ref } from 'vue'

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: ''
})

function submitForm() {
  console.log('Form Submitted', form.value)
}
</script>
