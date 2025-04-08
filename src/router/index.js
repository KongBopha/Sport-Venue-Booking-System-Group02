import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/', component: () => import('@/views/Account/Login.vue') },
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
        component: () => import('@/views/User/Venue.vue') // Assuming correction
      },
      {
        path: 'about',
        component: () => import('@/views/User/AboutUs.vue')
      },
      {
        path: 'contact',
        component: () => import('@/views/User/ContactUs.vue')
      }
    ]
  }
];


const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
