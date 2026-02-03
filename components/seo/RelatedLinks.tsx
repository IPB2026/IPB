import Link from 'next/link';
import { ArrowRight, FileText, MapPin, Wrench } from 'lucide-react';

type LinkItem = {
  href: string;
  label: string;
  description?: string;
};

type RelatedLinksProps = {
  title?: string;
  links: LinkItem[];
  type?: 'guides' | 'cities' | 'services';
  columns?: 2 | 3 | 4;
};

/**
 * Composant de maillage interne SEO
 * Affiche des liens connexes de manière structurée et accessible
 */
export function RelatedLinks({ 
  title = "Voir aussi", 
  links, 
  type = 'guides',
  columns = 2 
}: RelatedLinksProps) {
  const getIcon = () => {
    switch (type) {
      case 'cities':
        return <MapPin size={16} className="text-orange-600" aria-hidden="true" />;
      case 'services':
        return <Wrench size={16} className="text-orange-600" aria-hidden="true" />;
      default:
        return <FileText size={16} className="text-orange-600" aria-hidden="true" />;
    }
  };

  const getGridCols = () => {
    switch (columns) {
      case 3:
        return 'sm:grid-cols-2 md:grid-cols-3';
      case 4:
        return 'sm:grid-cols-2 lg:grid-cols-4';
      default:
        return 'sm:grid-cols-2';
    }
  };

  if (links.length === 0) return null;

  return (
    <nav aria-labelledby="related-links-title" className="my-8">
      <h2 id="related-links-title" className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
        {getIcon()}
        {title}
      </h2>
      <ul className={`grid grid-cols-1 ${getGridCols()} gap-3`} role="list">
        {links.map((link, index) => (
          <li key={index}>
            <Link 
              href={link.href}
              className="group flex items-center gap-3 p-4 bg-slate-50 hover:bg-orange-50 border border-slate-200 hover:border-orange-300 rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            >
              <div className="flex-1">
                <span className="font-semibold text-slate-900 group-hover:text-orange-600 transition">
                  {link.label}
                </span>
                {link.description && (
                  <p className="text-sm text-slate-600 mt-1">{link.description}</p>
                )}
              </div>
              <ArrowRight size={16} className="text-slate-400 group-hover:text-orange-600 group-hover:translate-x-1 transition-all" aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/**
 * Données de liens pour le maillage interne - Fissures
 */
export const fissuresRelatedLinks: LinkItem[] = [
  { href: '/fissure-en-escalier-causes/', label: 'Fissures en escalier', description: 'Causes et dangers' },
  { href: '/fissure-horizontale-danger/', label: 'Fissures horizontales', description: 'Risques structurels' },
  { href: '/microfissure-quand-sinquieter/', label: 'Microfissures', description: 'Quand s\'inquiéter ?' },
  { href: '/fissure-secheresse-indemnisation/', label: 'Fissures & sécheresse', description: 'Indemnisation CAT-NAT' },
  { href: '/fissure-fondation-maison/', label: 'Fissures de fondation', description: 'Diagnostic et solutions' },
];

/**
 * Données de liens pour le maillage interne - Humidité
 */
export const humiditeRelatedLinks: LinkItem[] = [
  { href: '/remontees-capillaires-traitement/', label: 'Remontées capillaires', description: 'Causes et traitement' },
  { href: '/moisissures-maison-sante/', label: 'Moisissures', description: 'Risques santé' },
  { href: '/cave-humide-solutions/', label: 'Cave humide', description: 'Solutions efficaces' },
  { href: '/ponts-thermiques-condensation/', label: 'Ponts thermiques', description: 'Condensation' },
  { href: '/salpetre-mur-traitement/', label: 'Salpêtre', description: 'Traitement définitif' },
  { href: '/condensation-ou-infiltration/', label: 'Condensation vs infiltration', description: 'Comment différencier' },
  { href: '/vmi-ventilation-insufflation/', label: 'VMI', description: 'Ventilation mécanique' },
  { href: '/merule-champignon-traitement/', label: 'Mérule', description: 'Traitement champignon' },
];

/**
 * Données de liens pour les villes principales
 */
export const villesFissuresLinks: LinkItem[] = [
  { href: '/expert-fissures/toulouse/', label: 'Toulouse' },
  { href: '/expert-fissures/colomiers/', label: 'Colomiers' },
  { href: '/expert-fissures/blagnac/', label: 'Blagnac' },
  { href: '/expert-fissures/muret/', label: 'Muret' },
  { href: '/expert-fissures/tournefeuille/', label: 'Tournefeuille' },
  { href: '/expert-fissures/montauban/', label: 'Montauban' },
  { href: '/expert-fissures/albi/', label: 'Albi' },
  { href: '/expert-fissures/auch/', label: 'Auch' },
];

export const villesHumiditeLinks: LinkItem[] = [
  { href: '/expert-humidite/toulouse/', label: 'Toulouse' },
  { href: '/expert-humidite/colomiers/', label: 'Colomiers' },
  { href: '/expert-humidite/blagnac/', label: 'Blagnac' },
  { href: '/expert-humidite/muret/', label: 'Muret' },
  { href: '/expert-humidite/tournefeuille/', label: 'Tournefeuille' },
  { href: '/expert-humidite/montauban/', label: 'Montauban' },
  { href: '/expert-humidite/albi/', label: 'Albi' },
  { href: '/expert-humidite/auch/', label: 'Auch' },
];

/**
 * Composant de navigation entre services
 */
export function ServiceNavigation() {
  return (
    <nav aria-label="Services IPB" className="bg-slate-900 text-white py-4">
      <div className="max-w-7xl mx-auto px-4">
        <ul className="flex flex-wrap justify-center gap-4 md:gap-8 text-sm">
          <li>
            <Link href="/expertise/fissures" className="hover:text-orange-400 transition focus:outline-none focus:ring-2 focus:ring-orange-400 rounded px-2 py-1">
              Expertise Fissures
            </Link>
          </li>
          <li>
            <Link href="/expertise/humidite" className="hover:text-orange-400 transition focus:outline-none focus:ring-2 focus:ring-orange-400 rounded px-2 py-1">
              Expertise Humidité
            </Link>
          </li>
          <li>
            <Link href="/diagnostic" className="hover:text-orange-400 transition focus:outline-none focus:ring-2 focus:ring-orange-400 rounded px-2 py-1">
              Diagnostic Gratuit
            </Link>
          </li>
          <li>
            <Link href="/blog" className="hover:text-orange-400 transition focus:outline-none focus:ring-2 focus:ring-orange-400 rounded px-2 py-1">
              Blog Expert
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-orange-400 transition focus:outline-none focus:ring-2 focus:ring-orange-400 rounded px-2 py-1">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
