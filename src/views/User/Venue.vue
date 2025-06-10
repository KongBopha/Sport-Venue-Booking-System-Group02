<script setup>
import Navbar from '@/components/Navbar.vue';
import VenueHeroSection from '@/components/venue/VenueHeroSection.vue';
import SportButtoms from '@/components/venue/SportButtoms.vue';
import SportOverView from '@/components/venue/SportOverView.vue';
import SportReview from '@/components/venue/SportReview.vue';
import CourtRent from '@/components/venue/CourtRent.vue';
import VenueFooter from '@/components/venue/VenueFooter.vue';

</script>
  
<script>
export default {
  name: 'Venue',
  // Other options like methods, computed properties, lifecycle hooks, etc.
}
</script>
<template>
  <div class="flex flex-col min-h-screen">
    <!-- Main content -->
    <main class="flex-grow">
      <Navbar /> 
      <VenueHeroSection /> 
      <!-- Emit selected sport -->
      <SportButtoms @sport-selected="(sport) => selectedSport = sport" />
      <!-- Pass it to overview -->
      <SportOverView :selectedSport="selectedSport" />
      <SportReview /> 
      <CourtRent /> 

    </main>

    <!-- Footer sticks to bottom -->
    <Footer />
  </div>
</template>

