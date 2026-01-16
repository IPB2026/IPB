import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { Footer } from '@/components/home/Footer';
import { Calendar } from 'lucide-react';

export const metadata = {
  title: 'Politique de Confidentialité - IPB',
  description: 'Politique de confidentialité et protection des données personnelles de l\'Institut de Pathologie du Bâtiment (IPB)',
};

export default function ConfidentialitePage() {
  return (
    <div className="font-sans text-slate-800 bg-slate-50 antialiased">
      <TopBar />
      <Navbar />
      
      <main className="bg-white min-h-screen py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* En-tête avec date de mise à jour */}
          <div className="mb-6 md:mb-8 pb-4 md:pb-6 border-b border-slate-200">
            <div className="flex items-center gap-2 text-xs md:text-sm text-slate-500 mb-3 md:mb-4">
              <Calendar size={16} />
              <span>Mis à jour le 01/01/2026</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3 md:mb-4">Politique de Confidentialité</h1>
            <p className="text-base md:text-lg text-slate-600">
              MGRCP Symbole (enseigne commerciale : IPB) s'engage à protéger la confidentialité et la sécurité 
              des données personnelles collectées dans le cadre de ses prestations.
            </p>
          </div>

          {/* Contenu */}
          <div className="prose prose-lg max-w-none space-y-8 text-slate-700">
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Responsable du traitement</h2>
              <div className="space-y-2">
                <p><strong>Raison sociale :</strong> MGRCP Symbole</p>
                <p><strong>Enseigne commerciale :</strong> IPB (Institut de Pathologie du Bâtiment)</p>
                <p><strong>Siège social :</strong> 31c chemin de roquettes, 31600 Saubens, France</p>
                <p><strong>SIRET :</strong> 951 105 881 00019</p>
                <p><strong>Email :</strong> <a href="mailto:contact@ipb-expertise.fr" className="text-orange-600 hover:text-orange-700 underline">contact@ipb-expertise.fr</a></p>
                <p><strong>Téléphone :</strong> <a href="tel:0582953375" className="text-orange-600 hover:text-orange-700 underline">05 82 95 33 75</a></p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Données collectées</h2>
              <p>
                Dans le cadre de nos prestations, nous collectons les données personnelles suivantes :
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li><strong>Données d'identification :</strong> Nom, prénom, adresse postale, numéro de téléphone, adresse email</li>
                <li><strong>Données du diagnostic :</strong> Photos des désordres, adresse du bien, description des problèmes observés</li>
                <li><strong>Données techniques :</strong> Type de construction, année de construction, caractéristiques du bien</li>
                <li><strong>Données de navigation :</strong> Adresse IP, cookies, données de connexion (pour le site web)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Finalités du traitement</h2>
              <p>
                Les données personnelles collectées sont utilisées pour les finalités suivantes :
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Réalisation des diagnostics et expertises techniques</li>
                <li>Établissement de devis et suivi des commandes</li>
                <li>Exécution des travaux et suivi post-intervention</li>
                <li>Gestion de la relation client et support technique</li>
                <li>Respect des obligations légales et réglementaires</li>
                <li>Amélioration de nos services (analyse statistique anonymisée)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Stockage sécurisé des données du diagnostic</h2>
              <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
                <p className="font-bold text-slate-900 mb-2">Protection des données du diagnostic</p>
                <p>
                  Les données collectées dans le cadre du diagnostic (photos, adresses, descriptions) sont stockées de manière <strong>sécurisée</strong> 
                  pour l'analyse technique et la préparation des devis. Ces données sont :
                </p>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li>Stockées sur des serveurs sécurisés avec chiffrement</li>
                  <li>Accessibles uniquement au personnel autorisé</li>
                  <li>Conservées uniquement pour la durée nécessaire à l'exécution de la prestation</li>
                  <li><strong>Jamais revendues</strong> à des tiers</li>
                  <li>Supprimées à la demande du client conformément au RGPD</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Base légale du traitement</h2>
              <p>
                Le traitement de vos données personnelles est fondé sur :
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li><strong>L'exécution d'un contrat :</strong> Pour la réalisation des prestations commandées</li>
                <li><strong>Le consentement :</strong> Pour l'utilisation du formulaire de contact et du diagnostic en ligne</li>
                <li><strong>L'intérêt légitime :</strong> Pour l'amélioration de nos services</li>
                <li><strong>Les obligations légales :</strong> Pour la conservation des factures et documents comptables</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Destinataires des données</h2>
              <p>
                Vos données personnelles sont destinées à :
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>MGRCP Symbole (IPB) - Personnel autorisé uniquement</li>
                <li>Nos prestataires techniques (hébergement, maintenance) sous contrat de confidentialité</li>
                <li>Les autorités compétentes en cas d'obligation légale</li>
              </ul>
              <p className="mt-4 font-bold">
                Vos données ne sont <strong>jamais revendues</strong> à des tiers à des fins commerciales.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Durée de conservation</h2>
              <p>
                Les données personnelles sont conservées pour les durées suivantes :
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li><strong>Données clients actifs :</strong> Durée de la relation contractuelle + 3 ans</li>
                <li><strong>Données du diagnostic :</strong> 3 ans après la dernière intervention</li>
                <li><strong>Documents comptables :</strong> 10 ans (obligation légale)</li>
                <li><strong>Données de navigation :</strong> 13 mois maximum (cookies)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Vos droits (RGPD)</h2>
              <div className="bg-orange-50 border-l-4 border-orange-600 p-6 rounded-r-lg">
                <p className="font-bold text-slate-900 mb-2">Droit d'accès RGPD</p>
                <p>
                  Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants :
                </p>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li><strong>Droit d'accès :</strong> Vous pouvez obtenir une copie de vos données personnelles</li>
                  <li><strong>Droit de rectification :</strong> Vous pouvez corriger vos données inexactes</li>
                  <li><strong>Droit à l'effacement :</strong> Vous pouvez demander la suppression de vos données</li>
                  <li><strong>Droit à la limitation :</strong> Vous pouvez limiter le traitement de vos données</li>
                  <li><strong>Droit à la portabilité :</strong> Vous pouvez récupérer vos données dans un format structuré</li>
                  <li><strong>Droit d'opposition :</strong> Vous pouvez vous opposer au traitement de vos données</li>
                </ul>
                <p className="mt-4">
                  Pour exercer ces droits, contactez-nous à : <a href="mailto:contact@ipb-expertise.fr" className="text-orange-600 hover:text-orange-700 underline font-bold">contact@ipb-expertise.fr</a>
                </p>
                <p className="mt-2">
                  Vous avez également le droit d'introduire une réclamation auprès de la CNIL (Commission Nationale de l'Informatique et des Libertés) 
                  si vous estimez que vos droits ne sont pas respectés.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Cookies</h2>
              <p>
                Notre site utilise des cookies pour améliorer l'expérience utilisateur et analyser le trafic. 
                Vous pouvez configurer votre navigateur pour refuser les cookies, mais cela peut affecter certaines fonctionnalités du site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">10. Sécurité des données</h2>
              <p>
                MGRCP Symbole met en œuvre toutes les mesures techniques et organisationnelles appropriées pour protéger vos données personnelles 
                contre tout accès non autorisé, perte, destruction ou altération.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">11. Modifications</h2>
              <p>
                La présente politique de confidentialité peut être modifiée à tout moment. 
                La date de dernière mise à jour est indiquée en haut de cette page.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

