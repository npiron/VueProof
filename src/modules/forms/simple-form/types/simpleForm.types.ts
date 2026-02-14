import { z } from 'zod'

export const simpleFormSchema = z.object({
  firstName: z
    .string()
    .min(2, 'Le prénom doit contenir au moins 2 caractères')
    .max(50, 'Le prénom ne peut pas dépasser 50 caractères'),
  lastName: z
    .string()
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .max(50, 'Le nom ne peut pas dépasser 50 caractères'),
  email: z.string().email('Adresse email invalide'),
  age: z
    .number({ invalid_type_error: "L'âge doit être un nombre" })
    .int("L'âge doit être un nombre entier")
    .min(18, 'Vous devez avoir au moins 18 ans')
    .max(120, "L'âge ne peut pas dépasser 120 ans"),
  message: z
    .string()
    .min(10, 'Le message doit contenir au moins 10 caractères')
    .max(500, 'Le message ne peut pas dépasser 500 caractères'),
})

export type SimpleFormData = z.infer<typeof simpleFormSchema>
