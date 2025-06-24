<template>
    <div class="bg-white min-h-screen py-12">
        <!-- Header Section -->
        <div class="container mx-auto px-6">
            <div class="text-center mb-12">
                <h1 class="text-5xl font-bold text-gray-800 mb-4 flex items-center justify-center">
                    <span class="mr-4 text-6xl">⚽</span>
                    Sports Equipment
                </h1>
                <p class="text-xl text-gray-600 max-w-2xl mx-auto">
                    Discover our premium collection of sports equipment designed for athletes of all levels
                </p>
                <div class="w-24 h-1 bg-gradient-to-r from-teal-500 to-teal-600 mx-auto mt-6 rounded-full"></div>
            </div>

            <!-- Equipment Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                <div 
                    v-for="(equipment, index) in equipments" 
                    :key="index"
                    class="group"
                >
                    <div class="bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden">
                        <!-- Image Container -->
                        <div class="relative overflow-hidden rounded-t-2xl">
                            <a href="#" class="block">
                                <img 
                                    class="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-110" 
                                    :src="fileUrl + equipment.src" 
                                    :alt="equipment.alt" 
                                />
                                <!-- Overlay on hover -->
                                <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                
                                <!-- Sport Icon Overlay -->
                                <div class="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full p-3 transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                    <span class="text-2xl">
                                        {{ equipment.alt === 'Football' ? '🏈' : equipment.alt === 'Volleyball' ? '🏐' : '🏓' }}
                                    </span>
                                </div>

                                <!-- Quick View Badge -->
                                <div class="absolute top-4 right-4 bg-teal-600 text-white px-3 py-1 rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                                    Quick View
                                </div>
                            </a>
                        </div>

                        <!-- Content -->
                        <div class="p-8">
                            <a href="#" class="block mb-4">
                                <h3 class="text-2xl font-bold text-center text-gray-900 group-hover:text-teal-600 transition-colors duration-300">
                                    {{ equipment.title }}
                                </h3>
                            </a>
                            
                            <!-- Description -->
                            <p class="text-gray-600 leading-relaxed mb-6 line-clamp-3">
                                {{ equipment.description }}
                            </p>

                            <!-- Features List -->
                            <div class="mb-6">
                                <div class="flex items-center text-sm text-gray-500 mb-2">
                                    <svg class="w-4 h-4 mr-2 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                                    </svg>
                                    Professional Grade Quality
                                </div>
                                <div class="flex items-center text-sm text-gray-500 mb-2">
                                    <svg class="w-4 h-4 mr-2 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                                    </svg>
                                    Durable Materials
                                </div>
                                <div class="flex items-center text-sm text-gray-500">
                                    <svg class="w-4 h-4 mr-2 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                                    </svg>
                                    All Skill Levels
                                </div>
                            </div>

                            <!-- Action Button -->
                            <div class="flex justify-center">
                                <button 
                                    @click="scrollToCarousel" 
                                    class="group/btn inline-flex items-center justify-center px-8 py-3 text-sm font-semibold text-white bg-gradient-to-r from-teal-600 to-teal-700 rounded-xl hover:from-teal-700 hover:to-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                                >
                                    Explore Equipment
                                    <svg class="w-4 h-4 ml-2 transition-transform duration-300 group-hover/btn:translate-x-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <!-- Bottom Border Accent -->
                        <div class="h-1 bg-gradient-to-r from-teal-500 to-teal-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                    </div>
                </div>
            </div>


        </div>
    </div>
</template>

<script>
import football from '../assets/images/images.jpeg';
import volleyball from '../assets/images/volleyball.jpeg';
import tableTennis from '../assets/images/tennis.jpg';
    export default {
        name: 'Equipment',
        data() {
            return {
                fileUrl: import.meta.env.VITE_FILE_BASE_URL,
                equipments:[
                    {
                        src: football,
                        alt: "Football",
                        description: "Discover premium football equipment designed for maximum performance and durability. From professional-grade balls to training accessories.",
                        title: "Football Equipment"
                    },
                    {
                        src: volleyball,
                        alt: "Volleyball",
                        title: "Volleyball Equipment",
                        description: "Complete volleyball gear collection featuring official tournament balls, nets, and training equipment for indoor and outdoor play."
                    },
                    {
                        src: tableTennis,
                        alt: "Table Tennis",
                        title: "Table Tennis Equipment",
                        description: "Professional table tennis equipment including tournament-approved paddles, balls, and tables for competitive and recreational play."
                    }
                ]
            };
        },
        methods: {
            scrollToCarousel() {
                // Scroll to the Carousel component
                const carouselElement = document.querySelector('[data-carousel]') || 
                                      document.querySelector('.carousel') ||
                                      document.querySelector('[id*="carousel"]') ||
                                      document.querySelector('[class*="carousel"]');
                
                if (carouselElement) {
                    carouselElement.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                } else {
                    // Fallback: scroll down by viewport height
                    window.scrollBy({
                        top: window.innerHeight,
                        behavior: 'smooth'
                    });
                }
            }
        }
    };
</script>