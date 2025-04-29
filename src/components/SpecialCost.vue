<template>
  <div class="px-12 py-12 text-start">
    <h2 class="text-4xl font-bold text-teal-600 mb-10 ">Special Cost</h2>
    <div class="flex flex-wrap justify-center gap-x-20 gap-y-14">
      <SpecialCostCard
        v-for="(item, index) in specialCosts"
        :key="index"
        :image="item.image"
        :altText="item.alt"
      />
    </div>
  </div>
</template>

<script setup>
import SpecialCostCard from './SpecialCostCard.vue'

// Import images
import footballImg from '@/assets/SpecialCost/football.png'
import volleyballImg from '@/assets/SpecialCost/volleyball.png'
import tableTennisImg from '@/assets/SpecialCost/tabletennis.png'

const specialCosts = [
  { image: footballImg, alt: 'Football' },
  { image: volleyballImg, alt: 'Volleyball' },
  { image: tableTennisImg, alt: 'Table Tennis' }
]
</script>

<style scoped>
</style>
