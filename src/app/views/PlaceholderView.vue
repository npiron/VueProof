<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <div class="placeholder-view">
    <h2>{{ route.meta?.title || 'Module' }}</h2>
    <p class="placeholder-view__desc">Ce module est en cours de développement.</p>
    <code class="placeholder-view__path">{{ route.path }}</code>
  </div>
</template>

<style scoped>
.placeholder-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  text-align: center;
}

.placeholder-view__desc {
  color: var(--p-surface-500, #6b6b7b);
  margin: 0.5rem 0 1rem;
}

.placeholder-view__path {
  background: var(--p-surface-100, #f5f5f5);
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.875rem;
}
</style>
