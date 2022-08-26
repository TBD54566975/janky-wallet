<template>
  <div class="font-tbd min-h-full w-96">
    <Disclosure as="nav" class="bg-tbd-yellow border-b border-gray-200" v-slot="{ open }">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <img class="block lg:hidden h-10 w-10" src="/tbd-logo-light.svg" alt="TBD Logo" />
              <img class="hidden lg:block h-10 w-10" src="/tbd-logo-light.svg" alt="TBD Logo" />
            </div>
            <div class="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
              <a v-for="item in navigation" :key="item.name" :href="item.href"
                :class="[item.current ? 'border-indigo-500 text-gray-900' : 'border-transparent hover:border-yellow-500', 'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium']"
                :aria-current="item.current ? 'page' : undefined">
                {{ item.name }}
              </a>
            </div>
          </div>
          <p class="inline-flex items-center justify-center text-xl">Wallet</p>
          <div class="-mr-2 flex items-center sm:hidden">
            <!-- Mobile menu button -->
            <DisclosureButton
              class="bg-tbd-yellow inline-flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2">
              <span class="sr-only">Open main menu</span>
              <MenuIcon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
              <XIcon v-else class="block h-6 w-6" aria-hidden="true" />
            </DisclosureButton>
          </div>
        </div>
      </div>

      <DisclosurePanel class="sm:hidden">
        <div class="pt-2 pb-3 space-y-1">
          <DisclosureButton v-for="item in navigation" :key="item.name" as="a" :href="item.href"
            :class="[item.current ? 'bg-yellow-500 border-indigo-500' : 'border-transparent hover:bg-yellow-500 hover:border-indigo-500', 'block pl-3 pr-4 py-2 border-l-4 text-base font-medium']"
            :aria-current="item.current ? 'page' : undefined">
            {{ item.name }}
          </DisclosureButton>
        </div>
      </DisclosurePanel>
    </Disclosure>

    <div class="py-10">
      <header>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 class="text-3xl font-bold leading-tight text-gray-900">Janktopia</h1>
          <!-- <h1 class="text-3xl font-bold leading-tight text-gray-900">{{vc}}</h1> -->
        </div>
      </header>
      <main>
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <!-- Replace with your content -->
          <div class="px-4 py-8 sm:px-0">

            <div class="border-4 border-dashed border-gray-200 rounded-lg h-72" >
              <p>Subject: {{subjectId}}</p>
              <br/>
              <p>Issuer: {{issuer}}</p>
              <br/>
              <p>License Number: {{licensenumber}}</p> 
              <br/>
              <p>Proof: {{jwsProof}}</p>
            </div>

          </div>
          <!-- /End replace -->
        </div>
        <button v-on:click="applyForDl();" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Apply for Driver's License</button>
      </main>
    </div>
  </div>
</template>

<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { MenuIcon, XIcon } from '@heroicons/vue/outline'
import { reactive, ref } from 'vue'

let vc = reactive(ref(''))
let subjectId = reactive(ref(''))
let issuer = reactive(ref(''))
let licensenumber = reactive(ref(''))
let jwsProof = reactive(ref(''))

function applyForDl() {

  // TODO: Allow for cors
  fetch('http://localhost:8080/v1/credentials?issuer=&schema=&subject=vc-did:key:z6Mksqn5HLWNNau6humKzsvNLHDbErez867gYtPHbN3b269y')
    .then(res => res.json())
    .then(json => {
        this.vc = json
        const vcObject = JSON.parse(this.vc)
        this.subjectId = vcObject.Credentials[0].credentialSubject.id
        this.issuer = vcObject.Credentials[0].issuer
        this.licensenumber = vcObject.Credentials[0].credentialSubject.licensenumber
        this.jwsProof = vcObject.Credentials[0].proof.jws
    })

  // this.vc = "{\"Credentials\":[{\"@context\":[\"https://www.w3.org/2018/credentials/v1\"],\"id\":\"c1610248-d6ac-4179-909c-6d1c97f1d726\",\"type\":[\"VerifiableCredential\"],\"issuer\":\"did:key:z6MkhVK1HsMZfxYsRkoSuv3wt7nYnknTWx51pVpZt9K17Ffy\",\"issuanceDate\":\"2022-08-20T19:23:24Z\",\"credentialSubject\":{\"birthdate\":\"1975-01-01\",\"id\":\"did:key:z6Mksqn5HLWNNau6humKzsvNLHDbErez867gYtPHbN3b269y\",\"licensenumber\":123456},\"proof\":{\"challenge\":\"123\",\"created\":\"2022-03-08T23:35:52.906Z\",\"jws\":\"eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJjcmVkZW50aWFsIjp7IkBjb250ZXh0IjpbImh0dHBzOi8vd3d3LnczLm9yZy8yMDE4L2NyZWRlbnRpYWxzL3YxIl0sImlkIjoiYzE2MTAyNDgtZDZhYy00MTc5LTkwOWMtNmQxYzk3ZjFkNzI2IiwidHlwZSI6WyJWZXJpZmlhYmxlQ3JlZGVudGlhbCJdLCJpc3N1ZXIiOiJkaWQ6a2V5Ono2TWtoVksxSHNNWmZ4WXNSa29TdXYzd3Q3bllua25UV3g1MXBWcFp0OUsxN0ZmeSIsImlzc3VhbmNlRGF0ZSI6IjIwMjItMDgtMjBUMTk6MjM6MjRaIiwiY3JlZGVudGlhbFN1YmplY3QiOnsiYmlydGhkYXRlIjoiMTk3NS0wMS0wMSIsImlkIjoiZGlkOmtleTp6Nk1rc3FuNUhMV05OYXU2aHVtS3pzdk5MSERiRXJlejg2N2dZdFBIYk4zYjI2OXkiLCJsaWNlbnNlbnVtYmVyIjoxMjM0NTZ9fSwiaXNzIjoiZGlkOmtleTp6Nk1raFZLMUhzTVpmeFlzUmtvU3V2M3d0N25ZbmtuVFd4NTFwVnBadDlLMTdGZnkiLCJqdGkiOiJjMTYxMDI0OC1kNmFjLTQxNzktOTA5Yy02ZDFjOTdmMWQ3MjYiLCJuYmYiOjE2NjEwMjM0MDQsInN1YiI6ImRpZDprZXk6ejZNa3NxbjVITFdOTmF1Nmh1bUt6c3ZOTEhEYkVyZXo4NjdnWXRQSGJOM2IyNjl5In0.xIE2t4hup9JNozPeBHZQuC2SQit4DlAXaFox7D8Wf1frEQUOektZioFIv_8kI4RCG1trHDQk8AyWbj3q6X9BAA\",\"proofPurpose\":\"authentication\",\"type\":\"JsonWebSignature2020\",\"verificationMethod\":\"did:example:123#key-0\"}}]}"

  // const vcObject = JSON.parse(this.vc)
  // this.subjectId = vcObject.Credentials[0].credentialSubject.id
  // this.issuer = vcObject.Credentials[0].issuer
  // this.licensenumber = vcObject.Credentials[0].credentialSubject.licensenumber
  // this.jwsProof = vcObject.Credentials[0].proof.jws
}


const navigation = [
  { name: 'Home', href: '#', current: true },
  { name: 'Contacts', href: '#', current: false },
  { name: 'Personas', href: '#', current: false },
];

</script>