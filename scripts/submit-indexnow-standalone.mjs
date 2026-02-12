#!/usr/bin/env node

/**
 * Script de soumission massive à IndexNow (Standalone)
 * Usage: node scripts/submit-indexnow-standalone.mjs
 */

const SITE_URL = 'https://www.ipb-expertise.fr';
const INDEXNOW_KEY = '3c7f0e731bd5699d57a1a6e9c52c915e';

// Liste complète des villes
const villes = [
  'toulouse', 'colomiers', 'tournefeuille', 'blagnac', 'cugnaux', 'balma',
  'plaisance-du-touch', 'ramonville-saint-agne', 'muret', 'castelginest',
  'saint-orens-de-gameville', 'fonsorbes', 'l-union', 'aussonne', 'aucamville',
  'portet-sur-garonne', 'castanet-tolosan', 'labege', 'saint-jean', 'pibrac',
  'villeneuve-tolosane', 'frouzins', 'seysses', 'launaguet', 'fenouillet',
  'saint-gaudens', 'leguevin', 'montauban', 'castelsarrasin', 'moissac',
  'caussade', 'montech', 'auch', 'albi', 'castres', 'gaillac', 'lavaur',
  'mazamet', 'graulhet', 'carmaux', 'rabastens', 'saint-sulpice-la-pointe',
  'pamiers', 'foix', 'lavelanet', 'carcassonne', 'narbonne'
];

// Pages spoke fissures
const spokeFissures = [
  'fissure-en-escalier-causes', 'fissure-horizontale-danger',
  'microfissure-quand-sinquieter', 'fissure-secheresse-indemnisation',
  'fissure-fondation-maison'
];

// Pages spoke humidité
const spokeHumidite = [
  'salpetre-mur-traitement', 'remontee-capillaire-solution',
  'remontees-capillaires-traitement', 'condensation-ou-infiltration',
  'merule-champignon-traitement', 'vmi-ventilation-insufflation',
  'moisissures-maison-sante', 'cave-humide-solutions', 'ponts-thermiques-condensation'
];

// Départements
const departements = ['haute-garonne', 'tarn-et-garonne', 'gers', 'ariege', 'aude', 'tarn'];

// Blog posts (principaux)
const blogPosts = [
  'fissures-maison-toulouse-que-faire', 'agrafage-vs-micropieux-choix',
  'fissures-escalier-tassement-differentiel', 'fissure-ouverture-porte-fenetre',
  'humidite-remontee-capillaire-solution', 'humidite-salpetre-traitement',
  'cout-reparation-fissures-2025', 'diagnostic-structurel-maison',
  'revente-maison-fissuree', 'merule-champignon-maison-danger'
];

function generateAllUrls() {
  const urls = [];

  // Pages statiques prioritaires
  urls.push(SITE_URL);
  urls.push(`${SITE_URL}/diagnostic`);
  urls.push(`${SITE_URL}/expertise/fissures`);
  urls.push(`${SITE_URL}/expertise/humidite`);
  urls.push(`${SITE_URL}/blog`);
  urls.push(`${SITE_URL}/contact`);
  urls.push(`${SITE_URL}/notre-expert`);
  urls.push(`${SITE_URL}/plan-site`);

  // Pages piliers
  urls.push(`${SITE_URL}/expert-fissures-toulouse-31`);
  urls.push(`${SITE_URL}/expert-fissures-montauban-82`);
  urls.push(`${SITE_URL}/expert-humidite-toulouse-31`);
  urls.push(`${SITE_URL}/expertise-avant-achat-immobilier-toulouse`);

  // Départements
  departements.forEach(dept => urls.push(`${SITE_URL}/departements/${dept}`));

  // Spoke pages
  spokeFissures.forEach(slug => urls.push(`${SITE_URL}/${slug}`));
  spokeHumidite.forEach(slug => urls.push(`${SITE_URL}/${slug}`));

  // Expert par ville
  villes.forEach(ville => {
    urls.push(`${SITE_URL}/expert-fissures/${ville}`);
    urls.push(`${SITE_URL}/expert-humidite/${ville}`);
  });

  // Villes
  villes.forEach(ville => urls.push(`${SITE_URL}/villes/${ville}`));

  // Services par ville
  villes.forEach(ville => {
    urls.push(`${SITE_URL}/agrafage-fissures/${ville}`);
    urls.push(`${SITE_URL}/traitement-humidite/${ville}`);
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
  console.log('    INDEXNOW + GOOGLE PING - IPB Expertise');
  console.log('═══════════════════════════════════════════════════════════════');

  const allUrls = generateAllUrls();
  console.log(`\n📊 Total URLs: ${allUrls.length}`);

  // Soumettre par lots de 100
  const batchSize = 100;
  for (let i = 0; i < allUrls.length; i += batchSize) {
    const batch = allUrls.slice(i, i + batchSize);
    console.log(`\n--- Lot ${Math.floor(i/batchSize) + 1}/${Math.ceil(allUrls.length/batchSize)} ---`);
    await submitToIndexNow(batch);
    
    if (i + batchSize < allUrls.length) {
      console.log('⏳ Pause 1s...');
      await new Promise(r => setTimeout(r, 1000));
    }
  }

  // Ping Google
  await pingGoogle();

  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log('    ✅ Terminé ! Bing indexera sous 24-48h');
  console.log('═══════════════════════════════════════════════════════════════\n');
}

main().catch(console.error);
