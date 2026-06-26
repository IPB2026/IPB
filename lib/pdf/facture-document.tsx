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

/**
 * Facture IPB — document premium, aligné sur le devis (maquette validée).
 * Charte : Playfair Display (titres) + DM Sans (corps), repli Helvetica si les
 * polices ne se chargent pas (build serverless).
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

export interface FactureDocData {
  number: string;
  object: string;
  mandataire?: string | null;
  paymentMode: string;
  issuedAt: Date;
  dueDate?: Date | null;
  acompte?: number | null;
  createdAt: Date;
  contact: {
    name: string;
    email?: string | null;
    phone?: string | null;
    address?: string | null;
    postalCode?: string | null;
    city?: string | null;
  };
  lines: {
    designation: string;
    detail?: string | null;
    unit: string;
    qty: number;
    unitPrice: number;
    total: number;
  }[];
  totalHT: number;
}

const fr = (d?: Date | null) =>
  d ? new Date(d).toLocaleDateString('fr-FR', { dateStyle: 'long' }) : '—';

// Montant : un 0 s'affiche en « — » (ex. ligne « diagnostic sur site » portée
// ailleurs), comme sur le devis.
const amt = (n: number) => (n === 0 ? '—' : euros(n));

const ORANGE = '#EA580C';
const ORANGE_DK = '#C2410C';
const CREAM = '#FFF7ED';

const s = StyleSheet.create({
  page: {
    paddingTop: 34,
    paddingBottom: 58,
    paddingHorizontal: 40,
    fontSize: 9.5,
    fontFamily: BODY,
    color: BRAND.navy,
    lineHeight: 1.5,
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
  docTitle: { fontSize: 23, fontFamily: TITLE, fontWeight: 700, color: ORANGE, textAlign: 'right', lineHeight: 1, marginBottom: 14 },
  docMeta: { fontSize: 9, color: BRAND.slate600, textAlign: 'right', marginTop: 0 },
  docMetaSm: { fontSize: 8.5, color: BRAND.slate400, textAlign: 'right' },
  rule: { borderBottomWidth: 2, borderBottomColor: ORANGE, marginTop: 10, marginBottom: 14 },

  row: { flexDirection: 'row', gap: 12 },
  box: { flex: 1, borderWidth: 1, borderColor: BRAND.slate200, borderRadius: 6, padding: 9 },
  boxFill: { backgroundColor: '#F8FAFC' },
  boxLabel: { fontSize: 7.5, letterSpacing: 1.1, color: BRAND.slate400, fontFamily: BODY, fontWeight: 700, marginBottom: 4 },
  b: { fontWeight: 700 },
  muted: { color: BRAND.slate600 },
  faint: { color: BRAND.slate400 },

  objet: { marginTop: 14, paddingVertical: 8, paddingHorizontal: 11, backgroundColor: CREAM, borderLeftWidth: 3, borderLeftColor: ORANGE },
  objetLabel: { fontSize: 8, letterSpacing: 1, color: ORANGE_DK, fontWeight: 700 },

  sectionLabel: { fontSize: 8, letterSpacing: 1, color: BRAND.slate400, fontWeight: 700, marginBottom: 6 },

  tHead: { flexDirection: 'row', backgroundColor: BRAND.navy, color: '#fff', paddingVertical: 5, paddingHorizontal: 9, fontSize: 8, fontWeight: 700, marginTop: 4 },
  tRow: { flexDirection: 'row', paddingVertical: 8, paddingHorizontal: 9, borderWidth: 1, borderTopWidth: 0, borderColor: BRAND.slate200 },
  cDesig: { flex: 1, paddingRight: 8 },
  cUnit: { width: 52, textAlign: 'center' },
  cQty: { width: 32, textAlign: 'center' },
  cPu: { width: 66, textAlign: 'right' },
  cTot: { width: 72, textAlign: 'right' },
  lineTitle: { fontWeight: 700 },
  lineSub: { fontSize: 8.5, color: BRAND.slate400, marginTop: 1 },

  totals: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 14 },
  totBox: { width: 250 },
  totLine: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 2 },
  netBox: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5, paddingVertical: 8, paddingHorizontal: 12, backgroundColor: CREAM, borderRadius: 5 },
  netTxt: { fontWeight: 700, color: ORANGE_DK, fontSize: 12 },

  bank: { flexDirection: 'row', flexWrap: 'wrap', borderWidth: 1, borderColor: BRAND.slate200, borderRadius: 6, padding: 9, marginTop: 6 },
  bankItem: { width: '50%', marginBottom: 3 },
  bankLabel: { fontSize: 7.5, color: BRAND.slate400 },

  small: { fontSize: 8, color: BRAND.slate600, marginBottom: 2 },

  footer: {
    position: 'absolute', bottom: 22, left: 40, right: 40,
    borderTopWidth: 1, borderTopColor: BRAND.slate200, paddingTop: 6,
    fontSize: 7, color: BRAND.slate400, textAlign: 'center', lineHeight: 1.5,
  },
});

export function FactureDocument({ data }: { data: FactureDocData }) {
  const clientLoc = [data.contact.postalCode, data.contact.city].filter(Boolean).join(' ');
  const net = data.totalHT - (data.acompte ?? 0);
  // Facture de diagnostic (structure « diagnostic à 0 + coordination au prix »)
  // → on reprend les encadrés « approche / périmètre » du devis. Une facture
  // forfait/travaux (ligne unique) ne les affiche pas.
  const isDiagnostic = data.lines.some(
    (l) => Number(l.unitPrice) === 0 && /diagnostic/i.test(l.designation)
  );

  return (
    <Document title={data.number} author={COMPANY.shortName}>
      <Page size="A4" style={s.page}>
        {/* En-tête */}
        <View style={s.header} fixed>
          <View style={s.logoRow}>
            <Text style={s.logo}>IPB</Text>
            <View>
              <Text style={s.brandName}>Institut de Pathologie du Bâtiment</Text>
              <Text style={s.brandSub}>Expertise fissures · humidité · structure — Occitanie</Text>
            </View>
          </View>
          <View>
            <Text style={s.docTitle}>Facture</Text>
            <Text style={s.docMeta}>N° {data.number}</Text>
            <Text style={s.docMetaSm}>Émise le {fr(data.issuedAt)}</Text>
            <Text style={s.docMetaSm}>Échéance : {fr(data.dueDate)}</Text>
          </View>
        </View>
        <View style={s.rule} fixed />

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
            {data.mandataire ? <Text style={s.muted}>Représenté par : {data.mandataire}</Text> : null}
            {data.contact.phone ? <Text style={s.muted}>{data.contact.phone}</Text> : null}
            {data.contact.email ? <Text style={s.muted}>{data.contact.email}</Text> : null}
          </View>
        </View>

        {/* Objet */}
        <View style={s.objet}>
          <Text style={s.objetLabel}>OBJET DE LA FACTURE</Text>
          <Text style={{ fontWeight: 700, marginTop: 2 }}>{data.object}</Text>
          <Text style={[s.faint, { marginTop: 1 }]}>
            Mode de règlement : {data.paymentMode}
          </Text>
        </View>

        {/* Détail des prestations */}
        <View wrap={false} style={{ marginTop: 14 }}>
          <View style={s.tHead}>
            <Text style={s.cDesig}>DÉSIGNATION</Text>
            <Text style={s.cUnit}>UNITÉ</Text>
            <Text style={s.cQty}>QTÉ</Text>
            <Text style={s.cPu}>P.U. HT</Text>
            <Text style={s.cTot}>TOTAL HT</Text>
          </View>
          {data.lines.map((l, i) => (
            <View
              style={[s.tRow, i % 2 === 1 ? { backgroundColor: '#FCFCFD' } : {}]}
              key={i}
              wrap={false}
            >
              <View style={s.cDesig}>
                <Text style={s.lineTitle}>{l.designation}</Text>
                {l.detail ? <Text style={s.lineSub}>{l.detail}</Text> : null}
              </View>
              <Text style={s.cUnit}>{l.unit}</Text>
              <Text style={s.cQty}>{l.qty}</Text>
              <Text style={s.cPu}>{amt(l.unitPrice)}</Text>
              <Text style={[s.cTot, { fontWeight: 700 }]}>{amt(l.total)}</Text>
            </View>
          ))}

          <View style={s.totals}>
            <View style={s.totBox}>
              <View style={s.totLine}>
                <Text style={s.muted}>Total HT</Text>
                <Text style={s.b}>{euros(data.totalHT)}</Text>
              </View>
              <View style={s.totLine}>
                <Text style={[s.muted, { fontSize: 9 }]}>{COMPANY.tvaMention}</Text>
                <Text>—</Text>
              </View>
              {data.acompte ? (
                <View style={s.totLine}>
                  <Text style={s.muted}>Déjà encaissé</Text>
                  <Text>− {euros(data.acompte)}</Text>
                </View>
              ) : null}
              <View style={s.netBox}>
                <Text style={s.netTxt}>NET À PAYER</Text>
                <Text style={[s.netTxt, { fontSize: 14 }]}>{euros(net)}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* L'approche IPB / Périmètre — repris de la forme du devis (sans les
            détails précis de l'intervention). Factures de diagnostic seulement. */}
        {isDiagnostic ? (
          <View wrap={false} style={[s.row, { marginTop: 14 }]}>
            <View style={s.box}>
              <Text style={s.sectionLabel}>L&apos;APPROCHE IPB</Text>
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
        ) : null}

        {/* Règlement / coordonnées bancaires */}
        <View wrap={false} style={{ marginTop: 14 }}>
          <Text style={s.sectionLabel}>MODALITÉS DE RÈGLEMENT</Text>
          <View style={s.bank}>
            <View style={s.bankItem}>
              <Text style={s.bankLabel}>Bénéficiaire</Text>
              <Text style={s.b}>{COMPANY.bank.beneficiaire}</Text>
            </View>
            <View style={s.bankItem}>
              <Text style={s.bankLabel}>Banque</Text>
              <Text>{COMPANY.bank.banque}</Text>
            </View>
            <View style={s.bankItem}>
              <Text style={s.bankLabel}>IBAN</Text>
              <Text style={s.b}>{COMPANY.bank.iban}</Text>
            </View>
            <View style={s.bankItem}>
              <Text style={s.bankLabel}>BIC</Text>
              <Text>{COMPANY.bank.bic}</Text>
            </View>
          </View>
        </View>

        {/* Mentions légales */}
        <View wrap={false} style={{ marginTop: 14 }}>
          <Text style={s.sectionLabel}>MENTIONS LÉGALES</Text>
          <Text style={s.small}>▸ {COMPANY.penalites}</Text>
          <Text style={s.small}>▸ {COMPANY.indemnite}</Text>
          <Text style={s.small}>▸ {COMPANY.escompte}</Text>
          <Text style={s.small}>
            {COMPANY.tvaMention}. {COMPANY.decennale}.
          </Text>
          <Text style={[s.faint, { fontSize: 8, marginTop: 6 }]}>
            Fait à {COMPANY.city}, le {fr(data.issuedAt)} — Pour {COMPANY.shortName}.
          </Text>
        </View>

        <Text style={s.footer} fixed>
          {COMPANY.name} · {COMPANY.postalCode} {COMPANY.city} · {COMPANY.phone} ·{' '}
          {COMPANY.email} — SIRET {COMPANY.siret} · {COMPANY.tvaMention}
        </Text>
      </Page>
    </Document>
  );
}
