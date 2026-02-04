import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { Footer } from '@/components/home/Footer';
import { InternalLinks } from '@/components/seo/InternalLinks';
import { problemBySlug, problemPages, problemSlugs } from '@/app/data/problems';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return problemSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const problem = problemBySlug(slug);

  if (!problem) {
    return {
      title: 'Problème bâtiment | IPB',
      description: 'Conseils et expertise technique IPB.',
    };
  }

  const canonical = `https://www.ipb-expertise.fr/problemes/${problem.slug}`;

  return {
    title: `${problem.title} | IPB`,
    description: problem.excerpt,
    keywords: problem.keywords,
    alternates: { canonical },
    openGraph: {
      title: `${problem.title} | IPB`,
      description: problem.excerpt,
      url: canonical,
      siteName: 'IPB - Institut de Pathologie du Bâtiment',
      locale: 'fr_FR',
      type: 'article',
      images: [
        {
          url: '/images/IPB_Logo_HD.png',
          width: 1200,
          height: 630,
          alt: problem.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${problem.title} | IPB`,
      description: problem.excerpt,
      images: ['/images/IPB_Logo_HD.png'],
    },
    robots: { index: true, follow: true },
  };
}

export default async function ProblemPage({ params }: PageProps) {
  const { slug } = await params;
  const problem = problemBySlug(slug);

  if (!problem) {
    notFound();
  }

  const relatedProblems = problemPages
    .filter((item) => item.slug !== problem.slug && item.category === problem.category)
    .slice(0, 3);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: problem.title,
    description: problem.excerpt,
    mainEntityOfPage: `https://www.ipb-expertise.fr/problemes/${problem.slug}`,
    author: {
      '@type': 'Organization',
      name: 'IPB - Institut de Pathologie du Bâtiment',
    },
    publisher: {
      '@type': 'Organization',
      name: 'IPB - Institut de Pathologie du Bâtiment',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.ipb-expertise.fr/images/IPB_Logo_HD.png',
      },
    },
  };

  return (
    <div className="min-h-screen bg-white">
      <Script id="problem-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <TopBar />
      <Navbar />
      <main id="main-content" className="max-w-6xl mx-auto px-4 py-16">
        <div className="max-w-3xl">
          <p className="text-orange-600 font-semibold uppercase tracking-widest text-xs mb-3">
            Problème fréquent · {problem.category === 'fissures' ? 'Fissures' : 'Humidité'}
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">{problem.title}</h1>
          <p className="text-lg text-slate-600 mb-10">{problem.excerpt}</p>
        </div>

        <section className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12">
          <div className="space-y-8 text-slate-700 leading-relaxed">
            <p>
              Vous êtes face à ce problème et vous ne savez pas s'il est critique ? C'est normal. La bonne décision
              dépend de la gravité, de l'évolution et du contexte de votre maison. C'est exactement ce que nous évaluons
              lors d'un diagnostic fiable.
            </p>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-3">Ce qu'il faut vérifier immédiatement</h2>
              <ul className="space-y-3 list-disc ml-5 text-slate-700">
                <li>Est-ce que le problème s'aggrave avec le temps ?</li>
                <li>Voyez-vous d'autres signes associés (portes qui coincent, taches, odeurs, peinture qui cloque) ?</li>
                <li>Le problème est-il localisé ou présent sur plusieurs zones ?</li>
                <li>La saison (sécheresse, fortes pluies) a-t-elle déclenché le phénomène ?</li>
              </ul>
            </div>
            <div className="bg-white border border-orange-100 shadow-sm rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-3">Notre approche IPB</h2>
              <p>
                Nous identifions la cause réelle avant toute intervention. Cela évite les travaux inutiles et les dépenses
                excessives. Notre expertise est orientée solution durable, pas "cache-misère".
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-4">
                <Link
                  href={problem.primaryServiceUrl}
                  className="px-6 py-3 rounded-xl bg-slate-900 text-white font-semibold text-center"
                >
                  Voir l'expertise dédiée
                </Link>
                <Link
                  href="/diagnostic"
                  className="px-6 py-3 rounded-xl border border-slate-300 font-semibold text-center"
                >
                  Lancer le diagnostic gratuit
                </Link>
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="bg-slate-900 text-white rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-2">Besoin d'un avis rapide ?</h3>
              <p className="text-slate-300 mb-6">
                Un expert vous rappelle et vous oriente vers la solution la plus adaptée.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-orange-600 text-white font-semibold w-full"
              >
                Parler à un expert
              </Link>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Problèmes liés</h3>
              <ul className="space-y-3">
                {relatedProblems.map((item) => (
                  <li key={item.slug}>
                    <Link href={`/problemes/${item.slug}`} className="text-slate-700 hover:text-orange-600 transition">
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </section>

        <div className="mt-16">
          <InternalLinks
            title="Ressources utiles"
            links={[
              { href: '/expertise/fissures', label: 'Expertise fissures & structure' },
              { href: '/expertise/humidite', label: 'Expertise humidité & infiltrations' },
              { href: '/diagnostic', label: 'Diagnostic gratuit en 3 minutes' },
              { href: '/blog', label: 'Blog expert IPB' },
            ]}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
