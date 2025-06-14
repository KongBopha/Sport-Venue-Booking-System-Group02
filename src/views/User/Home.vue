<script setup>
import Navbar from '@/components/Navbar.vue' 
import HeroSection from '@/components/HeroSection.vue'
import SportType from '@/components/SportType.vue'
import SportService from '@/components/SportService.vue'
import SpecialCost from '@/components/SpecialCost.vue'
import Equipment from '@/components/Equipment.vue';
import Carousel from '@/components/Carousel.vue'; 
import Footer from '@/components/Footer.vue';
import Excellentplan from '@/components/Excellentplan.vue';
</script>
<script>
export default {
  name: 'Home',
  components: {
      Navbar,
      Equipment,
      Carousel,
      Footer,
      Excellentplan,
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
    <Excellentplan />
    <Usertestimonial />
    
    <Footer />
  </main>
</template>
