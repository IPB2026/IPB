"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { usePathname } from "next/navigation";

export function StickyDiagnosticCta() {
  const pathname = usePathname();

  // Ne pas afficher le CTA sticky sur Diagnostic et pages conformité
  if (pathname?.startsWith("/diagnostic") || pathname?.startsWith("/legal")) {
    return null;
  }

  return (
    <div className="lg:hidden fixed bottom-4 left-4 right-4 z-50">
      <Link
        href="/diagnostic"
        className="w-full flex items-center justify-center gap-3 bg-orange-600 hover:bg-orange-500 text-white font-bold py-4 rounded-2xl shadow-2xl shadow-orange-900/40 transition-all focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
        aria-label="Lancer le diagnostic gratuit"
      >
        Diagnostic gratuit
        <ArrowRight size={18} />
      </Link>
    </div>
  );
}
