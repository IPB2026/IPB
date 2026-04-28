import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { SmartBackBar } from "@/components/ui/SmartBackBar";
import { Footer } from '@/components/home/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Phone, Shield, Clock, FileText, CheckCircle, TrendingUp, Hammer, Euro } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Partenariat Marchands de Biens & Investisseurs Toulouse — Mur Porteur Express | IPB",
  description: "Marchands de biens, investisseurs LMNP, opérateurs colocation : IPB ouvre vos murs porteurs en délai serré pour valoriser un T3 ou T4 toulousain avant revente. Devis 24h, chantier 5 jours, décennale AXA.",
  keywords: [
    'partenaire marchand de biens toulouse',
    'mur porteur investisseur toulouse',
    'ouverture mur porteur express toulouse',
    'rénovation T3 toulouse colocation',
    'valorisation immobilière mur porteur',
    'baie vitrée investisseur toulouse',
    'IPB pro toulouse',
    'partenaire promoteur structure',
  ],
  alternates: { canonical: 'https://www.ipb-expertise.fr/partenaires/marchands-de-biens' },
  openGraph: {
    title: "Partenariat Marchands de Biens — Mur Porteur Express Toulouse | IPB",
    description: "Vous achetez un T3 toulousain pour ouvrir cuisine + salon avant revente ? IPB chiffre en 24h, exécute en 5 jours. Décennale AXA, DOE complet pour l'acheteur final.",
    url: 'https://www.ipb-expertise.fr/partenaires/marchands-de-biens',
    type: 'website',
  },
};

export default function MarchandsDeBiensPage() {
  return (
    <div className="font-sans text-ipb-text bg-ipb-cream antialiased">
      <TopBar />
      <Navbar />
      <SmartBackBar />
      <main id="main-content">
        {/* HERO avec photo chantier */}
        <section className="relative bg-ipb-navy text-white py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-[1.5fr_1fr] gap-10 lg:gap-14 items-center">
              <div>
                <p className="text-ipb-orange-l font-semibold text-xs uppercase tracking-[0.2em] mb-4">
                  Programme pros · Marchands de biens & investisseurs
                </p>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight">
                  Vos T3 des <span className="text-transparent bg-clip-text bg-ipb-orange">Carmes, Saint-Cyprien & Minimes</span>,
                  <span className="block mt-2 text-white">ouverts en 5 jours.</span>
                </h1>
                <p className="text-xl text-white/70 mb-4 leading-relaxed">
                  Vous achetez un appartement à rénover ? On ouvre la cuisine sur le séjour avant la revente. <strong className="text-white">Chiffrage 24h, chantier 5 jours, attestations complètes pour l'acquéreur.</strong>
                </p>
                <p className="text-base text-ipb-light mb-8 leading-relaxed">
                  Notre garantie 10 ans est transmissible : votre acheteur final hérite de la couverture. Aucun frein notarial à la revente, aucun litige post-vente.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/contact" className="bg-ipb-orange hover:bg-orange-400 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-xl hover:-translate-y-0.5 transition-all">
                    Devenir partenaire <ArrowRight size={20} />
                  </Link>
                  <a href="tel:0582953375" className="bg-white/10 backdrop-blur border border-white/20 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-white/15">
                    <Phone size={20} /> 05 82 95 33 75
                  </a>
                </div>
              </div>

              {/* Photo chantier — preuve visuelle */}
              <div className="hidden lg:block relative">
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10">
                  <Image
                    src="/images/baie-coulissante-apres.webp"
                    alt="Baie coulissante installée après ouverture mur porteur — chantier IPB Toulouse pour marchand de biens"
                    fill
                    sizes="(max-width: 1024px) 0px, 400px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-ipb-orange-l text-xs font-bold uppercase tracking-wider mb-2">Chantier livré</p>
                    <p className="text-white font-display font-bold text-2xl leading-tight">T3 Saint-Cyprien</p>
                    <p className="text-white/70 text-sm mt-1">5 jours · +28 000 € à la revente</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* La promesse */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-extrabold text-ipb-text text-center mb-4">
              Ce que vous gagnez en travaillant avec IPB
            </h2>
            <p className="text-lg text-ipb-muted text-center mb-12 max-w-3xl mx-auto">
              Les délais et la conformité font la marge. Nous protégeons les deux.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: <Clock className="text-ipb-orange" size={28} />, title: 'Devis sous 24h', desc: 'Vous achetez un bien lundi, nous chiffrons l\'ouverture mardi. Vous calculez votre prix de revente immédiatement.' },
                { icon: <Hammer className="text-amber-600" size={28} />, title: 'Chantier 5 jours max', desc: 'Étaiement, ouverture, pose poutre IPN/HEB, finitions. Nous tenons votre planning de revente.' },
                { icon: <TrendingUp className="text-emerald-600" size={28} />, title: 'Plus-value moyenne +18%', desc: 'Une cuisine ouverte sur séjour valorise un T3 toulousain de 15 à 25%. ROI atteint sur le premier projet.' },
                { icon: <Shield className="text-blue-600" size={28} />, title: 'Décennale → acquéreur', desc: 'L\'attestation décennale AXA est transmissible à l\'acheteur final. Aucun frein notarial à la revente.' },
                { icon: <FileText className="text-purple-600" size={28} />, title: 'Dossier complet pour le notaire', desc: 'Tous les documents prêts pour l\'acte de vente : calcul de la poutre, plans, attestations. Pas de litige possible après la vente.' },
                { icon: <Euro className="text-rose-600" size={28} />, title: 'Tarif volume', desc: 'À partir de 3 chantiers/an, tarif partenaire négocié. Facturation mensuelle si vous le souhaitez.' },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="bg-ipb-cream border border-ipb-rule rounded-2xl p-6">
                  <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-4 shadow-sm">{icon}</div>
                  <h3 className="font-bold text-lg text-ipb-text mb-2">{title}</h3>
                  <p className="text-ipb-muted text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cas typique */}
        <section className="py-16 bg-ipb-cream">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-ipb-text text-center mb-10">
              Cas typique : T3 60 m² aux Minimes
            </h2>

            <div className="bg-white border border-ipb-rule rounded-3xl p-8 md:p-12 shadow-xl">
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <p className="text-sm font-bold text-ipb-muted uppercase mb-2">Avant</p>
                  <p className="text-2xl font-bold text-ipb-text mb-2">T3 cloisonné — 145 000 €</p>
                  <ul className="text-ipb-muted text-sm space-y-1">
                    <li>• Cuisine fermée 8 m²</li>
                    <li>• Salon 18 m²</li>
                    <li>• Sensation d'enfermement</li>
                    <li>• Difficulté à louer/vendre</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-bold text-ipb-orange uppercase mb-2">Après ouverture mur porteur</p>
                  <p className="text-2xl font-bold text-ipb-orange mb-2">T3 lumineux — 178 000 €</p>
                  <ul className="text-ipb-muted text-sm space-y-1">
                    <li>• Cuisine ouverte sur séjour 30 m²</li>
                    <li>• Lumière traversante</li>
                    <li>• Photos qui « cassent » sur Leboncoin</li>
                    <li>• Vente sous 3 semaines</li>
                  </ul>
                </div>
              </div>

              <div className="border-t border-ipb-rule pt-6 grid md:grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-xs text-ipb-muted uppercase font-bold">Coût IPB</p>
                  <p className="text-xl font-extrabold text-ipb-text">7 200 € TTC</p>
                </div>
                <div>
                  <p className="text-xs text-ipb-muted uppercase font-bold">Plus-value</p>
                  <p className="text-xl font-extrabold text-emerald-600">+33 000 €</p>
                </div>
                <div>
                  <p className="text-xs text-ipb-muted uppercase font-bold">Marge nette</p>
                  <p className="text-xl font-extrabold text-ipb-orange">+25 800 €</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-ipb-orange text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Un bien acheté ? Chiffrage sous 24h.</h2>
            <p className="text-xl text-ipb-orange-l mb-8">Envoyez-nous l'adresse + plan, nous revenons avec un devis ferme.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="tel:0582953375" className="bg-white text-ipb-orange px-10 py-5 rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-xl">
                <Phone size={20} /> 05 82 95 33 75
              </a>
              <Link href="/contact" className="bg-orange-700 hover:bg-orange-800 px-10 py-5 rounded-xl font-bold text-lg flex items-center justify-center gap-2">
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
