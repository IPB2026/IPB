# Livrable — Refonte copywriting IPB (positionnement institut de coordination)

> Branche : `claude/loving-wilbur-cf7f3a`
> Statut : prêt pour relecture — pas de déploiement
> Build : OK (Next.js 14.2.35, aucune erreur de compilation)

---

## 1. Contexte

Mise à jour rédactionnelle et de conformité du site, sans modification du
design, de la structure technique ni du SEO. IPB est désormais présenté
comme un **institut de coordination** qui diagnostique, conçoit, coordonne
et accompagne, **sans réaliser les travaux**. Les travaux sont exécutés
par les **équipes de réalisation du réseau IPB**, sous garantie décennale
10 ans.

Lexique appliqué partout :

- IPB **diagnostique · conçoit · coordonne · supervise · accompagne**.
- Les travaux sont **exécutés / réalisés / mis en œuvre par les équipes
  de réalisation du réseau IPB**, sous décennale 10 ans.
- **Interdits définitivement éliminés** : « notre décennale », « décennale
  dédiée IPB », « décennale études dédiée », « décennale travaux dédiée »,
  « décennales métier dédiées », « entreprise partenaire », « partenaire
  technique », « notre partenaire technique ».

---

## 2. Changements structurels de la home (rappel)

- Nouveau H1 : *Votre bâtiment montre des signes. Notre institut les
  comprend.*
- Eyebrow : *Institut de pathologie & structure du bâtiment · Occitanie*
- 4 portes d'entrée : Fissures · Humidité · Achat immobilier · Mur porteur
- 4 services en 3 familles : Diagnostic de pathologies (fissures +
  humidité) / Expertise (avant achat) / Travaux de structure (mur porteur).
- Le 4ᵉ métier *Bureau d'études structure* est **retiré de la home** et
  remplacé par *Diagnostic humidité et infiltrations*.
- CTAs principaux harmonisés en *Mon diagnostic en 2 min*.

---

## 3. Fichiers modifiés (36)

### Composants home
- `components/home/Hero.tsx` — H1, eyebrow, sous-titre, CTA, stats, alt
  photo, ajout du 3ᵉ lien d'expertise (humidité), label
  *Travaux sous décennale* à la place de *Décennale dédiée*.
- `components/home/PullQuote.tsx` — citation institut conforme au brief
  §11.
- `components/home/ServiceList.tsx` — 4 services / 3 familles, badge
  famille au-dessus de chaque titre, titre *Une seule spécialité*.
- `components/home/Methode.tsx` — 5 étapes refondues, l'étape 04
  *On réalise* attribue les travaux aux *équipes de réalisation* sous
  *garantie décennale 10 ans*.
- `components/home/Cabinet.tsx` — H2 *Un institut spécialisé. Un
  interlocuteur unique.*, texte conforme §11, chiffres réattribués au
  réseau IPB, bouton renommé *Demander l'attestation décennale des
  travaux*.
- `components/home/StatsBlock.tsx` — labels et sublabels attribués au
  réseau IPB.
- `components/home/CaseStudies.tsx` — alt images + sous-titre attribués
  au réseau IPB, *poutre dimensionnée par le bureau d'études*.
- `components/home/FAQ.tsx` — Q4 *coordonnons l'intervention avec un
  spécialiste*, Q7 *l'institut coordonne ; nos équipes de réalisation
  exécutent sous garantie décennale 10 ans*, Q10 *attestations de
  garantie décennale*.
- `components/home/CtaFinal.tsx` — H2 *Une fissure, un projet, un
  doute ?*, sous-titre brief §13, CTA *Mon diagnostic en 2 min*.
- `components/home/Footer.tsx` — adresses remplacées par `[ADRESSE_IPB]`
  et `[ADRESSE_BUREAU]`, ajout d'`[EMAIL_CONTACT]`, mention bas globale
  *Diagnostic et coordination assurés par IPB. Travaux réalisés sous
  décennale par les équipes de réalisation du réseau IPB.* +
  emplacement `[MENTION_LEGALE_EXECUTANT]`. Menu Expertises mis à jour
  (humidité visible, Bureau d'études retiré).
- `components/home/TrustSignals.tsx` — *Garantie décennale 10 ans*
  remplace *Décennales métier 10 ans*, attribution *réseau IPB*.
- `components/home/Roadmap.tsx` — étape 04 réécrite (équipes de
  réalisation, décennale 10 ans).
- `components/home/Testimonials.tsx` — H2 *Ce que disent nos clients*
  (brief §12, fonctionne avec 4 ou 5 témoignages).
- `components/home/ServicesStructure.tsx` — sed global décennale.
- `components/home/ServicesHumidity.tsx` — sed global décennale.

### UI
- `components/ui/TrustRibbon.tsx` — bandeau marquee mobile harmonisé avec
  le brief §2 (réponse 48h · visite 7j · réseau IPB depuis 2019 · 850
  chantiers · décennale 10 ans · 4,9/5).

### Pages
- `app/page.tsx` — homePersonas (4 portes), titre PersonaCards,
  bandeau calculateur, metadata, schema Organization (adresse remplacée
  par `[ADRESSE_IPB]`).
- `app/layout.tsx` — title/description/OG/Twitter alignés sur nouveau
  positionnement, OfferCatalog (4 services), LocalBusiness avec
  commentaire *EN ATTENTE CONFIRMATION CLIENT* sur l'adresse bureau.
- `app/expertise/fissures/page.tsx` — H1, intro, étapes de la méthode
  (équipes de réalisation), CTA.
- `app/expertise/mur-porteur/page.tsx` — H1, intro, suppression du
  *A à Z*, FAQ (8 questions), section comparative (intervenants vs
  institut), méthode, mini-trust line, bandeau calculateur, CTA.
- `app/expertise/humidite/page.tsx` — title, description, intro, ouvert
  par l'institut, méthode 4 étapes avec équipes de réalisation, schema.
- `app/expertise-avant-achat-immobilier-toulouse/page.tsx` — vérifiée,
  déjà conforme (institut indépendant, jamais réalisateur).
- `app/notre-expert/page.tsx` — refonte complète (texte §11 du brief,
  certifications, chiffres réattribués au réseau, métadonnées, schema).
- `app/bureau-etude-structure-toulouse/page.tsx` — reformulée en
  *Coordination d'études structure* (commentaire *EN ATTENTE DÉCISION
  CLIENT* en tête de fichier), 6 prestations, FAQ refondue, garanties
  réattribuées (note signée par bureau d'études partenaire, travaux
  sous décennale 10 ans par le réseau IPB), title/description.
- `app/contact/page.tsx` — siège `[ADRESSE_IPB]`, bureau
  `[ADRESSE_BUREAU]`, ajout `[EMAIL_CONTACT]`.
- `app/expert-fissures-toulouse-31/page.tsx` — paragraphe institut,
  FAQ agrafage vs micropieux (équipes de réalisation), sed décennale.
- `app/expert-fissures-montauban-82/page.tsx` — description metadata,
  paragraphe institut, FAQ.
- `app/expert-humidite-toulouse-31/page.tsx` — méthode diagnostic
  instrumenté (institut commence par), sed décennale.
- `app/expert-mur-porteur/[ville]/page.tsx` — description schema, intro
  hero (institut conçoit et coordonne), trust box, étape *Livraison*.
- `app/lp/expert-fissures-toulouse/page.tsx` — trust signals, metadata.
- `app/diagnostic/page.tsx` — feedback messages *un sondage est
  réalisé* (passif), sed décennale.
- `app/calcul-prix-mur-porteur/page.tsx` — sed décennale.
- `app/notre-methode/page.tsx` — sed décennale.
- `app/partenaires/page.tsx` — sed décennale.
- `app/partenaires/architectes-interieur/page.tsx` — sed décennale.
- `app/partenaires/marchands-de-biens/page.tsx` — sed décennale.
- `app/data/blog.ts` — sed décennale (références dans articles blog).

---

## 4. Champs `[ENTRE_CROCHETS]` à compléter par le client

| Placeholder | Où | Action client |
|---|---|---|
| `[ADRESSE_IPB]` | `components/home/Footer.tsx`, `app/contact/page.tsx`, `app/page.tsx` (schema Organization) | Renseigner l'adresse de domiciliation du siège IPB |
| `[ADRESSE_BUREAU]` | `components/home/Footer.tsx`, `app/contact/page.tsx` | Confirmer ou modifier l'adresse du bureau (54 av Jean Jaurès, Tournefeuille — actuellement conservée dans les schemas LocalBusiness pour ne pas casser le rich snippet, voir §5) |
| `[EMAIL_CONTACT]` | `components/home/Footer.tsx`, `app/contact/page.tsx` | Email de contact officiel |
| `[MENTION_LEGALE_EXECUTANT]` | `components/home/Footer.tsx` | Raison sociale + SIRET + n° décennale de l'exécutant des travaux |
| `[SIRET_IPB]` | (non utilisé encore — sera nécessaire dans les pages légales à venir) | SIRET d'IPB |

---

## 5. Points marqués « EN ATTENTE DÉCISION CLIENT »

### 5.1 Page `/bureau-etude-structure-toulouse`
Reformulée par défaut en *Coordination d'études structure* selon §5 du
brief. URL conservée pour ne pas casser le SEO historique. Si le client
préfère **mettre la page hors ligne**, il suffit d'ajouter à la metadata :

```ts
robots: { index: false, follow: true }
```

ou de retourner `notFound()` dans le composant. Le commentaire en tête
de fichier signale clairement le statut « EN ATTENTE DÉCISION CLIENT ».

### 5.2 Schémas LocalBusiness / ProfessionalService
L'adresse `54 avenue Jean Jaurès, Tournefeuille` reste dans les schemas
JSON-LD pour préserver les rich snippets Google. Un commentaire de code
signale qu'elle est *à confirmer par le client avant publication*. Si
elle doit être retirée ou remplacée, modifier :
- `app/layout.tsx` (LocalBusiness principal)
- `app/page.tsx` (Organization schema → déjà sur `[ADRESSE_IPB]`)
- `app/expertise/fissures/page.tsx` (Service.provider.address)
- `app/expertise/humidite/page.tsx` (Service.provider.address)
- `app/expert-fissures-toulouse-31/page.tsx` (ProfessionalService.address)
- `app/expert-humidite-toulouse-31/page.tsx` (ProfessionalService.address)
- `app/expert-mur-porteur/[ville]/page.tsx` (LocalBusiness.address)

---

## 6. Hors périmètre (non touché, comme demandé par le brief)

- `app/legal/mentions-legales/page.tsx`
- `app/legal/cgv/page.tsx`
- `app/legal/confidentialite/page.tsx`

Ces pages contiennent encore l'adresse `13 rue du Recteur Dottin`. Elles
seront refondues lors du chantier mentions légales annoncé séparément
par le brief §3.

Le **design, les couleurs, les polices, le CSS, la structure des URLs,
les images et les composants** sont conservés à l'identique.

---

## 7. Cohérence avec les délais terrain officiels

Tous les délais évoqués respectent les valeurs officielles :
- Visite : **sous 7 jours** (24h en urgence)
- Rapport : **3 à 5 jours**
- Réponse de l'institut : **48h**

Les anciennes mentions *sous 72h*, *24h ouvrées* ont été harmonisées
sur les nouveaux délais brief.

---

## 8. Vérification

- Build Next.js : OK (compilé en 4.9s, 1411 modules)
- Pages testées en local (HTTP 200) : `/`, `/expertise/humidite`
- Aucune erreur dans les logs serveur ni dans la console navigateur
- Schemas JSON-LD restent valides (Organization, LocalBusiness, FAQPage,
  Service, ProfessionalService, OfferCatalog)
- Compteurs animés (`StatCounter`, `StatItem`) : code inchangé,
  IntersectionObserver déclenche l'animation à 30% de visibilité —
  l'état initial à 0 est normal avant scroll, n'apparaît pas en
  navigation réelle (vérifiable via scroll dans la preview).

---

## 9. À faire après validation client

Une fois les `[PLACEHOLDERS]` renseignés et les arbitrages tranchés :

1. Remplacer les `[ADRESSE_IPB]`, `[ADRESSE_BUREAU]`, `[EMAIL_CONTACT]`,
   `[MENTION_LEGALE_EXECUTANT]` partout (recherche globale).
2. Mettre à jour les schemas JSON-LD avec l'adresse réelle.
3. Trancher le sort de `/bureau-etude-structure-toulouse` (publier la
   reformulation, ou passer en `noindex`).
4. Refondre les pages légales (`/legal/*`) selon les instructions
   spécifiques à venir.
