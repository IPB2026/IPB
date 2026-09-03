import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import sitemap from '@/app/sitemap';
import { GET as llmsFullRoute } from '@/app/llms-full.txt/route';

/**
 * public/llms.txt est écrit à la main — c'est voulu : il donne aux modèles une
 * sélection curée des pages principales, là où le sitemap en liste plus de cent.
 * Mais un fichier qui maintient sa propre copie d'une liste dérive en quelques
 * mois, ce que ce projet a déjà constaté sur submit-indexnow et plan-site.
 *
 * Ces tests n'imposent donc pas le contenu du fichier : ils vérifient seulement
 * qu'il ne ment pas. Une URL citée doit exister, les délais doivent être ceux
 * annoncés partout ailleurs, et llms-full.txt doit apporter autre chose qu'une
 * copie de llms.txt.
 */
const RACINE = join(process.cwd(), 'public');
const lire = (f: string) => readFileSync(join(RACINE, f), 'utf-8');

const BASE = 'https://www.ipb-expertise.fr';

function urlsCitees(texte: string): string[] {
  const brut = texte.match(/https:\/\/www\.ipb-expertise\.fr[^\s)]*/g) ?? [];
  return [...new Set(brut.map((u) => u.replace(/[.,]$/, '')))];
}

describe('public/llms.txt', () => {
  const llms = lire('llms.txt');

  it('ne cite que des URL présentes dans le sitemap', () => {
    const connues = new Set(sitemap().map((e) => e.url.replace(/\/$/, '')));
    const orphelines = urlsCitees(llms).filter(
      (u) => !connues.has(u.replace(/\/$/, ''))
    );
    expect(orphelines, `URL citées mais absentes du sitemap : ${orphelines.join(', ')}`).toEqual([]);
  });

  it('annonce les délais officiels du site', () => {
    // Ces trois délais sont ceux tenus sur le terrain et affichés sur le site.
    // Les voir diverger ici signalerait que le fichier n'a pas suivi une refonte.
    expect(llms).toMatch(/sous 48 heures/);
    expect(llms).toMatch(/sous 72 heures/);
    expect(llms).toMatch(/3 à 5 jours/);
  });

  it("porte l'identité légale à jour", () => {
    expect(llms).toContain('908 995 103 00029');
    expect(llms).toContain('05 82 95 33 75');
  });

  it("ne décrit pas IPB comme une entreprise de travaux", () => {
    // Le repositionnement diagnostic-first interdit ce discours ; un modèle qui
    // lit ce fichier ne doit pas pouvoir présenter IPB comme un exécutant.
    expect(llms).toMatch(/n'exécute pas de travaux|ne réalise pas les travaux/);
  });
});

describe('/llms-full.txt (route générée)', () => {
  let full: string;
  beforeAll(async () => {
    full = await llmsFullRoute().text();
  });

  it("n'est pas une copie à l'identique de llms.txt", () => {
    // Les deux fichiers ont longtemps été identiques octet pour octet, ce qui
    // rendait llms-full.txt inutile : la convention veut qu'il porte le contenu
    // développé, pas le même index. Il est désormais généré, plus recopié.
    expect(full).not.toEqual(lire('llms.txt'));
  });

  it('développe réellement le contenu', () => {
    expect(full.length).toBeGreaterThan(lire('llms.txt').length * 2);
  });

  it('reprend le socle rédigé de llms.txt', () => {
    expect(full).toContain(lire('llms.txt').trimEnd());
  });

  it('ne cite que des URL présentes dans le sitemap', () => {
    const connues = new Set(sitemap().map((e) => e.url.replace(/\/$/, '')));
    const orphelines = urlsCitees(full).filter((u) => !connues.has(u.replace(/\/$/, '')));
    expect(orphelines, `URL citées mais absentes du sitemap : ${orphelines.join(', ')}`).toEqual([]);
  });
});
