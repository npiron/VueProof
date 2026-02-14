<script setup lang="ts">
const modules = [
  {
    category: 'Formulaires',
    icon: '📝',
    items: [
      { label: 'Formulaire simple', to: '/forms/simple', desc: 'Validation avec VeeValidate + Zod' },
      { label: 'Multi-étapes', to: '/forms/multi-step', desc: 'Formulaire à progression avec rétention' },
    ],
  },
  {
    category: 'Data Display',
    icon: '📊',
    items: [
      { label: 'Table (librairie)', to: '/data/table-library', desc: 'PrimeVue DataTable avec pagination/tri/filtre' },
      { label: 'Table (custom)', to: '/data/table-custom', desc: 'Table construite from scratch' },
    ],
  },
  {
    category: 'API & Data',
    icon: '🔌',
    items: [
      { label: 'REST Demo', to: '/api/rest', desc: 'Appels API avec loading/error/retry' },
      { label: 'Temps réel', to: '/api/realtime', desc: 'WebSocket/SSE avec indicateur connecté' },
    ],
  },
  {
    category: 'State Management',
    icon: '🗄️',
    items: [{ label: 'Pinia Demo', to: '/state/pinia', desc: 'Store partagé avec persistence' }],
  },
  {
    category: 'Authentification',
    icon: '🔐',
    items: [
      { label: 'Login', to: '/auth/login', desc: 'Interface de connexion fake' },
      { label: 'Page protégée', to: '/auth/protected', desc: 'Route avec guard' },
    ],
  },
  {
    category: 'Styling',
    icon: '🎨',
    items: [{ label: 'Showcase', to: '/styling/showcase', desc: 'Techniques CSS : scoped, BEM, variables' }],
  },
  {
    category: 'i18n',
    icon: '🌍',
    items: [{ label: 'Demo', to: '/i18n/demo', desc: 'FR/EN avec pluralisation et formatage' }],
  },
]
</script>

<template>
  <div class="dashboard">
    <h1 class="dashboard__title">VueProof Dashboard</h1>
    <p class="dashboard__subtitle">
      Application de référence Vue 3 — explorez les modules ci-dessous
    </p>

    <div class="dashboard__grid">
      <div v-for="mod in modules" :key="mod.category" class="dashboard__card">
        <div class="dashboard__card-header">
          <span class="dashboard__card-icon">{{ mod.icon }}</span>
          <h3 class="dashboard__card-title">{{ mod.category }}</h3>
        </div>
        <ul class="dashboard__card-list">
          <li v-for="item in mod.items" :key="item.to">
            <RouterLink :to="item.to" class="dashboard__link">
              <strong>{{ item.label }}</strong>
              <span class="dashboard__link-desc">{{ item.desc }}</span>
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  max-width: 1200px;
  margin: 0 auto;
}

.dashboard__title {
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 0.5rem;
}

.dashboard__subtitle {
  color: var(--p-surface-500, #6b6b7b);
  margin: 0 0 2rem;
}

.dashboard__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
}

.dashboard__card {
  background: var(--p-surface-0, #ffffff);
  border: 1px solid var(--p-surface-200, #e0e0e0);
  border-radius: 8px;
  padding: 1.25rem;
  transition: box-shadow 0.2s;
}

.dashboard__card:hover {
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.dashboard__card-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.dashboard__card-icon {
  font-size: 1.5rem;
}

.dashboard__card-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0;
}

.dashboard__card-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.dashboard__card-list li + li {
  margin-top: 0.5rem;
}

.dashboard__link {
  display: block;
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  text-decoration: none;
  color: inherit;
  transition: background-color 0.2s;
}

.dashboard__link:hover {
  background-color: var(--p-surface-100, #f5f5f5);
}

.dashboard__link strong {
  display: block;
  font-size: 0.875rem;
}

.dashboard__link-desc {
  font-size: 0.75rem;
  color: var(--p-surface-500, #6b6b7b);
}
</style>
