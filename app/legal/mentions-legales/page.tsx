import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { SmartBackBar } from "@/components/ui/SmartBackBar";
import { Footer } from '@/components/home/Footer';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { Calendar, Scale, Shield, Building2, Server, Mail, Phone, FileText, AlertCircle, Gavel, Handshake } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Mentions Légales · IPB',
  description: "Mentions légales de l'Institut de Pathologie du Bâtiment (IPB). Infos légales, données, propriété intellectuelle.",
  alternates: {
    canonical: 'https://www.ipb-expertise.fr/legal/mentions-legales',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function MentionsLegalesPage() {
  return (
    <div className="font-sans text-ipb-text bg-ipb-cream antialiased">
      {/* Skip link for accessibility */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-ipb-orange text-white px-4 py-2 rounded-lg z-50">
        Aller au contenu principal
      </a>

      <TopBar />
      <Navbar />
      <SmartBackBar />

      <main id="main-content" className="bg-white min-h-screen py-12 md:py-16" role="main" aria-labelledby="page-title">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav aria-label="Fil d'Ariane" className="mb-6">
            <Breadcrumbs items={[
              { label: 'Accueil', href: '/' },
              { label: 'Mentions Légales' }
            ]} />
          </nav>

          {/* En-tête */}
          <header className="mb-8 pb-6 border-b border-ipb-rule">
            <div className="flex items-center gap-2 text-sm text-ipb-muted mb-4">
              <Calendar size={16} aria-hidden="true" />
              <time dateTime="2026-05-24">Mis à jour le 24 mai 2026</time>
            </div>
            <h1 id="page-title" className="text-3xl md:text-4xl font-extrabold text-ipb-text mb-4">
              Mentions Légales
            </h1>
            <p className="text-lg text-ipb-muted leading-relaxed">
              Conformément aux dispositions des articles 6-III et 19 de la Loi n° 2004-575 du 21 juin 2004
              pour la Confiance dans l'économie numérique, dite L.C.E.N., nous portons à la connaissance
              des utilisateurs et visiteurs du site les informations suivantes.
            </p>
          </header>

          {/* Table des matières */}
          <nav aria-labelledby="toc-title" className="mb-10 p-6 bg-ipb-cream rounded-xl border border-ipb-rule">
            <h2 id="toc-title" className="font-bold text-ipb-text mb-4 flex items-center gap-2">
              <FileText size={18} aria-hidden="true" />
              Sommaire
            </h2>
            <ol className="space-y-2 text-sm">
              <li><a href="#editeur" className="text-ipb-orange hover:text-ipb-orange hover:underline focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded">1. Éditeur du site et identification de l'entreprise</a></li>
              <li><a href="#directeur" className="text-ipb-orange hover:text-ipb-orange hover:underline focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded">2. Directeur de la publication</a></li>
              <li><a href="#hebergeur" className="text-ipb-orange hover:text-ipb-orange hover:underline focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded">3. Hébergeur</a></li>
              <li><a href="#contact" className="text-ipb-orange hover:text-ipb-orange hover:underline focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded">4. Coordonnées de contact</a></li>
              <li><a href="#activite" className="text-ipb-orange hover:text-ipb-orange hover:underline focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded">5. Activité et partenaire d'exécution</a></li>
              <li><a href="#assurances" className="text-ipb-orange hover:text-ipb-orange hover:underline focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded">6. Assurances professionnelles</a></li>
              <li><a href="#propriete" className="text-ipb-orange hover:text-ipb-orange hover:underline focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded">7. Propriété intellectuelle</a></li>
              <li><a href="#donnees" className="text-ipb-orange hover:text-ipb-orange hover:underline focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded">8. Protection des données personnelles</a></li>
              <li><a href="#cookies" className="text-ipb-orange hover:text-ipb-orange hover:underline focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded">9. Gestion des cookies</a></li>
              <li><a href="#responsabilite" className="text-ipb-orange hover:text-ipb-orange hover:underline focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded">10. Limitation de responsabilité</a></li>
              <li><a href="#liens" className="text-ipb-orange hover:text-ipb-orange hover:underline focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded">11. Liens hypertextes</a></li>
              <li><a href="#litige" className="text-ipb-orange hover:text-ipb-orange hover:underline focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded">12. Règlement des litiges et droit applicable</a></li>
            </ol>
          </nav>

          {/* Contenu */}
          <article className="prose prose-lg max-w-none space-y-10 text-ipb-text">

            {/* Section 1 */}
            <section id="editeur" aria-labelledby="editeur-title">
              <h2 id="editeur-title" className="text-2xl font-bold text-ipb-text mb-4 flex items-center gap-3">
                <Building2 size={24} className="text-ipb-orange" aria-hidden="true" />
                1. Éditeur du site et identification de l'entreprise
              </h2>
              <div className="bg-ipb-cream rounded-xl p-6 border border-ipb-rule">
                <dl className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:gap-4">
                    <dt className="font-bold text-ipb-text sm:w-56">Dénomination commerciale :</dt>
                    <dd>IPB · Institut de Pathologie du Bâtiment</dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:gap-4">
                    <dt className="font-bold text-ipb-text sm:w-56">Forme juridique :</dt>
                    <dd>Entrepreneur individuel (micro-entreprise)</dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:gap-4">
                    <dt className="font-bold text-ipb-text sm:w-56">Siège :</dt>
                    <dd>54 avenue Jean Jaurès, 31170 Tournefeuille, France <span className="text-sm text-ipb-muted">(non ouvert au public)</span></dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:gap-4">
                    <dt className="font-bold text-ipb-text sm:w-56">SIRET :</dt>
                    <dd>908 995 103 00029</dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:gap-4">
                    <dt className="font-bold text-ipb-text sm:w-56">SIREN :</dt>
                    <dd>908 995 103</dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:gap-4">
                    <dt className="font-bold text-ipb-text sm:w-56">Immatriculation :</dt>
                    <dd>Inscrit au Registre National des Entreprises (RNE) — non inscrit au RCS</dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:gap-4">
                    <dt className="font-bold text-ipb-text sm:w-56">Code APE/NAF :</dt>
                    <dd>70.22Z — Conseil pour les affaires et autres conseils de gestion</dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:gap-4">
                    <dt className="font-bold text-ipb-text sm:w-56">Forme d'exercice :</dt>
                    <dd>Libérale non réglementée</dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:gap-4">
                    <dt className="font-bold text-ipb-text sm:w-56">N° TVA intracommunautaire :</dt>
                    <dd>FR71908995103</dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:gap-4">
                    <dt className="font-bold text-ipb-text sm:w-56">Régime fiscal :</dt>
                    <dd>Micro-entreprise — bénéfices non commerciaux (BNC)</dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:gap-4">
                    <dt className="font-bold text-ipb-text sm:w-56">Régime TVA :</dt>
                    <dd>Franchise en base — TVA non applicable, article 293 B du CGI</dd>
                  </div>
                </dl>
              </div>
            </section>

            {/* Section 2 */}
            <section id="directeur" aria-labelledby="directeur-title">
              <h2 id="directeur-title" className="text-2xl font-bold text-ipb-text mb-4 flex items-center gap-3">
                <Scale size={24} className="text-ipb-orange" aria-hidden="true" />
                2. Directeur de la publication
              </h2>
              <p>
                Le directeur de la publication du site internet <strong>www.ipb-expertise.fr</strong> est
                le représentant légal d'IPB.
              </p>
              <p className="mt-4">
                Conformément à l'article 93-2 de la loi n° 82-652 du 29 juillet 1982, le directeur de la
                publication assume la responsabilité éditoriale de l'ensemble des contenus publiés sur ce site.
              </p>
            </section>

            {/* Section 3 */}
            <section id="hebergeur" aria-labelledby="hebergeur-title">
              <h2 id="hebergeur-title" className="text-2xl font-bold text-ipb-text mb-4 flex items-center gap-3">
                <Server size={24} className="text-ipb-orange" aria-hidden="true" />
                3. Hébergeur
              </h2>
              <div className="bg-ipb-cream rounded-xl p-6 border border-ipb-rule">
                <dl className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:gap-4">
                    <dt className="font-bold text-ipb-text sm:w-48">Raison sociale :</dt>
                    <dd>Vercel Inc.</dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:gap-4">
                    <dt className="font-bold text-ipb-text sm:w-48">Adresse :</dt>
                    <dd>340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis</dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:gap-4">
                    <dt className="font-bold text-ipb-text sm:w-48">Site web :</dt>
                    <dd>
                      <a href="https://vercel.com" target="_blank" rel="noopener noreferrer"
                         className="text-ipb-orange hover:text-ipb-orange underline focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded">
                        https://vercel.com
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>
              <p className="mt-4 text-sm text-ipb-muted">
                L'hébergement est assuré sur des serveurs sécurisés disposant d'un certificat SSL (HTTPS)
                garantissant le chiffrement des données échangées entre l'utilisateur et le serveur.
              </p>
            </section>

            {/* Section 4 */}
            <section id="contact" aria-labelledby="contact-title">
              <h2 id="contact-title" className="text-2xl font-bold text-ipb-text mb-4 flex items-center gap-3">
                <Mail size={24} className="text-ipb-orange" aria-hidden="true" />
                4. Coordonnées de contact
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-ipb-stone rounded-xl p-4 border border-ipb-rule">
                  <div className="flex items-center gap-2 mb-2">
                    <Phone size={18} className="text-ipb-orange" aria-hidden="true" />
                    <span className="font-bold text-ipb-text">Téléphone</span>
                  </div>
                  <a href="tel:0582953375" className="text-ipb-orange hover:text-ipb-orange font-bold text-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded">
                    05 82 95 33 75
                  </a>
                </div>
                <div className="bg-ipb-stone rounded-xl p-4 border border-ipb-rule">
                  <div className="flex items-center gap-2 mb-2">
                    <Mail size={18} className="text-ipb-orange" aria-hidden="true" />
                    <span className="font-bold text-ipb-text">Email</span>
                  </div>
                  <a href="mailto:contact@ipb-expertise.fr" className="text-ipb-orange hover:text-ipb-orange font-bold break-all focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded">
                    contact@ipb-expertise.fr
                  </a>
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section id="activite" aria-labelledby="activite-title">
              <h2 id="activite-title" className="text-2xl font-bold text-ipb-text mb-4 flex items-center gap-3">
                <Building2 size={24} className="text-ipb-orange" aria-hidden="true" />
                5. Activité et partenaire d'exécution
              </h2>

              <h3 className="text-lg font-bold text-ipb-text mb-3">Activité d'IPB-Expertise</h3>
              <p>
                IPB-Expertise est un institut indépendant de coordination spécialisé dans la structure
                du bâtiment. Son activité, exercée sous le code APE 7022Z (Conseil pour les affaires
                et autres conseils de gestion) en régime micro-BNC, consiste en des prestations
                intellectuelles et de coordination relatives aux pathologies et projets structurels
                du bâtiment.
              </p>
              <p className="mt-4">Les prestations d'IPB-Expertise comprennent :</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>la qualification et l'analyse préalable des demandes adressées via le site ipb-expertise.fr ou par tout autre canal ;</li>
                <li>la mise en relation du client avec une entreprise partenaire sélectionnée par IPB-Expertise pour la réalisation des prestations techniques (diagnostic et travaux) ;</li>
                <li>la coordination administrative du dossier client, de la qualification initiale à la livraison ;</li>
                <li>le suivi du déroulement des prestations techniques côté client, sans intervention technique propre ;</li>
                <li>la livraison au client, en fin de mission, d'un dossier de synthèse écrit ;</li>
                <li>un service d'accompagnement et de médiation pendant douze (12) mois suivant la livraison.</li>
              </ul>
              <p className="mt-4">
                IPB-Expertise n'exerce aucune activité technique du bâtiment au sens des articles 1792
                et suivants du Code civil. Elle ne réalise ni diagnostic technique, ni expertise
                structurelle, ni étude de structure, ni travaux de bâtiment. Ces prestations sont
                exécutées sous la seule responsabilité de l'entreprise partenaire, titulaire de ses
                propres assurances de responsabilité civile professionnelle et de responsabilité
                décennale, dans le cadre d'un contrat de co-traitance conjoint et non solidaire.
              </p>
              <p className="mt-4">
                Dans le cadre de ce partenariat, IPB-Expertise agit en qualité de mandataire
                d'encaissement de son entreprise partenaire, pour les sommes dues par le client au
                titre des prestations techniques. Ces sommes ne constituent pas le chiffre d'affaires
                d'IPB-Expertise et sont reversées à l'entreprise partenaire dans les conditions prévues
                au contrat.
              </p>

              <h3 className="text-lg font-bold text-ipb-text mt-8 mb-3 flex items-center gap-2">
                <Handshake size={20} className="text-ipb-orange" aria-hidden="true" />
                Entreprise partenaire (diagnostic et travaux)
              </h3>
              <p>
                L'entreprise partenaire désignée par IPB-Expertise pour la réalisation des prestations
                techniques est :
              </p>
              <div className="mt-4 bg-ipb-cream rounded-xl p-6 border border-ipb-rule">
                <dl className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:gap-4">
                    <dt className="font-bold text-ipb-text sm:w-48">Nom commercial :</dt>
                    <dd>Bâti Halli</dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:gap-4">
                    <dt className="font-bold text-ipb-text sm:w-48">Dénomination juridique :</dt>
                    <dd>Entreprise Halli Mustapha — Entreprise Individuelle</dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:gap-4">
                    <dt className="font-bold text-ipb-text sm:w-48">SIRET :</dt>
                    <dd>398 185 421 00037</dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:gap-4">
                    <dt className="font-bold text-ipb-text sm:w-48">N° TVA :</dt>
                    <dd>FR14398185421</dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:gap-4">
                    <dt className="font-bold text-ipb-text sm:w-48">Adresse :</dt>
                    <dd>13 rue du Recteur Dottin, Apt 7, 4<sup>e</sup> étage, 31100 Toulouse</dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:gap-4">
                    <dt className="font-bold text-ipb-text sm:w-48">Code APE/NAF :</dt>
                    <dd>4399C — Travaux de maçonnerie générale et gros œuvre de bâtiment</dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:gap-4">
                    <dt className="font-bold text-ipb-text sm:w-48">Date de création :</dt>
                    <dd>3 octobre 2013</dd>
                  </div>
                </dl>
              </div>
              <p className="mt-4 text-sm text-ipb-muted">
                Les activités d'exécution couvrent : diagnostic technique des pathologies, maçonnerie et
                béton armé (reprise en sous-œuvre, agrafage, harpage, matage), étanchéité maçonnée
                (cuvelage, injection de résine hydrophobe), charpente bois, couverture, menuiseries
                extérieures, plâtrerie, revêtements et finitions.
              </p>

              <div className="mt-6 bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r-lg">
                <p className="font-bold text-blue-900 mb-2">Bureau d'études structure indépendant</p>
                <p className="text-blue-800">
                  Pour les études techniques et notes de calcul opposables (dimensionnement Eurocodes),
                  un bureau d'études structure indépendant rédige et signe l'étude technique sous sa
                  propre responsabilité civile professionnelle et sa décennale études dédiée.
                </p>
              </div>
            </section>

            {/* Section 6 */}
            <section id="assurances" aria-labelledby="assurances-title">
              <h2 id="assurances-title" className="text-2xl font-bold text-ipb-text mb-4 flex items-center gap-3">
                <Shield size={24} className="text-ipb-orange" aria-hidden="true" />
                6. Assurances professionnelles
              </h2>

              <div className="space-y-4">
                <div className="bg-ipb-cream border border-ipb-rule rounded-xl p-6">
                  <h3 className="font-bold text-ipb-text mb-3">Responsabilité Civile Professionnelle d'IPB-Expertise</h3>
                  <p className="text-ipb-text">
                    IPB-Expertise est couverte par une assurance Responsabilité Civile Professionnelle
                    au titre de ses activités de coordination et d'intermédiation. Les références de
                    cette police sont communiquées sur simple demande à{' '}
                    <a href="mailto:contact@ipb-expertise.fr" className="text-ipb-orange hover:underline">contact@ipb-expertise.fr</a>.
                  </p>
                </div>

                <p className="mt-4 mb-2">
                  Les assurances réglementaires couvrant les prestations techniques (diagnostic et travaux)
                  sont portées par l'entreprise partenaire Bâti Halli (SIRET 398 185 421 00037) :
                </p>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                  <h3 className="font-bold text-blue-900 mb-3">Responsabilité Civile Professionnelle (diagnostic)</h3>
                  <p className="text-blue-800">
                    Bâti Halli est titulaire d'une assurance Responsabilité Civile Professionnelle couvrant
                    les prestations de diagnostic technique des pathologies du bâtiment, ainsi que les
                    dommages corporels, matériels et immatériels causés aux tiers avant et après réception
                    des prestations. L'attestation en cours de validité est transmise au Client préalablement
                    à toute intervention.
                  </p>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                  <h3 className="font-bold text-green-900 mb-3">Garantie Décennale (travaux)</h3>
                  <p className="text-green-800 mb-4">
                    Conformément à l'article L. 241-1 du Code des assurances et aux articles 1792 et suivants
                    du Code civil, les travaux de construction soumis à l'obligation d'assurance (maçonnerie
                    et béton armé, charpente et structure bois, couverture, menuiseries extérieures, plâtrerie,
                    revêtements et sols coulés) sont exécutés par Bâti Halli sous sa garantie décennale dédiée.
                  </p>
                  <p className="text-green-800 text-sm">
                    Lorsque des entreprises partenaires complémentaires interviennent sur un chantier, les
                    attestations de leur décennale métier sont également remises au Client avec le devis ou
                    sur simple demande.
                  </p>
                </div>

                <div className="bg-ipb-cream border border-ipb-rule rounded-xl p-6">
                  <h3 className="font-bold text-ipb-text mb-3">Bureau d'études structure</h3>
                  <p className="text-ipb-text">
                    Pour les notes de calcul opposables (dimensionnement Eurocodes), le bureau d'études
                    structure indépendant mobilisé intervient sous sa propre responsabilité civile
                    professionnelle et sa décennale études dédiée.
                  </p>
                </div>
              </div>

              <p className="mt-4 text-sm text-ipb-muted">
                Sur simple demande, les attestations d'assurance en cours de validité sont transmises au
                client préalablement à toute intervention.
              </p>
            </section>

            {/* Section 7 */}
            <section id="propriete" aria-labelledby="propriete-title">
              <h2 id="propriete-title" className="text-2xl font-bold text-ipb-text mb-4 flex items-center gap-3">
                <FileText size={24} className="text-ipb-orange" aria-hidden="true" />
                7. Propriété intellectuelle
              </h2>
              <p>
                L'ensemble des éléments constituant le site <strong>www.ipb-expertise.fr</strong> (textes,
                photographies, illustrations, logos, graphismes, icônes, logiciels, base de données,
                structure du site) est protégé par les dispositions du Code de la propriété intellectuelle,
                notamment les articles L. 111-1 et suivants relatifs au droit d'auteur et L. 713-1 et
                suivants relatifs au droit des marques.
              </p>

              <div className="mt-6 bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg">
                <p className="font-bold text-amber-900 mb-2 flex items-center gap-2">
                  <AlertCircle size={18} aria-hidden="true" />
                  Interdictions
                </p>
                <p className="text-amber-800">
                  Toute reproduction, représentation, modification, publication, transmission, dénaturation,
                  totale ou partielle du site ou de son contenu, par quelque procédé que ce soit, et sur
                  quelque support que ce soit est interdite sans l'autorisation écrite préalable d'IPB.
                </p>
              </div>

              <p className="mt-4">
                Toute exploitation non autorisée du site ou de son contenu, des informations qui y sont
                divulguées, engagerait la responsabilité de l'utilisateur et constituerait une contrefaçon
                sanctionnée par les articles L. 335-2 et suivants du Code de la propriété intellectuelle.
              </p>

              <p className="mt-4">
                La marque « IPB », le logo et l'ensemble des signes distinctifs reproduits sur le site
                sont la propriété exclusive d'IPB ou font l'objet d'une autorisation d'utilisation.
              </p>
            </section>

            {/* Section 8 */}
            <section id="donnees" aria-labelledby="donnees-title">
              <h2 id="donnees-title" className="text-2xl font-bold text-ipb-text mb-4 flex items-center gap-3">
                <Shield size={24} className="text-ipb-orange" aria-hidden="true" />
                8. Protection des données personnelles
              </h2>

              <p>
                Conformément au Règlement (UE) 2016/679 du Parlement européen et du Conseil du 27 avril 2016
                (Règlement Général sur la Protection des Données - RGPD) et à la loi n° 78-17 du 6 janvier 1978
                modifiée relative à l'informatique, aux fichiers et aux libertés, IPB s'engage à protéger
                les données personnelles des utilisateurs du site.
              </p>

              <div className="mt-6 space-y-4">
                <div className="bg-ipb-cream rounded-xl p-6 border border-ipb-rule">
                  <h3 className="font-bold text-ipb-text mb-3">Responsable du traitement</h3>
                  <p>IPB, représentée par son représentant légal</p>
                  <p>54 avenue Jean Jaurès, 31170 Tournefeuille</p>
                  <p>SIRET 908 995 103 00029</p>
                  <p>Email : <a href="mailto:contact@ipb-expertise.fr" className="text-ipb-orange hover:underline">contact@ipb-expertise.fr</a></p>
                </div>

                <div className="bg-ipb-cream rounded-xl p-6 border border-ipb-rule">
                  <h3 className="font-bold text-ipb-text mb-3">Données collectées et finalités</h3>
                  <ul className="space-y-2 text-ipb-text">
                    <li><strong>Formulaires de contact/diagnostic :</strong> nom, prénom, email, téléphone, adresse - pour répondre à vos demandes et vous recontacter</li>
                    <li><strong>Données de navigation :</strong> cookies, adresse IP, pages visitées - pour améliorer l'expérience utilisateur et les statistiques</li>
                  </ul>
                </div>

                <div className="bg-ipb-cream rounded-xl p-6 border border-ipb-rule">
                  <h3 className="font-bold text-ipb-text mb-3">Destinataires des données</h3>
                  <p className="mb-3">
                    Vos données sont traitées par IPB en sa qualité d'éditeur du site et responsable du
                    traitement. Elles peuvent être transmises au partenaire d'exécution lorsqu'une
                    intervention technique est engagée :
                  </p>
                  <ul className="space-y-2 text-ipb-text">
                    <li><strong>IPB</strong> — Personnel autorisé uniquement (coordination du dossier)</li>
                    <li><strong>Bâti Halli</strong> (SIRET 398 185 421 00037) — Partenaire d'exécution, pour la réalisation du diagnostic et des travaux</li>
                    <li><strong>Bureau d'études structure</strong> indépendant — lorsqu'une note de calcul Eurocodes est requise</li>
                    <li><strong>Hébergeur (Vercel)</strong> — pour le fonctionnement technique du site</li>
                  </ul>
                  <p className="mt-3 text-sm text-ipb-muted">
                    Vos données ne sont jamais cédées ni revendues à des tiers à des fins commerciales.
                  </p>
                </div>

                <div className="bg-ipb-cream rounded-xl p-6 border border-ipb-rule">
                  <h3 className="font-bold text-ipb-text mb-3">Vos droits</h3>
                  <p className="mb-3">Conformément aux articles 15 à 22 du RGPD, vous disposez des droits suivants :</p>
                  <ul className="grid sm:grid-cols-2 gap-2 text-ipb-text">
                    <li>• Droit d'accès</li>
                    <li>• Droit de rectification</li>
                    <li>• Droit à l'effacement (« droit à l'oubli »)</li>
                    <li>• Droit à la limitation du traitement</li>
                    <li>• Droit à la portabilité</li>
                    <li>• Droit d'opposition</li>
                  </ul>
                  <p className="mt-4 text-sm">
                    Pour exercer ces droits, contactez-nous à : <a href="mailto:contact@ipb-expertise.fr" className="text-ipb-orange hover:underline">contact@ipb-expertise.fr</a>
                  </p>
                </div>

                <div className="bg-ipb-cream rounded-xl p-6 border border-ipb-rule">
                  <h3 className="font-bold text-ipb-text mb-3">Durée de conservation</h3>
                  <ul className="space-y-2 text-ipb-text">
                    <li><strong>Données prospects :</strong> 3 ans à compter du dernier contact</li>
                    <li><strong>Données clients :</strong> durée de la relation contractuelle + 5 ans (prescription civile)</li>
                    <li><strong>Documents comptables :</strong> 10 ans (obligation légale)</li>
                    <li><strong>Cookies :</strong> 13 mois maximum</li>
                  </ul>
                </div>
              </div>

              <p className="mt-6">
                En cas de réclamation, vous pouvez également saisir la Commission Nationale de l'Informatique
                et des Libertés (CNIL) : <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer"
                className="text-ipb-orange hover:underline">www.cnil.fr</a>
              </p>

              <p className="mt-4">
                Pour plus de détails, consultez notre <Link href="/legal/confidentialite" className="text-ipb-orange hover:underline font-bold">
                Politique de confidentialité complète</Link>.
              </p>
            </section>

            {/* Section 9 */}
            <section id="cookies" aria-labelledby="cookies-title">
              <h2 id="cookies-title" className="text-2xl font-bold text-ipb-text mb-4 flex items-center gap-3">
                <FileText size={24} className="text-ipb-orange" aria-hidden="true" />
                9. Gestion des cookies
              </h2>
              <p>
                Un cookie est un fichier texte déposé sur votre terminal (ordinateur, tablette, smartphone)
                lors de la visite d'un site internet.
              </p>

              <div className="mt-6 space-y-4">
                <div className="bg-ipb-cream rounded-xl p-6 border border-ipb-rule">
                  <h3 className="font-bold text-ipb-text mb-3">Types de cookies utilisés</h3>
                  <ul className="space-y-3 text-ipb-text">
                    <li>
                      <strong>Cookies strictement nécessaires :</strong> essentiels au fonctionnement du site
                      (session, préférences de consentement). Ils ne nécessitent pas votre consentement.
                    </li>
                    <li>
                      <strong>Cookies analytiques (Google Analytics) :</strong> permettent de mesurer l'audience
                      du site et d'améliorer son fonctionnement. Soumis à votre consentement.
                    </li>
                    <li>
                      <strong>Cookies tiers (Calendly) :</strong> permettent d'intégrer l'outil de prise de
                      rendez-vous. Soumis à votre consentement.
                    </li>
                  </ul>
                </div>
              </div>

              <p className="mt-4">
                Vous pouvez à tout moment modifier vos préférences en matière de cookies via le bandeau
                de consentement ou les paramètres de votre navigateur.
              </p>
            </section>

            {/* Section 10 */}
            <section id="responsabilite" aria-labelledby="responsabilite-title">
              <h2 id="responsabilite-title" className="text-2xl font-bold text-ipb-text mb-4 flex items-center gap-3">
                <AlertCircle size={24} className="text-ipb-orange" aria-hidden="true" />
                10. Limitation de responsabilité
              </h2>

              <p>
                IPB s'efforce d'assurer au mieux l'exactitude et la mise à jour des informations
                diffusées sur le site. Toutefois, IPB ne peut garantir l'exactitude, la précision
                ou l'exhaustivité des informations mises à disposition sur le site.
              </p>

              <p className="mt-4">
                En conséquence, IPB décline toute responsabilité :
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Pour toute imprécision, inexactitude ou omission portant sur des informations disponibles sur le site</li>
                <li>Pour tous dommages, directs ou indirects, quelles qu'en soient les causes, origines, natures ou conséquences,
                    résultant de l'accès de quiconque au site ou de l'impossibilité d'y accéder</li>
                <li>Pour l'utilisation du site ou du crédit accordé à une information obtenue directement ou indirectement du site</li>
                <li>Pour toute décision prise sur la base des informations contenues sur le site</li>
              </ul>

              <p className="mt-4">
                Les informations publiées sur le site à caractère technique ou informatif ne sauraient
                en aucun cas se substituer à une consultation professionnelle personnalisée.
              </p>
            </section>

            {/* Section 11 */}
            <section id="liens" aria-labelledby="liens-title">
              <h2 id="liens-title" className="text-2xl font-bold text-ipb-text mb-4 flex items-center gap-3">
                <FileText size={24} className="text-ipb-orange" aria-hidden="true" />
                11. Liens hypertextes
              </h2>

              <p>
                Le site peut contenir des liens hypertextes vers d'autres sites internet. IPB n'exerce
                aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu ou aux
                éventuels collectes et traitements de données personnelles effectués par ces sites.
              </p>

              <p className="mt-4">
                La mise en place de liens hypertextes vers le site www.ipb-expertise.fr est autorisée
                sans accord préalable, sous réserve de ne pas utiliser la technique du "framing" ou du
                "deep linking" et de mentionner la source.
              </p>
            </section>

            {/* Section 12 */}
            <section id="litige" aria-labelledby="litige-title">
              <h2 id="litige-title" className="text-2xl font-bold text-ipb-text mb-4 flex items-center gap-3">
                <Gavel size={24} className="text-ipb-orange" aria-hidden="true" />
                12. Règlement des litiges et droit applicable
              </h2>

              <p>
                Les présentes mentions légales sont régies par le droit français.
              </p>

              <p className="mt-4">
                En cas de litige relatif à l'interprétation ou l'exécution des présentes, les parties
                s'efforceront de trouver une solution amiable. À défaut, le litige sera porté devant
                les tribunaux compétents du ressort du siège d'IPB.
              </p>

              <div className="mt-6 bg-ipb-cream rounded-xl p-6 border border-ipb-rule">
                <h3 className="font-bold text-ipb-text mb-3">Médiation de la consommation</h3>
                <p className="text-ipb-text">
                  Conformément aux articles L. 612-1 et suivants du Code de la consommation, en cas de
                  litige non résolu après réclamation écrite préalable, le consommateur peut recourir
                  gratuitement à un médiateur de la consommation. La liste des médiateurs agréés est
                  consultable sur le site officiel{' '}
                  <a href="https://www.economie.gouv.fr/mediation-conso" target="_blank" rel="noopener noreferrer"
                     className="text-ipb-orange hover:underline">economie.gouv.fr/mediation-conso</a>.
                </p>
              </div>

              <div className="mt-6 bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r-lg">
                <p className="text-blue-800">
                  <strong>Plateforme européenne de règlement en ligne des litiges (RLL) :</strong><br />
                  Conformément à l'article 14 du Règlement (UE) n° 524/2013, la Commission européenne
                  met à disposition une plateforme de résolution des litiges en ligne :
                  <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer"
                     className="text-blue-600 hover:underline ml-1">ec.europa.eu/consumers/odr</a>
                </p>
              </div>
            </section>

          </article>

          {/* Date de dernière mise à jour */}
          <footer className="mt-12 pt-8 border-t border-ipb-rule">
            <p className="text-sm text-ipb-muted text-center">
              Dernière mise à jour de ces mentions légales : <time dateTime="2026-05-24">24 mai 2026</time>
            </p>
          </footer>
        </div>
      </main>

      <Footer />
    </div>
  );
}
