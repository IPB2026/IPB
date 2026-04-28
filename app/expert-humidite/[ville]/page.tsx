import { Metadata } from 'next';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import { ServiceVilleTemplate } from '@/components/templates/ServiceVilleTemplate';
import { villesData, villeSlugs } from '@/app/data/villes';
import { VilleBreadcrumb } from '@/components/seo/BreadcrumbSchema';

export async function generateStaticParams() {
  return villeSlugs.map((ville) => ({ ville }));
}

export async function generateMetadata({ params }: { params: Promise<{ ville: string }> }): Promise<Metadata> {
  const { ville } = await params;
  const villeData = villesData[ville];
  if (!villeData) return { title: "Expert humidité | IPB" };

  const deptCode = villeData.codePostal.slice(0, 2);
  const villeNom = villeData.nom;

  return {
    title: `Expert humidité ${villeNom} (${deptCode}) · Institut IPB`,
    description: `Institut de pathologie du bâtiment à ${villeNom}. Diagnostic d'humidité instrumenté, injection de résine, cuvelage, ventilation. Décennale AXA.`,
    keywords: [
      `expert humidité ${ville}`,
      `diagnostic humidité ${ville}`,
      `traitement humidité ${ville}`,
      `injection résine ${ville}`,
      `cuvelage ${ville}`,
      `salpêtre ${ville}`,
      `institut pathologie bâtiment ${ville}`,
    ],
    alternates: { canonical: `https://www.ipb-expertise.fr/expert-humidite/${ville}` },
    openGraph: {
      title: `Expert humidité ${villeNom} · Institut IPB`,
      description: `Diagnostic et traitement de l'humidité à ${villeNom}.`,
      url: `https://www.ipb-expertise.fr/expert-humidite/${ville}`,
      type: 'website',
      images: [{ url: '/images/humidite-avant-apres.webp', width: 1200, height: 630, alt: `Expert humidité ${villeNom}` }],
    },
    robots: { index: true, follow: true },
  };
}

export default async function ExpertHumiditeVillePage({ params }: { params: Promise<{ ville: string }> }) {
  const { ville } = await params;
  const villeData = villesData[ville];
  if (!villeData) notFound();

  const villeNom = villeData.nom;

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": `IPB · Expert humidité ${villeNom}`,
    "description": `Institut de pathologie du bâtiment intervenant à ${villeNom}. Diagnostic et traitement de l'humidité.`,
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
      <VilleBreadcrumb villeName={villeNom} villeSlug={ville} service="humidite" />

      <ServiceVilleTemplate
        villeData={villeData}
        ville={ville}
        serviceTitle="Diagnostic et traitement de l'humidité"
        eyebrowLabel="Expertise · Humidité du bâti"
        description={`Notre institut intervient à ${villeNom} pour identifier la cause de l'humidité (remontées capillaires, condensation, infiltration, cave humide) et préconiser le traitement adapté. Hygromètre, caméra thermique, rapport reconnu par les assurances.`}
        heroImage="/images/humidite-avant-apres.webp"
        heroAlt={`Diagnostic humidité à ${villeNom} — Institut IPB`}
        methodHref="/expertise/humidite"
        contextField={villeData.specificitesHumidite ? 'specificitesHumidite' : undefined}
        relatedCards={[
          { href: '/expertise/humidite', titre: 'Notre méthode', desc: "Hygromètre, caméra thermique, rapport reconnu par les assurances." },
          { href: '/blog/humidite-remontee-capillaire-solution', titre: 'Remontées capillaires', desc: "Comprendre et traiter ce désordre fréquent en Occitanie." },
          { href: '/blog/condensation-ou-infiltration', titre: 'Condensation ou infiltration ?', desc: "Identifier la bonne cause avant tout traitement." },
        ]}
      />
    </>
  );
}
