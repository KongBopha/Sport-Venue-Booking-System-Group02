<template>
  <footer class="bg-neutral-800 text-white">
    <!-- Call to Action Section -->
    <section class="text-center py-12 bg-neutral-900">
      <h1 class="text-4xl font-bold mb-4">Follow in the same footsteps</h1>
      <p class="mb-2 text-gray-300">as these amazing players who are currently living the dream.</p>
      <p class="mb-6 text-gray-300">Schedule a free introduction call.</p>

      <form @submit.prevent="subscribe" class="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-lg mx-auto">
        <input
          v-model="email"
          type="email"
          placeholder="Your Email Address"
          class="w-full sm:w-auto px-4 py-2 border border-gray-400 rounded bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
          required
        />
        <button
          type="submit"
          class="bg-teal-600 hover:bg-teal-500 px-6 py-2 text-sm font-bold uppercase rounded transition"
        >
          Subscribe
        </button>
      </form>
      <p v-if="successMessage" class="text-green-400 font-semibold mt-4">✔ Subscribed successfully!</p>
    </section>

    <!-- Divider -->
    <div class="border-t border-gray-600 my-8 mx-12"></div>

    <!-- Footer Main Info Grid -->
    <div class="grid md:grid-cols-3 gap-10 px-6 pb-12 text-gray-300 text-sm">
      <!-- Logo -->
      <div class="flex flex-col items-center md:items-start">
        <img src="@/assets/Navbar/logoName.png" alt="Sportsphere Logo" class="h-12 mb-4" />
        <p class="text-gray-400">Sportsphere — Booking made simple for your favorite sports.</p>
      </div>

      <!-- Contact Info -->
      <div class="flex flex-col space-y-3">
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" stroke-width="2"
            viewBox="0 0 24 24"><path d="M17.8 13.9A7 7 0 1 0 6.2 13.9L12 21l5.8-7.1Z"/></svg>
          <span>114 Toul Kork, Phnom Penh</span>
        </div>
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" stroke-width="2"
            viewBox="0 0 24 24"><path d="M3 5h18M3 12h18M3 19h18"/></svg>
          <span>+855 96 656 8116</span>
        </div>
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" stroke-width="2"
            viewBox="0 0 24 24"><path d="M4 4h16v16H4z"/></svg>
          <span>sportsphere@gmail.com</span>
        </div>
      </div>

      <!-- Quick Links -->
      <div class="flex flex-col items-center md:items-start space-y-2">
        <a href="#" class="hover:underline text-blue-400">Home</a>
        <a href="#" class="hover:underline text-blue-400">Book a Venue</a>
        <a href="#" class="hover:underline text-blue-400">Contact Us</a>
        <a href="#" class="hover:underline text-blue-400">FAQ</a>
      </div>
    </div>

    <!-- Bottom Copyright -->
    <div class="bg-black bg-opacity-30 text-center py-4 text-xs text-gray-400">
      &copy; {{ new Date().getFullYear() }} Sportsphere. All rights reserved.
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {
      email: '',
      successMessage: false,
    }
  },
  methods: {
    subscribe() {
      if (this.email.trim()) {
        this.successMessage = true
        setTimeout(() => (this.successMessage = false), 4000)
        this.email = ''
      }
    }
  }
}
</script>

<style scoped>
footer input::placeholder {
  color: #ccc;
}
</style>
