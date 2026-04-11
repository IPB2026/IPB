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
    { href: '/blog', label: 'Conseils experts', description: 'Comprendre avant d\u2019agir.' },
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
    <section className="bg-[#fafafa] py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-6">{heading}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group p-4 rounded-xl hover:bg-white transition-colors"
            >
              <p className="font-medium text-slate-900 text-[15px] group-hover:text-orange-600 transition-colors mb-0.5">
                {item.label}
              </p>
              {item.description && (
                <p className="text-[13px] text-slate-400">{item.description}</p>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
