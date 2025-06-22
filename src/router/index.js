import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/', redirect: '/user/home'
  },
  { path: '/auth/login', component: () => import('@/views/Account/Login.vue') },
  { path: '/auth/signup', component: () => import('@/views/Account/Signup.vue') },
  { path: '/account/profile', component: () => import('@/views/Account/Profile/Profile.vue') },
  {
    path: '/user',
    component: () => import('@/views/User/User.vue'),
    children: [
      {
        path: 'home',
        component: () => import('@/views/User/Home.vue')
      },
      {
        path: 'booking',
        component: () => import('@/views/User/Booking.vue')
      },
      {
        path: 'venue', // Corrected typo here
        name:'VenueBooking',
        component: () => import('@/views/User/Venue.vue') 
      },
      {
        path: 'about',
        component: () => import('@/views/User/AboutUs.vue')
      },
      {
        path: 'contact',
        component: () => import('@/views/User/ContactUs.vue')
      },
      {
        path: 'checkout',
        name: 'Checkout',
        component: () => import('@/views/User/Checkout.vue')
      },
            

    ]
    
  },
  
  {
    path: '/admin', component: () => import('@/views/Admin/AdminApp.vue'),
    children: [
      { path: '/admin', redirect: '/admin/dashboard' }, // Default route to /home/shoes
      { path: 'dashboard', component: () => import('@/views/Admin/pages/p1-dashboard/Dashboard.vue') },
      { path: 'payment', component: () => import('@/views/Admin/pages/p2-payment/Payment.vue') },
      { path: 'booking', component: () => import('@/views/Admin/pages/p3-booking/Booking.vue') },
      { path: 'equipment-sale', component: () => import('@/views/Admin/pages/p4-equipment-sale/EquipmentSale.vue') },
      { path: 'equipments', component: () => import('@/views/Admin/pages/p5-equipment/Equipment.vue') },
      { path: 'drink', component: () => import('@/views/Admin/pages/p6-drink/Drink.vue') },
      { path: 'users', component: () => import('@/views/Admin/pages/p7-users/UsersPage.vue') },
      { path: 'sponsor', component: () => import('@/views/Admin/pages/p8-sponsor/Sponsor.vue') },
      { 
        path: 'settings', component: () => import('@/views/Admin/pages/p9-settings/Settings.vue'),
        children: [
      { path: '/admin/settings', redirect: '/admin/settings/blacklist' }, // Default route to /home/shoes
          { path: 'blacklist', component: () => import('@/views/Admin/pages/p9-settings/s1-blacklist/BlackList.vue') },
          { path: 'pitch', component: () => import('@/views/Admin/pages/p9-settings/s2-pitch/pitch.vue') },
          { path: 'pitches-category', component: () => import('@/views/Admin/pages/p9-settings/s3-pitches-category/PitchesCategory.vue') },
          { path: 'sport', component: () => import('@/views/Admin/pages/p9-settings/s4-sport/Sport.vue') },
          { path: 'date-type', component: () => import('@/views/Admin/pages/p9-settings/s5-date-type/DateType.vue') },
          { path: 'time-type', component: () => import('@/views/Admin/pages/p9-settings/s6-time-type/TimeType.vue') },
        ]
      },
    ]
  }
];


const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
