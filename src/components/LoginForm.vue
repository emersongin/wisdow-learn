<script setup lang="ts">
import { ref } from 'vue';
import { inject } from 'vue';
import { useRouter } from 'vue-router';
import LoginFormModel from '@/models/LoginFormModel';
import type UserData from '@/types/UserDataType';
import { type AuthStore, type SignInResult } from '@/stores/AuthStore';

const router = useRouter();
const authStore = inject('authStore') as AuthStore;
const emit = defineEmits(['error']);

const submitLogin = async (userData: UserData) => {
  const { successMessage, errorMessage } = await authStore.signIn(userData) as SignInResult;
  if (successMessage) {
    router.push({ name: 'dashboard' });
    return;
  }
  form.value.idle();
  emit('error', errorMessage);
}

const form = ref(new LoginFormModel());
form.value.onSubmit(submitLogin);

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