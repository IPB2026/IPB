import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  Document,
  Page,
  View,
  Text,
  Font,
  StyleSheet,
} from '@react-pdf/renderer';
import { COMPANY, BRAND, euros } from '@/lib/crm/company';
import type { ServiceType } from '@prisma/client';

/**
 * Devis IPB — document premium (maquette devis_ipb_premium_v4 validée).
 * Charte : Playfair Display (titres) + DM Sans (corps), avec repli Helvetica
 * si les polices ne se chargent pas (build serverless). Le diagnostiqueur réalise
 * le diagnostic et produit le rapport ; l'IPB coordonne et met en forme.
 */

// Polices de marque chargées UNIQUEMENT si le .ttf existe réellement à
// l'exécution (sinon react-pdf jette ENOENT au rendu sur Vercel). On résout
// plusieurs emplacements candidats ; à défaut, repli propre sur Helvetica.
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

export interface DevisDocDiagnosticien {
  nomCommercial: string;
  siret: string;
  rcAssureur?: string | null;
  rcPolice?: string | null;
}

export interface DevisDocData {
  number: string;
  objet: string;
  serviceType?: ServiceType | null;
  bienConcerne?: string | null;
  createdAt: Date;
  validUntil?: Date | null;
  contact: {
    name: string;
    email?: string | null;
    phone?: string | null;
    address?: string | null;
    postalCode?: string | null;
    city?: string | null;
  };
  intervention: string[];
  livrable: string[];
  diagnosticien: DevisDocDiagnosticien;
  prix: number;
}

const fr = (d?: Date | null) =>
  d ? new Date(d).toLocaleDateString('fr-FR', { dateStyle: 'long' }) : '—';

const ORANGE = '#EA580C';
const ORANGE_DK = '#C2410C';
const CREAM = '#FFF7ED';

const s = StyleSheet.create({
  page: {
    paddingTop: 26,
    paddingBottom: 40,
    paddingHorizontal: 38,
    fontSize: 8,
    fontFamily: BODY,
    color: BRAND.navy,
    lineHeight: 1.38,
  },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  logoRow: { flexDirection: 'row', alignItems: 'center', gap: 9 },
  logo: {
    width: 36, height: 36, borderRadius: 7, backgroundColor: ORANGE,
    color: '#fff', textAlign: 'center', fontSize: 13, fontFamily: 'Helvetica-Bold',
    paddingTop: 9,
  },
  brandName: { fontSize: 12, fontFamily: TITLE, fontWeight: 700, lineHeight: 1.1 },
  brandSub: { fontSize: 7.5, color: BRAND.slate400, marginTop: 2 },
  docTitle: { fontSize: 23, fontFamily: TITLE, fontWeight: 700, color: ORANGE, textAlign: 'right' },
  docMeta: { fontSize: 9, color: BRAND.slate600, textAlign: 'right', marginTop: 4 },
  docMetaSm: { fontSize: 8.5, color: BRAND.slate400, textAlign: 'right' },
  rule: { borderBottomWidth: 2, borderBottomColor: ORANGE, marginTop: 10, marginBottom: 14 },

  row: { flexDirection: 'row', gap: 12 },
  box: { flex: 1, borderWidth: 1, borderColor: BRAND.slate200, borderRadius: 6, padding: 7 },
  boxFill: { backgroundColor: '#F8FAFC' },
  boxLabel: { fontSize: 7.5, letterSpacing: 1.1, color: BRAND.slate400, fontFamily: BODY, fontWeight: 700, marginBottom: 4 },
  b: { fontWeight: 700 },
  muted: { color: BRAND.slate600 },
  faint: { color: BRAND.slate400 },

  objet: { marginTop: 10, paddingVertical: 7, paddingHorizontal: 11, backgroundColor: CREAM, borderLeftWidth: 3, borderLeftColor: ORANGE },
  objetLabel: { fontSize: 8, letterSpacing: 1, color: ORANGE_DK, fontWeight: 700 },

  sectionLabel: { fontSize: 8, letterSpacing: 1, color: BRAND.slate400, fontWeight: 700, marginBottom: 6 },
  sectionLabelOr: { fontSize: 8, letterSpacing: 1, color: ORANGE_DK, fontWeight: 700, marginBottom: 6 },
  bullet: { flexDirection: 'row', marginBottom: 2, color: '#334155' },
  bulletMark: { width: 3, height: 3, borderRadius: 1.5, backgroundColor: ORANGE, marginTop: 4, marginRight: 6 },

  tHead: { flexDirection: 'row', backgroundColor: BRAND.navy, color: '#fff', paddingVertical: 5, paddingHorizontal: 9, fontSize: 8, fontWeight: 700, marginTop: 4 },
  tRow: { flexDirection: 'row', paddingVertical: 8, paddingHorizontal: 9, borderWidth: 1, borderTopWidth: 0, borderColor: BRAND.slate200 },
  cName: { flex: 1, paddingRight: 8 },
  cAmt: { width: 78, textAlign: 'right' },
  lineTitle: { fontWeight: 700 },
  lineSub: { fontSize: 8.5, color: BRAND.slate400, marginTop: 1 },

  totals: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 7 },
  totBox: { width: 240 },
  totLine: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 2 },
  netBox: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5, paddingVertical: 8, paddingHorizontal: 12, backgroundColor: CREAM, borderRadius: 5 },
  netTxt: { fontWeight: 700, color: ORANGE_DK, fontSize: 12 },

  sigRow: { flexDirection: 'row', gap: 12, marginTop: 12 },
  sigBox: { flex: 1, borderWidth: 1, borderColor: BRAND.slate200, borderRadius: 6, padding: 9, minHeight: 42 },

  footer: {
    position: 'absolute', bottom: 22, left: 40, right: 40,
    borderTopWidth: 1, borderTopColor: BRAND.slate200, paddingTop: 6,
    fontSize: 7, color: BRAND.slate400, textAlign: 'center', lineHeight: 1.5,
  },
});

function Bullets({ items }: { items: string[] }) {
  return (
    <View>
      {items.map((t, i) => (
        <View key={i} style={s.bullet}>
          <View style={s.bulletMark} />
          <Text style={{ flex: 1 }}>{t}</Text>
        </View>
      ))}
    </View>
  );
}

export function DevisDocument({ data }: { data: DevisDocData }) {
  const clientLoc = [data.contact.postalCode, data.contact.city].filter(Boolean).join(' ');
  const d = data.diagnosticien;
  const diagLine =
    `Réalisé par le diagnostiqueur indépendant mandaté — ${d.nomCommercial}, SIRET ${d.siret}` +
    (d.rcAssureur && d.rcPolice
      ? ` · assuré en RC professionnelle ${d.rcAssureur} n° ${d.rcPolice}, sous sa responsabilité`
      : ', sous sa responsabilité');

  return (
    <Document title={data.number} author={COMPANY.shortName}>
      <Page size="A4" style={s.page}>
        {/* En-tête */}
        <View style={s.header}>
          <View style={s.logoRow}>
            <Text style={s.logo}>IPB</Text>
            <View>
              <Text style={s.brandName}>Institut de Pathologie du Bâtiment</Text>
              <Text style={s.brandSub}>Expertise fissures · humidité · structure — Occitanie</Text>
            </View>
          </View>
          <View>
            <Text style={s.docTitle}>Devis</Text>
            <Text style={s.docMeta}>N° {data.number}</Text>
            <Text style={s.docMetaSm}>Établi le {fr(data.createdAt)}</Text>
            <Text style={s.docMetaSm}>Valable jusqu&apos;au {fr(data.validUntil)}</Text>
          </View>
        </View>
        <View style={s.rule} />

        {/* Émetteur / Client */}
        <View wrap={false} style={s.row}>
          <View style={s.box}>
            <Text style={s.boxLabel}>ÉMETTEUR</Text>
            <Text style={s.b}>IPB — Institut de Pathologie du Bâtiment</Text>
            <Text style={s.muted}>{COMPANY.postalCode} {COMPANY.city}</Text>
            <Text style={s.muted}>{COMPANY.phone} · {COMPANY.email}</Text>
            <Text style={[s.faint, { marginTop: 2 }]}>SIRET {COMPANY.siret} · TVA art. 293 B</Text>
          </View>
          <View style={[s.box, s.boxFill]}>
            <Text style={s.boxLabel}>CLIENT</Text>
            <Text style={s.b}>{data.contact.name}</Text>
            {data.contact.address ? <Text style={s.muted}>{data.contact.address}</Text> : null}
            {clientLoc ? <Text style={s.muted}>{clientLoc}</Text> : null}
            {data.contact.phone ? <Text style={s.muted}>{data.contact.phone}</Text> : null}
            {data.contact.email ? <Text style={s.muted}>{data.contact.email}</Text> : null}
          </View>
        </View>

        {/* Objet */}
        <View style={s.objet}>
          <Text style={s.objetLabel}>OBJET DE LA MISSION</Text>
          <Text style={{ fontWeight: 700, marginTop: 2 }}>
            {data.objet}
            {data.bienConcerne ? ` — ${data.bienConcerne}` : ''}
          </Text>
        </View>

        {/* Intervention / Livrable */}
        <View wrap={false} style={[s.row, { marginTop: 7 }]}>
          <View style={{ flex: 1 }}>
            <Text style={s.sectionLabel}>L&apos;INTERVENTION COMPREND</Text>
            <Bullets items={data.intervention} />
          </View>
          <View style={{ flex: 1, borderLeftWidth: 1, borderLeftColor: BRAND.slate200, paddingLeft: 12 }}>
            <Text style={s.sectionLabelOr}>LIVRABLE REMIS</Text>
            <Bullets items={data.livrable} />
          </View>
        </View>

        {/* Prestation */}
        <View wrap={false} style={{ marginTop: 7 }}>
          <View style={s.tHead}>
            <Text style={s.cName}>PRESTATION</Text>
            <Text style={s.cAmt}>MONTANT HT</Text>
          </View>
          <View style={s.tRow} wrap={false}>
            <View style={s.cName}>
              <Text style={s.lineTitle}>Diagnostic sur site, analyse et production du rapport</Text>
              <Text style={s.lineSub}>{diagLine}</Text>
            </View>
            <Text style={[s.cAmt, { fontWeight: 700, color: BRAND.slate600 }]}>—</Text>
          </View>
          <View style={[s.tRow, { backgroundColor: '#FCFCFD' }]} wrap={false}>
            <View style={s.cName}>
              <Text style={s.lineTitle}>Coordination de la mission et mise en forme du rapport</Text>
              <Text style={s.lineSub}>Planification, suivi du dossier et production éditoriale du rapport remis au client — IPB</Text>
            </View>
            <Text style={[s.cAmt, { fontWeight: 700 }]}>{euros(data.prix)}</Text>
          </View>

          <View style={s.totals}>
            <View style={s.totBox}>
              <View style={s.totLine}>
                <Text style={s.muted}>Total HT</Text>
                <Text style={s.b}>{euros(data.prix)}</Text>
              </View>
              <View style={s.totLine}>
                <Text style={[s.muted, { fontSize: 9 }]}>TVA non applicable — art. 293 B du CGI</Text>
                <Text>—</Text>
              </View>
              <View style={s.netBox}>
                <Text style={s.netTxt}>NET À PAYER</Text>
                <Text style={[s.netTxt, { fontSize: 14 }]}>{euros(data.prix)}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Approche / Périmètre */}
        <View wrap={false} style={[s.row, { marginTop: 7 }]}>
          <View style={s.box}>
            <Text style={s.sectionLabelOr}>L&apos;APPROCHE IPB</Text>
            <Text style={s.muted}>
              Le diagnostic, son analyse et ses conclusions sont produits par le diagnostiqueur indépendant mandaté, qui engage sa responsabilité civile professionnelle. L&apos;IPB assure la coordination de la mission et la mise en forme du rapport.
            </Text>
          </View>
          <View style={s.box}>
            <Text style={s.sectionLabel}>PÉRIMÈTRE DU RAPPORT</Text>
            <Text style={s.muted}>
              Avis d&apos;expertise (conseil / étude) sur les désordres observés. Il ne constitue ni une étude structurelle de bureau d&apos;études (BET), ni un rapport d&apos;expertise judiciaire, ni un rapport d&apos;expertise d&apos;assurance.
            </Text>
          </View>
        </View>

        {/* Conditions + signatures */}
        <View wrap={false} style={{ marginTop: 7 }}>
          <Text style={s.sectionLabel}>CONDITIONS DE RÈGLEMENT</Text>
          <View style={s.bullet}><View style={s.bulletMark} /><Text style={{ flex: 1 }}>Visite programmée sous 72 h après accord (24 h en cas d&apos;urgence).</Text></View>
          <View style={s.bullet}><View style={s.bulletMark} /><Text style={{ flex: 1 }}>Règlement par virement à l&apos;issue de la visite sur site ; rapport remis sous 3 à 5 jours ouvrés après réception du paiement.</Text></View>
          <View style={s.bullet}><View style={s.bulletMark} /><Text style={{ flex: 1 }}>Devis valable 30 jours. La signature emporte acceptation des CGV ({COMPANY.cgvUrl}).</Text></View>

          <View style={s.sigRow}>
            <View style={s.sigBox}>
              <Text style={{ fontWeight: 700, fontSize: 10 }}>Bon pour accord</Text>
              <Text style={[s.faint, { fontSize: 9 }]}>Date, signature et mention « Bon pour accord »</Text>
            </View>
            <View style={s.sigBox}>
              <Text style={{ fontWeight: 700, fontSize: 10 }}>Pour l&apos;IPB</Text>
              <Text style={[s.faint, { fontSize: 9 }]}>Le responsable de coordination</Text>
            </View>
          </View>
        </View>

        <Text style={s.footer} fixed>
          {COMPANY.name} · {COMPANY.postalCode} {COMPANY.city} · SIRET {COMPANY.siret} · TVA non applicable art. 293 B du CGI{'\n'}
          Diagnostic produit par un diagnostiqueur indépendant mandaté, assuré en RC professionnelle · Travaux éventuels exécutés par les équipes de réalisation du réseau IPB sous garantie décennale
        </Text>
      </Page>
    </Document>
  );
}
