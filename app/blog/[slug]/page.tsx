import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Calendar, Clock } from 'lucide-react';
import { ShareButtons } from '@/components/blog/ShareButtons';
import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { SmartBackBar } from "@/components/ui/SmartBackBar";
import { Breadcrumbs } from '@/components/blog/Breadcrumbs';
import { TableOfContents } from '@/components/blog/TableOfContents';
import { InternalLinks } from '@/components/seo/InternalLinks';
import { AuthorBox } from '@/components/blog/AuthorBox';
import {
  extractTocFromContent,
  addIdsToHeadings,
  generateArticleJsonLd,
  generateBreadcrumbJsonLd,
  getCategoryFallbackImage,
} from '@/lib/blog-helpers';
import {
  extractFAQsFromContent,
  generateFAQSchema,
  getContextualLinks,
  getRelatedPosts,
  injectInternalLinks,
} from '@/lib/seo-helpers';
import { ReadingProgress } from '@/components/blog/ReadingProgress';
import { ExitIntentPopup } from '@/components/blog/ExitIntentPopup';

import { blogPosts, blogPostsSlugs, type BlogPost } from '@/app/data/blog';

const categoryLabels = {
  fissures: 'Fissures',
  humidite: 'Humidité',
  conseils: 'Conseils',
  expertise: 'Expertise'
};

/**
 * Génération statique des pages blog (IMPORTANT pour SEO)
 */
export async function generateStaticParams() {
  return blogPostsSlugs.map((slug) => ({ slug }));
}

/**
 * Génération dynamique des metadata SEO
 */
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> | { slug: string } }
): Promise<Metadata> {
  const slug = typeof params === 'object' && 'then' in params 
    ? (await params).slug 
    : params.slug;
  
  const post = blogPosts[slug];
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ipb-expertise.fr').replace(/\/+$/, '');
  const url = `${baseUrl}/blog/${slug}`;

  if (!post) {
    return {
      title: 'Article non trouvé - IPB Expertise',
      description: 'Cet article n\'existe pas ou a été supprimé.',
    };
  }

  // Le suffixe "| IPB" est déjà ajouté automatiquement par le template root.
  // On laisse donc le metaTitle / title tel quel sans rajouter "| IPB Expertise".
  const pageTitle = post.metaTitle ?? post.title;

  // Description SEO : on s'assure que le téléphone et un signal d'urgence
  // soient visibles pour le CTR Google (clic-to-call mobile).
  const callSignature = ' · ☎ 05 82 95 33 75';
  const baseDescription = post.metaDescription || '';
  const seoDescription = baseDescription.includes('05 82 95 33 75')
    ? baseDescription
    : (baseDescription.length + callSignature.length <= 155
      ? `${baseDescription}${callSignature}`
      : `${baseDescription.slice(0, 154 - callSignature.length).trimEnd()}…${callSignature}`);

  // Image de couverture pertinente (cf. SEO audit C2 — pas le logo générique)
  const coverPath = post.coverImage || getCategoryFallbackImage(post.category, post.keywords);
  const coverUrl = coverPath.startsWith('http') ? coverPath : `${baseUrl}${coverPath}`;

  return {
    title: pageTitle,
    description: seoDescription,
    keywords: post.keywords,
    authors: [{ name: post.author }],
    category: categoryLabels[post.category],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description: seoDescription,
      url,
      siteName: 'IPB - Institut de Pathologie du Bâtiment',
      locale: 'fr_FR',
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.dateModified || post.date,
      authors: [post.author],
      images: [
        {
          url: coverUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: seoDescription,
      images: [coverUrl],
      creator: '@IPBExpertise',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-snippet': -1,
        'max-image-preview': 'large',
        'max-video-preview': -1,
      },
    },
  };
}

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {
  const slug = typeof params === 'object' && 'then' in params ? null : params.slug;
  
  if (!slug) {
    return (
      <div className="min-h-screen bg-ipb-cream flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-ipb-text mb-4">Chargement...</h1>
        </div>
      </div>
    );
  }
  
  const post = blogPosts[slug];

  if (!post) {
    notFound();
  }

  // Enrichissement du contenu avec IDs
  const enrichedContent = addIdsToHeadings(post.content);

  // Extraction du sommaire
  const tocItems = extractTocFromContent(post.content);

  // Image de couverture (avec fallback par catégorie)
  const coverPath = post.coverImage || getCategoryFallbackImage(post.category, post.keywords);
  
  // Génération des JSON-LD
  const articleJsonLd = generateArticleJsonLd(post);
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Accueil', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: post.title, url: `/blog/${post.slug}` },
  ]);

  // 🎯 SEO BOOST : Extraction automatique des FAQs pour Rich Snippets
  const faqs = extractFAQsFromContent(post.content);
  const faqSchema = faqs.length > 0 ? generateFAQSchema(faqs) : null;

  // 🎯 SEO BOOST : Liens contextuels intelligents
  const contextualLinks = getContextualLinks(post.slug, post.keywords);

  // 🎯 SEO BOOST : Articles similaires par pertinence
  const allPostsData = Object.values(blogPosts).map(p => ({
    slug: p.slug,
    title: p.title,
    keywords: p.keywords,
    category: p.category
  }));
  const relatedByKeywords = getRelatedPosts(post.slug, post.keywords, allPostsData);

  const contentWithLinks = injectInternalLinks(enrichedContent, post.slug);

  return (
    <div className="min-h-screen bg-ipb-cream">
      {/* JSON-LD pour SEO */}
      <Script
        id="article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* 🎯 FAQ Schema pour Rich Snippets Google */}
      {faqSchema && (
        <Script
          id="faq-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      {/* Reading Progress Bar */}
      <ReadingProgress />

      {/* 💣 ARME NUCLÉAIRE : Exit-Intent Popup (capture leads) */}
      <ExitIntentPopup />

      <TopBar />
      <Navbar />
      <SmartBackBar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: 'Blog', href: '/blog' },
            { label: categoryLabels[post.category] },
            { label: post.title },
          ]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Contenu principal */}
          <div className="lg:col-span-8">
            {/* En-tête de l'article - Zone de lecture optimale */}
            <article className="blog-article-wrapper">
              <header className="article-header">
                <span className={`category-badge ${post.category}`}>
                  {categoryLabels[post.category]}
                </span>

                <h1 className="article-title">
                  {post.title}
                </h1>

                {/* Lead paragraph — accroche éditoriale (excerpt) */}
                <p className="article-lead">
                  {post.excerpt}
                </p>

                <div className="article-meta">
                  <span className="meta-item">
                    <Calendar size={16} />
                    Publié le {new Date(post.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                  {post.dateModified && post.dateModified !== post.date && (
                    <span className="meta-item">
                      Mis à jour le {new Date(post.dateModified).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </span>
                  )}
                  <span className="meta-item">
                    <Clock size={16} />
                    {post.readTime}
                  </span>
                  <span className="meta-item">
                    Par {post.author}
                  </span>
                </div>

                {/* Boutons de partage — interactifs */}
                <ShareButtons title={post.title} url={`https://www.ipb-expertise.fr/blog/${post.slug}`} />
              </header>

              {/* Cover image — visuel d'accroche (avant le body) */}
              <figure className="article-cover">
                <Image
                  src={coverPath}
                  alt={post.title}
                  width={1200}
                  height={675}
                  className="article-cover-img"
                  priority
                />
              </figure>

              {/* Contenu de l'article - Zone de lecture optimale */}
              <div
                className="article-body"
                dangerouslySetInnerHTML={{ __html: contentWithLinks }}
              />

            </article>

            {/* E-E-A-T : Encart auteur */}
            <AuthorBox name={post.author} />

            {/* Pour aller plus loin — 1 seul bloc épuré qui fusionne les liens contextuels */}
            {contextualLinks.length > 0 && (
              <section className="mt-12 border-t border-ipb-rule pt-10">
                <p className="text-[11px] uppercase tracking-[0.18em] text-ipb-orange font-semibold mb-3">Pour aller plus loin</p>
                <h3 className="font-serif text-ipb-text mb-6" style={{ fontSize: 'clamp(20px, 2vw, 26px)', lineHeight: 1.2, letterSpacing: '-0.02em', fontWeight: 700 }}>
                  Ressources liées sur l'institut.
                </h3>
                <ul className="space-y-2">
                  {contextualLinks.map((link, idx) => (
                    <li key={idx}>
                      <Link
                        href={link.url}
                        className="group flex items-baseline gap-3 py-2 border-b border-ipb-rule hover:border-ipb-orange transition-colors"
                      >
                        <span className="text-ipb-orange text-sm font-bold flex-shrink-0">→</span>
                        <span className="text-[15px] text-ipb-text group-hover:text-ipb-orange transition-colors">
                          {link.text}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* CTA navy — un seul, fort */}
            <section className="mt-12 bg-ipb-navy rounded-[6px] p-10 md:p-12 text-center text-white relative overflow-hidden">
              <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_center,_rgba(232,116,60,0.4),transparent_70%)]"></div>
              <div className="relative z-10 max-w-xl mx-auto">
                <p className="text-[11px] uppercase tracking-[0.18em] text-ipb-orange-l font-semibold mb-4">
                  Cet article vous concerne ?
                </p>
                <h2 className="font-serif mb-5" style={{ fontSize: 'clamp(24px, 2.6vw, 32px)', lineHeight: 1.18, letterSpacing: '-0.022em', fontWeight: 700 }}>
                  Faites diagnostiquer votre situation<br /><em className="text-ipb-orange-l">par notre institut.</em>
                </h2>
                <p className="text-white/70 text-[14px] leading-[1.7] mb-7">
                  Diagnostic préalable téléphonique gratuit. Réponse d'un ingénieur structure sous 24 heures.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link
                    href="/diagnostic"
                    className="inline-flex items-center justify-center gap-2 bg-ipb-orange text-white px-7 py-4 rounded-[3px] font-bold text-[14px] tracking-[0.03em] shadow-xl hover:bg-[#b35519] transition-colors"
                  >
                    Lancer mon diagnostic gratuit
                  </Link>
                  <a
                    href="tel:0582953375"
                    className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur border border-white/20 text-white px-7 py-4 rounded-[3px] font-bold text-[14px] tracking-[0.03em] hover:bg-white/20 transition-colors"
                  >
                    05 82 95 33 75
                  </a>
                </div>
              </div>
            </section>
          </div>

          {/* Sommaire (sidebar) */}
          {tocItems.length > 0 && (
            <aside className="lg:col-span-4">
              <TableOfContents items={tocItems} />
              
              {/* Liens utiles dans la sidebar */}
              <div className="mt-6">
                <InternalLinks variant="blog" />
              </div>
            </aside>
          )}
        </div>
      </main>

      {/* Articles similaires */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-ipb-rule">
        <p className="text-[11px] uppercase tracking-[0.18em] text-ipb-orange font-semibold mb-3">À lire ensuite</p>
        <h2 className="font-serif text-ipb-text mb-10" style={{ fontSize: 'clamp(28px, 3vw, 40px)', lineHeight: 1.18, letterSpacing: '-0.022em', fontWeight: 700 }}>
          Sur le même sujet.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.values(blogPosts)
            .filter(p => p.category === post.category && p.slug !== post.slug)
            .slice(0, 3)
            .map((relatedPost) => {
              const relatedCover = relatedPost.coverImage || getCategoryFallbackImage(relatedPost.category, relatedPost.keywords);
              return (
                <Link
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  className="group bg-white rounded-[6px] border border-ipb-rule overflow-hidden hover:border-ipb-orange hover:shadow-[0_12px_36px_rgba(11,24,38,0.08)] hover:-translate-y-0.5 transition-all flex flex-col"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-ipb-cream">
                    <Image
                      src={relatedCover}
                      alt={relatedPost.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 400px"
                      className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <p className="text-[10px] uppercase tracking-[0.14em] text-ipb-orange font-semibold mb-3">
                      {categoryLabels[relatedPost.category]}
                    </p>
                    <h3 className="font-serif font-bold text-ipb-text text-[18px] leading-snug mb-3 line-clamp-3 group-hover:text-ipb-orange transition-colors">
                      {relatedPost.title}
                    </h3>
                    <p className="text-[13px] leading-[1.7] font-light text-ipb-muted line-clamp-2 mb-4">
                      {relatedPost.excerpt}
                    </p>
                    <div className="mt-auto flex items-center gap-3 text-[11px] text-ipb-light uppercase tracking-[0.12em] font-medium">
                      <span>{relatedPost.readTime}</span>
                      <span aria-hidden="true">·</span>
                      <span>{relatedPost.author}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
}
