/**
 * Profils des auteurs du blog IPB — single source of truth.
 *
 * Utilisé par :
 *  - components/blog/AuthorBox.tsx (rendu visuel)
 *  - lib/blog-helpers.ts (schema Person dans le JSON-LD pour boost E-E-A-T)
 */

export interface AuthorProfile {
  name: string;
  bio: string;
  specialty: string;
  jobTitle: string;
  photo?: string;
  /** URL absolue de la page profil (si elle existe). Servira d'@id stable
   *  dans le schema Person pour que Google relie l'auteur à une entité. */
  profileUrl?: string;
}

const baseUrl =
  (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ipb-expertise.fr').replace(/\/+$/, '');

export const authorProfiles: Record<string, AuthorProfile> = {
  'Ludovic D.': {
    name: 'Ludovic D.',
    bio: "12 ans sur le terrain en Haute-Garonne. Ancien conducteur de travaux reconverti dans l'expertise après avoir constaté trop de malfaçons sur les chantiers neufs. Intervient principalement sur Toulouse et sa périphérie.",
    specialty: 'Fissures structurelles & fondations',
    jobTitle: 'Fondateur — Expert structure du bâtiment',
    photo: '/images/ludovic-expert-ipb.webp',
    profileUrl: `${baseUrl}/notre-expert`,
  },
  'Adam F.': {
    name: 'Adam F.',
    bio: "Formé à l'école des Ponts, spécialisé dans les pathologies liées à l'eau. A traité plus de 400 cas de remontées capillaires et d'infiltrations dans le Tarn-et-Garonne et le Gers depuis 2018.",
    specialty: 'Humidité & remontées capillaires',
    jobTitle: 'Ingénieur structure — Spécialiste humidité',
    profileUrl: `${baseUrl}/notre-expert`,
  },
  'Nicolas G.': {
    name: 'Nicolas G.',
    bio: "Expert judiciaire près la Cour d'Appel de Toulouse. Rédige des rapports pour les tribunaux et accompagne les propriétaires dans leurs démarches d'indemnisation catastrophe naturelle.",
    specialty: 'Expertise judiciaire & sinistres',
    jobTitle: "Expert judiciaire — Cour d'Appel de Toulouse",
    profileUrl: `${baseUrl}/notre-expert`,
  },
  'Fabien T.': {
    name: 'Fabien T.',
    bio: "Technicien diagnostic certifié, passé par Véritas avant de rejoindre IPB. Spécialiste des relevés terrain et de l'instrumentation (fissuromètre, hygromètre, caméra thermique).",
    specialty: 'Diagnostic terrain & instrumentation',
    jobTitle: 'Technicien diagnostic certifié',
    profileUrl: `${baseUrl}/notre-expert`,
  },
};

export const defaultAuthorProfile: AuthorProfile = {
  name: 'Institut IPB',
  bio: "Expert en pathologie du bâtiment chez IPB, intervenant en Occitanie.",
  specialty: 'Pathologie du bâtiment',
  jobTitle: 'Institut de pathologies du bâtiment',
  profileUrl: `${baseUrl}/notre-expert`,
};

export function getAuthorProfile(name: string): AuthorProfile {
  return authorProfiles[name] || { ...defaultAuthorProfile, name };
}

/**
 * Génère un schema Person au format JSON-LD pour boost E-E-A-T.
 * Usage : injecté dans Article.author du schema d'article.
 */
export function generatePersonSchema(name: string): object {
  const profile = getAuthorProfile(name);
  return {
    '@type': 'Person',
    '@id': `${profile.profileUrl}#${profile.name.toLowerCase().replace(/[^a-z]/g, '')}`,
    name: profile.name,
    jobTitle: profile.jobTitle,
    description: profile.bio,
    knowsAbout: profile.specialty,
    url: profile.profileUrl,
    ...(profile.photo
      ? {
          image: {
            '@type': 'ImageObject',
            url: profile.photo.startsWith('http')
              ? profile.photo
              : `${baseUrl}${profile.photo}`,
          },
        }
      : {}),
    worksFor: {
      '@type': 'Organization',
      '@id': `${baseUrl}#organization`,
      name: 'IPB - Institut de Pathologie du Bâtiment',
    },
  };
}
