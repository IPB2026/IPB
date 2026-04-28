import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { Footer } from '@/components/home/Footer';
import { AlertTriangle, ArrowRight, Phone, Calendar, MapPin, Clock, FileText, CheckCircle } from 'lucide-react';

// 🎯 TRIGGER EVENT: À mettre à jour dès publication d'un arrêté CAT-NAT
// Instructions: Modifier les variables ci-dessous lors de la publication

const ARRETE_DATE = "Janvier 2026"; // Mois de l'arrêté
const PUBLICATION_JO = "15 janvier 2026"; // Date publication Journal Officiel
const DELAI_DECLARATION = "25 janvier 2026"; // Date limite déclaration (10 jours après JO)

const COMMUNES_31 = [
  "Toulouse", "Colomiers", "Tournefeuille", "Blagnac", "Muret",
  "Cugnaux", "Plaisance-du-Touch", "Balma", "L'Union", "Ramonville-Saint-Agne",
  "Castanet-Tolosan", "Saint-Orens-de-Gameville", "Fonsorbes", "Portet-sur-Garonne"
  // Ajouter les communes concernées par l'arrêté
];

const COMMUNES_82 = [
  "Montauban", "Castelsarrasin", "Moissac"
  // Ajouter les communes du 82 concernées
];

const COMMUNES_32 = [
  "Auch", "Condom"
  // Ajouter les communes du 32 concernées
];

export const metadata: Metadata = {
  title: `Arrêté Sécheresse ${ARRETE_DATE} : Communes Reconnues CAT-NAT | IPB`,
  description: `Arrêté catastrophe naturelle sécheresse ${ARRETE_DATE}. Liste des communes Haute-Garonne, Tarn-et-Garonne, Gers. Démarches indemnisation. Délai 10 jours.`,
  keywords: ['arrêté sécheresse 2026', 'CAT-NAT', 'catastrophe naturelle', 'fissures sécheresse', 'indemnisation'],
  alternates: {
    canonical: 'https://www.ipb-expertise.fr/actualites/arrete-secheresse-2026',
  },
};

const etapesDemarche = [
  {
    numero: 1,
    titre: "Vérifiez votre commune",
    description: "Consultez la liste ci-dessous pour voir si votre commune est reconnue.",
    delai: "Immédiat"
  },
  {
    numero: 2,
    titre: "Déclarez à votre assurance",
    description: "Envoyez une lettre recommandée avec AR à votre assurance habitation.",
    delai: `Avant le ${DELAI_DECLARATION}`
  },
  {
    numero: 3,
    titre: "Faites constater les dégâts",
    description: "Un expert (assurance ou indépendant) doit constater les fissures.",
    delai: "Sous 15 jours"
  },
  {
    numero: 4,
    titre: "Recevez l'indemnisation",
    description: "L'assurance vous propose un montant de réparation.",
    delai: "2-3 mois"
  }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  "headline": `Arrêté Sécheresse ${ARRETE_DATE} : Communes Reconnues CAT-NAT en Occitanie`,
  "datePublished": "2026-01-16",
  "dateModified": new Date().toISOString(),
  "author": { "@type": "Organization", "name": "IPB Expertise" },
  "publisher": {
    "@type": "Organization",
    "name": "IPB - Institut de Pathologie du Bâtiment",
    "logo": { "@type": "ImageObject", "url": "https://www.ipb-expertise.fr/images/IPB_Logo_HD.png" }
  }
};

export default function ArreteSecheresse2026Page() {
  return (
    <div className="font-sans text-ipb-text bg-ipb-cream antialiased">
      <Script id="article-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      <TopBar />
      <Navbar />

      {/* Alerte info */}
      <div className="bg-amber-600 text-white py-3">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-3">
          <AlertTriangle size={20} />
          <span className="font-bold">Le délai de déclaration ({DELAI_DECLARATION}) est passé. Contactez-nous pour vérifier vos droits — des recours restent possibles.</span>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 to-amber-950 text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-2 text-amber-400 text-sm font-bold mb-4">
            <Calendar size={18} />
            <span>Publié le {PUBLICATION_JO}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
            Arrêté Sécheresse {ARRETE_DATE} : <br/>
            <span className="text-amber-400">Communes Reconnues CAT-NAT</span>
          </h1>
          <p className="text-xl text-white/70 mb-8">
            L'arrêté de catastrophe naturelle sécheresse vient d'être publié. 
            Vérifiez si votre commune est concernée et agissez dans les 10 jours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/diagnostic" className="bg-amber-500 hover:bg-amber-400 text-ipb-text px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2">
              Faire constater mes fissures <ArrowRight size={18} />
            </Link>
            <a href="tel:0582953375" className="bg-white/10 border border-white/20 px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2">
              <Phone size={18} /> 05 82 95 33 75
            </a>
          </div>
        </div>
      </section>

      {/* Délai */}
      <section className="py-8 bg-amber-50 border-b border-amber-200">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Clock className="text-amber-600" size={32} />
              <div>
                <p className="font-bold text-ipb-text">Délai de déclaration</p>
                <p className="text-amber-700">10 jours après publication au Journal Officiel</p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm text-ipb-muted">Date limite</p>
              <p className="text-2xl font-extrabold text-red-600">{DELAI_DECLARATION}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contenu */}
      <article className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4">
          <div className="prose prose-lg max-w-none">
            <h2>Qu'est-ce que l'arrêté CAT-NAT sécheresse ?</h2>
            <p>
              L'arrêté de <strong>catastrophe naturelle sécheresse</strong> (CAT-NAT) permet aux propriétaires 
              dont les maisons ont été fissurées par le retrait-gonflement des argiles (RGA) d'être 
              indemnisés par leur assurance habitation.
            </p>
            <p>
              Cet arrêté concerne la période de sécheresse de <strong>{ARRETE_DATE}</strong> et 
              reconnaît officiellement que les dommages subis sont dus à un phénomène naturel.
            </p>

            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl my-8 not-prose">
              <h3 className="font-bold text-red-900 mb-2">⚠️ Attention au délai !</h3>
              <p className="text-red-800">
                Vous avez <strong>10 jours</strong> à partir de la publication au Journal Officiel 
                ({PUBLICATION_JO}) pour déclarer votre sinistre à votre assurance. 
                <strong> Passé ce délai, votre demande pourra être refusée.</strong>
              </p>
            </div>

            <h2>Liste des communes reconnues</h2>
          </div>

          {/* Communes par département */}
          <div className="space-y-8 my-8">
            {/* Haute-Garonne */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-ipb-rule">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="text-ipb-orange" size={24} />
                <h3 className="text-xl font-bold text-ipb-text">Haute-Garonne (31)</h3>
                <span className="bg-ipb-stone text-ipb-orange text-sm px-3 py-1 rounded-full font-bold">
                  {COMMUNES_31.length} communes
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {COMMUNES_31.map((commune) => (
                  <span key={commune} className="bg-ipb-stone text-ipb-text px-3 py-1 rounded-full text-sm">
                    {commune}
                  </span>
                ))}
              </div>
            </div>

            {/* Tarn-et-Garonne */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-ipb-rule">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="text-blue-600" size={24} />
                <h3 className="text-xl font-bold text-ipb-text">Tarn-et-Garonne (82)</h3>
                <span className="bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full font-bold">
                  {COMMUNES_82.length} communes
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {COMMUNES_82.map((commune) => (
                  <span key={commune} className="bg-ipb-stone text-ipb-text px-3 py-1 rounded-full text-sm">
                    {commune}
                  </span>
                ))}
              </div>
            </div>

            {/* Gers */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-ipb-rule">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="text-green-600" size={24} />
                <h3 className="text-xl font-bold text-ipb-text">Gers (32)</h3>
                <span className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full font-bold">
                  {COMMUNES_32.length} communes
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {COMMUNES_32.map((commune) => (
                  <span key={commune} className="bg-ipb-stone text-ipb-text px-3 py-1 rounded-full text-sm">
                    {commune}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <h2>Les 4 étapes pour être indemnisé</h2>
          </div>

          {/* Étapes */}
          <div className="grid md:grid-cols-2 gap-6 my-8">
            {etapesDemarche.map((etape) => (
              <div key={etape.numero} className="bg-white rounded-xl p-6 shadow-lg border border-ipb-rule relative">
                <div className="absolute -top-3 -left-3 w-10 h-10 bg-ipb-orange rounded-full flex items-center justify-center text-white font-bold">
                  {etape.numero}
                </div>
                <h3 className="font-bold text-ipb-text mb-2 ml-6">{etape.titre}</h3>
                <p className="text-ipb-muted text-sm mb-3">{etape.description}</p>
                <div className="flex items-center gap-2 text-amber-600 text-sm font-bold">
                  <Clock size={14} />
                  <span>{etape.delai}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="prose prose-lg max-w-none">
            <h2>Pourquoi faire appel à un expert indépendant ?</h2>
            <p>
              L'assurance mandate son propre expert qui défend ses intérêts. Un <strong>expert indépendant</strong> 
              comme IPB vous permet de :
            </p>
            <ul>
              <li>Obtenir un rapport technique objectif</li>
              <li>Documenter précisément l'étendue des dégâts</li>
              <li>Négocier un meilleur montant d'indemnisation</li>
              <li>Contester si l'assurance minimise les dommages</li>
            </ul>

            <h2>La franchise CAT-NAT</h2>
            <p>
              La franchise légale pour les sinistres sécheresse est de <strong>1 520€</strong> (2026). 
              Ce montant reste à votre charge.
            </p>
            <p>
              Si votre commune a déjà connu plusieurs arrêtés CAT-NAT sans plan de prévention, 
              la franchise peut être majorée.
            </p>
          </div>

          {/* CTA milieu */}
          <div className="my-12 p-8 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl text-white text-center">
            <h3 className="text-2xl font-extrabold mb-4">Votre maison est fissurée ?</h3>
            <p className="text-ipb-orange-l mb-6">
              Faites constater les dégâts par un expert indépendant pour renforcer votre dossier.
            </p>
            <Link href="/diagnostic" className="inline-flex items-center gap-2 bg-white text-ipb-orange px-8 py-4 rounded-xl font-bold text-lg hover:bg-ipb-stone">
              Demander un diagnostic <ArrowRight size={20} />
            </Link>
          </div>

          <div className="prose prose-lg max-w-none">
            <h2>Documents à fournir</h2>
            <ul>
              <li>Lettre de déclaration de sinistre (recommandé AR)</li>
              <li>Photos des fissures avec dates</li>
              <li>Rapport d'expert (si disponible)</li>
              <li>Devis de réparation (optionnel à ce stade)</li>
            </ul>

            <h2>Liens utiles</h2>
            <ul>
              <li><a href="https://www.georisques.gouv.fr" target="_blank" rel="noopener noreferrer">Georisques.gouv.fr</a> - Vérifier les arrêtés de votre commune</li>
              <li><Link href="/fissure-secheresse-indemnisation">Guide complet indemnisation sécheresse</Link></li>
              <li><Link href="/expert-fissures-toulouse-31">Expert fissures Toulouse</Link></li>
            </ul>
          </div>
        </div>
      </article>

      {/* CTA final */}
      <section className="py-16 bg-ipb-navy text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold mb-6">N'attendez pas le dernier moment</h2>
          <p className="text-xl text-white/70 mb-8">
            Délai de déclaration : <span className="text-amber-400 font-bold">{DELAI_DECLARATION}</span>
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/diagnostic" className="bg-ipb-orange hover:bg-ipb-orange px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2">
              Diagnostic fissures <ArrowRight size={20} />
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
