<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-100">
    <div class="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
      <h3 class="text-lg font-semibold text-gray-900">Date Type Configuration</h3>
      <button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
        <Plus class="w-4 h-4" />
        <span>Add Date Type</span>
      </button>
    </div>
    <div class="p-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Date Types List -->
        <div class="space-y-4">
          <h4 class="font-medium text-gray-900">Available Date Types</h4>
          <div v-for="dateType in dateTypes" :key="dateType.id" class="border border-gray-200 rounded-lg p-4">
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center space-x-3">
                <div :class="['w-8 h-8 rounded-lg flex items-center justify-center', dateType.bgColor]">
                  <Calendar :class="['w-4 h-4', dateType.iconColor]" />
                </div>
                <div>
                  <h5 class="font-medium text-gray-900">{{ dateType.name }}</h5>
                  <p class="text-sm text-gray-500">{{ dateType.description }}</p>
                </div>
              </div>
              <div class="flex items-center space-x-2">
                <button class="text-blue-600 hover:text-blue-700 text-sm">Edit</button>
                <button class="text-red-600 hover:text-red-700 text-sm">Delete</button>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span class="text-gray-500">Price Multiplier:</span>
                <span class="font-medium ml-1">{{ dateType.priceMultiplier }}x</span>
              </div>
              <div>
                <span class="text-gray-500">Status:</span>
                <span :class="['ml-1 px-2 py-1 text-xs rounded-full', 
                  dateType.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800']">
                  {{ dateType.status }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Date Type Form -->
        <div class="bg-gray-50 rounded-lg p-4">
          <h4 class="font-medium text-gray-900 mb-4">Add/Edit Date Type</h4>
          <form class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="e.g., Weekend" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" rows="2" placeholder="Description of this date type"></textarea>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Price Multiplier</label>
              <input type="number" step="0.1" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="1.0" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Days</label>
              <div class="grid grid-cols-2 gap-2">
                <label v-for="day in weekDays" :key="day" class="flex items-center space-x-2">
                  <input type="checkbox" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span class="text-sm">{{ day }}</span>
                </label>
              </div>
            </div>
            <div class="flex space-x-2">
              <button type="submit" class="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Save</button>
              <button type="button" class="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { Calendar, Plus } from 'lucide-vue-next'
import  AdminDateTypeService  from './service';
export default {
  name: 'Date-Type',
  data() {
    return {
    dateTypes : ref([
      { 
        id: 1, 
        name: 'Weekday', 
        description: 'Monday to Friday regular pricing',
        priceMultiplier: 1.0,
        status: 'Active',
        bgColor: 'bg-blue-100',
        iconColor: 'text-blue-600'
      },
      { 
        id: 2, 
        name: 'Weekend', 
        description: 'Saturday and Sunday premium pricing',
        priceMultiplier: 1.5,
        status: 'Active',
        bgColor: 'bg-green-100',
        iconColor: 'text-green-600'
      },
      { 
        id: 3, 
        name: 'Holiday', 
        description: 'Public holidays special pricing',
        priceMultiplier: 2.0,
        status: 'Active',
        bgColor: 'bg-purple-100',
        iconColor: 'text-purple-600'
      },
      { 
        id: 4, 
        name: 'Off-Season', 
        description: 'Discounted pricing during low season',
        priceMultiplier: 0.8,
        status: 'Inactive',
        bgColor: 'bg-gray-100',
        iconColor: 'text-gray-600'
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
        const response = await AdminDateTypeService.listing();
        console.log(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  }

}



const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
</script>
