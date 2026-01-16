import Link from 'next/link';
import { Droplets, ArrowRight } from 'lucide-react';
import { ImageAvantApres } from '@/components/ui/ImageAvantApres';

export function ServicesHumidity() {
  return (
    <section className="py-16 md:py-24 bg-blue-50/50 border-t border-slate-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row-reverse gap-12 md:gap-16 lg:gap-20 items-center">
          <div className="lg:w-1/2">
            <div className="inline-flex items-center gap-2 text-blue-600 font-bold mb-6 bg-blue-50 px-5 py-2 rounded-full uppercase text-xs tracking-wider border border-blue-100">
              <Droplets size={16} /> Pôle Sanitaire
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6 md:mb-8 leading-tight">Dites adieu à l'humidité qui ronge vos murs</h2>
            <p className="text-slate-600 text-base md:text-lg mb-6 md:mb-8 leading-relaxed">
              Salpêtre qui blanchit vos murs, moisissures qui envahissent, peinture qui se décolle ? L'eau remonte inexorablement du sol. 
              Ventiler ou déshumidifier ne suffit pas : <strong className="text-slate-900">nous créons une barrière étanche au cœur même de vos murs</strong>, pour stopper définitivement les remontées capillaires.
            </p>
            
            <div className="space-y-4 md:space-y-6">
              <div className="flex gap-4 md:gap-5 p-4 md:p-5 rounded-xl md:rounded-2xl bg-white hover:bg-blue-50 transition border border-blue-100/50 group shadow-sm">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0 font-bold group-hover:scale-110 transition text-sm md:text-base">1</div>
                <div>
                  <h3 className="font-bold text-base md:text-lg text-slate-900 mb-1">Injection hydrophobe : un bouclier invisible dans vos murs</h3>
                  <p className="text-sm md:text-base text-slate-500">Nous injectons une résine spéciale qui se transforme en barrière étanche au contact de l'eau. Résultat : les remontées capillaires sont stoppées à la source. <strong className="text-blue-600">Garantie 30 ans, résultat visible en 3 mois.</strong></p>
                </div>
              </div>
              <div className="flex gap-4 md:gap-5 p-4 md:p-5 rounded-xl md:rounded-2xl bg-white hover:bg-blue-50 transition border border-blue-100/50 group shadow-sm">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0 font-bold group-hover:scale-110 transition text-sm md:text-base">2</div>
                <div>
                  <h3 className="font-bold text-base md:text-lg text-slate-900 mb-1">Cuvelage & ventilation : la solution complète</h3>
                  <p className="text-sm md:text-base text-slate-500">Pour les caves et sous-sols, nous appliquons un traitement époxy étanche et installons une VMI (Ventilation Mécanique par Insufflation) pour éliminer définitivement l'humidité résiduelle et la condensation.</p>
                </div>
              </div>
            </div>
            
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link href="/expertise/humidite" className="inline-flex items-center gap-3 text-blue-600 font-bold text-lg hover:gap-5 transition-all group">
                En savoir plus sur l'humidité <ArrowRight size={20} />
              </Link>
              <Link href="/diagnostic" className="inline-flex items-center gap-3 text-slate-600 font-bold text-lg hover:text-blue-600 transition-all group">
                Diagnostic gratuit <ArrowRight size={20} />
              </Link>
            </div>
          </div>
          
          <div className="lg:w-1/2 relative">
            <div className="aspect-[4/5] bg-slate-200 rounded-3xl overflow-hidden shadow-2xl relative border-8 border-white transform -rotate-2 hover:rotate-0 transition duration-500">
              {/* Image Avant/Après Humidité */}
              <div className="relative w-full h-full">
                <ImageAvantApres
                  src="/images/humidite-avant-apres.webp"
                  alt="Avant/Après : Mur avec humidité, moisissures et salpêtre transformé en mur sain et rénové - IPB"
                  fallbackIcon={<Droplets size={64} className="mx-auto mb-4 opacity-50" />}
                  fallbackText="[Photo : Mur avec Salpêtre vs Mur Sain]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

