<script setup>
import { onMounted, ref } from 'vue';
import { JSONEditor } from '@json-editor/json-editor';

import { FormTheme } from '../../form-theme';
import { Messenger } from '../../lib/messenger';

// inject custom theme
JSONEditor.defaults.themes.form = FormTheme;

const formContainer = ref();
const loading = ref(true);
const messenger = new Messenger();

onMounted(async () => {
  const applicationDetails = await messenger.sendMessage({ cmd: 'GET_USER_CONSENT_TASK' });
  console.log(applicationDetails);
  
  loading.value = false;

  // TODO: generate json schema using cred manifest
  
  // const editor = new JSONEditor(formContainer.value, { 
  //   disable_collapse   : true, 
  //   disable_properties : true, 
  //   disable_edit_json  : true, 
  //   iconlib            : 'fontawesome5',
  //   schema             : schema, 
  //   theme              : 'form' 
  // });
  
});
</script>

<template>
  <div v-if="loading" class="flex h-screen items-center justify-center">
    <font-awesome-icon icon="fa-solid fa-spinner" class="h-24 w-24" spin />
  </div>
  <div v-else>
    <div ref="formContainer" />
  </div>
</template>