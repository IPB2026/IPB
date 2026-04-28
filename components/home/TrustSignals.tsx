import Image from 'next/image';
import { FileCheck, Hammer, Phone, Shield, Users } from 'lucide-react';

export function TrustSignals() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      {/* Bandeau garantie 10 ans — clair, sans jargon */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-6 md:p-10 mb-12 shadow-2xl overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

        <div className="relative grid md:grid-cols-[auto_1fr_auto] gap-6 items-center">
          <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center mx-auto md:mx-0 shadow-xl">
            <Shield className="text-white" size={40} />
          </div>

          <div className="text-center md:text-left">
            <p className="text-orange-300 text-xs font-bold uppercase tracking-[0.2em] mb-2">
              Garantie 10 ans · Assurés par AXA France
            </p>
            <h2 className="text-white font-bold text-2xl md:text-3xl mb-2 font-display tracking-tight">
              Si ça bouge, on revient. Gratuitement.
            </h2>
            <p className="text-slate-300 text-base leading-relaxed max-w-2xl">
              Tout ce qu'on fait — étude, ouverture de mur, agrafage de fissure — est couvert pendant 10 ans.
              Une seule attestation, une seule responsabilité. <strong className="text-white">On vous la remet avec le devis.</strong>
            </p>
          </div>

          <a
            href="/contact"
            className="bg-orange-500 hover:bg-orange-400 text-white font-bold px-7 py-3.5 rounded-xl text-sm whitespace-nowrap transition-all flex items-center gap-2 justify-center hover:shadow-2xl hover:-translate-y-0.5"
          >
            <FileCheck size={16} />
            Voir l'attestation
          </a>
        </div>
      </div>

      {/* Trois piliers de confiance — copywriting humain */}
      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
        {/* Bande colorée premium */}
        <div className="h-1 w-full bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500"></div>

        <div className="grid md:grid-cols-3">
          {/* Indépendants — pas de jargon */}
          <div className="p-8 md:p-10 md:border-r md:border-slate-100">
            <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600 mb-6">
              <Users size={28} />
            </div>
            <p className="text-orange-600 text-xs font-bold uppercase tracking-wider mb-2">Indépendants</p>
            <h3 className="font-display font-bold text-2xl text-slate-900 mb-3 leading-tight">
              On ne vend pas<br />de produits.
            </h3>
            <p className="text-slate-600 leading-relaxed">
              Pas de partenariat avec un fabricant, pas de commission cachée. On regarde votre maison, on vous dit ce qu'elle a, et on propose la solution la plus adaptée — pas la plus rentable pour nous.
            </p>
          </div>

          {/* Étude + travaux — clair */}
          <div className="p-8 md:p-10 md:border-r md:border-slate-100 bg-slate-50/50">
            <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 mb-6">
              <Hammer size={28} />
            </div>
            <p className="text-amber-700 text-xs font-bold uppercase tracking-wider mb-2">Tout en interne</p>
            <h3 className="font-display font-bold text-2xl text-slate-900 mb-3 leading-tight">
              Du premier coup d'œil<br />aux dernières finitions.
            </h3>
            <p className="text-slate-600 leading-relaxed">
              Notre ingénieur calcule la poutre. Nos équipes l'installent. Pas de sous-traitant à coordonner, pas de
              jeu de ping-pong entre bureau d'études et entreprise. Vous avez un seul interlocuteur, du devis à la livraison.
            </p>
          </div>

          {/* Visage humain — Ludovic */}
          <div className="p-8 md:p-10 relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden mb-5 shadow-lg ring-1 ring-slate-200">
              <Image
                src="/images/ludovic-expert-ipb.webp"
                alt="Ludovic, expert structure et fondateur d'IPB Expertise à Toulouse"
                width={400}
                height={500}
                className="w-full h-full object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <p className="text-emerald-700 text-xs font-bold uppercase tracking-wider mb-2">Une équipe, un visage</p>
            <h3 className="font-display font-bold text-xl text-slate-900 mb-2 leading-tight">
              Ludovic, votre interlocuteur.
            </h3>
            <p className="text-slate-600 leading-relaxed text-sm">
              15 ans de chantiers, 850+ maisons accompagnées en Occitanie. C'est lui qui passe chez vous, lui qui chiffre,
              lui qui suit le chantier. Pas un commercial, pas un sous-traitant.
            </p>
          </div>
        </div>

        {/* CTA bas */}
        <div className="p-8 bg-slate-50 border-t border-slate-100 text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/diagnostic"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3.5 rounded-full transition-all hover:shadow-xl hover:-translate-y-0.5 text-sm"
            >
              Décrire mon projet en 3 minutes
            </a>
            <a
              href="tel:0582953375"
              className="inline-flex items-center gap-2 text-slate-700 hover:text-slate-900 font-semibold text-sm transition-colors"
            >
              <Phone size={16} className="text-orange-500" />
              ou appeler le 05 82 95 33 75
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
