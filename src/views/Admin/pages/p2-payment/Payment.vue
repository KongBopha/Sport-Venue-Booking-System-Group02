<template>
  <div class="space-y-8">
    <!-- Payment Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Total Revenue</p>
            <p class="text-3xl font-bold text-gray-900 mt-2">${{ formatCurrency(stats.total_revenue) }}</p>
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
            <p class="text-3xl font-bold text-gray-900 mt-2">${{ formatCurrency(stats.total_pending) }}</p>
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
            <p class="text-3xl font-bold text-gray-900 mt-2">${{ formatCurrency(stats.total_fail) }}</p>
          </div>
          <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
            <AlertCircle class="w-6 h-6 text-red-600" />
          </div>
        </div>
      </div>
      
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Total Transactions</p>
            <p class="text-3xl font-bold text-gray-900 mt-2">{{ pagination.total || 0 }}</p>
          </div>
          <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <RefreshCw class="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>
    </div>

    <!-- Filters and Actions -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div class="flex flex-col md:flex-row gap-4">
          <select
            v-model="filters.status_id"
            class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            @change="loadPayments"
          >
            <option value="">All Statuses</option>
            <option v-for="status in setupData.payment_statuses" :key="status.id" :value="status.id">
              {{ status.name }}
            </option>
          </select>
          <select
            v-model="filters.method_id"
            class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            @change="loadPayments"
          >
            <option value="">All Methods</option>
            <option v-for="method in setupData.payment_methods" :key="method.id" :value="method.id">
              {{ method.name }}
            </option>
          </select>
          <select
            v-model="filters.user_id"
            class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            @change="loadPayments"
          >
            <option value="">All Users</option>
            <option v-for="user in setupData.users" :key="user.id" :value="user.id">
              {{ user.name }}
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
            @click="exportData"
            class="px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
          >
            <Download class="w-4 h-4" />
            Export
          </button>
        </div>
      </div>
    </div>

    <!-- Payment Methods Analytics -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Transactions Table -->
      <div class="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900">Recent Transactions</h3>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Receipt #</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Method</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-for="payment in payments" :key="payment.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                  {{ payment.receipt_number || `#${payment.id}` }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <span class="text-xs font-medium">
                        {{ payment.booking?.user?.name?.charAt(0) || 'U' }}
                      </span>
                    </div>
                    <div class="ml-3">
                      <div class="text-sm font-medium text-gray-900">
                        {{ payment.booking?.user?.name || 'Unknown' }}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  ${{ payment.total_price }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span 
                    :class="['px-2 py-1 text-xs font-medium rounded-full']"
                    :style="{ 
                      backgroundColor: payment.payment_status?.color + '20', 
                      color: payment.payment_status?.color 
                    }"
                  >
                    {{ payment.payment_status?.name }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span 
                    class="'px-2 py-1 text-xs font-medium rounded-full'"
                  >
                    {{ payment.payment_method?.name }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ formatDate(payment.updated_at) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button 
                    @click="viewPayment(payment)"
                    class="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    View
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <!-- Pagination -->
        <div class="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <div class="text-sm text-gray-500">
            Showing {{ ((pagination.page - 1) * pagination.limit) + 1 }} to 
            {{ Math.min(pagination.page * pagination.limit, pagination.total) }} of 
            {{ pagination.total }} results
          </div>
          <div class="flex items-center space-x-2">
            <button
              @click="changePage(pagination.page - 1)"
              :disabled="pagination.page <= 1"
              class="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
            >
              Previous
            </button>
            <span class="px-3 py-1 bg-blue-600 text-white rounded-lg">
              {{ pagination.page }}
            </span>
            <button
              @click="changePage(pagination.page + 1)"
              :disabled="pagination.page >= pagination.totalPages"
              class="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <!-- Payment Methods Summary -->
      <div class="space-y-6">
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Payment Methods</h3>
          <div class="space-y-4">
            <div v-for="method in stats.payment_methods" :key="method.id" class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <CreditCard class="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p class="font-medium text-gray-900">{{ method.name }}</p>
                  <p class="text-sm text-gray-500">{{ method.n_of_payments }} transactions</p>
                </div>
              </div>
              <div class="text-right">
                <p class="font-medium text-gray-900">${{ method.total_amount }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Payment View Dialog -->
    <PaymentViewDialog
      v-if="showPaymentDialog"
      :payment="selectedPayment"
      :setup-data="setupData"
      @close="showPaymentDialog = false"
      @updated="onPaymentUpdated(selectedPayment)"
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
  DollarSign, 
  Clock, 
  AlertCircle, 
  RefreshCw, 
  Filter, 
  Download, 
  MoreVertical,
  CreditCard
} from 'lucide-vue-next'
import AdminPaymentService from './service'
import PaymentViewDialog from './PaymentViewDialog.vue'
import FilterDialog from './FilterDialog.vue'

export default {
  name: 'Payment',
  components: {
    DollarSign,
    Clock,
    AlertCircle,
    RefreshCw,
    Filter,
    Download,
    MoreVertical,
    CreditCard,
    PaymentViewDialog,
    FilterDialog
  },
  setup() {
    const payments = ref([])
    const stats = ref({})
    const setupData = ref({})
    const pagination = ref({})
    const loading = ref(false)
    const showPaymentDialog = ref(false)
    const showFilterDialog = ref(false)
    const selectedPayment = ref(null)

    const filters = reactive({
      user_id: '',
      status_id: '',
      method_id: '',
      page: 1,
      limit: 10
    })

    const loadPayments = async () => {
      try {
        loading.value = true
        const response = await AdminPaymentService.getData(filters)
        payments.value = response.data.payments
        stats.value = response.data
        pagination.value = response.pagination
      } catch (error) {
        console.error('Error loading payments:', error)
      } finally {
        loading.value = false
      }
    }

    const loadSetupData = async () => {
      try {
        const response = await AdminPaymentService.dataSetup()
        setupData.value = response.data
      } catch (error) {
        console.error('Error loading setup data:', error)
      }
    }

    const viewPayment = async (payment) => {
      try {
        const response = await AdminPaymentService.view(payment.id)
        selectedPayment.value = response.data
        showPaymentDialog.value = true
      } catch (error) {
        console.error('Error loading payment details:', error)
      }
    }

    const changePage = (page) => {
      if (page >= 1 && page <= pagination.value.totalPages) {
        filters.page = page
        loadPayments()
      }
    }

    const applyFilters = (newFilters) => {
      Object.assign(filters, newFilters)
      filters.page = 1 // Reset to first page
      showFilterDialog.value = false
      loadPayments()
    }

    const onPaymentUpdated = (payment) => {
      viewPayment(payment)
      loadPayments()
    }

    const exportData = () => {
      // Implement export functionality
      console.log('Exporting data...')
    }

    const formatCurrency = (amount) => {
      if (Array.isArray(amount)) {
        return amount.reduce((sum, item) => sum + (item.total_price || 0), 0).toFixed(2)
      }
      return (amount || 0).toFixed(2)
    }

    const formatDate = (date) => {
      return new Date(date).toLocaleDateString()
    }

    onMounted(() => {
      loadPayments()
      loadSetupData()
    })

    return {
      payments,
      stats,
      setupData,
      pagination,
      loading,
      filters,
      showPaymentDialog,
      showFilterDialog,
      selectedPayment,
      loadPayments,
      viewPayment,
      changePage,
      applyFilters,
      onPaymentUpdated,
      exportData,
      formatCurrency,
      formatDate
    }
  }
}
</script>
