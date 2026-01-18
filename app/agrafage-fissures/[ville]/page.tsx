import { Metadata } from 'next';
import Link from 'next/link';
import { villesData, villeSlugs } from '@/app/data/villes';
import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { Footer } from '@/components/home/Footer';
import { InternalLinks } from '@/components/seo/InternalLinks';

interface PageProps {
  params: Promise<{ ville: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { ville } = await params;
  const villeData = villesData[ville.toLowerCase()];

  if (!villeData) {
    return { title: 'Agrafage fissures | IPB' };
  }

  const title = `Agrafage fissures à ${villeData.nom} (${villeData.codePostal}) | IPB`;
  const description = `Traitement des fissures structurelles à ${villeData.nom}. Agrafage et stabilisation des murs, intervention rapide, garantie décennale.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.ipb-expertise.fr/agrafage-fissures/${ville}`,
    },
    openGraph: {
      title,
      description,
      url: `https://www.ipb-expertise.fr/agrafage-fissures/${ville}`,
      siteName: 'IPB',
      locale: 'fr_FR',
      type: 'website',
      images: [
        { url: '/images/IPB_Logo_HD.png', width: 1200, height: 630, alt: title },
      ],
    },
  };
}

export default async function AgrafageVillePage({ params }: PageProps) {
  const { ville } = await params;
  const villeData = villesData[ville.toLowerCase()];

  if (!villeData) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Ville non trouvée</h1>
          <Link href="/" className="text-orange-600 hover:text-orange-700">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="font-sans text-slate-800 bg-slate-50 antialiased">
      <TopBar />
      <Navbar />

      <section className="bg-slate-900 text-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
            Agrafage fissures à {villeData.nom}
          </h1>
          <p className="text-lg text-slate-300 max-w-3xl">
            Intervention rapide à {villeData.nom} ({villeData.codePostal}). 
            Stabilisation des murs fissurés par agrafage, alternative économique aux micropieux.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link href="/diagnostic" className="bg-orange-600 text-white px-8 py-4 rounded-xl font-bold shadow-xl hover:bg-orange-500 transition">
              Diagnostic gratuit
            </Link>
            <a href="tel:0582953375" className="bg-white/10 border border-white/20 px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition">
              Appeler un expert
            </a>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-4">Pourquoi l’agrafage ?</h2>
          <p className="text-slate-600 mb-6">
            L’agrafage consiste à “recoudre” la maçonnerie avec des aciers torsadés. 
            Il stabilise durablement la structure tout en limitant les coûts.
          </p>
          <ul className="list-disc pl-6 text-slate-600 space-y-2">
            <li>Intervention rapide à {villeData.nom} et alentours</li>
            <li>Résultat durable avec garantie décennale</li>
            <li>Alternative aux micropieux dans 90% des cas</li>
          </ul>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <InternalLinks variant="fissures" title="Services complémentaires" />
      </div>

      <Footer />
    </div>
  );
}

export async function generateStaticParams() {
  return villeSlugs.map((ville) => ({ ville }));
}
