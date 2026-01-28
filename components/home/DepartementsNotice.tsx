import Link from 'next/link';
import { MapPin, Users, ArrowRight } from 'lucide-react';

export function DepartementsNotice() {
  return (
    <div className="bg-gradient-to-r from-orange-50 via-blue-50 to-orange-50 border-y border-orange-100 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left: Icon + Text */}
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
              <Users size={28} className="text-white" />
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-1">
                Des experts près de chez vous
              </h3>
              <p className="text-slate-600 text-sm md:text-base">
                <strong className="text-orange-600">Haute-Garonne</strong>, <strong className="text-orange-600">Tarn-et-Garonne</strong> et <strong className="text-blue-600">Gers</strong> : nos experts interviennent dans les <strong>3 départements</strong> pour une proximité et un service de qualité.
              </p>
            </div>
          </div>

          {/* Right: Links */}
          <div className="flex flex-wrap justify-center gap-3 flex-shrink-0">
            <Link
              href="/departements/tarn-et-garonne"
              className="group inline-flex items-center gap-2 bg-white hover:bg-orange-50 text-orange-600 border border-orange-200 px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm hover:shadow"
            >
              <MapPin size={16} />
              <span className="hidden sm:inline">Tarn-et-Garonne</span>
              <span className="sm:hidden">82</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/departements/gers"
              className="group inline-flex items-center gap-2 bg-white hover:bg-blue-50 text-blue-600 border border-blue-200 px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm hover:shadow"
            >
              <MapPin size={16} />
              <span className="hidden sm:inline">Gers</span>
              <span className="sm:hidden">32</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
