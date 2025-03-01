<script setup lang="ts">
  import { ref } from 'vue';
  import LoginForm from '@/models/LoginFormModel';
  import { type UserData, LoginFormStatus } from '@/enums/LoginFormStatus';

  const emit = defineEmits(['submit']);

  const form = ref(new LoginForm());
  form.value.onSubmit((userData: UserData) => {
    emit('submit', userData);
  });

  const submit = async (event: Event) => {
    event.preventDefault();
    form.value.loading();
    form.value.submit();
  }
</script>

<template>
  <form action="#" method="post" @submit="submit">
    <div class="field">
      <label class="label has-text-black-ter">Username</label>
      <p class="control">
        <input class="input" type="text" placeholder="Enter your username" v-model="form.username">
        </input>
      </p>
    </div>
    <div class="field mt-3">
      <label class="label has-text-black-ter">Password</label>
      <p class="control">
        <input class="input" type="password" placeholder="Provide your password" v-model="form.password">
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