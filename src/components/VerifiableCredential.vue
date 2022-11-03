<script setup>
defineProps({
  credential: {
    type     : Object,
    required : true
  }
});
</script>

<template>
  <div class="border-gray-700 flex flex-col rounded-lg shadow-xl">
    <div class="flex h-48 p-6 space-x-6 w-full">
      <div class="text-xl">
        Digital Identity Card
      </div>
      <div>
        <img src="/qr-code.png">
      </div>
    </div>
  </div>
</template>