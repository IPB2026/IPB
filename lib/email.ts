import nodemailer from 'nodemailer';

export function createEmailTransporter() {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    throw new Error('Variables SMTP_USER et SMTP_PASS doivent être configurées');
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

interface EmailAttachment {
  filename: string;
  content: string;
  encoding: 'base64';
  contentType?: string;
}

export async function sendEmail(options: {
  to: string;
  subject: string;
  html: string;
  from?: string;
  replyTo?: string;
  attachments?: EmailAttachment[];
  /** Désactive l'en-tête List-Unsubscribe (ex. e-mail purement transactionnel). */
  noUnsubscribe?: boolean;
}) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.error('Email non configuré: SMTP_USER ou SMTP_PASS manquant');
    return { success: false, error: 'SMTP_USER ou SMTP_PASS non configuré' };
  }

  try {
    const transporter = createEmailTransporter();

    // ── Délivrabilité (anti-spam) ──────────────────────────────────────────────
    // 1) Expéditeur avec NOM affiché (pas une adresse nue) — plus fiable aux yeux
    //    des filtres. 2) On force From sur l'adresse AUTHENTIFIÉE (SMTP_USER) pour
    //    rester aligné SPF/DKIM (un From sur un autre domaine via Gmail = spam) et
    //    on met le domaine de marque en Reply-To. 3) Version TEXTE (un HTML seul
    //    est un signal de spam). 4) En-tête List-Unsubscribe (forte amélioration de
    //    réputation et exigé par Gmail/Yahoo pour l'envoi en nombre).
    const senderName = process.env.EMAIL_FROM_NAME || 'IPB Expertise';
    const authAddr = process.env.SMTP_USER as string;
    const brandAddr = process.env.EMAIL_FROM || authAddr;
    const fromHeader = options.from || `${senderName} <${authAddr}>`;
    const replyTo = options.replyTo || brandAddr;
    const text = htmlToText(options.html);

    const headers: Record<string, string> = {};
    if (!options.noUnsubscribe) {
      headers['List-Unsubscribe'] = `<mailto:${brandAddr}?subject=Desinscription>`;
      headers['List-Unsubscribe-Post'] = 'List-Unsubscribe=One-Click';
    }

    const info = await transporter.sendMail({
      from: fromHeader,
      sender: authAddr,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text,
      replyTo,
      headers,
      attachments: options.attachments,
    });

    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Erreur envoi email:', error);
    return { success: false, error: String(error) };
  }
}

/** Version texte brut minimale d'un HTML (pour le multipart text/plain anti-spam). */
function htmlToText(html: string): string {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<\/(p|div|tr|h[1-6]|li)>/gi, '\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&eacute;/g, 'é')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ \t]{2,}/g, ' ')
    .trim();
}
