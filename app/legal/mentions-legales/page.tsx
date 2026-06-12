import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { SmartBackBar } from "@/components/ui/SmartBackBar";
import { Footer } from '@/components/home/Footer';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { Calendar, Scale, Shield, Building2, Server, Mail, Phone, FileText, AlertCircle, Gavel, Handshake, AlertTriangle, Globe } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Mentions Légales · IPB',
  description: "Mentions légales de l'Institut de Pathologie du Bâtiment (IPB). Éditeur, hébergeur, réseau de partenaires, assurances, RGPD et cookies.",
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

          {/* Avertissement légal — à conserver tant que le document n'a pas été relu par un avocat */}
          <div className="mb-8 bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg" role="note">
            <p className="font-bold text-amber-900 mb-1 flex items-center gap-2">
              <AlertTriangle size={18} aria-hidden="true" />
              Modèle à faire valider par un avocat avant publication
            </p>
            <p className="text-amber-900 text-sm">
              Les présentes mentions légales constituent un modèle rédigé sur la base du modèle
              économique décrit par l'exploitant. Elles doivent être relues et validées par un
              avocat spécialisé en droit du numérique et droit de la consommation avant toute mise
              en ligne définitive.
            </p>
          </div>

          {/* En-tête */}
          <header className="mb-8 pb-6 border-b border-ipb-rule">
            <div className="flex items-center gap-2 text-sm text-ipb-muted mb-4">
              <Calendar size={16} aria-hidden="true" />
              <time dateTime="2026-06-12">Mis à jour le 12 juin 2026</time>
            </div>
            <h1 id="page-title" className="text-3xl md:text-4xl font-extrabold text-ipb-text mb-4">
              Mentions Légales
            </h1>
            <p className="text-lg text-ipb-muted leading-relaxed">
              Conformément aux dispositions des articles 6-III et 19 de la Loi n° 2004-575 du 21
              juin 2004 pour la Confiance dans l'économie numérique (LCEN), nous portons à la
              connaissance des utilisateurs et visiteurs du site les informations suivantes.
            </p>
          </header>

          {/* Table des matières */}
          <nav aria-labelledby="toc-title" className="mb-10 p-6 bg-ipb-cream rounded-xl border border-ipb-rule">
            <h2 id="toc-title" className="font-bold text-ipb-text mb-4 flex items-center gap-2">
              <FileText size={18} aria-hidden="true" />
              Sommaire
            </h2>
            <ol className="space-y-2 text-sm">
              <li><a href="#editeur" className="text-ipb-orange hover:underline">1. Éditeur du site</a></li>
              <li><a href="#directeur" className="text-ipb-orange hover:underline">2. Directeur de la publication</a></li>
              <li><a href="#hebergeur" className="text-ipb-orange hover:underline">3. Hébergeur</a></li>
              <li><a href="#contact" className="text-ipb-orange hover:underline">4. Coordonnées de contact</a></li>
              <li><a href="#activite" className="text-ipb-orange hover:underline">5. Activité et positionnement</a></li>
              <li><a href="#partenaires" className="text-ipb-orange hover:underline">6. Réseau de partenaires d'exécution</a></li>
              <li><a href="#assurances" className="text-ipb-orange hover:underline">7. Assurances professionnelles</a></li>
              <li><a href="#propriete" className="text-ipb-orange hover:underline">8. Propriété intellectuelle</a></li>
              <li><a href="#donnees" className="text-ipb-orange hover:underline">9. Protection des données personnelles (RGPD)</a></li>
              <li><a href="#cookies" className="text-ipb-orange hover:underline">10. Gestion des cookies</a></li>
              <li><a href="#responsabilite" className="text-ipb-orange hover:underline">11. Limitation de responsabilité</a></li>
              <li><a href="#liens" className="text-ipb-orange hover:underline">12. Liens hypertextes</a></li>
              <li><a href="#litige" className="text-ipb-orange hover:underline">13. Règlement des litiges et droit applicable</a></li>
            </ol>
          </nav>

          {/* Contenu */}
          <article className="prose prose-lg max-w-none space-y-10 text-ipb-text">

            {/* Section 1 — Éditeur */}
            <section id="editeur" aria-labelledby="editeur-title">
              <h2 id="editeur-title" className="text-2xl font-bold text-ipb-text mb-4 flex items-center gap-3">
                <Building2 size={24} className="text-ipb-orange" aria-hidden="true" />
                1. Éditeur du site
              </h2>
              {/* À MODIFIER LORS DE LA BASCULE EN SAS : forme juridique, dénomination, SIREN/SIRET, RCS, capital, représentant légal */}
              <div className="bg-ipb-cream rounded-xl p-6 border border-ipb-rule">
                <dl className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:gap-4">
                    <dt className="font-bold text-ipb-text sm:w-56">Enseigne :</dt>
                    <dd>IPB · Institut de Pathologie du Bâtiment</dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:gap-4">
                    <dt className="font-bold text-ipb-text sm:w-56">Exploitant :</dt>
                    <dd>Yusra Grada</dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:gap-4">
                    <dt className="font-bold text-ipb-text sm:w-56">Forme juridique :</dt>
                    <dd>Entrepreneur individuel (micro-entreprise)</dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:gap-4">
                    <dt className="font-bold text-ipb-text sm:w-56">Siège légal :</dt>
                    <dd>13 rue Fernand Léger, 31170 Tournefeuille, France</dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:gap-4">
                    <dt className="font-bold text-ipb-text sm:w-56">Bureaux administratifs :</dt>
                    <dd>54 avenue Jean Jaurès, 31170 Tournefeuille, France <span className="text-sm text-ipb-muted">(non ouvert au public sans rendez-vous)</span></dd>
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
                    <dd>Inscrit au Registre National des Entreprises (RNE)</dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:gap-4">
                    <dt className="font-bold text-ipb-text sm:w-56">Code APE/NAF :</dt>
                    <dd>70.22Z — Conseil pour les affaires et autres conseils de gestion</dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:gap-4">
                    <dt className="font-bold text-ipb-text sm:w-56">Régime TVA :</dt>
                    <dd>Franchise en base — <em>TVA non applicable, article 293 B du Code général des impôts</em></dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:gap-4">
                    <dt className="font-bold text-ipb-text sm:w-56">Téléphone :</dt>
                    <dd><a href="tel:+33582953375" className="text-ipb-orange hover:underline">05 82 95 33 75</a></dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:gap-4">
                    <dt className="font-bold text-ipb-text sm:w-56">Email :</dt>
                    <dd><a href="mailto:contact@ipb-expertise.fr" className="text-ipb-orange hover:underline">contact@ipb-expertise.fr</a></dd>
                  </div>
                </dl>
              </div>
            </section>

            {/* Section 2 — Directeur de publication */}
            <section id="directeur" aria-labelledby="directeur-title">
              <h2 id="directeur-title" className="text-2xl font-bold text-ipb-text mb-4 flex items-center gap-3">
                <Scale size={24} className="text-ipb-orange" aria-hidden="true" />
                2. Directeur de la publication
              </h2>
              <p>
                Conformément à l'article 93-2 de la loi n° 82-652 du 29 juillet 1982, le directeur
                de la publication du site <strong>www.ipb-expertise.fr</strong> est :
              </p>
              <div className="mt-4 bg-ipb-cream rounded-xl p-4 border border-ipb-rule">
                <p><strong>Yusra Grada</strong>, exploitante de l'entreprise individuelle IPB.</p>
                <p className="mt-2 text-sm">Contact : <a href="mailto:contact@ipb-expertise.fr" className="text-ipb-orange hover:underline">contact@ipb-expertise.fr</a></p>
              </div>
              <p className="mt-4">
                Le directeur de la publication assume la responsabilité éditoriale de l'ensemble des
                contenus publiés sur le site.
              </p>
              {/* À MODIFIER LORS DE LA BASCULE EN SAS : nommer le représentant légal de la SAS (président) comme directeur de publication */}
            </section>

            {/* Section 3 — Hébergeur */}
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
                    <dt className="font-bold text-ipb-text sm:w-48">Téléphone :</dt>
                    <dd>+1 (559) 288-7060</dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:gap-4">
                    <dt className="font-bold text-ipb-text sm:w-48">Site web :</dt>
                    <dd>
                      <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-ipb-orange hover:underline">
                        https://vercel.com
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="mt-6 bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r-lg">
                <p className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                  <Globe size={18} aria-hidden="true" />
                  Transfert de données hors Union européenne
                </p>
                <p className="text-blue-800">
                  L'hébergeur Vercel Inc. étant établi aux États-Unis, l'hébergement du site est
                  susceptible d'entraîner un transfert de données personnelles hors de l'Union
                  européenne. Ce transfert est encadré conformément au chapitre V du RGPD :
                  Vercel Inc. est certifiée au titre du <strong>EU–U.S. Data Privacy Framework
                  (DPF)</strong>, mécanisme reconnu par la décision d'adéquation de la Commission
                  européenne du 10 juillet 2023. À défaut, des clauses contractuelles types (CCT)
                  adoptées par la Commission européenne sont mises en œuvre afin de garantir un
                  niveau de protection adéquat.
                </p>
              </div>

              <p className="mt-4 text-sm text-ipb-muted">
                L'hébergement est assuré sur des serveurs sécurisés disposant d'un certificat SSL
                (HTTPS) garantissant le chiffrement des données échangées entre l'utilisateur et le
                serveur.
              </p>
            </section>

            {/* Section 4 — Coordonnées */}
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
                  <a href="tel:+33582953375" className="text-ipb-orange hover:underline font-bold text-lg">
                    05 82 95 33 75
                  </a>
                </div>
                <div className="bg-ipb-stone rounded-xl p-4 border border-ipb-rule">
                  <div className="flex items-center gap-2 mb-2">
                    <Mail size={18} className="text-ipb-orange" aria-hidden="true" />
                    <span className="font-bold text-ipb-text">Email</span>
                  </div>
                  <a href="mailto:contact@ipb-expertise.fr" className="text-ipb-orange hover:underline font-bold break-all">
                    contact@ipb-expertise.fr
                  </a>
                </div>
              </div>
            </section>

            {/* Section 5 — Activité */}
            <section id="activite" aria-labelledby="activite-title">
              <h2 id="activite-title" className="text-2xl font-bold text-ipb-text mb-4 flex items-center gap-3">
                <Building2 size={24} className="text-ipb-orange" aria-hidden="true" />
                5. Activité et positionnement
              </h2>

              <p>
                IPB · Institut de Pathologie du Bâtiment est un <strong>interlocuteur unique</strong>
                qui s'appuie sur un <strong>réseau de partenaires d'exécution vérifiés et assurés</strong>
                pour répondre aux demandes des particuliers et professionnels confrontés à un
                désordre du bâtiment.
              </p>

              <p className="mt-4">
                L'activité d'IPB consiste exclusivement en une <strong>prestation de coordination</strong>,
                qui comprend :
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>la qualification de la demande du Client ;</li>
                <li>la sélection et l'organisation de l'intervention du partenaire compétent ;</li>
                <li>la mise en forme et la remise d'une note de synthèse écrite, validée préalablement par le partenaire ;</li>
                <li>l'aide aux démarches du Client ;</li>
                <li>l'accompagnement du Client pendant douze (12) mois après remise de la note de synthèse.</li>
              </ul>

              <p className="mt-4">
                IPB <strong>ne réalise aucun acte technique du bâtiment</strong> au sens des articles
                1792 et suivants du Code civil : pas de diagnostic, pas d'étude, pas de travaux, pas
                de maîtrise d'œuvre. La visite de diagnostic et les travaux éventuels sont réalisés
                par les partenaires d'exécution, sous la seule responsabilité de ces derniers.
              </p>

              <p className="mt-4">
                IPB ne se présente pas et ne doit pas être présenté comme « expert » ou
                « diagnostiqueur ».
              </p>
            </section>

            {/* Section 6 — Partenaires */}
            <section id="partenaires" aria-labelledby="partenaires-title">
              <h2 id="partenaires-title" className="text-2xl font-bold text-ipb-text mb-4 flex items-center gap-3">
                <Handshake size={24} className="text-ipb-orange" aria-hidden="true" />
                6. Réseau de partenaires d'exécution
              </h2>
              <p>
                Les partenaires sont sélectionnés par IPB selon le domaine du désordre. Chacun
                intervient sous sa propre responsabilité, sa propre RC professionnelle et sa propre
                garantie décennale, dans le cadre d'un partenariat indépendant et non solidaire avec
                IPB.
              </p>

              <div className="mt-6 grid md:grid-cols-2 gap-4">
                <div className="bg-ipb-cream rounded-xl p-6 border border-ipb-rule">
                  <h3 className="font-bold text-ipb-text mb-3">Bâti Halli</h3>
                  <dl className="space-y-2 text-sm">
                    <div><dt className="inline font-semibold">Dénomination juridique : </dt><dd className="inline">Entreprise Halli Mustapha (entreprise individuelle)</dd></div>
                    <div><dt className="inline font-semibold">SIRET : </dt><dd className="inline">398 185 421 00037</dd></div>
                    <div><dt className="inline font-semibold">Commune : </dt><dd className="inline">Toulouse (31)</dd></div>
                    <div><dt className="inline font-semibold">Code NAF : </dt><dd className="inline">43.99C — Autres travaux spécialisés de construction</dd></div>
                    <div className="mt-2 pt-2 border-t border-ipb-rule"><dt className="inline font-semibold">Domaines d'intervention : </dt><dd className="inline">pathologies structurelles, fissures, maçonnerie, gros œuvre.</dd></div>
                  </dl>
                </div>
                <div className="bg-ipb-cream rounded-xl p-6 border border-ipb-rule">
                  <h3 className="font-bold text-ipb-text mb-3">TOI MON TOIT</h3>
                  <dl className="space-y-2 text-sm">
                    <div><dt className="inline font-semibold">Dénomination juridique : </dt><dd className="inline">TOI MON TOIT, SAS</dd></div>
                    <div><dt className="inline font-semibold">RCS : </dt><dd className="inline">Toulouse 979 947 587</dd></div>
                    <div><dt className="inline font-semibold">SIRET : </dt><dd className="inline">979 947 587 00015</dd></div>
                    <div><dt className="inline font-semibold">Siège social : </dt><dd className="inline">60 chemin de Baluffet, 31300 Toulouse</dd></div>
                    <div className="mt-2 pt-2 border-t border-ipb-rule"><dt className="inline font-semibold">Domaines d'intervention : </dt><dd className="inline">humidité, toiture, charpente, couverture.</dd></div>
                  </dl>
                </div>
              </div>

              <p className="mt-4 text-sm text-ipb-muted">
                Les attestations d'assurance (RC professionnelle et garantie décennale) en cours de
                validité de chaque partenaire sont remises au Client préalablement à toute
                intervention ou sur simple demande.
              </p>
            </section>

            {/* Section 7 — Assurances */}
            <section id="assurances" aria-labelledby="assurances-title">
              <h2 id="assurances-title" className="text-2xl font-bold text-ipb-text mb-4 flex items-center gap-3">
                <Shield size={24} className="text-ipb-orange" aria-hidden="true" />
                7. Assurances professionnelles
              </h2>

              <div className="space-y-4">
                <div className="bg-ipb-cream border border-ipb-rule rounded-xl p-6">
                  <h3 className="font-bold text-ipb-text mb-3">Responsabilité Civile Professionnelle d'IPB</h3>
                  <p>
                    IPB est titulaire d'une assurance Responsabilité Civile Professionnelle au titre
                    de sa <strong>prestation de coordination</strong>. Les références de cette police
                    (assureur, numéro, garanties, étendue géographique) sont communiquées sur simple
                    demande à <a href="mailto:contact@ipb-expertise.fr" className="text-ipb-orange hover:underline">contact@ipb-expertise.fr</a>.
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                  <h3 className="font-bold text-blue-900 mb-3">RC professionnelle et garantie décennale des partenaires d'exécution</h3>
                  <p className="text-blue-800">
                    Chaque partenaire est titulaire de sa propre assurance Responsabilité Civile
                    Professionnelle (couvrant notamment la visite de diagnostic, y compris non
                    facturée) et de sa propre <strong>garantie décennale</strong> au titre des
                    articles 1792 et suivants du Code civil et de l'article L. 241-1 du Code des
                    assurances. Les attestations en cours de validité sont communiquées au Client
                    <strong> avec le devis travaux du partenaire concerné</strong>, ou sur simple
                    demande.
                  </p>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                  <h3 className="font-bold text-green-900 mb-3">Assurance dommages-ouvrage (Client)</h3>
                  <p className="text-green-800">
                    Pour les travaux soumis à l'obligation d'assurance décennale, le Client est
                    informé qu'il dispose, en application des articles L. 242-1 et suivants du Code
                    des assurances, de la faculté de souscrire une <strong>assurance
                    dommages-ouvrage</strong> afin d'obtenir, hors recherche de responsabilité, le
                    préfinancement rapide des réparations relevant de la décennale.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 8 — Propriété intellectuelle */}
            <section id="propriete" aria-labelledby="propriete-title">
              <h2 id="propriete-title" className="text-2xl font-bold text-ipb-text mb-4 flex items-center gap-3">
                <FileText size={24} className="text-ipb-orange" aria-hidden="true" />
                8. Propriété intellectuelle
              </h2>
              <p>
                L'ensemble des éléments constituant le site <strong>www.ipb-expertise.fr</strong>
                (textes, photographies, illustrations, logos, graphismes, icônes, base de données,
                structure du site) est protégé par les dispositions du Code de la propriété
                intellectuelle, notamment les articles L. 111-1 et suivants relatifs au droit
                d'auteur et L. 713-1 et suivants relatifs au droit des marques.
              </p>

              <div className="mt-6 bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg">
                <p className="font-bold text-amber-900 mb-2 flex items-center gap-2">
                  <AlertCircle size={18} aria-hidden="true" />
                  Interdictions
                </p>
                <p className="text-amber-800">
                  Toute reproduction, représentation, modification, publication, transmission,
                  dénaturation, totale ou partielle du site ou de son contenu, par quelque procédé
                  que ce soit et sur quelque support que ce soit, est interdite sans l'autorisation
                  écrite préalable d'IPB.
                </p>
              </div>

              <p className="mt-4">
                Toute exploitation non autorisée du site ou de son contenu engagerait la
                responsabilité de l'utilisateur et constituerait une contrefaçon sanctionnée par les
                articles L. 335-2 et suivants du Code de la propriété intellectuelle.
              </p>
            </section>

            {/* Section 9 — RGPD */}
            <section id="donnees" aria-labelledby="donnees-title">
              <h2 id="donnees-title" className="text-2xl font-bold text-ipb-text mb-4 flex items-center gap-3">
                <Shield size={24} className="text-ipb-orange" aria-hidden="true" />
                9. Protection des données personnelles (RGPD)
              </h2>

              <p>
                Conformément au Règlement (UE) 2016/679 du 27 avril 2016 (RGPD) et à la loi n° 78-17
                du 6 janvier 1978 modifiée relative à l'informatique, aux fichiers et aux libertés,
                IPB met en œuvre les traitements suivants.
              </p>

              <div className="mt-6 space-y-4">
                <div className="bg-ipb-cream rounded-xl p-6 border border-ipb-rule">
                  <h3 className="font-bold text-ipb-text mb-3">Responsable du traitement</h3>
                  <p>IPB · Institut de Pathologie du Bâtiment</p>
                  <p>Yusra Grada, exploitante</p>
                  <p>13 rue Fernand Léger, 31170 Tournefeuille</p>
                  <p>SIRET 908 995 103 00029</p>
                  <p>Contact : <a href="mailto:contact@ipb-expertise.fr" className="text-ipb-orange hover:underline">contact@ipb-expertise.fr</a></p>
                </div>

                <div className="bg-ipb-cream rounded-xl p-6 border border-ipb-rule">
                  <h3 className="font-bold text-ipb-text mb-3">Finalités et bases légales</h3>
                  <ul className="space-y-2 text-ipb-text">
                    <li><strong>Réponse aux demandes via le formulaire de contact / de diagnostic</strong> — base légale : exécution de mesures précontractuelles à la demande de la personne concernée (art. 6.1.b RGPD).</li>
                    <li><strong>Exécution de la prestation de coordination</strong> (qualification, transmission au partenaire, suivi du dossier, note de synthèse, accompagnement 12 mois) — base légale : exécution du contrat (art. 6.1.b RGPD).</li>
                    <li><strong>Obligations comptables et conservation</strong> — base légale : obligation légale (art. 6.1.c RGPD).</li>
                    <li><strong>Mesure d'audience et amélioration du site</strong> (Google Analytics) — base légale : consentement (art. 6.1.a RGPD).</li>
                    <li><strong>Prise de rendez-vous en ligne</strong> (Calendly) — base légale : consentement (art. 6.1.a RGPD).</li>
                  </ul>
                </div>

                <div className="bg-ipb-cream rounded-xl p-6 border border-ipb-rule">
                  <h3 className="font-bold text-ipb-text mb-3">Catégories de données collectées</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>identification : nom, prénom, email, téléphone, adresse du bien concerné ;</li>
                    <li>contenu de la demande : description du désordre, photographies, plans, antécédents éventuels (sinistres déclarés, diagnostics antérieurs) ;</li>
                    <li>données de navigation : adresse IP, pages visitées, dates et durées de visite, identifiants de cookies (sous réserve du consentement).</li>
                  </ul>
                </div>

                <div className="bg-ipb-cream rounded-xl p-6 border border-ipb-rule">
                  <h3 className="font-bold text-ipb-text mb-3">Destinataires des données</h3>
                  <p className="mb-3">
                    Les destinataires des données traitées par IPB sont, selon les besoins du dossier :
                  </p>
                  <ul className="space-y-2 text-ipb-text">
                    <li><strong>IPB</strong> — personnel autorisé (coordination du dossier, accompagnement Client).</li>
                    <li><strong>Bâti Halli</strong> (Entreprise Halli Mustapha, SIRET 398 185 421 00037, Toulouse) — partenaire d'exécution pour les pathologies structurelles, fissures, maçonnerie et gros œuvre.</li>
                    <li><strong>TOI MON TOIT</strong> (SAS, RCS Toulouse 979 947 587, SIRET 979 947 587 00015, 60 chemin de Baluffet, 31300 Toulouse) — partenaire d'exécution pour humidité, toiture, charpente et couverture.</li>
                    <li><strong>Hébergeur Vercel Inc.</strong> — pour le fonctionnement technique du site (cf. encadré « Transfert de données hors UE » en section 3).</li>
                    <li><strong>Prestataires de mesure d'audience et de prise de rendez-vous</strong> (Google Analytics, Calendly), sous réserve du consentement de l'utilisateur.</li>
                  </ul>
                  <p className="mt-3 text-sm text-ipb-muted">
                    Les données ne sont jamais cédées ni revendues à des tiers à des fins
                    commerciales.
                  </p>
                </div>

                <div className="bg-ipb-cream rounded-xl p-6 border border-ipb-rule">
                  <h3 className="font-bold text-ipb-text mb-3">Transferts hors Union européenne</h3>
                  <p>
                    Certains sous-traitants techniques (hébergeur Vercel, Google Analytics, Calendly)
                    sont susceptibles de traiter des données depuis ou via les États-Unis. Ces
                    transferts sont encadrés conformément au <strong>chapitre V du RGPD</strong> :
                    décision d'adéquation EU–U.S. Data Privacy Framework du 10 juillet 2023 et/ou
                    clauses contractuelles types (CCT) adoptées par la Commission européenne.
                  </p>
                </div>

                <div className="bg-ipb-cream rounded-xl p-6 border border-ipb-rule">
                  <h3 className="font-bold text-ipb-text mb-3">Durée de conservation</h3>
                  <ul className="space-y-2 text-ipb-text">
                    <li><strong>Données prospects (formulaires sans suite) :</strong> 3 ans à compter du dernier contact.</li>
                    <li><strong>Données clients :</strong> durée de la relation contractuelle + 5 ans (prescription civile).</li>
                    <li><strong>Documents comptables :</strong> 10 ans (obligation légale).</li>
                    <li><strong>Cookies de mesure d'audience :</strong> 13 mois maximum.</li>
                  </ul>
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
                    <li>• Droit de retirer son consentement à tout moment</li>
                    <li>• Droit de définir des directives post-mortem</li>
                  </ul>
                  <p className="mt-4 text-sm">
                    Pour exercer ces droits : <a href="mailto:contact@ipb-expertise.fr" className="text-ipb-orange hover:underline">contact@ipb-expertise.fr</a>. Une preuve d'identité peut être demandée en cas de doute raisonnable sur l'identité du demandeur.
                  </p>
                </div>
              </div>

              <p className="mt-6">
                En cas de réclamation, vous pouvez également saisir la Commission Nationale de
                l'Informatique et des Libertés (CNIL) : <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-ipb-orange hover:underline">www.cnil.fr</a> — 3 place de Fontenoy, TSA 80715, 75334 Paris Cedex 07.
              </p>

              <p className="mt-4">
                Pour plus de détails, consultez notre <Link href="/legal/confidentialite" className="text-ipb-orange hover:underline font-bold">politique de confidentialité</Link>.
              </p>
            </section>

            {/* Section 10 — Cookies */}
            <section id="cookies" aria-labelledby="cookies-title">
              <h2 id="cookies-title" className="text-2xl font-bold text-ipb-text mb-4 flex items-center gap-3">
                <FileText size={24} className="text-ipb-orange" aria-hidden="true" />
                10. Gestion des cookies
              </h2>
              <p>
                Un cookie est un fichier texte déposé sur votre terminal (ordinateur, tablette,
                smartphone) lors de la visite d'un site internet.
              </p>

              <div className="mt-6 bg-ipb-cream rounded-xl p-6 border border-ipb-rule">
                <h3 className="font-bold text-ipb-text mb-3">Types de cookies utilisés</h3>
                <ul className="space-y-3 text-ipb-text">
                  <li>
                    <strong>Cookies strictement nécessaires :</strong> essentiels au fonctionnement
                    du site (session, mémorisation du choix de consentement). Ils ne nécessitent pas
                    votre consentement préalable.
                  </li>
                  <li>
                    <strong>Cookies de mesure d'audience (Google Analytics) :</strong> permettent de
                    mesurer l'audience du site et d'améliorer son fonctionnement. Ces cookies sont
                    déposés <strong>uniquement après recueil de votre consentement préalable</strong>
                    via le bandeau dédié, conformément à l'article 82 de la loi Informatique et
                    Libertés et aux lignes directrices de la CNIL.
                  </li>
                  <li>
                    <strong>Cookies tiers de prise de rendez-vous (Calendly) :</strong> déposés
                    <strong> uniquement après recueil de votre consentement préalable</strong>, lors
                    de l'utilisation du module de réservation en ligne.
                  </li>
                </ul>
              </div>

              <p className="mt-4">
                Vous pouvez à tout moment retirer ou modifier votre consentement via le bandeau de
                gestion des cookies accessible depuis le pied de page, ou via les paramètres de
                votre navigateur.
              </p>
            </section>

            {/* Section 11 — Limitation de responsabilité */}
            <section id="responsabilite" aria-labelledby="responsabilite-title">
              <h2 id="responsabilite-title" className="text-2xl font-bold text-ipb-text mb-4 flex items-center gap-3">
                <AlertCircle size={24} className="text-ipb-orange" aria-hidden="true" />
                11. Limitation de responsabilité
              </h2>

              <p>
                IPB s'efforce d'assurer au mieux l'exactitude et la mise à jour des informations
                diffusées sur le site. Toutefois, IPB ne peut garantir l'exactitude, la précision
                ou l'exhaustivité des informations mises à disposition.
              </p>

              <p className="mt-4">En conséquence, IPB décline toute responsabilité :</p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>pour toute imprécision, inexactitude ou omission portant sur des informations disponibles sur le site ;</li>
                <li>pour tous dommages, directs ou indirects, résultant de l'accès au site ou de l'impossibilité d'y accéder ;</li>
                <li>pour toute décision prise sur la base des informations contenues sur le site.</li>
              </ul>

              <p className="mt-4">
                Les informations publiées sur le site à caractère technique ou informatif ne sauraient
                en aucun cas se substituer à une consultation professionnelle personnalisée, à un
                rapport de bureau d'études structure, à un rapport d'expertise judiciaire ou
                d'assurance.
              </p>
            </section>

            {/* Section 12 — Liens hypertextes */}
            <section id="liens" aria-labelledby="liens-title">
              <h2 id="liens-title" className="text-2xl font-bold text-ipb-text mb-4 flex items-center gap-3">
                <FileText size={24} className="text-ipb-orange" aria-hidden="true" />
                12. Liens hypertextes
              </h2>

              <p>
                Le site peut contenir des liens hypertextes vers d'autres sites internet. IPB n'exerce
                aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu ou
                aux éventuelles collectes et traitements de données personnelles effectués par ces
                sites.
              </p>

              <p className="mt-4">
                La mise en place de liens hypertextes vers le site www.ipb-expertise.fr est autorisée
                sans accord préalable, sous réserve de ne pas utiliser la technique du « framing »
                ou du « deep linking » et de mentionner clairement la source.
              </p>
            </section>

            {/* Section 13 — Litige */}
            <section id="litige" aria-labelledby="litige-title">
              <h2 id="litige-title" className="text-2xl font-bold text-ipb-text mb-4 flex items-center gap-3">
                <Gavel size={24} className="text-ipb-orange" aria-hidden="true" />
                13. Règlement des litiges et droit applicable
              </h2>

              <p>Les présentes mentions légales sont régies par le droit français.</p>

              <p className="mt-4">
                En cas de litige relatif à l'interprétation ou à l'exécution des présentes, les
                parties s'efforceront de trouver une solution amiable. À défaut, le règlement des
                litiges contractuels relève des conditions prévues par les
                <Link href="/legal/cgv" className="text-ipb-orange hover:underline"> Conditions
                Générales de Vente</Link> (articles relatifs au droit applicable, à la médiation de
                la consommation et à la compétence juridictionnelle, avec distinction entre Client
                consommateur et Client professionnel).
              </p>

              <div className="mt-6 bg-ipb-cream rounded-xl p-6 border border-ipb-rule">
                <h3 className="font-bold text-ipb-text mb-3">Médiation de la consommation</h3>
                <p className="text-ipb-text">
                  Conformément aux articles L. 612-1 et suivants du Code de la consommation, le
                  Client consommateur peut, après réclamation écrite préalable restée infructueuse,
                  recourir gratuitement à un médiateur de la consommation. <strong>La désignation du
                  médiateur est en cours de contractualisation</strong> ; ses coordonnées seront
                  publiées ici dès finalisation.
                </p>
                <p className="text-ipb-text mt-3 text-sm">
                  Dans l'attente, la liste des médiateurs agréés est consultable sur le site officiel{' '}
                  <a href="https://www.economie.gouv.fr/mediation-conso" target="_blank" rel="noopener noreferrer" className="text-ipb-orange hover:underline">economie.gouv.fr/mediation-conso</a>.
                </p>
              </div>

              <div className="mt-6 bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r-lg">
                <p className="text-blue-800">
                  <strong>Plateforme européenne de règlement en ligne des litiges (RLL) :</strong><br />
                  Conformément à l'article 14 du Règlement (UE) n° 524/2013, la Commission européenne
                  met à disposition une plateforme de résolution des litiges en ligne :{' '}
                  <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">ec.europa.eu/consumers/odr</a>.
                </p>
              </div>
            </section>

          </article>

          {/* Date de dernière mise à jour */}
          <footer className="mt-12 pt-8 border-t border-ipb-rule">
            <p className="text-sm text-ipb-muted text-center">
              Dernière mise à jour des présentes mentions légales : <time dateTime="2026-06-12">12 juin 2026</time>
            </p>
          </footer>
        </div>
      </main>

      <Footer />
    </div>
  );
}
