import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { Footer } from '@/components/home/Footer';
import { AlertTriangle, ArrowRight, Phone, Skull } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Mérule : Identification et Traitement d\'Urgence | IPB Expertise',
  description: 'Mérule (champignon du bois) ? Comment la reconnaître, dangers et traitement professionnel. Intervention urgente Toulouse →',
  keywords: ['mérule', 'champignon maison', 'mérule pleureuse', 'traitement mérule', 'champignon bois'],
  alternates: {
    canonical: 'https://www.ipb-expertise.fr/merule-champignon-traitement',
  },
};

const faqItems = [
  {
    question: "Comment reconnaître la mérule ?",
    answer: "La mérule se présente sous forme de mycélium blanc cotonneux, puis de fructifications brunes/rousses. Elle dégage une forte odeur de champignon et le bois attaqué se désagrège en cubes."
  },
  {
    question: "La mérule est-elle dangereuse pour la santé ?",
    answer: "Les spores de mérule peuvent causer des allergies et des problèmes respiratoires. Mais le danger principal est structurel : elle détruit le bois et peut rendre la maison inhabitable."
  },
  {
    question: "La mérule est-elle couverte par l'assurance ?",
    answer: "Non, la mérule n'est généralement pas couverte par l'assurance habitation classique. Seule une garantie dommage-ouvrage ou vice caché (en cas d'achat récent) peut intervenir."
  },
  {
    question: "Combien coûte un traitement mérule ?",
    answer: "Le coût varie de 10 000€ à plus de 100 000€ selon l'étendue. Il inclut la dépose des bois contaminés, le traitement fongicide et la reconstruction."
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

export default function MerulePage() {
  return (
    <div className="font-sans text-slate-800 bg-slate-50 antialiased">
      <Script id="faq-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      
      <TopBar />
      <Navbar />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200 py-3">
        <div className="max-w-7xl mx-auto px-4 text-sm text-slate-600">
          <Link href="/" className="hover:text-red-600">Accueil</Link>
          <span className="mx-2">›</span>
          <Link href="/expert-humidite-toulouse-31" className="hover:text-red-600">Expert Humidité</Link>
          <span className="mx-2">›</span>
          <span className="text-slate-900">Mérule</span>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-red-950 to-slate-900 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 text-red-400 text-sm font-bold mb-4">
                <Skull size={18} className="animate-pulse" />
                <span>🚨 URGENCE - Champignon destructeur</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
                Mérule : <span className="text-red-400">Le Cancer du Bâtiment</span>
              </h1>
              <p className="text-xl text-slate-300 mb-4">
                La mérule est le champignon le plus dangereux pour votre maison. Elle peut <strong className="text-white">détruire 
                toute la structure bois en quelques mois</strong>. Agissez immédiatement.
              </p>
              <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-4 mb-8">
                <p className="text-red-200 font-bold">
                  ⚠️ Chaque semaine d'attente peut ajouter <strong className="text-white">5 000€ à 10 000€</strong> à la facture finale.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/diagnostic" className="bg-red-600 hover:bg-red-500 px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 animate-pulse">
                  🚨 DIAGNOSTIC D'URGENCE <ArrowRight size={18} />
                </Link>
                <a href="tel:0582953375" className="bg-white/10 border border-white/20 px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2">
                  <Phone size={18} /> 05 82 95 33 75
                </a>
              </div>
            </div>
            
            {/* Image de mérule - CHOC VISUEL */}
            <div className="relative hidden lg:block">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-red-500/50">
                <Image
                  src="/images/merule-sol.webp"
                  alt="Mérule et champignons destructeurs sur sol - Urgence traitement"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                  priority
                />
                {/* Overlay alerte */}
                <div className="absolute inset-0 bg-gradient-to-t from-red-950/90 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-red-600/95 backdrop-blur-sm rounded-xl p-4 flex items-center gap-3">
                    <Skull className="text-white animate-pulse" size={32} />
                    <div>
                      <p className="text-white font-bold">Infestation de mérule</p>
                      <p className="text-red-100 text-sm">Ce sol est condamné - Intervention immédiate requise</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Badge coût */}
              <div className="absolute -top-4 -right-4 bg-white rounded-xl p-4 shadow-xl">
                <p className="text-red-600 font-bold text-sm">Coût moyen traitement</p>
                <p className="text-3xl font-extrabold text-slate-900">30-70K€</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Alerte */}
      <section className="py-6 bg-red-600 text-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <AlertTriangle size={32} className="flex-shrink-0" />
            <p className="font-bold">
              ⚠️ La mérule ne pardonne pas. Chaque jour d'attente aggrave les dégâts et le coût des travaux. 
              N'essayez pas de traiter vous-même.
            </p>
          </div>
        </div>
      </section>

      {/* Contenu */}
      <article className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4">
          <div className="prose prose-lg max-w-none">
            <h2>Qu'est-ce que la mérule ?</h2>
            <p>
              La <strong>mérule pleureuse</strong> (Serpula lacrymans) est un champignon lignivore qui se nourrit 
              de la cellulose du bois. Elle peut détruire charpentes, planchers, poutres et menuiseries 
              en quelques mois seulement.
            </p>
            <p>
              Surnommée "cancer du bâtiment" ou "lèpre des maisons", la mérule est le champignon le plus 
              destructeur en France. Elle peut traverser les murs de maçonnerie pour atteindre d'autres 
              bois, se propageant dans toute la maison.
            </p>

            <h2>Comment reconnaître la mérule ?</h2>

            <div className="bg-slate-100 rounded-2xl p-6 my-8 not-prose">
              <h3 className="text-xl font-bold text-slate-900 mb-4">🔍 Les signes révélateurs</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-slate-800 mb-2">Stade précoce</h4>
                  <ul className="space-y-2 text-slate-600">
                    <li>• Mycélium blanc cotonneux</li>
                    <li>• Filaments gris-argentés</li>
                    <li>• Forte odeur de champignon</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 mb-2">Stade avancé</h4>
                  <ul className="space-y-2 text-slate-600">
                    <li>• Fructification brune/rousse ("crêpe")</li>
                    <li>• Poussière de spores rousses</li>
                    <li>• Bois en décomposition cubique</li>
                  </ul>
                </div>
              </div>
            </div>

            <h2>Les conditions favorables à la mérule</h2>
            <p>La mérule prospère dans un environnement précis :</p>
            <ul>
              <li><strong>Humidité :</strong> 20-25% dans le bois (remontées capillaires, infiltrations)</li>
              <li><strong>Température :</strong> 20-25°C (mais survit de 3 à 26°C)</li>
              <li><strong>Obscurité :</strong> Se développe dans les zones sombres</li>
              <li><strong>Stagnation d'air :</strong> Absence de ventilation</li>
            </ul>

            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl my-8 not-prose">
              <h3 className="font-bold text-red-900 mb-2">⚠️ Attention : diagnostic obligatoire</h3>
              <p className="text-red-800">
                Dans certaines communes (notamment en Bretagne), un diagnostic mérule est obligatoire avant 
                toute vente immobilière. En Occitanie, ce n'est pas encore le cas, mais c'est recommandé.
              </p>
            </div>

            <h2>Le traitement de la mérule</h2>
            <p>
              Le traitement de la mérule est complexe et doit être réalisé par un professionnel certifié. 
              Il comprend plusieurs étapes cruciales :
            </p>

            <h3>1. Confinement et protection</h3>
            <p>
              Isolation de la zone contaminée pour éviter la propagation des spores dans toute la maison.
            </p>

            <h3>2. Dépose des bois contaminés</h3>
            <p>
              Tous les bois atteints (et une marge de sécurité de 50cm autour) doivent être retirés et 
              <strong> incinérés</strong>. Ils ne doivent jamais être réutilisés ni jetés en décharge.
            </p>

            <h3>3. Traitement fongicide</h3>
            <p>
              Les maçonneries et les bois sains sont traités par injection ou pulvérisation de fongicide.
            </p>

            <h3>4. Assèchement et ventilation</h3>
            <p>
              Élimination de la source d'humidité (remontées capillaires, infiltrations) et mise en place 
              d'une ventilation efficace.
            </p>

            <h3>5. Reconstruction</h3>
            <p>
              Remplacement des bois par des éléments traités ou des matériaux non sensibles.
            </p>

            <h2>Coût du traitement mérule</h2>
            <p>Le coût dépend de l'étendue de la contamination :</p>
            <ul>
              <li><strong>Contamination limitée :</strong> 10 000 - 30 000€</li>
              <li><strong>Contamination moyenne :</strong> 30 000 - 70 000€</li>
              <li><strong>Contamination étendue :</strong> 70 000 - 150 000€+</li>
            </ul>
            <p>
              Plus vous intervenez tôt, plus le coût sera maîtrisé. Chaque semaine d'attente peut 
              augmenter la facture de plusieurs milliers d'euros.
            </p>

            <h2>La mérule en Occitanie</h2>
            <p>
              Historiquement moins touchée que la Bretagne, l'Occitanie voit les cas de mérule augmenter. 
              Les maisons anciennes mal ventilées et les périodes de forte humidité favorisent son développement.
            </p>
            <p>
              IPB intervient dans toute la région Toulouse et alentours pour des diagnostics et traitements 
              de mérule.
            </p>
          </div>

          {/* Lien vers le HUB */}
          <div className="mt-12 p-8 bg-red-50 border-2 border-red-200 rounded-2xl">
            <h3 className="text-xl font-bold text-slate-900 mb-4">🚨 Suspicion de mérule ?</h3>
            <p className="text-slate-600 mb-4">
              N'attendez pas. Contactez-nous pour un diagnostic d'urgence.
            </p>
            <Link href="/diagnostic" className="inline-flex items-center gap-2 text-red-600 font-bold hover:text-red-700">
              Demander un diagnostic urgent <ArrowRight size={18} />
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
                  <span className="text-red-600 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="px-6 pb-6 text-slate-600">{item.answer}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-red-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold mb-6">Suspicion de mérule ?</h2>
          <p className="text-xl text-red-100 mb-8">Intervention d'urgence sous 24-48h. Chaque jour compte.</p>
          <Link href="/diagnostic" className="inline-flex items-center gap-2 bg-white text-red-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-red-50">
            Diagnostic d'urgence <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
