<template>
    <div>
        <div class="text-3xl ml-10">Equipments</div>
        <div class="justify-center flex flex-wrap gap-[5rem] mt-10">
            <div  v-for="(equipment, index) in equipments" :key="index">
                <div class="max-w-lg bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                    <a href="#">
                        <img class="rounded-t-lg w-full h-[18rem]" :src="equipment.src" :alt="equipment.alt" />
                    </a>
                    <div class="p-5">
                        <a href="#">
                            <h5 class="mb-2 text-2xl text-center font-bold tracking-tight text-gray-900 dark:text-white">{{equipment.title}}</h5>
                        </a>
                        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{{equipment.description}}</p>
                        <div class="flex justify-center align-content-center">
                            <a href="#" class="inline-flex items-center align-content-center align-middle justify-content-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Read more
                                <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                </svg>
                            </a>
                        </div>
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
                equipments:[
                    {
                        src: football,
                        alt: "Football",
                        description: "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
                        title: "Equipment Football"
                    },
                    {
                        src: volleyball,
                        alt: "Volleyball",
                        title: "Equipment Volleyball",
                        description: "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order."
                    },
                    {
                        src: tableTennis,
                        alt: "Table Tennis",
                        title: "Equipment Table Tennis",
                        description: "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order."
                    }
                ]
            };
        },
        
    };
</script>