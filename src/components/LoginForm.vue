<script setup lang="ts">
  import { inject, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import LoginForm from '@/models/LoginForm';

  const form = ref(new LoginForm());
  const router = useRouter();
  const authStore = inject('authStore') as any;

  const handleSubmit = async (event: Event) => {
    try {
      event.preventDefault();
      const success = await authStore.login({ 
        username: form.value.username, 
        password: form.value.password 
      });
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
  <form action="#" method="post" @submit="handleSubmit">
    <div class="field">
      <p class="control">
        <input class="input" type="text" placeholder="Username" v-model="form.username" />
      </p>
    </div>
    <div class="field">
      <p class="control">
        <input class="input" type="password" placeholder="Password" v-model="form.password" />
      </p>
    </div>
    <div class="field">
      <p class="control">
        <button type="submit" class="button is-success">
          Login
        </button>
      </p>
    </div>
  </form>
</template>