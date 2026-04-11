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
}) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.error('Email non configuré: SMTP_USER ou SMTP_PASS manquant');
    return { success: false, error: 'SMTP_USER ou SMTP_PASS non configuré' };
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
    console.error('Erreur envoi email:', error);
    return { success: false, error: String(error) };
  }
}
