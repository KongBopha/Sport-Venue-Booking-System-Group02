<script setup>
import { ref } from 'vue';

import Navbar from '@/components/Navbar.vue';
import VenueHeroSection from '@/components/venue/VenueHeroSection.vue';
import SportButtoms from '@/components/venue/SportButtoms.vue';
import SportOverView from '@/components/venue/SportOverView.vue';
import SportReview from '@/components/venue/SportReview.vue';
import CourtRent from '@/components/venue/CourtRent.vue';
import VenueFooter from '@/components/venue/VenueFooter.vue';

const selectedSportId = ref(1);  // Default sport id to Football

// Handler when a sport button is clicked, updates the sport id
function handleSportChange(sportId) {
  selectedSportId.value = sportId;
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
      <CourtRent />
    </main>
    <VenueFooter />
  </div>
</template>
