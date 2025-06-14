<template>
    <div class="container mx-auto px-4 py-8 max-w-6xl">
      <h1 class="text-4xl font-bold mb-6">{{ selectedSport }}</h1>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Overview Section -->
        <div class="border rounded-lg p-6">
          <h2 class="text-xl font-semibold mb-4">Overview</h2>
          <p class="text-gray-700">
            {{ selectedSport }} is a popular sport played worldwide, known for its thrilling action, teamwork,
            and strategic play. There are two main types of football: association football (soccer)
            and American football, though other variations like Canadian football, rugby, and
            Australian rules football also exist.
          </p>
        </div>
        
        <!-- Availability Section -->
        <div class="border rounded-lg p-6">
          <h2 class="text-xl font-semibold mb-4">Availability</h2>
          <div class="flex items-center">
            <div class="bg-green-100 p-2 rounded-lg mr-4">
              <CalendarIcon class="h-6 w-6 text-green-500" />
            </div>
            <p>Check availability on your convenient time</p>
          </div>
        </div>
        
        <!-- Rules Section -->
        <div class="border rounded-lg p-6">
          <h2 class="text-xl font-semibold mb-4">Rules</h2>
          <ul class="space-y-2">
            <li class="flex items-start">
              <div class="h-2 w-2 rounded-full bg-blue-500 mt-2 mr-2"></div>
              <span>No pets, no seeds, no gum, no glass, no hitting or swinging outside of the cage</span>
            </li>
            <li class="flex items-start">
              <div class="h-2 w-2 rounded-full bg-blue-500 mt-2 mr-2"></div>
              <span></span>
            </li>
          </ul>
        </div>
        
        <!-- Share Venue Section -->
        <div class="border rounded-lg p-6">
          <h2 class="text-xl font-semibold mb-4">Share Venue</h2>
          <div class="flex space-x-4">
            <a href="#" class="text-blue-600 hover:text-blue-800">
              <FacebookIcon class="h-6 w-6" />
            </a>
            <a href="#" class="text-blue-500 hover:text-blue-700">
              <MessengerIcon class="h-6 w-6" />
            </a>
            <a href="#" class="text-orange-500 hover:text-orange-700">
              <InstagramIcon class="h-6 w-6" />
            </a>
            <a href="#" class="text-blue-400 hover:text-blue-600">
              <TelegramIcon class="h-6 w-6" />
            </a>
            <a href="#" class="text-blue-400 hover:text-blue-600">
              <TwitterIcon class="h-6 w-6" />
            </a>
            <a href="#" class="text-blue-700 hover:text-blue-900">
              <LinkedinIcon class="h-6 w-6" />
            </a>
          </div>
        </div>
        
        <!-- Amenities Section -->
        <div class="border rounded-lg p-6">
          <h2 class="text-xl font-semibold mb-4">Amenities</h2>
          <div class="grid grid-cols-2 gap-4">
            <div class="flex items-center">
              <div class="h-5 w-5 bg-green-500 rounded mr-2 flex items-center justify-center">
                <CheckIcon class="h-4 w-4 text-white" />
              </div>
              <span>Parking</span>
            </div>
            <div class="flex items-center">
              <div class="h-5 w-5 bg-green-500 rounded mr-2 flex items-center justify-center">
                <CheckIcon class="h-4 w-4 text-white" />
              </div>
              <span>Drinking Water</span>
            </div>
            <div class="flex items-center">
              <div class="h-5 w-5 bg-green-500 rounded mr-2 flex items-center justify-center">
                <CheckIcon class="h-4 w-4 text-white" />
              </div>
              <span>Changing room</span>
            </div>
            <div class="flex items-center">
              <div class="h-5 w-5 bg-green-500 rounded mr-2 flex items-center justify-center">
                <CheckIcon class="h-4 w-4 text-white" />
              </div>
              <span>Shower</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Gallery Section -->
      <div class="border rounded-lg p-6 mt-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold">Gallery</h2>
          <ChevronRightIcon class="h-6 w-6 text-gray-400" />
        </div>
        
        <div class="relative">
          <div class="flex overflow-x-auto space-x-4 pb-4">
            <div v-for="(image, index) in galleryImages" :key="index" class="flex-shrink-0">
              <img :src="image" alt="Football image" class="h-32 w-48 object-cover rounded-lg" />
            </div>
          </div>
          
          <button class="absolute left-2 top-1/2 transform -translate-y-1/2 bg-green-500 rounded-full p-1">
            <ChevronLeftIcon class="h-5 w-5 text-white" />
          </button>
          <button class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-500 rounded-full p-1">
            <ChevronRightIcon class="h-5 w-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { 
    Calendar as CalendarIcon,
    Check as CheckIcon,
    ChevronLeft as ChevronLeftIcon,
    ChevronRight as ChevronRightIcon,
    Facebook as FacebookIcon,
    MessageCircle as MessengerIcon,
    Instagram as InstagramIcon,
    Send as TelegramIcon,
    Twitter as TwitterIcon,
    Linkedin as LinkedinIcon
  } from 'lucide-vue-next';
  
  const galleryImages = ref([
    'https://images.unsplash.com/photo-1508098682722-e99c643e7f0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80',
    'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    'https://images.unsplash.com/photo-1517466787929-bc90951d0974?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  ]);
  defineProps({
  selectedSport: {
    type: String,
    required: true,
    default: 'Football Sport'
  }
});
  </script>
  
  <style scoped>
  /* Custom styles can be added here if needed */
  </style>