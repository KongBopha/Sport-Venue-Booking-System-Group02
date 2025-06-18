<template>
  <div class="space-y-8">
    <!-- Payment Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Total Revenue</p>
            <p class="text-3xl font-bold text-gray-900 mt-2">$89,247</p>
          </div>
          <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <DollarSign class="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>
      
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Pending Payments</p>
            <p class="text-3xl font-bold text-gray-900 mt-2">$4,580</p>
          </div>
          <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
            <Clock class="w-6 h-6 text-yellow-600" />
          </div>
        </div>
      </div>
      
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Failed Payments</p>
            <p class="text-3xl font-bold text-gray-900 mt-2">$1,234</p>
          </div>
          <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
            <AlertCircle class="w-6 h-6 text-red-600" />
          </div>
        </div>
      </div>
      
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Refunds</p>
            <p class="text-3xl font-bold text-gray-900 mt-2">$567</p>
          </div>
          <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <RefreshCw class="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>
    </div>

    <!-- Payment Methods -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100">
        <div class="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h3 class="text-lg font-semibold text-gray-900">Recent Transactions</h3>
          <div class="flex items-center space-x-2">
            <button class="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter class="w-4 h-4 inline mr-1" />
              Filter
            </button>
            <button class="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Download class="w-4 h-4 inline mr-1" />
              Export
            </button>
          </div>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Transaction ID</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Method</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-for="transaction in transactions" :key="transaction.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">{{ transaction.id }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <span class="text-xs font-medium">{{ transaction.customer.charAt(0) }}</span>
                    </div>
                    <div class="ml-3">
                      <div class="text-sm font-medium text-gray-900">{{ transaction.customer }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${{ transaction.amount }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ transaction.method }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="['px-2 py-1 text-xs font-medium rounded-full', 
                    transaction.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                    transaction.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-red-100 text-red-800']">
                    {{ transaction.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ transaction.date }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button class="text-blue-600 hover:text-blue-900 mr-3">View</button>
                  <button class="text-gray-600 hover:text-gray-900">
                    <MoreVertical class="w-4 h-4" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Payment Summary -->
      <div class="space-y-6">
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Payment Methods</h3>
          <div class="space-y-4">
            <div v-for="method in paymentMethods" :key="method.name" class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <div :class="['w-10 h-10 rounded-lg flex items-center justify-center', method.bgColor]">
                  <component :is="method.icon" :class="['w-5 h-5', method.iconColor]" />
                </div>
                <div>
                  <p class="font-medium text-gray-900">{{ method.name }}</p>
                  <p class="text-sm text-gray-500">{{ method.transactions }} transactions</p>
                </div>
              </div>
              <div class="text-right">
                <p class="font-medium text-gray-900">${{ method.amount }}</p>
                <p class="text-sm text-gray-500">{{ method.percentage }}%</p>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div class="space-y-3">
            <button class="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center space-x-2">
              <Plus class="w-4 h-4" />
              <span>Process Refund</span>
            </button>
            <button class="w-full border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center justify-center space-x-2">
              <FileText class="w-4 h-4" />
              <span>Generate Report</span>
            </button>
            <button class="w-full border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center justify-center space-x-2">
              <Settings class="w-4 h-4" />
              <span>Payment Settings</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { 
  DollarSign, 
  Clock, 
  AlertCircle, 
  RefreshCw, 
  Filter, 
  Download, 
  MoreVertical,
  CreditCard,
  Smartphone,
  Banknote,
  Plus,
  FileText,
  Settings
} from 'lucide-vue-next'

const transactions = ref([
  { id: 'TXN001', customer: 'John Doe', amount: 150, method: 'Credit Card', status: 'Completed', date: '2024-01-15' },
  { id: 'TXN002', customer: 'Jane Smith', amount: 75, method: 'PayPal', status: 'Pending', date: '2024-01-14' },
  { id: 'TXN003', customer: 'Mike Johnson', amount: 200, method: 'Bank Transfer', status: 'Failed', date: '2024-01-14' },
  { id: 'TXN004', customer: 'Sarah Wilson', amount: 100, method: 'Credit Card', status: 'Completed', date: '2024-01-13' },
  { id: 'TXN005', customer: 'Tom Brown', amount: 50, method: 'Cash', status: 'Completed', date: '2024-01-12' }
])

const paymentMethods = ref([
  { name: 'Credit Card', transactions: 156, amount: '45,230', percentage: 65, icon: CreditCard, bgColor: 'bg-blue-100', iconColor: 'text-blue-600' },
  { name: 'PayPal', transactions: 89, amount: '23,450', percentage: 25, icon: Smartphone, bgColor: 'bg-purple-100', iconColor: 'text-purple-600' },
  { name: 'Bank Transfer', transactions: 34, amount: '12,340', percentage: 8, icon: Banknote, bgColor: 'bg-green-100', iconColor: 'text-green-600' },
  { name: 'Cash', transactions: 12, amount: '2,890', percentage: 2, icon: DollarSign, bgColor: 'bg-gray-100', iconColor: 'text-gray-600' }
])
</script>