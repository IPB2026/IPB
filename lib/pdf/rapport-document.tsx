import {
  Document,
  Page,
  View,
  Text,
  Image,
  StyleSheet,
} from '@react-pdf/renderer';
import { COMPANY, BRAND, euros } from '@/lib/crm/company';
import type { ReportContent } from '@/lib/ai/report';

export interface RapportDocPhoto {
  url: string;
  caption?: string | null;
  zoneRef?: string | null;
  gravite?: string | null;
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
  content: ReportContent;
  photos?: RapportDocPhoto[];
}

const fr = (d: Date) => new Date(d).toLocaleDateString('fr-FR', { dateStyle: 'long' });

const graviteColor = (g: string) => {
  const u = (g || '').toUpperCase();
  if (u.includes('TRAITER')) return '#C2410C';
  if (u.includes('IMPORTANT')) return '#B91C1C';
  if (u.includes('SURVEILL')) return '#B45309';
  return BRAND.slate600;
};

const s = StyleSheet.create({
  page: {
    paddingTop: 40,
    paddingBottom: 60,
    paddingHorizontal: 44,
    fontSize: 9.5,
    fontFamily: 'Helvetica',
    color: BRAND.navy,
    lineHeight: 1.55,
  },
  topbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: BRAND.orange,
    marginBottom: 18,
  },
  brand: { fontSize: 10, fontFamily: 'Helvetica-Bold' },
  brandSub: { fontSize: 7, color: BRAND.slate400, marginTop: 2 },
  ref: { fontSize: 8, color: BRAND.slate600 },
  h1: { fontSize: 16, fontFamily: 'Helvetica-Bold', marginBottom: 2 },
  h1sub: { fontSize: 10, color: BRAND.slate600, marginBottom: 14 },
  idBox: {
    borderWidth: 1,
    borderColor: BRAND.slate200,
    borderRadius: 6,
    padding: 10,
    marginBottom: 14,
  },
  idRow: { flexDirection: 'row', marginBottom: 2 },
  idLabel: { width: 120, color: BRAND.slate600 },
  idVal: { flex: 1, fontFamily: 'Helvetica-Bold' },
  concBox: {
    backgroundColor: '#FFF7ED',
    borderLeftWidth: 3,
    borderLeftColor: BRAND.orange,
    padding: 12,
    marginBottom: 16,
  },
  concTitle: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: '#C2410C',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  sectionH: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    marginTop: 14,
    marginBottom: 6,
  },
  zoneTitle: { fontSize: 10.5, fontFamily: 'Helvetica-Bold', marginTop: 10 },
  refBox: {
    backgroundColor: BRAND.slate50,
    borderRadius: 4,
    padding: 6,
    marginTop: 4,
    fontSize: 8,
    color: BRAND.slate600,
  },
  graviteTag: {
    marginTop: 4,
    fontSize: 8.5,
    fontFamily: 'Helvetica-Bold',
  },
  tHead: {
    flexDirection: 'row',
    backgroundColor: BRAND.navy,
    color: '#fff',
    paddingVertical: 4,
    paddingHorizontal: 6,
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    marginTop: 4,
  },
  tRow: {
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 6,
    borderBottomWidth: 1,
    borderBottomColor: BRAND.slate200,
    fontSize: 8.5,
  },
  cZone: { flex: 1.4 },
  cMesure: { width: 70 },
  cGrav: { width: 70 },
  cPreco: { flex: 2 },
  cDesig: { flex: 1 },
  cUnite: { width: 50, textAlign: 'center' },
  cMontant: { width: 70, textAlign: 'right' },
  preco: { marginTop: 6 },
  precoTitle: { fontFamily: 'Helvetica-Bold' },
  recoBox: {
    backgroundColor: '#FFF7ED',
    borderRadius: 6,
    padding: 10,
    marginTop: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 22,
    left: 44,
    right: 44,
    borderTopWidth: 1,
    borderTopColor: BRAND.slate200,
    paddingTop: 6,
    fontSize: 7,
    color: BRAND.slate400,
    textAlign: 'center',
  },
  signature: { marginTop: 18, fontSize: 9 },
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4,
  },
  photoCell: { width: '50%', padding: 4 },
  photoImg: {
    width: '100%',
    height: 150,
    objectFit: 'cover',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: BRAND.slate200,
  },
  photoCap: { fontSize: 7.5, color: BRAND.slate600, marginTop: 3 },
  photoMeta: { fontSize: 7, color: BRAND.slate400 },
});

export function RapportDocument({ data }: { data: RapportDocData }) {
  const c = data.content;
  const ttc = Math.round(c.budgetHT * 1.1);
  const photos = (data.photos ?? []).filter((p) => p.url);
  return (
    <Document title={data.number} author={COMPANY.shortName}>
      <Page size="A4" style={s.page}>
        <View style={s.topbar} fixed>
          <View>
            <Text style={s.brand}>{COMPANY.name}</Text>
            <Text style={s.brandSub}>
              {COMPANY.address} · {COMPANY.postalCode} {COMPANY.city} ·{' '}
              SIRET {COMPANY.siret}
            </Text>
          </View>
          <Text style={s.ref}>{data.number}</Text>
        </View>

        <Text style={s.h1}>Rapport de diagnostic technique</Text>
        <Text style={s.h1sub}>{data.title}</Text>

        <View style={s.idBox}>
          <View style={s.idRow}>
            <Text style={s.idLabel}>Référence dossier</Text>
            <Text style={s.idVal}>{data.number}</Text>
          </View>
          <View style={s.idRow}>
            <Text style={s.idLabel}>Client</Text>
            <Text style={s.idVal}>{data.contact.name}</Text>
          </View>
          {data.bienAdresse ? (
            <View style={s.idRow}>
              <Text style={s.idLabel}>Adresse du bien</Text>
              <Text style={s.idVal}>
                {data.bienAdresse}
                {data.ville ? ` — ${data.ville}` : ''}
              </Text>
            </View>
          ) : null}
          <View style={s.idRow}>
            <Text style={s.idLabel}>Date du rapport</Text>
            <Text style={s.idVal}>{fr(data.createdAt)}</Text>
          </View>
          <View style={s.idRow}>
            <Text style={s.idLabel}>Expert</Text>
            <Text style={s.idVal}>{COMPANY.name}</Text>
          </View>
        </View>

        <View style={s.concBox}>
          <Text style={s.concTitle}>CONCLUSION GÉNÉRALE</Text>
          <Text>{c.conclusionGenerale}</Text>
        </View>

        {/* Analyse par zone */}
        {c.zones.map((z, i) => (
          <View key={i} wrap={false}>
            <Text style={s.zoneTitle}>
              {i + 1}. {z.titre}
            </Text>
            <Text style={{ marginTop: 2 }}>{z.analyse}</Text>
            {z.refsTechniques?.length ? (
              <View style={s.refBox}>
                <Text style={{ fontFamily: 'Helvetica-Bold' }}>
                  Références techniques
                </Text>
                {z.refsTechniques.map((r, j) => (
                  <Text key={j}>▸ {r}</Text>
                ))}
              </View>
            ) : null}
            <Text style={{ ...s.graviteTag, color: graviteColor(z.gravite) }}>
              {z.gravite} — {z.preconisation}
            </Text>
          </View>
        ))}

        {/* Synthèse */}
        <Text style={s.sectionH}>Tableau de synthèse des désordres</Text>
        <View style={s.tHead}>
          <Text style={s.cZone}>Zone / Désordre</Text>
          <Text style={s.cMesure}>Mesure</Text>
          <Text style={s.cGrav}>Gravité</Text>
          <Text style={s.cPreco}>Préconisation</Text>
        </View>
        {c.synthese.map((r, i) => (
          <View key={i} style={s.tRow} wrap={false}>
            <Text style={s.cZone}>{r.zone}</Text>
            <Text style={s.cMesure}>{r.mesure || '—'}</Text>
            <Text style={{ ...s.cGrav, color: graviteColor(r.gravite) }}>
              {r.gravite}
            </Text>
            <Text style={s.cPreco}>{r.preconisation}</Text>
          </View>
        ))}

        {/* Préconisations */}
        <Text style={s.sectionH}>Préconisations techniques ordonnées</Text>
        {c.preconisations.map((p, i) => (
          <View key={i} style={s.preco} wrap={false}>
            <Text style={s.precoTitle}>
              {p.priorite} — {p.titre}
            </Text>
            <Text>{p.detail}</Text>
          </View>
        ))}

        {/* Estimation */}
        <Text style={s.sectionH}>Estimation budgétaire des travaux</Text>
        <View style={s.tHead}>
          <Text style={s.cDesig}>Désignation</Text>
          <Text style={s.cUnite}>Unité</Text>
          <Text style={s.cMontant}>Montant HT</Text>
        </View>
        {c.estimationTravaux.map((e, i) => (
          <View key={i} style={s.tRow} wrap={false}>
            <Text style={s.cDesig}>{e.designation}</Text>
            <Text style={s.cUnite}>{e.unite}</Text>
            <Text style={s.cMontant}>{euros(e.montantHT)}</Text>
          </View>
        ))}
        <View style={{ ...s.tRow, borderBottomWidth: 0 }}>
          <Text style={s.cDesig}>
            <Text style={{ fontFamily: 'Helvetica-Bold' }}>
              TOTAL HT {euros(c.budgetHT)}
            </Text>{' '}
            · TVA 10 % · TTC {euros(ttc)}
          </Text>
        </View>
        <Text style={{ fontSize: 7.5, color: BRAND.slate400, marginTop: 2 }}>
          Estimation indicative — non contractuelle. TVA 10 % (art. 279-0 bis CGI,
          rénovation logement &gt; 2 ans). Métrés à confirmer après sondage.
        </Text>

        {/* Conclusion */}
        <Text style={s.sectionH}>Conclusion</Text>
        <Text>{c.conclusion}</Text>

        <View style={s.recoBox}>
          <Text style={{ fontFamily: 'Helvetica-Bold', marginBottom: 3 }}>
            Recommandations
          </Text>
          {c.recommandations.map((r, i) => (
            <Text key={i}>{i + 1}. {r}</Text>
          ))}
        </View>

        {/* Reportage photographique */}
        {photos.length > 0 && (
          <View break>
            <Text style={s.sectionH}>Reportage photographique</Text>
            <View style={s.photoGrid}>
              {photos.map((p, i) => (
                <View key={i} style={s.photoCell} wrap={false}>
                  {/* eslint-disable-next-line jsx-a11y/alt-text */}
                  <Image style={s.photoImg} src={p.url} />
                  <Text style={s.photoCap}>
                    Photo {i + 1}
                    {p.caption ? ` — ${p.caption}` : ''}
                  </Text>
                  {(p.zoneRef || p.gravite) && (
                    <Text style={s.photoMeta}>
                      {[p.zoneRef, p.gravite].filter(Boolean).join(' · ')}
                    </Text>
                  )}
                </View>
              ))}
            </View>
          </View>
        )}

        <Text style={s.signature}>
          Pour {COMPANY.shortName} — {COMPANY.city}, {fr(data.createdAt)}.{'\n'}
          Diagnostiqueur Technique Indépendant.
        </Text>

        <Text style={s.footer} fixed>
          {COMPANY.name} · {COMPANY.address}, {COMPANY.postalCode} {COMPANY.city} ·{' '}
          {COMPANY.phone} · {COMPANY.email} — SIRET {COMPANY.siret}
        </Text>
      </Page>
    </Document>
  );
}
