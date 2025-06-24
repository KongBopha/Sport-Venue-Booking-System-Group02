<template>
  <div class="space-y-8">
    <!-- Booking Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Total Bookings</p>
            <p class="text-3xl font-bold text-gray-900 mt-2">{{ stats.total_bookings || 0 }}</p>
          </div>
          <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <Calendar class="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>
      
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Completed Bookings</p>
            <p class="text-3xl font-bold text-gray-900 mt-2">{{ stats.total_completed_bookings || 0 }}</p>
          </div>
          <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
            <Check class="w-6 h-6 text-purple-600" />
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Confirmed Bookings</p>
            <p class="text-3xl font-bold text-gray-900 mt-2">{{ stats.total_confirmed_bookings || 0 }}</p>
          </div>
          <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <Clock class="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>
      
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Pending</p>
            <p class="text-3xl font-bold text-gray-900 mt-2">{{ stats.total_pending_bookings || 0 }}</p>
          </div>
          <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
            <AlertCircle class="w-6 h-6 text-yellow-600" />
          </div>
        </div>
      </div>
      
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Cancelled</p>
            <p class="text-3xl font-bold text-gray-900 mt-2">{{ stats.total_cancelled_bookings || 0 }}</p>
          </div>
          <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
            <X class="w-6 h-6 text-red-600" />
          </div>
        </div>
      </div>
    </div>

    <!-- Filters and Actions -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div class="flex flex-col md:flex-row gap-4">
          <input
            v-model="filters.key"
            type="text"
            placeholder="Search by phone..."
            class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            @input="debouncedSearch"
          />
          <input
            v-model="filters.date"
            type="date"
            class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            @change="loadBookings"
          />
          <select
            v-model="filters.time_id"
            class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            @change="loadBookings"
          >
            <option value="">All Times</option>
            <option v-for="time in setupData.filteredTimes" :key="time.id" :value="time.id">
              {{ time.name }}
            </option>
          </select>
        </div>
        <div class="flex gap-2">
          <button
            @click="showFilterDialog = true"
            class="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
          >
            <Filter class="w-4 h-4" />
            Advanced Filter
          </button>
          <button
            @click="startNewBooking"
            class="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus class="w-4 h-4" />
            New Booking
          </button>
        </div>
      </div>
    </div>

    <!-- Bookings Table -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-semibold text-gray-900">Bookings</h3>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sport/Pitch</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date & Time</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-for="booking in bookings" :key="booking.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">#{{ booking.id }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <span class="text-xs font-medium">{{ booking.user?.name?.charAt(0) || 'U' }}</span>
                  </div>
                  <div class="ml-3">
                    <div class="text-sm font-medium text-gray-900">{{ booking.user?.name || 'Unknown' }}</div>
                    <div class="text-sm text-gray-500">{{ booking.phone }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ booking.pitch?.category?.sport?.name }}</div>
                <div class="text-sm text-gray-500">{{ booking.pitch?.name }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ formatDate(booking.date) }}</div>
                <div class="text-sm text-gray-500">{{ booking.time?.name }} ({{ booking.duration_in_hours }}h)</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span 
                  :class="['px-2 py-1 text-xs font-medium rounded-full', getStatusColor(booking.booking_status)]"
                  :style="{ backgroundColor: booking.booking_status?.color + '20', color: booking.booking_status?.color }"
                >
                  {{ booking.booking_status?.name }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${{ booking.price }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div class="flex items-center space-x-2">
                  <button 
                    @click="editBooking(booking)"
                    class="text-blue-600 hover:text-blue-900"
                  >
                    Edit
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- New Booking Dialog -->
    <NewBookingDialog
      v-if="showNewBookingDialog"
      :setup-data="setupData"
      @close="showNewBookingDialog = false"
      @created="onBookingCreated"
    />

    <!-- Edit Booking Dialog -->
    <EditBookingDialog
      v-if="showEditBookingDialog"
      :booking="selectedBooking"
      :setup-data="setupData"
      @close="showEditBookingDialog = false"
      @updated="onBookingUpdated"
    />

    <!-- Filter Dialog -->
    <FilterDialog
      v-if="showFilterDialog"
      :filters="filters"
      :setup-data="setupData"
      @close="showFilterDialog = false"
      @apply="applyFilters"
    />
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'
import { 
  Calendar, 
  Clock, 
  AlertCircle, 
  X, 
  Filter, 
  Plus,
  Check
} from 'lucide-vue-next'
import AdminBookingService from './service'
import NewBookingDialog from './NewBookingDialog.vue'
import EditBookingDialog from './EditBookingDialog.vue'
import FilterDialog from './FilterDialog.vue'

export default {
  name: 'Booking',
  components: {
    Calendar,
    Clock,
    AlertCircle,
    X,
    Filter,
    Plus,
    NewBookingDialog,
    EditBookingDialog,
    FilterDialog
  },
  setup() {
    const bookings = ref([])
    const stats = ref({})
    const setupData = ref({})
    const loading = ref(false)
    const showNewBookingDialog = ref(false)
    const showEditBookingDialog = ref(false)
    const showFilterDialog = ref(false)
    const selectedBooking = ref(null)

    const filters = reactive({
      key: '',
      date: new Date().toISOString().split('T')[0],
      time_id: '',
      user_id: ''
    })

    const loadBookings = async () => {
      try {
        loading.value = true
        const response = await AdminBookingService.getData(filters)
        bookings.value = response.data.bookings
        stats.value = response.data
      } catch (error) {
        console.error('Error loading bookings:', error)
      } finally {
        loading.value = false
      }
    }

    const loadSetupData = async () => {
      try {
        const response = await AdminBookingService.dataSetup(filters.date)
        setupData.value = response.data
      } catch (error) {
        console.error('Error loading setup data:', error)
      }
    }

    const debouncedSearch = (() => {
      let timeout
      return () => {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          loadBookings()
        }, 500)
      }
    })()

    const startNewBooking = () => {
      showNewBookingDialog.value = true
    }

    const editBooking = (booking) => {
      selectedBooking.value = booking
      showEditBookingDialog.value = true
    }

    const cancelBooking = async (booking) => {
      if (confirm('Are you sure you want to cancel this booking?')) {
        try {
          // Update booking status to cancelled
          await AdminBookingService.update(booking.id, {
            ...booking,
            booking_status_id: 4 // Assuming 4 is cancelled status
          })
          loadBookings()
        } catch (error) {
          console.error('Error cancelling booking:', error)
        }
      }
    }

    const onBookingCreated = () => {
      showNewBookingDialog.value = false
      loadBookings()
    }

    const onBookingUpdated = () => {
      showEditBookingDialog.value = false
      loadBookings()
    }

    const applyFilters = (newFilters) => {
      Object.assign(filters, newFilters)
      showFilterDialog.value = false
      loadBookings()
    }

    const formatDate = (date) => {
      return new Date(date).toLocaleDateString()
    }

    const getStatusColor = (status) => {
      if (!status) return 'bg-gray-100 text-gray-800'
      return `bg-${status.color}-100 text-${status.color}-800`
    }

    onMounted(() => {
      loadBookings()
      loadSetupData()
    })

    return {
      bookings,
      stats,
      setupData,
      loading,
      filters,
      showNewBookingDialog,
      showEditBookingDialog,
      showFilterDialog,
      selectedBooking,
      loadBookings,
      debouncedSearch,
      startNewBooking,
      editBooking,
      cancelBooking,
      onBookingCreated,
      onBookingUpdated,
      applyFilters,
      formatDate,
      getStatusColor
    }
  }
}
</script>
