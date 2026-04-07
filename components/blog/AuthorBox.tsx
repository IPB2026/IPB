import Link from 'next/link';

const authorProfiles: Record<string, { bio: string; specialty: string }> = {
  'Ludovic D.': {
    bio: "12 ans sur le terrain en Haute-Garonne. Ancien conducteur de travaux reconverti dans l'expertise après avoir constaté trop de malfaçons sur les chantiers neufs. Intervient principalement sur Toulouse et sa périphérie.",
    specialty: 'Fissures structurelles & fondations',
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

const defaultProfile = {
  bio: "Expert en pathologie du bâtiment chez IPB, intervenant en Occitanie.",
  specialty: 'Pathologie du bâtiment',
};

export function AuthorBox({ name }: { name: string }) {
  const profile = authorProfiles[name] || defaultProfile;

  return (
    <div className="mt-8 bg-white border border-slate-200 rounded-2xl p-6 flex items-start gap-5">
      <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white text-2xl font-extrabold shadow-lg">
        {name.charAt(0)}
      </div>
      <div>
        <p className="text-xs uppercase tracking-wider text-slate-500 font-bold mb-1">Rédigé par</p>
        <Link href="/notre-expert" className="text-lg font-extrabold text-slate-900 hover:text-orange-600 transition">
          {name}
        </Link>
        <p className="text-xs text-orange-600 font-medium mt-0.5">{profile.specialty}</p>
        <p className="text-sm text-slate-600 mt-1.5">
          {profile.bio}
        </p>
        <Link href="/notre-expert" className="inline-block mt-2 text-sm text-orange-600 font-bold hover:text-orange-700 transition">
          Voir le profil →
        </Link>
      </div>
    </div>
  );
}
