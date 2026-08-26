# Audit d'architecture CRM IPB — août 2026

> Relecture du CRM avec les canons du métier (modèle Salesforce, workflow HubSpot),
> puis plan de remédiation priorisé. Périmètre : `prisma/schema.prisma`, `lib/crm`,
> `app/admin`, `app/api/cron`, `app/api/mcp`.
> Date : 26 août 2026. Complète — sans les répéter — les audits de juin 2026
> (`AUDIT_CRM_VS_GEANTS_2026-06.md`, `ETUDE_WORKFLOW_CRM_2026-06.md`), dont
> l'essentiel de la roadmap a été livré depuis (attribution, assistant IA,
> qualification structurée, invariants, motifs de perte).

---

## 0. Verdict en une page

**Ce qui est au-dessus du marché.** Trois choses que la plupart des CRM maison
n'ont pas, et que même les gros paramètrent mal :

- **Une source unique de vérité pour l'état d'un dossier** (`computeDossier`,
  `lib/crm/dossier.ts`). L'état n'est pas déclaré par l'utilisateur, il est
  *constaté* à partir des artefacts réels (devis accepté, RDV réalisé, facture
  payée, rapport envoyé). C'est exactement la discipline que Salesforce ne
  garantit pas : chez lui, `StageName` est un champ que n'importe qui édite, d'où
  des pipelines qui mentent. Ici, ils ne peuvent pas mentir.
- **Des règles métier dures, codées et testées** : pas de rapport sans facture
  payée, pas de « perdu » sur un dossier encaissé, un devis = une facture active.
  Les invariants sont même re-vérifiés chaque nuit par le cron. C'est de la
  gouvernance de données, pas du CRUD.
- **Des seuils centralisés** (`lib/crm/rules.ts`) et une couverture de tests sur
  la logique pure. Un CRM de TPE qui a un moteur de règles versionné, c'est rare.

**Où ça plafonne.** Un seul défaut structurant, dont découlent la moitié des
symptômes : **le « dossier » n'existe pas comme objet**. Tout est calculé au
niveau du *contact*. Tant que chaque client n'a qu'une affaire dans sa vie, ça
marche. Dès qu'un client revient, le modèle se trompe — et il se trompe
silencieusement.

**Le reste par ordre de gravité** : l'état calculé n'est stocké nulle part (donc
non requêtable), le canal principal d'entrée (le téléphone, ≈ 80 % des leads)
n'est pas instrumenté, les réponses e-mail des clients n'entrent jamais dans le
CRM, la facture reste modifiable après émission, et le cron qui porte toute
l'automatisation n'a aucune alerte en cas d'échec.

---

## 1. Le défaut structurant : le dossier n'existe pas

### 1.1 Ce que fait le modèle aujourd'hui

`computeDossier` reçoit **tous** les devis, factures, rapports et RDV du
**contact**, sans jamais regarder à quel dossier ils appartiennent
(`dossierInputFromContact`, `lib/crm/dossier.ts:56-81`). Le `leadId` porté par
`Devis` et `Rapport` existe en base… et n'est utilisé nulle part dans le calcul
de phase.

Or `captureLead` crée bien un **nouveau lead** quand le précédent est clos
(`lib/crm/captureLead.ts:148-160` — la dédup ne couvre que les dossiers ouverts
de moins de 90 jours). Le modèle sait donc créer des dossiers successifs, mais
ne sait pas les distinguer ensuite.

### 1.2 La conséquence, reproduite

Client de mars 2025 : devis accepté, facture payée, rapport envoyé, dossier
terminé. Août 2026, il rappelle pour une fissure sur un autre mur → nouveau lead,
étape `NOUVEAU`. Ce que le CRM affiche pour cette **nouvelle** demande :

```
phase affichée : TERMINE
étape courante : aucune
```

Et comme `TERMINE` n'est pas une colonne du pipeline
(`app/admin/(app)/pipeline/page.tsx:16-25`), la carte est chargée puis **écartée
silencieusement** : la nouvelle demande d'un ancien client **n'apparaît jamais
dans le pipeline**. Pas d'erreur, pas d'alerte — elle n'existe pas, voilà tout.

Le même mécanisme fausse : le badge Prospect/Client, la « prochaine étape », les
relances automatiques (un dossier vu comme terminé n'est pas relancé), le taux de
conversion et le CA en pipe.

### 1.3 Pourquoi c'est le bon moment

Le business a ~2 ans et ≈ 70 dossiers/an. Le taux de retour est encore faible,
donc le bug est rare — c'est précisément pour ça qu'il faut le traiter
maintenant : le coût de la correction croît avec le volume d'historique, et le
préjudice (une demande entrante perdue) croît avec l'ancienneté du fichier
client. Dans deux ans, c'est le fichier le plus fidèle qui sera le plus mal servi.

### 1.4 Ce que feraient les géants

Salesforce sépare `Account` (l'entité), `Contact` (la personne) et
**`Opportunity`** (l'affaire) ; HubSpot fait pareil avec `Company` / `Contact` /
**`Deal`**. Chaque devis, facture, activité est rattaché à **une** affaire. La
phase appartient à l'affaire, jamais à la personne. C'est exactement la pièce qui
manque ici, et le `Lead` d'IPB en est déjà à 90 % : il a le contact, le service,
l'étape, le montant, l'attribution. **Il lui manque d'être le pivot du calcul.**

---

## 2. Trois représentations de l'état, aucune stockée

| Représentation | Où | Valeurs | Requêtable en SQL |
|---|---|---|---|
| `Lead.stage` | enum Prisma | 7 valeurs | ✅ |
| `Lead.manualPhase` | `String?` libre | ~12 clés de phase | ✅ mais non contraint |
| phase calculée | mémoire, `computeDossier` | ~12 phases | ❌ |

La phase **réellement affichée partout** est la troisième — la seule qui
n'existe pas en base. Conséquences concrètes, déjà rencontrées :

- **Le pipeline ne peut pas paginer** : il charge 400 leads avec l'intégralité de
  leurs devis/factures/rapports/RDV, calcule en mémoire, puis filtre en JS
  (`pipeline/page.tsx:47-100`). La même charge est répétée sur la liste clients et
  le tableau de bord.
- **Impossible de filtrer une liste par phase** en base. L'onglet Archives livré
  cette semaine a dû *approximer* « dossier perdu » avec `stage`/`manualPhase`
  (`lib/crm/client-status.ts`) au lieu d'utiliser la phase réelle : deux
  définitions du même concept coexistent désormais, et elles peuvent diverger.
- **Aucune historisation exploitable de la phase** hors `PhaseEvent` (posé
  seulement sur les transitions manuelles et quelques automatiques), donc pas de
  vraie durée par étape ni de taux de passage entre étapes.

**Le patron canonique** : garder la dérivation comme *seule autorité de calcul*,
mais **matérialiser** son résultat dans une colonne (`Lead.phase`), recalculée à
chaque écriture qui la conditionne + rattrapée par le cron. C'est ce que fait
Salesforce avec ses formula fields matérialisés et HubSpot avec ses propriétés
calculées : on ne choisit pas entre « dérivé » et « stocké », on stocke le
dérivé.

---

## 3. Le workflow challengé

### 3.1 80 % des leads arrivent par téléphone, et le CRM n'en voit rien

`CONTEXTE_BUSINESS_IPB.md` l'écrit noir sur blanc : ≈ 80 % par téléphone, ≈ 20 %
par le site. Or **toute la machinerie de collecte instrumente les 20 %** :
attribution UTM, scoring automatique, canal normalisé, page d'arrivée, gclid. Le
téléphone, lui, n'a qu'un bouton « Appel passé » à cliquer après coup
(`logCall`), et une fiche à créer à la main.

Le CRM pilote donc finement le canal minoritaire et navigue à vue sur le
majoritaire. Tout ce qui en découle est structurellement faux : le taux de
conversion par canal, le ROI publicitaire, le délai de rappel (SLA P1 4 h
affiché… sans horodatage d'appel réel pour le mesurer).

> **Décision du gérant, 26 août : pas de suivi d'appel.** La solution technique
> (numéro de suivi chez un opérateur, webhook vers le CRM) a été construite puis
> **retirée** — un endpoint que personne ne branchera est exactement le travers
> dénoncé au § 3.2. Le constat, lui, reste entier : le canal majoritaire n'est pas
> mesuré, et toute lecture du ROI par canal porte sur un cinquième du réel. À
> garder en tête avant d'arbitrer un budget publicitaire sur ces chiffres.

**Ce qui reste possible sans abonnement téléphonique.** L'instrumentation peut
venir de la saisie plutôt que de la téléphonie, au prix de quelques secondes par
appel :

- un bouton **« Appel entrant »** en tête de tableau de bord : nom + téléphone +
  service, trois champs, dix secondes, et le dossier existe avec son canal ;
- la question **« comment nous avez-vous connu ? »** posée pendant la
  qualification et stockée en champ structuré (le bloc de qualification
  téléphonique existe déjà) ;
- l'horodatage du premier appel, qui donne enfin de quoi mesurer le SLA de
  rappel P1 affiché aujourd'hui sans support de mesure.

C'est moins fiable qu'un numéro de suivi — la saisie s'oublie — mais c'est la
seule voie qui ne dépende d'aucun tiers.

### 3.2 Le devis dit « répondez à cet e-mail », et le webhook qui lit les réponses n'est branché nulle part

> **Correction du 26 août** (première rédaction erronée) : j'avais écrit qu'il
> n'existait aucune capture d'e-mail entrant. C'est faux — `app/api/inbound-email`
> est un webhook complet et bien fait : rattachement au contact par e-mail ou
> téléphone normalisé, activité dans la timeline, mise en pause des relances,
> secret partagé comparé à temps constant, tolérant aux formats Resend /
> SendGrid / Mailgun / Postmark. Le vrai constat est ailleurs.

Le code existe ; **la plomberie n'est pas connectée**. `INBOUND_EMAIL_SECRET`
n'est documenté nulle part (absent de `ENV_VARIABLES.md`), aucun fournisseur ne
pointe vers l'endpoint, et rien dans le back-office ne signale que le canal est
dormant. Résultat pratique : identique à l'absence de capture — la timeline reste
borgne d'un côté.

C'est le pire des cas d'un point de vue projet : le coût de construction est déjà
payé, et le bénéfice est nul faute d'une variable d'environnement et d'une règle
de routage chez le fournisseur d'e-mail.

Trois limites à corriger pendant qu'on y est :
- la réponse est rattachée au **contact**, jamais au dossier — depuis la vague 1,
  le `leadId` existe et devrait être posé ;
- la pause des relances écrit `relanceStep: 99` sur **tous** les dossiers du
  contact, y compris ceux que la réponse ne concerne pas ;
- une réponse client ne crée **aucune tâche** : elle atterrit dans la timeline et
  peut n'être jamais vue.

### 3.3 Le mode manuel coupe l'automatisation, sans le dire

`manualPhase` (« liberté totale ») est une bonne idée produit. Mais poser une
phase à la main **désactive silencieusement** la séquence de relances
(`app/api/cron/relances/route.ts:57` — `manualPhase: null` dans le filtre) et la
« prochaine étape » de la fiche. Un dossier qu'on a voulu *piloter* devient un
dossier qu'on a *débranché*, et rien à l'écran ne le dit.

Il y a un badge « réglé à la main » sur la fiche, mais il n'annonce pas la
conséquence. **Correctif de deux lignes** : afficher « relances automatiques en
pause » sur la fiche et dans le pipeline, et lister ces dossiers dans le cockpit
(il y a déjà une sonde « phases manuelles > 30 j » — la rendre explicite).

### 3.4 Le paiement est le seul jalon que le CRM ne peut pas voir

`ARBORESCENCE_DOSSIER.md` l'assume honnêtement : le paiement bancaire est l'un
des deux gestes que le CRM ne peut pas deviner. Sauf que ce jalon est **le
déclencheur du rapport** (règle dure n° 2) et de la boucle d'avis. Un oubli de
clic « Marquer payée » gèle donc un dossier payé, sans limite de temps ni alerte.

Le cockpit affiche « factures impayées » — c'est-à-dire *y compris celles qui
sont payées mais non pointées*. Deux remédiations, par ordre de coût :
- **immédiat** : une alerte « facture émise depuis > 15 j, ni payée ni relancée
  manuellement » qui force la question ;
- **structurel** : rapprochement bancaire automatique (agrégateur type
  Bridge/Powens, ou simple import du relevé) — le seul moyen de fermer
  définitivement le trou.

### 3.5 « Perdu » est un cul-de-sac

Un dossier perdu sort du pipeline, et depuis cette semaine de la liste active.
Le motif est structuré (`lostReasonCode` : PRIX / DELAI / CONCURRENT / ABANDON),
ce qui est très bien — **mais rien n'exploite ce motif**. Aucun recyclage : un
« perdu pour cause de délai » en mars ne revient jamais dans une file en juin,
alors que c'est le lead le plus facile à reprendre.

Chez HubSpot, c'est le b.a.-ba : `Closed Lost` + raison → séquence de nurturing
différée. Ici l'infrastructure existe déjà (séquences, cron, tâches) ; il ne
manque que la règle : *perdu pour délai/prix → tâche de reprise à J+90*.

### 3.6 Le devis travaux est encodé par une sentinelle

Un devis dont `serviceType = AUTRE` **signifie** « devis travaux », à condition
qu'un autre devis non-AUTRE existe (`dossier.ts:291-296`). Le commentaire du code
documente déjà le piège (un devis diagnostic issu du formulaire de contact arrive
en `AUTRE`) et le contourne par une deuxième condition. C'est une convention
implicite portée par une valeur d'énumération — le genre de chose qui casse le
jour où quelqu'un crée un devis sur mesure. **Un champ explicite
`Devis.kind = DIAGNOSTIC | TRAVAUX | AUTRE` supprime la classe entière de bugs**
(migration triviale, valeur déduite de l'existant).

---

## 4. Conformité, sécurité, données

| # | Constat | Gravité | Détail |
|---|---|---|---|
| C1 | **Facture modifiable après émission** | Élevée | `updateFacture` (`factures/actions.ts:135`) ne vérifie pas le statut : montant et objet d'une facture ENVOYÉE ou PAYÉE restent éditables, sans trace. En France une facture émise est immuable ; on corrige par avoir ou facture rectificative. Il n'existe **aucune notion d'avoir** dans le schéma. |
| C2 | **Facturation électronique 2026-2027** | Élevée | La réforme impose la *réception* de factures électroniques puis, par paliers, leur *émission* via plateforme agréée. Les PDF maison n'y suffiront plus, franchise 293 B comprise. Calendrier exact **à confirmer avec le comptable** — mais l'échéance de réception est très proche, et le sujet n'apparaît nulle part dans le code ni les plans. |
| C3 | **Aucun journal d'audit sur les champs** | Moyenne | La timeline enregistre les changements d'étape, pas les modifications de données (montant d'un devis, coordonnées, statut de facture). Impossible de répondre à « qui a changé ce montant, et quand ». |
| C4 | **Secret MCP accepté dans l'URL** | Moyenne | La route `app/api/mcp/[secret]/[transport]` accepte toujours le secret en segment d'URL (l'en-tête `x-mcp-secret` a été ajouté à côté). Une URL fuit par les logs, l'historique, les référents. Basculer en en-tête seul dès que le connecteur est reconfiguré. |
| C5 | **RGPD : pas d'export ni de registre par personne** | Moyenne | La purge existe (avec blocage à 10 ans pour les factures — très bien), mais il n'y a ni export des données d'une personne, ni trace du consentement, ni politique de rétention pour les prospects jamais convertis. |
| C6 | **Pas de sauvegarde applicative vérifiée** | Moyenne | Neon assure le PITR, mais rien dans le projet ne documente ni ne teste une restauration. Une sauvegarde jamais restaurée n'est pas une sauvegarde. |

Points positifs à souligner : rate limiting sur les quatre formulaires publics,
numérotation par compteur atomique (`Counter`), unicité e-mail/téléphone en base,
purge qui efface aussi les fichiers Blob, cloisonnement EXPERT/ADMIN sur les
rapports.

---

## 5. Fiabilité & observabilité

**Toute l'automatisation tient dans un seul fichier de 668 lignes**
(`app/api/cron/relances/route.ts`) : relances prospects, relances devis, relances
factures, facturation J+1, invariants, expiration des devis, demande d'avis,
rappel J-1, purge corbeille, dormants, suggestions d'archivage. Onze
responsabilités, un seul déclenchement quotidien à 07:00, une seule fonction
serverless.

Les problèmes qui en découlent :

1. **Aucune alerte en cas d'échec.** Chaque bloc a son `try/catch` qui empile un
   message dans un tableau `errors`, renvoyé dans la réponse HTTP… que personne ne
   lit. Sentry est installé dans le projet mais **n'est appelé nulle part dans le
   cron**. Si les relances s'arrêtent, on l'apprendra par un client mécontent.
2. **Sensibilité au délai d'exécution.** Les blocs s'exécutent en série ; un
   ralentissement de la base (Neon fait du scale-to-zero, le projet a déjà dû
   traiter des cold starts) fait tomber le tout dans le timeout, et **les blocs de
   fin passent à la trappe en silence** — dont la purge et les invariants.
3. **Idempotence inégale.** La plupart des blocs se protègent (compteurs de
   relance, `reviewRequestedAt`, dédup par contact), mais rien ne garantit
   l'exécution unique : un double déclenchement manuel rejouerait certains envois.
4. **Plafonds silencieux.** Plusieurs blocs sont limités à 20 ou 50 lignes par
   passage. Au volume actuel c'est indolore, mais rien ne signale un retard qui
   s'accumulerait.

**Le patron attendu** : découper en tâches nommées, chacune avec son propre
déclenchement et son propre statut persisté (une table `JobRun` : nom, début, fin,
compteurs, erreur), plus une alerte Sentry sur échec **et sur absence
d'exécution**. C'est une demi-journée de travail et ça transforme un angle mort en
tableau de bord.

---

## 6. Plan de remédiation

Quatre vagues. L'ordre compte : la vague 1 débloque tout le reste.

### Vague 1 — Refonder le dossier (le socle) · ~2 j

| # | Action | Pourquoi |
|---|---|---|
| 1.1 | **Rattacher les artefacts au lead** : remplir `Devis.leadId` / `Rapport.leadId` partout, ajouter `Facture.leadId` et `Appointment.leadId` (déjà présent) ; script de rattachement de l'historique par proximité de date. | Sans ça, rien d'autre n'est réparable. |
| 1.2 | **Calculer la phase par dossier** : `dossierInputFromLead(lead)` à côté de l'existant, ne prenant que les artefacts du lead. Garder `dossierInputFromContact` pour la vue « client » (la synthèse toutes affaires confondues). | Corrige le bug du client fidèle, le pipeline aveugle et les KPI. |
| 1.3 | **Matérialiser la phase** : colonne `Lead.phase` + index, recalculée à chaque écriture qui la conditionne, rattrapée par le cron. | Rend la phase filtrable, paginable, agrégeable. Supprime la duplication de définition introduite par l'onglet Archives. |
| 1.4 | **Tests de non-régression** : le cas « client fidèle » (reproduit dans cet audit) et le cas « deux dossiers ouverts en parallèle ». | Le bug est silencieux : seul un test le garde fermé. |

> Effet de bord bénéfique : le pipeline et la liste clients cessent de charger
> l'intégralité des documents de chaque contact — c'est aussi le correctif de
> performance le plus rentable du projet.

### Vague 2 — Fermer les trous du workflow · ~3 j

| # | Action | Valeur |
|---|---|---|
| 2.1 | ~~Numéro de suivi d'appel~~ — **écarté par le gérant** (26 août). Repli possible : bouton « Appel entrant » en trois champs + question « comment nous avez-vous connu ? ». | Le canal majoritaire reste non mesuré : décision assumée, pas un oubli. |
| 2.2 | **Brancher** le webhook d'e-mail entrant qui existe déjà : secret documenté, routage chez le fournisseur, rattachement au dossier, tâche créée à réception. | La timeline cesse d'être borgne, pour le prix d'une configuration. |
| 2.3 | **Alerte « facture émise non pointée > 15 j »** dans le cockpit. | Ferme le trou du seul jalon invisible, sans dépendre d'un agrégateur bancaire. |
| 2.4 | **Recyclage des perdus** : règle *perdu (prix/délai) → tâche de reprise à J+90*, exploitant `lostReasonCode` déjà collecté. | Transforme une donnée morte en chiffre d'affaires. |
| 2.5 | **Rendre le mode manuel explicite** : « relances en pause » sur la fiche et dans le pipeline. | Supprime un piège d'usage. |

### Vague 3 — Conformité & robustesse · ~2 j

| # | Action |
|---|---|
| 3.1 | **Verrouiller la facture émise** : interdire l'édition dès `ENVOYEE`, introduire l'**avoir** (facture rectificative liée). |
| 3.2 | **Cadrer la facturation électronique** : point avec le comptable, choix d'une plateforme, format Factur-X en sortie de PDF. |
| 3.3 | **Découper le cron** en tâches nommées + table `JobRun` + alerte Sentry sur échec **et sur non-exécution**. |
| 3.4 | **Journal d'audit** sur les champs sensibles (montants, statuts, coordonnées). |
| 3.5 | **Secret MCP en en-tête uniquement** ; export RGPD par personne ; test de restauration documenté. |

### Vague 4 — Ce qui rapporte une fois le socle sain · ~3 j

| # | Action |
|---|---|
| 4.1 | **`Devis.kind` explicite** (diagnostic / travaux / sur-mesure) en remplacement de la sentinelle `AUTRE`. |
| 4.2 | **Prévision pondérée** : probabilité par phase × montant — désormais calculable en SQL grâce à `Lead.phase`. |
| 4.3 | **Durée par étape et taux de passage**, à partir de `PhaseEvent` systématisé sur toutes les transitions (pas seulement manuelles). |
| 4.4 | **Suivi d'ouverture des devis** (déjà recommandé en juin, toujours pertinent) : « devis ouvert 2× » dans la timeline. |
| 4.5 | **Performance par canal** en croisant l'attribution déjà collectée avec le CA réellement encaissé. |

---

## 7. Anti-roadmap — ce que je déconseille

Un bon audit dit aussi ce qu'il ne faut *pas* faire :

- **N'ajoutez pas d'IA supplémentaire tant que la vague 1 n'est pas faite.** Un
  copilote qui raisonne sur une phase fausse produit des conseils faux avec
  aplomb. L'assistant existant suffit largement.
- **Ne partez pas sur Salesforce ou HubSpot.** À 70 dossiers/an, l'abonnement et
  le paramétrage coûteraient plus que le développement restant, et vous perdriez
  ce que vous avez de meilleur : des règles métier dures que ces outils
  n'imposent pas.
- **N'introduisez pas d'objet `Account`/entreprise.** Vos clients sont des
  particuliers ; la séparation Contact/Compte de Salesforce n'apporterait ici que
  de la complexité.
- **Ne multipliez pas les colonnes du pipeline.** Neuf, c'est déjà la limite haute
  du lisible ; le besoin réel est de *filtrer* (par phase, par canal, par
  ancienneté), pas d'ajouter des colonnes.
- **Ne supprimez pas le mode manuel.** Il est utilisé et légitime — il faut juste
  qu'il annonce ses conséquences.

---

## 8. Si vous ne deviez retenir que trois choses

1. **Le dossier doit devenir un objet.** Aujourd'hui, la nouvelle demande d'un
   ancien client n'apparaît pas dans le pipeline — silencieusement. C'est le seul
   défaut vraiment structurant, et il empire avec l'âge du fichier client.
2. **Le téléphone fait 80 % de l'activité et n'est pas instrumenté.** Toute
   décision marketing prise sur les chiffres actuels porte sur 20 % du réel.
3. **L'automatisation n'a pas de témoin d'alarme.** Onze automatismes, un seul
   point d'exécution, zéro alerte. Le jour où ça s'arrête, ce sont les clients qui
   le diront.

---

*Audit réalisé le 26 août 2026 sur la branche `main` (commit `ed260eb`). Le cas
du « client fidèle » a été reproduit en exécutant `computeDossier` hors base ;
les autres constats sont établis par lecture du code, référence de fichier à
l'appui.*
