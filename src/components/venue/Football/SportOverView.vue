<template>
  <div class="container mx-auto px-4 py-8 max-w-6xl">
    <h1 class="text-4xl font-bold mb-6">{{ selectedSport }}</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Overview -->
      <div class="border rounded-lg p-6">
        <h2 class="text-xl font-semibold mb-4">Overview</h2>
        <p class="text-gray-700">
          {{ sportData.description }}
        </p>
      </div>

      <!-- Availability -->
      <div class="border rounded-lg p-6">
        <h2 class="text-xl font-semibold mb-4">Availability</h2>
        <div class="flex items-center">
          <div class="bg-green-100 p-2 rounded-lg mr-4">
            <CalendarIcon class="h-6 w-6 text-green-500" />
          </div>
          <p>{{ sportData.availability }}</p>
        </div>
      </div>

      <!-- Rules -->
      <div class="border rounded-lg p-6">
        <h2 class="text-xl font-semibold mb-4">Rules</h2>
        <ul class="space-y-2">
          <li v-for="(rule, index) in sportData.rules" :key="index" class="flex items-start">
            <div class="h-2 w-2 rounded-full bg-blue-500 mt-2 mr-2"></div>
            <span>{{ rule }}</span>
          </li>
        </ul>
      </div>

      <!-- Share Venue -->
      <div class="border rounded-lg p-6">
    <h2 class="text-xl font-semibold mb-4">Share This Venue</h2>

    <!-- Copy Link Section -->
    <div class="flex">
      <input
        type="text"
        :value="shareLink"
        readonly
        class="border border-gray-300 px-4 py-2 rounded-l-md w-full focus:outline-none"
      />
      <button
        @click="copyToClipboard"
        class="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700"
      >
        Copy
      </button>
    </div>
    <p v-if="copied" class="text-green-600 text-sm mt-2">Link copied to clipboard!</p>
      </div>

      <!-- Amenities -->
      <!-- <div class="border rounded-lg p-6 col-span-1 md:col-span-2">
        <h2 class="text-xl font-semibold mb-4">Amenities</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div
            v-for="(item, index) in sportData.amenities"
            :key="index"
            class="flex items-center"
          >
            <div class="h-5 w-5 bg-green-500 rounded mr-2 flex items-center justify-center">
              <CheckIcon class="h-4 w-4 text-white" />
            </div>
            <span>{{ item }}</span>
          </div>
        </div>
      </div> -->
    </div>

    <!-- Gallery -->
    <div class="border rounded-lg p-6 mt-6">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold">Gallery</h2>
      </div>
      <div class="relative">
        <div class="flex overflow-x-auto space-x-4 pb-4">
          <div
            v-for="(image, index) in sportData.gallery"
            :key="index"
            class="flex-shrink-0"
          >
            <img
              :src="image"
              alt="Sport venue image"
              class="h-32 w-48 object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed,ref,watch } from 'vue'
import {
  Calendar as CalendarIcon,
  Check as CheckIcon,
  Facebook as FacebookIcon,
  MessageCircle as MessengerIcon,
  Instagram as InstagramIcon,
  Send as TelegramIcon,
  Twitter as TwitterIcon,
  Linkedin as LinkedinIcon
} from 'lucide-vue-next'

const props = defineProps({
  selectedSport: {
    type: String,
    required: true,
    default: 'Football Sport'
  }
})

const sportContentMap = {
  'Football Sport': {
    description: `Football is a global phenomenon, celebrated for its teamwork, strategy, and excitement. Whether it’s futsal or traditional 11-a-side, this sport brings communities together with passion and skill.`,
    availability: 'Check availability at your convenient time',
    rules: [
      'No pets, no seeds, no gum, no glass, no hitting or swinging outside of the cage.',
      'Please bring your booking receipt or digital confirmation on-site.'
    ],
    amenities: ['Parking', 'Drinking Water', 'Changing Room', 'Shower'],
    shareLinks: [
      { icon: FacebookIcon, color: 'text-blue-600', href: '#' },
      { icon: MessengerIcon, color: 'text-blue-500', href: '#' },
      { icon: InstagramIcon, color: 'text-orange-500', href: '#' },
      { icon: TelegramIcon, color: 'text-blue-400', href: '#' },
      { icon: TwitterIcon, color: 'text-blue-400', href: '#' },
      { icon: LinkedinIcon, color: 'text-blue-700', href: '#' }
    ],
    gallery: [
      'https://img.olympics.com/images/image/private/t_s_pog_staticContent_hero_sm_2x/f_auto/primary/ngdjbafv3twathukjbq2',
      'https://assets.publishing.service.gov.uk/media/6694e4cea3c2a28abb50cf1f/s960_football_gov.uk.jpg',
      'https://static.vecteezy.com/ti/photos-gratuite/t1/27829024-proche-en-haut-de-beaucoup-football-joueurs-coups-de-pied-une-football-sur-une-domaine-competition-scene-creee-avec-generatif-ai-la-technologie-photo.jpg',
      'https://t3.ftcdn.net/jpg/11/64/12/26/360_F_1164122602_RNi1R0GKfdTn7CSpnoZSw3E1OYbyZCOy.jpg',
      'https://www.sportsboom.com/_next/image?url=https%3A%2F%2Fassets.sportsboom.com%2FMicky_van_de_Ven_of_Tottenham_Hotspur_runs_with_the_ball_under_pressure_from_Roman_Dixon_25f5335bbc.jpg&w=3840&q=75'
    ]
  },
  'Volleyball': {
    description: `Volleyball is a fast-paced game of agility and teamwork. Whether you enjoy beach or indoor volleyball, it’s a sport that combines fun with fitness.`,
    availability: 'Open from 7am to 9pm daily',
    rules: [
      'Respect the court and other players.',
      'Bring clean indoor shoes.'
    ],
    amenities: ['Shower', 'Water Fountain', 'Locker Room'],
    shareLinks: [
      { icon: FacebookIcon, color: 'text-blue-600', href: '#' },
      { icon: InstagramIcon, color: 'text-orange-500', href: '#' }
    ],
    gallery: [
      'https://asianvolleyball.net/new/wp-content/uploads/2024/03/apuu1edrat0yc1lx4eoj.jpeg',
      'https://pbs.twimg.com/media/E7tZKeHVgAEoz5S.jpg',
      'https://img.olympics.com/images/image/private/t_s_pog_staticContent_hero_xl_2x/f_auto/primary/vrhuehbjvjdnbjpgwybh',
      'https://provolleyball.com/imgproxy/-bdN6Kb6lyApRaCLN1KrZ7XJ8PvzXWY9CdeZdIhxO0A/rs:fit:2000:0:0/g:ce/q:90/aHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL3Byb3ZvbGxleWJhbGwtcHJvZC91cGxvYWQvMjAyNC8wNC8xMS82ZWNkZGZiYy1iZmVjLTRlNzctODU3Ny1kYTg2MDk2ZjNkMmEuanBn.jpg',
      'https://www.mateflex.com/assets/Courts/volleyball.jpg'
    ]
  },
  'Table Tennis': {
    description: `Table Tennis, also known as Ping Pong, is a sport of quick reflexes, mental focus, and precision. Ideal for indoor play and enjoyed by all age groups.`,
    availability: 'Available for hourly booking',
    rules: [
      'Do not lean on the table.',
      'Balls and paddles must be returned after use.'
    ],
    amenities: ['AC Room', 'Waiting Area', 'Equipment Rental'],
    shareLinks: [
      { icon: FacebookIcon, color: 'text-blue-600', href: '#' },
      { icon: TwitterIcon, color: 'text-blue-400', href: '#' }
    ],
    gallery: [
      'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQXujoBAH_2Vumcvv9Lk9RKrN7_TxDoMlabb9guTEB9QRZsVmYvP-miVhaJWfcH0cWTMkd2YIR0tj4KVQwQvssNyB1Bl7BWH4gxArsQvKA',
      'https://t3.ftcdn.net/jpg/03/13/47/78/360_F_313477805_FjdtYLHA78oQBs4sYkPhVwNFDBotcCGi.jpg',
      'https://media.istockphoto.com/id/1417521713/photo/man-serving-ping-pong-ball.jpg?s=612x612&w=0&k=20&c=vGma8XB9cxDV29ndMM8ww5QVhJDJCCaGMnpzdMiABDM=',
      'https://cdn.gerflor.com/media/1642426083/1/31383.jpg',
      'https://conseils.casalsport.com/wp-content/uploads/2019/06/pratique-scolaire-tennis-de-table.jpg',
    ]
  }
}

const sportData = computed(() => {
  return sportContentMap[props.selectedSport] || {
    description: 'Sport details coming soon.',
    availability: 'Not available',
    rules: [],
    amenities: [],
    shareLinks: [],
    gallery: []
  }
})
// Reactive state
const copied = ref(false)

// Generate link dynamically
const shareLink = ref(
  `https://sportsphere.com/venue/${props.selectedSport.replace(/\s+/g, '-').toLowerCase()}`
)

// Recalculate link when sport changes
watch(() => props.selectedSport, (newSport) => {
  shareLink.value = `https://yourapp.com/venue/${newSport.replace(/\s+/g, '-').toLowerCase()}`
})

// Copy function
function copyToClipboard() {
  navigator.clipboard.writeText(shareLink.value).then(() => {
    copied.value = true
    setTimeout(() => (copied.value = false), 2000)
  })
}
</script>
