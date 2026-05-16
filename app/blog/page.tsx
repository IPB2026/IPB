import Link from 'next/link';
import type { Metadata } from 'next';
import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { SmartBackBar } from '@/components/ui/SmartBackBar';
import { TrustRibbon } from '@/components/ui/TrustRibbon';
import { Footer } from '@/components/home/Footer';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';
import { InternalLinks } from '@/components/seo/InternalLinks';
import { blogPostsSummary } from '@/app/data/blog';
import { BlogBrowser } from './BlogBrowser';

export const metadata: Metadata = {
  title: 'Blog · Notes de chantier & guides techniques · IPB',
  description:
    "Articles rédigés par l'institut IPB à partir de cas réels sur nos chantiers en Occitanie : fissures, mur porteur, humidité, expertise avant achat.",
  alternates: { canonical: 'https://www.ipb-expertise.fr/blog' },
};

// Server Component — calcule la liste affichable côté serveur pour éviter
// d'embarquer le HTML complet des articles dans le bundle client.
// Le sous-composant <BlogBrowser> ne reçoit que les métadonnées (titre,
// excerpt, date, catégorie) — pas le `content` HTML.
function buildDisplayList() {
  return blogPostsSummary
    .map((post) => {
      let category = post.category as
        | 'fissures'
        | 'humidite'
        | 'conseils'
        | 'expertise'
        | 'mur-porteur';
      const lowerKw = (post.keywords || []).join(' ').toLowerCase();
      if (
        lowerKw.includes('mur porteur') ||
        lowerKw.includes('baie vitree') ||
        post.slug.includes('mur-porteur') ||
        post.slug.includes('baie-vitree')
      ) {
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
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export default function BlogPage() {
  const posts = buildDisplayList();

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: "Blog de l'institut IPB — Structure, fissures, mur porteur",
    description:
      "Articles techniques rédigés par l'institut IPB sur la structure du bâtiment : diagnostic de fissures, ouverture de mur porteur, expertise avant achat immobilier.",
    url: 'https://www.ipb-expertise.fr/blog',
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: posts.length,
      itemListElement: posts.map((post, idx) => ({
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
      <SmartBackBar />

      {/* HERO éditorial blog */}
      <section className="bg-ipb-cream relative">
        <div className="max-w-ipb mx-auto px-6 lg:px-12 pt-16 lg:pt-20 pb-12 lg:pb-16">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-end">
            <div className="lg:col-span-7">
              <RevealOnScroll>
                <Eyebrow>Le blog de l'institut · IPB</Eyebrow>
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
                  Articles rédigés par notre institut à partir de cas réels rencontrés sur nos chantiers en Occitanie. Diagnostic de fissures, ouverture de mur porteur, expertise avant achat — chaque sujet est traité comme on traiterait un dossier client.
                </p>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* Sous-composant client : recherche + filtres + grille */}
      <BlogBrowser posts={posts} />

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
                  Nos articles donnent les bonnes pistes — mais chaque maison est singulière. Décrivez-nous votre situation, nous vous répondons sous 48 heures.
                </p>
              </div>
              <div className="lg:col-span-4 flex flex-col gap-3 lg:items-end">
                <Link
                  href="/diagnostic"
                  className="inline-flex items-center justify-center gap-2 bg-ipb-orange hover:bg-[#b35519] text-white font-medium px-7 py-4 rounded-[3px] text-[14px] tracking-wide transition-colors duration-300 group"
                >
                  Mon diagnostic en 2 min
                  <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                    →
                  </span>
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

      {/* Problèmes fréquents (guides rapides) */}
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
                <span className="text-ipb-orange opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <InternalLinks variant="blog" />

      {/* Texte d'expertise SEO */}
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
                    Les articles sont rédigés par l'institut IPB à partir de cas réels rencontrés sur nos chantiers à <strong className="text-ipb-text not-italic font-medium">Toulouse (31)</strong>, <strong className="text-ipb-text not-italic font-medium">Montauban (82)</strong>, <strong className="text-ipb-text not-italic font-medium">Auch (32)</strong> et dans toute l&apos;Occitanie. Fissures structurelles liées au retrait-gonflement des argiles, ouvertures de murs porteurs en immeubles anciens, expertises avant achat immobilier — chaque sujet vient du terrain.
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
                    <Link href="/diagnostic" className="text-ipb-orange hover:text-[#b35519] font-medium transition-colors">décrivez-nous votre situation</Link>.
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
