<template>
    <div class="flex flex-col">
      <label :for="id" class="mb-1 text-sm text-gray-600">{{ label }}</label>
      <input
        :id="id"
        :type="type"
        :placeholder="placeholder"
        v-model="modelValue"
        class="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
      />
    </div>
  </template>
  
  <script setup>
  defineProps({
    id: String,
    label: String,
    placeholder: String,
    type: { type: String, default: "text" },
    modelValue: String
  })
  defineEmits(['update:modelValue'])
  </script>
  