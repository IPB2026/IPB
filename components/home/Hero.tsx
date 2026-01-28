import Link from 'next/link';
import { ArrowRight, Phone, CheckCircle } from 'lucide-react';

export function Hero() {
  return (
    <div className="relative bg-slate-900 text-white overflow-hidden pb-24 pt-20 md:pt-28 md:pb-32 lg:pt-32 lg:pb-40" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 90%, 0 100%)' }}>
      {/* Abstract Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-orange-950 opacity-90"></div>
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:w-3/4 lg:w-3/5">
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 text-orange-100 px-4 py-1.5 rounded-full text-xs font-bold mb-8 uppercase tracking-wider backdrop-blur-md shadow-sm">
             <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse"></span> Expert RGA & Infiltrations
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-8 drop-shadow-sm">
            Votre maison se <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-200">fissure</span> ? L'<span className="text-blue-400">humidité</span> envahit vos murs ?<br/>Ne laissez pas votre patrimoine se dégrader.
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl leading-relaxed">
            <strong className="text-white">Expert reconnu en Haute-Garonne, Tarn-et-Garonne et Gers</strong>, IPB stabilise vos fondations et assèche vos murs avec des techniques éprouvées. 
            <br/><strong className="text-white border-b border-orange-500/50 pb-0.5">Économisez jusqu'à 70% par rapport aux micropieux</strong> tout en garantissant la solidité de votre bien.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5">
            <Link href="/diagnostic" className="w-full sm:w-auto bg-orange-600 text-white px-8 py-5 rounded-xl font-bold text-lg shadow-xl shadow-orange-900/40 hover:bg-orange-500 transition-all flex items-center justify-center gap-3 transform hover:-translate-y-1">
              Diagnostic gratuit en 3 minutes
              <ArrowRight size={22} />
            </Link>
            <a href="tel:0582953375" className="w-full sm:w-auto bg-white/5 backdrop-blur-md border border-white/10 text-white px-8 py-5 rounded-xl font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-3">
              <Phone size={22} />
              Consultation gratuite par téléphone
            </a>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-6 text-sm text-slate-400 font-medium">
            <span className="flex items-center gap-2"><CheckCircle size={18} className="text-green-500" /> Diagnostic expert sous 24h</span>
            <span className="flex items-center gap-2"><CheckCircle size={18} className="text-green-500" /> Expertise remboursée si travaux*</span>
            <span className="flex items-center gap-2"><CheckCircle size={18} className="text-green-500" /> +500 maisons sauvées en 2025</span>
          </div>
        </div>
      </div>
    </div>
  );
}

