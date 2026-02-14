# Story 1.1: initialiser-le-projet-vueproof-avec-create-vue

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a développeur, I want commencer avec `npm create vue@latest` (TS, Pinia, Router, Vitest, ESLint+Prettier) and install PrimeVue, VeeValidate, Zod, Axios so that the base stack matches the architecture decision.

## Acceptance Criteria

**Given** an empty repository and no existing node_modules
**When** I run the create-vue command with the selected options and install the required dependencies (PrimeVue, Axios, VeeValidate/Zod, Pinia, Vue Router, Vitest, ESLint+Prettier)
**Then** the project scaffolding includes src/main.ts, App.vue, router/index.ts, stores, vitest.config.ts, and package.json lists all dependencies
**And** linting/prettier scripts pass locally and the initial `npm run dev` launches without compilation errors

## Tasks / Subtasks

- [x] Run `npm create vue@latest vueproof -- --typescript --pinia --router --vitest --eslint-with-prettier`
- [x] Install PrimeVue latest stable (4.x)
- [x] Install VeeValidate 4.x and @vee-validate/zod
- [x] Install Zod 3.x
- [x] Install Axios 1.x
- [x] Verify package.json includes all dependencies
- [x] Run `npm run lint` and `npm run format` to ensure no errors
- [x] Run `npm run dev` and verify no compilation errors

## Dev Notes

- Relevant architecture patterns and constraints: Use create-vue official starter, TypeScript strict, Vite bundler, Vitest for testing, ESLint+Prettier for code quality.
- Source tree components to touch: Create new project structure with src/main.ts, App.vue, router/index.ts, stores/, vitest.config.ts, package.json.
- Testing standards summary: Vitest configured, no specific coverage requirements yet.

### Project Structure Notes

- Alignment with unified project structure: Follow standard Vue 3 structure (src/components, src/views, src/stores, src/router).
- Detected conflicts or variances: None at this stage.

### References

- Architecture: [Source: _bmad-output/planning-artifacts/architecture-VueProof-2026-02-14.md#Selected Starter: create-vue (officiel)]
- Dependencies: [Source: _bmad-output/planning-artifacts/architecture-VueProof-2026-02-14.md#Framework CSS : PrimeVue], [Source: _bmad-output/planning-artifacts/architecture-VueProof-2026-02-14.md#Librairie de validation : VeeValidate + Zod], [Source: _bmad-output/planning-artifacts/architecture-VueProof-2026-02-14.md#HTTP Client (Axios)]
- Epics: [Source: _bmad-output/planning-artifacts/epics.md#Epic 1: Dashboard d'exploration et navigation]

## Dev Agent Record

### Agent Model Used

GitHub Copilot (Grok Code Fast 1)

### Debug Log References

### Completion Notes List

- Project scaffolded with create-vue (Vue 3.5, TS, Pinia 3, Vue Router 5, Vitest 4, ESLint+Prettier)
- PrimeVue 4.5.4 installed with @primeuix/themes (Aura preset) configured in main.ts
- VeeValidate 4.15.1 + @vee-validate/zod + Zod 3.25 installed
- Axios 1.13.5 installed
- vue-i18n 11.2.8 installed (for future i18n epic)
- Fixed tsconfig.node.json for @vitest/eslint-plugin type resolution (added node-env.d.ts)
- All checks pass: lint (0 warnings, 0 errors), format, build (type-check + vite), test:unit (1/1 pass), dev server runs on :5173

### File List

- package.json (created + configured)
- src/main.ts (PrimeVue configured with Aura theme)
- node-env.d.ts (type declaration for @vitest/eslint-plugin)
- tsconfig.node.json (patched include for node-env.d.ts)
- src/App.vue, src/router/index.ts, src/stores/ (scaffolded by create-vue)
- vite.config.ts, vitest.config.ts, eslint.config.ts (scaffolded by create-vue)
- env.d.ts, index.html, .prettierrc.json, .editorconfig (scaffolded)