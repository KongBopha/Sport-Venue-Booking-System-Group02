<template>
  <div class="space-y-8">
    <!-- Equipment Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Total Equipment</p>
            <p class="text-3xl font-bold text-gray-900 mt-2">342</p>
          </div>
          <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <Package class="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>
      
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Available</p>
            <p class="text-3xl font-bold text-gray-900 mt-2">287</p>
          </div>
          <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <CheckCircle class="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>
      
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Rented Out</p>
            <p class="text-3xl font-bold text-gray-900 mt-2">43</p>
          </div>
          <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
            <Clock class="w-6 h-6 text-yellow-600" />
          </div>
        </div>
      </div>
      
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Maintenance</p>
            <p class="text-3xl font-bold text-gray-900 mt-2">12</p>
          </div>
          <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
            <AlertTriangle class="w-6 h-6 text-red-600" />
          </div>
        </div>
      </div>
    </div>

    <!-- Equipment Management -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100">
      <!-- Search and Actions -->
      <div class="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <div class="relative">
            <Search class="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="Search equipment..." 
              class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
            />
          </div>
          <button class="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter class="w-5 h-5 text-gray-500" />
          </button>
          <button class="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <MoreVertical class="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
          <Plus class="w-4 h-4" />
          <span>Add Equipment</span>
        </button>
      </div>

      <!-- Equipment Table -->
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50 border-b">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Added</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="item in filteredEquipment" :key="item.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <Package class="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div class="text-sm font-medium text-gray-900">{{ item.name }}</div>
                    <div class="text-sm text-gray-500">ID: {{ item.id }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ item.category }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ item.date }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${{ item.price }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="['px-2 py-1 text-xs font-medium rounded-full', 
                  item.status === 'Available' ? 'bg-green-100 text-green-800' : 
                  item.status === 'Rented' ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-red-100 text-red-800']">
                  {{ item.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div class="flex items-center space-x-2">
                  <button class="p-1 hover:bg-gray-100 rounded" title="Edit">
                    <Edit class="w-4 h-4 text-blue-600" />
                  </button>
                  <button class="p-1 hover:bg-gray-100 rounded" title="Delete">
                    <Trash2 class="w-4 h-4 text-red-600" />
                  </button>
                  <button class="p-1 hover:bg-gray-100 rounded" title="More">
                    <MoreVertical class="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <select v-model="itemsPerPage" class="border border-gray-300 rounded-lg px-3 py-2 text-sm">
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
          <span class="text-sm text-gray-600">1 - {{ Math.min(itemsPerPage, filteredEquipment.length) }} of {{ filteredEquipment.length }}</span>
        </div>
        <div class="flex items-center space-x-2">
          <button class="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50" disabled>
            <ChevronsLeft class="w-4 h-4" />
          </button>
          <button class="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50" disabled>
            <ChevronLeft class="w-4 h-4" />
          </button>
          <button class="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <ChevronRight class="w-4 h-4" />
          </button>
          <button class="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <ChevronsRight class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { 
  Package, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  Search, 
  Filter, 
  MoreVertical, 
  Plus, 
  Edit, 
  Trash2,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight
} from 'lucide-vue-next'
import  AdminEquimentService  from './service';
export default {
  name: 'Equipment',
  data() {
    return {
      // Equipment data
      equipment : ref([
        { id: 1, name: 'Soccer Ball', category: 'Football', date: '12-12-2023', price: 25, status: 'Available' },
        { id: 2, name: 'Table Tennis Paddle', category: 'Table Tennis', date: '15-12-2023', price: 35, status: 'Rented' },
        { id: 3, name: 'Basketball', category: 'Basketball', date: '18-12-2023', price: 30, status: 'Available' },
        { id: 4, name: 'Tennis Racket', category: 'Tennis', date: '20-12-2023', price: 85, status: 'Maintenance' },
        { id: 5, name: 'Volleyball', category: 'Volleyball', date: '22-12-2023', price: 28, status: 'Available' },
        { id: 6, name: 'Badminton Set', category: 'Badminton', date: '25-12-2023', price: 65, status: 'Rented' },
        { id: 7, name: 'Cricket Bat', category: 'Cricket', date: '28-12-2023', price: 95, status: 'Available' },
        { id: 8, name: 'Hockey Stick', category: 'Hockey', date: '30-12-2023', price: 75, status: 'Available' },
        { id: 9, name: 'Golf Club', category: 'Golf', date: '02-01-2024', price: 150, status: 'Maintenance' },
        { id: 10, name: 'Swimming Goggles', category: 'Swimming', date: '05-01-2024', price: 20, status: 'Available' }
      ]),
      // Search and pagination
      searchQuery : ref(''),
      itemsPerPage : ref(10),

    }
  },
  computed: {
    filteredEquipment() {
      if (!this.searchQuery) return this.equipment
      return this.equipment.filter(item =>
        item.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(this.searchQuery.toLowerCase())
      )
    }
  },
  async created() {
    await this.listing();
  },
  methods: {
    async listing() {
      try {
        const response = await AdminEquimentService.listing();
        console.log(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  }

}


</script>