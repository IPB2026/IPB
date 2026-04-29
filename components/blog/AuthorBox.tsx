import Image from 'next/image';
import Link from 'next/link';

interface AuthorProfile {
  bio: string;
  specialty: string;
  photo?: string;
}

const authorProfiles: Record<string, AuthorProfile> = {
  'Ludovic D.': {
    bio: "12 ans sur le terrain en Haute-Garonne. Ancien conducteur de travaux reconverti dans l'expertise après avoir constaté trop de malfaçons sur les chantiers neufs. Intervient principalement sur Toulouse et sa périphérie.",
    specialty: 'Fissures structurelles & fondations',
    photo: '/images/ludovic-expert-ipb.webp',
  },
  'Adam F.': {
    bio: "Formé à l'école des Ponts, spécialisé dans les pathologies liées à l'eau. A traité plus de 400 cas de remontées capillaires et d'infiltrations dans le Tarn-et-Garonne et le Gers depuis 2018.",
    specialty: 'Humidité & remontées capillaires',
  },
  'Nicolas G.': {
    bio: "Expert judiciaire près la Cour d'Appel de Toulouse. Rédige des rapports pour les tribunaux et accompagne les propriétaires dans leurs démarches d'indemnisation catastrophe naturelle.",
    specialty: 'Expertise judiciaire & sinistres',
  },
  'Fabien T.': {
    bio: "Technicien diagnostic certifié, passé par Véritas avant de rejoindre IPB. Spécialiste des relevés terrain et de l'instrumentation (fissuromètre, hygromètre, caméra thermique).",
    specialty: 'Diagnostic terrain & instrumentation',
  },
};

const defaultProfile: AuthorProfile = {
  bio: "Expert en pathologie du bâtiment chez IPB, intervenant en Occitanie.",
  specialty: 'Pathologie du bâtiment',
};

export function AuthorBox({ name }: { name: string }) {
  const profile = authorProfiles[name] || defaultProfile;
  const initial = name.charAt(0);

  return (
    <div className="mt-12 bg-white border border-ipb-rule rounded-[6px] p-7 flex items-start gap-6">
      <div className="flex-shrink-0">
        {profile.photo ? (
          <div className="relative w-20 h-20 rounded-full overflow-hidden ring-1 ring-ipb-rule">
            <Image
              src={profile.photo}
              alt={`Photo de ${name}, ${profile.specialty}`}
              fill
              sizes="80px"
              className="object-cover"
            />
          </div>
        ) : (
          <div className="w-20 h-20 bg-gradient-to-br from-ipb-orange to-[#b35519] rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-md font-serif">
            {initial}
          </div>
        )}
      </div>
      <div className="flex-1">
        <p className="text-[10px] uppercase tracking-[0.16em] text-ipb-light font-semibold mb-2">
          Rédigé par
        </p>
        <Link href="/notre-expert" className="font-serif text-[20px] font-bold text-ipb-text hover:text-ipb-orange transition leading-tight">
          {name}
        </Link>
        <p className="text-[12px] text-ipb-orange font-medium mt-1 mb-3 uppercase tracking-[0.05em]">
          {profile.specialty}
        </p>
        <p className="text-[14px] leading-[1.7] text-ipb-muted">
          {profile.bio}
        </p>
        <Link href="/notre-expert" className="inline-flex items-center gap-1 mt-3 text-[13px] text-ipb-orange font-semibold hover:gap-2 transition-all border-b border-ipb-orange pb-0.5">
          Voir le profil de l'institut →
        </Link>
      </div>
    </div>
  );
}
