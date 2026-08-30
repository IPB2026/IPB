import { describe, it, expect } from 'vitest';
import {
  generateFAQSchema,
  extractFAQsFromContent,
  generateReviewSchema,
  IPB_RATING_VALUE,
  IPB_REVIEW_COUNT,
} from './seo-helpers';

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

    // Non-régression : un <h3> qui ne se termine pas par « ? » ne doit pas
    // faire déborder l'extraction jusqu'au prochain « ? » de l'article. Le
    // pattern glouton produisait des « questions » de plusieurs milliers de
    // caractères, balises comprises, et masquait les vraies FAQ situées après.
    it('ne laisse pas un h3 sans point d\'interrogation avaler le reste de l\'article', () => {
      const content = `
        <h3>Un titre de section sans interrogation</h3>
        <p>Du corps d'article, avec <strong>du balisage</strong>.</p>
        <h2>Une autre section</h2>
        <p>Encore du corps.</p>
        <h3>La vraie question posée ici ?</h3>
        <p>La vraie réponse.</p>
      `;

      const faqs = extractFAQsFromContent(content);

      expect(faqs).toHaveLength(1);
      expect(faqs[0].question).toBe('La vraie question posée ici ?');
      expect(faqs[0].answer).toBe('La vraie réponse.');
      expect(faqs[0].question.length).toBeLessThan(200);
    });
  });

  describe('generateFAQSchema', () => {
    // generateFAQSchema reçoit désormais un FAQItem[] déjà extrait
    // (extractFAQsFromContent fait l'extraction en amont).
    it('should generate valid FAQPage schema when FAQs exist', () => {
      const faqs = [
        { question: 'Comment réparer une fissure ?', answer: "Il faut d'abord diagnostiquer la cause..." },
      ];

      const schema = generateFAQSchema(faqs);

      expect(schema).toBeDefined();
      expect(schema).toHaveProperty('@type', 'FAQPage');
      expect(schema).toHaveProperty('mainEntity');
      expect(Array.isArray(schema.mainEntity)).toBe(true);
      expect(schema.mainEntity).toHaveLength(1);
      expect(schema.mainEntity[0].name).toBe('Comment réparer une fissure ?');
    });

    // Le contrat « pas de schéma quand il n'y a pas de FAQ » vit chez l'appelant
    // (app/blog/[slug]/page.tsx : faqs.length > 0 ? generateFAQSchema(faqs) : null).
    it('should produce no schema when no FAQs are found (caller guards on length)', () => {
      const content = '<p>No FAQs here</p>';
      const faqs = extractFAQsFromContent(content);
      const schema = faqs.length > 0 ? generateFAQSchema(faqs) : null;

      expect(faqs).toHaveLength(0);
      expect(schema).toBeNull();
    });
  });

  describe('generateReviewSchema', () => {
    // Le schéma émet désormais un LocalBusiness + AggregateRating réel
    // (avis Google centralisés) au lieu d'un Review/Person fabriqué.
    it('should generate a LocalBusiness schema with aggregateRating', () => {
      const schema = generateReviewSchema('Article de test');

      expect(schema).toBeDefined();
      expect(schema).toHaveProperty('@type', 'LocalBusiness');
      expect(schema).toHaveProperty('aggregateRating');
      expect(schema.aggregateRating['@type']).toBe('AggregateRating');
      expect(schema.aggregateRating.ratingValue).toBe(IPB_RATING_VALUE);
      expect(schema.aggregateRating.reviewCount).toBe(IPB_REVIEW_COUNT);
    });

    it('should include the IPB business identity and postal address', () => {
      const schema = generateReviewSchema('Article de test');

      expect(schema).toHaveProperty('name');
      expect(schema.name).toContain('IPB');
      expect(schema.address['@type']).toBe('PostalAddress');
      expect(schema.address.addressCountry).toBe('FR');
    });
  });
});
