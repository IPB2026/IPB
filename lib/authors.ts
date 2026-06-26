/**
 * Profil auteur unique du blog IPB.
 *
 * La signature éditoriale est collective. Toutes les publications sont
 * attribuées à l'institut, pas à une personne physique.
 *
 * Utilisé par :
 *  - components/blog/AuthorBox.tsx (rendu visuel)
 *  - lib/blog-helpers.ts (schema Person dans le JSON-LD pour E-E-A-T)
 */

export interface AuthorProfile {
  name: string;
  bio: string;
  specialty: string;
  jobTitle: string;
  photo?: string;
  profileUrl?: string;
}

const baseUrl =
  (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ipb-expertise.fr').replace(/\/+$/, '');

const institutProfile: AuthorProfile = {
  name: "L'institut IPB",
  bio: "L'institut IPB intervient en pathologie et structure du bâtiment en Occitanie (Haute-Garonne, Tarn-et-Garonne, Gers, Tarn). Diagnostic indépendant : fissures, humidité, expertise avant achat et avant vente. Plus de 850 chantiers menés par le réseau IPB depuis 2019.",
  specialty: 'Pathologie et structure du bâtiment',
  jobTitle: 'Institut de pathologie du bâtiment — IPB',
  profileUrl: `${baseUrl}/notre-expert`,
};

export const authorProfiles: Record<string, AuthorProfile> = {};

export const defaultAuthorProfile: AuthorProfile = institutProfile;

export function getAuthorProfile(_name: string): AuthorProfile {
  return institutProfile;
}

/**
 * Génère un schema Organization au format JSON-LD pour le E-E-A-T.
 * Toutes les publications sont signées par l'institut, pas par un individu.
 */
export function generatePersonSchema(_name: string): object {
  return {
    '@type': 'Organization',
    '@id': `${baseUrl}#organization`,
    name: 'IPB — Institut de Pathologie du Bâtiment',
    url: baseUrl,
    description: institutProfile.bio,
    knowsAbout: institutProfile.specialty,
  };
}
