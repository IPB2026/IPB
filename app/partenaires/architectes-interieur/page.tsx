import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { Footer } from '@/components/home/Footer';
import Link from 'next/link';
import Script from 'next/script';
import { ArrowRight, Phone, Shield, Ruler, FileText, CheckCircle, Award, Hammer, Users } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Partenariat Architectes d'Intérieur Toulouse — Bureau d'Études Mur Porteur | IPB",
  description: "Architectes d'intérieur, décorateurs : IPB est votre partenaire technique pour les projets « espace ouvert ». Étude structure IPN/HEB, ouverture mur porteur, décennale AXA. Co-traitance simple, devis sous 24h.",
  keywords: [
    'partenariat architecte intérieur toulouse',
    'bureau études structure pour architectes',
    'ouverture mur porteur architecte intérieur',
    'sous-traitance structure toulouse',
    'co-traitance architecte décorateur',
    'IPN architecte d intérieur toulouse',
    'partenaire technique architecte intérieur',
  ],
  alternates: { canonical: 'https://www.ipb-expertise.fr/partenaires/architectes-interieur' },
  openGraph: {
    title: "Partenariat Architectes d'Intérieur — Bureau d'Études Mur Porteur Toulouse | IPB",
    description: "Vos projets « espace ouvert » nécessitent un partenaire structure fiable, assuré et rapide. Co-traitance ou sous-traitance, tarif pro.",
    url: 'https://www.ipb-expertise.fr/partenaires/architectes-interieur',
    type: 'website',
  },
};

export default function ArchitectesInterieurPage() {
  const offerJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Partenariat technique pour architectes d'intérieur",
    "areaServed": [{ "@type": "City", "name": "Toulouse" }, { "@type": "AdministrativeArea", "name": "Occitanie" }],
    "provider": { "@type": "LocalBusiness", "name": "IPB - Institut de Pathologie du Bâtiment", "telephone": "+33582953375" }
  };

  return (
    <div className="font-sans text-slate-800 bg-slate-50 antialiased">
      <Script id="archi-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(offerJsonLd) }} />
      <TopBar />
      <Navbar />
      <main id="main-content">
        {/* HERO */}
        <section className="relative bg-slate-900 text-white py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-950/30 to-slate-900"></div>
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-purple-300 font-semibold text-xs uppercase tracking-[0.2em] mb-4">
              Programme partenaire · Architectes d'intérieur & décorateurs
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
              Vos projets <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">« espace ouvert »</span>,
              <span className="block mt-2 text-white">notre étude structure.</span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-3xl">
              Une cuisine ouverte sur séjour, un salon traversant, une suite parentale qui « mange » la chambre voisine. Sans nous, le projet bloque sur la décennale et le calcul de poutre. Avec nous, vous livrez votre client.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="bg-orange-600 hover:bg-orange-500 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2">
                Devenir partenaire <ArrowRight size={20} />
              </Link>
              <a href="tel:0582953375" className="bg-white/10 backdrop-blur border border-white/20 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2">
                <Phone size={20} /> 05 82 95 33 75
              </a>
            </div>
          </div>
        </section>

        {/* Pourquoi nous */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 text-center mb-4">
              Pourquoi un architecte d'intérieur a besoin d'IPB
            </h2>
            <p className="text-lg text-slate-600 text-center mb-12 max-w-3xl mx-auto">
              Vous concevez l'espace, nous garantissons la structure. Une co-traitance qui protège votre client et votre responsabilité.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: <Shield className="text-blue-600" size={28} />, title: 'Décennale AXA active', desc: 'Notre assurance couvre l\'étude ET les travaux. Votre client ne dépend pas de plusieurs polices différentes.' },
                { icon: <Ruler className="text-orange-600" size={28} />, title: 'Note de calcul opposable', desc: 'Ingénieur structure interne. Note signée, valable assurance, contrôleur technique et tribunal.' },
                { icon: <Hammer className="text-amber-600" size={28} />, title: 'Travaux sous 5 jours', desc: 'Étaiement, ouverture, pose poutre, finitions. Nos équipes interviennent vite, sans embolisme votre planning.' },
                { icon: <Users className="text-purple-600" size={28} />, title: 'Interlocuteur unique', desc: 'Vous discutez avec un seul chargé d\'affaires. Pas de ping-pong entre BE et entreprise générale.' },
                { icon: <FileText className="text-emerald-600" size={28} />, title: 'DOE livré au client', desc: 'Dossier complet remis : plans d\'exécution, note de calcul, attestation décennale. Votre client est rassuré.' },
                { icon: <Award className="text-rose-600" size={28} />, title: 'Tarif partenaire', desc: 'Conditions négociées si vous nous référencez sur ≥3 projets/an. Pas de marge cachée, devis transparent.' },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                  <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-4 shadow-sm">{icon}</div>
                  <h3 className="font-bold text-lg text-slate-900 mb-2">{title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Modalités */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-slate-900 text-center mb-10">
              Comment on travaille ensemble
            </h2>

            <div className="space-y-6">
              {[
                { num: 1, title: 'Brief projet', desc: 'Vous nous envoyez plans + photos via WhatsApp ou mail. Nous identifions les murs porteurs et chiffrons sous 24h.' },
                { num: 2, title: 'Visite technique', desc: 'Notre ingénieur passe sur site avec vous (ou seul si vous êtes pris). Relevé de charges, plan d\'exécution.' },
                { num: 3, title: 'Devis + note de calcul', desc: 'Devis ferme remis sous 48h. Note de calcul signée, dimensionnement IPN/HEB, méthode d\'étaiement.' },
                { num: 4, title: 'Co-traitance ou sous-traitance', desc: 'À votre choix : nous facturons votre client (vous touchez l\'apport) ou nous vous facturons (vous refacturez). Tout est possible.' },
                { num: 5, title: 'Travaux + livraison', desc: '2 à 5 jours sur place. DOE remis, attestation décennale signée, photos avant/après pour votre book.' },
              ].map(({ num, title, desc }) => (
                <div key={num} className="bg-white border border-slate-200 rounded-2xl p-6 flex gap-5 items-start shadow-sm">
                  <div className="w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">{num}</div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 mb-1">{title}</h3>
                    <p className="text-slate-600">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Engagement */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200 rounded-3xl p-8 md:p-12">
              <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Notre engagement partenaire</h2>
              <ul className="space-y-3 text-left max-w-2xl mx-auto mb-8">
                {[
                  'Réponse à un brief sous 24h ouvrées',
                  'Tarif partenaire transparent — pas de surprises',
                  'Aucun démarchage de votre client après le chantier',
                  'Confidentialité absolue sur vos projets en cours',
                  'Photos avant/après mises à votre disposition pour votre book',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-slate-700">
                    <CheckCircle className="text-emerald-500 mt-0.5 flex-shrink-0" size={20} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl">
                Démarrer le partenariat <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-16 bg-slate-900 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Un projet en cours ?</h2>
            <p className="text-xl text-slate-300 mb-8">Envoyez-nous plans et photos — chiffrage sous 24h.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="tel:0582953375" className="bg-orange-600 hover:bg-orange-500 text-white px-10 py-5 rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-xl">
                <Phone size={20} /> 05 82 95 33 75
              </a>
              <Link href="/contact" className="bg-white/10 border border-white/20 text-white px-10 py-5 rounded-xl font-bold text-lg flex items-center justify-center gap-2">
                Formulaire pro
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
