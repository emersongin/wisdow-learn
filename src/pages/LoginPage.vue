<script setup lang="ts">
import { ref } from 'vue';
import LoginForm from '@/components/LoginForm.vue';

const isModalActive = ref<boolean>(false);
const modalContent = ref<string>('Mensagem de erro padrão.');

const catchError = (erroMessage: string) => {
  modalContent.value = erroMessage;
  isModalActive.value = true;
}
const closeModal = () => {
  modalContent.value = '';
  isModalActive.value = false;
}
</script>

<template>
  <section class="hero columns is-fullheight">
    
    <div :class="`modal ${isModalActive ? 'is-active' : ''}`">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Alert</p>
          <button id="close-button" class="delete" aria-label="close" @click="closeModal"></button>
        </header>
        <section class="modal-card-body">
          {{ modalContent }}
        </section>
        <footer class="modal-card-foot">
          <div class="buttons is-flex is-right is-justify-content-flex-end">
            <button id="ok-button" class="button is-success" @click="closeModal">Ok</button>
          </div>
        </footer>
      </div>
    </div>

    <div class="section is-fullheight columns column p-0">
      <div class="column is-two-thirds" style="background: url('/images/mainentrace.jpg') no-repeat center center; background-size: cover;">
        <!-- cover image -->
      </div>
      <div class="column is-flex is-align-items-center mx-5">
        <div class="box is-flex-grow-1 p-5">
          <LoginForm id="login-form" @error="catchError"></LoginForm>
        </div>
      </div>
    </div> 
  </section>
</template>
