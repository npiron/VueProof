import { ref } from 'vue'
import type { SimpleFormData } from '../types/simpleForm.types'

export function useSimpleFormSubmit() {
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const isSuccess = ref(false)
  const submittedData = ref<SimpleFormData | null>(null)

  async function submit(data: SimpleFormData): Promise<void> {
    isLoading.value = true
    error.value = null
    isSuccess.value = false

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      submittedData.value = { ...data }
      isSuccess.value = true
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Une erreur est survenue'
    } finally {
      isLoading.value = false
    }
  }

  function reset(): void {
    isLoading.value = false
    error.value = null
    isSuccess.value = false
    submittedData.value = null
  }

  return { isLoading, error, isSuccess, submittedData, submit, reset }
}
