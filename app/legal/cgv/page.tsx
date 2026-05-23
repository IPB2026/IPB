import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { SmartBackBar } from "@/components/ui/SmartBackBar";
import { Footer } from '@/components/home/Footer';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { Calendar, FileText, Shield, CreditCard, AlertTriangle, CheckCircle, Gavel, Building2, RotateCcw, Wrench } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Conditions Générales de Vente · IPB',
  description: "Conditions générales de vente de l'Institut de Pathologie du Bâtiment (IPB). Diagnostic, devis, paiement, rétractation, garanties, médiation.",
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
    <div className="font-sans text-ipb-text bg-ipb-cream antialiased">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-ipb-orange text-white px-4 py-2 rounded-lg z-50">
        Aller au contenu principal
      </a>

      <TopBar />
      <Navbar />
      <SmartBackBar />

      <main id="main-content" className="bg-white min-h-screen py-12 md:py-16" role="main" aria-labelledby="page-title">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Fil d'Ariane" className="mb-6">
            <Breadcrumbs items={[
              { label: 'Accueil', href: '/' },
              { label: 'Conditions Générales de Vente' }
            ]} />
          </nav>

          <header className="mb-8 pb-6 border-b border-ipb-rule">
            <div className="flex items-center gap-2 text-sm text-ipb-muted mb-4">
              <Calendar size={16} aria-hidden="true" />
              <time dateTime="2026-05-24">Mis à jour le 24 mai 2026</time>
            </div>
            <h1 id="page-title" className="text-3xl md:text-4xl font-extrabold text-ipb-text mb-4">
              Conditions Générales de Vente
            </h1>
            <p className="text-lg text-ipb-muted leading-relaxed">
              Les présentes Conditions Générales de Vente (« CGV ») régissent la prestation de
              <strong> diagnostic en pathologie du bâtiment</strong> proposée par IPB · Institut de Pathologie
              du Bâtiment (« IPB ») à ses clients.
            </p>
            <div className="mt-4 bg-ipb-stone border border-ipb-rule rounded-lg p-4">
              <p className="text-sm text-orange-800">
                <strong>Important :</strong> Toute commande implique l'acceptation sans réserve des
                présentes CGV. Le Client déclare avoir pris connaissance des présentes conditions
                préalablement à sa commande.
              </p>
            </div>
          </header>

          <nav aria-labelledby="toc-title" className="mb-10 p-6 bg-ipb-cream rounded-xl border border-ipb-rule">
            <h2 id="toc-title" className="font-bold text-ipb-text mb-4 flex items-center gap-2">
              <FileText size={18} aria-hidden="true" />
              Sommaire des articles
            </h2>
            <ol className="grid sm:grid-cols-2 gap-2 text-sm">
              <li><a href="#article-1" className="text-ipb-orange hover:underline">Art. 1 - Identification du prestataire</a></li>
              <li><a href="#article-2" className="text-ipb-orange hover:underline">Art. 2 - Objet et champ d'application</a></li>
              <li><a href="#article-3" className="text-ipb-orange hover:underline">Art. 3 - Prestation de diagnostic</a></li>
              <li><a href="#article-4" className="text-ipb-orange hover:underline">Art. 4 - Devis et formation du contrat</a></li>
              <li><a href="#article-5" className="text-ipb-orange hover:underline">Art. 5 - Prix et conditions tarifaires</a></li>
              <li><a href="#article-6" className="text-ipb-orange hover:underline">Art. 6 - Modalités de paiement</a></li>
              <li><a href="#article-7" className="text-ipb-orange hover:underline">Art. 7 - Droit de rétractation</a></li>
              <li><a href="#article-8" className="text-ipb-orange hover:underline">Art. 8 - Exécution du diagnostic</a></li>
              <li><a href="#article-9" className="text-ipb-orange hover:underline">Art. 9 - Obligations du Client</a></li>
              <li><a href="#article-10" className="text-ipb-orange hover:underline">Art. 10 - Service après-vente</a></li>
              <li><a href="#article-11" className="text-ipb-orange hover:underline">Art. 11 - Travaux ultérieurs</a></li>
              <li><a href="#article-12" className="text-ipb-orange hover:underline">Art. 12 - Assurances</a></li>
              <li><a href="#article-13" className="text-ipb-orange hover:underline">Art. 13 - Responsabilité</a></li>
              <li><a href="#article-14" className="text-ipb-orange hover:underline">Art. 14 - Force majeure</a></li>
              <li><a href="#article-15" className="text-ipb-orange hover:underline">Art. 15 - Données personnelles</a></li>
              <li><a href="#article-16" className="text-ipb-orange hover:underline">Art. 16 - Litiges et médiation</a></li>
              <li><a href="#article-17" className="text-ipb-orange hover:underline">Art. 17 - Dispositions générales</a></li>
            </ol>
          </nav>

          <article className="prose prose-lg max-w-none space-y-10 text-ipb-text">

            <section id="article-1" aria-labelledby="article-1-title">
              <h2 id="article-1-title" className="text-2xl font-bold text-ipb-text mb-4 flex items-center gap-3">
                <Building2 size={24} className="text-ipb-orange" aria-hidden="true" />
                Article 1 - Identification du prestataire
              </h2>
              <div className="bg-ipb-cream rounded-xl p-6 border border-ipb-rule">
                <dl className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:gap-4">
                    <dt className="font-bold text-ipb-text sm:w-56">Dénomination :</dt>
                    <dd>IPB · Institut de Pathologie du Bâtiment</dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:gap-4">
                    <dt className="font-bold text-ipb-text sm:w-56">Forme juridique :</dt>
                    <dd>Entrepreneur individuel (micro-entreprise)</dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:gap-4">
                    <dt className="font-bold text-ipb-text sm:w-56">Siège :</dt>
                    <dd>54 avenue Jean Jaurès, 31170 Tournefeuille</dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:gap-4">
                    <dt className="font-bold text-ipb-text sm:w-56">SIRET :</dt>
                    <dd>908 995 103 00029</dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:gap-4">
                    <dt className="font-bold text-ipb-text sm:w-56">Code APE/NAF :</dt>
                    <dd>70.22Z — Conseil pour les affaires et autres conseils de gestion</dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:gap-4">
                    <dt className="font-bold text-ipb-text sm:w-56">N° TVA intracommunautaire :</dt>
                    <dd>FR71908995103</dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:gap-4">
                    <dt className="font-bold text-ipb-text sm:w-56">Régime TVA :</dt>
                    <dd>Franchise en base — TVA non applicable, article 293 B du CGI</dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:gap-4">
                    <dt className="font-bold text-ipb-text sm:w-56">Téléphone :</dt>
                    <dd><a href="tel:0582953375" className="text-ipb-orange hover:underline">05 82 95 33 75</a></dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:gap-4">
                    <dt className="font-bold text-ipb-text sm:w-56">Email :</dt>
                    <dd><a href="mailto:contact@ipb-expertise.fr" className="text-ipb-orange hover:underline">contact@ipb-expertise.fr</a></dd>
                  </div>
                </dl>
              </div>
            </section>

            <section id="article-2" aria-labelledby="article-2-title">
              <h2 id="article-2-title" className="text-2xl font-bold text-ipb-text mb-4 flex items-center gap-3">
                <FileText size={24} className="text-ipb-orange" aria-hidden="true" />
                Article 2 - Objet et champ d'application
              </h2>
              <p>
                <strong>2.1.</strong> Les présentes CGV ont pour objet de définir les conditions dans lesquelles
                IPB (ci-après « le Prestataire ») fournit à ses clients particuliers ou professionnels (ci-après
                « le Client ») la prestation de <strong>diagnostic en pathologie du bâtiment</strong> et les
                prestations associées de coordination, de production du dossier de synthèse et de service après-vente.
              </p>
              <p className="mt-4">
                <strong>2.2.</strong> Les travaux de réparation, de reprise ou de renforcement qui pourraient
                être préconisés à l'issue du diagnostic sont réalisés par un partenaire d'exécution titulaire
                d'une garantie décennale dédiée. Les conditions d'exécution des travaux et leur tarification
                font l'objet d'un devis et de conditions spécifiques remis au Client par cette entreprise
                (cf. article 11).
              </p>
              <p className="mt-4">
                <strong>2.3.</strong> Les présentes CGV s'appliquent à toute commande, quelles que soient
                les clauses pouvant figurer sur les documents du Client.
              </p>
              <p className="mt-4">
                <strong>2.4.</strong> Le fait pour le Prestataire de ne pas se prévaloir à un moment donné
                de l'une quelconque des présentes CGV ne peut être interprété comme valant renonciation
                à s'en prévaloir ultérieurement.
              </p>
            </section>

            <section id="article-3" aria-labelledby="article-3-title">
              <h2 id="article-3-title" className="text-2xl font-bold text-ipb-text mb-4 flex items-center gap-3">
                <Wrench size={24} className="text-ipb-orange" aria-hidden="true" />
                Article 3 - Prestation de diagnostic
              </h2>

              <p><strong>3.1. Contenu de la prestation</strong></p>
              <p className="mt-2">
                La prestation de diagnostic comprend :
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>une qualification téléphonique préalable du besoin du Client ;</li>
                <li>une visite technique sur site ;</li>
                <li>l'utilisation d'instruments de mesure professionnels (fissuromètre, niveau laser, hygromètre, etc.) ;</li>
                <li>un reportage photographique daté des désordres constatés ;</li>
                <li>un rapport technique présentant les constats, l'analyse des désordres, le diagnostic structurel et les préconisations chiffrées ;</li>
                <li>un dossier de synthèse remis au Client par IPB, intégrant le rapport technique et un plan d'action.</li>
              </ul>

              <p className="mt-4"><strong>3.2. Limites de la prestation</strong></p>
              <p className="mt-2">
                Le diagnostic est réalisé sur la base des informations communiquées par le Client et des
                constatations visuelles et instrumentées effectuées sur place. Il ne comprend pas :
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>les sondages destructifs ou investigations géotechniques (études de sol) ;</li>
                <li>l'accès aux parties non accessibles (sous toiture fermée, vide sanitaire non praticable, etc.) ;</li>
                <li>l'examen des parties non signalées par le Client ;</li>
                <li>les notes de calcul opposables (dimensionnement Eurocodes), qui relèvent d'un bureau
                    d'études structure indépendant intervenant sous sa propre RC Pro et décennale études dédiées.</li>
              </ul>
              <p className="mt-2">
                Toute investigation complémentaire fera l'objet d'un devis distinct.
              </p>
            </section>

            <section id="article-4" aria-labelledby="article-4-title">
              <h2 id="article-4-title" className="text-2xl font-bold text-ipb-text mb-4 flex items-center gap-3">
                <FileText size={24} className="text-ipb-orange" aria-hidden="true" />
                Article 4 - Devis et formation du contrat
              </h2>
              <p><strong>4.1. Établissement du devis</strong></p>
              <p className="mt-2">
                À l'issue de la qualification du besoin, IPB remet au Client un devis détaillant la
                nature et l'étendue de la prestation, son prix, ses délais d'exécution prévisionnels
                et ses conditions de paiement et de rétractation.
              </p>

              <p className="mt-4"><strong>4.2. Validité du devis</strong></p>
              <p className="mt-2">
                Sauf mention contraire, les devis sont valables <strong>trois (3) mois</strong> à compter
                de leur date d'émission. Au-delà, IPB se réserve le droit de réviser son prix.
              </p>

              <p className="mt-4"><strong>4.3. Formation du contrat</strong></p>
              <p className="mt-2">
                Le contrat est formé par la signature du devis par le Client. La signature du devis
                vaut acceptation sans réserve des présentes CGV.
              </p>

              <p className="mt-4"><strong>4.4. Modification du contrat</strong></p>
              <p className="mt-2">
                Toute modification du périmètre de la prestation, à la demande du Client ou résultant
                de contraintes techniques non identifiées lors de la qualification initiale, fera
                l'objet d'un avenant signé par les deux parties.
              </p>
            </section>

            <section id="article-5" aria-labelledby="article-5-title">
              <h2 id="article-5-title" className="text-2xl font-bold text-ipb-text mb-4 flex items-center gap-3">
                <CreditCard size={24} className="text-ipb-orange" aria-hidden="true" />
                Article 5 - Prix et conditions tarifaires
              </h2>
              <p><strong>5.1. Prix</strong></p>
              <p className="mt-2">
                Le prix de la prestation est celui figurant au devis remis et signé par le Client.
                Le prix est indiqué en euros, hors taxes (HT) et toutes taxes comprises (TTC).
              </p>

              <p className="mt-4"><strong>5.2. Régime de TVA</strong></p>
              <p className="mt-2">
                IPB exerce sous le régime fiscal de la franchise en base de TVA. À ce titre, la
                mention suivante figure sur l'ensemble des factures émises : <em>« TVA non applicable,
                article 293 B du Code général des impôts »</em>. Aucune TVA n'est facturée et aucune
                TVA n'est déductible par le Client professionnel.
              </p>

              <p className="mt-4"><strong>5.3. Révision du prix</strong></p>
              <p className="mt-2">
                Le prix pourra faire l'objet d'une révision en cas de demande de visite supplémentaire,
                contre-visite, visite longue (durée supérieure à 2 heures), investigations complémentaires
                non incluses dans la prestation standard, ou déplacement hors zone d'intervention.
                Toute révision est communiquée au Client préalablement et fait l'objet d'un devis
                distinct ou d'un avenant signé.
              </p>
            </section>

            <section id="article-6" aria-labelledby="article-6-title">
              <h2 id="article-6-title" className="text-2xl font-bold text-ipb-text mb-4 flex items-center gap-3">
                <CreditCard size={24} className="text-ipb-orange" aria-hidden="true" />
                Article 6 - Modalités de paiement
              </h2>
              <p><strong>6.1. Échéance</strong></p>
              <p className="mt-2">
                Sauf mention contraire au devis, le prix de la prestation est payable intégralement
                à la commande, à la signature du devis.
              </p>

              <p className="mt-4"><strong>6.2. Moyens de paiement acceptés</strong></p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Virement bancaire (IBAN communiqué sur facture)</li>
                <li>Carte bancaire (via lien de paiement sécurisé)</li>
                <li>Espèces (dans la limite prévue par l'article L. 112-6 du Code monétaire et financier)</li>
              </ul>

              <p className="mt-4"><strong>6.3. Retard de paiement</strong></p>
              <p className="mt-2">
                Conformément aux articles L. 441-10 et D. 441-5 du Code de commerce, tout retard de
                paiement entraînera de plein droit :
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>L'application de pénalités de retard au taux d'intérêt légal majoré de dix (10) points ;</li>
                <li>Une indemnité forfaitaire pour frais de recouvrement de 40 € par facture ;</li>
                <li>La suspension de la prestation jusqu'à régularisation.</li>
              </ul>
            </section>

            <section id="article-7" aria-labelledby="article-7-title">
              <h2 id="article-7-title" className="text-2xl font-bold text-ipb-text mb-4 flex items-center gap-3">
                <RotateCcw size={24} className="text-ipb-orange" aria-hidden="true" />
                Article 7 - Droit de rétractation
              </h2>

              <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg mb-6">
                <p className="font-bold text-blue-900 mb-2">INFORMATION PRÉCONTRACTUELLE IMPORTANTE</p>
                <p className="text-blue-800">
                  Conformément aux articles L. 221-18 et suivants du Code de la consommation, le Client
                  consommateur ayant conclu son contrat à distance ou hors établissement dispose d'un
                  droit de rétractation.
                </p>
              </div>

              <p><strong>7.1. Délai de rétractation</strong></p>
              <p className="mt-2">
                Le Client dispose d'un délai de <strong>quatorze (14) jours</strong> calendaires à
                compter de la conclusion du contrat pour exercer son droit de rétractation, sans avoir
                à motiver sa décision ni à supporter d'autres coûts que ceux prévus aux articles
                L. 221-23 à L. 221-25 du Code de la consommation.
              </p>

              <p className="mt-4"><strong>7.2. Exercice du droit de rétractation</strong></p>
              <p className="mt-2">
                Pour exercer son droit, le Client doit notifier sa décision au moyen d'une déclaration
                dénuée d'ambiguïté (courrier, email ou formulaire-type annexé) à :
              </p>
              <p className="mt-2 bg-ipb-stone p-3 rounded-lg">
                IPB · Institut de Pathologie du Bâtiment<br />
                54 avenue Jean Jaurès, 31170 Tournefeuille<br />
                Email : <a href="mailto:contact@ipb-expertise.fr" className="text-ipb-orange">contact@ipb-expertise.fr</a>
              </p>

              <p className="mt-4"><strong>7.3. Exceptions au droit de rétractation</strong></p>
              <p className="mt-2">
                Conformément à l'article L. 221-28 du Code de la consommation, le droit de rétractation
                <strong> ne peut être exercé</strong> pour la prestation dont l'exécution aura commencé
                avec l'accord exprès du Client (visite technique sur site réalisée) et pour laquelle le
                Client aura expressément renoncé à son droit de rétractation.
              </p>

              <p className="mt-4"><strong>7.4. Remboursement</strong></p>
              <p className="mt-2">
                En cas de rétractation valide, IPB remboursera le Client de la totalité des sommes
                versées dans un délai de quatorze (14) jours à compter de la réception de la demande,
                déduction faite, le cas échéant, de la valeur des prestations partiellement exécutées
                avec son accord exprès.
              </p>
            </section>

            <section id="article-8" aria-labelledby="article-8-title">
              <h2 id="article-8-title" className="text-2xl font-bold text-ipb-text mb-4 flex items-center gap-3">
                <Wrench size={24} className="text-ipb-orange" aria-hidden="true" />
                Article 8 - Exécution du diagnostic
              </h2>
              <p><strong>8.1. Délais</strong></p>
              <p className="mt-2">
                Les délais d'exécution sont communiqués au devis et confirmés à la commande. Ils
                courent à compter de la signature du devis. IPB s'engage à informer le Client sans
                délai de tout retard prévisible et de ses causes.
              </p>

              <p className="mt-4"><strong>8.2. Accès au site</strong></p>
              <p className="mt-2">
                Le Client s'engage à permettre l'accès au site aux dates et heures convenues. Toute
                visite empêchée par le fait du Client (absence, refus d'accès, etc.) sera facturée
                intégralement et ne pourra être réalisée qu'après prise d'un nouveau rendez-vous.
              </p>

              <p className="mt-4"><strong>8.3. Remise du dossier de synthèse</strong></p>
              <p className="mt-2">
                Le dossier de synthèse est remis au Client par IPB par email à l'adresse communiquée
                à la commande. Le Client dispose d'un délai de quinze (15) jours pour formuler ses
                éventuelles observations. À défaut, le dossier est réputé accepté.
              </p>

              <p className="mt-4"><strong>8.4. Règles de l'art</strong></p>
              <p className="mt-2">
                La prestation est exécutée conformément aux règles de l'art, aux Documents Techniques
                Unifiés (DTU) applicables et aux normes en vigueur au moment de leur réalisation.
              </p>
            </section>

            <section id="article-9" aria-labelledby="article-9-title">
              <h2 id="article-9-title" className="text-2xl font-bold text-ipb-text mb-4 flex items-center gap-3">
                <CheckCircle size={24} className="text-ipb-orange" aria-hidden="true" />
                Article 9 - Obligations du Client
              </h2>
              <p>Le Client s'engage à :</p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Fournir au Prestataire toutes les informations utiles concernant le bien (plans, diagnostics antérieurs, historique des désordres, etc.) ;</li>
                <li>Signaler tout élément de nature à affecter la visite technique (réseaux enterrés, présence d'amiante, servitudes, etc.) ;</li>
                <li>Assurer les conditions d'accès et de sécurité sur le site ;</li>
                <li>Régler le prix de la prestation conformément à l'article 6 ;</li>
                <li>Prévenir IPB de toute modification de ses coordonnées.</li>
              </ul>
            </section>

            <section id="article-10" aria-labelledby="article-10-title">
              <h2 id="article-10-title" className="text-2xl font-bold text-ipb-text mb-4 flex items-center gap-3">
                <Shield size={24} className="text-ipb-orange" aria-hidden="true" />
                Article 10 - Service après-vente
              </h2>
              <p>
                IPB assure, pendant une durée de <strong>douze (12) mois</strong> suivant la remise
                du dossier de synthèse, un service après-vente comprenant :
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>la réponse aux questions du Client portant sur le contenu du dossier de synthèse ;</li>
                <li>la médiation Client en cas de difficulté d'interprétation ou d'application des préconisations ;</li>
                <li>la mise à disposition d'un interlocuteur dédié.</li>
              </ul>
              <p className="mt-4">
                Toute investigation complémentaire ou nouvelle visite technique sortant du périmètre
                du SAV fera l'objet d'un devis distinct.
              </p>
            </section>

            <section id="article-11" aria-labelledby="article-11-title">
              <h2 id="article-11-title" className="text-2xl font-bold text-ipb-text mb-4 flex items-center gap-3">
                <Wrench size={24} className="text-ipb-orange" aria-hidden="true" />
                Article 11 - Travaux ultérieurs
              </h2>
              <p>
                Dans l'hypothèse où le Client décide d'engager les travaux préconisés à l'issue du
                diagnostic, ces travaux sont réalisés par un partenaire d'exécution titulaire d'une
                garantie décennale et d'une responsabilité civile professionnelle, dont les attestations
                d'assurance sont remises au Client préalablement à toute intervention.
              </p>
              <p className="mt-4">
                Les conditions générales d'exécution des travaux et leur tarification sont celles
                du partenaire d'exécution. Elles sont remises au Client avec le devis correspondant
                à la phase travaux.
              </p>
              <p className="mt-4">
                Le Client est informé qu'il dispose, pour les travaux soumis à l'obligation
                d'assurance décennale (articles 1792 et suivants du Code civil), de la faculté de
                souscrire une assurance dommages-ouvrage (articles L. 242-1 et suivants du Code des
                assurances) afin d'obtenir, hors recherche de responsabilité, le préfinancement
                rapide des réparations relevant de la décennale.
              </p>
            </section>

            <section id="article-12" aria-labelledby="article-12-title">
              <h2 id="article-12-title" className="text-2xl font-bold text-ipb-text mb-4 flex items-center gap-3">
                <Shield size={24} className="text-ipb-orange" aria-hidden="true" />
                Article 12 - Assurances
              </h2>
              <p>
                Les attestations d'assurance en cours de validité du partenaire d'exécution
                intervenant sur le chantier (garantie décennale et responsabilité civile professionnelle)
                sont communiquées au Client préalablement à toute intervention technique sur le site,
                sur simple demande ou avec le devis.
              </p>
              <p className="mt-4">
                Pour les notes de calcul opposables (dimensionnement Eurocodes), un bureau d'études
                structure indépendant intervient sous sa propre responsabilité civile professionnelle
                et sa décennale études dédiée.
              </p>
            </section>

            <section id="article-13" aria-labelledby="article-13-title">
              <h2 id="article-13-title" className="text-2xl font-bold text-ipb-text mb-4 flex items-center gap-3">
                <AlertTriangle size={24} className="text-ipb-orange" aria-hidden="true" />
                Article 13 - Responsabilité
              </h2>
              <p>
                <strong>13.1.</strong> IPB est responsable, vis-à-vis du Client, de la coordination
                du dossier, de la production du dossier de synthèse et de l'exécution du SAV 12 mois
                prévu à l'article 10. L'exécution technique sur site (visite, mesures, rapport technique)
                et les travaux ultérieurs relèvent de la responsabilité du partenaire d'exécution,
                titulaire de ses propres assurances.
              </p>
              <p className="mt-4">
                <strong>13.2.</strong> IPB ne saurait être tenue responsable des dommages résultant :
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>d'informations erronées ou incomplètes communiquées par le Client ;</li>
                <li>de l'utilisation anormale des ouvrages ou d'un défaut d'entretien ;</li>
                <li>de modifications ou interventions effectuées par le Client ou un tiers après la
                    remise du dossier ;</li>
                <li>de phénomènes naturels exceptionnels (séismes, inondations centenaires…) ;</li>
                <li>de l'exécution des travaux ultérieurs, laquelle relève de la responsabilité du
                    partenaire d'exécution (cf. art. 11).</li>
              </ul>
              <p className="mt-4">
                <strong>13.3.</strong> En tout état de cause, la responsabilité d'IPB est limitée
                au montant du contrat de diagnostic, sauf en cas de faute lourde ou intentionnelle.
              </p>
            </section>

            <section id="article-14" aria-labelledby="article-14-title">
              <h2 id="article-14-title" className="text-2xl font-bold text-ipb-text mb-4 flex items-center gap-3">
                <AlertTriangle size={24} className="text-ipb-orange" aria-hidden="true" />
                Article 14 - Force majeure
              </h2>
              <p>
                Aucune des parties ne pourra être tenue responsable de l'inexécution ou du retard
                dans l'exécution de ses obligations contractuelles si cette inexécution ou ce retard
                résulte d'un cas de force majeure au sens de l'article 1218 du Code civil.
              </p>
              <p className="mt-4">
                En cas de force majeure, les obligations des parties sont suspendues. Si l'événement
                de force majeure perdure plus de trois mois, chaque partie pourra résilier le contrat
                sans indemnité.
              </p>
            </section>

            <section id="article-15" aria-labelledby="article-15-title">
              <h2 id="article-15-title" className="text-2xl font-bold text-ipb-text mb-4 flex items-center gap-3">
                <Shield size={24} className="text-ipb-orange" aria-hidden="true" />
                Article 15 - Protection des données personnelles
              </h2>
              <p>
                Les données personnelles collectées dans le cadre de la relation contractuelle font
                l'objet d'un traitement conforme au Règlement Général sur la Protection des Données
                (RGPD) et à la loi Informatique et Libertés.
              </p>
              <p className="mt-4">
                Pour plus d'informations sur le traitement de vos données et l'exercice de vos droits,
                consultez notre <Link href="/legal/confidentialite" className="text-ipb-orange hover:underline font-bold">
                Politique de confidentialité</Link>.
              </p>
            </section>

            <section id="article-16" aria-labelledby="article-16-title">
              <h2 id="article-16-title" className="text-2xl font-bold text-ipb-text mb-4 flex items-center gap-3">
                <Gavel size={24} className="text-ipb-orange" aria-hidden="true" />
                Article 16 - Règlement des litiges et médiation
              </h2>
              <p>
                <strong>16.1. Droit applicable</strong><br />
                Les présentes CGV sont soumises au droit français.
              </p>
              <p className="mt-4">
                <strong>16.2. Règlement amiable</strong><br />
                En cas de litige, les parties s'engagent à rechercher une solution amiable avant
                toute action judiciaire. Le Client peut adresser ses réclamations à :<br />
                <span className="text-sm">IPB · Institut de Pathologie du Bâtiment, 54 avenue Jean Jaurès, 31170 Tournefeuille<br />
                Email : <a href="mailto:contact@ipb-expertise.fr" className="text-ipb-orange">contact@ipb-expertise.fr</a></span>
              </p>

              <div className="mt-6 bg-ipb-cream rounded-xl p-6 border border-ipb-rule">
                <p className="font-bold text-ipb-text mb-3">16.3. Médiation de la consommation</p>
                <p className="text-ipb-text mb-3">
                  Conformément aux articles L. 612-1 et suivants du Code de la consommation, le
                  Client consommateur peut, après réclamation écrite préalable restée infructueuse,
                  recourir gratuitement à un médiateur de la consommation. La liste des médiateurs
                  agréés est consultable sur le site officiel{' '}
                  <a href="https://www.economie.gouv.fr/mediation-conso" target="_blank" rel="noopener noreferrer"
                     className="text-ipb-orange hover:underline">economie.gouv.fr/mediation-conso</a>.
                </p>
              </div>

              <p className="mt-4">
                <strong>16.4. Compétence juridictionnelle</strong><br />
                À défaut de règlement amiable, tout litige sera porté devant les juridictions
                compétentes du ressort de la Cour d'appel de Toulouse.
              </p>
            </section>

            <section id="article-17" aria-labelledby="article-17-title">
              <h2 id="article-17-title" className="text-2xl font-bold text-ipb-text mb-4 flex items-center gap-3">
                <FileText size={24} className="text-ipb-orange" aria-hidden="true" />
                Article 17 - Dispositions générales
              </h2>
              <p>
                <strong>17.1. Intégralité</strong><br />
                Les présentes CGV expriment l'intégralité des obligations des parties. Aucune
                condition générale ou spécifique figurant dans les documents envoyés ou remis par
                le Client ne pourra s'intégrer aux présentes CGV.
              </p>
              <p className="mt-4">
                <strong>17.2. Nullité partielle</strong><br />
                Si l'une quelconque des clauses des présentes CGV était déclarée nulle ou inapplicable,
                les autres clauses conserveraient leur pleine force et portée.
              </p>
              <p className="mt-4">
                <strong>17.3. Modification</strong><br />
                IPB se réserve le droit de modifier les présentes CGV à tout moment. Les CGV
                applicables sont celles en vigueur à la date de la commande.
              </p>
              <p className="mt-4">
                <strong>17.4. Preuve</strong><br />
                Les registres informatisés, conservés dans les systèmes informatiques d'IPB dans
                des conditions raisonnables de sécurité, seront considérés comme les preuves des
                communications, des commandes et des paiements intervenus entre les parties.
              </p>
            </section>

          </article>

          <div className="mt-12 p-6 bg-ipb-stone rounded-xl border border-ipb-rule">
            <h2 className="text-xl font-bold text-ipb-text mb-4">ANNEXE - Formulaire type de rétractation</h2>
            <p className="text-sm text-ipb-muted mb-4">
              (À compléter et renvoyer uniquement si vous souhaitez vous rétracter du contrat)
            </p>
            <div className="bg-white p-4 rounded-lg border border-ipb-rule text-sm">
              <p className="mb-3">À l'attention de :<br />
              <strong>IPB · Institut de Pathologie du Bâtiment</strong><br />
              54 avenue Jean Jaurès, 31170 Tournefeuille<br />
              Email : contact@ipb-expertise.fr</p>

              <p className="mb-3">Je/Nous (*) vous notifie/notifions (*) par la présente ma/notre (*) rétractation du contrat
              portant sur la prestation ci-dessous :</p>

              <p className="mb-3">
                - Description de la prestation : ________________________________<br />
                - Commandée le (*) / reçue le (*) : ________________________________<br />
                - Nom du (des) consommateur(s) : ________________________________<br />
                - Adresse du (des) consommateur(s) : ________________________________
              </p>

              <p className="mb-3">Date : ________________________________</p>

              <p>Signature du (des) consommateur(s) (uniquement en cas de notification sur papier) :</p>

              <p className="mt-4 text-xs text-ipb-muted">(*) Rayez la mention inutile</p>
            </div>
          </div>

          <footer className="mt-12 pt-8 border-t border-ipb-rule">
            <p className="text-sm text-ipb-muted text-center">
              Dernière mise à jour des présentes CGV : <time dateTime="2026-05-24">24 mai 2026</time>
            </p>
          </footer>
        </div>
      </main>

      <Footer />
    </div>
  );
}
