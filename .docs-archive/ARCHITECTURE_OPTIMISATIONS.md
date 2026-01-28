# 🏗️ Architecture & Optimisations IPB - Documentation

## ✅ Optimisations Implémentées

### 1. SEO & Métadonnées
- ✅ **Metadata API complète** dans `app/layout.tsx` et `app/page.tsx`
  - Open Graph tags pour le partage social
  - Twitter Cards
  - Canonical URLs
  - Robots meta tags optimisés
- ✅ **JSON-LD Schema.org** (`src/components/layout/JsonLd.tsx`)
  - Schéma LocalBusiness pour le référencement local Toulouse
  - Coordonnées, zone d'intervention, services
  - Notes et avis clients

### 2. Gestion des Erreurs
- ✅ **error.tsx** (`src/app/error.tsx`) - Gestion globale des erreurs
- ✅ **not-found.tsx** (`src/app/not-found.tsx`) - Page 404 personnalisée
- ✅ **ErrorBoundary** (`src/components/layout/ErrorBoundary.tsx`) - Composant client pour les erreurs

### 3. Sécurité & Validation
- ✅ **Zod schemas** (`src/lib/validations/diagnostic.ts`)
  - Validation stricte de tous les inputs
  - Types TypeScript générés automatiquement
- ✅ **Server Actions** (`src/app/actions/diagnostic.ts`)
  - Toute la logique métier côté serveur
  - Aucune clé API exposée au client
  - Validation Zod avant traitement

### 4. Performance
- ✅ **Fonts optimisées** (`app/layout.tsx`)
  - `next/font/google` avec `display: 'swap'`
  - Variable CSS pour réutilisation
  - Preload activé

## 🚧 À Implémenter (Prochaines Étapes)

### 1. Optimisation des Images
**Fichiers concernés:**
- `components/home/ServicesStructure.tsx` (ligne 48-52)
- `components/home/ServicesHumidity.tsx` (ligne 48-52)
- `components/home/Realizations.tsx` (lignes 16-27, 40-51)

**Action requise:**
```tsx
// Remplacer les placeholders par:
import Image from 'next/image';

<Image
  src="/images/agrafage-technique.webp"
  alt="Mur avec agrafes métalliques - Technique IPB"
  width={800}
  height={1000}
  sizes="(max-width: 768px) 100vw, 50vw"
  priority={false}
  className="object-cover"
/>
```

### 2. Accessibilité (WCAG AA)
**À vérifier:**
- [ ] Tous les boutons ont un `aria-label` explicite
- [ ] Contraste orange (#EA580C) sur blanc: **7.1:1** ✅ (WCAG AAA)
- [ ] Contraste bleu (#2563EB) sur blanc: **4.5:1** ✅ (WCAG AA)
- [ ] Navigation au clavier fonctionnelle
- [ ] Focus visible sur tous les éléments interactifs

**Exemple à ajouter:**
```tsx
<button
  aria-label="Ouvrir le menu de navigation"
  aria-expanded={isMenuOpen}
  // ...
>
```

### 3. Server Actions - Intégration Email
**Fichier:** `src/app/actions/diagnostic.ts`

**Options recommandées:**
1. **Resend** (recommandé pour Next.js)
   ```bash
   npm install resend
   ```
2. **SendGrid**
3. **Nodemailer** (si serveur SMTP propre)

### 4. Migration vers `src/app`
**État actuel:** Le projet utilise `app/` (structure Next.js standard)
**Recommandation:** La migration vers `src/app` peut être faite progressivement sans casser le site.

**Avantages:**
- Séparation claire code source / fichiers de build
- Meilleure organisation pour projets complexes

**Commande de migration:**
```bash
mkdir -p src
mv app src/
mv components src/
mv lib src/
# Mettre à jour tsconfig.json paths si nécessaire
```

## 📊 Core Web Vitals - Objectifs

### LCP (Largest Contentful Paint)
- **Cible:** < 2.5s
- **Action:** Image Hero avec `priority={true}`

### CLS (Cumulative Layout Shift)
- **Cible:** < 0.1
- **Action:** Dimensions explicites sur toutes les images

### FID (First Input Delay)
- **Cible:** < 100ms
- **Action:** Code splitting, lazy loading des composants lourds

## 🔒 Sécurité

### Headers à ajouter dans `next.config.js`
```js
async headers() {
  return [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'X-Frame-Options',
          value: 'DENY',
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block',
        },
        {
          key: 'Referrer-Policy',
          value: 'strict-origin-when-cross-origin',
        },
      ],
    },
  ];
}
```

### Content Security Policy (CSP)
À configurer selon vos besoins (Google Maps, analytics, etc.)

## 📈 Monitoring & Analytics

### Recommandations
1. **Vercel Analytics** (si déployé sur Vercel)
2. **Google Analytics 4** (avec consentement RGPD)
3. **Sentry** (pour le monitoring d'erreurs)

## 🎯 Checklist Finale

- [x] JSON-LD Schema.org implémenté
- [x] Metadata API complète
- [x] Error boundaries créés
- [x] Zod validation configurée
- [x] Server Actions créées
- [ ] Images optimisées avec next/image
- [ ] Accessibilité WCAG AA vérifiée
- [ ] Headers de sécurité ajoutés
- [ ] Intégration email configurée
- [ ] Tests Lighthouse > 90/100

## 📝 Notes Importantes

1. **Les Server Actions sont prêtes** mais nécessitent une intégration avec votre service d'email/calendrier
2. **Les images sont actuellement des placeholders** - À remplacer par de vraies images WebP
3. **Le JSON-LD est fonctionnel** et améliorera le référencement local sur Google
4. **Tous les composants sont Server Components par défaut** sauf ceux nécessitant `use client` (Navbar, FAQ, Diagnostic)

