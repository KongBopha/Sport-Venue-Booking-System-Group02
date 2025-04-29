<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import { ref } from 'vue'

const selectedVenue = ref('')
const selectedSport = ref('')
const selectedDay = ref<string | null>(null)
const selectedTime = ref<string | null>(null)

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
const times = ['5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM']

// Mock available slots data
const availabilityData: Record<string, Record<string, boolean>> = {
  'Mon': { '5:00 PM': true,  '6:00 PM': false, '7:00 PM': true,  '8:00 PM': true },
  'Tue': { '5:00 PM': false, '6:00 PM': true,  '7:00 PM': true,  '8:00 PM': false },
  'Wed': { '5:00 PM': true,  '6:00 PM': true,  '7:00 PM': false, '8:00 PM': true },
  'Thu': { '5:00 PM': false, '6:00 PM': false, '7:00 PM': true,  '8:00 PM': true },
  'Fri': { '5:00 PM': true,  '6:00 PM': true,  '7:00 PM': true,  '8:00 PM': false }
}

const selectVenue = (venue: string) => {
  selectedVenue.value = venue
}

const selectSport = (sport: string) => {
  selectedSport.value = sport
}

const selectSlot = (day: string, time: string) => {
  if (availabilityData[day][time]) {
    selectedDay.value = day
    selectedTime.value = time
  }
}

const isSlotAvailable = (day: string, time: string) => availabilityData[day][time]
const isSlotSelected = (day: string, time: string) => selectedDay.value === day && selectedTime.value === time

const getSlotClass = (day: string, time: string) => {
  if (isSlotSelected(day, time)) return 'bg-blue-500 text-white'
  if (isSlotAvailable(day, time)) return 'bg-white hover:bg-blue-100'
  return 'bg-gray-200 text-gray-400 cursor-not-allowed'
}

const proceedBooking = () => {
  console.log('Booking:', {
    venue: selectedVenue.value,
    sport: selectedSport.value,
    day:   selectedDay.value,
    time:  selectedTime.value
  })
}
</script>

<template>
  <main class="min-h-screen bg-gray-100">
    <Navbar />
    <div class="max-w-4xl mx-auto mt-8 bg-white rounded-lg shadow p-6">
      <h1 class="text-2xl font-bold mb-6">Book Venue</h1>
      <!-- Step 1: Choose Venue -->
      <div class="mb-8">
        <h2 class="text-lg font-medium mb-4">Find Venue</h2>
        <div class="flex">
          <input 
            v-model="selectedVenue"
            type="text"
            placeholder="Enter location"
            class="w-full border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button class="bg-blue-500 text-white px-4 py-2 rounded-r-md">Search</button>
        </div>
      </div>
      <!-- Time selection grid -->
      <div class="mb-8">
        <h2 class="text-lg font-medium mb-4">Select Time</h2>
        <div class="border border-gray-300 rounded-lg overflow-hidden">
          <div class="grid grid-cols-5 bg-gray-100 border-b border-gray-300">
            <div v-for="day in days" :key="day" class="p-2 text-center text-sm font-medium">{{ day }}</div>
          </div>
          <div v-for="time in times" :key="time" class="grid grid-cols-5 border-b border-gray-200 last:border-b-0">
            <div v-for="day in days" :key="`${day}-${time}`" class="border-r border-gray-200 last:border-r-0 p-2 text-center text-sm">
              <button
                @click="selectSlot(day, time)"
                :disabled="!isSlotAvailable(day, time)"
                :class="['w-full py-1 rounded transition-colors duration-200', getSlotClass(day, time)]"
              >
                {{ isSlotAvailable(day, time) ? 'Available' : 'Booked' }}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-center">
        <button
          @click="proceedBooking"
          :disabled="!selectedVenue || !selectedDay || !selectedTime"
          :class="[
            'px-8 py-3 rounded-md text-white font-medium',
            selectedVenue && selectedDay && selectedTime ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'
          ]"
        >Proceed</button>
      </div>
    </div>
  </main>
</template>
