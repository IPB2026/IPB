import Image from 'next/image';
import { FileCheck, Phone, Shield, Users } from 'lucide-react';

export function TrustSignals() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      {/* Bandeau garantie 10 ans — clair, sans jargon */}
      <div className="bg-gradient-to-r from-ipb-navy to-[#1a2d40] rounded-3xl p-6 md:p-10 mb-12 shadow-2xl overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

        <div className="relative grid md:grid-cols-[auto_1fr_auto] gap-6 items-center">
          <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center mx-auto md:mx-0 shadow-xl">
            <Shield className="text-white" size={40} />
          </div>

          <div className="text-center md:text-left">
            <p className="text-orange-300 text-xs font-bold uppercase tracking-[0.2em] mb-2">
              Diagnostic indépendant · Un seul interlocuteur
            </p>
            <h2 className="text-white font-bold text-2xl md:text-3xl mb-2 font-display tracking-tight">
              On vous dit la vérité sur votre bâti.
            </h2>
            <p className="text-white/75 text-base leading-relaxed max-w-2xl">
              L'institut tient le dossier, du premier regard au rapport. On diagnostique en toute indépendance ; si des travaux sont nécessaires, on vous oriente vers des entreprises membres du réseau IPB. <strong className="text-white">Rapport clair, remis sous 3 à 5 jours.</strong>
            </p>
          </div>

          <a
            href="/diagnostic"
            className="bg-orange-500 hover:bg-orange-400 text-white font-bold px-7 py-3.5 rounded-xl text-sm whitespace-nowrap transition-all flex items-center gap-2 justify-center hover:shadow-2xl hover:-translate-y-0.5"
          >
            <FileCheck size={16} />
            Diagnostic gratuit
          </a>
        </div>
      </div>

      {/* Trois piliers de confiance — copywriting humain */}
      <div className="bg-white rounded-3xl shadow-xl border border-ipb-rule overflow-hidden">
        {/* Bande colorée premium */}
        <div className="h-1 w-full bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500"></div>

        <div className="grid md:grid-cols-3">
          {/* Indépendants — pas de jargon */}
          <div className="p-8 md:p-10 md:border-r md:border-ipb-rule">
            <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600 mb-6">
              <Users size={28} />
            </div>
            <p className="text-orange-600 text-xs font-bold uppercase tracking-wider mb-2">Indépendants</p>
            <h3 className="font-display font-bold text-2xl text-ipb-text mb-3 leading-tight">
              On ne vend pas<br />de produits.
            </h3>
            <p className="text-ipb-muted leading-relaxed">
              Aucun lien commercial avec un fabricant, aucune commission cachée. On regarde votre bâti, on vous dit ce qu'il a, et on propose la solution la plus adaptée — pas la plus rentable pour nous.
            </p>
          </div>

          {/* Diagnostic indépendant — clair */}
          <div className="p-8 md:p-10 md:border-r md:border-ipb-rule bg-ipb-cream/50">
            <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 mb-6">
              <FileCheck size={28} />
            </div>
            <p className="text-amber-700 text-xs font-bold uppercase tracking-wider mb-2">Un dossier clair</p>
            <h3 className="font-display font-bold text-2xl text-ipb-text mb-3 leading-tight">
              Du premier coup d'œil<br />au rapport qui décide.
            </h3>
            <p className="text-ipb-muted leading-relaxed">
              L'institut tient le dossier de bout en bout : observation, mesures, analyse, rapport. Un même protocole, en toute indépendance. Si des travaux s'imposent, on vous oriente vers des entreprises membres du réseau IPB.
            </p>
          </div>

          {/* Visuel chantier — preuve sociale */}
          <div className="p-8 md:p-10 relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden mb-5 shadow-lg ring-1 ring-ipb-rule">
              <Image
                src="/images/fissures-avant-apres.webp"
                alt="Diagnostic de fissures sur site — relevé et mesures par un expert du réseau IPB en Occitanie"
                width={400}
                height={500}
                className="w-full h-full object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <p className="text-emerald-700 text-xs font-bold uppercase tracking-wider mb-2">Un institut, un réseau</p>
            <h3 className="font-display font-bold text-xl text-ipb-text mb-2 leading-tight">
              L'institut, votre interlocuteur.
            </h3>
            <p className="text-ipb-muted leading-relaxed text-sm">
              Réseau IPB actif depuis 2019, plus de 850 chantiers menés en Occitanie. Côté institut, un seul visage, du premier signe au rapport — votre dossier ne change pas de mains.
            </p>
          </div>
        </div>

        {/* CTA bas */}
        <div className="p-8 bg-ipb-cream border-t border-ipb-rule text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/diagnostic"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3.5 rounded-full transition-all hover:shadow-xl hover:-translate-y-0.5 text-sm"
            >
              Décrire mon projet en 3 minutes
            </a>
            <a
              href="tel:0582953375"
              className="inline-flex items-center gap-2 text-ipb-muted hover:text-ipb-text font-semibold text-sm transition-colors"
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
