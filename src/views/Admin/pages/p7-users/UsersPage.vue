<template>
  <div class="space-y-8">
    <!-- User Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Total Users</p>
            <p class="text-3xl font-bold text-gray-900 mt-2">2,847</p>
          </div>
          <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <Users class="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>
      
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Active Users</p>
            <p class="text-3xl font-bold text-gray-900 mt-2">2,234</p>
          </div>
          <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <UserCheck class="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>
      
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">New This Month</p>
            <p class="text-3xl font-bold text-gray-900 mt-2">156</p>
          </div>
          <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
            <UserPlus class="w-6 h-6 text-purple-600" />
          </div>
        </div>
      </div>
      
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Inactive</p>
            <p class="text-3xl font-bold text-gray-900 mt-2">613</p>
          </div>
          <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
            <UserX class="w-6 h-6 text-red-600" />
          </div>
        </div>
      </div>
    </div>

    <!-- Users Table -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100">
      <div class="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <h3 class="text-lg font-semibold text-gray-900">User Management</h3>
        <div class="flex items-center space-x-2">
          <button class="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter class="w-4 h-4 inline mr-1" />
            Filter
          </button>
          <button class="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus class="w-4 h-4 inline mr-1" />
            Add User
          </button>
        </div>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Login</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-for="user in users" :key="user.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                    <span class="text-sm font-medium text-gray-700">{{ user.name.charAt(0) }}</span>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ user.name }}</div>
                    <div class="text-sm text-gray-500">{{ user.phone }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ user.email }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ user.role }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="['px-2 py-1 text-xs font-medium rounded-full', 
                  user.status === 'Active' ? 'bg-green-100 text-green-800' : 
                  'bg-red-100 text-red-800']">
                  {{ user.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ user.lastLogin }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div class="flex items-center space-x-2">
                  <button class="text-blue-600 hover:text-blue-900">Edit</button>
                  <button class="text-red-600 hover:text-red-900">Deactivate</button>
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
import { Users, UserCheck, UserPlus, UserX, Filter, Plus } from 'lucide-vue-next'
import  AdminUserService  from './service';
export default {
  name: 'User',
  data() {
    return {
      users : ref([
        { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+1 234 567 8900', role: 'Customer', status: 'Active', lastLogin: '2024-01-15' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '+1 234 567 8901', role: 'Admin', status: 'Active', lastLogin: '2024-01-14' },
        { id: 3, name: 'Mike Johnson', email: 'mike@example.com', phone: '+1 234 567 8902', role: 'Customer', status: 'Inactive', lastLogin: '2024-01-10' },
        { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', phone: '+1 234 567 8903', role: 'Manager', status: 'Active', lastLogin: '2024-01-15' },
        { id: 5, name: 'Tom Brown', email: 'tom@example.com', phone: '+1 234 567 8904', role: 'Customer', status: 'Active', lastLogin: '2024-01-13' }
      ])
    }
  },
  async created() {
    await this.listing();
  },
  methods: {
    async listing() {
      try {
        const response = await AdminUserService.listing();
        console.log(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  }

}

</script>