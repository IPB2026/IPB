import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export function ServicesStructure() {
  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="order-2 lg:order-1">
            <p className="text-[13px] font-semibold tracking-[0.15em] uppercase text-orange-500 mb-4">
              Pôle Structure
            </p>
            <h2 className="text-3xl md:text-[2.75rem] font-bold text-slate-900 leading-tight mb-6 tracking-tight">
              Comprendre vos fissures pour les traiter définitivement
            </h2>
            <p className="text-slate-500 text-base md:text-lg leading-relaxed mb-8">
              Une fissure est le symptôme d&apos;un mouvement structurel — tassement différentiel, 
              retrait-gonflement des argiles, défaut de fondation. Reboucher sans diagnostiquer, 
              c&apos;est masquer le problème.
            </p>

            <div className="space-y-6 mb-10">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center text-sm font-bold shrink-0 mt-0.5">1</div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">Agrafage structurel</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">Agrafes inox scellées tous les 40 cm. Le mur retrouve sa cohésion monolithique. Garanti 10 ans.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center text-sm font-bold shrink-0 mt-0.5">2</div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">Matage résine fibré</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">Mortier résine à module d&apos;élasticité contrôlé. Accompagne les variations du support sans rompre.</p>
                </div>
              </div>
            </div>

            <Link href="/expertise/fissures" className="group inline-flex items-center gap-2 text-slate-900 font-semibold hover:text-orange-600 transition-colors text-[15px]">
              Découvrir l&apos;expertise fissures
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5]">
              <Image
                src="/images/fissure-facade-diagonale.webp"
                alt="Fissure structurelle sur façade — diagnostic expert IPB"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-white/80 text-sm font-medium">Fissure structurelle active — tassement différentiel</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
