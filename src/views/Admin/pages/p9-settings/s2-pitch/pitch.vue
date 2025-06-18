<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-100">
    <div class="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
      <h3 class="text-lg font-semibold text-gray-900">Pitch Management</h3>
      <button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
        <Plus class="w-4 h-4" />
        <span>Add Pitch</span>
      </button>
    </div>
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pitch Name</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Capacity</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price/Hour</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-for="pitch in pitches" :key="pitch.id" class="hover:bg-gray-50">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <MapPin class="w-5 h-5 text-green-600" />
                </div>
                <div class="ml-4">
                  <div class="text-sm font-medium text-gray-900">{{ pitch.name }}</div>
                  <div class="text-sm text-gray-500">{{ pitch.location }}</div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ pitch.category }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ pitch.capacity }} players</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${{ pitch.price }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span :class="['px-2 py-1 text-xs font-medium rounded-full', 
                pitch.status === 'Available' ? 'bg-green-100 text-green-800' : 
                pitch.status === 'Maintenance' ? 'bg-yellow-100 text-yellow-800' : 
                'bg-red-100 text-red-800']">
                {{ pitch.status }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <div class="flex items-center space-x-2">
                <button class="text-blue-600 hover:text-blue-900">Edit</button>
                <button class="text-red-600 hover:text-red-900">Delete</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { MapPin, Plus } from 'lucide-vue-next'
import  AdminPitchService  from './service';
export default {
  name: 'Pitch',
  data() {
    return {
      pitches : ref([
        { id: 1, name: 'Football Pitch A', location: 'North Wing', category: 'Football', capacity: 22, price: 150, status: 'Available' },
        { id: 2, name: 'Tennis Court 1', location: 'East Wing', category: 'Tennis', capacity: 4, price: 75, status: 'Available' },
        { id: 3, name: 'Basketball Court', location: 'South Wing', category: 'Basketball', capacity: 10, price: 100, status: 'Maintenance' },
        { id: 4, name: 'Swimming Pool', location: 'West Wing', category: 'Swimming', capacity: 50, price: 200, status: 'Available' }
      ])
    }
  },
  async created() {
    await this.listing();
  },
  methods: {
    async listing() {
      try {
        const response = await AdminPitchService.listing();
        console.log(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  }

}


</script>