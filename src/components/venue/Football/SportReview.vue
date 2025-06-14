<template>
  <!-- Sport buttons section -->
  <section
    class="flex flex-wrap flex-auto w-full min-h-[150px] items-center justify-center gap-x-[200px] gap-y-10 py-10"
  >
    <button
      v-for="sport in sports"
      :key="sport.id"
      @click="selectSport(sport.id)"
      :class="[
        'flex items-center justify-center border rounded-xl px-6 py-4 text-[20px] font-bold cursor-pointer',
        selectedSport === sport.id
          ? 'border-blue-800 bg-blue-100 text-blue-800'
          : 'border-blue-600 text-black',
      ]"
    >
      {{ sport.name }}
    </button>
  </section>

  <!-- Reviews display -->
  <div class="reviews-container p-6 bg-white rounded-lg shadow-sm mx-5">
    <h2 class="text-2xl font-bold mb-6">User Reviews</h2>

    <div v-if="store.loading" class="text-center text-gray-500">Loading...</div>
    <div v-if="store.error" class="text-red-500">{{ store.error }}</div>

    <div v-if="!store.loading && !store.error">
      <div class="flex flex-col md:flex-row mb-6">
        <!-- Average rating box -->
        <div
          class="bg-gray-100 rounded-lg p-6 flex flex-col items-center justify-center md:w-1/4 mb-4 md:mb-0 md:mr-4"
        >
          <div class="text-green-600 text-3xl font-bold">{{ averageRating.toFixed(1) }}</div>
          <div class="text-gray-600 text-sm">Out of 5.0</div>
          <div class="flex mt-2">
            <font-awesome-icon
              v-for="(star, index) in stars"
              :key="index"
              :icon="['fas', 'star']"
              class="h-6 w-6 text-yellow-400"
              :class="{ 'opacity-100': star.active, 'opacity-30': !star.active }"
            />
          </div>
        </div>

        <!-- Quality stats and recommended percentage -->
        <div class="bg-white border rounded-lg p-6 flex-1">
          <div class="font-medium mb-4">Recommended by {{ recommendedPercentage }}% of players</div>
          <div class="grid grid-cols-3 gap-4">
            <div v-for="(stat, index) in qualityStats" :key="index" class="flex flex-col">
              <div class="text-sm text-gray-600 mb-1">{{ stat.label }}</div>
              <div class="text-sm font-medium mb-1">{{ stat.value }}</div>
              <div class="flex">
                <div
                  v-for="i in 5"
                  :key="i"
                  class="h-2 w-6 mr-0.5"
                  :class="i <= 4 ? 'bg-yellow-400' : 'bg-gray-200'"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Reviews list -->
      <div class="border-t my-4"></div>
      <div class="space-y-4">
  <div
    v-for="(review, index) in reviews"
    :key="index"
    class="border rounded-lg p-4"
  >
    <div class="flex items-center mb-3">
      <img
        src="https://cdn-icons-png.flaticon.com/512/147/147144.png"
        alt="User avatar"
        class="w-12 h-12 rounded-full mr-3"
      />
      <div>
        <div class="flex">
        <div class="font-medium text-lg">{{ review.user?.name || 'Anonymous User' }}</div>
         <div class="ml-0 md:ml-14 text-gray-600 text-xs mt-1">
          {{ formatDate(review.created_at) }}
        </div>
        </div>
        <div class="flex items-center">
          <div class="flex mr-2">
            <font-awesome-icon
              v-for="starIndex in 5"
              :key="starIndex"
              :icon="['fas', 'star']"
              class="h-5 w-5"
              :class="{
                'text-yellow-400': starIndex <= review.rating,
                'text-gray-300': starIndex > review.rating
              }"
            />
          </div>
          <span class="text-gray-600 text-sm">{{ review.rating }}</span>
        </div>
      </div>
    </div>
    <div class="ml-0 md:ml-14 text-gray-700">{{ review.description }}</div>
    </div>
    </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, watch, computed, ref } from 'vue';
import { useSportRatingStore } from '@/stores/sportRating';

const props = defineProps({
  sportId: {
    type: Number,
    default: 1,
    required: true,
  }
});

const store = useSportRatingStore();
const localSportId = ref(props.sportId);

// Fetch when component is mounted or prop changes
const fetchData = () => {
  store.fetchRatingsBySportId(props.sportId);
};

onMounted(fetchData);
watch(() => props.sportId, fetchData);
watch(
  () => props.sportId,
  (newSportId) => {
    localSportId.value = newSportId;
    store.fetchRatingsBySportId(newSportId);
  },
  { immediate: true }
);

const averageRating = computed(() => store.average);
const reviews = computed(() => store.ratings);

const stars = computed(() =>
  Array.from({ length: 5 }, (_, i) => ({ active: i < Math.round(averageRating.value) }))
);

const qualityStats = ref([
  { label: 'Facilities', value: 'Excellent' },
  { label: 'Cleanliness', value: 'Very Good' },
  { label: 'Experience', value: 'Outstanding' },
]);

const recommendedPercentage = computed(() => {
  const total = reviews.value.length;
  const recommended = reviews.value.filter(r => r.rating >= 4).length;
  return total > 0 ? Math.round((recommended / total) * 100) : 0;
});
function formatDate(isoDateStr) {
  if (!isoDateStr) return 'N/A';
  const date = new Date(isoDateStr);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
    hour: 'numeric', minute: 'numeric', hour12: true
  }).format(date);
}

</script>
