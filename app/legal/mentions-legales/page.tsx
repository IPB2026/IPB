import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { Footer } from '@/components/home/Footer';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { Calendar, Scale, Shield, Building2, Server, Mail, Phone, MapPin, FileText, AlertCircle, Gavel } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Mentions Légales - IPB Institut de Pathologie du Bâtiment',
  description: 'Mentions légales complètes de l\'Institut de Pathologie du Bâtiment (IPB) - MGRCP31. Informations légales, protection des données, propriété intellectuelle.',
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
              { label: 'Mentions Légales' }
            ]} />
          </nav>

          {/* En-tête */}
          <header className="mb-8 pb-6 border-b border-slate-200">
            <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
              <Calendar size={16} aria-hidden="true" />
              <time dateTime="2026-02-01">Mis à jour le 1er février 2026</time>
            </div>
            <h1 id="page-title" className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
              Mentions Légales
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              Conformément aux dispositions des articles 6-III et 19 de la Loi n° 2004-575 du 21 juin 2004 
              pour la Confiance dans l'économie numérique, dite L.C.E.N., nous portons à la connaissance 
              des utilisateurs et visiteurs du site les informations suivantes.
            </p>
          </header>

          {/* Table des matières */}
          <nav aria-labelledby="toc-title" className="mb-10 p-6 bg-slate-50 rounded-xl border border-slate-200">
            <h2 id="toc-title" className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <FileText size={18} aria-hidden="true" />
              Sommaire
            </h2>
            <ol className="space-y-2 text-sm">
              <li><a href="#editeur" className="text-orange-600 hover:text-orange-700 hover:underline focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded">1. Éditeur du site et identification de l'entreprise</a></li>
              <li><a href="#directeur" className="text-orange-600 hover:text-orange-700 hover:underline focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded">2. Directeur de la publication</a></li>
              <li><a href="#hebergeur" className="text-orange-600 hover:text-orange-700 hover:underline focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded">3. Hébergeur</a></li>
              <li><a href="#contact" className="text-orange-600 hover:text-orange-700 hover:underline focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded">4. Coordonnées de contact</a></li>
              <li><a href="#activite" className="text-orange-600 hover:text-orange-700 hover:underline focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded">5. Activité professionnelle et qualifications</a></li>
              <li><a href="#assurances" className="text-orange-600 hover:text-orange-700 hover:underline focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded">6. Assurances professionnelles</a></li>
              <li><a href="#propriete" className="text-orange-600 hover:text-orange-700 hover:underline focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded">7. Propriété intellectuelle</a></li>
              <li><a href="#donnees" className="text-orange-600 hover:text-orange-700 hover:underline focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded">8. Protection des données personnelles</a></li>
              <li><a href="#cookies" className="text-orange-600 hover:text-orange-700 hover:underline focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded">9. Gestion des cookies</a></li>
              <li><a href="#responsabilite" className="text-orange-600 hover:text-orange-700 hover:underline focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded">10. Limitation de responsabilité</a></li>
              <li><a href="#liens" className="text-orange-600 hover:text-orange-700 hover:underline focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded">11. Liens hypertextes</a></li>
              <li><a href="#litige" className="text-orange-600 hover:text-orange-700 hover:underline focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded">12. Règlement des litiges et droit applicable</a></li>
            </ol>
          </nav>

          {/* Contenu */}
          <article className="prose prose-lg max-w-none space-y-10 text-slate-700">
            
            {/* Section 1 */}
            <section id="editeur" aria-labelledby="editeur-title">
              <h2 id="editeur-title" className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <Building2 size={24} className="text-orange-600" aria-hidden="true" />
                1. Éditeur du site et identification de l'entreprise
              </h2>
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                <dl className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:gap-4">
                    <dt className="font-bold text-slate-900 sm:w-48">Dénomination sociale :</dt>
                    <dd>MGRCP31</dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:gap-4">
                    <dt className="font-bold text-slate-900 sm:w-48">Nom commercial :</dt>
                    <dd>IPB - Institut de Pathologie du Bâtiment</dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:gap-4">
                    <dt className="font-bold text-slate-900 sm:w-48">Forme juridique :</dt>
                    <dd>Société à Responsabilité Limitée (SARL) au capital de 1 000 €</dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:gap-4">
                    <dt className="font-bold text-slate-900 sm:w-48">Siège social :</dt>
                    <dd>54 avenue Jean Jaurès, 31170 Tournefeuille, France</dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:gap-4">
                    <dt className="font-bold text-slate-900 sm:w-48">SIRET :</dt>
                    <dd>951 105 881 00019</dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:gap-4">
                    <dt className="font-bold text-slate-900 sm:w-48">SIREN :</dt>
                    <dd>951 105 881</dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:gap-4">
                    <dt className="font-bold text-slate-900 sm:w-48">Code APE/NAF :</dt>
                    <dd>4399C - Travaux de maçonnerie générale et gros œuvre de bâtiment</dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:gap-4">
                    <dt className="font-bold text-slate-900 sm:w-48">RCS :</dt>
                    <dd>Toulouse B 951 105 881</dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:gap-4">
                    <dt className="font-bold text-slate-900 sm:w-48">N° TVA intracommunautaire :</dt>
                    <dd>FR 17 951 105 881</dd>
                  </div>
                </dl>
              </div>
            </section>

            {/* Section 2 */}
            <section id="directeur" aria-labelledby="directeur-title">
              <h2 id="directeur-title" className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <Scale size={24} className="text-orange-600" aria-hidden="true" />
                2. Directeur de la publication
              </h2>
              <p>
                Le directeur de la publication du site internet <strong>www.ipb-expertise.fr</strong> est 
                le représentant légal de la société MGRCP31, en sa qualité de gérant.
              </p>
              <p className="mt-4">
                Conformément à l'article 93-2 de la loi n° 82-652 du 29 juillet 1982, le directeur de la 
                publication assume la responsabilité éditoriale de l'ensemble des contenus publiés sur ce site.
              </p>
            </section>

            {/* Section 3 */}
            <section id="hebergeur" aria-labelledby="hebergeur-title">
              <h2 id="hebergeur-title" className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <Server size={24} className="text-orange-600" aria-hidden="true" />
                3. Hébergeur
              </h2>
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                <dl className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:gap-4">
                    <dt className="font-bold text-slate-900 sm:w-48">Raison sociale :</dt>
                    <dd>Vercel Inc.</dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:gap-4">
                    <dt className="font-bold text-slate-900 sm:w-48">Adresse :</dt>
                    <dd>340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis</dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:gap-4">
                    <dt className="font-bold text-slate-900 sm:w-48">Site web :</dt>
                    <dd>
                      <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" 
                         className="text-orange-600 hover:text-orange-700 underline focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded">
                        https://vercel.com
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>
              <p className="mt-4 text-sm text-slate-600">
                L'hébergement est assuré sur des serveurs sécurisés disposant d'un certificat SSL (HTTPS) 
                garantissant le chiffrement des données échangées entre l'utilisateur et le serveur.
              </p>
            </section>

            {/* Section 4 */}
            <section id="contact" aria-labelledby="contact-title">
              <h2 id="contact-title" className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <Mail size={24} className="text-orange-600" aria-hidden="true" />
                4. Coordonnées de contact
              </h2>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Phone size={18} className="text-orange-600" aria-hidden="true" />
                    <span className="font-bold text-slate-900">Téléphone</span>
                  </div>
                  <a href="tel:0582953375" className="text-orange-600 hover:text-orange-700 font-bold text-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded">
                    05 82 95 33 75
                  </a>
                </div>
                <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Mail size={18} className="text-orange-600" aria-hidden="true" />
                    <span className="font-bold text-slate-900">Email</span>
                  </div>
                  <a href="mailto:contact@ipb-expertise.fr" className="text-orange-600 hover:text-orange-700 font-bold break-all focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded">
                    contact@ipb-expertise.fr
                  </a>
                </div>
                <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin size={18} className="text-orange-600" aria-hidden="true" />
                    <span className="font-bold text-slate-900">Adresse</span>
                  </div>
                  <address className="not-italic text-slate-700 text-sm">
                    54 avenue Jean Jaurès<br />
                    31170 Tournefeuille
                  </address>
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section id="activite" aria-labelledby="activite-title">
              <h2 id="activite-title" className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <Building2 size={24} className="text-orange-600" aria-hidden="true" />
                5. Activité professionnelle et qualifications
              </h2>
              <p>
                La société MGRCP31, exerçant sous l'enseigne IPB (Institut de Pathologie du Bâtiment), 
                est spécialisée dans :
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li><strong>Le diagnostic et l'expertise</strong> des pathologies du bâtiment (fissures, humidité, désordres structurels)</li>
                <li><strong>Les travaux de stabilisation structurelle</strong> : agrafage, harpage, reprise en sous-œuvre, micropieux</li>
                <li><strong>Les traitements contre l'humidité</strong> : injection de résine hydrophobe, cuvelage, drainage, ventilation</li>
                <li><strong>La rénovation de façades</strong> : ravalement, enduit, imperméabilisation</li>
              </ul>
              <div className="mt-6 bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r-lg">
                <p className="font-bold text-blue-900 mb-2">Qualifications professionnelles</p>
                <p className="text-blue-800">
                  L'entreprise est qualifiée pour l'exercice des métiers du bâtiment conformément aux 
                  dispositions de la loi n° 96-603 du 5 juillet 1996 relative au développement et à la 
                  promotion du commerce et de l'artisanat.
                </p>
              </div>
            </section>

            {/* Section 6 */}
            <section id="assurances" aria-labelledby="assurances-title">
              <h2 id="assurances-title" className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <Shield size={24} className="text-orange-600" aria-hidden="true" />
                6. Assurances professionnelles
              </h2>
              
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                  <h3 className="font-bold text-green-900 mb-3">Garantie Décennale</h3>
                  <p className="text-green-800 mb-4">
                    Conformément à l'article L. 241-1 du Code des assurances et aux articles 1792 et suivants 
                    du Code civil, la société MGRCP31 est couverte par une assurance de responsabilité civile 
                    décennale pour l'ensemble de ses travaux de construction.
                  </p>
                  <dl className="space-y-2 text-sm">
                    <div className="flex flex-col sm:flex-row sm:gap-4">
                      <dt className="font-bold text-green-900 sm:w-40">Assureur :</dt>
                      <dd className="text-green-800">Compagnie d'assurance française agréée</dd>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:gap-4">
                      <dt className="font-bold text-green-900 sm:w-40">Couverture :</dt>
                      <dd className="text-green-800">Travaux d'agrafage, harpage, injection résine, cuvelage, reprise en sous-œuvre</dd>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:gap-4">
                      <dt className="font-bold text-green-900 sm:w-40">Zone géographique :</dt>
                      <dd className="text-green-800">France métropolitaine</dd>
                    </div>
                  </dl>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                  <h3 className="font-bold text-blue-900 mb-3">Responsabilité Civile Professionnelle (RC Pro)</h3>
                  <p className="text-blue-800">
                    La société dispose d'une assurance responsabilité civile professionnelle couvrant les 
                    dommages corporels, matériels et immatériels causés aux tiers dans le cadre de son activité.
                  </p>
                </div>
              </div>

              <p className="mt-4 text-sm text-slate-600">
                Sur simple demande, une attestation d'assurance peut être fournie au client préalablement 
                à toute intervention.
              </p>
            </section>

            {/* Section 7 */}
            <section id="propriete" aria-labelledby="propriete-title">
              <h2 id="propriete-title" className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <FileText size={24} className="text-orange-600" aria-hidden="true" />
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
                  quelque support que ce soit est interdite sans l'autorisation écrite préalable de MGRCP31.
                </p>
              </div>

              <p className="mt-4">
                Toute exploitation non autorisée du site ou de son contenu, des informations qui y sont 
                divulguées, engagerait la responsabilité de l'utilisateur et constituerait une contrefaçon 
                sanctionnée par les articles L. 335-2 et suivants du Code de la propriété intellectuelle.
              </p>

              <p className="mt-4">
                La marque « IPB », le logo et l'ensemble des signes distinctifs reproduits sur le site 
                sont la propriété exclusive de MGRCP31 ou font l'objet d'une autorisation d'utilisation.
              </p>
            </section>

            {/* Section 8 */}
            <section id="donnees" aria-labelledby="donnees-title">
              <h2 id="donnees-title" className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <Shield size={24} className="text-orange-600" aria-hidden="true" />
                8. Protection des données personnelles
              </h2>
              
              <p>
                Conformément au Règlement (UE) 2016/679 du Parlement européen et du Conseil du 27 avril 2016 
                (Règlement Général sur la Protection des Données - RGPD) et à la loi n° 78-17 du 6 janvier 1978 
                modifiée relative à l'informatique, aux fichiers et aux libertés, MGRCP31 s'engage à protéger 
                les données personnelles des utilisateurs du site.
              </p>

              <div className="mt-6 space-y-4">
                <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                  <h3 className="font-bold text-slate-900 mb-3">Responsable du traitement</h3>
                  <p>MGRCP31, représentée par son gérant</p>
                  <p>54 avenue Jean Jaurès, 31170 Tournefeuille</p>
                  <p>Email : <a href="mailto:contact@ipb-expertise.fr" className="text-orange-600 hover:underline">contact@ipb-expertise.fr</a></p>
                </div>

                <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                  <h3 className="font-bold text-slate-900 mb-3">Données collectées et finalités</h3>
                  <ul className="space-y-2 text-slate-700">
                    <li><strong>Formulaires de contact/diagnostic :</strong> nom, prénom, email, téléphone, adresse - pour répondre à vos demandes et vous recontacter</li>
                    <li><strong>Données de navigation :</strong> cookies, adresse IP, pages visitées - pour améliorer l'expérience utilisateur et les statistiques</li>
                  </ul>
                </div>

                <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                  <h3 className="font-bold text-slate-900 mb-3">Vos droits</h3>
                  <p className="mb-3">Conformément aux articles 15 à 22 du RGPD, vous disposez des droits suivants :</p>
                  <ul className="grid sm:grid-cols-2 gap-2 text-slate-700">
                    <li>• Droit d'accès</li>
                    <li>• Droit de rectification</li>
                    <li>• Droit à l'effacement (« droit à l'oubli »)</li>
                    <li>• Droit à la limitation du traitement</li>
                    <li>• Droit à la portabilité</li>
                    <li>• Droit d'opposition</li>
                  </ul>
                  <p className="mt-4 text-sm">
                    Pour exercer ces droits, contactez-nous à : <a href="mailto:contact@ipb-expertise.fr" className="text-orange-600 hover:underline">contact@ipb-expertise.fr</a>
                  </p>
                </div>

                <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                  <h3 className="font-bold text-slate-900 mb-3">Durée de conservation</h3>
                  <ul className="space-y-2 text-slate-700">
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
                className="text-orange-600 hover:underline">www.cnil.fr</a>
              </p>

              <p className="mt-4">
                Pour plus de détails, consultez notre <Link href="/legal/confidentialite" className="text-orange-600 hover:underline font-bold">
                Politique de confidentialité complète</Link>.
              </p>
            </section>

            {/* Section 9 */}
            <section id="cookies" aria-labelledby="cookies-title">
              <h2 id="cookies-title" className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <FileText size={24} className="text-orange-600" aria-hidden="true" />
                9. Gestion des cookies
              </h2>
              <p>
                Un cookie est un fichier texte déposé sur votre terminal (ordinateur, tablette, smartphone) 
                lors de la visite d'un site internet.
              </p>
              
              <div className="mt-6 space-y-4">
                <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                  <h3 className="font-bold text-slate-900 mb-3">Types de cookies utilisés</h3>
                  <ul className="space-y-3 text-slate-700">
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
              <h2 id="responsabilite-title" className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <AlertCircle size={24} className="text-orange-600" aria-hidden="true" />
                10. Limitation de responsabilité
              </h2>
              
              <p>
                MGRCP31 s'efforce d'assurer au mieux l'exactitude et la mise à jour des informations 
                diffusées sur le site. Toutefois, MGRCP31 ne peut garantir l'exactitude, la précision 
                ou l'exhaustivité des informations mises à disposition sur le site.
              </p>

              <p className="mt-4">
                En conséquence, MGRCP31 décline toute responsabilité :
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
              <h2 id="liens-title" className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <FileText size={24} className="text-orange-600" aria-hidden="true" />
                11. Liens hypertextes
              </h2>
              
              <p>
                Le site peut contenir des liens hypertextes vers d'autres sites internet. MGRCP31 n'exerce 
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
              <h2 id="litige-title" className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <Gavel size={24} className="text-orange-600" aria-hidden="true" />
                12. Règlement des litiges et droit applicable
              </h2>
              
              <p>
                Les présentes mentions légales sont régies par le droit français.
              </p>

              <p className="mt-4">
                En cas de litige relatif à l'interprétation ou l'exécution des présentes, les parties 
                s'efforceront de trouver une solution amiable. À défaut, le litige sera porté devant 
                les tribunaux compétents du ressort du siège social de MGRCP31.
              </p>

              <div className="mt-6 bg-slate-50 rounded-xl p-6 border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-3">Médiation de la consommation</h3>
                <p className="text-slate-700">
                  Conformément aux articles L. 612-1 et suivants du Code de la consommation, en cas de 
                  litige non résolu, le consommateur peut recourir gratuitement à un médiateur de la 
                  consommation. Le médiateur compétent est :
                </p>
                <p className="mt-3 font-bold text-slate-900">
                  CNPM - MÉDIATION DE LA CONSOMMATION<br />
                  <span className="font-normal text-slate-700">
                    27 avenue de la Libération, 42400 Saint-Chamond<br />
                    <a href="https://www.cnpm-mediation-consommation.eu" target="_blank" rel="noopener noreferrer" 
                       className="text-orange-600 hover:underline">www.cnpm-mediation-consommation.eu</a>
                  </span>
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
          <footer className="mt-12 pt-8 border-t border-slate-200">
            <p className="text-sm text-slate-500 text-center">
              Dernière mise à jour de ces mentions légales : <time dateTime="2026-02-01">1er février 2026</time>
            </p>
          </footer>
        </div>
      </main>

      <Footer />
    </div>
  );
}
