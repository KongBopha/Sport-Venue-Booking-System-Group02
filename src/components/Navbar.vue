<template>
  <nav class="fixed top-0 left-0 w-full bg-white shadow-md px-8 py-4 z-50">
    <div class="max-w-7xl mx-auto flex justify-between items-center">
      <!-- Logo / Brand -->
      <div class="text-2xl font-bold text-blue-600 cursor-pointer" @click="navigateTo('/user/home')">
        <img src="@/assets/Navbar/logoName.png" alt="Logo" class="h-8" />
      </div>

      <!-- Navigation Links -->
      <ul class="flex gap-6">
        <li>
          <router-link
            to="/"
            class="hover:text-blue-500"
            :class="{ 'active-link': isActive('/user/home') }"
          >
            <i class="bi bi-house-door-fill"></i> Home
          </router-link>
        </li>
        <li>
          <router-link
            to="/user/booking"
            class="hover:text-blue-500"
            :class="{ 'active-link': isActive('/user/booking') }"
          >
            <i class="bi bi-calendar-check"></i> Booking
          </router-link>
        </li>
        <li>
          <router-link
            to="/user/venue"
            class="hover:text-blue-500"
            :class="{ 'active-link': isActive('/user/venue') }"
          >
            <i class="bi bi-building"></i> Venue
          </router-link>
        </li>
        <li>
          <router-link
            to="/user/about"
            class="hover:text-blue-500"
            :class="{ 'active-link': isActive('/user/about') }"
          >
            <i class="bi bi-info-circle"></i> About Us
          </router-link>
        </li>
        <li>
          <router-link
            to="/user/contact"
            class="hover:text-blue-500"
            :class="{ 'active-link': isActive('/user/contact') }"
          >
            <i class="bi bi-envelope"></i> Contact Us
          </router-link>
        </li>
      </ul>

      <!-- Login Button -->
      <ul
        class="auth-links flex space-x-6 text-lg font-semibold hidden md:flex"
        :class="{ 'flex flex-col space-y-4 absolute top-16 left-0 bg-black w-full text-center py-4 md:static md:flex-row md:space-y-0 md:space-x-6': isMenuOpen }"
      >
        <li v-if="isAuthenticated">
          <router-link
            to="/account/profile"
            class="nav-link"
            :class="{ 'active-link': isActive('/account/profile') }"
          >
            <i class="bi bi-person-circle"></i> Profile
          </router-link>
        </li>
        <li v-if="!isAuthenticated">
          <router-link
            to="/auth/login"
            class="nav-link"
            :class="{ 'active-link': isActive('/auth/login') }"
          >
            Login
          </router-link>
        </li>
        <li v-if="!isAuthenticated">
          <router-link
            to="/auth/signup"
            class="nav-link"
            :class="{ 'active-link': isActive('/auth/signup') }"
          >
            Sign Up
          </router-link>
        </li>
        <li v-if="isAuthenticated">
          <a
            href="#"
            @click.prevent="logout"
            class="nav-link"
          >
            Logout
          </a>
        </li>
      </ul>

    </div>
  </nav>
</template>

<script >
import { useRouter } from 'vue-router'
const router = useRouter()

const navigateTo = (path) => {
  router.push(path)
}

export default {
  name: 'Navbar',
  data() {
    return {
      isAuthenticated: !!localStorage.getItem('Token'),
      isAdmin: localStorage.getItem('role') === 'Admin',
    };
  },
  methods: {
    navigateAndReload(route) {
      // Navigate to the specified route
      this.$router.push(route).then(() => {
        // Reload the page after navigation is complete
        window.location.reload();
      });
    },
    isActive(route) {
      return this.$route.path === route;
    },
    logout() {
      this.isAuthenticated = false;
      localStorage.clear();
      this.$router.push('/auth/login');
    },
    isActive(route) {
      return this.$route.path === route;
    },
  },

}
</script>
<style scoped>
/* Active link styling */
.active-link {
  color: #0c5dc7;
  font-weight: bold;
  border-bottom: 2px solid #0c5dc7; /* Add a bottom border for the active link */
}

</style>