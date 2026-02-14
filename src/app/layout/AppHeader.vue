<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const pageTitle = computed(() => {
  return (route.meta?.title as string) || 'VueProof'
})
</script>

<template>
  <header class="app-header">
    <h2 class="app-header__title">{{ pageTitle }}</h2>
  </header>
</template>

<style scoped>
.app-header {
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--p-surface-200, #e0e0e0);
  background-color: var(--p-surface-0, #ffffff);
}

.app-header__title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
  color: var(--p-surface-900, #1e1e2e);
}
</style>
