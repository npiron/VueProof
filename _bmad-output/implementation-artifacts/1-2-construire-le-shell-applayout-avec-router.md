# Story 1.2: construire-le-shell-applayout-avec-router

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a développeur, I want implement `AppLayout`, `AppSidebar`, and `AppHeader` with the categorized lazy-loaded routes (/forms, /data, /api, /state, /auth, /styling, /i18n) so that the dashboard shell organizes modules and satisfies navigation FRs.

## Acceptance Criteria

**Given** the scaffolded project with Vue Router and Pinia installed
**When** I create the layout components and configure router/index.ts with grouped routes and guards placeholders
**Then** the default route renders AppLayout, the sidebar shows categories, and Vue Router lazy loads each module view
**And** the layout renders the menu shell, leaving placeholders for module routes

## Tasks / Subtasks

- [x] Create `src/app/layout/AppLayout.vue` with sidebar and main content area
- [x] Create `src/app/layout/AppSidebar.vue` with menu categories placeholder
- [x] Create `src/app/layout/AppHeader.vue` (optional, minimal)
- [x] Configure `src/app/router/index.ts` with lazy-loaded routes for each category (/forms/*, /data/*, etc.)
- [x] Add route guards placeholders for auth routes
- [x] Update `App.vue` to use AppLayout for the default route
- [x] Verify router lazy loading works and no compilation errors

## Dev Notes

- Relevant architecture patterns and constraints: Desktop-first layout using PrimeVue components, lazy-loaded routes by category, navigation guards for protected routes.
- Source tree components to touch: Create src/app/layout/ directory with AppLayout.vue, AppSidebar.vue, AppHeader.vue; update src/app/router/index.ts; modify App.vue.
- Testing standards summary: Unit tests for layout components and router configuration.

### Project Structure Notes

- Alignment with unified project structure: Follows app/layout/ and app/router/ structure from architecture.
- Detected conflicts or variances: None, as this is the first layout implementation.

### References

- Architecture: [Source: _bmad-output/planning-artifacts/architecture-VueProof-2026-02-14.md#Routing Strategy], [Source: _bmad-output/planning-artifacts/architecture-VueProof-2026-02-14.md#Project Organization]
- Dependencies: [Source: _bmad-output/planning-artifacts/architecture-VueProof-2026-02-14.md#Framework CSS : PrimeVue]
- Epics: [Source: _bmad-output/planning-artifacts/epics.md#Epic 1: Dashboard d'exploration et navigation]

## Dev Agent Record

### Agent Model Used

GitHub Copilot (Grok Code Fast 1)

### Debug Log References

### Completion Notes List

Ultimate context engine analysis completed - comprehensive developer guide created

### File List