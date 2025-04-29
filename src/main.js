import { createApp } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import App from './App.vue'
import router from './router'
import 'bootstrap-icons/font/bootstrap-icons.css';
import Login from './views/Account/Login.vue'
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons'

import './assets/main.css'  

library.add(fas,faPhone, faEnvelope, faFacebook, faInstagram)

createApp(App)
  .use(router)
  .mount('#app');