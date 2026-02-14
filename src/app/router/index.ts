import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const PlaceholderView = () => import('@/app/views/PlaceholderView.vue')

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/app/layout/AppLayout.vue'),
    children: [
      {
        path: '',
        name: 'dashboard',
        component: () => import('@/app/views/DashboardView.vue'),
        meta: { title: 'Dashboard' },
      },

      // Forms
      {
        path: 'forms/simple',
        name: 'forms-simple',
        component: PlaceholderView,
        meta: { title: 'Formulaire simple' },
      },
      {
        path: 'forms/multi-step',
        name: 'forms-multi-step',
        component: PlaceholderView,
        meta: { title: 'Formulaire multi-étapes' },
      },

      // Data Display
      {
        path: 'data/table-library',
        name: 'data-table-library',
        component: PlaceholderView,
        meta: { title: 'Table (librairie PrimeVue)' },
      },
      {
        path: 'data/table-custom',
        name: 'data-table-custom',
        component: PlaceholderView,
        meta: { title: 'Table (custom)' },
      },

      // API & Data
      {
        path: 'api/rest',
        name: 'api-rest',
        component: PlaceholderView,
        meta: { title: 'API REST Demo' },
      },
      {
        path: 'api/realtime',
        name: 'api-realtime',
        component: PlaceholderView,
        meta: { title: 'Temps réel (WebSocket/SSE)' },
      },

      // State Management
      {
        path: 'state/pinia',
        name: 'state-pinia',
        component: PlaceholderView,
        meta: { title: 'Pinia Demo' },
      },

      // Auth
      {
        path: 'auth/login',
        name: 'auth-login',
        component: PlaceholderView,
        meta: { title: 'Login' },
      },
      {
        path: 'auth/protected',
        name: 'auth-protected',
        component: PlaceholderView,
        meta: { title: 'Page protégée', requiresAuth: true },
      },

      // Styling
      {
        path: 'styling/showcase',
        name: 'styling-showcase',
        component: PlaceholderView,
        meta: { title: 'Styling Showcase' },
      },

      // i18n
      {
        path: 'i18n/demo',
        name: 'i18n-demo',
        component: PlaceholderView,
        meta: { title: 'Internationalisation' },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Auth guard placeholder — will be implemented in Epic 5
router.beforeEach((to) => {
  if (to.meta.requiresAuth) {
    // TODO: Check auth store for token
    // const authStore = useAuthStore()
    // if (!authStore.isAuthenticated) return { name: 'auth-login' }
  }
})

export default router
