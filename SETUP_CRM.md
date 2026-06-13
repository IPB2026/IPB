# Mise en route du back-office CRM — Phase 0

Suivez ces étapes une seule fois pour activer le back-office `/admin`.
Tout le code est déjà en place ; il ne manque que la base de données.

---

## 1. Créer la base de données Neon (gratuit, ~3 min)

1. Aller sur **https://neon.tech** → *Sign up* (avec GitHub, c'est le plus simple).
2. *Create project* → nom : `ipb-crm`, région **Europe (Frankfurt ou Paris)**.
3. Une fois créé, ouvrir l'onglet **Connection string** (ou *Dashboard → Connect*).
4. Copier l'URL **« Pooled connection »** (elle contient `-pooler`).
   Elle ressemble à :
   ```
   postgresql://neondb_owner:xxxxx@ep-xxx-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require
   ```

## 2. Renseigner `.env.local`

Ouvrir `.env.local` (à la racine) et compléter :

```bash
# Base Neon (collez l'URL pooled copiée à l'étape 1)
DATABASE_URL="postgresql://…-pooler….neon.tech/neondb?sslmode=require"

# Secret de session — générez-le avec la commande ci-dessous
AUTH_SECRET="…"
```

Générer `AUTH_SECRET` :
```bash
npx auth secret
```
(copiez la valeur produite dans `.env.local`)

## 3. Créer les tables (migration)

```bash
npx prisma migrate dev --name init_crm
```
Cela crée les tables `User`, `Contact`, `Lead`, `Activity` dans Neon.

## 4. Créer votre compte d'accès `/admin`

```bash
ADMIN_EMAIL="mohammed.grada2@gmail.com" \
ADMIN_PASSWORD="VotreMotDePasseFort" \
ADMIN_NAME="Mohammed" \
node --env-file=.env.local scripts/create-admin.mjs
```
> `--env-file=.env.local` charge `DATABASE_URL` ; les variables `ADMIN_*` sont
> passées en ligne pour ne pas stocker le mot de passe dans un fichier.

## 5. Lancer et tester

```bash
npm run dev
```
- Aller sur **http://localhost:3000/admin** → redirige vers la page de connexion.
- Se connecter avec l'email + mot de passe créés à l'étape 4.
- Remplir un formulaire du site (ex. `/diagnostic`) → le lead apparaît dans
  **Prospects** quelques secondes plus tard.

---

## 6. Déploiement Vercel (quand prêt)

Ajouter dans **Vercel → Project → Settings → Environment Variables** :

| Variable | Valeur |
|---|---|
| `DATABASE_URL` | l'URL pooled Neon |
| `AUTH_SECRET` | la valeur générée |
| `BLOB_READ_WRITE_TOKEN` | (Phase 3 — créé via Vercel → Storage → Blob) |

Puis lancer la migration sur la base de prod :
```bash
npx prisma migrate deploy
```

> 💡 Neon propose une base de *dev* (branch) et *prod* séparées si vous voulez
> isoler les tests. Optionnel pour démarrer.

---

## Ce qui est déjà actif après ces étapes

- ✅ Les 4 formulaires du site enregistrent chaque lead en base (en plus de l'email).
- ✅ Connexion sécurisée `/admin` (vous + Ludovic possible).
- ✅ Tableau de bord (compteurs HOT/WARM/COLD, relances dues).
- ✅ Liste des prospects filtrable + fiche prospect détaillée.

**Suite** : Phase 1 (pipeline kanban, relances), puis Devis/Factures (Phase 2)
et Rapports d'expertise PDF (Phase 3). Voir `PLAN_CRM_IPB.md`.
