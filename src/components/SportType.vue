<template>
  <div class="px-6 md:px-12 py-12">
    <!-- Title -->
    <h2 class="text-3xl text-center font-bold text-teal-600 mb-10">About Sports</h2>

    <!-- Sports Cards -->
    <div class="flex flex-wrap justify-center gap-x-20 gap-y-14">
      <SportCard
        :imgSrc="footballImg"
        altText="Football"
        label="Football"
        description="Football is a team sport played between two teams of eleven players with a spherical ball."
      />
      <SportCard
        :imgSrc="volleyballImg"
        altText="Volleyball"
        label="Volleyball"
        description="Volleyball is a team sport in which two teams of six players are separated by a net."
      />
      <SportCard
        :imgSrc="tabletennisImg"
        altText="Table Tennis"
        label="Table Tennis"
        description="Table tennis is a sport where two or four players hit a lightweight ball back and forth across a table."
      />
    </div>
  </div>
</template>

<script setup>
import SportCard from './SportCard.vue'
import footballImg from '@/assets/SportTypes/football.png'
import volleyballImg from '@/assets/SportTypes/volleyball.png'
import tabletennisImg from '@/assets/SportTypes/tabletennis.png'
</script>
