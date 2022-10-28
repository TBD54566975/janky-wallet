<script setup>
import { onMounted, ref } from 'vue';
import { Messenger } from '../../lib/messenger';

const loading = ref(true);
const messenger = new Messenger();

onMounted(async () => {
  const applicationDetails = await messenger.sendMessage({ cmd: 'GET_USER_CONSENT_TASK' });
  console.log(applicationDetails);
  loading.value = false;
});
</script>

<template>
  <div v-if="loading" class="flex h-screen items-center justify-center">
    <font-awesome-icon icon="fa-solid fa-spinner" class="h-24 w-24" spin />
  </div>
</template>