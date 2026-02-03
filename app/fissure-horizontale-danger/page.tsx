import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { Footer } from '@/components/home/Footer';
import { AlertTriangle, ArrowRight, Phone } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Fissure Horizontale : Causes, Dangers et Réparation | IPB Expertise',
  description: 'Fissure horizontale sur votre mur ? Signe de poussée latérale ou désolidarisation. Causes, gravité et solutions. Expert Toulouse →',
  keywords: ['fissure horizontale', 'fissure horizontale mur', 'poussée latérale', 'désolidarisation plancher'],
  alternates: {
    canonical: 'https://www.ipb-expertise.fr/fissure-horizontale-danger',
  },
};

const faqItems = [
  {
    question: "Une fissure horizontale est-elle dangereuse ?",
    answer: "Oui, une fissure horizontale peut indiquer une poussée latérale (sol qui pousse le mur) ou une désolidarisation entre plancher et mur. C'est souvent plus grave qu'une fissure verticale."
  },
  {
    question: "Pourquoi la fissure est-elle horizontale et non verticale ?",
    answer: "Une fissure horizontale suit généralement une ligne de faiblesse (jonction plancher/mur) ou indique une contrainte de flexion latérale, contrairement aux fissures verticales dues au tassement."
  },
  {
    question: "Comment réparer une fissure horizontale ?",
    answer: "La réparation dépend de la cause. Si c'est une poussée latérale, il faut stabiliser le sol ou renforcer le mur. Si c'est une désolidarisation, l'agrafage peut suffire."
  }
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqItems.map(item => ({
    "@type": "Question",
    "name": item.question,
    "acceptedAnswer": { "@type": "Answer", "text": item.answer }
  }))
};

export default function FissureHorizontalePage() {
  return (
    <div className="font-sans text-slate-800 bg-slate-50 antialiased">
      <Script id="faq-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      
      <TopBar />
      <Navbar />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200 py-3">
        <div className="max-w-7xl mx-auto px-4 text-sm text-slate-600">
          <Link href="/" className="hover:text-orange-600">Accueil</Link>
          <span className="mx-2">›</span>
          <Link href="/expert-fissures-toulouse-31" className="hover:text-orange-600">Expert Fissures</Link>
          <span className="mx-2">›</span>
          <span className="text-slate-900">Fissure horizontale</span>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-red-400 text-sm font-bold mb-4">
            <AlertTriangle size={18} />
            <span>Fissure à risque</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
            Fissure Horizontale : Causes et Dangers
          </h1>
          <p className="text-xl text-slate-300 mb-8">
            Une fissure horizontale est souvent plus préoccupante qu'une fissure verticale. 
            Elle peut indiquer une poussée latérale du sol ou une désolidarisation structurelle.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/diagnostic" className="bg-orange-600 hover:bg-orange-500 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2">
              Diagnostic gratuit <ArrowRight size={18} />
            </Link>
            <a href="tel:0582953375" className="bg-white/10 border border-white/20 px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2">
              <Phone size={18} /> 05 82 95 33 75
            </a>
          </div>
        </div>
      </section>

      {/* Contenu */}
      <article className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2>Qu'est-ce qu'une fissure horizontale ?</h2>
            <p>
              Une <strong>fissure horizontale</strong> traverse le mur parallèlement au sol. Contrairement aux fissures 
              verticales ou en escalier (liées au tassement), elle indique généralement une contrainte de <strong>flexion</strong> 
              ou une <strong>poussée latérale</strong>.
            </p>

            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl my-8 not-prose">
              <div className="flex items-start gap-3">
                <AlertTriangle className="text-red-600 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">⚠️ Attention</h3>
                  <p className="text-slate-700">
                    Une fissure horizontale qui s'élargit ou s'accompagne d'un bombement du mur est une 
                    <strong> urgence structurelle</strong>. Le mur peut s'effondrer.
                  </p>
                </div>
              </div>
            </div>

            <h2>Les causes d'une fissure horizontale</h2>
            
            <h3>1. Poussée latérale du sol (cause principale)</h3>
            <p>
              Quand le sol argileux gonfle (après de fortes pluies), il pousse latéralement contre les murs enterrés. 
              Cette pression crée une fissure horizontale, généralement au niveau du plancher bas ou à mi-hauteur du mur.
            </p>

            <h3>2. Désolidarisation plancher/mur</h3>
            <p>
              La fissure apparaît à la jonction entre le plancher (ou la dalle) et le mur. Elle indique que ces deux 
              éléments ne travaillent plus ensemble, souvent à cause d'un mouvement de fondation.
            </p>

            <h3>3. Charge excessive en partie haute</h3>
            <p>
              Un poids trop important sur le mur (toiture surchargée, extension mal calculée) peut créer une 
              flexion et générer des fissures horizontales.
            </p>

            <h3>4. Corrosion des armatures (béton armé)</h3>
            <p>
              Dans les constructions en béton armé, la rouille fait gonfler les armatures. Cette expansion 
              crée des fissures horizontales le long des fers.
            </p>

            <h2>Comment évaluer la gravité ?</h2>
            
            <div className="bg-slate-100 rounded-2xl p-6 my-8 not-prose">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Critères d'alerte</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <span className="text-red-500 text-2xl">🔴</span>
                  <span><strong>Très grave :</strong> Mur bombé, fissure &gt; 5mm, évolution rapide</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-orange-500 text-2xl">🟠</span>
                  <span><strong>Grave :</strong> Fissure traversante 2-5mm, stable mais longue</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-yellow-500 text-2xl">🟡</span>
                  <span><strong>Modérée :</strong> Fissure 1-2mm, jonction plancher/mur uniquement</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-green-500 text-2xl">🟢</span>
                  <span><strong>Faible :</strong> Microfissure &lt; 1mm, enduit uniquement</span>
                </li>
              </ul>
            </div>

            <h2>Solutions de réparation</h2>

            <h3>Contre la poussée latérale</h3>
            <ul>
              <li><strong>Drainage périphérique</strong> pour évacuer l'eau et réduire le gonflement du sol</li>
              <li><strong>Tirants d'ancrage</strong> pour maintenir le mur contre la poussée</li>
              <li><strong>Injection de résine expansive</strong> pour stabiliser le sol</li>
            </ul>

            <h3>Contre la désolidarisation</h3>
            <ul>
              <li><strong>Agrafage structurel</strong> pour recoudre la jonction</li>
              <li><strong>Harpage</strong> pour solidariser mur et plancher</li>
            </ul>

            <h3>Coûts indicatifs</h3>
            <ul>
              <li>Drainage périphérique : 5 000 - 15 000€</li>
              <li>Tirants d'ancrage : 10 000 - 25 000€</li>
              <li>Agrafage : 8 000 - 15 000€</li>
            </ul>
          </div>

          {/* Lien vers le HUB */}
          <div className="mt-12 p-8 bg-orange-50 border-2 border-orange-200 rounded-2xl">
            <h3 className="text-xl font-bold text-slate-900 mb-4">📚 En savoir plus</h3>
            <p className="text-slate-600 mb-4">
              Consultez notre guide complet sur les fissures : types, causes, solutions et tarifs.
            </p>
            <Link href="/expert-fissures-toulouse-31" className="inline-flex items-center gap-2 text-orange-600 font-bold hover:text-orange-700">
              Guide Expert Fissures Toulouse <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </article>

      {/* FAQ */}
      <section className="py-16 bg-slate-100">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-8 text-center">Questions fréquentes</h2>
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <details key={index} className="bg-white rounded-xl shadow-sm border border-slate-200 group">
                <summary className="p-6 cursor-pointer font-bold text-slate-900 flex items-center justify-between">
                  {item.question}
                  <span className="text-orange-600 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="px-6 pb-6 text-slate-600">{item.answer}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-orange-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold mb-6">Fissure horizontale chez vous ?</h2>
          <p className="text-xl text-orange-100 mb-8">N'attendez pas que le mur s'aggrave. Diagnostic expert sous 48h.</p>
          <Link href="/diagnostic" className="inline-flex items-center gap-2 bg-white text-orange-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-orange-50">
            Demander un diagnostic <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
