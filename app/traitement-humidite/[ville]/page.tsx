import { Metadata } from 'next';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import { ServiceVilleTemplate } from '@/components/templates/ServiceVilleTemplate';
import { villesData, villeSlugs } from '@/app/data/villes';

export async function generateStaticParams() {
  return villeSlugs.map((ville) => ({ ville }));
}

export async function generateMetadata({ params }: { params: Promise<{ ville: string }> }): Promise<Metadata> {
  const { ville } = await params;
  const villeData = villesData[ville];
  if (!villeData) return { title: "Traitement humidité | IPB" };

  const deptCode = villeData.codePostal.slice(0, 2);
  const villeNom = villeData.nom;

  return {
    title: `Traitement Humidité ${villeNom} ${deptCode} · Garantie 30 ans`,
    description: `Traitement humidité à ${villeNom} : injection résine, cuvelage, VMI, drainage. Garantie 30 ans. Décennale AXA. ☎ 05 82 95 33 75`,
    keywords: [
      `traitement humidité ${ville}`,
      `injection résine ${ville}`,
      `cuvelage ${ville}`,
      `traitement remontées capillaires ${ville}`,
      `institut pathologie bâtiment ${ville}`,
    ],
    alternates: { canonical: `https://www.ipb-expertise.fr/traitement-humidite/${ville}` },
    openGraph: {
      title: `Traitement Humidité ${villeNom} · IPB`,
      description: `Injection résine, cuvelage, VMI à ${villeNom}. Garantie 30 ans. Décennale AXA.`,
      url: `https://www.ipb-expertise.fr/traitement-humidite/${ville}`,
      type: 'website',
      images: [{ url: '/images/humidite-avant-apres.webp', width: 1200, height: 630, alt: `Traitement humidité ${villeNom}` }],
    },
    robots: { index: true, follow: true },
  };
}

export default async function TraitementHumiditeVillePage({ params }: { params: Promise<{ ville: string }> }) {
  const { ville } = await params;
  const villeData = villesData[ville];
  if (!villeData) notFound();

  const villeNom = villeData.nom;

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": `IPB · Traitement de l'humidité ${villeNom}`,
    "description": `Traitement durable de l'humidité à ${villeNom} : injection de résine, cuvelage, ventilation.`,
    "areaServed": { "@type": "City", "name": villeNom },
    "provider": {
      "@type": "LocalBusiness",
      "name": "IPB - Institut de Pathologie du Bâtiment",
      "telephone": "+33582953375",
    }
  };

  return (
    <>
      <Script id="service-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />

      <ServiceVilleTemplate
        villeData={villeData}
        ville={ville}
        serviceTitle="Traitement de l'humidité"
        eyebrowLabel="Travaux · Humidité du bâti"
        description={`Notre institut réalise les traitements d'humidité à ${villeNom} : injection de résine hydrophobe pour les remontées capillaires, cuvelage pour les caves, ventilation pour la condensation. Solution adaptée au diagnostic, garantie décennale.`}
        heroImage="/images/humidite-avant-apres.webp"
        heroAlt={`Traitement humidité à ${villeNom} — Institut IPB`}
        methodHref="/expertise/humidite"
        contextField={villeData.specificitesHumidite ? 'specificitesHumidite' : undefined}
        relatedCards={[
          { href: '/expertise/humidite', titre: 'Notre méthode', desc: "Diagnostic instrumenté avant tout traitement." },
          { href: '/blog/humidite-salpetre-traitement', titre: 'Salpêtre : que faire ?', desc: "Origine, traitement et prévention du salpêtre." },
          { href: `/expert-humidite/${ville}`, titre: `Expert humidité à ${villeNom}`, desc: `Page dédiée à notre intervention à ${villeNom}.` },
        ]}
      />
    </>
  );
}
