import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { Footer } from '@/components/home/Footer';
import Link from 'next/link';
import Script from 'next/script';
import { ArrowRight, Phone, Shield, Clock, FileText, CheckCircle, Home, AlertTriangle, Handshake } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Partenariat Agences Immobilières Toulouse — Expertise Fissures Vente Bloquée | IPB",
  description: "Agents immobiliers : votre vente bloque à cause d'une fissure inquiétante ou d'un mur porteur à ouvrir ? IPB rassure l'acquéreur avec un rapport opposable sous 7 jours. Décennale AXA. Toulouse, Montauban, Auch.",
  keywords: [
    'partenariat agence immobilière toulouse',
    'expert fissures pour agence immobilière',
    'rapport fissure vente immobilière',
    'expertise pré-vente toulouse',
    'fissure vente bloquée toulouse',
    'mur porteur projet acquéreur',
    'partenaire agent immobilier structure',
  ],
  alternates: { canonical: 'https://www.ipb-expertise.fr/partenaires/agences-immobilieres' },
  openGraph: {
    title: "Partenariat Agences Immobilières — Expert Fissures & Mur Porteur Toulouse | IPB",
    description: "Une vente bloquée ? Un acquéreur inquiet d'une fissure ? Notre rapport sous 7 jours débloque la transaction.",
    url: 'https://www.ipb-expertise.fr/partenaires/agences-immobilieres',
    type: 'website',
  },
};

export default function AgencesImmobilieresPage() {
  return (
    <div className="font-sans text-slate-800 bg-slate-50 antialiased">
      <TopBar />
      <Navbar />
      <main id="main-content">
        {/* HERO */}
        <section className="relative bg-slate-900 text-white py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950/30 to-slate-900"></div>
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-blue-300 font-semibold text-xs uppercase tracking-[0.2em] mb-4">
              Programme partenaire · Agences & mandataires immobiliers
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
              Une vente bloquée par <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">une fissure</span> ?
              <span className="block mt-2 text-white">On débloque sous 7 jours.</span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-3xl">
              L'acquéreur a vu une fissure et veut « réfléchir ». Le compromis est suspendu à un rapport. Nous intervenons sous 48h, livrons un rapport opposable sous 7 jours, et chiffrons les éventuels travaux. Votre commission est sauvée.
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

        {/* Cas typiques */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 text-center mb-4">
              3 situations où nous sauvons votre vente
            </h2>
            <p className="text-lg text-slate-600 text-center mb-12 max-w-3xl mx-auto">
              Avant le compromis, après la visite, ou pendant la condition suspensive.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: <AlertTriangle className="text-orange-600" size={28} />,
                  title: 'Fissure inquiétante',
                  desc: 'L\'acquéreur a repéré une fissure et menace de se rétracter. Notre rapport tranche : cosmétique ou structurelle, et chiffrage si travaux.',
                },
                {
                  icon: <Home className="text-amber-600" size={28} />,
                  title: 'Mur porteur à ouvrir',
                  desc: 'L\'acquéreur veut acheter mais conditionne son achat à la possibilité d\'ouvrir un mur. Nous validons techniquement + chiffrons.',
                },
                {
                  icon: <Shield className="text-blue-600" size={28} />,
                  title: 'Pré-vente sécurisée',
                  desc: 'Vous prenez un mandat sur un bien fissuré. Notre diagnostic préventif rassure acquéreurs et notaires, accélère la commercialisation.',
                },
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

        {/* Process */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-slate-900 text-center mb-10">
              Comment on intervient
            </h2>

            <div className="space-y-6">
              {[
                { num: 1, title: 'Vous nous appelez', desc: 'Décrivez la situation en 2 minutes au 05 82 95 33 75. Nous validons que c\'est dans notre périmètre et programmons la visite.' },
                { num: 2, title: 'Visite sous 48h', desc: 'Notre expert se déplace, mesure les fissures (fissuromètre), photographie, écoute les inquiétudes de l\'acquéreur si nécessaire.' },
                { num: 3, title: 'Rapport sous 7 jours', desc: 'Document PDF opposable : nature des désordres, gravité, recommandations, chiffrage. Vous le transmettez à l\'acquéreur et au notaire.' },
                { num: 4, title: 'Vente débloquée', desc: 'Soit le rapport rassure (la fissure est cosmétique), soit il chiffre des travaux que vous intégrez à la négociation. Dans 80% des cas, la vente repart.' },
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
            <div className="bg-gradient-to-br from-blue-50 to-slate-50 border-2 border-blue-200 rounded-3xl p-8 md:p-12">
              <Handshake className="text-blue-600 mx-auto mb-4" size={48} />
              <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Notre engagement agence</h2>
              <ul className="space-y-3 text-left max-w-2xl mx-auto mb-8">
                {[
                  'Visite sous 48h ouvrées maximum',
                  'Rapport remis sous 7 jours',
                  'Tarif fixe, pas de surprise — facturé au vendeur ou à l\'acquéreur selon votre choix',
                  'Aucun démarchage de votre vendeur après le rapport',
                  'Discrétion absolue : nous travaillons pour vous, pas contre',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-slate-700">
                    <CheckCircle className="text-emerald-500 mt-0.5 flex-shrink-0" size={20} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl">
                Démarrer le partenariat <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-slate-900 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Une vente à débloquer cette semaine ?</h2>
            <p className="text-xl text-slate-300 mb-8">Appelez-nous, on prend le rendez-vous sous 48h.</p>
            <a href="tel:0582953375" className="inline-flex bg-orange-600 hover:bg-orange-500 text-white px-10 py-5 rounded-xl font-bold text-lg items-center gap-2 shadow-xl">
              <Phone size={20} /> 05 82 95 33 75
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
