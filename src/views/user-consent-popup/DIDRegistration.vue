<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { Messenger } from '../../lib/messenger';

const messenger = new Messenger();
const route = useRoute();

onMounted(async () => {
  const registrationInfo = await messenger.sendMessage({ cmd: 'GET_REGISTRATION_INFO', data: { id: route.params.messageId } });
  console.log('reg info', registrationInfo);

  // const personas = await messenger.sendMessage({ op: 'GET_PERSONAS', id: Date.now() });
  // console.log(personas);
});


</script>

<template>
  DID Registration
</template>