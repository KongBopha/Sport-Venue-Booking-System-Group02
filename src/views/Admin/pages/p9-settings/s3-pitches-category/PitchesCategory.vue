<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-100">
    <div class="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
      <h3 class="text-lg font-semibold text-gray-900">Pitches Category Management</h3>
      <button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
        <Plus class="w-4 h-4" />
        <span>Add Category</span>
      </button>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      <div v-for="category in categories" :key="category.id" class="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center space-x-3">
            <div :class="['w-10 h-10 rounded-lg flex items-center justify-center', category.bgColor]">
              <component :is="category.icon" :class="['w-5 h-5', category.iconColor]" />
            </div>
            <div>
              <h4 class="font-medium text-gray-900">{{ category.name }}</h4>
              <p class="text-sm text-gray-500">{{ category.pitchCount }} pitches</p>
            </div>
          </div>
          <button class="text-gray-400 hover:text-gray-600">
            <MoreVertical class="w-4 h-4" />
          </button>
        </div>
        <div class="space-y-2">
          <div class="flex justify-between text-sm">
            <span class="text-gray-500">Base Price</span>
            <span class="font-medium">${{ category.basePrice }}/hour</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-gray-500">Max Capacity</span>
            <span class="font-medium">{{ category.maxCapacity }} players</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-gray-500">Booking Duration</span>
            <span class="font-medium">{{ category.duration }} hours</span>
          </div>
        </div>
        <div class="mt-4 flex space-x-2">
          <button class="flex-1 text-blue-600 hover:text-blue-700 text-sm font-medium">Edit</button>
          <button class="flex-1 text-red-600 hover:text-red-700 text-sm font-medium">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Plus, MoreVertical, Zap, Users, Waves, Target } from 'lucide-vue-next'

const categories = ref([
  { 
    id: 1, 
    name: 'Football', 
    pitchCount: 3, 
    basePrice: 150, 
    maxCapacity: 22, 
    duration: 2,
    icon: Zap,
    bgColor: 'bg-green-100',
    iconColor: 'text-green-600'
  },
  { 
    id: 2, 
    name: 'Basketball', 
    pitchCount: 2, 
    basePrice: 100, 
    maxCapacity: 10, 
    duration: 1,
    icon: Target,
    bgColor: 'bg-orange-100',
    iconColor: 'text-orange-600'
  },
  { 
    id: 3, 
    name: 'Tennis', 
    pitchCount: 4, 
    basePrice: 75, 
    maxCapacity: 4, 
    duration: 1,
    icon: Users,
    bgColor: 'bg-blue-100',
    iconColor: 'text-blue-600'
  },
  { 
    id: 4, 
    name: 'Swimming', 
    pitchCount: 1, 
    basePrice: 200, 
    maxCapacity: 50, 
    duration: 2,
    icon: Waves,
    bgColor: 'bg-cyan-100',
    iconColor: 'text-cyan-600'
  }
])
</script>