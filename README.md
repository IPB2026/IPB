# IPB - Plateforme de Diagnostic

Application Next.js 14 avec App Router pour le diagnostic et les solutions IPB.

## Installation

```bash
npm install
```

## Développement

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## Build

```bash
npm run build
npm start
```

> **Prérequis après un `git pull`.** Si le build échoue sur une erreur de types
> Prisma (par exemple `'leadId' does not exist in type 'FactureSelect'`), le
> client Prisma est désynchronisé du schéma. Régénérez-le :
>
> ```bash
> npx prisma generate
> ```
>
> `npm install` le fait automatiquement (script `postinstall`), mais pas un
> simple `git pull` qui modifie `prisma/schema.prisma`.

## Structure du Projet

- `app/` - Pages et routes Next.js
- `components/` - Composants React réutilisables
- `components/ui/` - Composants shadcn-ui
- `lib/` - Utilitaires et helpers

## Technologies

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- shadcn-ui
- Framer Motion
- Lucide React

## Couleurs IPB

- Orange: `#EA580C`
- Bleu: `#2563EB`
- Slate: `#0F172A`

