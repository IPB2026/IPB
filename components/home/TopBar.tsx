import { ShieldCheck, MapPin } from 'lucide-react';

export function TopBar() {
  return (
    <div className="bg-slate-900 text-white py-2 md:py-2.5 px-4 text-xs font-medium border-b border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
        <div className="flex flex-wrap items-center gap-3 md:gap-6 justify-center md:justify-start">
          <span className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors cursor-default">
            <ShieldCheck size={14} className="text-orange-500 shrink-0" /> <span className="whitespace-nowrap">Garantie Décennale</span>
          </span>
          <span className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors cursor-default">
            <MapPin size={14} className="text-orange-500 shrink-0" /> <span className="whitespace-nowrap">Intervention Haute-Garonne (31)</span>
          </span>
        </div>
        <div className="flex items-center gap-2 font-bold text-orange-400 text-center">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shrink-0"></div>
          <span className="whitespace-nowrap">Expert disponible au <a href="tel:0582953375" className="hover:text-orange-300 underline">05 82 95 33 75</a></span>
        </div>
      </div>
    </div>
  );
}

