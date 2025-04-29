<script setup>
import Navbar from '@/components/Navbar.vue' 
import HeroSection from '@/components/HeroSection.vue'
import SportType from '@/components/SportType.vue'
import SportService from '@/components/SportService.vue'
import SpecialCost from '@/components/SpecialCost.vue'
import Equipment from '@/components/Equipment.vue';
import Carousel from '@/components/Carousel.vue'; // Ensure the path matches your project structure

</script>
<script>
export default {
  name: 'Home',
  components: {
      Navbar,
      Equipment,
      Carousel,
  },
}
</script>
<template>
  <main>
    <Navbar /> 
    <HeroSection />
    <SportType />
    <SportService />
    <SpecialCost />
    <Equipment />
    <Carousel /> 
  </main>
</template>
