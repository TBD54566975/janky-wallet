<script setup>
import { onMounted, ref } from 'vue';
import { JSONEditor } from '@json-editor/json-editor';
import { JSONPath } from '@astronautlabs/jsonpath';

import { FormTheme } from '../../form-theme';
import { Messenger } from '../../lib/messenger';

// inject custom theme
JSONEditor.defaults.themes.form = FormTheme;

const formContainer = ref();
const loading = ref(true);
const messenger = new Messenger();

let jsonSchemaForm;
let propertyPathMap;

function parseApplicationDetails(applicationDetails) {
  const pathMap = new Map();
  const jsonSchema = {
    '$schema'              : 'http://json-schema.org/draft-04/schema#',
    'description'          : 'TODO: DESCRIPTION',
    'title'                : 'TODO: TITLE',
    'type'                 : 'object',
    'properties'           : {},
    'additionalProperties' : false
  };
  
  for (let id in applicationDetails.byId) {
    const idRequirements = applicationDetails.byId[id];
    for (let field of idRequirements.descriptor.constraints.fields) {
      // TODO: find deterministic property name. using id for now
      const { id, filter, path } = field;
      jsonSchema.properties[id] = {
        title: 'TODO: FIELD NAME',
        ...filter 
      };

      pathMap.set(id, path[0]);
    }
  }

  return { jsonSchema, pathMap };
}

onMounted(async () => {
  const applicationDetails = await messenger.sendMessage({ cmd: 'GET_USER_CONSENT_TASK' });
  
  const { jsonSchema, pathMap } = parseApplicationDetails(applicationDetails);
  propertyPathMap = pathMap;

  loading.value = false;
  
  jsonSchemaForm = new JSONEditor(formContainer.value, { 
    disable_collapse   : true, 
    disable_properties : true, 
    disable_edit_json  : true, 
    iconlib            : 'fontawesome5',
    schema             : jsonSchema, 
    theme              : 'form' 
  });
  
});

function handleSubmit(_) {
  const vc = {};
  const formSubmission = jsonSchemaForm.getValue();
  
  for (let property in formSubmission) {
    const path = propertyPathMap.get(property);
    JSONPath.value(vc, path, formSubmission[property]);
  }

  console.log(vc);
}
</script>

<template>
  <div v-if="loading" class="flex h-screen items-center justify-center">
    <font-awesome-icon icon="fa-solid fa-spinner" class="h-24 w-24" spin />
  </div>
  <div class="flex flex-col">
    <div>
      <form @submit.prevent="handleSubmit">
        <div ref="formContainer" />
        <button type="submit" class="bg-tbd-yellow border border-transparent flex focus:outline-none focus:ring-2 focus:ring-offset-2 hover:bg-tbd-yellower justify-center mt-8 px-4 py-4 rounded-md shadow-sm text-black text-lg">
          Submit
        </button>
      </form>
    </div>
  </div>
</template>