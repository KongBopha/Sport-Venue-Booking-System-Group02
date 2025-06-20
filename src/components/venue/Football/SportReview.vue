<template>
  <!-- Review Section -->
  <div class="max-w-6xl mx-auto px-4 pb-10">
<h2 class="text-2xl font-bold mb-6">Rating & Reviews</h2>

<div v-if="store.loading" class="text-center text-gray-500">Loading reviews...</div>
<div v-if="store.error" class="text-center text-red-600">{{ store.error }}</div>

<div v-if="!store.loading && !store.error">
  <!-- Average Rating Summary in one row -->
  <div class="flex flex-wrap items-center bg-gray-100 p-6 rounded-lg mb-6">
    <!-- Numeric Rating -->
    <div class="text-green-600 text-4xl font-extrabold mr-4">
      {{ averageRating.toFixed(1) }}
    </div>

    <!-- Stars -->
    <div class="flex items-center space-x-1 mr-4">
      <font-awesome-icon
        v-for="(star, i) in stars"
        :key="i"
        :icon="['fas', 'star']"
        class="h-6 w-6"
        :class="star.active ? 'text-yellow-400' : 'text-gray-300'"
      />
    </div>

    <!-- Label -->
    <div class="text-sm text-gray-500 mt-1">
      Out of 5.0
    </div>
  </div>
</div>


      <!-- Reviews List -->
      <div class="border-t pt-4 space-y-4">
        <div
          v-for="(review, i) in reviews"
          :key="i"
          class="border p-4 rounded-lg"
        >
          <div class="flex items-start mb-2">
            <img
              src="https://cdn-icons-png.flaticon.com/512/147/147144.png"
              class="w-12 h-12 rounded-full mr-3"
              alt="User avatar"
            />
            <div class="w-full">
              <div class="flex justify-between items-center">
                <h3 class="font-semibold">{{ review.user?.name || 'Anonymous User' }}</h3>
                <span class="text-xs text-gray-500">{{ formatDate(review.created_at) }}</span>
              </div>
              <div class="flex items-center mt-1">
                <font-awesome-icon
                  v-for="j in 5"
                  :key="j"
                  :icon="['fas', 'star']"
                  class="h-4 w-4"
                  :class="j <= review.rating ? 'text-yellow-400' : 'text-gray-300'"
                />
                <span class="ml-2 text-sm text-gray-600">{{ review.rating }}</span>
              </div>
            </div>
          </div>
          <p class="ml-14 text-gray-700">{{ review.description }}</p>
        </div>
      </div>
    </div>
</template>

<script setup>
import { ref, watch, onMounted, computed } from 'vue';
import { useSportRatingStore } from '@/stores/sportRating';

const props = defineProps({
  sportId: {
    type: Number,
    required: true,
    default: 1,
  }
});

const store = useSportRatingStore();
const localSportId = ref(props.sportId);

const sports = [
  { id: 1, name: 'Football Sport' },
  { id: 2, name: 'Volleyball' },
  { id: 3, name: 'Table Tennis' }
];

// Fetch reviews based on sport
const fetchData = () => {
  store.fetchRatingsBySportId(localSportId.value);
};

onMounted(fetchData);
watch(() => props.sportId, (id) => {
  localSportId.value = id;
  fetchData();
});

// Review data
const averageRating = computed(() => store.average || 0);
const reviews = computed(() => store.ratings || []);
const stars = computed(() =>
  Array.from({ length: 5 }, (_, i) => ({ active: i < Math.round(averageRating.value) }))
);


// Format review date
function formatDate(iso) {
  if (!iso) return 'Unknown';
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
    hour: 'numeric', minute: '2-digit', hour12: true
  }).format(new Date(iso));
}

// Emit for sport change
const selectedSport = ref(props.sportId);
function selectSport(id) {
  if (selectedSport.value !== id) {
    selectedSport.value = id;
    localSportId.value = id;
    fetchData();
  }
}
</script>
