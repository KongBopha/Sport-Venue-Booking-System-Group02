<template>
  <div class="space-y-8">
    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Total Bookings</p>
            <p class="text-3xl font-bold text-gray-900 mt-2">2,847</p>
            <div class="flex items-center mt-2">
              <TrendingUp class="w-4 h-4 text-green-500 mr-1" />
              <span class="text-sm text-green-600 font-medium">+12.5%</span>
              <span class="text-sm text-gray-500 ml-1">vs last month</span>
            </div>
          </div>
          <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <Calendar class="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Revenue</p>
            <p class="text-3xl font-bold text-gray-900 mt-2">$89,247</p>
            <div class="flex items-center mt-2">
              <TrendingUp class="w-4 h-4 text-green-500 mr-1" />
              <span class="text-sm text-green-600 font-medium">+8.2%</span>
              <span class="text-sm text-gray-500 ml-1">vs last month</span>
            </div>
          </div>
          <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <DollarSign class="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Active Users</p>
            <p class="text-3xl font-bold text-gray-900 mt-2">1,456</p>
            <div class="flex items-center mt-2">
              <TrendingUp class="w-4 h-4 text-green-500 mr-1" />
              <span class="text-sm text-green-600 font-medium">+15.3%</span>
              <span class="text-sm text-gray-500 ml-1">vs last month</span>
            </div>
          </div>
          <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
            <Users class="w-6 h-6 text-purple-600" />
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Equipment Items</p>
            <p class="text-3xl font-bold text-gray-900 mt-2">342</p>
            <div class="flex items-center mt-2">
              <TrendingDown class="w-4 h-4 text-red-500 mr-1" />
              <span class="text-sm text-red-600 font-medium">-2.1%</span>
              <span class="text-sm text-gray-500 ml-1">vs last month</span>
            </div>
          </div>
          <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
            <Package class="w-6 h-6 text-orange-600" />
          </div>
        </div>
      </div>
    </div>

    <!-- Charts and Activity -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Revenue Chart -->
      <div class="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-semibold text-gray-900">Revenue Overview</h3>
          <select class="text-sm border border-gray-300 rounded-lg px-3 py-2">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 3 months</option>
          </select>
        </div>
        <div class="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <div class="text-center">
            <BarChart3 class="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p class="text-gray-500">Revenue chart would be displayed here</p>
          </div>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h3>
        <div class="space-y-4">
          <div v-for="activity in recentActivities" :key="activity.id" class="flex items-start space-x-3">
            <div :class="['w-8 h-8 rounded-full flex items-center justify-center', activity.bgColor]">
              <component :is="activity.icon" :class="['w-4 h-4', activity.iconColor]" />
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-900">{{ activity.title }}</p>
              <p class="text-sm text-gray-500">{{ activity.description }}</p>
              <p class="text-xs text-gray-400 mt-1">{{ activity.time }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Popular Venues -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-lg font-semibold text-gray-900">Popular Venues</h3>
        <button class="text-blue-600 hover:text-blue-700 text-sm font-medium">View All</button>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div v-for="venue in popularVenues" :key="venue.id" class="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
          <div class="flex items-center justify-between mb-3">
            <h4 class="font-medium text-gray-900">{{ venue.name }}</h4>
            <span :class="['px-2 py-1 text-xs font-medium rounded-full', venue.statusColor]">
              {{ venue.status }}
            </span>
          </div>
          <div class="space-y-2">
            <div class="flex justify-between text-sm">
              <span class="text-gray-500">Bookings</span>
              <span class="font-medium">{{ venue.bookings }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-500">Revenue</span>
              <span class="font-medium">${{ venue.revenue }}</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div class="bg-blue-600 h-2 rounded-full" :style="{ width: venue.utilization + '%' }"></div>
            </div>
            <p class="text-xs text-gray-500">{{ venue.utilization }}% utilization</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script >
import { ref } from 'vue'
import { 
  Calendar, 
  DollarSign, 
  Users, 
  Package, 
  TrendingUp, 
  TrendingDown,
  BarChart3,
  UserPlus,
  CreditCard,
  AlertCircle
} from 'lucide-vue-next'
import  AdminDashboardService  from './service';

export default {
  name: 'Dashboard',
  data() {
    return {
      recentActivities : ref([
        {
          id: 1,
          title: 'New booking created',
          description: 'Tennis Court A booked by John Doe',
          time: '2 minutes ago',
          icon: Calendar,
          bgColor: 'bg-blue-100',
          iconColor: 'text-blue-600'
        },
        {
          id: 2,
          title: 'Payment received',
          description: '$150 payment for Basketball Court',
          time: '5 minutes ago',
          icon: CreditCard,
          bgColor: 'bg-green-100',
          iconColor: 'text-green-600'
        },
        {
          id: 3,
          title: 'New user registered',
          description: 'Sarah Wilson joined the platform',
          time: '10 minutes ago',
          icon: UserPlus,
          bgColor: 'bg-purple-100',
          iconColor: 'text-purple-600'
        },
        {
          id: 4,
          title: 'Equipment maintenance',
          description: 'Soccer equipment needs attention',
          time: '15 minutes ago',
          icon: AlertCircle,
          bgColor: 'bg-orange-100',
          iconColor: 'text-orange-600'
        }
      ]),
      popularVenues : ref([
        {
          id: 1,
          name: 'Tennis Court A',
          bookings: 45,
          revenue: '2,340',
          utilization: 85,
          status: 'Active',
          statusColor: 'bg-green-100 text-green-800'
        },
        {
          id: 2,
          name: 'Basketball Court',
          bookings: 38,
          revenue: '1,890',
          utilization: 72,
          status: 'Active',
          statusColor: 'bg-green-100 text-green-800'
        },
        {
          id: 3,
          name: 'Swimming Pool',
          bookings: 52,
          revenue: '3,120',
          utilization: 95,
          status: 'Busy',
          statusColor: 'bg-yellow-100 text-yellow-800'
        },
        {
          id: 4,
          name: 'Football Field',
          bookings: 28,
          revenue: '1,680',
          utilization: 58,
          status: 'Available',
          statusColor: 'bg-blue-100 text-blue-800'
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
        const response = await AdminDashboardService.listing();
        console.log(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  }

}
</script>