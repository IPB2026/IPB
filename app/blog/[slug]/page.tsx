import React from 'react';
import Link from 'next/link';
import Script from 'next/script';
import { Metadata } from 'next';
import { ArrowLeft, Calendar, Clock, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { Breadcrumbs } from '@/components/blog/Breadcrumbs';
import { TableOfContents } from '@/components/blog/TableOfContents';
import { InternalLinks } from '@/components/seo/InternalLinks';
import {
  extractTocFromContent,
  addIdsToHeadings,
  generateArticleJsonLd,
  generateBreadcrumbJsonLd,
} from '@/lib/blog-helpers';
import {
  extractFAQsFromContent,
  generateFAQSchema,
  getContextualLinks,
  getRelatedPosts,
  extractHowToSteps,
  generateHowToSchema,
  generateReviewSchema,
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
 * Génération dynamique des metadata SEO
 */
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> | { slug: string } }
): Promise<Metadata> {
  const slug = typeof params === 'object' && 'then' in params 
    ? (await params).slug 
    : params.slug;
  
  const post = blogPosts[slug];
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ipb-expertise.fr';
  const url = `${baseUrl}/blog/${slug}`;

  if (!post) {
    return {
      title: 'Article non trouvé - IPB Expertise',
      description: 'Cet article n\'existe pas ou a été supprimé.',
    };
  }

  return {
    title: `${post.title} | IPB Expertise`,
    description: post.metaDescription,
    keywords: post.keywords,
    authors: [{ name: post.author }],
    category: categoryLabels[post.category],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      url,
      siteName: 'IPB - Institut de Pathologie du Bâtiment',
      locale: 'fr_FR',
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.date,
      authors: [post.author],
      images: [
        {
          url: `${baseUrl}/images/IPB_Logo_HD.png`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.metaDescription,
      images: [`${baseUrl}/images/IPB_Logo_HD.png`],
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
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Chargement...</h1>
        </div>
      </div>
    );
  }
  
  const post = blogPosts[slug];

  if (!post) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Article non trouvé</h1>
          <Link href="/blog" className="text-orange-600 font-bold hover:text-orange-700">
            Retour au blog
          </Link>
        </div>
      </div>
    );
  }

  // Enrichissement du contenu avec IDs
  const enrichedContent = addIdsToHeadings(post.content);
  
  // Extraction du sommaire
  const tocItems = extractTocFromContent(post.content);
  
  // Génération des JSON-LD
  const articleJsonLd = generateArticleJsonLd(post);
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Accueil', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: categoryLabels[post.category], url: `/blog?category=${post.category}` },
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

  // 💣 ARME NUCLÉAIRE : Schema HowTo pour tutoriels (Rich Snippets "How-To")
  const howToSteps = extractHowToSteps(post.content);
  const howToSchema = howToSteps.length >= 3 ? generateHowToSchema(post.title, howToSteps) : null;

  // 💣 ARME NUCLÉAIRE : Schema Review pour étoiles dans Google
  const reviewSchema = generateReviewSchema(post.title);

  // 💣 ARME NUCLÉAIRE : Injection de liens internes automatiques dans le contenu
  // DÉSACTIVÉ : Cause des problèmes de formatage HTML
  const contentWithLinks = enrichedContent; // injectInternalLinks(enrichedContent, post.slug);

  return (
    <div className="min-h-screen bg-slate-50">
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
      {/* 💣 ARME NUCLÉAIRE : HowTo Schema pour tutoriels */}
      {howToSchema && (
        <Script
          id="howto-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
        />
      )}
      {/* 💣 ARME NUCLÉAIRE : Review Schema pour étoiles dans SERP */}
      <Script
        id="review-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />

      {/* 💣 ARME NUCLÉAIRE : Reading Progress Bar */}
      <ReadingProgress />

      {/* 💣 ARME NUCLÉAIRE : Exit-Intent Popup (capture leads) */}
      <ExitIntentPopup />

      <TopBar />
      <Navbar />
      
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-orange-600 font-bold transition-colors"
          >
            <ArrowLeft size={18} />
            Retour au blog
          </Link>
        </div>
      </div>

      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: 'Blog', href: '/blog' },
            { label: categoryLabels[post.category], href: `/blog?category=${post.category}` },
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
                
                <div className="article-meta">
                  <span className="meta-item">
                    <Calendar size={16} />
                    {new Date(post.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                  <span className="meta-item">
                    <Clock size={16} />
                    {post.readTime}
                  </span>
                  <span className="meta-item">
                    Par {post.author}
                  </span>
                </div>
                
                {/* Boutons de partage */}
                <div className="share-buttons">
                  <span className="share-label">Partager :</span>
                  <button className="share-btn facebook" aria-label="Partager sur Facebook">
                    <Facebook size={18} />
                  </button>
                  <button className="share-btn twitter" aria-label="Partager sur Twitter">
                    <Twitter size={18} />
                  </button>
                  <button className="share-btn linkedin" aria-label="Partager sur LinkedIn">
                    <Linkedin size={18} />
                  </button>
                </div>
              </header>

              {/* Contenu de l'article - Zone de lecture optimale */}
              <div
                className="article-body"
                dangerouslySetInnerHTML={{ __html: contentWithLinks }}
              />

            </article>
            
            {/* 🎯 SEO BOOST : Maillage interne contextuel intelligent */}
            {contextualLinks.length > 0 && (
              <div className="mt-8 bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-200 rounded-2xl p-6">
                <h3 className="text-xl font-extrabold text-orange-900 mb-4">🔗 Ressources complémentaires</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {contextualLinks.map((link, idx) => (
                    <Link 
                      key={idx}
                      href={link.url} 
                      className="flex items-center gap-2 bg-white border border-orange-200 rounded-lg p-3 hover:border-orange-400 hover:shadow-md transition group"
                    >
                      <span className="text-orange-600 group-hover:text-orange-700 transition">→</span>
                      <span className="text-sm font-bold text-slate-900 group-hover:text-orange-600 transition">{link.text}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* 🎯 SEO BOOST : Articles similaires par keywords (augmente temps sur page) */}
            {relatedByKeywords.length > 0 && (
              <div className="mt-8 bg-slate-50 border border-slate-200 rounded-2xl p-6">
                <h3 className="text-xl font-extrabold text-slate-900 mb-4">📚 Articles similaires recommandés</h3>
                <div className="space-y-3">
                  {relatedByKeywords.map((related) => {
                    const relatedPost = blogPosts[related.slug];
                    return (
                      <Link 
                        key={related.slug}
                        href={`/blog/${related.slug}`}
                        className="flex items-start gap-3 bg-white border border-slate-200 rounded-xl p-4 hover:border-orange-300 hover:shadow-sm transition group"
                      >
                        <span className="text-2xl group-hover:scale-110 transition">📖</span>
                        <div>
                          <h4 className="font-bold text-slate-900 group-hover:text-orange-600 transition mb-1">{related.title}</h4>
                          <p className="text-sm text-slate-600 line-clamp-2">{relatedPost.excerpt}</p>
                          <p className="text-xs text-orange-600 font-bold mt-2">Pertinence : {related.score} points communs</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
            
            <div className="mt-8 bg-slate-50 border border-slate-200 rounded-2xl p-6">
              <h3 className="text-xl font-extrabold text-slate-900 mb-4">🎯 Besoin d'un expert ?</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <Link href="/expertise/fissures" className="bg-white border border-slate-200 rounded-xl p-4 hover:border-orange-300 hover:shadow-sm transition">
                  <h4 className="font-bold text-slate-900 mb-1">Expertise fissures</h4>
                  <p className="text-sm text-slate-600">Agrafage et stabilisation des fondations.</p>
                </Link>
                <Link href="/expertise/humidite" className="bg-white border border-slate-200 rounded-xl p-4 hover:border-orange-300 hover:shadow-sm transition">
                  <h4 className="font-bold text-slate-900 mb-1">Traitement humidité</h4>
                  <p className="text-sm text-slate-600">Injection résine et cuvelage durable.</p>
                </Link>
              </div>
              <div className="mt-4">
                <Link href="/diagnostic" className="text-orange-600 font-bold hover:text-orange-700">
                  Lancer un diagnostic gratuit →
                </Link>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-12 bg-slate-900 rounded-2xl p-8 text-center text-white relative overflow-hidden">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-500 via-slate-900 to-slate-900"></div>
              <div className="relative z-10">
                <h2 className="text-2xl font-extrabold mb-4">Cet article vous a aidé ?</h2>
                <p className="text-slate-300 mb-6">
                  Obtenez un diagnostic personnalisé pour votre situation. 149€ déductibles sur travaux.
                </p>
                <Link
                  href="/diagnostic"
                  className="inline-flex items-center gap-2 bg-orange-600 text-white px-8 py-4 rounded-xl font-bold shadow-xl hover:bg-orange-500 transition-all transform hover:-translate-y-1"
                >
                  Lancer mon diagnostic gratuit
                </Link>
              </div>
            </div>
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
      </article>

      {/* Articles similaires */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-slate-200">
        <h2 className="text-2xl font-extrabold text-slate-900 mb-8">Articles similaires</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.values(blogPosts)
            .filter(p => p.category === post.category && p.slug !== post.slug)
            .slice(0, 3)
            .map((relatedPost) => (
              <Link
                key={relatedPost.slug}
                href={`/blog/${relatedPost.slug}`}
                className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden hover:shadow-lg transition-all"
              >
                <div className="h-40 bg-gradient-to-br from-slate-200 to-slate-300"></div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2">
                    {relatedPost.title}
                  </h3>
                  <p className="text-sm text-slate-600 line-clamp-2">
                    {relatedPost.excerpt}
                  </p>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
