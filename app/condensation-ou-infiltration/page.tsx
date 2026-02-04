import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { Footer } from '@/components/home/Footer';
import { ArrowRight, Phone, Droplets, Wind, CloudRain } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Condensation ou Infiltration ? Guide Diagnostic Humidité | Expert Occitanie',
  description: 'Murs humides : condensation ou infiltration ? Comment différencier, identifier la cause exacte et choisir le bon traitement. Diagnostic expert Toulouse, Montauban, Auch (31-82-32) 48h.',
  keywords: [
    'condensation ou infiltration',
    'différence condensation infiltration',
    'diagnostic humidité mur',
    'mur humide condensation',
    'infiltration eau pluie',
    'humidité mur intérieur',
    'tache humidité mur',
    'buée fenêtre condensation',
    'moisissure condensation',
    'expert diagnostic humidité',
    'humidité toulouse',
    'cause humidité maison',
  ],
  alternates: {
    canonical: 'https://www.ipb-expertise.fr/condensation-ou-infiltration',
  },
  openGraph: {
    title: 'Condensation vs Infiltration : Comment Savoir ?',
    description: 'Guide pour identifier la source de votre humidité et la traiter efficacement.',
    url: 'https://www.ipb-expertise.fr/condensation-ou-infiltration',
    type: 'article',
  },
  robots: { index: true, follow: true },
};

const faqItems = [
  {
    question: "Comment savoir si c'est de la condensation ?",
    answer: "La condensation touche généralement les angles, les fenêtres et les murs froids (murs Nord, ponts thermiques). Elle s'accompagne de buée sur les vitres et de moisissures noires superficielles."
  },
  {
    question: "Comment reconnaître une infiltration ?",
    answer: "L'infiltration crée des taches localisées, souvent sous les fenêtres, au niveau des toitures ou après de fortes pluies. L'humidité peut ruisseler ou former des auréoles."
  },
  {
    question: "Peut-on avoir les deux en même temps ?",
    answer: "Oui, c'est même fréquent. Une infiltration crée de l'humidité qui favorise ensuite la condensation. Un diagnostic professionnel permet d'identifier toutes les sources."
  },
  {
    question: "Comment traiter la condensation ?",
    answer: "La condensation se traite par la ventilation (VMC, VMI®), l'isolation des ponts thermiques et le chauffage régulier. La VMI® est particulièrement efficace."
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

export default function CondensationInfiltrationPage() {
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
          <span className="text-slate-900">Condensation ou infiltration</span>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-2 text-blue-400 text-sm font-bold mb-4">
            <Droplets size={18} />
            <span>Diagnostic humidité</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
            Condensation ou Infiltration ?
          </h1>
          <p className="text-xl text-slate-300 mb-8">
            Vos murs sont humides, mais quelle est la cause ? Condensation ou infiltration, 
            les traitements sont radicalement différents. Apprenez à les distinguer.
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

      {/* Comparatif visuel */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-slate-900 text-center mb-12">Le comparatif en un coup d'œil</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Condensation */}
            <div className="bg-blue-50 rounded-2xl p-8 border-2 border-blue-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <Wind className="text-white" size={24} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Condensation</h3>
              </div>
              <ul className="space-y-4 text-slate-700">
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold">📍</span>
                  <span><strong>Localisation :</strong> Angles, fenêtres, murs Nord, ponts thermiques</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold">👀</span>
                  <span><strong>Aspect :</strong> Moisissures noires superficielles, buée sur vitres</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold">📅</span>
                  <span><strong>Saisonnalité :</strong> Pire en hiver (différence chaud/froid)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold">🔧</span>
                  <span><strong>Solution :</strong> Ventilation (VMI®), isolation, chauffage</span>
                </li>
              </ul>
            </div>

            {/* Infiltration */}
            <div className="bg-amber-50 rounded-2xl p-8 border-2 border-amber-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center">
                  <CloudRain className="text-white" size={24} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Infiltration</h3>
              </div>
              <ul className="space-y-4 text-slate-700">
                <li className="flex items-start gap-3">
                  <span className="text-amber-600 font-bold">📍</span>
                  <span><strong>Localisation :</strong> Sous fenêtres, plafonds, murs extérieurs</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-amber-600 font-bold">👀</span>
                  <span><strong>Aspect :</strong> Auréoles, ruissellement, traces localisées</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-amber-600 font-bold">📅</span>
                  <span><strong>Saisonnalité :</strong> Après pluie ou fonte de neige</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-amber-600 font-bold">🔧</span>
                  <span><strong>Solution :</strong> Réparation de l'étanchéité (toiture, joints, façade)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contenu détaillé */}
      <article className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4">
          <div className="prose prose-lg max-w-none">
            <h2>La condensation en détail</h2>
            <p>
              La <strong>condensation</strong> se produit lorsque l'air chaud et humide entre en contact avec 
              une surface froide. L'humidité de l'air se transforme en eau, créant des gouttelettes sur les 
              murs, les vitres ou dans les angles.
            </p>

            <h3>Causes de la condensation</h3>
            <ul>
              <li><strong>Ventilation insuffisante :</strong> L'air humide ne s'évacue pas</li>
              <li><strong>Ponts thermiques :</strong> Zones mal isolées (angles, linteaux, dalles)</li>
              <li><strong>Production d'humidité :</strong> Cuisine, douche, séchage du linge</li>
              <li><strong>Chauffage insuffisant :</strong> Les murs restent froids</li>
            </ul>

            <h3>Comment traiter la condensation ?</h3>
            <ol>
              <li><strong>VMI® (Ventilation Mécanique par Insufflation) :</strong> Solution la plus efficace</li>
              <li><strong>VMC :</strong> Extraction de l'air vicié</li>
              <li><strong>Isolation des ponts thermiques :</strong> Évite les surfaces froides</li>
              <li><strong>Chauffage régulier :</strong> Maintenir une température stable</li>
            </ol>

            <h2>L'infiltration en détail</h2>
            <p>
              L'<strong>infiltration</strong> est une entrée d'eau depuis l'extérieur. Elle peut provenir de 
              la toiture, de la façade, des menuiseries ou des fondations.
            </p>

            <h3>Sources d'infiltration courantes</h3>
            <ul>
              <li><strong>Toiture :</strong> Tuiles cassées, gouttières bouchées, solin défectueux</li>
              <li><strong>Façade :</strong> Fissures, joints dégradés, enduit poreux</li>
              <li><strong>Menuiseries :</strong> Joints de fenêtres usés, seuils mal étanchés</li>
              <li><strong>Terrasse :</strong> Membrane d'étanchéité percée</li>
            </ul>

            <h3>Comment traiter l'infiltration ?</h3>
            <ol>
              <li><strong>Identifier la source :</strong> Test d'arrosage, caméra thermique</li>
              <li><strong>Réparer l'étanchéité :</strong> Intervention sur la zone défaillante</li>
              <li><strong>Sécher les matériaux :</strong> Éviter les moisissures</li>
            </ol>

            <div className="bg-slate-100 rounded-2xl p-6 my-8 not-prose">
              <h3 className="text-xl font-bold text-slate-900 mb-4">🔍 Test simple à faire chez vous</h3>
              <p className="text-slate-700 mb-4">
                Collez une feuille de papier aluminium sur le mur humide pendant 24-48h :
              </p>
              <ul className="space-y-2 text-slate-600">
                <li>• <strong>Eau côté mur :</strong> Infiltration ou remontée capillaire</li>
                <li>• <strong>Eau côté pièce :</strong> Condensation</li>
              </ul>
              <p className="text-slate-500 text-sm mt-4">
                Ce test donne une indication, mais seul un diagnostic professionnel est fiable.
              </p>
            </div>

            <h2>Et les remontées capillaires ?</h2>
            <p>
              C'est une troisième cause d'humidité, souvent confondue avec l'infiltration. L'eau du sol 
              remonte dans les murs par capillarité. Elle se caractérise par une humidité au 
              <strong> bas des murs</strong> (jusqu'à 1,5m) et du salpêtre.
            </p>
            <p>
              <Link href="/remontee-capillaire-solution" className="text-blue-600 hover:underline">
                En savoir plus sur les remontées capillaires →
              </Link>
            </p>
          </div>

          {/* Lien vers le HUB */}
          <div className="mt-12 p-8 bg-blue-50 border-2 border-blue-200 rounded-2xl">
            <h3 className="text-xl font-bold text-slate-900 mb-4">💧 Besoin d'un diagnostic ?</h3>
            <p className="text-slate-600 mb-4">
              Seul un expert peut identifier avec certitude la source de votre humidité.
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
          <h2 className="text-3xl font-extrabold mb-6">Un doute sur l'origine de votre humidité ?</h2>
          <p className="text-xl text-blue-100 mb-8">Diagnostic expert sous 48h pour identifier la cause exacte.</p>
          <Link href="/diagnostic" className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50">
            Demander un diagnostic <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
