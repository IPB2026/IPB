import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { Footer } from '@/components/home/Footer';
import { Sun, ArrowRight, Phone, AlertTriangle, CheckCircle, Thermometer, Droplets } from 'lucide-react';

// 🎯 TRIGGER EVENT: À publier lors des alertes canicule
// Pertinent : Juin à Septembre, lors des vagues de chaleur

export const metadata: Metadata = {
  title: 'Canicule 2026 : Comment Protéger sa Maison des Fissures | IPB Expertise',
  description: 'Canicule et sécheresse : risques pour votre maison (fissures, RGA). Gestes préventifs et signes d\'alerte. Expert Toulouse.',
  keywords: ['canicule fissures', 'sécheresse maison', 'RGA', 'retrait gonflement argiles', 'protéger maison canicule'],
  alternates: {
    canonical: 'https://www.ipb-expertise.fr/actualites/canicule-proteger-maison',
  },
};

const gestesPreventifs = [
  {
    icon: Droplets,
    titre: "Arroser les fondations",
    description: "Maintenez une humidité constante autour des fondations. Arrosez légèrement le long des murs (pas directement contre).",
    quand: "Tous les 2-3 jours en période de canicule"
  },
  {
    icon: Sun,
    titre: "Élaguer les arbres proches",
    description: "Les arbres assèchent le sol en captant l'eau. Gardez une distance d'au moins 5m entre arbres et fondations.",
    quand: "Préventivement, avant l'été"
  },
  {
    icon: Thermometer,
    titre: "Surveiller les fissures existantes",
    description: "Posez des témoins (plâtre ou scotch) sur les fissures pour détecter toute évolution.",
    quand: "Vérification hebdomadaire"
  }
];

const signesAlerte = [
  "Nouvelles fissures sur les murs extérieurs",
  "Fissures existantes qui s'élargissent",
  "Portes et fenêtres qui coincent",
  "Carrelage qui se décolle ou se fissure",
  "Décollements entre plinthes et murs",
  "Craquements inhabituels dans la maison"
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Canicule 2026 : Comment Protéger sa Maison des Fissures",
  "datePublished": "2026-06-15",
  "dateModified": new Date().toISOString(),
  "author": { "@type": "Organization", "name": "IPB Expertise" },
  "publisher": {
    "@type": "Organization",
    "name": "IPB - Institut de Pathologie du Bâtiment",
    "logo": { "@type": "ImageObject", "url": "https://www.ipb-expertise.fr/images/IPB_Logo_HD.png" }
  }
};

export default function CaniculeProtegerMaisonPage() {
  return (
    <div className="font-sans text-slate-800 bg-slate-50 antialiased">
      <Script id="article-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      <TopBar />
      <Navbar />

      {/* Alerte canicule */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-3">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-3">
          <Sun size={20} />
          <span className="font-bold">🌡️ Alerte Canicule : Protégez votre maison du risque de fissures</span>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-orange-900 to-red-900 text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-2 text-orange-300 text-sm font-bold mb-4">
            <Thermometer size={18} />
            <span>Actualité Canicule 2026</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
            Canicule : Comment Protéger <br/>
            <span className="text-orange-300">Votre Maison des Fissures</span>
          </h1>
          <p className="text-xl text-orange-100 mb-8">
            Les fortes chaleurs et la sécheresse font souffrir les sols argileux. 
            Votre maison peut se fissurer en quelques semaines. Voici comment réagir.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/diagnostic" className="bg-white text-orange-700 hover:bg-orange-50 px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2">
              Faire vérifier ma maison <ArrowRight size={18} />
            </Link>
            <a href="tel:0582953375" className="bg-white/10 border border-white/20 px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2">
              <Phone size={18} /> 05 82 95 33 75
            </a>
          </div>
        </div>
      </section>

      {/* Explication RGA */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-8 text-center">
            Pourquoi la canicule fissure les maisons ?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sun className="text-amber-600" size={32} />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">1. Le sol sèche</h3>
              <p className="text-slate-600 text-sm">
                Les argiles perdent leur eau et se rétractent, créant des vides sous les fondations.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="text-red-600" size={32} />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">2. Tassement différentiel</h3>
              <p className="text-slate-600 text-sm">
                Certaines parties de la maison s'enfoncent plus que d'autres.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🏠</span>
              </div>
              <h3 className="font-bold text-slate-900 mb-2">3. Fissures apparaissent</h3>
              <p className="text-slate-600 text-sm">
                Les murs subissent des contraintes et se fissurent, souvent en diagonale.
              </p>
            </div>
          </div>

          <div className="mt-12 p-6 bg-red-50 border-l-4 border-red-500 rounded-r-xl">
            <h3 className="font-bold text-red-900 mb-2">⚠️ Haute-Garonne : zone à risque majeur</h3>
            <p className="text-red-800">
              Plus de <strong>60% des sols de Haute-Garonne</strong> sont argileux. Depuis 2018, plus de 200 communes 
              ont été reconnues en état de catastrophe naturelle sécheresse.
            </p>
          </div>
        </div>
      </section>

      {/* Gestes préventifs */}
      <section className="py-16 bg-slate-100">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-8 text-center">
            3 gestes pour protéger votre maison
          </h2>
          <div className="space-y-6">
            {gestesPreventifs.map((geste, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center">
                    <geste.icon className="text-orange-600" size={28} />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg mb-2">{geste.titre}</h3>
                  <p className="text-slate-600 mb-2">{geste.description}</p>
                  <p className="text-sm text-orange-600 font-medium">📅 {geste.quand}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Signes d'alerte */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-8 text-center">
            Signes d'alerte à surveiller
          </h2>
          <div className="bg-amber-50 rounded-2xl p-8 border border-amber-200">
            <p className="text-amber-800 mb-6">
              Si vous observez un ou plusieurs de ces signes, faites intervenir un expert rapidement :
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {signesAlerte.map((signe, index) => (
                <div key={index} className="flex items-start gap-3">
                  <AlertTriangle className="text-amber-600 flex-shrink-0 mt-0.5" size={18} />
                  <span className="text-slate-700">{signe}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA milieu */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold mb-6">Votre maison montre des signes de fatigue ?</h2>
          <p className="text-xl text-orange-100 mb-8">
            Mieux vaut prévenir que guérir. Un diagnostic précoce peut vous faire économiser des milliers d'euros.
          </p>
          <Link href="/diagnostic" className="inline-flex items-center gap-2 bg-white text-orange-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-orange-50">
            Demander un diagnostic <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Après la canicule */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-8 text-center">
            Et après la canicule ?
          </h2>
          <div className="prose prose-lg max-w-none">
            <p>
              La fin de la canicule ne signifie pas la fin des risques. Au contraire, les 
              <strong> premières pluies d'automne</strong> peuvent aggraver la situation : le sol se regonfle 
              de manière inégale, créant de nouvelles contraintes sur les fondations.
            </p>
            <p>
              Si votre commune est reconnue en <strong>catastrophe naturelle sécheresse</strong>, 
              vous pouvez demander une indemnisation à votre assurance. Nous vous accompagnons 
              dans ces démarches.
            </p>
          </div>

          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <Link href="/fissure-secheresse-indemnisation" className="bg-white rounded-xl p-6 shadow-lg border border-slate-200 hover:border-orange-200 transition-all group">
              <h3 className="font-bold text-slate-900 group-hover:text-orange-600 mb-2">
                📋 Indemnisation CAT-NAT
              </h3>
              <p className="text-slate-600 text-sm">Comment être indemnisé après une sécheresse</p>
            </Link>
            <Link href="/expert-fissures-toulouse-31" className="bg-white rounded-xl p-6 shadow-lg border border-slate-200 hover:border-orange-200 transition-all group">
              <h3 className="font-bold text-slate-900 group-hover:text-orange-600 mb-2">
                🔍 Expert fissures Toulouse
              </h3>
              <p className="text-slate-600 text-sm">Diagnostic et solutions pour vos fissures</p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold mb-6">Questions sur votre maison ?</h2>
          <p className="text-xl text-slate-300 mb-8">
            Notre équipe est disponible pour répondre à vos questions et intervenir rapidement.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/diagnostic" className="bg-orange-600 hover:bg-orange-500 px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2">
              Diagnostic fissures <ArrowRight size={20} />
            </Link>
            <a href="tel:0582953375" className="bg-white/10 border border-white/20 hover:bg-white/20 px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2">
              <Phone size={20} /> 05 82 95 33 75
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
