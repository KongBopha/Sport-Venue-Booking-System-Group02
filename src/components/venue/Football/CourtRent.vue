<template>
  <div class="container px-4 sm:px-6 py-10 max-w-7xl mx-auto">
    <!-- Section Heading -->
    <div class="text-center mb-10">
      <h1 class="text-3xl sm:text-4xl font-bold text-gray-800">Choose your favorite Venue</h1>
      <p class="text-gray-500 text-md mt-2">Browse and book available courts at your convenience.</p>
    </div>

    <!-- Loading and Error States -->
    <div v-if="store.loading" class="flex justify-center place-items-center h-40 text-lg text-gray-500">
      <svg class="animate-spin h-6 w-6 mr-2 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
      </svg>
      Loading courts...
    </div>

    <div v-else-if="store.error" class="text-center text-red-600 text-lg mt-10">
      {{ store.error }}
    </div>
    <!-- Courts Grid -->
    
    <div
    v-else-if="store.categories && store.categories.length > 0"
      class="flex justify-center"
    >
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-10">
    <div
      v-for="category in store.categories"
      :key="category.id"
      class=" w-[450px] h-full  group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100 "
    >
      <!-- Court Image -->
      <div class="relative overflow-hidden">
        <img
          :src="imageMap[category.id] || defaultImg"
          :alt="`${category.name} court`"
          class="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div class="absolute top-4 left-4">
          <span class="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
            <div class="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
            Available Now
          </span>
        </div>
      </div>

      <!-- Court Details -->
      <div class="p-6 text-center">
        <h3 class="text-xl font-bold text-gray-900 mb-2">{{ category.name }}</h3>
        <p class="text-xl text-teal-600 font-semibold mb-4">{{ category.price }}$/hr</p>
        <button
          @click="bookCourt(category)"
          class="w-full bg-teal-500 hover:bg-teal-700 text-white font-semibold py-2 rounded-lg transition-all duration-200"
        >
          Book Now
        </button>
      </div>
    </div>
  </div>
</div>

  </div>
</template>   
<script setup>
import { ref, watch, onMounted } from 'vue'
import { usePitchCategoryStore } from '@/stores/pitchcategories'

// Local images based on category ID
import football1 from '@/assets/images/categories_pitches/football1.png'
import football2 from '@/assets/images/categories_pitches/football2.png'
import volleyball1 from '@/assets/images/categories_pitches/volleyball1.png'
import volleyball2 from '@/assets/images/categories_pitches/volleyball2.png'
import tabletennis1 from '@/assets/images/categories_pitches/tabletennis1.png'
import tabletennis2 from '@/assets/images/categories_pitches/tabletennis2.png'

// Mapping category ID (from DB) to image
const imageMap = {
  1: football1,
  2: football2,
  3: volleyball1,
  4: volleyball2,
  5: tabletennis1,
  6: tabletennis2,
}

const props = defineProps({
  selectedSportId: Number,
})

const store = usePitchCategoryStore()

// Fetch based on sport type ID
watch(
  () => props.selectedSportId,
  (newId) => {
    if (newId != null) {
      store.fetchCategoriesBySportId(newId)
    }
  },
  { immediate: true }
)

onMounted(() => {
  if (props.selectedSportId != null) {
    store.fetchCategoriesBySportId(props.selectedSportId)
  }
})
</script>
