import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
} from '@react-pdf/renderer';
import { COMPANY, BRAND, euros } from '@/lib/crm/company';

export interface DevisDocData {
  number: string;
  object: string;
  bienConcerne?: string | null;
  introLetter?: string | null;
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
  docTag: { fontSize: 20, fontFamily: 'Helvetica-Bold', color: BRAND.orange, letterSpacing: 3 },
  docNum: { fontSize: 9, color: BRAND.slate600, textAlign: 'right', marginTop: 2 },
  title: { fontSize: 14, fontFamily: 'Helvetica-Bold', marginBottom: 2 },
  subtitle: { fontSize: 10, color: BRAND.slate600, marginBottom: 16 },
  metaRow: { flexDirection: 'row', marginBottom: 2 },
  metaLabel: { width: 110, color: BRAND.slate600 },
  metaValue: { flex: 1, fontFamily: 'Helvetica-Bold' },
  twoCol: { flexDirection: 'row', gap: 16, marginTop: 16, marginBottom: 16 },
  box: {
    flex: 1,
    borderWidth: 1,
    borderColor: BRAND.slate200,
    borderRadius: 6,
    padding: 10,
  },
  boxTitle: {
    fontSize: 7.5,
    letterSpacing: 1.5,
    color: BRAND.slate400,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 5,
  },
  intro: { marginBottom: 14, color: BRAND.slate600 },
  sectionTitle: {
    fontSize: 8,
    letterSpacing: 1.5,
    color: BRAND.slate400,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 6,
    marginTop: 6,
  },
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
  totLine: { flexDirection: 'row', width: 240, justifyContent: 'space-between', paddingVertical: 2 },
  totGrand: {
    flexDirection: 'row',
    width: 240,
    justifyContent: 'space-between',
    backgroundColor: '#FFF7ED',
    borderRadius: 4,
    padding: 6,
    marginTop: 4,
  },
  totGrandTxt: { fontFamily: 'Helvetica-Bold', color: BRAND.orange, fontSize: 11 },
  modal: { marginTop: 18 },
  bullet: { flexDirection: 'row', marginBottom: 2 },
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

export function DevisDocument({ data }: { data: DevisDocData }) {
  const clientLoc = [data.contact.postalCode, data.contact.city]
    .filter(Boolean)
    .join(' ');
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
            <Text style={s.docTag}>DEVIS</Text>
            <Text style={s.docNum}>{data.number}</Text>
          </View>
        </View>

        <Text style={s.title}>Devis</Text>
        <Text style={s.subtitle}>
          {data.object} — {data.contact.name}
        </Text>

        <Meta label="N° Devis" value={data.number} />
        <Meta label="Établi le" value={fr(data.createdAt)} />
        <Meta label="Valable jusqu'au" value={fr(data.validUntil)} />
        <Meta label="Client" value={data.contact.name} />
        {data.contact.phone ? <Meta label="Téléphone" value={data.contact.phone} /> : null}
        {data.contact.email ? <Meta label="Email" value={data.contact.email} /> : null}
        {data.bienConcerne ? <Meta label="Bien concerné" value={data.bienConcerne} /> : null}
        <Meta label="Objet" value={data.object} />

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
            <Text style={s.boxTitle}>CLIENT</Text>
            <Text style={{ fontFamily: 'Helvetica-Bold' }}>{data.contact.name}</Text>
            {data.contact.address ? <Text>{data.contact.address}</Text> : null}
            {clientLoc ? <Text>{clientLoc}</Text> : null}
            {data.contact.phone ? <Text>Tél. : {data.contact.phone}</Text> : null}
            {data.contact.email ? <Text>{data.contact.email}</Text> : null}
          </View>
        </View>

        {data.introLetter ? <Text style={s.intro}>{data.introLetter}</Text> : null}

        <Text style={s.sectionTitle}>DÉTAIL DE LA MISSION</Text>
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
          <View style={s.totGrand}>
            <Text style={s.totGrandTxt}>À RÉGLER</Text>
            <Text style={s.totGrandTxt}>{euros(data.totalHT)}</Text>
          </View>
        </View>

        <View style={s.modal}>
          <Text style={s.sectionTitle}>MODALITÉS</Text>
          <View style={s.bullet}>
            <Text>▸ Règlement par virement bancaire à l'issue de la visite.</Text>
          </View>
          <View style={s.bullet}>
            <Text>▸ Rapport adressé sous 3 à 5 jours ouvrés après réception du paiement.</Text>
          </View>
          <View style={s.bullet}>
            <Text>▸ Devis valable jusqu'au {fr(data.validUntil)}.</Text>
          </View>
          <View style={s.bullet}>
            <Text>▸ {COMPANY.tvaMention}.</Text>
          </View>
          <Text style={{ marginTop: 10, color: BRAND.slate600 }}>
            Bon pour accord : retournez ce devis daté et signé, précédé de la mention
            « Bon pour accord ». La visite est alors fixée sous 72 heures. La signature
            emporte acceptation des CGV ({COMPANY.cgvUrl}).
          </Text>
        </View>

        <Text style={s.footer} fixed>
          {COMPANY.name} · {COMPANY.address}, {COMPANY.postalCode} {COMPANY.city} ·{' '}
          {COMPANY.phone} · {COMPANY.email} — SIRET {COMPANY.siret} · {COMPANY.tvaMention}
        </Text>
      </Page>
    </Document>
  );
}
