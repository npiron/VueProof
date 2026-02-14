---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
inputDocuments:
  - product-brief-VueProof-2026-02-14.md
  - prd-VueProof-2026-02-14.md
workflowType: 'architecture'
project_name: 'VueProof'
user_name: 'Codespace'
date: '2026-02-14'
lastStep: 8
status: 'complete'
completedAt: '2026-02-14'
---

# Architecture Decision Document — VueProof

---

## Project Context Analysis

### Requirements Overview

**Functional Requirements:**
37 FRs organisées en 7 domaines de capacité : Navigation (4), Formulaires (6), Data Display (6), API/Data Fetching (6), State Management (3), Auth (4), Styling (5), i18n (3). Toutes les FRs sont front-end uniquement — aucune logique serveur.

**Non-Functional Requirements:**
19 NFRs couvrant : Performance (4), Code Quality (6), Maintenabilité (4), Accessibilité baseline (3), Sécurité (2). Le niveau d'exigence est élevé : 0 warning, ≥ 80% coverage, TypeScript strict obligatoire.

**Scale & Complexity:**
- Primary domain : Application web front-end (SPA) — developer tooling / showcase
- Complexity level : Moyenne — pas de backend, pas de DB, mais diversité des patterns à implémenter
- Estimated architectural components : ~15 (shell, 10 modules, services partagés, router, store, composables)

### Technical Constraints & Dependencies

- **Pas de backend** — uniquement des APIs publiques tierces gratuites
- **Pas de base de données** — state local + localStorage
- **Desktop-only** — pas de responsive mobile
- **Budget : 0€** — tout doit être gratuit et open-source
- **APIs publiques** — disponibilité non garantie, fallback mock nécessaire

### Cross-Cutting Concerns Identified

- **Gestion d'erreurs API** — pattern commun pour tous les modules consommant des APIs
- **Loading states** — UX pattern cohérent à travers tous les modules
- **Conventions de nommage** — doivent être identiques partout
- **Structure de module** — chaque module suit le même pattern de dossiers
- **Testing strategy** — même approche de test pour chaque module

---

## Starter Template Evaluation

### Primary Technology Domain

Application web front-end SPA avec Vue 3 + TypeScript.

### Starter Options Considered

| Option | Pour | Contre |
|--------|------|--------|
| **create-vue (officiel)** | Officiel Vue.js, Vite intégré, options TS/Pinia/Router/Vitest/ESLint | Standard, pas d'opinions fortes |
| **Nuxt 3** | SSR, auto-imports, structure imposée | Over-engineered pour une SPA showcase, SSR inutile |
| **Vitesse** | Opinionated, beaucoup de features pré-configurées | Trop de magic, conventions non-standard |

### Selected Starter: create-vue (officiel)

**Rationale for Selection:**
- C'est le starter **officiel et recommandé** par l'équipe Vue.js
- Inclut toutes les options nécessaires : TypeScript, Pinia, Vue Router, Vitest, ESLint
- Utilise **Vite** comme bundler (standard de facto)
- Pas de "magic" — tout est explicite et compréhensible
- **Best practice** : un projet de référence doit utiliser l'approche officielle

**Initialization Command:**
```bash
npm create vue@latest vueproof -- --typescript --pinia --router --vitest --eslint-with-prettier
```

**Architectural Decisions Provided by Starter:**

- **Language & Runtime:** TypeScript (strict mode) on Node.js
- **Styling Solution:** Aucune imposée — à choisir séparément
- **Build Tooling:** Vite 6.x
- **Testing Framework:** Vitest + @vue/test-utils
- **Code Organization:** Structure standard Vue 3 (src/components, src/views, src/stores, src/router)
- **Development Experience:** HMR via Vite, TypeScript check, ESLint + Prettier

**Note:** L'initialisation du projet via cette commande sera la première story d'implémentation.

---

## Core Architectural Decisions

### Decision Priority Analysis

**Critical Decisions (Block Implementation):**
1. Framework CSS
2. Structure de dossiers des modules
3. Stratégie de routing
4. Pattern de composables pour les APIs

**Important Decisions (Shape Architecture):**
5. Librairie de validation formulaires
6. Librairie de data table
7. Stratégie de test

**Deferred Decisions (Post-MVP):**
8. Storybook configuration
9. Stryker configuration
10. CI/CD pipeline

### Frontend Architecture

#### Framework CSS : PrimeVue

| Critère | PrimeVue | Vuetify | Quasar |
|---------|----------|---------|--------|
| Gratuit | ✅ (Community) | ✅ | ✅ |
| Composants | 90+ | 80+ | 70+ |
| Vue 3 natif | ✅ | ✅ | ✅ |
| TypeScript | ✅ | ✅ | ✅ |
| Unstyled mode | ✅ | ❌ | ❌ |
| Theming CSS vars | ✅ | ✅ (SASS) | ✅ (SASS) |
| Tree-shaking | ✅ | ✅ | ✅ |
| Popularité npm | ~1M/week | ~2M/week | ~500K/week |

**Décision : PrimeVue** (dernière version stable)
- **Raison :** Mode "unstyled" disponible = on peut démontrer du CSS vanilla aussi. Theming via variables CSS. Très complet (90+ composants). Gratuit sans restrictions.
- **Alternative considérée :** Vuetify — plus populaire mais plus opinionated et pas de mode unstyled.

#### Librairie de validation : VeeValidate + Zod

- **VeeValidate** — librairie de validation de formulaires la plus utilisée avec Vue 3 + Composition API
- **Zod** — validation de schéma TypeScript-first, parfait pour le type-safety
- **Combinaison** : `@vee-validate/zod` pour le bridge

#### Librairie Data Table : PrimeVue DataTable

- Utiliser le composant DataTable de PrimeVue pour le module "Data Table (librairie)"
- Construire un composant custom pour le module "Data Table (custom)"

#### Routing Strategy

```
/                          → Dashboard (page d'accueil avec liste des modules)
/forms/simple              → Module formulaire simple
/forms/multi-step          → Module formulaire multi-étapes
/data/table-library        → Data table (librairie)
/data/table-custom         → Data table (custom)
/api/rest                  → Appel API REST
/api/realtime              → Données temps réel
/state/pinia               → State management Pinia
/auth/login                → Page de login
/auth/protected            → Page protégée (guard)
/styling/showcase          → Styling showcase
/i18n/demo                 → Internationalisation
```

- Routes groupées par catégorie
- Lazy loading via `() => import()` pour chaque module
- Navigation guards pour les routes auth

### Data Architecture

- **Pas de base de données** — state local uniquement
- **Pinia** pour le state management réactif
- **localStorage** pour la persistence (token auth, préférences)
- **Pas de state global partagé inter-modules** — chaque module gère son propre state sauf besoin explicite (ex: auth state partagé)

### Authentication & Security

- **Fake auth** via API publique (reqres.in ou dummyjson.com)
- **Token JWT** stocké dans Pinia store + localStorage
- **Navigation guards** Vue Router pour les routes protégées
- **Pas de vraie sécurité** — c'est une démonstration de pattern, pas une app de production

### API & Communication Patterns

- **Composables** pour encapsuler chaque appel API : `useApi()`, `useWeather()`, `useMarvel()`, etc.
- **Pattern commun** : loading / data / error state
- **Axios** comme client HTTP (intercepteurs, retry, configuration centralisée)
- **WebSocket natif** ou librairie légère pour le temps réel
- **Fallback mock** : si l'API publique est indisponible, charger des données JSON locales

### Infrastructure & Deployment

- **Vite** pour le dev server et le build
- **GitHub Pages** ou **Netlify** pour le déploiement (gratuit)
- **GitHub Actions** pour CI (lint, test, build) — post-MVP
- **Pas de Docker** — simple SPA statique

### Decision Impact Analysis

**Implementation Sequence:**
1. Initialisation projet (create-vue)
2. Installation PrimeVue + configuration theming
3. Setup dashboard shell (layout + router + menu)
4. Création du premier module (formulaire simple) comme proof-of-concept de la structure
5. Modules suivants en parallèle

**Cross-Component Dependencies:**
- PrimeVue est une dépendance de tous les modules visuels
- Le layout shell est une dépendance de tous les modules
- Le composable `useApi()` est partagé par plusieurs modules
- Le store auth est partagé entre le module auth et les guards

---

## Implementation Patterns & Consistency Rules

### Naming Patterns

**Code Naming Conventions:**
- Composants Vue : **PascalCase** — `SimpleForm.vue`, `DataTableCustom.vue`
- Composables : **camelCase avec préfixe `use`** — `useApi()`, `useWeather()`, `useAuth()`
- Stores Pinia : **camelCase avec préfixe `use` et suffixe `Store`** — `useAuthStore()`, `useWeatherStore()`
- Types/Interfaces : **PascalCase** — `User`, `WeatherData`, `ApiResponse<T>`
- Fichiers types : `*.types.ts`
- Fichiers tests : `*.spec.ts` (co-localisés avec le fichier testé)
- Variables : **camelCase** — `isLoading`, `errorMessage`, `userData`
- Constantes : **UPPER_SNAKE_CASE** — `API_BASE_URL`, `MAX_RETRY_COUNT`

**File Naming Conventions:**
- Composants Vue : **PascalCase** — `DataTableCustom.vue`
- Fichiers TS : **camelCase** — `useApi.ts`, `authService.ts`
- Dossiers : **kebab-case** — `data-table-custom/`, `multi-step-form/`

### Structure Patterns

**Module Structure Pattern (chaque module suit cette structure) :**
```
src/modules/<category>/<module-name>/
├── views/
│   └── <ModuleName>View.vue        # Vue/page principale
├── components/
│   ├── <ComponentA>.vue             # Composants internes au module
│   └── <ComponentB>.vue
├── composables/
│   └── use<Feature>.ts              # Logique métier réutilisable
├── types/
│   └── <module>.types.ts            # Types TypeScript du module
├── __tests__/
│   ├── <ComponentA>.spec.ts         # Tests composants
│   └── use<Feature>.spec.ts         # Tests composables
└── index.ts                         # Barrel export
```

**Project Organization:**
```
src/
├── app/                             # Shell de l'application
│   ├── layout/
│   │   ├── AppLayout.vue            # Layout principal (sidebar + content)
│   │   ├── AppSidebar.vue           # Menu latéral
│   │   └── AppHeader.vue            # Header (optionnel)
│   └── router/
│       └── index.ts                 # Configuration des routes
├── modules/                         # Tous les modules isolés
│   ├── forms/
│   │   ├── simple-form/
│   │   └── multi-step-form/
│   ├── data/
│   │   ├── table-library/
│   │   └── table-custom/
│   ├── api/
│   │   ├── rest-demo/
│   │   └── realtime-demo/
│   ├── state/
│   │   └── pinia-demo/
│   ├── auth/
│   │   └── fake-auth/
│   ├── styling/
│   │   └── css-showcase/
│   └── i18n/
│       └── i18n-demo/
├── shared/                          # Code partagé entre modules
│   ├── composables/
│   │   └── useApi.ts                # Composable API générique
│   ├── services/
│   │   └── httpClient.ts            # Configuration Axios
│   ├── types/
│   │   └── common.types.ts          # Types partagés
│   └── utils/
│       └── formatters.ts            # Utilitaires
├── assets/                          # Assets statiques
│   └── styles/
│       └── main.css                 # Styles globaux
├── App.vue                          # Composant racine
└── main.ts                          # Point d'entrée
```

### Format Patterns

**API Response Wrapper:**
```typescript
interface ApiState<T> {
  data: T | null
  isLoading: boolean
  error: string | null
}
```

**Composable Return Pattern:**
```typescript
function useApi<T>(url: string) {
  const data = ref<T | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  async function fetch(): Promise<void> { /* ... */ }
  async function retry(): Promise<void> { /* ... */ }

  return { data, isLoading, error, fetch, retry }
}
```

### Communication Patterns

**State Management Pattern:**
```typescript
// stores/useAuthStore.ts
export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(null)
  const user = ref<User | null>(null)
  const isAuthenticated = computed(() => !!token.value)

  function login(credentials: LoginCredentials): Promise<void> { /* ... */ }
  function logout(): void { /* ... */ }

  return { token, user, isAuthenticated, login, logout }
})
```

**Event/Error Handling Pattern:**
- Erreurs API gérées dans le composable → renvoyées comme `error` ref
- Affichage des erreurs via PrimeVue Toast ou Message component
- Pas de try/catch dans les composants — uniquement dans les composables/services

### Process Patterns

**Loading State Pattern:**
```vue
<template>
  <div v-if="isLoading">
    <ProgressSpinner />
  </div>
  <div v-else-if="error">
    <Message severity="error">{{ error }}</Message>
    <Button label="Retry" @click="retry" />
  </div>
  <div v-else>
    <!-- Content -->
  </div>
</template>
```

### Enforcement Guidelines

**All AI Agents MUST:**
- Utiliser TypeScript strict mode — aucun `any` sauf justification documentée
- Suivre le Module Structure Pattern pour chaque nouveau module
- Nommer les fichiers et variables selon les conventions ci-dessus
- Écrire les tests en co-location (`__tests__/`) et non dans un dossier `tests/` séparé
- Utiliser les composables pour la logique métier, jamais de logique dans les templates
- Retourner `{ data, isLoading, error }` depuis les composables API

**Anti-Patterns (INTERDITS) :**
- ❌ Logique métier dans les composants Vue (templates ou setup)
- ❌ Appels API directs dans les composants (doit passer par un composable)
- ❌ `any` TypeScript sans justification
- ❌ Styles non-scoped en dehors de `main.css`
- ❌ Dépendances inter-modules (sauf via `shared/`)
- ❌ State global non encapsulé dans un store Pinia

---

## Project Structure & Boundaries

### Complete Project Directory Structure

```
vueproof/
├── .env                              # Variables d'environnement (clés API)
├── .env.example                      # Template .env (commité)
├── .eslintrc.cjs                     # Configuration ESLint
├── .prettierrc.json                  # Configuration Prettier
├── .gitignore
├── index.html                        # Point d'entrée HTML
├── package.json
├── tsconfig.json                     # TypeScript config (strict)
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts                    # Configuration Vite
├── vitest.config.ts                  # Configuration Vitest
├── env.d.ts                          # Types pour import.meta.env
├── public/
│   └── favicon.ico
├── src/
│   ├── App.vue
│   ├── main.ts
│   ├── app/
│   │   ├── layout/
│   │   │   ├── AppLayout.vue
│   │   │   ├── AppSidebar.vue
│   │   │   └── AppHeader.vue
│   │   └── router/
│   │       └── index.ts
│   ├── modules/
│   │   ├── forms/
│   │   │   ├── simple-form/
│   │   │   │   ├── views/SimpleFormView.vue
│   │   │   │   ├── components/
│   │   │   │   ├── composables/
│   │   │   │   ├── types/
│   │   │   │   ├── __tests__/
│   │   │   │   └── index.ts
│   │   │   └── multi-step-form/
│   │   │       └── (same structure)
│   │   ├── data/
│   │   │   ├── table-library/
│   │   │   └── table-custom/
│   │   ├── api/
│   │   │   ├── rest-demo/
│   │   │   └── realtime-demo/
│   │   ├── state/
│   │   │   └── pinia-demo/
│   │   ├── auth/
│   │   │   └── fake-auth/
│   │   ├── styling/
│   │   │   └── css-showcase/
│   │   └── i18n/
│   │       └── i18n-demo/
│   ├── shared/
│   │   ├── composables/
│   │   │   └── useApi.ts
│   │   ├── services/
│   │   │   └── httpClient.ts
│   │   ├── types/
│   │   │   └── common.types.ts
│   │   └── utils/
│   │       └── formatters.ts
│   └── assets/
│       └── styles/
│           └── main.css
├── _bmad/                            # BMAD method (existant)
├── _bmad-output/                     # BMAD artifacts (existant)
└── docs/                             # Documentation projet
```

### Architectural Boundaries

**Module Boundaries:**
- Chaque module dans `src/modules/<category>/<module-name>/` est **totalement isolé**
- Un module ne peut **pas importer** depuis un autre module
- Les dépendances partagées passent **uniquement** par `src/shared/`

**Shared Boundaries:**
- `shared/composables/` — logique métier réutilisable (API, utils)
- `shared/services/` — services techniques (HTTP client)
- `shared/types/` — types communs (ApiState, etc.)
- `shared/utils/` — fonctions utilitaires pures

**App Boundaries:**
- `app/layout/` — composants de mise en page (sidebar, header)
- `app/router/` — configuration centralisée des routes

### Requirements to Structure Mapping

| Epic/Feature | Répertoire |
|-------------|------------|
| Dashboard Shell | `src/app/layout/`, `src/app/router/` |
| Formulaire simple | `src/modules/forms/simple-form/` |
| Formulaire multi-étapes | `src/modules/forms/multi-step-form/` |
| Data Table (librairie) | `src/modules/data/table-library/` |
| Data Table (custom) | `src/modules/data/table-custom/` |
| API REST | `src/modules/api/rest-demo/` |
| Temps réel | `src/modules/api/realtime-demo/` |
| State Pinia | `src/modules/state/pinia-demo/` |
| Auth fake | `src/modules/auth/fake-auth/` |
| Styling showcase | `src/modules/styling/css-showcase/` |
| i18n demo | `src/modules/i18n/i18n-demo/` |

### Cross-Cutting Concerns Mapping

| Concern | Emplacement |
|---------|------------|
| HTTP Client (Axios) | `src/shared/services/httpClient.ts` |
| Composable API générique | `src/shared/composables/useApi.ts` |
| Types communs | `src/shared/types/common.types.ts` |
| Styles globaux | `src/assets/styles/main.css` |
| Variables d'environnement | `.env` / `env.d.ts` |

---

## Architecture Validation Results

### Coherence Validation ✅

**Decision Compatibility:**
- Vue 3 + TypeScript strict + Vite + Pinia + Vue Router → stack cohérente et officielle
- PrimeVue compatible Vue 3, TypeScript, tree-shaking
- VeeValidate + Zod fonctionne nativement avec Vue 3 Composition API
- Axios compatible avec les composables et le pattern `useApi()`

**Pattern Consistency:**
- Le Module Structure Pattern est appliqué uniformément à tous les modules
- Les conventions de nommage sont cohérentes entre fichiers, variables et composants
- Le pattern loading/error/data est standardisé via le composable générique

**Structure Alignment:**
- L'arborescence de dossiers reflète exactement les boundaries architecturales
- Chaque FR est mappée à un répertoire spécifique
- Pas de zone grise dans l'organisation

### Requirements Coverage Validation ✅

**Functional Requirements Coverage:** 37/37 FRs couvertes par la structure de modules
**Non-Functional Requirements Coverage:** 19/19 NFRs adressées par les décisions architecturales

### Implementation Readiness Validation ✅

**Decision Completeness:** Tous les choix technologiques critiques sont faits
**Structure Completeness:** Arborescence complète définie
**Pattern Completeness:** Patterns de code documentés avec exemples

### Architecture Completeness Checklist

- ✅ Requirements analysées et mappées
- ✅ Stack technologique validée
- ✅ Patterns d'implémentation définis
- ✅ Structure projet complète
- ✅ Boundaries architecturales claires
- ✅ Anti-patterns identifiés

### Architecture Readiness Assessment

**Overall Status:** READY FOR IMPLEMENTATION
**Confidence Level:** High
**Key Strengths:**
- Stack 100% officielle et standard Vue.js
- Isolation forte des modules
- Patterns clairs et reproductibles
- Aucune dépendance payante

**Areas for Future Enhancement:**
- Configuration Storybook (post-MVP)
- Configuration Stryker (post-MVP)
- Pipeline CI/CD (post-MVP)
- Configuration de déploiement automatique
