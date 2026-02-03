import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { Footer } from '@/components/home/Footer';
import { AlertTriangle, ArrowRight, Phone, Home } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Fissure Fondation Maison : Causes, Gravité et Réparation | IPB Expertise',
  description: 'Fissures liées aux fondations ? Causes (tassement, RGA, défaut construction), gravité et solutions (agrafage, micropieux). Expert Toulouse →',
  keywords: ['fissure fondation', 'fissure fondation maison', 'reprise fondation', 'micropieux', 'tassement fondation'],
  alternates: {
    canonical: 'https://www.ipb-expertise.fr/fissure-fondation-maison',
  },
};

const faqItems = [
  {
    question: "Comment savoir si mes fissures viennent des fondations ?",
    answer: "Les signes : fissures en escalier, portes/fenêtres qui coincent, sol qui penche, fissures qui s'élargissent. Un diagnostic professionnel avec étude de sol est souvent nécessaire."
  },
  {
    question: "Peut-on réparer des fondations fissurées ?",
    answer: "Oui, plusieurs techniques existent : agrafage pour stabiliser les murs, micropieux pour reprendre les fondations, injection de résine expansive pour consolider le sol."
  },
  {
    question: "Combien coûte la reprise de fondation ?",
    answer: "L'agrafage coûte 8 000-15 000€, les micropieux 25 000-50 000€, l'injection de résine 10 000-20 000€. Le choix dépend de la cause et de la gravité."
  },
  {
    question: "Les travaux de fondation sont-ils garantis ?",
    answer: "Oui, les travaux de reprise en sous-œuvre et l'agrafage sont couverts par la garantie décennale de l'entreprise."
  }
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqItems.map(item => ({
    "@type": "Question",
    "name": item.question,
    "acceptedAnswer": { "@type": "Answer", "text": item.answer }
  }))
};

export default function FissureFondationPage() {
  return (
    <div className="font-sans text-slate-800 bg-slate-50 antialiased">
      <Script id="faq-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      
      <TopBar />
      <Navbar />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200 py-3">
        <div className="max-w-7xl mx-auto px-4 text-sm text-slate-600">
          <Link href="/" className="hover:text-orange-600">Accueil</Link>
          <span className="mx-2">›</span>
          <Link href="/expert-fissures-toulouse-31" className="hover:text-orange-600">Expert Fissures</Link>
          <span className="mx-2">›</span>
          <span className="text-slate-900">Fissure fondation</span>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-2 text-red-400 text-sm font-bold mb-4">
            <Home size={18} />
            <span>Problème de fondation</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
            Fissures et Fondations : Le Guide Complet
          </h1>
          <p className="text-xl text-slate-300 mb-8">
            Quand les fondations bougent, les murs fissurent. Découvrez les causes, les signes d'alerte 
            et les solutions pour stabiliser durablement votre maison.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/diagnostic" className="bg-orange-600 hover:bg-orange-500 px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2">
              Diagnostic gratuit <ArrowRight size={18} />
            </Link>
            <a href="tel:0582953375" className="bg-white/10 border border-white/20 px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2">
              <Phone size={18} /> 05 82 95 33 75
            </a>
          </div>
        </div>
      </section>

      {/* Contenu */}
      <article className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4">
          <div className="prose prose-lg max-w-none">
            <h2>Le rôle crucial des fondations</h2>
            <p>
              Les <strong>fondations</strong> sont la base de votre maison. Elles transmettent le poids du bâtiment au sol 
              de façon uniforme. Quand les fondations bougent (tassement, soulèvement), les murs subissent des contraintes 
              et se fissurent.
            </p>
            <p>
              En <strong>Haute-Garonne</strong>, les sols argileux sont particulièrement problématiques : ils gonflent avec 
              l'eau et se rétractent en période sèche, créant des mouvements cycliques sous les fondations.
            </p>

            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl my-8 not-prose">
              <div className="flex items-start gap-3">
                <AlertTriangle className="text-red-600 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">⚠️ Les fondations ne se réparent pas seules</h3>
                  <p className="text-slate-700">
                    Une fissure liée aux fondations ne se stabilise jamais d'elle-même. Sans intervention, elle s'aggrave 
                    progressivement, parfois jusqu'à rendre la maison inhabitable.
                  </p>
                </div>
              </div>
            </div>

            <h2>Les causes des problèmes de fondation</h2>

            <h3>1. Retrait-gonflement des argiles (RGA)</h3>
            <p>
              Cause n°1 en Occitanie. Les sols argileux gonflent quand ils sont humides et se rétractent en sécheresse. 
              Ces mouvements cycliques fatiguent les fondations et créent des tassements différentiels.
            </p>

            <h3>2. Fondations sous-dimensionnées</h3>
            <p>
              Maisons anciennes ou construites sans étude de sol. Les fondations sont trop peu profondes ou trop étroites 
              pour le terrain. Fréquent dans les constructions des années 60-80.
            </p>

            <h3>3. Modification de l'environnement</h3>
            <ul>
              <li>Arbres plantés trop près (racines qui assèchent le sol)</li>
              <li>Travaux de terrassement voisins</li>
              <li>Construction d'une piscine à proximité</li>
              <li>Modification du drainage naturel</li>
            </ul>

            <h3>4. Défaut de construction</h3>
            <p>
              Sol mal compacté, fondations coulées sur terrain gelé, armatures mal positionnées... 
              Ces défauts se révèlent souvent dans les 5-10 premières années.
            </p>

            <h2>Reconnaître une fissure liée aux fondations</h2>

            <div className="bg-slate-100 rounded-2xl p-6 my-8 not-prose">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Signes révélateurs</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <span className="text-red-500 text-xl">🔴</span>
                  <span>Fissures en escalier suivant les joints</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-red-500 text-xl">🔴</span>
                  <span>Fissures qui traversent le mur (visibles des deux côtés)</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-red-500 text-xl">🔴</span>
                  <span>Portes et fenêtres qui coincent ou ne ferment plus</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-red-500 text-xl">🔴</span>
                  <span>Sols qui penchent (bille qui roule seule)</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-red-500 text-xl">🔴</span>
                  <span>Fissures qui s'élargissent avec le temps</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-orange-500 text-xl">🟠</span>
                  <span>Décollements entre plinthe et mur</span>
                </li>
              </ul>
            </div>

            <h2>Les solutions de réparation</h2>

            <h3>L'agrafage structurel (solution la plus courante)</h3>
            <p>
              L'<strong>agrafage</strong> consiste à insérer des barres métalliques (agrafes) perpendiculairement à la fissure 
              pour "recoudre" le mur et empêcher toute nouvelle ouverture. Cette technique est efficace quand le mouvement 
              est stabilisé ou faible.
            </p>
            <ul>
              <li>✅ Coût : 8 000 - 15 000€</li>
              <li>✅ Durée : 3-5 jours</li>
              <li>✅ Garantie décennale</li>
              <li>✅ Pas de gros travaux de terrassement</li>
            </ul>

            <h3>Les micropieux (cas sévères)</h3>
            <p>
              Les <strong>micropieux</strong> sont des pieux métalliques enfoncés jusqu'au sol stable (parfois 10-15m de profondeur) 
              pour reprendre le poids de la maison. Indiqués quand le tassement est important ou continu.
            </p>
            <ul>
              <li>💰 Coût : 25 000 - 50 000€</li>
              <li>⏱️ Durée : 2-3 semaines</li>
              <li>✅ Garantie décennale</li>
              <li>Solution définitive</li>
            </ul>

            <h3>L'injection de résine expansive</h3>
            <p>
              Une résine est injectée sous les fondations. En gonflant, elle comble les vides et consolide le sol. 
              Technique moins invasive mais pas adaptée à tous les terrains.
            </p>
            <ul>
              <li>💰 Coût : 10 000 - 20 000€</li>
              <li>⏱️ Durée : 1-3 jours</li>
              <li>Nécessite une étude de sol préalable</li>
            </ul>

            <h2>Le processus IPB</h2>
            <ol>
              <li><strong>Diagnostic visuel :</strong> Analyse des fissures, de leur évolution, de l'environnement</li>
              <li><strong>Étude de sol (si nécessaire) :</strong> Sondages pour comprendre la nature du terrain</li>
              <li><strong>Rapport technique :</strong> Causes identifiées, solution recommandée, devis détaillé</li>
              <li><strong>Travaux :</strong> Réalisation par nos équipes avec garantie décennale</li>
              <li><strong>Suivi :</strong> Contrôle post-travaux et garantie de résultat</li>
            </ol>
          </div>

          {/* Lien vers le HUB */}
          <div className="mt-12 p-8 bg-orange-50 border-2 border-orange-200 rounded-2xl">
            <h3 className="text-xl font-bold text-slate-900 mb-4">📚 Guide complet des fissures</h3>
            <p className="text-slate-600 mb-4">
              Consultez notre page pilier avec tous les types de fissures, leurs causes et les solutions adaptées.
            </p>
            <Link href="/expert-fissures-toulouse-31" className="inline-flex items-center gap-2 text-orange-600 font-bold hover:text-orange-700">
              Expert Fissures Toulouse <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </article>

      {/* FAQ */}
      <section className="py-16 bg-slate-100">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-8 text-center">Questions fréquentes</h2>
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <details key={index} className="bg-white rounded-xl shadow-sm border border-slate-200 group">
                <summary className="p-6 cursor-pointer font-bold text-slate-900 flex items-center justify-between">
                  {item.question}
                  <span className="text-orange-600 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="px-6 pb-6 text-slate-600">{item.answer}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-orange-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold mb-6">Vos fondations vous inquiètent ?</h2>
          <p className="text-xl text-orange-100 mb-8">Diagnostic expert sous 48h. Ne laissez pas le problème s'aggraver.</p>
          <Link href="/diagnostic" className="inline-flex items-center gap-2 bg-white text-orange-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-orange-50">
            Demander un diagnostic <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
