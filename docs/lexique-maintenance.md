# Lexique IPB — guide de maintenance

Le lexique de la pathologie du bâtiment est consultable sur `/lexique`.
Les entrées sont stockées dans `app/lexique/entries.ts`.

## Ajouter une entrée

Ouvrir `app/lexique/entries.ts` et ajouter un objet à la fin de la liste
`lexiqueEntries`. Respecter l'ordre alphabétique : si l'entrée commence
par « N », la placer au sein du groupe « N ».

Exemple complet :

```ts
{
  slug: 'nouveau-terme',
  terme: 'Nouveau terme',
  lettre: 'N',
  definition:
    "Définition courte, une à deux phrases factuelles. Pas de mise en avant commerciale.",
  precision:
    "Précision technique optionnelle, deux à quatre phrases. Comparaison avec un terme proche, contexte d'emploi, confusion fréquente à éviter.",
  voirAussi: [
    { label: 'Autre terme du lexique', href: '#autre-terme' },
    { label: 'Page interne du site', href: '/notre-methode' },
  ],
},
```

Les champs :

- **slug** : identifiant unique en kebab-case sans accents, sert d'ancre
  URL (`/lexique#mon-slug`). Ne pas le modifier après publication
  (les liens externes ou les emails de l'institut peuvent le pointer).
- **terme** : tel qu'affiché en titre H3 dans la page.
- **lettre** : initiale capitalisée, sans accent (« E » pour Étaiement,
  « E » pour Éfflorescence). Sert au regroupement alphabétique et
  à la navigation.
- **definition** : 1 à 2 phrases. Sobre, factuelle. Pas de
  promotion des services IPB.
- **precision** *(optionnelle)* : 2 à 4 phrases supplémentaires sur
  le contexte d'emploi, les variantes, les confusions fréquentes.
  Au-delà de 6 phrases, créer un article dédié plutôt qu'allonger
  l'entrée.
- **voirAussi** *(optionnelle)* : 1 à 3 liens vers d'autres entrées
  du lexique (`#slug`) ou vers des pages internes du site (`/page`).

## Modifier une définition

Ouvrir le fichier, repérer l'objet par son `slug`, modifier le champ
concerné. Aucune migration n'est nécessaire.

Le `slug` ne doit pas changer après publication. Si le terme évolue
sensiblement, créer une nouvelle entrée et marquer l'ancienne comme
obsolète plutôt que renommer.

## Supprimer une entrée

Suffit de supprimer l'objet de la liste. Si l'entrée était référencée
en lien `#slug` depuis une autre entrée, ce lien devient un 404 d'ancre
silencieux : penser à l'enlever ou à le rediriger vers une autre entrée
pertinente.

## La navigation alphabétique

Elle est calculée automatiquement par le code à partir des `lettre`
des entrées. Aucune configuration manuelle. Les lettres sans entrée
sont grisées et non cliquables.

## Maillage interne — règle d'usage

Sur les autres pages du site, lorsqu'un terme technique apparaît
**pour la première fois** dans un contenu, le lier vers son entrée
du lexique :

```html
<a href="/lexique#fissurometre">fissuromètre</a>
```

Règle : ne jamais lier le même terme deux fois dans la même page.
Le premier emploi suffit. Au-delà, le lecteur sait où chercher.

Pages prioritaires pour le maillage entrant :

- `/blog/evaluer-gravite-fissure-maison` (article-pathologie)
- `/notre-methode` (page méthode)
- `/expertise/retrait-gonflement-argiles` (page RGA, à venir)
- `/vendre-bien-avec-fissures` (page persona vendeur)
- `/expertise-avant-achat-immobilier-toulouse` (page persona acheteur)

## Ce qu'on ne met pas dans une entrée

- Pas de CTA (« Vous avez ce désordre ? Contactez-nous ! »).
  Le lexique est neutre.
- Pas de prix (sauf cas exceptionnel et neutre type « ordres de
  grandeur courants en 2025 »).
- Pas de promotion des services IPB. Le lexique est un service rendu,
  pas un canal de vente.
- Pas d'illustrations marketing. Si schéma technique nécessaire :
  sobre, neutre, fonctionnel.

## Plan de migration future

Quand le lexique dépassera 100 entrées, envisager le passage de
l'option A (page unique avec ancres) à l'option B (pages individuelles
par entrée, type `/lexique/agrafage-structurel`). Cette migration est
documentée dans le cahier des charges §10bis.5. Pour rester compatible :

- Conserver les `slug` comme identifiants pérennes.
- Mettre en place des redirections 301 de `/lexique#slug`
  vers `/lexique/slug` au moment de la bascule.
- Ne pas changer les `slug` pendant cette migration.

## Frontière éditoriale

Le lexique applique le même ton que le reste du site :
sobre, technique, posé, jamais commercial. Si une formulation
sonne « vente », la reformuler. Référent mental : ce que pourrait
écrire un cabinet de chirurgie ophtalmologique réputé ou
une étude notariale parisienne.
