<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-100">
    <div class="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
      <h3 class="text-lg font-semibold text-gray-900">Blacklist Management</h3>
      <button class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center space-x-2">
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
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-for="item in blacklistItems" :key="item.id" class="hover:bg-gray-50">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <div class="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <UserX class="w-5 h-5 text-red-600" />
                </div>
                <div class="ml-4">
                  <div class="text-sm font-medium text-gray-900">{{ item.user }}</div>
                  <div class="text-sm text-gray-500">{{ item.email }}</div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.reason }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ item.dateAdded }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ item.addedBy }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <div class="flex items-center space-x-2">
                <button class="text-blue-600 hover:text-blue-900">Edit</button>
                <button class="text-green-600 hover:text-green-900">Remove</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { UserX, Plus } from 'lucide-vue-next'
import  AdminBlackListService  from './service';
export default {
  name: 'BlackList',
  data() {
    return {
      blacklistItems : ref([
        { id: 1, user: 'John Troublemaker', email: 'john.trouble@email.com', reason: 'Repeated violations', dateAdded: '2024-01-10', addedBy: 'Admin' },
        { id: 2, user: 'Jane Spammer', email: 'jane.spam@email.com', reason: 'Spam activities', dateAdded: '2024-01-08', addedBy: 'Manager' },
        { id: 3, user: 'Mike Abuser', email: 'mike.abuse@email.com', reason: 'Abusive behavior', dateAdded: '2024-01-05', addedBy: 'Admin' }
      ])
    }
  },
  async created() {
    await this.listing();
  },
  methods: {
    async listing() {
      try {
        const response = await AdminBlackListService.listing();
        console.log(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  }

}


</script>