'use client';

import React from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';
import type { BlogPostSummary } from '@/app/data/blog';

/**
 * Sous-composant client de la page /blog.
 *
 * Reçoit la liste light des articles (titre + excerpt + métadonnées, pas le
 * HTML du content) et gère la recherche + le filtre par catégorie.
 *
 * Extrait de page.tsx en mai 2026 pour réduire le poids du bundle client
 * (le content HTML des articles n'est plus envoyé au navigateur sur /blog —
 * uniquement sur /blog/[slug]).
 */

type DisplayCategory = BlogPostSummary['category'] | 'mur-porteur';

interface BlogPostDisplay {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: DisplayCategory;
  author: string;
}

const visibleFilters: Array<{ key: DisplayCategory; label: string }> = [
  { key: 'fissures', label: 'Fissures' },
  { key: 'mur-porteur', label: 'Mur porteur' },
  { key: 'expertise', label: 'Expertise' },
  { key: 'conseils', label: 'Conseils' },
];

const categoryLabels: Record<DisplayCategory, string> = {
  fissures: 'Fissures',
  'mur-porteur': 'Mur porteur',
  humidite: 'Humidité',
  conseils: 'Conseils',
  expertise: 'Expertise',
};

interface BlogBrowserProps {
  posts: BlogPostDisplay[];
}

export function BlogBrowser({ posts }: BlogBrowserProps) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);

  const filteredPosts = posts.filter((post) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      post.title.toLowerCase().includes(q) || post.excerpt.toLowerCase().includes(q);
    const matchesCategory = !selectedCategory || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      {/* Barre de recherche — extraite du Hero (Server Component) */}
      <section className="bg-ipb-cream">
        <div className="max-w-ipb mx-auto px-6 lg:px-12 pb-12 lg:pb-16">
          <div className="lg:max-w-md lg:ml-auto lg:border-l lg:border-ipb-rule lg:pl-12">
            <label
              htmlFor="blog-search"
              className="text-[10px] text-ipb-light uppercase tracking-[0.18em] mb-3 block"
            >
              Rechercher dans le blog
            </label>
            <div className="relative">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-ipb-light pointer-events-none"
                size={16}
                aria-hidden="true"
              />
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
              {posts.length} articles techniques publiés
            </p>
          </div>
        </div>
      </section>

      {/* Filtres catégories — pills */}
      <section className="bg-ipb-cream border-y border-ipb-rule">
        <div className="max-w-ipb mx-auto px-6 lg:px-12 py-6">
          <div className="flex flex-wrap items-center gap-2 lg:gap-3">
            <span className="text-[10px] text-ipb-light uppercase tracking-[0.18em] mr-3 hidden lg:inline">
              Catégorie
            </span>
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

      {/* GRILLE D'ARTICLES */}
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
              <p className="font-serif text-ipb-text text-xl mb-4">
                Aucun article ne correspond.
              </p>
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
                    {/* Filet orange qui s'étend au hover */}
                    <span
                      aria-hidden="true"
                      className="absolute top-0 left-0 right-0 h-px bg-ipb-orange origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)]"
                    />

                    <div className="p-7 flex-1 flex flex-col">
                      <div className="flex items-center gap-3 text-[10px] text-ipb-light uppercase tracking-[0.16em] mb-5">
                        <span className="text-ipb-orange font-medium">
                          {categoryLabels[post.category]}
                        </span>
                        <span className="text-ipb-rule" aria-hidden="true">
                          ·
                        </span>
                        <span>
                          {new Date(post.date).toLocaleDateString('fr-FR', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </span>
                      </div>

                      <h3
                        className="font-serif text-ipb-text mb-4 group-hover:text-ipb-orange transition-colors duration-500 leading-[1.25] line-clamp-3"
                        style={{
                          fontSize: 'clamp(18px, 1.4vw, 22px)',
                          fontWeight: 700,
                          letterSpacing: '-0.012em',
                        }}
                      >
                        {post.title}
                      </h3>

                      <p className="text-[13.5px] leading-[1.7] font-light text-ipb-muted mb-6 line-clamp-3 flex-1">
                        {post.excerpt}
                      </p>

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
    </>
  );
}
