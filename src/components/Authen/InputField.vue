<script setup>
const props = defineProps({
  modelValue: [String, Number],
  id: String,
  label: String,
  placeholder: String,
  type: {
    type: String,
    default: 'text'
  }
});
const emit = defineEmits(['update:modelValue']);
</script>

<template>
  <div class="flex flex-col w-full">
    <label v-if="label" :for="id" class="mb-1 text-sm text-gray-700">{{ label }}</label>
    <input
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
    />
  </div>
</template>
