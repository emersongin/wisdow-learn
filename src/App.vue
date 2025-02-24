<script setup lang="ts">
  import DefaultLayout from '@/layouts/DefaultLayout.vue';
</script>

<template>
  <div data-theme="light">
    <DefaultLayout>
      <router-view></router-view>
    </DefaultLayout>
  </div>
</template>

<style>
  @media (prefers-color-scheme: light) {
    body {
      background-color: #fff;
      color: #000;
    }
  }
  body {
    background-color: #fff;
    color: #000;
  }
</style>