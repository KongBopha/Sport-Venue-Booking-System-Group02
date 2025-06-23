<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-100">
    <div class="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
      <h3 class="text-lg font-semibold text-gray-900">Pitch Management</h3>
      <button @click="showCreateDialog = true"  class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
        <Plus class="w-4 h-4" />
        <span>Add Pitch</span>
      </button>
    </div>
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pitch Name</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <template v-for="pitch in pitches" :key="pitch.id">
            <!-- Row Display -->
            <tr class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <MapPin class="w-5 h-5 text-green-600" />
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ pitch.name }}</div>
                    <div class="text-sm text-gray-500">{{ pitch.location }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ getCategoryName(pitch.category_id) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div class="flex items-center space-x-2">
                  <button class="text-blue-600 hover:text-blue-900" @click="startEdit(pitch)">Edit</button>
                  <button class="text-red-600 hover:text-red-900" @click="deletePitch(pitch)">Delete</button>
                </div>
              </td>
            </tr>

            <!-- Inline Edit Row -->
            <tr v-if="editMode && editPitch && editPitch.id === pitch.id">
              <td colspan="3" class="bg-gray-50 px-6 py-4">
                <form @submit.prevent="submitEdit">
                  <div class="mb-2">
                    <label class="block text-sm font-medium text-gray-700">Pitch Name</label>
                    <input v-model="editForm.name" class="w-full border rounded px-3 py-2" required />
                  </div>
                  <div class="mb-2">
                    <label class="block text-sm font-medium text-gray-700">Category</label>
                    <select v-model="editForm.category_id" class="w-full border rounded px-3 py-2" required>
                      <option disabled value="">Select Category</option>
                      <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                        {{ cat.name }}
                      </option>
                    </select>
                  </div>
                  <div class="flex gap-2">
                    <button type="submit" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                      Save
                    </button>
                    <button
                      type="button"
                      @click="editMode = false"
                      class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
<Create
  v-if="showCreateDialog"
  @cancel="showCreateDialog = false"
  @created="listing"
/>


    <DeleteConfirmDialog
    :show="showDeleteDialog"
    :userToDelete="deletingItem"
    :submitting="submittingDelete"
    @close="showDeleteDialog = false"
    @confirm-delete="confirmDelete"
  />
</template>


<script>
import { ref } from 'vue'
import { MapPin, Plus } from 'lucide-vue-next'
import  AdminPitchService  from './service';
import Create from './dialog/Create.vue';
import DeleteConfirmDialog from './dialog/DeleteConfirmDialog.vue';
export default {
  name: 'Pitch',
  components: {
    Create,
    DeleteConfirmDialog
  },
  data() {
    
    return {
      pitches : ref([]),
      categories: ref([]),
      editMode: false,
      editPitch: null,
      editForm: {
        name: '',
        category_id: ''
      },
      showCreateDialog: false,
      showDeleteDialog: false,
      deletingItem: null,
      submittingDelete: false
    }
  },
  async created() {
    await this.listing();
     await this.setupData();
  },
  methods: {
    async listing() {
      try {
        const response = await AdminPitchService.listing();
        this.pitches = response;
        console.log(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    async setupData() {
      try {
        const response = await AdminPitchService.getSetupData();
        this.categories = response;
      } catch (error) {
        console.error('Error fetching setup data:', error);
      }
    },
    getCategoryName(id) {
      const found = this.categories.find(c => c.id === id);
      return found ? `${found.name}` : 'no category match this pitch';
    },
    startEdit(pitch) {
    this.editMode = true;
    this.editPitch = pitch;
    this.editForm = {
      name: pitch.name,
      category_id: pitch.category_id
    };
    },
    async submitEdit() {
      try {
        await AdminPitchService.update(this.editPitch.id, this.editForm);
        this.editMode = false;
        this.editPitch = null;
        this.editForm = { name: '', category_id: '' };
        await this.listing();
      } catch (error) {
        console.error('Error updating pitch:', error);
      }
    },
     deletePitch(item) {
      this.deletingItem = item;
      this.showDeleteDialog = true;
    },

    async confirmDelete(item) {
        this.submittingDelete = true;
        try {
          await AdminPitchService.delete(item.id); // ✅ Corrected service
          this.showDeleteDialog = false;
          this.deletingItem = null;
          await this.listing();
        } catch (err) {
          console.error('Delete failed', err);
        } finally {
          this.submittingDelete = false;
        }
      },




  }

}


</script>