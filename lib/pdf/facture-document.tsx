import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
} from '@react-pdf/renderer';
import { COMPANY, BRAND, euros } from '@/lib/crm/company';

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

const s = StyleSheet.create({
  page: {
    paddingTop: 40,
    paddingBottom: 64,
    paddingHorizontal: 44,
    fontSize: 9.5,
    fontFamily: 'Helvetica',
    color: BRAND.navy,
    lineHeight: 1.5,
  },
  topbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: BRAND.orange,
    marginBottom: 22,
  },
  brand: { fontSize: 11, fontFamily: 'Helvetica-Bold' },
  brandSub: { fontSize: 7.5, color: BRAND.slate400, marginTop: 2 },
  docTag: { fontSize: 20, fontFamily: 'Helvetica-Bold', color: BRAND.orange, letterSpacing: 2 },
  docNum: { fontSize: 9, color: BRAND.slate600, textAlign: 'right', marginTop: 2 },
  title: { fontSize: 14, fontFamily: 'Helvetica-Bold', marginBottom: 2 },
  subtitle: { fontSize: 10, color: BRAND.slate600, marginBottom: 14 },
  metaRow: { flexDirection: 'row', marginBottom: 2 },
  metaLabel: { width: 120, color: BRAND.slate600 },
  metaValue: { flex: 1, fontFamily: 'Helvetica-Bold' },
  twoCol: { flexDirection: 'row', gap: 16, marginTop: 14, marginBottom: 12 },
  box: { flex: 1, borderWidth: 1, borderColor: BRAND.slate200, borderRadius: 6, padding: 10 },
  boxTitle: {
    fontSize: 7.5,
    letterSpacing: 1.5,
    color: BRAND.slate400,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 8,
    letterSpacing: 1.5,
    color: BRAND.slate400,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 6,
    marginTop: 8,
  },
  para: { color: BRAND.slate600, marginBottom: 6 },
  tHead: {
    flexDirection: 'row',
    backgroundColor: BRAND.navy,
    color: '#fff',
    paddingVertical: 5,
    paddingHorizontal: 6,
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
  },
  tRow: {
    flexDirection: 'row',
    paddingVertical: 6,
    paddingHorizontal: 6,
    borderBottomWidth: 1,
    borderBottomColor: BRAND.slate200,
  },
  cDesig: { flex: 1 },
  cUnit: { width: 50, textAlign: 'center' },
  cQty: { width: 34, textAlign: 'center' },
  cPu: { width: 64, textAlign: 'right' },
  cTot: { width: 70, textAlign: 'right' },
  detail: { fontSize: 8, color: BRAND.slate400, marginTop: 1 },
  totals: { marginTop: 10, alignItems: 'flex-end' },
  totLine: { flexDirection: 'row', width: 250, justifyContent: 'space-between', paddingVertical: 2 },
  totGrand: {
    flexDirection: 'row',
    width: 250,
    justifyContent: 'space-between',
    backgroundColor: '#FFF7ED',
    borderRadius: 4,
    padding: 6,
    marginTop: 4,
  },
  totGrandTxt: { fontFamily: 'Helvetica-Bold', color: BRAND.orange, fontSize: 11 },
  bank: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: BRAND.slate200,
    borderRadius: 6,
    padding: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  bankItem: { width: '50%', marginBottom: 3 },
  bankLabel: { fontSize: 7.5, color: BRAND.slate400 },
  small: { fontSize: 8, color: BRAND.slate600, marginTop: 2 },
  footer: {
    position: 'absolute',
    bottom: 24,
    left: 44,
    right: 44,
    borderTopWidth: 1,
    borderTopColor: BRAND.slate200,
    paddingTop: 6,
    fontSize: 7,
    color: BRAND.slate400,
    textAlign: 'center',
  },
});

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <View style={s.metaRow}>
      <Text style={s.metaLabel}>{label}</Text>
      <Text style={s.metaValue}>{value}</Text>
    </View>
  );
}

export function FactureDocument({ data }: { data: FactureDocData }) {
  const clientLoc = [data.contact.postalCode, data.contact.city]
    .filter(Boolean)
    .join(' ');
  const net = data.totalHT - (data.acompte ?? 0);
  return (
    <Document title={data.number} author={COMPANY.shortName}>
      <Page size="A4" style={s.page}>
        <View style={s.topbar} fixed>
          <View>
            <Text style={s.brand}>{COMPANY.name}</Text>
            <Text style={s.brandSub}>
              {COMPANY.address} · {COMPANY.postalCode} {COMPANY.city}
            </Text>
          </View>
          <View>
            <Text style={s.docTag}>FACTURE</Text>
            <Text style={s.docNum}>{data.number}</Text>
          </View>
        </View>

        <Text style={s.title}>Facture</Text>
        <Text style={s.subtitle}>
          {data.object} — {data.contact.name}
        </Text>

        <Meta label="N° Facture" value={data.number} />
        <Meta label="Date d'émission" value={fr(data.issuedAt)} />
        <Meta label="Date d'échéance" value={fr(data.dueDate)} />
        <Meta label="Client" value={data.contact.name} />
        {data.mandataire ? <Meta label="Mandataire" value={data.mandataire} /> : null}
        <Meta label="Objet" value={data.object} />
        <Meta label="Mode de règlement" value={data.paymentMode} />

        <View style={s.twoCol}>
          <View style={s.box}>
            <Text style={s.boxTitle}>ÉMETTEUR</Text>
            <Text>{COMPANY.name}</Text>
            <Text>{COMPANY.address}</Text>
            <Text>
              {COMPANY.postalCode} {COMPANY.city}
            </Text>
            <Text>Tél. : {COMPANY.phone}</Text>
            <Text>{COMPANY.email}</Text>
            <Text>
              SIRET : {COMPANY.siret} · APE : {COMPANY.ape}
            </Text>
          </View>
          <View style={s.box}>
            <Text style={s.boxTitle}>CLIENT / DESTINATAIRE</Text>
            <Text style={{ fontFamily: 'Helvetica-Bold' }}>{data.contact.name}</Text>
            {data.contact.address ? <Text>{data.contact.address}</Text> : null}
            {clientLoc ? <Text>{clientLoc}</Text> : null}
            {data.mandataire ? <Text>Représenté par : {data.mandataire}</Text> : null}
            {data.contact.phone ? <Text>Tél. : {data.contact.phone}</Text> : null}
            {data.contact.email ? <Text>{data.contact.email}</Text> : null}
          </View>
        </View>

        <Text style={s.sectionTitle}>DÉTAIL DES PRESTATIONS</Text>
        <View style={s.tHead}>
          <Text style={s.cDesig}>Désignation</Text>
          <Text style={s.cUnit}>Unité</Text>
          <Text style={s.cQty}>Qté</Text>
          <Text style={s.cPu}>P.U.</Text>
          <Text style={s.cTot}>Total</Text>
        </View>
        {data.lines.map((l, i) => (
          <View style={s.tRow} key={i} wrap={false}>
            <View style={s.cDesig}>
              <Text>{l.designation}</Text>
              {l.detail ? <Text style={s.detail}>{l.detail}</Text> : null}
            </View>
            <Text style={s.cUnit}>{l.unit}</Text>
            <Text style={s.cQty}>{l.qty}</Text>
            <Text style={s.cPu}>{euros(l.unitPrice)}</Text>
            <Text style={s.cTot}>{euros(l.total)}</Text>
          </View>
        ))}

        <View style={s.totals}>
          <View style={s.totLine}>
            <Text>Total HT</Text>
            <Text style={{ fontFamily: 'Helvetica-Bold' }}>{euros(data.totalHT)}</Text>
          </View>
          <View style={s.totLine}>
            <Text style={{ color: BRAND.slate600 }}>{COMPANY.tvaMention}</Text>
            <Text>—</Text>
          </View>
          {data.acompte ? (
            <View style={s.totLine}>
              <Text>Acompte déjà versé</Text>
              <Text>− {euros(data.acompte)}</Text>
            </View>
          ) : null}
          <View style={s.totGrand}>
            <Text style={s.totGrandTxt}>NET À PAYER</Text>
            <Text style={s.totGrandTxt}>{euros(net)}</Text>
          </View>
        </View>

        <Text style={s.sectionTitle}>MODALITÉS DE RÈGLEMENT</Text>
        <Text style={s.para}>
          Échéance : {fr(data.dueDate)} · Mode : {data.paymentMode}
        </Text>
        <View style={s.bank}>
          <View style={s.bankItem}>
            <Text style={s.bankLabel}>Bénéficiaire</Text>
            <Text>{COMPANY.bank.beneficiaire}</Text>
          </View>
          <View style={s.bankItem}>
            <Text style={s.bankLabel}>Banque</Text>
            <Text>{COMPANY.bank.banque}</Text>
          </View>
          <View style={s.bankItem}>
            <Text style={s.bankLabel}>IBAN</Text>
            <Text>{COMPANY.bank.iban}</Text>
          </View>
          <View style={s.bankItem}>
            <Text style={s.bankLabel}>BIC</Text>
            <Text>{COMPANY.bank.bic}</Text>
          </View>
        </View>

        <Text style={s.sectionTitle}>MENTIONS LÉGALES</Text>
        <Text style={s.small}>▸ {COMPANY.penalites}</Text>
        <Text style={s.small}>▸ {COMPANY.indemnite}</Text>
        <Text style={s.small}>▸ {COMPANY.escompte}</Text>
        <Text style={s.small}>
          {COMPANY.tvaMention}. {COMPANY.decennale}. SIRET : {COMPANY.siret} · APE :{' '}
          {COMPANY.ape}.
        </Text>
        <Text style={{ ...s.small, marginTop: 8 }}>
          Fait à {COMPANY.city}, le {fr(data.issuedAt)} — Pour {COMPANY.shortName}.
        </Text>

        <Text style={s.footer} fixed>
          {COMPANY.name} · {COMPANY.address}, {COMPANY.postalCode} {COMPANY.city} ·{' '}
          {COMPANY.phone} · {COMPANY.email} — SIRET {COMPANY.siret} · {COMPANY.tvaMention}
        </Text>
      </Page>
    </Document>
  );
}
