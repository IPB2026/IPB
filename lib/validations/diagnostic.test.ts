import { describe, it, expect } from 'vitest';
import { diagnosticAnswersSchema, diagnosticLeadSchema } from './diagnostic';

describe('Diagnostic Validations', () => {
  describe('diagnosticAnswersSchema', () => {
    it('should validate valid diagnostic answers', () => {
      const validData = {
        FORME_FISSURE: 'escalier',
        LARGEUR_FISSURE: '2mm',
        ÉVOLUTION: 'stable',
        SIGNES: ['portes'],
        URGENCE: 'modérée',
      };

      const result = diagnosticAnswersSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    // Le schéma est volontairement flexible (z.record(string, string | string[]))
    // pour accepter toutes les réponses du diagnostic : il ne valide donc plus
    // des valeurs d'énumération précises, mais le TYPE des valeurs.
    it('should reject answer values that are neither string nor string[]', () => {
      const invalidData = {
        FORME_FISSURE: 42, // ni string ni string[] → rejeté
      };

      const result = diagnosticAnswersSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('should handle optional fields', () => {
      const minimalData = {
        FORME_FISSURE: 'verticale',
      };

      const result = diagnosticAnswersSchema.safeParse(minimalData);
      expect(result.success).toBe(true);
    });
  });

  describe('diagnosticLeadSchema', () => {
    it('should validate valid lead data with email', () => {
      const validData = {
        name: 'Jean Dupont',
        email: 'jean.dupont@example.com',
        phone: '0612345678',
        path: 'fissure',
        riskScore: 50,
      };

      const result = diagnosticLeadSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should validate valid lead data with phone only', () => {
      const validData = {
        name: 'Marie Martin',
        phone: '06 12 34 56 78',
        path: 'fissure',
        riskScore: 30,
      };

      const result = diagnosticLeadSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should reject if both email and phone are missing', () => {
      const invalidData = {
        name: 'Test User',
        path: 'fissure',
        riskScore: 20,
      };

      const result = diagnosticLeadSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('should reject invalid email format', () => {
      const invalidData = {
        name: 'Test User',
        email: 'invalid-email',
        phone: '0612345678',
        path: 'fissure',
        riskScore: 20,
      };

      const result = diagnosticLeadSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('should reject too short name', () => {
      const invalidData = {
        name: 'A',
        email: 'test@example.com',
        path: 'fissure',
        riskScore: 20,
      };

      const result = diagnosticLeadSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });
});
