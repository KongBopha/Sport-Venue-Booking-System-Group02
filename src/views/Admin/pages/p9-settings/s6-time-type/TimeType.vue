<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-100">
    <div class="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
      <h3 class="text-lg font-semibold text-gray-900">Time Type Configuration</h3>
      <button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
        <Plus class="w-4 h-4" />
        <span>Add Time Slot</span>
      </button>
    </div>
    <div class="p-6">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Time Slots List -->
        <div class="space-y-4">
          <h4 class="font-medium text-gray-900">Time Slot Types</h4>
          <div v-for="timeType in timeTypes" :key="timeType.id" class="border border-gray-200 rounded-lg p-4">
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center space-x-3">
                <div :class="['w-10 h-10 rounded-lg flex items-center justify-center', timeType.bgColor]">
                  <Clock :class="['w-5 h-5', timeType.iconColor]" />
                </div>
                <div>
                  <h5 class="font-medium text-gray-900">{{ timeType.name }}</h5>
                  <p class="text-sm text-gray-500">{{ timeType.timeRange }}</p>
                </div>
              </div>
              <span :class="['px-2 py-1 text-xs font-medium rounded-full', 
                timeType.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800']">
                {{ timeType.status }}
              </span>
            </div>
            <div class="grid grid-cols-2 gap-4 text-sm mb-3">
              <div>
                <span class="text-gray-500">Price Multiplier:</span>
                <span class="font-medium ml-1">{{ timeType.priceMultiplier }}x</span>
              </div>
              <div>
                <span class="text-gray-500">Duration:</span>
                <span class="font-medium ml-1">{{ timeType.duration }}h</span>
              </div>
            </div>
            <div class="flex space-x-2">
              <button class="flex-1 text-blue-600 hover:text-blue-700 text-sm font-medium">Edit</button>
              <button class="flex-1 text-red-600 hover:text-red-700 text-sm font-medium">Delete</button>
            </div>
          </div>
        </div>

        <!-- Time Schedule Grid -->
        <div class="space-y-4">
          <h4 class="font-medium text-gray-900">Daily Schedule Overview</h4>
          <div class="bg-gray-50 rounded-lg p-4">
            <div class="grid grid-cols-24 gap-1 mb-2">
              <div v-for="hour in 24" :key="hour" class="text-xs text-center text-gray-500">
                {{ hour - 1 }}
              </div>
            </div>
            <div v-for="day in weekDays" :key="day" class="mb-2">
              <div class="text-sm font-medium text-gray-700 mb-1">{{ day }}</div>
              <div class="grid grid-cols-24 gap-1">
                <div v-for="hour in 24" :key="hour" 
                     :class="['h-6 rounded', getTimeSlotColor(day, hour - 1)]"
                     :title="getTimeSlotInfo(day, hour - 1)">
                </div>
              </div>
            </div>
            <div class="mt-4 flex flex-wrap gap-2 text-xs">
              <div class="flex items-center space-x-1">
                <div class="w-3 h-3 bg-blue-200 rounded"></div>
                <span>Off-Peak</span>
              </div>
              <div class="flex items-center space-x-1">
                <div class="w-3 h-3 bg-green-200 rounded"></div>
                <span>Regular</span>
              </div>
              <div class="flex items-center space-x-1">
                <div class="w-3 h-3 bg-yellow-200 rounded"></div>
                <span>Peak</span>
              </div>
              <div class="flex items-center space-x-1">
                <div class="w-3 h-3 bg-red-200 rounded"></div>
                <span>Premium</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { Clock, Plus } from 'lucide-vue-next'
import  AdminTimeTypeService  from './service';
export default {
  name: 'Time-Type',
  data() {
    return {
    timeTypes : ref([
      { 
        id: 1, 
        name: 'Off-Peak', 
        timeRange: '6:00 AM - 9:00 AM',
        priceMultiplier: 0.8,
        duration: 1,
        status: 'Active',
        bgColor: 'bg-blue-100',
        iconColor: 'text-blue-600'
      },
      { 
        id: 2, 
        name: 'Regular', 
        timeRange: '9:00 AM - 5:00 PM',
        priceMultiplier: 1.0,
        duration: 1,
        status: 'Active',
        bgColor: 'bg-green-100',
        iconColor: 'text-green-600'
      },
      { 
        id: 3, 
        name: 'Peak', 
        timeRange: '5:00 PM - 9:00 PM',
        priceMultiplier: 1.5,
        duration: 1,
        status: 'Active',
        bgColor: 'bg-yellow-100',
        iconColor: 'text-yellow-600'
      },
      { 
        id: 4, 
        name: 'Premium', 
        timeRange: '9:00 PM - 11:00 PM',
        priceMultiplier: 2.0,
        duration: 1,
        status: 'Active',
        bgColor: 'bg-red-100',
        iconColor: 'text-red-600'
      }
    ])


    }
  },
  async created() {
    await this.listing();
  },
  methods: {
    async listing() {
      try {
        const response = await AdminTimeTypeService.listing();
        console.log(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  }

}

const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

const getTimeSlotColor = (day, hour) => {
  if (hour >= 6 && hour < 9) return 'bg-blue-200'
  if (hour >= 9 && hour < 17) return 'bg-green-200'
  if (hour >= 17 && hour < 21) return 'bg-yellow-200'
  if (hour >= 21 && hour < 23) return 'bg-red-200'
  return 'bg-gray-100'
}

const getTimeSlotInfo = (day, hour) => {
  if (hour >= 6 && hour < 9) return 'Off-Peak Hours'
  if (hour >= 9 && hour < 17) return 'Regular Hours'
  if (hour >= 17 && hour < 21) return 'Peak Hours'
  if (hour >= 21 && hour < 23) return 'Premium Hours'
  return 'Closed'
}
</script>
