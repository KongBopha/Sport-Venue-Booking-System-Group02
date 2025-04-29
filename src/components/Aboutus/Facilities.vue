<template>
  <section class="px-6 md:px-12 py-12 text-center">
    <h2 class="text-3xl font-bold text-teal-600 mb-10">Facilities and Services</h2>
    <div class="flex flex-wrap justify-center gap-12 mb-8">
      <FacilityCard :imgSrc="footballImg" altText="Football" label="Football" />
      <FacilityCard :imgSrc="volleyballImg" altText="Volleyball" label="Volleyball" />
      <FacilityCard :imgSrc="tabletennisImg" altText="Table Tennis" label="Table Tennis" />
    </div>
    <ul class="list-disc list-inside text-gray-600 max-w-2xl mx-auto text-left">
      <li>Flexible Booking Options: Reserve your spot anytime, anywhere.</li>
      <li>Event Hosting Support for tournaments and community events.</li>
      <li>Equipment store: Get the best quality sports equipment.</li>
    </ul>
  </section>
</template>

<script setup>
import FacilityCard from './FacilityCard.vue'

// ✅ Import images correctly
import footballImg from '@/assets/Aboutus/football.png'
import volleyballImg from '@/assets/Aboutus/volleyball.png'
import tabletennisImg from '@/assets/Aboutus/tabletennis.png'
</script>
