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
 * Fonction utilitaire pour envoyer un email
 */
export async function sendEmail(options: {
  to: string;
  subject: string;
  html: string;
  from?: string;
  replyTo?: string;
}) {
  // Vérifier que les variables sont configurées
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.error('❌ EMAIL NON CONFIGURÉ : SMTP_USER et/ou SMTP_PASS manquants !');
    console.error('Variables actuelles:', {
      SMTP_USER: process.env.SMTP_USER ? '✅ défini' : '❌ manquant',
      SMTP_PASS: process.env.SMTP_PASS ? '✅ défini' : '❌ manquant',
      EMAIL_TO: process.env.EMAIL_TO ? '✅ défini' : '❌ manquant',
    });
    return { success: false, error: 'SMTP_USER ou SMTP_PASS non configuré sur Vercel' };
  }

  try {
    const transporter = createEmailTransporter();

    const mailOptions = {
      from: options.from || process.env.EMAIL_FROM || process.env.SMTP_USER,
      to: options.to,
      subject: options.subject,
      html: options.html,
      replyTo: options.replyTo,
    };

    console.log('📧 Envoi email en cours...', {
      to: options.to,
      subject: options.subject.substring(0, 50) + '...',
    });

    const info = await transporter.sendMail(mailOptions);
    
    console.log('✅ Email envoyé avec succès:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ ERREUR ENVOI EMAIL:', error);
    return { success: false, error: String(error) };
  }
}

