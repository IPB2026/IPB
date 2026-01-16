import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { Footer } from '@/components/home/Footer';
import { FaqSection } from '@/components/ui/FaqSection';
import { humidityFaq } from '@/app/data/faqs';
import Link from 'next/link';
import { Droplets, AlertTriangle, CheckCircle, ArrowRight, Shield, Home, Wind, Beaker, FileText } from 'lucide-react';
import Script from 'next/script';

export const metadata = {
  title: 'Traitement Humidité Toulouse - Traitement Définitif Humidité Ascensionnelle | IPB',
  description: 'Expert en traitement de l\'humidité et remontées capillaires à Toulouse. Injection résine hydrophobe, cuvelage, VMI. Solutions définitives avec garantie 30 ans.',
};

// Génération du JSON-LD pour le SEO (FAQPage Schema.org)
const generateFaqJsonLd = () => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": humidityFaq.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };
};

export default function HumiditePage() {
  const faqJsonLd = generateFaqJsonLd();

  return (
    <div className="font-sans text-slate-800 bg-slate-50 antialiased">
      <Script
        id="faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <TopBar />
      <Navbar />
      
      {/* Hero Header */}
      <section className="relative bg-slate-900 text-white overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 opacity-95"></div>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 text-blue-100 px-4 py-1.5 rounded-full text-xs font-bold mb-6 uppercase tracking-wider backdrop-blur-md">
              <Droplets size={16} />
              <span>Expertise Humidité & Infiltrations</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
              Traitement Définitif de l'<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200">Humidité Ascensionnelle</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-8 leading-relaxed font-medium">
              Salpêtre, moisissures, décollements ? Stoppez les remontées capillaires à la source.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/diagnostic" className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:bg-blue-500 transition-all flex items-center justify-center gap-2">
                Demander un avis expert
                <ArrowRight size={20} />
              </Link>
              <a href="tel:0582953375" className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all flex items-center justify-center gap-2">
                Consultation téléphonique
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1 : Le Diagnostic (Le Problème) */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="w-10 h-10 text-blue-600" />
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">L'eau qui vient du sol</h2>
            </div>
            
            <div className="prose prose-lg max-w-none text-slate-700 leading-relaxed mb-8">
              <p className="text-lg mb-6">
                Les matériaux de construction traditionnels de la région <strong>(brique foraine, pierre poreuse)</strong> agissent comme des éponges. 
                L'eau du sol remonte par capillarité, chargée de <strong>sels minéraux (nitrates/sulfates)</strong>.
              </p>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-600 rounded-xl p-6 md:p-8 mb-8">
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-blue-600" />
                Les Dégâts :
              </h3>
              <ul className="space-y-3 text-slate-700">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-blue-600 shrink-0 mt-0.5" />
                  <span>Apparition de <strong>Salpêtre</strong> (poudre blanche corrosive).</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-blue-600 shrink-0 mt-0.5" />
                  <span>Pourrissement des <strong>plinthes et doublages placo</strong>.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-blue-600 shrink-0 mt-0.5" />
                  <span><strong>Atmosphère insalubre</strong> et allergies respiratoires.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 : La Solution IPB (La Technique) */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">L'Injection de Résine Hydrophobe (Barrière Étanche)</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Nous créons une <strong>barrière chimique infranchissable</strong> à la base de vos murs.
            </p>
          </div>

          {/* Notre Méthode en 4 étapes */}
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">1</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">Forage</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Perçage précis en bas de mur <strong>tous les 10-15cm</strong>.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">2</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">Injection</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Diffusion basse pression d'une <strong>résine silane/siloxane concentrée</strong>.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">3</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">Polymérisation</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  La résine durcit et crée une <strong>zone totalement étanche</strong> dans la masse du mur.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">4</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">Assèchement</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Le mur sèche naturellement, <strong>l'eau ne peut plus remonter</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 : Compléments indispensables */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Compléments indispensables</h2>
            <p className="text-lg text-slate-600">Des solutions complémentaires selon votre situation</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
            <div className="bg-gradient-to-br from-orange-50 to-white rounded-2xl p-8 shadow-lg border-2 border-orange-200">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-6">
                <Home className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Cuvelage</h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                Pour les <strong>caves et sous-sols enterrés</strong>, création d'un caisson étanche intérieur 
                par application d'un traitement époxy sur les murs et le sol.
              </p>
              <div className="bg-white rounded-xl p-4 border border-orange-200">
                <p className="text-sm text-slate-600">
                  <strong className="text-orange-600">Indication :</strong> Infiltrations latérales, pression hydrostatique, caves humides
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl p-8 shadow-lg border-2 border-green-200">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                <Wind className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Ventilation (VMI)</h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                Pour chasser l'<strong>humidité résiduelle et la condensation</strong>. 
                Installation d'une Ventilation Mécanique par Insufflation qui injecte de l'air sec et filtré.
              </p>
              <div className="bg-white rounded-xl p-4 border border-green-200">
                <p className="text-sm text-slate-600">
                  <strong className="text-green-600">Indication :</strong> Condensation, moisissures, atmosphère humide
                </p>
              </div>
            </div>
          </div>

          {/* Accompagnement */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-purple-50 to-white rounded-2xl p-8 shadow-lg border-2 border-purple-200">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-20 h-20 bg-purple-100 rounded-2xl flex items-center justify-center shrink-0">
                  <FileText className="w-10 h-10 text-purple-600" />
                </div>
                <div className="text-center md:text-left">
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">Accompagnement post-intervention</h3>
                  <p className="text-slate-700 leading-relaxed">
                    Nous mettons en place un <strong>suivi personnalisé</strong> à la suite de notre intervention 
                    pour suivre l'évolution de nos actions et rassurer nos clients. 
                    Vous bénéficiez d'un accompagnement continu pour garantir la pérennité des résultats.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparatif Tableau */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Comparatif des solutions</h2>
            <p className="text-lg text-slate-600">Injection Résine IPB vs Solutions classiques</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-900 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-bold">Critère</th>
                    <th className="px-6 py-4 text-center font-bold bg-blue-600">Solution IPB (Injection)</th>
                    <th className="px-6 py-4 text-center font-bold">Drainage extérieur</th>
                    <th className="px-6 py-4 text-center font-bold">Déshumidificateur</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-bold text-slate-900">Efficacité</td>
                    <td className="px-6 py-4 text-center text-green-600 font-bold">✓ Définitive</td>
                    <td className="px-6 py-4 text-center text-orange-600">⚠ Partielle</td>
                    <td className="px-6 py-4 text-center text-red-600">✗ Temporaire</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-bold text-slate-900">Garantie</td>
                    <td className="px-6 py-4 text-center text-blue-600 font-bold">30 ans</td>
                    <td className="px-6 py-4 text-center text-slate-600">5-10 ans</td>
                    <td className="px-6 py-4 text-center text-slate-600">Aucune</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-bold text-slate-900">Coût moyen</td>
                    <td className="px-6 py-4 text-center text-slate-700 font-bold">80€ - 120€ / ml</td>
                    <td className="px-6 py-4 text-center text-slate-700">150€ - 200€ / ml</td>
                    <td className="px-6 py-4 text-center text-slate-700">Achat + électricité</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-bold text-slate-900">Invasivité</td>
                    <td className="px-6 py-4 text-center text-green-600 font-bold">Faible</td>
                    <td className="px-6 py-4 text-center text-red-600">Très élevée</td>
                    <td className="px-6 py-4 text-center text-green-600">Aucune</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-bold text-slate-900">Traitement salpêtre</td>
                    <td className="px-6 py-4 text-center text-green-600 font-bold">✓ Oui</td>
                    <td className="px-6 py-4 text-center text-orange-600">⚠ Partiel</td>
                    <td className="px-6 py-4 text-center text-red-600">✗ Non</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FaqSection 
        title="Questions fréquentes sur l'humidité" 
        data={humidityFaq} 
        theme="blue" 
      />

      {/* CTA Final */}
      <section className="py-16 md:py-24 bg-slate-900 text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6">Vos murs présentent ces symptômes ?</h2>
          <p className="text-xl text-slate-300 mb-8">
            Ne laissez pas l'humidité détériorer votre confort et votre santé. Obtenez un diagnostic expert pour identifier la cause exacte.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/diagnostic" 
              className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:bg-blue-500 transition-all flex items-center justify-center gap-2"
            >
              Diagnostic gratuit
              <ArrowRight size={20} />
            </Link>
            <a 
              href="tel:0582953375" 
              className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all flex items-center justify-center gap-2"
            >
              Appeler un expert
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

