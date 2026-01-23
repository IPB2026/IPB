import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { Footer } from '@/components/home/Footer';
import { Calendar } from 'lucide-react';

export const metadata = {
  title: 'Mentions Légales - IPB',
  description: 'Mentions légales de l\'Institut de Pathologie du Bâtiment (IPB)',
};

export default function MentionsLegalesPage() {
  return (
    <div className="font-sans text-slate-800 bg-slate-50 antialiased">
      <TopBar />
      <Navbar />
      
      <main className="bg-white min-h-screen py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* En-tête avec date de mise à jour */}
          <div className="mb-6 md:mb-8 pb-4 md:pb-6 border-b border-slate-200">
            <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
              <Calendar size={16} />
              <span>Mis à jour le 01/01/2026</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3 md:mb-4">Mentions Légales</h1>
            <p className="text-base md:text-lg text-slate-600">
              Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004 pour la confiance en l'économie numérique, 
              il est précisé aux utilisateurs du site IPB l'identité des différents intervenants dans le cadre de sa réalisation et de son suivi.
            </p>
          </div>

          {/* Contenu */}
          <div className="prose prose-lg max-w-none space-y-8 text-slate-700">
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Éditeur du site</h2>
              <div className="space-y-2">
                <p><strong>Raison sociale :</strong> MGRCP31</p>
                <p><strong>Enseigne commerciale :</strong> IPB (Institut de Pathologie du Bâtiment)</p>
                <p><strong>Siège social :</strong> 54 avenue Jean Jaurès, 31170 Tournefeuille, France</p>
                <p><strong>SIRET :</strong> 951 105 881 00019</p>
                <p><strong>R.C.S. :</strong> Toulouse</p>
                <p><strong>Forme juridique :</strong> Société à responsabilité limitée (SARL)</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Directeur de publication</h2>
              <p>
                Le directeur de la publication est le représentant légal de MGRCP31.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Hébergeur</h2>
              <div className="space-y-2">
                <p><strong>Nom :</strong> Vercel Inc.</p>
                <p><strong>Adresse :</strong> 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis</p>
                <p><strong>Site web :</strong> <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:text-orange-700 underline">https://vercel.com</a></p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Contact</h2>
              <div className="space-y-2">
                <p><strong>Email :</strong> <a href="mailto:contact@ipb-expertise.fr" className="text-orange-600 hover:text-orange-700 underline">contact@ipb-expertise.fr</a></p>
                <p><strong>Téléphone :</strong> <a href="tel:0582953375" className="text-orange-600 hover:text-orange-700 underline">05 82 95 33 75</a></p>
                <p><strong>Adresse postale :</strong> 54 avenue Jean Jaurès, 31170 Tournefeuille, France</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Propriété intellectuelle</h2>
              <p>
                L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. 
                Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
              </p>
              <p className="mt-4">
                La reproduction de tout ou partie de ce site sur un support électronique ou autre est formellement interdite sauf autorisation expresse du directeur de la publication.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Protection des données personnelles</h2>
              <p>
                Conformément à la loi « Informatique et Libertés » du 6 janvier 1978 modifiée et au Règlement Général sur la Protection des Données (RGPD), 
                vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition aux données personnelles vous concernant.
              </p>
              <p className="mt-4">
                Pour exercer ce droit, vous pouvez nous contacter à l'adresse suivante : <a href="mailto:contact@ipb-expertise.fr" className="text-orange-600 hover:text-orange-700 underline">contact@ipb-expertise.fr</a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Cookies</h2>
              <p>
                Le site IPB utilise des cookies pour améliorer l'expérience utilisateur et analyser le trafic. 
                En continuant à naviguer sur ce site, vous acceptez l'utilisation de cookies conformément à notre politique de confidentialité.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Limitation de responsabilité</h2>
              <p>
                Les informations contenues sur ce site sont aussi précises que possible et le site est périodiquement remis à jour, 
                mais peut toutefois contenir des inexactitudes, des omissions ou des lacunes.
              </p>
              <p className="mt-4">
                MGRCP31 ne pourra être tenu responsable des dommages directs et indirects causés au matériel de l'utilisateur, 
                lors de l'accès au site IPB, et résultant soit de l'utilisation d'un matériel ne répondant pas aux spécifications, 
                soit de l'apparition d'un bug ou d'une incompatibilité.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Droit applicable</h2>
              <p>
                Les présentes mentions légales sont régies par le droit français. 
                En cas de litige et à défaut d'accord amiable, le litige sera porté devant les tribunaux français conformément aux règles de compétence en vigueur.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

