<template>
  <div class="px-6 md:px-12 py-12 text-start">
    <!-- Title -->
    <h2 class="text-4xl font-bold text-teal-600 mb-10">Sport Service</h2>

    <!-- Services Cards -->
    <div class="flex flex-wrap justify-center gap-x-20 gap-y-14">
      <SportServiceCard
        v-for="(sport, index) in sportServices"
        :key="index"
        :image="sport.image"
        :title="sport.title"
      />
    </div>
  </div>
</template>

<script setup>
import SportServiceCard from '@/components/SportServiceCard.vue'

// Images
import footballImg from '@/assets/SportService/football.png'
import volleyballImg from '@/assets/SportService/volleyball.png'
import tableTennisImg from '@/assets/SportService/tabletennis.png'

const sportServices = [
  { image: footballImg, title: 'Football Field' },
  { image: volleyballImg, title: 'Volleyball Court' },
  { image: tableTennisImg, title: 'Table Tennis' }
]
</script>

<style scoped>
</style>
