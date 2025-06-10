<template>
    <div>
        <div class="text-3xl ml-10 my-10">Football</div>
        <div class="carousel rounded-box w-[118rem]">
            <div class="carousel-items flex overflow-x-auto">
                <div class="carousel-item ml-[2rem] flex flex-column" v-for="(football, index) in CarouselFootball" :key="index">
                    <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                        <a href="#">
                            <img class="h-[13rem] w-full p-8 rounded-t-lg" :src="football.src" :alt="football.alt" />
                        </a>
                         <div class="px-5 pb-5">
                            <span class="text-3xl font-bold text-gray-900 dark:text-white">${{football.price}}</span>
                            <a href="#">
                                <h5 class="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">{{ football.description }}</h5>
                            </a>                      
                            <div class="flex items-center justify-between">
                                <div class="flex items-center mt-2.5 mb-5">
                                    
                                </div>
                                <a href="#" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div>
        <div class="text-3xl ml-10 my-10">Volleyball</div>
        <div class="carousel rounded-box w-[118rem]">
            <div class="carousel-items flex overflow-x-auto">
                <div class="carousel-item ml-[2rem] flex flex-column" v-for="(volleyball, index) in CarouselVolleyball" :key="index">
                    <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                        <a href="#">
                            <img class="h-[13rem] w-full p-8 rounded-t-lg" :src="volleyball.src" :alt="volleyball.alt" />
                        </a>
                        <div class="px-5 pb-5">
                            <span class="text-3xl font-bold text-gray-900 dark:text-white">${{volleyball.price}}</span>
                            <a href="#">
                                <h5 class="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">{{ volleyball.description }}</h5>
                            </a>                      
                            <div class="flex items-center justify-between">
                                <div class="flex items-center mt-2.5 mb-5">
                                    <div class="flex items-center space-x-1 rtl:space-x-reverse">
                                        <!-- Star Rating SVGs Here -->
                                    </div>
                                </div>
                                <a href="#" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div>
        <div class="text-3xl ml-10 my-10">Table Tennis</div>
        <div class="carousel rounded-box w-[118rem]">
            <div class="carousel-items flex overflow-x-auto">
                <div class="carousel-item ml-[2rem] flex flex-column" v-for="(tennis, index) in CarouselTableTennis" :key="index">
                    <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                        <a href="#">
                            <img class="h-[13rem] w-full p-8 rounded-t-lg" :src="tennis.src" :alt="tennis.alt" />
                        </a>
                        <div class="px-5 pb-5">
                            <span class="text-3xl font-bold text-gray-900 dark:text-white">${{tennis.price}}</span>
                            <a href="#">
                                <h5 class="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">{{ tennis.description }}</h5>
                            </a>                      
                            <div class="flex items-center justify-between">
                                <div class="flex items-center mt-2.5 mb-5">
                                    <div class="flex items-center space-x-1 rtl:space-x-reverse">
                                        <!-- Star Rating SVGs Here -->
                                    </div>
                                </div>
                                <a href="#" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.carousel-items {
    display: flex; /* Use flexbox for horizontal layout */
    overflow-x: auto; /* Enable horizontal scrolling */
    /* overflow: hidden; */
    gap: 2rem; /* Optional: Add space between items */
    margin-left: 4.5rem;
    width: 92%;
}
.carousel-items::-webkit-scrollbar {
    width: 0; /* Hides the scrollbar */
}
.carousel-item {
    flex: 0 0 auto; /* Prevent flex items from shrinking */
    width: 20rem; /* Set a fixed width for each item */
}
.carousel-item:hover {
text-shadow: 0px 0px 6px rgba(255, 255, 255, 1);
-webkit-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
-moz-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
transition: all 0.4s ease 0s;
}
</style>

<script>
import ball1 from '@/assets/images/ball1.webp'; 
import ball2 from '@/assets/images/ball2.jpeg';
import ball3 from '@/assets/images/ball3.webp';
import ball4 from '@/assets/images/ball4.jpg';
import soccer1 from '@/assets/images/soccer1.jpg';
import soccer2 from '@/assets/images/soccer2.webp';
import shoes1 from '@/assets/images/shoes2.avif';
import shoes2 from '@/assets/images/shoes6.avif';
import shoes3 from '@/assets/images/shoes6.webp';
import shoes4 from '@/assets/images/shoes7.webp';
import uniforn1 from '@/assets/images/unifrom4.jpg';
import uniform2 from '@/assets/images/uniform6.jpg';
import uniform3 from '@/assets/images/unifrom8.webp';
import uniform4 from '@/assets/images/uniform9.webp';
import uniform5 from '@/assets/images/uniform10.webp';
import uniform6 from '@/assets/images/uniform11.webp';
import table1 from '@/assets/images/table1.webp';
import table2 from '@/assets/images/table2.webp';
import { ssrImportKey } from 'vite/module-runner';
    export default {
        name: 'Carousel',
        data() {
        return {
            CarouselFootball: [ // Use camelCase for consistency
                {
                    src: ball1,
                    alt: "ball 1",
                    price: 80,
                    description:"The World Cup's New High-Tech Ball Will Change Soccer Forever"
                },
                {
                    src: soccer1,
                    alt: "soccer 1",
                    price: 100,
                    description:"Already incredibly lightweight, Nike made these even more agile"
                },
                {
                    src: uniforn1,
                    alt: "uniform 1",
                    price: 125,
                    description:"Personalised Football Kit with Name Number Logo"
                },
                {
                    src: ball2,
                    alt: "ball 2",
                    price: 85,
                    description:"Spark TB - a new thermally bonded ball for clubs"
                },
                {
                    src: soccer2,
                    alt: "scocer 2",
                    price: 120,
                    description:"A cleat created by the German brand that is finally suited"
                },
                {
                    src: uniform2,
                    alt: "uniform 2",
                    price: 140,
                    description:"Personalised Football Kit for Kids Mens with Name Number Team"
                }
            ],
            CarouselVolleyball: [ // Use camelCase for consistency
                {
                    src: uniform3,
                    alt: "uniform 3",
                    price: 90,
                    description:"11+ Thousand Volleyball Jerseys Royalty-Free Images"
                },
                {
                    src: ball3,
                    alt: "ball 3",
                    price: 65,
                    description:"Why are Volleyballs So Expensive? (Explained & Solved)"
                },
                {
                    src: shoes1,
                    alt: "shoes 1",
                    price: 110,
                    description:"adidas Volleyball Clothes & Shoes | adidas US"
                },
                {
                    src: uniform4,
                    alt: "uniform 4",
                    price: 95,
                    description:"Volleyball Uniform Royalty-Free Images, Stock Photos & Pictures"
                },
                {
                    src: shoes2,
                    alt: "shoes 2",
                    price: 125,
                    description:"Mizuno Volleyball Shoes | Curbside Pickup Available at DICK'S"
                },
                {
                    src: ball4,
                    alt: "ball 4",
                    price: 80,
                    description:"Volleyball Ball Indoor Stock Photos, Pictures & Royalty"
                }
            ],
            CarouselTableTennis: [ // Use camelCase for consistency
                {
                    src: shoes3,
                    alt: "shoes for tennis 1",
                    price: 90,
                    description:"The 7 Best White Sneakers of 2025 | Reviews by Wirecutter"
                },
                {
                    src: table1,
                    alt: "table for play table tennis 1",
                    price: 150,
                    description:"Portable Ping Pong Table | Pop-Up Table Tennis (6-Foot)"
                },
                {
                    src: uniform6,
                    alt: "uniform for ttable tennis 2",
                    price: 115,
                    description:"Table Tennis – kustomteamwear.com"
                },
                {
                    src: table2,
                    alt: "table for play table tennis 2",
                    price: 180,
                    description:"Indoor ping pong table - INTERIOR - TP SPORT"
                },
                {
                    src: uniform5,
                    alt: "unifoem for table tennis 1",
                    price: 130,
                    description:"Table Tennis – kustomteamwear.com"
                },
                {
                    src: shoes4,
                    alt: "shoes for tennis 2",
                    price: 100,
                    description:"Wilson Rush Pro 4.5 tennis shoes Review. - Love Tennis Blog"
                }
            ],
        };
  },
    }
</script>