import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { Footer } from '@/components/home/Footer';
import { ArrowRight, Phone, Droplets, CheckCircle, AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Remontées Capillaires : Causes et Solutions Durables | IPB Expertise',
  description: 'Remontées capillaires dans vos murs ? Causes, signes et traitement par injection de résine. Garantie 30 ans. Expert Toulouse →',
  keywords: ['remontée capillaire', 'humidité ascensionnelle', 'injection résine', 'mur humide', 'traitement humidité'],
  alternates: {
    canonical: 'https://www.ipb-expertise.fr/remontee-capillaire-solution',
  },
};

const faqItems = [
  {
    question: "Comment savoir si j'ai des remontées capillaires ?",
    answer: "Signes révélateurs : humidité au bas des murs (jusqu'à 1,5m), salpêtre, peinture qui cloque, papier peint qui se décolle, odeur de moisi, plinthes qui se décollent."
  },
  {
    question: "Quelle différence avec l'infiltration ?",
    answer: "Les remontées capillaires viennent du sol et touchent le bas des murs. Les infiltrations viennent de l'extérieur (toiture, façade) et peuvent toucher n'importe quelle zone."
  },
  {
    question: "L'injection de résine est-elle efficace ?",
    answer: "Oui, c'est la solution la plus fiable. La résine crée une barrière étanche qui stoppe définitivement les remontées. Garantie 30 ans."
  },
  {
    question: "Combien de temps pour que les murs sèchent ?",
    answer: "Après l'injection, les murs sèchent progressivement sur 6 à 12 mois selon leur épaisseur et l'humidité initiale."
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

export default function RemonteeCapillairePage() {
  return (
    <div className="font-sans text-slate-800 bg-slate-50 antialiased">
      <Script id="faq-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      
      <TopBar />
      <Navbar />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200 py-3">
        <div className="max-w-7xl mx-auto px-4 text-sm text-slate-600">
          <Link href="/" className="hover:text-blue-600">Accueil</Link>
          <span className="mx-2">›</span>
          <Link href="/expert-humidite-toulouse-31" className="hover:text-blue-600">Expert Humidité</Link>
          <span className="mx-2">›</span>
          <span className="text-slate-900">Remontées capillaires</span>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-2 text-blue-400 text-sm font-bold mb-4">
            <Droplets size={18} />
            <span>Humidité ascensionnelle</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
            Remontées Capillaires : Le Guide Complet
          </h1>
          <p className="text-xl text-slate-300 mb-8">
            L'eau du sol remonte dans vos murs par capillarité. Découvrez comment identifier ce phénomène 
            et le stopper définitivement avec une solution garantie 30 ans.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/diagnostic" className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2">
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
        <div className="max-w-4xl mx-auto px-4">
          <div className="prose prose-lg max-w-none">
            <h2>Qu'est-ce que la remontée capillaire ?</h2>
            <p>
              La <strong>remontée capillaire</strong> (ou humidité ascensionnelle) est un phénomène physique : 
              l'eau contenue dans le sol remonte dans les murs par les micro-canaux de la maçonnerie, 
              comme l'eau monte dans une éponge.
            </p>
            <p>
              Ce phénomène peut faire monter l'humidité jusqu'à <strong>1,5 mètre de hauteur</strong>, 
              voire plus dans certains cas. Il touche principalement les maisons anciennes sans coupure 
              de capillarité, mais aussi les constructions récentes sur terrain humide.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-xl my-8 not-prose">
              <h3 className="font-bold text-slate-900 mb-2">📊 Chiffres clés</h3>
              <ul className="text-slate-700 space-y-1">
                <li>• <strong>30%</strong> des maisons anciennes sont touchées</li>
                <li>• Hauteur max : <strong>1,5m</strong> (parfois plus)</li>
                <li>• Évaporation : <strong>15-20 litres/jour</strong> par mètre linéaire</li>
              </ul>
            </div>

            <h2>Comment reconnaître les remontées capillaires ?</h2>

            <div className="bg-slate-100 rounded-2xl p-6 my-8 not-prose">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Signes révélateurs</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="text-amber-500 flex-shrink-0 mt-1" size={20} />
                  <span>Humidité au bas des murs (0 à 1,5m)</span>
                </div>
                <div className="flex items-start gap-3">
                  <AlertTriangle className="text-amber-500 flex-shrink-0 mt-1" size={20} />
                  <span>Salpêtre (dépôts blancs poudreux)</span>
                </div>
                <div className="flex items-start gap-3">
                  <AlertTriangle className="text-amber-500 flex-shrink-0 mt-1" size={20} />
                  <span>Peinture qui cloque et se décolle</span>
                </div>
                <div className="flex items-start gap-3">
                  <AlertTriangle className="text-amber-500 flex-shrink-0 mt-1" size={20} />
                  <span>Papier peint qui se décolle</span>
                </div>
                <div className="flex items-start gap-3">
                  <AlertTriangle className="text-amber-500 flex-shrink-0 mt-1" size={20} />
                  <span>Plinthes qui gondolent</span>
                </div>
                <div className="flex items-start gap-3">
                  <AlertTriangle className="text-amber-500 flex-shrink-0 mt-1" size={20} />
                  <span>Odeur de moisi persistante</span>
                </div>
              </div>
            </div>

            <h2>Les causes des remontées capillaires</h2>
            
            <h3>1. Absence de coupure de capillarité</h3>
            <p>
              Les maisons construites avant 1960 n'ont généralement pas de membrane étanche entre 
              les fondations et les murs. C'est la cause principale.
            </p>

            <h3>2. Sols argileux ou humides</h3>
            <p>
              En Haute-Garonne, les sols argileux retiennent l'eau et alimentent en permanence les 
              remontées capillaires.
            </p>

            <h3>3. Nappe phréatique haute</h3>
            <p>
              Dans certaines zones (bords de Garonne, vallées), la nappe phréatique est proche de 
              la surface, amplifiant le phénomène.
            </p>

            <h3>4. Enduits étanches inadaptés</h3>
            <p>
              Un enduit ciment (imperméable) empêche l'évaporation et concentre l'humidité, 
              aggravant les dégâts en hauteur.
            </p>

            <h2>La solution : l'injection de résine hydrophobe</h2>
            <p>
              C'est la méthode la plus efficace et la plus durable pour traiter les remontées capillaires. 
              Elle crée une barrière étanche au cœur du mur.
            </p>

            <h3>Le processus IPB</h3>
            <ol>
              <li><strong>Diagnostic hygrométrique :</strong> Mesure précise du taux d'humidité</li>
              <li><strong>Forage :</strong> Trous espacés de 10-15cm à la base du mur</li>
              <li><strong>Injection :</strong> Résine silicone ou silane injectée par gravité ou sous pression</li>
              <li><strong>Polymérisation :</strong> La résine se diffuse et crée une barrière étanche</li>
              <li><strong>Séchage :</strong> Les murs s'assèchent en 6-12 mois</li>
            </ol>

            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-xl my-8 not-prose">
              <div className="flex items-start gap-3">
                <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">Garantie 30 ans</h3>
                  <p className="text-slate-700">
                    Notre traitement est garanti 30 ans contre les remontées capillaires. 
                    Si le problème réapparaît, nous intervenons gratuitement.
                  </p>
                </div>
              </div>
            </div>

            <h2>Tarifs traitement remontées capillaires</h2>
            <ul>
              <li><strong>Diagnostic :</strong> 149€ (déductible des travaux)</li>
              <li><strong>Injection résine :</strong> 80-120€/mètre linéaire</li>
              <li><strong>Maison individuelle type :</strong> 2 000 - 5 000€</li>
            </ul>

            <h2>Les fausses solutions à éviter</h2>
            <ul>
              <li>❌ <strong>Peinture anti-humidité :</strong> Ne traite que le symptôme</li>
              <li>❌ <strong>Enduit étanche :</strong> Aggrave le problème</li>
              <li>❌ <strong>Drainage seul :</strong> Inefficace contre la capillarité</li>
              <li>❌ <strong>Assècheurs électroniques :</strong> Efficacité non prouvée</li>
            </ul>
          </div>

          {/* Lien vers le HUB */}
          <div className="mt-12 p-8 bg-blue-50 border-2 border-blue-200 rounded-2xl">
            <h3 className="text-xl font-bold text-slate-900 mb-4">💧 En savoir plus</h3>
            <p className="text-slate-600 mb-4">
              Consultez notre guide complet sur tous les problèmes d'humidité.
            </p>
            <Link href="/expert-humidite-toulouse-31" className="inline-flex items-center gap-2 text-blue-600 font-bold hover:text-blue-700">
              Guide Expert Humidité <ArrowRight size={18} />
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
                  <span className="text-blue-600 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="px-6 pb-6 text-slate-600">{item.answer}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold mb-6">Vos murs sont humides ?</h2>
          <p className="text-xl text-blue-100 mb-8">Diagnostic sous 48h. Solution garantie 30 ans.</p>
          <Link href="/diagnostic" className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50">
            Demander un diagnostic <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
