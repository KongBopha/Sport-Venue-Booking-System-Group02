<script setup>
import Navbar from '@/components/Navbar.vue' 
import AboutIntro from '@/components/Aboutus/AboutIntro.vue'
import OurStory from '@/components/Aboutus/OurStory.vue'
import Facilities from '@/components/Aboutus/Facilities.vue'
import OurTeam from '@/components/Aboutus/OurTeam.vue'
import CommunityInvolvement from '@/components/Aboutus/CommunityInvolvement.vue'
import FaqSection from '@/components/Aboutus/FaqSection.vue'
import Footer from '@/components/Footer.vue'
</script>

<template>
  <main>
    <Navbar /> 
    <AboutIntro />
    <OurStory />
    <Facilities />
    <OurTeam />
    <CommunityInvolvement />
    <FaqSection />
    <Footer/>

  </main>
</template>
