<script setup lang="ts">
import { useRoute } from 'vue-router'

interface MenuItem {
  label: string
  icon: string
  to?: string
  children?: { label: string; to: string }[]
}

const route = useRoute()

const menuItems: MenuItem[] = [
  {
    label: 'Dashboard',
    icon: '🏠',
    to: '/',
  },
  {
    label: 'Formulaires',
    icon: '📝',
    children: [
      { label: 'Formulaire simple', to: '/forms/simple' },
      { label: 'Multi-étapes', to: '/forms/multi-step' },
    ],
  },
  {
    label: 'Data Display',
    icon: '📊',
    children: [
      { label: 'Table (librairie)', to: '/data/table-library' },
      { label: 'Table (custom)', to: '/data/table-custom' },
    ],
  },
  {
    label: 'API & Data',
    icon: '🔌',
    children: [
      { label: 'REST Demo', to: '/api/rest' },
      { label: 'Temps réel', to: '/api/realtime' },
    ],
  },
  {
    label: 'State Management',
    icon: '🗄️',
    children: [{ label: 'Pinia Demo', to: '/state/pinia' }],
  },
  {
    label: 'Authentification',
    icon: '🔐',
    children: [
      { label: 'Login', to: '/auth/login' },
      { label: 'Page protégée', to: '/auth/protected' },
    ],
  },
  {
    label: 'Styling',
    icon: '🎨',
    children: [{ label: 'Showcase', to: '/styling/showcase' }],
  },
  {
    label: 'i18n',
    icon: '🌍',
    children: [{ label: 'Demo', to: '/i18n/demo' }],
  },
]

function isActive(item: MenuItem): boolean {
  if (item.to) {
    return route.path === item.to
  }
  if (item.children) {
    return item.children.some((child) => route.path.startsWith(child.to))
  }
  return false
}
</script>

<template>
  <aside class="app-sidebar">
    <div class="app-sidebar__brand">
      <h1 class="app-sidebar__title">VueProof</h1>
      <span class="app-sidebar__subtitle">Vue 3 Showcase</span>
    </div>

    <nav class="app-sidebar__nav">
      <template v-for="item in menuItems" :key="item.label">
        <!-- Direct link (Dashboard) -->
        <RouterLink
          v-if="item.to"
          :to="item.to"
          class="app-sidebar__item"
          :class="{ 'app-sidebar__item--active': isActive(item) }"
        >
          <span class="app-sidebar__icon">{{ item.icon }}</span>
          <span class="app-sidebar__label">{{ item.label }}</span>
        </RouterLink>

        <!-- Category with children -->
        <div v-else class="app-sidebar__category">
          <div
            class="app-sidebar__item app-sidebar__item--category"
            :class="{ 'app-sidebar__item--active': isActive(item) }"
          >
            <span class="app-sidebar__icon">{{ item.icon }}</span>
            <span class="app-sidebar__label">{{ item.label }}</span>
          </div>
          <div class="app-sidebar__children">
            <RouterLink
              v-for="child in item.children"
              :key="child.to"
              :to="child.to"
              class="app-sidebar__child"
              :class="{ 'app-sidebar__child--active': route.path === child.to }"
            >
              {{ child.label }}
            </RouterLink>
          </div>
        </div>
      </template>
    </nav>
  </aside>
</template>

<style scoped>
.app-sidebar {
  width: 260px;
  min-height: 100vh;
  background-color: var(--p-surface-900, #1e1e2e);
  color: var(--p-surface-0, #ffffff);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.app-sidebar__brand {
  padding: 1.5rem;
  border-bottom: 1px solid var(--p-surface-700, #3a3a4a);
}

.app-sidebar__title {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
}

.app-sidebar__subtitle {
  font-size: 0.75rem;
  opacity: 0.7;
}

.app-sidebar__nav {
  flex: 1;
  padding: 0.5rem 0;
}

.app-sidebar__item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.625rem 1.5rem;
  text-decoration: none;
  color: var(--p-surface-300, #b0b0c0);
  transition: background-color 0.2s, color 0.2s;
  cursor: pointer;
}

.app-sidebar__item:hover {
  background-color: var(--p-surface-800, #2a2a3a);
  color: var(--p-surface-0, #ffffff);
}

.app-sidebar__item--active {
  background-color: var(--p-primary-color, #6366f1);
  color: var(--p-surface-0, #ffffff);
}

.app-sidebar__item--category {
  cursor: default;
  font-weight: 600;
  margin-top: 0.5rem;
}

.app-sidebar__icon {
  font-size: 1.1rem;
  width: 1.5rem;
  text-align: center;
}

.app-sidebar__label {
  font-size: 0.875rem;
}

.app-sidebar__children {
  padding-left: 1rem;
}

.app-sidebar__child {
  display: block;
  padding: 0.375rem 1.5rem 0.375rem 3.25rem;
  text-decoration: none;
  color: var(--p-surface-400, #9090a0);
  font-size: 0.8125rem;
  transition: background-color 0.2s, color 0.2s;
}

.app-sidebar__child:hover {
  background-color: var(--p-surface-800, #2a2a3a);
  color: var(--p-surface-0, #ffffff);
}

.app-sidebar__child--active {
  color: var(--p-primary-color, #6366f1);
  font-weight: 600;
}
</style>
