<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const username = ref('');
const password = ref('');
const router = useRouter();
const authStore = useAuthStore();

const handleSubmit = async (event: Event) => {
  event.preventDefault();
  const loginData = {
    username: username.value,
    password: password.value,
  };
  try {
    const response = await axios.post('http://localhost:8080/auth/login', loginData);
    const data = response.data;

    if (data.token) {
      authStore.login(data.token);
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
        <input class="input" type="text" placeholder="Username" v-model="username" />
      </p>
    </div>
    <div class="field">
      <p class="control">
        <input class="input" type="password" placeholder="Password" v-model="password" />
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