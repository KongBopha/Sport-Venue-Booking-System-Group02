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
        <!-- User Filter -->
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

        <!-- Status Filter -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Payment Status</label>
          <select
            v-model="filterForm.status_id"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Statuses</option>
            <option v-for="status in setupData.payment_statuses" :key="status.id" :value="status.id">
              {{ status.name }}
            </option>
          </select>
        </div>

        <!-- Method Filter -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
          <select
            v-model="filterForm.method_id"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Methods</option>
            <option v-for="method in setupData.payment_methods" :key="method.id" :value="method.id">
              {{ method.name }}
            </option>
          </select>
        </div>

        <!-- Page Size -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Items per page</label>
          <select
            v-model="filterForm.limit"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
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
      user_id: props.filters.user_id || '',
      status_id: props.filters.status_id || '',
      method_id: props.filters.method_id || '',
      limit: props.filters.limit || 10
    })

    const applyFilters = () => {
      emit('apply', { ...filterForm })
    }

    const clearFilters = () => {
      filterForm.user_id = ''
      filterForm.status_id = ''
      filterForm.method_id = ''
      filterForm.limit = 10
    }

    return {
      filterForm,
      applyFilters,
      clearFilters
    }
  }
}
</script>
