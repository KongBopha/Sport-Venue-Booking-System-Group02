<script setup>
import { ref } from 'vue'
import Navbar from '@/components/Navbar.vue'
import ballImage from '@/assets/images/ball2.jpeg'
import footballImg from '@/assets/images/football.png'
import batmintonImg from '@/assets/images/batminton.png'
import volleyballImg from '@/assets/images/volleyball.png'
import Footer from '@/components/Footer.vue';

const selectedDate = ref(null)
const selectedTime = ref(null)


const currentMonth = ref('March 2025')
const calendarDays = ref([
  { day: 'Sun', date: 16, isAvailable: true },
  { day: 'Mon', date: 17, isAvailable: true },
  { day: 'Tue', date: 18, isAvailable: true },
  { day: 'Wed', date: 19, isAvailable: true },
  { day: 'Thu', date: 20, isAvailable: true },
  { day: 'Fri', date: 21, isAvailable: true },
  { day: 'Sat', date: 22, isAvailable: true }
])

const timeSlots = [
  { time: '5:00 PM', slots: [
    { day: 16, price: 50, duration: 120, available: false },
    { day: 17, price: 50, duration: 120, available: true },
    { day: 18, price: 50, duration: 120, available: true },
    { day: 19, price: 50, duration: 120, available: false },
    { day: 20, price: 50, duration: 120, available: true },
    { day: 21, price: 50, duration: 120, available: true },
    { day: 22, price: 50, duration: 120, available: true }
  ]},
  { time: '7:00 PM', slots: [
    { day: 16, price: 50, duration: 120, available: true },
    { day: 17, price: 50, duration: 120, available: true },
    { day: 18, price: 50, duration: 120, available: true },
    { day: 19, price: 50, duration: 120, available: true },
    { day: 20, price: 50, duration: 120, available: true },
    { day: 21, price: 50, duration: 120, available: true },
    { day: 22, price: 50, duration: 120, available: true }
  ]},
  { time: '9:00 PM', slots: [
    { day: 16, price: 50, duration: 120, available: true },
    { day: 17, price: 50, duration: 120, available: true },
    { day: 18, price: 50, duration: 120, available: true },
    { day: 19, price: 50, duration: 120, available: true },
    { day: 20, price: 50, duration: 120, available: true },
    { day: 21, price: 50, duration: 120, available: true },
    { day: 22, price: 50, duration: 120, available: true }
  ]}
]


const selectedSport = ref(null)


const selectDate = (day) => {
  selectedDate.value = day
}

const selectTime = (time, day) => {
  
  const timeSlot = timeSlots.find(slot => slot.time === time)
  if (timeSlot) {
    const daySlot = timeSlot.slots.find(slot => slot.day === day)
    if (daySlot && daySlot.available) {
      selectedTime.value = { time, day }
    }
  }
}

const selectSport = (sport) => {
  selectedSport.value = sport
}

const isSlotSelected = (time, day) => {
  return selectedTime.value && selectedTime.value.time === time && selectedTime.value.day === day
}

const isSlotAvailable = (time, day) => {
  const timeSlot = timeSlots.find(slot => slot.time === time)
  if (timeSlot) {
    const daySlot = timeSlot.slots.find(slot => slot.day === day)
    return daySlot && daySlot.available
  }
  return false
}
</script>

<template>
  <main class="min-h-screen bg-white">
    <Navbar />

    <!-- banner -->
    <div class="w-full h-64 bg-cover bg-center relative" :style="`background-image: url(${ballImage})`">
      <div class="absolute inset-0 bg-black bg-opacity-30"></div>
    </div>

    <div class="flex justify-center mt-4">
      <div class="flex gap-6 items-center text-center text-sm">
        <div class="flex flex-col items-center text-[#4F6DF5]">
          <div class="w-6 h-6 rounded-full bg-[#4F6DF5] text-white flex items-center justify-center text-xs">1</div>
          <span>Booking</span>
        </div>
        <div class="w-10 h-0.5 bg-gray-400"></div>
        <div class="flex flex-col items-center text-gray-400">
          <div class="w-6 h-6 rounded-full border border-gray-400 flex items-center justify-center text-xs">2</div>
          <span>Checkout</span>
        </div>
        <div class="w-10 h-0.5 bg-gray-400"></div>
        <div class="flex flex-col items-center text-gray-400">
          <div class="w-6 h-6 rounded-full border border-gray-400 flex items-center justify-center text-xs">3</div>
          <span>Confirmation</span>
        </div>
      </div>
    </div>

    
    <div class="flex justify-center mt-6">
      <div class="w-[80%] bg-white p-6 rounded-md shadow-md">
        <!-- venue selection -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label class="block text-gray-700 font-semibold mb-2">Find Venue</label>
            <select class="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400">
              <option>Choose Venue</option>
              <option>Venue 1</option>
              <option>Venue 2</option>
            </select>
          </div>
    
          <div>
            <label class="block text-gray-700 font-semibold mb-2">Select Sport</label>
            <div class="flex gap-2">
              <button 
                :class="['border rounded-md p-2', selectedSport === 'football' ? 'bg-blue-100 border-blue-500' : 'hover:bg-blue-100']"
                @click="selectSport('football')"
              >
                <img :src="footballImg" alt="Football" class="w-10 h-10 object-contain" />
              </button>
              <button 
                :class="['border rounded-md p-2', selectedSport === 'batminton' ? 'bg-blue-100 border-blue-500' : 'hover:bg-blue-100']"
                @click="selectSport('batminton')"
              >
                <img :src="batmintonImg" alt="Batminton" class="w-10 h-10 object-contain" />
              </button>
              <button 
                :class="['border rounded-md p-2', selectedSport === 'volleyball' ? 'bg-blue-100 border-blue-500' : 'hover:bg-blue-100']"
                @click="selectSport('volleyball')"
              >
                <img :src="volleyballImg" alt="Volleyball" class="w-10 h-10 object-contain" />
              </button>
            </div>
          </div>
        </div>

        <!-- date selection -->
        <div class="mb-4">
          <label class="block text-gray-700 font-semibold mb-2">Select Time</label>
          <div class="flex items-center gap-2">
            <button class="flex items-center gap-1 border rounded-md px-4 py-2 hover:bg-blue-100">
              {{ currentMonth }} <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path
                stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M19 9l-7 7-7-7"></path></svg>
            </button>
          </div>
        </div>

        <!-- time slot -->
        <div class="overflow-x-auto mt-4">
          <table class="w-full text-center border-collapse">
            <thead>
              <tr class="bg-gray-100">
                <th class="py-2 px-4">Start Time</th>
                <th 
                  v-for="day in calendarDays" 
                  :key="day.day" 
                  class="py-2 px-4 cursor-pointer"
                  :class="[selectedDate === day.date ? 'bg-[#4F6DF5] text-white rounded-t-md' : '']"
                  @click="selectDate(day.date)"
                >
                  {{ day.day }}<br>{{ day.date }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="timeSlot in timeSlots" :key="timeSlot.time">
                <td class="py-2 border">{{ timeSlot.time }}</td>
                <td 
                  v-for="(day, index) in calendarDays" 
                  :key="`${timeSlot.time}-${day.date}`" 
                  class="py-2 border relative"
                  :class="[
                    !isSlotAvailable(timeSlot.time, day.date) ? 'text-gray-400' : 
                    isSlotSelected(timeSlot.time, day.date) ? 'bg-[#4F6DF5] text-white' : ''
                  ]"
                  @click="isSlotAvailable(timeSlot.time, day.date) && selectTime(timeSlot.time, day.date)"
                >
                  <div v-if="!isSlotAvailable(timeSlot.time, day.date)">Booked</div>
                  <div v-else>
                    {{ timeSlot.slots[index].price }}$<br>{{ timeSlot.slots[index].duration }} min
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- proceed button -->
        <div class="flex justify-center mt-6">
          <button 
            class="bg-[#4F6DF5] hover:bg-blue-700 text-white font-bold py-2 px-8 rounded-md transition"
            :disabled="!selectedTime || !selectedSport"
            :class="{ 'opacity-50 cursor-not-allowed': !selectedTime || !selectedSport }"
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
    <Footer/>
  </main>
</template>