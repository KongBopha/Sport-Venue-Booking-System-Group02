<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-100">
    <div class="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
      <h3 class="text-lg font-semibold text-gray-900">Blacklist Management</h3>
      <!-- Open Dialog Button -->
      <button
        @click="showCreateDialog = true"
        class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center space-x-2"
      >
        <Plus class="w-4 h-4" />
        <span>Add to Blacklist</span>
      </button>
    </div>
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reason</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date Added</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Added By</th>
            <!-- <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th> -->
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-for="item in blacklistItems" :key="item.id" class="hover:bg-gray-50">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <div class="w-10 h-10 rounded-full overflow-hidden bg-gray-100 border">
                  <img
                    :src="item.avatar"
                    alt="avatar"
                    class="w-full h-full object-cover"
                  />
                </div>
                <div class="ml-4">
                  <div class="text-sm font-medium text-gray-900">{{ item.user }}</div>
                  <div class="text-sm text-gray-500">{{ item.phone1 }}</div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              <template v-if="editingItemId === item.id">
                <input v-model="editedReason" class="border px-2 py-1 rounded w-full" />
              </template>
              <template v-else>
                {{ item.reason }}
              </template>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ item.dateAdded }}</td>
            <!-- <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ item.addedBy }}</td> -->
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            <div class="flex items-center space-x-2">
              <template v-if="editingItemId === item.id">
                <button class="text-green-600 hover:text-green-900" @click="saveEdit(item.id)">Save</button>
                <button class="text-gray-500 hover:text-gray-700" @click="cancelEdit">Cancel</button>
              </template>
              <template v-else>
                <button class="text-blue-600 hover:text-blue-900" @click="startEdit(item)">Edit</button>
                <button class="text-red-600 hover:text-red-800" @click="deleteItem(item.id)">Remove</button>
              </template>
            </div>
          </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <Create
  v-if="showCreateDialog"
  @close="showCreateDialog = false"
  @created="onCreated"
/>

</template>

<script>
import { ref } from 'vue'
import { UserX, Plus } from 'lucide-vue-next'
import AdminBlackListService from './service'
import Create from './dialog/Create.vue'
export default {
  components: {
    Create
  },
  name: 'BlackList',
  data() {
    return {
      blacklistItems: [],
      editingItemId: null,
      editedReason: '',
      showCreateDialog: false // for modal
    }
  },
  async created() {
    await this.listing()
  },
  methods: {
    async listing() {
      try {
        const response = await AdminBlackListService.listing()
        this.blacklistItems = response.data.map(item => ({
          id: item.id,
          user: item.name || item.user?.name || 'N/A',
          phone1: item.user?.phone || 'N/A',
          reason: item.reason,
          dateAdded: new Date(item.created_at).toLocaleDateString(),
          avatar: this.getFullImageUrl(item.user?.avatar)

        }))
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },
    startEdit(item) {
      this.editingItemId = item.id
      this.editedReason = item.reason
    },
    async saveEdit(id) {
      try {
        await AdminBlackListService.update(id, { reason: this.editedReason })
        this.editingItemId = null
        await this.listing() // Refresh data
      } catch (error) {
        console.error('Failed to update reason:', error)
      }
    },
    cancelEdit() {
      this.editingItemId = null
      this.editedReason = ''
    },
    async deleteItem(id) {
      if (!confirm('Are you sure you want to delete this entry?')) return
      try {
        await AdminBlackListService.delete(id)
        await this.listing()
      } catch (err) {
        console.error('Delete failed', err)
      }
    },
     onCreated() {
      this.showCreateDialog = false
      this.listing()
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
    }

  },
  
}
</script>

