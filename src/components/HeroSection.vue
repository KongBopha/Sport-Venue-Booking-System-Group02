<template>
  <section
    class="relative h-screen bg-cover bg-center flex items-center transition-all duration-1000"
    :style="{ backgroundImage: `url(${images[currentImageIndex]})` }"
  >
    <!-- Overlay -->
    <div class="absolute inset-0 bg-black bg-opacity-50"></div>

    <div class="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
      <div class="max-w-3xl">
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
          Book Your Perfect 
          <span class="text-teal-400">Sports Venue</span>
        </h1>
        <p class="text-lg sm:text-xl text-gray-200 mb-8 leading-relaxed">
          Premium football pitches, volleyball courts, and table tennis facilities available for rent. 
          Professional equipment included with every booking.
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row gap-4">
          <button
            @click="bookNow"
            class="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Book Your Venue Now
          </button>
          <button class="border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold px-8 py-4 rounded-lg transition-all duration-300">
            View Available Times
          </button>
        </div>

        <!-- Quick Stats -->
        <div class="mt-12 grid grid-cols-3 gap-8 text-white">
          <div class="text-center">
            <div class="text-2xl font-bold mb-1">3</div>
            <div class="text-sm text-gray-300">Sport Types</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold mb-1">24/7</div>
            <div class="text-sm text-gray-300">Available</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold mb-1">500+</div>
            <div class="text-sm text-gray-300">Happy Players</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const images = [
  '/src/assets/Navbar/football.png',
  '/src/assets/Navbar/volleyball.png',
  '/src/assets/Navbar/tabletennis.png'
]

const currentImageIndex = ref(0)

let intervalId = null

const startImageSlider = () => {
  intervalId = setInterval(() => {
    currentImageIndex.value = (currentImageIndex.value + 1) % images.length
  }, 4000) // change every 4 seconds
}

onMounted(startImageSlider)
onUnmounted(() => clearInterval(intervalId))

const bookNow = () => {
  router.push('venue')  
}
</script>
