<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  selectedSportId: Number,
});

const emit = defineEmits(['sport-changed']);

const sports = [
  { id: 1, label: 'Football Sport' },
  { id: 2, label: 'Volleyball' },
  { id: 3, label: 'Table Tennis' },
];

function selectSport(sportId) {
  if (sportId !== props.selectedSportId) {
    emit('sport-changed', sportId);
  }
}
</script>
<template>
 

    <button class="flex items-center justify-center border border-blue-600 rounded-xl">
        <div class="px-6 py-4 text-[20px] font-bold text-black">
            Football Sport
        </div>
    </button>

    <button class="flex items-center justify-center border border-blue-600 rounded-xl">
        <div class="px-6 py-4 text-[20px] font-bold text-black">
            Valleyball
        </div>
    </button>

    <button class="flex items-center justify-center border border-blue-600 rounded-xl">
        <div class="px-6 py-4 text-[20px] font-bold text-black">
            Table Tennis
        </div>
    </button>
</template>