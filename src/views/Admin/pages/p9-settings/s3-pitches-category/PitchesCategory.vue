<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-100">
    <div class="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
      <h3 class="text-lg font-semibold text-gray-900">Pitches Category Management</h3>
      <button  @click="showCreateDialog = true" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
        <Plus class="w-4 h-4" />
        <span>Add Category</span>
      </button>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      <div v-for="category in categories" :key="category.id" class="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center space-x-3">
           <!-- This replaces your current image + input area -->
              <div class="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 relative">
                <img 
                  v-if="category.img"
                  :src="getFullImageUrl(category.img)" 
                  alt="Preview" 
                  class="absolute inset-0 w-full h-full object-cover z-0"
                />
                <input 
                  v-if="editingId === category.id"
                  type="file" 
                  @change="onImageSelected($event, category)"
                  accept="image/*"
                  class="opacity-0 absolute inset-0 cursor-pointer z-10"
                />
              </div>

            <div>
              <!-- Name -->
              <h4 v-if="editingId !== category.id" class="font-medium text-gray-900">{{ category.name }}</h4>
              <input v-else v-model="category.editName" class="border p-1 rounded text-sm w-full" />
            </div>
          </div>
          <button class="text-gray-400 hover:text-gray-600">
            <MoreVertical class="w-4 h-4" />
          </button>
        </div>
        <div class="space-y-2">
          <div class="flex justify-between text-sm">
            <span class="text-gray-500">Base Price</span>
            <!-- price -->
            <span v-if="editingId !== category.id" class="font-medium">${{ category.basePrice }}</span>
            <input 
              v-else 
              v-model="category.editPrice" 
              type="number"
               @keydown="isInvalidKey"
              class="text-right font-medium bg-transparent border-b border-gray-300 w-20 focus:outline-none"
            />
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-gray-500">Required Player</span>
            <!-- require player -->
            <span v-if="editingId !== category.id" class="font-medium">{{ category.maxCapacity }} players</span>
              <input 
                v-else 
                v-model="category.editCapacity" 
                type="number"
                  @keydown="isInvalidKey"
                class="text-right font-medium bg-transparent border-b border-gray-300 w-20 focus:outline-none"
              />
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-gray-500">Volume</span>
            <!-- volume -->
             <span v-if="editingId !== category.id" class="font-medium">{{ category.volume }}</span>
              <input 
                v-else 
                v-model="category.editVolume" 
                type="number"
                  @keydown="isInvalidKey"
                class="text-right font-medium bg-transparent border-b border-gray-300 w-20 focus:outline-none"
              />
          </div>
        </div>
        <div class="mt-4 flex space-x-2">
          <button @click="editingId === category.id ? saveCategory(category) : (editingId = category.id)"  class="flex-1 text-blue-600 hover:text-blue-700 text-sm font-medium"> 
            {{ editingId === category.id ? 'Save' : 'Edit' }}
          </button>
          <button  @click="deleteCategory(category)" class="flex-1 text-red-600 hover:text-red-700 text-sm font-medium">Delete</button>
        </div>
      </div>
    </div>
  </div>
  <Create 
    v-if="showCreateDialog"
    @created="onCategoryCreated"
    @cancel="showCreateDialog = false"
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
import { Plus, MoreVertical, Zap, Users, Waves, Target } from 'lucide-vue-next'
import { ref, nextTick } from 'vue'
import Create from './dialog/Create.vue';
import AdminPitchCategoryService from './service';
import DeleteConfirmDialog from './dialog/DeleteConfirmDialog.vue';
export default {
  name: 'Pitch-Category',
  components: {
    Create,
    DeleteConfirmDialog
  },
  data() {
    return {
      categories: [],
      editingId: null,
      showCreateDialog: false,
      showDeleteDialog: false,
      deletingItem: null,
      submittingDelete: false
    }
  },
  async created() {
    await this.listing();
  },
  methods: {
    async listing() {
      try {
        const response = await AdminPitchCategoryService.listing();
        this.categories = response.map((item, index) => ({
          id: item.id,
          name: item.name,
          pitchCount: item.pitchCount ?? 0,
          basePrice: item.basePrice,
          maxCapacity: item.maxCapacity,
          volume: item.volume,
          icon: [Zap, Target, Users, Waves][index % 4],
          bgColor: ['bg-green-100', 'bg-orange-100', 'bg-blue-100', 'bg-cyan-100'][index % 4],
          iconColor: ['text-green-600', 'text-orange-600', 'text-blue-600', 'text-cyan-600'][index % 4],
          img: item.img ?? null,
          editName: item.name,
          editPrice: item.basePrice,
          editCapacity: item.maxCapacity,
          editVolume: item.volume
        }));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },

    deleteCategory(item) {
      this.deletingItem = item;
      this.showDeleteDialog = true;
    },

    async confirmDelete(item) {
        this.submittingDelete = true;
        try {
          await AdminPitchCategoryService.delete(item.id); // ✅ Corrected service
          this.showDeleteDialog = false;
          this.deletingItem = null;
          await this.listing();
        } catch (err) {
          console.error('Delete failed', err);
        } finally {
          this.submittingDelete = false;
        }
      },


    async saveCategory(category) {
      try {
        const payload = {
          name: category.editName,
          price: category.editPrice,
          required_players: category.editCapacity,
          volume: category.editVolume,
          image: category.image ?? '' // now base64 if edited
        };
        await AdminPitchCategoryService.update(category.id, payload);

        // Update local state
        category.name = category.editName;
        category.basePrice = category.editPrice;
        category.maxCapacity = category.editCapacity;
        category.volume = category.editVolume;
        this.editingId = null;
      } catch (error) {
        console.error('Error updating category:', error);
      }
    },

    onCategoryCreated(newItem) {
      this.showCreateDialog = false;
      this.categories.unshift({
        ...newItem,
        pitchCount: 0,
        icon: [Zap, Target, Users, Waves][this.categories.length % 4],
        bgColor: ['bg-green-100', 'bg-orange-100', 'bg-blue-100', 'bg-cyan-100'][this.categories.length % 4],
        iconColor: ['text-green-600', 'text-orange-600', 'text-blue-600', 'text-cyan-600'][this.categories.length % 4],
        editName: newItem.name,
        editPrice: newItem.price,
        editCapacity: newItem.required_players,
        editVolume: newItem.volume,
        img: newItem.img // ✅ correct key from backend
      });
    },

    isInvalidKey(event) {
      const allowedKeys = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete'];
      const isNumberKey = event.key >= '0' && event.key <= '9';
      if (!isNumberKey && !allowedKeys.includes(event.key)) {
        event.preventDefault();
      }
    },

   getFullImageUrl(imgPath) {
      if (!imgPath) return '';
      if (imgPath.startsWith('data:image') || imgPath.startsWith('http')) {
        return imgPath;
      }
      // Always ensure no duplicate slash in the middle
      const base = import.meta.env.VITE_FILE_BASE_URL.replace(/\/+$/, '');
      const path = imgPath.replace(/^\/+/, '');
      return `${base}/${path}`;
    },



    async onImageSelected(event, category) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

   reader.onload = () => {
      category.img = reader.result; // ✅ works in Vue 3 if 'img' is pre-defined
    };


    reader.readAsDataURL(file);
  }

  }
}
</script>
