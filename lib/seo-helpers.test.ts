import { describe, it, expect } from 'vitest';
import { generateFAQSchema, extractFAQsFromContent, generateReviewSchema } from './seo-helpers';

describe('SEO Helpers', () => {
  describe('extractFAQsFromContent', () => {
    it('should extract FAQs from content with Q&A pattern', () => {
      const content = `
        <h3>Q : Comment savoir si ma fissure est dangereuse ?</h3>
        <p>R : Une fissure devient préoccupante si elle évolue...</p>
        <h3>Q : L'agrafage va-t-il laisser des cicatrices ?</h3>
        <p>R : Non. Notre méthode inclut une finition soignée...</p>
      `;
      
      const faqs = extractFAQsFromContent(content);
      
      expect(faqs).toHaveLength(2);
      expect(faqs[0].question).toContain('Comment savoir si ma fissure est dangereuse');
      expect(faqs[0].answer).toContain('Une fissure devient préoccupante');
    });

    it('should return empty array when no FAQs found', () => {
      const content = '<p>Just some regular content</p>';
      const faqs = extractFAQsFromContent(content);
      
      expect(faqs).toHaveLength(0);
    });

    it('should handle malformed HTML gracefully', () => {
      const content = '<h3>Q : Question without answer</h3>';
      const faqs = extractFAQsFromContent(content);
      
      expect(Array.isArray(faqs)).toBe(true);
    });
  });

  describe('generateFAQSchema', () => {
    it('should generate valid FAQPage schema when FAQs exist', () => {
      const content = `
        <h3>Q : Comment réparer une fissure ?</h3>
        <p>R : Il faut d'abord diagnostiquer la cause...</p>
      `;
      
      const schema = generateFAQSchema(content);
      
      expect(schema).toBeDefined();
      expect(schema).toHaveProperty('@type', 'FAQPage');
      expect(schema).toHaveProperty('mainEntity');
      expect(Array.isArray(schema.mainEntity)).toBe(true);
    });

    it('should return null when no FAQs found', () => {
      const content = '<p>No FAQs here</p>';
      const schema = generateFAQSchema(content);
      
      expect(schema).toBeNull();
    });
  });

  describe('generateReviewSchema', () => {
    it('should generate Review schema with valid structure', () => {
      const schema = generateReviewSchema();
      
      expect(schema).toBeDefined();
      expect(schema).toHaveProperty('@type', 'Review');
      expect(schema).toHaveProperty('reviewRating');
      expect(schema.reviewRating.ratingValue).toBe('5');
    });

    it('should include author information', () => {
      const schema = generateReviewSchema();
      
      expect(schema).toHaveProperty('author');
      expect(schema.author['@type']).toBe('Person');
    });
  });
});
