<script setup>
import { ref } from 'vue';
import Navbar from '@/components/Navbar.vue';
import VenueHeroSection from '@/components/venue/VenueHeroSection.vue';
import SportButtoms from '@/components/venue/SportButtoms.vue';
import SportOverView from '@/components/venue/Football/SportOverView.vue';
import SportReview from '@/components/venue/Football/SportReview.vue';
import CourtRent from '@/components/venue/Football/CourtRent.vue';
import Footer from '@/components/Footer.vue';

// Default sport
const selectedSportId = ref(1);
const selectedSportLabel = ref('Football Sport');

// Event handler from child
function handleSportChange({ id, label }) {
  selectedSportId.value = id;
  selectedSportLabel.value = label;
}
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <main class="flex-grow">
      <Navbar />
      <VenueHeroSection />

      <SportButtoms
        :selectedSportId="selectedSportId"
        @sport-changed="handleSportChange"
      />
      <CourtRent :selectedSportId="selectedSportId" />
      <SportOverView :selectedSport="selectedSportLabel" />
      <SportReview :sportId="selectedSportId" />

    </main>
    <Footer />
  </div>
</template>
