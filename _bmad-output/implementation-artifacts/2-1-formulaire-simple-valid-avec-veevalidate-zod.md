# Story 2.1: formulaire-simple-valid-avec-veevalidate-zod

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a développeur, I want create `simple-form` module that uses VeeValidate forms wired to Zod schemas, shows inline errors, and submits via shared composable so that FR5-FR7 are covered.

## Acceptance Criteria

**Given** the create-vue project with PrimeVue components
**When** I build the simple form view using PrimeVue inputs and `useForm` + `zodResolver`
**Then** fields validate live, show inline error messages from Zod, and submitting triggers the shared composable handling, displaying success feedback
**And** the component has co-located tests verifying validation and submission

## Tasks / Subtasks

- [ ] Create `src/modules/forms/simple-form/` directory structure
- [ ] Define Zod schema for form validation
- [ ] Create `SimpleFormView.vue` with PrimeVue inputs and VeeValidate
- [ ] Implement form submission using shared composable
- [ ] Add inline error display and success feedback
- [ ] Write unit tests for validation and submission logic

## Dev Notes

- Relevant architecture patterns and constraints: Module structure pattern, VeeValidate + Zod for validation, shared composables for API calls.
- Source tree components to touch: Create src/modules/forms/simple-form/ with views, components, composables, types, __tests__.
- Testing standards summary: Co-located tests with Vitest, covering validation and submission.

### Project Structure Notes

- Alignment with unified project structure: Follows Module Structure Pattern from architecture.
- Detected conflicts or variances: None.

### References

- Architecture: [Source: _bmad-output/planning-artifacts/architecture-VueProof-2026-02-14.md#Librairie de validation : VeeValidate + Zod], [Source: _bmad-output/planning-artifacts/architecture-VueProof-2026-02-14.md#Module Structure Pattern]
- Dependencies: [Source: _bmad-output/planning-artifacts/architecture-VueProof-2026-02-14.md#Framework CSS : PrimeVue]
- Epics: [Source: _bmad-output/planning-artifacts/epics.md#Epic 2: Expérience de formulaires guidée]

## Dev Agent Record

### Agent Model Used

GitHub Copilot (Grok Code Fast 1)

### Debug Log References

### Completion Notes List

Ultimate context engine analysis completed - comprehensive developer guide created

### File List