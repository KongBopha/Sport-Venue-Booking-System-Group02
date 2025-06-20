<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  selectedSportId: Number,
});

const emit = defineEmits(['sport-changed']);

const sports = [
  { id: 1, label: 'Football Sport' },
  { id: 2, label: 'Volleyball' },
  { id: 3, label: 'Table Tennis' }
];

function selectSport(sport) {
  if (sport.id !== props.selectedSportId) {
    emit('sport-changed', { id: sport.id, label: sport.label });
  }
}
</script>

<template>
  <section class="flex flex-wrap justify-center gap-10 py-10">
    <button
      v-for="sport in sports"
      :key="sport.id"
      @click="selectSport(sport)"
      :class="[
        'border px-6 py-4 rounded-xl font-bold text-[20px]',
        selectedSportId === sport.id ? 'bg-blue-100 border-blue-600 text-blue-800' : 'border-gray-300 text-black'
      ]"
    >
      {{ sport.label }}
    </button>
  </section>
</template>
