#!/usr/bin/env node
/**
 * Contrôle post-déploiement des redirections SEO.
 *
 *   node scripts/verify-redirects.mjs                      → production
 *   node scripts/verify-redirects.mjs http://localhost:3000 → local
 *
 * Le script ne maintient AUCUNE liste : il dérive ce qu'il attend du code
 * (next.config.js pour les règles fixes, app/data/* pour les règles
 * algorithmiques du middleware). C'est la leçon de submit-indexnow.ts et de
 * plan-site, qui maintenaient leur propre copie et ont dérivé en trois mois.
 *
 * Il vérifie, dans l'ordre du protocole :
 *   1. chaque source redirige, en 301 ou 308, vers la destination attendue
 *   2. aucune chaîne : chaque destination répond 200
 *   3. le sitemap ne contient que des URL en 200, aucune noindex
 *   4. aucune 404 introduite
 */
import { readFileSync } from 'node:fs';

const BASE = (process.argv[2] || 'https://www.ipb-expertise.fr').replace(/\/+$/, '');
const CONCURRENCE = 8;

const c = {
  ok: (s) => `\x1b[32m${s}\x1b[0m`,
  ko: (s) => `\x1b[31m${s}\x1b[0m`,
  warn: (s) => `\x1b[33m${s}\x1b[0m`,
  bold: (s) => `\x1b[1m${s}\x1b[0m`,
  dim: (s) => `\x1b[2m${s}\x1b[0m`,
};

// ── Sources de vérité ────────────────────────────────────────────────────────

/** Règles fixes : lues directement dans next.config.js. */
async function redirectionsFixes() {
  const { createRequire } = await import('node:module');
  const require = createRequire(import.meta.url);
  const config = require('../next.config.js');
  const regles = await config.redirects();
  return regles
    .filter((r) => !r.source.includes(':')) // on ignore les patterns paramétrés
    .map((r) => ({ source: r.source, attendu: r.destination, origine: 'next.config.js' }));
}

function slugsDe(fichier, motif) {
  const src = readFileSync(new URL(fichier, import.meta.url), 'utf-8');
  return [...src.matchAll(motif)].map((m) => m[1]);
}

/** Règles algorithmiques du middleware, recalculées depuis les données. */
function redirectionsMiddleware() {
  const villes = slugsDe('../app/data/villes.ts', /^ {2}'?([a-z0-9-]+)'?: \{/gm);
  const prioritaires = new Set(
    slugsDe('../app/data/villes-prioritaires.ts', /^ {2}'([a-z0-9-]+)',/gm)
  );
  const src = readFileSync(new URL('../app/data/villes.ts', import.meta.url), 'utf-8');
  const departementDe = (ville) => {
    const i = src.search(new RegExp(`^ {2}'?${ville}'?: \\{`, 'm'));
    if (i < 0) return null;
    const dep = src.slice(i, i + 3000).match(/departement: '([^']+)'/)?.[1];
    return (
      {
        'Haute-Garonne (31)': '/departements/haute-garonne',
        'Tarn-et-Garonne (82)': '/departements/tarn-et-garonne',
        'Gers (32)': '/departements/gers',
        'Tarn (81)': '/departements/tarn',
        'Ariège (09)': '/departements/ariege',
        'Aude (11)': '/departements/aude',
      }[dep] ?? null
    );
  };

  const regles = [];
  for (const v of villes) {
    const dep = departementDe(v);
    const prio = prioritaires.has(v);
    // Villes non prioritaires : les 5 préfixes convergent vers le département.
    for (const prefixe of ['/expert-fissures', '/expert-humidite', '/villes', '/agrafage-fissures', '/traitement-humidite']) {
      if (prefixe === '/expert-fissures' && (prio || v === 'toulouse')) continue;
      if (prefixe === '/expert-humidite' && (prio || v === 'toulouse')) continue;
      if (!prio && dep) {
        regles.push({ source: `${prefixe}/${v}`, attendu: dep, origine: 'middleware' });
      } else if (prio) {
        // Doublons historiques d'une ville conservée → sa canonique.
        if (prefixe === '/villes' || prefixe === '/agrafage-fissures') {
          regles.push({
            source: `${prefixe}/${v}`,
            attendu: v === 'toulouse' ? '/expert-fissures-toulouse-31' : `/expert-fissures/${v}`,
            origine: 'middleware',
          });
        } else if (prefixe === '/traitement-humidite') {
          regles.push({
            source: `${prefixe}/${v}`,
            attendu: v === 'toulouse' ? '/expert-humidite-toulouse-31' : `/expert-humidite/${v}`,
            origine: 'middleware',
          });
        }
      }
    }
  }
  for (const q of ['', '/capitole', '/compans-caffarelli', '/croix-daurade', '/lalande', '/minimes',
                   '/pont-des-demoiselles', '/rangueil', '/saint-cyprien', '/saint-michel', '/saint-simon']) {
    regles.push({ source: `/quartiers${q}`, attendu: '/expert-fissures-toulouse-31', origine: 'middleware' });
  }
  return regles;
}

// ── Réseau ───────────────────────────────────────────────────────────────────

async function tete(url) {
  try {
    const r = await fetch(BASE + url, { method: 'HEAD', redirect: 'manual' });
    return { code: r.status, location: (r.headers.get('location') || '').replace(BASE, '') };
  } catch (e) {
    return { code: 0, location: '', erreur: e.message };
  }
}

async function enLots(items, f) {
  const out = [];
  for (let i = 0; i < items.length; i += CONCURRENCE) {
    out.push(...(await Promise.all(items.slice(i, i + CONCURRENCE).map(f))));
  }
  return out;
}

// ── Contrôles ────────────────────────────────────────────────────────────────

async function main() {
  console.log(c.bold(`\nContrôle des redirections — ${BASE}\n`));

  const regles = [...(await redirectionsFixes()), ...redirectionsMiddleware()];
  console.log(c.dim(`${regles.length} règles dérivées du code (next.config.js + middleware)\n`));

  // 1. Les sources redirigent-elles vers la bonne destination ?
  const resultats = await enLots(regles, async (r) => ({ ...r, ...(await tete(r.source)) }));
  const permanentes = [301, 308];
  const echecs = resultats.filter(
    (r) => !permanentes.includes(r.code) || r.location.replace(/\/$/, '') !== r.attendu.replace(/\/$/, '')
  );
  console.log(
    `1. Redirections permanentes vers la bonne cible : ` +
      (echecs.length === 0 ? c.ok(`${resultats.length}/${resultats.length} ✓`) : c.ko(`${echecs.length} échec(s)`))
  );
  for (const e of echecs.slice(0, 25)) {
    console.log(c.ko(`     ${e.code || 'ERR'}  ${e.source}`) + c.dim(`  attendu → ${e.attendu}`) + (e.location ? `  obtenu → ${e.location}` : ''));
  }
  if (echecs.length > 25) console.log(c.dim(`     … +${echecs.length - 25}`));

  // 2. Aucune chaîne : les destinations répondent 200.
  const dests = [...new Set(regles.map((r) => r.attendu))];
  const statutsDest = await enLots(dests, async (d) => ({ d, ...(await tete(d)) }));
  const chaines = statutsDest.filter((s) => s.code !== 200);
  console.log(
    `2. Destinations en 200, aucune chaîne              : ` +
      (chaines.length === 0 ? c.ok(`${dests.length}/${dests.length} ✓`) : c.ko(`${chaines.length} problème(s)`))
  );
  for (const s of chaines) console.log(c.ko(`     ${s.code}  ${s.d}`) + (s.location ? ` → ${s.location}` : ''));

  // 3. Sitemap servi : que des URL en 200, aucune noindex.
  const xml = await fetch(`${BASE}/sitemap.xml`).then((r) => r.text());
  // Le sitemap déclare des URL absolues sur le domaine canonique, qui n'est pas
  // forcément celui qu'on teste (local, préprod). On ne garde que le chemin.
  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => {
    try {
      return new URL(m[1]).pathname.replace(/\/$/, '') || '/';
    } catch {
      return m[1];
    }
  });
  const statutsSm = await enLots(urls, async (u) => ({ u, ...(await tete(u)) }));
  const smKo = statutsSm.filter((s) => s.code !== 200);
  const noindex = (
    await enLots(urls, async (u) => {
      const h = await fetch(BASE + u).then((r) => r.text()).catch(() => '');
      return /name="robots"[^>]*content="[^"]*noindex/.test(h) ? u : null;
    })
  ).filter(Boolean);
  console.log(
    `3. Sitemap (${urls.length} URL) — toutes en 200                : ` +
      (smKo.length === 0 ? c.ok('✓') : c.ko(`${smKo.length} hors-200`))
  );
  for (const s of smKo) console.log(c.ko(`     ${s.code}  ${s.u}`));
  console.log(
    `4. Sitemap — aucune noindex                        : ` +
      (noindex.length === 0 ? c.ok('✓') : c.ko(`${noindex.length}`))
  );
  for (const u of noindex) console.log(c.ko(`     ${u}`));

  const ko = echecs.length + chaines.length + smKo.length + noindex.length;
  console.log(
    '\n' + (ko === 0 ? c.ok(c.bold('Protocole satisfait.')) : c.ko(c.bold(`${ko} anomalie(s) — voir ci-dessus.`))) + '\n'
  );
  process.exit(ko === 0 ? 0 : 1);
}

main().catch((e) => {
  console.error(c.ko(`Échec : ${e.message}`));
  process.exit(1);
});
