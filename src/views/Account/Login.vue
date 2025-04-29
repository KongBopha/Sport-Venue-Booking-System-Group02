<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const navigateToHome = () => {
  router.push('/user/home');
};
</script>
<template>
    <div class="text-xl text-red-600 mt-10 text-center">Log in page</div>
    <div class="flex justify-center items-center min-h-screen">
        <button class="text-xl text-red-600 px-4 py-2 rounded bg-blue-500 hover:bg-blue-700 transition-colors" @click="navigateToHome">Go to Home</button>
    </div>
</template>
