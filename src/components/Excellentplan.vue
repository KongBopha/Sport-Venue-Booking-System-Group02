<script>
import football from '../assets/images/football-court.avif';
import volleyball from '../assets/images/volleyball-court.jpg';
import tableTennis from '../assets/images/Table-Tennis.jpg';
    export default {
        name: 'Excellentplan',
        data() {
            return {
                excellentplans:[
                    {
                        src: football,
                        alt: "Football",
                        title: "$100/month",
                        featuresTitle: "Features",
                        description: "Everything in our free Upto 10 users.",
                        features:[
                            "Included : Quality Checked By Envato",
                            "Included : Future Updates",
                            "Technical Support",
                            "Add Listing",
                            "Approval of Listing",
                        ],
                    
                    },
                    {
                        src: volleyball,
                        alt: "Volleyball",
                        title: "$100/month",
                        featuresTitle: "Features",
                        description: "Everything in our free Upto 10 users.",
                        features:[
                            "Included : Quality Checked By Envato",
                            "Included : Future Updates",
                            "Technical Support",
                            "Add Listing",
                            "Approval of Listing",
                        ],
                    },
                    {
                        src: tableTennis,
                        alt: "Table Tennis",
                        title: "$100/month",
                        featuresTitle: "Features",
                        description: "Everything in our free Upto 10 users.",
                        features:[
                            "Included : Quality Checked By Envato",
                            "Included : Future Updates",
                            "Technical Support",
                            "Add Listing",
                            "Approval of Listing",
                        ],
                    }
                ],
            };
        },
        
    };
</script>
<template>
    <div>
    <a href="#">

    <div class="text-3xl ml-10 mt-10">Excellent Plan</div>
        <div class="justify-center flex flex-wrap gap-[5rem] mt-10">
            <div  v-for="(excellentplan, index) in excellentplans" :key="index">
                <div class="max-w-lg bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                    <a href="#">
                        <img class="rounded-t-lg w-full h-[18rem]" :src="excellentplan.src" :alt="excellentplan.alt" />
                    </a>
                    <div class="p-5">
                        <a href="#">
                            <h5 class="mb-2 text-2xl text-center font-bold tracking-tight text-gray-900 dark:text-white">{{excellentplan.title}}</h5>
                        </a>
                        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{{excellentplan.description}}</p>
                        <div class="flex justify-center align-content-center"></div>
                        <h2 class="font-semibold mt-2 mb-1">{{ excellentplan.featuresTitle }}</h2>
                    
                        <ul class="list-disc list-inside space-y-1 text-sm text-gray-700">
                             <li v-for="(feature, idx) in excellentplan.features" :key="idx">
                              {{ feature }}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </a>
    </div>
</template>