import nodemailer from 'nodemailer';

/**
 * Récupère le mot de passe SMTP en acceptant deux noms de variable :
 * - SMTP_PASS (nom historique du code)
 * - SMTP_PASSWORD (nom utilisé dans la doc ENV_VARIABLES.md)
 *
 * Cette tolérance évite les surprises quand quelqu'un configure Vercel à partir
 * de la doc et nomme la variable SMTP_PASSWORD : les emails partaient
 * silencieusement à la corbeille (le code retournait early sans erreur visible).
 */
function getSmtpPassword(): string | undefined {
  return process.env.SMTP_PASS || process.env.SMTP_PASSWORD;
}

export function createEmailTransporter() {
  const password = getSmtpPassword();
  if (!process.env.SMTP_USER || !password) {
    throw new Error('Variables SMTP_USER et SMTP_PASS (ou SMTP_PASSWORD) doivent être configurées');
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER,
      pass: password,
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
}) {
  const password = getSmtpPassword();
  if (!process.env.SMTP_USER || !password) {
    console.error(
      '[email] Configuration SMTP manquante. Vérifiez SMTP_USER et SMTP_PASS (ou SMTP_PASSWORD) dans Vercel > Settings > Environment Variables.',
      {
        SMTP_USER: process.env.SMTP_USER ? '✓ défini' : '✗ manquant',
        SMTP_PASS: process.env.SMTP_PASS ? '✓ défini' : '✗ manquant',
        SMTP_PASSWORD: process.env.SMTP_PASSWORD ? '✓ défini' : '✗ manquant',
        EMAIL_TO: process.env.EMAIL_TO ? '✓ défini' : '✗ manquant (les leads ne seront pas envoyés à l\'équipe)',
      }
    );
    return { success: false, error: 'Configuration SMTP manquante' };
  }

  try {
    const transporter = createEmailTransporter();

    const info = await transporter.sendMail({
      from: options.from || process.env.EMAIL_FROM || process.env.SMTP_USER,
      to: options.to,
      subject: options.subject,
      html: options.html,
      replyTo: options.replyTo,
      attachments: options.attachments,
    });

    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('[email] Erreur envoi:', error);
    return { success: false, error: String(error) };
  }
}
