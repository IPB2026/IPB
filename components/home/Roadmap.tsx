import { Search, FileText, Hammer, ShieldCheck } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Diagnostic instrumenté',
    description: 'Visite sur site avec instrumentation technique (fissuromètre, hygromètre, caméra thermique). Mesures objectives pour identifier l\'origine exacte du problème.',
    detail: 'Rapport de 10 à 15 pages',
    color: 'orange',
  },
  {
    number: '02',
    icon: FileText,
    title: 'Plan de remédiation',
    description: 'Sur la base du diagnostic, nous établissons un plan de remédiation détaillé : technique préconisée, chiffrage, planning d\'intervention.',
    detail: 'Devis détaillé sous 7 jours',
    color: 'blue',
  },
  {
    number: '03',
    icon: Hammer,
    title: 'Réalisation des travaux',
    description: 'Nos équipes interviennent directement : agrafage structurel, injection résine, cuvelage, ventilation. Un seul interlocuteur du début à la fin.',
    detail: 'Chantier de 1 à 5 jours',
    color: 'emerald',
  },
  {
    number: '04',
    icon: ShieldCheck,
    title: 'Suivi post-intervention',
    description: 'Contrôle qualité après travaux, vérification des mesures, accompagnement pour les démarches assurance ou copropriété. On ne vous lâche pas.',
    detail: 'Garantie décennale incluse',
    color: 'violet',
  },
];

const colorMap = {
  orange: {
    bg: 'bg-orange-50',
    text: 'text-orange-600',
    border: 'border-orange-200',
    line: 'bg-orange-400',
    badge: 'bg-orange-100 text-orange-700',
  },
  blue: {
    bg: 'bg-blue-50',
    text: 'text-blue-600',
    border: 'border-blue-200',
    line: 'bg-blue-400',
    badge: 'bg-blue-100 text-blue-700',
  },
  emerald: {
    bg: 'bg-emerald-50',
    text: 'text-emerald-600',
    border: 'border-emerald-200',
    line: 'bg-emerald-400',
    badge: 'bg-emerald-100 text-emerald-700',
  },
  violet: {
    bg: 'bg-violet-50',
    text: 'text-violet-600',
    border: 'border-violet-200',
    line: 'bg-violet-400',
    badge: 'bg-violet-100 text-violet-700',
  },
};

export function Roadmap() {
  return (
    <section className="py-16 md:py-24 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4">
            Un accompagnement complet, étape par étape
          </h2>
          <p className="text-slate-500 text-base md:text-lg max-w-2xl mx-auto">
            Du premier appel à la garantie décennale, IPB reste votre unique interlocuteur.
          </p>
        </div>

        {/* Desktop : horizontal */}
        <div className="hidden md:block">
          <div className="relative">
            {/* Ligne de connexion */}
            <div className="absolute top-16 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-orange-300 via-blue-300 via-emerald-300 to-violet-300 z-0" />

            <div className="grid grid-cols-4 gap-6 relative z-10">
              {steps.map((step) => {
                const colors = colorMap[step.color as keyof typeof colorMap];
                const Icon = step.icon;
                return (
                  <div key={step.number} className="flex flex-col items-center text-center group">
                    {/* Numéro + icône */}
                    <div className={`w-32 h-32 ${colors.bg} rounded-3xl flex flex-col items-center justify-center mb-6 border-2 ${colors.border} group-hover:scale-105 transition-transform duration-300 shadow-sm`}>
                      <span className={`text-xs font-bold ${colors.text} opacity-60 mb-1`}>{step.number}</span>
                      <Icon size={36} className={colors.text} />
                    </div>

                    <h3 className="font-bold text-lg text-slate-900 mb-2">{step.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-3 px-2">
                      {step.description}
                    </p>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${colors.badge}`}>
                      {step.detail}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile : vertical timeline */}
        <div className="md:hidden">
          <div className="relative pl-8">
            {/* Ligne verticale */}
            <div className="absolute left-[15px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-300 via-blue-300 via-emerald-300 to-violet-300" />

            <div className="space-y-8">
              {steps.map((step) => {
                const colors = colorMap[step.color as keyof typeof colorMap];
                const Icon = step.icon;
                return (
                  <div key={step.number} className="relative">
                    {/* Point sur la timeline */}
                    <div className={`absolute -left-8 top-1 w-8 h-8 ${colors.bg} rounded-full flex items-center justify-center border-2 ${colors.border} z-10`}>
                      <Icon size={14} className={colors.text} />
                    </div>

                    <div className={`${colors.bg} rounded-2xl p-5 border ${colors.border}`}>
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`text-xs font-bold ${colors.text} opacity-60`}>{step.number}</span>
                        <h3 className="font-bold text-base text-slate-900">{step.title}</h3>
                      </div>
                      <p className="text-slate-500 text-sm leading-relaxed mb-3">
                        {step.description}
                      </p>
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${colors.badge}`}>
                        {step.detail}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
