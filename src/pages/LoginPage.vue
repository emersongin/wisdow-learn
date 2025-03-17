<script setup lang="ts">
import LoginForm from '@/components/LoginForm.vue';

const error = (erroMessage: string) => {
  console.log(err);
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
          <LoginForm @error="error"></LoginForm>
        </div>
      </div>
    </div> 
  </section>
</template>
