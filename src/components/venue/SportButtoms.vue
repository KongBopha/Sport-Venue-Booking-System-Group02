<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  selectedSportId: Number,
});

const emit = defineEmits(['sport-changed']);

// Sports data with ids and labels
const sports = [
  { id: 1, label: 'Football Sport' },
  { id: 2, label: 'Volleyball' },
  { id: 3, label: 'Table Tennis' },
];

// Emit the selected sport id when button clicked
function selectSport(sportId) {
  if (sportId !== props.selectedSportId) {
    emit('sport-changed', sportId);
  }
}
</script>

<template>
  <section
    class="flex flex-wrap flex-auto w-full min-h-[150px] items-center justify-center gap-x-[200px] gap-y-10 py-10"
  >
    <button
      v-for="sport in sports"
      :key="sport.id"
      class="flex items-center justify-center border rounded-xl px-6 py-4 text-[20px] font-bold text-black"
      :class="{
        'border-blue-600 bg-blue-100': sport.id === selectedSportId,
        'border-gray-300': sport.id !== selectedSportId
      }"
      @click="selectSport(sport.id)"
    >
      {{ sport.label }}
    </button>
  </section>
</template>
