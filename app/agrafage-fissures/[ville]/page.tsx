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
  if (!villeData) return { title: "Agrafage de fissures | IPB" };

  const deptCode = villeData.codePostal.slice(0, 2);
  const villeNom = villeData.nom;

  return {
    title: `Agrafage de fissures ${villeNom} (${deptCode}) · Cabinet IPB`,
    description: `Cabinet de pathologie du bâtiment à ${villeNom}. Agrafage structurel pour stabiliser les fissures de maçonnerie. Solution adaptée à 90 % des cas. Décennale AXA.`,
    keywords: [
      `agrafage fissures ${ville}`,
      `agrafage maçonnerie ${ville}`,
      `réparation fissure mur ${ville}`,
      `stabilisation fissure ${ville}`,
      `harpage ${ville}`,
      `cabinet pathologie bâtiment ${ville}`,
    ],
    alternates: { canonical: `https://www.ipb-expertise.fr/agrafage-fissures/${ville}` },
    openGraph: {
      title: `Agrafage de fissures ${villeNom} · Cabinet IPB`,
      description: `Stabilisation par agrafage structurel à ${villeNom}.`,
      url: `https://www.ipb-expertise.fr/agrafage-fissures/${ville}`,
      type: 'website',
      images: [{ url: '/images/fissures-avant-apres.webp', width: 1200, height: 630, alt: `Agrafage fissures ${villeNom}` }],
    },
    robots: { index: true, follow: true },
  };
}

export default async function AgrafageFissuresVillePage({ params }: { params: Promise<{ ville: string }> }) {
  const { ville } = await params;
  const villeData = villesData[ville];
  if (!villeData) notFound();

  const villeNom = villeData.nom;

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": `IPB · Agrafage de fissures ${villeNom}`,
    "description": `Stabilisation structurelle par agrafage à ${villeNom}. Solution adaptée à 90 % des fissures structurelles.`,
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
        serviceTitle="Agrafage structurel de fissures"
        eyebrowLabel="Travaux · Agrafage de maçonnerie"
        description={`Notre cabinet réalise l'agrafage structurel à ${villeNom} : pose d'aciers inoxydables qui « cousent » la fissure tous les 40 cm pour rendre la maçonnerie monolithique. Solution adaptée à 90 % des fissures de maison individuelle. Garantie décennale AXA.`}
        heroImage="/images/fissures-avant-apres.webp"
        heroAlt={`Agrafage de fissures à ${villeNom} — Cabinet IPB`}
        methodHref="/expertise/fissures"
        contextField={villeData.specificitesFissures ? 'specificitesFissures' : undefined}
        relatedCards={[
          { href: '/expertise/fissures', titre: 'Notre méthode', desc: "Diagnostic instrumenté, agrafage, reprise en sous-œuvre." },
          { href: '/blog/agrafage-vs-micropieux-choix', titre: 'Agrafage ou micropieux ?', desc: "Notre guide pour choisir la bonne solution." },
          { href: `/expert-fissures/${ville}`, titre: `Expert fissures à ${villeNom}`, desc: `Page dédiée au diagnostic à ${villeNom}.` },
        ]}
      />
    </>
  );
}
