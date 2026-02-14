# Story 1.3: ajouter-le-menu-lat-ral-actif-et-liens-module

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a développeur, I want wire up the sidebar to highlight the active module and allow navigation within two clicks so that FR1-FR4 are satisfied.

## Acceptance Criteria

**Given** the layout components and route definitions
**When** I bind the sidebar items to `router-link` and compute the active module state
**Then** clicking a module navigates to it within the defined routes and the active item receives a visual indicator (PrimeVue or CSS class)
**And** the menu stays consistent across navigation and the dashboard home exposes all modules

## Tasks / Subtasks

- [x] Update `AppSidebar.vue` to include menu items for each module category
- [x] Bind menu items to `router-link` components with active state styling
- [x] Implement computed property for active route highlighting
- [x] Create dashboard home view exposing all modules
- [x] Add visual indicators for active module (PrimeVue or CSS)
- [x] Test navigation consistency across routes

## Dev Notes

- Relevant architecture patterns and constraints: Sidebar navigation with active state, lazy-loaded routes, desktop-first design.
- Source tree components to touch: Update src/app/layout/AppSidebar.vue, create dashboard home view.
- Testing standards summary: Unit tests for sidebar component and navigation logic.

### Project Structure Notes

- Alignment with unified project structure: Uses app/layout/ components and router configuration.
- Detected conflicts or variances: None.

### References

- Architecture: [Source: _bmad-output/planning-artifacts/architecture-VueProof-2026-02-14.md#Routing Strategy], [Source: _bmad-output/planning-artifacts/architecture-VueProof-2026-02-14.md#Framework CSS : PrimeVue]
- Epics: [Source: _bmad-output/planning-artifacts/epics.md#Epic 1: Dashboard d'exploration et navigation]

## Dev Agent Record

### Agent Model Used

GitHub Copilot (Grok Code Fast 1)

### Debug Log References

### Completion Notes List

- All tasks were implemented as part of Story 1.2 (AppSidebar with RouterLink, isActive() computed, DashboardView with all module cards)
- AppSidebar.vue has full menu structure with categories, children, active highlighting via CSS classes
- DashboardView.vue exposes all modules in a grid layout with descriptions
- Navigation is consistent across routes and works within 2 clicks

### File List

- src/app/layout/AppSidebar.vue (menu items, router-link, active state)
- src/app/views/DashboardView.vue (module grid with links)
- src/app/router/index.ts (all routes configured)
