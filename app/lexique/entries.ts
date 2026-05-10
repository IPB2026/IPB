/**
 * Lexique de la pathologie du bâtiment — entrées
 *
 * 50 entrées initiales rédigées par l'institut.
 * Format : terme · définition courte (1-2 phrases) · précision technique (2-4 phrases) · voir aussi
 *
 * Pour ajouter une entrée : voir docs/lexique-maintenance.md
 */

export interface VoirAussiLink {
  label: string;
  href: string;
}

export interface LexiqueEntry {
  /** Identifiant pour ancre URL (#slug) — kebab-case sans accents */
  slug: string;
  /** Terme tel qu'affiché en titre H2 */
  terme: string;
  /** Lettre alphabétique (A-Z, accents normalisés) pour la navigation */
  lettre: string;
  /** Définition courte, 1 à 2 phrases */
  definition: string;
  /** Précision technique optionnelle, 2 à 4 phrases */
  precision?: string;
  /** Liens vers d'autres entrées du lexique ou pages internes */
  voirAussi?: VoirAussiLink[];
}

export const lexiqueEntries: LexiqueEntry[] = [
  // ─── A ────────────────────────────────────────────────────────────
  {
    slug: 'agrafage-structurel',
    terme: 'Agrafage structurel',
    lettre: 'A',
    definition:
      "Technique de réparation d'une fissure structurelle consistant à coudre les deux lèvres de la fissure à l'aide d'aciers inoxydables (les agrafes), scellés dans la maçonnerie et reliés par un mortier de scellement.",
    precision:
      "L'agrafage est adapté aux fissures structurelles sur maçonnerie traditionnelle (briques, pierre, parpaing). Il rétablit la continuité mécanique du mur sans nécessiter d'intervention sur les fondations. À distinguer du harpage, qui désigne la reconstruction par chaînage maçonné, et de la reprise en sous-œuvre, qui intervient au niveau des fondations.",
    voirAussi: [
      { label: 'Harpage', href: '#harpage' },
      { label: 'Reprise en sous-œuvre', href: '#reprise-en-sous-oeuvre' },
      { label: 'Fissuromètre', href: '#fissurometre' },
    ],
  },

  // ─── C ────────────────────────────────────────────────────────────
  {
    slug: 'carte-brgm',
    terme: 'Carte BRGM des aléas',
    lettre: 'C',
    definition:
      "Cartographie publique éditée par le Bureau de recherches géologiques et minières, qui classe les communes selon leur exposition à différents aléas naturels (retrait-gonflement des argiles, mouvements de terrain, séismes, cavités).",
    precision:
      "La consultation se fait gratuitement sur le site Géorisques. Pour le retrait-gonflement des argiles, la carte distingue trois niveaux d'aléa (faible, moyen, fort). Une commune classée en aléa moyen ou fort déclenche des prescriptions techniques pour les nouvelles constructions et alimente les dossiers de catastrophe naturelle.",
    voirAussi: [
      { label: 'Retrait-gonflement des argiles', href: '#retrait-gonflement-des-argiles' },
      { label: 'Catastrophe naturelle', href: '#catastrophe-naturelle' },
      { label: 'Étude de sol', href: '#etude-de-sol' },
    ],
  },
  {
    slug: 'catastrophe-naturelle',
    terme: 'Catastrophe naturelle (cat-nat)',
    lettre: 'C',
    definition:
      "Régime juridique français institué par la loi du 13 juillet 1982, qui permet l'indemnisation par l'assurance des dommages causés à un bien par un phénomène naturel d'intensité anormale (sécheresse, inondation, mouvement de terrain).",
    precision:
      "La reconnaissance de l'état de catastrophe naturelle est prononcée par arrêté interministériel publié au Journal officiel. Pour la sécheresse, l'arrêté précise les communes concernées et la période. La déclaration auprès de l'assureur doit intervenir dans les dix jours suivant la publication de l'arrêté. La franchise légale est fixée à 1 520 €.",
    voirAussi: [
      { label: 'Retrait-gonflement des argiles', href: '#retrait-gonflement-des-argiles' },
      { label: 'Garantie décennale', href: '#garantie-decennale' },
    ],
  },
  {
    slug: 'chainage',
    terme: 'Chaînage',
    lettre: 'C',
    definition:
      "Élément structurel en béton armé ou en maçonnerie chaînée qui ceinture un bâtiment au niveau des planchers et des angles, afin de répartir les efforts et d'assurer le monolithisme du bâti.",
    precision:
      "Le chaînage horizontal court le long des planchers (chaînage rampant), le chaînage vertical ceinture les angles et les ouvertures. Un défaut ou une absence de chaînage est l'une des causes les plus fréquentes des désordres structurels sur maisons anciennes ou autoconstructions.",
    voirAussi: [
      { label: 'Mur porteur', href: '#mur-porteur' },
      { label: 'Fondation', href: '#fondation' },
      { label: 'Harpage', href: '#harpage' },
    ],
  },
  {
    slug: 'cloison',
    terme: 'Cloison',
    lettre: 'C',
    definition:
      "Mur intérieur non porteur, dont le rôle est de séparer les espaces sans participer à la stabilité de la construction.",
    precision:
      "Une cloison se distingue d'un mur porteur par son épaisseur (généralement 5 à 10 cm), sa nature (carreau de plâtre, brique alvéolée, ossature plaque de plâtre) et son absence de fonction structurelle. Sa suppression ne nécessite pas d'étude technique, contrairement à l'ouverture d'un mur porteur.",
    voirAussi: [
      { label: 'Mur porteur', href: '#mur-porteur' },
      { label: 'Mur de refend', href: '#mur-de-refend' },
    ],
  },
  {
    slug: 'cloquage',
    terme: 'Cloquage',
    lettre: 'C',
    definition:
      "Décollement local de l'enduit ou de la peinture sous forme de petites bulles, généralement provoqué par la migration d'humidité ou par une mauvaise adhérence du revêtement à son support.",
    precision:
      "Le cloquage en zone basse de mur est souvent associé à des remontées capillaires. En partie haute ou en zone humide, il peut indiquer une infiltration ou une condensation. Il s'agit d'un désordre cosmétique, mais le diagnostic doit identifier la source d'humidité avant tout traitement de surface.",
    voirAussi: [
      { label: 'Décollement', href: '#decollement' },
      { label: 'Humidité ascensionnelle', href: '#humidite-ascensionnelle' },
      { label: 'Salpêtre', href: '#salpetre' },
    ],
  },
  {
    slug: 'contre-expertise',
    terme: 'Contre-expertise',
    lettre: 'C',
    definition:
      "Expertise technique réalisée à la demande d'une partie en désaccord avec les conclusions d'une expertise précédente, afin d'obtenir un second avis indépendant.",
    precision:
      "La contre-expertise est fréquente en matière de sinistres assurance (dommages-ouvrage, catastrophe naturelle), de litiges entre acheteur et vendeur (vice caché), ou en procédure judiciaire. Elle peut conduire à une expertise contradictoire menée en présence des deux experts. Le rapport de contre-expertise est opposable.",
    voirAussi: [
      { label: 'Expertise judiciaire', href: '#expertise-judiciaire' },
      { label: 'Vice caché', href: '#vice-cache' },
      { label: 'Dol', href: '#dol' },
    ],
  },
  {
    slug: 'crevasse',
    terme: 'Crevasse',
    lettre: 'C',
    definition:
      "Désordre de surface visible sur un sol ou un mur extérieur, prenant la forme d'une fente irrégulière de largeur supérieure à 10 mm, traduisant un mouvement structurel important.",
    precision:
      "Le terme crevasse n'est pas formellement codifié mais relève d'un usage courant, généralement appliqué aux désordres de plus grande ampleur que les fissures. À ne pas confondre avec une lézarde, qui désigne une fissure structurelle au tracé en escalier suivant les joints d'une maçonnerie.",
    voirAussi: [
      { label: 'Fissure', href: '#fissure' },
      { label: 'Lézarde', href: '#lezarde' },
      { label: 'Tassement différentiel', href: '#tassement-differentiel' },
    ],
  },

  // ─── D ────────────────────────────────────────────────────────────
  {
    slug: 'decollement',
    terme: 'Décollement',
    lettre: 'D',
    definition:
      "Désordre par lequel un revêtement (enduit, peinture, carrelage, papier peint) se sépare progressivement de son support, sans pour autant traduire un désordre structurel.",
    precision:
      "Les causes courantes sont la migration d'humidité, une mauvaise adhérence à la pose, ou des cycles thermiques importants. Le décollement n'engage pas la structure du bâti, mais signale souvent un autre désordre sous-jacent (humidité, condensation) qu'il convient de diagnostiquer avant toute reprise.",
    voirAussi: [
      { label: 'Cloquage', href: '#cloquage' },
      { label: 'Humidité ascensionnelle', href: '#humidite-ascensionnelle' },
      { label: 'Faïençage', href: '#faiencage' },
    ],
  },
  {
    slug: 'declaration-prealable',
    terme: 'Déclaration préalable',
    lettre: 'D',
    definition:
      "Autorisation d'urbanisme délivrée par la mairie pour les travaux modifiant l'aspect extérieur d'un bâtiment, ne nécessitant pas un permis de construire complet.",
    precision:
      "Concerne notamment la création d'ouvertures (baies vitrées, fenêtres), les modifications de façade (ravalement avec changement de couleur), et les extensions limitées. Le délai d'instruction est d'un mois ; en zone classée, il peut être prolongé. À distinguer du permis de construire, requis pour les travaux plus lourds.",
    voirAussi: [
      { label: 'Permis de construire', href: '#permis-de-construire' },
      { label: 'Mur porteur', href: '#mur-porteur' },
    ],
  },
  {
    slug: 'desordre',
    terme: 'Désordre',
    lettre: 'D',
    definition:
      "Terme technique désignant tout dysfonctionnement, dégradation ou anomalie observable sur un ouvrage de bâtiment, qu'il soit structurel, fonctionnel ou esthétique.",
    precision:
      "Le mot désordre est employé de façon neutre dans les rapports d'expertise, sans préjuger de sa gravité. Un désordre peut être stabilisé ou évolutif, esthétique ou structurel. La qualification du désordre est l'objet même du diagnostic.",
    voirAussi: [
      { label: 'Fissure', href: '#fissure' },
      { label: 'Pathologie du bâtiment', href: '#pathologie-du-batiment' },
    ],
  },
  {
    slug: 'dol',
    terme: 'Dol',
    lettre: 'D',
    definition:
      "Manœuvre frauduleuse par laquelle une partie à un contrat (notamment un vendeur) dissimule volontairement un défaut connu pour induire l'acquéreur en erreur.",
    precision:
      "Le dol se distingue du vice caché par l'intentionnalité : le dol suppose une volonté de tromper, le vice caché ne l'exige pas. Il annule le contrat (article 1137 du Code civil) et peut donner lieu à des dommages-intérêts. Les rapports d'expertise documentant les désordres dissimulés sont des pièces régulières dans ces procédures.",
    voirAussi: [
      { label: 'Vice caché', href: '#vice-cache' },
      { label: 'Expertise judiciaire', href: '#expertise-judiciaire' },
    ],
  },
  {
    slug: 'drainage-peripherique',
    terme: 'Drainage périphérique',
    lettre: 'D',
    definition:
      "Dispositif technique consistant à ceinturer la fondation d'un bâtiment d'un drain agricole et d'un lit de graviers, afin d'évacuer les eaux pluviales et de stabiliser la teneur en eau du sol périphérique.",
    precision:
      "Le drainage est indiqué quand un désordre est lié à l'eau (ruissellement, infiltrations, remontées) plus qu'à l'argile elle-même. Il peut être combiné à d'autres traitements. Le coût varie fortement selon la profondeur des fondations et l'accessibilité du chantier.",
    voirAussi: [
      { label: 'Retrait-gonflement des argiles', href: '#retrait-gonflement-des-argiles' },
      { label: 'Fondation superficielle', href: '#fondation-superficielle' },
      { label: 'Humidité ascensionnelle', href: '#humidite-ascensionnelle' },
    ],
  },

  // ─── E ────────────────────────────────────────────────────────────
  {
    slug: 'efflorescence',
    terme: 'Efflorescence',
    lettre: 'E',
    definition:
      "Dépôt blanc, cristallin ou poudreux, apparaissant en surface d'un mur, d'un enduit ou d'un sol, résultant de la migration des sels minéraux solubles présents dans le matériau.",
    precision:
      "L'efflorescence accompagne presque toujours un phénomène de migration d'humidité. Elle est cosmétique en elle-même, mais elle indique la présence d'un transfert d'eau qu'il convient de diagnostiquer (remontée capillaire, infiltration, condensation). À distinguer du salpêtre, qui est une efflorescence riche en nitrates.",
    voirAussi: [
      { label: 'Salpêtre', href: '#salpetre' },
      { label: 'Humidité ascensionnelle', href: '#humidite-ascensionnelle' },
    ],
  },
  {
    slug: 'etaiement',
    terme: 'Étaiement',
    lettre: 'E',
    definition:
      "Dispositif provisoire de soutien permettant de reprendre les charges d'un ouvrage pendant des travaux qui affectent sa structure (ouverture d'un mur porteur, intervention sur un plancher).",
    precision:
      "L'étaiement est dimensionné par l'ingénieur structure en fonction des charges à reprendre et de la durée d'intervention. Il est mis en place avant tout démontage et levé après scellement définitif des éléments porteurs. Un étaiement insuffisant ou mal disposé est l'une des causes les plus fréquentes de sinistres en chantier.",
    voirAussi: [
      { label: 'Mur porteur', href: '#mur-porteur' },
      { label: 'Étrésillon', href: '#etresillon' },
      { label: 'Poutre', href: '#poutre' },
    ],
  },
  {
    slug: 'etresillon',
    terme: 'Étrésillon',
    lettre: 'E',
    definition:
      "Pièce de bois ou métallique placée en travers d'une ouverture (fenêtre, porte) ou d'une fouille, pour empêcher les déformations pendant des travaux ou une réparation.",
    precision:
      "L'étrésillon assure le maintien temporaire d'une ouverture pendant des opérations susceptibles de la déformer (reprise en sous-œuvre, agrafage). Il est démontable une fois la stabilité retrouvée. Le terme s'emploie aussi pour les pièces de calage en menuiserie traditionnelle.",
    voirAussi: [
      { label: 'Étaiement', href: '#etaiement' },
      { label: 'Agrafage structurel', href: '#agrafage-structurel' },
    ],
  },
  {
    slug: 'etude-de-sol',
    terme: 'Étude de sol',
    lettre: 'E',
    definition:
      "Investigation géotechnique permettant de caractériser la nature et le comportement d'un sol en vue d'une construction ou d'un diagnostic.",
    precision:
      "Une étude de sol comporte généralement des sondages, des essais pénétrométriques et, selon les besoins, des analyses en laboratoire (granulométrie, teneur en argile). Depuis la loi ELAN (2018), une étude de sol G1 est obligatoire pour la vente d'un terrain à bâtir en zone d'aléa retrait-gonflement des argiles. Les missions G2 à G5 correspondent à des phases ultérieures (avant-projet, exécution, suivi).",
    voirAussi: [
      { label: 'Pénétromètre', href: '#penetrometre' },
      { label: 'Sondage', href: '#sondage' },
      { label: 'Retrait-gonflement des argiles', href: '#retrait-gonflement-des-argiles' },
    ],
  },
  {
    slug: 'expertise-judiciaire',
    terme: 'Expertise judiciaire',
    lettre: 'E',
    definition:
      "Mission technique confiée à un expert par un juge dans le cadre d'une procédure contentieuse, pour éclairer le tribunal sur des questions techniques complexes.",
    precision:
      "L'expertise judiciaire est ordonnée par un juge et son rapport est opposable aux parties. L'expert judiciaire est inscrit sur une liste de la Cour d'appel. À distinguer de l'expertise amiable (commandée volontairement par une partie) et de la contre-expertise (commandée pour contester une expertise antérieure).",
    voirAussi: [
      { label: 'Contre-expertise', href: '#contre-expertise' },
      { label: 'Vice caché', href: '#vice-cache' },
      { label: 'Dol', href: '#dol' },
    ],
  },

  // ─── F ────────────────────────────────────────────────────────────
  {
    slug: 'faiencage',
    terme: 'Faïençage',
    lettre: 'F',
    definition:
      "Réseau fin et serré de microfissures à la surface d'un enduit ou d'un revêtement, ressemblant à la trame d'une faïence, généralement provoqué par un retrait excessif du mortier.",
    precision:
      "Le faïençage est un désordre cosmétique : il n'engage pas la structure du bâti. Il résulte d'un mortier trop riche, d'un séchage trop rapide ou d'un support trop sec lors de l'application. Le traitement passe par un ravalement souple ou une nouvelle finition après préparation du support.",
    voirAussi: [
      { label: 'Ravalement souple', href: '#ravalement-souple' },
      { label: 'Fissure', href: '#fissure' },
      { label: 'Microfissure', href: '#microfissure' },
    ],
  },
  {
    slug: 'fissure',
    terme: 'Fissure',
    lettre: 'F',
    definition:
      "Désordre linéaire visible à la surface d'un mur, d'un sol ou d'un plafond, traduisant une rupture mécanique du matériau, dont la largeur dépasse 0,2 mm.",
    precision:
      "Une fissure peut être esthétique (limitée à un revêtement de surface), superficielle (touchant l'enduit sans atteindre le corps du mur) ou structurelle (traversant le matériau porteur). Sa qualification dépend de quatre critères : largeur, forme, évolution dans le temps et indices secondaires.",
    voirAussi: [
      { label: 'Microfissure', href: '#microfissure' },
      { label: 'Lézarde', href: '#lezarde' },
      { label: 'Fissuromètre', href: '#fissurometre' },
      { label: "Article : évaluer la gravité d'une fissure", href: '/blog/evaluer-gravite-fissure-maison' },
    ],
  },
  {
    slug: 'fissurometre',
    terme: 'Fissuromètre',
    lettre: 'F',
    definition:
      "Instrument de mesure permettant de quantifier précisément la largeur d'une fissure à un instant donné, ainsi que son évolution dans le temps.",
    precision:
      "Il en existe deux types principaux : à pince (qui se pose en travers de la fissure et mesure son écartement) et adhésif (qui se colle de part et d'autre et permet un suivi continu). La précision typique est de l'ordre du dixième de millimètre. Sur les chantiers d'expertise, deux modes de mesure complémentaires sont souvent utilisés.",
    voirAussi: [
      { label: 'Témoin (de fissure)', href: '#temoin' },
      { label: 'Jauge en plâtre', href: '#jauge-en-platre' },
      { label: 'Fissure', href: '#fissure' },
    ],
  },
  {
    slug: 'fondation',
    terme: 'Fondation',
    lettre: 'F',
    definition:
      "Ouvrage enterré qui transmet au sol les charges supportées par le bâtiment, en assurant sa stabilité et son ancrage.",
    precision:
      "Selon la nature du sol et la structure du bâtiment, la fondation peut être superficielle (semelles, radiers) ou profonde (pieux, micropieux). Le défaut de fondation, ou son inadaptation au sol, est la cause majeure des désordres structurels (tassements différentiels, fissures en escalier).",
    voirAussi: [
      { label: 'Fondation superficielle', href: '#fondation-superficielle' },
      { label: 'Fondation profonde', href: '#fondation-profonde' },
      { label: 'Étude de sol', href: '#etude-de-sol' },
      { label: 'Tassement différentiel', href: '#tassement-differentiel' },
    ],
  },
  {
    slug: 'fondation-profonde',
    terme: 'Fondation profonde',
    lettre: 'F',
    definition:
      "Type de fondation qui transmet les charges du bâtiment à des couches de sol profondes (au-delà de 3 mètres), via des pieux, des micropieux ou des barrettes.",
    precision:
      "Les fondations profondes sont employées quand le sol de surface est insuffisant pour supporter les charges (sols mous, remblais récents, présence d'argiles gonflantes). Elles sont également utilisées en reprise en sous-œuvre pour stabiliser un bâti existant qui s'est tassé.",
    voirAussi: [
      { label: 'Fondation', href: '#fondation' },
      { label: 'Fondation superficielle', href: '#fondation-superficielle' },
      { label: 'Micropieux', href: '#micropieux' },
      { label: 'Reprise en sous-œuvre', href: '#reprise-en-sous-oeuvre' },
    ],
  },
  {
    slug: 'fondation-superficielle',
    terme: 'Fondation superficielle',
    lettre: 'F',
    definition:
      "Type de fondation qui transmet les charges du bâtiment à une couche de sol proche de la surface (généralement entre 50 cm et 3 mètres), via des semelles ou un radier.",
    precision:
      "Les fondations superficielles sont les plus courantes sur les maisons individuelles. Elles sont sensibles aux variations de volume du sol superficiel — d'où leur vulnérabilité au retrait-gonflement des argiles. Une réhabilitation peut nécessiter le passage à des fondations profondes par micropieux.",
    voirAussi: [
      { label: 'Fondation', href: '#fondation' },
      { label: 'Fondation profonde', href: '#fondation-profonde' },
      { label: 'Retrait-gonflement des argiles', href: '#retrait-gonflement-des-argiles' },
    ],
  },

  // ─── G ────────────────────────────────────────────────────────────
  {
    slug: 'garantie-decennale',
    terme: 'Garantie décennale',
    lettre: 'G',
    definition:
      "Assurance obligatoire pour tout constructeur français, qui couvre pendant dix ans les dommages compromettant la solidité de l'ouvrage ou le rendant impropre à sa destination, à compter de la réception des travaux.",
    precision:
      "La garantie décennale est une garantie légale (article 1792 du Code civil), souscrite par toute entreprise réalisant des travaux de construction ou de rénovation lourde. Elle couvre notamment les défauts de structure et les vices d'exécution affectant les ouvrages porteurs. Une attestation est remise au maître d'ouvrage à la signature du devis.",
    voirAussi: [
      { label: 'Vice caché', href: '#vice-cache' },
      { label: 'Expertise judiciaire', href: '#expertise-judiciaire' },
    ],
  },

  // ─── H ────────────────────────────────────────────────────────────
  {
    slug: 'harpage',
    terme: 'Harpage',
    lettre: 'H',
    definition:
      "Technique de reconstruction d'une maçonnerie consistant à reconstituer le chaînage par maçonnerie en pierres ou briques imbriquées, après ouverture d'une fouille au droit de la fissure.",
    precision:
      "Le harpage est plus lourd que l'agrafage : il implique le démontage et la reconstruction de la maçonnerie. Il est employé sur les bâtiments anciens en pierre, où la nature du matériau ne permet pas un scellement de qualité par agrafes. Le terme désigne aussi la disposition en escalier des pierres dans une chaîne d'angle.",
    voirAussi: [
      { label: 'Agrafage structurel', href: '#agrafage-structurel' },
      { label: 'Chaînage', href: '#chainage' },
      { label: 'Mur porteur', href: '#mur-porteur' },
    ],
  },
  {
    slug: 'heb',
    terme: 'HEB (poutre)',
    lettre: 'H',
    definition:
      "Profilé métallique en I à larges ailes (de l'allemand H Europäisch Breit), utilisé comme poutre de soutien dans les ouvertures de grande portée ou les reprises de charges importantes.",
    precision:
      "La poutre HEB se distingue de la poutre IPN par ses ailes plus larges, qui lui confèrent une plus grande résistance à la flexion latérale. Elle est privilégiée pour les ouvertures de plus de quatre mètres de portée ou les charges concentrées importantes. Le dimensionnement est calculé selon les Eurocodes.",
    voirAussi: [
      { label: 'IPN (poutre)', href: '#ipn' },
      { label: 'Poutre', href: '#poutre' },
      { label: 'Mur porteur', href: '#mur-porteur' },
    ],
  },
  {
    slug: 'humidite-ascensionnelle',
    terme: 'Humidité ascensionnelle',
    lettre: 'H',
    definition:
      "Phénomène par lequel l'eau du sol remonte par capillarité dans les murs d'un bâtiment, en l'absence de coupure de capillarité efficace dans la maçonnerie.",
    precision:
      "L'humidité ascensionnelle se caractérise par une zone de mur humide en partie basse (jusqu'à un mètre cinquante du sol environ), souvent accompagnée d'efflorescences ou de salpêtre. Le diagnostic se fait à l'humidimètre. Les traitements possibles sont l'injection de résine hydrofuge (création d'une coupure de capillarité chimique) ou le drainage périphérique.",
    voirAussi: [
      { label: 'Injection de résine', href: '#injection-de-resine' },
      { label: 'Salpêtre', href: '#salpetre' },
      { label: 'Efflorescence', href: '#efflorescence' },
      { label: 'Drainage périphérique', href: '#drainage-peripherique' },
    ],
  },

  // ─── I ────────────────────────────────────────────────────────────
  {
    slug: 'injection-de-resine',
    terme: 'Injection de résine',
    lettre: 'I',
    definition:
      "Technique de traitement de l'humidité ascensionnelle ou des fissures, consistant à injecter dans la maçonnerie une résine spécifique (hydrofuge ou structurelle) à pression contrôlée.",
    precision:
      "Pour le traitement de l'humidité, la résine hydrofuge crée une barrière chimique horizontale qui stoppe les remontées capillaires. Pour le traitement des fissures, des résines structurelles (époxy, polyuréthane) peuvent être utilisées en complément d'un agrafage. Le dimensionnement (espacement, profondeur) dépend du type de mur.",
    voirAussi: [
      { label: 'Humidité ascensionnelle', href: '#humidite-ascensionnelle' },
      { label: 'Agrafage structurel', href: '#agrafage-structurel' },
      { label: 'Matage', href: '#matage' },
    ],
  },
  {
    slug: 'ipn',
    terme: 'IPN (poutre)',
    lettre: 'I',
    definition:
      "Profilé métallique en I à ailes étroites et amincies (norme française historique), utilisé comme poutre de soutien dans les ouvertures de mur porteur de portée modérée.",
    precision:
      "La poutre IPN est plus économique que la HEB pour les portées courantes (jusqu'à 4 mètres environ). Le choix entre IPN et HEB dépend de la portée, des charges à reprendre et des contraintes architecturales. Les calculs de dimensionnement se font selon les Eurocodes en vigueur.",
    voirAussi: [
      { label: 'HEB (poutre)', href: '#heb' },
      { label: 'Poutre', href: '#poutre' },
      { label: 'Mur porteur', href: '#mur-porteur' },
    ],
  },

  // ─── J ────────────────────────────────────────────────────────────
  {
    slug: 'jauge-en-platre',
    terme: 'Jauge en plâtre',
    lettre: 'J',
    definition:
      "Méthode de surveillance de l'évolution d'une fissure consistant à appliquer une bande de plâtre frais sur la fissure et à observer si elle se brise dans les semaines ou mois qui suivent.",
    precision:
      "Méthode artisanale mais fiable pour détecter qu'une fissure est active. Si le plâtre se fissure à son tour, c'est que la fissure continue de bouger ; s'il reste intact, la fissure est probablement stabilisée. Moins précise qu'un fissuromètre, mais utilisable sans matériel spécialisé.",
    voirAussi: [
      { label: 'Fissuromètre', href: '#fissurometre' },
      { label: 'Témoin (de fissure)', href: '#temoin' },
      { label: 'Fissure', href: '#fissure' },
    ],
  },

  // ─── L ────────────────────────────────────────────────────────────
  {
    slug: 'lezarde',
    terme: 'Lézarde',
    lettre: 'L',
    definition:
      "Fissure de grande ampleur, généralement supérieure à 10 mm de largeur, avec un tracé irrégulier traduisant un désordre structurel important.",
    precision:
      "Le terme est ancien et désigne par usage les fissures les plus visibles et inquiétantes. Sur une maçonnerie traditionnelle, la lézarde suit souvent un tracé en escalier le long des joints. Elle traduit presque toujours un mouvement structurel actif et requiert un diagnostic urgent.",
    voirAussi: [
      { label: 'Fissure', href: '#fissure' },
      { label: 'Crevasse', href: '#crevasse' },
      { label: 'Tassement différentiel', href: '#tassement-differentiel' },
    ],
  },
  {
    slug: 'linteau',
    terme: 'Linteau',
    lettre: 'L',
    definition:
      "Élément structurel horizontal placé au-dessus d'une ouverture (porte, fenêtre, baie) pour reporter les charges du mur sur les jambages latéraux.",
    precision:
      "Le linteau peut être en bois, en pierre, en béton armé ou en métal. Sa rupture ou son sous-dimensionnement provoque des fissures caractéristiques en partie supérieure des ouvertures. Le remplacement d'un linteau défaillant fait partie des interventions structurelles courantes en rénovation.",
    voirAussi: [
      { label: 'Poutre', href: '#poutre' },
      { label: 'Mur porteur', href: '#mur-porteur' },
    ],
  },

  // ─── M ────────────────────────────────────────────────────────────
  {
    slug: 'matage',
    terme: 'Matage',
    lettre: 'M',
    definition:
      "Opération consistant à colmater une fissure ou un joint avec un mortier ou une résine fibrée, pour rétablir l'étanchéité ou le caractère monolithique du mur.",
    precision:
      "Le matage est une opération de finition qui suit souvent un agrafage. Il rend la fissure invisible et empêche la pénétration d'eau. À distinguer du simple rebouchage cosmétique : un matage technique utilise des produits compatibles avec les contraintes du mur (souplesse, perméabilité à la vapeur).",
    voirAussi: [
      { label: 'Agrafage structurel', href: '#agrafage-structurel' },
      { label: 'Ravalement souple', href: '#ravalement-souple' },
      { label: 'Injection de résine', href: '#injection-de-resine' },
    ],
  },
  {
    slug: 'microfissure',
    terme: 'Microfissure',
    lettre: 'M',
    definition:
      "Fissure de très faible largeur, généralement inférieure à 0,2 mm, le plus souvent superficielle et cosmétique.",
    precision:
      "Une microfissure peut être l'amorce d'une fissure plus large à venir, ou un désordre stable. Sa surveillance dans le temps permet de trancher : si elle s'élargit, elle devient une fissure ; si elle reste stable sur deux cycles saisonniers, elle est probablement bénigne. Le faïençage est une forme de microfissures en réseau.",
    voirAussi: [
      { label: 'Fissure', href: '#fissure' },
      { label: 'Faïençage', href: '#faiencage' },
      { label: 'Fissuromètre', href: '#fissurometre' },
    ],
  },
  {
    slug: 'micropieux',
    terme: 'Micropieux',
    lettre: 'M',
    definition:
      "Pieu de faible diamètre (généralement 10 à 25 cm) foré ou battu en profondeur, utilisé pour reprendre les charges d'un bâtiment qui s'est tassé ou pour fonder un nouvel ouvrage en sol contraint.",
    precision:
      "Les micropieux sont la solution de référence pour la reprise en sous-œuvre des fondations défaillantes (tassement actif sur retrait-gonflement des argiles, présence de cavités). Le coût est important — comparé à un agrafage — mais l'intervention est efficace pour les désordres majeurs (tassement supérieur à 10 cm). Les calculs de dimensionnement intègrent la nature du sol et les charges à reprendre.",
    voirAussi: [
      { label: 'Reprise en sous-œuvre', href: '#reprise-en-sous-oeuvre' },
      { label: 'Fondation profonde', href: '#fondation-profonde' },
      { label: 'Fondation superficielle', href: '#fondation-superficielle' },
    ],
  },
  {
    slug: 'mur-de-refend',
    terme: 'Mur de refend',
    lettre: 'M',
    definition:
      "Mur intérieur porteur, qui sépare des espaces tout en participant à la stabilité d'un bâtiment.",
    precision:
      "Le mur de refend reçoit les charges du plancher supérieur ou de la charpente, et les transmet aux fondations. Il se distingue de la cloison (non porteuse) par son épaisseur et son rôle structurel. Toute ouverture dans un mur de refend nécessite un dimensionnement préalable et la mise en place d'un linteau ou d'une poutre.",
    voirAussi: [
      { label: 'Mur porteur', href: '#mur-porteur' },
      { label: 'Cloison', href: '#cloison' },
      { label: 'Linteau', href: '#linteau' },
    ],
  },
  {
    slug: 'mur-porteur',
    terme: 'Mur porteur',
    lettre: 'M',
    definition:
      "Mur structurel qui participe à la stabilité d'un bâtiment en supportant et transmettant les charges des planchers et de la toiture vers les fondations.",
    precision:
      "Toute intervention sur un mur porteur (ouverture, démolition partielle, modification) nécessite une étude de structure préalable et la mise en œuvre d'éléments de soutien (poutre IPN ou HEB, étaiement). À distinguer de la cloison, qui ne participe pas à la stabilité du bâti.",
    voirAussi: [
      { label: 'Mur de refend', href: '#mur-de-refend' },
      { label: 'Cloison', href: '#cloison' },
      { label: 'Poutre', href: '#poutre' },
      { label: 'Étaiement', href: '#etaiement' },
    ],
  },

  // ─── P ────────────────────────────────────────────────────────────
  {
    slug: 'pathologie-du-batiment',
    terme: 'Pathologie du bâtiment',
    lettre: 'P',
    definition:
      "Discipline technique qui étudie les désordres affectant les ouvrages de construction, leurs causes, leur évolution et leurs traitements.",
    precision:
      "La pathologie du bâtiment couvre les fissures, les humidités, les déformations structurelles, les défauts d'enveloppe, les pathologies des matériaux. Elle s'appuie sur des méthodes de diagnostic instrumenté (mesures, sondages, prélèvements) et sur la connaissance des comportements des matériaux et des sols. C'est l'objet du métier exercé par l'institut.",
    voirAussi: [
      { label: 'Désordre', href: '#desordre' },
      { label: 'Fissure', href: '#fissure' },
      { label: 'Humidité ascensionnelle', href: '#humidite-ascensionnelle' },
      { label: 'Notre méthode de diagnostic', href: '/notre-methode' },
    ],
  },
  {
    slug: 'penetrometre',
    terme: 'Pénétromètre',
    lettre: 'P',
    definition:
      "Instrument de mesure géotechnique permettant d'évaluer la résistance d'un sol par enfoncement d'une pointe à vitesse contrôlée.",
    precision:
      "Le pénétromètre dynamique enregistre le nombre de coups nécessaires à enfoncer une pointe sur une distance donnée, ce qui permet de caractériser les couches de sol traversées. Il fait partie des outils de l'étude de sol, en complément des sondages destructifs ou des analyses en laboratoire.",
    voirAussi: [
      { label: 'Étude de sol', href: '#etude-de-sol' },
      { label: 'Sondage', href: '#sondage' },
    ],
  },
  {
    slug: 'permis-de-construire',
    terme: 'Permis de construire',
    lettre: 'P',
    definition:
      "Autorisation d'urbanisme délivrée par la mairie pour les travaux de construction, d'extension significative, ou de modification structurelle importante d'un bâtiment.",
    precision:
      "Le permis de construire est obligatoire pour la création de surface de plancher supérieure à 20 m² (40 m² en zone urbaine PLU), les changements de destination avec modification de structure, ou les extensions affectant l'aspect extérieur. Le délai d'instruction est de deux à trois mois. À distinguer de la déclaration préalable, requise pour les travaux plus légers.",
    voirAussi: [
      { label: 'Déclaration préalable', href: '#declaration-prealable' },
      { label: 'Mur porteur', href: '#mur-porteur' },
    ],
  },
  {
    slug: 'poutre',
    terme: 'Poutre',
    lettre: 'P',
    definition:
      "Élément structurel horizontal qui reprend des charges verticales et les transmet à des appuis (murs porteurs, poteaux), généralement par flexion.",
    precision:
      "Une poutre peut être en bois, en métal (IPN, HEB, PRS), en béton armé ou précontraint. Son dimensionnement dépend de la portée, des charges, et des contraintes admissibles du matériau. Dans les ouvertures de mur porteur, elle remplace structurellement la portion de mur démontée.",
    voirAussi: [
      { label: 'IPN (poutre)', href: '#ipn' },
      { label: 'HEB (poutre)', href: '#heb' },
      { label: 'Linteau', href: '#linteau' },
      { label: 'Mur porteur', href: '#mur-porteur' },
    ],
  },

  // ─── R ────────────────────────────────────────────────────────────
  {
    slug: 'ravalement-souple',
    terme: 'Ravalement souple',
    lettre: 'R',
    definition:
      "Type de revêtement de façade, à base de résine ou de polymères, capable d'absorber des micromouvements de la maçonnerie sans se fissurer.",
    precision:
      "Le ravalement souple est employé en finition de réparations de fissures, en particulier après agrafage, pour masquer le tracé et limiter le risque de réapparition. À distinguer d'un enduit traditionnel rigide (chaux, mortier de ciment), qui craquellera si le mur travaille à nouveau. Coût supérieur à un ravalement classique mais efficacité durable.",
    voirAussi: [
      { label: 'Matage', href: '#matage' },
      { label: 'Agrafage structurel', href: '#agrafage-structurel' },
      { label: 'Faïençage', href: '#faiencage' },
    ],
  },
  {
    slug: 'reprise-en-sous-oeuvre',
    terme: 'Reprise en sous-œuvre',
    lettre: 'R',
    definition:
      "Ensemble des techniques d'intervention sur les fondations d'un bâtiment existant, visant à stabiliser ou renforcer un ouvrage qui présente des désordres d'origine structurelle.",
    precision:
      "La reprise en sous-œuvre par micropieux est la technique la plus courante quand un bâtiment s'est tassé sur des sols sensibles (argiles, remblais). Elle consiste à reporter les charges sur des pieux profonds, en les ancrant dans une couche de sol résistante. Coût et durée importants (plusieurs semaines de chantier), mais résultats durables.",
    voirAussi: [
      { label: 'Micropieux', href: '#micropieux' },
      { label: 'Fondation profonde', href: '#fondation-profonde' },
      { label: 'Agrafage structurel', href: '#agrafage-structurel' },
    ],
  },
  {
    slug: 'retrait-gonflement-des-argiles',
    terme: 'Retrait-gonflement des argiles (RGA)',
    lettre: 'R',
    definition:
      "Phénomène géotechnique par lequel les sols argileux se rétractent en période de sécheresse et gonflent en période humide, provoquant des mouvements différentiels qui se transmettent aux fondations des bâtiments.",
    precision:
      "Le RGA est la première cause de sinistres déclarés au titre de la garantie catastrophe naturelle en France, en particulier depuis les épisodes de sécheresse répétés en Occitanie et Nouvelle-Aquitaine. La carte BRGM des aléas RGA permet de connaître l'exposition de chaque commune. Les fondations superficielles sont les plus vulnérables ; les bâtiments anciens sans chaînage adapté également.",
    voirAussi: [
      { label: 'Fondation superficielle', href: '#fondation-superficielle' },
      { label: 'Carte BRGM des aléas', href: '#carte-brgm' },
      { label: 'Catastrophe naturelle', href: '#catastrophe-naturelle' },
      { label: 'Tassement différentiel', href: '#tassement-differentiel' },
    ],
  },

  // ─── S ────────────────────────────────────────────────────────────
  {
    slug: 'salpetre',
    terme: 'Salpêtre',
    lettre: 'S',
    definition:
      "Dépôt blanc cristallin riche en nitrates, apparaissant à la surface de murs anciens humides, principalement sur les soubassements de constructions anciennes.",
    precision:
      "Le salpêtre est une forme particulière d'efflorescence où dominent les nitrates issus de la décomposition de matières organiques anciennes (étables, écuries, caves, anciens sols agricoles). Il signale presque toujours une humidité ascensionnelle. Le traitement passe par la suppression de la source d'humidité, suivi du décapage et d'un enduit assaini.",
    voirAussi: [
      { label: 'Efflorescence', href: '#efflorescence' },
      { label: 'Humidité ascensionnelle', href: '#humidite-ascensionnelle' },
      { label: 'Injection de résine', href: '#injection-de-resine' },
    ],
  },
  {
    slug: 'sondage',
    terme: 'Sondage',
    lettre: 'S',
    definition:
      "Investigation locale d'un ouvrage ou d'un sol, par prélèvement ou ouverture, pour en connaître la composition, l'état ou la nature.",
    precision:
      "En diagnostic du bâti, le sondage peut être réalisé à la tarière manuelle pour examiner les fondations, par carottage pour analyser la composition d'un mur, ou à la pelle pour vérifier l'absence de cavité. En géotechnique, le sondage permet de caractériser les couches de sol jusqu'à la profondeur prévue de fondation.",
    voirAussi: [
      { label: 'Étude de sol', href: '#etude-de-sol' },
      { label: 'Pénétromètre', href: '#penetrometre' },
    ],
  },

  // ─── T ────────────────────────────────────────────────────────────
  {
    slug: 'tassement-differentiel',
    terme: 'Tassement différentiel',
    lettre: 'T',
    definition:
      "Mouvement vertical inégal des fondations d'un bâtiment, dans lequel certaines parties s'enfoncent plus que d'autres, provoquant des contraintes mécaniques sur la structure.",
    precision:
      "Le tassement différentiel est l'une des causes structurelles les plus fréquentes des fissures en escalier sur maçonnerie. Il peut résulter d'un retrait-gonflement des argiles, d'une mauvaise étude de sol initiale, de la présence de remblais récents, ou d'un défaut local de fondation. Le diagnostic croise mesures topographiques et examen géotechnique.",
    voirAussi: [
      { label: 'Retrait-gonflement des argiles', href: '#retrait-gonflement-des-argiles' },
      { label: 'Fondation superficielle', href: '#fondation-superficielle' },
      { label: 'Fissure', href: '#fissure' },
      { label: 'Lézarde', href: '#lezarde' },
    ],
  },
  {
    slug: 'temoin',
    terme: 'Témoin (de fissure)',
    lettre: 'T',
    definition:
      "Dispositif de surveillance posé sur ou à proximité d'une fissure, pour détecter visuellement son évolution au fil du temps.",
    precision:
      "Les témoins peuvent être en plâtre (jauge en plâtre), en plastique gradué (témoin sur épingles), ou en lamelle de verre fine. Leur rupture confirme un mouvement actif. Le fissuromètre apporte une mesure quantitative ; le témoin apporte un signal qualitatif (mouvement / absence de mouvement). Les deux sont complémentaires.",
    voirAussi: [
      { label: 'Fissuromètre', href: '#fissurometre' },
      { label: 'Jauge en plâtre', href: '#jauge-en-platre' },
      { label: 'Fissure', href: '#fissure' },
    ],
  },

  // ─── V ────────────────────────────────────────────────────────────
  {
    slug: 'vice-cache',
    terme: 'Vice caché',
    lettre: 'V',
    definition:
      "Défaut de la chose vendue, non apparent au moment de la vente, qui en réduit l'usage ou la valeur de telle façon que l'acheteur ne l'aurait pas acquise ou en aurait offert un prix moindre s'il l'avait connu (article 1641 du Code civil).",
    precision:
      "En matière immobilière, les fissures structurelles ou les humidités importantes peuvent constituer un vice caché si elles n'étaient pas visibles à l'acheteur ni signalées par le vendeur. L'action en garantie des vices cachés se prescrit par deux ans à compter de la découverte du vice. Un rapport d'expertise documentant le défaut et son antériorité par rapport à la vente est une pièce essentielle au dossier.",
    voirAussi: [
      { label: 'Dol', href: '#dol' },
      { label: 'Expertise judiciaire', href: '#expertise-judiciaire' },
      { label: 'Contre-expertise', href: '#contre-expertise' },
    ],
  },
];

/** Toutes les lettres de l'alphabet (A-Z) pour la nav, marquées actives ou inactives */
export const ALPHABET = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

/** Lettres ayant au moins une entrée — calculé une fois à l'import */
export const ACTIVE_LETTERS: Set<string> = new Set(lexiqueEntries.map((e) => e.lettre));

/** Entrées groupées par lettre, dans l'ordre alphabétique de la lettre */
export const ENTRIES_BY_LETTER: Record<string, LexiqueEntry[]> = lexiqueEntries.reduce(
  (acc, entry) => {
    if (!acc[entry.lettre]) acc[entry.lettre] = [];
    acc[entry.lettre].push(entry);
    return acc;
  },
  {} as Record<string, LexiqueEntry[]>
);
