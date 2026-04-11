import Link from 'next/link';

type LinkItem = {
  href: string;
  label: string;
  description?: string;
};

type InternalLinksProps = {
  variant?: 'default' | 'fissures' | 'humidite' | 'blog' | 'diagnostic' | 'contact' | 'ville';
  title?: string;
  links?: LinkItem[];
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

export function InternalLinks({ variant = 'default', title, links }: InternalLinksProps) {
  const items = links && links.length > 0 ? links : linkSets[variant] || linkSets.default;
  const heading = title || 'Liens utiles';

  return (
    <section className="bg-white border-2 border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-lg font-extrabold text-slate-900 mb-4 flex items-center gap-2">
        <span className="text-orange-600">🔗</span>
        {heading}
      </h3>
      <div className="space-y-3">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block bg-slate-50 border border-slate-200 rounded-lg p-3 hover:bg-orange-50 hover:border-orange-300 transition-all group"
          >
            <h4 className="font-bold text-slate-900 group-hover:text-orange-600 transition text-sm mb-1">
              {item.label}
            </h4>
            {item.description && (
              <p className="text-xs text-slate-600 line-clamp-2">{item.description}</p>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}
