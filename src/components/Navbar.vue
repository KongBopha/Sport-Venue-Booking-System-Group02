<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const navigateToHome = () => {
  router.push('/user/home');
};

const navigateToBooking = () => {
  router.push('/user/booking');
};

const navigateToVenue = () => {
  router.push('/user/venue'); // Ensure the route is correctly spelled in your router setup
};

const navigateToAboutUs = () => {
  router.push('/user/about');
};

const navigateToContactUs = () => {
  router.push('/user/contact');
};

const navigateToLogin = () => {
  router.push('/');
};
</script>

<template>
    <div class="flex justify-center">
      <div class="flex flex-row justify-between w-[80%] bg-slate-300">
        <button @click="navigateToHome" class="button">Home</button>
        <button @click="navigateToBooking" class="button">Booking</button>
        <button @click="navigateToVenue" class="button">Venue</button>
        <button @click="navigateToAboutUs" class="button">About Us</button>
        <button @click="navigateToContactUs" class="button">Contact Us</button>
        <button @click="navigateToLogin" class="button">Log in</button>
      </div>
    </div>
</template>