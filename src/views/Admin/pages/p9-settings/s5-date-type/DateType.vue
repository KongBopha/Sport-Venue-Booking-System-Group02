<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-100">
    <div class="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
      <h3 class="text-lg font-semibold text-gray-900">Date Type Configuration</h3>
    </div>

    <div class="p-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Date Types List -->
        <div class="space-y-4">
          <h4 class="font-medium text-gray-900">Available Date Types</h4>
          <div
            v-for="(dateType, index) in dateTypes"
            :key="dateType.id"
            class="border border-gray-200 rounded-lg p-4"
          >
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center space-x-3">
                <div :class="['w-8 h-8 rounded-lg flex items-center justify-center', bgColors[index % bgColors.length]]">
                  <Calendar :class="[iconColors[index % iconColors.length], 'w-4 h-4']" />
                </div>
                <div>
                  <h5 class="font-medium text-gray-900">{{ dateType.day }}</h5>
                </div>
              </div>
              <div class="flex items-center space-x-2">
                <button @click="startEdit(dateType)" class="text-blue-600 hover:text-blue-700 text-sm">Edit</button>
                <button @click="promptDelete(dateType)" class="text-red-600 hover:text-red-700 text-sm">Delete</button>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span class="text-gray-500">Price Multiplier:</span>
                <span class="font-medium ml-1">{{ dateType.price_multiplier }}x</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Date Type Form -->
        <div class="bg-gray-50 rounded-lg p-4">
          <h4 class="font-medium text-gray-900 mb-4">
            {{ isEditing ? 'Edit Date Type' : 'Add Date Type' }}
          </h4>
          <form class="space-y-4" @submit.prevent="submitDateType">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Day</label>
              <div class="grid grid-cols-2 gap-2">
                <label
                  v-for="day in weekDays"
                  :key="day"
                  class="flex items-center space-x-2"
                >
                  <input
                    type="radio"
                    class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    v-model="formData.day"
                    :value="day"
                    :disabled="isEditing"
                  />
                  <span class="text-sm">{{ day }}</span>
                </label>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Price Multiplier</label>
              <input
                type="number"
                step="0.1"
                v-model.number="formData.price_multiplier"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 1.25"
              />
            </div>

            <div class="flex space-x-2">
              <button
                type="submit"
                :disabled="submitting"
                class="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                <span v-if="submitting" class="flex items-center justify-center">
                  <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Saving...
                </span>
                <span v-else>{{ isEditing ? 'Update' : 'Save' }}</span>
              </button>
              <button
                type="button"
                @click="resetForm"
                class="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

  <DeleteConfirmDialog
    :show="showDeleteDialog"
    :itemToDelete="deletingItem"
    :submitting="submittingDelete"
    @close="showDeleteDialog = false"
    @confirm-delete="confirmDelete"
  />
</template>


<script>
import { ref } from 'vue'
import { Calendar, Plus } from 'lucide-vue-next'
import AdminDateTypeService from './service'
import DeleteConfirmDialog from './dialog/DeleteConfirmDialog.vue'

export default {
  name: 'Date-Type',
  components: {
    Calendar,
    Plus,
    DeleteConfirmDialog
  },
  data() {
    return {
      dateTypes: [],
      bgColors: ['bg-blue-100', 'bg-green-100', 'bg-purple-100', 'bg-yellow-100', 'bg-pink-100', 'bg-gray-100'],
      iconColors: ['text-blue-600', 'text-green-600', 'text-purple-600', 'text-yellow-600', 'text-pink-600', 'text-gray-600'],
      formData: {
        day: '',
        price_multiplier: null
      },
      weekDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      submitting: false,
      showDeleteDialog: false,
      deletingItem: null,
      submittingDelete: false,
      editingItem: null,
      isEditing: false,
    }
  },
  async created() {
    await this.listing()
  },
  methods: {
    async listing() {
      try {
        const response = await AdminDateTypeService.listing()
        this.dateTypes = response
      } catch (error) {
        console.error('Error fetching date types:', error)
      }
    },
    async submitDateType() {
      if (!this.formData.day || !this.formData.price_multiplier) {
        alert('Day and price multiplier are required.');
        return;
      }

      this.submitting = true;
      try {
        if (this.isEditing && this.editingItem) {
          // Update existing
          const response = await AdminDateTypeService.update(
            this.editingItem.id,
            { price_multiplier: this.formData.price_multiplier }
          );
          // Update local list
          const index = this.dateTypes.findIndex(dt => dt.id === this.editingItem.id);
          if (index !== -1) {
            this.dateTypes[index] = { ...this.dateTypes[index], ...response };
          }
        } else {
          // Create new
          const response = await AdminDateTypeService.create(this.formData);
          this.dateTypes.push(response);
        }

        this.resetForm();
      } catch (error) {
        alert('Failed to save date type.');
      } finally {
        this.submitting = false;
      }
    },
    async deleteDateType(id) {
      if (!confirm('Are you sure you want to delete this date type?')) return

      try {
        await AdminDateTypeService.delete(id)
        this.dateTypes = this.dateTypes.filter(dt => dt.id !== id)
      } catch (error) {
        alert('Failed to delete date type.')
      }
    },
    promptDelete(item) {
      this.deletingItem = item;
      this.showDeleteDialog = true;
    },

    async confirmDelete(item) {
      this.submittingDelete = true;
      try {
        await AdminDateTypeService.delete(item.id);
        this.dateTypes = this.dateTypes.filter(dt => dt.id !== item.id);
        this.showDeleteDialog = false;
        this.deletingItem = null;
      } catch (error) {
        alert('Failed to delete date type.');
      } finally {
        this.submittingDelete = false;
      }
    },
    startEdit(dateType) {
      this.editingItem = { ...dateType }; // backup
      this.formData.day = dateType.day;
      this.formData.price_multiplier = dateType.price_multiplier;
      this.isEditing = true;
    },
    resetForm() {
      this.formData.day = '';
      this.formData.price_multiplier = null;
      this.editingItem = null;
      this.isEditing = false;
    }


  }
}

</script>
