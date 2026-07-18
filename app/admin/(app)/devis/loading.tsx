/** Squelette spécifique à la liste Clients : en-tête + recherche + tableau. */
export default function Loading() {
  return (
    <div className="animate-pulse space-y-5" aria-hidden="true">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-7 w-32 rounded-lg bg-slate-200" />
          <div className="h-3 w-56 rounded bg-slate-100" />
        </div>
        <div className="h-9 w-28 rounded-lg bg-slate-200" />
      </div>
      <div className="h-16 rounded-xl border border-slate-200 bg-slate-50" />
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-3 border-b border-slate-100 px-5 py-3.5 last:border-0"
          >
            <div className="h-9 w-9 rounded-full bg-slate-200" />
            <div className="flex-1 space-y-1.5">
              <div className="h-3.5 w-40 rounded bg-slate-200" />
              <div className="h-2.5 w-24 rounded bg-slate-100" />
            </div>
            <div className="h-5 w-16 rounded bg-slate-100" />
          </div>
        ))}
      </div>
    </div>
  );
}
