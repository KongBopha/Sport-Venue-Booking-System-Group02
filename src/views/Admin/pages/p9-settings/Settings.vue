<template>
  <div class="space-y-8">
    <!--  Navigation -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4"> Categories</h3>
      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <router-link
          :to="category.route"
          v-for="category in settingsCategories" 
          :key="category.name"
          :class="['p-4 rounded-lg border-2 transition-all duration-200 flex flex-col items-center space-y-2',
                  $route.path === category.route ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300']"
        >
          <component :is="category.icon" class="w-6 h-6 text-gray-600" />
          <span class="text-sm font-medium text-gray-900">{{ category.name }}</span>
        </router-link>
      </div>
    </div>

    <!-- Dynamic  Content -->
    <router-view />

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { 
  UserX, 
  MapPin, 
  Grid3X3, 
  Zap, 
  Calendar, 
  Clock, 
  Award 
} from 'lucide-vue-next'

const currentSetting = ref('Blacklist')

const settingsCategories = [
  { name: 'Blacklist', icon: UserX , route: '/admin/settings/blacklist'},
  { name: 'Pitch', icon: MapPin , route: '/admin/settings/pitch'},
  { name: 'PitchesCategory', icon: Grid3X3 , route: '/admin/settings/pitches-category'},
  { name: 'Sport', icon: Zap , route: '/admin/settings/sport'},
  { name: 'DateType', icon: Calendar , route: '/admin/settings/date-type'},
  { name: 'TimeType', icon: Clock , route: '/admin/settings/time-type'},
  // { name: 'TeamGrade', icon: Award, route: '/admin/settings' }
]

</script>