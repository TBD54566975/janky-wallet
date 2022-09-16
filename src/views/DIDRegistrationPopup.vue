<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { Messenger } from '../lib/messenger';

const messenger = new Messenger();
const route = useRoute();

onMounted(async () => {
  const registrationInfo = await messenger.sendMessage({ op: 'GET_REGISTRATION_INFO', data: { id: route.params.messageId } });
  console.log('reg info', registrationInfo);

  // const personas = await messenger.sendMessage({ op: 'GET_PERSONAS', id: Date.now() });
  // console.log(personas);
});


</script>

<template>
  <div class="md:flex md:items-center md:justify-between">
    <div class="min-w-0 flex-1">
      <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Back End
        Developer</h2>
    </div>
  </div>
</template>