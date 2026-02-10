import nodemailer from 'nodemailer';

/**
 * Configuration du transporteur email avec Gmail SMTP
 */
export function createEmailTransporter() {
  // Vérification des variables d'environnement
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    throw new Error('Variables SMTP_USER et SMTP_PASS doivent être configurées dans .env.local');
  }

  // Création du transporteur Nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER, // Votre adresse Gmail
      pass: process.env.SMTP_PASS, // Mot de passe d'application Gmail
    },
  });

  return transporter;
}

/**
 * Type pour les pièces jointes
 */
interface EmailAttachment {
  filename: string;
  content: string; // Base64 data (sans le préfixe data:image/...)
  encoding: 'base64';
  contentType?: string;
}

/**
 * Fonction utilitaire pour envoyer un email
 */
export async function sendEmail(options: {
  to: string;
  subject: string;
  html: string;
  from?: string;
  replyTo?: string;
  attachments?: EmailAttachment[];
}) {
  // Vérifier que les variables sont configurées
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.error('Email non configuré: SMTP_USER ou SMTP_PASS manquant');
    return { success: false, error: 'SMTP_USER ou SMTP_PASS non configuré' };
  }

  try {
    const transporter = createEmailTransporter();

    const mailOptions: nodemailer.SendMailOptions = {
      from: options.from || process.env.EMAIL_FROM || process.env.SMTP_USER,
      to: options.to,
      subject: options.subject,
      html: options.html,
      replyTo: options.replyTo,
      attachments: options.attachments,
    };

    const info = await transporter.sendMail(mailOptions);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Erreur envoi email:', error);
    return { success: false, error: String(error) };
  }
}

