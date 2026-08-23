# Audit — Tunnel de leads, fiches contacts CRM & santé du site

**Date :** 21 août 2026
**Périmètre :** formulaires publics, CRM back-office, liens internes / sitemap / métadonnées
**Méthode :** analyse statique du code sur `main` (`7f62a28`). `node_modules` absent → aucun build, aucun test exécuté. Chaque constat ci-dessous a été vérifié dans le code, fichier et ligne à l'appui.
**Statut :** rapport seul, aucune correction appliquée.

---

## Résumé

Le socle est sain. Le CRM protège correctement ses écritures, la déduplication à la capture fonctionne, il n'y a **aucun lien interne mort** sur ~451 URLs publiques et les métadonnées sont propres.

Les problèmes réels sont concentrés sur trois zones :

1. **Un des trois parcours du pré-diagnostic est cassé** — celui de l'humidité. Aucun lead ne peut passer.
2. **Les gestes quotidiens sur une fiche contact** (corriger un numéro, fusionner un doublon) échouent dans des cas fréquents.
3. **134 pages « ville » sont orphelines** : indexables, mais ni dans le sitemap, ni liées depuis le site.

Le point 1 coûte de l'argent tous les jours. C'est celui à traiter en premier.

---

## 🔴 BLOQUANT

### B1. Le parcours « humidité » du pré-diagnostic ne capture aucun lead

**Ce que vit le visiteur.** Il choisit la carte « humidité » sur `/diagnostic`, répond aux 8 questions, saisit nom, téléphone et email, clique pour voir son diagnostic — et reçoit un message d'erreur rouge : *« Type de diagnostic invalide »*. Il n'obtient jamais son rapport. Aucun email ne part, aucune fiche n'est créée.

**La cause.** Le client propose bien trois parcours et envoie `path=humidite` :

- `app/diagnostic/page.tsx:919` → `selectPath('humidite')`
- `app/diagnostic/page.tsx:714` → `formData.append('path', path!)`

Mais la validation serveur n'accepte que deux valeurs :

- `lib/validations/diagnostic.ts:8` → `z.enum(['fissure', 'mur-porteur'])`

Tout le reste du parcours humidité est pourtant implémenté côté client : questions, scoring, rapport, conseils. Seule la validation n'a jamais été mise à jour. Les tests ne couvrent que `path: 'fissure'`, d'où le trou.

**Conséquence business.** L'humidité est une de vos deux grandes familles d'expertise et l'un des trois points d'entrée du funnel. Chaque visiteur humidité qui va au bout du formulaire est perdu — et comme il voit une erreur, il ne rappelle probablement pas.

**Correction.** Ajouter `'humidite'` à `diagnosticPathSchema`, puis propager le cas dans les trois endroits qui font aujourd'hui un `if fissure / else mur-porteur` :

- `app/actions/diagnostic.ts:141` (`getExpertDiagnosis`)
- `app/actions/diagnostic.ts:732` (mapping vers `ServiceType`, qui classe aujourd'hui l'humidité en `FISSURES`)
- `lib/emailTemplates.ts:142` (qui écrit « votre projet d'ouverture de mur porteur » à tout ce qui n'est pas `fissure`)

---

### B2. Le rappel « humidité » produit un brief interne faux

Le chemin « demande de rappel » n'est pas bloqué (il ne passe pas par Zod), mais il traverse les mêmes `else` que ci-dessus. Résultat : l'email reçu par votre équipe pour un prospect humidité annonce *« Projet d'ouverture de mur porteur clairement défini »*, et la fiche est enregistrée en service `FISSURES`.

L'expert rappelle avec un contexte à côté de la plaque, et vos statistiques par service sont faussées.

`app/actions/diagnostic.ts:141` et `:732`. Même correction que B1.

---

### B3. Corriger un téléphone déjà présent casse la fiche et efface la saisie

**Ce que vous vivez.** Dans « Modifier les coordonnées », vous corrigez un numéro qui existe déjà sur une autre fiche → la page bascule sur « L'action n'a pas abouti », et tout ce que vous venez de taper est perdu. Rien n'indique qu'il s'agit d'un doublon.

**La cause.** `Contact.email` et `Contact.phone` sont `@unique` (`prisma/schema.prisma:107-108`), mais `updateContact` écrit sans `try/catch` ni gestion de l'erreur Prisma `P2002` (`app/admin/(app)/contact-actions.ts:127-139`).

**Correction.** Entourer l'`update` d'un `try/catch` et, sur `P2002`, retourner un message explicite : « Ce numéro est déjà rattaché à une autre fiche — utilisez la page Doublons pour fusionner. »

---

### B4. Toute erreur de validation vide le formulaire de coordonnées

**Ce que vous vivez.** Email mal tapé → message d'erreur, et **tous les champs reviennent aux anciennes valeurs**. Il faut tout retaper.

**La cause.** Une seule ligne : `key={error ? 'err' : 'ok'}` sur le `<form>` (`components/admin/contact-edit-form.tsx:56`). Changer la `key` démonte et remonte le formulaire ; les champs étant non contrôlés (`defaultValue`), ils repartent de la base.

`new-prospect-form.tsx` n'a pas ce `key` et se comporte correctement — c'est bien une anomalie isolée.

**Correction.** Supprimer l'attribut `key`. Une ligne.

---

### B5. La fusion de doublons plante dans un cas fréquent

**Ce que vous vivez.** Vous fusionnez deux fiches détectées « même email », dont seule la plus récente porte un téléphone → page d'erreur, fusion non faite. (Les données restent saines : la transaction est bien atomique.)

**La cause.** Le code libère l'email du doublon avant de le recopier (`app/admin/(app)/contact-actions.ts:164`) mais **pas le téléphone**, lui aussi `@unique`. La ligne `phone: target.phone ?? source.phone` (`:176`) écrit le numéro de la source alors que la source existe encore — elle n'est supprimée qu'en `:190`. Violation d'unicité, rollback.

Le cas est atteignable : la page Doublons groupe aussi par email seul et désigne la fiche la plus ancienne comme cible (`app/admin/(app)/clients/doublons/page.tsx:28-30, 85`).

**Correction.** Ajouter en première opération de la transaction : `prisma.contact.update({ where: { id: sourceId }, data: { email: null, phone: null } })`.

**Effet de bord à corriger en même temps.** `PhaseEvent` n'est pas réassigné dans la transaction et est en `onDelete: Cascade` (`prisma/schema.prisma:141`) → après une fusion réussie, l'historique de vélocité du dossier absorbé disparaît silencieusement. Ajouter `prisma.phaseEvent.updateMany({ where: { contactId: sourceId }, data: { contactId: targetId } })`.

---

### B6. Configuration email — à vérifier sur Vercel en priorité

`lib/email.ts:4` et `:34` exigent `SMTP_USER` et `SMTP_PASS`. Or votre `.env.local` ne contient **ni l'un ni l'autre** : il contient `RESEND_API_KEY`, `EMAIL_FROM` et `EMAIL_TO`. Et `resend` est bien en dépendance (`package.json:48`) mais **n'est importé nulle part** dans le code actif.

Si Vercel a la même configuration que votre poste, `sendEmail` retourne `{ success: false }` à chaque appel et **plus aucun email ne part**, sur aucun formulaire.

Votre site reçoit des leads, donc la configuration Vercel est probablement correcte et le problème se limite à votre environnement local — mais je ne peux pas le vérifier d'ici, et l'enjeu justifie un contrôle de deux minutes dans les variables d'environnement Vercel.

**Découverte liée.** Un correctif existe : le commit `a6e2e79` — *« fix(email): tolérance SMTP_PASS / SMTP_PASSWORD + guide setup leads »* — ajoute justement le repli `SMTP_PASS || SMTP_PASSWORD` et des logs de diagnostic explicites. **Il n'a jamais été mergé dans `main`** (branche `claude/reverent-ptolemy-a1d5cc`). À récupérer : il rendrait ce type de panne visible au lieu de silencieuse.

---

## 🟠 IMPORTANT

### I1. Un lead qui échoue peut afficher « Demande envoyée »

Plusieurs chemins retournent un succès alors que rien n'a abouti :

- **`submitQuickCallback`** (`app/actions/quickCallback.ts:35`) fait `await sendEmail(...)` sans vérifier le résultat — or `sendEmail` ne lève jamais d'exception, elle retourne `{ success: false }`. L'action retourne `success: true` quoi qu'il arrive (`:84`). Côté client, le résultat n'est même pas lu et `setEarlyPhoneCaptured(true)` est appelé **avant** l'appel serveur (`app/diagnostic/page.tsx:1056-1063`).
- **`submitDiagnosticLead`** (`app/actions/diagnostic.ts:422-428`) journalise l'échec de l'email interne puis continue vers `return { success: true }` (`:487`). Le commentaire ligne 265 — « TOUJOURS envoyer l'email du lead (c'est le plus important !) » — montre que l'intention était l'inverse.
- **`captureLead`** avale toutes les exceptions et retourne `null` (`lib/crm/captureLead.ts:237-241`).

Email KO **et** base KO = le prospect croit être pris en charge, vous n'avez rien, et rien ne vous alerte.

**Correction.** Ne retourner `success: true` que si au moins un des deux canaux (email interne **ou** persistance CRM) a réussi. Sinon, message invitant à appeler.

### I2. Le formulaire des pages « villes » perd le téléphone et n'est jamais compté en conversion

`components/home/ContactSection.tsx` est monté sur les pages d'atterrissage SEO/Ads (`app/villes/[ville]/page.tsx:368`). Deux défauts, tous deux vérifiés :

- **Le téléphone n'est pas envoyé comme champ** : il est concaténé dans le corps du message (`:47-56`). Le contact est donc créé **sans numéro**, la déduplication par téléphone devient impossible, et l'appel ressaisi à la main crée un doublon. C'est exactement le bug documenté en commentaire dans `app/actions/contact.ts:183-184` — corrigé pour `/contact`, jamais pour ce composant.
- **Aucun appel de tracking** dans le handler (`:28-74`), contrairement à `/contact` qui appelle `trackContactLeadSubmit`. Ces conversions n'existent ni dans GA4 ni dans Google Ads : votre coût par lead sur ces campagnes est faux et le Smart Bidding n'est pas alimenté.

**Correction.** Ajouter `formDataToSend.append('phone', formData.phone)` et l'appel de tracking dans le `if (result.success)`. Quinze minutes, effet direct sur le pilotage Ads.

### I3. 134 pages « ville » orphelines, 201 hors sitemap

Le sitemap émet 121 URLs pour 451 URLs publiques. Zéro entrée fantôme (rien ne pointe vers une page inexistante), et 129 absences sont volontaires et cohérentes (pages en `noindex`).

Restent **201 pages déclarées indexables mais absentes du sitemap** :

| Gabarit | Pages | `robots` | Liens internes |
|---|---:|---|---|
| `/traitement-humidite/[ville]` | 67 | `index: true` (l. 36) | **aucun** |
| `/agrafage-fissures/[ville]` | 67 | `index: true` (l. 37) | **aucun** |
| `/villes/[ville]` | 67 | aucune directive | liées correctement |

La logique `isVillePrioritaire` a été câblée sur 2 gabarits sur 5. Les 134 pages des deux premiers gabarits sont **totalement orphelines** : indexables, hors sitemap, sans aucun lien entrant. Google ne peut pas les découvrir, et si elle les découvre, elles diluent votre budget de crawl.

**Correction — à arbitrer.** Soit les aligner sur `isVillePrioritaire` (`noindex`, cohérent avec la stratégie de désindexation déjà en place), soit les ajouter au sitemap **et** les mailler. L'état actuel n'est ni l'un ni l'autre, c'est le pire des deux.

### I4. La recherche par téléphone ne trouve plus les fiches récentes

Le client donne son numéro, vous tapez `0612345678` → « Aucun résultat », alors que la fiche existe.

Depuis la normalisation E.164 de juin, les numéros sont stockés `+33612345678`, mais les recherches font un `contains` brut (`app/admin/(app)/clients/page.tsx:36-39`, `lib/crm/search.ts:39, 49`). Les fiches antérieures à la migration se trouvent encore : le comportement est incohérent d'une fiche à l'autre, ce qui rend le bug déroutant.

**Correction.** `lib/crm/phone.ts:58` (`phoneVariants`) fait déjà exactement le travail nécessaire — il suffit de l'utiliser dans les deux requêtes.

### I5. Les numéros s'affichent en `+33612345678` partout

`formatPhoneFR` (`lib/crm/phone.ts:43`) existe et est testé, mais n'est appelé nulle part dans l'interface. Inconfortable à lire et à dicter au client. Correction : afficher `formatPhoneFR(c.phone)` en gardant `c.phone` dans le `href="tel:"`.

### I6. Modifier une fiche réintroduit des doublons

`updateContact` écrit `phone: d.phone || null` **sans normalisation** (`app/admin/(app)/contact-actions.ts:131`), contrairement à `captureLead` (`lib/crm/captureLead.ts:97`). Un numéro corrigé à la main en « 06 12 34 56 78 » sort des variantes testées à la capture suivante → le prochain formulaire web du même client recrée une fiche. C'est le trou que la correction de juin avait justement bouché côté public.

### I7. L'écran de qualification n'existe pas dans l'application

`components/admin/qualification-form.tsx` **n'est importé nulle part**. Conséquence : l'action `qualifyLead` (`app/admin/(app)/leads/actions.ts:463`) est inatteignable, et les colonnes `qualDelai / qualDecision / qualBien / qualScoredAt` (`prisma/schema.prisma:183-186`) restent vides — donc inexploitables en reporting. Impossible de requalifier un prospect : son tier reste figé à la valeur posée à la création.

### I8. Un diagnostiqueur voit un bouton qui échouera toujours

Le bloc « Modifier les coordonnées » est affiché hors de toute condition `isAdmin` (`app/admin/(app)/clients/[id]/page.tsx:778-785`), alors que `updateContact` commence par `requireAdmin()` (`contact-actions.ts:101`). Un compte EXPERT saisit, enregistre, obtient une page d'erreur et perd sa saisie.

### I9. `createProspect` est la seule action prospect sans contrôle de rôle

`app/admin/(app)/leads/actions.ts:86-87` se contente de `if (!session?.user)`, là où toutes les autres actions du fichier appellent `requireUser()` ou `requireAdmin()` — et où le fichier affirme le contraire en commentaire. Un compte EXPERT peut créer des prospects.

### I10. Les PDF ne contrôlent que « connecté », pas le rôle

`app/admin/(app)/factures/[id]/pdf/route.ts:14-15`, `devis/[id]/pdf/route.ts:12`, `rapports/[id]/pdf/route.ts:12-13` vérifient la session sans contrôler le rôle ni la propriété. Un compte EXPERT peut récupérer le PDF d'une facture ou du rapport d'un autre diagnostiqueur, avec nom, adresse et montants. Exploitabilité faible — il faut connaître un `cuid` — mais le contrôle manque. À comparer avec `exports/route.ts:38-40`, qui appelle bien `requireAdmin()`.

### I11. Anti-spam : décoratif

- **reCAPTCHA** : `verifyRecaptchaToken` (`lib/recaptcha.ts:93`) **n'est importé nulle part**. Le client génère bien un token sur `/diagnostic`, aucune server action ne le lit. Les trois autres formulaires n'ont aucune intégration.
- **Rate limiting** : `lib/rateLimit.ts:12-19` stocke les compteurs en mémoire. Sur Vercel, chaque lambda a la sienne et les instances sont recyclées — la limite est remise à zéro en permanence. Pire, les clés sont dérivées des données de l'attaquant (`contact:${email}`) : un bot qui incrémente l'email n'est jamais limité. Aucune limitation par IP.

**À arbitrer.** Soit brancher les deux sérieusement (rate limit par IP + vérification serveur du token), soit retirer le code mort pour ne pas entretenir l'illusion d'une protection.

### I12. Injection HTML dans les emails internes

Les données utilisateur sont interpolées brutes dans le HTML des emails (`app/actions/contact.ts:65-73`, `diagnostic.ts:305-349`, `quickCallback.ts:47-48`). Un nom du type `<a href="...">Voir le dossier</a>` s'affiche comme un vrai lien cliquable dans la boîte de votre équipe. Correction : une fonction `escapeHtml()` sur toutes les interpolations.

### I13. Attribution marketing perdue sur deux chemins de capture

`submitDiagnosticCallback` (`app/actions/diagnostic.ts:730-736`) et `submitDiagnosticAppointment` (`:917-923`) ne passent pas `attribution: readAttribution()`, contrairement aux trois autres actions. `utmSource`, `gclid` et `landingPage` sont écrits à `null` : un lead Google Ads converti via le bouton « rappel » n'est attribué à personne.

---

## 🟡 CONFORT

- **Le funnel « calculateur » est entièrement mort.** `submitCalculatorLead` (`app/actions/calculator.ts:48`, 211 lignes), `trackCalculatorStart/Complete/LeadCapture` (`lib/analytics.ts:363-374`) : jamais importés. La page `app/calcul-prix-mur-porteur/`, référencée dans `TRACKING.md:110`, **n'existe pas**. Des commentaires du code actif y renvoient encore (`app/diagnostic/page.tsx:18`, `:896-898`). → C'est la réponse à votre question sur les simulateurs : **il n'y a aucun simulateur en ligne**, seulement le squelette backend d'un ancien.
- **Deux systèmes de scoring concurrents.** `lib/leadScoring.ts` (utilisé, score 0-50, HOT ≥ 25) et `lib/lead-scoring.ts` (jamais importé, score non borné, HOT ≥ 150). Un import autocomplété sur le mauvais fichier compilerait et produirait des tiers faux. Supprimer le second.
- **Deux server actions orphelines** dans `diagnostic.ts` : `submitDiagnosticAppointment` (`:757`) et `requestDiagnosticReport` (`:952`), soit ~300 des 1064 lignes du fichier. La seconde promet « Votre rapport sera envoyé par email » (`:1045`) alors qu'aucun PDF n'est généré.
- **`LeadWidget` : trois événements de tracking définis, zéro branché** (`lib/analytics.ts:351-357`). Impossible de savoir si ce widget convertit.
- **Messages d'erreur Zod en anglais** exposés au visiteur : le `<textarea>` de `/contact` n'a pas de `maxLength`, un message long renvoie *« Too big: expected string to have <=2000 characters »* et le lead est refusé (`app/actions/contact.ts:11-15`).
- **`trackEvent` pousse chaque événement deux fois** (`gtag` puis `dataLayer.push`, `lib/analytics.ts:73-79`). Sans conteneur GTM, le second est ignoré — mais le jour où GTM est ajouté, toutes les conversions seront comptées en double.
- **Corbeille non respectée par l'agenda** : les RDV d'un client mis à la corbeille restent visibles (`app/admin/(app)/agenda/page.tsx:172, 578, 592`), alors que liste, pipeline, recherche et KPI filtrent bien.
- **Actions qui échouent en silence** : « Marquer perdu » sur un dossier facturé, « Devis express » sans montant, « Supprimer définitivement » bloqué par la rétention légale — toutes sortent sans rien afficher. Le mécanisme `FlashToast` existe déjà et pourrait servir.
- **Badge « Client » incohérent avec le filtre** : un dossier placé à la main sur « Paiement reçu » affiche le badge Client mais n'est pas compté par le filtre « État : Clients » ni par le tableau de bord (`lib/crm/dossier.ts:406-413` vs `lib/crm/client-status.ts:18-31`).

---

## Ce qui est sain — vérifié, rien à faire

- **Zéro lien interne mort** sur 451 URLs publiques et 66 URL littérales distinctes. Aucun lien ne passe non plus par une redirection 301 inutile.
- **Zéro entrée fantôme dans le sitemap.**
- **Métadonnées propres** : aucun title dupliqué, une seule page sans description (en `noindex`, impact nul).
- **CRM** : toutes les écritures sont derrière une garde d'authentification (18 fichiers `'use server'` et 4 `route.ts` vérifiés), sauf les exceptions listées en I9/I10. Déduplication E.164 à la capture, attribution first-touch, verrou « rapport après facture payée », rétention légale à la purge, anti-open-redirect, jetons HMAC des actions client : tout est correct.
- **Transactions de fusion atomiques** : même quand la fusion échoue (B5), les données restent cohérentes.

---

## Ordre de traitement proposé

| Priorité | Action | Effort estimé | Gain |
|---|---|---|---|
| 1 | **B6** — vérifier `SMTP_*` sur Vercel | 5 min | Écarte le risque majeur |
| 2 | **B1 + B2** — brancher `'humidite'` partout | ~1 h | Rouvre un tiers du funnel |
| 3 | **B4** — supprimer le `key` du formulaire | 1 min | Geste quotidien réparé |
| 4 | **B3 + B5** — erreurs de doublon et fusion | ~1 h | Geste quotidien réparé |
| 5 | **I2** — téléphone + tracking `ContactSection` | 15 min | Pilotage Ads fiable |
| 6 | **I1** — ne plus mentir sur le succès | ~1 h | Plus de lead perdu en silence |
| 7 | **I4 + I5 + I6** — bloc téléphone CRM | ~1 h | Recherche et dédup réparées |
| 8 | **I3** — arbitrer les 134 pages orphelines | décision + ~1 h | Budget de crawl |
| 9 | **I9 + I10 + I8** — cohérence des droits | ~1 h | Cloisonnement EXPERT |
| 10 | **I11** — arbitrer l'anti-spam | ~2 h | Selon exposition réelle |
| 11 | Confort — supprimer ~600 lignes de code mort | ~1 h | Lisibilité |

Les points 1 à 5 représentent moins d'une demi-journée et couvrent tout ce qui vous fait perdre des leads ou du temps aujourd'hui.

---

## Limites de cet audit

- Aucun build ni test exécuté (`node_modules` absent du dossier analysé) : les constats sont issus de la lecture du code, pas d'une exécution.
- Les variables d'environnement de production Vercel n'ont pas pu être consultées — d'où l'incertitude assumée sur B6.
- Les liens construits dynamiquement (21 fichiers utilisant des templates comme `` href={`/villes/${ville.slug}`} ``) ne sont pas vérifiables statiquement. Leurs préfixes pointent tous vers des routes existantes, mais la validité des slugs injectés dépend des données à l'exécution.
- L'audit ne couvre ni la performance mesurée (Lighthouse/Core Web Vitals), ni l'accessibilité testée au lecteur d'écran, ni le rendu visuel réel des pages.
