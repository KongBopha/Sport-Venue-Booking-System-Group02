<template>
  <div class="space-y-8">
    <!-- Booking Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Total Bookings</p>
            <p class="text-3xl font-bold text-gray-900 mt-2">2,847</p>
          </div>
          <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <Calendar class="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>
      
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Today's Bookings</p>
            <p class="text-3xl font-bold text-gray-900 mt-2">67</p>
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
            <p class="text-3xl font-bold text-gray-900 mt-2">23</p>
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
            <p class="text-3xl font-bold text-gray-900 mt-2">12</p>
          </div>
          <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
            <X class="w-6 h-6 text-red-600" />
          </div>
        </div>
      </div>
    </div>

    <!-- Calendar and Bookings -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Bookings Table -->
      <div class="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100">
        <div class="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h3 class="text-lg font-semibold text-gray-900">Recent Bookings</h3>
          <div class="flex items-center space-x-2">
            <button class="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter class="w-4 h-4 inline mr-1" />
              Filter
            </button>
            <button class="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Plus class="w-4 h-4 inline mr-1" />
              New Booking
            </button>
          </div>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Booking ID</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Venue</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date & Time</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-for="booking in bookings" :key="booking.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">{{ booking.id }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <span class="text-xs font-medium">{{ booking.customer.charAt(0) }}</span>
                    </div>
                    <div class="ml-3">
                      <div class="text-sm font-medium text-gray-900">{{ booking.customer }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ booking.venue }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ booking.datetime }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="['px-2 py-1 text-xs font-medium rounded-full', 
                    booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 
                    booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-red-100 text-red-800']">
                    {{ booking.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${{ booking.amount }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div class="flex items-center space-x-2">
                    <button class="text-blue-600 hover:text-blue-900">Edit</button>
                    <button class="text-red-600 hover:text-red-900">Cancel</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Today's Schedule -->
      <div class="space-y-6">
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Today's Schedule</h3>
          <div class="space-y-4">
            <div v-for="schedule in todaySchedule" :key="schedule.id" class="border-l-4 border-blue-500 pl-4 py-2">
              <div class="flex items-center justify-between">
                <div>
                  <p class="font-medium text-gray-900">{{ schedule.venue }}</p>
                  <p class="text-sm text-gray-500">{{ schedule.customer }}</p>
                </div>
                <div class="text-right">
                  <p class="text-sm font-medium text-gray-900">{{ schedule.time }}</p>
                  <p class="text-xs text-gray-500">{{ schedule.duration }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Venue Availability</h3>
          <div class="space-y-3">
            <div v-for="venue in venueAvailability" :key="venue.name" class="flex items-center justify-between">
              <div>
                <p class="font-medium text-gray-900">{{ venue.name }}</p>
                <p class="text-sm text-gray-500">{{ venue.nextAvailable }}</p>
              </div>
              <span :class="['px-2 py-1 text-xs font-medium rounded-full', venue.statusColor]">
                {{ venue.status }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { 
  Calendar, 
  Clock, 
  AlertCircle, 
  X, 
  Filter, 
  Plus
} from 'lucide-vue-next'

const bookings = ref([
  { id: 'BK001', customer: 'John Doe', venue: 'Tennis Court A', datetime: '2024-01-15 10:00', status: 'Confirmed', amount: 150 },
  { id: 'BK002', customer: 'Jane Smith', venue: 'Basketball Court', datetime: '2024-01-15 14:00', status: 'Pending', amount: 75 },
  { id: 'BK003', customer: 'Mike Johnson', venue: 'Swimming Pool', datetime: '2024-01-16 09:00', status: 'Confirmed', amount: 200 },
  { id: 'BK004', customer: 'Sarah Wilson', venue: 'Football Field', datetime: '2024-01-16 16:00', status: 'Cancelled', amount: 100 },
  { id: 'BK005', customer: 'Tom Brown', venue: 'Badminton Court', datetime: '2024-01-17 11:00', status: 'Confirmed', amount: 50 }
])

const todaySchedule = ref([
  { id: 1, venue: 'Tennis Court A', customer: 'John Doe', time: '10:00 AM', duration: '2 hours' },
  { id: 2, venue: 'Basketball Court', customer: 'Jane Smith', time: '2:00 PM', duration: '1 hour' },
  { id: 3, venue: 'Swimming Pool', customer: 'Mike Johnson', time: '4:00 PM', duration: '1.5 hours' },
  { id: 4, venue: 'Football Field', customer: 'Sarah Wilson', time: '6:00 PM', duration: '2 hours' }
])

const venueAvailability = ref([
  { name: 'Tennis Court A', nextAvailable: 'Available at 12:00 PM', status: 'Busy', statusColor: 'bg-yellow-100 text-yellow-800' },
  { name: 'Basketball Court', nextAvailable: 'Available now', status: 'Available', statusColor: 'bg-green-100 text-green-800' },
  { name: 'Swimming Pool', nextAvailable: 'Available at 5:30 PM', status: 'Busy', statusColor: 'bg-yellow-100 text-yellow-800' },
  { name: 'Football Field', nextAvailable: 'Maintenance', status: 'Unavailable', statusColor: 'bg-red-100 text-red-800' }
])
</script>