<template>
  <Navbar/>
  <div class="page">
    <!-- Profile Section -->
    <main class="profile-section">
        <!-- Sidebar -->
      <aside class="sidebar">
        <div class="sidebar-content">
          <h3>Navigation</h3>
         <ul class="nav-links">
          <li>
            <router-link to="/account/profile" active-class="active">Profile</router-link>
          </li>
          <li>
            <router-link to="/account/booking" active-class="active"  exact>Booking</router-link>
          </li>
         <li>
            <router-link to="/account/equipment" active-class="active">Equipment</router-link>
          </li>
        </ul>
        </div>
      </aside>
      <div class="profile-card">
        <!-- Title Section -->
        <div class="profile-content">
          <!-- Right Section (Information) -->
          <div class="profile-right">
              <div class="bg-white rounded-xl shadow-sm border border-gray-100">
                <div class="px-6 py-4 border-b border-gray-200">
                  <h3 class="text-lg font-semibold text-gray-900">Equiment</h3>
                </div>
                <div class="overflow-x-auto">
                  <table class="w-full">
                    <thead class="bg-gray-50">
                      <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Receipt Number</th>
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
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">{{ sale.receipt }}</td>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <div class="flex items-center">
                           <span class="text-xs font-medium">
                              {{ sale.customer?.charAt(0) || 'U' }}
                            </span>
                                                        
                          </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ sale.equipment }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ sale.quantity }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${{ sale.total }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ sale.updated_at }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div class="flex items-center space-x-2">
                            <button
                              class="text-blue-600 hover:text-blue-900"
                              @click="editSale(sale)"
                              title="Edit"
                            >
                              Edit
                            </button>
                            <button
                              class="text-red-600 hover:text-red-900"
                              @click="deleteItem(sale)"
                              title="Delete"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
          </div>
        </div>
      </div>
    </main>
  </div>




</template>

<script>
import { 
  ShoppingBag, 
  Package, 
  TrendingUp, 
  RotateCcw, 
  Filter, 
  Plus,
  FileText,
  BarChart3
} from 'lucide-vue-next';

import Navbar from '@/components/Navbar.vue';
import { ref, onMounted } from 'vue';
export default {
  name: 'Equiment-Sale',
  components: {
    Navbar
  },
  data() {
    return {
      fileUrl: import.meta.env.VITE_FILE_BASE_URL, // 👈 Add file base URL
      sales: [],
      totalSalesAmount: 0,
      totalQuantitySold: 0,
      averageSalePrice: 0,
    };
  },
  async created() {
    await this.listing();
  },
  methods: {
   async listing() {
      try {
        const response = await ProfileService.listingEquipment(); // No need to pass user_id manually
        this.totalSalesAmount = response.meta?.totalSalesAmount || 0;
        this.totalQuantitySold = response.meta?.totalQuantitySold || 0;
        this.averageSalePrice = response.meta?.averageSalePrice || 0;

        this.sales = response.sales.map(item => ({
          ...item,
          id: item.id,
          receipt: item.payment?.receipt_number || `EQ${item.id}`,
          customer: item.user?.name || 'Unknown',
          equipment: item.equipment?.name || 'N/A',
          quantity: item.qty || 0,
          total: item.total_price || 0,
          updated_at: new Date(item.updated_at).toLocaleDateString()
        }));

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

 

  }
};
</script>
<style scoped>
/* Layout */
/* Layout */
.page {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background-color: #f3f4f6;
  min-height: 100vh;
}

.profile-section {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

/* Card */
.profile-card {
  width: 100%;
  max-width: 850px;
  background-color: #ffffff;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  min-height: 70vh;
}

/* Table Styles */
.bg-white {
  background-color: #ffffff;
}
.rounded-xl {
  border-radius: 1rem;
}
.shadow-sm {
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}
.border {
  border: 1px solid #e5e7eb;
}
.border-gray-100 {
  border-color: #f3f4f6;
}
.px-6 {
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}
.py-4 {
  padding-top: 1rem;
  padding-bottom: 1rem;
}
.border-b {
  border-bottom-width: 1px;
}
.border-gray-200 {
  border-color: #e5e7eb;
}
.text-lg {
  font-size: 1.125rem;
}
.font-semibold {
  font-weight: 600;
}
.text-gray-900 {
  color: #111827;
}
.overflow-x-auto {
  overflow-x: auto;
}
.w-full {
  width: 100%;
}
.bg-gray-50 {
  background-color: #f9fafb;
}
.text-xs {
  font-size: 0.75rem;
}
.uppercase {
  text-transform: uppercase;
}
.font-medium {
  font-weight: 500;
}
.text-gray-500 {
  color: #6b7280;
}
.divide-y > * + * {
  border-top: 1px solid #e5e7eb;
}
.hover\:bg-gray-50:hover {
  background-color: #f9fafb;
}
.whitespace-nowrap {
  white-space: nowrap;
}
.text-sm {
  font-size: 0.875rem;
}
.font-mono {
  font-family: monospace;
}
.ml-3 {
  margin-left: 0.75rem;
}
.text-blue-600 {
  color: #2563eb;
}
.hover\:text-blue-900:hover {
  color: #1d4ed8;
}
.space-x-2 > * + * {
  margin-left: 0.5rem;
}
/* Status badge styling */
span.px-2.py-1.text-xs {
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  line-height: 1rem;
  border-radius: 9999px;
  font-weight: 600;
}
.rounded-full {
  border-radius: 9999px;
}
/* Sidebar Styling */
.sidebar {
  width: 200px;
  background-color: #f9fafb;
  border-radius: 12px 0 0 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  min-height: 65vh;
}
.sidebar h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1rem;
}
.nav-links {
  list-style: none;
  padding: 0;
}
.nav-links li {
  margin-bottom: 0.75rem;
}
.nav-links li a {
  text-decoration: none;
  color: #374151;
  font-weight: 500;
  transition: color 0.2s ease;
}
.nav-links li a:hover {
  color: #10b981;
}
.nav-links li .active {
  color: #10b981;
  font-weight: bold;
  position: relative;
}
/* Optional: Add a small icon or line indicator */
.nav-links li .active::before {
  content: '';
  position: absolute;
  left: -12px;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 16px;
  background-color: #10b981;
  border-radius: 999px;
}
</style>
