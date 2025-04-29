<script setup>
import Navbar from '@/components/Navbar.vue' 
import HeroSection from '@/components/HeroSection.vue'
import SportType from '@/components/SportType.vue'
import SportService from '@/components/SportService.vue'
import SpecialCost from '@/components/SpecialCost.vue'
</script>
<script>
export default {
  name: 'Home',
  // Other options like methods, computed properties, lifecycle hooks, etc.
}
</script>
<template>
  <main>
    <Navbar /> 
    <HeroSection />
    <SportType />
    <SportService />
    <SpecialCost />
    <div class="text-center mt-24 text-2xl">home page</div>
  </main>
</template>
