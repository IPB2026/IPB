/**
 * Crée (ou met à jour) le compte d'accès au back-office /admin.
 *
 * Usage :
 *   ADMIN_EMAIL="vous@ipb-expertise.fr" ADMIN_PASSWORD="motdepasse" \
 *   ADMIN_NAME="Mohammed" node scripts/create-admin.mjs
 *
 * Nécessite DATABASE_URL configuré (.env.local) et la migration appliquée.
 */
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const email = process.env.ADMIN_EMAIL?.toLowerCase().trim();
const password = process.env.ADMIN_PASSWORD;
const name = process.env.ADMIN_NAME ?? null;

if (!email || !password) {
  console.error(
    '❌ Définir ADMIN_EMAIL et ADMIN_PASSWORD.\n' +
      '   Ex : ADMIN_EMAIL="vous@ipb-expertise.fr" ADMIN_PASSWORD="…" node scripts/create-admin.mjs'
  );
  process.exit(1);
}

if (password.length < 8) {
  console.error('❌ Le mot de passe doit faire au moins 8 caractères.');
  process.exit(1);
}

const passwordHash = await bcrypt.hash(password, 12);

const user = await prisma.user.upsert({
  where: { email },
  update: { passwordHash, name: name ?? undefined },
  create: { email, passwordHash, name, role: 'ADMIN' },
});

console.log(`✅ Compte admin prêt : ${user.email} (rôle ${user.role})`);
await prisma.$disconnect();
