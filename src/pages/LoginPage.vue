<script setup lang="ts">
import { inject } from 'vue';
import { useRouter } from 'vue-router';
import LoginForm from '@/components/LoginForm.vue';
import { type UserData } from '@/enums/LoginFormStatus';

const router = useRouter();
const authStore = inject('authStore') as any;

const login = async (userData: UserData) => {
  try {
    const success = await authStore.login(userData);
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
  <section class="hero columns is-fullheight">
    <div class="section is-fullheight columns column">
      <div class="column is-two-thirds">
        <!-- image -->
      </div>
      <div class="column is-flex is-align-items-center">
        <div class="box is-flex-grow-1">
          <LoginForm @submit="login"></LoginForm>
        </div>
      </div>
    </div> 
  </section>
</template>
