import type { Metadata } from 'next';
import Link from 'next/link';
import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { Footer } from '@/components/home/Footer';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';

export const metadata: Metadata = {
  title: 'Prendre rendez-vous avec le cabinet · IPB Toulouse',
  description: "Échangez 15 minutes par téléphone avec Ludovic, fondateur du cabinet IPB. Diagnostic préalable gratuit, sans engagement. Toulouse, Montauban, Auch, Albi.",
  keywords: ['rendez-vous expert fissures', 'rdv cabinet structure toulouse', 'appel ludovic ipb', 'consultation expert bâtiment'],
  alternates: { canonical: 'https://www.ipb-expertise.fr/rdv-cabinet' },
  openGraph: {
    title: 'Prendre rendez-vous avec le cabinet IPB',
    description: "15 minutes au téléphone avec Ludovic pour qualifier votre situation et planifier la suite.",
    url: 'https://www.ipb-expertise.fr/rdv-cabinet',
    type: 'website',
  },
};

export default function RdvCabinetPage() {
  return (
    <div className="font-sans bg-ipb-cream text-ipb-text antialiased">
      <TopBar />
      <Navbar />

      <main id="main-content">
        {/* HERO + 3 chemins de prise de RDV */}
        <section className="bg-ipb-cream pt-16 lg:pt-24 pb-20 lg:pb-28">
          <div className="max-w-ipb mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-12 gap-12">
              {/* Côté gauche : pitch */}
              <RevealOnScroll className="lg:col-span-5">
                <Eyebrow>Échanger avec le cabinet</Eyebrow>
                <h1
                  className="font-serif text-ipb-text mb-8"
                  style={{
                    fontSize: 'clamp(40px, 4vw, 62px)',
                    lineHeight: 1.06,
                    letterSpacing: '-0.025em',
                    fontWeight: 700,
                  }}
                >
                  Quinze minutes,<br /><em>un échange technique.</em>
                </h1>

                <p className="text-[15px] leading-[1.9] font-light text-ipb-muted mb-6">
                  Avant de vous déplacer ou de vous engager, nous vous proposons un premier échange par téléphone avec Ludovic, fondateur du cabinet. Vous décrivez votre situation, nous vous disons posément ce qu'il en est.
                </p>
                <p className="text-[15px] leading-[1.9] font-light text-ipb-muted mb-10">
                  Cet appel est <strong className="font-medium text-ipb-text not-italic">gratuit</strong> et <strong className="font-medium text-ipb-text not-italic">sans engagement</strong>. À l'issue, nous décidons ensemble de la suite — visite sur site, étude technique, ou simple conseil si rien n'est urgent.
                </p>

                {/* Garanties — mini liste */}
                <ul className="space-y-3 text-[14px] leading-[1.7] font-light text-ipb-muted border-t border-ipb-rule pt-6">
                  {[
                    'Échange direct avec Ludovic, ingénieur structure',
                    'Sans engagement de votre part',
                    'Confidentialité absolue sur votre dossier',
                    'Suite proposée par écrit après l\'appel',
                  ].map((g) => (
                    <li key={g} className="flex gap-3">
                      <span className="text-ipb-orange flex-shrink-0">—</span>
                      <span>{g}</span>
                    </li>
                  ))}
                </ul>
              </RevealOnScroll>

              {/* Côté droit : 3 modes de prise de RDV */}
              <div className="lg:col-span-7 space-y-4">
                {/* Mode 1 : Téléphone direct (le plus immédiat) */}
                <RevealOnScroll direction="right">
                  <a
                    href="tel:0582953375"
                    className="group block bg-ipb-navy text-white rounded-[6px] p-7 lg:p-8 hover:shadow-2xl transition-all hover:-translate-y-0.5"
                  >
                    <p className="text-[10px] text-white/40 uppercase tracking-[0.18em] mb-3">Le plus rapide</p>
                    <p className="font-serif text-[15px] text-white/55 mb-2">Appeler maintenant</p>
                    <p
                      className="font-serif text-white font-bold leading-none mb-4"
                      style={{ fontSize: 'clamp(36px, 3.6vw, 52px)', letterSpacing: '-0.02em' }}
                    >
                      05 82 95 33 75
                    </p>
                    <p className="text-[13px] font-light text-white/65 leading-[1.7]">
                      Lundi au vendredi · 8h&nbsp;–&nbsp;19h. Si nous sommes en chantier, vous tombez sur la messagerie : laissez votre nom et votre commune, on vous rappelle dans la demi-journée.
                    </p>
                  </a>
                </RevealOnScroll>

                {/* Mode 2 : Diagnostic en ligne (plus structuré) */}
                <RevealOnScroll direction="right" delay={0.06}>
                  <Link
                    href="/diagnostic"
                    className="group block bg-ipb-white border border-ipb-rule rounded-[6px] p-7 lg:p-8 hover:border-ipb-orange hover:shadow-[0_12px_36px_rgba(11,24,38,0.07)] hover:-translate-y-0.5 transition-all"
                  >
                    <p className="text-[10px] text-ipb-light uppercase tracking-[0.18em] mb-3">Le plus complet</p>
                    <h3 className="font-serif text-ipb-text font-bold text-[22px] leading-tight mb-3 group-hover:text-ipb-orange transition-colors">
                      Décrire ma situation en ligne
                    </h3>
                    <p className="text-[13px] font-light text-ipb-muted leading-[1.75] mb-5">
                      Quelques questions sur vos fissures ou votre projet d'ouverture. Nous arrivons préparés à l'appel : ça gagne du temps pour vous, ça précise notre première analyse pour nous.
                    </p>
                    <span className="inline-flex items-center gap-2 text-ipb-orange text-[13px] font-medium border-b border-ipb-orange pb-1 group-hover:gap-3 transition-all">
                      Démarrer le diagnostic →
                    </span>
                  </Link>
                </RevealOnScroll>

                {/* Mode 3 : Email contact */}
                <RevealOnScroll direction="right" delay={0.12}>
                  <Link
                    href="/contact"
                    className="group block bg-ipb-white border border-ipb-rule rounded-[6px] p-7 lg:p-8 hover:border-ipb-orange hover:shadow-[0_12px_36px_rgba(11,24,38,0.07)] hover:-translate-y-0.5 transition-all"
                  >
                    <p className="text-[10px] text-ipb-light uppercase tracking-[0.18em] mb-3">Le plus posé</p>
                    <h3 className="font-serif text-ipb-text font-bold text-[22px] leading-tight mb-3 group-hover:text-ipb-orange transition-colors">
                      Écrire au cabinet
                    </h3>
                    <p className="text-[13px] font-light text-ipb-muted leading-[1.75] mb-5">
                      Si vous préférez l'écrit, ou si vous voulez nous transmettre des photos / plans en amont, le formulaire de contact est là pour ça. Réponse sous 24 heures ouvrées.
                    </p>
                    <span className="inline-flex items-center gap-2 text-ipb-orange text-[13px] font-medium border-b border-ipb-orange pb-1 group-hover:gap-3 transition-all">
                      Ouvrir le formulaire →
                    </span>
                  </Link>
                </RevealOnScroll>
              </div>
            </div>
          </div>
        </section>

        {/* CE QU'IL VA SE PASSER APRÈS L'APPEL */}
        <section className="bg-ipb-white py-24 lg:py-32 border-y border-ipb-rule">
          <div className="max-w-4xl mx-auto px-6 lg:px-12">
            <RevealOnScroll>
              <Eyebrow>Après notre échange</Eyebrow>
              <h2
                className="font-serif text-ipb-text mb-12"
                style={{ fontSize: 'clamp(28px, 2.6vw, 38px)', lineHeight: 1.15, letterSpacing: '-0.022em', fontWeight: 700 }}
              >
                Trois suites possibles,<br /><em>jamais de pression.</em>
              </h2>
            </RevealOnScroll>

            <div className="space-y-8">
              {[
                {
                  num: '01',
                  titre: 'Vous laissez le cabinet venir sur site',
                  desc: "Nous fixons un créneau pour la visite technique. Mesures au fissuromètre, photos, lecture du bâti. Rapport écrit remis sous 7 jours, reconnu par les assurances.",
                },
                {
                  num: '02',
                  titre: 'Vous partez avec un avis téléphonique posé',
                  desc: "Si la situation ne nécessite pas (encore) de déplacement, nous vous le disons franchement et vous donnons les indices à surveiller. Nous restons disponibles si la situation évolue.",
                },
                {
                  num: '03',
                  titre: 'Vous décidez de prendre du temps pour réfléchir',
                  desc: "Vous repartez avec nos coordonnées, l'attestation décennale et un email récapitulatif. Aucune relance commerciale, aucune pression.",
                },
              ].map((etape) => (
                <RevealOnScroll key={etape.num}>
                  <div className="grid grid-cols-[40px_1fr] gap-6 items-start pb-8 border-b border-ipb-rule last:border-b-0">
                    <span className="font-serif text-ipb-orange text-[14px] font-bold tracking-wider pt-2">
                      {etape.num}
                    </span>
                    <div>
                      <h3 className="font-serif text-ipb-text text-[22px] font-bold leading-tight mb-3">
                        {etape.titre}
                      </h3>
                      <p className="text-[14px] leading-[1.85] font-light text-ipb-muted">
                        {etape.desc}
                      </p>
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* CTA répétée */}
        <section className="bg-ipb-cream py-20 lg:py-24 text-center">
          <div className="max-w-2xl mx-auto px-6">
            <RevealOnScroll>
              <p className="text-[10px] text-ipb-light uppercase tracking-[0.18em] mb-4">
                Prêt à échanger ?
              </p>
              <a
                href="tel:0582953375"
                className="block font-serif text-ipb-text hover:text-ipb-orange transition-colors leading-none mb-6"
                style={{ fontSize: 'clamp(40px, 4.6vw, 64px)', letterSpacing: '-0.025em', fontWeight: 700 }}
              >
                05 82 95 33 75
              </a>
              <MagneticButton href="/diagnostic" variant="ghost">
                Préparer l'appel avec un diagnostic en ligne
              </MagneticButton>
            </RevealOnScroll>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
