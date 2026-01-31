import Link from 'next/link';
import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Plan du site - IPB Expertise Fissures & Humidité Toulouse',
  description: 'Plan complet du site IPB : toutes nos pages, services, villes d\'intervention, et articles de blog. Expert fissures et humidité en Haute-Garonne.',
  alternates: {
    canonical: 'https://www.ipb-expertise.fr/plan-site'
  }
};

export default function PlanSitePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <TopBar />
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Plan du site</h1>
        <p className="text-lg text-slate-600 mb-12">Accédez rapidement à toutes les pages de notre site</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Pages principales */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-orange-600 mb-4 flex items-center gap-2">
              <span>🏠</span> Pages principales
            </h2>
            <ul className="space-y-2">
              <li><Link href="/" className="text-slate-700 hover:text-orange-600 transition font-medium">Accueil</Link></li>
              <li><Link href="/diagnostic" className="text-slate-700 hover:text-orange-600 transition font-medium">Diagnostic gratuit</Link></li>
              <li><Link href="/contact" className="text-slate-700 hover:text-orange-600 transition font-medium">Contact</Link></li>
              <li><Link href="/blog" className="text-slate-700 hover:text-orange-600 transition font-medium">Blog</Link></li>
            </ul>
          </div>

          {/* Expertises */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-orange-600 mb-4 flex items-center gap-2">
              <span>🔧</span> Nos expertises
            </h2>
            <ul className="space-y-2">
              <li><Link href="/expertise/fissures" className="text-slate-700 hover:text-orange-600 transition font-medium">Expertise fissures & agrafage</Link></li>
              <li><Link href="/expertise/humidite" className="text-slate-700 hover:text-orange-600 transition font-medium">Traitement humidité</Link></li>
            </ul>
          </div>

          {/* Départements */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-orange-600 mb-4 flex items-center gap-2">
              <span>🗺️</span> Départements
            </h2>
            <ul className="space-y-2">
              <li><Link href="/departements/haute-garonne" className="text-slate-700 hover:text-orange-600 transition font-medium">Haute-Garonne (31)</Link></li>
              <li><Link href="/departements/tarn-et-garonne" className="text-slate-700 hover:text-orange-600 transition font-medium">Tarn-et-Garonne (82)</Link></li>
              <li><Link href="/departements/gers" className="text-slate-700 hover:text-orange-600 transition font-medium">Gers (32)</Link></li>
              <li><Link href="/departements/ariege" className="text-slate-700 hover:text-orange-600 transition font-medium">Ariège (09)</Link></li>
            </ul>
          </div>

          {/* Mentions légales */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-orange-600 mb-4 flex items-center gap-2">
              <span>⚖️</span> Mentions légales
            </h2>
            <ul className="space-y-2">
              <li><Link href="/legal/mentions-legales" className="text-slate-700 hover:text-orange-600 transition font-medium">Mentions légales</Link></li>
              <li><Link href="/legal/confidentialite" className="text-slate-700 hover:text-orange-600 transition font-medium">Politique de confidentialité</Link></li>
              <li><Link href="/legal/cgv" className="text-slate-700 hover:text-orange-600 transition font-medium">CGV</Link></li>
            </ul>
          </div>

          {/* Villes d'intervention */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-orange-600 mb-4 flex items-center gap-2">
              <span>📍</span> Villes d'intervention
            </h2>
            <ul className="space-y-2 text-sm">
              <li><Link href="/villes/toulouse" className="text-slate-700 hover:text-orange-600 transition">Toulouse</Link></li>
              <li><Link href="/villes/colomiers" className="text-slate-700 hover:text-orange-600 transition">Colomiers</Link></li>
              <li><Link href="/villes/tournefeuille" className="text-slate-700 hover:text-orange-600 transition">Tournefeuille</Link></li>
              <li><Link href="/villes/blagnac" className="text-slate-700 hover:text-orange-600 transition">Blagnac</Link></li>
              <li><Link href="/villes/cugnaux" className="text-slate-700 hover:text-orange-600 transition">Cugnaux</Link></li>
              <li><Link href="/villes/balma" className="text-slate-700 hover:text-orange-600 transition">Balma</Link></li>
              <li><Link href="/villes/plaisance-du-touch" className="text-slate-700 hover:text-orange-600 transition">Plaisance-du-Touch</Link></li>
              <li><Link href="/villes/ramonville-saint-agne" className="text-slate-700 hover:text-orange-600 transition">Ramonville</Link></li>
              <li className="text-slate-500 text-xs mt-2">+ 30 autres villes...</li>
            </ul>
          </div>

          {/* Services par ville */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-orange-600 mb-4 flex items-center gap-2">
              <span>🛠️</span> Services par ville
            </h2>
            <ul className="space-y-2 text-sm">
              <li><Link href="/agrafage-fissures/toulouse" className="text-slate-700 hover:text-orange-600 transition">Agrafage Toulouse</Link></li>
              <li><Link href="/agrafage-fissures/colomiers" className="text-slate-700 hover:text-orange-600 transition">Agrafage Colomiers</Link></li>
              <li><Link href="/traitement-humidite/toulouse" className="text-slate-700 hover:text-orange-600 transition">Humidité Toulouse</Link></li>
              <li><Link href="/traitement-humidite/blagnac" className="text-slate-700 hover:text-orange-600 transition">Humidité Blagnac</Link></li>
              <li className="text-slate-500 text-xs mt-2">+ 60 autres pages services...</li>
            </ul>
          </div>

          {/* Blog - Fissures */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-orange-600 mb-4 flex items-center gap-2">
              <span>📝</span> Blog - Fissures
            </h2>
            <ul className="space-y-2 text-sm">
              <li><Link href="/blog/fissures-maison-toulouse-que-faire" className="text-slate-700 hover:text-orange-600 transition">Fissures maison Toulouse</Link></li>
              <li><Link href="/blog/agrafage-vs-micropieux-choix" className="text-slate-700 hover:text-orange-600 transition">Agrafage vs micropieux</Link></li>
              <li><Link href="/blog/fissures-escalier-tassement-differentiel" className="text-slate-700 hover:text-orange-600 transition">Fissures en escalier</Link></li>
              <li><Link href="/blog/fissure-ouverture-porte-fenetre" className="text-slate-700 hover:text-orange-600 transition">Portes qui coincent</Link></li>
              <li><Link href="/blog/fissure-facade-reboucher-ou-reparer" className="text-slate-700 hover:text-orange-600 transition">Reboucher ou réparer</Link></li>
              <li><Link href="/blog/fissure-plafond-que-faire" className="text-slate-700 hover:text-orange-600 transition">Fissures au plafond</Link></li>
            </ul>
          </div>

          {/* Blog - Humidité */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-orange-600 mb-4 flex items-center gap-2">
              <span>💧</span> Blog - Humidité
            </h2>
            <ul className="space-y-2 text-sm">
              <li><Link href="/blog/humidite-remontee-capillaire-solution" className="text-slate-700 hover:text-orange-600 transition">Remontées capillaires</Link></li>
              <li><Link href="/blog/humidite-salpetre-traitement" className="text-slate-700 hover:text-orange-600 transition">Traitement salpêtre</Link></li>
              <li><Link href="/blog/traitement-humidite-injection-resine" className="text-slate-700 hover:text-orange-600 transition">Injection résine</Link></li>
              <li><Link href="/blog/ventilation-humidite-condensation" className="text-slate-700 hover:text-orange-600 transition">VMC et condensation</Link></li>
              <li><Link href="/blog/condensation-ou-infiltration" className="text-slate-700 hover:text-orange-600 transition">Condensation vs infiltration</Link></li>
              <li><Link href="/blog/humidite-cave-sous-sol" className="text-slate-700 hover:text-orange-600 transition">Humidité en cave</Link></li>
            </ul>
          </div>

          {/* Blog - Conseils */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-orange-600 mb-4 flex items-center gap-2">
              <span>💡</span> Blog - Conseils
            </h2>
            <ul className="space-y-2 text-sm">
              <li><Link href="/blog/cout-reparation-fissures-2025" className="text-slate-700 hover:text-orange-600 transition">Prix réparation 2025</Link></li>
              <li><Link href="/blog/diagnostic-structurel-maison" className="text-slate-700 hover:text-orange-600 transition">Diagnostic structurel</Link></li>
              <li><Link href="/blog/garantie-decennale-travaux-structure" className="text-slate-700 hover:text-orange-600 transition">Garantie décennale</Link></li>
              <li><Link href="/blog/revente-maison-fissuree" className="text-slate-700 hover:text-orange-600 transition">Revente maison fissurée</Link></li>
            </ul>
          </div>

          {/* Blog - Expertise */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-orange-600 mb-4 flex items-center gap-2">
              <span>🎓</span> Blog - Expertise
            </h2>
            <ul className="space-y-2 text-sm">
              <li><Link href="/blog/secheresse-argile-haute-garonne" className="text-slate-700 hover:text-orange-600 transition">Sol argileux Haute-Garonne</Link></li>
            </ul>
          </div>

          {/* Blog - Départements */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-orange-600 mb-4 flex items-center gap-2">
              <span>📍</span> Blog - Départements
            </h2>
            <ul className="space-y-2 text-sm">
              <li><Link href="/blog/expert-fissures-gers-guide-complet" className="text-slate-700 hover:text-orange-600 transition">Expert fissures Gers</Link></li>
              <li><Link href="/blog/fissures-maison-tarn-et-garonne-solutions" className="text-slate-700 hover:text-orange-600 transition">Fissures Tarn-et-Garonne</Link></li>
            </ul>
          </div>

        </div>

        {/* CTA */}
        <div className="mt-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-extrabold mb-4">Besoin d'un expert ?</h2>
          <p className="text-xl text-orange-100 mb-6">Diagnostic gratuit de votre situation en 5 minutes</p>
          <Link 
            href="/diagnostic"
            className="inline-block bg-white text-orange-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-orange-50 transition shadow-xl"
          >
            Lancer le diagnostic →
          </Link>
        </div>

      </div>
    </div>
  );
}
