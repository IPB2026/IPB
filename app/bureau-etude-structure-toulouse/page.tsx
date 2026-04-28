import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { Footer } from '@/components/home/Footer';
import Link from 'next/link';
import Script from 'next/script';
import { ArrowRight, Phone, Shield, Ruler, FileText, CheckCircle, Award, Building2, Calculator } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Bureau d'Études Structure Toulouse — IPN, HEB, Mur Porteur | IPB",
  description: "Bureau d'études structure intégré à Toulouse. Note de calcul IPN/HEB, dimensionnement poutre, mur porteur, ouvrages neufs et rénovation. Décennale AXA. Devis 24h. ☎ 05 82 95 33 75",
  keywords: [
    'bureau études structure toulouse',
    'bureau études structure haute-garonne',
    'note de calcul IPN toulouse',
    'dimensionnement poutre HEB',
    'ingénieur structure toulouse',
    'calcul mur porteur toulouse',
    'étude béton armé toulouse',
    'bureau études bâtiment toulouse',
    'expertise structure 31',
    'note de calcul ouverture mur',
  ],
  alternates: { canonical: 'https://www.ipb-expertise.fr/bureau-etude-structure-toulouse' },
  openGraph: {
    title: "Bureau d'Études Structure Toulouse — IPN, HEB, Mur Porteur | IPB",
    description: "Ingénieur structure intégré à Toulouse. Note de calcul opposable, dimensionnement IPN/HEB, étude charge, contrôle des ouvrages. Décennale AXA.",
    url: 'https://www.ipb-expertise.fr/bureau-etude-structure-toulouse',
    type: 'website',
  },
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "IPB Bureau d'Études Structure",
  "@id": "https://www.ipb-expertise.fr/bureau-etude-structure-toulouse#service",
  "description": "Bureau d'études structure à Toulouse : note de calcul IPN/HEB, dimensionnement de poutre, expertise mur porteur, ouvrages neufs et rénovation.",
  "areaServed": [
    { "@type": "City", "name": "Toulouse" },
    { "@type": "AdministrativeArea", "name": "Haute-Garonne" },
    { "@type": "AdministrativeArea", "name": "Tarn-et-Garonne" },
    { "@type": "AdministrativeArea", "name": "Gers" },
  ],
  "provider": { "@type": "LocalBusiness", "name": "IPB - Institut de Pathologie du Bâtiment", "telephone": "+33582953375" }
};

export default function BureauEtudeStructurePage() {
  return (
    <div className="font-sans text-slate-800 bg-slate-50 antialiased">
      <Script id="bureau-etudes-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <TopBar />
      <Navbar />
      <main id="main-content">
        {/* HERO */}
        <section className="relative bg-slate-900 text-white py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950/40 to-slate-900"></div>
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-blue-300 font-semibold text-xs uppercase tracking-[0.2em] mb-4">
              Bureau d'études intégré · Décennale AXA France
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
              Bureau d'Études <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">Structure</span>
              <span className="block text-3xl md:text-4xl mt-2 text-white">à Toulouse & Occitanie (31, 82, 32, 81)</span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-3xl">
              Note de calcul opposable, dimensionnement <strong className="text-white">IPN/HEB/IPE</strong>, étude charge, expertise mur porteur, contrôle des ouvrages. Pour particuliers, architectes, marchands de biens et entreprises générales.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/diagnostic" className="bg-orange-600 hover:bg-orange-500 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2">
                Demander une note de calcul <ArrowRight size={20} />
              </Link>
              <a href="tel:0582953375" className="bg-white/10 backdrop-blur border border-white/20 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2">
                <Phone size={20} /> 05 82 95 33 75
              </a>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 text-center mb-12">
              Nos prestations bureau d'études
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: <Calculator className="text-orange-600" size={28} />, title: 'Dimensionnement IPN/HEB/IPE', desc: 'Calcul des charges reprises, choix de la poutre, vérification flèche et déversement. Note de calcul signée.' },
                { icon: <Ruler className="text-orange-600" size={28} />, title: 'Étude mur porteur', desc: 'Identification du caractère porteur, descente de charges, méthode d\'étaiement, plan d\'exécution.' },
                { icon: <Building2 className="text-orange-600" size={28} />, title: 'Diagnostic structure', desc: 'Avant achat, après sinistre, fissures, désordres. Rapport opposable à l\'assurance et à l\'expert judiciaire.' },
                { icon: <FileText className="text-orange-600" size={28} />, title: 'Béton armé', desc: 'Plancher, longrine, semelle, poteau. Calculs Eurocode 2, plans de ferraillage.' },
                { icon: <Award className="text-orange-600" size={28} />, title: 'Mission de maîtrise d\'œuvre', desc: 'Conception, consultation entreprises, suivi de chantier, réception. Pour rénovations lourdes.' },
                { icon: <Shield className="text-orange-600" size={28} />, title: 'Contre-expertise', desc: 'Confrontation avec un rapport d\'expert d\'assurance, contestation amiable ou judiciaire.' },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="bg-slate-50 border border-slate-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                  <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mb-4">{icon}</div>
                  <h3 className="font-bold text-lg text-slate-900 mb-2">{title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cible B2B */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 text-center mb-4">
              Pour qui travaillons-nous ?
            </h2>
            <p className="text-lg text-slate-600 text-center mb-12 max-w-3xl mx-auto">
              Particuliers, mais aussi architectes d'intérieur, marchands de biens et agences immobilières s'appuient sur notre cabinet.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <Link href="/partenaires/architectes-interieur" className="block bg-white border-2 border-slate-200 hover:border-orange-300 rounded-2xl p-6 transition-all hover:shadow-xl group">
                <h3 className="font-bold text-xl text-slate-900 mb-2 group-hover:text-orange-600">Architectes d'intérieur & décorateurs</h3>
                <p className="text-slate-600 text-sm leading-relaxed">Vos projets « espace ouvert » nécessitent une étude structure ? Nous sommes votre partenaire technique sous-traité, avec décennale active. <span className="text-orange-600 font-semibold">En savoir plus →</span></p>
              </Link>

              <Link href="/partenaires/marchands-de-biens" className="block bg-white border-2 border-slate-200 hover:border-orange-300 rounded-2xl p-6 transition-all hover:shadow-xl group">
                <h3 className="font-bold text-xl text-slate-900 mb-2 group-hover:text-orange-600">Marchands de biens & investisseurs</h3>
                <p className="text-slate-600 text-sm leading-relaxed">Acheter un T3 toulousain pour ouvrir cuisine + salon avant revente ? Nous chiffrons et exécutons en délai serré. <span className="text-orange-600 font-semibold">En savoir plus →</span></p>
              </Link>

              <Link href="/partenaires/agences-immobilieres" className="block bg-white border-2 border-slate-200 hover:border-orange-300 rounded-2xl p-6 transition-all hover:shadow-xl group">
                <h3 className="font-bold text-xl text-slate-900 mb-2 group-hover:text-orange-600">Agences immobilières</h3>
                <p className="text-slate-600 text-sm leading-relaxed">Une vente bloquée à cause d'une fissure ? Notre rapport rassure l'acquéreur et débloque la transaction. <span className="text-orange-600 font-semibold">En savoir plus →</span></p>
              </Link>

              <div className="bg-slate-900 text-white border-2 border-slate-800 rounded-2xl p-6">
                <h3 className="font-bold text-xl text-white mb-2">Particuliers</h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-4">Votre projet personnel : ouverture mur porteur, baie vitrée, agrafage de fissures, expertise avant achat.</p>
                <Link href="/diagnostic" className="text-orange-300 font-semibold hover:text-orange-200">Lancer mon diagnostic →</Link>
              </div>
            </div>
          </div>
        </section>

        {/* Garanties */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-8">Nos garanties</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: <Shield className="text-blue-600" size={32} />, label: 'Décennale AXA France', desc: 'Police n° 10564321 — couvre étude + travaux' },
                { icon: <CheckCircle className="text-emerald-600" size={32} />, label: 'Note de calcul opposable', desc: 'Signée ingénieur, valable assurance et tribunal' },
                { icon: <FileText className="text-orange-600" size={32} />, label: 'DOE remis systématiquement', desc: 'Dossier des Ouvrages Exécutés à la livraison' },
              ].map(({ icon, label, desc }) => (
                <div key={label} className="flex flex-col items-center p-6">
                  <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-4">{icon}</div>
                  <p className="font-bold text-slate-900 mb-1">{label}</p>
                  <p className="text-slate-500 text-sm">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-16 bg-gradient-to-r from-orange-600 to-amber-600 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Besoin d'une note de calcul ?</h2>
            <p className="text-xl text-orange-100 mb-8">Réponse d'un ingénieur structure sous 24h. Devis gratuit, sans engagement.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/diagnostic" className="bg-white text-orange-600 px-10 py-5 rounded-xl font-bold text-lg hover:bg-orange-50 flex items-center justify-center gap-2 shadow-xl">
                Lancer mon devis <ArrowRight size={20} />
              </Link>
              <a href="tel:0582953375" className="bg-orange-700 hover:bg-orange-800 px-8 py-5 rounded-xl font-bold text-lg flex items-center justify-center gap-2">
                <Phone size={20} /> 05 82 95 33 75
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
