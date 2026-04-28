import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { Footer } from '@/components/home/Footer';
import { Testimonials } from '@/components/home/Testimonials';
import Link from 'next/link';
import Image from 'next/image';
import { Activity, AlertTriangle, CheckCircle, ArrowRight, Shield, Phone, Clock, Star, Award, Ruler, FileText, Hammer, Eye } from 'lucide-react';
import Script from 'next/script';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ouverture Mur Porteur Toulouse & Occitanie | IPB Expertise',
  description: 'Ouverture mur porteur à Toulouse : étude structure, pose poutre IPN/HEB, création baie vitrée. Devis gratuit sous 24h. Garantie décennale. 05 82 95 33 75.',
  keywords: [
    'ouverture mur porteur toulouse',
    'création baie vitrée toulouse',
    'mur porteur prix toulouse',
    'étude structure mur porteur',
    'calcul mur porteur haute-garonne',
    'poutre IPN mur porteur',
    'bureau études structure toulouse',
    'agrandissement baie vitrée',
    'abattre mur porteur toulouse',
    'expert structure bâtiment toulouse',
    'démolition mur porteur prix',
    'mur porteur maison ancienne',
  ],
  alternates: {
    canonical: 'https://www.ipb-expertise.fr/expertise/mur-porteur',
  },
  openGraph: {
    title: 'Ouverture Mur Porteur Toulouse & Occitanie (31-82-32) | IPB',
    description: 'Étude structure, pose poutre, création baie vitrée. Intervention sous 48h. Garantie décennale.',
    url: 'https://www.ipb-expertise.fr/expertise/mur-porteur',
    siteName: 'IPB - Institut de Pathologie du Bâtiment',
    locale: 'fr_FR',
    type: 'website',
  },
};

const faqMurPorteur = [
  {
    question: "Comment savoir si mon mur est porteur ?",
    answer: "Un mur porteur supporte les charges des planchers et de la toiture. Les indices sont : un mur perpendiculaire à la façade, une poutre ou poteaux au-dessus, ou un mur situé au rez-de-chaussée sous une pièce habitée à l'étage. Seul un diagnostic structure réalisé par un professionnel avec les plans ou un sondage peut le confirmer avec certitude."
  },
  {
    question: "Quel est le prix d'une ouverture de mur porteur à Toulouse ?",
    answer: "Le coût total comprend l'étude structure (500 à 1 500 €), l'étaiement provisoire, la pose de la poutre IPN ou HEB (2 500 à 8 000 € selon la portée) et les finitions. Pour une ouverture standard de 2,5 m, comptez entre 4 000 et 10 000 € TTC. Un devis précis est établi après visite technique."
  },
  {
    question: "Faut-il un permis de construire pour ouvrir un mur porteur ?",
    answer: "Dans la plupart des cas, une simple déclaration préalable de travaux suffit si vous ne modifiez pas la surface habitable. Si vous créez une ouverture sur la façade (baie vitrée vers l'extérieur), un permis de construire peut être nécessaire selon la surface créée et le PLU de votre commune. Nous vous guidons dans les démarches."
  },
  {
    question: "Combien de temps durent les travaux d'ouverture de mur porteur ?",
    answer: "L'intervention proprement dite dure 2 à 5 jours selon la portée et la complexité. La phase de préparation (étude, déclaration, commande poutre) prend 3 à 6 semaines en amont. Nous coordonnons l'ensemble du chantier."
  },
  {
    question: "Quelle poutre utiliser pour un mur porteur ?",
    answer: "Le dimensionnement de la poutre (IPN, HEB, BA ou mixte) est calculé par notre ingénieur structure en fonction de la portée, des charges reprises et de la nature des planchers. Un sous-dimensionnement peut entraîner des fissurations ou un effondrement — c'est pourquoi le calcul de structure est non négociable."
  },
  {
    question: "IPB réalise-t-il à la fois l'étude et les travaux ?",
    answer: "Oui. C'est notre valeur ajoutée : un seul interlocuteur de l'expertise au chantier. Notre ingénieur réalise l'étude structure, dimensionne la poutre et supervise les travaux réalisés par nos équipes. Résultat : cohérence totale et garantie décennale sur l'ensemble."
  },
];

const generateFaqJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqMurPorteur.map((item) => ({
    "@type": "Question",
    "name": item.question,
    "acceptedAnswer": { "@type": "Answer", "text": item.answer }
  }))
});

const generateServiceJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Ouverture de mur porteur et création de baie vitrée",
  "provider": {
    "@type": "LocalBusiness",
    "name": "IPB - Institut de Pathologie du Bâtiment",
    "telephone": "+33582953375",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "13 rue du Recteur Dottin",
      "addressLocality": "Toulouse",
      "addressRegion": "Occitanie",
      "postalCode": "31100",
      "addressCountry": "FR"
    }
  },
  "areaServed": [
    { "@type": "AdministrativeArea", "name": "Haute-Garonne (31)" },
    { "@type": "AdministrativeArea", "name": "Tarn-et-Garonne (82)" },
    { "@type": "AdministrativeArea", "name": "Gers (32)" },
    { "@type": "AdministrativeArea", "name": "Tarn (81)" }
  ],
  "description": "Ouverture de mur porteur avec étude structure, pose poutre IPN/HEB et création de baie vitrée. Garantie décennale."
});

export default function MurPorteurPage() {
  return (
    <div className="font-sans text-slate-800 bg-slate-50 antialiased">
      <Script id="faq-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFaqJsonLd()) }} />
      <Script id="service-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateServiceJsonLd()) }} />

      <TopBar />
      <Navbar />
      <main id="main-content">

        {/* HERO */}
        <section className="relative bg-slate-900 text-white overflow-hidden py-16 md:py-24">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-orange-950/60"></div>
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/40 text-green-300 px-3 py-1.5 rounded-full text-xs font-bold">
                    <Star size={12} className="fill-current" /> 4.9/5 sur Google
                  </span>
                  <span className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/40 text-orange-300 px-3 py-1.5 rounded-full text-xs font-bold">
                    <Shield size={12} /> Garantie décennale
                  </span>
                  <span className="hidden lg:inline-flex items-center gap-2 bg-white/10 border border-white/20 text-slate-300 px-3 py-1.5 rounded-full text-xs font-bold">
                    <Clock size={12} /> Devis sous 24h
                  </span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
                  Ouverture{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">
                    Mur Porteur
                  </span>
                  <span className="block text-3xl md:text-4xl mt-2 text-white">
                    & Création Baie Vitrée à Toulouse
                  </span>
                </h1>

                <p className="text-xl text-slate-300 mb-6 leading-relaxed">
                  <strong className="text-white">Étude structure + travaux</strong> en un seul interlocuteur.
                  Nous dimensionnons la poutre, posons l'étaiement et réalisons l'ouverture.{' '}
                  <strong className="text-orange-300">Garantie décennale sur l'ensemble.</strong>
                </p>

                {/* Prix indicatif */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-8 border border-white/20">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <p className="text-sm text-slate-400">Ouverture standard (2,5 m)</p>
                      <p className="text-2xl font-bold text-white">4 000 € – 10 000 €</p>
                    </div>
                    <div className="text-center px-4 border-l border-white/20">
                      <p className="text-sm text-slate-400">Étude structure incluse</p>
                      <p className="text-lg font-bold text-white">Dès 500 €</p>
                    </div>
                    <div className="bg-orange-500/20 px-3 py-2 rounded-lg">
                      <p className="text-orange-400 font-bold text-sm">Garanti</p>
                      <p className="text-orange-400 font-bold text-lg">10 ans</p>
                    </div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <Link href="/diagnostic" className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white px-8 py-5 rounded-xl font-bold text-lg shadow-xl flex items-center justify-center gap-2 transition-all hover:-translate-y-1 hover:shadow-2xl">
                    Devis gratuit en 3 min
                    <ArrowRight size={20} />
                  </Link>
                  <a href="tel:0582953375" className="bg-white/10 backdrop-blur border border-white/20 text-white px-8 py-5 rounded-xl font-bold text-lg hover:bg-white/20 flex items-center justify-center gap-2">
                    <Phone size={20} /> 05 82 95 33 75
                  </a>
                </div>

                <div className="flex items-center gap-4 text-sm text-slate-400">
                  <span className="flex items-center gap-1"><Clock size={14} /> Réponse 24h</span>
                  <span className="flex items-center gap-1"><CheckCircle size={14} className="text-green-400" /> Devis gratuit</span>
                  <span className="flex items-center gap-1"><CheckCircle size={14} className="text-green-400" /> Sans engagement</span>
                </div>
              </div>

              {/* Trust box desktop */}
              <div className="hidden lg:block">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 mb-6">
                  <h2 className="text-xl font-bold mb-6 text-center">Pourquoi choisir IPB ?</h2>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                        <Ruler className="text-orange-400" size={24} />
                      </div>
                      <div>
                        <p className="font-bold text-white">Étude structure en interne</p>
                        <p className="text-sm text-slate-400">Calcul poutre par notre ingénieur</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                        <Shield className="text-green-400" size={24} />
                      </div>
                      <div>
                        <p className="font-bold text-white">Garantie décennale</p>
                        <p className="text-sm text-slate-400">Sur l'étude ET les travaux</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center">
                        <Award className="text-amber-400" size={24} />
                      </div>
                      <div>
                        <p className="font-bold text-white">850+ chantiers réalisés</p>
                        <p className="text-sm text-slate-400">en Occitanie (31-82-32-81)</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Checklist */}
                <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
                  <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                    <AlertTriangle className="text-yellow-400" size={18} />
                    Votre projet en tête ?
                  </h4>
                  <ul className="space-y-2 text-sm">
                    {[
                      'Agrandir salon / cuisine',
                      'Créer une baie vitrée sur jardin',
                      'Abattre un mur entre deux pièces',
                      'Faire entrer la lumière naturelle',
                      'Valoriser votre bien avant revente',
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-slate-300">
                        <span className="text-orange-400">✓</span> {item}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-xs text-slate-400">
                    Nous réalisons le diagnostic structure, le calcul de la poutre et les travaux.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section visuelle — schéma technique + chantier réel */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-orange-600 text-xs font-bold uppercase tracking-[0.2em] mb-3">
                Concrètement, ça donne quoi ?
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 leading-tight tracking-tight max-w-3xl mx-auto">
                Le schéma à gauche. Le résultat à droite.
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
              {/* Schéma technique */}
              <div className="relative bg-slate-50 rounded-3xl overflow-hidden shadow-xl ring-1 ring-slate-200 p-4 md:p-6 flex flex-col">
                <p className="text-orange-600 text-xs font-bold uppercase tracking-wider mb-3">Le principe</p>
                <div className="relative flex-1 min-h-[300px] rounded-2xl overflow-hidden bg-white">
                  <Image
                    src="/images/schema-ouverture-mur-porteur.webp"
                    alt="Schéma technique d'une ouverture de mur porteur — pose d'une poutre IPN avec étaiement et reprise des charges"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-contain"
                  />
                </div>
                <p className="text-slate-600 text-sm mt-4 leading-relaxed">
                  On installe d'abord des étais sous le plancher du dessus pour reprendre les charges. Puis on découpe le mur, on glisse une poutre métallique, et on la scelle. <strong className="text-slate-900">Tout repose maintenant sur la poutre.</strong>
                </p>
              </div>

              {/* Photo chantier */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl ring-1 ring-slate-200 group">
                <div className="aspect-square md:aspect-auto md:h-full">
                  <Image
                    src="/images/baie-coulissante-apres.webp"
                    alt="Baie coulissante installée après ouverture de mur porteur — chantier IPB Toulouse"
                    width={800}
                    height={800}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <p className="text-orange-300 text-xs font-bold uppercase tracking-wider mb-2">Le résultat</p>
                  <h3 className="text-white font-display font-bold text-2xl md:text-3xl leading-tight mb-2">
                    Un espace ouvert, lumineux.
                  </h3>
                  <p className="text-slate-200 text-sm leading-relaxed">
                    Une baie vitrée coulissante posée sur l'ouverture. Plus de mur entre vous et le jardin.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sommaire */}
        <section className="py-8 bg-white border-b border-slate-200">
          <div className="max-w-6xl mx-auto px-4">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-4">Sur cette page</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
                {[
                  { href: '#comment-savoir', label: 'Comment identifier un mur porteur', num: 1 },
                  { href: '#processus', label: 'Notre processus en 4 étapes', num: 2 },
                  { href: '#prix', label: 'Prix et facteurs de coût', num: 3 },
                  { href: '#baie-vitree', label: 'Création baie vitrée', num: 4 },
                  { href: '#faq', label: 'FAQ', num: 5 },
                ].map(({ href, label, num }) => (
                  <a key={href} href={href} className="flex items-center gap-2 text-orange-600 hover:text-orange-700 hover:underline">
                    <span className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center text-xs font-bold text-orange-600">{num}</span>
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Comment identifier */}
        <section id="comment-savoir" className="py-16 md:py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
                <Eye size={16} /> Diagnostic préalable obligatoire
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                Comment savoir si votre mur est porteur ?
              </h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                Ouvrir un mur porteur sans étude préalable, c'est prendre le risque d'un effondrement partiel.
                Le diagnostic structure est l'étape non négociable.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <AlertTriangle className="text-red-600" size={22} />
                  Indices qu'il est porteur
                </h3>
                <ul className="space-y-3 text-sm">
                  {[
                    'Mur perpendiculaire aux solives du plancher',
                    'Présence d\'une poutre ou poteau au-dessus',
                    'Mur situé au centre de la maison',
                    'Épaisseur supérieure à 15–20 cm en brique/pierre',
                    'Situé sous une pièce habitée à l\'étage',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-slate-700">
                      <span className="text-red-500 font-bold mt-0.5">!</span> {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <CheckCircle className="text-green-600" size={22} />
                  Indices qu'il est de doublage
                </h3>
                <ul className="space-y-3 text-sm">
                  {[
                    'Mur parallèle à la façade principale',
                    'Cloison légère (placo, brique de 5)',
                    'Aucune charge visible au-dessus',
                    'Son creux quand on tape dessus',
                    'Mur de séparation d\'une salle de bain, placard',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-slate-700">
                      <span className="text-green-500 font-bold mt-0.5">✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-orange-50 border-l-4 border-orange-500 rounded-r-xl p-6">
              <p className="font-bold text-orange-900 mb-1">La règle d'or</p>
              <p className="text-orange-800">
                Ces indices orientent, ils ne suffisent pas. Seul un professionnel ayant accès aux plans ou réalisant des sondages peut confirmer la nature du mur.{' '}
                <strong>Ne jamais toucher à un mur sans diagnostic structure écrit.</strong>
              </p>
            </div>
          </div>
        </section>

        {/* Processus 4 étapes */}
        <section id="processus" className="py-16 md:py-20 bg-slate-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                Notre processus en 4 étapes
              </h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                De l'étude à la livraison, nous gérons l'intégralité du projet — sans sous-traitance cachée.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6 mb-12">
              {[
                {
                  num: 1,
                  icon: <FileText size={24} className="text-orange-600" />,
                  title: 'Étude structure',
                  detail: 'Notre ingénieur regarde le mur, calcule ce qu\'il supporte, choisit la bonne poutre et signe le calcul technique.',
                },
                {
                  num: 2,
                  icon: <Ruler size={24} className="text-orange-600" />,
                  title: 'Démarches admin',
                  detail: 'Déclaration préalable ou permis de construire selon votre projet. Nous vous accompagnons dans les démarches.',
                },
                {
                  num: 3,
                  icon: <Hammer size={24} className="text-orange-600" />,
                  title: 'Travaux (2–5 jours)',
                  detail: 'Étaiement provisoire, découpe du mur, pose de la poutre, linteaux et finitions. Chantier propre et sécurisé.',
                },
                {
                  num: 4,
                  icon: <Shield size={24} className="text-orange-600" />,
                  title: 'Réception & garantie',
                  detail: 'On retire les étais, on vérifie que tout est bon, on vous remet tous les documents du chantier et l\'attestation de garantie 10 ans.',
                },
              ].map(({ num, icon, title, detail }) => (
                <div key={num} className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 text-center">
                  <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    {icon}
                  </div>
                  <div className="text-xs font-bold text-orange-500 uppercase tracking-wider mb-1">Étape {num}</div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
                  <p className="text-sm text-slate-600">{detail}</p>
                </div>
              ))}
            </div>

            <div className="bg-orange-600 rounded-2xl p-8 text-white text-center">
              <p className="text-xl font-bold mb-4">Votre projet prend forme ?</p>
              <p className="text-orange-100 mb-6">Obtenez un premier chiffrage sous 24h, sans engagement.</p>
              <Link href="/diagnostic" className="inline-flex items-center gap-2 bg-white text-orange-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-orange-50 transition-all">
                Décrire mon projet <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </section>

        {/* Prix */}
        <section id="prix" className="py-16 md:py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                Prix d'une ouverture de mur porteur
              </h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                Le coût varie selon la portée, la nature du mur et la poutre nécessaire.
                Voici les fourchettes constatées en Occitanie.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden mb-10">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-900 text-white">
                    <tr>
                      <th className="px-6 py-4 text-left font-bold">Poste</th>
                      <th className="px-6 py-4 text-center font-bold bg-orange-600">Coût indicatif TTC</th>
                      <th className="px-6 py-4 text-center font-bold">Détail</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {[
                      { poste: 'Étude structure + note de calcul', cost: '500 – 1 500 €', detail: 'Obligatoire — dimensionne la poutre' },
                      { poste: 'Étaiement provisoire', cost: '300 – 800 €', detail: 'Sécurisation avant ouverture' },
                      { poste: 'Ouverture + pose poutre (2,5 m)', cost: '2 500 – 6 000 €', detail: 'Maçonnerie + charpente métallique' },
                      { poste: 'Finitions (ragréage, enduit)', cost: '800 – 2 000 €', detail: 'Selon état des parements' },
                      { poste: 'Total ouverture standard', cost: '4 000 – 10 000 €', detail: 'Tout compris, garanti 10 ans' },
                    ].map(({ poste, cost, detail }) => (
                      <tr key={poste} className="hover:bg-slate-50">
                        <td className="px-6 py-4 font-medium text-slate-900">{poste}</td>
                        <td className="px-6 py-4 text-center font-bold text-orange-600">{cost}</td>
                        <td className="px-6 py-4 text-center text-slate-500 text-sm">{detail}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { titre: 'Petite ouverture (≤ 1,5 m)', prix: '2 500 – 5 000 €', ex: 'Passage entre deux pièces' },
                { titre: 'Ouverture standard (1,5 – 3 m)', prix: '5 000 – 10 000 €', ex: 'Cuisine / salon ouverts' },
                { titre: 'Grande baie (> 3 m)', prix: '10 000 – 20 000 €', ex: 'Baie vitrée panoramique' },
              ].map(({ titre, prix, ex }) => (
                <div key={titre} className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center">
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-2">{titre}</p>
                  <p className="text-2xl font-extrabold text-orange-600 mb-1">{prix}</p>
                  <p className="text-xs text-slate-500">{ex}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Baie vitrée */}
        <section id="baie-vitree" className="py-16 md:py-20 bg-slate-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
                <Activity size={16} /> Service complémentaire
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                Création de baie vitrée
              </h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                L'ouverture de mur porteur est souvent la première étape d'une baie vitrée sur jardin ou terrasse.
                Nous réalisons l'ensemble : structure, menuiserie et étanchéité.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-10">
              <div className="bg-white border border-slate-200 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Ce que nous réalisons</h3>
                <ul className="space-y-3">
                  {[
                    'Étude structure et calcul de linteau',
                    'Ouverture du mur porteur ou de façade',
                    'Pose du dormant et de la baie vitrée',
                    'Étanchéité périphérique',
                    'Finitions intérieures et extérieures',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-slate-700">
                      <CheckCircle size={18} className="text-orange-500 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Avantages d'une baie vitrée</h3>
                <ul className="space-y-3">
                  {[
                    'Luminosité naturelle maximale',
                    'Connexion visuelle intérieur / jardin',
                    'Valorisation du bien (+10 à +20 %)',
                    'Confort thermique avec double vitrage',
                    'Agrandissement sans extension',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-slate-700">
                      <CheckCircle size={18} className="text-orange-500 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-slate-900 text-white rounded-2xl p-8 text-center">
              <p className="text-xl font-bold mb-2">Prêt à transformer votre espace ?</p>
              <p className="text-slate-400 mb-6">Devis gratuit — réponse d'un expert sous 24h.</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/diagnostic" className="bg-orange-600 hover:bg-orange-500 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2">
                  Décrire mon projet <ArrowRight size={20} />
                </Link>
                <a href="tel:0582953375" className="bg-white/10 border border-white/20 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-white/20">
                  <Phone size={20} /> 05 82 95 33 75
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Avis */}
        <section className="bg-white">
          <Testimonials />
        </section>

        {/* FAQ */}
        <section id="faq" className="py-16 md:py-20 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-slate-900">Questions fréquentes</h2>
            </div>
            <div className="space-y-4">
              {faqMurPorteur.map(({ question, answer }) => (
                <details key={question} className="bg-white border border-slate-200 rounded-xl group">
                  <summary className="flex items-center justify-between p-6 cursor-pointer font-bold text-slate-900 list-none">
                    {question}
                    <span className="ml-4 text-orange-500 group-open:rotate-45 transition-transform text-xl font-light">+</span>
                  </summary>
                  <div className="px-6 pb-6 text-slate-600 leading-relaxed">{answer}</div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-16 md:py-20 bg-gradient-to-r from-orange-600 to-amber-600 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
              Votre mur porteur, notre expertise
            </h2>
            <p className="text-xl text-orange-100 mb-8">
              Devis gratuit en 3 minutes. Réponse d'un ingénieur structure sous 24h.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/diagnostic" className="bg-white text-orange-600 px-10 py-5 rounded-xl font-bold text-lg hover:bg-orange-50 flex items-center justify-center gap-2 shadow-xl">
                Lancer mon devis gratuit <ArrowRight size={20} />
              </Link>
              <a href="tel:0582953375" className="bg-orange-700 hover:bg-orange-800 px-8 py-5 rounded-xl font-bold text-lg flex items-center justify-center gap-2">
                <Phone size={20} /> 05 82 95 33 75
              </a>
            </div>
            <p className="text-sm text-orange-200 mt-6">✓ Gratuit · ✓ Sans engagement · ✓ Réponse 24h</p>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
