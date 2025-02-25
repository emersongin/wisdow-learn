<script setup lang="ts">
import { inject } from 'vue';
import { useRouter } from 'vue-router';
import LoginForm from '@/components/LoginForm.vue';
import { type LoginFormData } from '@/models/LoginForm';

const router = useRouter();
const authStore = inject('authStore') as any;

const login = async (formData: LoginFormData) => {
  try {
    const success = await authStore.login(formData);
    if (success) {
      router.push({ name: 'dashboard' });
    } else {
      throw new Error('Token not found in response');
    }
  } catch (error) {
    console.error('Erro ao fazer login:', error);
  }
}

</script>

<template>
  <div>
    <LoginForm @submit="login"></LoginForm>
  </div>
</template>