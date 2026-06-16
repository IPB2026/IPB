/**
 * Squelette de chargement partagé par toutes les pages du back-office.
 * Next l'affiche INSTANTANÉMENT au clic pendant que la page serveur se rend —
 * la navigation paraît immédiate au lieu de figer l'écran (perçu = rapide).
 */
export default function Loading() {
  return (
    <div className="animate-pulse space-y-6" aria-hidden="true">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-7 w-44 rounded-lg bg-slate-200" />
          <div className="h-3 w-60 rounded bg-slate-100" />
        </div>
        <div className="h-9 w-32 rounded-lg bg-slate-200" />
      </div>

      {/* Bandeau d'indicateurs */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-24 rounded-xl border border-slate-200 bg-slate-50" />
        ))}
      </div>

      {/* Liste */}
      <div className="space-y-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-16 rounded-xl border border-slate-200 bg-slate-50"
          />
        ))}
      </div>
    </div>
  );
}
