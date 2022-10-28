import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path      : '/dashboard',
    name      : 'Dashboard',
    component : () => import('../views/dashboard/Container.vue'),
    children  : [
      {
        path      : 'personas',
        component : () => import('../views/dashboard/Personas.vue'),
      },
      {
        path      : 'settings',
        component : () => import('../views/dashboard/Settings.vue'),
      },
    ]
  },
  {
    path      : '/user-consent',
    component : () => import('../views/user-consent-popup/Container.vue'),
    children  : [
      {
        path      : 'did-registration',
        component : () => import('../views/user-consent-popup/DIDRegistration.vue'),
      },
      {
        path      : 'vc-application',
        component : () => import('../views/user-consent-popup/VCApplication.vue'),
      },
    ]
  },
  {
    path      : '/index.html',
    name      : 'Popup',
    component : () => import('../views/Popup.vue')
  },
];

const router = createRouter({ history: createWebHistory(), routes });

export default router;