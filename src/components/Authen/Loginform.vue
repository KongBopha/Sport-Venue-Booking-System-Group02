<template>
  <div>
    <!-- Container -->
    <div class="flex flex-wrap min-h-screen w-full content-center justify-center bg-gray-200 py-10">
      
      <!-- Login component -->
      <div class="flex shadow-lg rounded-2xl overflow-hidden">
        
        <!-- Login form -->
        <div class="flex flex-wrap content-center justify-center bg-white p-10" style="width: 30rem; height: 38rem;">
          <div class="w-80">
            <!-- Heading -->
            <h1 class="text-2xl font-bold text-teal-700">Welcome back</h1>
            <small class="text-gray-400">Please enter your details to continue</small>

            <!-- Form -->
            <form class="mt-6">
              <div class="mb-4">
                <label class="mb-2 block text-sm font-semibold text-gray-600">Email</label>
                <input type="email" placeholder="Enter your email" 
                       class="block w-full rounded-md border border-gray-300 focus:border-teal-700 focus:ring-1 focus:ring-teal-700 py-2 px-3 text-gray-600" />
              </div>

              <div class="mb-4">
                <label class="mb-2 block text-sm font-semibold text-gray-600">Password</label>
                <input type="password" placeholder="******" 
                       class="block w-full rounded-md border border-gray-300 focus:border-teal-700 focus:ring-1 focus:ring-teal-700 py-2 px-3 text-gray-600" />
              </div>

              <div class="mb-4 flex items-center justify-between">
                <div class="flex items-center">
                  <input id="remember" type="checkbox" class="mr-2 accent-teal-700" />
                  <label for="remember" class="text-xs font-semibold text-gray-600">Remember me</label>
                </div>
                <a href="#" class="text-xs font-semibold text-teal-700 hover:underline">Forgot password?</a>
              </div>

              <div class="mb-4">
                <button class="w-full text-white bg-teal-500 hover:bg-teal-700 px-4 py-2 rounded-md font-semibold transition">Sign in</button>
              </div>

              <div class="mb-4">
                <button class="flex items-center justify-center w-full border border-gray-300 hover:border-gray-500 px-4 py-2 rounded-md">
                  <img class="w-5 mr-2" src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA" alt="Google Icon">
                  Sign in with Google
                </button>
              </div>
            </form>

            <!-- Footer -->
            <div class="text-center">
              <span class="text-xs text-gray-400 font-semibold">Don't have an account?</span>
              <a href="#" class="text-xs font-semibold text-teal-700 hover:underline">Sign up</a>
            </div>
          </div>
        </div>

        <!-- Login banner -->
        <div class="hidden md:flex flex-wrap content-center justify-center" style="width: 30rem; height: 38rem;">
          <img class="w-full h-full object-cover" src="@/assets/Authen/login.png" alt="Login Banner">
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    return {}
  }
}
</script>

<style lang="scss" scoped>

</style>
