import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { Footer } from '@/components/home/Footer';
import { AlertTriangle, ArrowRight, Phone, FileText, CheckCircle, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Fissure Sécheresse : Indemnisation CAT-NAT 2024-2025 | Guide Complet',
  description: 'Fissures maison après sécheresse ? Guide complet indemnisation CAT-NAT : démarches, délais (10 jours), franchise, expertise assurance. Aide pour votre dossier Haute-Garonne.',
  keywords: [
    'fissure sécheresse indemnisation',
    'CAT-NAT sécheresse 2024',
    'catastrophe naturelle fissures',
    'RGA retrait gonflement argiles',
    'indemnisation fissures assurance',
    'arrêté catastrophe naturelle',
    'expert assurance fissures',
    'franchise CAT-NAT sécheresse',
    'dossier sinistre fissures',
    'sol argileux sécheresse',
    'expertise assurance maison',
    'fissures maison toulouse',
  ],
  alternates: {
    canonical: 'https://www.ipb-expertise.fr/fissure-secheresse-indemnisation',
  },
  openGraph: {
    title: 'Indemnisation Fissures Sécheresse : Guide CAT-NAT',
    description: 'Comment obtenir l\'indemnisation de vos fissures après sécheresse. Démarches et conseils.',
    url: 'https://www.ipb-expertise.fr/fissure-secheresse-indemnisation',
    type: 'article',
  },
  robots: { index: true, follow: true },
};

const faqItems = [
  {
    question: "Ma maison est fissurée après la sécheresse, suis-je indemnisé ?",
    answer: "Si votre commune a obtenu un arrêté de catastrophe naturelle (CAT-NAT) pour sécheresse, oui. Vous devez déclarer le sinistre dans les 10 jours suivant la publication de l'arrêté au Journal Officiel."
  },
  {
    question: "Comment savoir si ma commune est reconnue CAT-NAT ?",
    answer: "Consultez le site georisques.gouv.fr ou contactez votre mairie. Les arrêtés sont publiés au Journal Officiel et repris par la presse locale."
  },
  {
    question: "Quel est le montant de l'indemnisation ?",
    answer: "L'assurance couvre les travaux de réparation définis par l'expert, moins la franchise légale (1 520€ pour les sécheresses en 2024). Attention : les travaux préventifs ne sont pas couverts."
  },
  {
    question: "L'assurance peut-elle refuser mon dossier ?",
    answer: "Oui, si les fissures préexistaient à la sécheresse, si le lien de causalité n'est pas prouvé, ou si vous avez déclaré hors délai. Un expert indépendant peut vous aider à monter un dossier solide."
  },
  {
    question: "Faut-il un expert pour mon dossier CAT-NAT ?",
    answer: "L'assurance mandate son propre expert, mais vous pouvez (et devriez) faire appel à un expert d'assuré indépendant pour défendre vos intérêts et contester si besoin."
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

export default function FissureSecheressePage() {
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
          <span className="text-slate-900">Fissure sécheresse</span>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-2 text-amber-400 text-sm font-bold mb-4">
            <FileText size={18} />
            <span>Indemnisation CAT-NAT</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
            Fissure Sécheresse : Comment Être Indemnisé ?
          </h1>
          <p className="text-xl text-slate-300 mb-8">
            Votre maison s'est fissurée après une sécheresse ? Découvrez les démarches pour obtenir 
            une indemnisation via le régime CAT-NAT et maximiser vos chances d'être couvert.
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

      {/* Alerte */}
      <section className="py-8 bg-amber-50 border-b border-amber-200">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-start gap-4">
            <Clock className="text-amber-600 flex-shrink-0" size={24} />
            <div>
              <p className="font-bold text-amber-900">⏱️ Délai important</p>
              <p className="text-amber-800">
                Vous avez <strong>10 jours</strong> après la publication de l'arrêté CAT-NAT pour déclarer le sinistre à votre assurance. Ne tardez pas !
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contenu */}
      <article className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4">
          <div className="prose prose-lg max-w-none">
            <h2>Le phénomène RGA : pourquoi les sécheresses fissurent les maisons</h2>
            <p>
              Le <strong>Retrait-Gonflement des Argiles (RGA)</strong> est la première cause de sinistres sur les maisons 
              individuelles en France. En période de sécheresse, les sols argileux se rétractent, créant des mouvements 
              de terrain qui fissurent les fondations et les murs.
            </p>
            <p>
              La <strong>Haute-Garonne</strong>, le <strong>Tarn-et-Garonne</strong> et le <strong>Gers</strong> sont particulièrement 
              touchés, avec des sols argileux sur plus de 60% de leur territoire. Depuis 2018, les arrêtés CAT-NAT sécheresse 
              se multiplient dans la région.
            </p>

            <div className="bg-slate-100 rounded-2xl p-6 my-8 not-prose">
              <h3 className="text-xl font-bold text-slate-900 mb-4">📊 Chiffres clés Occitanie</h3>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-4xl font-extrabold text-orange-600">200+</div>
                  <div className="text-slate-600 text-sm">Arrêtés CAT-NAT depuis 2018</div>
                </div>
                <div>
                  <div className="text-4xl font-extrabold text-orange-600">60%</div>
                  <div className="text-slate-600 text-sm">Sols à risque RGA</div>
                </div>
                <div>
                  <div className="text-4xl font-extrabold text-orange-600">15K€</div>
                  <div className="text-slate-600 text-sm">Coût moyen réparation</div>
                </div>
              </div>
            </div>

            <h2>Les étapes pour être indemnisé</h2>

            <h3>1. Vérifier l'arrêté CAT-NAT</h3>
            <p>
              Votre commune doit avoir demandé et obtenu un arrêté de catastrophe naturelle pour sécheresse. 
              Vérifiez sur <a href="https://www.georisques.gouv.fr" target="_blank" rel="noopener noreferrer">georisques.gouv.fr</a> 
              ou auprès de votre mairie.
            </p>

            <h3>2. Déclarer le sinistre à votre assurance</h3>
            <p>
              Vous avez <strong>10 jours</strong> après la publication de l'arrêté au Journal Officiel pour envoyer 
              une déclaration à votre assurance (lettre recommandée avec AR conseillée). Joignez des photos des fissures.
            </p>

            <h3>3. L'expert de l'assurance intervient</h3>
            <p>
              L'assurance mandate un expert pour constater les dégâts et évaluer si le lien avec la sécheresse est établi. 
              <strong>Attention :</strong> cet expert défend les intérêts de l'assurance, pas les vôtres.
            </p>

            <h3>4. (Recommandé) Faites appel à un expert indépendant</h3>
            <p>
              Un <strong>expert d'assuré</strong> ou un bureau d'expertise indépendant comme IPB peut :
            </p>
            <ul>
              <li>Documenter précisément les fissures et leur origine</li>
              <li>Établir un rapport technique solide</li>
              <li>Vous accompagner en contre-expertise si l'assurance minimise</li>
              <li>Défendre vos intérêts face à l'expert de l'assurance</li>
            </ul>

            <h3>5. Indemnisation et travaux</h3>
            <p>
              Si le dossier est accepté, l'assurance vous indemnise pour les travaux de réparation (moins la franchise). 
              Vous êtes libre de choisir l'entreprise qui réalisera les travaux.
            </p>

            <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-xl my-8 not-prose">
              <h3 className="font-bold text-slate-900 mb-2">💡 Astuce : anticipez !</h3>
              <p className="text-slate-700">
                Même si l'arrêté CAT-NAT n'est pas encore publié, faites constater vos fissures par un expert. 
                Le rapport servira de preuve de l'état "avant" et renforcera votre dossier.
              </p>
            </div>

            <h2>La franchise CAT-NAT sécheresse</h2>
            <p>
              Pour les sinistres sécheresse, la franchise légale est de <strong>1 520€</strong> (2024). Elle peut être 
              majorée si votre commune a connu plusieurs arrêtés CAT-NAT sans mettre en place de plan de prévention.
            </p>

            <h2>Que faire si l'assurance refuse ?</h2>
            <ol>
              <li><strong>Contre-expertise :</strong> Demandez une contre-expertise avec votre propre expert</li>
              <li><strong>Médiation :</strong> Saisissez le médiateur de l'assurance</li>
              <li><strong>Recours juridique :</strong> En dernier recours, tribunal judiciaire</li>
            </ol>

            <h2>Tarifs expertise IPB pour dossier CAT-NAT</h2>
            <ul>
              <li><strong>Diagnostic initial :</strong> 149€ (déductible si travaux)</li>
              <li><strong>Rapport technique complet :</strong> 350-500€</li>
              <li><strong>Accompagnement contre-expertise :</strong> sur devis</li>
            </ul>
          </div>

          {/* Lien vers le HUB */}
          <div className="mt-12 p-8 bg-orange-50 border-2 border-orange-200 rounded-2xl">
            <h3 className="text-xl font-bold text-slate-900 mb-4">📚 En savoir plus sur les fissures</h3>
            <p className="text-slate-600 mb-4">
              Consultez notre guide complet : types de fissures, causes, solutions techniques et tarifs.
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
          <h2 className="text-3xl font-extrabold mb-6">Dossier CAT-NAT à constituer ?</h2>
          <p className="text-xl text-orange-100 mb-8">Nous vous accompagnons de A à Z pour maximiser votre indemnisation.</p>
          <Link href="/diagnostic" className="inline-flex items-center gap-2 bg-white text-orange-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-orange-50">
            Prendre rendez-vous <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
