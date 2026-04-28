/**
 * Templates HTML d'emails IPB — séquence de nurturing post-diagnostic.
 *
 * Tous les templates utilisent la charte IPB (Playfair Display fallback
 * Georgia, palette navy/cream/orange). Compatibles clients email principaux
 * (Gmail, Outlook, Apple Mail) — inline styles uniquement.
 *
 * Cf. PLAN_LEADGEN.md §3.3
 *
 * Usage côté serveur :
 *   import { emailTemplates } from '@/lib/emailTemplates';
 *   const html = emailTemplates.j0Confirmation({ firstName: 'Marie', city: 'Toulouse', tier: 'HOT' });
 *   await sendEmail({ to: lead.email, subject: '...', html });
 *
 * Pour activer la séquence J+1 / J+3 / J+7 / J+14, brancher un cron
 * (Vercel Cron + storage Vercel KV recommandé) qui scrute les leads
 * en attente et appelle sendEmail avec le bon template.
 */

import type { LeadTier } from './leadScoring';

interface BaseContext {
  firstName: string;
  city?: string;
  tier?: LeadTier;
  unsubscribeUrl?: string;
}

interface PathContext extends BaseContext {
  path: 'fissure' | 'mur-porteur';
}

// ─────────────────────────────────────────────────────────────────
// Wrapper commun (header + footer + responsive)
// ─────────────────────────────────────────────────────────────────

const wrap = (innerHtml: string, opts?: { eyebrow?: string; unsubscribeUrl?: string }) => `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>IPB Expertise</title>
</head>
<body style="margin: 0; padding: 0; background: #F3EFE8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; color: #1A1917;">
  <div style="max-width: 600px; margin: 0 auto; background: #F3EFE8;">

    <!-- Header navy minimaliste -->
    <div style="background: #0B1826; color: white; padding: 24px; text-align: center;">
      <p style="margin: 0; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(255,255,255,0.5);">
        ${opts?.eyebrow || 'IPB · Cabinet de pathologie du bâtiment'}
      </p>
      <p style="margin: 12px 0 0; font-family: Georgia, serif; font-size: 22px; font-weight: 700; letter-spacing: -0.02em;">
        Institut Pathologie du Bâtiment
      </p>
    </div>

    ${innerHtml}

    <!-- Footer -->
    <div style="background: #0B1826; color: rgba(255,255,255,0.5); padding: 28px 24px; text-align: center; font-size: 11px; line-height: 1.7;">
      <p style="margin: 0 0 4px;">IPB Expertise · 13 rue du Recteur Dottin, 31100 Toulouse</p>
      <p style="margin: 0 0 16px;">
        <a href="tel:0582953375" style="color: rgba(255,255,255,0.7); text-decoration: none;">05 82 95 33 75</a>
        &nbsp;·&nbsp;
        <a href="https://www.ipb-expertise.fr" style="color: rgba(255,255,255,0.7); text-decoration: none;">ipb-expertise.fr</a>
      </p>
      <p style="margin: 0; color: rgba(255,255,255,0.3); font-size: 10px;">
        Vous recevez cet email parce que vous avez sollicité notre cabinet.
        ${opts?.unsubscribeUrl ? `<br /><a href="${opts.unsubscribeUrl}" style="color: rgba(255,255,255,0.4); text-decoration: underline;">Ne plus recevoir d'emails du cabinet</a>` : ''}
      </p>
    </div>

  </div>
</body>
</html>
`;

const button = (label: string, href: string, variant: 'primary' | 'ghost' = 'primary') => {
  if (variant === 'primary') {
    return `<a href="${href}" style="display: inline-block; background: #C8601F; color: white; text-decoration: none; padding: 14px 28px; border-radius: 3px; font-size: 13px; font-weight: 600; letter-spacing: 0.03em;">${label}</a>`;
  }
  return `<a href="${href}" style="display: inline-block; background: transparent; color: #C8601F; border: 1.5px solid #C8601F; text-decoration: none; padding: 13px 26px; border-radius: 3px; font-size: 13px; font-weight: 600;">${label}</a>`;
};

const card = (innerHtml: string) => `
  <div style="background: #FAF9F7; margin: 16px; padding: 28px; border-radius: 6px; border: 1px solid #D8D2C9;">
    ${innerHtml}
  </div>
`;

const eyebrow = (text: string) => `
  <p style="margin: 0 0 12px; font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; color: #A09A93; font-weight: 500;">
    ${text}
  </p>
`;

const heading = (text: string, italicPart?: string) => `
  <h2 style="font-family: Georgia, serif; font-size: 26px; font-weight: 700; line-height: 1.18; letter-spacing: -0.022em; color: #1A1917; margin: 0 0 20px;">
    ${text}${italicPart ? `<br /><em style="font-style: italic; color: #C8601F;">${italicPart}</em>` : ''}
  </h2>
`;

const para = (text: string) => `
  <p style="font-size: 15px; line-height: 1.8; color: #736D67; margin: 16px 0; font-weight: 400;">
    ${text}
  </p>
`;

const signature = `
  <p style="margin: 28px 0 0; font-family: Georgia, serif; font-style: italic; color: #1A1917; font-size: 15px;">
    Ludovic D. — Fondateur du cabinet
  </p>
  <p style="margin: 4px 0 0; font-size: 11px; color: #A09A93; letter-spacing: 0.12em; text-transform: uppercase;">
    Ingénieur structure
  </p>
`;

// ─────────────────────────────────────────────────────────────────
// Template J+0 : confirmation immédiate
// ─────────────────────────────────────────────────────────────────

export function j0Confirmation(ctx: PathContext): string {
  const tierMessage = ctx.tier === 'HOT'
    ? 'Vu le contexte que vous nous avez décrit, nous vous rappelons sous 4 heures ouvrées pour échanger.'
    : ctx.tier === 'WARM'
    ? 'Nous vous rappelons sous 24 heures ouvrées pour échanger.'
    : 'Nous vous recontactons sous 72 heures ouvrées par email ou téléphone.';

  const inner = `
    ${card(`
      ${eyebrow('Votre demande est en cours d\'analyse')}
      ${heading('Bonjour ' + ctx.firstName + ',', 'votre dossier est ouvert.')}
      ${para('Notre cabinet vient de recevoir votre demande concernant ' + (ctx.path === 'fissure' ? 'des fissures sur votre habitation' : 'votre projet d\'ouverture de mur porteur') + (ctx.city ? ` à ${ctx.city}` : '') + '. Nous l\'étudions avec attention.')}
      ${para(tierMessage)}
      ${para('En attendant, vous pouvez nous appeler directement si vous avez la moindre question.')}
      <p style="margin: 28px 0;">
        ${button('Appeler le 05 82 95 33 75', 'tel:0582953375')}
      </p>
      ${signature}
    `)}
  `;
  return wrap(inner, { eyebrow: 'Confirmation de réception', unsubscribeUrl: ctx.unsubscribeUrl });
}

// ─────────────────────────────────────────────────────────────────
// Template J+1 : synthèse + cas similaires
// ─────────────────────────────────────────────────────────────────

export function j1Synthese(ctx: PathContext): string {
  const synth = ctx.path === 'fissure'
    ? "À la lecture des éléments que vous nous avez transmis, votre situation correspond à un cas que nous traitons régulièrement en Haute-Garonne. Le retrait-gonflement des argiles touche neuf maisons sur dix dans la région."
    : "Votre projet d'ouverture de mur porteur correspond à 30% des chantiers que nous menons chaque mois. La majorité aboutit en moins de 6 semaines entre la première visite et la livraison.";

  const inner = `
    ${card(`
      ${eyebrow('Notre première lecture')}
      ${heading('Voici ce que nous voyons', 'dans votre situation.')}
      ${para('Bonjour ' + ctx.firstName + ',')}
      ${para(synth)}
      ${para(ctx.path === 'fissure'
        ? "Avant tout, ne confondez pas une fissure cosmétique (faïençage) avec une fissure structurelle (en escalier ou supérieure à 2 mm). C'est cette distinction que notre diagnostic instrumenté permet de trancher en moins d'une heure sur place."
        : "Trois éléments font la différence entre un chantier réussi et une mauvaise surprise : le calcul de la poutre par un ingénieur, la qualité de l'étaiement provisoire, et la coordination étude-travaux par une seule équipe.")}
      <p style="margin: 28px 0;">
        ${button(ctx.path === 'fissure' ? 'Voir notre méthode fissures' : 'Voir notre méthode mur porteur', `https://www.ipb-expertise.fr/expertise/${ctx.path === 'fissure' ? 'fissures' : 'mur-porteur'}`)}
      </p>
      ${signature}
    `)}
  `;
  return wrap(inner, { eyebrow: 'J+1 · Synthèse', unsubscribeUrl: ctx.unsubscribeUrl });
}

// ─────────────────────────────────────────────────────────────────
// Template J+3 : étude de cas concrète
// ─────────────────────────────────────────────────────────────────

export function j3CaseStudy(ctx: PathContext): string {
  const isFissure = ctx.path === 'fissure';
  const inner = `
    ${card(`
      ${eyebrow('J+3 · Un chantier raconté')}
      ${heading(isFissure ? 'Maison à Tournefeuille,' : 'T3 à Saint-Cyprien,', isFissure ? 'sécheresse 2022.' : 'mur porteur ouvert.')}
      ${para('Bonjour ' + ctx.firstName + ',')}
      ${para(isFissure
        ? "Pour vous donner une idée concrète de ce qu'on fait : il y a six mois, une maison T4 à Tournefeuille (110 m²) présentait une fissure traversante en escalier de 12 mm sur la façade nord-est. Tassement différentiel reconnu en catastrophe naturelle 2022."
        : "Pour vous donner une idée concrète de ce qu'on fait : il y a six mois, un T3 de 60 m² à Saint-Cyprien avait sa cuisine cloisonnée de 9 m² séparée du séjour par un mur porteur de 4,2 mètres en briques foraines.")}
      ${para(isFissure
        ? "Notre intervention : 14 agrafes inox + 6 micropieux Ø 178 mm. Chantier de 8 jours. Le rapport a été transmis à l'expert d'assurance, l'indemnisation a couvert 92% du montant total."
        : "Notre intervention : étude technique signée, étaiement, pose d'une poutre HEB 220. Chantier de 5 jours. Le bien a été remis en vente trois semaines après — vendu en 21 jours avec une plus-value de 28 000 € pour le propriétaire.")}
      ${para('Chaque dossier est différent, mais le principe reste le même : poser les bons éléments avant d\'engager des travaux.')}
      <p style="margin: 28px 0;">
        ${button('Discuter de votre dossier', 'tel:0582953375')}
      </p>
      ${signature}
    `)}
  `;
  return wrap(inner, { eyebrow: 'J+3 · Étude de cas', unsubscribeUrl: ctx.unsubscribeUrl });
}

// ─────────────────────────────────────────────────────────────────
// Template J+7 : reprise contact (Calendly / RDV)
// ─────────────────────────────────────────────────────────────────

export function j7ReprisePoint(ctx: PathContext): string {
  const inner = `
    ${card(`
      ${eyebrow('J+7 · Reprenons contact')}
      ${heading('Toujours dans votre projet ?', 'On en parle.')}
      ${para('Bonjour ' + ctx.firstName + ',')}
      ${para('Une semaine s\'est écoulée depuis votre demande. Si la situation est toujours d\'actualité, nous serions ravis d\'échanger 15 minutes au téléphone — sans engagement de votre part.')}
      ${para('Cet appel sert à : qualifier précisément ce qu\'il en est, vous orienter vers la bonne suite, ou simplement répondre à vos questions techniques.')}
      <p style="margin: 28px 0;">
        ${button('Choisir un créneau', 'https://www.ipb-expertise.fr/rdv-cabinet')}
        &nbsp;
        ${button('05 82 95 33 75', 'tel:0582953375', 'ghost')}
      </p>
      ${signature}
    `)}
  `;
  return wrap(inner, { eyebrow: 'J+7 · Reprise contact', unsubscribeUrl: ctx.unsubscribeUrl });
}

// ─────────────────────────────────────────────────────────────────
// Template J+14 : sortie propre (auto-désinscription douce)
// ─────────────────────────────────────────────────────────────────

export function j14Closure(ctx: PathContext): string {
  const inner = `
    ${card(`
      ${eyebrow('J+14 · Dernier message')}
      ${heading('Si ce n\'est plus d\'actualité,', 'pas de souci.')}
      ${para('Bonjour ' + ctx.firstName + ',')}
      ${para('Vous n\'avez peut-être pas eu le temps de revenir vers nous, ou votre situation a évolué. Quoi qu\'il en soit, nous ne souhaitons pas vous solliciter inutilement.')}
      ${para('Sans réponse de votre part dans les 7 prochains jours, nous classerons votre dossier. Vous pouvez bien sûr nous rappeler à tout moment — votre dossier sera rouvert sans formalité.')}
      ${para('Si vous souhaitez rester en contact pour les analyses régulières que nous publions sur la pathologie du bâtiment et les ouvertures de murs porteurs en Occitanie, vous pouvez vous inscrire à notre journal mensuel.')}
      <p style="margin: 28px 0;">
        ${button('Recevoir le journal du cabinet', 'https://www.ipb-expertise.fr/blog')}
      </p>
      ${signature}
    `)}
  `;
  return wrap(inner, { eyebrow: 'J+14 · Clôture du dossier', unsubscribeUrl: ctx.unsubscribeUrl });
}

// ─────────────────────────────────────────────────────────────────
// Export consolidé
// ─────────────────────────────────────────────────────────────────

export const emailTemplates = {
  j0Confirmation,
  j1Synthese,
  j3CaseStudy,
  j7ReprisePoint,
  j14Closure,
};

export const emailSequence = [
  { offsetDays: 0, name: 'j0Confirmation', subject: (ctx: PathContext) => `Votre demande au cabinet IPB est prise en compte` },
  { offsetDays: 1, name: 'j1Synthese', subject: (ctx: PathContext) => `Voici ce que nous voyons dans votre situation` },
  { offsetDays: 3, name: 'j3CaseStudy', subject: (ctx: PathContext) => `Un chantier IPB raconté — pour vous donner du concret` },
  { offsetDays: 7, name: 'j7ReprisePoint', subject: (ctx: PathContext) => `Souhaitez-vous échanger 15 minutes ?` },
  { offsetDays: 14, name: 'j14Closure', subject: (ctx: PathContext) => `Dernier message si ce n'est plus d'actualité` },
] as const;
