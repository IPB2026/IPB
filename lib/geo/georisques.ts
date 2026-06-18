import 'server-only';

/**
 * Contexte de risque officiel d'une adresse, pour enrichir les rapports de
 * diagnostic avec des données AUTHENTIQUES (et non les seules connaissances du
 * modèle) :
 *  - géocodage via la Base Adresse Nationale (api-adresse.data.gouv.fr) ;
 *  - aléa retrait-gonflement des argiles via Géorisques (api/v1/rga) ;
 *  - arrêtés de catastrophe naturelle via Géorisques (api/v1/gaspar/catnat).
 *
 * Entièrement NON BLOQUANT : toute erreur réseau renvoie null et le rapport se
 * génère alors avec le contexte issu des connaissances du modèle.
 */

export interface LocationRisk {
  commune: string;
  context: string; // ex. "31, Haute-Garonne, Occitanie"
  codeInsee: string;
  rgaExposition: string | null; // ex. "Exposition forte"
  catnatTotal: number;
  secheresseCount: number;
  secheresseDernier: string | null; // année du plus récent arrêté sécheresse
}

const BAN = 'https://api-adresse.data.gouv.fr/search/';
const GEO = 'https://www.georisques.gouv.fr/api/v1';

async function getJson(url: string): Promise<unknown | null> {
  try {
    // Timeout dur : ces API publiques (BAN/Géorisques) ne doivent JAMAIS bloquer la
    // génération du rapport (budget 60 s/fonction sur Hobby). À défaut → null, et le
    // rapport se génère avec le contexte du modèle (comportement déjà non bloquant).
    const res = await fetch(url, { cache: 'no-store', signal: AbortSignal.timeout(6000) });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

/** "10/06/2000" → 20000610 (comparable) ; null si invalide. */
function ddmmyyyyKey(s: string): number | null {
  const m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(s || '');
  if (!m) return null;
  return Number(m[3] + m[2] + m[1]);
}

export async function fetchLocationRisk(
  address: string
): Promise<LocationRisk | null> {
  const q = address.trim();
  if (q.length < 4) return null;

  const ban = (await getJson(
    `${BAN}?q=${encodeURIComponent(q)}&limit=1`
  )) as
    | { features?: { geometry: { coordinates: [number, number] }; properties: Record<string, string> }[] }
    | null;
  const feat = ban?.features?.[0];
  if (!feat) return null;

  const [lon, lat] = feat.geometry.coordinates;
  const props = feat.properties;
  const codeInsee = props.citycode;
  if (!codeInsee) return null;

  // Aléa retrait-gonflement des argiles
  let rgaExposition: string | null = null;
  const rga = (await getJson(`${GEO}/rga?latlon=${lon},${lat}`)) as
    | { exposition?: string }
    | null;
  if (rga?.exposition) rgaExposition = rga.exposition;

  // Arrêtés catastrophe naturelle (commune)
  let catnatTotal = 0;
  let secheresseCount = 0;
  let secheresseDernier: string | null = null;
  const cat = (await getJson(
    `${GEO}/gaspar/catnat?code_insee=${codeInsee}&page=1&page_size=500`
  )) as
    | { results?: number; data?: { code_national_catnat?: string; libelle_risque_jo?: string; date_debut_evt?: string }[] }
    | null;
  if (cat?.data) {
    catnatTotal = cat.results ?? cat.data.length;
    const sech = cat.data.filter((x) =>
      (x.libelle_risque_jo || '').toLowerCase().includes('cheress')
    );
    // arrêtés sécheresse distincts (un même arrêté est dupliqué par période)
    secheresseCount = new Set(sech.map((x) => x.code_national_catnat)).size;
    let best = 0;
    for (const x of sech) {
      const k = ddmmyyyyKey(x.date_debut_evt || '');
      if (k && k > best) best = k;
    }
    if (best) secheresseDernier = String(best).slice(0, 4);
  }

  return {
    commune: props.city || '',
    context: props.context || '',
    codeInsee,
    rgaExposition,
    catnatTotal,
    secheresseCount,
    secheresseDernier,
  };
}

/** Résumé factuel à injecter dans le prompt (données officielles). */
export function formatLocationRisk(r: LocationRisk): string {
  const parts: string[] = [];
  parts.push(`Commune : ${r.commune} (${r.context}), code INSEE ${r.codeInsee}.`);
  if (r.rgaExposition) {
    parts.push(
      `Aléa retrait-gonflement des argiles à l'adresse : ${r.rgaExposition} (source Géorisques).`
    );
  }
  if (r.secheresseCount > 0) {
    parts.push(
      `La commune a fait l'objet de ${r.secheresseCount} arrêté(s) de catastrophe naturelle « sécheresse / réhydratation des sols »${
        r.secheresseDernier ? ` (le plus récent en ${r.secheresseDernier})` : ''
      }, sur ${r.catnatTotal} arrêté(s) cat-nat au total.`
    );
  } else if (r.catnatTotal > 0) {
    parts.push(
      `${r.catnatTotal} arrêté(s) de catastrophe naturelle recensé(s) pour la commune (aucun « sécheresse »).`
    );
  }
  parts.push('Source : Géorisques (georisques.gouv.fr) et Base Adresse Nationale — données officielles.');
  return parts.join(' ');
}
