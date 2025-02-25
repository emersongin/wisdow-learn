<script setup lang="ts">
  import { ref } from 'vue';
  import LoginForm, { type LoginFormData } from '@/models/LoginForm';

  const emit = defineEmits(['submit']);

  const form = ref(new LoginForm());
  form.value.onSubmit((formData: LoginFormData) => {
    emit('submit', formData);
  });

  const submit = async (event: Event) => {
    event.preventDefault();
    form.value.submit();
  }
</script>

<template>
  <form action="#" method="post" @submit="submit">
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