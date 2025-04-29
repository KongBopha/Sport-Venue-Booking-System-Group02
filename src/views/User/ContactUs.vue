<template>
  <Navbar />
  <div class="center-wrapper">
    <div class="container">
      <div class="flex-left">
        <ContactInfo />
      </div>
      <div class="flex-right">
        <ContactForm />
      </div>
    </div>
  </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue'
import ContactInfo from '@/components/Contactus/ContactInfo.vue'
import ContactForm from '@/components/Contactus/ContactForm.vue'
</script>

<style scoped>
.center-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #e0f7f7; 
  padding: 20px;
}
.container {
  width: 100%;
  max-width: 1200px;
  display: flex;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0px 8px 24px rgba(0,0,0,0.1);
}
.flex-left {
  background: #008080; /* teal */
  color: white;
  width: 40%;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.flex-right {
  width: 60%;
  padding: 40px;
}

/* Responsive */
@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }
  .flex-left, .flex-right {
    width: 100%;
  }
}
</style>
