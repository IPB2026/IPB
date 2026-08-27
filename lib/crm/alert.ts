import 'server-only';
import { sendEmail } from '@/lib/email';
import { COMPANY } from '@/lib/crm/company';

/**
 * ALERTE D'EXPLOITATION — le témoin d'alarme qui manquait.
 *
 * Incident du 26-27 août 2026 : le CRM est resté cassé 24 h et trois demandes du
 * site ne se sont pas enregistrées, sans que rien ne le signale. Les erreurs
 * partaient dans `console.error`, c'est-à-dire dans des journaux que personne
 * n'ouvre.
 *
 * Trois partis pris, tirés de cet incident :
 *  - **par e-mail**, pas par un service de monitoring : `lib/sentry.ts` était un
 *    stub dont l'appel réel était en commentaire, et brancher un outil tiers
 *    suppose une configuration que personne ne fera. Le SMTP, lui, fonctionne
 *    déjà — c'est par lui qu'arrivent les notifications du CRM ;
 *  - **sans toucher la base** : une alerte qui a besoin de la base pour partir
 *    est muette précisément quand la base est en cause. Le destinataire est donc
 *    une constante, jamais une requête ;
 *  - **jamais bloquante** : une alerte qui échoue ne doit pas casser l'action
 *    métier qu'elle observait.
 */

/** Destinataire : variable d'environnement, sinon l'adresse de l'institut. */
function destinataire(): string {
  return process.env.EMAIL_TO || process.env.SMTP_USER || COMPANY.email;
}

/**
 * Anti-avalanche : une même alerte n'est envoyée qu'une fois par heure et par
 * instance. En serverless il y a plusieurs instances, donc ce n'est pas une
 * garantie absolue — juste de quoi éviter qu'une page en boucle ne remplisse la
 * boîte mail. Volontairement en mémoire : voir le parti pris « sans base ».
 */
const dernierEnvoi = new Map<string, number>();
const FENETRE_MS = 60 * 60 * 1000;

function tropRecent(cle: string): boolean {
  const t = dernierEnvoi.get(cle) ?? 0;
  if (Date.now() - t < FENETRE_MS) return true;
  dernierEnvoi.set(cle, Date.now());
  return false;
}

export interface AlerteOptions {
  /** Clé de regroupement pour l'anti-avalanche (ex. « lead-non-enregistre »). */
  cle: string;
  titre: string;
  /** Lignes de contexte, affichées telles quelles. */
  details?: (string | null | undefined)[];
  /** Ce que le gérant doit faire, en une phrase. */
  action?: string;
}

/**
 * Prévient l'exploitant d'un incident. À appeler dans les `catch` qui, sinon,
 * avaleraient l'erreur en silence.
 */
export async function alerteExploitation(opts: AlerteOptions): Promise<void> {
  try {
    if (tropRecent(opts.cle)) return;
    const lignes = (opts.details ?? []).filter(Boolean) as string[];
    const html = `
      <div style="font-family:-apple-system,Segoe UI,Roboto,Arial,sans-serif; max-width:560px; margin:0 auto; padding:24px; color:#1A1917;">
        <p style="margin:0 0 4px; font-size:11px; letter-spacing:.12em; text-transform:uppercase; color:#A03328; font-weight:700;">
          IPB · Alerte technique
        </p>
        <h1 style="margin:0 0 16px; font-size:20px; line-height:1.25; color:#1A1917;">${opts.titre}</h1>
        ${
          lignes.length
            ? `<table style="width:100%; border-collapse:collapse; margin:0 0 16px; font-size:14px;">${lignes
                .map(
                  (l) =>
                    `<tr><td style="padding:6px 0; border-bottom:1px solid #E4DED4; color:#3F3B37;">${l}</td></tr>`
                )
                .join('')}</table>`
            : ''
        }
        ${
          opts.action
            ? `<p style="margin:0 0 8px; padding:12px 14px; background:#F3E2DE; border-radius:6px; font-size:14px; color:#7A2A20;">
                 <strong>À faire :</strong> ${opts.action}
               </p>`
            : ''
        }
        <p style="margin:16px 0 0; font-size:12px; color:#6B645D;">
          Message automatique du CRM. Une même alerte n'est pas répétée avant une heure.
        </p>
      </div>`;

    await sendEmail({
      to: destinataire(),
      subject: `🚨 IPB — ${opts.titre}`,
      html,
      noUnsubscribe: true,
    });
  } catch {
    // Une alerte ne casse jamais l'action qu'elle observe.
  }
}
