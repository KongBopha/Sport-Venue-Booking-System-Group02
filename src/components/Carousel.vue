<template>
  <div>
    <div class="text-3xl ml-10 my-10">Football</div>
    <div class="carousel rounded-box w-[118rem]">
      <div class="carousel-items flex overflow-x-auto">
        <div
          class="carousel-item ml-[2rem] flex flex-column"
          v-for="(football, index) in football_equipments"
          :key="index"
        >
          <div
            class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
          >
            <a href="#">
              <img
                class="h-[13rem] w-full p-8 rounded-t-lg"
                :src="football.image"
                alt="image of football"
              />
            </a>
            <div class="px-5 pb-5">
              <span class="text-3xl font-bold text-gray-900 dark:text-white"
                >${{ football.price }}</span
              >
              <a href="#">
                <h5
                  class="text-lg font-semibold tracking-tight text-gray-900 dark:text-white"
                >
                  {{ football.name }}
                </h5>
              </a>
              <div class="flex items-center justify-between">
                <div class="flex items-center mt-2.5 mb-5"></div>
                <a
                  href="#"
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >Add to cart</a
                >
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
        <div
          class="carousel-item ml-[2rem] flex flex-column"
          v-for="(volleyball, index) in volleyball_equipments"
          :key="index"
        >
          <div
            class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
          >
            <a href="#">
              <img
                class="h-[13rem] w-full p-8 rounded-t-lg"
                :src="volleyball.image"
                alt="image of volleyball"
              />
            </a>
            <div class="px-5 pb-5">
              <span class="text-3xl font-bold text-gray-900 dark:text-white"
                >${{ volleyball.price }}</span
              >
              <a href="#">
                <h5
                  class="text-lg font-semibold tracking-tight text-gray-900 dark:text-white"
                >
                  {{ volleyball.name }}
                </h5>
              </a>
              <div class="flex items-center justify-between">
                <div class="flex items-center mt-2.5 mb-5">
                  <div class="flex items-center space-x-1 rtl:space-x-reverse">
                    <!-- Star Rating SVGs Here -->
                  </div>
                </div>
                <a
                  href="#"
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >Add to cart</a
                >
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
        <div
          class="carousel-item ml-[2rem] flex flex-column"
          v-for="(tennis, index) in tennis_equipments"
          :key="index"
        >
          <div
            class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
          >
            <a href="#">
              <img
                class="h-[13rem] w-full p-8 rounded-t-lg"
                :src="tennis.image"
                alt="image of tennis table"
              />
            </a>
            <div class="px-5 pb-5">
              <span class="text-3xl font-bold text-gray-900 dark:text-white"
                >${{ tennis.price }}</span
              >
              <a href="#">
                <h5
                  class="text-lg font-semibold tracking-tight text-gray-900 dark:text-white"
                >
                  {{ tennis.name }}
                </h5>
              </a>
              <div class="flex items-center justify-between">
                <div class="flex items-center mt-2.5 mb-5">
                  <div class="flex items-center space-x-1 rtl:space-x-reverse">
                    <!-- Star Rating SVGs Here -->
                  </div>
                </div>
                <a
                  href="#"
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >Add to cart</a
                >
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
  -webkit-box-shadow: 0px 5px 40px -10px rgba(0, 0, 0, 0.57);
  -moz-box-shadow: 0px 5px 40px -10px rgba(0, 0, 0, 0.57);
  transition: all 0.4s ease 0s;
}
</style>

<script>
// import ball1 from "@/assets/images/ball1.webp";
// import ball2 from "@/assets/images/ball2.jpeg";
// import ball3 from "@/assets/images/ball3.webp";
// import ball4 from "@/assets/images/ball4.jpg";
// import soccer1 from "@/assets/images/soccer1.jpg";
// import soccer2 from "@/assets/images/soccer2.webp";
// import shoes1 from "@/assets/images/shoes2.avif";
// import shoes2 from "@/assets/images/shoes6.avif";
// import shoes3 from "@/assets/images/shoes6.webp";
// import shoes4 from "@/assets/images/shoes7.webp";
// import uniforn1 from "@/assets/images/unifrom4.jpg";
// import uniform2 from "@/assets/images/uniform6.jpg";
// import uniform3 from "@/assets/images/unifrom8.webp";
// import uniform4 from "@/assets/images/uniform9.webp";
// import uniform5 from "@/assets/images/uniform10.webp";
// import uniform6 from "@/assets/images/uniform11.webp";
// import table1 from "@/assets/images/table1.webp";
// import table2 from "@/assets/images/table2.webp";
// import { ssrImportKey } from "vite/module-runner";
// import Vue from 'vue';
// import axios from "axios";
// import VueAxios from "vue-axios";
// import axios from "axios";
// import { data } from 'autoprefixer';
// import axios from 'axios';
// import path from 'path-browserify';
export default {
    name: 'Carousel',
    data() {
        return {
            football_equipments: [],
            volleyball_equipments: [],
            tennis_equipments: []
        };
    },
    mounted() {
        fetch('http://localhost:1000/api/public/home')
        .then(res=>res.json())
        .then(respone =>{
          this.football_equipments = respone.data.football_equipments;
          this.volleyball_equipments = respone.data.volleyball_equipments;
          this.tennis_equipments = respone.data.tennis_equipments;
        })
        .catch(err=>console.log(err.message))
    },
};
</script>
