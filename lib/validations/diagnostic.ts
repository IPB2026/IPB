import { z } from 'zod';

/**
 * Schémas Zod pour la validation du diagnostic
 * Tous les inputs utilisateur doivent passer par ces validations
 */

export const diagnosticPathSchema = z.enum(['fissure', 'humidite'], {
  message: 'Type de diagnostic invalide',
});

export const diagnosticAnswersSchema = z.object({
  TYPE: z.enum(['fissure', 'humidite']).optional(),
  LOC_FISSURE: z.array(z.string()).optional(),
  FORME_FISSURE: z.array(z.string()).optional(),
  SIGNES: z.array(z.string()).optional(),
  SYMP_HUM: z.array(z.string()).optional(),
  VENTILATION: z.enum(['vmc_ok', 'naturelle', 'aucune', 'nsp']).optional(),
  HAUTEUR: z.enum(['bas', 'total', 'spot', 'nsp']).optional(),
  AGE: z.enum(['ancien', 'moderne', 'neuf', 'nsp']).optional(),
  CONTEXTE: z.array(z.string()).optional(),
  ENV: z.enum(['arbres', 'pente', 'neutre', 'nsp']).optional(),
  STATUT: z.enum(['proprietaire', 'locataire', 'autre']).optional(),
  URGENCE: z.enum(['absolue', 'moderee', 'preventif', 'nsp']).optional(),
});

export const diagnosticFormSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères').max(100),
  phone: z.string().regex(/^(\+33|0)[1-9](\d{2}){4}$/, 'Numéro de téléphone invalide'),
  email: z.string().email('Email invalide').optional(),
  path: diagnosticPathSchema,
  answers: diagnosticAnswersSchema,
  riskScore: z.number().int().min(0).max(100),
});

export const diagnosticReportSchema = z.object({
  email: z.string().email('Email invalide'),
  path: diagnosticPathSchema,
  answers: diagnosticAnswersSchema,
  riskScore: z.number().int().min(0).max(100),
});

export type DiagnosticFormInput = z.infer<typeof diagnosticFormSchema>;
export type DiagnosticReportInput = z.infer<typeof diagnosticReportSchema>;
export type DiagnosticAnswers = z.infer<typeof diagnosticAnswersSchema>;

