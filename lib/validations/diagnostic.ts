import { z } from 'zod';

/**
 * Schémas Zod pour la validation du diagnostic
 * Tous les inputs utilisateur doivent passer par ces validations
 */

export const diagnosticPathSchema = z.enum(['fissure', 'humidite'], {
  message: 'Type de diagnostic invalide',
});

// Schéma flexible pour accepter toutes les réponses du diagnostic
// Les clés correspondent aux IDs des questions dans page.tsx
export const diagnosticAnswersSchema = z.record(
  z.string(),
  z.union([z.string(), z.array(z.string())])
).optional().default({});

export const diagnosticFormSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères').max(100),
  phone: z.string().regex(/^(\+33|0)[1-9](\d{2}){4}$/, 'Numéro de téléphone invalide'),
  email: z.string().email('Email invalide').optional(),
  path: diagnosticPathSchema,
  answers: diagnosticAnswersSchema,
  riskScore: z.number().int().min(0).max(100),
});

export const diagnosticLeadSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères').max(100),
  phone: z
    .string()
    .regex(/^(\+33|0)[1-9](\d{2}){4}$/, 'Numéro de téléphone invalide')
    .optional()
    .or(z.literal('')),
  email: z.string().email('Email invalide').optional().or(z.literal('')),
  path: diagnosticPathSchema,
  answers: diagnosticAnswersSchema,
  riskScore: z.number().int().min(0).max(100),
}).refine(
  (data) => Boolean((data.email && data.email.trim()) || (data.phone && data.phone.trim())),
  { message: 'Email ou téléphone requis.' }
);

export const diagnosticReportSchema = z.object({
  email: z.string().email('Email invalide'),
  path: diagnosticPathSchema,
  answers: diagnosticAnswersSchema,
  riskScore: z.number().int().min(0).max(100),
});

export type DiagnosticFormInput = z.infer<typeof diagnosticFormSchema>;
export type DiagnosticLeadInput = z.infer<typeof diagnosticLeadSchema>;
export type DiagnosticReportInput = z.infer<typeof diagnosticReportSchema>;
export type DiagnosticAnswers = z.infer<typeof diagnosticAnswersSchema>;

