import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { SmartBackBar } from "@/components/ui/SmartBackBar";
import { Footer } from '@/components/home/Footer';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { Calendar, FileText, Shield, CreditCard, AlertTriangle, CheckCircle, Gavel, Building2, RotateCcw, Wrench, Handshake, Users, Info } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Conditions Générales de Vente · IPB',
  description: "Conditions générales de vente de l'Institut de Pathologie du Bâtiment (IPB). Prestation de coordination, réseau de partenaires, rétractation, responsabilités, médiation.",
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

          {/* Avertissement légal — à conserver tant que le document n'a pas été relu par un avocat */}
          <div className="mb-8 bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg" role="note">
            <p className="font-bold text-amber-900 mb-1 flex items-center gap-2">
              <AlertTriangle size={18} aria-hidden="true" />
              Modèle à faire valider par un avocat avant publication
            </p>
            <p className="text-amber-900 text-sm">
              Le présent document est un modèle rédigé sur la base du modèle économique décrit par
              l'exploitant. Il doit être relu et validé par un avocat spécialisé en droit de la
              consommation et droit de la construction avant toute mise en ligne définitive.
            </p>
          </div>

          <header className="mb-8 pb-6 border-b border-ipb-rule">
            <div className="flex items-center gap-2 text-sm text-ipb-muted mb-4">
              <Calendar size={16} aria-hidden="true" />
              <time dateTime="2026-06-12">Mis à jour le 12 juin 2026</time>
            </div>
            <h1 id="page-title" className="text-3xl md:text-4xl font-extrabold text-ipb-text mb-4">
              Conditions Générales de Vente
            </h1>
            <p className="text-lg text-ipb-muted leading-relaxed">
              Les présentes Conditions Générales de Vente (« CGV ») régissent la <strong>prestation
              de coordination</strong> proposée par IPB · Institut de Pathologie du Bâtiment
              (« IPB ») à ses clients particuliers et professionnels. IPB est un interlocuteur
              unique qui s'appuie sur un réseau de partenaires d'exécution vérifiés et assurés.
            </p>
            <div className="mt-4 bg-ipb-stone border border-ipb-rule rounded-lg p-4">
              <p className="text-sm text-orange-800">
                <strong>Important :</strong> La signature du devis de coordination implique
                l'acceptation sans réserve des présentes CGV. Le Client déclare en avoir pris
                connaissance préalablement.
              </p>
            </div>
          </header>

          <nav aria-labelledby="toc-title" className="mb-10 p-6 bg-ipb-cream rounded-xl border border-ipb-rule">
            <h2 id="toc-title" className="font-bold text-ipb-text mb-4 flex items-center gap-2">
              <FileText size={18} aria-hidden="true" />
              Sommaire des articles
            </h2>
            <ol className="grid sm:grid-cols-2 gap-2 text-sm">
              <li><a href="#article-1" className="text-ipb-orange hover:underline">Art. 1 — Identification du prestataire</a></li>
              <li><a href="#article-2" className="text-ipb-orange hover:underline">Art. 2 — Définitions</a></li>
              <li><a href="#article-3" className="text-ipb-orange hover:underline">Art. 3 — Objet et champ d'application</a></li>
              <li><a href="#article-4" className="text-ipb-orange hover:underline">Art. 4 — Prestation de coordination</a></li>
              <li><a href="#article-5" className="text-ipb-orange hover:underline">Art. 5 — Réseau de partenaires d'exécution</a></li>
              <li><a href="#article-6" className="text-ipb-orange hover:underline">Art. 6 — Visite de diagnostic par le Partenaire</a></li>
              <li><a href="#article-7" className="text-ipb-orange hover:underline">Art. 7 — Note de synthèse et limites</a></li>
              <li><a href="#article-8" className="text-ipb-orange hover:underline">Art. 8 — Devis et formation du contrat</a></li>
              <li><a href="#article-9" className="text-ipb-orange hover:underline">Art. 9 — Prix et régime de TVA</a></li>
              <li><a href="#article-10" className="text-ipb-orange hover:underline">Art. 10 — Modalités de paiement</a></li>
              <li><a href="#article-11" className="text-ipb-orange hover:underline">Art. 11 — Droit de rétractation (consommateur)</a></li>
              <li><a href="#article-12" className="text-ipb-orange hover:underline">Art. 12 — Exécution de la prestation</a></li>
              <li><a href="#article-13" className="text-ipb-orange hover:underline">Art. 13 — Obligations du Client</a></li>
              <li><a href="#article-14" className="text-ipb-orange hover:underline">Art. 14 — Accompagnement 12 mois</a></li>
              <li><a href="#article-15" className="text-ipb-orange hover:underline">Art. 15 — Travaux ultérieurs</a></li>
              <li><a href="#article-16" className="text-ipb-orange hover:underline">Art. 16 — Transparence sur la rémunération</a></li>
              <li><a href="#article-17" className="text-ipb-orange hover:underline">Art. 17 — Assurances</a></li>
              <li><a href="#article-18" className="text-ipb-orange hover:underline">Art. 18 — Responsabilités étanches</a></li>
              <li><a href="#article-19" className="text-ipb-orange hover:underline">Art. 19 — Force majeure</a></li>
              <li><a href="#article-20" className="text-ipb-orange hover:underline">Art. 20 — Données personnelles</a></li>
              <li><a href="#article-21" className="text-ipb-orange hover:underline">Art. 21 — Réclamations et médiation</a></li>
              <li><a href="#article-22" className="text-ipb-orange hover:underline">Art. 22 — Droit applicable et compétence</a></li>
              <li><a href="#article-23" className="text-ipb-orange hover:underline">Art. 23 — Dispositions générales</a></li>
              <li><a href="#annexe-1" className="text-ipb-orange hover:underline">Annexe 1 — Formulaire de rétractation</a></li>
              <li><a href="#annexe-2" className="text-ipb-orange hover:underline">Annexe 2 — Encadré d'exécution anticipée</a></li>
            </ol>
          </nav>

          <article className="prose prose-lg max-w-none space-y-10 text-ipb-text">

            {/* ---------- Article 1 — Identification ---------- */}
            <section id="article-1" aria-labelledby="article-1-title">
              <h2 id="article-1-title" className="text-2xl font-bold text-ipb-text mb-4 flex items-center gap-3">
                <Building2 size={24} className="text-ipb-orange" aria-hidden="true" />
                Article 1 — Identification du prestataire
              </h2>
              {/* À MODIFIER LORS DE LA BASCULE EN SAS : forme juridique, dénomination, SIREN/SIRET, RCS, capital, représentant légal, régime TVA */}
              <div className="bg-ipb-cream rounded-xl p-6 border border-ipb-rule">
                <dl className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:gap-4">
                    <dt className="font-bold text-ipb-text sm:w-56">Enseigne :</dt>
                    <dd>IPB · Institut de Pathologie du Bâtiment</dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:gap-4">
                    <dt className="font-bold text-ipb-text sm:w-56">Exploitant :</dt>
                    <dd>Yusra Grada, entrepreneur individuel (micro-entreprise)</dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:gap-4">
                    <dt className="font-bold text-ipb-text sm:w-56">Siège légal :</dt>
                    <dd>13 rue Fernand Léger, 31170 Tournefeuille</dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:gap-4">
                    <dt className="font-bold text-ipb-text sm:w-56">Bureaux administratifs :</dt>
                    <dd>54 avenue Jean Jaurès, 31170 Tournefeuille <span className="text-sm text-ipb-muted">(non ouvert au public sans rendez-vous)</span></dd>
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
                  <div className="flex flex-col sm:flex-row sm:gap-4">
                    <dt className="font-bold text-ipb-text sm:w-56">Site internet :</dt>
                    <dd><a href="https://www.ipb-expertise.fr" className="text-ipb-orange hover:underline">www.ipb-expertise.fr</a></dd>
                  </div>
                </dl>
              </div>
            </section>

            {/* ---------- Article 2 — Définitions ---------- */}
            <section id="article-2" aria-labelledby="article-2-title">
              <h2 id="article-2-title" className="text-2xl font-bold text-ipb-text mb-4 flex items-center gap-3">
                <FileText size={24} className="text-ipb-orange" aria-hidden="true" />
                Article 2 — Définitions
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>IPB</strong> : l'enseigne et l'exploitant identifiés à l'article 1, agissant en qualité d'interlocuteur unique et de coordinateur.</li>
                <li><strong>Client consommateur</strong> ou <strong>Client B2C</strong> : toute personne physique qui agit à des fins n'entrant pas dans le cadre de son activité commerciale, industrielle, artisanale, libérale ou agricole (art. liminaire C. conso).</li>
                <li><strong>Client professionnel</strong> ou <strong>Client B2B</strong> : toute personne physique ou morale agissant à des fins entrant dans le cadre de son activité professionnelle.</li>
                <li><strong>Prestation de coordination</strong> : prestation intellectuelle décrite à l'article 4, seule prestation facturée par IPB au Client.</li>
                <li><strong>Partenaire d'exécution</strong> : entreprise indépendante, sélectionnée par IPB selon le domaine du désordre, intervenant sous sa propre responsabilité technique, sa propre RC professionnelle et sa propre garantie décennale.</li>
                <li><strong>Visite de diagnostic</strong> : visite technique sur site, réalisée par le Partenaire d'exécution compétent dans son champ d'expertise et sous sa seule responsabilité, sans facturation au Client.</li>
                <li><strong>Note de synthèse</strong> : document écrit remis au Client par IPB, qui reprend et met en forme l'avis et les éléments transmis par le Partenaire d'exécution, validés au préalable par ce dernier. La Note de synthèse n'est pas un rapport d'expertise opposable au sens judiciaire ou assurantiel.</li>
              </ul>
            </section>

            {/* ---------- Article 3 — Objet ---------- */}
            <section id="article-3" aria-labelledby="article-3-title">
              <h2 id="article-3-title" className="text-2xl font-bold text-ipb-text mb-4 flex items-center gap-3">
                <FileText size={24} className="text-ipb-orange" aria-hidden="true" />
                Article 3 — Objet et champ d'application
              </h2>
              <p>
                <strong>3.1.</strong> Les présentes CGV ont pour objet de définir les conditions dans
                lesquelles IPB fournit au Client la prestation de coordination décrite à l'article 4.
              </p>
              <p className="mt-4">
                <strong>3.2.</strong> IPB ne réalise <strong>aucun acte technique du bâtiment</strong>
                au sens des articles 1792 et suivants du Code civil : pas de diagnostic technique,
                pas d'étude de structure, pas de maîtrise d'œuvre, pas de travaux. La visite de
                diagnostic et les éventuels travaux sont réalisés par le Partenaire d'exécution, sous
                la seule responsabilité de ce dernier (articles 5, 6 et 15).
              </p>
              <p className="mt-4">
                <strong>3.3.</strong> Les présentes CGV s'appliquent à toute commande de prestation
                de coordination, quelles que soient les clauses pouvant figurer sur les documents du
                Client. Pour les Clients professionnels, les présentes CGV prévalent sur toutes
                conditions générales d'achat éventuelles.
              </p>
              <p className="mt-4">
                <strong>3.4.</strong> Le fait pour IPB de ne pas se prévaloir à un moment donné de
                l'une quelconque des présentes CGV ne peut être interprété comme valant renonciation
                à s'en prévaloir ultérieurement.
              </p>
            </section>

            {/* ---------- Article 4 — Prestation de coordination ---------- */}
            <section id="article-4" aria-labelledby="article-4-title">
              <h2 id="article-4-title" className="text-2xl font-bold text-ipb-text mb-4 flex items-center gap-3">
                <Users size={24} className="text-ipb-orange" aria-hidden="true" />
                Article 4 — Prestation de coordination
              </h2>
              <p><strong>4.1. Contenu</strong></p>
              <p className="mt-2">La prestation de coordination, seule prestation facturée par IPB, comprend :</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>la qualification de la demande du Client (échange préalable, analyse du désordre déclaré, pré-orientation) ;</li>
                <li>la sélection du Partenaire d'exécution compétent selon le domaine du désordre (structure, humidité, toiture, etc.) ;</li>
                <li>l'organisation de la visite de diagnostic réalisée par le Partenaire, sans facturation au Client ;</li>
                <li>la mise en forme et la remise au Client d'une <strong>Note de synthèse</strong> écrite, intégrant l'avis et les éléments transmis par le Partenaire et validés au préalable par celui-ci ;</li>
                <li>l'aide aux démarches du Client (orientation vers les interlocuteurs adaptés : assureur, syndic, mairie, professionnel compétent) ;</li>
                <li>un accompagnement Client pendant douze (12) mois après remise de la Note de synthèse (article 14).</li>
              </ul>

              <p className="mt-4"><strong>4.2. Ce que la prestation de coordination n'est pas</strong></p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Elle n'est pas un diagnostic technique du bâtiment, ni une expertise judiciaire, ni une note de calcul de bureau d'études (BET), ni un rapport d'assurance.</li>
                <li>IPB ne se présente pas et ne doit pas être présenté comme « expert », ni comme « diagnostiqueur ».</li>
                <li>La Note de synthèse a une valeur d'orientation. Elle ne se substitue pas à un rapport opposable établi par un professionnel compétent (cf. article 7.3).</li>
              </ul>
            </section>

            {/* ---------- Article 5 — Réseau de partenaires ---------- */}
            <section id="article-5" aria-labelledby="article-5-title">
              <h2 id="article-5-title" className="text-2xl font-bold text-ipb-text mb-4 flex items-center gap-3">
                <Handshake size={24} className="text-ipb-orange" aria-hidden="true" />
                Article 5 — Réseau de partenaires d'exécution
              </h2>
              <p>
                IPB s'appuie sur un réseau d'entreprises partenaires indépendantes, sélectionnées
                pour leur compétence, leur expérience et leurs assurances en cours de validité.
                Chaque Partenaire intervient dans son domaine d'expertise, sous sa propre
                responsabilité technique, sa propre RC professionnelle et sa propre garantie
                décennale.
              </p>

              <div className="mt-6 grid md:grid-cols-2 gap-4">
                <div className="bg-ipb-cream rounded-xl p-6 border border-ipb-rule">
                  <h3 className="font-bold text-ipb-text mb-2">Bâti Halli</h3>
                  <p className="text-sm text-ipb-muted mb-2">Entreprise Halli Mustapha (EI) — SIRET 398 185 421 00037 — Toulouse</p>
                  <p className="text-sm">Domaines : pathologies structurelles, fissures, maçonnerie, gros œuvre.</p>
                </div>
                <div className="bg-ipb-cream rounded-xl p-6 border border-ipb-rule">
                  <h3 className="font-bold text-ipb-text mb-2">TOI MON TOIT</h3>
                  <p className="text-sm text-ipb-muted mb-2">SAS — RCS Toulouse 979 947 587 — SIRET 979 947 587 00015 — 60 chemin de Baluffet, 31300 Toulouse</p>
                  <p className="text-sm">Domaines : humidité, toiture, charpente, couverture.</p>
                </div>
              </div>

              <p className="mt-4 text-sm text-ipb-muted">
                La liste des Partenaires peut évoluer. La version applicable est celle publiée sur
                <Link href="/legal/mentions-legales" className="text-ipb-orange hover:underline"> les mentions légales</Link> à la date de la commande.
              </p>
            </section>

            {/* ---------- Article 6 — Visite par le Partenaire ---------- */}
            <section id="article-6" aria-labelledby="article-6-title">
              <h2 id="article-6-title" className="text-2xl font-bold text-ipb-text mb-4 flex items-center gap-3">
                <CheckCircle size={24} className="text-ipb-orange" aria-hidden="true" />
                Article 6 — Visite de diagnostic par le Partenaire
              </h2>
              <p>
                <strong>6.1.</strong> La visite de diagnostic est réalisée par le Partenaire d'exécution
                compétent, organisée par IPB dans le cadre de sa prestation de coordination. Elle ne donne
                lieu à <strong>aucune facturation au Client</strong>, ni par IPB, ni par le Partenaire.
              </p>
              <p className="mt-4">
                <strong>6.2.</strong> L'absence de facturation au Client n'exonère pas le Partenaire de
                sa responsabilité technique. Le Partenaire intervient sous sa propre responsabilité civile
                professionnelle et sa propre garantie décennale, qui couvrent l'intervention y compris
                lorsqu'elle n'est pas facturée.
              </p>
              <p className="mt-4">
                <strong>6.3.</strong> À l'issue de la visite, le Partenaire formule au Client un avis
                et, le cas échéant, un devis de travaux à son propre nom. Cet avis et ce devis sont
                établis sous la seule responsabilité du Partenaire.
              </p>
              <p className="mt-4">
                <strong>6.4.</strong> Le Client demeure libre d'accepter ou de refuser le devis de
                travaux émis par le Partenaire. La prestation de coordination d'IPB est due
                indépendamment de la décision du Client sur les travaux.
              </p>
            </section>

            {/* ---------- Article 7 — Note de synthèse et limites ---------- */}
            <section id="article-7" aria-labelledby="article-7-title">
              <h2 id="article-7-title" className="text-2xl font-bold text-ipb-text mb-4 flex items-center gap-3">
                <FileText size={24} className="text-ipb-orange" aria-hidden="true" />
                Article 7 — Note de synthèse et limites
              </h2>
              <p>
                <strong>7.1. Contenu.</strong> La Note de synthèse remise par IPB reprend, met en
                forme et restitue au Client les constats et l'avis du Partenaire d'exécution,
                préalablement validés par celui-ci.
              </p>
              <p className="mt-4">
                <strong>7.2. Valeur de la Note de synthèse.</strong> La Note de synthèse a une valeur
                d'orientation à destination du Client. Elle <strong>ne se substitue pas</strong> à un
                rapport opposable de bureau d'études structure (BET), à un rapport d'expert judiciaire,
                à un rapport d'assurance ou à un rapport d'expertise avant-achat. Elle ne peut être
                opposée à un tiers comme tenant lieu de ces documents.
              </p>

              <div className="mt-6 bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r-lg">
                <p className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                  <Info size={18} aria-hidden="true" />
                  7.3. Besoin d'un rapport écrit opposable
                </p>
                <p className="text-blue-800">
                  Si le Client a besoin d'un <strong>rapport écrit opposable</strong> (par exemple
                  pour une vente immobilière, une déclaration de sinistre auprès d'un assureur, un
                  litige judiciaire ou une procédure de catastrophe naturelle), cette prestation
                  <strong> n'entre pas dans le périmètre de la prestation de coordination d'IPB</strong>.
                  IPB oriente alors le Client vers un professionnel compétent (bureau d'études
                  structure, expert d'assurance, expert judiciaire). Certains Partenaires d'exécution
                  du réseau IPB peuvent proposer ce type de prestation : elle fait alors l'objet d'un
                  devis distinct, conclu directement entre le Client et le Partenaire concerné, sous
                  la seule responsabilité de ce dernier.
                </p>
              </div>
            </section>

            {/* ---------- Article 8 — Devis et formation ---------- */}
            <section id="article-8" aria-labelledby="article-8-title">
              <h2 id="article-8-title" className="text-2xl font-bold text-ipb-text mb-4 flex items-center gap-3">
                <FileText size={24} className="text-ipb-orange" aria-hidden="true" />
                Article 8 — Devis et formation du contrat
              </h2>
              <p><strong>8.1.</strong> À l'issue de la qualification, IPB remet au Client un devis détaillant la prestation de coordination, son prix net (cf. article 9), ses délais d'exécution prévisionnels et ses conditions de paiement et de rétractation.</p>
              <p className="mt-4"><strong>8.2.</strong> Sauf mention contraire, les devis sont valables <strong>trois (3) mois</strong> à compter de leur date d'émission.</p>
              <p className="mt-4"><strong>8.3.</strong> Le contrat est formé par la signature du devis par le Client (signature manuscrite ou électronique). La signature du devis vaut acceptation sans réserve des présentes CGV.</p>
              <p className="mt-4"><strong>8.4.</strong> Toute modification du périmètre fait l'objet d'un avenant signé par les deux parties.</p>
            </section>

            {/* ---------- Article 9 — Prix et TVA ---------- */}
            <section id="article-9" aria-labelledby="article-9-title">
              <h2 id="article-9-title" className="text-2xl font-bold text-ipb-text mb-4 flex items-center gap-3">
                <CreditCard size={24} className="text-ipb-orange" aria-hidden="true" />
                Article 9 — Prix et régime de TVA
              </h2>
              <p>
                <strong>9.1.</strong> Le prix de la prestation de coordination est celui figurant
                sur le devis signé. Il est indiqué en euros et <strong>net de TVA</strong>.
              </p>
              <p className="mt-4">
                <strong>9.2.</strong> IPB exerce sous le régime de la franchise en base de TVA.
                À ce titre, l'ensemble des devis et factures émis par IPB porte la mention :
                <em> « TVA non applicable, article 293 B du Code général des impôts »</em>. Aucune
                TVA n'est facturée au Client et aucune TVA n'est déductible par le Client
                professionnel. Aucune mention « HT » ou « TTC » ne figure sur les documents IPB.
              </p>
              <p className="mt-4">
                <strong>9.3.</strong> Le prix peut être révisé en cas de demande de visite
                supplémentaire ou hors zone d'intervention, sur la base d'un devis distinct ou
                d'un avenant signé.
              </p>
              {/* À MODIFIER LORS DE LA BASCULE EN SAS : régime de TVA (assujettissement) et mention HT/TTC à introduire */}
            </section>

            {/* ---------- Article 10 — Paiement ---------- */}
            <section id="article-10" aria-labelledby="article-10-title">
              <h2 id="article-10-title" className="text-2xl font-bold text-ipb-text mb-4 flex items-center gap-3">
                <CreditCard size={24} className="text-ipb-orange" aria-hidden="true" />
                Article 10 — Modalités de paiement
              </h2>
              <p><strong>10.1. Échéance.</strong> Sauf mention contraire au devis, la prestation de coordination est payable selon les modalités prévues au devis (acompte à la commande, solde à la remise de la Note de synthèse).</p>

              <p className="mt-4"><strong>10.2. Moyens de paiement acceptés :</strong></p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Virement bancaire (IBAN communiqué sur la facture) ;</li>
                <li>Carte bancaire (lien de paiement sécurisé) ;</li>
                <li>Espèces, dans la limite prévue par l'article L. 112-6 du Code monétaire et financier.</li>
              </ul>

              <p className="mt-4"><strong>10.3. Retard de paiement — Client professionnel (B2B).</strong></p>
              <p className="mt-2">
                Conformément aux articles L. 441-10 et D. 441-5 du Code de commerce, toute somme non
                payée à l'échéance fait courir de plein droit, à l'encontre du Client professionnel :
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>des pénalités de retard au taux de la BCE majoré de dix (10) points ;</li>
                <li>une indemnité forfaitaire pour frais de recouvrement de 40 € par facture, sans préjudice de toute indemnisation complémentaire sur justification ;</li>
                <li>la suspension de la prestation jusqu'à régularisation.</li>
              </ul>

              <p className="mt-4"><strong>10.4. Retard de paiement — Client consommateur (B2C).</strong></p>
              <p className="mt-2">
                Toute somme non payée à l'échéance par un Client consommateur porte, après mise en
                demeure restée sans effet, intérêts au taux d'intérêt légal (article 1231-6 du Code
                civil). Aucune indemnité forfaitaire ne s'applique au consommateur.
              </p>
            </section>

            {/* ---------- Article 11 — Rétractation B2C ---------- */}
            <section id="article-11" aria-labelledby="article-11-title">
              <h2 id="article-11-title" className="text-2xl font-bold text-ipb-text mb-4 flex items-center gap-3">
                <RotateCcw size={24} className="text-ipb-orange" aria-hidden="true" />
                Article 11 — Droit de rétractation (Client consommateur)
              </h2>

              <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg mb-6">
                <p className="font-bold text-blue-900 mb-2">INFORMATION PRÉCONTRACTUELLE</p>
                <p className="text-blue-800">
                  Conformément aux articles L. 221-18 et suivants du Code de la consommation, le
                  Client consommateur ayant conclu son contrat à distance ou hors établissement
                  dispose d'un droit de rétractation. Le présent article ne s'applique pas aux
                  Clients professionnels.
                </p>
              </div>

              <p><strong>11.1. Délai.</strong> Le Client consommateur dispose d'un délai de
              <strong> quatorze (14) jours calendaires</strong> à compter de la conclusion du contrat
              pour exercer son droit de rétractation, sans avoir à motiver sa décision ni à supporter
              d'autres coûts que ceux prévus aux articles L. 221-23 à L. 221-25 du Code de la
              consommation.</p>

              <p className="mt-4"><strong>11.2. Modalités.</strong> Pour exercer son droit, le Client
              notifie sa décision au moyen d'une déclaration dénuée d'ambiguïté (courrier, email ou
              le <a href="#annexe-1" className="text-ipb-orange hover:underline">formulaire-type
              en annexe 1</a>) adressée à :</p>
              <p className="mt-2 bg-ipb-stone p-3 rounded-lg">
                IPB · Institut de Pathologie du Bâtiment<br />
                54 avenue Jean Jaurès, 31170 Tournefeuille<br />
                Email : <a href="mailto:contact@ipb-expertise.fr" className="text-ipb-orange">contact@ipb-expertise.fr</a>
              </p>

              <p className="mt-4"><strong>11.3. Exécution anticipée et perte du droit (art. L. 221-25
              et L. 221-28 13° C. conso).</strong></p>
              <p className="mt-2">
                Le Client consommateur peut demander expressément à IPB de commencer l'exécution de
                la prestation de coordination <strong>avant l'expiration du délai de rétractation</strong>.
                Cette demande expresse et la reconnaissance que le droit de rétractation sera
                <strong> perdu en cas d'exécution complète</strong> avant la fin du délai sont
                recueillies sur le devis, dans l'encadré reproduit en <a href="#annexe-2" className="text-ipb-orange hover:underline">annexe 2</a>.
              </p>
              <p className="mt-2">
                En cas d'exercice du droit de rétractation alors que l'exécution n'a commencé que
                partiellement avec l'accord exprès du Client, ce dernier verse un montant proportionnel
                aux prestations fournies jusqu'à la communication de sa décision (art. L. 221-25).
              </p>

              <p className="mt-4"><strong>11.4. Prolongation en cas de défaut d'information.</strong>
              Conformément à l'article L. 221-20 du Code de la consommation, si l'information
              relative au droit de rétractation n'a pas été fournie au Client, le délai de
              rétractation est prolongé de <strong>douze (12) mois</strong> à compter de l'expiration
              du délai initial de quatorze jours.</p>

              <p className="mt-4"><strong>11.5. Remboursement.</strong> En cas de rétractation valable,
              IPB rembourse le Client de l'intégralité des sommes versées, déduction faite, le cas
              échéant, du montant correspondant aux prestations exécutées avec son accord exprès,
              dans un délai de quatorze (14) jours à compter de la réception de la notification.</p>
            </section>

            {/* ---------- Article 12 — Exécution ---------- */}
            <section id="article-12" aria-labelledby="article-12-title">
              <h2 id="article-12-title" className="text-2xl font-bold text-ipb-text mb-4 flex items-center gap-3">
                <Wrench size={24} className="text-ipb-orange" aria-hidden="true" />
                Article 12 — Exécution de la prestation
              </h2>
              <p><strong>12.1. Délais.</strong> Les délais prévisionnels sont communiqués au devis. IPB informe le Client sans délai de tout retard prévisible et de ses causes.</p>
              <p className="mt-4"><strong>12.2. Accès au site.</strong> Le Client garantit l'accès au site aux dates convenues. Toute visite empêchée par le fait du Client peut nécessiter une reprogrammation.</p>
              <p className="mt-4"><strong>12.3. Remise de la Note de synthèse.</strong> La Note de synthèse est remise au Client par email à l'adresse indiquée à la commande. Le Client dispose de quinze (15) jours pour formuler ses observations. À défaut, la Note de synthèse est réputée acceptée.</p>
              <p className="mt-4"><strong>12.4. Règles applicables.</strong> La prestation est exécutée conformément aux règles de l'art applicables à la coordination, dans le respect des obligations déontologiques d'IPB.</p>
            </section>

            {/* ---------- Article 13 — Obligations du Client ---------- */}
            <section id="article-13" aria-labelledby="article-13-title">
              <h2 id="article-13-title" className="text-2xl font-bold text-ipb-text mb-4 flex items-center gap-3">
                <CheckCircle size={24} className="text-ipb-orange" aria-hidden="true" />
                Article 13 — Obligations du Client
              </h2>
              <p>Le Client s'engage à :</p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>fournir à IPB et au Partenaire d'exécution toutes les informations utiles concernant le bien (plans, diagnostics antérieurs, historique des désordres, sinistres déclarés, etc.) ;</li>
                <li>signaler tout élément de nature à affecter la visite (présence d'amiante, réseaux enterrés, servitudes, animaux, etc.) ;</li>
                <li>assurer les conditions d'accès et de sécurité sur le site lors de la visite du Partenaire ;</li>
                <li>régler le prix de la prestation de coordination conformément à l'article 10 ;</li>
                <li>informer IPB de toute modification de ses coordonnées.</li>
              </ul>
            </section>

            {/* ---------- Article 14 — SAV 12 mois ---------- */}
            <section id="article-14" aria-labelledby="article-14-title">
              <h2 id="article-14-title" className="text-2xl font-bold text-ipb-text mb-4 flex items-center gap-3">
                <Shield size={24} className="text-ipb-orange" aria-hidden="true" />
                Article 14 — Accompagnement Client 12 mois
              </h2>
              <p>
                IPB assure, pendant une durée de <strong>douze (12) mois</strong> suivant la remise
                de la Note de synthèse, un accompagnement Client comprenant :
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>la réponse aux questions du Client portant sur le contenu de la Note de synthèse ;</li>
                <li>la médiation entre le Client et le Partenaire d'exécution en cas de difficulté d'interprétation ou d'application des préconisations ;</li>
                <li>la mise à disposition d'un interlocuteur dédié.</li>
              </ul>
              <p className="mt-4">
                Toute nouvelle visite, investigation complémentaire ou prestation hors périmètre fait
                l'objet d'un devis distinct (à conclure le cas échéant avec le Partenaire concerné).
              </p>
            </section>

            {/* ---------- Article 15 — Travaux ultérieurs ---------- */}
            <section id="article-15" aria-labelledby="article-15-title">
              <h2 id="article-15-title" className="text-2xl font-bold text-ipb-text mb-4 flex items-center gap-3">
                <Wrench size={24} className="text-ipb-orange" aria-hidden="true" />
                Article 15 — Travaux ultérieurs
              </h2>
              <p>
                <strong>15.1.</strong> Si le Client décide d'engager les travaux préconisés par le
                Partenaire d'exécution, il <strong>contracte et règle directement</strong> ce
                Partenaire. Le devis et la facture des travaux sont émis au nom du Partenaire, qui
                y mentionne sa garantie décennale, son assureur et la couverture géographique.
                <strong> Aucune somme liée aux travaux ne transite par IPB.</strong>
              </p>
              <p className="mt-4">
                <strong>15.2.</strong> Les conditions générales et le prix des travaux sont ceux
                du Partenaire d'exécution. Les attestations d'assurance en cours de validité du
                Partenaire (RC pro et décennale) sont remises au Client préalablement à toute
                intervention, avec le devis travaux.
              </p>

              <div className="mt-6 bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r-lg">
                <p className="font-bold text-blue-900 mb-2">15.3. Assurance dommages-ouvrage</p>
                <p className="text-blue-800">
                  Pour les travaux soumis à l'obligation d'assurance décennale (articles 1792 et
                  suivants du Code civil), le Client est informé qu'il dispose, en application des
                  articles L. 242-1 et suivants du Code des assurances, de la faculté de souscrire
                  une <strong>assurance dommages-ouvrage</strong> afin d'obtenir, hors recherche de
                  responsabilité, le préfinancement rapide des réparations relevant de la décennale.
                </p>
              </div>
            </section>

            {/* ---------- Article 16 — Apport d'affaires ---------- */}
            <section id="article-16" aria-labelledby="article-16-title">
              <h2 id="article-16-title" className="text-2xl font-bold text-ipb-text mb-4 flex items-center gap-3">
                <Info size={24} className="text-ipb-orange" aria-hidden="true" />
                Article 16 — Transparence sur la rémunération d'apport d'affaires
              </h2>
              <p>
                Le Client est informé, en toute transparence, que lorsqu'il signe un devis de travaux
                avec un Partenaire d'exécution du réseau IPB, IPB perçoit du Partenaire une
                <strong> rémunération d'apport d'affaires</strong> sur les travaux signés.
              </p>
              <p className="mt-4">
                Cette rémunération est entièrement à la charge du Partenaire et ne donne pas lieu à
                une majoration du devis travaux pour le Client. Elle vient rémunérer la qualification
                de la demande, la coordination et l'apport d'affaires assurés par IPB. Elle est
                indépendante du prix de la prestation de coordination, qui demeure la seule somme
                facturée au Client par IPB.
              </p>
              <p className="mt-4 text-sm text-ipb-muted">
                Cette information est communiquée afin de prévenir tout grief de pratique commerciale
                trompeuse au sens des articles L. 121-1 et suivants du Code de la consommation.
              </p>
            </section>

            {/* ---------- Article 17 — Assurances ---------- */}
            <section id="article-17" aria-labelledby="article-17-title">
              <h2 id="article-17-title" className="text-2xl font-bold text-ipb-text mb-4 flex items-center gap-3">
                <Shield size={24} className="text-ipb-orange" aria-hidden="true" />
                Article 17 — Assurances
              </h2>
              <p>
                <strong>17.1. IPB.</strong> IPB est couverte par une assurance Responsabilité Civile
                Professionnelle au titre de sa prestation de coordination. Les références de cette
                police sont communiquées sur simple demande à <a href="mailto:contact@ipb-expertise.fr" className="text-ipb-orange hover:underline">contact@ipb-expertise.fr</a>.
              </p>
              <p className="mt-4">
                <strong>17.2. Partenaires d'exécution.</strong> Chaque Partenaire est titulaire d'une
                assurance Responsabilité Civile Professionnelle couvrant ses interventions, y compris
                la visite de diagnostic non facturée, et d'une <strong>garantie décennale</strong>
                couvrant les travaux qu'il réalise au titre des articles 1792 et suivants du Code
                civil. Les attestations d'assurance en cours de validité du Partenaire concerné sont
                remises au Client avec le devis travaux ou sur simple demande.
              </p>
            </section>

            {/* ---------- Article 18 — Responsabilités étanches ---------- */}
            <section id="article-18" aria-labelledby="article-18-title">
              <h2 id="article-18-title" className="text-2xl font-bold text-ipb-text mb-4 flex items-center gap-3">
                <AlertTriangle size={24} className="text-ipb-orange" aria-hidden="true" />
                Article 18 — Responsabilités étanches
              </h2>
              <p>
                <strong>18.1. Responsabilité d'IPB.</strong> IPB répond uniquement, vis-à-vis du
                Client, de la <strong>prestation de coordination</strong> qu'elle s'engage à exécuter
                (qualification de la demande, sélection du Partenaire, organisation de la visite,
                mise en forme de la Note de synthèse, accompagnement 12 mois). IPB n'est pas
                responsable des avis techniques, devis ou travaux du Partenaire.
              </p>
              <p className="mt-4">
                <strong>18.2. Responsabilité du Partenaire d'exécution.</strong> Le Partenaire
                d'exécution répond seul, vis-à-vis du Client, de la visite de diagnostic, des avis
                qu'il formule, des devis qu'il émet et des travaux qu'il réalise, dans les conditions
                de son propre contrat et de ses propres assurances.
              </p>
              <p className="mt-4">
                <strong>18.3. Absence de solidarité.</strong> Il n'existe entre IPB et le Partenaire
                d'exécution <strong>aucune solidarité, ni co-traitance conjointe et solidaire</strong>,
                ni mandat de représentation, dans leurs rapports respectifs avec le Client.
              </p>
              <p className="mt-4">
                <strong>18.4. Limitation de responsabilité (Client professionnel uniquement).</strong>
                Vis-à-vis d'un Client professionnel, la responsabilité d'IPB est en tout état de cause
                limitée au montant hors taxes effectivement perçu au titre de la prestation de
                coordination, sauf en cas de faute lourde ou dolosive. Cette limitation n'est pas
                opposable au Client consommateur.
              </p>
              <p className="mt-4 text-sm text-ipb-muted">
                IPB ne saurait être tenue responsable des dommages résultant d'informations erronées
                ou incomplètes communiquées par le Client, de modifications ou interventions
                effectuées par le Client ou un tiers après la remise de la Note de synthèse, de
                phénomènes naturels exceptionnels, ou de l'exécution des travaux par le Partenaire.
              </p>
            </section>

            {/* ---------- Article 19 — Force majeure ---------- */}
            <section id="article-19" aria-labelledby="article-19-title">
              <h2 id="article-19-title" className="text-2xl font-bold text-ipb-text mb-4 flex items-center gap-3">
                <AlertTriangle size={24} className="text-ipb-orange" aria-hidden="true" />
                Article 19 — Force majeure
              </h2>
              <p>
                Aucune des parties ne pourra être tenue responsable de l'inexécution ou du retard
                dans l'exécution de ses obligations contractuelles si cette inexécution ou ce retard
                résulte d'un cas de force majeure au sens de l'article 1218 du Code civil. Les
                obligations sont alors suspendues. Si l'événement perdure plus de trois mois, chaque
                partie pourra résilier le contrat sans indemnité.
              </p>
            </section>

            {/* ---------- Article 20 — Données ---------- */}
            <section id="article-20" aria-labelledby="article-20-title">
              <h2 id="article-20-title" className="text-2xl font-bold text-ipb-text mb-4 flex items-center gap-3">
                <Shield size={24} className="text-ipb-orange" aria-hidden="true" />
                Article 20 — Données personnelles
              </h2>
              <p>
                Les données personnelles collectées dans le cadre de la relation contractuelle font
                l'objet d'un traitement conforme au Règlement (UE) 2016/679 (RGPD) et à la loi
                Informatique et Libertés. Pour exécuter sa prestation, IPB transmet au Partenaire
                d'exécution les informations strictement nécessaires à l'organisation de la visite
                et, le cas échéant, à l'établissement du devis travaux.
              </p>
              <p className="mt-4">
                Pour plus d'informations, consultez nos
                <Link href="/legal/mentions-legales" className="text-ipb-orange hover:underline"> mentions
                légales</Link> et notre
                <Link href="/legal/confidentialite" className="text-ipb-orange hover:underline"> politique
                de confidentialité</Link>.
              </p>
            </section>

            {/* ---------- Article 21 — Médiation ---------- */}
            <section id="article-21" aria-labelledby="article-21-title">
              <h2 id="article-21-title" className="text-2xl font-bold text-ipb-text mb-4 flex items-center gap-3">
                <Gavel size={24} className="text-ipb-orange" aria-hidden="true" />
                Article 21 — Réclamations et médiation de la consommation
              </h2>
              <p>
                <strong>21.1. Réclamation préalable.</strong> Toute réclamation doit être adressée
                en premier lieu à IPB, par courrier au siège ou par email à
                <a href="mailto:contact@ipb-expertise.fr" className="text-ipb-orange hover:underline"> contact@ipb-expertise.fr</a>.
                IPB s'engage à accuser réception sous huit (8) jours et à apporter une réponse
                motivée dans un délai raisonnable.
              </p>

              <div className="mt-6 bg-ipb-cream rounded-xl p-6 border border-ipb-rule">
                <p className="font-bold text-ipb-text mb-3">21.2. Médiateur de la consommation</p>
                <p className="text-ipb-text mb-3">
                  Conformément aux articles L. 612-1 et suivants du Code de la consommation, le
                  Client consommateur peut, après réclamation écrite préalable restée infructueuse,
                  recourir gratuitement à un médiateur de la consommation.
                </p>
                <p className="text-ipb-text text-sm">
                  La liste des médiateurs de la consommation agréés est consultable sur le site
                  officiel{' '}
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

            {/* ---------- Article 22 — Droit applicable ---------- */}
            <section id="article-22" aria-labelledby="article-22-title">
              <h2 id="article-22-title" className="text-2xl font-bold text-ipb-text mb-4 flex items-center gap-3">
                <Gavel size={24} className="text-ipb-orange" aria-hidden="true" />
                Article 22 — Droit applicable et compétence juridictionnelle
              </h2>
              <p><strong>22.1.</strong> Les présentes CGV sont soumises au droit français.</p>
              <p className="mt-4">
                <strong>22.2. Client consommateur (B2C).</strong> En cas de litige, le Client
                consommateur conserve la faculté de saisir, à son choix, la juridiction du lieu où
                il demeurait au moment de la conclusion du contrat ou de la survenance du fait
                dommageable, conformément à l'article R. 631-3 du Code de la consommation. Aucune
                clause attributive de compétence ne lui est opposable.
              </p>
              <p className="mt-4">
                <strong>22.3. Client professionnel (B2B).</strong> Vis-à-vis du Client professionnel,
                tout litige relatif à l'existence, l'interprétation ou l'exécution des présentes CGV
                est attribué, à défaut de règlement amiable, à la compétence exclusive du
                <strong> Tribunal de commerce de Toulouse</strong>, nonobstant pluralité de défendeurs
                ou appel en garantie.
              </p>
            </section>

            {/* ---------- Article 23 — Dispositions générales ---------- */}
            <section id="article-23" aria-labelledby="article-23-title">
              <h2 id="article-23-title" className="text-2xl font-bold text-ipb-text mb-4 flex items-center gap-3">
                <FileText size={24} className="text-ipb-orange" aria-hidden="true" />
                Article 23 — Dispositions générales
              </h2>
              <p><strong>23.1. Intégralité.</strong> Les présentes CGV expriment l'intégralité des obligations des parties relatives à la prestation de coordination.</p>
              <p className="mt-4"><strong>23.2. Nullité partielle.</strong> Si l'une des clauses était déclarée nulle ou inapplicable, les autres clauses conserveraient leur pleine force et portée.</p>
              <p className="mt-4"><strong>23.3. Modification.</strong> IPB se réserve le droit de modifier les présentes CGV à tout moment. Les CGV applicables sont celles en vigueur à la date de la commande.</p>
              <p className="mt-4"><strong>23.4. Preuve.</strong> Les registres informatisés conservés par IPB dans des conditions raisonnables de sécurité constituent une preuve des communications, commandes et paiements intervenus entre les parties.</p>
            </section>

          </article>

          {/* ---------- Annexe 1 — Formulaire de rétractation ---------- */}
          <div id="annexe-1" className="mt-12 p-6 bg-ipb-stone rounded-xl border border-ipb-rule">
            <h2 className="text-xl font-bold text-ipb-text mb-4">Annexe 1 — Formulaire type de rétractation</h2>
            <p className="text-sm text-ipb-muted mb-4">
              (À compléter et renvoyer uniquement si vous souhaitez vous rétracter du contrat)
            </p>
            <div className="bg-white p-4 rounded-lg border border-ipb-rule text-sm">
              <p className="mb-3">À l'attention de :<br />
              <strong>IPB · Institut de Pathologie du Bâtiment</strong><br />
              54 avenue Jean Jaurès, 31170 Tournefeuille<br />
              Email : contact@ipb-expertise.fr</p>

              <p className="mb-3">Je/Nous (*) vous notifie/notifions (*) par la présente ma/notre (*)
              rétractation du contrat portant sur la prestation de coordination ci-dessous :</p>

              <p className="mb-3">
                — Description de la prestation : ________________________________<br />
                — Commandée le (*) / reçue le (*) : ________________________________<br />
                — Nom du (des) consommateur(s) : ________________________________<br />
                — Adresse du (des) consommateur(s) : ________________________________
              </p>

              <p className="mb-3">Date : ________________________________</p>

              <p>Signature du (des) consommateur(s) (uniquement en cas de notification sur papier) :</p>

              <p className="mt-4 text-xs text-ipb-muted">(*) Rayez la mention inutile</p>
            </div>
          </div>

          {/* ---------- Annexe 2 — Exécution anticipée ---------- */}
          <div id="annexe-2" className="mt-8 p-6 bg-ipb-stone rounded-xl border border-ipb-rule">
            <h2 className="text-xl font-bold text-ipb-text mb-2">Annexe 2 — Encadré « Exécution anticipée » à reproduire sur chaque devis B2C</h2>
            <p className="text-sm text-ipb-muted mb-4">
              Encadré à reprendre dans tout devis de prestation de coordination conclu à distance ou
              hors établissement avec un Client consommateur, lorsque l'exécution doit commencer
              avant l'expiration du délai légal de rétractation de 14 jours.
            </p>
            <div className="bg-white p-4 rounded-lg border-2 border-ipb-orange text-sm">
              <p className="font-bold text-ipb-text mb-3 uppercase tracking-wide">
                Demande expresse d'exécution anticipée et reconnaissance de perte du droit
                de rétractation
              </p>
              <p className="mb-3">
                Je, soussigné(e) ________________________________ (Client consommateur), demande
                expressément à IPB · Institut de Pathologie du Bâtiment de commencer l'exécution de
                la prestation de coordination décrite au devis n° ______________ avant l'expiration
                du délai légal de rétractation de quatorze (14) jours prévu à l'article L. 221-18 du
                Code de la consommation.
              </p>
              <p className="mb-3">
                Je reconnais avoir été informé(e) que, conformément aux articles L. 221-25 et
                L. 221-28 13° du Code de la consommation, je <strong>perdrai mon droit de
                rétractation</strong> dès que la prestation aura été pleinement exécutée par IPB.
                En cas de rétractation exercée alors que l'exécution a commencé avec mon accord
                exprès, je m'engage à verser à IPB un montant proportionnel aux prestations fournies
                jusqu'à la communication de ma décision.
              </p>
              <p className="mb-3">Fait à ________________________________ , le ________________________________</p>
              <p>Signature du Client : ________________________________</p>
            </div>
          </div>

          <footer className="mt-12 pt-8 border-t border-ipb-rule">
            <p className="text-sm text-ipb-muted text-center">
              Dernière mise à jour des présentes CGV : <time dateTime="2026-06-12">12 juin 2026</time>
            </p>
          </footer>
        </div>
      </main>

      <Footer />
    </div>
  );
}
