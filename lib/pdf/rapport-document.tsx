import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  Document,
  Page,
  View,
  Text,
  Image,
  Font,
  StyleSheet,
} from '@react-pdf/renderer';
import { COMPANY, BRAND, euros } from '@/lib/crm/company';
import type { ReportContent } from '@/lib/ai/report';

/**
 * Rapport de diagnostic technique IPB — gabarit premium (charte devis/facture),
 * calibré sur le rapport de référence BRÉVARD-GELIN. Réalisé par le diagnostiqueur
 * mandaté (Bâti Halli / Toi mon Toit) ; coordonné et mis en forme par l'IPB.
 */

function resolveFont(name: string): string | null {
  const candidates: string[] = [];
  try {
    candidates.push(fileURLToPath(new URL(`./fonts/${name}`, import.meta.url)));
  } catch {
    /* import.meta.url indisponible */
  }
  candidates.push(path.join(process.cwd(), 'lib/pdf/fonts', name));
  candidates.push(path.join(process.cwd(), '.next/server/lib/pdf/fonts', name));
  for (const c of candidates) {
    try {
      if (fs.existsSync(c)) return c;
    } catch {
      /* ignore */
    }
  }
  return null;
}

let BRAND_FONTS = false;
try {
  const pf = resolveFont('PlayfairDisplay-700.ttf');
  const dm = resolveFont('DMSans-600.ttf');
  const dmb = resolveFont('DMSans-700.ttf');
  if (pf && dm && dmb) {
    Font.register({ family: 'Playfair', fonts: [{ src: pf, fontWeight: 700 }] });
    Font.register({
      family: 'DMSans',
      fonts: [
        { src: dm, fontWeight: 400 },
        { src: dmb, fontWeight: 700 },
      ],
    });
    BRAND_FONTS = true;
  }
} catch {
  BRAND_FONTS = false;
}
const TITLE = BRAND_FONTS ? 'Playfair' : 'Helvetica';
const BODY = BRAND_FONTS ? 'DMSans' : 'Helvetica';

export interface RapportDocPhoto {
  url: string;
  caption?: string | null;
  zoneRef?: string | null;
  gravite?: string | null;
}

export interface RapportDocDiagnosticien {
  nomCommercial: string;
  siret: string;
  rcAssureur?: string | null;
  rcPolice?: string | null;
}

export interface RapportDocData {
  number: string;
  title: string;
  type: string;
  bienAdresse?: string | null;
  ville?: string | null;
  createdAt: Date;
  status: string;
  contact: { name: string; email?: string | null; phone?: string | null };
  diagnosticien: RapportDocDiagnosticien;
  content: ReportContent;
  photos?: RapportDocPhoto[];
}

const fr = (d: Date) => new Date(d).toLocaleDateString('fr-FR', { dateStyle: 'long' });

const ORANGE = '#EA580C';
const ORANGE_DK = '#C2410C';
const CREAM = '#FFF7ED';
const NAVY = '#0B1826';

// Couleur d'un encadré selon la gravité / criticité.
const tone = (g: string): { bg: string; border: string; txt: string } => {
  const u = (g || '').toUpperCase();
  if (u.includes('CRITIQUE') || u.includes('TRAITER'))
    return { bg: '#FEF2F2', border: '#DC2626', txt: '#B91C1C' };
  if (u.includes('IMPORTANT') || u.includes('ÉLEV') || u.includes('ELEV'))
    return { bg: '#FFF7ED', border: ORANGE, txt: ORANGE_DK };
  if (u.includes('SURVEILL') || u.includes('MODÉR') || u.includes('MODER'))
    return { bg: '#FEFCE8', border: '#CA8A04', txt: '#A16207' };
  if (u.includes('BON') || u.includes('RASSUR') || u.includes('FAIBLE') || u.includes('MAÎTRIS'))
    return { bg: '#F0FDF4', border: '#16A34A', txt: '#15803D' };
  return { bg: '#F8FAFC', border: BRAND.slate200, txt: BRAND.slate600 };
};

const s = StyleSheet.create({
  page: {
    paddingTop: 36,
    paddingBottom: 58,
    paddingHorizontal: 40,
    fontSize: 9.5,
    fontFamily: BODY,
    color: BRAND.navy,
    lineHeight: 1.55,
  },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  logoRow: { flexDirection: 'row', alignItems: 'center', gap: 9 },
  logo: {
    width: 36, height: 36, borderRadius: 7, backgroundColor: ORANGE,
    color: '#fff', textAlign: 'center', fontSize: 13, fontFamily: 'Helvetica-Bold', paddingTop: 9,
  },
  brandName: { fontSize: 11.5, fontFamily: TITLE, fontWeight: 700, lineHeight: 1.1 },
  brandSub: { fontSize: 7.5, color: BRAND.slate400, marginTop: 2 },
  docTitle: { fontSize: 19, fontFamily: TITLE, fontWeight: 700, color: ORANGE, textAlign: 'right', lineHeight: 1, marginBottom: 12 },
  docMeta: { fontSize: 9, color: BRAND.slate600, textAlign: 'right' },
  docMetaSm: { fontSize: 8.5, color: BRAND.slate400, textAlign: 'right' },
  rule: { borderBottomWidth: 2, borderBottomColor: ORANGE, marginTop: 10, marginBottom: 12 },

  realise: { fontSize: 8, color: BRAND.slate600, lineHeight: 1.5, marginBottom: 12 },
  bold: { fontWeight: 700 },

  // tableau identification
  idTable: { borderWidth: 1, borderColor: BRAND.slate200, borderRadius: 6, overflow: 'hidden', marginBottom: 14 },
  idHead: { backgroundColor: NAVY, color: '#fff', paddingVertical: 5, paddingHorizontal: 10, fontSize: 9, fontWeight: 700, textAlign: 'center' },
  idRow: { flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#EEF2F7' },
  idLabel: { width: 140, backgroundColor: '#F1F5FB', paddingVertical: 5, paddingHorizontal: 10, fontWeight: 700, color: NAVY, fontSize: 8.5 },
  idValue: { flex: 1, paddingVertical: 5, paddingHorizontal: 10, fontSize: 8.5, color: '#111827' },

  // encadrés colorés
  callout: { borderLeftWidth: 3, borderRadius: 5, paddingVertical: 8, paddingHorizontal: 11, marginTop: 8, marginBottom: 4 },
  calloutTitle: { fontSize: 9, fontWeight: 700, letterSpacing: 0.4, marginBottom: 3 },

  h1: { fontSize: 13, fontFamily: TITLE, fontWeight: 700, color: NAVY, marginTop: 16, marginBottom: 6 },
  h2: { fontSize: 10.5, fontWeight: 700, color: NAVY, marginTop: 10, marginBottom: 4 },
  sectionLabel: { fontSize: 8, letterSpacing: 1, color: BRAND.slate400, fontWeight: 700, marginBottom: 5, marginTop: 6 },
  p: { marginBottom: 5, color: '#1F2937' },
  muted: { color: BRAND.slate600 },

  bullet: { flexDirection: 'row', marginBottom: 2 },
  bulletMark: { width: 3, height: 3, borderRadius: 1.5, backgroundColor: ORANGE, marginTop: 4, marginRight: 6 },
  refTag: { fontSize: 7.5, color: ORANGE_DK },

  // tableaux génériques
  tHead: { flexDirection: 'row', backgroundColor: NAVY, color: '#fff', paddingVertical: 5, paddingHorizontal: 8, fontSize: 8, fontWeight: 700 },
  tRow: { flexDirection: 'row', paddingVertical: 6, paddingHorizontal: 8, borderWidth: 1, borderTopWidth: 0, borderColor: BRAND.slate200 },
  tRowAlt: { backgroundColor: '#FCFCFD' },

  // estimation
  cDesig: { flex: 1, paddingRight: 6 },
  cAmt: { width: 66, textAlign: 'right' },
  cTva: { width: 42, textAlign: 'right' },
  totBox: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 6, paddingVertical: 8, paddingHorizontal: 12, backgroundColor: CREAM, borderRadius: 5 },
  totTxt: { fontWeight: 700, color: ORANGE_DK, fontSize: 11 },

  // photos
  photoGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 6 },
  photoCard: { width: '48%', borderWidth: 1, borderColor: BRAND.slate200, borderRadius: 6, overflow: 'hidden' },
  photoImg: { width: '100%', height: 130, objectFit: 'cover' },
  photoCap: { fontSize: 7.5, color: BRAND.slate600, padding: 5 },

  sig: { marginTop: 18, paddingTop: 8, borderTopWidth: 1, borderTopColor: BRAND.slate200 },
  footer: {
    position: 'absolute', bottom: 22, left: 40, right: 40,
    borderTopWidth: 1, borderTopColor: BRAND.slate200, paddingTop: 6,
    fontSize: 7, color: BRAND.slate400, textAlign: 'center', lineHeight: 1.5,
  },
});

function Callout({ title, body, gravite }: { title: string; body: string; gravite: string }) {
  const t = tone(gravite);
  return (
    <View style={[s.callout, { backgroundColor: t.bg, borderLeftColor: t.border }]} wrap={false}>
      <Text style={[s.calloutTitle, { color: t.txt }]}>{title}</Text>
      <Text style={{ color: '#374151' }}>{body}</Text>
    </View>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <View>
      {items.filter(Boolean).map((t, i) => (
        <View key={i} style={s.bullet}>
          <View style={s.bulletMark} />
          <Text style={{ flex: 1, color: '#374151' }}>{t}</Text>
        </View>
      ))}
    </View>
  );
}

function IdRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={s.idRow}>
      <Text style={s.idLabel}>{label}</Text>
      <Text style={s.idValue}>{value}</Text>
    </View>
  );
}

export function RapportDocument({ data }: { data: RapportDocData }) {
  const c = data.content;
  const d = data.diagnosticien;
  const photos = (data.photos ?? []).filter((p) => p.url);
  const bien = [data.bienAdresse, data.ville].filter(Boolean).join(' — ') || '—';
  const rcLine =
    d.rcAssureur && d.rcPolice ? `RC pro ${d.rcAssureur} n° ${d.rcPolice}` : 'RC professionnelle';

  return (
    <Document title={data.number} author={COMPANY.shortName}>
      <Page size="A4" style={s.page}>
        {/* En-tête */}
        <View style={s.header} fixed>
          <View style={s.logoRow}>
            <Text style={s.logo}>IPB</Text>
            <View>
              <Text style={s.brandName}>Institut de Pathologie du Bâtiment</Text>
              <Text style={s.brandSub}>Coordination & mise en forme du rapport</Text>
            </View>
          </View>
          <View>
            <Text style={s.docTitle}>Rapport de diagnostic</Text>
            <Text style={s.docMeta}>N° {data.number}</Text>
            <Text style={s.docMetaSm}>Établi le {fr(data.createdAt)}</Text>
          </View>
        </View>
        <View style={s.rule} fixed />

        <Text style={s.realise}>
          <Text style={s.bold}>Diagnostic réalisé par {d.nomCommercial}</Text>, diagnostiqueur
          technique indépendant mandaté (SIRET {d.siret} · {rcLine}), qui en assume la
          responsabilité. Mission coordonnée et rapport mis en forme par l&apos;IPB —
          Institut de Pathologie du Bâtiment.
        </Text>

        {/* Identification du dossier */}
        <View style={s.idTable} wrap={false}>
          <Text style={s.idHead}>IDENTIFICATION DU DOSSIER</Text>
          <IdRow label="Référence" value={data.number} />
          <IdRow label="Client" value={data.contact.name} />
          <IdRow label="Bien expertisé" value={bien} />
          <IdRow label="Objet" value={data.title} />
          <IdRow label="Date du rapport" value={fr(data.createdAt)} />
          <IdRow label="Diagnostiqueur" value={`${d.nomCommercial} — mandaté par l'IPB`} />
          <IdRow label="Statut" value={data.status === 'ENVOYE' ? 'Rapport définitif' : 'Rapport — projet'} />
        </View>

        {/* Conclusion générale */}
        <Callout
          title={`CONCLUSION GÉNÉRALE — ${c.graviteGlobale}`}
          body={c.conclusionGenerale}
          gravite={c.graviteGlobale}
        />

        {/* 1 — Contexte de la mission */}
        <Text style={s.h1}>1 · Contexte et présentation de la mission</Text>
        <Text style={s.sectionLabel}>OBJET DE LA MISSION</Text>
        <Text style={s.p}>{c.objetMission}</Text>
        <Text style={s.sectionLabel}>DESCRIPTION DU BIEN</Text>
        <Text style={s.p}>{c.descriptionBien}</Text>
        <Text style={s.sectionLabel}>CONTEXTE DE LOCALISATION</Text>
        <Text style={s.p}>{c.contexteLocalisation}</Text>

        {/* Limites & périmètre */}
        <Callout title="LIMITES & PÉRIMÈTRE DU RAPPORT — RÉSERVES D'USAGE" body={c.limites} gravite="surveiller" />

        {/* 2 — Analyse par zone */}
        <Text style={s.h1}>2 · Analyse technique des désordres</Text>
        {c.zones.map((z, i) => (
          <View key={i} wrap={false} style={{ marginBottom: 6 }}>
            <Text style={s.h2}>2.{i + 1} — {z.titre}</Text>
            <Text style={s.sectionLabel}>DESCRIPTION DU DÉSORDRE</Text>
            <Text style={s.p}>{z.description}</Text>
            {z.analyseCausale.length > 0 && (
              <>
                <Text style={s.sectionLabel}>ANALYSE CAUSALE — MÉCANISMES POSSIBLES</Text>
                <Bullets items={z.analyseCausale} />
              </>
            )}
            <Text style={[s.muted, { fontSize: 8.5, marginTop: 3 }]}>
              Mesure : {z.mesure || '—'}
              {z.refsTechniques.length ? `   ·   Réf. : ${z.refsTechniques.join(' ; ')}` : ''}
            </Text>
            <Text style={[s.sectionLabel, { marginTop: 5 }]}>PRÉCONISATION</Text>
            <Text style={s.p}>{z.preconisation}</Text>
            {z.encadre ? <Callout title={`${z.gravite}`} body={z.encadre} gravite={z.gravite} /> : null}
          </View>
        ))}

        {/* 3 — Synthèse des désordres */}
        <Text style={s.h1} break>3 · Tableau de synthèse des désordres</Text>
        <View wrap={false}>
          <View style={s.tHead}>
            <Text style={{ width: 110 }}>ZONE</Text>
            <Text style={{ flex: 1 }}>NATURE DU DÉSORDRE</Text>
            <Text style={{ width: 70 }}>GRAVITÉ</Text>
            <Text style={{ width: 120 }}>ACTION PRÉCONISÉE</Text>
          </View>
          {c.syntheseDesordres.map((r, i) => (
            <View key={i} style={[s.tRow, i % 2 ? s.tRowAlt : {}]} wrap={false}>
              <Text style={{ width: 110, fontWeight: 700 }}>{r.zone}</Text>
              <Text style={{ flex: 1 }}>{r.nature}</Text>
              <Text style={{ width: 70, color: tone(r.gravite).txt, fontWeight: 700 }}>{r.gravite}</Text>
              <Text style={{ width: 120 }}>{r.action}</Text>
            </View>
          ))}
        </View>

        {/* 4 — Matrice de criticité */}
        {c.matriceCriticite.length > 0 && (
          <>
            <Text style={s.h1}>4 · Matrice de criticité</Text>
            <View wrap={false}>
              <View style={s.tHead}>
                <Text style={{ flex: 1 }}>DÉSORDRE</Text>
                <Text style={{ width: 90, textAlign: 'center' }}>PROBABILITÉ</Text>
                <Text style={{ width: 90, textAlign: 'center' }}>GRAVITÉ</Text>
                <Text style={{ width: 90, textAlign: 'center' }}>CRITICITÉ</Text>
              </View>
              {c.matriceCriticite.map((m, i) => (
                <View key={i} style={[s.tRow, i % 2 ? s.tRowAlt : {}]} wrap={false}>
                  <Text style={{ flex: 1 }}>{m.desordre}</Text>
                  <Text style={{ width: 90, textAlign: 'center' }}>{m.probabilite}</Text>
                  <Text style={{ width: 90, textAlign: 'center' }}>{m.gravite}</Text>
                  <Text
                    style={{
                      width: 90, textAlign: 'center', fontWeight: 700,
                      color: tone(m.criticite).txt,
                    }}
                  >
                    {m.criticite}
                  </Text>
                </View>
              ))}
            </View>
          </>
        )}

        {/* 5 — Avis projet */}
        {c.avisProjet.map((a, i) => (
          <View key={i}>
            <Text style={s.h1}>5 · {a.titre}</Text>
            <Text style={s.sectionLabel}>DESCRIPTION DU PROJET</Text>
            <Text style={s.p}>{a.description}</Text>
            <Text style={s.sectionLabel}>AVIS TECHNIQUE</Text>
            <Text style={s.p}>{a.avis}</Text>
          </View>
        ))}

        {/* 6 — Estimation */}
        <Text style={s.h1} break>6 · Estimation budgétaire des travaux</Text>
        <View wrap={false}>
          <View style={s.tHead}>
            <Text style={s.cDesig}>DÉSIGNATION</Text>
            <Text style={{ width: 50, textAlign: 'center' }}>UNITÉ</Text>
            <Text style={s.cAmt}>MONTANT HT</Text>
            <Text style={s.cTva}>TVA</Text>
          </View>
          {c.estimationTravaux.map((e, i) => (
            <View key={i} style={[s.tRow, i % 2 ? s.tRowAlt : {}]} wrap={false}>
              <Text style={s.cDesig}>{e.designation}</Text>
              <Text style={{ width: 50, textAlign: 'center' }}>{e.unite}</Text>
              <Text style={[s.cAmt, { fontWeight: 700 }]}>{euros(e.montantHT)}</Text>
              <Text style={s.cTva}>{e.tva} %</Text>
            </View>
          ))}
          <View style={s.totBox}>
            <Text style={s.totTxt}>TOTAL ESTIMÉ HT</Text>
            <Text style={[s.totTxt, { fontSize: 13 }]}>{euros(c.budgetHT)}</Text>
          </View>
          <Text style={[s.muted, { fontSize: 7.5, marginTop: 4 }]}>
            Estimation indicative et non contractuelle. TVA 10 % pour les travaux sur
            logement de plus de 2 ans (art. 279-0 bis CGI) ; 20 % pour les prestations
            intellectuelles (BET). Montants susceptibles de varier selon l&apos;état réel
            constaté et les conclusions des investigations complémentaires.
          </Text>
        </View>

        {/* 7 — Orientations */}
        {c.orientations.length > 0 && (
          <>
            <Text style={s.h1}>7 · Orientations & suites à donner</Text>
            {c.orientations.map((o, i) => (
              <View key={i} wrap={false} style={{ marginBottom: 4 }}>
                <Text style={[s.bold, { color: ORANGE_DK }]}>{o.titre}</Text>
                <Text style={s.p}>{o.detail}</Text>
              </View>
            ))}
          </>
        )}

        {/* Photos */}
        {photos.length > 0 && (
          <>
            <Text style={s.h1} break>Annexe photographique</Text>
            <View style={s.photoGrid}>
              {photos.map((p, i) => (
                <View key={i} style={s.photoCard} wrap={false}>
                  {/* eslint-disable-next-line jsx-a11y/alt-text */}
                  <Image src={p.url} style={s.photoImg} />
                  <Text style={s.photoCap}>
                    Photo {i + 1}
                    {p.zoneRef ? ` · ${p.zoneRef}` : ''}
                    {p.caption ? ` — ${p.caption}` : ''}
                  </Text>
                </View>
              ))}
            </View>
          </>
        )}

        {/* 8 — Conclusion */}
        <Text style={s.h1} break>8 · Conclusion</Text>
        <Text style={s.p}>{c.conclusion}</Text>
        {c.conclusionFinale.length > 0 && (
          <Callout
            title="RECOMMANDATIONS FINALES"
            body={c.conclusionFinale.map((r, i) => `${i + 1}. ${r}`).join('\n')}
            gravite="important"
          />
        )}

        <View style={s.sig} wrap={false}>
          <Text style={s.bold}>Pour {d.nomCommercial} — diagnostiqueur technique indépendant</Text>
          <Text style={s.muted}>Rapport coordonné et mis en forme par l&apos;IPB — {COMPANY.city}, le {fr(data.createdAt)}.</Text>
        </View>

        <Text style={s.footer} fixed>
          {d.nomCommercial} (SIRET {d.siret}) — diagnostiqueur mandaté · Coordination IPB,
          {COMPANY.postalCode} {COMPANY.city} · {COMPANY.phone}{'\n'}
          Diagnostic visuel non destructif — ne se substitue ni à une étude de structure (BET),
          ni à une expertise judiciaire ou d&apos;assurance.
        </Text>
      </Page>
    </Document>
  );
}
