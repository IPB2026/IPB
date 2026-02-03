import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { Footer } from '@/components/home/Footer';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { Calendar, FileText, Shield, CreditCard, Clock, AlertTriangle, CheckCircle, Gavel, Phone, Mail, Building2, Scale, RotateCcw, Wrench } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Conditions Générales de Vente (CGV) - IPB Institut de Pathologie du Bâtiment',
  description: 'Conditions Générales de Vente complètes de l\'Institut de Pathologie du Bâtiment (IPB) - MGRCP31. Diagnostics, travaux, garanties, paiement, rétractation.',
  alternates: {
    canonical: 'https://www.ipb-expertise.fr/legal/cgv',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CGVPage() {
  return (
    <div className="font-sans text-slate-800 bg-slate-50 antialiased">
      {/* Skip link for accessibility */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-orange-600 text-white px-4 py-2 rounded-lg z-50">
        Aller au contenu principal
      </a>
      
      <TopBar />
      <Navbar />
      
      <main id="main-content" className="bg-white min-h-screen py-12 md:py-16" role="main" aria-labelledby="page-title">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav aria-label="Fil d'Ariane" className="mb-6">
            <Breadcrumbs items={[
              { label: 'Accueil', href: '/' },
              { label: 'Conditions Générales de Vente' }
            ]} />
          </nav>

          {/* En-tête */}
          <header className="mb-8 pb-6 border-b border-slate-200">
            <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
              <Calendar size={16} aria-hidden="true" />
              <time dateTime="2026-02-01">Mis à jour le 1er février 2026</time>
            </div>
            <h1 id="page-title" className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
              Conditions Générales de Vente
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              Les présentes Conditions Générales de Vente (ci-après « CGV ») constituent le socle unique 
              de la relation commerciale entre les parties. Elles régissent l'ensemble des prestations 
              de services et travaux proposés par la société MGRCP31 à ses clients.
            </p>
            <div className="mt-4 bg-orange-50 border border-orange-200 rounded-lg p-4">
              <p className="text-sm text-orange-800">
                <strong>Important :</strong> Toute commande implique l'acceptation sans réserve des présentes CGV. 
                Le client déclare avoir pris connaissance des présentes conditions préalablement à sa commande.
              </p>
            </div>
          </header>

          {/* Table des matières */}
          <nav aria-labelledby="toc-title" className="mb-10 p-6 bg-slate-50 rounded-xl border border-slate-200">
            <h2 id="toc-title" className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <FileText size={18} aria-hidden="true" />
              Sommaire des articles
            </h2>
            <ol className="grid sm:grid-cols-2 gap-2 text-sm">
              <li><a href="#article-1" className="text-orange-600 hover:text-orange-700 hover:underline focus:outline-none focus:ring-2 focus:ring-orange-500 rounded">Art. 1 - Identification du prestataire</a></li>
              <li><a href="#article-2" className="text-orange-600 hover:text-orange-700 hover:underline focus:outline-none focus:ring-2 focus:ring-orange-500 rounded">Art. 2 - Objet et champ d'application</a></li>
              <li><a href="#article-3" className="text-orange-600 hover:text-orange-700 hover:underline focus:outline-none focus:ring-2 focus:ring-orange-500 rounded">Art. 3 - Prestations de diagnostic</a></li>
              <li><a href="#article-4" className="text-orange-600 hover:text-orange-700 hover:underline focus:outline-none focus:ring-2 focus:ring-orange-500 rounded">Art. 4 - Devis et formation du contrat</a></li>
              <li><a href="#article-5" className="text-orange-600 hover:text-orange-700 hover:underline focus:outline-none focus:ring-2 focus:ring-orange-500 rounded">Art. 5 - Prix et conditions tarifaires</a></li>
              <li><a href="#article-6" className="text-orange-600 hover:text-orange-700 hover:underline focus:outline-none focus:ring-2 focus:ring-orange-500 rounded">Art. 6 - Modalités de paiement</a></li>
              <li><a href="#article-7" className="text-orange-600 hover:text-orange-700 hover:underline focus:outline-none focus:ring-2 focus:ring-orange-500 rounded">Art. 7 - Droit de rétractation</a></li>
              <li><a href="#article-8" className="text-orange-600 hover:text-orange-700 hover:underline focus:outline-none focus:ring-2 focus:ring-orange-500 rounded">Art. 8 - Exécution des travaux</a></li>
              <li><a href="#article-9" className="text-orange-600 hover:text-orange-700 hover:underline focus:outline-none focus:ring-2 focus:ring-orange-500 rounded">Art. 9 - Obligations du client</a></li>
              <li><a href="#article-10" className="text-orange-600 hover:text-orange-700 hover:underline focus:outline-none focus:ring-2 focus:ring-orange-500 rounded">Art. 10 - Réception des travaux</a></li>
              <li><a href="#article-11" className="text-orange-600 hover:text-orange-700 hover:underline focus:outline-none focus:ring-2 focus:ring-orange-500 rounded">Art. 11 - Garanties légales</a></li>
              <li><a href="#article-12" className="text-orange-600 hover:text-orange-700 hover:underline focus:outline-none focus:ring-2 focus:ring-orange-500 rounded">Art. 12 - Assurances</a></li>
              <li><a href="#article-13" className="text-orange-600 hover:text-orange-700 hover:underline focus:outline-none focus:ring-2 focus:ring-orange-500 rounded">Art. 13 - Responsabilité</a></li>
              <li><a href="#article-14" className="text-orange-600 hover:text-orange-700 hover:underline focus:outline-none focus:ring-2 focus:ring-orange-500 rounded">Art. 14 - Force majeure</a></li>
              <li><a href="#article-15" className="text-orange-600 hover:text-orange-700 hover:underline focus:outline-none focus:ring-2 focus:ring-orange-500 rounded">Art. 15 - Données personnelles</a></li>
              <li><a href="#article-16" className="text-orange-600 hover:text-orange-700 hover:underline focus:outline-none focus:ring-2 focus:ring-orange-500 rounded">Art. 16 - Litiges et médiation</a></li>
              <li><a href="#article-17" className="text-orange-600 hover:text-orange-700 hover:underline focus:outline-none focus:ring-2 focus:ring-orange-500 rounded">Art. 17 - Dispositions générales</a></li>
            </ol>
          </nav>

          {/* Contenu des articles */}
          <article className="prose prose-lg max-w-none space-y-10 text-slate-700">
            
            {/* Article 1 */}
            <section id="article-1" aria-labelledby="article-1-title">
              <h2 id="article-1-title" className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <Building2 size={24} className="text-orange-600" aria-hidden="true" />
                Article 1 - Identification du prestataire
              </h2>
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                <dl className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:gap-4">
                    <dt className="font-bold text-slate-900 sm:w-56">Dénomination sociale :</dt>
                    <dd>MGRCP31</dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:gap-4">
                    <dt className="font-bold text-slate-900 sm:w-56">Enseigne commerciale :</dt>
                    <dd>IPB - Institut de Pathologie du Bâtiment</dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:gap-4">
                    <dt className="font-bold text-slate-900 sm:w-56">Forme juridique :</dt>
                    <dd>SARL au capital de 1 000 €</dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:gap-4">
                    <dt className="font-bold text-slate-900 sm:w-56">Siège social :</dt>
                    <dd>54 avenue Jean Jaurès, 31170 Tournefeuille</dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:gap-4">
                    <dt className="font-bold text-slate-900 sm:w-56">SIRET :</dt>
                    <dd>951 105 881 00019</dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:gap-4">
                    <dt className="font-bold text-slate-900 sm:w-56">RCS :</dt>
                    <dd>Toulouse B 951 105 881</dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:gap-4">
                    <dt className="font-bold text-slate-900 sm:w-56">N° TVA intracommunautaire :</dt>
                    <dd>FR 17 951 105 881</dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:gap-4">
                    <dt className="font-bold text-slate-900 sm:w-56">Téléphone :</dt>
                    <dd><a href="tel:0582953375" className="text-orange-600 hover:underline">05 82 95 33 75</a></dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:gap-4">
                    <dt className="font-bold text-slate-900 sm:w-56">Email :</dt>
                    <dd><a href="mailto:contact@ipb-expertise.fr" className="text-orange-600 hover:underline">contact@ipb-expertise.fr</a></dd>
                  </div>
                </dl>
              </div>
            </section>

            {/* Article 2 */}
            <section id="article-2" aria-labelledby="article-2-title">
              <h2 id="article-2-title" className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <FileText size={24} className="text-orange-600" aria-hidden="true" />
                Article 2 - Objet et champ d'application
              </h2>
              <p>
                <strong>2.1.</strong> Les présentes CGV ont pour objet de définir les conditions dans lesquelles 
                la société MGRCP31 (ci-après « le Prestataire » ou « IPB ») fournit les prestations suivantes à 
                ses clients professionnels ou particuliers (ci-après « le Client ») :
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li><strong>Diagnostics et expertises techniques :</strong> analyse des pathologies du bâtiment, identification des causes, préconisations</li>
                <li><strong>Travaux de stabilisation structurelle :</strong> agrafage de maçonnerie, harpage, matage technique, reprise en sous-œuvre, micropieux</li>
                <li><strong>Traitements contre l'humidité :</strong> injection de résine hydrophobe, cuvelage de caves et sous-sols, drainage périphérique, installation de ventilation (VMI/VMC)</li>
                <li><strong>Travaux de façade :</strong> ravalement, enduit, imperméabilisation, réparation de fissures</li>
              </ul>
              <p className="mt-4">
                <strong>2.2.</strong> Les présentes CGV s'appliquent à toutes les prestations conclues par le 
                Prestataire auprès des Clients, quelles que soient les clauses pouvant figurer sur les documents 
                du Client, et notamment ses conditions générales d'achat.
              </p>
              <p className="mt-4">
                <strong>2.3.</strong> Le fait que le Prestataire ne se prévale pas à un moment donné de l'une 
                quelconque des présentes CGV ne peut être interprété comme valant renonciation à s'en prévaloir 
                ultérieurement.
              </p>
            </section>

            {/* Article 3 */}
            <section id="article-3" aria-labelledby="article-3-title">
              <h2 id="article-3-title" className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <Wrench size={24} className="text-orange-600" aria-hidden="true" />
                Article 3 - Prestations de diagnostic expert
              </h2>
              
              <div className="bg-orange-50 border-l-4 border-orange-600 p-6 rounded-r-lg mb-6">
                <p className="font-bold text-orange-900 mb-3 text-lg">ARTICLE SPÉCIFIQUE - DIAGNOSTIC EXPERT SUR SITE</p>
                <p className="text-orange-800 mb-4">
                  La prestation de diagnostic expert constitue un acte intellectuel préalable, indépendant de 
                  tout éventuel contrat de travaux. Elle fait l'objet des dispositions particulières ci-dessous.
                </p>
              </div>

              <p><strong>3.1. Nature de la prestation</strong></p>
              <p className="mt-2">
                Le diagnostic expert sur site comprend :
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Une visite technique d'une durée approximative de 1h30 à 2h00</li>
                <li>L'utilisation d'instruments de mesure professionnels (fissuromètre optique, hygromètre à pointe, 
                    niveau laser, caméra thermique le cas échéant)</li>
                <li>Un relevé photographique des désordres constatés</li>
                <li>Un rapport d'expertise écrit comportant l'analyse technique et les préconisations</li>
                <li>Un devis détaillé pour les travaux éventuellement préconisés</li>
              </ul>

              <p className="mt-4"><strong>3.2. Tarification et nature de l'acompte</strong></p>
              <div className="mt-2 bg-green-50 border border-green-200 rounded-xl p-4">
                <p className="text-green-800">
                  Le diagnostic expert est facturé <strong className="text-green-900">149€ TTC</strong>.<br />
                  Ce montant constitue un <strong className="text-green-900">acompte déductible</strong> : il sera 
                  intégralement soustrait du montant total des travaux si le Client confie au Prestataire la 
                  réalisation des travaux préconisés dans un délai de 6 mois suivant le diagnostic.
                </p>
              </div>

              <p className="mt-4"><strong>3.3. Limites de la prestation</strong></p>
              <p className="mt-2">
                Le diagnostic est réalisé sur la base des informations communiquées par le Client et des 
                constatations visuelles. Il ne comprend pas :
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Les sondages destructifs ou investigations géotechniques (études de sol)</li>
                <li>L'accès aux parties non accessibles (sous toiture fermée, vide sanitaire non praticable...)</li>
                <li>L'examen des parties non signalées par le Client</li>
              </ul>
              <p className="mt-2">
                Toute investigation complémentaire fera l'objet d'un devis distinct.
              </p>
            </section>

            {/* Article 4 */}
            <section id="article-4" aria-labelledby="article-4-title">
              <h2 id="article-4-title" className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <FileText size={24} className="text-orange-600" aria-hidden="true" />
                Article 4 - Devis et formation du contrat
              </h2>
              <p><strong>4.1. Établissement du devis</strong></p>
              <p className="mt-2">
                Les devis sont établis gratuitement, à la suite du diagnostic expert. Ils détaillent :
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>La nature et l'étendue des travaux proposés</li>
                <li>Les matériaux et techniques utilisés</li>
                <li>Le prix unitaire et le prix total HT et TTC</li>
                <li>Le taux de TVA applicable</li>
                <li>La durée prévisionnelle des travaux</li>
                <li>Les conditions de paiement</li>
              </ul>

              <p className="mt-4"><strong>4.2. Validité du devis</strong></p>
              <p className="mt-2">
                Sauf mention contraire, les devis sont valables <strong>trois (3) mois</strong> à compter de leur 
                date d'émission. Au-delà, le Prestataire se réserve le droit de réviser ses prix.
              </p>

              <p className="mt-4"><strong>4.3. Formation du contrat</strong></p>
              <p className="mt-2">
                Le contrat est formé par la signature du devis par le Client, accompagnée du versement de l'acompte 
                prévu. La signature du devis vaut acceptation sans réserve des présentes CGV.
              </p>

              <p className="mt-4"><strong>4.4. Modification du contrat</strong></p>
              <p className="mt-2">
                Toute modification du périmètre des travaux, à la demande du Client ou résultant de contraintes 
                techniques non identifiées lors du diagnostic, fera l'objet d'un avenant signé par les deux parties.
              </p>
            </section>

            {/* Article 5 */}
            <section id="article-5" aria-labelledby="article-5-title">
              <h2 id="article-5-title" className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <CreditCard size={24} className="text-orange-600" aria-hidden="true" />
                Article 5 - Prix et conditions tarifaires
              </h2>
              <p><strong>5.1. Prix</strong></p>
              <p className="mt-2">
                Les prix des prestations sont indiqués en euros, hors taxes (HT) et toutes taxes comprises (TTC). 
                Le taux de TVA applicable est celui en vigueur au jour de la facturation.
              </p>
              <p className="mt-2">
                Pour les travaux de rénovation sur des immeubles achevés depuis plus de deux ans, le taux de TVA 
                réduit de 10% s'applique conformément à l'article 279-0 bis du Code général des impôts, sous 
                réserve de la fourniture par le Client de l'attestation simplifiée prévue par les textes.
              </p>

              <p className="mt-4"><strong>5.2. Révision des prix</strong></p>
              <p className="mt-2">
                Le Prestataire se réserve le droit de réviser ses prix en cas de :
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Modification significative du coût des matériaux ou de la main d'œuvre entre le devis et l'exécution</li>
                <li>Découverte d'éléments techniques non identifiés lors du diagnostic initial (vices cachés, accès limité, nature du sol différente...)</li>
                <li>Demande de travaux supplémentaires par le Client</li>
              </ul>
              <p className="mt-2">
                Toute révision de prix sera communiquée au Client et fera l'objet d'un avenant préalable à la 
                poursuite des travaux.
              </p>
            </section>

            {/* Article 6 */}
            <section id="article-6" aria-labelledby="article-6-title">
              <h2 id="article-6-title" className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <CreditCard size={24} className="text-orange-600" aria-hidden="true" />
                Article 6 - Modalités de paiement
              </h2>
              <p><strong>6.1. Échéancier de paiement</strong></p>
              <div className="mt-2 bg-slate-50 rounded-xl p-6 border border-slate-200">
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-green-600 mt-1 flex-shrink-0" aria-hidden="true" />
                    <div>
                      <strong className="text-slate-900">Diagnostic expert :</strong>
                      <span className="text-slate-700"> 149€ TTC payables à la réservation (acompte déductible sur travaux)</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-green-600 mt-1 flex-shrink-0" aria-hidden="true" />
                    <div>
                      <strong className="text-slate-900">Travaux (montant &lt; 5 000€) :</strong>
                      <span className="text-slate-700"> 30% à la commande, solde à la réception</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-green-600 mt-1 flex-shrink-0" aria-hidden="true" />
                    <div>
                      <strong className="text-slate-900">Travaux (montant ≥ 5 000€) :</strong>
                      <span className="text-slate-700"> 30% à la commande, 40% à mi-chantier, 30% à la réception</span>
                    </div>
                  </li>
                </ul>
              </div>

              <p className="mt-4"><strong>6.2. Moyens de paiement acceptés</strong></p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Virement bancaire (IBAN communiqué sur facture)</li>
                <li>Chèque à l'ordre de MGRCP31</li>
                <li>Carte bancaire (via lien de paiement sécurisé)</li>
                <li>Espèces (dans la limite légale de 1 000€ pour les particuliers)</li>
              </ul>

              <p className="mt-4"><strong>6.3. Retard de paiement</strong></p>
              <p className="mt-2">
                Conformément aux articles L. 441-10 et D. 441-5 du Code de commerce, tout retard de paiement 
                entraînera de plein droit :
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>L'application de pénalités de retard au taux de trois fois le taux d'intérêt légal</li>
                <li>Une indemnité forfaitaire pour frais de recouvrement de 40€</li>
                <li>La suspension des prestations en cours et des commandes à venir</li>
              </ul>
            </section>

            {/* Article 7 */}
            <section id="article-7" aria-labelledby="article-7-title">
              <h2 id="article-7-title" className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <RotateCcw size={24} className="text-orange-600" aria-hidden="true" />
                Article 7 - Droit de rétractation
              </h2>
              
              <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg mb-6">
                <p className="font-bold text-blue-900 mb-2">INFORMATION PRÉCONTRACTUELLE IMPORTANTE</p>
                <p className="text-blue-800">
                  Conformément aux articles L. 221-18 et suivants du Code de la consommation, le Client 
                  consommateur dispose d'un droit de rétractation.
                </p>
              </div>

              <p><strong>7.1. Délai de rétractation</strong></p>
              <p className="mt-2">
                Le Client dispose d'un délai de <strong>quatorze (14) jours</strong> pour exercer son droit de 
                rétractation à compter :
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Pour les contrats de prestation de services : du jour de la conclusion du contrat</li>
                <li>Pour les contrats conclus hors établissement : du jour de la conclusion du contrat</li>
              </ul>

              <p className="mt-4"><strong>7.2. Exercice du droit de rétractation</strong></p>
              <p className="mt-2">
                Pour exercer son droit de rétractation, le Client doit notifier sa décision au moyen d'une 
                déclaration dénuée d'ambiguïté (par courrier, email ou via le formulaire type de rétractation 
                annexé) à l'adresse suivante :
              </p>
              <p className="mt-2 bg-slate-100 p-3 rounded-lg">
                MGRCP31 - IPB<br />
                54 avenue Jean Jaurès, 31170 Tournefeuille<br />
                Email : <a href="mailto:contact@ipb-expertise.fr" className="text-orange-600">contact@ipb-expertise.fr</a>
              </p>

              <p className="mt-4"><strong>7.3. Exceptions au droit de rétractation</strong></p>
              <p className="mt-2">
                Conformément à l'article L. 221-28 du Code de la consommation, le droit de rétractation 
                <strong> ne peut être exercé</strong> pour :
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Les prestations de diagnostic dont l'exécution a commencé avec l'accord exprès du Client 
                    et pour lesquelles il a renoncé expressément à son droit de rétractation</li>
                <li>Les travaux pleinement exécutés avant la fin du délai de rétractation</li>
                <li>Les travaux ayant commencé à la demande expresse du Client avant la fin du délai de rétractation</li>
              </ul>

              <p className="mt-4"><strong>7.4. Remboursement</strong></p>
              <p className="mt-2">
                En cas de rétractation, le Prestataire remboursera le Client de la totalité des sommes versées 
                dans un délai de quatorze (14) jours à compter de la réception de la demande de rétractation, 
                déduction faite de la valeur des prestations déjà exécutées.
              </p>
            </section>

            {/* Article 8 */}
            <section id="article-8" aria-labelledby="article-8-title">
              <h2 id="article-8-title" className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <Wrench size={24} className="text-orange-600" aria-hidden="true" />
                Article 8 - Exécution des travaux
              </h2>
              <p><strong>8.1. Délais d'intervention</strong></p>
              <p className="mt-2">
                Les délais d'intervention sont indiqués à titre indicatif. Ils courent à compter de la réception 
                de l'acompte et sous réserve de l'obtention des autorisations administratives éventuellement requises.
              </p>
              <p className="mt-2">
                Le Prestataire s'engage à informer le Client de tout retard prévisible et de ses causes.
              </p>

              <p className="mt-4"><strong>8.2. Accès au chantier</strong></p>
              <p className="mt-2">
                Le Client s'engage à permettre l'accès au chantier aux dates et heures convenues et à assurer 
                les conditions nécessaires à l'exécution des travaux (accès électricité, eau, évacuation des 
                meubles et objets...).
              </p>

              <p className="mt-4"><strong>8.3. Travaux supplémentaires</strong></p>
              <p className="mt-2">
                Tout travail supplémentaire non prévu au devis initial ne sera exécuté qu'après accord écrit 
                du Client sur le coût supplémentaire correspondant.
              </p>

              <p className="mt-4"><strong>8.4. Règles de l'art</strong></p>
              <p className="mt-2">
                Les travaux sont exécutés conformément aux règles de l'art, aux Documents Techniques Unifiés (DTU) 
                applicables et aux normes en vigueur au moment de leur réalisation.
              </p>
            </section>

            {/* Article 9 */}
            <section id="article-9" aria-labelledby="article-9-title">
              <h2 id="article-9-title" className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <CheckCircle size={24} className="text-orange-600" aria-hidden="true" />
                Article 9 - Obligations du Client
              </h2>
              <p>Le Client s'engage à :</p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Fournir au Prestataire toutes les informations utiles concernant le bâtiment (plans, diagnostics existants, historique des désordres...)</li>
                <li>Signaler tout élément de nature à affecter l'exécution des travaux (réseaux enterrés, présence d'amiante, servitudes...)</li>
                <li>Déclarer les travaux auprès des services d'urbanisme si requis (déclaration préalable pour modification de façade)</li>
                <li>Informer son assureur habitation de la réalisation des travaux</li>
                <li>Assurer les conditions d'accès et de sécurité sur le chantier</li>
                <li>Prévenir le Prestataire de toute modification de ses coordonnées</li>
              </ul>
            </section>

            {/* Article 10 */}
            <section id="article-10" aria-labelledby="article-10-title">
              <h2 id="article-10-title" className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <CheckCircle size={24} className="text-orange-600" aria-hidden="true" />
                Article 10 - Réception des travaux
              </h2>
              <p><strong>10.1. Procès-verbal de réception</strong></p>
              <p className="mt-2">
                À l'achèvement des travaux, le Prestataire invite le Client à procéder à la réception des travaux. 
                Un procès-verbal de réception est établi contradictoirement, mentionnant :
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>La date de réception</li>
                <li>Les éventuelles réserves formulées par le Client</li>
                <li>Le délai de levée des réserves le cas échéant</li>
              </ul>

              <p className="mt-4"><strong>10.2. Réception tacite</strong></p>
              <p className="mt-2">
                À défaut de réception expresse dans un délai de <strong>huit (8) jours</strong> suivant 
                l'achèvement des travaux et la notification de fin de chantier, les travaux sont réputés 
                réceptionnés sans réserve.
              </p>

              <p className="mt-4"><strong>10.3. Effets de la réception</strong></p>
              <p className="mt-2">
                La réception, avec ou sans réserves, transfère la garde de l'ouvrage au Client et constitue 
                le point de départ des garanties légales (garantie de parfait achèvement, garantie biennale, 
                garantie décennale).
              </p>
            </section>

            {/* Article 11 */}
            <section id="article-11" aria-labelledby="article-11-title">
              <h2 id="article-11-title" className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <Shield size={24} className="text-orange-600" aria-hidden="true" />
                Article 11 - Garanties légales
              </h2>
              
              <div className="space-y-6">
                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                  <h3 className="font-bold text-green-900 mb-3 flex items-center gap-2">
                    <Shield size={20} aria-hidden="true" />
                    11.1. Garantie de parfait achèvement (Art. 1792-6 C. civ.)
                  </h3>
                  <p className="text-green-800">
                    <strong>Durée : 1 an</strong> à compter de la réception.<br />
                    Le Prestataire s'engage à réparer tous les désordres signalés par le Client, quelle que 
                    soit leur importance ou leur nature, sous réserve qu'ils soient notifiés dans l'année 
                    suivant la réception.
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                  <h3 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                    <Shield size={20} aria-hidden="true" />
                    11.2. Garantie de bon fonctionnement (Art. 1792-3 C. civ.)
                  </h3>
                  <p className="text-blue-800">
                    <strong>Durée : 2 ans</strong> à compter de la réception.<br />
                    Cette garantie couvre les éléments d'équipement dissociables de l'ouvrage 
                    (ex : VMI, systèmes de ventilation).
                  </p>
                </div>

                <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
                  <h3 className="font-bold text-orange-900 mb-3 flex items-center gap-2">
                    <Shield size={20} aria-hidden="true" />
                    11.3. Garantie décennale (Art. 1792 et 1792-2 C. civ.)
                  </h3>
                  <p className="text-orange-800">
                    <strong>Durée : 10 ans</strong> à compter de la réception.<br />
                    Le Prestataire est responsable de plein droit des dommages, même résultant d'un vice du sol, 
                    qui compromettent la solidité de l'ouvrage ou qui, l'affectant dans l'un de ses éléments 
                    constitutifs ou d'équipement, le rendent impropre à sa destination.
                  </p>
                  <p className="text-orange-800 mt-3">
                    <strong>Travaux couverts :</strong> agrafage, harpage, matage technique, injection résine 
                    hydrophobe, cuvelage, reprise en sous-œuvre.
                  </p>
                </div>
              </div>
            </section>

            {/* Article 12 */}
            <section id="article-12" aria-labelledby="article-12-title">
              <h2 id="article-12-title" className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <Shield size={24} className="text-orange-600" aria-hidden="true" />
                Article 12 - Assurances
              </h2>
              <p>
                <strong>12.1.</strong> Le Prestataire déclare être titulaire d'une assurance responsabilité 
                civile décennale conforme aux dispositions de l'article L. 241-1 du Code des assurances.
              </p>
              <p className="mt-4">
                <strong>12.2.</strong> Le Prestataire déclare également être titulaire d'une assurance 
                responsabilité civile professionnelle couvrant les dommages corporels, matériels et 
                immatériels causés aux tiers.
              </p>
              <p className="mt-4">
                <strong>12.3.</strong> Sur demande du Client, une attestation d'assurance sera fournie 
                préalablement au commencement des travaux, conformément à l'article L. 243-2 du Code des assurances.
              </p>
              <p className="mt-4">
                <strong>12.4.</strong> Le Client est informé de l'intérêt de souscrire une assurance dommages-ouvrage 
                (articles L. 242-1 et suivants du Code des assurances) pour les travaux de gros œuvre.
              </p>
            </section>

            {/* Article 13 */}
            <section id="article-13" aria-labelledby="article-13-title">
              <h2 id="article-13-title" className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <AlertTriangle size={24} className="text-orange-600" aria-hidden="true" />
                Article 13 - Responsabilité
              </h2>
              <p>
                <strong>13.1.</strong> La responsabilité du Prestataire est limitée aux dommages directs et 
                prévisibles résultant d'un manquement à ses obligations contractuelles.
              </p>
              <p className="mt-4">
                <strong>13.2.</strong> Le Prestataire ne saurait être tenu responsable des dommages résultant :
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>D'informations erronées ou incomplètes communiquées par le Client</li>
                <li>De l'utilisation anormale des ouvrages ou d'un défaut d'entretien</li>
                <li>De modifications ou interventions effectuées par le Client ou un tiers après la réception</li>
                <li>De la non-conformité des ouvrages à une réglementation entrée en vigueur postérieurement à la réception</li>
                <li>De phénomènes naturels exceptionnels (séismes, inondations centenaires...)</li>
              </ul>
              <p className="mt-4">
                <strong>13.3.</strong> En tout état de cause, la responsabilité du Prestataire est limitée au 
                montant du contrat, sauf en cas de faute lourde ou intentionnelle.
              </p>
            </section>

            {/* Article 14 */}
            <section id="article-14" aria-labelledby="article-14-title">
              <h2 id="article-14-title" className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <AlertTriangle size={24} className="text-orange-600" aria-hidden="true" />
                Article 14 - Force majeure
              </h2>
              <p>
                Aucune des parties ne pourra être tenue responsable de l'inexécution ou du retard dans 
                l'exécution de ses obligations contractuelles si cette inexécution ou ce retard résulte 
                d'un cas de force majeure au sens de l'article 1218 du Code civil.
              </p>
              <p className="mt-4">
                Sont notamment considérés comme cas de force majeure : les catastrophes naturelles, les 
                épidémies, les guerres, les grèves générales, les décisions gouvernementales ou administratives 
                empêchant l'exécution du contrat.
              </p>
              <p className="mt-4">
                En cas de force majeure, les obligations des parties sont suspendues. Si l'événement de force 
                majeure perdure plus de trois mois, chaque partie pourra résilier le contrat sans indemnité.
              </p>
            </section>

            {/* Article 15 */}
            <section id="article-15" aria-labelledby="article-15-title">
              <h2 id="article-15-title" className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <Shield size={24} className="text-orange-600" aria-hidden="true" />
                Article 15 - Protection des données personnelles
              </h2>
              <p>
                Les données personnelles collectées dans le cadre de la relation contractuelle font l'objet 
                d'un traitement conforme au Règlement Général sur la Protection des Données (RGPD) et à la 
                loi Informatique et Libertés.
              </p>
              <p className="mt-4">
                Pour plus d'informations sur le traitement de vos données personnelles et l'exercice de vos 
                droits, consultez notre <Link href="/legal/confidentialite" className="text-orange-600 hover:underline font-bold">
                Politique de confidentialité</Link>.
              </p>
            </section>

            {/* Article 16 */}
            <section id="article-16" aria-labelledby="article-16-title">
              <h2 id="article-16-title" className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <Gavel size={24} className="text-orange-600" aria-hidden="true" />
                Article 16 - Règlement des litiges et médiation
              </h2>
              <p>
                <strong>16.1. Droit applicable</strong><br />
                Les présentes CGV sont soumises au droit français.
              </p>
              <p className="mt-4">
                <strong>16.2. Règlement amiable</strong><br />
                En cas de litige, les parties s'engagent à rechercher une solution amiable avant toute 
                action judiciaire. Le Client peut adresser ses réclamations à :<br />
                <span className="text-sm">MGRCP31 - IPB, 54 avenue Jean Jaurès, 31170 Tournefeuille<br />
                Email : <a href="mailto:contact@ipb-expertise.fr" className="text-orange-600">contact@ipb-expertise.fr</a></span>
              </p>
              
              <div className="mt-6 bg-slate-50 rounded-xl p-6 border border-slate-200">
                <p className="font-bold text-slate-900 mb-3">16.3. Médiation de la consommation</p>
                <p className="text-slate-700 mb-3">
                  Conformément aux articles L. 612-1 et suivants du Code de la consommation, le Client 
                  consommateur peut recourir gratuitement au médiateur de la consommation suivant :
                </p>
                <p className="font-bold text-slate-900">
                  CNPM - MÉDIATION DE LA CONSOMMATION<br />
                  <span className="font-normal text-slate-700">
                    27 avenue de la Libération, 42400 Saint-Chamond<br />
                    <a href="https://www.cnpm-mediation-consommation.eu" target="_blank" rel="noopener noreferrer" 
                       className="text-orange-600 hover:underline">www.cnpm-mediation-consommation.eu</a>
                  </span>
                </p>
              </div>

              <p className="mt-4">
                <strong>16.4. Compétence juridictionnelle</strong><br />
                À défaut de règlement amiable, tout litige sera porté devant les juridictions compétentes 
                du ressort de la Cour d'appel de Toulouse.
              </p>
            </section>

            {/* Article 17 */}
            <section id="article-17" aria-labelledby="article-17-title">
              <h2 id="article-17-title" className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <FileText size={24} className="text-orange-600" aria-hidden="true" />
                Article 17 - Dispositions générales
              </h2>
              <p>
                <strong>17.1. Intégralité</strong><br />
                Les présentes CGV expriment l'intégralité des obligations des parties. Aucune condition 
                générale ou spécifique figurant dans les documents envoyés ou remis par le Client ne pourra 
                s'intégrer aux présentes CGV.
              </p>
              <p className="mt-4">
                <strong>17.2. Nullité partielle</strong><br />
                Si l'une quelconque des clauses des présentes CGV était déclarée nulle ou inapplicable, 
                les autres clauses conserveraient leur pleine force et portée.
              </p>
              <p className="mt-4">
                <strong>17.3. Modification</strong><br />
                Le Prestataire se réserve le droit de modifier les présentes CGV à tout moment. Les CGV 
                applicables sont celles en vigueur à la date de la commande.
              </p>
              <p className="mt-4">
                <strong>17.4. Preuve</strong><br />
                Les registres informatisés, conservés dans les systèmes informatiques du Prestataire dans 
                des conditions raisonnables de sécurité, seront considérés comme les preuves des communications, 
                des commandes et des paiements intervenus entre les parties.
              </p>
            </section>

          </article>

          {/* Annexe - Formulaire de rétractation */}
          <div className="mt-12 p-6 bg-slate-100 rounded-xl border border-slate-300">
            <h2 className="text-xl font-bold text-slate-900 mb-4">ANNEXE - Formulaire type de rétractation</h2>
            <p className="text-sm text-slate-600 mb-4">
              (À compléter et renvoyer uniquement si vous souhaitez vous rétracter du contrat)
            </p>
            <div className="bg-white p-4 rounded-lg border border-slate-200 text-sm">
              <p className="mb-3">À l'attention de :<br />
              <strong>MGRCP31 - IPB</strong><br />
              54 avenue Jean Jaurès, 31170 Tournefeuille<br />
              Email : contact@ipb-expertise.fr</p>
              
              <p className="mb-3">Je/Nous (*) vous notifie/notifions (*) par la présente ma/notre (*) rétractation du contrat 
              portant sur la prestation de services ci-dessous :</p>
              
              <p className="mb-3">
                - Description de la prestation : ________________________________<br />
                - Commandée le (*) / reçue le (*) : ________________________________<br />
                - Nom du (des) consommateur(s) : ________________________________<br />
                - Adresse du (des) consommateur(s) : ________________________________
              </p>
              
              <p className="mb-3">Date : ________________________________</p>
              
              <p>Signature du (des) consommateur(s) (uniquement en cas de notification sur papier) :</p>
              
              <p className="mt-4 text-xs text-slate-500">(*) Rayez la mention inutile</p>
            </div>
          </div>

          {/* Date de dernière mise à jour */}
          <footer className="mt-12 pt-8 border-t border-slate-200">
            <p className="text-sm text-slate-500 text-center">
              Dernière mise à jour des présentes CGV : <time dateTime="2026-02-01">1er février 2026</time>
            </p>
          </footer>
        </div>
      </main>

      <Footer />
    </div>
  );
}
