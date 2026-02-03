import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { Footer } from '@/components/home/Footer';
import { CheckCircle, Phone, ArrowRight, Home, AlertTriangle, Shield, FileText, Search } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Expertise Avant Achat Immobilier Toulouse | Évitez les Vices Cachés | IPB',
  description: 'Expertise immobilière avant achat à Toulouse. Détection fissures, humidité, vices cachés. Rapport sous 48h. Négociez le prix →',
  keywords: ['expertise avant achat toulouse', 'expertise immobilière toulouse', 'vice caché immobilier', 'diagnostic avant achat maison'],
  alternates: {
    canonical: 'https://www.ipb-expertise.fr/expertise-avant-achat-immobilier-toulouse',
  },
  openGraph: {
    title: 'Expertise Avant Achat Immobilier Toulouse | IPB Expertise',
    description: 'Évitez les mauvaises surprises. Expertise complète avant achat immobilier.',
    url: 'https://www.ipb-expertise.fr/expertise-avant-achat-immobilier-toulouse',
  },
};

const faqItems = [
  {
    question: "Pourquoi faire une expertise avant d'acheter ?",
    answer: "L'expertise avant achat vous permet de détecter les problèmes cachés (fissures structurelles, humidité, défauts de construction) AVANT de signer. C'est un investissement de 299€ qui peut vous faire économiser des dizaines de milliers d'euros."
  },
  {
    question: "Que comprend l'expertise avant achat ?",
    answer: "Notre expertise inclut : inspection visuelle complète, détection humidité à l'humidimètre, analyse des fissures, vérification toiture/charpente, contrôle des installations, et rapport détaillé avec photos et recommandations."
  },
  {
    question: "Puis-je utiliser le rapport pour négocier ?",
    answer: "Absolument ! Si nous détectons des problèmes, le rapport chiffré vous permet de négocier une baisse du prix ou de demander au vendeur de réaliser les travaux avant la vente."
  },
  {
    question: "Sous quel délai recevrai-je le rapport ?",
    answer: "Vous recevez votre rapport complet sous 48 à 72h après la visite. En cas d'urgence (compromis en cours), nous pouvons accélérer à 24h."
  },
  {
    question: "L'expertise est-elle obligatoire ?",
    answer: "Non, mais fortement recommandée. Les diagnostics obligatoires (DPE, amiante...) ne couvrent pas l'état structurel du bien. Notre expertise complète ces diagnostics."
  }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "IPB - Expertise Avant Achat Immobilier",
  "description": "Expertise immobilière avant achat à Toulouse : détection des vices cachés, fissures, humidité",
  "url": "https://www.ipb-expertise.fr/expertise-avant-achat-immobilier-toulouse",
  "telephone": "+33582953375",
  "priceRange": "€€",
  "areaServed": { "@type": "City", "name": "Toulouse" }
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqItems.map(item => ({
    "@type": "Question",
    "name": item.question,
    "acceptedAnswer": { "@type": "Answer", "text": item.answer }
  }))
};

export default function ExpertiseAvantAchatPage() {
  return (
    <div className="font-sans text-slate-800 bg-slate-50 antialiased">
      <Script id="jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Script id="faq-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      
      <TopBar />
      <Navbar />

      {/* Hero */}
      <section className="relative bg-slate-900 text-white py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950/30"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-full text-sm font-bold mb-6">
              <Home size={18} />
              <span>Expertise immobilière indépendante</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
              Expertise <span className="text-emerald-400">Avant Achat</span> Immobilier
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl">
              Vous achetez une maison à Toulouse ? Ne signez pas avant d'avoir fait inspecter le bien. 
              Détection des vices cachés, fissures, humidité. Rapport complet sous 48h.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/diagnostic" className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all">
                Demander une expertise <ArrowRight size={20} />
              </Link>
              <a href="tel:0582953375" className="bg-white/10 border border-white/20 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all">
                <Phone size={20} /> 05 82 95 33 75
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Pourquoi */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
                Pourquoi une expertise avant achat ?
              </h2>
              <div className="prose prose-lg text-slate-600">
                <p>
                  <strong>80% des litiges immobiliers</strong> concernent des vices cachés découverts après l'achat. 
                  Fissures structurelles, remontées capillaires, problèmes de toiture... Ces défauts ne sont pas 
                  couverts par les diagnostics obligatoires.
                </p>
                <p>
                  Une expertise avant achat de <strong>299€</strong> peut vous éviter des travaux de 
                  <strong> 15 000 à 50 000€</strong> ou vous permettre de négocier une réduction significative du prix.
                </p>
              </div>
              <div className="mt-8 p-6 bg-red-50 border-l-4 border-red-500 rounded-r-xl">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="text-red-600 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="font-bold text-slate-900">Les diagnostics obligatoires ne suffisent pas</h3>
                    <p className="text-slate-600 mt-1">
                      DPE, amiante, plomb... Ces diagnostics ne vérifient pas l'état structurel du bien. 
                      Seule une expertise technique détecte les vrais problèmes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Ce que nous inspectons</h3>
              <div className="space-y-4">
                {[
                  { icon: '🔍', label: 'Fissures structurelles', desc: 'Murs, façades, fondations' },
                  { icon: '💧', label: 'Humidité', desc: 'Remontées capillaires, infiltrations' },
                  { icon: '🏠', label: 'Toiture & charpente', desc: 'État général, infiltrations' },
                  { icon: '⚡', label: 'Installations', desc: 'Électricité, plomberie visible' },
                  { icon: '🧱', label: 'Maçonnerie', desc: 'État des murs, joints, enduits' },
                  { icon: '📋', label: 'Conformité', desc: 'Extensions, modifications' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-3 bg-slate-50 rounded-xl">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <div className="font-bold text-slate-900">{item.label}</div>
                      <div className="text-sm text-slate-600">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tarif */}
      <section className="py-16 md:py-24 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-8">Tarif expertise avant achat</h2>
          <div className="bg-slate-800 rounded-3xl p-10 max-w-md mx-auto">
            <div className="text-6xl font-extrabold text-emerald-400 mb-4">299€</div>
            <div className="text-slate-400 mb-6">TTC - Déplacement inclus</div>
            <ul className="text-left space-y-3 mb-8">
              <li className="flex items-center gap-3"><CheckCircle className="text-emerald-400" size={20} /> Inspection complète sur site</li>
              <li className="flex items-center gap-3"><CheckCircle className="text-emerald-400" size={20} /> Mesures humidité à l'appareil</li>
              <li className="flex items-center gap-3"><CheckCircle className="text-emerald-400" size={20} /> Analyse des fissures</li>
              <li className="flex items-center gap-3"><CheckCircle className="text-emerald-400" size={20} /> Rapport détaillé avec photos</li>
              <li className="flex items-center gap-3"><CheckCircle className="text-emerald-400" size={20} /> Estimation coût des travaux</li>
              <li className="flex items-center gap-3"><CheckCircle className="text-emerald-400" size={20} /> Livraison sous 48-72h</li>
            </ul>
            <Link href="/diagnostic" className="block w-full bg-emerald-600 hover:bg-emerald-500 text-white py-4 rounded-xl font-bold text-lg transition-all">
              Réserver mon expertise
            </Link>
          </div>
        </div>
      </section>

      {/* Processus */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Comment ça marche ?</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Vous nous contactez', desc: 'Envoyez-nous l\'adresse du bien et la date souhaitée' },
              { step: '2', title: 'Visite sur place', desc: 'Notre expert inspecte le bien en 1h30 à 2h' },
              { step: '3', title: 'Rapport détaillé', desc: 'Vous recevez le rapport complet sous 48-72h' },
              { step: '4', title: 'Décision éclairée', desc: 'Achetez en confiance ou négociez le prix' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Questions fréquentes</h2>
          </div>
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <details key={index} className="bg-white rounded-xl shadow-sm border border-slate-200 group">
                <summary className="p-6 cursor-pointer font-bold text-slate-900 flex items-center justify-between">
                  {item.question}
                  <span className="text-emerald-600 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="px-6 pb-6 text-slate-600">{item.answer}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-emerald-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6">Vous achetez bientôt ?</h2>
          <p className="text-xl text-emerald-100 mb-8">Ne prenez pas de risque. Expertise complète en 48h.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/diagnostic" className="bg-white text-emerald-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-emerald-50 transition-all flex items-center justify-center gap-2">
              Réserver mon expertise <ArrowRight size={20} />
            </Link>
            <a href="tel:0582953375" className="bg-emerald-700 hover:bg-emerald-800 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all">
              <Phone size={20} /> 05 82 95 33 75
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
