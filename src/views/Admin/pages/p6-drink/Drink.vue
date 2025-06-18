<template>
  <div class="space-y-8">
    <!-- Drink Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Total Items</p>
            <p class="text-3xl font-bold text-gray-900 mt-2">234</p>
          </div>
          <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <Coffee class="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>
      
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">In Stock</p>
            <p class="text-3xl font-bold text-gray-900 mt-2">198</p>
          </div>
          <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <Package class="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>
      
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Low Stock</p>
            <p class="text-3xl font-bold text-gray-900 mt-2">28</p>
          </div>
          <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
            <AlertTriangle class="w-6 h-6 text-yellow-600" />
          </div>
        </div>
      </div>
      
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Out of Stock</p>
            <p class="text-3xl font-bold text-gray-900 mt-2">8</p>
          </div>
          <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
            <X class="w-6 h-6 text-red-600" />
          </div>
        </div>
      </div>
    </div>

    <!-- Drinks Inventory -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100">
      <div class="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <h3 class="text-lg font-semibold text-gray-900">Drink Inventory</h3>
        <div class="flex items-center space-x-2">
          <button class="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter class="w-4 h-4 inline mr-1" />
            Filter
          </button>
          <button class="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus class="w-4 h-4 inline mr-1" />
            Add Drink
          </button>
        </div>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-for="drink in drinks" :key="drink.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <Coffee class="w-5 h-5 text-blue-600" />
                  </div>
                  <div class="text-sm font-medium text-gray-900">{{ drink.name }}</div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ drink.category }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${{ drink.price }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div class="flex items-center space-x-2">
                  <button class="text-blue-600 hover:text-blue-900">Edit</button>
                  <button class="p-1 hover:bg-gray-100 rounded" title="Delete">
                    <Trash2 class="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { Coffee, Package, AlertTriangle, X, Filter, Plus } from 'lucide-vue-next'
import  AdminDrinkService  from './service';
export default {
  name: 'Drinks',
  data() {
    return {
      drinks : ref([
        { id: 1, name: 'Coca Cola', category: 'Soft Drink', price: 2.50 },
        { id: 2, name: 'Pepsi', category: 'Soft Drink', price: 2.50 },
        { id: 3, name: 'Water Bottle', category: 'Water', price: 1.50 },
        { id: 4, name: 'Sports Drink', category: 'Energy', price: 3.50 },
        { id: 5, name: 'Orange Juice', category: 'Juice', price: 4.00 },
        { id: 6, name: 'Coffee', category: 'Hot Drink', price: 3.00 },
        { id: 7, name: 'Tea', category: 'Hot Drink', price: 2.50 },
        { id: 8, name: 'Energy Drink', category: 'Energy', price: 4.50 }
      ])
    }
  },
  async created() {
    await this.listing();
  },
  methods: {
    async listing() {
      try {
        const response = await AdminDrinkService.listing();
        console.log(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  }

}

</script>