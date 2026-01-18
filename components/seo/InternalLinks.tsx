import Link from 'next/link';

type LinkItem = {
  href: string;
  label: string;
  description: string;
};

type InternalLinksProps = {
  variant?: 'default' | 'fissures' | 'humidite' | 'blog' | 'diagnostic' | 'contact' | 'ville';
  title?: string;
};

const linkSets: Record<NonNullable<InternalLinksProps['variant']>, LinkItem[]> = {
  default: [
    { href: '/diagnostic', label: 'Diagnostic gratuit', description: 'Évaluez votre situation en 2 minutes.' },
    { href: '/expertise/fissures', label: 'Expertise fissures', description: 'Stabilisation et agrafage.' },
    { href: '/expertise/humidite', label: 'Traitement humidité', description: 'Remontées capillaires et injections.' },
    { href: '/contact', label: 'Contact direct', description: 'Une question ? Nous répondons sous 24h.' },
  ],
  fissures: [
    { href: '/diagnostic', label: 'Diagnostic fissures', description: 'Recevez un avis expert rapide.' },
    { href: '/expertise/humidite', label: 'Humidité & infiltrations', description: 'Stoppez les remontées capillaires.' },
    { href: '/blog', label: 'Guides fissures', description: 'Comprendre les causes et solutions.' },
    { href: '/contact', label: 'Parler à un expert', description: 'Conseil gratuit par téléphone.' },
  ],
  humidite: [
    { href: '/diagnostic', label: 'Diagnostic humidité', description: 'Analyse rapide de vos symptômes.' },
    { href: '/expertise/fissures', label: 'Expertise fissures', description: 'Mouvements structurels & fondations.' },
    { href: '/blog', label: 'Guides humidité', description: 'Solutions durables et prévention.' },
    { href: '/contact', label: 'Contacter IPB', description: 'Réponse claire sous 24h.' },
  ],
  blog: [
    { href: '/diagnostic', label: 'Diagnostic gratuit', description: 'Obtenez un avis personnalisé.' },
    { href: '/expertise/fissures', label: 'Fissures structurelles', description: 'Solutions techniques garanties.' },
    { href: '/expertise/humidite', label: 'Traitement humidité', description: 'Barrière étanche durable.' },
    { href: '/contact', label: 'Contact IPB', description: 'Parler à un expert.' },
  ],
  diagnostic: [
    { href: '/expertise/fissures', label: 'Expertise fissures', description: 'Agrafage et stabilisation.' },
    { href: '/expertise/humidite', label: 'Expertise humidité', description: 'Injection résine & cuvelage.' },
    { href: '/blog', label: 'Conseils experts', description: 'Comprendre avant d’agir.' },
    { href: '/contact', label: 'Contact direct', description: 'Appelez-nous au 05 82 95 33 75.' },
  ],
  contact: [
    { href: '/diagnostic', label: 'Diagnostic gratuit', description: 'Évaluez votre situation.' },
    { href: '/expertise/fissures', label: 'Fissures', description: 'Solutions structurelles durables.' },
    { href: '/expertise/humidite', label: 'Humidité', description: 'Traitement définitif.' },
    { href: '/blog', label: 'Blog IPB', description: 'Guides et conseils pratiques.' },
  ],
  ville: [
    { href: '/diagnostic', label: 'Diagnostic gratuit', description: 'Analyse rapide de votre cas.' },
    { href: '/expertise/fissures', label: 'Fissures & structure', description: 'Agrafage et stabilisation.' },
    { href: '/expertise/humidite', label: 'Humidité & infiltrations', description: 'Injection résine durable.' },
    { href: '/contact', label: 'Contact IPB', description: 'Intervention locale rapide.' },
  ],
};

export function InternalLinks({ variant = 'default', title }: InternalLinksProps) {
  const items = linkSets[variant] || linkSets.default;
  const heading = title || 'Liens utiles';

  return (
    <section className="mt-12 bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-8">
      <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 mb-4">
        {heading}
      </h2>
      <div className="grid md:grid-cols-2 gap-4">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="bg-white border border-slate-200 rounded-xl p-4 hover:border-orange-300 hover:shadow-sm transition"
          >
            <h3 className="font-bold text-slate-900 mb-1">{item.label}</h3>
            <p className="text-sm text-slate-600">{item.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
