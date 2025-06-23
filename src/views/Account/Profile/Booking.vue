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
          <!-- <li>
            <router-link to="/history" active-class="active">History</router-link>
          </li> -->
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
                  <h3 class="text-lg font-semibold text-gray-900">Bookings</h3>
                </div>
                <div class="overflow-x-auto">
                  <table class="w-full">
                    <thead class="bg-gray-50">
                      <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sport/Pitch</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date & Time</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                        
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                      <tr v-for="booking in bookings" :key="booking.id" class="hover:bg-gray-50">
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">#{{ booking.id }}</td>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <div class="flex items-center">
                            <div class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                              <span class="text-xs font-medium">{{ booking.user?.name?.charAt(0) || 'U' }}</span>
                            </div>
                            <div class="ml-3">
                              <div class="text-sm font-medium text-gray-900">{{ booking.user?.name || 'Unknown' }}</div>
                              <div class="text-sm text-gray-500">{{ booking.phone }}</div>
                            </div>
                          </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <div class="text-sm font-medium text-gray-900">{{ booking.pitch?.category?.sport?.name }}</div>
                          <div class="text-sm text-gray-500">{{ booking.pitch?.name }}</div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <div class="text-sm text-gray-900">{{ formatDate(booking.date) }}</div>
                          <div class="text-sm text-gray-500">{{ booking.time?.name }} ({{ booking.duration_in_hours }}h)</div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <span 
                            :class="['px-2 py-1 text-xs font-medium rounded-full', getStatusColor(booking.booking_status)]"
                            :style="{ backgroundColor: booking.booking_status?.color + '20', color: booking.booking_status?.color }"
                          >
                            {{ booking.booking_status?.name }}
                          </span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${{ booking.price }}</td>
                        
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
import Navbar from '@/components/Navbar.vue';
import ProfileService from './service';
import { ref, onMounted } from 'vue';

export default {
  components: {
    Navbar,
  },
  setup() {
    const bookings = ref([]);
    const stats = ref({});
    const loading = ref(false);

    const loadBookings = async () => {
      try {
        loading.value = true;

        // Optional: Add filters like date, key, time_id
        const filters = {
          // Example filter (optional)
          // key: 'Satya',
          // date: new Date().toISOString(),
        };

        const response = await ProfileService.getData(filters); // user_id will be added automatically
        bookings.value = response.data.bookings;
        stats.value = response.data;
      } catch (error) {
        console.error('Error loading bookings:', error);
      } finally {
        loading.value = false;
      }
    };
    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    };
    const getStatusColor = (status) => {
      if (!status) return '';
      
      switch (status.name) {
        case 'Pending':
          return 'bg-yellow-100 text-yellow-800';
        case 'Confirmed':
          return 'bg-green-100 text-green-800';
        case 'Completed':
          return 'bg-blue-100 text-blue-800';
        case 'Cancelled':
          return 'bg-red-100 text-red-800';
        default:
          return 'bg-gray-100 text-gray-800';
      }
    };
    onMounted(() => {
      loadBookings();
    });

    return {
      bookings,
      stats,
      loading,
      loadBookings,
      formatDate,
      getStatusColor
    };
  },
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
