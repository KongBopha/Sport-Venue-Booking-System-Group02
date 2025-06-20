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
            <div :class="['w-10 h-10 rounded-lg flex items-center justify-center', category.bgColor]">
              <component :is="category.icon" :class="['w-5 h-5', category.iconColor]" />
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
          <button  @click="deleteCategory(category.id)" class="flex-1 text-red-600 hover:text-red-700 text-sm font-medium">Delete</button>
        </div>
      </div>
    </div>
  </div>
  <Create 
    v-if="showCreateDialog"
    @created="onCategoryCreated"
    @cancel="showCreateDialog = false"
  />

</template>

<script>
import { Plus, MoreVertical, Zap, Users, Waves, Target } from 'lucide-vue-next'
import { ref, nextTick } from 'vue'
import Create from './dialog/Create.vue';
import  AdminPitchCategoryService  from './service';
export default {
  name: 'Pitch-Category',
  components: {
    Create // ✅ register it here
  },
  data() {
    return {
     categories: [],
     editingId: null,
     showCreateDialog: false
    }
  },
  async created() {
    await this.listing();
  },
  methods: {
    //listing category funtion
    async listing() {
      try {
        const response = await AdminPitchCategoryService.listing();
        this.categories = response.map((item, index)=>({
            id : item.id,
            name : item.name,
            pitchCount : item.pitchCount ?? 0,
            basePrice : item.basePrice,
            maxCapacity : item.maxCapacity,
            volume : item.volume,
            icon: [Zap, Target, Users, Waves][index % 4], // Rotate icons
            bgColor: ['bg-green-100', 'bg-orange-100', 'bg-blue-100', 'bg-cyan-100'][index % 4],
            iconColor: ['text-green-600', 'text-orange-600', 'text-blue-600', 'text-cyan-600'][index % 4],
             // Editable temp fields
            editName: item.name,
            editPrice: item.basePrice,
            editCapacity: item.maxCapacity,
            editVolume: item.volume
        }))
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    //delete category funtion
    async deleteCategory(id) {
      if (!confirm('Are you sure you want to delete this category?')) return;

      try {
        await AdminPitchCategoryService.delete(id);
        this.listing(); // Refresh after deletion
      } catch (error) {
        console.error('Error deleting category:', error);
      }
      
    },
    //Edit (update) pitch category
    async saveCategory(category) {
      try {
        const payload = {
          name: category.editName,
          price: category.editPrice,
          required_players: category.editCapacity,
          volume: category.editVolume
        };
         await AdminPitchCategoryService.update(category.id, payload);

      // Update local display values instead of re-fetching all
        category.name = category.editName;
        category.basePrice = category.editPrice;
        category.maxCapacity = category.editCapacity;
        category.volume = category.editVolume;
        this.editingId = null;
      } catch (error) {
        console.error('Error updating category:', error);
      }
    
    },
    //open create pitch category dialog 
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
      editVolume: newItem.volume
    });
  },

    // input control
    isInvalidKey(event) {
      const allowedKeys = [
        'Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete'
      ];

      // Allow 0–9 digits
      const isNumberKey = event.key >= '0' && event.key <= '9';

      if (!isNumberKey && !allowedKeys.includes(event.key)) {
        event.preventDefault();
      }
    }



  }
}

</script>