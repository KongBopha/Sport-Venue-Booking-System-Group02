<script setup>
import { ref } from 'vue';

import Navbar from '@/components/Navbar.vue';
import VenueHeroSection from '@/components/venue/VenueHeroSection.vue';
import SportButtoms from '@/components/venue/SportButtoms.vue';
import SportOverView from '@/components/venue/Football/SportOverView.vue';
import SportReview from '@/components/venue/Football/SportReview.vue';
import CourtRent from '@/components/venue/Football/CourtRent.vue';
import Footer from '@/components/Footer.vue';
const selectedSport = ref('Football Sport'); // default sport
</script>
  
<script>
export default {
  name: 'Venue',
  // Other options like methods, computed properties, lifecycle hooks, etc.
}
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <main class="flex-grow">
      <Navbar /> 
      <VenueHeroSection />

      <!-- Pass selectedSportId and listen for change event -->
      <SportButtoms
        :selectedSportId="selectedSportId"
        @sport-changed="handleSportChange"
      />

      <!-- Pass selectedSportId as prop -->
      <SportOverView :sportId="selectedSportId" />
      <SportReview :sportId="selectedSportId" />
        <CourtRent
          :selectedSportId="selectedSportId"
        />
      <router-view />
    </main>

    <!-- Footer sticks to bottom -->
    <Footer />
  </div>
</template>
