<template>
  <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-semibold">{{ isEditing ? 'Edit User' : 'Create User' }}</h3>
        <button @click="closeDialog" class="text-gray-400 hover:text-gray-600">
          <X class="w-5 h-5" />
        </button>
      </div>
      
      <form @submit.prevent="saveUser" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Avatar</label>
          <div class="flex items-center space-x-4">
            <div class="w-16 h-16 border border-blue-600 rounded-full flex items-center justify-center overflow-hidden">
              <img
                v-if="localUserForm.avatarPreview"
                :src="localUserForm.avatarPreview"
                alt="Avatar preview"
                class="w-full h-full object-cover"
              />
              <User v-else class="w-8 h-8 text-gray-500" />
            </div>
            <input
              ref="avatarInput"
              type="file"
              accept="image/*"
              @change="handleAvatarChange"
              class="hidden"
            />
            <button
              type="button"
              @click="$refs.avatarInput.click()"
              class="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Choose Image
            </button>
          </div>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Name *</label>
          <input
            v-model="localUserForm.name"
            type="text"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email *</label>
          <input
            v-model="localUserForm.email"
            type="email"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
          <input
            v-model="localUserForm.phone"
            type="tel"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Phone 2</label>
          <input
            v-model="localUserForm.phone2"
            type="tel"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div class="relative ">
            <label v-if="!isEditing" class="block text-sm font-medium text-gray-700 mb-1">Password *</label>
            <label v-if="isEditing" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
            
            <input
                v-model="localUserForm.password"
                :type="showPassword ? 'text' : 'password'"
                :required="!isEditing"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
                type="button"
                @click="togglePasswordVisibility"
                class="absolute right-3 mt-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                aria-label="Toggle password visibility"
            >
                <EyeOff v-if="showPassword" class="w-5 h-5" />
                <Eye v-else class="w-5 h-5" />
            </button>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Role *</label>
          <select
            v-model="localUserForm.role_id"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Role</option>
            <option v-for="role in roles" :key="role.id" :value="role.id">{{ role.name }}</option>
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            v-model="localUserForm.is_active"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option :value="1">Active</option>
            <option :value="0">Inactive</option>
          </select>
        </div>
        
        <div class="flex justify-end space-x-2 mt-6">
          <button
            type="button"
            @click="closeDialog"
            class="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            :disabled="submitting"
            class="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {{ submitting ? 'Saving...' : (isEditing ? 'Update' : 'Create') }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { X, User, Eye, EyeOff } from 'lucide-vue-next'

export default {
  name: 'UserFormDialog',
  components: {
    X, User, Eye, EyeOff
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    isEditing: {
      type: Boolean,
      default: false
    },
    userForm: {
      type: Object,
      default: () => ({
        name: '',
        email: '',
        phone: '',
        phone2: '',
        password: '123456',
        role_id: '',
        avatar: '',
        avatarPreview: '',
        is_active: 1
      })
    },
    roles: {
      type: Array,
      default: () => []
    },
    submitting: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close', 'save-user', 'avatar-change'],
  data() {
    return {
        showPassword: false,
        localUserForm: { ...this.userForm }
    }
  },
  watch: {
    userForm: {
      handler(newVal) {
        this.localUserForm = { ...newVal }
      },
      deep: true
    },
    show(newVal) {
      if (newVal) {
          this.localUserForm = { ...this.userForm }
      }
    }
  },
  methods: {
    togglePasswordVisibility() {
        this.showPassword = !this.showPassword
    },
    closeDialog() {
      this.$emit('close')
    },
    saveUser() {
      this.$emit('save-user', this.localUserForm)
    },
    handleAvatarChange(event) {
      const file = event.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          this.localUserForm.avatarPreview = e.target.result
          this.localUserForm.avatar = e.target.result
          this.$emit('avatar-change', {
            avatar: e.target.result,
            avatarPreview: e.target.result
          })
        }
        reader.readAsDataURL(file)
      }
    }
  }
}
</script>

<style scoped>
/* Hide default browser password toggle icon */
input[type="password"]::-ms-reveal,
input[type="password"]::-ms-clear {
  display: none;
}

input[type="password"]::-webkit-inner-spin-button,
input[type="password"]::-webkit-outer-spin-button,
input[type="password"]::-webkit-search-decoration,
input[type="password"]::-webkit-search-cancel-button,
input[type="password"]::-webkit-search-results-button,
input[type="password"]::-webkit-search-results-decoration {
  display: none;
}
</style>