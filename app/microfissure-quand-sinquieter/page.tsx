import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { Footer } from '@/components/home/Footer';
import { AlertTriangle, ArrowRight, Phone, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Microfissure : Quand s\'inquiéter ? Guide Complet | IPB Expertise',
  description: 'Microfissure sur votre façade ou mur intérieur ? Quand est-ce grave, quand surveiller ? Critères pour distinguer microfissure bénigne et structurelle →',
  keywords: ['microfissure', 'microfissure mur', 'microfissure façade', 'faïençage', 'fissure fine'],
  alternates: {
    canonical: 'https://www.ipb-expertise.fr/microfissure-quand-sinquieter',
  },
};

const faqItems = [
  {
    question: "Une microfissure est-elle grave ?",
    answer: "Pas toujours. Une microfissure superficielle (faïençage) est souvent bénigne. En revanche, si elle s'élargit, traverse le mur ou forme un réseau, elle peut indiquer un problème structurel sous-jacent."
  },
  {
    question: "Comment différencier microfissure et fissure structurelle ?",
    answer: "Une microfissure fait moins de 0,2mm et reste superficielle (enduit). Une fissure structurelle est plus large, traverse le mur et/ou suit les joints de maçonnerie."
  },
  {
    question: "Faut-il réparer les microfissures ?",
    answer: "Les microfissures de faïençage peuvent être laissées ou simplement repeintes. Si elles s'élargissent ou laissent passer l'eau, une expertise est recommandée."
  },
  {
    question: "Les microfissures laissent-elles passer l'eau ?",
    answer: "Pas forcément. Les microfissures très fines (<0,2mm) sont souvent étanches. Au-delà, l'eau peut s'infiltrer et aggraver le problème par cycles gel/dégel."
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

export default function MicrofissurePage() {
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
          <span className="text-slate-900">Microfissure</span>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-2 text-yellow-400 text-sm font-bold mb-4">
            <AlertTriangle size={18} />
            <span>À surveiller</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
            Microfissure : Quand s'inquiéter ?
          </h1>
          <p className="text-xl text-slate-300 mb-8">
            Toutes les microfissures ne sont pas graves. Apprenez à distinguer le simple faïençage 
            d'une fissure évolutive qui nécessite une intervention.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/diagnostic" className="bg-orange-600 hover:bg-orange-500 px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2">
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
            <h2>Qu'est-ce qu'une microfissure ?</h2>
            <p>
              Une <strong>microfissure</strong> est une fissure très fine, généralement inférieure à <strong>0,2 mm</strong> 
              d'ouverture. Elle peut prendre plusieurs formes : ligne isolée, réseau (faïençage), ou craquelures superficielles.
            </p>
            <p>
              Dans 80% des cas, les microfissures sont <strong>bénignes</strong> : elles affectent uniquement l'enduit ou 
              la peinture, sans toucher la structure du mur. Mais certaines peuvent signaler un problème plus profond.
            </p>

            <h2>Les différents types de microfissures</h2>

            <h3>1. Le faïençage (souvent bénin)</h3>
            <p>
              Réseau de microfissures en "toile d'araignée" sur l'enduit. Causé par le retrait de l'enduit lors du séchage 
              ou les variations thermiques. Généralement <strong>esthétique et sans gravité</strong>.
            </p>

            <h3>2. Les microfissures de retrait</h3>
            <p>
              Lignes fines apparaissant dans les premières années après construction. Le béton ou l'enduit se rétracte 
              en séchant. <strong>Bénin si stable</strong>.
            </p>

            <h3>3. Les microfissures structurelles</h3>
            <p>
              Microfissures qui suivent les joints de maçonnerie ou forment un motif en escalier. 
              <strong>À surveiller de près</strong> car elles peuvent évoluer en fissures structurelles.
            </p>

            <div className="bg-slate-100 rounded-2xl p-6 my-8 not-prose">
              <h3 className="text-xl font-bold text-slate-900 mb-4">🔍 Auto-diagnostic : ma microfissure est-elle grave ?</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-green-600 mb-2">✅ Probablement bénin</h4>
                  <ul className="space-y-2 text-slate-600 text-sm">
                    <li className="flex items-start gap-2"><CheckCircle size={16} className="text-green-500 mt-0.5" /> Réseau aléatoire (faïençage)</li>
                    <li className="flex items-start gap-2"><CheckCircle size={16} className="text-green-500 mt-0.5" /> Ouverture &lt; 0,2mm</li>
                    <li className="flex items-start gap-2"><CheckCircle size={16} className="text-green-500 mt-0.5" /> Stable depuis des années</li>
                    <li className="flex items-start gap-2"><CheckCircle size={16} className="text-green-500 mt-0.5" /> Visible d'un seul côté du mur</li>
                    <li className="flex items-start gap-2"><CheckCircle size={16} className="text-green-500 mt-0.5" /> Dans l'enduit uniquement</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-red-600 mb-2">⚠️ À faire expertiser</h4>
                  <ul className="space-y-2 text-slate-600 text-sm">
                    <li className="flex items-start gap-2"><AlertTriangle size={16} className="text-red-500 mt-0.5" /> Suit les joints (motif escalier)</li>
                    <li className="flex items-start gap-2"><AlertTriangle size={16} className="text-red-500 mt-0.5" /> S'élargit progressivement</li>
                    <li className="flex items-start gap-2"><AlertTriangle size={16} className="text-red-500 mt-0.5" /> Visible des deux côtés</li>
                    <li className="flex items-start gap-2"><AlertTriangle size={16} className="text-red-500 mt-0.5" /> Près des ouvertures (portes/fenêtres)</li>
                    <li className="flex items-start gap-2"><AlertTriangle size={16} className="text-red-500 mt-0.5" /> Après sécheresse ou travaux</li>
                  </ul>
                </div>
              </div>
            </div>

            <h2>Comment surveiller une microfissure ?</h2>
            <p>Si vous avez un doute, posez un <strong>témoin</strong> pour mesurer l'évolution :</p>
            <ol>
              <li><strong>Témoin de plâtre :</strong> Appliquez une fine couche de plâtre sur la fissure. S'il se fissure, la fissure bouge.</li>
              <li><strong>Jauge de fissure :</strong> Outil gradué collé sur la fissure qui mesure l'ouverture au millimètre.</li>
              <li><strong>Photo datée :</strong> Prenez une photo avec une règle à côté, tous les 3 mois.</li>
            </ol>

            <h2>Quand faut-il agir ?</h2>
            <ul>
              <li>La fissure <strong>s'élargit</strong> (passe de 0,2 à 0,5mm ou plus)</li>
              <li>De <strong>nouvelles fissures</strong> apparaissent à proximité</li>
              <li>La fissure devient <strong>infiltrante</strong> (traces d'humidité)</li>
              <li>Vous constatez un <strong>décalage</strong> entre les deux lèvres de la fissure</li>
              <li>Elle apparaît après un <strong>événement</strong> (sécheresse, travaux voisins)</li>
            </ul>

            <h2>Comment réparer les microfissures ?</h2>
            
            <h3>Faïençage bénin</h3>
            <p>
              Simple rebouchage à l'enduit de lissage puis peinture. Coût : quelques dizaines d'euros en DIY, 
              500-1 500€ pour un professionnel (façade complète).
            </p>

            <h3>Microfissures évolutives</h3>
            <p>
              Nécessite d'abord un <strong>diagnostic</strong> pour identifier la cause. Ensuite, traitement structurel 
              si nécessaire (agrafage, reprise de fondation) avant de refermer esthétiquement.
            </p>
          </div>

          {/* Lien vers le HUB */}
          <div className="mt-12 p-8 bg-orange-50 border-2 border-orange-200 rounded-2xl">
            <h3 className="text-xl font-bold text-slate-900 mb-4">📚 Aller plus loin</h3>
            <p className="text-slate-600 mb-4">
              Consultez notre guide complet sur toutes les fissures : causes, gravité, solutions et tarifs.
            </p>
            <Link href="/expert-fissures-toulouse-31" className="inline-flex items-center gap-2 text-orange-600 font-bold hover:text-orange-700">
              Guide Expert Fissures <ArrowRight size={18} />
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
          <h2 className="text-3xl font-extrabold mb-6">Un doute sur vos microfissures ?</h2>
          <p className="text-xl text-orange-100 mb-8">Diagnostic expert à 149€ pour être fixé. Devis gratuit si travaux nécessaires.</p>
          <Link href="/diagnostic" className="inline-flex items-center gap-2 bg-white text-orange-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-orange-50">
            Demander un diagnostic <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
