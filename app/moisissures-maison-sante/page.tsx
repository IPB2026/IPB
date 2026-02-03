import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { Footer } from '@/components/home/Footer';
import { AlertTriangle, ArrowRight, Phone, CheckCircle, Heart, Wind, Droplets, ShieldAlert } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Moisissures Maison : Risques Santé et Solutions | IPB Expertise',
  description: 'Moisissures dans la maison : dangers pour la santé, causes et traitements efficaces. Allergie, asthme, infections. Expert humidité Toulouse.',
  keywords: ['moisissures maison', 'moisissure santé', 'champignon mur', 'allergie moisissure', 'traitement moisissures'],
  alternates: {
    canonical: 'https://www.ipb-expertise.fr/moisissures-maison-sante',
  },
  openGraph: {
    title: 'Moisissures Maison : Risques Santé et Solutions',
    description: 'Les moisissures sont dangereuses pour la santé. Découvrez les risques et les solutions.',
    url: 'https://www.ipb-expertise.fr/moisissures-maison-sante',
    type: 'article',
  },
};

const risquesSante = [
  {
    categorie: "Allergies",
    symptomes: ["Éternuements", "Nez qui coule", "Yeux irrités", "Démangeaisons"],
    personnesRisque: "Tout le monde, mais surtout les allergiques",
    icon: "🤧"
  },
  {
    categorie: "Problèmes respiratoires",
    symptomes: ["Toux chronique", "Difficultés à respirer", "Asthme aggravé", "Bronchite"],
    personnesRisque: "Asthmatiques, personnes fragiles",
    icon: "🫁"
  },
  {
    categorie: "Infections",
    symptomes: ["Aspergilloses", "Infections pulmonaires", "Mycoses"],
    personnesRisque: "Immunodéprimés, personnes âgées",
    icon: "🦠"
  },
  {
    categorie: "Fatigue et maux de tête",
    symptomes: ["Fatigue chronique", "Maux de tête", "Troubles de la concentration"],
    personnesRisque: "Exposition prolongée",
    icon: "😵"
  },
];

const causesMoisissures = [
  { cause: "Condensation", description: "Manque de ventilation, douches, cuisine...", solution: "VMC, VMI, aération" },
  { cause: "Infiltrations", description: "Toiture, façade, fenêtres défaillantes", solution: "Réparation étanchéité" },
  { cause: "Remontées capillaires", description: "Humidité du sol qui monte dans les murs", solution: "Injection, drainage" },
  { cause: "Ponts thermiques", description: "Zones froides où l'humidité se condense", solution: "Isolation" },
];

const etapesTraitement = [
  { etape: "Diagnostic", description: "Identifier la source d'humidité (essentiel !)" },
  { etape: "Traitement de la cause", description: "Réparer infiltration, améliorer ventilation..." },
  { etape: "Nettoyage professionnel", description: "Traitement fongicide des surfaces touchées" },
  { etape: "Prévention", description: "Mesures pour éviter le retour des moisissures" },
];

const faqItems = [
  {
    question: "Les moisissures sont-elles dangereuses ?",
    answer: "Oui, les moisissures libèrent des spores et des mycotoxines qui peuvent causer allergies, problèmes respiratoires et infections. Les personnes fragiles (enfants, personnes âgées, immunodéprimés) sont particulièrement à risque."
  },
  {
    question: "Peut-on nettoyer les moisissures soi-même ?",
    answer: "Les petites surfaces (moins de 1m²) peuvent être nettoyées avec de l'eau de javel diluée. Au-delà, faites appel à un professionnel équipé. ATTENTION : si les moisissures reviennent, c'est que la cause n'est pas traitée."
  },
  {
    question: "Comment éviter les moisissures ?",
    answer: "Aérez quotidiennement (10 min), utilisez la VMC, évitez de sécher le linge à l'intérieur, chauffez régulièrement. Si le problème persiste, faites diagnostiquer la source d'humidité."
  },
  {
    question: "Combien coûte un traitement anti-moisissures ?",
    answer: "Le nettoyage seul coûte 10-30€/m². Mais le vrai coût est celui du traitement de la cause : de 500€ (VMC) à plusieurs milliers d'euros (étanchéité, isolation)."
  },
];

const jsonLdArticle = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Moisissures Maison : Risques Santé et Solutions",
  "description": "Guide complet sur les moisissures : dangers pour la santé et solutions de traitement.",
  "author": { "@type": "Organization", "name": "IPB Expertise" },
  "publisher": {
    "@type": "Organization",
    "name": "IPB - Institut de Pathologie du Bâtiment",
    "logo": { "@type": "ImageObject", "url": "https://www.ipb-expertise.fr/images/IPB_Logo_HD.png" }
  },
  "datePublished": "2024-01-15",
  "dateModified": new Date().toISOString(),
};

const jsonLdFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqItems.map(item => ({
    "@type": "Question",
    "name": item.question,
    "acceptedAnswer": { "@type": "Answer", "text": item.answer }
  }))
};

export default function MoisissuresMaisonSantePage() {
  return (
    <div className="font-sans text-slate-800 bg-slate-50 antialiased">
      <Script id="article-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArticle) }} />
      <Script id="faq-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }} />
      
      <TopBar />
      <Navbar />

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="flex text-sm text-slate-500">
            <Link href="/" className="hover:text-orange-600">Accueil</Link>
            <span className="mx-2">/</span>
            <Link href="/expert-humidite-toulouse-31" className="hover:text-orange-600">Expert Humidité</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-900">Moisissures</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 to-emerald-950 text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-2 text-red-400 text-sm font-bold mb-4">
            <ShieldAlert size={18} />
            <span>🚨 ALERTE SANTÉ : Votre famille respire des toxines</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
            Ces Moisissures <span className="text-red-400">Rendent Votre Famille Malade</span>
          </h1>
          <p className="text-xl text-slate-300 mb-4">
            À chaque respiration, vos proches inhalent des <strong className="text-white">milliers de spores toxiques</strong>. 
            Allergies, asthme, infections respiratoires... Les moisissures ne sont pas un problème esthétique, 
            c'est une <strong className="text-white">urgence sanitaire</strong>.
          </p>
          <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-4 mb-8">
            <p className="text-red-200 font-bold">
              ⚠️ Un enfant vivant dans une maison avec moisissures a <strong className="text-white">3x plus de risques</strong> de développer de l'asthme — OMS
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/diagnostic" className="bg-red-600 hover:bg-red-500 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 animate-pulse">
              🏥 PROTÉGER MA FAMILLE MAINTENANT <ArrowRight size={18} />
            </Link>
            <a href="tel:0582953375" className="bg-white/10 border border-white/20 px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2">
              <Phone size={18} /> Urgence : 05 82 95 33 75
            </a>
          </div>
          <p className="text-sm text-slate-400 mt-4">✓ Diagnostic rapide · ✓ Traitement définitif · ✓ Garantie résultat</p>
        </div>
      </section>

      {/* Alerte santé */}
      <section className="py-8 bg-red-50 border-y border-red-200">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-start gap-4">
            <Heart className="text-red-500 flex-shrink-0" size={28} />
            <div>
              <h2 className="font-bold text-red-900 mb-1">Votre santé est en jeu</h2>
              <p className="text-red-800">
                Selon l'OMS, vivre dans un logement humide avec moisissures augmente de <strong>40% le risque d'asthme</strong> 
                et de <strong>50% le risque de problèmes respiratoires</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Risques santé */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-8 text-center">
            Les risques pour votre santé
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {risquesSante.map((risque, index) => (
              <div key={index} className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{risque.icon}</span>
                  <h3 className="text-xl font-bold text-slate-900">{risque.categorie}</h3>
                </div>
                <div className="mb-4">
                  <p className="text-sm font-bold text-slate-700 mb-2">Symptômes :</p>
                  <div className="flex flex-wrap gap-2">
                    {risque.symptomes.map((symptome, i) => (
                      <span key={i} className="bg-white text-slate-600 text-sm px-3 py-1 rounded-full border border-slate-200">
                        {symptome}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-slate-500">
                  <strong>Personnes à risque :</strong> {risque.personnesRisque}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Personnes vulnérables */}
      <section className="py-12 bg-amber-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-start gap-4">
            <AlertTriangle className="text-amber-600 flex-shrink-0 mt-1" size={28} />
            <div>
              <h2 className="font-bold text-amber-900 text-xl mb-3">Personnes particulièrement vulnérables</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white rounded-xl p-4 text-center">
                  <span className="text-2xl">👶</span>
                  <p className="font-bold text-slate-900 mt-2">Nourrissons</p>
                  <p className="text-sm text-slate-600">Système immunitaire fragile</p>
                </div>
                <div className="bg-white rounded-xl p-4 text-center">
                  <span className="text-2xl">👴</span>
                  <p className="font-bold text-slate-900 mt-2">Personnes âgées</p>
                  <p className="text-sm text-slate-600">Sensibilité accrue</p>
                </div>
                <div className="bg-white rounded-xl p-4 text-center">
                  <span className="text-2xl">🤒</span>
                  <p className="font-bold text-slate-900 mt-2">Immunodéprimés</p>
                  <p className="text-sm text-slate-600">Risque d'infection grave</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Causes */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-8 text-center">
            D'où viennent les moisissures ?
          </h2>
          <p className="text-lg text-slate-600 text-center mb-8">
            Les moisissures ont besoin de <strong>3 conditions</strong> : humidité, chaleur, et matière organique. 
            Éliminez l'humidité et les moisissures disparaissent.
          </p>
          <div className="space-y-4">
            {causesMoisissures.map((item, index) => (
              <div key={index} className="bg-slate-50 rounded-xl p-5 border border-slate-200 flex flex-col md:flex-row md:items-center gap-4">
                <div className="md:w-1/4">
                  <h3 className="font-bold text-slate-900">{item.cause}</h3>
                </div>
                <div className="md:w-2/5">
                  <p className="text-slate-600 text-sm">{item.description}</p>
                </div>
                <div className="md:w-1/3 flex items-center gap-2">
                  <CheckCircle className="text-green-500" size={18} />
                  <span className="text-sm font-medium text-green-700">{item.solution}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA milieu */}
      <section className="py-16 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold mb-6">Des moisissures chez vous ?</h2>
          <p className="text-xl text-emerald-100 mb-8">
            Ne vous contentez pas de nettoyer : traitez la cause ! 
            Diagnostic sous 48h pour identifier la source d'humidité.
          </p>
          <Link href="/diagnostic" className="inline-flex items-center gap-2 bg-white text-emerald-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-emerald-50">
            Demander un diagnostic <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Étapes traitement */}
      <section className="py-16 bg-slate-100">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-8 text-center">
            Comment traiter efficacement les moisissures ?
          </h2>
          <div className="grid md:grid-cols-4 gap-4">
            {etapesTraitement.map((item, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-slate-200 h-full">
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-700 font-bold">
                    {index + 1}
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">{item.etape}</h3>
                  <p className="text-sm text-slate-600">{item.description}</p>
                </div>
                {index < etapesTraitement.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2">
                    <ArrowRight className="text-slate-300" size={20} />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl">
            <h3 className="font-bold text-amber-900 mb-2">⚠️ L'erreur à ne pas faire</h3>
            <p className="text-amber-800">
              Nettoyer les moisissures sans traiter la cause est <strong>inutile</strong>. 
              Elles reviendront en quelques semaines. Pire : les produits anti-moisissures 
              peuvent masquer le problème sans le résoudre.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-8 text-center">
            Questions fréquentes
          </h2>
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div key={index} className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-2">{item.question}</h3>
                <p className="text-slate-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Liens hub */}
      <section className="py-16 bg-slate-100">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-8 text-center">
            En savoir plus sur l'humidité
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/vmi-ventilation-insufflation" className="bg-white rounded-xl p-6 shadow-lg border border-slate-200 hover:border-emerald-300 transition-all group">
              <Wind className="text-emerald-600 mb-3" size={28} />
              <h3 className="font-bold text-slate-900 group-hover:text-emerald-600 mb-2">VMI / Ventilation</h3>
              <p className="text-slate-600 text-sm">La solution contre la condensation</p>
            </Link>
            <Link href="/remontees-capillaires-traitement" className="bg-white rounded-xl p-6 shadow-lg border border-slate-200 hover:border-emerald-300 transition-all group">
              <Droplets className="text-emerald-600 mb-3" size={28} />
              <h3 className="font-bold text-slate-900 group-hover:text-emerald-600 mb-2">Remontées Capillaires</h3>
              <p className="text-slate-600 text-sm">Humidité qui monte du sol</p>
            </Link>
            <Link href="/expert-humidite-toulouse-31" className="bg-white rounded-xl p-6 shadow-lg border border-slate-200 hover:border-emerald-300 transition-all group">
              <CheckCircle className="text-emerald-600 mb-3" size={28} />
              <h3 className="font-bold text-slate-900 group-hover:text-emerald-600 mb-2">Expert Humidité Toulouse</h3>
              <p className="text-slate-600 text-sm">Tous nos services humidité</p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold mb-6">Protégez votre famille</h2>
          <p className="text-xl text-slate-300 mb-8">
            Les moisissures sont un signal d'alarme. Faites diagnostiquer votre logement.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/diagnostic" className="bg-emerald-600 hover:bg-emerald-500 px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2">
              Diagnostic gratuit <ArrowRight size={20} />
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
