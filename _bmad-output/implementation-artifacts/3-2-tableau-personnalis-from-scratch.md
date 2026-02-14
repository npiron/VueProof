# Story 3.2: tableau-personnalis-from-scratch

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a développeur, I want create the `table-custom` module that renders a table without external components but with the same tri/pagination/filtre behavior so that FR14-FR15 are covered.

## Acceptance Criteria

**Given** the same mock dataset
**When** I implement custom table markup with composable-driven sorting/pagination/filter logic
**Then** the table supports ascending/descending sorting, client-side pagination, and filtering inputs, while referencing shared types and tests
**And** loading/error placeholders reuse the shared API pattern

## Tasks / Subtasks

- [ ] Create `src/modules/data/table-custom/` directory structure
- [ ] Implement custom table component with HTML markup
- [ ] Add sorting, pagination, and filtering logic using composables
- [ ] Integrate with shared useApi for data fetching
- [ ] Add loading/error state handling
- [ ] Write unit tests for custom table functionality

## Dev Notes

- Relevant architecture patterns and constraints: Custom table implementation from scratch, same features as library version, shared composables for logic.
- Source tree components to touch: Create src/modules/data/table-custom/ following module pattern.
- Testing standards summary: Tests for sorting, pagination, and filtering.

### Project Structure Notes

- Alignment with unified project structure: Adheres to Module Structure Pattern.
- Detected conflicts or variances: None.

### References

- Architecture: [Source: _bmad-output/planning-artifacts/architecture-VueProof-2026-02-14.md#Librairie Data Table : PrimeVue DataTable], [Source: _bmad-output/planning-artifacts/architecture-VueProof-2026-02-14.md#Module Structure Pattern]
- Epics: [Source: _bmad-output/planning-artifacts/epics.md#Epic 3: Tableaux data-driven comparatifs]

## Dev Agent Record

### Agent Model Used

GitHub Copilot (Grok Code Fast 1)

### Debug Log References

### Completion Notes List

Ultimate context engine analysis completed - comprehensive developer guide created

### File List