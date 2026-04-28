import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { Footer } from '@/components/home/Footer';
import Link from 'next/link';
import { ArrowRight, Phone, Palette, Building2, Home, Shield, Award, Clock } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Partenaires Pros — Architectes, Marchands de Biens, Agences Immobilières | IPB Toulouse",
  description: "IPB est le partenaire structure des pros toulousains : architectes d'intérieur, marchands de biens, agences immobilières. Bureau d'études + travaux, décennale AXA, devis 24h.",
  keywords: ['partenaires pro IPB', 'partenariat structure toulouse', 'sous-traitance bureau études', 'architecte d intérieur partenaire', 'marchand de biens partenaire'],
  alternates: { canonical: 'https://www.ipb-expertise.fr/partenaires' },
};

const partenaires = [
  {
    href: '/partenaires/architectes-interieur',
    icon: <Palette className="text-purple-600" size={32} />,
    iconBg: 'bg-purple-50',
    title: 'Architectes d\'intérieur & décorateurs',
    desc: 'Vos projets « espace ouvert » nécessitent une étude structure et une décennale. Nous sommes votre partenaire technique sous-traité ou co-traitant.',
    bullets: ['Co-traitance ou sous-traitance', 'Note de calcul opposable', 'Tarif partenaire dès 3 projets/an'],
  },
  {
    href: '/partenaires/marchands-de-biens',
    icon: <Building2 className="text-emerald-600" size={32} />,
    iconBg: 'bg-emerald-50',
    title: 'Marchands de biens & investisseurs',
    desc: 'Vous achetez un T3 dans les Carmes, Saint-Cyprien ou Minimes pour ouvrir cuisine + salon avant revente ? Chiffrage 24h, chantier 5 jours, DOE complet.',
    bullets: ['Devis sous 24h', 'Chantier 5 jours max', 'Décennale transmissible à l\'acheteur'],
  },
  {
    href: '/partenaires/agences-immobilieres',
    icon: <Home className="text-blue-600" size={32} />,
    iconBg: 'bg-blue-50',
    title: 'Agences immobilières & mandataires',
    desc: 'Une vente bloquée par une fissure inquiétante ou un mur porteur à valider ? Notre rapport sous 7 jours débloque la transaction.',
    bullets: ['Visite sous 48h', 'Rapport opposable sous 7 jours', 'Discrétion totale'],
  },
];

export default function PartenairesPage() {
  return (
    <div className="font-sans text-slate-800 bg-slate-50 antialiased">
      <TopBar />
      <Navbar />
      <main id="main-content">
        <section className="bg-slate-900 text-white py-16 md:py-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-orange-300 font-semibold text-xs uppercase tracking-[0.2em] mb-4">
              Programme partenaires pros
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6">
              Le partenaire <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">structure</span> des pros toulousains
            </h1>
            <p className="text-xl text-slate-300 mb-4 max-w-3xl mx-auto">
              Bureau d'études intégré, décennale AXA active, équipes travaux internes. Trois programmes adaptés à votre métier.
            </p>
            <div className="flex justify-center gap-6 mt-8 flex-wrap text-sm">
              <span className="flex items-center gap-2 text-slate-300"><Shield size={16} className="text-blue-400" /> Décennale AXA</span>
              <span className="flex items-center gap-2 text-slate-300"><Award size={16} className="text-amber-400" /> 850+ chantiers</span>
              <span className="flex items-center gap-2 text-slate-300"><Clock size={16} className="text-emerald-400" /> Devis sous 24h</span>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-slate-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8">
              {partenaires.map((p) => (
                <Link key={p.href} href={p.href} className="group bg-white border-2 border-slate-200 hover:border-orange-300 rounded-3xl p-8 transition-all hover:shadow-2xl hover:-translate-y-1 flex flex-col">
                  <div className={`w-16 h-16 ${p.iconBg} rounded-2xl flex items-center justify-center mb-5`}>
                    {p.icon}
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-orange-600">{p.title}</h2>
                  <p className="text-slate-600 mb-5 leading-relaxed flex-1">{p.desc}</p>
                  <ul className="space-y-2 mb-6 text-sm text-slate-700">
                    {p.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2"><span className="text-orange-500 font-bold mt-0.5">✓</span> {b}</li>
                    ))}
                  </ul>
                  <span className="inline-flex items-center gap-2 text-orange-600 font-bold group-hover:gap-3 transition-all">
                    Découvrir le programme <ArrowRight size={18} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Vous ne savez pas dans quelle catégorie vous êtes ?</h2>
            <p className="text-slate-600 mb-8">Appelez-nous, on adapte notre offre à votre métier — promoteur, contractant général, syndic, expert d'assurance, notaire.</p>
            <a href="tel:0582953375" className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white px-8 py-4 rounded-xl font-bold text-lg">
              <Phone size={20} /> 05 82 95 33 75
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
