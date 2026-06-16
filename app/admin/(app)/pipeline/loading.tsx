/** Squelette spécifique au Kanban : colonnes + cartes (au lieu du squelette
 *  générique « bandeau KPI + liste » qui ne correspond pas à cette page). */
export default function Loading() {
  return (
    <div className="animate-pulse space-y-5" aria-hidden="true">
      <div className="space-y-2">
        <div className="h-7 w-40 rounded-lg bg-slate-200" />
        <div className="h-3 w-64 rounded bg-slate-100" />
      </div>
      <div className="flex gap-3 overflow-hidden pb-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="w-64 shrink-0 rounded-xl border border-slate-200 bg-slate-50">
            <div className="border-b border-slate-200 px-3 py-2.5">
              <div className="h-4 w-24 rounded bg-slate-200" />
            </div>
            <div className="space-y-2 p-2">
              {Array.from({ length: 3 }).map((_, j) => (
                <div key={j} className="h-20 rounded-lg border border-slate-200 bg-white" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
