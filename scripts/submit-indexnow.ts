#!/usr/bin/env npx ts-node

/**
 * Script de soumission massive à IndexNow
 * 
 * Usage: npx ts-node scripts/submit-indexnow.ts
 * 
 * Ce script génère toutes les URLs du sitemap et les soumet
 * à IndexNow pour une indexation rapide.
 */

import { villeSlugs } from '../app/data/villes';
import { problemSlugs } from '../app/data/problems';
import { quartierSlugs } from '../app/data/quartiers';
import { blogPostsSlugs } from '../app/data/blog';

const SITE_URL = 'https://www.ipb-expertise.fr';
const INDEXNOW_KEY = '3c7f0e731bd5699d57a1a6e9c52c915e';

// Pages spoke
const spokeFissuresPages = [
  'fissure-en-escalier-causes',
  'fissure-horizontale-danger',
  'microfissure-quand-sinquieter',
  'fissure-secheresse-indemnisation',
  'fissure-fondation-maison',
];

const spokeHumiditePages = [
  'salpetre-mur-traitement',
  'remontee-capillaire-solution',
  'remontees-capillaires-traitement',
  'condensation-ou-infiltration',
  'merule-champignon-traitement',
  'vmi-ventilation-insufflation',
  'moisissures-maison-sante',
  'cave-humide-solutions',
  'ponts-thermiques-condensation',
];

const triggerEventsPages = [
  'actualites/arrete-secheresse-2026',
  'actualites/canicule-proteger-maison',
  'actualites/infiltrations-automne-hiver',
];

function generateAllUrls(): string[] {
  const urls: string[] = [];

  // Pages statiques prioritaires
  urls.push(SITE_URL);
  urls.push(`${SITE_URL}/diagnostic`);
  urls.push(`${SITE_URL}/expertise/fissures`);
  urls.push(`${SITE_URL}/expertise/humidite`);
  urls.push(`${SITE_URL}/blog`);
  urls.push(`${SITE_URL}/contact`);
  urls.push(`${SITE_URL}/notre-expert`);
  urls.push(`${SITE_URL}/plan-site`);

  // Pages piliers géographiques
  urls.push(`${SITE_URL}/expert-fissures-toulouse-31`);
  urls.push(`${SITE_URL}/expert-fissures-montauban-82`);
  urls.push(`${SITE_URL}/expert-humidite-toulouse-31`);
  urls.push(`${SITE_URL}/expertise-avant-achat-immobilier-toulouse`);

  // Pages départements
  ['haute-garonne', 'tarn-et-garonne', 'gers', 'ariege', 'aude', 'tarn'].forEach(dept => {
    urls.push(`${SITE_URL}/departements/${dept}`);
  });

  // Pages spoke fissures
  spokeFissuresPages.forEach(slug => {
    urls.push(`${SITE_URL}/${slug}`);
  });

  // Pages spoke humidité
  spokeHumiditePages.forEach(slug => {
    urls.push(`${SITE_URL}/${slug}`);
  });

  // Pages trigger events
  triggerEventsPages.forEach(slug => {
    urls.push(`${SITE_URL}/${slug}`);
  });

  // Pages expert par ville (haute priorité)
  villeSlugs.forEach(ville => {
    urls.push(`${SITE_URL}/expert-fissures/${ville}`);
    urls.push(`${SITE_URL}/expert-humidite/${ville}`);
  });

  // Pages villes
  villeSlugs.forEach(ville => {
    urls.push(`${SITE_URL}/villes/${ville}`);
  });

  // Pages services par ville
  ['agrafage-fissures', 'traitement-humidite'].forEach(service => {
    villeSlugs.forEach(ville => {
      urls.push(`${SITE_URL}/${service}/${ville}`);
    });
  });

  // Pages blog
  blogPostsSlugs.forEach(slug => {
    urls.push(`${SITE_URL}/blog/${slug}`);
  });

  // Pages problèmes
  problemSlugs.forEach(slug => {
    urls.push(`${SITE_URL}/problemes/${slug}`);
  });

  // Pages quartiers
  quartierSlugs.forEach(quartier => {
    urls.push(`${SITE_URL}/quartiers/${quartier}`);
  });

  return urls;
}

async function submitToIndexNow(urls: string[]): Promise<void> {
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

  console.log(`\n📤 Soumission de ${urls.length} URLs à IndexNow...\n`);

  for (const endpoint of INDEXNOW_ENDPOINTS) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const status = response.ok ? '✅' : '❌';
      console.log(`${status} ${endpoint}: ${response.status} ${response.statusText}`);
    } catch (error) {
      console.log(`❌ ${endpoint}: ${error instanceof Error ? error.message : 'Erreur'}`);
    }
  }
}

async function main() {
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('    INDEXNOW - Soumission massive pour IPB Expertise');
  console.log('═══════════════════════════════════════════════════════════════');

  const allUrls = generateAllUrls();
  
  console.log(`\n📊 Total URLs générées: ${allUrls.length}`);
  console.log('\n📋 Répartition:');
  console.log(`   - Pages statiques/piliers: ~15`);
  console.log(`   - Pages spoke (fissures + humidité): ${spokeFissuresPages.length + spokeHumiditePages.length}`);
  console.log(`   - Pages départements: 6`);
  console.log(`   - Pages expert-fissures par ville: ${villeSlugs.length}`);
  console.log(`   - Pages expert-humidite par ville: ${villeSlugs.length}`);
  console.log(`   - Pages villes: ${villeSlugs.length}`);
  console.log(`   - Pages services par ville: ${villeSlugs.length * 2}`);
  console.log(`   - Articles blog: ${blogPostsSlugs.length}`);
  console.log(`   - Pages problèmes: ${problemSlugs.length}`);
  console.log(`   - Pages quartiers: ${quartierSlugs.length}`);

  // Soumettre par lots de 100 URLs (meilleure pratique)
  const batchSize = 100;
  const batches = [];
  for (let i = 0; i < allUrls.length; i += batchSize) {
    batches.push(allUrls.slice(i, i + batchSize));
  }

  console.log(`\n🔄 Soumission en ${batches.length} lots de ${batchSize} URLs max...\n`);

  for (let i = 0; i < batches.length; i++) {
    console.log(`\n--- Lot ${i + 1}/${batches.length} (${batches[i].length} URLs) ---`);
    await submitToIndexNow(batches[i]);
    
    // Pause entre les lots pour éviter le rate limiting
    if (i < batches.length - 1) {
      console.log('⏳ Pause de 2 secondes...');
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }

  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log('    ✅ Soumission terminée!');
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('\n📌 Prochaines étapes:');
  console.log('   1. Vérifiez dans Bing Webmaster Tools que les URLs sont reçues');
  console.log('   2. Attendez 24-48h pour voir l\'effet dans Google Search Console');
  console.log('   3. Re-exécutez ce script après chaque mise à jour importante\n');
}

main().catch(console.error);
