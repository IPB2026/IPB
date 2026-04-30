import Link from 'next/link';
import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { SmartBackBar } from "@/components/ui/SmartBackBar";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Plan du Site · IPB Expert Fissures & Humidité Toulouse',
  description: "Plan complet du site IPB : services, villes d'intervention, blog. Expert fissures et humidité en Occitanie. ☎ 05 82 95 33 75",
  alternates: {
    canonical: 'https://www.ipb-expertise.fr/plan-site'
  }
};

export default function PlanSitePage() {
  return (
    <div className="min-h-screen bg-ipb-cream">
      <TopBar />
      <Navbar />
      <SmartBackBar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-extrabold text-ipb-text mb-4">Plan du site</h1>
        <p className="text-lg text-ipb-muted mb-12">Accédez rapidement à toutes les pages de notre site</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Pages principales */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-ipb-orange mb-4 flex items-center gap-2">
              <span>🏠</span> Pages principales
            </h2>
            <ul className="space-y-2">
              <li><Link href="/" className="text-ipb-text hover:text-ipb-orange transition font-medium">Accueil</Link></li>
              <li><Link href="/diagnostic" className="text-ipb-text hover:text-ipb-orange transition font-medium">Diagnostic gratuit</Link></li>
              <li><Link href="/contact" className="text-ipb-text hover:text-ipb-orange transition font-medium">Contact</Link></li>
              <li><Link href="/blog" className="text-ipb-text hover:text-ipb-orange transition font-medium">Blog</Link></li>
            </ul>
          </div>

          {/* Expertises */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-ipb-orange mb-4 flex items-center gap-2">
              <span>🔧</span> Nos expertises
            </h2>
            <ul className="space-y-2">
              <li><Link href="/expertise/fissures" className="text-ipb-text hover:text-ipb-orange transition font-medium">Expertise fissures & agrafage</Link></li>
              <li><Link href="/expertise/humidite" className="text-ipb-text hover:text-ipb-orange transition font-medium">Traitement humidité</Link></li>
            </ul>
          </div>

          {/* Départements */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-ipb-orange mb-4 flex items-center gap-2">
              <span>🗺️</span> Départements
            </h2>
            <ul className="space-y-2">
              <li><Link href="/departements/haute-garonne" className="text-ipb-text hover:text-ipb-orange transition font-medium">Haute-Garonne (31)</Link></li>
              <li><Link href="/departements/tarn-et-garonne" className="text-ipb-text hover:text-ipb-orange transition font-medium">Tarn-et-Garonne (82)</Link></li>
              <li><Link href="/departements/gers" className="text-ipb-text hover:text-ipb-orange transition font-medium">Gers (32)</Link></li>
              <li><Link href="/departements/ariege" className="text-ipb-text hover:text-ipb-orange transition font-medium">Ariège (09)</Link></li>
            </ul>
          </div>

          {/* Mentions légales */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-ipb-orange mb-4 flex items-center gap-2">
              <span>⚖️</span> Mentions légales
            </h2>
            <ul className="space-y-2">
              <li><Link href="/legal/mentions-legales" className="text-ipb-text hover:text-ipb-orange transition font-medium">Mentions légales</Link></li>
              <li><Link href="/legal/confidentialite" className="text-ipb-text hover:text-ipb-orange transition font-medium">Politique de confidentialité</Link></li>
              <li><Link href="/legal/cgv" className="text-ipb-text hover:text-ipb-orange transition font-medium">CGV</Link></li>
            </ul>
          </div>

          {/* Zones d'intervention */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-ipb-orange mb-4 flex items-center gap-2">
              <span>📍</span> Zones d'intervention
            </h2>
            <ul className="space-y-2 text-sm">
              <li><Link href="/zones-intervention" className="text-ipb-orange hover:text-ipb-orange transition font-bold">Mapping complet (56 villes)</Link></li>
              <li><Link href="/quartiers" className="text-ipb-text hover:text-ipb-orange transition font-medium">Quartiers Toulouse (fiches locales)</Link></li>
              <li className="text-xs text-ipb-muted font-bold mt-3 uppercase">Haute-Garonne (31)</li>
              <li><Link href="/expert-fissures/toulouse" className="text-ipb-text hover:text-ipb-orange transition">Toulouse</Link></li>
              <li><Link href="/expert-fissures/colomiers" className="text-ipb-text hover:text-ipb-orange transition">Colomiers</Link></li>
              <li><Link href="/expert-fissures/muret" className="text-ipb-text hover:text-ipb-orange transition">Muret</Link></li>
              <li><Link href="/expert-fissures/tournefeuille" className="text-ipb-text hover:text-ipb-orange transition">Tournefeuille</Link></li>
              <li><Link href="/expert-fissures/blagnac" className="text-ipb-text hover:text-ipb-orange transition">Blagnac</Link></li>
              <li><Link href="/expert-fissures/balma" className="text-ipb-text hover:text-ipb-orange transition">Balma</Link></li>
              <li className="text-xs text-ipb-muted font-bold mt-3 uppercase">Tarn-et-Garonne (82)</li>
              <li><Link href="/expert-fissures/montauban" className="text-ipb-text hover:text-ipb-orange transition">Montauban</Link></li>
              <li><Link href="/expert-fissures/castelsarrasin" className="text-ipb-text hover:text-ipb-orange transition">Castelsarrasin</Link></li>
              <li><Link href="/expert-fissures/moissac" className="text-ipb-text hover:text-ipb-orange transition">Moissac</Link></li>
              <li className="text-xs text-ipb-muted font-bold mt-3 uppercase">Gers (32)</li>
              <li><Link href="/expert-fissures/auch" className="text-ipb-text hover:text-ipb-orange transition">Auch</Link></li>
              <li><Link href="/expert-fissures/condom" className="text-ipb-text hover:text-ipb-orange transition">Condom</Link></li>
              <li><Link href="/expert-fissures/fleurance" className="text-ipb-text hover:text-ipb-orange transition">Fleurance</Link></li>
              <li className="text-xs text-ipb-muted font-bold mt-3 uppercase">Tarn (81)</li>
              <li><Link href="/expert-fissures/albi" className="text-ipb-text hover:text-ipb-orange transition">Albi</Link></li>
              <li><Link href="/expert-fissures/castres" className="text-ipb-text hover:text-ipb-orange transition">Castres</Link></li>
              <li><Link href="/expert-fissures/gaillac" className="text-ipb-text hover:text-ipb-orange transition">Gaillac</Link></li>
              <li className="text-ipb-muted text-xs mt-2"><Link href="/zones-intervention" className="text-ipb-orange hover:text-ipb-orange underline">Voir les 56 villes →</Link></li>
            </ul>
          </div>

          {/* Services par ville */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-ipb-orange mb-4 flex items-center gap-2">
              <span>🛠️</span> Services par ville
            </h2>
            <ul className="space-y-2 text-sm">
              <li><Link href="/agrafage-fissures/toulouse" className="text-ipb-text hover:text-ipb-orange transition">Agrafage Toulouse</Link></li>
              <li><Link href="/agrafage-fissures/colomiers" className="text-ipb-text hover:text-ipb-orange transition">Agrafage Colomiers</Link></li>
              <li><Link href="/traitement-humidite/toulouse" className="text-ipb-text hover:text-ipb-orange transition">Humidité Toulouse</Link></li>
              <li><Link href="/traitement-humidite/blagnac" className="text-ipb-text hover:text-ipb-orange transition">Humidité Blagnac</Link></li>
              <li className="text-ipb-muted text-xs mt-2">+ 60 autres pages services...</li>
            </ul>
          </div>

          {/* Blog - Fissures */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-ipb-orange mb-4 flex items-center gap-2">
              <span>📝</span> Blog - Fissures
            </h2>
            <ul className="space-y-2 text-sm">
              <li><Link href="/blog/fissures-maison-toulouse-que-faire" className="text-ipb-text hover:text-ipb-orange transition">Fissures maison Toulouse</Link></li>
              <li><Link href="/blog/agrafage-vs-micropieux-choix" className="text-ipb-text hover:text-ipb-orange transition">Agrafage vs micropieux</Link></li>
              <li><Link href="/blog/fissures-escalier-tassement-differentiel" className="text-ipb-text hover:text-ipb-orange transition">Fissures en escalier</Link></li>
              <li><Link href="/blog/fissure-ouverture-porte-fenetre" className="text-ipb-text hover:text-ipb-orange transition">Portes qui coincent</Link></li>
              <li><Link href="/blog/fissure-facade-reboucher-ou-reparer" className="text-ipb-text hover:text-ipb-orange transition">Reboucher ou réparer</Link></li>
              <li><Link href="/blog/fissure-plafond-que-faire" className="text-ipb-text hover:text-ipb-orange transition">Fissures au plafond</Link></li>
            </ul>
          </div>

          {/* Blog - Humidité */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-ipb-orange mb-4 flex items-center gap-2">
              <span>💧</span> Blog - Humidité
            </h2>
            <ul className="space-y-2 text-sm">
              <li><Link href="/blog/humidite-remontee-capillaire-solution" className="text-ipb-text hover:text-ipb-orange transition">Remontées capillaires</Link></li>
              <li><Link href="/blog/humidite-salpetre-traitement" className="text-ipb-text hover:text-ipb-orange transition">Traitement salpêtre</Link></li>
              <li><Link href="/blog/salpetre-toulouse-traitement-definitif" className="text-ipb-text hover:text-ipb-orange transition font-medium text-ipb-orange">Salpêtre Toulouse</Link></li>
              <li><Link href="/blog/merule-champignon-maison-danger" className="text-ipb-text hover:text-ipb-orange transition font-medium text-ipb-orange">Mérule : le champignon destructeur</Link></li>
              <li><Link href="/blog/traitement-humidite-injection-resine" className="text-ipb-text hover:text-ipb-orange transition">Injection résine</Link></li>
              <li><Link href="/blog/ventilation-humidite-condensation" className="text-ipb-text hover:text-ipb-orange transition">VMC et condensation</Link></li>
              <li><Link href="/blog/condensation-ou-infiltration" className="text-ipb-text hover:text-ipb-orange transition">Condensation vs infiltration</Link></li>
              <li><Link href="/blog/humidite-cave-sous-sol" className="text-ipb-text hover:text-ipb-orange transition">Humidité en cave</Link></li>
            </ul>
          </div>

          {/* Blog - Conseils */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-ipb-orange mb-4 flex items-center gap-2">
              <span>💡</span> Blog - Conseils
            </h2>
            <ul className="space-y-2 text-sm">
              <li><Link href="/blog/agrafage-vs-micropieux-choix" className="text-ipb-text hover:text-ipb-orange transition">Agrafage vs micropieux : quel choix ?</Link></li>
              <li><Link href="/blog/diagnostic-structurel-maison" className="text-ipb-text hover:text-ipb-orange transition">Diagnostic structurel</Link></li>
              <li><Link href="/blog/garantie-decennale-travaux-structure" className="text-ipb-text hover:text-ipb-orange transition">Garantie décennale</Link></li>
              <li><Link href="/blog/revente-maison-fissuree" className="text-ipb-text hover:text-ipb-orange transition">Revente maison fissurée</Link></li>
              <li><Link href="/blog/catastrophe-naturelle-secheresse-demarches-indemnisation" className="text-ipb-text hover:text-ipb-orange transition">Catastrophe naturelle sécheresse : démarches</Link></li>
              <li><Link href="/blog/fissure-mur-interieur-causes-solutions" className="text-ipb-text hover:text-ipb-orange transition">Fissure mur intérieur : causes et solutions</Link></li>
              <li><Link href="/blog/prix-agrafage-fissures-2026" className="text-ipb-text hover:text-ipb-orange transition">Prix agrafage fissures 2026 : tarifs et comparatif</Link></li>
              <li><Link href="/blog/fissure-maison-neuve-garantie-decennale" className="text-ipb-text hover:text-ipb-orange transition">Fissure maison neuve : garantie décennale</Link></li>
              <li><Link href="/blog/humidite-mur-chambre-causes-solutions" className="text-ipb-text hover:text-ipb-orange transition">Humidité mur chambre : causes et solutions</Link></li>
              <li><Link href="/blog/assurance-fissures-maison-indemnisation" className="text-ipb-text hover:text-ipb-orange transition">Assurance fissures : comment être indemnisé</Link></li>
              <li><Link href="/blog/fondations-maison-ancienne-renforcement" className="text-ipb-text hover:text-ipb-orange transition">Fondations maison ancienne : renforcement</Link></li>
            </ul>
          </div>

          {/* Blog - Expertise */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-ipb-orange mb-4 flex items-center gap-2">
              <span>🎓</span> Blog - Expertise
            </h2>
            <ul className="space-y-2 text-sm">
              <li><Link href="/blog/secheresse-argile-haute-garonne" className="text-ipb-text hover:text-ipb-orange transition">Sol argileux Haute-Garonne</Link></li>
              <li><Link href="/blog/expert-batiment-independant-vs-expert-assurance" className="text-ipb-text hover:text-ipb-orange transition">Expert indépendant vs expert assurance</Link></li>
            </ul>
          </div>

          {/* Blog - Départements */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-ipb-orange mb-4 flex items-center gap-2">
              <span>📍</span> Blog - Départements
            </h2>
            <ul className="space-y-2 text-sm">
              <li><Link href="/blog/expert-fissures-gers-guide-complet" className="text-ipb-text hover:text-ipb-orange transition">Expert fissures Gers</Link></li>
              <li><Link href="/blog/fissures-maison-tarn-et-garonne-solutions" className="text-ipb-text hover:text-ipb-orange transition">Fissures Tarn-et-Garonne</Link></li>
            </ul>
          </div>

        </div>

        {/* CTA */}
        <div className="mt-12 bg-ipb-orange rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-extrabold mb-4">Besoin d'un expert ?</h2>
          <p className="text-xl text-ipb-orange-l mb-6">Diagnostic gratuit de votre situation en 5 minutes</p>
          <Link 
            href="/diagnostic"
            className="inline-block bg-white text-ipb-orange px-8 py-4 rounded-xl font-bold text-lg hover:bg-ipb-stone transition shadow-xl"
          >
            Lancer le diagnostic →
          </Link>
        </div>

      </div>
    </div>
  );
}
