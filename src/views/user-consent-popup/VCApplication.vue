<script setup>
import { ref } from 'vue';

const loading = ref(true);
</script>

<template>
  <div v-if="loading" class="flex h-screen items-center justify-center">
    <font-awesome-icon icon="fa-solid fa-spinner" class="h-24 w-24" spin />
  </div>
</template>