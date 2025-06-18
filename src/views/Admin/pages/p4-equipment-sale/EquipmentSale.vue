<template>
  <div class="space-y-8">
    <!-- Sales Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Total Sales</p>
            <p class="text-3xl font-bold text-gray-900 mt-2">$24,567</p>
          </div>
          <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <ShoppingBag class="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>
      
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Items Sold</p>
            <p class="text-3xl font-bold text-gray-900 mt-2">456</p>
          </div>
          <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <Package class="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>
      
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Avg. Sale Value</p>
            <p class="text-3xl font-bold text-gray-900 mt-2">$54</p>
          </div>
          <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
            <TrendingUp class="w-6 h-6 text-purple-600" />
          </div>
        </div>
      </div>

    </div>

    <!-- Sales Management -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Sales Table -->
      <div class="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100">
        <div class="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h3 class="text-lg font-semibold text-gray-900">Recent Sales</h3>
          <div class="flex items-center space-x-2">
            <button class="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter class="w-4 h-4 inline mr-1" />
              Filter
            </button>
            <button class="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Plus class="w-4 h-4 inline mr-1" />
              New Sale
            </button>
          </div>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sale ID</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Equipment</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-for="sale in sales" :key="sale.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">{{ sale.id }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <span class="text-xs font-medium">{{ sale.customer.charAt(0) }}</span>
                    </div>
                    <div class="ml-3">
                      <div class="text-sm font-medium text-gray-900">{{ sale.customer }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ sale.equipment }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ sale.quantity }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${{ sale.total }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ sale.updated_at }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div class="flex items-center space-x-2">
                    <button class="text-blue-600 hover:text-blue-900">View</button>
                    <button class="text-green-600 hover:text-green-900">Receipt</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Top Products & Quick Actions -->
      <div class="space-y-6">
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Top Selling Products</h3>
          <div class="space-y-4">
            <div v-for="product in topProducts" :key="product.id" class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Package class="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p class="font-medium text-gray-900">{{ product.name }}</p>
                  <p class="text-sm text-gray-500">{{ product.sold }} sold</p>
                </div>
              </div>
              <div class="text-right">
                <p class="font-medium text-gray-900">${{ product.revenue }}</p>
                <div class="w-16 bg-gray-200 rounded-full h-2 mt-1">
                  <div class="bg-blue-600 h-2 rounded-full" :style="{ width: product.percentage + '%' }"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div class="space-y-3">
            <button class="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center space-x-2">
              <Plus class="w-4 h-4" />
              <span>Add New Product</span>
            </button>
            <button class="w-full border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center justify-center space-x-2">
              <FileText class="w-4 h-4" />
              <span>Sales Report</span>
            </button>
            <button class="w-full border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center justify-center space-x-2">
              <BarChart3 class="w-4 h-4" />
              <span>Analytics</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { 
  ShoppingBag, 
  Package, 
  TrendingUp, 
  RotateCcw, 
  Filter, 
  Plus,
  FileText,
  BarChart3
} from 'lucide-vue-next'
import  AdminEquimentSaleService  from './service';
export default {
  name: 'Equiment-Sale',
  data() {
    return {
      sales : ref([
        { id: 'SL001', customer: 'John Doe', equipment: 'Soccer Ball', quantity: 2, total: 40, updated_at: '2024-01-15' },
        { id: 'SL002', customer: 'Jane Smith', equipment: 'Tennis Racket', quantity: 1, total: 85, updated_at: '2024-01-14' },
        { id: 'SL003', customer: 'Mike Johnson', equipment: 'Basketball', quantity: 3, total: 90, updated_at: '2024-01-14' },
        { id: 'SL004', customer: 'Sarah Wilson', equipment: 'Swimming Goggles', quantity: 1, total: 25, updated_at: '2024-01-13' },
        { id: 'SL005', customer: 'Tom Brown', equipment: 'Badminton Set', quantity: 1, total: 65, updated_at: '2024-01-12' }
      ]),

      topProducts : ref([
        { id: 1, name: 'Soccer Ball', sold: 45, revenue: '1,800', percentage: 90 },
        { id: 2, name: 'Tennis Racket', sold: 32, revenue: '2,720', percentage: 75 },
        { id: 3, name: 'Basketball', sold: 28, revenue: '840', percentage: 60 },
        { id: 4, name: 'Swimming Goggles', sold: 24, revenue: '600', percentage: 50 }
      ])
    }
  },
  async created() {
    await this.listing();
  },
  methods: {
    async listing() {
      try {
        const response = await AdminEquimentSaleService.listing();
        console.log(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  }

}

</script>