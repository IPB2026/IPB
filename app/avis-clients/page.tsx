import { Metadata } from 'next';
import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { Footer } from '@/components/home/Footer';
import { Star, Quote, MapPin, CheckCircle, Shield, Award, ThumbsUp } from 'lucide-react';
import Link from 'next/link';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Avis Clients IPB | 4.9/5 sur Google | Expert Fissures & Humidité Toulouse',
  description: 'Découvrez les avis vérifiés de nos clients à Toulouse, Montauban et Auch. Note 4.9/5 sur Google. Plus de 500 chantiers réalisés avec garantie décennale.',
  keywords: ['avis IPB', 'avis expert fissures toulouse', 'témoignages clients', 'IPB expertise avis'],
  alternates: {
    canonical: 'https://www.ipb-expertise.fr/avis-clients',
  },
  openGraph: {
    title: 'Avis Clients IPB | 4.9/5 sur Google',
    description: 'Découvrez pourquoi nos clients nous recommandent. Note 4.9/5.',
    url: 'https://www.ipb-expertise.fr/avis-clients',
  },
};

// Avis clients avec données structurées
const reviews = [
  {
    author: 'Marie L.',
    location: 'Toulouse (31)',
    rating: 5,
    date: '2026-01-15',
    title: 'Intervention rapide et professionnelle',
    text: 'Fissures importantes sur ma maison des années 70. IPB a diagnostiqué le problème en 48h et réalisé l\'agrafage en 3 jours. Travail impeccable, équipe très professionnelle. Je recommande vivement !',
    service: 'Agrafage fissures',
  },
  {
    author: 'Pierre D.',
    location: 'Blagnac (31)',
    rating: 5,
    date: '2026-01-08',
    title: 'Problème d\'humidité résolu définitivement',
    text: 'Des remontées capillaires depuis 10 ans que personne n\'arrivait à traiter. IPB a injecté de la résine et depuis, plus aucune trace d\'humidité. Garantie 30 ans, ça rassure.',
    service: 'Injection résine',
  },
  {
    author: 'Sophie M.',
    location: 'Montauban (82)',
    rating: 5,
    date: '2025-12-20',
    title: 'Excellent diagnostic',
    text: 'Le diagnostic à 149€ a été très complet et m\'a permis de comprendre l\'origine des fissures. L\'expert a pris le temps d\'expliquer les solutions possibles. Très satisfaite.',
    service: 'Diagnostic fissures',
  },
  {
    author: 'Jean-Marc B.',
    location: 'Colomiers (31)',
    rating: 5,
    date: '2025-12-10',
    title: 'Salpêtre enfin traité',
    text: 'Cave pleine de salpêtre depuis des années. L\'équipe IPB a traité le problème à la source. Plus aucune trace après 3 mois. Merci pour votre professionnalisme.',
    service: 'Traitement humidité',
  },
  {
    author: 'Catherine R.',
    location: 'Tournefeuille (31)',
    rating: 5,
    date: '2025-11-28',
    title: 'Réactivité exemplaire',
    text: 'Fissure apparue brutalement après la sécheresse. Intervention d\'urgence sous 24h. Diagnostic précis et travaux réalisés rapidement. Très rassurée par leur expertise.',
    service: 'Agrafage fissures',
  },
  {
    author: 'François L.',
    location: 'Auch (32)',
    rating: 5,
    date: '2025-11-15',
    title: 'Professionnels compétents',
    text: 'Maison ancienne avec problèmes d\'humidité multiples. IPB a proposé une solution globale (drainage + VMI). Résultat impeccable, maison saine.',
    service: 'Traitement humidité complet',
  },
  {
    author: 'Isabelle G.',
    location: 'Cugnaux (31)',
    rating: 4,
    date: '2025-11-01',
    title: 'Bon travail',
    text: 'Traitement des fissures effectué correctement. Seul bémol : délai un peu long pour obtenir un rendez-vous (3 semaines). Mais le résultat est là.',
    service: 'Agrafage fissures',
  },
  {
    author: 'Michel T.',
    location: 'Muret (31)',
    rating: 5,
    date: '2025-10-20',
    title: 'Expertise de qualité',
    text: 'Expert très compétent qui a su identifier l\'origine exacte des fissures (sol argileux + sécheresse). Devis détaillé et travaux conformes. Garantie décennale appréciée.',
    service: 'Diagnostic + Agrafage',
  },
];

// Générer le schema Review pour chaque avis
function generateReviewsSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "IPB - Institut de Pathologie du Bâtiment",
    "image": "https://www.ipb-expertise.fr/images/IPB_Logo_HD.png",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "54 avenue Jean Jaurès",
      "addressLocality": "Tournefeuille",
      "postalCode": "31170",
      "addressCountry": "FR"
    },
    "telephone": "+33582953375",
    "url": "https://www.ipb-expertise.fr",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": reviews.length.toString(),
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": reviews.map(review => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": review.author
      },
      "datePublished": review.date,
      "reviewBody": review.text,
      "name": review.title,
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.rating.toString(),
        "bestRating": "5",
        "worstRating": "1"
      }
    }))
  };
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={18}
          className={star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-300'}
        />
      ))}
    </div>
  );
}

export default function AvisClientsPage() {
  const averageRating = (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1);
  
  return (
    <div className="min-h-screen bg-slate-50">
      <Script
        id="reviews-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateReviewsSchema()) }}
      />
      
      <TopBar />
      <Navbar />
      
      <main id="main-content">
        {/* Hero */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <div className="flex justify-center mb-6">
              <div className="flex items-center gap-2 bg-yellow-500/20 px-6 py-3 rounded-full">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map(i => (
                    <Star key={i} size={24} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-2xl font-bold text-yellow-400">{averageRating}/5</span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
              Ce que nos clients disent de nous
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Plus de 500 chantiers réalisés en Occitanie. Découvrez les témoignages de nos clients satisfaits.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                <CheckCircle size={18} className="text-green-400" />
                <span>{reviews.length} avis vérifiés</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                <Shield size={18} className="text-blue-400" />
                <span>Garantie décennale</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                <Award size={18} className="text-orange-400" />
                <span>Expert certifié</span>
              </div>
            </div>
          </div>
        </section>
        
        {/* Stats */}
        <section className="py-12 bg-white border-b">
          <div className="max-w-5xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-4xl font-extrabold text-orange-600">500+</p>
                <p className="text-slate-600">Chantiers réalisés</p>
              </div>
              <div>
                <p className="text-4xl font-extrabold text-orange-600">4.9/5</p>
                <p className="text-slate-600">Note Google</p>
              </div>
              <div>
                <p className="text-4xl font-extrabold text-orange-600">98%</p>
                <p className="text-slate-600">Clients satisfaits</p>
              </div>
              <div>
                <p className="text-4xl font-extrabold text-orange-600">10 ans</p>
                <p className="text-slate-600">Garantie travaux</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Reviews Grid */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
              Avis de nos clients
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((review, index) => (
                <article 
                  key={index}
                  className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="font-bold text-slate-900">{review.author}</p>
                      <p className="text-sm text-slate-500 flex items-center gap-1">
                        <MapPin size={12} />
                        {review.location}
                      </p>
                    </div>
                    <StarRating rating={review.rating} />
                  </div>
                  
                  <h3 className="font-semibold text-slate-800 mb-2">{review.title}</h3>
                  
                  <Quote size={20} className="text-orange-300 mb-2" />
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">
                    {review.text}
                  </p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">
                      {review.service}
                    </span>
                    <span className="text-xs text-slate-400">
                      {new Date(review.date).toLocaleDateString('fr-FR', { 
                        year: 'numeric', 
                        month: 'long' 
                      })}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA */}
        <section className="py-16 bg-gradient-to-r from-orange-600 to-red-600 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
              Rejoignez nos clients satisfaits
            </h2>
            <p className="text-xl text-orange-100 mb-8">
              Obtenez votre diagnostic gratuit et découvrez nos solutions
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                href="/diagnostic" 
                className="bg-white text-orange-600 px-10 py-4 rounded-xl font-bold text-lg hover:bg-orange-50 transition"
              >
                Diagnostic gratuit →
              </Link>
              <a 
                href="https://g.page/r/ipb-expertise/review" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-orange-700 hover:bg-orange-800 px-10 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2"
              >
                <ThumbsUp size={20} />
                Laisser un avis
              </a>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
