<template>
  <div class="flex flex-col items-center">
    <img :src="imgSrc" :alt="altText" class="w-62 h-52 object-contain mb-4" />
    <p class="text-gray-700 font-semibold">{{ label }}</p>
  </div>
</template>

<script setup>
defineProps({
  imgSrc: String,
  altText: String,
  label: String
})
</script>
