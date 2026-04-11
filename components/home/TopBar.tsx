import { Phone } from 'lucide-react';

export function TopBar() {
  return (
    <div className="bg-[#0a0a0a] text-white/70 py-2 px-4 text-[11px] tracking-wide">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <span className="hidden sm:inline">Cabinet spécialisé en pathologie du bâtiment — Occitanie</span>
        <a href="tel:0582953375" className="flex items-center gap-1.5 text-white/90 hover:text-white transition-colors ml-auto sm:ml-0">
          <Phone size={11} />
          05 82 95 33 75
        </a>
      </div>
    </div>
  );
}
