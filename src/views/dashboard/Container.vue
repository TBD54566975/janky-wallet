<script setup>
  import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue';
  import { MenuAlt2Icon, XIcon } from '@heroicons/vue/outline';
  import { useRoute } from 'vue-router';
  import { onMounted, ref } from 'vue';
  
  const items = [
    { name: 'Dashboard', href: '/dashboard', icon: ['fa-solid', 'fa-house'], current: true },
    { name: 'Personas', href: '/dashboard/personas', icon: ['fa-solid', 'fa-address-book'], current: false },
    { name: 'Settings', href: '/dashboard/settings', icon: ['fa-solid', 'fa-gear'], current: false },
  ];
  
  const loading = ref(false);
  const sidebarOpen = ref(false);
  
  const route = useRoute();
  
  onMounted(() => {
  });
  
  </script>
  
<template>
  <!-- Loading Spinner -->
  <div v-if="loading" class="flex h-screen items-center justify-center">
    <font-awesome-icon icon="fa-solid fa-spinner" class="h-32 w-32" spin />
  </div>
  
  <!-- Home -->
  <div v-else class="font-tbd">
    <!-- Mobile Sidebar -->
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog as="div" class="md:hidden relative z-40" @close="sidebarOpen = false">
        <TransitionChild
          as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0"
          enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100"
          leave-to="opacity-0">
          <div class="bg-gray-600 bg-opacity-75 fixed inset-0" />
        </TransitionChild>
  
        <div class="fixed flex inset-0 z-40">
          <TransitionChild
            as="template" enter="transition ease-in-out duration-300 transform"
            enter-from="-translate-x-full" enter-to="translate-x-0"
            leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0"
            leave-to="-translate-x-full">
            <DialogPanel class="bg-tbd-yellow flex flex-1 flex-col max-w-xs pb-4 pt-5 relative w-full">
              <TransitionChild
                as="template" enter="ease-in-out duration-300" enter-from="opacity-0"
                enter-to="opacity-100" leave="ease-in-out duration-300" leave-from="opacity-100" leave-to="opacity-0">
                <div class="-mr-12 absolute pt-2 right-0 top-0">
                  <button
                    type="button"
                    class="flex focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white h-10 items-center justify-center ml-1 rounded-full w-10"
                    @click="sidebarOpen = false">
                    <span class="sr-only">Close sidebar</span>
                    <XIcon class="h-6 text-white w-6" aria-hidden="true" />
                  </button>
                </div>
              </TransitionChild>
              <div class="flex flex-shrink-0 gap-x-2 items-center px-4">
                <img class="h-8 w-auto" src="/tbd-logo-light.svg" alt="TBD Logo">
                <span class="font-tbd text-xl">Janky Wallet</span>
              </div>
              <div class="flex-1 h-0 mt-5 overflow-y-auto">
                <nav class="px-2 space-y-1">
                  <router-link
                    v-for="item in items" :key="item.name" :to="item.href"
                    :class="[route.name === item.name ? 'bg-yellow-400' : ' hover:bg-yellow-400', 'group flex items-center px-2 py-2 text-sm font-medium rounded-md']">
                    <font-awesome-icon class="flex-shrink-0 h-6 mr-3 w-6" :icon="item.icon" />
                    {{ item.name }}
                  </router-link>
                </nav>
              </div>
            </DialogPanel>
          </TransitionChild>
          <div class="flex-shrink-0 w-14" aria-hidden="true">
            <!-- Dummy element to force sidebar to shrink to fit close icon -->
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  
    <!-- Desktop Sidebar -->
    <div class="hidden md:fixed md:flex md:flex-col md:inset-y-0 md:w-64">
      <div class="bg-tbd-yellow flex flex-1 flex-col min-h-0">
        <div class="flex flex-shrink-0 h-16 items-center px-4">
          <img class="h-12 w-auto" src="/tbd-logo-light.svg" alt="TBD Logo">
          <span class="text-xl">Janky Wallet</span>
        </div>
        <div class="flex flex-1 flex-col overflow-y-auto">
          <nav class="flex-1 px-2 py-4 space-y-1">
            <router-link
              v-for="item in items" :key="item.name" :to="item.href"
              :class="[route.name === item.name ? 'bg-yellow-400' : ' hover:bg-yellow-400', 'group flex items-center px-2 py-2 text-sm font-medium rounded-md']">
              <font-awesome-icon class="flex-shrink-0 h-6 mr-3 w-6" :icon="item.icon" />
              {{ item.name }}
            </router-link>
          </nav>
        </div>
      </div>
    </div>
  
    <!-- Content Container -->
    <div class="flex flex-col md:pl-64">
      <div class="bg-white flex flex-shrink-0 h-16 sticky top-0 z-10">
        <button
          type="button"
          class="border-b-2 border-cyan-800 border-dashed border-r focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-inset md:hidden px-4 text-gray-500"
          @click="sidebarOpen = true">
          <span class="sr-only">Open sidebar</span>
          <MenuAlt2Icon class="h-6 w-6" aria-hidden="true" />
        </button>
        <div class="border-b-2 border-cyan-800 border-dashed flex flex-1 justify-between px-4">
          Hehe
        </div>
      </div>
      <!-- Main Content Area -->
      <main class="flex-1">
        <div class="py-6">
          <div class="max-w-7xl md:px-8 mx-auto px-4 sm:px-6">
            <div class="py-4">
              <router-view v-slot="{ Component }">
                <template v-if="Component">
                  <Suspense>
                    <component :is="Component" />
                    <template #fallback>
                      <div class="flex h-screen items-center justify-center">
                        <font-awesome-icon icon="fa-solid fa-spinner" class="h-32 w-32" spin />
                      </div>
                    </template>
                  </Suspense>
                </template>
              </router-view>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>