<template>
    <div class="contact-info">
      <h1>Get in Touch</h1>
      <h3>We’d love to hear from you!</h3>
  
      <div class="info-item">
        <font-awesome-icon :icon="['fas', 'phone']" />
        <span>+855 74 851 290</span>
      </div>
  
      <div class="info-item">
        <font-awesome-icon :icon="['fas', 'paper-plane']" />
        <a href="https://t.me/kong_bopha" target="_blank">Sparkfoot_team</a>
      </div>
  
      <div class="info-item">
        <font-awesome-icon :icon="['fas', 'map-marker-alt']" />
        <a href="https://goo.gl/maps/NdFyL9qvsNB9UDhv8" target="_blank">
          Office 106F, Building F, PO Box 86,<br />Russian Blvd, Phnom Penh
        </a>
      </div>
  
      <div class="social-icons">
        <font-awesome-icon :icon="['fab', 'facebook']" />
        <font-awesome-icon :icon="['fab', 'instagram']" />
        <font-awesome-icon :icon="['fab', 'tiktok']" />
      </div>
    </div>
  </template>
  
  <script setup>
  // no script needed
  </script>
  
  <style scoped>
  .contact-info h1 {
    font-size: 28px;
    margin-bottom: 10px;
  }
  .contact-info h3 {
    font-size: 18px;
    margin-bottom: 30px;
    font-weight: 300;
  }
  .info-item {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
  }
  .info-item a, .info-item span {
    color: white;
    text-decoration: none;
  }
  .info-item a:hover {
    text-decoration: underline;
  }
  .social-icons {
    margin-top: 30px;
    display: flex;
    gap: 20px;
    font-size: 24px;
  }
  </style>
  