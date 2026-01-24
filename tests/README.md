# 🧪 Tests Unitaires - IPB Expertise

## 📦 Installation

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom @vitejs/plugin-react jsdom @vitest/ui
```

## 🚀 Commandes

```bash
# Lancer les tests en mode watch
npm test

# Tests avec interface UI interactive
npm run test:ui

# Tests avec rapport de couverture
npm run test:coverage
```

## 📁 Structure

```
tests/
├── setup.ts                              # Configuration globale des tests
lib/
├── seo-helpers.test.ts                   # Tests des helpers SEO
└── validations/
    └── diagnostic.test.ts                # Tests des schémas Zod
components/
└── ui/
    └── FaqSection.test.tsx               # Tests du composant FAQ
```

## ✅ Tests Actuels

### 1. SEO Helpers (`lib/seo-helpers.test.ts`)

**Teste :**
- ✅ Extraction de FAQs depuis le HTML
- ✅ Génération de schéma FAQPage JSON-LD
- ✅ Génération de schéma Review
- ✅ Gestion des cas d'erreur

**Exemple :**
```typescript
it('should extract FAQs from content with Q&A pattern', () => {
  const content = `
    <h3>Q : Comment savoir si ma fissure est dangereuse ?</h3>
    <p>R : Une fissure devient préoccupante...</p>
  `;
  
  const faqs = extractFAQsFromContent(content);
  
  expect(faqs).toHaveLength(1);
  expect(faqs[0].question).toContain('Comment savoir');
});
```

### 2. Validations Zod (`lib/validations/diagnostic.test.ts`)

**Teste :**
- ✅ Validation des réponses du diagnostic
- ✅ Validation des données de contact (email, téléphone)
- ✅ Règles métier (email OU téléphone obligatoire)
- ✅ Formats d'email invalides
- ✅ Longueur minimale du nom

**Exemple :**
```typescript
it('should reject if both email and phone are missing', () => {
  const invalidData = { name: 'Test User' };
  const result = diagnosticLeadSchema.safeParse(invalidData);
  
  expect(result.success).toBe(false);
});
```

### 3. Composant FAQ (`components/ui/FaqSection.test.tsx`)

**Teste :**
- ✅ Rendu du titre
- ✅ Rendu de toutes les questions
- ✅ Application du thème (orange/blue)
- ✅ Comportement avec données vides

**Exemple :**
```typescript
it('should render all FAQ questions', () => {
  render(
    <FaqSection
      title="Questions fréquentes"
      data={mockFaqData}
      theme="orange"
    />
  );

  expect(screen.getByText('Comment savoir si ma fissure est dangereuse ?')).toBeInTheDocument();
});
```

## 📊 Couverture de Code

Cible : **>80% de couverture**

```bash
npm run test:coverage
```

Générera un rapport détaillé dans `coverage/index.html`

## 🔧 Ajouter de Nouveaux Tests

### Pour une fonction utilitaire

Créer `path/to/file.test.ts` :

```typescript
import { describe, it, expect } from 'vitest';
import { myFunction } from './file';

describe('myFunction', () => {
  it('should do something', () => {
    const result = myFunction('input');
    expect(result).toBe('expected');
  });
});
```

### Pour un composant React

Créer `components/MyComponent.test.tsx` :

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
  it('should render correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
```

## 🎯 Bonnes Pratiques

1. **Nomenclature** : `*.test.ts` ou `*.test.tsx`
2. **Organisation** : Un fichier de test par fichier source
3. **Couverture** : Tester les cas normaux ET les erreurs
4. **Clarté** : Noms de tests descriptifs en français ou anglais
5. **Isolation** : Chaque test doit être indépendant

## 📚 Ressources

- [Vitest Docs](https://vitest.dev/)
- [Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Jest DOM Matchers](https://github.com/testing-library/jest-dom)

## ✅ Checklist Avant Déploiement

- [ ] Tous les tests passent (`npm test`)
- [ ] Couverture >80% sur les fichiers critiques
- [ ] Pas de tests `it.skip()` ou `describe.skip()`
- [ ] Tests ajoutés pour chaque nouveau fichier critique

---

**💪 Tests = Confiance = Production Sereine !**
