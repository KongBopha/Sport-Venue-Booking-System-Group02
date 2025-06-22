<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
      <div class="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <h3 class="text-lg font-semibold text-gray-900">Update Booking</h3>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600">
          <X class="w-6 h-6" />
        </button>
      </div>

      <div class="p-6">
        <div class="text-center py-8">
          <Calendar class="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h4 class="text-lg font-medium text-gray-900 mb-2">Booking Update</h4>
          <p class="text-gray-600 mb-6">
            Booking updates require the full booking management system. 
            This would redirect to the booking management page.
          </p>
          <button
            @click="$emit('close')"
            class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Calendar, X } from 'lucide-vue-next'

export default {
  name: 'UpdateBookingDialog',
  components: { Calendar, X },
  props: {
    booking: {
      type: Object,
      required: true
    }
  },
  emits: ['close', 'updated']
}
</script>
