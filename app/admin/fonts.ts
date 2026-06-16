import { Inter } from 'next/font/google';

/**
 * Police de l'interface back-office. Inter = standard des CRM modernes
 * (Attio, Linear, Pipedrive). Scopée à /admin pour ne pas toucher
 * la typographie éditoriale du site public (Playfair + DM Sans).
 */
export const adminFont = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-admin',
});
