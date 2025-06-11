import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas, faPhone, faEnvelope, faStar } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import * as lucide from 'lucide-vue-next'; // Import all Lucide icons
import App from './App.vue';
import router from './router';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './assets/main.css';

library.add(fas, faPhone, faEnvelope, faFacebook, faInstagram, faStar);

const app = createApp(App);

app.component('font-awesome-icon', FontAwesomeIcon);
// Register all lucide icons globally (optional)
Object.entries(lucide).forEach(([name, component]) => {
  app.component(name, component);
});

app.use(router);
app.use(createPinia());
app.mount('#app');
