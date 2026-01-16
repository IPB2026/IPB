import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { Footer } from '@/components/home/Footer';
import { Calendar } from 'lucide-react';

export const metadata = {
  title: 'Conditions Générales de Vente - IPB',
  description: 'Conditions générales de vente de l\'Institut de Pathologie du Bâtiment (IPB)',
};

export default function CGVPage() {
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
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3 md:mb-4">Conditions Générales de Vente</h1>
            <p className="text-base md:text-lg text-slate-600">
              Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles entre MGRCP Symbole 
              (enseigne commerciale : IPB) et ses clients pour toutes les prestations d'expertise et de travaux.
            </p>
          </div>

          {/* Contenu */}
          <div className="prose prose-lg max-w-none space-y-8 text-slate-700">
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Informations légales</h2>
              <div className="space-y-2">
                <p><strong>Raison sociale :</strong> MGRCP Symbole</p>
                <p><strong>Enseigne commerciale :</strong> IPB (Institut de Pathologie du Bâtiment)</p>
                <p><strong>Siège social :</strong> 31c chemin de roquettes, 31600 Saubens, France</p>
                <p><strong>SIRET :</strong> 951 105 881 00019</p>
                <p><strong>R.C.S. :</strong> Toulouse</p>
                <p><strong>Téléphone :</strong> <a href="tel:0582953375" className="text-orange-600 hover:text-orange-700 underline">05 82 95 33 75</a></p>
                <p><strong>Email :</strong> <a href="mailto:contact@ipb-expertise.fr" className="text-orange-600 hover:text-orange-700 underline">contact@ipb-expertise.fr</a></p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Objet</h2>
              <p>
                Les présentes CGV s'appliquent à toutes les prestations proposées par MGRCP Symbole, notamment :
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Les diagnostics et expertises techniques sur site</li>
                <li>Les travaux de stabilisation de structure (agrafage, micropieux)</li>
                <li>Les traitements d'humidité (injection résine, cuvelage)</li>
                <li>Les ravalements et réparations de façades</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Diagnostic Expert sur site</h2>
              <div className="bg-orange-50 border-l-4 border-orange-600 p-6 rounded-r-lg">
                <p className="font-bold text-slate-900 mb-2">Article spécifique - Diagnostic Expert</p>
                <p>
                  La prestation d'expertise sur site est facturée <strong>149€ TTC</strong>. Cette somme est un <strong>acompte déductible</strong> : 
                  elle sera intégralement soustraite de la facture finale si le client mandate MGRCP Symbole pour réaliser les travaux préconisés.
                </p>
                <p className="mt-4">
                  Le diagnostic comprend :
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Une visite sur site d'environ 1h30</li>
                  <li>L'utilisation d'instruments de mesure professionnels (fissuromètre, hygromètre, niveau laser)</li>
                  <li>Un rapport écrit détaillé avec analyse technique et préconisations</li>
                  <li>Un devis détaillé pour les travaux éventuels</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Commande et acceptation</h2>
              <p>
                Toute commande de prestation implique l'acceptation sans réserve des présentes CGV. 
                La commande devient ferme et définitive après signature du devis par le client.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Devis et prix</h2>
              <p>
                Les devis sont établis gratuitement et restent valables 3 mois à compter de leur date d'émission. 
                Les prix sont indiqués en euros TTC (Toutes Taxes Comprises) et sont valables pour la durée de validité du devis.
              </p>
              <p className="mt-4">
                Les prix peuvent être révisés en cas de modification des conditions d'exécution des travaux ou de survenance 
                d'imprévus techniques non identifiés lors du diagnostic initial.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Garantie Décennale</h2>
              <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
                <p className="font-bold text-slate-900 mb-2">Garantie Décennale</p>
                <p>
                  Tous nos travaux structurels (agrafage, matage technique, micropieux) et traitements d'humidité (injection résine, cuvelage) 
                  sont couverts par une <strong>Garantie Décennale</strong> auprès d'une compagnie d'assurance française de référence.
                </p>
                <p className="mt-4">
                  Cette garantie couvre :
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Les défauts de réalisation</li>
                  <li>Les vices cachés affectant la solidité de l'ouvrage</li>
                  <li>Les dommages compromettant la solidité de l'ouvrage</li>
                </ul>
                <p className="mt-4">
                  Le certificat de garantie est remis au client dès la fin des travaux.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Exécution des travaux</h2>
              <p>
                Les travaux sont exécutés conformément aux règles de l'art et aux normes en vigueur. 
                Les délais d'exécution sont indiqués à titre indicatif et ne sauraient engager la responsabilité de MGRCP Symbole 
                en cas de retard dû à des circonstances indépendantes de sa volonté.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Paiement</h2>
              <p>
                Le paiement s'effectue selon les modalités suivantes :
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li><strong>Diagnostic Expert :</strong> Paiement à la commande (149€ TTC) - Acompte déductible</li>
                <li><strong>Travaux :</strong> 30% à la commande, solde à la réception des travaux</li>
              </ul>
              <p className="mt-4">
                Les paiements peuvent être effectués par chèque, virement bancaire ou espèces (dans la limite légale).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Réception des travaux</h2>
              <p>
                La réception des travaux doit être effectuée par le client dans un délai de 8 jours suivant l'achèvement des travaux. 
                À défaut de réception expresse, les travaux sont réputés acceptés.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">10. Droit de rétractation</h2>
              <p>
                Conformément à l'article L. 221-18 du Code de la consommation, le client dispose d'un délai de 14 jours 
                pour exercer son droit de rétractation à compter de la signature du contrat, sauf pour les prestations 
                d'expertise déjà réalisées.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">11. Responsabilité</h2>
              <p>
                MGRCP Symbole dispose d'une assurance Responsabilité Civile Professionnelle couvrant ses activités. 
                La responsabilité de MGRCP Symbole ne saurait être engagée en cas de dommages résultant d'un défaut 
                d'entretien ou de modifications apportées par le client ou un tiers après l'intervention.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">12. Litiges et médiation</h2>
              <p>
                En cas de litige, le client peut recourir à la médiation de la consommation. 
                À défaut d'accord amiable, le litige sera porté devant les tribunaux compétents du ressort du siège social de MGRCP Symbole.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">13. Droit applicable</h2>
              <p>
                Les présentes CGV sont régies par le droit français. Tout litige relève de la compétence des tribunaux français.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

