<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-100">
    <!-- Header -->
    <div class="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
      <h3 class="text-lg font-semibold text-gray-900">Sports Management</h3>
      <button  @click="showCreateModal = true" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
        <Plus class="w-4 h-4" />
        <span>Add Sport</span>
      </button>
    </div>

    <!-- Sports List -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      <div v-for="sport in sports" :key="sport.id" class="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
        <div class="flex justify-center mb-3">
          <div class="w-12 h-12 rounded-lg overflow-hidden">
            <img
              :src="getImageUrl(sport.image)"
              alt="Sport Image"
              class="object-cover w-full h-full"
            />
          </div>
        </div>

        <h4 class="font-medium text-gray-900 mb-2 text-center">{{ sport.name }}</h4>
        <p class="text-sm text-gray-500 text-center mb-3">{{ sport.description }}</p>

        <div class="mt-4 flex space-x-2">
          <button class="flex-1 text-blue-600 hover:text-blue-700 text-sm font-medium" @click="editSport(sport)">Edit</button>
          <button class="flex-1 text-red-600 hover:text-red-700 text-sm font-medium"  @click="deleteCategory(sport)" >Delete</button>
        </div>
      </div>
    </div>

    <!-- Edit Modal -->
    <div v-if="showEditModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 class="text-lg font-semibold mb-4">Edit Sport</h2>

        <div class="mb-4">
          <label class="block text-sm font-medium">Name</label>
          <input v-model="editingSport.name" class="w-full border px-3 py-2 rounded" />
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium">Description</label>
          <textarea v-model="editingSport.description" class="w-full border px-3 py-2 rounded"></textarea>
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium">Image</label>
          <input type="file" @change="handleImageUpload" />
          <img v-if="editingSport.image" :src="editingSport.image" class="mt-2 rounded w-24 h-24 object-cover" />
        </div>

        <div class="flex justify-end gap-2 mt-4">
          <button @click="showEditModal = false" class="px-4 py-2 bg-gray-300 rounded">Cancel</button>
          <button @click="submitEdit" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Save</button>
        </div>
      </div>
    </div>
  </div>
  <Create
    v-if="showCreateModal"
    @cancel="showCreateModal = false"
    @created="handleCreatedSport"
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
import { ref } from 'vue';
import { Plus, Zap, Target, Users, Waves, Trophy, Shield } from 'lucide-vue-next';
import AdminSportService from './service';
import DeleteConfirmDialog from './dialog/DeleteConfirmDialog.vue';
import Create from './dialog/Create.vue';
export default {
  name: 'Sport',
  components: { 
    Plus,
    DeleteConfirmDialog,
    Create 
  },
  data() {
    return {
      sports: [],
       showEditModal: false,
       showCreateModal: false,
        editingSport: {
          id: null,
          name: '',
          description: '',
          image: '',
        },
      showDeleteDialog: false,
      deletingItem: null,
      submittingDelete: false,
      icons: [Zap, Target, Users, Waves, Trophy, Shield],
      bgColors: ['bg-green-100', 'bg-orange-100', 'bg-blue-100', 'bg-cyan-100', 'bg-purple-100', 'bg-pink-100'],
      iconColors: ['text-green-600', 'text-orange-600', 'text-blue-600', 'text-cyan-600', 'text-purple-600', 'text-pink-600']
    };
  },
  async created() {
    await this.fetchSports();
  },
  methods: {
    async fetchSports() {
      try {
        const response = await AdminSportService.listing();
        this.sports = response;
      } catch (error) {
        console.error('Error fetching sports:', error);
      }
    },
    async deleteSport(id) {
      if (!confirm('Are you sure you want to delete this sport?')) return;
      try {
        await AdminSportService.delete(id);
        this.sports = this.sports.filter((s) => s.id !== id);
      } catch (error) {
        console.error('Delete failed:', error);
      }
    },
    getImageUrl(path) {
      if (!path) {
        return 'https://ui-avatars.com/api/?name=No+Image&background=random';
      }
      const base = import.meta.env.VITE_FILE_BASE_URL.replace(/\/+$/, '');
      const cleanPath = path.replace(/^\/+/, '');
      return `${base}/${cleanPath}`;
    },
      editSport(sport) {
      this.editingSport = { ...sport }; // Open modal or form with existing data
      this.showEditModal = true;
    },
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = () => {
        this.editingSport.image = reader.result; // base64 string
      };
      reader.readAsDataURL(file);
    },
     deleteCategory(item) {
      this.deletingItem = item;
      this.showDeleteDialog = true;
    },
    async submitEdit() {
      try {
        const payload = {
          name: this.editingSport.name,
          description: this.editingSport.description,
          image: this.editingSport.image, // base64 image
        };
        await AdminSportService.update(this.editingSport.id, payload);
        await this.fetchSports();
        this.showEditModal = false;
      } catch (error) {
        console.error('Update failed:', error);
      }
    },
    async confirmDelete(item) {
  this.submittingDelete = true;
  try {
    await AdminSportService.delete(item.id); // Correct service
    this.showDeleteDialog = false;
    this.deletingItem = null;
    await this.fetchSports(); // Refresh the list
  } catch (err) {
    console.error('Delete failed', err);
  } finally {
    this.submittingDelete = false;
  }
      },
      handleCreatedSport(newSport) {
      this.sports.push(newSport);
    }

  }
};
</script>