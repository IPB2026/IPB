import Link from 'next/link';
import { Activity, ArrowRight } from 'lucide-react';
import { ImageAvantApres } from '@/components/ui/ImageAvantApres';

export function ServicesStructure() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 md:gap-16 lg:gap-20 items-center">
          <div className="lg:w-1/2">
            <div className="inline-flex items-center gap-2 text-orange-600 font-bold mb-6 bg-orange-50 px-5 py-2 rounded-full uppercase text-xs tracking-wider border border-orange-100">
              <Activity size={16} /> Pôle Structure
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6 md:mb-8 leading-tight">Arrêtez l'expansion des fissures avant qu'il ne soit trop tard</h2>
            <p className="text-slate-600 text-base md:text-lg mb-6 md:mb-8 leading-relaxed">
              Le sol argileux toulousain se contracte et se dilate avec les saisons, fragilisant vos fondations. Chaque hiver, les fissures s'agrandissent. 
              <strong className="text-slate-900"> Ne perdez plus de temps avec des rustines</strong> : notre technique d'agrafage redonne à votre maison sa solidité d'origine, <strong className="text-orange-600">pour 3 fois moins cher que les micropieux</strong>.
            </p>
            
            <div className="space-y-4 md:space-y-6">
              <div className="flex gap-4 md:gap-5 p-4 md:p-5 rounded-xl md:rounded-2xl bg-slate-50 hover:bg-orange-50 transition border border-slate-100 group">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white flex items-center justify-center text-orange-600 shrink-0 font-bold shadow-sm group-hover:scale-110 transition text-sm md:text-base">1</div>
                <div>
                  <h3 className="font-bold text-base md:text-lg text-slate-900 mb-1">Agrafage & Harpage : la suture de votre mur</h3>
                  <p className="text-sm md:text-base text-slate-500">Nous insérons des aciers torsadés haute résistance tous les 40cm dans votre maçonnerie. Résultat : votre mur retrouve sa cohérence structurelle et résiste aux mouvements du sol.</p>
                </div>
              </div>
              <div className="flex gap-4 md:gap-5 p-4 md:p-5 rounded-xl md:rounded-2xl bg-slate-50 hover:bg-orange-50 transition border border-slate-100 group">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white flex items-center justify-center text-orange-600 shrink-0 font-bold shadow-sm group-hover:scale-110 transition text-sm md:text-base">2</div>
                <div>
                  <h3 className="font-bold text-base md:text-lg text-slate-900 mb-1">Matage élastique : fini les réparations à répétition</h3>
                  <p className="text-sm md:text-base text-slate-500">Nous comblons les fissures avec un mortier résine fibré qui s'adapte aux micro-mouvements. Contrairement à l'enduit classique, il ne se fissurera plus, même en cas de sécheresse.</p>
                </div>
              </div>
            </div>
            
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link href="/expertise/fissures" className="inline-flex items-center gap-3 text-orange-600 font-bold text-lg hover:gap-5 transition-all group">
                En savoir plus sur les fissures <ArrowRight size={20} />
              </Link>
              <Link href="/diagnostic" className="inline-flex items-center gap-3 text-slate-600 font-bold text-lg hover:text-orange-600 transition-all group">
                Diagnostic gratuit <ArrowRight size={20} />
              </Link>
            </div>
          </div>
          
          <div className="lg:w-1/2 relative">
            <div className="aspect-[4/5] bg-slate-200 rounded-3xl overflow-hidden shadow-2xl relative border-8 border-white transform rotate-2 hover:rotate-0 transition duration-500">
              {/* Image Avant/Après Fissures */}
              <div className="relative w-full h-full">
                <ImageAvantApres
                  src="/images/fissures-avant-apres.webp"
                  alt="Avant/Après : Fissure dans un mur en briques réparée par agrafage avec barres métalliques - IPB"
                  fallbackIcon={<Activity size={64} className="mx-auto mb-4 opacity-50" />}
                  fallbackText="[Photo Technique : Mur avec Agrafes Métalliques]"
                />
              </div>
              
              {/* Badge Flottant */}
              <div className="absolute top-4 -right-4 bg-white p-4 rounded-2xl shadow-xl max-w-xs border border-slate-100 hidden md:block z-10">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Technique Validée</span>
                </div>
                <p className="font-bold text-sm text-slate-900">Alternative aux micropieux <span className="text-orange-600">3x moins chère</span>.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

