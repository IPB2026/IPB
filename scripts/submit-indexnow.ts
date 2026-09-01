#!/usr/bin/env npx ts-node

/**
 * Script de soumission massive à IndexNow
 * 
 * Usage: npx ts-node scripts/submit-indexnow.ts
 * 
 * Ce script génère toutes les URLs du sitemap et les soumet
 * à IndexNow pour une indexation rapide.
 */

import sitemap from '../app/sitemap';

const SITE_URL = 'https://www.ipb-expertise.fr';
const INDEXNOW_KEY = '3c7f0e731bd5699d57a1a6e9c52c915e';

/**
 * Source UNIQUE : app/sitemap.ts.
 *
 * Ce script maintenait auparavant sa propre copie des listes d'URL, en
 * parallèle du sitemap. Elles ont dérivé : au moment de la refonte 2026-08 il
 * poussait encore vers IndexNow 'fissure-secheresse-indemnisation' et
 * '/notre-expert' (redirigées depuis juillet), les 13 pages /problemes/, les
 * 10 quartiers et 201 URL du silo villes — soit des centaines d'URL en 301 ou
 * en noindex explicitement soumises à l'indexation.
 *
 * En dérivant du sitemap, le script ne peut plus, par construction, soumettre
 * autre chose que des URL indexables et canoniques d'elles-mêmes.
 */
function getAllUrls(): string[] {
  const entries = sitemap();
  const urls = entries.map((e) => String(e.url));
  const externes = urls.filter((u) => !u.startsWith(SITE_URL));
  if (externes.length > 0) {
    throw new Error(
      `Sitemap : ${externes.length} URL hors du domaine attendu (${externes[0]}). Abandon.`
    );
  }
  return Array.from(new Set(urls));
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

  const allUrls = getAllUrls();
  
  console.log(`\n📊 Total URLs générées: ${allUrls.length}`);
  console.log('   (source unique : app/sitemap.ts — aucune liste maintenue ici)');

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
