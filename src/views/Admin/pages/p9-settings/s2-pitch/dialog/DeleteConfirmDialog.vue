<template>
  <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-6 w-full max-w-md">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-semibold text-red-600">Delete User</h3>
        <button @click="closeDialog" class="text-gray-400 hover:text-gray-600">
          <X class="w-5 h-5" />
        </button>
      </div>
      
      <div class="flex items-center mb-6">
        <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
          <AlertTriangle class="w-6 h-6 text-red-600" />
        </div>
        <div>
          <p class="text-gray-800 font-medium">Are you sure you want to delete this pitch ?</p>
          <p class="text-gray-600 text-sm mt-1">
            <strong>{{ userToDelete?.name }}</strong> will be permanently removed.
          </p>
        </div>
      </div>
      
      <div class="bg-red-50 border border-red-200 rounded-lg p-3 mb-6">
        <p class="text-red-800 text-sm">
          <strong>Warning:</strong> This action cannot be undone. All user data will be permanently deleted.
        </p>
      </div>
      
      <div class="flex justify-end space-x-2">
        <button
          @click="closeDialog"
          class="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Cancel
        </button>
        <button
          @click="confirmDelete"
          :disabled="submitting"
          class="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <span v-if="submitting" class="flex items-center">
            <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Deleting...
          </span>
          <span v-else>Delete Pitch</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { X, AlertTriangle } from 'lucide-vue-next'

export default {
  name: 'DeleteConfirmDialog',
  components: {
    X, AlertTriangle
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    userToDelete: {
      type: Object,
      default: null
    },
    submitting: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close', 'confirm-delete'],
  methods: {
    closeDialog() {
      this.$emit('close')
    },
    confirmDelete() {
      this.$emit('confirm-delete', this.userToDelete)
    }
  }
}
</script>