import { createApp } from 'vue';
import { createPinia } from 'pinia'
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import App from './App.vue';
import router from './router';
import i18n from './locales';
import { useAuthStore } from './stores/AuthStore';

const pinia = createPinia();

createApp(App)
  .use(router)
  .use(pinia)
  .provide('authStore', useAuthStore())
  .use(i18n)
  .mount('#app');
