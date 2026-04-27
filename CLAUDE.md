# CLAUDE.md — Mon site vitrine / portfolio

Ce fichier guide Claude Code pour travailler sur ce projet.

---

## Description du projet

Site vitrine / portfolio personnel développé avec Next.js et Tailwind CSS,
hébergé sur Vercel ou Netlify via GitHub.

---

## Stack technique

- **Framework** : Next.js (App Router ou Pages Router — vérifier `next.config.js`)
- **Langage** : JavaScript ou TypeScript (vérifier l'extension des fichiers : `.js`/`.jsx` ou `.ts`/`.tsx`)
- **Style** : Tailwind CSS
- **Déploiement** : Vercel / Netlify (déploiement automatique depuis GitHub)

> 💡 Pour identifier la config exacte, lancer : `cat next.config.js` et regarder l'extension des fichiers dans `src/` ou `app/` ou `pages/`.

---

## Structure du projet (typique)

```
/
├── app/              # Si App Router (Next.js 13+)
│   ├── layout.jsx
│   └── page.jsx
├── pages/            # Si Pages Router
│   └── index.jsx
├── components/       # Composants réutilisables
├── public/           # Images, fonts, fichiers statiques
├── styles/           # CSS global si besoin
├── next.config.js
├── tailwind.config.js
└── package.json
```

---

## Conventions de code

- Composants React **fonctionnels uniquement** (pas de classes)
- Un composant par fichier
- Noms de composants en **PascalCase** (`HeroSection`, `ContactCard`)
- Noms de fichiers en **kebab-case** (`hero-section.jsx`)
- Préférer les **exports nommés** aux exports default pour les composants utilitaires
- Utiliser les **classes Tailwind** directement dans le JSX — éviter le CSS inline

---

## Règles importantes

- ⚠️ Ne pas modifier `next.config.js` sans me le signaler
- ⚠️ Ne pas installer de nouvelles dépendances sans me demander d'abord
- ✅ Toujours vérifier le rendu mobile (Tailwind responsive : `sm:`, `md:`, `lg:`)
- ✅ Optimiser les images avec le composant `<Image>` de Next.js
- ✅ Garder les composants courts et lisibles (< 100 lignes si possible)
- ✅ Commits clairs et descriptifs en français ou en anglais

---

## Commandes utiles

```bash
npm run dev       # Lancer en développement (http://localhost:3000)
npm run build     # Build de production
npm run lint      # Vérifier le code
git status        # Voir les fichiers modifiés
git diff          # Voir les changements
```

---

## Ce que je veux améliorer sur ce site

<!-- À remplir selon tes besoins, exemples : -->
- [ ] Améliorer le design de la section hero
- [ ] Ajouter une page de projets
- [ ] Rendre le site 100% responsive
- [ ] Améliorer les performances (Lighthouse score)
- [ ] Ajouter des animations (Framer Motion)

---

## Ce qu'il ne faut PAS toucher

<!-- Liste ici les fichiers ou sections sensibles -->
- Les fichiers dans `public/` (images déjà optimisées)
- La configuration de déploiement (`.github/`, `vercel.json`)
