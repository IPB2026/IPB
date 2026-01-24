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

    it('should reject invalid FORME_FISSURE value', () => {
      const invalidData = {
        FORME_FISSURE: 'invalid_value',
        LARGEUR_FISSURE: '2mm',
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
      };

      const result = diagnosticLeadSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should validate valid lead data with phone only', () => {
      const validData = {
        name: 'Marie Martin',
        phone: '06 12 34 56 78',
      };

      const result = diagnosticLeadSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should reject if both email and phone are missing', () => {
      const invalidData = {
        name: 'Test User',
      };

      const result = diagnosticLeadSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('should reject invalid email format', () => {
      const invalidData = {
        name: 'Test User',
        email: 'invalid-email',
        phone: '0612345678',
      };

      const result = diagnosticLeadSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('should reject too short name', () => {
      const invalidData = {
        name: 'A',
        email: 'test@example.com',
      };

      const result = diagnosticLeadSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });
});
