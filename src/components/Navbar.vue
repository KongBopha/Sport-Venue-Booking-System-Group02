<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const navigateTo = (path) => {
  router.push(path)
}
</script>

<template>
  <nav class="bg-white shadow-md px-8 py-4">
    <div class="max-w-7xl mx-auto flex justify-between items-center">
      <!-- Logo / Brand -->
      <div class="text-2xl font-bold text-blue-600 cursor-pointer" @click="navigateTo('/user/home')">
        <img src="@/assets/Navbar/logoName.png" alt="Logo" class="h-8" />
      </div>

      <!-- Navigation Links -->
      <div class="flex gap-6">
        <button @click="navigateTo('/user/home')" class="hover:text-blue-500">Home</button>
        <button @click="navigateTo('/user/booking')" class="hover:text-blue-500">Booking</button>
        <button @click="navigateTo('/user/venue')" class="hover:text-blue-500">Venue</button>
        <button @click="navigateTo('/user/about')" class="hover:text-blue-500">About Us</button>
        <button @click="navigateTo('/user/contact')" class="hover:text-blue-500">Contact Us</button>
      </div>

      <!-- Login Button -->
      <div>
        <button @click="navigateTo('/')" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Log in
        </button>
      </div>
    </div>
  </nav>
</template>
