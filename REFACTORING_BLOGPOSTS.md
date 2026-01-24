# 🏗️ REFACTORISATION BLOGPOSTS - SINGLE SOURCE OF TRUTH

## 🎯 OBJECTIF

Centraliser toutes les données des articles de blog dans un seul fichier pour éviter toute désynchronisation future.

---

## ❌ PROBLÈME ACTUEL

### **Duplication des données**

Les articles de blog sont définis dans **2 endroits différents** :

1. **`app/blog/page.tsx`** (liste des articles)
   - Contient : slug, title, excerpt, date, readTime, category
   - Utilisé pour : afficher la liste des articles sur `/blog`

2. **`app/blog/[slug]/page.tsx`** (contenu complet)
   - Contient : TOUT (slug, title, excerpt, date, readTime, category, **+ content, author, metaDescription, keywords**)
   - Utilisé pour : afficher l'article complet

### **Risques**

```
❌ Duplication = Risque de désynchronisation
❌ Slug différent entre les 2 fichiers → 404 (déjà arrivé !)
❌ Title différent → Confusion SEO
❌ Date différente → Incohérence
❌ Maintenance complexe (modifier 2 fichiers)
```

---

## ✅ SOLUTION RECOMMANDÉE

### **Architecture cible : Single Source of Truth**

```
app/
├─ data/
│  └─ blog.ts ← UNIQUE SOURCE DE VÉRITÉ
│     ├─ export type BlogPost = { ... }
│     ├─ export const blogPosts = { ... }
│     └─ export const blogPostsList = Object.values(blogPosts)
│
├─ blog/
│  ├─ page.tsx ← Importe blogPostsList
│  └─ [slug]/
│     └─ page.tsx ← Importe blogPosts
│
└─ sitemap.ts ← Importe Object.keys(blogPosts)
```

---

## 📝 PLAN D'IMPLÉMENTATION

### **ÉTAPE 1 : Créer `app/data/blog.ts`**

```typescript
// app/data/blog.ts

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: 'fissures' | 'humidite' | 'conseils' | 'expertise';
  content: string;
  author: string;
  metaDescription: string;
  keywords: string[];
};

export const blogPosts: Record<string, BlogPost> = {
  'fissures-maison-toulouse-que-faire': {
    slug: 'fissures-maison-toulouse-que-faire',
    title: '...',
    excerpt: '...',
    date: '2025-06-12',
    readTime: '8 min',
    category: 'fissures',
    author: 'Expert IPB',
    metaDescription: '...',
    keywords: ['fissures maison', 'toulouse', ...],
    content: `
      <!-- Contenu HTML ici -->
    `,
  },
  // ... tous les autres articles
};

// Helper pour obtenir la liste (array)
export const blogPostsList = Object.values(blogPosts);

// Helper pour obtenir les slugs
export const blogPostsSlugs = Object.keys(blogPosts);
```

---

### **ÉTAPE 2 : Modifier `app/blog/page.tsx`**

```typescript
// app/blog/page.tsx
"use client";

import { blogPostsList } from '@/app/data/blog'; // ← Import unique

// Supprimer la définition locale de blogPosts

export default function BlogPage() {
  // Utiliser blogPostsList directement
  const filteredPosts = blogPostsList.filter(post => {
    // ... logique de filtrage
  });
  
  return (
    // ... JSX
  );
}
```

---

### **ÉTAPE 3 : Modifier `app/blog/[slug]/page.tsx`**

```typescript
// app/blog/[slug]/page.tsx

import { blogPosts, blogPostsSlugs, type BlogPost } from '@/app/data/blog'; // ← Import unique

// Supprimer la définition locale de blogPosts

export async function generateStaticParams() {
  return blogPostsSlugs.map(slug => ({ slug }));
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = blogPosts[slug];
  
  if (!post) {
    notFound();
  }
  
  // ... reste du code
}
```

---

### **ÉTAPE 4 : Modifier `app/sitemap.ts`**

```typescript
// app/sitemap.ts

import { blogPostsSlugs } from '@/app/data/blog'; // ← Import automatique

export default function sitemap(): MetadataRoute.Sitemap {
  // Plus besoin de liste hardcodée !
  const blogPages: MetadataRoute.Sitemap = blogPostsSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));
  
  return [...staticPages, ...blogPages, ...];
}
```

---

## 🎯 AVANTAGES

### **AVANT (Duplication)**
```
❌ Modifier un article = toucher 2 fichiers
❌ Risque de slug différent → 404
❌ Risque de title/date différents → SEO confus
❌ Sitemap hardcodé → peut oublier des articles
```

### **APRÈS (Single Source)**
```
✅ Modifier un article = 1 seul fichier (app/data/blog.ts)
✅ Impossible d'avoir des slugs différents
✅ Impossible d'avoir des titles/dates différents
✅ Sitemap automatique → jamais oublier d'articles
✅ Maintenance simplifiée
✅ Zéro risque de désynchronisation
```

---

## 📊 EFFORT vs IMPACT

| Critère | Note |
|---------|------|
| **Complexité** | ⚠️ Moyenne (3000+ lignes à déplacer) |
| **Temps estimé** | ⏱️ 30-45 minutes |
| **Impact bug** | 🔴 Critique (évite 404, désync) |
| **Impact maintenabilité** | 🟢 Majeur (beaucoup plus facile) |
| **Impact performance** | 🟢 Aucun (même résultat final) |
| **Recommandation** | ✅ **À FAIRE dès que possible** |

---

## 🚨 RISQUES SI PAS FAIT

1. **Bug récurrent de slugs** (déjà arrivé 1 fois)
2. **Articles oubliés dans sitemap** (déjà arrivé : 9 articles manquants)
3. **Maintenance laborieuse** (modifier 2-3 fichiers à chaque fois)
4. **Confusion développeur** (quelle est la source de vérité ?)

---

## ✅ CHECKLIST MIGRATION

Quand tu décides de le faire :

- [ ] Créer `app/data/blog.ts`
- [ ] Copier tous les articles depuis `app/blog/[slug]/page.tsx`
- [ ] Exporter `blogPosts`, `blogPostsList`, `blogPostsSlugs`
- [ ] Modifier `app/blog/page.tsx` pour importer depuis `blog.ts`
- [ ] Modifier `app/blog/[slug]/page.tsx` pour importer depuis `blog.ts`
- [ ] Modifier `app/sitemap.ts` pour importer depuis `blog.ts`
- [ ] Tester localement que tout fonctionne
- [ ] Tester que le sitemap contient tous les articles
- [ ] Commit + Push
- [ ] Vérifier sur Vercel que tout fonctionne

---

## 📝 NOTE

Cette refactorisation est **importante** mais **pas urgente**.

Le site fonctionne parfaitement avec l'architecture actuelle après les corrections apportées (slugs harmonisés, sitemap complet).

**Quand le faire ?**
- Quand tu as 30-45 minutes devant toi
- Avant d'ajouter de nouveaux articles (pour éviter de multiplier la duplication)
- Quand tu veux simplifier la maintenance future

**Priorité : MOYENNE** (amélioration architecturale, pas de bug actuel)
