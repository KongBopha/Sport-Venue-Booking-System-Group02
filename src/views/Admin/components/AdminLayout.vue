<template>
  <div class="max-h-screen min-h-screen bg-gray-50 flex">
    <!-- Sidebar -->
    <div class="w-64 bg-slate-800 text-white flex flex-col shadow-xl">
      <!-- Sidebar Header -->
      <div class="p-6 border-b border-slate-700">
        <h2 class="text-xl font-bold text-white">Admin Panel</h2>
        <p class="text-slate-300 text-sm mt-1">Sport Venue System</p>
      </div>
      
      <!-- Navigation Menu -->
      <nav class="flex-1 p-4">
        <ul class="space-y-1">
          <li v-for="item in navigationItems" :key="item.name">
            <router-link
              :to="item.route"
              :class="[
                'w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 transition-all duration-200',
                $route.path.startsWith(item.route)
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'hover:bg-slate-700 text-slate-300 hover:text-white'
              ]"
            >
              <component :is="item.icon" class="w-5 h-5" />
              <span class="font-medium">{{ item.name }}</span>
            </router-link>
          </li>
        </ul>
      </nav>
    </div>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Header -->
      <header class="bg-white shadow-sm border-b border-gray-200 px-8 py-6 flex-shrink-0">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">{{ getPageTitle($route.path) }}</h1>
            <p class="text-gray-600 mt-1">{{ getPageDescription($route.path) }}</p>
          </div>
          <div class="flex items-center space-x-4">
            <!-- <button class="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
              <Bell class="w-6 h-6" />
            </button> -->
            <button @click="navigateTo('/admin/settings')" class="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
              <Settings class="w-6 h-6" />
            </button>
            <div class="relative inline-block">
              <!-- Image Trigger -->
              <img 
                :src="fileUrl + user.avatar" 
                class="w-8 h-8 rounded-full cursor-pointer"
                @click="toggleDropdown"
                alt="User avatar"
              />

              <!-- Dropdown Menu -->
              <transition name="fade">
                <div v-show="showDropdown" class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                  <div class="py-1">
                    <!-- Menu Item 1 -->
                    <button
                      @click="handleProfile"
                      class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      View Profile
                    </button>

                    <button
                      @click="navigateTo('/')"
                      class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      goto User Page
                    </button>
                    
                    <!-- Menu Item 2 -->
                    <button
                      @click="handleLogout"
                      class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </transition>

              <!-- Click outside handler -->
              <div v-if="showDropdown" @click="closeDropdown" class="fixed inset-0 h-full w-full bg-transparent z-9"></div>
            </div>
          </div>
        </div>
      </header>

      <!-- Scrollable Main Content -->
      <main class="flex-1 p-8 overflow-y-auto">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
import { Home, CreditCard, Calendar, ShoppingCart, Package, Coffee, Users, Building, Shield, Settings, ChevronRight, Bell } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

export default {
  name: 'NavigationComponent',
  components: {
    Home, CreditCard, Calendar, ShoppingCart, Package, Coffee, Users, 
    Building, Shield, Settings, ChevronRight, Bell
  },
  data() {
    return {
      showDropdown: false,
      fileUrl: import.meta.env.VITE_FILE_BASE_URL,
      user: JSON.parse(localStorage.getItem('user')),
      navigationItems: [
        { name: 'Dashboard', icon: Home, route: '/admin/dashboard' },
        { name: 'Payment', icon: CreditCard, route: '/admin/payment' },
        { name: 'Booking', icon: Calendar, route: '/admin/booking' },
        { name: 'Equipment Sale', icon: ShoppingCart, route: '/admin/equipment-sale' },
        { name: 'Equipment', icon: Package, route: '/admin/equipments' },
        { name: 'Drink', icon: Coffee, route: '/admin/drink' },
        { name: 'Users', icon: Users, route: '/admin/users' },
        { name: 'Sponsor', icon: Building, route: '/admin/sponsor' },
        { name: 'Settings', icon: Settings, route: '/admin/settings' }
      ]
    }
  },
  methods: {
    getPageTitle(path, fallback = 'Dashboard') {
      const matchedItem = [...this.navigationItems]
        .sort((a, b) => b.route.length - a.route.length)
        .find(item => path.startsWith(item.route))

      return matchedItem ? matchedItem.name : fallback
    },

    getPageDescription(path) {
      const descriptions = {
        '/admin/dashboard': 'Overview of your sport venue management system',
        '/admin/payment': 'Manage payments and financial transactions',
        '/admin/booking': 'Handle venue bookings and reservations',
        '/admin/equipment-sale': 'Track equipment sales and inventory',
        '/admin/equipments': 'Manage sports equipment and rentals',
        '/admin/drink': 'Beverage inventory and sales management',
        '/admin/users': 'User accounts and member management',
        '/admin/sponsor': 'Sponsor relationships and partnerships',
        '/admin/settings': 'System configuration and preferences'
      }

      for (const [route, description] of Object.entries(descriptions).sort(
        ([a], [b]) => b.length - a.length
      )) {
        if (path.startsWith(route)) {
          return description
        }
      }

      return ''
    },

    navigateTo(path) {
      this.$router.push(path)
    },
    toggleDropdown() {
      this.showDropdown = !this.showDropdown
    },
    closeDropdown() {
      this.showDropdown = false
    },
    handleProfile() {
      // Handle profile action
       this.$router.push('/account/profile');
    },
    handleLogout() {
      this.isAuthenticated = false;
      localStorage.clear();
      this.$router.push('/auth/login');
    }
  }
}
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.15s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>