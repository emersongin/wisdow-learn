import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '@/pages/LoginPage.vue';
import DashboardPage from '@/pages/DashboardPage.vue';

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardPage,
    meta: { requiresAuth: true },
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, _from, next) => {
  const hasToken = !!localStorage.getItem('token');

  if (to.meta.requiresAuth && !hasToken) {
    next({ name: 'login' });
  } else if (to.name === 'login' && hasToken) {
    next({ name: 'dashboard' });
  } else {
    next();
  }
});

export default router;
