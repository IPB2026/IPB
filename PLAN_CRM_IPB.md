# PLAN — CRM & Générateur de rapports IPB

> Back-office de gestion d'activité intégré au site Next.js existant.
> Objectif : ne plus perdre un seul lead, piloter le pipeline, automatiser
> relances + devis + factures, et générer des rapports d'expertise haut de gamme.
>
> Créé le 13 juin 2026.

---

## 0. VISION CIBLE (mise à jour 13 juin 2026)

Plateforme unique **accessible en permanence** (web déployé, responsive bureau + terrain),
multi-utilisateurs, articulée en 7 briques :

| # | Brique | Détail | Pour qui |
|---|---|---|---|
| A | **CRM commercial** | Prospects, pipeline, relances, saisie manuelle (80 % par tél.) | Admin |
| B | **Multi-utilisateurs & rôles** | ADMIN (tout) + EXPERT (diagnostiqueurs, accès restreint à leurs interventions) | Équipe |
| C | **App terrain** | Le diagnostiqueur saisit observations + photos **pendant l'intervention** (mobile/PWA, idéalement utilisable hors-ligne) | Diagnostiqueurs |
| D | **Générateur de rapports IA** | Claude transforme la saisie terrain (zones, mesures, photos) en rapport haut de gamme façon cabinet — **gabarit = rapport GARCIA**. L'expert relit/valide avant publication. | Admin + experts |
| E | **Devis & Factures** | Génération PDF charte IPB + envoi client | Admin |
| F | **Automatisations e-mail** | Relances auto (séquences), envoi des devis/factures/rapports | Système |
| G | **Suivi & communication client** | Historique, échanges, transmission des documents | Admin |

**Chaîne maîtresse : C → D** (le terrain alimente l'IA qui produit le rapport).

### Implications techniques nouvelles
- **Rôles & permissions** : EXPERT ne voit que ses interventions assignées ; ADMIN voit tout.
- **Entités à ajouter** : `Intervention` (assignée à un expert, liée à un Lead/Contact),
  `Observation` (par zone : constatations, mesures, gravité), `Photo` (Vercel Blob, légende),
  `Rapport` (généré par IA depuis l'intervention, statut brouillon → validé → envoyé).
- **IA** : intégration **Claude** (Anthropic) côté serveur ; le style/structure du rapport GARCIA
  + la bibliothèque de paragraphes-types (réfs ITSIM/DTU/BRGM) guident la génération ;
  vision possible sur les photos. **L'expert valide toujours** avant envoi (responsabilité).
- **E-mail** : sortant via SMTP existant (`contact@ipb-expertise.fr`) ; relances via Vercel Cron.
  Réception/suivi des réponses = option à trancher (plus complexe).
- **Accès permanent** : déjà sur Vercel ; envisager **PWA installable** pour l'app terrain.
- **Hors-ligne terrain** : capture photos/notes sans réseau = option à étudier (chantiers mal couverts).

### Décisions vision (actées 13 juin 2026)
- **E-mail** : envoi sortant + relances automatiques (Vercel Cron). Réception/suivi des réponses = reporté.
- **IA rapports** : **Claude (Anthropic)**, clé API à créer. L'expert valide chaque rapport avant envoi.
- **App terrain** : **PWA installable, en ligne** (pas de hors-ligne au départ).

### Ordre de construction (mode autonome — j'enchaîne)
0. ✅ Fondations (Neon connecté, migration, auth, capture leads).
1. ✅ **CRM pipeline + relances** — fiche interactive + relances dashboard.
2. ⏳ **Devis & Factures** — PDF charte IPB (`REFERENCE_DOCUMENTS_IPB.md`), numérotation, 293 B, conversion devis→facture.
3. **Agenda & Google Calendar** *(NOUVEAU)* — voir §12.
4. **Rôles & comptes experts** (Phase B) — prérequis app terrain.
5. **App terrain** (Phase C) — saisie intervention + photos (PWA).
6. **Générateur de rapports IA** (Phase D) — Claude.
7. **Automatisations e-mail** (Phase F) — relances + **envoi facture après diagnostic** (§12).
8. **Suivi & communication client** (Phase G).

### Prérequis externes à fournir (au fil de l'eau)
- **Phase 2** : aucune (j'installe `@react-pdf/renderer`).
- **Agenda** : identifiants **Google Cloud OAuth** (Client ID/Secret) + un consentement unique du compte `contact@ipb-expertise.fr` (je guiderai).
- **Rapports IA** : **clé API Anthropic** (Claude).
- **Envoi e-mail/factures** : SMTP déjà en place (`contact@ipb-expertise.fr`).
- **Photos terrain** : **Vercel Blob** token.

---

## 12. Agenda & Google Calendar + workflow facture (NOUVEAU)

**Besoin** : agenda interne qui suit les **RDV de diagnostic**, connecté à **Google Agenda** :
1. Créer un RDV diagnostic dans le CRM (lié à un prospect) → **événement Google Calendar** créé avec le client en invité → **invitation envoyée automatiquement** par Google.
2. Le RDV apparaît dans l'agenda interne (vue jour/semaine) et dans la fiche prospect.
3. **Workflow facture-après-diagnostic** : quand le RDV est marqué **« réalisé »**, déclenche la **génération + l'envoi de la facture** de l'intervention au client (depuis le devis lié ou le tarif diagnostic).

**Technique** :
- Modèle `Appointment` (RDV) : prospect/contact, expert assigné, date/heure, type (diagnostic…), statut (planifié / confirmé / réalisé / annulé), `googleEventId`.
- Intégration **googleapis** (OAuth2 + refresh token côté serveur, compte IPB) — events.insert avec `attendees` + `sendUpdates: 'all'` pour l'invitation auto.
- Synchro CRM → Calendar (v1 : création/màj/annulation). Lecture inverse possible plus tard.
- Déclencheur « réalisé » → action `genererEtEnvoyerFacture` (réutilise le moteur PDF Phase 2 + SMTP). D'abord en **1 clic**, puis automatisable via Vercel Cron / trigger.

---

## 1. Décisions d'architecture (actées)

| Sujet | Choix | Raison |
|---|---|---|
| **Emplacement** | Back-office `/admin` **dans le projet Next.js actuel** | Un seul déploiement Vercel ; les leads des 4 formulaires tombent directement en base sans pont externe ; `/admin` en `noindex` → SEO intact. |
| **Base de données** | **Neon** (PostgreSQL serverless) | Gratuit, natif Vercel, parfait avec Prisma. |
| **Stockage fichiers** | **Vercel Blob** (photos rapports, logos) | Natif Vercel, pas de service tiers. |
| **ORM** | **Prisma** | Standard, migrations, typage. |
| **Auth** | **Auth.js (NextAuth v5)** — credentials | 1-2 utilisateurs (vous + Ludovic), simple et sécurisé. |
| **PDF** | **@react-pdf/renderer** | Contrôle pixel, charte IPB (Playfair Display + DM Sans). |

### Nouvelles dépendances à installer (Phase 0)
`prisma`, `@prisma/client`, `next-auth@beta`, `@auth/prisma-adapter`, `bcryptjs`, `@vercel/blob`.
*(PDF : `@react-pdf/renderer` ajouté en Phase 2.)*

### Variables d'environnement à ajouter
- `DATABASE_URL` (Neon — fourni par vous après création du projet Neon)
- `AUTH_SECRET` (généré : `npx auth secret`)
- `BLOB_READ_WRITE_TOKEN` (Vercel Blob)

### Briques existantes réutilisées (rien à réécrire)
- `lib/leadScoring.ts` — scoring HOT/WARM/COLD (fissures + mur porteur)
- `lib/validations/*` — schémas Zod des formulaires
- `lib/email.ts` + `lib/emailTemplates.ts` — envoi + relances J+1/3/7/14 (déjà écrites, jamais branchées)
- `app/data/villes.ts` — géologie, RGA, arrêtés CAT-NAT → enrichit les rapports

---

## 2. Modèle de données (Prisma — vue d'ensemble)

```
User          comptes admin (vous, Ludovic)
Contact       le prospect/client : nom, tel, email, adresse, ville, CP,
              statut (propriétaire/locataire), type de bien
Lead          une demande entrante : source (diagnostic/calculateur/contact/
              rappel), service (fissures/humidité/expertise/mur-porteur),
              score, tier HOT/WARM/COLD, payload brut (JSON), étape pipeline
Activity      timeline : appel, email, note, RDV, relance planifiée
Devis         numéro, contact, lignes, totaux, statut, validité
DevisLine     désignation, quantité, PU, total
Facture       numéro, contact, devis lié, lignes, mention TVA 293 B,
              acompte, statut (brouillon/envoyée/payée)
Rapport       type, contact, ville, sections (JSON), photos, conclusions,
              statut, URL PDF généré
Photo         rapportId, URL Vercel Blob, légende
```

**Pipeline (étapes du Lead)** :
`NOUVEAU → À RAPPELER → RDV PLANIFIÉ → VISITE FAITE → DEVIS ENVOYÉ → GAGNÉ / PERDU`

---

## 3. Phases de livraison

### Phase 0 — Fondations *(le déblocage)* — ✅ CODE LIVRÉ (13 juin 2026)
> Reste à faire côté utilisateur : créer la base Neon + migration. Voir `SETUP_CRM.md`.
- Installer dépendances + initialiser Prisma + Neon.
- Schéma de base (User, Contact, Lead, Activity) + 1re migration.
- Auth.js : page de connexion, protection `/admin`, middleware.
- **Brancher les 4 server actions** (diagnostic, calculateur, contact, rappel)
  pour **persister chaque lead en base** (en plus de l'email — non bloquant si
  la base est indispo, l'email part quand même).
- Coquille `/admin` (layout, nav, `noindex`).
- ✅ Résultat : plus aucun lead perdu, tout est tracé.

### Phase 1 — CRM
- Liste des leads (filtres : tier, source, étape, ville) + recherche.
- Vue pipeline (kanban) glisser-déposer entre étapes.
- Fiche prospect : coordonnées, historique, payload diagnostic, score détaillé.
- Activités + **relances planifiées** avec rappels (à faire aujourd'hui).
- ✅ Résultat : vous pilotez l'activité au quotidien.

### Phase 2 — Devis & Factures
- Éditeur de devis (lignes, quantités, PU, totaux).
- **PDF charte IPB** (Playfair + DM Sans, logo, coordonnées légales).
- Numérotation légale séquentielle (DEV-2026-001 / FAC-2026-001).
- **Mention « TVA non applicable, art. 293 B du CGI »** (franchise en base).
- Mentions légales obligatoires (SIRET 908 995 103 00029, conditions, pénalités).
- Conversion devis accepté → facture en 1 clic, gestion acompte.
- Statuts + envoi par email au client.
- ✅ Résultat : facturation conforme et rapide.

### Phase 3 — Rapports d'expertise *(demande clé)*
- Générateur PDF par type : **fissures · humidité · mur porteur**.
- Structure type : page de garde, contexte/bien, constats, photos légendées,
  analyse (géologie/RGA/CAT-NAT auto-injectés depuis `villes.ts`),
  préconisations, conclusion, signature expert (Ludovic).
- Upload photos (Vercel Blob), mise en page éditoriale premium.
- Bibliothèque de paragraphes-types réutilisables.
- ✅ Résultat : rapports haut de gamme générés en minutes.

### Phase 4 — Automatisation & pilotage
- Relances email automatiques (séquence J+1/3/7/14 déjà écrite) via **Vercel Cron**.
- Dashboard KPIs : leads/mois, taux de conversion, CA devis/factures, relances dues.
- Alertes leads HOT non rappelés.
- ✅ Résultat : pilote automatique + visibilité business.

---

## 4. Ce dont j'ai besoin de vous (Phase 0)

1. **Créer un projet Neon** (gratuit) sur https://neon.tech → me coller la
   `DATABASE_URL` dans `.env.local`. *(Je vous guide pas à pas.)*
2. **Feu vert pour installer les dépendances** Phase 0 (listées §1).
3. Confirmer les **identifiants de connexion** souhaités (votre email + un mot
   de passe pour l'accès `/admin`).

Le reste (schéma, code, branchements, UI) est à ma charge.

---

## 5. Ordre recommandé

On démarre par **Phase 0 + Phase 1** (le cœur CRM) comme premier livrable :
c'est ce qui débloque immédiatement le suivi des leads. Devis/factures (Phase 2)
et rapports (Phase 3) s'appuient dessus et viennent ensuite.
