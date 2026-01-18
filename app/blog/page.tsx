"use client";

import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Calendar, Clock, Search } from 'lucide-react';
import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { Footer } from '@/components/home/Footer';
import { InternalLinks } from '@/components/seo/InternalLinks';

// Types pour les articles
interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: 'fissures' | 'humidite' | 'conseils' | 'expertise';
  image?: string;
  featured?: boolean;
}

export const metadata: Metadata = {
  title: 'Blog IPB | Conseils Fissures & Humidité à Toulouse',
  description: 'Guides experts, conseils pratiques et analyses techniques sur les fissures, l’humidité et la structure. Articles optimisés SEO pour propriétaires en Haute-Garonne.',
  keywords: [
    'fissures maison',
    'humidité murs',
    'diagnostic fissures',
    'remontées capillaires',
    'agrafage',
    'injection résine',
    'expert bâtiment toulouse',
  ],
  alternates: {
    canonical: 'https://www.ipb-expertise.fr/blog',
  },
  openGraph: {
    title: 'Blog IPB | Conseils Fissures & Humidité à Toulouse',
    description: 'Guides experts, conseils pratiques et analyses techniques sur les fissures, l’humidité et la structure.',
    url: 'https://www.ipb-expertise.fr/blog',
    siteName: 'IPB - Institut de Pathologie du Bâtiment',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: '/images/IPB_Logo_HD.png',
        width: 1200,
        height: 630,
        alt: 'Blog IPB',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog IPB | Conseils Fissures & Humidité',
    description: 'Guides experts et conseils techniques IPB.',
    images: ['/images/IPB_Logo_HD.png'],
  },
};

// Articles de blog (à remplacer par une vraie base de données en production)
const blogPosts: BlogPost[] = [
  {
    slug: 'fissures-maison-toulouse-que-faire',
    title: 'Fissures sur ma maison à Toulouse : Que faire ? Guide complet 2024',
    excerpt: 'Vous avez découvert des fissures sur votre maison toulousaine ? Ne paniquez pas. Voici comment distinguer une fissure bénigne d\'une urgence structurelle, et surtout : comment agir pour protéger votre patrimoine sans vous ruiner.',
    date: '2025-06-12',
    readTime: '8 min',
    category: 'fissures',
    featured: true
  },
  {
    slug: 'humidite-remontee-capillaire-solution',
    title: 'Humidité et remontées capillaires : Solutions définitives',
    excerpt: 'Salpêtre, moisissures, peinture qui cloque... Votre mur "sue" et vous ne savez plus quoi faire ? La peinture anti-humidité n\'a rien changé ? Voici pourquoi, et surtout : la vraie solution qui fonctionne.',
    date: '2025-07-04',
    readTime: '6 min',
    category: 'humidite',
    featured: true
  },
  {
    slug: 'agrafage-vs-micropieux-choix',
    title: 'Agrafage ou micropieux ? Comment choisir la bonne solution',
    excerpt: 'Face à des fissures structurelles, on vous propose souvent les micropieux (40 000€). Mais dans 90% des cas, l\'agrafage suffit... et coûte 3x moins cher. Voici comment faire le bon choix sans vous faire arnaquer.',
    date: '2025-08-20',
    readTime: '10 min',
    category: 'expertise',
    featured: false
  },
  {
    slug: 'fissures-escalier-tassement-differentiel',
    title: 'Fissures en escalier : Signe de tassement différentiel ?',
    excerpt: 'Vos fissures suivent les joints de mortier en crémaillère ? C\'est le signe caractéristique d\'un tassement différentiel. Voici ce que cela signifie, pourquoi c\'est grave, et surtout : comment le réparer.',
    date: '2025-09-10',
    readTime: '7 min',
    category: 'fissures',
    featured: false
  },
  {
    slug: 'garantie-decennale-travaux-structure',
    title: 'Garantie décennale : Ce que vous devez savoir',
    excerpt: 'Vous faites des travaux de réparation structurelle ? La garantie décennale est obligatoire. Voici ce qu\'elle couvre, combien elle coûte, et surtout : comment vous protéger.',
    date: '2025-10-05',
    readTime: '5 min',
    category: 'conseils',
    featured: false
  },
  {
    slug: 'ventilation-humidite-condensation',
    title: 'VMC et humidité : L\'importance de la ventilation',
    excerpt: 'Vous avez de l\'humidité dans vos murs ? Avant de penser à l\'injection résine, vérifiez votre ventilation. Parfois, une simple VMC résout le problème... et vous fait économiser des milliers d\'euros.',
    date: '2025-11-02',
    readTime: '6 min',
    category: 'humidite',
    featured: false
  },
  {
    slug: 'fissure-ouverture-porte-fenetre',
    title: 'Portes qui coincent et fissures : pourquoi la structure bouge ?',
    excerpt: 'Quand une porte frotte et qu’une fissure apparaît, ce n’est jamais un hasard. Voici comment relier ces signes et déterminer si la maison travaille.',
    date: '2025-05-20',
    readTime: '7 min',
    category: 'fissures',
    featured: false
  },
  {
    slug: 'secheresse-argile-haute-garonne',
    title: 'Sécheresse et sol argileux : le vrai risque pour votre maison en Haute‑Garonne',
    excerpt: 'Les sols argileux se rétractent en été et gonflent en hiver. Ce cycle fragilise les fondations. On vous explique comment l’anticiper.',
    date: '2025-06-28',
    readTime: '8 min',
    category: 'expertise',
    featured: false
  },
  {
    slug: 'fissure-facade-reboucher-ou-reparer',
    title: 'Fissure en façade : reboucher ou réparer ? La méthode professionnelle',
    excerpt: 'Reboucher sans traiter la cause, c’est retarder l’inévitable. Découvrez quand un simple enduit suffit et quand il faut intervenir structurellement.',
    date: '2025-07-22',
    readTime: '6 min',
    category: 'conseils',
    featured: false
  },
  {
    slug: 'humidite-salpetre-traitement',
    title: 'Salpêtre : comprendre l’origine et choisir le bon traitement',
    excerpt: 'Le salpêtre signe presque toujours une remontée capillaire. Voici comment confirmer le diagnostic et choisir un traitement durable.',
    date: '2025-08-06',
    readTime: '7 min',
    category: 'humidite',
    featured: false
  },
  {
    slug: 'condensation-ou-infiltration',
    title: 'Condensation ou infiltration : comment faire la différence ?',
    excerpt: 'Taches noires en haut des murs, buée sur les fenêtres… Ce n’est pas toujours une fuite. Voici un diagnostic clair pour ne pas se tromper.',
    date: '2025-08-30',
    readTime: '6 min',
    category: 'humidite',
    featured: false
  },
  {
    slug: 'diagnostic-structurel-maison',
    title: 'Diagnostic structurel : ce que regarde un expert sur place',
    excerpt: 'Fissuromètre, laser, hygromètre… Un diagnostic sérieux repose sur des mesures. Découvrez ce que l’expert observe vraiment.',
    date: '2025-09-18',
    readTime: '9 min',
    category: 'expertise',
    featured: false
  },
  {
    slug: 'traitement-humidite-injection-resine',
    title: 'Injection de résine : comment fonctionne la barrière étanche ?',
    excerpt: 'C’est la solution la plus fiable contre les remontées capillaires. Voici le principe, le délai de séchage et les garanties.',
    date: '2025-10-14',
    readTime: '7 min',
    category: 'humidite',
    featured: false
  },
  {
    slug: 'revente-maison-fissuree',
    title: 'Revente d’une maison fissurée : risques, décote et solutions',
    excerpt: 'Une fissure peut faire perdre 20 à 30% de valeur. Avec un traitement garanti, la revente redevient possible.',
    date: '2025-11-12',
    readTime: '6 min',
    category: 'conseils',
    featured: false
  },
  {
    slug: 'fissure-plafond-que-faire',
    title: 'Fissures au plafond : faut‑il s’inquiéter ?',
    excerpt: 'Toutes les fissures au plafond ne sont pas graves. Voici comment distinguer un simple retrait d’enduit d’un mouvement structurel.',
    date: '2025-12-05',
    readTime: '6 min',
    category: 'fissures',
    featured: false
  },
  {
    slug: 'humidité-cave-sous-sol',
    title: 'Humidité en cave : diagnostic fiable et solutions durables',
    excerpt: 'Cuvelage, injection, ventilation… Chaque cave a son traitement. On vous guide vers la bonne stratégie.',
    date: '2026-01-10',
    readTime: '8 min',
    category: 'humidite',
    featured: false
  }
];

const categoryColors = {
  fissures: 'bg-orange-100 text-orange-700 border-orange-200',
  humidite: 'bg-blue-100 text-blue-700 border-blue-200',
  conseils: 'bg-slate-100 text-slate-700 border-slate-200',
  expertise: 'bg-purple-100 text-purple-700 border-purple-200'
};

const categoryLabels = {
  fissures: 'Fissures',
  humidite: 'Humidité',
  conseils: 'Conseils',
  expertise: 'Expertise'
};

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = blogPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-slate-50">
      <TopBar />
      <Navbar />
      
      {/* Header */}
      <div className="bg-slate-900 text-white py-12 md:py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-orange-950 opacity-90"></div>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 text-orange-100 px-4 py-1.5 rounded-full text-xs font-bold mb-6 uppercase tracking-wider backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse"></span> Blog Expert
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-extrabold tracking-tight mb-4 md:mb-6 leading-tight">
              Conseils & <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-200">Expertises</span>
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-slate-300 mb-6 md:mb-8 leading-relaxed">
              Retrouvez nos guides techniques, conseils pratiques et analyses d'experts pour comprendre et résoudre vos problèmes de fissures et d'humidité.
            </p>
            
            {/* Barre de recherche */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Rechercher un article..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Filtres par catégorie */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 md:-mt-8 relative z-20">
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-3 md:p-4 flex flex-wrap gap-2 md:gap-3 justify-center">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-6 py-2 rounded-lg font-bold text-sm transition-all ${
              !selectedCategory
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Tous les articles
          </button>
          {Object.entries(categoryLabels).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setSelectedCategory(selectedCategory === key ? null : key)}
              className={`px-6 py-2 rounded-lg font-bold text-sm transition-all border-2 ${
                selectedCategory === key
                  ? categoryColors[key as keyof typeof categoryColors] + ' border-current'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
        {/* Articles à la une */}
        {featuredPosts.length > 0 && searchQuery === '' && !selectedCategory && (
          <div className="mb-16">
            <h2 className="text-2xl font-extrabold text-slate-900 mb-8 flex items-center gap-3">
              <span className="w-1 h-8 bg-orange-600 rounded-full"></span>
              Articles à la une
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative"
                >
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-orange-500 via-orange-300 to-slate-200"></div>
                  <div className="p-6 pt-7">
                    <div className="flex items-center justify-between mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${categoryColors[post.category]}`}>
                        {categoryLabels[post.category]}
                      </span>
                      {post.featured && (
                        <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                          À la une
                        </span>
                      )}
                    </div>
                    <div className="h-px w-16 bg-gradient-to-r from-orange-500 to-transparent mb-4"></div>
                    <h3 className="text-xl font-extrabold text-slate-900 mb-3 group-hover:text-orange-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-slate-600 mb-4 line-clamp-2 leading-relaxed">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {new Date(post.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {post.readTime}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Tous les articles */}
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 mb-8 flex items-center gap-3">
            <span className="w-1 h-8 bg-orange-600 rounded-full"></span>
            {searchQuery || selectedCategory ? 'Résultats de recherche' : 'Tous les articles'}
            {filteredPosts.length > 0 && (
              <span className="text-lg font-normal text-slate-500">({filteredPosts.length})</span>
            )}
          </h2>

          {filteredPosts.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-12 text-center">
              <p className="text-slate-600 text-lg mb-4">Aucun article trouvé.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory(null);
                }}
                className="text-orange-600 font-bold hover:text-orange-700"
              >
                Réinitialiser les filtres
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300 relative"
                >
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-slate-200 via-slate-300 to-orange-400"></div>
                  <div className="p-5 pt-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold border ${categoryColors[post.category]}`}>
                        {categoryLabels[post.category]}
                      </span>
                    </div>
                    <div className="h-px w-12 bg-gradient-to-r from-slate-400 to-transparent mb-3"></div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-orange-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-slate-600 mb-4 line-clamp-2 leading-relaxed">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {new Date(post.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {post.readTime}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-slate-900 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-500 via-slate-900 to-slate-900"></div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Besoin d'un diagnostic personnalisé ?</h2>
            <p className="text-slate-300 mb-8 text-lg">
              Nos articles vous donnent des pistes, mais chaque situation est unique. Faites appel à notre expertise.
            </p>
            <Link
              href="/diagnostic"
              className="inline-flex items-center gap-2 bg-orange-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:bg-orange-500 transition-all transform hover:-translate-y-1"
            >
              Lancer mon diagnostic gratuit
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>

        <InternalLinks variant="blog" />
      </div>

      <Footer />
    </div>
  );
}

