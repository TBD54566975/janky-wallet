<script setup>
import { onMounted } from 'vue';
import { Messenger } from '../../lib/messenger';

const messenger = new Messenger();

onMounted(async () => {
  const registrationInfo = await messenger.sendMessage({ cmd: 'GET_USER_CONSENT_TASK' });

  // const personas = await messenger.sendMessage({ op: 'GET_PERSONAS', id: Date.now() });
  // console.log(personas);
});


</script>

<template>
  DID Registration
</template>