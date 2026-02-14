import { describe, it, expect, vi } from 'vitest'
import { useSimpleFormSubmit } from '../composables/useSimpleFormSubmit'

describe('useSimpleFormSubmit', () => {
  const validData = {
    firstName: 'Jean',
    lastName: 'Dupont',
    email: 'jean@example.com',
    age: 30,
    message: 'Ceci est un message valide',
  }

  it('initializes with default state', () => {
    const { isLoading, error, isSuccess, submittedData } = useSimpleFormSubmit()
    expect(isLoading.value).toBe(false)
    expect(error.value).toBeNull()
    expect(isSuccess.value).toBe(false)
    expect(submittedData.value).toBeNull()
  })

  it('submits successfully', async () => {
    vi.useFakeTimers()
    const { submit, isLoading, isSuccess, submittedData } = useSimpleFormSubmit()

    const submitPromise = submit(validData)
    expect(isLoading.value).toBe(true)

    await vi.advanceTimersByTimeAsync(1000)
    await submitPromise

    expect(isLoading.value).toBe(false)
    expect(isSuccess.value).toBe(true)
    expect(submittedData.value).toEqual(validData)
    vi.useRealTimers()
  })

  it('resets state', async () => {
    vi.useFakeTimers()
    const { submit, reset, isSuccess, submittedData } = useSimpleFormSubmit()

    const submitPromise = submit(validData)
    await vi.advanceTimersByTimeAsync(1000)
    await submitPromise

    expect(isSuccess.value).toBe(true)

    reset()
    expect(isSuccess.value).toBe(false)
    expect(submittedData.value).toBeNull()
    vi.useRealTimers()
  })
})
