<script setup>
import VerifiableCredential from '../../components/VerifiableCredential.vue';

async function handleShare() {
  await chrome.runtime.sendMessage({ cmd: 'VC_GENERATE_VP', data: {} });
  window.close();
}
</script>

<template>
  <div class="mt-4 mx-4">
    <p class="text-lg">
      TBD is requesting proof of your First name, Last name, and Zip Code. This can be done by sharing:
    </p>
    <VerifiableCredential :credential="{}" />
    <div class="flex gap-x-4 mt-8">
      <button
        type="button" @click.prevent="handleShare" class="bg-green-600 border-transparent flex focus:outline-none focus:ring-2 focus:ring-offset-2 hover:bg-tbd-yellower justify-center px-4 py-4 rounded-md shadow-sm text-black text-lg w-full">
        Share
      </button>
      <button
        type="button" class="bg-red-600 border-transparent flex focus:outline-none focus:ring-2 focus:ring-offset-2 hover:bg-tbd-yellower justify-center px-4 py-4 rounded-md shadow-sm text-black text-lg w-full">
        Decline
      </button>
    </div>
  </div>
</template>