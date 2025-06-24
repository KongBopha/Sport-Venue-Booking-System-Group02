<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import ballImage from '@/assets/images/ball2.jpeg'
import footballImg from '@/assets/images/football.png'
import batmintonImg from '@/assets/images/batminton.png'
import volleyballImg from '@/assets/images/volleyball.png'
import Footer from '@/components/Footer.vue'

const router = useRouter()
const selectedDate = ref(null)
const selectedTime = ref(null)
const selectedSport = ref(null)
const selectedVenue = ref('')
const currentDate = ref(new Date())
const showDatePicker = ref(false)

// Generate calendar for current month
const generateCalendar = () => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const startDate = new Date(firstDay)
  startDate.setDate(startDate.getDate() - firstDay.getDay())
  
  const days = []
  const today = new Date()
  
  for (let i = 0; i < 42; i++) {
    const currentDay = new Date(startDate)
    currentDay.setDate(startDate.getDate() + i)
    
    days.push({
      date: currentDay.getDate(),
      fullDate: new Date(currentDay),
      isCurrentMonth: currentDay.getMonth() === month,
      isPast: currentDay < today.setHours(0, 0, 0, 0),
      isToday: currentDay.toDateString() === today.toDateString()
    })
  }
  
  return days
}

const calendarDays = computed(() => generateCalendar())

const currentMonthYear = computed(() => {
  return currentDate.value.toLocaleDateString('en-US', { 
    month: 'long', 
    year: 'numeric' 
  })
})

const timeSlots = [
  { 
    time: '5:00 PM', 
    price: 50, 
    duration: 120,
    availability: {
      default: true,
      exceptions: [] // Can add specific dates that are unavailable
    }
  },
  { 
    time: '7:00 PM', 
    price: 50, 
    duration: 120,
    availability: {
      default: true,
      exceptions: []
    }
  },
  { 
    time: '9:00 PM', 
    price: 50, 
    duration: 120,
    availability: {
      default: true,
      exceptions: []
    }
  }
]

const venues = [
  { id: 1, name: 'T Soccer', location: 'TK' },
  { id: 2, name: 'Real Soccer', location: 'Sen Sok' },
  { id: 3, name: 'Central', location: 'Beoung Kok' },
  { id: 4, name: 'Speed Soccer', location: 'Sen Sok' }
]

const sports = [
  { id: 'football', name: 'Football', image: footballImg, icon: '⚽' },
  { id: 'badminton', name: 'Badminton', image: batmintonImg, icon: '🏸' },
  { id: 'volleyball', name: 'Volleyball', image: volleyballImg, icon: '🏐' }
]

const handleProceed = () => {
  if (selectedDate.value && selectedTime.value && selectedSport.value && selectedVenue.value) {
    router.push('/user/checkout')
  }
}

const selectDate = (day) => {
  if (!day.isPast && day.isCurrentMonth) {
    selectedDate.value = day.fullDate
    showDatePicker.value = false
  }
}

const selectTime = (timeSlot) => {
  if (selectedDate.value && isTimeAvailable(timeSlot)) {
    selectedTime.value = timeSlot
  }
}

const selectSport = (sport) => {
  selectedSport.value = sport
}

const isTimeAvailable = (timeSlot) => {
  // Add logic to check if time slot is available for selected date
  return timeSlot.availability.default
}

const isTimeSelected = (timeSlot) => {
  return selectedTime.value && selectedTime.value.time === timeSlot.time
}

const previousMonth = () => {
  const newDate = new Date(currentDate.value)
  newDate.setMonth(newDate.getMonth() - 1)
  currentDate.value = newDate
}

const nextMonth = () => {
  const newDate = new Date(currentDate.value)
  newDate.setMonth(newDate.getMonth() + 1)
  currentDate.value = newDate
}

const isFormValid = computed(() => {
  return selectedDate.value && selectedTime.value && selectedSport.value && selectedVenue.value
})

const formatSelectedDate = computed(() => {
  if (!selectedDate.value) return null
  return selectedDate.value.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
})
</script>

<template>
  <main class="min-h-screen bg-gray-50">
    <Navbar />

    <!-- Hero Section with Gradient Overlay -->
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

    <!-- Progress Steps -->
    <div class="bg-white border-b border-gray-200">
      <div class="max-w-6xl mx-auto px-4 py-8">
        <div class="flex items-center justify-center">
          <div class="flex items-center space-x-8">
            <!-- Step 1 -->
            <div class="flex items-center">
              <div class="flex flex-col items-center">
                <div class="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold shadow-lg">
                  1
                </div>
                <span class="text-sm font-medium text-blue-600 mt-2">Booking</span>
              </div>
            </div>

            <!-- Connector -->
            <div class="w-16 h-1 bg-gray-300 rounded-full"></div>

            <!-- Step 2 -->
            <div class="flex items-center">
              <div class="flex flex-col items-center">
                <div class="w-10 h-10 rounded-full border-2 border-gray-300 text-gray-400 flex items-center justify-center font-semibold">
                  2
                </div>
                <span class="text-sm font-medium text-gray-400 mt-2">Checkout</span>
              </div>
            </div>

            <!-- Connector -->
            <div class="w-16 h-1 bg-gray-300 rounded-full"></div>

            <!-- Step 3 -->
            <div class="flex items-center">
              <div class="flex flex-col items-center">
                <div class="w-10 h-10 rounded-full border-2 border-gray-300 text-gray-400 flex items-center justify-center font-semibold">
                  3
                </div>
                <span class="text-sm font-medium text-gray-400 mt-2">Confirmation</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-6xl mx-auto px-4 py-12">
      <div class="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <!-- Header -->
        <div class="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
          <h2 class="text-2xl font-bold text-white flex items-center">
            <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            Book Your Session
          </h2>
          <p class="text-blue-100 mt-2">Select your preferred venue, sport, date and time</p>
        </div>

        <div class="p-8 space-y-8">
          <!-- Venue and Sport Selection -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Venue Selection -->
            <div class="space-y-4">
              <h3 class="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                Select Venue
              </h3>
              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700">Choose Venue *</label>
                <select 
                  v-model="selectedVenue" 
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                >
                  <option value="">Select a venue</option>
                  <option v-for="venue in venues" :key="venue.id" :value="venue.id">
                    {{ venue.name }} - {{ venue.location }}
                  </option>
                </select>
              </div>
            </div>

            <!-- Sport Selection -->
            <div class="space-y-4">
              <h3 class="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                Select Sport
              </h3>
              <div class="grid grid-cols-3 gap-3">
                <button 
                  v-for="sport in sports" 
                  :key="sport.id"
                  :class="[
                    'p-4 border-2 rounded-lg transition-all duration-200 hover:shadow-md',
                    selectedSport?.id === sport.id 
                      ? 'border-blue-500 bg-blue-50 shadow-md' 
                      : 'border-gray-200 hover:border-blue-300'
                  ]"
                  @click="selectSport(sport)"
                >
                  <div class="flex flex-col items-center space-y-2">
                    <img :src="sport.image" :alt="sport.name" class="w-12 h-12 object-contain" />
                    <span class="text-sm font-medium text-gray-700">{{ sport.name }}</span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          <!-- Date Selection -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
              Select Date
            </h3>
            
            <!-- Date Picker Button -->
            <div class="relative">
              <button 
                @click="showDatePicker = !showDatePicker"
                class="flex items-center justify-between w-full md:w-auto px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
              >
                <span class="flex items-center space-x-2">
                  <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  <span>{{ formatSelectedDate || 'Select Date' }}</span>
                </span>
                <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>

              <!-- Calendar Dropdown -->
              <div 
                v-if="showDatePicker" 
                class="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-10 p-4 w-80"
              >
                <!-- Calendar Header -->
                <div class="flex items-center justify-between mb-4">
                  <button @click="previousMonth" class="p-2 hover:bg-gray-100 rounded-lg">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                    </svg>
                  </button>
                  <h4 class="text-lg font-semibold">{{ currentMonthYear }}</h4>
                  <button @click="nextMonth" class="p-2 hover:bg-gray-100 rounded-lg">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </button>
                </div>

                <!-- Days of Week -->
                <div class="grid grid-cols-7 gap-1 mb-2">
                  <div v-for="day in ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']" :key="day" class="text-center text-sm font-medium text-gray-500 py-2">
                    {{ day }}
                  </div>
                </div>

                <!-- Calendar Days -->
                <div class="grid grid-cols-7 gap-1">
                  <button
                    v-for="day in calendarDays"
                    :key="`${day.fullDate.getTime()}`"
                    @click="selectDate(day)"
                    :disabled="day.isPast || !day.isCurrentMonth"
                    :class="[
                      'p-2 text-sm rounded-lg transition-all duration-200',
                      !day.isCurrentMonth ? 'text-gray-300 cursor-not-allowed' :
                      day.isPast ? 'text-gray-400 cursor-not-allowed' :
                      day.isToday ? 'bg-blue-100 text-blue-600 font-semibold' :
                      selectedDate && selectedDate.toDateString() === day.fullDate.toDateString() ? 'bg-blue-500 text-white' :
                      'hover:bg-blue-100 text-gray-700'
                    ]"
                  >
                    {{ day.date }}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Time Selection -->
          <div class="space-y-4" v-if="selectedDate">
            <h3 class="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
              Available Time Slots
            </h3>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                v-for="timeSlot in timeSlots"
                :key="timeSlot.time"
                @click="selectTime(timeSlot)"
                :disabled="!isTimeAvailable(timeSlot)"
                :class="[
                  'p-4 border-2 rounded-lg transition-all duration-200',
                  !isTimeAvailable(timeSlot) ? 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed' :
                  isTimeSelected(timeSlot) ? 'border-blue-500 bg-blue-50 shadow-md' :
                  'border-gray-200 hover:border-blue-300 hover:shadow-md'
                ]"
              >
                <div class="text-center">
                  <div class="text-lg font-semibold">{{ timeSlot.time }}</div>
                  <div class="text-sm text-gray-600">${{ timeSlot.price }}</div>
                  <div class="text-xs text-gray-500">{{ timeSlot.duration }} min</div>
                </div>
              </button>
            </div>
          </div>

          <!-- Booking Summary -->
          <div v-if="isFormValid" class="bg-blue-50 rounded-lg p-6 border border-blue-200">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">Booking Summary</h3>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-600">Venue:</span>
                <span class="font-medium">{{ venues.find(v => v.id === selectedVenue)?.name }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Sport:</span>
                <span class="font-medium">{{ selectedSport?.name }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Date:</span>
                <span class="font-medium">{{ formatSelectedDate }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Time:</span>
                <span class="font-medium">{{ selectedTime?.time }} ({{ selectedTime?.duration }} min)</span>
              </div>
              <div class="flex justify-between border-t pt-2 mt-2">
                <span class="text-gray-600 font-semibold">Total:</span>
                <span class="font-bold text-lg">${{ selectedTime?.price }}</span>
              </div>
            </div>
          </div>

          <!-- Proceed Button -->
          <div class="flex justify-center pt-6">
            <button 
              @click="handleProceed"
              :disabled="!isFormValid"
              :class="[
                'font-semibold py-4 px-12 rounded-lg shadow-lg transform transition-all duration-200 focus:outline-none focus:ring-4 flex items-center space-x-3',
                isFormValid 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white hover:scale-105 focus:ring-blue-300' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              ]"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
              <span>Proceed to Checkout</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </main>
</template>

<style scoped>
/* Custom focus styles for better accessibility */
select:focus, button:focus {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Smooth transitions for interactive elements */
select, button {
  transition: all 0.2s ease-in-out;
}

/* Calendar dropdown animation */
.calendar-dropdown {
  animation: slideDown 0.2s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>