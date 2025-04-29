<template>
  <div class="w-80 h-72 flex flex-col items-center justify-center
              bg-white rounded-2xl shadow-md hover:shadow-2xl 
              hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer">
    <img :src="image" :alt="altText" class="h-32 object-contain" />
    <span class="mt-4 text-lg font-semibold text-gray-700">{{ altText }}</span>
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
