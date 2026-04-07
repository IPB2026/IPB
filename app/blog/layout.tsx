import type { Metadata } from 'next';
import Script from 'next/script';
import '../blog-article.css';
import { blogPostsList } from '@/app/data/blog';

export const metadata: Metadata = {
  title: 'Blog IPB | Conseils Fissures & Humidité à Toulouse',
  description: "Guides experts, conseils pratiques et analyses techniques sur les fissures, l'humidité et la structure. Conseils pour propriétaires en Occitanie (31, 82, 32).",
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
    description: "Guides experts, conseils pratiques et analyses techniques sur les fissures, l'humidité et la structure.",
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

function generateBlogListSchema() {
  const baseUrl = 'https://www.ipb-expertise.fr';
  const sorted = [...blogPostsList].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Blog IPB - Conseils Fissures & Humidité',
    description: "Guides experts et conseils techniques sur les fissures et l'humidité.",
    url: `${baseUrl}/blog`,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: sorted.length,
      itemListElement: sorted.map((post, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        url: `${baseUrl}/blog/${post.slug}`,
        name: post.title,
      })),
    },
  };
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  const blogListSchema = generateBlogListSchema();
  return (
    <>
      <Script
        id="blog-collection-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListSchema) }}
      />
      {children}
    </>
  );
}
