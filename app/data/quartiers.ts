export type QuartierInfo = {
  nom: string;
  ville: string;
  description: string;
  caracteristiques: string[];
  problematiques: string[];
};

export const quartiersData: Record<string, QuartierInfo> = {
  'capitole': {
    nom: 'Capitole',
    ville: 'Toulouse',
    description: 'Quartier historique au cœur de Toulouse',
    caracteristiques: [
      'Bâtiments anciens (XVIIe-XIXe siècle)',
      'Immeubles en brique rouge',
      'Fondations sur sol argileux'
    ],
    problematiques: [
      'Fissures structurelles liées à l\'ancienneté',
      'Remontées capillaires fréquentes',
      'Tassements différentiels sur sol argileux'
    ]
  },
  'saint-cyprien': {
    nom: 'Saint-Cyprien',
    ville: 'Toulouse',
    description: 'Quartier rive gauche, proche de la Garonne',
    caracteristiques: [
      'Proximité de la Garonne',
      'Habitat mixte ancien et moderne',
      'Zone inondable historique'
    ],
    problematiques: [
      'Humidité ascensionnelle',
      'Infiltrations caves et sous-sols',
      'Fissures liées aux variations du niveau d\'eau'
    ]
  },
  'compans-caffarelli': {
    nom: 'Compans-Caffarelli',
    ville: 'Toulouse',
    description: 'Quartier d\'affaires moderne',
    caracteristiques: [
      'Constructions récentes',
      'Immeubles contemporains',
      'Sol argileux sensible'
    ],
    problematiques: [
      'Tassements différentiels sur argile',
      'Fissures liées à la sécheresse',
      'Mouvements de terrain en période estivale'
    ]
  },
  'saint-michel': {
    nom: 'Saint-Michel',
    ville: 'Toulouse',
    description: 'Quartier populaire en pleine rénovation',
    caracteristiques: [
      'Bâti ancien mixte',
      'Rénovations urbaines',
      'Proximité Garonne'
    ],
    problematiques: [
      'Humidité cave et rez-de-chaussée',
      'Fissures façades anciennes',
      'Remontées capillaires massives'
    ]
  },
  'minimes': {
    nom: 'Minimes',
    ville: 'Toulouse',
    description: 'Grand quartier résidentiel du nord-est',
    caracteristiques: [
      'Lotissements années 70-90',
      'Maisons individuelles',
      'Sol argileux sensible'
    ],
    problematiques: [
      'Fissures structurelles généralisées',
      'Tassements différentiels importants',
      'Impact sécheresse 2022-2023'
    ]
  },
  'croix-daurade': {
    nom: 'Croix-Daurade',
    ville: 'Toulouse',
    description: 'Quartier résidentiel au nord',
    caracteristiques: [
      'Maisons individuelles récentes',
      'Lotissements modernes',
      'Terrain argileux'
    ],
    problematiques: [
      'Fissures en escalier sur façades',
      'Mouvements de fondations',
      'Sécheresse et retrait-gonflement argile'
    ]
  },
  'lalande': {
    nom: 'Lalande',
    ville: 'Toulouse',
    description: 'Quartier nord en développement',
    caracteristiques: [
      'Zone d\'extension urbaine',
      'Habitat mixte',
      'Sol argileux à surveiller'
    ],
    problematiques: [
      'Fissures nouvelles constructions',
      'Tassements différentiels',
      'Problèmes d\'humidité sous-sol'
    ]
  },
  'rangueil': {
    nom: 'Rangueil',
    ville: 'Toulouse',
    description: 'Quartier universitaire au sud-est',
    caracteristiques: [
      'Campus universitaire',
      'Résidences récentes',
      'Terrains en pente'
    ],
    problematiques: [
      'Infiltrations toitures-terrasses',
      'Fissures liées au relief',
      'Humidité façades exposées'
    ]
  },
  'pont-des-demoiselles': {
    nom: 'Pont-des-Demoiselles',
    ville: 'Toulouse',
    description: 'Quartier résidentiel est',
    caracteristiques: [
      'Immeubles années 60-80',
      'Proximité Canal du Midi',
      'Bâti dense'
    ],
    problematiques: [
      'Humidité murs enterrés',
      'Fissures béton armé',
      'Infiltrations caves collectives'
    ]
  },
  'saint-simon': {
    nom: 'Saint-Simon',
    ville: 'Toulouse',
    description: 'Quartier sud-est en expansion',
    caracteristiques: [
      'Lotissements pavillonnaires',
      'Maisons récentes',
      'Sol argileux sensible'
    ],
    problematiques: [
      'Fissures structurelles après construction',
      'Tassements fondations',
      'Impact climatique sécheresse'
    ]
  }
};

export const quartierSlugs = Object.keys(quartiersData);
