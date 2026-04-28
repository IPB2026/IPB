"use client";

import React from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { TrustRibbon } from '@/components/ui/TrustRibbon';
import { Footer } from '@/components/home/Footer';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';
import { InternalLinks } from '@/components/seo/InternalLinks';
import { blogPostsList } from '@/app/data/blog';

interface BlogPostDisplay {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: 'fissures' | 'humidite' | 'conseils' | 'expertise' | 'mur-porteur';
  author: string;
  image?: string;
  featured?: boolean;
}

const blogPosts: BlogPostDisplay[] = blogPostsList
  .map((post) => {
    let category: BlogPostDisplay['category'] = post.category as BlogPostDisplay['category'];
    const lowerKw = (post.keywords || []).join(' ').toLowerCase();
    if (lowerKw.includes('mur porteur') || lowerKw.includes('baie vitree') || post.slug.includes('mur-porteur') || post.slug.includes('baie-vitree')) {
      category = 'mur-porteur';
    }
    return {
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      date: post.date,
      readTime: post.readTime,
      category,
      author: post.author,
      featured: false,
    };
  })
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

const visibleFilters: Array<{ key: BlogPostDisplay['category']; label: string }> = [
  { key: 'fissures', label: 'Fissures' },
  { key: 'mur-porteur', label: 'Mur porteur' },
  { key: 'expertise', label: 'Expertise' },
  { key: 'conseils', label: 'Conseils' },
];

const categoryLabels: Record<BlogPostDisplay['category'], string> = {
  fissures: 'Fissures',
  'mur-porteur': 'Mur porteur',
  humidite: 'Humidité',
  conseils: 'Conseils',
  expertise: 'Expertise',
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

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Blog du cabinet IPB — Structure, fissures, mur porteur',
    description: "Articles techniques rédigés par le cabinet IPB sur la structure du bâtiment : diagnostic de fissures, ouverture de mur porteur, expertise avant achat immobilier.",
    url: 'https://www.ipb-expertise.fr/blog',
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: blogPosts.length,
      itemListElement: blogPosts.map((post, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        url: `https://www.ipb-expertise.fr/blog/${post.slug}`,
        name: post.title,
      })),
    },
  };

  return (
    <div className="font-sans bg-ipb-cream text-ipb-text antialiased">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <TopBar />
      <TrustRibbon />
      <Navbar />

      {/* HERO éditorial blog — cohérent avec la home */}
      <section className="bg-ipb-cream relative">
        <div className="max-w-ipb mx-auto px-6 lg:px-12 pt-16 lg:pt-20 pb-12 lg:pb-16">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-end">
            <div className="lg:col-span-7">
              <RevealOnScroll>
                <Eyebrow>Le blog du cabinet · IPB</Eyebrow>
              </RevealOnScroll>

              <RevealOnScroll delay={0.06} variant="editorial">
                <h1
                  className="font-serif text-ipb-text mb-8"
                  style={{
                    fontSize: 'clamp(40px, 4.6vw, 72px)',
                    lineHeight: 1.04,
                    letterSpacing: '-0.026em',
                    fontWeight: 700,
                  }}
                >
                  Notes de chantier <em>et guides techniques.</em>
                </h1>
              </RevealOnScroll>

              <RevealOnScroll delay={0.12} variant="subtle">
                <p className="text-[16px] leading-[1.85] font-light text-ipb-muted max-w-[580px]">
                  Articles rédigés par notre cabinet à partir de cas réels rencontrés sur nos chantiers en Occitanie. Diagnostic de fissures, ouverture de mur porteur, expertise avant achat — chaque sujet est traité comme on traiterait un dossier client.
                </p>
              </RevealOnScroll>
            </div>

            <RevealOnScroll delay={0.18} className="lg:col-span-5 lg:border-l lg:border-ipb-rule lg:pl-12">
              {/* Barre de recherche éditoriale */}
              <label htmlFor="blog-search" className="text-[10px] text-ipb-light uppercase tracking-[0.18em] mb-3 block">
                Rechercher dans le blog
              </label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-ipb-light pointer-events-none" size={16} aria-hidden="true" />
                <input
                  id="blog-search"
                  type="text"
                  placeholder="Mot-clé, sujet, type de fissure…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 rounded-[3px] bg-ipb-white border border-ipb-rule text-ipb-text placeholder-ipb-light text-[14px] font-light focus:outline-none focus:border-ipb-orange transition-colors"
                />
              </div>
              <p className="text-[12px] text-ipb-muted mt-3">
                {blogPosts.length} articles techniques publiés
              </p>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Filtres catégories — pills éditoriales sur cream */}
      <section className="bg-ipb-cream border-y border-ipb-rule">
        <div className="max-w-ipb mx-auto px-6 lg:px-12 py-6">
          <div className="flex flex-wrap items-center gap-2 lg:gap-3">
            <span className="text-[10px] text-ipb-light uppercase tracking-[0.18em] mr-3 hidden lg:inline">Catégorie</span>
            <button
              onClick={() => setSelectedCategory(null)}
              className={`text-[12px] tracking-[0.04em] font-medium px-4 py-2 rounded-[3px] border transition-all duration-300 ${
                !selectedCategory
                  ? 'bg-ipb-navy text-white border-ipb-navy'
                  : 'bg-transparent text-ipb-muted border-ipb-rule hover:border-ipb-orange hover:text-ipb-orange'
              }`}
            >
              Tous les articles
            </button>
            {visibleFilters.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setSelectedCategory(selectedCategory === key ? null : key)}
                className={`text-[12px] tracking-[0.04em] font-medium px-4 py-2 rounded-[3px] border transition-all duration-300 ${
                  selectedCategory === key
                    ? 'bg-ipb-navy text-white border-ipb-navy'
                    : 'bg-transparent text-ipb-muted border-ipb-rule hover:border-ipb-orange hover:text-ipb-orange'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* GRILLE D'ARTICLES — éditoriale */}
      <section className="bg-ipb-cream py-16 lg:py-20">
        <div className="max-w-ipb mx-auto px-6 lg:px-12">
          <div className="flex items-end justify-between mb-10">
            <h2
              className="font-serif text-ipb-text"
              style={{
                fontSize: 'clamp(24px, 2.4vw, 34px)',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                fontWeight: 700,
              }}
            >
              {searchQuery || selectedCategory ? 'Résultats' : 'Tous les articles'}
            </h2>
            {filteredPosts.length > 0 && (
              <p className="text-[13px] text-ipb-light tracking-wide">
                {filteredPosts.length} article{filteredPosts.length > 1 ? 's' : ''}
              </p>
            )}
          </div>

          {filteredPosts.length === 0 ? (
            <div className="bg-ipb-white border border-ipb-rule rounded-[6px] p-12 text-center">
              <p className="font-serif text-ipb-text text-xl mb-4">Aucun article ne correspond.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory(null);
                }}
                className="text-ipb-orange font-medium text-[13px] tracking-wide border-b border-ipb-orange pb-1 hover:text-[#b35519] hover:border-[#b35519] transition-colors"
              >
                Réinitialiser les filtres
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredPosts.map((post, i) => (
                <RevealOnScroll key={post.slug} delay={Math.min(i * 0.04, 0.3)}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group relative bg-ipb-white border border-ipb-rule rounded-[6px] overflow-hidden h-full flex flex-col hover:shadow-[0_12px_36px_rgba(11,24,38,0.07)] transition-all duration-500"
                  >
                    {/* Filet orange qui s'étend en haut au hover (signature IPB) */}
                    <span
                      aria-hidden="true"
                      className="absolute top-0 left-0 right-0 h-px bg-ipb-orange origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)]"
                    />

                    <div className="p-7 flex-1 flex flex-col">
                      {/* Catégorie + date */}
                      <div className="flex items-center gap-3 text-[10px] text-ipb-light uppercase tracking-[0.16em] mb-5">
                        <span className="text-ipb-orange font-medium">
                          {categoryLabels[post.category]}
                        </span>
                        <span className="text-ipb-rule" aria-hidden="true">·</span>
                        <span>
                          {new Date(post.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                      </div>

                      {/* Titre Playfair */}
                      <h3
                        className="font-serif text-ipb-text mb-4 group-hover:text-ipb-orange transition-colors duration-500 leading-[1.25] line-clamp-3"
                        style={{ fontSize: 'clamp(18px, 1.4vw, 22px)', fontWeight: 700, letterSpacing: '-0.012em' }}
                      >
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-[13.5px] leading-[1.7] font-light text-ipb-muted mb-6 line-clamp-3 flex-1">
                        {post.excerpt}
                      </p>

                      {/* Footer card */}
                      <div className="flex items-center justify-between pt-5 border-t border-ipb-rule mt-auto">
                        <span className="text-[11px] text-ipb-muted font-medium tracking-wide truncate max-w-[170px]">
                          {post.author}
                        </span>
                        <span className="text-[11px] text-ipb-light tracking-wide">
                          {post.readTime}
                        </span>
                      </div>
                    </div>
                  </Link>
                </RevealOnScroll>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section — cohérent avec CtaFinal home */}
      <section className="bg-ipb-navy py-20 lg:py-24 relative overflow-hidden">
        <div className="max-w-ipb mx-auto px-6 lg:px-12 relative z-10">
          <RevealOnScroll variant="editorial">
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8">
                <Eyebrow variant="dark">Aller plus loin</Eyebrow>
                <h2
                  className="font-serif text-white mb-6"
                  style={{
                    fontSize: 'clamp(28px, 2.8vw, 42px)',
                    lineHeight: 1.12,
                    letterSpacing: '-0.022em',
                    fontWeight: 700,
                  }}
                >
                  Un cas concret <em>vaut mille articles.</em>
                </h2>
                <p className="text-[15px] leading-[1.85] font-light text-white/65 max-w-[560px]">
                  Nos articles donnent les bonnes pistes — mais chaque maison est singulière. Décrivez votre situation au cabinet, nous vous répondons sous 24 heures.
                </p>
              </div>
              <div className="lg:col-span-4 flex flex-col gap-3 lg:items-end">
                <Link
                  href="/diagnostic"
                  className="inline-flex items-center justify-center gap-2 bg-ipb-orange hover:bg-[#b35519] text-white font-medium px-7 py-4 rounded-[3px] text-[14px] tracking-wide transition-colors duration-300 group"
                >
                  Diagnostic gratuit
                  <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                </Link>
                <a
                  href="tel:0582953375"
                  className="text-[13px] text-white/60 hover:text-white tracking-wide font-medium transition-colors"
                >
                  Ou par téléphone : 05 82 95 33 75
                </a>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Problèmes fréquents (guides rapides) — éditorial */}
      <section className="bg-ipb-cream py-16 lg:py-20 border-t border-ipb-rule">
        <div className="max-w-ipb mx-auto px-6 lg:px-12">
          <RevealOnScroll>
            <Eyebrow>Guides rapides</Eyebrow>
            <h2
              className="font-serif text-ipb-text mb-10"
              style={{
                fontSize: 'clamp(24px, 2.4vw, 34px)',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                fontWeight: 700,
              }}
            >
              Problèmes fréquents <em>identifiés en visite.</em>
            </h2>
          </RevealOnScroll>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { href: '/problemes/fissure-verticale-mur-porteur', label: 'Fissure verticale sur mur porteur' },
              { href: '/problemes/fissure-escalier-que-faire', label: 'Fissure en escalier' },
              { href: '/problemes/portes-qui-coincent-fissures', label: 'Portes qui coincent + fissures' },
              { href: '/problemes/humidite-murs-peinture-qui-cloque', label: 'Peinture qui cloque' },
              { href: '/problemes/condensation-ou-remontees-capillaires', label: 'Condensation ou remontées capillaires' },
              { href: '/problemes/moisissures-sante', label: 'Moisissures et santé' },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="group flex items-center justify-between gap-4 px-5 py-4 bg-ipb-white border border-ipb-rule rounded-[3px] text-[14px] text-ipb-text hover:border-ipb-orange hover:text-ipb-orange transition-all duration-500"
              >
                <span className="font-light">{label}</span>
                <span className="text-ipb-orange opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:translate-x-1">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <InternalLinks variant="blog" />

      {/* Texte d'expertise SEO — éditorial */}
      <section className="bg-ipb-cream py-16 lg:py-20 border-t border-ipb-rule">
        <div className="max-w-ipb mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-4">
              <RevealOnScroll>
                <Eyebrow>Le blog en quelques mots</Eyebrow>
                <h2
                  className="font-serif text-ipb-text"
                  style={{
                    fontSize: 'clamp(24px, 2.4vw, 34px)',
                    lineHeight: 1.18,
                    letterSpacing: '-0.022em',
                    fontWeight: 700,
                  }}
                >
                  Pas du contenu marketing. <em>Du retour de chantier.</em>
                </h2>
              </RevealOnScroll>
            </div>
            <div className="lg:col-span-8">
              <RevealOnScroll delay={0.06} variant="subtle">
                <div className="space-y-5 text-[15px] leading-[1.9] font-light text-ipb-muted">
                  <p>
                    Les articles sont rédigés par le cabinet IPB à partir de cas réels rencontrés sur nos chantiers à <strong className="text-ipb-text not-italic font-medium">Toulouse (31)</strong>, <strong className="text-ipb-text not-italic font-medium">Montauban (82)</strong>, <strong className="text-ipb-text not-italic font-medium">Auch (32)</strong> et dans toute l&apos;Occitanie. Fissures structurelles liées au retrait-gonflement des argiles, ouvertures de murs porteurs en immeubles anciens, expertises avant achat immobilier — chaque sujet vient du terrain.
                  </p>
                  <p>
                    Nos guides couvrent l&apos;ensemble du cycle d&apos;un dossier : de l&apos;identification du problème (microfissure, fissure en escalier, mur à ouvrir) au choix de la solution technique (
                    <Link href="/blog/agrafage-vs-micropieux-choix" className="text-ipb-orange hover:text-[#b35519] font-medium transition-colors">agrafage ou micropieux</Link>,{' '}
                    <Link href="/blog/prix-ouverture-mur-porteur-toulouse-2026" className="text-ipb-orange hover:text-[#b35519] font-medium transition-colors">dimensionnement de poutre IPN/HEB</Link>
                    ), en passant par les démarches administratives (
                    <Link href="/blog/catastrophe-naturelle-secheresse-demarches-indemnisation" className="text-ipb-orange hover:text-[#b35519] font-medium transition-colors">catastrophe naturelle sécheresse</Link>,{' '}
                    <Link href="/blog/garantie-decennale-travaux-structure" className="text-ipb-orange hover:text-[#b35519] font-medium transition-colors">garantie décennale</Link>
                    ).
                  </p>
                  <p>
                    Tous les articles sont mis à jour régulièrement pour intégrer les dernières réglementations et les retours d&apos;expérience de nos chantiers récents. Pour un cas spécifique,{' '}
                    <Link href="/diagnostic" className="text-ipb-orange hover:text-[#b35519] font-medium transition-colors">décrivez votre situation au cabinet</Link>.
                  </p>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
