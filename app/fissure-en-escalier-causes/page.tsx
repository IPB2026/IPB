import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { Footer } from '@/components/home/Footer';
import { AlertTriangle, ArrowRight, Phone, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Fissure en Escalier : Causes, Dangers et Solutions | IPB Expertise',
  description: 'Fissure en escalier sur votre mur ? Causes (tassement différentiel, sol argileux), dangers et solutions. Expert Toulouse →',
  keywords: ['fissure en escalier', 'fissure escalier mur', 'tassement différentiel', 'fissure diagonale'],
  alternates: {
    canonical: 'https://www.ipb-expertise.fr/fissure-en-escalier-causes',
  },
};

const faqItems = [
  {
    question: "Une fissure en escalier est-elle grave ?",
    answer: "Oui, une fissure en escalier est généralement le signe d'un mouvement structurel (tassement différentiel). Elle nécessite une expertise pour évaluer sa gravité et stopper son évolution."
  },
  {
    question: "Pourquoi la fissure suit-elle les joints ?",
    answer: "Les joints de mortier sont le point faible du mur. Quand le sol bouge, la maçonnerie se déforme en suivant le chemin de moindre résistance : les joints."
  },
  {
    question: "Comment réparer une fissure en escalier ?",
    answer: "La réparation dépend de la cause. Si c'est un tassement différentiel, l'agrafage structurel stabilise le mur. Dans les cas graves, des micropieux peuvent être nécessaires."
  },
  {
    question: "Ma fissure s'agrandit, que faire ?",
    answer: "Une fissure évolutive est urgente. Contactez un expert immédiatement pour un diagnostic. En attendant, posez des témoins (scotch, plâtre) pour mesurer l'évolution."
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

export default function FissureEnEscalierPage() {
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
          <Link href="/expert-fissures-toulouse-31" className="hover:text-orange-600">Expert Fissures Toulouse</Link>
          <span className="mx-2">›</span>
          <span className="text-slate-900">Fissure en escalier</span>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-orange-400 text-sm font-bold mb-4">
            <AlertTriangle size={18} />
            <span>Problème structurel</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
            Fissure en Escalier : Causes et Solutions
          </h1>
          <p className="text-xl text-slate-300 mb-8">
            Une fissure qui suit les joints en diagonale ? C'est le signe d'un mouvement de structure. 
            Découvrez les causes et les solutions pour protéger votre maison.
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

      {/* Contenu principal */}
      <article className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2>Qu'est-ce qu'une fissure en escalier ?</h2>
            <p>
              Une <strong>fissure en escalier</strong> (ou fissure diagonale) est une fissure qui traverse un mur en suivant 
              les joints de mortier, créant un motif en "marches d'escalier". Elle est caractéristique d'un 
              <strong>tassement différentiel</strong> : une partie de la fondation s'enfonce plus que l'autre.
            </p>
            <p>
              Contrairement aux microfissures superficielles, la fissure en escalier indique un <strong>mouvement structurel actif</strong>. 
              Elle doit être prise au sérieux et expertisée rapidement.
            </p>

            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl my-8 not-prose">
              <div className="flex items-start gap-3">
                <AlertTriangle className="text-red-600 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">⚠️ Signe d'alerte</h3>
                  <p className="text-slate-700">
                    Une fissure en escalier de plus de 2mm d'ouverture ou qui s'agrandit est une <strong>urgence structurelle</strong>. 
                    Faites intervenir un expert sans tarder.
                  </p>
                </div>
              </div>
            </div>

            <h2>Les causes d'une fissure en escalier</h2>
            
            <h3>1. Tassement différentiel</h3>
            <p>
              C'est la cause principale. Quand une partie de la fondation s'enfonce plus qu'une autre (sol hétérogène, 
              défaut de compactage), le mur subit des contraintes de cisaillement et se fissure en diagonale.
            </p>

            <h3>2. Retrait-gonflement des argiles (RGA)</h3>
            <p>
              En <strong>Haute-Garonne</strong>, c'est la cause n°1. Les sols argileux gonflent avec l'eau et se rétractent 
              en période sèche. Ces mouvements cycliques fissurent les maisons, surtout après les sécheresses.
            </p>

            <h3>3. Défaut de fondations</h3>
            <p>
              Fondations sous-dimensionnées, mal ancrées, ou posées sur un sol mal préparé. Les maisons des années 60-80 
              sont particulièrement concernées.
            </p>

            <h3>4. Travaux ou modifications environnantes</h3>
            <p>
              Construction voisine, creusement de piscine, plantation d'arbres trop proches... Ces modifications peuvent 
              déstabiliser le sol et provoquer des tassements.
            </p>

            <h2>Comment reconnaître une fissure en escalier grave ?</h2>
            
            <div className="bg-slate-100 rounded-2xl p-6 my-8 not-prose">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Critères de gravité</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <span className="text-red-500 font-bold">🔴</span>
                  <div>
                    <strong>Grave</strong>
                    <p className="text-sm text-slate-600">Ouverture &gt; 2mm, évolutive, traverse le mur</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-orange-500 font-bold">🟠</span>
                  <div>
                    <strong>Modérée</strong>
                    <p className="text-sm text-slate-600">Ouverture 1-2mm, stable, visible des deux côtés</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-yellow-500 font-bold">🟡</span>
                  <div>
                    <strong>Légère</strong>
                    <p className="text-sm text-slate-600">Ouverture &lt; 1mm, stable, superficielle</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-500 font-bold">🟢</span>
                  <div>
                    <strong>Bénigne</strong>
                    <p className="text-sm text-slate-600">Microfissure, enduit uniquement</p>
                  </div>
                </div>
              </div>
            </div>

            <h2>Solutions pour réparer une fissure en escalier</h2>

            <h3>L'agrafage structurel (recommandé dans 80% des cas)</h3>
            <p>
              L'<strong>agrafage</strong> consiste à insérer des barres métalliques perpendiculairement à la fissure pour 
              "recoudre" le mur. Cette technique stabilise la structure sans intervention lourde sur les fondations.
            </p>
            <ul>
              <li>✅ Coût : 8 000 - 15 000€</li>
              <li>✅ Durée : 3-5 jours</li>
              <li>✅ Garantie décennale</li>
              <li>✅ 3x moins cher que les micropieux</li>
            </ul>

            <h3>Les micropieux (cas graves)</h3>
            <p>
              Si le tassement est important ou continu, il faut reprendre les fondations avec des <strong>micropieux</strong>. 
              Ces pieux métalliques descendent jusqu'au sol stable pour porter la maison.
            </p>
            <ul>
              <li>💰 Coût : 25 000 - 50 000€</li>
              <li>⏱️ Durée : 2-3 semaines</li>
              <li>✅ Garantie décennale</li>
            </ul>
          </div>

          {/* Lien vers le HUB */}
          <div className="mt-12 p-8 bg-orange-50 border-2 border-orange-200 rounded-2xl">
            <h3 className="text-xl font-bold text-slate-900 mb-4">📚 Tout savoir sur les fissures</h3>
            <p className="text-slate-600 mb-4">
              Consultez notre guide complet sur les fissures structurelles : causes, diagnostic, solutions et tarifs.
            </p>
            <Link href="/expert-fissures-toulouse-31" className="inline-flex items-center gap-2 text-orange-600 font-bold hover:text-orange-700">
              Guide Expert Fissures Toulouse <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </article>

      {/* FAQ */}
      <section className="py-16 bg-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
          <h2 className="text-3xl font-extrabold mb-6">Fissure en escalier chez vous ?</h2>
          <p className="text-xl text-orange-100 mb-8">Diagnostic expert sous 48h. Ne laissez pas la fissure s'aggraver.</p>
          <Link href="/diagnostic" className="inline-flex items-center gap-2 bg-white text-orange-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-orange-50">
            Demander un diagnostic <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
