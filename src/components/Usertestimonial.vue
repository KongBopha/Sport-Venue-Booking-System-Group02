<template>
    <div>
        <div class="text-3xl ml-10 mt-10">User Testimonials</div>
        <div class="usertestimonial rounded-box w-[118rem] mt-10">
            <div class="usertestimonial-items flex overflow-x-auto">
                <div class="usertestimonial-item ml-[3rem] flex flex-column" v-for="(usertestimonials, index) in usertestimonial" :key="index">
                    <div >
                        <img class="w-[100px] h-[53px] rounded-full" :src="usertestimonials.src" :alt="usertestimonials.alt">
                    </div>
                
                    <div class="flex flex-col gap-1 w-200 max-w-[320px] ml-5">
                    <div class="flex items-center space-x-2 rtl:space-x-reverse ">
                        <span class="text-sm font-semibold text-gray-900 dark:text-white">{{usertestimonials.name}}</span>
                        <span class="text-sm font-normal text-gray-500 dark:text-gray-400">{{usertestimonials.time}}</span>
                    </div>
                    <div class="flex flex-col leading-2.5 p-4 border-gray-400 bg-gray-200 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                        <p class="text-sm font-normal text-gray-900 dark:text-white">{{usertestimonials.Description}}</p>
                    </div>
                    
                </div>
            </div>
        </div>
        <!-- <button id="dropdownMenuIconButton" data-dropdown-toggle="dropdownDots" data-dropdown-placement="bottom-start" class="inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-600" type="button">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 4 15">
                <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"/>
            </svg>
        </button> -->
            <!-- <div id="dropdownDots" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-40 dark:bg-gray-700 dark:divide-gray-600">
                <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconButton">
                    <li>
                        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Reply</a>
                    </li>
                    <li>
                        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Forward</a>
                    </li>
                    <li>
                        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Copy</a>
                    </li>
                    <li>
                        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</a>
                    </li>
                    <li>
                        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Delete</a>
                    </li>
                </ul>
            </div> -->
        </div>

    </div>

</template>
<style scoped>
.usertestimonial-items  {
    display: flex;
    overflow-x: auto;

    gap: 2rem; /* Optional: Add space between items */
    margin-left: 4.5rem;
    width: 92%;
}
.usertestimonial-items::-webkit-scrollbar {
    width: 0; /* Hides the scrollbar */
}
.usertestimonial-item {
    flex: 0 0 auto; /* Prevent flex items from shrinking */
    width: 20rem; /* Set a fixed width for each item */
}
</style>
<script>
import Daino_profile from '../assets/images/Diano_profile.avif';
import profil11 from '../assets/images/profile11.jpg';
import profile7 from '../assets/images/profile7.avif';
import profile10 from '../assets/images/profile10.avif';
import profile14 from '../assets/images/profile14.avif';
import profile9 from '../assets/images/profile9.avif';
import profile16 from '../assets/images/profile16.jpg';
import profile1 from '../assets/images/profile1.jpeg'
export default{
    name: 'Usertestimonial',
    data (){
        return{
            usertestimonial: [
                {
                    src: profile1,
                    name: "Bonnie Green",
                    time: "11:46",
                    Description: "That's awesome. I think our user will really appreciate the improvements.",
                },
                {
                    src: profil11,
                    name: "Gimi",
                    time: "11:46",
                    Description: "That's awesome. I think our user will really appreciate the improvements.",
                },
                {
                    src: profile7,
                    name: "Dara",
                    time: "11:46",
                    Description: "That's awesome. I think our user will really appreciate the improvements.",
                },
                {
                    src: profile10,
                    name: "Jake",
                    time: "11:46",
                    Description: "That's awesome. I think our user will really appreciate the improvements.",
                },
                {
                    src: profile14,
                    name: "Dalish",
                    time: "11:46",
                    Description: "That's awesome. I think our user will really appreciate the improvements.",
                },
                {
                    src: profile9,
                    name: "Bonna",
                    time: "11:46",
                    Description: "That's awesome. I think our user will really appreciate the improvements.",
                },
                {
                    src: profile16,
                    name: "",
                    time: "11:46",
                    Description: "That's awesome. I think our user will really appreciate the improvements.",
                },







            ],

        };
    }
};
</script>