<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import userBookingService from './userBookingService'
import ballImage from '@/assets/images/ball2.jpeg'

const router = useRouter()

const fileUrl = import.meta.env.VITE_FILE_BASE_URL;
// Reactive state
const loading = ref(false)
const currentStep = ref(1) // 1: Sports, 2: Categories, 3: Pitches, 4: Time Selection
const selectedSport = ref(null)
const selectedCategory = ref(null)
const selectedPitch = ref(null)
const selectedTimeSlot = ref(null)
const selectedTime = ref(null)
const calculatedPrice = ref(0)
const showConfirmDialog = ref(false)

// Data from backend
const sports = ref([])
const categories = ref([])
const pitches = ref([])
const timeSlots = ref([])
const bookingData = ref(null)

// User data
const userData = ref(null)
const bookingForm = ref({
  phone: '',
  phone2: '',
  pitch_id: null,
  date: null,
  time_id: null,
  price: 0
})

// Initialize component
onMounted(async () => {
  await loadInitialData()
  loadUserData()
})

// Load user data from localStorage
const loadUserData = () => {
  const user = localStorage.getItem('user')
  if (user) {
    userData.value = JSON.parse(user)
    bookingForm.value.phone = userData.value.phone || ''
    bookingForm.value.phone2 = userData.value.phone2 || ''
  }
}

// Load initial data from backend
const loadInitialData = async () => {
  try {
    loading.value = true
    const currentDate = new Date().toISOString().split('T')[0]
    const response = await userBookingService.dataSetup(null, currentDate)
    bookingData.value = response.data
    sports.value = response.data.sports || []
  } catch (error) {
    console.error('Error loading initial data:', error)
  } finally {
    loading.value = false
  }
}

// Load categories when sport is selected
const loadCategories = async (sportId) => {
  try {
    loading.value = true
    // Assuming you have an endpoint to get categories by sport
    // For now, using mock data based on your structure
    categories.value = [
      { id: 1, name: 'Indoor Courts', sport_id: sportId },
      { id: 2, name: 'Outdoor Fields', sport_id: sportId },
      { id: 3, name: 'Premium Courts', sport_id: sportId }
    ]
  } catch (error) {
    console.error('Error loading categories:', error)
  } finally {
    loading.value = false
  }
}

// Load pitches when category is selected
const loadPitches = async (categoryId) => {
  try {
    loading.value = true
    // Assuming you have an endpoint to get pitches by category
    // For now, using mock data
    pitches.value = [
      { id: 1, name: 'Court A', category_id: categoryId, location: 'Building 1' },
      { id: 2, name: 'Court B', category_id: categoryId, location: 'Building 1' },
      { id: 3, name: 'Field C', category_id: categoryId, location: 'Building 2' }
    ]
  } catch (error) {
    console.error('Error loading pitches:', error)
  } finally {
    loading.value = false
  }
}

// Load time slots when pitch is selected
const loadTimeSlots = async (pitchId) => {
  try {
    loading.value = true
    const currentDate = new Date().toISOString().split('T')[0]
    const response = await userBookingService.dataSetup(pitchId, currentDate)
    timeSlots.value = response.data.time_slots || []
  } catch (error) {
    console.error('Error loading time slots:', error)
  } finally {
    loading.value = false
  }
}

// Calculate price when time is selected
const calculatePrice = async (date, timeId, pitchId) => {
  try {
    const response = await userBookingService.calculatePrice(date, timeId, pitchId)
    calculatedPrice.value = parseFloat(response.data.price)
    bookingForm.value.price = calculatedPrice.value
  } catch (error) {
    console.error('Error calculating price:', error)
  }
}

// Handle sport selection
const selectSport = async (sport) => {
  selectedSport.value = sport
  selectedCategory.value = null
  selectedPitch.value = null
  selectedTimeSlot.value = null
  selectedTime.value = null
  categories.value = []
  pitches.value = []
  timeSlots.value = []
  
  await loadCategories(sport.id)
  currentStep.value = 2
}

// Handle category selection
const selectCategory = async (category) => {
  selectedCategory.value = category
  selectedPitch.value = null
  selectedTimeSlot.value = null
  selectedTime.value = null
  pitches.value = []
  timeSlots.value = []
  
  await loadPitches(category.id)
  currentStep.value = 3
}

// Handle pitch selection
const selectPitch = async (pitch) => {
  selectedPitch.value = pitch
  selectedTimeSlot.value = null
  selectedTime.value = null
  timeSlots.value = []
  
  bookingForm.value.pitch_id = pitch.id
  await loadTimeSlots(pitch.id)
  currentStep.value = 4
}

// Handle time slot selection
const selectTimeSlot = (timeSlot) => {
  selectedTimeSlot.value = timeSlot
  selectedTime.value = null
}

// Handle time selection
const selectTime = async (time, date) => {
  if (time.booked) return
  
  selectedTime.value = time
  bookingForm.value.time_id = time.id
  bookingForm.value.date = new Date(date)
  
  await calculatePrice(date, time.id, selectedPitch.value.id)
  showConfirmDialog.value = true
}

// Confirm booking
const confirmBooking = async () => {
  try {
    loading.value = true
    const response = await userBookingService.create(bookingForm.value)
    
    // if (response.data) {
    //   // Booking successful
    //   router.push('/user/checkout')
    // }
  } catch (error) {
    console.error('Error creating booking:', error)
    alert('Failed to create booking. Please try again.')
  } finally {
    loading.value = false
    showConfirmDialog.value = false
  }
}

// Go back to previous step
const goBack = () => {
  if (currentStep.value > 1) {
    currentStep.value--
    
    switch (currentStep.value) {
      case 1:
        selectedSport.value = null
        categories.value = []
        break
      case 2:
        selectedCategory.value = null
        pitches.value = []
        break
      case 3:
        selectedPitch.value = null
        timeSlots.value = []
        break
    }
  }
}

// Format time display
const formatTime = (timeString) => {
  const [hour] = timeString.split(':')
  const hourNum = parseInt(hour)
  const ampm = hourNum >= 12 ? 'PM' : 'AM'
  const displayHour = hourNum > 12 ? hourNum - 12 : hourNum === 0 ? 12 : hourNum
  return `${displayHour}:00 ${ampm}`
}

// Format date display
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'short', 
    day: 'numeric' 
  })
}

// Computed properties
const stepTitle = computed(() => {
  switch (currentStep.value) {
    case 1: return 'Select Sport'
    case 2: return 'Select Category'
    case 3: return 'Select Venue'
    case 4: return 'Select Date & Time'
    default: return 'Book Your Session'
  }
})

const canProceed = computed(() => {
  return selectedSport.value && selectedCategory.value && selectedPitch.value && selectedTime.value
})
</script>

<template>
  <main class="min-h-screen bg-gray-50">
    <Navbar />

    <!-- Hero Section -->
    <div class="relative">
      <div class="w-full h-48 bg-cover bg-center relative overflow-hidden">
        <img 
          :src="ballImage" 
          alt="Sports booking background" 
          class="w-full h-48 object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-purple-900/60"></div>
        <div class="absolute inset-0 flex items-center justify-center">
          <h1 class="text-4xl font-bold text-white text-center">
            Book Your Sports Venue
          </h1>
        </div>
      </div>
    </div>



    <!-- Main Content -->
    <div class="max-w-6xl mx-auto px-4 py-12">
      <div class="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <!-- Header -->
        <div class="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-2xl font-bold text-white">{{ stepTitle }}</h2>
              <p class="text-blue-100 mt-2">Step {{ currentStep }} of 4</p>
            </div>
            <button 
              v-if="currentStep > 1"
              @click="goBack"
              class="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors"
            >
              ← Back
            </button>
          </div>
        </div>

        <div class="p-8">
          <!-- Loading State -->
          <div v-if="loading" class="flex justify-center items-center py-12">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>

          <!-- Step 1: Sports Selection -->
          <div v-else-if="currentStep === 1" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <button
                v-for="sport in sports"
                :key="sport.id"
                @click="selectSport(sport)"
                :class="[
                  'p-6 border-2 rounded-xl transition-all duration-200 hover:shadow-lg',
                  selectedSport?.id === sport.id 
                    ? 'border-blue-500 bg-blue-50 shadow-md' 
                    : 'border-gray-200 hover:border-blue-300'
                ]"
              >
                <div class="flex flex-col items-center justify-center">
                  <img v-if="sport" class="w-10 h-10 object-cover rounded-lg" :src="fileUrl + sport.image" alt="">
                  <div v-else class="text-4xl mb-3">⚽</div>
                   <div class="text-center">
                     <h3 class="text-lg font-semibold text-gray-800">{{ sport.name }}</h3>
                     <p class="text-sm text-gray-600 mt-1">{{ sport.description || 'Available now' }}</p>
                   </div>
                </div>
              </button>
            </div>
          </div>

          <!-- Step 2: Categories Selection -->
          <div v-else-if="currentStep === 2" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <button
                v-for="category in categories"
                :key="category.id"
                @click="selectCategory(category)"
                :class="[
                  'p-6 border-2 rounded-xl transition-all duration-200 hover:shadow-lg text-left',
                  selectedCategory?.id === category.id 
                    ? 'border-blue-500 bg-blue-50 shadow-md' 
                    : 'border-gray-200 hover:border-blue-300'
                ]"
              >
                <h3 class="text-lg font-semibold text-gray-800">{{ category.name }}</h3>
                <p class="text-sm text-gray-600 mt-2">Multiple venues available</p>
              </button>
            </div>
          </div>

          <!-- Step 3: Pitches Selection -->
          <div v-else-if="currentStep === 3" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button
                v-for="pitch in pitches"
                :key="pitch.id"
                @click="selectPitch(pitch)"
                :class="[
                  'p-6 border-2 rounded-xl transition-all duration-200 hover:shadow-lg text-left',
                  selectedPitch?.id === pitch.id 
                    ? 'border-blue-500 bg-blue-50 shadow-md' 
                    : 'border-gray-200 hover:border-blue-300'
                ]"
              >
                <h3 class="text-lg font-semibold text-gray-800">{{ pitch.name }}</h3>
                <p class="text-sm text-gray-600 mt-2">{{ pitch.location }}</p>
                <div class="mt-3 flex items-center text-sm text-green-600">
                  <span class="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Available
                </div>
              </button>
            </div>
          </div>

          <!-- Step 4: Time Selection -->
          <div v-else-if="currentStep === 4" class="space-y-8">
            <div v-for="timeSlot in timeSlots" :key="timeSlot.date" class="space-y-4">
              <div class="flex items-center justify-between border-b border-gray-200 pb-2">
                <h3 class="text-lg font-semibold text-gray-800">
                  {{ formatDate(timeSlot.date) }}
                </h3>
                <span class="text-sm text-gray-500">{{ timeSlot.name }}</span>
              </div>
              
              <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                <button
                  v-for="time in timeSlot.times"
                  :key="time.id"
                  @click="selectTime(time, timeSlot.date)"
                  :disabled="time.booked"
                  :class="[
                    'p-4 border-2 rounded-lg transition-all duration-200 text-center',
                    time.booked 
                      ? 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed' 
                      : selectedTime?.id === time.id 
                        ? 'border-blue-500 bg-blue-50 shadow-md' 
                        : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
                  ]"
                >
                  <div class="font-semibold">{{ formatTime(time.name) }}</div>
                  <div class="text-xs text-gray-500 mt-1">
                    {{ time.booked ? 'Booked' : 'Available' }}
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Confirmation Dialog -->
    <div v-if="showConfirmDialog" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
        <h3 class="text-xl font-bold text-gray-800 mb-6">Confirm Booking</h3>
        
        <div class="space-y-4 mb-6">
          <div class="flex justify-between">
            <span class="text-gray-600">Sport:</span>
            <span class="font-medium">{{ selectedSport?.name }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Category:</span>
            <span class="font-medium">{{ selectedCategory?.name }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Venue:</span>
            <span class="font-medium">{{ selectedPitch?.name }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Time:</span>
            <span class="font-medium">{{ formatTime(selectedTime?.name) }}</span>
          </div>
          <div class="flex justify-between border-t pt-4">
            <span class="text-gray-600 font-semibold">Total Price:</span>
            <span class="font-bold text-lg">${{ calculatedPrice }}</span>
          </div>
        </div>

        <div class="space-y-4 mb-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
            <input
              v-model="bookingForm.phone"
              type="tel"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Alternative Phone</label>
            <input
              v-model="bookingForm.phone2"
              type="tel"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div class="flex space-x-4">
          <button
            @click="showConfirmDialog = false"
            class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            @click="confirmBooking"
            :disabled="!bookingForm.phone || loading"
            class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {{ loading ? 'Booking...' : 'Confirm Booking' }}
          </button>
        </div>
      </div>
    </div>

    <Footer />
  </main>
</template>

<style scoped>
/* Custom focus styles for better accessibility */
input:focus, button:focus {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Smooth transitions for interactive elements */
input, button {
  transition: all 0.2s ease-in-out;
}

/* Loading animation */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
