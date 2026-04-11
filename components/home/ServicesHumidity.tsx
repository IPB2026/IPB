import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export function ServicesHumidity() {
  return (
    <section className="py-20 md:py-32 bg-[#fafafa]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div>
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5]">
              <Image
                src="/images/humidite-avant-apres.webp"
                alt="Traitement humidité et salpêtre — expertise IPB"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-white/80 text-sm font-medium">Remontées capillaires — avant traitement par injection</p>
              </div>
            </div>
          </div>

          <div>
            <p className="text-[13px] font-semibold tracking-[0.15em] uppercase text-blue-500 mb-4">
              Pôle Sanitaire
            </p>
            <h2 className="text-3xl md:text-[2.75rem] font-bold text-slate-900 leading-tight mb-6 tracking-tight">
              Identifier la source de l&apos;humidité pour la traiter à l&apos;origine
            </h2>
            <p className="text-slate-500 text-base md:text-lg leading-relaxed mb-8">
              Salpêtre, moisissures, peinture qui cloque : ces symptômes ont des causes 
              distinctes. Un déshumidificateur ne résout rien si le diagnostic est faux.
            </p>

            <div className="space-y-6 mb-10">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-sm font-bold shrink-0 mt-0.5">1</div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">Injection résine hydrophobe</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">Barrière étanche continue sur toute l&apos;épaisseur du mur. Résultat mesurable sous 3 mois, garanti 30 ans.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-sm font-bold shrink-0 mt-0.5">2</div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">Cuvelage et ventilation</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">Cuvelage époxy pour les parois enterrées. VMI en surpression pour empêcher l&apos;humidité de stagner.</p>
                </div>
              </div>
            </div>

            <Link href="/expertise/humidite" className="group inline-flex items-center gap-2 text-slate-900 font-semibold hover:text-blue-600 transition-colors text-[15px]">
              Découvrir l&apos;expertise humidité
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
