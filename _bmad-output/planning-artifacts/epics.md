---
stepsCompleted: [1, 2, 3, 4]
inputDocuments:
  - product-brief-VueProof-2026-02-14.md
  - prd-VueProof-2026-02-14.md
  - architecture-VueProof-2026-02-14.md
---

# VueProof - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for VueProof, decomposing the requirements from the PRD, UX Design if it exists, and Architecture requirements into implementable stories.

## Requirements Inventory

### Functional Requirements

FR1: L'utilisateur peut naviguer entre les modules via un menu latéral organisé par catégorie
FR2: L'utilisateur peut voir la liste de tous les modules disponibles sur la page d'accueil
FR3: L'utilisateur peut accéder à n'importe quel module en maximum 2 clics
FR4: L'utilisateur peut voir un indicateur visuel du module actif dans le menu
FR5: L'utilisateur peut remplir un formulaire simple avec validation en temps réel
FR6: L'utilisateur peut voir des messages d'erreur contextuels sur les champs invalides
FR7: L'utilisateur peut soumettre un formulaire et voir une confirmation de succès
FR8: L'utilisateur peut naviguer dans un formulaire multi-étapes avec progression visuelle
FR9: L'utilisateur peut revenir aux étapes précédentes sans perdre les données saisies
FR10: Le système peut valider chaque étape indépendamment avant d'autoriser la suivante
FR11: L'utilisateur peut visualiser des données dans un tableau avec pagination
FR12: L'utilisateur peut trier les colonnes du tableau (ascendant/descendant)
FR13: L'utilisateur peut filtrer les données du tableau par texte ou critères
FR14: L'utilisateur peut voir un tableau construit via une librairie tierce (approche librairie)
FR15: L'utilisateur peut voir un tableau construit from scratch (approche custom)
FR16: L'utilisateur peut comparer les deux approches de data table
FR17: L'utilisateur peut voir des données chargées depuis une API REST publique
FR18: L'utilisateur peut voir un état de chargement (loading) pendant l'appel API
FR19: L'utilisateur peut voir un message d'erreur clair en cas d'échec API
FR20: L'utilisateur peut retenter un appel API en échec (retry)
FR21: L'utilisateur peut voir des données mises à jour en temps réel (WebSocket/SSE)
FR22: L'utilisateur peut voir l'indicateur de connexion temps réel (connecté/déconnecté)
FR23: L'utilisateur peut interagir avec un module qui utilise un store Pinia partagé
FR24: L'utilisateur peut voir la réactivité du state en temps réel entre composants
FR25: L'utilisateur peut voir la persistence du state (rechargement de page)
FR26: L'utilisateur peut se connecter avec des identifiants de test via une API fake
FR27: L'utilisateur peut voir des routes protégées accessibles uniquement après login
FR28: L'utilisateur peut se déconnecter et perdre l'accès aux routes protégées
FR29: Le système peut gérer le stockage et le rafraîchissement de token
FR30: L'utilisateur peut voir des exemples de styling scoped Vue
FR31: L'utilisateur peut voir des exemples de convention BEM
FR32: L'utilisateur peut voir des exemples de classes utilitaires
FR33: L'utilisateur peut voir des exemples d'utilisation de variables CSS
FR34: L'utilisateur peut comparer visuellement les différentes approches CSS
FR35: L'utilisateur peut changer la langue d'un module isolé (FR/EN minimum)
FR36: L'utilisateur peut voir la traduction dynamique des labels et contenus
FR37: Le système peut gérer la pluralisation et le formatage de dates/nombres selon la locale

### NonFunctional Requirements

NFR1: Le temps de chargement initial de l'application doit être < 3 secondes
NFR2: La navigation entre modules doit être instantanée (< 300ms)
NFR3: Les appels API doivent afficher un état de chargement si > 200ms
NFR4: Le bundle JS final doit utiliser le code-splitting par route/module
NFR5: 0 erreur et 0 warning ESLint sur l'ensemble du codebase
NFR6: 0 erreur TypeScript en mode strict
NFR7: Formatting uniforme via Prettier sur tous les fichiers
NFR8: Couverture de test ≥ 80% (statements) avec Vitest
NFR9: Chaque module doit avoir ses propres tests unitaires
NFR10: Les conventions de nommage doivent être cohérentes dans tout le projet
NFR11: Chaque module doit être isolé et indépendant (pas de couplage inter-modules)
NFR12: L'ajout d'un nouveau module ne doit pas impacter les modules existants
NFR13: L'architecture de dossiers doit suivre un pattern répétable pour chaque module
NFR14: Les dépendances tierces doivent être verrouillées en version
NFR15: Les formulaires doivent avoir des labels associés aux inputs
NFR16: La navigation clavier doit être fonctionnelle dans le menu latéral
NFR17: Les contrastes de couleurs doivent respecter le ratio WCAG AA minimum
NFR18: Les clés API doivent être stockées dans des variables d'environnement (.env), jamais dans le code source
NFR19: Le fichier .env ne doit jamais être commité (inclus dans .gitignore)

### Additional Requirements

- Le starter officiel create-vue (TS/Pinia/Router/Vitest/ESLint+Prettier) sert de base et doit être configuré en premier étage.
- PrimeVue en mode unstyled fournit les composants UI, la theming et les layouts principaux (sidebar, header, AppLayout).
- Toute logique métier passe par des composables rangés dans shared/composables, avec un useApi paramétré sur Axios pour loading/error/retry, et des services partagés (shared/services/httpClient.ts).
- VeeValidate + Zod encadrent les formulaires, en particulier les modules simple-form et multi-step-form.
- DataTable de PrimeVue couvre le module "table-library" tandis que le module "table-custom" implémente un tableau construit from scratch, en respectant le même squelette.
- Les routes doivent être lazy-loaded, organisées par catégorie (/forms/*, /data/*, /api/*, /state/*, /auth/*, /styling/*, /i18n/*) et protégées par des guards sur la partie auth.
- Pinia gère tout state partagé (auth, préférences) avec persistance via localStorage, sans couplage entre modules isolés.
- L'authentification fake utilise des endpoints comme reqres.in/dummyjson, stocke tokens dans un store + localStorage, et active les guards sur /auth/protected.
- Le temps réel est alimenté par un composable WebSocket/SSE, avec fallback mock et indicateur connecté/déconnecté, et toutes les intégrations API s’appuient sur le pattern loading/error/data.
- Le projet est desktop-first, sans backend ni base de données, donc toute persistance reste locale et la configuration .env (clés API) reste non committée.

### FR Coverage Map

FR1: Epic 1 - navigation latérale et visibilité de l'état actif.
FR2: Epic 1 - liste de modules et dashboard d'accueil.
FR3: Epic 1 - accès en moins de deux clics via le router catégorisé.
FR4: Epic 1 - indicateur de module actif.
FR5: Epic 2 - formulaire simple avec validation temps réel.
FR6: Epic 2 - messages d'erreur contextuels.
FR7: Epic 2 - confirmation de soumission.
FR8: Epic 2 - navigation multi-étapes avec progression.
FR9: Epic 2 - retour en arrière sans perte des données.
FR10: Epic 2 - validation indépendante de chaque étape.
FR11: Epic 3 - tableau avec pagination.
FR12: Epic 3 - tri des colonnes.
FR13: Epic 3 - filtre des données.
FR14: Epic 3 - data table via PrimeVue.
FR15: Epic 3 - data table custom from scratch.
FR16: Epic 3 - comparaison visuelle des deux approches.
FR17: Epic 4 - affichage des données REST publiques.
FR18: Epic 4 - état loading pendant appels API.
FR19: Epic 4 - message d'erreur clair.
FR20: Epic 4 - fonction retry après échec.
FR21: Epic 4 - données temps réel WebSocket/SSE.
FR22: Epic 4 - indicateur de connexion temps réel.
FR23: Epic 5 - interaction avec Pinia partagé.
FR24: Epic 5 - réactivité du state inter-composants.
FR25: Epic 5 - persistence du state après reload.
FR26: Epic 5 - login fake via API test.
FR27: Epic 5 - routes protégées accessibles uniquement après login.
FR28: Epic 5 - déconnexion et perte d'accès.
FR29: Epic 5 - gestion du token + rafraîchissement.
FR30: Epic 6 - styling scoped Vue.
FR31: Epic 6 - conventions BEM.
FR32: Epic 6 - classes utilitaires.
FR33: Epic 6 - variables CSS.
FR34: Epic 6 - comparatif visuel des approches.
FR35: Epic 6 - support FR/EN isolé.
FR36: Epic 6 - traduction dynamique des labels.
FR37: Epic 6 - pluralisation et formatage local.

## Epic List

### Epic List

### Epic 1: Dashboard d'exploration et navigation
Permet aux développeurs d'explorer les modules VueProof via un shell principal avec menu latéral, indicateurs visuels et accès en moins de deux clics.
**FRs covered:** FR1, FR2, FR3, FR4
**Implementation notes:** Shell desktop-first, routes lazy-loaded par catégorie (/forms, /data, /api, /state, /auth, /styling, /i18n), PrimeVue non themed pour rester flexible, menu highlight et guard de module actif.

### Epic 2: Expérience de formulaires guidée
Offre les patterns de formulaires simple et multi-étapes avec validation, messages d'erreur et progression, tous orchestrés via VeeValidate + Zod et composables partagés.
**FRs covered:** FR5, FR6, FR7, FR8, FR9, FR10
**Implementation notes:** Chaque formulaire suit la structure module avec views/components/composables/types/__tests__, utilises shared/composables/useApi et loaders globaux.

### Epic 3: Tableaux data-driven comparatifs
Expose les deux approches de tableaux (PrimeVue + custom) avec tri, pagination, filtres et comparaison visuelle pour l'apprentissage.
**FRs covered:** FR11, FR12, FR13, FR14, FR15, FR16
**Implementation notes:** Module data table lib vs custom, même structure de dossier, load d'APIs mock JSONPlaceholder/PokéAPI pour données; tests co-localisés.

### Epic 4: Consommation d'API et flux temps réel
Montre comment consommer une API REST publique avec loading/error/retry et un canal WebSocket/SSE temps réel, incluant fallback mock et indicateur connecté.
**FRs covered:** FR17, FR18, FR19, FR20, FR21, FR22
**Implementation notes:** shared/services/httpClient configure Axios avec interceptors + retry, composables useApi/useRealtime, affichage PrimeVue Toast pour erreurs.

### Epic 5: State et authentification fictive
Décrit la gestion d'état Pinia partagée, persistence localStorage, login fake, guards et gestion de tokens pour les routes protégées.
**FRs covered:** FR23, FR24, FR25, FR26, FR27, FR28, FR29
**Implementation notes:** Store auth + preferences, composables useAuth/useToken, routes auth guard ressource, `.env` protège clés API, localStorage pour tokens.

### Epic 6: Styling et internationalisation
Présente les techniques de styling (scoped, BEM, utilitaires, variables) et le support FR/EN avec translations dynamiques, pluralisation et formatages localisés.
**FRs covered:** FR30, FR31, FR32, FR33, FR34, FR35, FR36, FR37
**Implementation notes:** Module styling + i18n isolés, utilise vue-i18n, assets/styles/main.css, variables CSS exposées, tests pour translations.

### Story 1.1: Initialiser le projet VueProof avec create-vue

As a développeur, I want commencer avec `npm create vue@latest` (TS, Pinia, Router, Vitest, ESLint+Prettier) and install PrimeVue, VeeValidate, Zod, Axios so that the base stack matches the architecture decision.

**Acceptance Criteria:**

**Given** an empty repository and no existing node_modules
**When** I run the create-vue command with the selected options and install the required dependencies (PrimeVue, Axios, VeeValidate/Zod, Pinia, Vue Router, Vitest, ESLint+Prettier)
**Then** the project scaffolding includes src/main.ts, App.vue, router/index.ts, stores, vitest.config.ts, and package.json lists all dependencies
**And** linting/prettier scripts pass locally and the initial `npm run dev` launches without compilation errors

### Story 1.2: Construire le shell AppLayout avec router

As a développeur, I want implement `AppLayout`, `AppSidebar`, and `AppHeader` with the categorized lazy-loaded routes (/forms, /data, /api, /state, /auth, /styling, /i18n) so that the dashboard shell organizes modules and satisfies navigation FRs.

**Acceptance Criteria:**

**Given** the scaffolded project with Vue Router and Pinia installed
**When** I create the layout components and configure router/index.ts with grouped routes and guards placeholders
**Then** the default route renders AppLayout, the sidebar shows categories, and Vue Router lazy loads each module view
**And** the layout renders the menu shell, leaving placeholders for module routes

### Story 1.3: Ajouter le menu latéral actif et liens Module

As a développeur, I want wire up the sidebar to highlight the active module and allow navigation within two clicks so that FR1-FR4 are satisfied.

**Acceptance Criteria:**

**Given** the layout components and route definitions
**When** I bind the sidebar items to `router-link` and compute the active module state
**Then** clicking a module navigates to it within the defined routes and the active item receives a visual indicator (PrimeVue or CSS class)
**And** the menu stays consistent across navigation and the dashboard home exposes all modules

### Story 2.1: Formulaire simple validé avec VeeValidate+Zod

As a développeur, I want create `simple-form` module that uses VeeValidate forms wired to Zod schemas, shows inline errors, and submits via shared composable so that FR5-FR7 are covered.

**Acceptance Criteria:**

**Given** the create-vue project with PrimeVue components
**When** I build the simple form view using PrimeVue inputs and `useForm` + `zodResolver`
**Then** fields validate live, show inline error messages from Zod, and submitting triggers the shared composable handling, displaying success feedback
**And** the component has co-located tests verifying validation and submission

### Story 2.2: Formulaire multi-étapes avec progression et retention

As a développeur, I want build `multi-step-form` module with next/back controls, stepper progression, and composable state so that FR8-FR10 are satisfied.

**Acceptance Criteria:**

**Given** the simple form module and a shared form state composable
**When** I implement the multi-step form with separate steps, `stepper` UI, and persistent state stored in a composable/localStorage
**Then** users can move forward/back between steps, each step runs its own Zod schema, and leaving/reentering the module restores entered data
**And** navigation disables the next button until current step validation passes

### Story 2.3: Documenter la stratégie d'erreur et de progression des formulaires

As a développeur, I want describe and implement reusable toast/error display components for the modules so that errors are consistent and progression signals remain visible.

**Acceptance Criteria:**

**Given** the simple and multi-step form modules
**When** I create shared components (e.g., `FormProgress`, `FormErrors`) and integrate them
**Then** they render error summaries and progress bars using PrimeVue UI, and unit tests verify their behavior

### Story 3.1: Tableau PrimeVue avec pagination/tri/filtre

As a développeur, I want build the `table-library` module that loads mock data, configures PrimeVue DataTable for pagination, tri, and filtres, so FR11-FR13 are satisfied.

**Acceptance Criteria:**

**Given** the shared useApi composable returning paginated mock data
**When** I populate PrimeVue DataTable with sorting, pagination, and text filters
**Then** users can sort columns, filter values, and paginate while the component shows loading/error states from useApi
**And** the module ships with tests for sorting/filtering behaviors

### Story 3.2: Tableau personnalisé from scratch

As a développeur, I want create the `table-custom` module that renders a table without external components but with the same tri/pagination/filtre behavior so that FR14-FR15 are covered.

**Acceptance Criteria:**

**Given** the same mock dataset
**When** I implement custom table markup with composable-driven sorting/pagination/filter logic
**Then** the table supports ascending/descending sorting, client-side pagination, and filtering inputs, while referencing shared types and tests
**And** loading/error placeholders reuse the shared API pattern

### Story 3.3: Comparer visuellement les deux approches

As a développeur, I want provide a comparison view that overlays both modules, so that FR16 is satisfied and developers can understand trade-offs.

**Acceptance Criteria:**

**Given** both modules exist
**When** I create a comparison page summarizing differences (table vs custom) with metrics (lines of code, flexibility, performance) and preview cards
**Then** the view illustrates the two approaches side by side and links to each module

### Story 4.1: Créer useApi avec Axios + loading/error/retry

As a développeur, I want build `useApi` composable backed by Axios interceptors that expose `data`, `isLoading`, `error`, and `retry`, so FR17-FR20 are respected.

**Acceptance Criteria:**

**Given** the Axios configuration service
**When** I implement useApi with generics, loading/error refs, and a retry function that reuses the same request config
**Then** consuming modules can destructure `{ data, isLoading, error, retry }`, and tests ensure retry re-invokes Axios without creating duplicate interceptors
**And** errors are surfaced to components via shared toast component from Epic 2.

### Story 4.2: Module REST avec retour visuel des états

As a développeur, I want create `api/rest-demo` that calls useApi with JSONPlaceholder endpoints, renders cards of REST data, and shows loading/error/retry states.

**Acceptance Criteria:**

**Given** the useApi composable and Axios setup
**When** I load posts/users and render them with PrimeVue components
**Then** the UI displays loading spinners, error messages, retry buttons, and success data, referencing API contracts from architecture
**And** unit tests cover state transitions

### Story 4.3: Module temps réel WebSocket/SSE

As a développeur, I want implement `api/realtime-demo` that connects to a public WebSocket/SSE (with fallback mock), displays incoming data, and shows connection status (connected/disconnected).

**Acceptance Criteria:**

**Given** a helper composable `useRealtime` that exposes `isConnected` and `messages`
**When** I connect to a public stream and display live updates with a PrimeVue Toast or Badge for connection status
**Then** real-time values refresh without manual reload, disconnects fallback to mock data, and the UI indicates the current connection state

### Story 5.1: Store Pinia partagé avec persistence

As a développeur, I want define `useAuthStore` and `usePreferenceStore` that persist via localStorage and expose computed state so that FR23, FR24, FR25 are satisfied.

**Acceptance Criteria:**

**Given** Pinia plugged into the app
**When** I create the stores with refs for token/user and use watchers to persist to localStorage
**Then** consuming components react to token/user updates instantly, persistence survives page reload, and tests cover reactivity

### Story 5.2: Interface de connexion fake et guards

As a développeur, I want build the `auth/fake-auth` module with login form, token storage, and route guard redirects so that FR26-FR27 are implemented.

**Acceptance Criteria:**

**Given** the auth store and Axios service
**When** I call reqres/dummyjson endpoints with test credentials and store the returned token
**Then** a `LoginView` shows success, stores the token, and router guards redirect to `/auth/protected` only when authenticated

### Story 5.3: Déconnexion et rafraîchissement de token

As a développeur, I want implement logout and token refresh helpers so that FR28-FR29 are satisfied and the auth story remains self-contained.

**Acceptance Criteria:**

**Given** the auth store with token/refresher methods
**When** a user clicks logout or token expires
**Then** the store clears the token, localStorage, and guards redirect to login; refreshing the token (mocked) updates state without reauth

### Story 6.1: Implémenter le showcase de styling

As a développeur, I want create `styling/css-showcase` demonstrating scoped styles, BEM, utilities, and CSS vars so FR30-FR34 are addressed.

**Acceptance Criteria:**

**Given** PrimeVue layout and shared styles
**When** I build the showcase page with sections for different techniques and variables defined in `assets/styles/main.css`
**Then** each card clearly demonstrates scoped/BEM/utility/CSS var usage, and tests assert style tokens exist

### Story 6.2: Configurer vue-i18n et switch de langue

As a développeur, I want integrate vue-i18n with FR/EN messages and a language switcher so FR35-FR36 are satisfied.

**Acceptance Criteria:**

**Given** the layout and modules needing text
**When** I configure vue-i18n with locale files and a switcher component
**Then** switching language updates labels, buttons, and messages dynamically, and tests ensure translations load per locale

### Story 6.3: Ajouter pluralisation et formatage local

As a développeur, I want extend i18n module with pluralization and number/date formatting helpers so FR37 is satisfied.

**Acceptance Criteria:**

**Given** vue-i18n setup from Story 6.2
**When** I use the built-in pluralization and number/date formatting APIs for sample counts and timestamps
**Then** messages adapt plurals (0/1/2+) and formatted dates/numbers follow locale rules, with tests verifying both locales


<!-- End story repeat -->