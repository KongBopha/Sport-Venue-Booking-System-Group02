<script setup>
import { ref, watch, onMounted } from 'vue';
import { usePitchCategoryStore } from '@/stores/pitchcategories';
import court1Img from '@/assets/images/court1.png';


const images ={
  'court1.png': court1Img,
}
const props = defineProps({
  selectedSportId: Number,
});

const store = usePitchCategoryStore();

// Fetch data when selectedSportId changes
watch(() => props.selectedSportId, (newId) => {
  if (newId != null) {
    store.fetchCategoriesBySportId(newId);
  }
}, { immediate: true });

onMounted(() => {
  if (props.selectedSportId != null) {
    store.fetchCategoriesBySportId(props.selectedSportId);
  }
});
</script>
<template>
  <div class="container px-6 py-8 max-w-7xl mx-auto">
    <h1 class="text-4xl mb-6 ml-5">Court Rent</h1>


    <!-- Loading and error handling -->
    <div v-if="store.loading" class="text-center mt-10 text-lg">Loading...</div>
    <div v-else-if="store.error" class="text-center text-red-600 mt-10">{{ store.error }}</div>

    <!-- Pitch category cards -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-12">
      <div
        v-for="category in store.categories"
        :key="category.id"
        class="border-2 border-cyan-300 rounded-lg p-6 flex flex-col shadow-lg"
      >
        <img
          :src="images[category.image] || court1Img"
          class="w-full h-auto rounded-md mb-4 block"
          alt="Court Image"
        />
        <div class="flex flex-col items-center text-center">
          <div class="text-2xl font-medium mb-2">{{ category.name }}</div>
          <div class="text-2xl font-medium mb-4">{{ category.price }}$/hr</div>
          <button class="bg-blue-600 hover:bg-blue-700 text-white text-lg py-2 px-5 rounded-lg">
            Book now
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
