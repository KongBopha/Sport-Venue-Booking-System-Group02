<script setup>
import Navbar from '@/components/Navbar.vue' 
import HeroSection from '@/components/HeroSection.vue'
import SportType from '@/components/SportType.vue'
import SportService from '@/components/SportService.vue'
import SpecialCost from '@/components/Bookingstep.vue'
import Equipment from '@/components/Equipment.vue';
import Carousel from '@/components/Carousel.vue'; 
import Footer from '@/components/Footer.vue';
import Excellentplan from '@/components/Excellentplan.vue';
import Bookingstep from '@/components/Bookingstep.vue'
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
      Bookingstep
  },
}
</script>
<template>
  <main>
    <Navbar /> 
    <HeroSection />
    <SportType />
    <SportService />
    <Bookingstep/>

    <Equipment />
    <Carousel />
    <!-- <Excellentplan /> -->
    <!-- <Usertestimonial /> -->
    
    <Footer />
  </main>
</template>
