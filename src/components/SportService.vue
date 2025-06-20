<template>
  <section class="py-16 bg-gray-50">
    <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Our Premium <span class="text-teal-600">Sports Facilities</span>
        </h2>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          Professional-grade venues designed for athletes of all levels. Book by the hour with equipment included.
        </p>
      </div>

      <!-- Services Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div
          v-for="(sport, index) in sportServices"
          :key="index"
          class="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
        >
          <div class="relative overflow-hidden">
            <img 
              :src="sport.image" 
              :alt="sport.title"
              class="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div class="absolute top-4 right-4">
              <span class="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                Available Now
              </span>
            </div>
          </div>
          
          <div class="p-6">
            <h3 class="text-xl font-bold text-gray-900 mb-3">{{ sport.title }}</h3>
            <p class="text-gray-600 mb-4">{{ sport.description }}</p>
            
            <div class="flex items-center justify-between mb-4">
              <div class="text-sm text-gray-500">
                <div class="flex items-center mb-1">
                  <svg class="w-4 h-4 mr-2 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                  </svg>
                  {{ sport.capacity }}
                </div>
                <div class="flex items-center">
                  <svg class="w-4 h-4 mr-2 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"></path>
                  </svg>
                  {{ sport.duration }}
                </div>
              </div>
              <div class="text-right">
                <div class="text-2xl font-bold text-teal-600">${{ sport.price }}</div>
                <div class="text-sm text-gray-500">per hour</div>
              </div>
            </div>
            
            <button class="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 rounded-lg transition-colors duration-200">
              Book This Venue
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'SportService',
  
  data() {
    return {
      sportServices: [
        { 
          image: '/src/assets/SportService/football.png', 
          title: 'Football Field',
          description: 'Full-size professional football pitch with premium grass surface, floodlights, and changing rooms.',
          capacity: 'Up to 22 players',
          duration: 'Min 2 hours',
          price: 75
        },
        { 
          image: '/src/assets/SportService/volleyball.png', 
          title: 'Volleyball Court',
          description: 'Indoor and outdoor courts with regulation nets, professional flooring, and equipment storage.',
          capacity: 'Up to 12 players',
          duration: 'Min 1 hour',
          price: 45
        },
        { 
          image: '/src/assets/SportService/tabletennis.png', 
          title: 'Table Tennis Hall',
          description: 'Climate-controlled facility with tournament-quality tables, paddles, and balls included.',
          capacity: 'Up to 8 players',
          duration: 'Min 30 minutes',
          price: 25
        }
      ]
    };
    
  }
};
</script>