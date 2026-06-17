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
        ${opts?.eyebrow || 'IPB · Institut de pathologie du bâtiment'}
      </p>
      <p style="margin: 12px 0 0; font-family: Georgia, serif; font-size: 22px; font-weight: 700; letter-spacing: -0.02em;">
        Institut Pathologie du Bâtiment
      </p>
    </div>

    ${innerHtml}

    <!-- Footer -->
    <div style="background: #0B1826; color: rgba(255,255,255,0.5); padding: 28px 24px; text-align: center; font-size: 11px; line-height: 1.7;">
      <p style="margin: 0 0 4px;">IPB Expertise · 54 avenue Jean Jaurès, 31170 Tournefeuille</p>
      <p style="margin: 0 0 16px;">
        <a href="tel:0582953375" style="color: rgba(255,255,255,0.7); text-decoration: none;">05 82 95 33 75</a>
        &nbsp;·&nbsp;
        <a href="https://www.ipb-expertise.fr" style="color: rgba(255,255,255,0.7); text-decoration: none;">ipb-expertise.fr</a>
      </p>
      <p style="margin: 0; color: rgba(255,255,255,0.3); font-size: 10px;">
        Vous recevez cet email parce que vous avez sollicité notre institut.
        ${opts?.unsubscribeUrl ? `<br /><a href="${opts.unsubscribeUrl}" style="color: rgba(255,255,255,0.4); text-decoration: underline;">Ne plus recevoir d'emails de l’institut</a>` : ''}
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
    Ludovic D. — Fondateur de l’institut
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
    ? 'Nous vous rappelons sous 48 heures pour échanger.'
    : 'Nous vous recontactons sous 48 heures par email ou téléphone.';

  const inner = `
    ${card(`
      ${eyebrow('Votre demande est en cours d\'analyse')}
      ${heading('Bonjour ' + ctx.firstName + ',', 'votre demande est entre de bonnes mains.')}
      ${para('Notre institut vient de recevoir votre demande concernant ' + (ctx.path === 'fissure' ? 'des fissures sur votre habitation' : 'votre projet d\'ouverture de mur porteur') + (ctx.city ? ` à ${ctx.city}` : '') + '. Nous l\'étudions avec attention pour vous orienter au mieux.')}
      ${para(tierMessage)}
      ${para('En attendant notre retour, n\'hésitez pas à nous appeler directement si vous avez la moindre question — nous y répondrons avec plaisir.')}
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
    ? "En relisant les éléments que vous nous avez confiés, votre situation nous est familière : c'est un cas que nous rencontrons très régulièrement en Haute-Garonne, où le retrait-gonflement des argiles fragilise une grande partie des maisons. Rassurez-vous, vous êtes loin d'être seul(e) face à cela."
    : "Votre projet d'ouverture de mur porteur, nous le menons très régulièrement — près d'un tiers de notre activité chaque mois. Et quand l'étude est bien posée en amont, l'essentiel aboutit en moins de 6 semaines, de la première visite à la livraison.";

  const inner = `
    ${card(`
      ${eyebrow('Notre première lecture')}
      ${heading('Voici ce que nous voyons', 'dans votre situation.')}
      ${para('Bonjour ' + ctx.firstName + ',')}
      ${para(synth)}
      ${para(ctx.path === 'fissure'
        ? "Un point essentiel pour vous : il ne faut pas confondre une fissure cosmétique (faïençage) avec une fissure structurelle (en escalier, ou plus large que 2 mm). C'est précisément ce que notre diagnostic instrumenté permet de trancher — en moins d'une heure, sur place."
        : "Trois éléments font toute la différence entre un chantier serein et une mauvaise surprise : le calcul de la poutre par un ingénieur structure, la qualité de l'étaiement provisoire, et une étude puis des travaux coordonnés par un seul interlocuteur — nous.")}
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
        ? "Pour vous donner du concret : il y a six mois, une maison T4 à Tournefeuille (110 m²) présentait une fissure traversante en escalier de 12 mm sur la façade nord-est. Un tassement différentiel du sol, reconnu en catastrophe naturelle 2022 — les propriétaires redoutaient le pire."
        : "Pour vous donner du concret : il y a six mois, un T3 de 60 m² à Saint-Cyprien avait sa cuisine de 9 m² fermée, séparée du séjour par un mur porteur de 4,2 mètres en briques foraines. Les propriétaires rêvaient d'ouvrir l'espace, sans savoir par où commencer.")}
      ${para(isFissure
        ? "Après diagnostic, nous avons préconisé un agrafage structurel (18 agrafes inox) avec ravalement souple, réalisé par nos équipes de réalisation en 8 jours. Surtout : notre rapport transmis à l'expert d'assurance a justifié une indemnisation couvrant 92 % du montant."
        : "Nous avons mené l'étude technique signée, dimensionné une poutre HEB 220, puis coordonné l'étaiement et la pose confiés à nos équipes — 5 jours de chantier. Remis en vente trois semaines plus tard, le bien est parti en 21 jours, avec 28 000 € de plus-value pour les propriétaires.")}
      ${para('Chaque situation est unique, mais le principe ne change jamais : poser le bon diagnostic et la bonne étude avant d\'engager le moindre travaux. C\'est ainsi qu\'on évite les mauvaises surprises.')}
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
      ${para('Une semaine a passé depuis votre demande. Si le sujet est toujours d\'actualité, nous serions heureux d\'échanger 15 minutes au téléphone — sans aucun engagement de votre part.')}
      ${para('Cet échange a un but simple : comprendre précisément votre situation, vous indiquer la bonne marche à suivre, et répondre à vos questions techniques, même les plus basiques.')}
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
      ${para('Vous n\'avez peut-être pas eu le temps de revenir vers nous, ou votre situation a évolué entre-temps. Dans tous les cas, nous ne souhaitons pas vous solliciter inutilement.')}
      ${para('Sans nouvelle de votre part d\'ici une semaine, nous mettrons simplement votre dossier en sommeil. Rien de définitif : un mot de votre part suffit à le rouvrir, à tout moment et sans aucune formalité.')}
      ${para('Et si vous souhaitez simplement rester en contact, nous publions chaque mois des analyses sur la pathologie du bâtiment — fissures, humidité, ouvertures de murs porteurs en Occitanie. Vous pouvez vous y abonner librement, sans engagement.')}
      <p style="margin: 28px 0;">
        ${button('Recevoir le journal de l’institut', 'https://www.ipb-expertise.fr/blog')}
      </p>
      ${signature}
    `)}
  `;
  return wrap(inner, { eyebrow: 'J+14 · Clôture du dossier', unsubscribeUrl: ctx.unsubscribeUrl });
}

// ─────────────────────────────────────────────────────────────────
// Template J+7 post-chantier : demande d'avis Google
// ─────────────────────────────────────────────────────────────────
//
// Envoyé 7 jours après la fin d'un chantier (livraison de rapport
// d'expertise ou réception travaux). Objectif : générer 30+ avis
// Google sur 6 mois pour booster le local pack Toulouse.
//
// Cf. AUDIT_SEO_LOCAL_2026.md — Levier #3 (orchestration GMB)
//
// Le lien Google Reviews `IPB_GOOGLE_REVIEW_URL` doit être renseigné
// avec l'URL courte officielle de la fiche IPB Expertise (format
// https://g.page/r/<id>/review). À compléter dans .env.local :
//   IPB_GOOGLE_REVIEW_URL=...
// ─────────────────────────────────────────────────────────────────

interface ReviewRequestContext extends BaseContext {
  /** Type d'intervention récente */
  serviceType?: 'expertise' | 'chantier' | 'diagnostic';
  /** URL Google Reviews courte (sinon fallback vers la fiche) */
  googleReviewUrl?: string;
}

export function postChantierReviewRequest(ctx: ReviewRequestContext): string {
  const reviewUrl = ctx.googleReviewUrl
    || process.env.IPB_GOOGLE_REVIEW_URL
    || 'https://www.google.com/search?q=IPB+Expertise+Toulouse&hl=fr';

  const intervention = ctx.serviceType === 'chantier'
    ? 'la fin de votre chantier'
    : ctx.serviceType === 'diagnostic'
    ? 'votre diagnostic'
    : 'la remise de votre rapport d\'expertise';

  const inner = `
    ${card(`
      ${eyebrow('Votre retour compte beaucoup')}
      ${heading('Bonjour ' + ctx.firstName + ',', 'un mot après notre intervention.')}
      ${para('Une semaine a passé depuis ' + intervention + (ctx.city ? ` à ${ctx.city}` : '') + '. J\'espère que nos recommandations vous ont apporté de la clarté, et que vous abordez la suite plus sereinement.')}
      ${para('À l\'institut, nous avançons grâce à la confiance que nous accordent les particuliers, les architectes et les marchands de biens. Le bouche-à-oreille reste notre première source de nouveaux dossiers — et quelques mots de votre part comptent énormément pour le faire vivre.')}
      ${para('Si notre accompagnement vous a paru sérieux et utile, accepteriez-vous de partager votre retour sur Google ? Deux minutes et quelques phrases sincères suffisent — et cela aide vraiment celles et ceux qui hésitent encore.')}
      <p style="margin: 28px 0;">
        ${button('Laisser un avis sur Google', reviewUrl)}
      </p>
      ${para('Et si quelque chose ne vous a pas convenu, dites-le-moi en répondant directement à cet e-mail. Je lis chaque message personnellement, et je m\'engage à revenir vers vous sous 48 heures.')}
      ${signature}
    `)}
  `;
  return wrap(inner, { eyebrow: 'J+7 post-intervention · Demande d\'avis', unsubscribeUrl: ctx.unsubscribeUrl });
}

// ─────────────────────────────────────────────────────────────────
// Relance commerciale : devis envoyé sans réponse (J+3 douce / J+7 ferme)
// ─────────────────────────────────────────────────────────────────

interface DevisRelanceContext {
  firstName: string;
  object: string;
  step: 1 | 2; // 1 = J+3, 2 = J+7
  unsubscribeUrl?: string;
}

export function devisRelance(ctx: DevisRelanceContext): string {
  const soft = ctx.step === 1;
  const inner = `
    ${card(`
      ${eyebrow(soft ? 'Votre devis · suite' : 'Votre devis · dernier point')}
      ${heading(
        soft ? 'Une question sur votre devis ?' : 'Souhaitez-vous donner suite ?',
        soft ? 'Nous restons disponibles.' : 'Votre devis est toujours valable.'
      )}
      ${para('Bonjour ' + ctx.firstName + ',')}
      ${para(
        soft
          ? `Nous vous avons adressé notre devis pour <strong>${ctx.object}</strong> il y a quelques jours. Avant d'aller plus loin, nous tenions à vérifier qu'il vous est bien parvenu — et que vous pouvez nous poser vos questions en toute confiance, sur le contenu, le déroulé ou les délais.`
          : `Sauf erreur de notre part, votre devis pour <strong>${ctx.object}</strong> est resté en attente. Bonne nouvelle : il reste valable, et sans engagement de votre part. Un simple message, et nous fixons votre visite sous 72 heures.`
      )}
      ${para(
        soft
          ? "Pour vous rassurer : dès que vous nous donnez votre accord, nous planifions votre visite sous 72 heures."
          : "Si votre situation a changé, ou que le projet n'est plus d'actualité, dites-le-nous simplement — nous classerons votre dossier en toute discrétion, sans vous solliciter davantage."
      )}
      <p style="margin: 28px 0;">
        ${button('En parler — 05 82 95 33 75', 'tel:0582953375')}
      </p>
      ${signature}
    `)}
  `;
  return wrap(inner, {
    eyebrow: soft ? 'Relance · J+3' : 'Relance · J+7',
    unsubscribeUrl: ctx.unsubscribeUrl,
  });
}

// ─────────────────────────────────────────────────────────────────
// Relance d'une facture impayée (échéance dépassée)
// ─────────────────────────────────────────────────────────────────

interface FactureRelanceContext {
  firstName: string;
  number: string;
  montant: string;
  dueDate: string;
  unsubscribeUrl?: string;
}

export function factureRelance(ctx: FactureRelanceContext): string {
  const inner = `
    ${card(`
      ${eyebrow('Facture en attente de règlement')}
      ${heading('Votre facture ' + ctx.number, 'reste à régler.')}
      ${para('Bonjour ' + ctx.firstName + ',')}
      ${para(
        `Sauf erreur de notre part, la facture <strong>${ctx.number}</strong> d'un montant de <strong>${ctx.montant}</strong> (échéance du ${ctx.dueDate}) n'est pas encore parvenue sur notre compte. Si ce n'est pas déjà fait, vous pouvez la régler par virement — les coordonnées bancaires figurent sur le document.`
      )}
      ${para('Une précision qui vous sera utile : c\'est la réception de votre règlement qui lance la rédaction de votre rapport d\'expertise. Dès que votre paiement nous parvient, vous le recevez sous <strong>3 à 5 jours ouvrés</strong>. Nous avons hâte de vous transmettre nos conclusions en toute clarté.')}
      ${para('Et si votre virement vient de partir, pas d\'inquiétude : nos messages se sont sans doute croisés. Pour toute question, ou si vous avez besoin d\'un délai, nous restons à votre écoute avec plaisir.')}
      <p style="margin: 28px 0;">
        ${button('Une question ? 05 82 95 33 75', 'tel:0582953375')}
      </p>
      ${signature}
    `)}
  `;
  return wrap(inner, { eyebrow: 'Relance · facture', unsubscribeUrl: ctx.unsubscribeUrl });
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
  postChantierReviewRequest,
};

// NB : `devisRelance` n'est volontairement PAS dans `emailTemplates` ci-dessus.
// Ce record est indexé dynamiquement par le cron de nurturing (clé = nom d'étape) ;
// y mêler un template au contexte différent (object/step) casserait l'inférence.
// On l'importe directement là où on en a besoin.

export const emailSequence = [
  { offsetDays: 0, name: 'j0Confirmation', subject: (ctx: PathContext) => `Votre demande IPB est prise en compte` },
  { offsetDays: 1, name: 'j1Synthese', subject: (ctx: PathContext) => `Voici ce que nous voyons dans votre situation` },
  { offsetDays: 3, name: 'j3CaseStudy', subject: (ctx: PathContext) => `Un chantier IPB raconté — pour vous donner du concret` },
  { offsetDays: 7, name: 'j7ReprisePoint', subject: (ctx: PathContext) => `Souhaitez-vous échanger 15 minutes ?` },
  { offsetDays: 14, name: 'j14Closure', subject: (ctx: PathContext) => `Dernier message si ce n'est plus d'actualité` },
] as const;

/**
 * Séquence post-chantier (déclenchée après livraison rapport ou fin chantier).
 * À brancher sur un cron séparé qui scrute les chantiers livrés.
 */
export const postChantierSequence = [
  {
    offsetDays: 7,
    name: 'postChantierReviewRequest',
    subject: (ctx: ReviewRequestContext) => `${ctx.firstName}, deux minutes pour un avis sur l'institut ?`,
  },
] as const;
