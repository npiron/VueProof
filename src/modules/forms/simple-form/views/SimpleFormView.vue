<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { simpleFormSchema } from '../types/simpleForm.types'
import { useSimpleFormSubmit } from '../composables/useSimpleFormSubmit'

const { isLoading, error, isSuccess, submittedData, submit, reset } = useSimpleFormSubmit()

const validationSchema = toTypedSchema(simpleFormSchema)

const { defineField, handleSubmit, errors, resetForm } = useForm({
  validationSchema,
  initialValues: {
    firstName: '',
    lastName: '',
    email: '',
    age: undefined as unknown as number,
    message: '',
  },
})

const [firstName, firstNameAttrs] = defineField('firstName')
const [lastName, lastNameAttrs] = defineField('lastName')
const [email, emailAttrs] = defineField('email')
const [age, ageAttrs] = defineField('age')
const [message, messageAttrs] = defineField('message')

const onSubmit = handleSubmit(async (values) => {
  await submit(values)
})

function handleReset(): void {
  resetForm()
  reset()
}
</script>

<template>
  <div class="simple-form-view">
    <h2>Formulaire simple</h2>
    <p class="simple-form-view__desc">
      Démonstration de validation avec VeeValidate + Zod et composants PrimeVue.
    </p>

    <!-- Success feedback -->
    <div v-if="isSuccess" class="simple-form-view__success" role="alert">
      <h3>Formulaire soumis avec succès !</h3>
      <pre class="simple-form-view__data">{{ JSON.stringify(submittedData, null, 2) }}</pre>
      <button type="button" class="simple-form-view__btn" @click="handleReset">
        Nouveau formulaire
      </button>
    </div>

    <!-- Error feedback -->
    <div v-if="error" class="simple-form-view__error" role="alert">
      {{ error }}
    </div>

    <!-- Form -->
    <form v-if="!isSuccess" class="simple-form-view__form" @submit="onSubmit">
      <div class="simple-form-view__field">
        <label for="firstName">Prénom *</label>
        <input
          id="firstName"
          v-model="firstName"
          v-bind="firstNameAttrs"
          type="text"
          placeholder="Votre prénom"
          :class="{ 'simple-form-view__input--error': errors.firstName }"
          class="simple-form-view__input"
        />
        <small v-if="errors.firstName" class="simple-form-view__field-error">
          {{ errors.firstName }}
        </small>
      </div>

      <div class="simple-form-view__field">
        <label for="lastName">Nom *</label>
        <input
          id="lastName"
          v-model="lastName"
          v-bind="lastNameAttrs"
          type="text"
          placeholder="Votre nom"
          :class="{ 'simple-form-view__input--error': errors.lastName }"
          class="simple-form-view__input"
        />
        <small v-if="errors.lastName" class="simple-form-view__field-error">
          {{ errors.lastName }}
        </small>
      </div>

      <div class="simple-form-view__field">
        <label for="email">Email *</label>
        <input
          id="email"
          v-model="email"
          v-bind="emailAttrs"
          type="email"
          placeholder="votre@email.com"
          :class="{ 'simple-form-view__input--error': errors.email }"
          class="simple-form-view__input"
        />
        <small v-if="errors.email" class="simple-form-view__field-error">
          {{ errors.email }}
        </small>
      </div>

      <div class="simple-form-view__field">
        <label for="age">Âge *</label>
        <input
          id="age"
          v-model.number="age"
          v-bind="ageAttrs"
          type="number"
          placeholder="Votre âge"
          :class="{ 'simple-form-view__input--error': errors.age }"
          class="simple-form-view__input"
        />
        <small v-if="errors.age" class="simple-form-view__field-error">
          {{ errors.age }}
        </small>
      </div>

      <div class="simple-form-view__field">
        <label for="message">Message *</label>
        <textarea
          id="message"
          v-model="message"
          v-bind="messageAttrs"
          placeholder="Votre message (min. 10 caractères)"
          rows="4"
          :class="{ 'simple-form-view__input--error': errors.message }"
          class="simple-form-view__input"
        />
        <small v-if="errors.message" class="simple-form-view__field-error">
          {{ errors.message }}
        </small>
      </div>

      <div class="simple-form-view__actions">
        <button type="submit" class="simple-form-view__btn simple-form-view__btn--primary" :disabled="isLoading">
          {{ isLoading ? 'Envoi en cours...' : 'Soumettre' }}
        </button>
        <button type="button" class="simple-form-view__btn" @click="handleReset">
          Réinitialiser
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.simple-form-view {
  max-width: 600px;
  margin: 0 auto;
}

.simple-form-view__desc {
  color: var(--p-surface-500, #6b6b7b);
  margin-bottom: 1.5rem;
}

.simple-form-view__form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.simple-form-view__field {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.simple-form-view__field label {
  font-weight: 600;
  font-size: 0.875rem;
}

.simple-form-view__input {
  padding: 0.625rem 0.75rem;
  border: 1px solid var(--p-surface-300, #d0d0d0);
  border-radius: 6px;
  font-size: 0.875rem;
  transition: border-color 0.2s;
  font-family: inherit;
}

.simple-form-view__input:focus {
  outline: none;
  border-color: var(--p-primary-color, #6366f1);
  box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
}

.simple-form-view__input--error {
  border-color: var(--p-red-500, #ef4444);
}

.simple-form-view__input--error:focus {
  box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.2);
}

.simple-form-view__field-error {
  color: var(--p-red-500, #ef4444);
  font-size: 0.75rem;
}

.simple-form-view__actions {
  display: flex;
  gap: 0.75rem;
  margin-top: 0.5rem;
}

.simple-form-view__btn {
  padding: 0.625rem 1.25rem;
  border: 1px solid var(--p-surface-300, #d0d0d0);
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.875rem;
  background: var(--p-surface-0, #ffffff);
  transition: background-color 0.2s;
}

.simple-form-view__btn:hover {
  background-color: var(--p-surface-100, #f5f5f5);
}

.simple-form-view__btn--primary {
  background-color: var(--p-primary-color, #6366f1);
  color: white;
  border-color: var(--p-primary-color, #6366f1);
}

.simple-form-view__btn--primary:hover {
  background-color: var(--p-primary-600, #4f46e5);
}

.simple-form-view__btn--primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.simple-form-view__success {
  background: var(--p-green-50, #f0fdf4);
  border: 1px solid var(--p-green-300, #86efac);
  border-radius: 8px;
  padding: 1.25rem;
  margin-bottom: 1.5rem;
}

.simple-form-view__success h3 {
  color: var(--p-green-700, #15803d);
  margin: 0 0 0.75rem;
}

.simple-form-view__data {
  background: var(--p-surface-50, #fafafa);
  padding: 0.75rem;
  border-radius: 4px;
  font-size: 0.8125rem;
  overflow-x: auto;
}

.simple-form-view__error {
  background: var(--p-red-50, #fef2f2);
  border: 1px solid var(--p-red-300, #fca5a5);
  border-radius: 8px;
  padding: 1rem;
  color: var(--p-red-700, #b91c1c);
  margin-bottom: 1rem;
}
</style>
