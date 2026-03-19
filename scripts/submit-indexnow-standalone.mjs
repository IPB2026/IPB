#!/usr/bin/env node

/**
 * Script de soumission IndexNow — aligné sur le sitemap réduit (69 pages).
 * Ne soumet QUE les URLs présentes dans le sitemap pour éviter les signaux contradictoires.
 * Usage: node scripts/submit-indexnow-standalone.mjs
 */

const SITE_URL = 'https://www.ipb-expertise.fr';
const INDEXNOW_KEY = '3c7f0e731bd5699d57a1a6e9c52c915e';

const priorityVilles = ['toulouse', 'colomiers', 'muret', 'montauban', 'auch', 'albi'];

const spokeFissures = [
  'fissure-en-escalier-causes', 'fissure-horizontale-danger',
  'microfissure-quand-sinquieter', 'fissure-secheresse-indemnisation',
  'fissure-fondation-maison',
];

const spokeHumidite = [
  'remontee-capillaire-solution', 'salpetre-mur-traitement',
  'condensation-ou-infiltration', 'merule-champignon-traitement',
  'moisissures-maison-sante',
];

const departements = ['haute-garonne', 'tarn-et-garonne', 'gers', 'ariege', 'aude', 'tarn'];

const blogPosts = [
  'fissures-maison-toulouse-que-faire', 'agrafage-vs-micropieux-choix',
  'fissures-escalier-tassement-differentiel', 'fissure-ouverture-porte-fenetre',
  'humidite-remontee-capillaire-solution', 'humidite-salpetre-traitement',
  'diagnostic-structurel-maison', 'revente-maison-fissuree',
  'merule-champignon-maison-danger',
  'catastrophe-naturelle-secheresse-demarches-indemnisation',
];

const triggerEvents = [
  'actualites/arrete-secheresse-2026',
  'actualites/canicule-proteger-maison',
  'actualites/infiltrations-automne-hiver',
];

function generateAllUrls() {
  const urls = [];

  // Pages statiques
  urls.push(SITE_URL);
  urls.push(`${SITE_URL}/diagnostic`);
  urls.push(`${SITE_URL}/expertise/fissures`);
  urls.push(`${SITE_URL}/expertise/humidite`);
  urls.push(`${SITE_URL}/blog`);
  urls.push(`${SITE_URL}/contact`);
  urls.push(`${SITE_URL}/plan-site`);

  // Pages piliers
  urls.push(`${SITE_URL}/expert-fissures-toulouse-31`);
  urls.push(`${SITE_URL}/expert-fissures-montauban-82`);
  urls.push(`${SITE_URL}/expert-humidite-toulouse-31`);
  urls.push(`${SITE_URL}/expertise-avant-achat-immobilier-toulouse`);

  // E-E-A-T
  urls.push(`${SITE_URL}/notre-expert`);
  urls.push(`${SITE_URL}/avis-clients`);

  // Trigger events
  triggerEvents.forEach(slug => urls.push(`${SITE_URL}/${slug}`));

  // Spokes
  spokeFissures.forEach(slug => urls.push(`${SITE_URL}/${slug}`));
  spokeHumidite.forEach(slug => urls.push(`${SITE_URL}/${slug}`));

  // Départements
  urls.push(`${SITE_URL}/departements`);
  departements.forEach(dept => urls.push(`${SITE_URL}/departements/${dept}`));

  // Expert par ville (uniquement villes prioritaires)
  priorityVilles.forEach(ville => {
    urls.push(`${SITE_URL}/expert-fissures/${ville}`);
    urls.push(`${SITE_URL}/expert-humidite/${ville}`);
  });

  // Blog
  blogPosts.forEach(slug => urls.push(`${SITE_URL}/blog/${slug}`));

  return urls;
}

async function submitToIndexNow(urls) {
  const INDEXNOW_ENDPOINTS = [
    'https://api.indexnow.org/indexnow',
    'https://www.bing.com/indexnow',
  ];

  const payload = {
    host: 'www.ipb-expertise.fr',
    key: INDEXNOW_KEY,
    keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
    urlList: urls,
  };

  console.log(`\n📤 Soumission de ${urls.length} URLs...\n`);

  for (const endpoint of INDEXNOW_ENDPOINTS) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const status = response.ok ? '✅' : '❌';
      console.log(`${status} ${endpoint}: ${response.status} ${response.statusText}`);
    } catch (error) {
      console.log(`❌ ${endpoint}: ${error.message}`);
    }
  }
}

async function pingGoogle() {
  const sitemapUrl = `${SITE_URL}/sitemap.xml`;
  const pingUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`;
  
  try {
    const response = await fetch(pingUrl);
    console.log(`\n🔔 Google Ping: ${response.ok ? '✅ OK' : '❌ Erreur'} (${response.status})`);
  } catch (error) {
    console.log(`❌ Google Ping: ${error.message}`);
  }
}

async function main() {
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('    INDEXNOW + GOOGLE PING - IPB Expertise (Sitemap réduit)');
  console.log('═══════════════════════════════════════════════════════════════');

  const allUrls = generateAllUrls();
  console.log(`\n📊 Total URLs: ${allUrls.length} (aligné sur sitemap.xml)`);

  await submitToIndexNow(allUrls);
  await pingGoogle();

  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log('    ✅ Terminé !');
  console.log('═══════════════════════════════════════════════════════════════\n');
}

main().catch(console.error);
