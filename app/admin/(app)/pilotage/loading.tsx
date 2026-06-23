/** Squelette du pilotage : en-tête + 2 rangées de cartes KPI + panneaux graphiques. */
export default function Loading() {
  return (
    <div className="animate-pulse space-y-6" aria-hidden="true">
      <div className="space-y-2">
        <div className="h-7 w-40 rounded-lg bg-slate-200" />
        <div className="h-3 w-72 rounded bg-slate-100" />
      </div>

      {[0, 1].map((row) => (
        <div key={row} className="space-y-2.5">
          <div className="h-3 w-44 rounded bg-slate-100" />
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="h-3 w-20 rounded bg-slate-100" />
                <div className="mt-3 h-6 w-24 rounded bg-slate-200" />
                <div className="mt-2 h-2.5 w-16 rounded bg-slate-100" />
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="h-3.5 w-48 rounded bg-slate-200" />
            <div className="mt-4 space-y-2.5">
              {Array.from({ length: 5 }).map((_, j) => (
                <div key={j} className="h-4 rounded bg-slate-100" style={{ width: `${90 - j * 12}%` }} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
