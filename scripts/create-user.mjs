/**
 * Crée (ou met à jour) un compte d'accès au back-office /admin.
 * Gère les deux rôles : ADMIN (vous) ou EXPERT (diagnostiqueur terrain).
 *
 * Usage :
 *   USER_EMAIL="ludovic@ipb-expertise.fr" USER_PASSWORD="motdepasse" \
 *   USER_NAME="Ludovic" USER_ROLE="EXPERT" \
 *   node --env-file=.env scripts/create-user.mjs
 *
 * USER_ROLE accepte ADMIN ou EXPERT (défaut : EXPERT).
 * Nécessite DATABASE_URL configuré et la migration appliquée.
 */
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const email = process.env.USER_EMAIL?.toLowerCase().trim();
const password = process.env.USER_PASSWORD;
const name = process.env.USER_NAME ?? null;
const role = (process.env.USER_ROLE ?? 'EXPERT').toUpperCase();

if (!email || !password) {
  console.error(
    '❌ Définir USER_EMAIL et USER_PASSWORD.\n' +
      '   Ex : USER_EMAIL="ludovic@ipb-expertise.fr" USER_PASSWORD="…" USER_ROLE="EXPERT" node --env-file=.env scripts/create-user.mjs'
  );
  process.exit(1);
}
if (password.length < 8) {
  console.error('❌ Le mot de passe doit faire au moins 8 caractères.');
  process.exit(1);
}
if (role !== 'ADMIN' && role !== 'EXPERT') {
  console.error('❌ USER_ROLE doit valoir ADMIN ou EXPERT.');
  process.exit(1);
}

const passwordHash = await bcrypt.hash(password, 12);

const user = await prisma.user.upsert({
  where: { email },
  update: { passwordHash, name: name ?? undefined, role },
  create: { email, passwordHash, name, role },
});

console.log(`✅ Compte prêt : ${user.email} (rôle ${user.role})`);
await prisma.$disconnect();
