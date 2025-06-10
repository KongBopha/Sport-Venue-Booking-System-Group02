<template>
    <!-- <div class="text-3xl ml-10 my-10"></div> -->
    <footer class="items-center bg-zinc-80  text-center text-surface dark:bg-neutral-700 dark:text-white">
        
        <div class="w-full bg-slate-300 mt-7">
            
            <!-- Social media icons container -->
            <div class="mb-6 flex justify-center space-x-2"></div>
                <a class="mt-5">
                    <h1 class="text-4xl mt-[4rem]">Follow in the same footsteps</h1>
                    <div class="my-4"> 
                        <h4>as these amazing players who are currently living the dream.</h4>
                        <h4>Schedule a free introduction call</h4>
                    </div>
                </a>

            <!-- Newsletter sign-up form -->
            <div><br>
            <form action="">
                <div
                class="gird-cols-1 grid items-center justify-center gap-4 md:grid-cols-3">
                <div class="md:mb-6 md:ms-auto"></div>

                <!-- Newsletter sign-up input field -->
                <div class="relative md:mb-6">
                    <input
                    v-model="email"
                    type="email"
                    class="peer block min-h-[auto] w-full rounded border border-gray-400 bg-transparent px-3 py-[0.50rem] leading-[1.9] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary dark:text-white dark:placeholder:text-neutral-300"
                    placeholder="Email address" 
                    required/>
                    <label
                    for="Emailinput"
                    class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.90rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary dark:text-neutral-200">
                    </label>
                </div>

                <!-- Newsletter sign-up submit button -->
                    <div class="mb-6 md:me-auto">
                        <button
                        type="submit"
                        class="bg-green-500 hover:bg-green-400 px-6 py-2 rounded text-xs uppercase font-bold transition">
                        Subscribe
                        </button>
                            <div v-if="successMessage" class="mt-4 text-green-400 font-semibold hidden">
                                ✔ The form was sent successfully!
                            </div>
                    </div>
                </div>
            </form>
            <hr class=" my-9 mx-auto w-[50rem] border-t-2 border-gray-400" />
        </div>
              

            <!-- Links section -->
  
                <div class="grid grid-cols-3">
                <div class="flex items-start my-4 ">
                    <img src="@/assets/Navbar/logoName.png" alt="Logo" class="h-10 ml-20 block" />
                </div>

                <div class="grid ld:grid-rows-2">
                    <div class=" my-4">
                        <ul class=" text-blue-500 list-none ">
                        <li class="flex items-center gap-2">
                            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-width="2" d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                            </svg>

                            <a href="#!">Contact Us</a>
                        </li>
                        </ul>
                    </div>

                    <div class="mb-10">
                        <ul class="text-blue-500 list-none">
                        <li class="flex items-center gap-2">
                            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.427 14.768 17.2 13.542a1.733 1.733 0 0 0-2.45 0l-.613.613a1.732 1.732 0 0 1-2.45 0l-1.838-1.84a1.735 1.735 0 0 1 0-2.452l.612-.613a1.735 1.735 0 0 0 0-2.452L9.237 5.572a1.6 1.6 0 0 0-2.45 0c-3.223 3.2-1.702 6.896 1.519 10.117 3.22 3.221 6.914 4.745 10.12 1.535a1.601 1.601 0 0 0 0-2.456Z"/>
                            </svg>

                            <a href="#!">+855 966568116</a>
                        </li>
                        </ul>
                    </div>
                </div>

                <div class="grid ld:grid-rows-2">
                    <div class="my-4">
                        <ul class="text-blue-500 list-none">
                        <li class="flex items-center gap-2">
                            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m3.5 5.5 7.893 6.036a1 1 0 0 0 1.214 0L20.5 5.5M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"/>
                            </svg>

                            <a href="#!">Sportsphere@gmail.com</a>
                        </li>
                        </ul>
                    </div>

                    <div class="mb-10">
                        <ul class="text-blue-500 list-none">
                        <li class="flex items-center gap-2">
                            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.8 13.938h-.011a7 7 0 1 0-11.464.144h-.016l.14.171c.1.127.2.251.3.371L12 21l5.13-6.248c.194-.209.374-.429.54-.659l.13-.155Z"/>
                            </svg>

                            <a href="#!">114 Toul Kork Phnom Penh</a>
                        </li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>

        <!-- Copyright section -->
        <div class="w-full bg-black/5 py-7 text-center">
            © 2023 Copyright:
            <a class="font-semibold" href="https://tw-elements.com/"
            >TW Elements</a>
        </div>
    </footer>
</template>
<script>
export default {
  name: 'footer',
  data() {
    return {
      email: '',
      success: false,
    };
  },
  methods: {
    subscribe() {
      if (this.email.trim() !== '') {
        this.success = true;
        alert('✔ The form was sent successfully!');
        this.email = '';
        setTimeout(() => {
          this.success = false;
        }, 5000); // Hide message after 5 seconds
      } else {
        this.success = false;
        alert('Please enter a valid email address.');
      }
    },
  },
};
</script>

