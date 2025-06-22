<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
      <div class="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <h3 class="text-lg font-semibold text-gray-900">Advanced Filters</h3>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600">
          <X class="w-6 h-6" />
        </button>
      </div>

      <div class="p-6 space-y-4">
        <!-- Search -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Search by Phone</label>
          <input
            v-model="filterForm.key"
            type="text"
            placeholder="Enter phone number..."
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <!-- Date -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Date</label>
          <input
            v-model="filterForm.date"
            type="date"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <!-- Time -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Time</label>
          <select
            v-model="filterForm.time_id"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Times</option>
            <option v-for="time in setupData.filteredTimes" :key="time.id" :value="time.id">
              {{ time.name }}
            </option>
          </select>
        </div>

        <!-- User -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Customer</label>
          <select
            v-model="filterForm.user_id"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Customers</option>
            <option v-for="user in setupData.users" :key="user.id" :value="user.id">
              {{ user.name }}
            </option>
          </select>
        </div>

        <!-- Actions -->
        <div class="flex justify-end space-x-3 pt-4">
          <button
            @click="clearFilters"
            class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Clear
          </button>
          <button
            @click="applyFilters"
            class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { X } from 'lucide-vue-next'

export default {
  name: 'FilterDialog',
  components: { X },
  props: {
    filters: {
      type: Object,
      required: true
    },
    setupData: {
      type: Object,
      required: true
    }
  },
  emits: ['close', 'apply'],
  setup(props, { emit }) {
    const filterForm = reactive({
      key: props.filters.key || '',
      date: props.filters.date || '',
      time_id: props.filters.time_id || '',
      user_id: props.filters.user_id || ''
    })

    const applyFilters = () => {
      emit('apply', { ...filterForm })
    }

    const clearFilters = () => {
      filterForm.key = ''
      filterForm.date = new Date().toISOString().split('T')[0]
      filterForm.time_id = ''
      filterForm.user_id = ''
    }

    return {
      filterForm,
      applyFilters,
      clearFilters
    }
  }
}
</script>
