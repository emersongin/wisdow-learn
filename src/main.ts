import { createApp } from 'vue';
import { createPinia } from 'pinia'
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import router from './router';
import i18n from './locales';
import { useAuthStore } from './stores/AuthStore';
import App from './App.vue';

const pinia = createPinia();

createApp(App)
  .use(router)
  .use(pinia)
  .use(i18n)
  .provide('authStore', useAuthStore())
  .mount('#app');
