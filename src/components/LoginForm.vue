<script setup lang="ts">
  import { ref } from 'vue';
  import LoginForm, { LoginFormStatus } from '@/models/LoginFormModel';
  import type UserData from '@/types/UserDataType';

  const errorMsg = ref<string>('');
  const emit = defineEmits(['error']);
  const props = defineProps<{
    submit: (userData: UserData) => void;
  }>();

  const form = ref(new LoginForm());
  form.value.onSubmit(async (userData: UserData) => {
    try {
      await props.submit(userData);
    } catch (error) {
      form.value.error();
      errorMsg.value = error.message;
      emit('error', errorMsg.value);
    }
  });

  const clickSubmit = async (event: Event) => {
    try {
      event.preventDefault();
      form.value.loading();
      form.value.submit();
    } catch (err) {
      errorMsg.value = err.message;
      emit('error', errorMsg.value);
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
          :class="`input ${form.status === LoginFormStatus.Error && errorMsg == 'Username not found' ? 'is-danger' : ''}`" 
          :disabled="form.status === LoginFormStatus.Loading"
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
          :class="`input ${form.status === LoginFormStatus.Error && errorMsg == 'Password not found' ? 'is-danger' : ''}`"
          :disabled="form.status === LoginFormStatus.Loading"
          >
        </input>
      </p>
    </div>
    <div class="field mt-6">
      <p class="control">
        <button 
          type="submit" 
          :class="`button is-link has-background-primary is-responsive is-fullwidth is-rounded ${form.status === LoginFormStatus.Loading ? 'is-loading' : 'is-normal'}`">
          Sign In
        </button>
      </p>
    </div>
  </form>
</template>