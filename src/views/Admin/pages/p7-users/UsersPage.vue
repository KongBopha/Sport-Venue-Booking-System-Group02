<template>
  <div class="space-y-8">
    <!-- User Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Total Users</p>
            <p class="text-3xl font-bold text-gray-900 mt-2">{{ total_users }}</p>
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
            <p class="text-3xl font-bold text-gray-900 mt-2">{{ (total_users - total_inactive_users) }}</p>
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
            <p class="text-3xl font-bold text-gray-900 mt-2">{{ total_news_users_this_month }}</p>
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
            <p class="text-3xl font-bold text-gray-900 mt-2">{{ total_inactive_users }}</p>
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
          <button 
            @click="openFilterDialog" 
            class="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Filter class="w-4 h-4 inline mr-1" />
            Filter
          </button>
          <button 
            @click="openCreateDialog" 
            class="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus class="w-4 h-4 inline mr-1" />
            Add User
          </button>
        </div>
      </div>
      
      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center py-8">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
      
      <!-- Table -->
      <div v-else class="overflow-x-auto">
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
                  <div class="w-10 h-10 rounded-full flex items-center justify-center">
                    <img
                      class="w-10 h-10 rounded-full object-cover"
                      :src="fileUrl + user.avatar"
                      :alt="user.name"
                    />
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ user.name }}</div>
                    <div class="text-sm text-gray-500">{{ user.phone }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ user.email }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ user.role?.name || 'N/A' }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="['px-2 py-1 text-xs font-medium rounded-full', 
                  user.is_active === 1 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800']">
                  {{ user.is_active === 1 ? 'Active' : 'Inactive' }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ user.last_login_at ? formatDate(user.last_login_at) : 'Never' }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div class="flex items-center space-x-2">
                  <button @click="openEditDialog(user)" class="text-blue-600 hover:text-blue-900">
                    <Edit class="w-4 h-4" />
                  </button>
                  <button @click="openDeleteDialog(user)" class="text-red-600 hover:text-red-900">
                    <Trash2 class="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Pagination -->
      <div v-if="pagination.totalPages > 1" class="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
        <div class="text-sm text-gray-700">
          Showing {{ ((pagination.page - 1) * pagination.limit) + 1 }} to 
          {{ Math.min(pagination.page * pagination.limit, pagination.total) }} of 
          {{ pagination.total }} results
        </div>
        <div class="flex space-x-2">
          <button 
            @click="changePage(pagination.page - 1)"
            :disabled="pagination.page === 1"
            class="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
          >
            Previous
          </button>
          <button 
            @click="changePage(pagination.page + 1)"
            :disabled="pagination.page === pagination.totalPages"
            class="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>

    <!-- Dialog Components -->
    <FilterDialog
      :show="showFilterDialog"
      :filter-form="filterForm"
      :roles="roles"
      @close="closeFilterDialog"
      @apply-filters="applyFilters"
      @clear-filters="clearFilters"
    />

    <UserFormDialog
      :show="showUserDialog"
      :is-editing="isEditing"
      :user-form="userForm"
      :roles="roles"
      :submitting="submitting"
      @close="closeUserDialog"
      @save-user="saveUser"
      @avatar-change="handleAvatarChange"
    />

    <DeleteConfirmDialog
      :show="showDeleteDialog"
      :user-to-delete="userToDelete"
      :submitting="submitting"
      @close="closeDeleteDialog"
      @confirm-delete="deleteUser"
    />
  </div>
</template>

<script>
import { Users, UserCheck, UserPlus, UserX, Filter, Plus, Edit, Trash2 } from 'lucide-vue-next'
import AdminUserService from './service'
import FilterDialog from './FilterDialog.vue'
import UserFormDialog from './UserFormDialog.vue'
import DeleteConfirmDialog from './DeleteConfirmDialog.vue'

export default {
  name: 'UsersPage',
  components: {
    Users, UserCheck, UserPlus, UserX, Filter, Plus, Edit, Trash2,
    FilterDialog, UserFormDialog, DeleteConfirmDialog
  },
  data() {
    return {
      fileUrl: import.meta.env.VITE_FILE_BASE_URL,
      loading: false,
      submitting: false,
      users: [],
      data_setup: {},
      roles: [],
      total_users: 0,
      total_news_users_this_month: 0,
      total_inactive_users: 0,
      pagination: {
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0
      },
      
      // Dialog states
      showFilterDialog: false,
      showUserDialog: false,
      showDeleteDialog: false,
      isEditing: false,
      
      // Forms
      filterForm: {
        key: '',
        role_id: '',
        is_active: ''
      },
      userForm: {
        name: '',
        email: '',
        phone: '',
        phone2: '',
        password: '123456',
        role_id: '',
        avatar: '',
        avatarPreview: '',
        is_active: 1
      },
      userToDelete: null
    }
  },
  
  async created() {
    await this.dataSetup()
    await this.listing()
  },
  
  methods: {
    async listing() {
      this.loading = true
      try {
        const params = {
          page: this.pagination.page,
          limit: this.pagination.limit,
          ...this.filterForm
        }
        
        // Remove empty values
        Object.keys(params).forEach(key => {
        if (params[key] === '' || params[key] === null || params[key] === undefined) {
            delete params[key]
          }
        })
        
        const response = await AdminUserService.listing(params)
        this.total_users = response.data.total_users;
        this.total_news_users_this_month = response.data.total_news_users_this_month;
        this.total_inactive_users = response.data.total_inactive_users;
        this.users = response.data.users || [];
        this.pagination = response.pagination || this.pagination;
        
        // Calculate stats
        this.calculateStats()
      } catch (error) {
        console.error('Error loading users:', error)
        this.$toast?.error('Failed to load users')
      } finally {
        this.loading = false
      }
    },
    
    async dataSetup() {
      try {

        const response = await AdminUserService.dataSetup()
        this.data_setup = response.data;
        this.roles = this.data_setup.roles;
      } catch (error) {
        console.error('Error loading roles:', error)
      }
    },
    
    calculateStats() {
      this.stats.total = this.pagination.total
      this.stats.active = this.users.filter(user => user.is_active === 1).length
      this.stats.inactive = this.users.filter(user => user.is_active === 0).length
      
      // Calculate new users this month (simplified)
      const thisMonth = new Date().getMonth()
      this.stats.newThisMonth = this.users.filter(user => {
        const userMonth = new Date(user.created_at).getMonth()
        return userMonth === thisMonth
      }).length
    },
    
    // Filter methods
    openFilterDialog() {
      this.showFilterDialog = true
    },
    
    closeFilterDialog() {
      this.showFilterDialog = false
    },
    
    applyFilters(filters) {
      this.filterForm = { ...filters }
      this.pagination.page = 1
      this.listing()
      this.closeFilterDialog()
    },
    
    clearFilters(filters) {
      this.filterForm = { ...filters }
      this.pagination.page = 1
      this.listing()
      this.closeFilterDialog()
    },
    
    // User CRUD methods
    openCreateDialog() {
      this.isEditing = false
      this.resetUserForm()
      this.showUserDialog = true
    },
    
    openEditDialog(user) {
      this.isEditing = true
      this.userForm = {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        phone2: user.phone2 || '',
        role_id: user.role?.id || '',
        avatar: user.avatar,
        avatarPreview: user.avatar 
          ? this.fileUrl + user.avatar : '',
        is_active: user.is_active
      }
      this.showUserDialog = true
    },
    
    closeUserDialog() {
      this.showUserDialog = false
      this.resetUserForm()
    },
    
    resetUserForm() {
      this.userForm = {
        name: '',
        email: '',
        phone: '',
        phone2: '',
        password: '123456',
        role_id: '',
        avatar: '',
        avatarPreview: '',
        is_active: 1
      }
    },
    
    handleAvatarChange(avatarData) {
      this.userForm.avatar = avatarData.avatar
      this.userForm.avatarPreview = avatarData.avatarPreview
    },
    
    async saveUser(formData) {
      this.submitting = true
      try {
        const userData = { ...formData }
        delete userData.avatarPreview
        delete userData.id
        
        if (this.isEditing) {
          userData.avatar = this.users.find( u => u.avatar ==  userData.avatar) ? '' : userData.avatar;
          await AdminUserService.update(this.userForm.id, userData)
          this.$toast?.success('User updated successfully')
        } else {
          await AdminUserService.create(userData)
          this.$toast?.success('User created successfully')
        }
        
        this.closeUserDialog()
        await this.listing()
      } catch (error) {
        console.error('Error saving user:', error)
        this.$toast?.error('Failed to save user')
      } finally {
        this.submitting = false
      }
    },
    
    // Delete methods
    openDeleteDialog(user) {
      this.userToDelete = user
      this.showDeleteDialog = true
    },
    
    closeDeleteDialog() {
      this.showDeleteDialog = false
      this.userToDelete = null
    },
    
    async deleteUser() {
      this.submitting = true
      try {
        await AdminUserService.delete(this.userToDelete.id)
        this.$toast?.success('User deleted successfully')
        this.closeDeleteDialog()
        await this.listing()
      } catch (error) {
        console.error('Error deleting user:', error)
        this.$toast?.error('Failed to delete user')
      } finally {
        this.submitting = false
      }
    },
    
    // Pagination
    changePage(page) {
      if (page >= 1 && page <= this.pagination.totalPages) {
        this.pagination.page = page
        this.listing()
      }
    },
    
    // Utility methods
    formatDate(date) {
      return new Date(date).toLocaleDateString()
    }
  }
}
</script>