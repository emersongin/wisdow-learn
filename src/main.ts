import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';
import { createPinia } from 'pinia'
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import App from './App.vue';
import router from './router';
import { useAuthStore } from './stores/AuthStore';

import en from './locales/en.json';
import pt from './locales/pt.json';

const i18n = createI18n({
  legacy: false,
  locale: 'pt',
  fallbackLocale: 'en',
  messages: { en, pt },
});

const pinia = createPinia();

createApp(App)
  .use(router)
  .use(pinia)
  .provide('authStore', useAuthStore())
  .use(i18n)
  .mount('#app');
