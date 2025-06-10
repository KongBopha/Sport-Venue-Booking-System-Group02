<template>
  <div class="max-w-lg bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 
              hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer">
    <img :src="image" :alt="altText" class="rounded-t-lg w-full h-[18rem] object-contain" />
    <div class="p-5">
      <span class="block text-2xl text-center font-bold tracking-tight text-gray-900 dark:text-white">{{ altText }}</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  image: {
    type: String,
    required: true
  },
  altText: {
    type: String,
    default: 'Special Cost'
  }
});
</script>

<style scoped>
div:hover {
  box-shadow: 0 8px 20px rgba(0, 150, 136, 0.3);  
}
</style>
