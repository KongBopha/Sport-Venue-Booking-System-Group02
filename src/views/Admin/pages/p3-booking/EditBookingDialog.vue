<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
      <div class="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <h3 class="text-lg font-semibold text-gray-900">Edit Booking #{{ booking.id }}</h3>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600">
          <X class="w-6 h-6" />
        </button>
      </div>

      <div class="p-6 space-y-6">
        <!-- User Selection -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Customer</label>
          <select
            v-model="editForm.user_id"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            @change="onUserChange"
          >
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
              v-model="editForm.phone"
              type="tel"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Phone 2 (Optional)</label>
            <input
              v-model="editForm.phone2"
              type="tel"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <!-- Date -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Date</label>
          <input
            v-model="editForm.date"
            type="date"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            @change="calculatePrice"
          />
        </div>

        <!-- Time -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Time</label>
          <select
            v-model="editForm.time_id"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            @change="calculatePrice"
          >
            <option v-for="time in setupData.filteredTimes" :key="time.id" :value="time.id">
              {{ time.name }}
            </option>
          </select>
        </div>

        <!-- Duration -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Duration (Hours)</label>
          <select
            v-model="editForm.duration_in_hours"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            @change="calculatePrice"
          >
            <option value="1">1 Hour</option>
            <option value="2">2 Hours</option>
            <option value="3">3 Hours</option>
          </select>
        </div>

        <!-- Booking Status -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <select
            v-model="editForm.booking_status_id"
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

        <!-- Actions -->
        <div class="flex justify-end space-x-3">
          <button
            @click="$emit('close')"
            class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            @click="updateBooking"
            :disabled="updating"
            class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {{ updating ? 'Updating...' : 'Update Booking' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'
import { X } from 'lucide-vue-next'
import AdminBookingService from './service'

export default {
  name: 'EditBookingDialog',
  components: { X },
  props: {
    booking: {
      type: Object,
      required: true
    },
    setupData: {
      type: Object,
      required: true
    }
  },
  emits: ['close', 'updated'],
  setup(props, { emit }) {
    const updating = ref(false)
    const calculatedPrice = ref(0)

    const editForm = reactive({
      phone: '',
      phone2: '',
      pitch_id: null,
      user_id: null,
      date: '',
      time_id: null,
      duration_in_hours: 2,
      booking_status_id: 1,
      price: 0
    })

    const initializeForm = () => {
      editForm.phone = props.booking.phone || ''
      editForm.phone2 = props.booking.phone2 || ''
      editForm.pitch_id = props.booking.pitch_id
      editForm.user_id = props.booking.user_id
      editForm.date = new Date(props.booking.date).toISOString().split('T')[0]
      editForm.time_id = props.booking.time_id
      editForm.duration_in_hours = props.booking.duration_in_hours
      editForm.booking_status_id = props.booking.booking_status_id
      editForm.price = props.booking.price
      calculatedPrice.value = props.booking.price
    }

    const onUserChange = () => {
      const user = props.setupData.users.find(u => u.id === editForm.user_id)
      if (user) {
        editForm.phone = user.phone || ''
        editForm.phone2 = user.phone2 || ''
      }
    }

    const calculatePrice = async () => {
      if (editForm.date && editForm.time_id && editForm.pitch_id) {
        try {
          const response = await AdminBookingService.calculatePrice(
            editForm.date,
            editForm.time_id,
            editForm.pitch_id,
            editForm.duration_in_hours
          )
          calculatedPrice.value = response.data.price
          editForm.price = response.data.price
        } catch (error) {
          console.error('Error calculating price:', error)
        }
      }
    }

    const updateBooking = async () => {
      try {
        updating.value = true
        editForm.date = new Date(editForm.date)
        
        await AdminBookingService.update(props.booking.id, editForm)
        emit('updated')
      } catch (error) {
        console.error('Error updating booking:', error)
        alert('Error updating booking. Please try again.')
      } finally {
        updating.value = false
      }
    }

    onMounted(() => {
      initializeForm()
    })

    return {
      updating,
      calculatedPrice,
      editForm,
      onUserChange,
      calculatePrice,
      updateBooking
    }
  }
}
</script>
