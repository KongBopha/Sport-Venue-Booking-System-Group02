<template>
    <main  class="min-h-screen ">
        <Navbar />

        <div class="">
            <div class="w-full h-64 bg-cover bg-center relative">
                <img src="../assets/images/ball2.jpeg" alt="image oof football" class="w-full h-64 object-cover" />
            </div>

            <div class="flex justify-center ">
                <div class="flex gap-6 items-center text-center text-sm my-12">
                    <div class="flex flex-col items-center text-gray-400">
                        <div class="w-6 h-6 rounded-full border border-gray-400 flex items-center justify-center text-xs">1</div>
                        <span>Booking</span>
                    </div>
                    <div class="w-10 h-0.5 bg-gray-400"></div>
                        <div class="flex flex-col items-center text-[#4F6DF5]">
                        <div class="w-6 h-6 rounded-full bg-[#4F6DF5] text-white flex items-center justify-center text-xs">2</div>
                        <span>Checkout</span>
                    </div>
                    <div class="w-10 h-0.5 bg-gray-400"></div>
                        <div class="flex flex-col items-center text-gray-400">
                        <div class="w-6 h-6 rounded-full border border-gray-400 flex items-center justify-center text-xs">3</div>
                        <span>Confirmation</span>
                    </div>
                </div>
            </div>


            <div class="flex justify-center">
                <div class="w-[90rem] p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Billing Address</h5>
                    
                    <form>
                        <div class="my-10">
                            <label for="confirm_password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Full Name</label>
                            <input type="text" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Full Name" required />
                        </div> 
                        <div class="my-10">
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
                            <input type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com" required />
                        </div> 
                        <div class="my-10">
                            <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
                            <input type="number" id="phone" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Phone Number" required />
                        </div> 
                       
                        <form class="max-w-sm mx-auto">
                            <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">County</label>
                            <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option selected>Choose County</option>
                                <option value="US">United state</option>
                                <option value="CA">Cambodia</option>
                                <option value="FR">China</option>
                                <option value="DE">Japen</option>
                            </select>
                        </form>

                        <div class="grid gap-6 mb-6 my-10 md:grid-cols-3">
                            <div>
                                <label for="city" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">City</label>
                                <input type="text" id="city" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter City" required />
                            </div>
                            <div>
                                <label for="district" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">District</label>
                                <input type="text" id="district" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter District" required />
                            </div>
                            <div>
                                <label for="village" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Village</label>
                                <input type="text" id="village" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="village" required />
                            </div>
                        </div>

                        <div class="flex justify-center">
                            <button type="submit" class="text-white my-10 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Checkout</button>
                        </div>
                    </form>

                </div>
            </div>

        </div>

        <Footer />
    </main>>
</template>
<style>

</style>
<script>  
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'

export default {
    name: 'Checkout',
    components: {
        Navbar,
        Footer,
    },
}
</script>