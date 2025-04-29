<template>
    <button
      class="bg-teal-400 text-white py-2 px-4 rounded-md hover:bg-teal-500 transition"
      @click="onClick"
    >
      <slot />
    </button>
  </template>
  
  <script setup>
  defineProps({
    onClick: Function
  })
  </script>
  