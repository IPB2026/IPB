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
    { href: '/diagnostic', label: 'Diagnostic gratuit', description: 'Evaluez votre situation en 2 minutes.' },
    { href: '/expertise/fissures', label: 'Expertise fissures', description: 'Stabilisation et agrafage.' },
    { href: '/expertise/humidite', label: 'Expertise humidité', description: 'Remontées, infiltrations, condensation : la vraie cause.' },
    { href: '/contact', label: 'Contact direct', description: 'Une question ? Nous repondons sous 24h.' },
  ],
  fissures: [
    { href: '/diagnostic', label: 'Diagnostic fissures', description: 'Recevez un avis expert rapide.' },
    { href: '/diagnostic-avant-vente', label: 'Diagnostic avant vente', description: 'Rassurer vos acheteurs, sécuriser la transaction.' },
    { href: '/blog', label: 'Guides fissures', description: 'Comprendre les causes et solutions.' },
    { href: '/contact', label: 'Parler a un expert', description: 'Conseil gratuit par telephone.' },
  ],
  humidite: [
    { href: '/diagnostic', label: 'Diagnostic humidite', description: 'Analyse rapide de vos symptomes.' },
    { href: '/expertise/fissures', label: 'Expertise fissures', description: 'Mouvements structurels & fondations.' },
    { href: '/blog', label: 'Guides humidite', description: 'Solutions durables et prevention.' },
    { href: '/contact', label: 'Contacter IPB', description: 'Reponse claire sous 24h.' },
  ],
  blog: [
    { href: '/diagnostic', label: 'Diagnostic gratuit', description: 'Obtenez un avis personnalise.' },
    { href: '/expertise/fissures', label: 'Fissures structurelles', description: 'Solutions techniques garanties.' },
    { href: '/expertise/humidite', label: 'Expertise humidité', description: 'Remontées, infiltrations, condensation : la vraie cause.' },
    { href: '/contact', label: 'Contact IPB', description: 'Parler a un expert.' },
  ],
  diagnostic: [
    { href: '/expertise/fissures', label: 'Expertise fissures', description: 'Agrafage et stabilisation.' },
    { href: '/expertise/humidite', label: 'Expertise humidité', description: 'Remontées, infiltrations, condensation : la vraie cause.' },
    { href: '/blog', label: 'Conseils experts', description: 'Comprendre avant d\'agir.' },
    { href: '/contact', label: 'Contact direct', description: 'Appelez-nous au 05 82 95 33 75.' },
  ],
  contact: [
    { href: '/diagnostic', label: 'Diagnostic gratuit', description: 'Evaluez votre situation.' },
    { href: '/expertise/fissures', label: 'Fissures', description: 'Solutions structurelles durables.' },
    { href: '/expertise/humidite', label: 'Expertise humidité', description: 'Remontées, infiltrations, condensation : la vraie cause.' },
    { href: '/blog', label: 'Blog IPB', description: 'Guides et conseils pratiques.' },
  ],
  ville: [
    { href: '/diagnostic', label: 'Diagnostic gratuit', description: 'Analyse rapide de votre cas.' },
    { href: '/expertise/fissures', label: 'Fissures & structure', description: 'Agrafage et stabilisation.' },
    { href: '/expertise-avant-achat-immobilier-toulouse', label: 'Avant achat immobilier', description: 'Diagnostic indépendant avant de signer.' },
    { href: '/contact', label: 'Contact IPB', description: 'Intervention locale rapide.' },
  ],
};

export function InternalLinks({ variant = 'default', title, links }: InternalLinksProps) {
  const items = links && links.length > 0 ? links : linkSets[variant] || linkSets.default;
  const heading = title || 'Liens utiles';

  return (
    <section className="bg-ipb-white border border-ipb-rule rounded-[6px] p-6">
      <h3 className="font-serif text-ipb-text text-[20px] font-bold mb-5 flex items-center gap-2.5">
        <span aria-hidden="true" className="w-5 h-px bg-ipb-orange inline-block" />
        {heading}
      </h3>
      <div className="space-y-3">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block bg-ipb-cream border border-ipb-rule rounded-[3px] p-3.5 hover:border-ipb-orange transition-colors group"
          >
            <h4 className="font-serif font-bold text-ipb-text group-hover:text-ipb-orange transition-colors text-[15px] mb-1">
              {item.label}
            </h4>
            {item.description && (
              <p className="text-[13px] text-ipb-muted leading-[1.6] line-clamp-2">{item.description}</p>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}
