import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/index.html',
    name: 'Popup',
    component: () => import('../views/Popup.vue')
  },
  {
    path: '/did-registration',
    name: 'DIDRegistrationPopup',
    component: () => import('../views/DIDRegistrationPopup.vue')
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;