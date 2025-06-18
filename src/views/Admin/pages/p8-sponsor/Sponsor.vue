<template>
  <div class="space-y-8">
    <!-- Sponsor Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Total Sponsors</p>
            <p class="text-3xl font-bold text-gray-900 mt-2">42</p>
          </div>
          <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <Building class="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>
      
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Active Contracts</p>
            <p class="text-3xl font-bold text-gray-900 mt-2">34</p>
          </div>
          <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <FileText class="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>
      
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Total Value</p>
            <p class="text-3xl font-bold text-gray-900 mt-2">$245K</p>
          </div>
          <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
            <DollarSign class="w-6 h-6 text-purple-600" />
          </div>
        </div>
      </div>
      
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Expiring Soon</p>
            <p class="text-3xl font-bold text-gray-900 mt-2">6</p>
          </div>
          <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
            <AlertTriangle class="w-6 h-6 text-orange-600" />
          </div>
        </div>
      </div>
    </div>

    <!-- Sponsors Table -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100">
      <div class="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <h3 class="text-lg font-semibold text-gray-900">Sponsor Management</h3>
        <div class="flex items-center space-x-2">
          <button class="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter class="w-4 h-4 inline mr-1" />
            Filter
          </button>
          <button class="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus class="w-4 h-4 inline mr-1" />
            Add Sponsor
          </button>
        </div>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Company</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact Person</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contract Value</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Start Date</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">End Date</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-for="sponsor in sponsors" :key="sponsor.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Building class="w-5 h-5 text-blue-600" />
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ sponsor.company }}</div>
                    <div class="text-sm text-gray-500">{{ sponsor.industry }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ sponsor.contact }}</div>
                <div class="text-sm text-gray-500">{{ sponsor.email }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${{ sponsor.value }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ sponsor.startDate }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ sponsor.endDate }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="['px-2 py-1 text-xs font-medium rounded-full', 
                  sponsor.status === 'Active' ? 'bg-green-100 text-green-800' : 
                  sponsor.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-red-100 text-red-800']">
                  {{ sponsor.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div class="flex items-center space-x-2">
                  <button class="text-blue-600 hover:text-blue-900">Edit</button>
                  <button class="text-green-600 hover:text-green-900">Renew</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { Building, FileText, DollarSign, AlertTriangle, Filter, Plus } from 'lucide-vue-next'
import  AdminSponsorService  from './service';
export default {
  name: 'Sponsor',
  data() {
    return {
      sponsors : ref([
        { id: 1, company: 'Nike Sports', industry: 'Sportswear', contact: 'John Smith', email: 'john@nike.com', value: '45,000', startDate: '2024-01-01', endDate: '2024-12-31', status: 'Active' },
        { id: 2, company: 'Adidas', industry: 'Sportswear', contact: 'Jane Doe', email: 'jane@adidas.com', value: '55,000', startDate: '2024-02-01', endDate: '2025-01-31', status: 'Active' },
        { id: 3, company: 'Puma', industry: 'Sportswear', contact: 'Mike Johnson', email: 'mike@puma.com', value: '25,000', startDate: '2024-03-01', endDate: '2024-08-31', status: 'Expired' },
        { id: 4, company: 'Under Armour', industry: 'Sportswear', contact: 'Sarah Wilson', email: 'sarah@ua.com', value: '35,000', startDate: '2024-06-01', endDate: '2025-05-31', status: 'Pending' },
        { id: 5, company: 'Reebok', industry: 'Sportswear', contact: 'Tom Brown', email: 'tom@reebok.com', value: '30,000', startDate: '2024-04-01', endDate: '2024-12-31', status: 'Active' }
      ])
    }
  },
  async created() {
    await this.listing();
  },
  methods: {
    async listing() {
      try {
        const response = await AdminSponsorService.listing();
        console.log(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  }

}


</script>