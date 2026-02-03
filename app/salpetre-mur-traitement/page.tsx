import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { Footer } from '@/components/home/Footer';
import { AlertTriangle, ArrowRight, Phone, Droplets, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Salpêtre Mur : Causes, Dangers et Traitement Injection | Toulouse',
  description: 'Salpêtre (poudre blanche) sur vos murs ? ⚠️ Signe de remontées capillaires. Traitement par injection résine hydrophobe. Garantie 30 ans. Expert Toulouse ☎ 05 82 95 33 75',
  keywords: [
    'salpêtre mur traitement',
    'poudre blanche mur',
    'nitrate potassium mur',
    'salpêtre cave',
    'salpêtre remontée capillaire',
    'enlever salpêtre définitivement',
    'traitement anti salpêtre',
    'salpêtre dangereux santé',
    'injection résine salpêtre',
    'mur qui blanchit',
    'cristaux blancs mur',
    'expert humidité toulouse',
  ],
  alternates: {
    canonical: 'https://www.ipb-expertise.fr/salpetre-mur-traitement',
  },
  openGraph: {
    title: 'Salpêtre : Traitement Définitif par Injection',
    description: 'Le salpêtre révèle des remontées capillaires. Traitement par injection garanti 30 ans.',
    url: 'https://www.ipb-expertise.fr/salpetre-mur-traitement',
    type: 'article',
    images: [{ url: '/images/salpetre-avant-apres.webp', width: 1200, height: 630, alt: 'Salpêtre mur avant après traitement' }],
  },
  robots: { index: true, follow: true },
};

const faqItems = [
  {
    question: "Comment reconnaître le salpêtre ?",
    answer: "Le salpêtre se présente sous forme de dépôts blancs poudreux ou cristallisés au bas des murs (jusqu'à 1,5m de hauteur). Il s'accompagne souvent de peinture qui cloque et d'odeur d'humidité."
  },
  {
    question: "Le salpêtre est-il dangereux pour la santé ?",
    answer: "Le salpêtre lui-même est peu toxique, mais il indique une forte humidité qui favorise les moisissures, allergènes et irritantes pour les voies respiratoires."
  },
  {
    question: "Peut-on traiter le salpêtre soi-même ?",
    answer: "Gratter le salpêtre ne sert à rien : il reviendra tant que l'humidité persiste. Seul un traitement professionnel (injection de résine) élimine définitivement la cause."
  },
  {
    question: "Combien coûte le traitement du salpêtre ?",
    answer: "L'injection de résine hydrophobe coûte entre 2 000€ et 5 000€ selon la longueur des murs à traiter. Ce traitement est garanti 30 ans."
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

export default function SalpetrePage() {
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
          <span className="text-slate-900">Salpêtre</span>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 text-blue-400 text-sm font-bold mb-4">
                <Droplets size={18} />
                <span>⚠️ Signal d'humidité chronique</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
                Salpêtre : <span className="text-blue-400">Traitement Définitif</span>
              </h1>
              <p className="text-xl text-slate-300 mb-4">
                Cette poudre blanche sur vos murs est un <strong className="text-white">signal d'alarme</strong>. 
                Elle indique que l'eau remonte depuis le sol et détériore votre maçonnerie de l'intérieur.
              </p>
              <div className="bg-blue-500/20 border border-blue-500/50 rounded-xl p-4 mb-8">
                <p className="text-blue-200 font-bold">
                  ✓ Traitement par injection de résine · <strong className="text-white">Garanti 30 ans</strong>
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/diagnostic" className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2">
                  💧 Diagnostic humidité <ArrowRight size={18} />
                </Link>
                <a href="tel:0582953375" className="bg-white/10 border border-white/20 px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2">
                  <Phone size={18} /> 05 82 95 33 75
                </a>
              </div>
            </div>
            
            {/* Image Avant/Après Salpêtre */}
            <div className="relative hidden lg:block">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20">
                <Image
                  src="/images/salpetre-avant-apres.webp"
                  alt="Avant/Après traitement salpêtre - Mur assaini par IPB"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                  priority
                />
                {/* Badge résultat */}
                <div className="absolute bottom-4 left-4 right-4 bg-emerald-600/95 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="text-white" size={28} />
                    <div>
                      <p className="text-white font-bold">Avant / Après traitement</p>
                      <p className="text-emerald-100 text-sm">Résultat définitif garanti 30 ans</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Badge tarif */}
              <div className="absolute -top-4 -right-4 bg-white rounded-xl p-4 shadow-xl">
                <p className="text-blue-600 font-bold text-sm">À partir de</p>
                <p className="text-3xl font-extrabold text-slate-900">2 000€</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contenu */}
      <article className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4">
          <div className="prose prose-lg max-w-none">
            <h2>Qu'est-ce que le salpêtre ?</h2>
            <p>
              Le <strong>salpêtre</strong> (nitrate de potassium) est un dépôt minéral qui se forme lorsque l'eau 
              remonte dans les murs par capillarité. En s'évaporant, elle laisse des cristaux blancs en surface.
            </p>
            <p>
              Ce n'est pas une simple tache esthétique : le salpêtre révèle un problème d'<strong>humidité ascensionnelle</strong> 
              qui endommage vos murs en profondeur et dégrade l'air intérieur.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-xl my-8 not-prose">
              <h3 className="font-bold text-slate-900 mb-2">💧 Salpêtre = Remontées capillaires</h3>
              <p className="text-slate-700">
                Si vous voyez du salpêtre, vos murs sont humides sur toute leur épaisseur. L'eau du sol remonte 
                par les pores de la maçonnerie, parfois jusqu'à 1,5m de hauteur.
              </p>
            </div>

            <h2>Pourquoi le salpêtre apparaît-il ?</h2>
            
            <h3>1. Absence de coupure de capillarité</h3>
            <p>
              Les maisons anciennes (avant 1960) n'ont généralement pas de barrière étanche entre les fondations 
              et les murs. L'eau du sol remonte librement.
            </p>

            <h3>2. Sols argileux (très fréquent en Haute-Garonne)</h3>
            <p>
              Les argiles retiennent l'eau et la transmettent aux fondations. Après les pluies, le sol reste 
              gorgé d'eau pendant des semaines, alimentant les remontées capillaires.
            </p>

            <h3>3. Mauvaise ventilation</h3>
            <p>
              Une maison mal ventilée ne permet pas l'évaporation de l'humidité, qui s'accumule et favorise 
              les dépôts de salpêtre.
            </p>

            <h2>Les dangers du salpêtre</h2>

            <div className="bg-slate-100 rounded-2xl p-6 my-8 not-prose">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-slate-900 mb-3">🏠 Pour votre maison</h4>
                  <ul className="space-y-2 text-slate-600">
                    <li>• Dégradation des enduits et peintures</li>
                    <li>• Fragilisation de la maçonnerie</li>
                    <li>• Moisissures et champignons</li>
                    <li>• Perte de valeur immobilière</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-3">👨‍👩‍👧 Pour votre santé</h4>
                  <ul className="space-y-2 text-slate-600">
                    <li>• Allergies respiratoires</li>
                    <li>• Asthme aggravé</li>
                    <li>• Irritation des yeux</li>
                    <li>• Fatigue chronique</li>
                  </ul>
                </div>
              </div>
            </div>

            <h2>Le traitement définitif : l'injection de résine</h2>
            <p>
              La seule solution durable contre le salpêtre est de <strong>stopper les remontées capillaires</strong> 
              à leur source. L'injection de résine hydrophobe crée une barrière étanche dans le mur.
            </p>

            <h3>Comment ça marche ?</h3>
            <ol>
              <li><strong>Diagnostic :</strong> Mesure du taux d'humidité et identification de l'étendue</li>
              <li><strong>Forage :</strong> Trous à la base du mur tous les 10-15cm</li>
              <li><strong>Injection :</strong> Résine hydrophobe injectée sous pression</li>
              <li><strong>Séchage :</strong> Les murs s'assèchent en 6-12 mois</li>
              <li><strong>Finition :</strong> Réfection des enduits si nécessaire</li>
            </ol>

            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-xl my-8 not-prose">
              <h3 className="font-bold text-slate-900 mb-2">✅ Garantie 30 ans</h3>
              <p className="text-slate-700">
                Notre traitement par injection de résine est garanti 30 ans. Le salpêtre ne reviendra pas.
              </p>
            </div>

            <h2>Tarifs traitement salpêtre</h2>
            <ul>
              <li><strong>Diagnostic :</strong> 149€ (déductible des travaux)</li>
              <li><strong>Injection résine :</strong> 2 000 - 5 000€ selon longueur des murs</li>
              <li><strong>Réfection enduits :</strong> sur devis</li>
            </ul>
          </div>

          {/* Lien vers le HUB */}
          <div className="mt-12 p-8 bg-blue-50 border-2 border-blue-200 rounded-2xl">
            <h3 className="text-xl font-bold text-slate-900 mb-4">💧 Tout savoir sur l'humidité</h3>
            <p className="text-slate-600 mb-4">
              Consultez notre guide complet sur les problèmes d'humidité : causes, diagnostic, solutions et tarifs.
            </p>
            <Link href="/expert-humidite-toulouse-31" className="inline-flex items-center gap-2 text-blue-600 font-bold hover:text-blue-700">
              Guide Expert Humidité Toulouse <ArrowRight size={18} />
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
          <h2 className="text-3xl font-extrabold mb-6">Du salpêtre sur vos murs ?</h2>
          <p className="text-xl text-blue-100 mb-8">Diagnostic sous 48h. Traitement garanti 30 ans.</p>
          <Link href="/diagnostic" className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50">
            Demander un diagnostic <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
