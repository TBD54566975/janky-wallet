<script setup>
  import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
  import { MenuIcon, XIcon } from '@heroicons/vue/outline';
  
  const navigation = [
    { name: 'Home', href: '#', current: true },
    { name: 'Contacts', href: '#', current: false },
    { name: 'Personas', href: '#', current: false },
  ];
  </script>

<template>
  <div class="font-tbd min-h-full w-96">
    <Disclosure as="nav" class="bg-tbd-yellow border-b border-gray-200" v-slot="{ open }">
      <div class="lg:px-8 max-w-7xl mx-auto px-4 sm:px-6">
        <div class="flex h-16 justify-between">
          <div class="flex">
            <div class="flex flex-shrink-0 items-center">
              <img class="block h-10 lg:hidden w-10" src="/tbd-logo-light.svg" alt="TBD Logo">
              <img class="h-10 hidden lg:block w-10" src="/tbd-logo-light.svg" alt="TBD Logo">
            </div>
            <div class="hidden sm:-my-px sm:flex sm:ml-6 sm:space-x-8">
              <a
                v-for="item in navigation" :key="item.name" :href="item.href"
                :class="[item.current ? 'border-indigo-500 text-gray-900' : 'border-transparent hover:border-yellow-500', 'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium']"
                :aria-current="item.current ? 'page' : undefined">
                {{ item.name }}
              </a>
            </div>
          </div>
          <p class="inline-flex items-center justify-center text-xl">
            Wallet
          </p>
          <div class="-mr-2 flex items-center sm:hidden">
            <!-- Mobile menu button -->
            <DisclosureButton
              class="bg-tbd-yellow focus:outline-none focus:ring-2 focus:ring-offset-2 inline-flex items-center justify-center p-2 rounded-md">
              <span class="sr-only">Open main menu</span>
              <MenuIcon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
              <XIcon v-else class="block h-6 w-6" aria-hidden="true" />
            </DisclosureButton>
          </div>
        </div>
      </div>

      <DisclosurePanel class="sm:hidden">
        <div class="pb-3 pt-2 space-y-1">
          <DisclosureButton
            v-for="item in navigation" :key="item.name" as="a" :href="item.href"
            :class="[item.current ? 'bg-yellow-500 border-indigo-500' : 'border-transparent hover:bg-yellow-500 hover:border-indigo-500', 'block pl-3 pr-4 py-2 border-l-4 text-base font-medium']"
            :aria-current="item.current ? 'page' : undefined">
            {{ item.name }}
          </DisclosureButton>
        </div>
      </DisclosurePanel>
    </Disclosure>

    <div class="py-10">
      <header>
        <div class="lg:px-8 max-w-7xl mx-auto px-4 sm:px-6">
          <h1 class="font-bold leading-tight text-3xl text-gray-900">
            Janktopia
          </h1>
        </div>
      </header>
      <main>
        <div class="lg:px-8 max-w-7xl mx-auto sm:px-6">
          <!-- Replace with your content -->
          <div class="px-4 py-8 sm:px-0">
            CONTENT HERE
          </div>
          <!-- /End replace -->
        </div>
      </main>
    </div>
  </div>
</template>