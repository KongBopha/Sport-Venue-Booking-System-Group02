<script setup>
import Navbar from '@/components/Navbar.vue';
import { ref } from 'vue';

const selectedVenue = ref('');
const selectedSport = ref('');
const selectedDay = ref(null);
const selectedTime = ref(null);

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const times = ['5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'];

// Mock available slots data (true = available, false = booked)
const availabilityData = {
  'Mon': {
    '5:00 PM': true,
    '6:00 PM': false,
    '7:00 PM': true,
    '8:00 PM': true
  },
  'Tue': {
    '5:00 PM': false,
    '6:00 PM': true,
    '7:00 PM': true,
    '8:00 PM': false
  },
  'Wed': {
    '5:00 PM': true,
    '6:00 PM': true,
    '7:00 PM': false,
    '8:00 PM': true
  },
  'Thu': {
    '5:00 PM': false,
    '6:00 PM': false,
    '7:00 PM': true,
    '8:00 PM': true
  },
  'Fri': {
    '5:00 PM': true,
    '6:00 PM': true,
    '7:00 PM': true,
    '8:00 PM': false
  }
};

const selectVenue = (venue) => {
  selectedVenue.value = venue;
};

const selectSport = (sport) => {
  selectedSport.value = sport;
};

const selectSlot = (day, time) => {
  if (availabilityData[day][time]) {
    selectedDay.value = day;
    selectedTime.value = time;
  }
};

const isSlotAvailable = (day, time) => {
  return availabilityData[day][time];
};

const isSlotSelected = (day, time) => {
  return selectedDay.value === day && selectedTime.value === time;
};

const getSlotClass = (day, time) => {
  if (isSlotSelected(day, time)) {
    return 'bg-blue-500 text-white';
  }
  if (isSlotAvailable(day, time)) {
    return 'bg-white hover:bg-blue-100';
  }
  return 'bg-gray-200 text-gray-400 cursor-not-allowed';
};

const proceedBooking = () => {
  // Handle booking logic here
  console.log('Booking:', {
    venue: selectedVenue.value,
    sport: selectedSport.value,
    day: selectedDay.value,
    time: selectedTime.value
  });
};
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
            type="text" 
            placeholder="Enter location" 
            class="w-full border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            v-model="selectedVenue"
          />
          <button class="bg-blue-500 text-white px-4 py-2 rounded-r-md">Search</button>
        </div>
      </div>
      
    
      <!-- <div class="mb-8">
        <h2 class="text-lg font-medium mb-4">Select Sport</h2>
        <div class="flex gap-4">
          <button 
            @click="selectSport('soccer')" 
            :class="['flex flex-col items-center justify-center w-16 h-16 rounded-lg border', 
              selectedSport === 'soccer' ? 'border-blue-500 bg-blue-50' : 'border-gray-300']"
          >
            <div class="bg-blue-500 rounded-full w-8 h-8 flex items-center justify-center mb-1">
              <span class="text-white text-xs">⚽</span>
            </div>
            <span class="text-xs">Soccer</span>
          </button>
          
          <button 
            @click="selectSport('badminton')" 
            :class="['flex flex-col items-center justify-center w-16 h-16 rounded-lg border', 
              selectedSport === 'badminton' ? 'border-blue-500 bg-blue-50' : 'border-gray-300']"
          >
            <div class="bg-blue-500 rounded-full w-8 h-8 flex items-center justify-center mb-1">
              <span class="text-white text-xs">🏸</span>
            </div>
            <span class="text-xs">Badminton</span>
          </button>
          
          <button 
            @click="selectSport('tennis')" 
            :class="['flex flex-col items-center justify-center w-16 h-16 rounded-lg border', 
              selectedSport === 'tennis' ? 'border-blue-500 bg-blue-50' : 'border-gray-300']"
          >
            <div class="bg-blue-500 rounded-full w-8 h-8 flex items-center justify-center mb-1">
              <span class="text-white text-xs">🎾</span>
            </div>
            <span class="text-xs">Tennis</span>
          </button>
        </div>
      </div> -->
      

      <div class="mb-8">
        <h2 class="text-lg font-medium mb-4">Select Time</h2>
        <p class="text-sm text-gray-600 mb-2">March 2025</p>
        
        
        <div class="border border-gray-300 rounded-lg overflow-hidden">
        
          <div class="grid grid-cols-5 bg-gray-100 border-b border-gray-300">
            <div v-for="day in days" :key="day" class="p-2 text-center text-sm font-medium">
              {{ day }}
            </div>
          </div>
          
         
          <!-- <div v-for="time in times" :key="time" class="grid grid-cols-5 border-b border-gray-200 last:border-b-0">
            <div v-for="day in days" :key="`${day}-${time}`" 
                 class="border-r border-gray-200 last:border-r-0 p-2 text-center text-sm">
              <div v-if="time === '5:00 PM' && day === 'Mon'" class="font-medium mb-1">{{ time }}</div>
              <div v-else-if="time === '5:00 PM'" class="font-medium mb-1">{{ time }}</div>
              <button 
                @click="selectSlot(day, time)"
                :disabled="!isSlotAvailable(day, time)"
                :class="['w-full py-1 rounded transition-colors duration-200', getSlotClass(day, time)]"
              >
                {{ isSlotAvailable(day, time) ? 'Available' : 'Booked' }}
              </button>
            </div>
          </div> -->
        </div>
      </div>
      
     
      <!-- <div class="flex justify-center">
        <button 
          @click="proceedBooking"
          :disabled="!selectedVenue || !selectedSport || !selectedDay || !selectedTime"
          :class="['px-8 py-3 rounded-md text-white font-medium', 
            selectedVenue && selectedSport && selectedDay && selectedTime ? 
            'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed']"
        >
          Proceed
        </button>
      </div> -->
    </div>
    
   
    <!-- <div class="max-w-4xl mx-auto my-8 bg-gray-100 p-6 rounded-lg flex items-center justify-between">
      <div>
        <h3 class="font-medium">Follow in the same footsteps</h3>
        <p class="text-sm text-gray-600">Did you know approximately 8,000 people book venues every day?</p>
      </div>
      <button class="px-6 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
        Accept
      </button>
    </div> -->
  </main>
</template>