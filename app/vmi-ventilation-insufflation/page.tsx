import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { Footer } from '@/components/home/Footer';
import { ArrowRight, Phone, Wind, CheckCircle, ThermometerSun, Zap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'VMI® : Ventilation par Insufflation contre Condensation | IPB Expertise',
  description: 'VMI (Ventilation Mécanique par Insufflation) : solution efficace contre condensation et moisissures. Installation et prix. Expert Toulouse →',
  keywords: ['VMI', 'ventilation par insufflation', 'VMI prix', 'condensation', 'moisissure', 'ventilation'],
  alternates: {
    canonical: 'https://www.ipb-expertise.fr/vmi-ventilation-insufflation',
  },
};

const faqItems = [
  {
    question: "Quelle différence entre VMI et VMC ?",
    answer: "La VMC extrait l'air vicié, la VMI insuffle de l'air neuf filtré. La VMI crée une légère surpression qui chasse naturellement l'humidité et empêche les infiltrations d'air froid."
  },
  {
    question: "La VMI est-elle efficace contre la condensation ?",
    answer: "Oui, la VMI est particulièrement efficace contre la condensation. En insufflant de l'air préchauffé et filtré, elle maintient les murs au-dessus du point de rosée."
  },
  {
    question: "Combien coûte une VMI ?",
    answer: "Le prix d'une VMI installée varie de 2 500€ à 4 500€ selon le modèle et la taille de la maison. C'est un investissement rentable qui réduit aussi les factures de chauffage."
  },
  {
    question: "La VMI fait-elle du bruit ?",
    answer: "Les VMI modernes sont très silencieuses (20-30 dB). Le groupe est installé dans les combles ou un local technique, limitant la nuisance sonore."
  },
  {
    question: "Combien consomme une VMI ?",
    answer: "Une VMI consomme entre 20 et 50W en fonctionnement normal, soit environ 100-200€/an d'électricité. Cette consommation est largement compensée par les économies de chauffage."
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

export default function VMIPage() {
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
          <span className="text-slate-900">VMI®</span>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 to-blue-950 text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-2 text-cyan-400 text-sm font-bold mb-4">
            <Wind size={18} />
            <span>Solution anti-condensation</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
            VMI® : La Solution contre la Condensation
          </h1>
          <p className="text-xl text-slate-300 mb-8">
            La Ventilation Mécanique par Insufflation (VMI®) est la solution la plus efficace contre 
            la condensation et les moisissures. Découvrez son fonctionnement et ses avantages.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/diagnostic" className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2">
              Devis VMI gratuit <ArrowRight size={18} />
            </Link>
            <a href="tel:0582953375" className="bg-white/10 border border-white/20 px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2">
              <Phone size={18} /> 05 82 95 33 75
            </a>
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Wind className="text-blue-600" size={24} />
              </div>
              <h3 className="font-bold text-slate-900">Anti-condensation</h3>
              <p className="text-sm text-slate-600">Élimine l'humidité</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <ThermometerSun className="text-green-600" size={24} />
              </div>
              <h3 className="font-bold text-slate-900">Air préchauffé</h3>
              <p className="text-sm text-slate-600">Économies de chauffage</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="text-purple-600" size={24} />
              </div>
              <h3 className="font-bold text-slate-900">Air filtré</h3>
              <p className="text-sm text-slate-600">Pollen, poussière</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Zap className="text-amber-600" size={24} />
              </div>
              <h3 className="font-bold text-slate-900">Faible conso</h3>
              <p className="text-sm text-slate-600">20-50W seulement</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contenu */}
      <article className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4">
          <div className="prose prose-lg max-w-none">
            <h2>Qu'est-ce que la VMI® ?</h2>
            <p>
              La <strong>VMI® (Ventilation Mécanique par Insufflation)</strong> est un système de ventilation 
              qui insuffle de l'air neuf, filtré et préchauffé à l'intérieur de la maison. Contrairement à la 
              VMC qui extrait l'air, la VMI crée une légère surpression qui chasse naturellement l'humidité 
              et l'air vicié.
            </p>

            <h2>Comment fonctionne la VMI ?</h2>
            <ol>
              <li><strong>Prise d'air extérieur :</strong> L'air est capté à l'extérieur via une entrée d'air</li>
              <li><strong>Filtration :</strong> L'air passe par des filtres (poussière, pollen, particules)</li>
              <li><strong>Préchauffage :</strong> L'air est réchauffé (récupération de chaleur des combles ou résistance)</li>
              <li><strong>Insufflation :</strong> L'air est insufflé dans la maison via des bouches</li>
              <li><strong>Surpression :</strong> L'air humide et vicié est chassé par les ouvertures naturelles</li>
            </ol>

            <h2>VMI vs VMC : le comparatif</h2>

            <div className="overflow-x-auto my-8 not-prose">
              <table className="w-full border-collapse border border-slate-200">
                <thead className="bg-slate-900 text-white">
                  <tr>
                    <th className="border border-slate-200 p-3 text-left">Critère</th>
                    <th className="border border-slate-200 p-3 text-center">VMI®</th>
                    <th className="border border-slate-200 p-3 text-center">VMC simple flux</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-slate-200 p-3 font-medium">Principe</td>
                    <td className="border border-slate-200 p-3 text-center">Insuffle l'air</td>
                    <td className="border border-slate-200 p-3 text-center">Extrait l'air</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-200 p-3 font-medium">Anti-condensation</td>
                    <td className="border border-slate-200 p-3 text-center text-green-600 font-bold">⭐⭐⭐</td>
                    <td className="border border-slate-200 p-3 text-center">⭐⭐</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 p-3 font-medium">Air préchauffé</td>
                    <td className="border border-slate-200 p-3 text-center text-green-600">✅ Oui</td>
                    <td className="border border-slate-200 p-3 text-center text-red-600">❌ Non</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-200 p-3 font-medium">Filtration</td>
                    <td className="border border-slate-200 p-3 text-center text-green-600">✅ Complète</td>
                    <td className="border border-slate-200 p-3 text-center text-amber-600">Partielle</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 p-3 font-medium">Installation</td>
                    <td className="border border-slate-200 p-3 text-center">1 journée</td>
                    <td className="border border-slate-200 p-3 text-center">1-2 jours</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-200 p-3 font-medium">Prix installé</td>
                    <td className="border border-slate-200 p-3 text-center">2 500 - 4 500€</td>
                    <td className="border border-slate-200 p-3 text-center">1 500 - 3 000€</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>Dans quels cas installer une VMI ?</h2>
            <ul>
              <li>✅ <strong>Condensation :</strong> Moisissures aux fenêtres et dans les angles</li>
              <li>✅ <strong>Maison ancienne :</strong> Pas de VMC existante</li>
              <li>✅ <strong>Rénovation :</strong> Plus simple à installer qu'une VMC</li>
              <li>✅ <strong>Allergies :</strong> Besoin d'air filtré (pollen, poussière)</li>
              <li>✅ <strong>Ponts thermiques :</strong> Murs froids qui condensent</li>
            </ul>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-xl my-8 not-prose">
              <h3 className="font-bold text-slate-900 mb-2">💡 Le saviez-vous ?</h3>
              <p className="text-slate-700">
                Une VMI peut faire économiser jusqu'à 15% sur la facture de chauffage grâce au préchauffage 
                de l'air et à l'élimination de l'humidité (un air sec est plus facile à chauffer).
              </p>
            </div>

            <h2>Installation d'une VMI par IPB</h2>
            <p>
              Nous installons des VMI de qualité professionnelle dans toute la région toulousaine. 
              L'installation prend généralement une journée et inclut :
            </p>
            <ul>
              <li>Diagnostic préalable de votre habitat</li>
              <li>Choix du modèle adapté à votre surface</li>
              <li>Installation du groupe dans les combles</li>
              <li>Pose des bouches d'insufflation</li>
              <li>Mise en service et réglages</li>
              <li>Formation à l'utilisation et à l'entretien</li>
            </ul>

            <h2>Prix VMI installée</h2>
            <ul>
              <li><strong>Appartement / petite maison :</strong> 2 500 - 3 000€</li>
              <li><strong>Maison 100-150m² :</strong> 3 000 - 3 800€</li>
              <li><strong>Grande maison &gt;150m² :</strong> 3 800 - 4 500€</li>
            </ul>
            <p>
              Des aides financières existent (MaPrimeRénov', CEE) pour l'installation d'une VMI dans le 
              cadre d'une rénovation énergétique.
            </p>
          </div>

          {/* Lien vers le HUB */}
          <div className="mt-12 p-8 bg-blue-50 border-2 border-blue-200 rounded-2xl">
            <h3 className="text-xl font-bold text-slate-900 mb-4">💧 En savoir plus sur l'humidité</h3>
            <p className="text-slate-600 mb-4">
              La VMI est une solution efficace, mais elle doit être combinée à un diagnostic global 
              de votre problème d'humidité.
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
          <h2 className="text-3xl font-extrabold mb-6">Condensation dans votre maison ?</h2>
          <p className="text-xl text-blue-100 mb-8">Devis VMI gratuit sous 48h. Installation rapide.</p>
          <Link href="/diagnostic" className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50">
            Demander un devis VMI <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
