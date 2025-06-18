<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-100">
    <div class="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
      <h3 class="text-lg font-semibold text-gray-900">Sports Management</h3>
      <button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
        <Plus class="w-4 h-4" />
        <span>Add Sport</span>
      </button>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      <div v-for="sport in sports" :key="sport.id" class="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
        <div class="flex items-center justify-between mb-3">
          <div :class="['w-12 h-12 rounded-lg flex items-center justify-center', sport.bgColor]">
            <component :is="sport.icon" :class="['w-6 h-6', sport.iconColor]" />
          </div>
          <span :class="['px-2 py-1 text-xs font-medium rounded-full', 
            sport.status === 'Active' ? 'bg-green-100 text-green-800' : 
            'bg-gray-100 text-gray-800']">
            {{ sport.status }}
          </span>
        </div>
        <h4 class="font-medium text-gray-900 mb-2">{{ sport.name }}</h4>
        <div class="space-y-1 text-sm text-gray-500">
          <div class="flex justify-between">
            <span>Teams</span>
            <span>{{ sport.teams }}</span>
          </div>
          <div class="flex justify-between">
            <span>Players</span>
            <span>{{ sport.players }}</span>
          </div>
          <div class="flex justify-between">
            <span>Equipment</span>
            <span>{{ sport.equipment }}</span>
          </div>
        </div>
        <div class="mt-4 flex space-x-2">
          <button class="flex-1 text-blue-600 hover:text-blue-700 text-sm font-medium">Edit</button>
          <button class="flex-1 text-red-600 hover:text-red-700 text-sm font-medium">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { Plus, Zap, Target, Users, Waves, Trophy, Shield } from 'lucide-vue-next'
import  AdminSportService  from './service';
export default {
  name: 'Sport',
  data() {
    return {
      sports : ref([
        { 
          id: 1, 
          name: 'Football', 
          teams: 12, 
          players: 264, 
          equipment: 45,
          status: 'Active',
          icon: Zap,
          bgColor: 'bg-green-100',
          iconColor: 'text-green-600'
        },
        { 
          id: 2, 
          name: 'Basketball', 
          teams: 8, 
          players: 120, 
          equipment: 32,
          status: 'Active',
          icon: Target,
          bgColor: 'bg-orange-100',
          iconColor: 'text-orange-600'
        },
        { 
          id: 3, 
          name: 'Tennis', 
          teams: 6, 
          players: 48, 
          equipment: 28,
          status: 'Active',
          icon: Users,
          bgColor: 'bg-blue-100',
          iconColor: 'text-blue-600'
        },
        { 
          id: 4, 
          name: 'Swimming', 
          teams: 4, 
          players: 80, 
          equipment: 15,
          status: 'Active',
          icon: Waves,
          bgColor: 'bg-cyan-100',
          iconColor: 'text-cyan-600'
        },
        { 
          id: 5, 
          name: 'Cricket', 
          teams: 5, 
          players: 110, 
          equipment: 38,
          status: 'Inactive',
          icon: Trophy,
          bgColor: 'bg-purple-100',
          iconColor: 'text-purple-600'
        },
        { 
          id: 6, 
          name: 'Hockey', 
          teams: 3, 
          players: 66, 
          equipment: 22,
          status: 'Active',
          icon: Shield,
        }
      ])

    }
  },
  async created() {
    await this.listing();
  },
  methods: {
    async listing() {
      try {
        const response = await AdminSportService.listing();
        console.log(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  }

}


</script>