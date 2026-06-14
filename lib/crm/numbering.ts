import 'server-only';
import { prisma } from '@/lib/prisma';

/** Incrémente atomiquement un compteur annuel et renvoie sa valeur. */
async function nextSeq(prefix: string, year: number): Promise<number> {
  const counter = await prisma.counter.upsert({
    where: { key: `${prefix}-${year}` },
    update: { value: { increment: 1 } },
    create: { key: `${prefix}-${year}`, value: 1 },
  });
  return counter.value;
}

/** DEV-YYYYMMDD-NNN */
export async function nextDevisNumber(date = new Date()): Promise<string> {
  const seq = await nextSeq('devis', date.getFullYear());
  const ymd =
    `${date.getFullYear()}` +
    `${String(date.getMonth() + 1).padStart(2, '0')}` +
    `${String(date.getDate()).padStart(2, '0')}`;
  return `DEV-${ymd}-${String(seq).padStart(3, '0')}`;
}

/** IPB-YYYY-NNN-NOM (rapport) */
export async function nextRapportNumber(
  clientName: string,
  date = new Date()
): Promise<string> {
  const seq = await nextSeq('rapport', date.getFullYear());
  const slug =
    (clientName || '')
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .toUpperCase()
      .replace(/[^A-Z]/g, '')
      .slice(0, 14) || 'CLIENT';
  return `IPB-${date.getFullYear()}-${String(seq).padStart(3, '0')}-${slug}`;
}

/** FAC-YYYY-NNN-NOM */
export async function nextFactureNumber(
  clientName: string,
  date = new Date()
): Promise<string> {
  const seq = await nextSeq('facture', date.getFullYear());
  const slug =
    (clientName || '')
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .toUpperCase()
      .replace(/[^A-Z]/g, '')
      .slice(0, 14) || 'CLIENT';
  return `FAC-${date.getFullYear()}-${String(seq).padStart(3, '0')}-${slug}`;
}
