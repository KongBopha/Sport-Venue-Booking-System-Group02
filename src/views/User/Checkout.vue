<template>
    <main class="min-h-screen bg-gray-50">
        <Navbar />

        <!-- Hero Section with Gradient Overlay -->
        <div class="relative">
            <div class="w-full h-48 bg-cover bg-center relative overflow-hidden">
                <img 
                    src="@/assets/images/ball2.jpeg" 
                    alt="Football booking background" 
                    class="w-full h-48 object-cover"
                />
                <div class="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-purple-900/60"></div>
                <div class="absolute inset-0 flex items-center justify-center">
                    <h1 class="text-4xl font-bold text-white text-center">
                        Complete Your Booking
                    </h1>
                </div>
            </div>
        </div>

        <!-- Progress Steps -->
        <div class="bg-white border-b border-gray-200">
            <div class="max-w-4xl mx-auto px-4 py-8">
                <div class="flex items-center justify-center">
                    <div class="flex items-center space-x-8">
                        <!-- Step 1 -->
                        <div class="flex items-center">
                            <div class="flex flex-col items-center">
                                <div class="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center font-semibold shadow-lg">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                </div>
                                <span class="text-sm font-medium text-green-600 mt-2">Booking</span>
                            </div>
                        </div>

                        <!-- Connector -->
                        <div class="w-16 h-1 bg-blue-500 rounded-full"></div>

                        <!-- Step 2 -->
                        <div class="flex items-center">
                            <div class="flex flex-col items-center">
                                <div class="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold shadow-lg">
                                    2
                                </div>
                                <span class="text-sm font-medium text-blue-600 mt-2">Checkout</span>
                            </div>
                        </div>

                        <!-- Connector -->
                        <div class="w-16 h-1 bg-gray-300 rounded-full"></div>

                        <!-- Step 3 -->
                        <div class="flex items-center">
                            <div class="flex flex-col items-center">
                                <div class="w-10 h-10 rounded-full border-2 border-gray-300 text-gray-400 flex items-center justify-center font-semibold">
                                    3
                                </div>
                                <span class="text-sm font-medium text-gray-400 mt-2">Confirmation</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Main Content -->
        <div class="max-w-4xl mx-auto px-4 py-12">
            <div class="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <!-- Header -->
                <div class="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
                    <h2 class="text-2xl font-bold text-white flex items-center">
                        <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                        Billing Information
                    </h2>
                    <p class="text-blue-100 mt-2">Please provide your billing details to complete the booking</p>
                </div>

                <!-- Form -->
                <form class="p-8 space-y-8">
                    <!-- Personal Information Section -->
                    <div class="space-y-6">
                        <h3 class="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                            Personal Information
                        </h3>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div class="space-y-2">
                                <label for="name" class="block text-sm font-medium text-gray-700">
                                    Full Name *
                                </label>
                                <input 
                                    type="text" 
                                    id="name" 
                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white" 
                                    placeholder="Enter your full name"
                                    required 
                                />
                            </div>

                            <div class="space-y-2">
                                <label for="email" class="block text-sm font-medium text-gray-700">
                                    Email Address *
                                </label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white" 
                                    placeholder="john.doe@example.com"
                                    required 
                                />
                            </div>
                        </div>

                        <div class="space-y-2">
                            <label for="phone" class="block text-sm font-medium text-gray-700">
                                Phone Number *
                            </label>
                            <input 
                                type="tel" 
                                id="phone" 
                                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white" 
                                placeholder="Enter your phone number"
                                required 
                            />
                        </div>
                    </div>

                    <!-- Address Information Section -->
                    <div class="space-y-6">
                        <h3 class="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                            Address Information
                        </h3>

                        <div class="space-y-2">
                            <label for="countries" class="block text-sm font-medium text-gray-700">
                                Country *
                            </label>
                            <select 
                                id="countries" 
                                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                            >
                                <option value="">Select your country</option>
                                <option value="US">United States</option>
                                <option value="KH">Cambodia</option>
                                <option value="CN">China</option>
                                <option value="JP">Japan</option>
                                <option value="TH">Thailand</option>
                                <option value="VN">Vietnam</option>
                            </select>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div class="space-y-2">
                                <label for="city" class="block text-sm font-medium text-gray-700">
                                    City *
                                </label>
                                <input 
                                    type="text" 
                                    id="city" 
                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white" 
                                    placeholder="Enter city"
                                    required 
                                />
                            </div>

                            <div class="space-y-2">
                                <label for="district" class="block text-sm font-medium text-gray-700">
                                    District *
                                </label>
                                <input 
                                    type="text" 
                                    id="district" 
                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white" 
                                    placeholder="Enter district"
                                    required 
                                />
                            </div>

                            <div class="space-y-2">
                                <label for="village" class="block text-sm font-medium text-gray-700">
                                    Village/Area
                                </label>
                                <input 
                                    type="text" 
                                    id="village" 
                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white" 
                                    placeholder="Enter village or area"
                                />
                            </div>
                        </div>
                    </div>

                    <!-- Terms and Conditions -->
                    <div class="bg-blue-50 rounded-lg p-6 border border-blue-200">
                        <div class="flex items-start space-x-3">
                            <input 
                                type="checkbox" 
                                id="terms" 
                                class="mt-1 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                required
                            />
                            <label for="terms" class="text-sm text-gray-700">
                                I agree to the <a href="#" class="text-blue-600 hover:text-blue-800 font-medium">Terms and Conditions</a> 
                                and <a href="#" class="text-blue-600 hover:text-blue-800 font-medium">Privacy Policy</a>. 
                                I understand that this booking is subject to availability and confirmation.
                            </label>
                        </div>
                    </div>

                    <!-- Submit Button -->
                    <div class="flex justify-center pt-6">
                        <button 
                            type="submit" 
                            class="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-12 rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 flex items-center space-x-3"
                        >
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                            </svg>
                            <span>Proceed to Checkout</span>
                        </button>
                    </div>

                    <!-- Security Notice -->
                    <div class="text-center text-sm text-gray-500 bg-gray-50 rounded-lg p-4">
                        <div class="flex items-center justify-center space-x-2">
                            <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                            </svg>
                            <span>Your information is encrypted and secure</span>
                        </div>
                    </div>
                </form>
            </div>
        </div>

        <Footer />
    </main>
</template>

<style scoped>
/* Custom focus styles for better accessibility */
input:focus, select:focus {
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Smooth transitions for form elements */
input, select {
    transition: all 0.2s ease-in-out;
}

/* Hover effects for interactive elements */
input:hover, select:hover {
    border-color: #93c5fd;
}

/* Custom checkbox styling */
input[type="checkbox"]:checked {
    background-color: #3b82f6;
    border-color: #3b82f6;
}
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
    data() {
        return {
            
        }
    },
    methods: {
       
        handleSubmit() {
            // Handle form submission
        }
    }
}
</script>