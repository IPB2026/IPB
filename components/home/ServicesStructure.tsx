import Link from 'next/link';
import Image from 'next/image';
import { Activity, ArrowRight, AlertTriangle } from 'lucide-react';


export function ServicesStructure() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 md:gap-16 lg:gap-20 items-center">
          <div className="lg:w-1/2">
            <div className="inline-flex items-center gap-2 text-orange-600 font-bold mb-6 bg-orange-50 px-5 py-2 rounded-full uppercase text-xs tracking-wider border border-orange-100">
              <Activity size={16} /> Pôle Structure
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6 md:mb-8 leading-tight">Comprendre vos fissures pour les traiter définitivement</h2>
            <p className="text-slate-600 text-base md:text-lg mb-6 md:mb-8 leading-relaxed">
              Une fissure n'est jamais anodine. C'est le symptôme visible d'un mouvement structurel — tassement différentiel, retrait-gonflement des argiles, défaut de fondation.
              <strong className="text-slate-900"> Reboucher sans diagnostiquer, c'est masquer le problème.</strong> Notre approche : diagnostic instrumenté, plan de remédiation, puis réalisation des travaux adaptés — agrafage, harpage ou reprise en sous-œuvre — avec suivi post-intervention.
            </p>
            
            <div className="space-y-4 md:space-y-6">
              <div className="flex gap-4 md:gap-5 p-4 md:p-5 rounded-xl md:rounded-2xl bg-slate-50 hover:bg-orange-50 transition border border-slate-100 group">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white flex items-center justify-center text-orange-600 shrink-0 font-bold shadow-sm group-hover:scale-110 transition text-sm md:text-base">1</div>
                <div>
                  <h3 className="font-bold text-base md:text-lg text-slate-900 mb-1">Agrafage structurel : redonner sa cohésion au mur</h3>
                  <p className="text-sm md:text-base text-slate-500">Des agrafes en acier inoxydable sont scellées dans la maçonnerie tous les 40 cm pour solidariser les deux lèvres de la fissure. Le mur retrouve son comportement monolithique et absorbe les contraintes du sol.</p>
                </div>
              </div>
              <div className="flex gap-4 md:gap-5 p-4 md:p-5 rounded-xl md:rounded-2xl bg-slate-50 hover:bg-orange-50 transition border border-slate-100 group">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white flex items-center justify-center text-orange-600 shrink-0 font-bold shadow-sm group-hover:scale-110 transition text-sm md:text-base">2</div>
                <div>
                  <h3 className="font-bold text-base md:text-lg text-slate-900 mb-1">Matage résine fibré : absorber les micro-mouvements</h3>
                  <p className="text-sm md:text-base text-slate-500">Le comblement des fissures est réalisé avec un mortier résine fibré à module d'élasticité contrôlé. Il accompagne les variations dimensionnelles du support sans rompre, contrairement à un enduit rigide classique.</p>
                </div>
              </div>
            </div>
            
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link href="/diagnostic" className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-7 py-3 rounded-full transition-colors text-sm">
                Évaluer ma situation <ArrowRight size={16} />
              </Link>
              <Link href="/expertise/fissures" className="inline-flex items-center gap-2 border-2 border-slate-200 hover:border-slate-300 text-slate-700 font-bold px-7 py-3 rounded-full transition-colors text-sm">
                En savoir plus <ArrowRight size={16} />
              </Link>
              <a href="tel:0582953375" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 font-medium text-sm transition-colors py-3">
                📞 05 82 95 33 75
              </a>
            </div>
          </div>
          
          <div className="lg:w-1/2 relative">
            {/* Image principale */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <Image
                src="/images/fissure-facade-diagonale.webp"
                alt="Grande fissure diagonale sur façade - Signe de tassement différentiel"
                width={600}
                height={450}
                className="w-full h-auto object-cover"
              />
              
              {/* Badge alerte sur l'image */}
              <div className="absolute bottom-4 left-4 right-4 bg-red-600/95 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="text-white" size={28} />
                  <div>
                    <p className="text-white font-bold">Fissure structurelle active</p>
                    <p className="text-red-100 text-sm">Ce type de fissure s'aggrave chaque saison</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Badge Flottant technique */}
            <div className="absolute top-4 -right-4 bg-white p-4 rounded-2xl shadow-xl max-w-xs border border-slate-100 hidden md:block z-10">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Solution IPB</span>
              </div>
              <p className="font-bold text-sm text-slate-900">De l'expertise aux travaux : <span className="text-orange-600">un seul interlocuteur</span></p>
            </div>
            
            {/* Galerie mini-images */}
            <div className="flex gap-3 mt-4">
              <div className="flex-1 rounded-xl overflow-hidden shadow-lg border-2 border-white h-24">
                <Image
                  src="/images/fissure-coin-maison.webp"
                  alt="Fissure sur coin de maison"
                  width={200}
                  height={96}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 rounded-xl overflow-hidden shadow-lg border-2 border-white h-24">
                <Image
                  src="/images/fissure-facade-verticale.webp"
                  alt="Fissure verticale sur façade"
                  width={200}
                  height={96}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 rounded-xl bg-orange-600 flex items-center justify-center h-24">
                <div className="text-center text-white px-2">
                  <p className="font-bold text-lg">850+</p>
                  <p className="text-xs">clients accompagnés</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

