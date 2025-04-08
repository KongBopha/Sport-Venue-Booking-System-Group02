import { createApp } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import App from './App.vue'
import router from './router'
import 'bootstrap-icons/font/bootstrap-icons.css';
import Login from './views/Account/Login.vue'

import './assets/main.css' // Ensure this points to your Tailwind CSS file

library.add(fas)

createApp(App)
  .use(router)
  .mount('#app');