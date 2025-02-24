import { createApp } from 'vue';
import { createPinia } from 'pinia'
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import App from './App.vue';
import router from './router';

const pinia = createPinia();

createApp(App)
  .use(router)
  .use(pinia)
  .mount('#app');
