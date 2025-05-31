<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 relative">
    <!-- Loading Overlay -->
    <div
      v-if="loading"
      class="fixed inset-0 z-10 bg-gray-800 bg-opacity-30 flex flex-col items-center justify-center"
    >
      <svg
        class="animate-spin h-10 w-10 text-blue-600 mb-2"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        />
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        />
      </svg>
      <div class="text-lg text-blue-700 font-bold">Signing up...</div>
    </div>
    <!-- Main Signup Form -->
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md z-0">
      <h1 class="text-3xl font-bold text-center mb-8">Sign Up</h1>
      <form @submit.prevent="signup">
        <div class="mb-4">
          <label for="name" class="block text-gray-700 font-bold mb-2">Name</label>
          <input type="text" v-model="name" id="name" class="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" required :disabled="loading">
        </div>
        <div class="mb-4">
          <label for="email" class="block text-gray-700 font-bold mb-2">Email</label>
          <input type="email" v-model="email" id="email" class="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" required :disabled="loading">
        </div>
        <div class="mb-4">
          <label for="phone" class="block text-gray-700 font-bold mb-2">Phone</label>
          <input type="text" v-model="phone" id="phone" class="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" required :disabled="loading">
        </div>
        <div class="mb-6">
          <label for="password" class="block text-gray-700 font-bold mb-2">Password</label>
          <input type="password" v-model="password" id="password" class="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" required :disabled="loading">
        </div>
        <div class="mb-6">
          <label for="confirmPassword" class="block text-gray-700 font-bold mb-2">Confirm Password</label>
          <input type="password" v-model="confirmPassword" id="confirmPassword" class="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" required :disabled="loading">
        </div>
        <button type="submit"
                class="w-full bg-stone-500 text-white font-bold py-3 rounded hover:bg-stone-600 transition duration-300 flex items-center justify-center"
                :disabled="loading">
          <svg v-if="loading" class="animate-spin h-5 w-5 mr-2 text-white"
               xmlns="http://www.w3.org/2000/svg" fill="none"
               viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10"
                    stroke="currentColor" stroke-width="4"/>
            <path class="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
          </svg>
          <span v-if="loading">Signing up...</span>
          <span v-else>Sign Up</span>
        </button>
      </form>
      <div class="mt-6 text-center">
        <p class="text-gray-600">
          Already have an account?
          <button
            type="button"
            class="text-blue-500 hover:underline ml-1 bg-transparent border-none cursor-pointer"
            @click="goToLogin"
          >
            Log in
          </button>
        </p>
      </div>

    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      apiUrl: import.meta.env.VITE_API_BASE_URL,
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      loading: false,
    }
  },
  methods: {
     goToLogin() {
        this.$router.push('/')
      },
    validatePasswordMatch() {
      return this.password === this.confirmPassword;
    },
    signup() {
      // Validate password match
      if (!this.validatePasswordMatch()) {
        alert('Passwords do not match.');
        return;
      }
      this.loading = true;
      // Prepare the payload
      const payload = {
        name: this.name,
        email: this.email,
        phone: this.phone,
        password: this.password
      };

      // Send the signup request
      axios.post(this.apiUrl + 'auth/sign-up', payload)
        .then(response => {
          const token = response.data.access_token;
          const role = response.data.role;
          const user = response.data.user;

          // Store token, role, and user in localStorage
          localStorage.setItem('Token', token);
          localStorage.setItem('role', role);
          localStorage.setItem('user', JSON.stringify(user));
          this.$router.push('/user/home').then(() => {
            window.location.reload();
          });
        })
        .catch(error => {
          console.error('Signup failed:', error.response?.data?.message || error.message);
          alert('Signup failed: ' + (error.response?.data?.message || 'Please try again.'));
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
}
</script>
