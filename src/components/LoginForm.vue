<script setup lang="ts">
import { ref } from 'vue';
import { inject } from 'vue';
import { useRouter } from 'vue-router';
import LoginForm from '@/models/LoginFormModel';
import type UserData from '@/types/UserDataType';
import { type AuthStore } from '@/stores/AuthStore';

const router = useRouter();
const authStore = inject('authStore') as AuthStore;
const emit = defineEmits(['error']);

const login = async (userData: UserData) => {
  const success = await authStore.login(userData);
  if (success) {
    router.push({ name: 'dashboard' });
    return;
  }
  // verificar os tipos de erros da API e tratar aqui, talvez um erro mais informativo que uma mensagem com severidade.
  form.value.idle();
  emit('error', 'Token not found in response');
}

const form = ref(new LoginForm());
form.value.onSubmit(login);

const clickSubmit = async (event: Event) => {
  try {
    event.preventDefault();
    form.value.loading();
    form.value.submit();
  } catch (err: unknown) {
    emit('error', err instanceof Error ? err.message : 'An error occurred');
  }
}
</script>

<template>
  <form action="#" method="post" @submit="clickSubmit">
    <div class="field">
      <label class="label has-text-black-ter">Username</label>
      <p class="control">
        <input 
          type="text" 
          placeholder="Enter your username" v-model="form.username"
          :class="`input ${form.isErrorUsernameNotFound() ? 'is-danger' : ''}`" 
          :disabled="form.isLoading()"
        >
        </input>
      </p>
    </div>
    <div class="field mt-3">
      <label class="label has-text-black-ter">Password</label>
      <p class="control">
        <input 
          type="password" 
          placeholder="Provide your password" v-model="form.password"
          :class="`input ${form.isErrorPasswordNotFound() ? 'is-danger' : ''}`"
          :disabled="form.isLoading()"
          >
        </input>
      </p>
    </div>
    <div class="field mt-6">
      <p class="control">
        <button 
          type="submit" 
          :class="`button is-link has-background-primary is-responsive is-fullwidth is-rounded ${form.isLoading() ? 'is-loading' : 'is-normal'}`">
          Sign In
        </button>
      </p>
    </div>
  </form>
</template>