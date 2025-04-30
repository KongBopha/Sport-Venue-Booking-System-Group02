<template>
  <div class="reviews-container p-6 bg-white rounded-lg shadow-sm">
    <h2 class="text-2xl font-bold mb-6">Reviews</h2>
    
    <!-- Rating Summary Section -->
    <div class="flex flex-col md:flex-row mb-6">
      <!-- Overall Rating -->
      <div class="bg-gray-200 rounded-lg p-6 flex flex-col items-center justify-center md:w-1/4 mb-4 md:mb-0 md:mr-4">
        <div class="text-green-500 text-3xl font-bold">4.8</div>
        <div class="text-gray-600 text-sm">Out of 5.0</div>
        <div class="flex mt-2">
          <StarIcon v-for="i in 5" :key="i" class="h-6 w-6 text-yellow-400 fill-current" />
        </div>
      </div>
      
      <!-- Recommendation Stats -->
      <div class="bg-white border rounded-lg p-6 flex-1">
        <div class="font-medium mb-4">Recommended by 95% of player</div>
        
        <div class="grid grid-cols-3 gap-4">
          <div v-for="(stat, index) in qualityStats" :key="index" class="flex flex-col">
            <div class="text-sm text-gray-600 mb-1">{{ stat.label }}</div>
            <div class="text-sm font-medium mb-1">{{ stat.value }}</div>
            <div class="flex">
              <div v-for="i in 5" :key="i" class="h-2 w-6 bg-yellow-400 mr-0.5"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Divider -->
    <div class="border-t my-4"></div>
    
    <!-- Reviews List -->
    <div class="space-y-4">
      <div v-for="(review, index) in reviews" :key="index" class="border rounded-lg p-4">
        <!-- Review Header -->
        <div class="flex items-center mb-3">
          <img :src="review.avatar" alt="User avatar" class="w-12 h-12 rounded-full mr-3" />
          <div>
            <div class="font-medium">{{ review.name }} Booked on {{ review.bookingDate }}</div>
            <div class="flex items-center">
              <div class="flex mr-2">
                <StarIcon v-for="i in 5" :key="i" class="h-5 w-5 text-yellow-400 fill-current" />
              </div>
              <span class="text-gray-600">{{ review.rating }}</span>
            </div>
          </div>
        </div>
        
        <!-- Review Content -->
        <div class="ml-0 md:ml-14">
          <div class="text-green-500 mb-2">{{ review.recommendation }}</div>
          <div class="font-medium mb-1">{{ review.title }}</div>
          <p class="text-gray-600 mb-4">{{ review.content }}</p>
          
          <!-- Review Images -->
          <div class="flex flex-wrap gap-2 mb-2">
            <img 
              v-for="(image, imgIndex) in review.images" 
              :key="imgIndex" 
              :src="image" 
              alt="Review image" 
              class="w-20 h-20 object-cover rounded"
            />
          </div>
          
          <div class="text-sm text-gray-500">Sent on {{ review.sentDate }}</div>
        </div>
      </div>
    </div>
    
    <!-- Show More Button -->
    <div class="flex justify-center mt-6">
      <button class="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-6 rounded-full">
        Show more
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Star as StarIcon } from 'lucide-vue-next';

// Quality statistics data
const qualityStats = ref([
  { label: 'Quality of player', value: '5.0' },
  { label: 'Quality of player', value: '5.0' },
  { label: 'Quality of player', value: '5.0' }
]);

// Sample review data
const reviews = ref([
  {
    name: 'Amanda',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    bookingDate: '06/04/2023',
    rating: '5.0',
    recommendation: 'Yes, I would book again.',
    title: 'Absolutely perfect',
    content: 'If you are looking for a perfect place for friendly matches with your friends or a competitive match, It is the best place.',
    images: [
      'https://images.unsplash.com/photo-1517466787929-bc90951d0974?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
      'https://images.unsplash.com/photo-1517466787929-bc90951d0974?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
      'https://images.unsplash.com/photo-1517466787929-bc90951d0974?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
      'https://images.unsplash.com/photo-1517466787929-bc90951d0974?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
      'https://images.unsplash.com/photo-1517466787929-bc90951d0974?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80'
    ],
    sentDate: '06/04/2023'
  },
  {
    name: 'Amanda',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    bookingDate: '06/04/2023',
    rating: '5.0',
    recommendation: 'Yes, I would book again.',
    title: 'Absolutely perfect',
    content: 'If you are looking for a perfect place for friendly matches with your friends or a competitive match, It is the best place.',
    images: [
      'https://images.unsplash.com/photo-1517466787929-bc90951d0974?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
      'https://images.unsplash.com/photo-1517466787929-bc90951d0974?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
      'https://images.unsplash.com/photo-1517466787929-bc90951d0974?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
      'https://images.unsplash.com/photo-1517466787929-bc90951d0974?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
      'https://images.unsplash.com/photo-1517466787929-bc90951d0974?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80'
    ],
    sentDate: '06/04/2023'
  }
]);
</script>

<style scoped>
/* Add any custom styles here if needed */
</style>