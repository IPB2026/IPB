# CONTEXTE BUSINESS — IPB Expertise

> **But de ce fichier** : document de référence unique sur le business IPB et son site.
> Il sert de mémoire à Claude pour rester aligné à chaque session, sans avoir à
> tout réexpliquer. À mettre à jour quand le positionnement, l'offre, les chiffres
> ou la stack évoluent.
>
> Dernière synthèse : 13 juin 2026.

---

## 1. En une phrase

IPB Expertise est un **institut indépendant de coordination spécialisé dans la
pathologie et la structure du bâtiment**, basé à Toulouse et intervenant en
Occitanie. Il **diagnostique, conçoit, coordonne et supervise** — il ne réalise
pas lui-même les travaux. Les travaux sont **exécutés sous garantie décennale
10 ans par les équipes de réalisation du réseau IPB**.

Le site web est une **machine à générer des leads qualifiés** (SEO local + diagnostic
en ligne), pas une simple vitrine.

---

## 2. Positionnement (à respecter absolument dans toute rédaction)

IPB se présente comme un **institut**, pas comme une entreprise de travaux ni un
simple cabinet d'expertise. C'est un positionnement **premium, sobre, crédible** —
jamais « vendeur agressif ».

Lexique imposé :

- IPB **diagnostique · conçoit · coordonne · supervise · accompagne**.
- Les travaux sont **exécutés / réalisés / mis en œuvre par les équipes de
  réalisation du réseau IPB**, sous décennale 10 ans.
- Un **interlocuteur unique**, du premier regard à la livraison.

**Formulations interdites** (risque juridique DGCCRF / cohérence) :
« notre décennale », « décennale dédiée IPB », « entreprise partenaire »,
« partenaire technique », « notre partenaire technique », et la mention
« visite gratuite » (retirée du discours commercial).

Signature de marque (H1 actuel) :
*« Votre bien montre des signes. Notre institut les comprend. »*
Eyebrow : *« Institut de pathologie & structure du bâtiment · Occitanie »*.

---

## 3. Offre — 4 services / 3 familles

| Famille | Service | Description |
|---|---|---|
| **Diagnostic de pathologies** | Fissures | Diagnostic de fissures (agrafage, micropieux, sécheresse/RGA, CAT-NAT). |
| **Diagnostic de pathologies** | Humidité & infiltrations | Remontées capillaires, condensation, salpêtre, mérule, VMI/ventilation. |
| **Expertise** | Expertise avant achat immobilier | Institut indépendant, jamais réalisateur des travaux. |
| **Travaux de structure** | Ouverture de mur porteur | Étude de faisabilité + ouverture (cuisine ouverte, baie vitrée, etc.). |

> Note : le métier *Bureau d'études structure* a été **retiré de la home** et
> reformulé en *Coordination d'études structure* sur sa page dédiée
> (`/bureau-etude-structure-toulouse`), statut « en attente décision client »
> (publier la reformulation ou passer en `noindex`).

**Deux produits phares à vendre** : (1) le diagnostic d'expertise fissures,
(2) l'étude de faisabilité + travaux de mur porteur / baie vitrée.

---

## 4. Zone d'intervention & coordonnées

> Données confirmées sur le site en ligne (https://www.ipb-expertise.fr, juin 2026).

- **Nom complet** : IPB — Institut de Pathologie du Bâtiment.
- **Zone** : Occitanie — Haute-Garonne (31), Tarn-et-Garonne (82), Gers (32),
  Tarn (81), et en complément Ariège (09) et Aude (11) selon la FAQ. ~50 communes
  couvertes. Villes mises en avant : **Toulouse · Montauban · Auch · Albi**.
- **Téléphone** : 05 82 95 33 75 (affiché partout, levier de conversion majeur —
  30-40 % des leads passent par le téléphone).
- **Email** : contact@ipb-expertise.fr
- **Site** : https://www.ipb-expertise.fr
- **Horaires** : lundi au vendredi 8h–19h · samedi sur rendez-vous.
- **Avis Google** : https://maps.app.goo.gl/6yDtzs7D1UcKSdJf6
- **Expert / visage** : **Ludovic**, expert structure du réseau IPB (portrait sur
  `/notre-expert`).

### Adresses (confirmées en ligne)

- **Bureaux** : 54 avenue Jean Jaurès, 31170 Tournefeuille — Occitanie (sur RDV).
- **Siège légal** : **13 rue Fernand Léger, 31170 Tournefeuille**.
  ⚠️ Cela diffère de l'ancienne adresse encore présente dans certaines pages
  légales du code (`13 rue du Recteur Dottin, 31100 Toulouse`) — la refonte des
  pages `/legal/*` doit basculer sur Fernand Léger. Plusieurs placeholders
  (`[ADRESSE_IPB]`, `[ADRESSE_BUREAU]`, `[MENTION_LEGALE_EXECUTANT]`, `[SIRET_IPB]`)
  restent à renseigner dans le code avec ces valeurs réelles.

---

## 5. Chiffres clés du réseau (à utiliser dans le copy)

- **Réseau IPB actif depuis 2019** (entité juridique : 2022).
- **+ 850 chantiers** menés.
- **~70 dossiers fissures / an** en moyenne (+ humidité, avant-achat, murs porteurs).
- **Note 4,9/5**.
- **Garantie décennale 10 ans** sur les travaux.
- **Délais** : réponse de l'institut sous **48h** · rapport **3 à 5 jours**.
  ⚠️ **Incohérence à arbitrer sur le délai de visite** : la doctrine copywriting
  (`LIVRABLE_REFONTE_COPYWRITING.md`) a harmonisé sur « visite sous 7 jours »,
  mais le **site en ligne affiche encore « 72h »** (bandeau de confiance + étape 01
  de la méthode). À aligner.
- ⚠️ **« Diagnostic / visite gratuit »** : un commit récent retire la mention
  « visite gratuite », mais le site en ligne l'affiche toujours (nav « Diagnostic
  gratuit », FAQ « la visite de diagnostic est gratuite »). À vérifier (cohérence
  juridique DGCCRF).

---

## 6. Stack technique

- **Framework** : Next.js 14.2 (App Router) — TypeScript.
- **Style** : Tailwind CSS + shadcn/ui (Radix), Framer Motion, Lucide React.
- **Hébergement** : Vercel (déploiement auto depuis GitHub, org `IPB2026`).
- **Email** : Nodemailer (SMTP Gmail `contact@ipb-expertise.fr`) + Resend installé.
- **Forms** : react-hook-form + zod. reCAPTCHA + rate limiting en place.
- **Tracking** : gtag.js direct (pas de GTM) — Google Ads (`AW-17902440600`) + GA4.
  Cookie banner RGPD. Sentry optionnel. Crisp chat optionnel.
- **Tests** : Vitest.
- **Couleurs marque** : Orange `#EA580C`, Bleu `#2563EB`, Slate/Navy `#0F172A`,
  + cream / navy custom (`ipb-cream`, `ipb-navy`, `ipb-orange`, `ipb-text`, `ipb-muted`).
- **Typo** : Playfair Display (serif, titres) + DM Sans (sans).

### Structure du repo

```
app/            66 pages (App Router) — voir détail SEO §7
  actions/      Server Actions : diagnostic, calculator, contact, quickCallback
  api/          ping-google, indexnow
  data/         blog.ts (42 articles), villes.ts, quartiers, testimonials, problems, faqs
components/     home/ landing/ blog/ layout/ seo/ templates/ ui/
lib/            analytics, email, leadScoring, lead-scoring, seo/, rateLimit, recaptcha, sentry
middleware.ts   sécurité / redirections
```

> ⚠️ Conventions repo : composants fonctionnels uniquement, un composant par fichier,
> PascalCase pour les composants, < 100 lignes si possible, classes Tailwind dans le JSX.
> **Ne pas modifier `next.config.js` ni installer de dépendances sans le signaler.**

---

## 7. SEO — l'arme n°1

Le SEO local est le cœur de l'acquisition. État actuel :

- **~62-66 pages indexables**, 100 % avec metadata (title, description, canonical, OG/Twitter).
- **~47 pages avec Schema.org** (ProfessionalService, LocalBusiness, FAQPage,
  AggregateRating, Service, OfferCatalog, Organization, GeoCoordinates).
- **Architecture locale dense** : pages dédiées Toulouse/Montauban (31, 82),
  44 villes générées dynamiquement, 10 quartiers Toulouse, 6 départements.
- **Topic clusters hub & spoke** : fissures (5 spokes) + humidité (8 spokes).
- **42 articles de blog** experts (2000+ mots), cover images sociales dynamiques
  (next/og, charte Playfair + DM Sans).
- **Sitemap.ts** hiérarchisé par priorité, robots.ts, IndexNow.

### Performance réelle (données GSC, avr. 2026)

- ~217 clics / 3 mois (~70 clics/mois), 7 214 impressions, CTR 3 %.
- Mobile CTR 7 % (excellent) · Desktop 1,7 % (faible).
- Requêtes fissures en page 2-3 (pos 18-24) → fort potentiel non capté.
- Mur porteur : quasi 0 impression → à conquérir.

### Chantiers SEO prioritaires identifiés

1. **Cannibalisation URL** : `/expert-fissures-toulouse-31` (statique) ↔
   `/expert-fissures/[ville]` ↔ `/villes/[ville]` se concurrencent. Consolider
   via 301 et choisir une architecture dominante.
2. **FAQPage JSON-LD** manquant sur les routes dynamiques `[ville]`/`[quartier]`
   → rich snippets perdus.
3. **AggregateRating** absent des routes dynamiques.
4. **Google Business Profile + avis** : process à industrialiser (objectif 30 avis / 6 mois).
5. **Backlinks** : annuaires pros + partenariats locaux (voir `BACKLINKS_ANNUAIRES_2026.xlsx`),
   cible 20-30 backlinks de qualité.

---

## 8. Génération de leads — comment ça marche

Philosophie : **premium, qualité > quantité, zéro intrusion**. Pas de popup
agressif, pas de PDF forcé.

Dispositifs actifs :

- **Diagnostic interactif en ligne** (`/diagnostic`) : 2 parcours (fissures / mur
  porteur), questions progressives, capture nom/email/téléphone, demande de contact
  **avant** le résultat. Affiche un rapport d'expert à la fin.
- **Calculateur prix mur porteur** (`/calcul-prix-mur-porteur`) : révèle l'estimation
  chiffrée après capture du lead (étape 6).
- **Formulaires de contact** : home + page contact dédiée.
- **Téléphone visible partout** + demande de rappel.
- **Lead scoring automatique** (backend, invisible) : score HOT / WARM / COLD selon
  urgence, largeur de fissure, statut (propriétaire/locataire), localisation, horizon
  projet. L'email interne est taggé p. ex. `[HOT 32/40] …` pour prioriser les rappels.
- **Tracking conversions Google Ads** déclenché à la soumission réussie (pas de page
  `/merci` pour ne pas casser l'affichage du résultat).

À l'étude / backlog (plan leadgen) : lead magnets PDF (guide fissures, checklist mur
porteur, modèle courrier CAT-NAT), bouton WhatsApp click-to-text mobile
(`wa.me/33582953375`), email funnel séquentiel 5 étapes (J+0/1/3/7/14), newsletter
mensuelle.

### Objectif business chiffré

Passer de ~3 à **10 clients/mois (3 mois) puis 25/mois (6 mois)**. LTV moyen estimé
~8 000 € (mix fissures + mur porteur). Cible de trafic : 250 puis 700 visites SEO/mois.

---

## 9. Variables d'environnement (rappel)

Obligatoires : `NEXT_PUBLIC_SITE_URL`, bloc SMTP (Gmail App Password),
`NEXT_PUBLIC_CALENDLY_URL`.
Recommandées : `NEXT_PUBLIC_GA_TRACKING_ID` (G-…), bloc Google Ads
(`NEXT_PUBLIC_GOOGLE_ADS_ID` + 4 labels conversion : diagnostic, calculateur,
phone, callback), `NEXT_PUBLIC_CRISP_WEBSITE_ID`, `NEXT_PUBLIC_SENTRY_DSN`,
reCAPTCHA. Détails dans `ENV_VARIABLES.md` et `TRACKING.md`.

---

## 10. Points ouverts / à trancher

- [ ] Renseigner les placeholders code (SIRET, mention légale de l'exécutant) avec
      les valeurs réelles : siège **13 rue Fernand Léger, 31170 Tournefeuille**,
      bureaux **54 av. Jean Jaurès, 31170 Tournefeuille**.
- [ ] **Aligner le délai de visite** : « 72h » (site live) vs « 7 jours » (doctrine).
- [ ] **Trancher la mention « gratuit »** : encore visible en ligne malgré le commit
      qui la retire (enjeu DGCCRF).
- [ ] Décider du sort de `/bureau-etude-structure-toulouse` (publier la reformulation
      « coordination d'études » ou passer en `noindex`).
- [ ] Refondre les pages légales (`/legal/mentions-legales`, `/cgv`,
      `/confidentialite`) — basculer sur l'adresse Fernand Léger.
- [ ] Résoudre la cannibalisation URL locale (301 + architecture dominante).
- [ ] Lancer le process avis Google + soumissions annuaires.

---

## 11. Documents internes utiles (à la racine du projet)

| Fichier | Contenu |
|---|---|
| `LIVRABLE_REFONTE_COPYWRITING.md` | Refonte rédactionnelle « institut de coordination », 36 fichiers, placeholders. |
| `STRATEGIE_LEADS_PREMIUM.md` | Philosophie premium + dispositifs leads actifs. |
| `PLAN_LEADGEN.md` | Plan 3 mois (capture, scoring, email funnel, ads, backlinks) + KPIs. |
| `PLAYBOOK_LEADGEN.md` | Playbook opérationnel leadgen. |
| `AUDIT_SEO_LOCAL_2026.md` | Audit SEO local + 7 leviers priorisés. |
| `BACKLINKS_ANNUAIRES_2026.xlsx` | Liste annuaires/backlinks avec suivi. |
| `TRACKING.md` | Conversions Google Ads (gtag.js). |
| `ENV_VARIABLES.md` | Toutes les variables d'environnement. |
| `PLAN_REFONTE_V2.md` | Plan de refonte design V2. |
| `CLAUDE.md` | Guide repo (générique — ce fichier-ci le complète côté business). |

---

*Si quelque chose ici ne correspond plus à la réalité (offre, chiffres, adresses,
positionnement), corrige ce fichier en priorité : c'est lui qui fait foi pour le contexte.*
