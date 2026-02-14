import { describe, it, expect } from 'vitest'
import { simpleFormSchema } from '../types/simpleForm.types'

describe('simpleFormSchema', () => {
  const validData = {
    firstName: 'Jean',
    lastName: 'Dupont',
    email: 'jean@example.com',
    age: 30,
    message: 'Ceci est un message de test valide',
  }

  it('accepts valid data', () => {
    const result = simpleFormSchema.safeParse(validData)
    expect(result.success).toBe(true)
  })

  it('rejects empty firstName', () => {
    const result = simpleFormSchema.safeParse({ ...validData, firstName: '' })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0]?.path).toEqual(['firstName'])
    }
  })

  it('rejects firstName too short', () => {
    const result = simpleFormSchema.safeParse({ ...validData, firstName: 'J' })
    expect(result.success).toBe(false)
  })

  it('rejects invalid email', () => {
    const result = simpleFormSchema.safeParse({ ...validData, email: 'not-an-email' })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0]?.path).toEqual(['email'])
    }
  })

  it('rejects age under 18', () => {
    const result = simpleFormSchema.safeParse({ ...validData, age: 15 })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0]?.path).toEqual(['age'])
    }
  })

  it('rejects age over 120', () => {
    const result = simpleFormSchema.safeParse({ ...validData, age: 150 })
    expect(result.success).toBe(false)
  })

  it('rejects non-integer age', () => {
    const result = simpleFormSchema.safeParse({ ...validData, age: 25.5 })
    expect(result.success).toBe(false)
  })

  it('rejects message too short', () => {
    const result = simpleFormSchema.safeParse({ ...validData, message: 'Court' })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0]?.path).toEqual(['message'])
    }
  })

  it('rejects message too long', () => {
    const result = simpleFormSchema.safeParse({ ...validData, message: 'a'.repeat(501) })
    expect(result.success).toBe(false)
  })
})
