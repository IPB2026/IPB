/**
 * Libellés du fil d'Ariane, par segment d'URL.
 *
 * Table unique : un libellé écrit ici vaut pour toutes les pages qui traversent
 * ce segment. Les segments absents sont dérivés du slug (tirets → espaces,
 * première lettre capitalisée), ce qui suffit pour la plupart des pages.
 */
export const BREADCRUMB_LABELS: Record<string, string> = {
  // Sections
  expertise: 'Expertises',
  blog: 'Blog',
  actualites: 'Actualités',
  departements: 'Départements',
  partenaires: 'Partenaires',
  legal: 'Informations légales',

  // Pages dont le slug ne donne pas un libellé lisible
  fissures: 'Diagnostic de fissures',
  humidite: 'Diagnostic humidité',
  'retrait-gonflement-argiles': 'Retrait-gonflement des argiles',
  'expertise-avant-achat-immobilier-toulouse': 'Inspection avant achat',
  'diagnostic-avant-vente': 'Diagnostic avant vente',
  'secheresse-fissures-catastrophe-naturelle': 'Fissures de sécheresse et CAT-NAT',
  'carte-secheresse-occitanie': 'Carte sécheresse Occitanie',
  'salpetre-mur-traitement': 'Salpêtre sur les murs',
  'merule-champignon-traitement': 'Mérule',
  'moisissures-maison-sante': 'Moisissures et santé',
  'remontees-capillaires-traitement': 'Remontées capillaires',
  'ponts-thermiques-condensation': 'Ponts thermiques et condensation',
  'vmi-ventilation-insufflation': 'VMI — ventilation par insufflation',
  'expert-fissures-toulouse-31': 'Expert fissures à Toulouse',
  'expert-humidite-toulouse-31': 'Expert humidité à Toulouse',
  'zones-intervention': "Zones d'intervention",
  'notre-methode': 'Notre méthode',
  'avis-clients': 'Avis clients',
  'plan-site': 'Plan du site',
  'rdv-cabinet': 'Rendez-vous au cabinet',
  institut: "L'institut",
  lexique: 'Lexique du bâtiment',
  contact: 'Contact',
  diagnostic: 'Pré-diagnostic en ligne',
  'agences-immobilieres': 'Agences immobilières',
  'mentions-legales': 'Mentions légales',
  cgv: 'Conditions générales de vente',
  confidentialite: 'Politique de confidentialité',
  'haute-garonne': 'Haute-Garonne',
  'tarn-et-garonne': 'Tarn-et-Garonne',
  ariege: 'Ariège',
  gers: 'Gers',
  tarn: 'Tarn',
  aude: 'Aude',
  'arrete-secheresse-2026': 'Arrêté sécheresse',
  'canicule-proteger-maison': 'Canicule et fissures',
  'infiltrations-automne-hiver': 'Infiltrations automne-hiver',
};
