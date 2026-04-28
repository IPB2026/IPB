import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Hammer, Activity, CheckCircle } from 'lucide-react';

export function ServicesStructure() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Colonne texte */}
          <div>
            <div className="inline-flex items-center gap-2 text-orange-600 font-bold mb-6 bg-orange-50 px-5 py-2 rounded-full uppercase text-xs tracking-wider border border-orange-100">
              <Hammer size={16} /> Notre métier
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight tracking-tight">
              On s'occupe de <span className="text-orange-600">la structure</span><br />de votre maison.
            </h2>
            <p className="text-slate-600 text-lg mb-8 leading-relaxed">
              Deux situations, le même métier : on regarde, on calcule, on construit. <strong className="text-slate-900">Vous, vous n'avez pas à devenir expert en bâtiment</strong> — on traduit ce qu'on voit en clair, et on s'occupe du chantier.
            </p>

            <div className="space-y-4">
              {/* Service 1 — Mur porteur (mis en avant, c'est le pilier) */}
              <Link href="/expertise/mur-porteur" className="block p-6 rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 hover:from-orange-100 hover:to-amber-100 border border-orange-100 transition-all group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-orange-600 shrink-0 shadow-sm group-hover:scale-110 transition">
                    <Hammer size={22} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display font-bold text-xl text-slate-900 mb-1.5">
                      Vous voulez ouvrir un mur ou créer une baie vitrée
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-3">
                      Cuisine fermée à ouvrir sur le séjour ? Baie vitrée à percer côté jardin ?
                      Notre ingénieur calcule la poutre, nos équipes la posent. <strong className="text-slate-800">3 à 5 jours sur place.</strong>
                    </p>
                    <div className="flex items-center gap-2 text-orange-600 font-bold text-sm">
                      Voir comment on procède <ArrowRight size={14} className="group-hover:translate-x-1 transition" />
                    </div>
                  </div>
                </div>
              </Link>

              {/* Service 2 — Fissures */}
              <Link href="/expertise/fissures" className="block p-6 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-100 transition-all group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-orange-600 shrink-0 shadow-sm group-hover:scale-110 transition">
                    <Activity size={22} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display font-bold text-xl text-slate-900 mb-1.5">
                      Vous voyez des fissures qui vous inquiètent
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-3">
                      Une fente qui s'agrandit, une porte qui coince ? On vient avec nos instruments,
                      on vous dit si c'est sérieux ou pas, et on chiffre la solution. <strong className="text-slate-800">Diagnostic sous 48h.</strong>
                    </p>
                    <div className="flex items-center gap-2 text-orange-600 font-bold text-sm">
                      Voir comment on procède <ArrowRight size={14} className="group-hover:translate-x-1 transition" />
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <Link href="/diagnostic" className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-7 py-3.5 rounded-full transition-all hover:shadow-xl hover:-translate-y-0.5">
                Décrire mon projet <ArrowRight size={16} />
              </Link>
              <a href="tel:0582953375" className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 font-semibold text-sm transition-colors">
                ou appeler le 05 82 95 33 75
              </a>
            </div>
          </div>

          {/* Colonne image — chantier réel */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl ring-1 ring-slate-200">
              <Image
                src="/images/ouverture-mur-porteur.webp"
                alt="Ouverture de mur porteur en cours sur un chantier IPB à Toulouse — pose d'une poutre IPN par les équipes"
                width={800}
                height={600}
                className="w-full h-auto object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

              {/* Overlay d'info */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-orange-300 text-xs font-bold uppercase tracking-wider mb-2">
                  Pendant le chantier
                </p>
                <p className="text-white font-display text-2xl font-bold leading-tight mb-1">
                  Étaiement, découpe, pose de la poutre.
                </p>
                <p className="text-slate-200 text-sm">Nos équipes interviennent en moyenne 3 à 5 jours.</p>
              </div>
            </div>

            {/* Badge flottant — preuve concrète */}
            <div className="absolute -top-4 -right-4 bg-white p-5 rounded-2xl shadow-xl border border-slate-100 hidden md:block z-10 max-w-[200px]">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">En direct</span>
              </div>
              <p className="font-display font-bold text-2xl text-slate-900 leading-tight">850+</p>
              <p className="text-sm text-slate-600 leading-tight mt-1">chantiers livrés en Occitanie</p>
            </div>

            {/* Mini-galerie sous l'image principale */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              {[
                { src: '/images/creation-baie-vitree-1.webp', alt: 'Baie vitrée créée par IPB — chantier Toulouse', label: 'Baie créée' },
                { src: '/images/creation-baie-vitree-2.webp', alt: 'Baie vitrée terminée chez un client IPB', label: 'Finitions' },
                { src: '/images/baie-coulissante-apres.webp', alt: 'Baie coulissante après ouverture mur porteur', label: 'Résultat' },
              ].map((img) => (
                <div key={img.src} className="relative rounded-xl overflow-hidden shadow-md ring-1 ring-slate-200 aspect-[4/3] group">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 1024px) 30vw, 16vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />
                  <p className="absolute bottom-1.5 left-2 right-2 text-white text-[10px] font-bold uppercase tracking-wide">
                    {img.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
