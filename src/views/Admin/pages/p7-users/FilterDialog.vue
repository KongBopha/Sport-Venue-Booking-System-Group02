<template>
  <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-6 w-full max-w-md">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-semibold">Filter Users</h3>
        <button @click="closeDialog" class="text-gray-400 hover:text-gray-600">
          <X class="w-5 h-5" />
        </button>
      </div>
      
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Search</label>
          <input
            v-model="localFilterForm.key"
            type="text"
            placeholder="Search by name, email, or phone"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Role</label>
          <select
            v-model="localFilterForm.role_id"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Roles</option>
            <option v-for="role in roles" :key="role.id" :value="role.id">{{ role.name }}</option>
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            v-model="localFilterForm.is_active"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Status</option>
            <option value="1">Active</option>
            <option value="0">Inactive</option>
          </select>
        </div>
      </div>
      
      <div class="flex justify-end space-x-2 mt-6">
        <button
          @click="clearFilters"
          class="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Clear
        </button>
        <button
          @click="applyFilters"
          class="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Apply Filters
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { X } from 'lucide-vue-next'

export default {
  name: 'FilterDialog',
  components: {
    X
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    filterForm: {
      type: Object,
      default: () => ({
        key: '',
        role_id: '',
        is_active: ''
      })
    },
    roles: {
      type: Array,
      default: () => []
    }
  },
  emits: ['close', 'apply-filters', 'clear-filters'],
  data() {
    return {
      localFilterForm: { ...this.filterForm }
    }
  },
  watch: {
    filterForm: {
      handler(newVal) {
        this.localFilterForm = { ...newVal }
      },
      deep: true
    },
    show(newVal) {
      if (newVal) {
        this.localFilterForm = { ...this.filterForm }
      }
    }
  },
  methods: {
    closeDialog() {
      this.$emit('close')
    },
    applyFilters() {
      this.$emit('apply-filters', this.localFilterForm)
    },
    clearFilters() {
      this.localFilterForm = {
        key: '',
        role_id: '',
        is_active: ''
      }
      this.$emit('clear-filters', this.localFilterForm)
    }
  }
}
</script>