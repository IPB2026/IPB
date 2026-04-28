import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { SmartBackBar } from "@/components/ui/SmartBackBar";
import { Footer } from '@/components/home/Footer';
import { CloudRain, ArrowRight, Phone, AlertTriangle, CheckCircle, Droplets, Home, Wind } from 'lucide-react';

// 🎯 TRIGGER EVENT: À publier en automne (Septembre-Novembre)
// Pertinent : Retour des pluies, saison des infiltrations

export const metadata: Metadata = {
  title: 'Infiltrations Automne/Hiver : Diagnostic et Solutions | IPB Expertise',
  description: 'Retour des pluies : comment détecter et traiter les infiltrations d\'eau. Toiture, façade, fenêtres. Expert humidité Toulouse.',
  keywords: ['infiltration eau', 'infiltration toiture', 'infiltration façade', 'humidité automne', 'fuite toiture'],
  alternates: {
    canonical: 'https://www.ipb-expertise.fr/actualites/infiltrations-automne-hiver',
  },
  openGraph: {
    title: 'Infiltrations Automne/Hiver : Diagnostic et Solutions',
    description: 'Comment détecter et traiter les infiltrations d\'eau en automne et hiver. Guide expert IPB.',
    url: 'https://www.ipb-expertise.fr/actualites/infiltrations-automne-hiver',
    type: 'article',
  },
};

const sourcesInfiltration = [
  {
    icon: Home,
    titre: "Toiture",
    signes: ["Taches au plafond", "Gouttes d'eau après pluie", "Auréoles brunes"],
    causes: "Tuiles cassées, solin défectueux, gouttières bouchées",
    urgence: "haute"
  },
  {
    icon: Wind,
    titre: "Façade",
    signes: ["Taches sur murs extérieurs", "Humidité côté exposé au vent", "Enduit fissuré"],
    causes: "Fissures, joints usés, enduit poreux",
    urgence: "moyenne"
  },
  {
    icon: Droplets,
    titre: "Fenêtres",
    signes: ["Eau sous les fenêtres", "Joints noircis", "Moisissures autour"],
    causes: "Joints défectueux, rejingot mal posé, défaut d'étanchéité",
    urgence: "moyenne"
  }
];

const checklistAutomne = [
  { action: "Nettoyer les gouttières", frequence: "Avant l'automne" },
  { action: "Vérifier les tuiles/ardoises", frequence: "Annuel" },
  { action: "Contrôler les joints de fenêtres", frequence: "Annuel" },
  { action: "Inspecter les solins et faîtages", frequence: "Après tempête" },
  { action: "Vérifier l'évacuation des eaux pluviales", frequence: "Mensuel en saison" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Infiltrations Automne/Hiver : Diagnostic et Solutions",
  "datePublished": "2025-09-15",
  "dateModified": "2026-02-10",
  "author": { "@type": "Organization", "name": "IPB Expertise" },
  "publisher": {
    "@type": "Organization",
    "name": "IPB - Institut de Pathologie du Bâtiment",
    "logo": { "@type": "ImageObject", "url": "https://www.ipb-expertise.fr/images/IPB_Logo_HD.png" }
  }
};

export default function InfiltrationsAutomnePage() {
  return (
    <div className="font-sans text-ipb-text bg-ipb-cream antialiased">
      <Script id="article-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      <TopBar />
      <Navbar />
      <SmartBackBar />

      {/* Alerte saison */}
      <div className="bg-gradient-to-r from-blue-600 to-slate-700 text-white py-3">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-3">
          <CloudRain size={20} />
          <span className="font-bold">🌧️ Saison des pluies : Vérifiez l'étanchéité de votre maison</span>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-800 to-blue-900 text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-2 text-blue-300 text-sm font-bold mb-4">
            <CloudRain size={18} />
            <span>Actualité Automne/Hiver</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
            Infiltrations d'Eau : <br/>
            <span className="text-blue-300">Diagnostic et Solutions</span>
          </h1>
          <p className="text-xl text-white/70 mb-8">
            Le retour des pluies révèle souvent des problèmes d'étanchéité. 
            Toiture, façade, fenêtres : comment identifier la source et agir vite.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/diagnostic" className="bg-blue-500 hover:bg-blue-400 px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2">
              Diagnostic infiltration <ArrowRight size={18} />
            </Link>
            <a href="tel:0582953375" className="bg-white/10 border border-white/20 px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2">
              <Phone size={18} /> 05 82 95 33 75
            </a>
          </div>
        </div>
      </section>

      {/* Pourquoi l'automne */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-ipb-text mb-8 text-center">
            Pourquoi les infiltrations apparaissent-elles en automne ?
          </h2>
          <div className="prose prose-lg max-w-none">
            <p>
              Après un été sec, les premiers épisodes pluvieux d'automne mettent à rude épreuve 
              l'étanchéité de votre maison. Les matériaux ont travaillé avec la chaleur, les joints 
              ont pu se fissurer, et les dégâts invisibles en été se révèlent avec l'eau.
            </p>
            <p>
              De plus, les pluies d'automne/hiver sont souvent accompagnées de <strong>vent</strong>, 
              qui pousse l'eau dans des endroits normalement protégés.
            </p>
          </div>

          <div className="mt-8 p-6 bg-blue-50 border-l-4 border-blue-500 rounded-r-xl">
            <h3 className="font-bold text-blue-900 mb-2">💡 Le saviez-vous ?</h3>
            <p className="text-blue-800">
              Une infiltration non traitée peut causer jusqu'à <strong>10 000€ de dégâts</strong> 
              en quelques mois : moisissures, dégradation de l'isolation, problèmes électriques...
            </p>
          </div>
        </div>
      </section>

      {/* Sources d'infiltration */}
      <section className="py-16 bg-ipb-stone">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-ipb-text mb-8 text-center">
            Les 3 sources principales d'infiltration
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {sourcesInfiltration.map((source, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-ipb-rule">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    source.urgence === 'haute' ? 'bg-red-100' : 'bg-amber-100'
                  }`}>
                    <source.icon className={source.urgence === 'haute' ? 'text-red-600' : 'text-amber-600'} size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-ipb-text">{source.titre}</h3>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                      source.urgence === 'haute' 
                        ? 'bg-red-100 text-red-700' 
                        : 'bg-amber-100 text-amber-700'
                    }`}>
                      Urgence {source.urgence}
                    </span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm font-bold text-ipb-text mb-2">Signes révélateurs :</p>
                  <ul className="space-y-1">
                    {source.signes.map((signe, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-ipb-muted">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                        {signe}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-ipb-rule">
                  <p className="text-sm text-ipb-muted">
                    <strong>Causes :</strong> {source.causes}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Checklist */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-ipb-text mb-8 text-center">
            ✅ Checklist prévention automne
          </h2>
          <div className="bg-ipb-cream rounded-2xl p-8 border border-ipb-rule">
            <div className="space-y-4">
              {checklistAutomne.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-white rounded-xl border border-ipb-rule">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 border-2 border-blue-500 rounded flex items-center justify-center">
                      <CheckCircle className="text-blue-500" size={14} />
                    </div>
                    <span className="font-medium text-ipb-text">{item.action}</span>
                  </div>
                  <span className="text-sm text-ipb-muted">{item.frequence}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Différencier infiltration / condensation */}
      <section className="py-16 bg-ipb-stone">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-ipb-text mb-8 text-center">
            Infiltration ou condensation ?
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 rounded-2xl p-6 border-2 border-blue-200">
              <div className="flex items-center gap-3 mb-4">
                <CloudRain className="text-blue-600" size={28} />
                <h3 className="text-xl font-bold text-ipb-text">Infiltration</h3>
              </div>
              <ul className="space-y-2 text-ipb-text">
                <li>• Apparaît <strong>pendant ou après</strong> la pluie</li>
                <li>• Taches localisées, souvent en haut des murs</li>
                <li>• Peut ruisseler ou former des gouttes</li>
                <li>• Source identifiable (toiture, façade)</li>
              </ul>
            </div>
            <div className="bg-ipb-cream rounded-2xl p-6 border-2 border-ipb-rule">
              <div className="flex items-center gap-3 mb-4">
                <Droplets className="text-ipb-muted" size={28} />
                <h3 className="text-xl font-bold text-ipb-text">Condensation</h3>
              </div>
              <ul className="space-y-2 text-ipb-text">
                <li>• Présente <strong>en permanence</strong>, surtout en hiver</li>
                <li>• Buée sur les vitres, angles humides</li>
                <li>• Moisissures noires superficielles</li>
                <li>• Liée au manque de ventilation</li>
              </ul>
            </div>
          </div>
          <div className="mt-6 text-center">
            <Link href="/condensation-ou-infiltration" className="text-blue-600 font-bold hover:underline">
              En savoir plus : Condensation vs Infiltration →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA milieu */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-slate-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold mb-6">Une infiltration chez vous ?</h2>
          <p className="text-xl text-blue-100 mb-8">
            N'attendez pas que les dégâts s'aggravent. Diagnostic sous 48h pour identifier la source.
          </p>
          <Link href="/diagnostic" className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50">
            Demander un diagnostic <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Solutions */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-ipb-text mb-8 text-center">
            Nos solutions anti-infiltration
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-ipb-cream rounded-xl p-6 border border-ipb-rule">
              <h3 className="font-bold text-ipb-text mb-3">🏠 Toiture</h3>
              <ul className="space-y-2 text-ipb-muted text-sm">
                <li>• Réparation de tuiles/ardoises</li>
                <li>• Réfection de solins et faîtages</li>
                <li>• Nettoyage et réparation gouttières</li>
              </ul>
            </div>
            <div className="bg-ipb-cream rounded-xl p-6 border border-ipb-rule">
              <h3 className="font-bold text-ipb-text mb-3">🧱 Façade</h3>
              <ul className="space-y-2 text-ipb-muted text-sm">
                <li>• Traitement des fissures</li>
                <li>• Hydrofugation de façade</li>
                <li>• Réfection des joints</li>
              </ul>
            </div>
            <div className="bg-ipb-cream rounded-xl p-6 border border-ipb-rule">
              <h3 className="font-bold text-ipb-text mb-3">🪟 Menuiseries</h3>
              <ul className="space-y-2 text-ipb-muted text-sm">
                <li>• Remplacement de joints</li>
                <li>• Réglage des ouvrants</li>
                <li>• Reprise d'étanchéité</li>
              </ul>
            </div>
            <div className="bg-ipb-cream rounded-xl p-6 border border-ipb-rule">
              <h3 className="font-bold text-ipb-text mb-3">🏚️ Terrasse</h3>
              <ul className="space-y-2 text-ipb-muted text-sm">
                <li>• Réfection membrane d'étanchéité</li>
                <li>• Traitement des joints</li>
                <li>• Contrôle des évacuations</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Liens connexes */}
      <section className="py-16 bg-ipb-stone">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-ipb-text mb-8 text-center">
            Articles connexes
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/expert-humidite-toulouse-31" className="bg-white rounded-xl p-6 shadow-lg border border-ipb-rule hover:border-blue-200 transition-all group">
              <h3 className="font-bold text-ipb-text group-hover:text-blue-600 mb-2">
                💧 Expert humidité Toulouse
              </h3>
              <p className="text-ipb-muted text-sm">Tous les problèmes d'humidité et leurs solutions</p>
            </Link>
            <Link href="/condensation-ou-infiltration" className="bg-white rounded-xl p-6 shadow-lg border border-ipb-rule hover:border-blue-200 transition-all group">
              <h3 className="font-bold text-ipb-text group-hover:text-blue-600 mb-2">
                🌧️ Condensation ou infiltration ?
              </h3>
              <p className="text-ipb-muted text-sm">Comment différencier ces deux problèmes</p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-16 bg-ipb-navy text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold mb-6">L'humidité s'invite chez vous ?</h2>
          <p className="text-xl text-white/70 mb-8">
            Diagnostic sous 48h pour identifier la source et proposer la bonne solution.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/diagnostic" className="bg-blue-600 hover:bg-blue-500 px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2">
              Diagnostic infiltration <ArrowRight size={20} />
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
