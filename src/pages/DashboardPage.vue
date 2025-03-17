<script setup lang="ts">
  import { useRouter } from 'vue-router';
  import { useAuthStore } from '@/stores/AuthStore';

  const router = useRouter();
  const authStore = useAuthStore();

  const logout = () => {
    authStore.signOut();
    router.push({ name: 'login' });
  };
</script>

<template>
  <div>
    <h1>Dashboard</h1>
    <button @click="logout">Logout</button>
  </div>
</template>


