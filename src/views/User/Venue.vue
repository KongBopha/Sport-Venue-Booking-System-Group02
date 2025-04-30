<script setup>
import Navbar from '@/components/Navbar.vue';
import VenueHeroSection from '@/components/venue/VenueHeroSection.vue';
import SportButtoms from '@/components/venue/SportButtoms.vue';
import SportOverView from '@/components/venue/SportOverView.vue';
import SportReview from '@/components/venue/SportReview.vue';

</script>
<script>
export default {
  name: 'Venue',
  // Other options like methods, computed properties, lifecycle hooks, etc.
}
</script>
<template>
  <main>
    <Navbar /> 
    <VenueHeroSection /> 
    <SportButtoms /> 
    <SportOverView /> 
    <SportReview /> 
  </main>
</template>
