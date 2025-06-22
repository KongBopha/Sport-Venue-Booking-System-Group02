<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-xl shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
      <div class="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <h3 class="text-lg font-semibold text-gray-900">New Booking</h3>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600">
          <X class="w-6 h-6" />
        </button>
      </div>

      <div class="p-6">
        <!-- Step 1: Date Selection -->
        <div v-if="currentStep === 1" class="space-y-4">
          <h4 class="text-md font-medium text-gray-900">Select Date</h4>
          <input
            v-model="selectedDate"
            type="date"
            :min="new Date().toISOString().split('T')[0]"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <div class="flex justify-end">
            <button
              @click="nextStep"
              :disabled="!selectedDate"
              class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>

        <!-- Step 2: Sport Selection -->
        <div v-if="currentStep === 2" class="space-y-4">
          <h4 class="text-md font-medium text-gray-900">Select Sport</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div
              v-for="sport in availableSports"
              :key="sport.id"
              @click="selectSport(sport)"
              class="p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50"
              :class="{ 'border-blue-500 bg-blue-50': selectedSport?.id === sport.id }"
            >
              <h5 class="font-medium text-gray-900">{{ sport.name }}</h5>
              <p class="text-sm text-gray-500">{{ sport.pitches_categories?.length || 0 }} categories</p>
            </div>
          </div>
          <div class="flex justify-between">
            <button @click="prevStep" class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              Back
            </button>
            <button
              @click="nextStep"
              :disabled="!selectedSport"
              class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>

        <!-- Step 3: Pitch Category Selection -->
        <div v-if="currentStep === 3" class="space-y-4">
          <h4 class="text-md font-medium text-gray-900">Select Pitch Category</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              v-for="category in selectedSport?.pitches_categories"
              :key="category.id"
              @click="selectPitchCategory(category)"
              class="p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50"
              :class="{ 'border-blue-500 bg-blue-50': selectedPitchCategory?.id === category.id }"
            >
              <h5 class="font-medium text-gray-900">{{ category.name }}</h5>
              <p class="text-sm text-gray-500">${{ category.price }} base price</p>
              <p class="text-sm text-gray-500">{{ category.pitches?.length || 0 }} pitches</p>
            </div>
          </div>
          <div class="flex justify-between">
            <button @click="prevStep" class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              Back
            </button>
            <button
              @click="nextStep"
              :disabled="!selectedPitchCategory"
              class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>

        <!-- Step 4: Pitch Selection -->
        <div v-if="currentStep === 4" class="space-y-4">
          <h4 class="text-md font-medium text-gray-900">Select Pitch</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div
              v-for="pitch in selectedPitchCategory?.pitches"
              :key="pitch.id"
              @click="selectPitch(pitch)"
              class="p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50"
              :class="{ 'border-blue-500 bg-blue-50': selectedPitch?.id === pitch.id }"
            >
              <h5 class="font-medium text-gray-900">{{ pitch.name }}</h5>
            </div>
          </div>
          <div class="flex justify-between">
            <button @click="prevStep" class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              Back
            </button>
            <button
              @click="nextStep"
              :disabled="!selectedPitch"
              class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>

        <!-- Step 5: Time Slot Selection -->
        <div v-if="currentStep === 5" class="space-y-4">
          <h4 class="text-md font-medium text-gray-900">Select Time Slot</h4>
          <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            <button
              v-for="timeSlot in availableTimeSlots"
              :key="timeSlot.id"
              @click="selectTimeSlot(timeSlot)"
              :disabled="timeSlot.booked"
              class="p-3 border rounded-lg text-center"
              :class="{
                'border-blue-500 bg-blue-50 text-blue-700': selectedTimeSlot?.id === timeSlot.id,
                'border-gray-200 hover:border-blue-300': !timeSlot.booked && selectedTimeSlot?.id !== timeSlot.id,
                'border-red-200 bg-red-50 text-red-500 cursor-not-allowed': timeSlot.booked
              }"
            >
              {{ timeSlot.name }}
              <div v-if="timeSlot.booked" class="text-xs">Booked</div>
            </button>
          </div>
          <div class="flex justify-between">
            <button @click="prevStep" class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              Back
            </button>
            <button
              @click="nextStep"
              :disabled="!selectedTimeSlot"
              class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>

        <!-- Step 6: Booking Details -->
        <div v-if="currentStep === 6" class="space-y-6">
          <h4 class="text-md font-medium text-gray-900">Booking Details</h4>
          
          <!-- User Selection -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Customer</label>
            <select
              v-model="bookingForm.user_id"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              @change="onUserChange"
            >
              <option value="">Select Customer</option>
              <option v-for="user in setupData.users" :key="user.id" :value="user.id">
                {{ user.name }} - {{ user.email }}
              </option>
            </select>
          </div>

          <!-- Phone Numbers -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <input
                v-model="bookingForm.phone"
                type="tel"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Phone 2 (Optional)</label>
              <input
                v-model="bookingForm.phone2"
                type="tel"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <!-- Booking Status -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              v-model="bookingForm.booking_status_id"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option v-for="status in setupData.booking_statuses" :key="status.id" :value="status.id">
                {{ status.name }}
              </option>
            </select>
          </div>

          <!-- Price Display -->
          <div class="bg-gray-50 p-4 rounded-lg">
            <div class="flex justify-between items-center">
              <span class="text-lg font-medium text-gray-900">Total Price:</span>
              <span class="text-2xl font-bold text-blue-600">${{ calculatedPrice }}</span>
            </div>
          </div>

          <!-- Summary -->
          <div class="bg-blue-50 p-4 rounded-lg">
            <h5 class="font-medium text-blue-900 mb-2">Booking Summary</h5>
            <div class="text-sm text-blue-800 space-y-1">
              <p><strong>Sport:</strong> {{ selectedSport?.name }}</p>
              <p><strong>Pitch:</strong> {{ selectedPitch?.name }}</p>
              <p><strong>Date:</strong> {{ formatDate(selectedDate) }}</p>
              <p><strong>Time:</strong> {{ selectedTimeSlot?.name }}</p>
            </div>
          </div>

          <div class="flex justify-between">
            <button @click="prevStep" class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              Back
            </button>
            <button
              @click="createBooking"
              :disabled="!isFormValid || creating"
              class="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
              {{ creating ? 'Creating...' : 'Create Booking' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, watch } from 'vue'
import { X } from 'lucide-vue-next'
import AdminBookingService from './service'

export default {
  name: 'NewBookingDialog',
  components: { X },
  props: {
    setupData: {
      type: Object,
      required: true
    }
  },
  emits: ['close', 'created'],
  setup(props, { emit }) {
    const currentStep = ref(1)
    const creating = ref(false)
    const selectedDate = ref(new Date().toISOString().split('T')[0])
    const selectedSport = ref(null)
    const selectedPitchCategory = ref(null)
    const selectedPitch = ref(null)
    const selectedTimeSlot = ref(null)
    const availableSports = ref(props.setupData.sports)
    const availableTimeSlots = ref([])
    const calculatedPrice = ref(0)

    const bookingForm = reactive({
      phone: '',
      phone2: '',
      pitch_id: null,
      user_id: null,
      date: null,
      time_id: null,
      duration_in_hours: 2,
      booking_status_id: 1, // Pending
      price: 0
    })

    const isFormValid = computed(() => {
      return bookingForm.phone && 
             bookingForm.user_id && 
             bookingForm.pitch_id && 
             bookingForm.time_id
    })

    const loadSportsForDate = async () => {
      try {
        const response = await AdminBookingService.dataSetup( selectedDate.value, selectedPitch.value?.id)
        availableSports.value = response.data.sports
        availableTimeSlots.value = response.data.time_slots
      } catch (error) {
        console.error('Error loading sports:', error)
      }
    }

    const selectSport = (sport) => {
      selectedSport.value = sport
      selectedPitchCategory.value = null
      selectedPitch.value = null
    }

    const selectPitchCategory = (category) => {
      selectedPitchCategory.value = category
      selectedPitch.value = null
    }

    const selectPitch = (pitch) => {
      selectedPitch.value = pitch
      bookingForm.pitch_id = pitch.id
      loadSportsForDate();
    }

    const selectTimeSlot = (timeSlot) => {
      if (!timeSlot.booked) {
        selectedTimeSlot.value = timeSlot
        bookingForm.time_id = timeSlot.id
        calculatePrice()
      }
    }

    const onUserChange = () => {
      const user = props.setupData.users.find(u => u.id === bookingForm.user_id)
      if (user) {
        bookingForm.phone = user.phone || ''
        bookingForm.phone2 = user.phone2 || ''
      }
    }

    const calculatePrice = async () => {
      if (selectedDate.value && bookingForm.time_id && bookingForm.pitch_id) {
        try {
          const params = {
            date: selectedDate.value,
            time_id: bookingForm.time_id,
            pitch_id: bookingForm.pitch_id
          }
          const response = await AdminBookingService.calculatePrice(params)
          calculatedPrice.value = response.data.price
          bookingForm.price = response.data.price
        } catch (error) {
          console.error('Error calculating price:', error)
        }
      }
    }

    const createBooking = async () => {
      try {
        creating.value = true
        const date = new Date(selectedDate.value); // Example input
        const year = date.getFullYear(); // 2025

        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based

        const day = String(date.getDate()).padStart(2, '0');

        bookingForm.date = `${year}-${month}-${day}`;
        
        await AdminBookingService.create(bookingForm)
        emit('created')
      } catch (error) {
        console.error('Error creating booking:', error)
        alert('Error creating booking. Please try again.')
      } finally {
        creating.value = false
      }
    }

    const nextStep = () => {
      if (currentStep.value < 6) {
        currentStep.value++
      }
    }

    const prevStep = () => {
      if (currentStep.value > 1) {
        currentStep.value--
      }
    }

    const formatDate = (date) => {
      return new Date(date).toLocaleDateString()
    }

    // Watch for date changes to reload time slots
    watch(selectedDate, () => {
      loadSportsForDate()
    })

    return {
      currentStep,
      creating,
      selectedDate,
      selectedSport,
      selectedPitchCategory,
      selectedPitch,
      selectedTimeSlot,
      availableSports,
      availableTimeSlots,
      calculatedPrice,
      bookingForm,
      isFormValid,
      loadSportsForDate,
      selectSport,
      selectPitchCategory,
      selectPitch,
      selectTimeSlot,
      onUserChange,
      calculatePrice,
      createBooking,
      nextStep,
      prevStep,
      formatDate
    }
  }
}
</script>
