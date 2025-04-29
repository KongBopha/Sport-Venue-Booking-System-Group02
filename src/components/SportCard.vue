<template>
  <div class="flip-card" @click="isFlipped = !isFlipped">
    <div class="flip-card-inner" :class="{ flipped: isFlipped }">
      
      <!-- Front Side -->
      <div class="flip-card-front">
        <img :src="imgSrc" :alt="altText" class="h-32 sm:h-40 mb-4 border-teal-400 object-contain" />
        <span class="text-lg font-semibold text-gray-800">{{ label }}</span>
      </div>

      <!-- Back Side -->
      <div class="flip-card-back">
        <p class="text-base text-gray-100 px-4">{{ description }}</p>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  imgSrc: String,
  altText: String,
  label: String,
  description: String, 
})

const isFlipped = ref(false)
</script>

<style scoped>
.flip-card {
  width: 18rem;
  height: 18rem;
  perspective: 1000px;
  cursor: pointer;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transform-style: preserve-3d;
  transition: transform 0.8s;
}

.flip-card-inner.flipped {
  transform: rotateY(180deg);
}

.flip-card-front,
.flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.flip-card-front {
  background: white;
}

.flip-card-back {
  background: #009688; /* Teal background */
  transform: rotateY(180deg);
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
