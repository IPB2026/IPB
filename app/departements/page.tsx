import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, ArrowRight, Phone } from 'lucide-react';
import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { SmartBackBar } from "@/components/ui/SmartBackBar";
import { Footer } from '@/components/home/Footer';

export const metadata: Metadata = {
  title: "Départements Occitanie · Expert Fissures & Humidité",
  description: "IPB intervient en Haute-Garonne, Tarn-et-Garonne, Gers, Tarn, Ariège, Aude. Diagnostic sous 48h. Décennale AXA. ☎ 05 82 95 33 75",
  alternates: {
    canonical: 'https://www.ipb-expertise.fr/departements',
  },
};

const departements = [
  {
    slug: 'haute-garonne',
    nom: 'Haute-Garonne',
    code: '31',
    villes: 'Toulouse, Colomiers, Blagnac, Muret, Tournefeuille',
    color: 'from-orange-600 to-red-600',
    badge: 'Zone principale',
  },
  {
    slug: 'tarn',
    nom: 'Tarn',
    code: '81',
    villes: 'Albi, Castres, Gaillac, Lavaur, Mazamet',
    color: 'from-purple-600 to-purple-800',
    badge: null,
  },
  {
    slug: 'tarn-et-garonne',
    nom: 'Tarn-et-Garonne',
    code: '82',
    villes: 'Montauban, Castelsarrasin, Moissac, Caussade',
    color: 'from-orange-500 to-orange-700',
    badge: null,
  },
  {
    slug: 'gers',
    nom: 'Gers',
    code: '32',
    villes: 'Auch, Condom, Fleurance, L\'Isle-Jourdain',
    color: 'from-blue-600 to-blue-800',
    badge: null,
  },
  {
    slug: 'ariege',
    nom: 'Ariège',
    code: '09',
    villes: 'Foix, Pamiers, Saint-Girons, Lavelanet',
    color: 'from-emerald-700 to-teal-800',
    badge: null,
  },
  {
    slug: 'aude',
    nom: 'Aude',
    code: '11',
    villes: 'Carcassonne, Narbonne, Castelnaudary, Limoux',
    color: 'from-amber-600 to-amber-800',
    badge: null,
  },
];

export default function DepartementsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white font-sans antialiased">
      <TopBar />
      <Navbar />
      <SmartBackBar />

      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full text-sm font-bold mb-6">
            <MapPin size={16} />
            Nos zones d'intervention
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
            Expert Fissures & Humidité<br />
            <span className="text-ipb-orange-l">dans le Sud-Ouest</span>
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Basés à Toulouse, nous intervenons dans 6 départements pour traiter vos fissures et problèmes d'humidité.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departements.map((dept) => (
              <Link
                key={dept.slug}
                href={`/departements/${dept.slug}`}
                className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all border border-ipb-rule hover:border-ipb-rule overflow-hidden"
              >
                <div className={`bg-gradient-to-br ${dept.color} p-6 text-white`}>
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-extrabold">{dept.nom}</h2>
                    <span className="text-4xl font-extrabold opacity-30">{dept.code}</span>
                  </div>
                  {dept.badge && (
                    <span className="inline-block mt-2 text-xs bg-white/20 px-3 py-1 rounded-full font-bold">
                      {dept.badge}
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <p className="text-sm text-ipb-muted mb-4">{dept.villes}</p>
                  <span className="text-sm font-bold text-ipb-orange group-hover:text-ipb-orange flex items-center gap-1">
                    Voir les interventions <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ipb-orange py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
            Fissures ou humidité ?
          </h2>
          <p className="text-xl text-orange-50 mb-8">
            Diagnostic sous 48h dans tous nos départements d'intervention
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/diagnostic"
              className="inline-flex items-center justify-center gap-2 bg-white text-ipb-orange px-8 py-4 rounded-xl font-bold text-lg hover:bg-ipb-stone transition-all shadow-xl"
            >
              Faire mon diagnostic gratuit
              <ArrowRight size={20} />
            </Link>
            <a
              href="tel:0582953375"
              className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur border border-white/20 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all"
            >
              <Phone size={20} />
              05 82 95 33 75
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
