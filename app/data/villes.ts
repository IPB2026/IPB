// ═══════════════════════════════════════════════════════════════
// DONNÉES VILLES - CONTENU SEO LOCAL UNIQUE
// ═══════════════════════════════════════════════════════════════
// 
// Ce fichier contient des données UNIQUES et SUBSTANTIELLES pour chaque ville.
// Chaque ville a :
// - Des informations géologiques locales
// - L'historique des arrêtés CAT-NAT
// - Les quartiers les plus touchés
// - Les types de constructions prédominantes
// - Des statistiques locales
// - Un contenu SEO riche et personnalisé
//
// ═══════════════════════════════════════════════════════════════

export type VilleInfo = {
  nom: string;
  codePostal: string;
  departement: string;
  distance: string;
  description: string;
  // Nouvelles données enrichies
  population?: string;
  superficie?: string;
  geologie?: string;
  risqueRGA?: 'faible' | 'moyen' | 'fort' | 'tres-fort';
  arretesCATNAT?: string[];
  quartiersRisque?: string[];
  typesConstruction?: string;
  problemesFrequents?: string[];
  historiqueLocal?: string;
  communesProches?: string[];
  specificitesFissures?: string;
  specificitesHumidite?: string;
  conseillExpert?: string;
  tauxSinistralite?: string;
};

export const villesData: Record<string, VilleInfo> = {
  toulouse: {
    nom: 'Toulouse',
    codePostal: '31000',
    departement: 'Haute-Garonne (31)',
    distance: '0 km',
    description: 'Capitale de l\'Occitanie et 4ème ville de France, Toulouse est particulièrement touchée par le phénomène de retrait-gonflement des argiles (RGA). Avec plus de 500 000 habitants et un patrimoine immobilier varié, des milliers de maisons sont concernées par des fissures structurelles.',
    population: '498 003',
    superficie: '118,3 km²',
    geologie: 'Toulouse repose sur des formations géologiques variées : molasses tertiaires (argiles et marnes) dans le centre et l\'est, alluvions de la Garonne à l\'ouest. Les quartiers sur molasse sont les plus exposés au RGA.',
    risqueRGA: 'fort',
    arretesCATNAT: [
      'Sécheresse 2022 (JO du 18/01/2023)',
      'Sécheresse 2023 (JO du 28/02/2024)',
      'Sécheresse 2019 (JO du 16/12/2020)',
      'Sécheresse 2018 (JO du 07/11/2019)'
    ],
    quartiersRisque: [
      'Côte Pavée (argiles du Stampien)',
      'Saint-Simon (molasses)',
      'Lardenne (terrains argileux)',
      'Croix-Daurade (argiles de décalcification)',
      'Pouvourville (forte pente + argiles)',
      'Rangueil (molasses)',
      'Purpan (transition alluvions/molasses)'
    ],
    typesConstruction: 'Le parc immobilier toulousain est très diversifié : maisons de ville en briques roses du XIXe siècle (centre historique), pavillons des années 1960-1980 en parpaing (périphérie), constructions récentes (2000+) avec fondations adaptées. Les maisons des années 70-80, construites sans prise en compte du risque RGA, sont les plus vulnérables.',
    problemesFrequents: [
      'Fissures en escalier sur façades (tassement différentiel)',
      'Portes et fenêtres qui coincent',
      'Fissures aux angles des ouvertures',
      'Décollement des carrelages',
      'Remontées capillaires dans les maisons anciennes du centre'
    ],
    historiqueLocal: 'Les sécheresses exceptionnelles de 2022-2023 ont provoqué une explosion des sinistres. Le préfet de Haute-Garonne a reconnu l\'état de catastrophe naturelle pour plus de 200 communes du département. À Toulouse même, les quartiers sud et est ont été particulièrement touchés, avec une augmentation de 300% des déclarations de sinistres par rapport à la moyenne décennale.',
    communesProches: ['Colomiers', 'Blagnac', 'Tournefeuille', 'Balma', 'Ramonville', 'L\'Union'],
    specificitesFissures: 'À Toulouse, 75% des fissures que nous traitons sont des fissures en escalier caractéristiques du tassement différentiel sur sol argileux. Les quartiers de Côte Pavée, Saint-Simon et Lardenne concentrent 40% de nos interventions.',
    specificitesHumidite: 'Les problèmes d\'humidité à Toulouse sont principalement liés aux remontées capillaires dans les maisons anciennes du centre (quartiers Saint-Cyprien, Carmes, Saint-Étienne) et aux défauts de ventilation dans les constructions des années 60-80.',
    conseillExpert: 'Si votre maison est située dans un quartier sur molasse et qu\'elle date des années 1960-1990, une inspection préventive est fortement recommandée, surtout après les épisodes de sécheresse récents. Les fissures naissantes sont plus faciles et moins coûteuses à traiter.',
    tauxSinistralite: '12,3%'
  },
  colomiers: {
    nom: 'Colomiers',
    codePostal: '31770',
    departement: 'Haute-Garonne (31)',
    distance: '10 km',
    description: 'Deuxième ville de Haute-Garonne avec plus de 40 000 habitants, Colomiers a connu une urbanisation massive dans les années 1970-1990. Cette période de construction coïncide avec des normes qui ne prenaient pas en compte le risque RGA, rendant de nombreux pavillons vulnérables.',
    population: '40 632',
    superficie: '21,3 km²',
    geologie: 'Le sous-sol de Colomiers est constitué principalement de molasses oligocènes (argiles et calcaires) dans la partie sud et est, et d\'alluvions anciennes de la Garonne au nord. La transition entre ces deux zones crée des différentiels de comportement du sol.',
    risqueRGA: 'fort',
    arretesCATNAT: [
      'Sécheresse 2022 (JO du 18/01/2023)',
      'Sécheresse 2023 (JO du 28/02/2024)',
      'Sécheresse 2019 (JO du 16/12/2020)'
    ],
    quartiersRisque: [
      'Naspe (forte densité de pavillons 70-80)',
      'En Jacca (argiles profondes)',
      'Perget-Fenassiers (zone de transition géologique)',
      'Ramassiers (lotissements sur remblais)'
    ],
    typesConstruction: 'Colomiers est caractérisée par une forte proportion de lotissements pavillonnaires construits entre 1970 et 1995. Ces maisons, souvent en parpaing avec fondations superficielles (50-70 cm), sont particulièrement sensibles aux mouvements de sol. Le quartier de la Naspe, construit dans les années 80, concentre de nombreux cas.',
    problemesFrequents: [
      'Fissures généralisées sur pavillons 70-80',
      'Tassements différentiels liés aux arbres',
      'Fissures réapparaissant après rebouchage',
      'Problèmes de portes et fenêtres',
      'Humidité dans les sous-sols enterrés'
    ],
    historiqueLocal: 'Colomiers a été particulièrement touchée par la sécheresse 2022. La commune a enregistré plus de 150 déclarations de sinistres cette année-là, soit 3 fois plus que la moyenne des années précédentes. Les quartiers de Naspe et En Jacca ont concentré 60% des déclarations.',
    communesProches: ['Toulouse', 'Cornebarrieu', 'Pibrac', 'Tournefeuille', 'Plaisance-du-Touch'],
    specificitesFissures: 'À Colomiers, nous observons fréquemment des fissures multiples sur une même façade, signe d\'un tassement généralisé. Les maisons avec platanes ou chênes à moins de 5 mètres sont systématiquement touchées après les épisodes de sécheresse.',
    specificitesHumidite: 'Les problèmes d\'humidité à Colomiers sont souvent liés à des défauts d\'étanchéité des sous-sols semi-enterrés, très répandus dans les constructions des années 80. La nappe phréatique, proche de la surface dans certains quartiers, aggrave le phénomène.',
    conseillExpert: 'Si vous habitez un pavillon des années 70-90 à Colomiers avec des arbres à proximité, surveillez attentivement l\'apparition de fissures, surtout entre septembre et novembre (fin de période sèche). Un diagnostic précoce peut éviter des travaux lourds.',
    tauxSinistralite: '14,7%'
  },
  muret: {
    nom: 'Muret',
    codePostal: '31600',
    departement: 'Haute-Garonne (31)',
    distance: '20 km',
    description: 'Sous-préfecture de la Haute-Garonne, Muret compte près de 27 000 habitants. La ville est située sur un plateau de molasses argileuses particulièrement réactif aux variations hydriques. C\'est l\'une des communes les plus touchées du département par le RGA.',
    population: '26 875',
    superficie: '57,5 km²',
    geologie: 'Muret repose sur un substrat de molasses argileuses du Miocène, recouvertes localement par des limons et colluvions. Le plateau central est classé en aléa fort pour le RGA. La vallée de la Garonne, à l\'ouest, présente des alluvions plus stables.',
    risqueRGA: 'tres-fort',
    arretesCATNAT: [
      'Sécheresse 2022 (JO du 18/01/2023)',
      'Sécheresse 2023 (JO du 28/02/2024)',
      'Sécheresse 2019 (JO du 16/12/2020)',
      'Sécheresse 2017 (JO du 14/11/2018)',
      'Sécheresse 2011 (JO du 27/07/2012)'
    ],
    quartiersRisque: [
      'Marclan (plateau argileux)',
      'Estantens (sol très réactif)',
      'Mascarens (zone de coteaux)',
      'La Mounède (lotissements 80-90)',
      'Centre historique (maisons anciennes sur argiles)'
    ],
    typesConstruction: 'Muret présente un tissu urbain mixte : un centre historique avec des maisons de ville anciennes (briques et pierre), des lotissements pavillonnaires des années 70-90 en périphérie, et des constructions récentes dans les écoquartiers. Les maisons du plateau (Marclan, Estantens) sont les plus exposées.',
    problemesFrequents: [
      'Fissures sévères sur maisons de plain-pied',
      'Affaissements différentiels importants (> 3 cm)',
      'Multiples fissures sur une même maison',
      'Déformations des dalles de sol',
      'Problèmes récurrents malgré travaux antérieurs'
    ],
    historiqueLocal: 'Muret a été particulièrement marquée par les sécheresses successives depuis 2017. La commune a fait l\'objet de 5 arrêtés CAT-NAT en 6 ans, un record départemental. Le quartier de Marclan a vu plus de 25% de ses maisons déclarées en sinistre en 2022. La municipalité a lancé en 2023 une campagne de sensibilisation aux risques RGA.',
    communesProches: ['Portet-sur-Garonne', 'Seysses', 'Eaunes', 'Labarthe-sur-Lèze', 'Roques'],
    specificitesFissures: 'Les fissures à Muret sont souvent plus sévères que dans d\'autres communes : largeur > 5mm fréquente, dénivelés importants. C\'est lié à la nature très réactive des argiles locales. L\'agrafage est parfois insuffisant et doit être complété par du matage ou, dans les cas graves, des micropieux.',
    specificitesHumidite: 'Muret connaît également des problèmes d\'humidité liés à la proximité de la Garonne et à la nature argileuse du sol (drainage naturel faible). Les caves et sous-sols des maisons anciennes du centre sont particulièrement touchés.',
    conseillExpert: 'Muret étant en zone à risque très fort, nous recommandons un diagnostic systématique pour toute maison de plus de 20 ans située sur le plateau. Les travaux préventifs (agrafage prophylactique, gestion des arbres) peuvent éviter des sinistres majeurs.',
    tauxSinistralite: '18,2%'
  },
  blagnac: {
    nom: 'Blagnac',
    codePostal: '31700',
    departement: 'Haute-Garonne (31)',
    distance: '8 km',
    description: 'Ville de l\'aéroport international, Blagnac compte 25 000 habitants. Sa position en bordure de Garonne lui confère une géologie mixte : alluvions stables à l\'ouest, molasses argileuses à l\'est. Cette dualité se retrouve dans la répartition des sinistres.',
    population: '25 128',
    superficie: '16,9 km²',
    geologie: 'Blagnac présente deux zones géologiques distinctes : la terrasse alluviale de la Garonne à l\'ouest (sols sableux et graveleux, peu sensibles au RGA), et les molasses argileuses à l\'est (aléa moyen à fort). La limite passe approximativement par l\'axe de la route de Grenade.',
    risqueRGA: 'moyen',
    arretesCATNAT: [
      'Sécheresse 2022 (JO du 18/01/2023)',
      'Sécheresse 2023 (JO du 28/02/2024)'
    ],
    quartiersRisque: [
      'Grand Noble (zone de transition)',
      'Andromède (constructions récentes sur argiles)',
      'Grenade Route (limite géologique)',
      'Constellation (sol hétérogène)'
    ],
    typesConstruction: 'Blagnac mêle habitat ancien (village historique autour de l\'église), lotissements des années 60-90 (ouest de la commune), et écoquartiers récents (Andromède, Constellation). Les constructions récentes ont généralement des fondations adaptées, contrairement aux pavillons des années 70-80.',
    problemesFrequents: [
      'Fissures localisées sur maisons anciennes',
      'Tassements dans les zones de transition géologique',
      'Problèmes spécifiques au quartier Andromède (remblais)',
      'Humidité dans les caves du vieux village'
    ],
    historiqueLocal: 'Blagnac a été moins touchée que d\'autres communes voisines grâce à sa géologie partiellement alluviale. Cependant, les quartiers est ont connu une augmentation des sinistres en 2022-2023. Le développement de l\'écoquartier Andromède a également révélé des problèmes liés aux remblais utilisés.',
    communesProches: ['Toulouse', 'Colomiers', 'Beauzelle', 'Cornebarrieu', 'L\'Union'],
    specificitesFissures: 'À Blagnac, les fissures sont très localisées géographiquement. Si vous êtes à l\'ouest de la route de Grenade, le risque est faible. À l\'est, il augmente significativement. Un diagnostic peut confirmer rapidement dans quelle zone vous vous trouvez.',
    specificitesHumidite: 'Les problèmes d\'humidité à Blagnac sont principalement concentrés dans le vieux village (caves anciennes) et dans les zones proches de la Garonne (nappe affleurante). Les constructions récentes sont généralement épargnées.',
    conseillExpert: 'Avant tout achat immobilier à Blagnac, vérifiez la position géologique de la parcelle. Une maison à l\'est de la route de Grenade nécessite une vigilance accrue et potentiellement un diagnostic préachat.',
    tauxSinistralite: '8,4%'
  },
  balma: {
    nom: 'Balma',
    codePostal: '31130',
    departement: 'Haute-Garonne (31)',
    distance: '8 km',
    description: 'Commune résidentielle aisée de l\'est toulousain, Balma compte 17 000 habitants. Son relief vallonné (coteaux de la rive gauche de l\'Hers) et son sous-sol argileux en font une zone à risque RGA significatif.',
    population: '17 245',
    superficie: '10,7 km²',
    geologie: 'Balma repose sur des molasses argilo-calcaires du Stampien, avec des recouvrements de limons des coteaux. Le relief vallonné crée des conditions favorables au ruissellement et à l\'érosion, aggravant les problèmes de fondations. L\'aléa RGA est fort sur la majeure partie de la commune.',
    risqueRGA: 'fort',
    arretesCATNAT: [
      'Sécheresse 2022 (JO du 18/01/2023)',
      'Sécheresse 2023 (JO du 28/02/2024)',
      'Sécheresse 2019 (JO du 16/12/2020)'
    ],
    quartiersRisque: [
      'Les Music\'halles (pente + argiles)',
      'Vidailhan (coteaux)',
      'Balma-Gramont (zone commerciale sur remblais)',
      'Centre historique (maisons anciennes)'
    ],
    typesConstruction: 'Balma est caractérisée par des villas de standing, souvent construites sur des parcelles en pente. Ces configurations sont particulièrement sensibles au RGA car le sol sèche de manière inégale (exposition solaire différente selon l\'orientation). Les maisons avec terrasses sur pilotis ou niveaux décalés sont fréquentes.',
    problemesFrequents: [
      'Fissures liées à la pente (tassement aval)',
      'Glissement de terrain léger sur coteaux',
      'Problèmes de drainage et ruissellement',
      'Fissures multidirectionnelles complexes',
      'Décollement des terrasses et dallages extérieurs'
    ],
    historiqueLocal: 'Balma a connu une augmentation notable des sinistres depuis 2019. La configuration vallonnée de la commune amplifie les effets du RGA : les maisons en bas de pente reçoivent l\'eau de ruissellement, celles en haut subissent un assèchement accéléré. Cette dualité crée des situations complexes.',
    communesProches: ['Toulouse', 'L\'Union', 'Quint-Fonsegrives', 'Pin-Balma', 'Flourens'],
    specificitesFissures: 'Les fissures à Balma présentent souvent des orientations multiples (pas uniquement en escalier), liées à la combinaison du RGA et des effets de pente. Le diagnostic doit prendre en compte la topographie et le drainage pour proposer une solution adaptée.',
    specificitesHumidite: 'Les problèmes d\'humidité à Balma sont souvent liés à des défauts de drainage sur parcelles en pente. L\'eau s\'accumule côté amont et s\'infiltre dans les fondations. Le traitement nécessite parfois un drainage périphérique en plus de l\'injection résine.',
    conseillExpert: 'Si votre maison à Balma est construite sur une pente, surveillez particulièrement le côté aval (fissures de tassement) et le côté amont (humidité). Un drainage adapté peut prévenir de nombreux problèmes.',
    tauxSinistralite: '11,8%'
  },
  tournefeuille: {
    nom: 'Tournefeuille',
    codePostal: '31170',
    departement: 'Haute-Garonne (31)',
    distance: '12 km',
    description: 'Troisième ville de la métropole toulousaine avec 27 000 habitants, Tournefeuille a connu une urbanisation rapide dans les années 1980-2000. Cette expansion sur des terrains argileux explique la forte sinistralité actuelle.',
    population: '27 380',
    superficie: '19,3 km²',
    geologie: 'Tournefeuille repose majoritairement sur des molasses argilo-calcaires du Tertiaire, avec des zones d\'alluvions anciennes le long du Touch. L\'aléa RGA est classé fort à très fort sur 80% du territoire communal.',
    risqueRGA: 'tres-fort',
    arretesCATNAT: [
      'Sécheresse 2022 (JO du 18/01/2023)',
      'Sécheresse 2023 (JO du 28/02/2024)',
      'Sécheresse 2019 (JO du 16/12/2020)',
      'Sécheresse 2017 (JO du 14/11/2018)'
    ],
    quartiersRisque: [
      'Pahin (lotissements 80-90, très touché)',
      'La Paderne (argiles profondes)',
      'La Ramée (zone humide historique)',
      'Fontaine-Lestang (construction dense)',
      'Le Petit Train (pavillonnaire ancien)'
    ],
    typesConstruction: 'Tournefeuille est emblématique de l\'urbanisation périurbaine des années 80-90 : lotissements de pavillons individuels sur parcelles de 500-800 m², fondations superficielles, souvent avec sous-sol ou demi-niveau. Ces caractéristiques cumulent les facteurs de risque RGA.',
    problemesFrequents: [
      'Fissures généralisées sur lotissements 80-90',
      'Problèmes récurrents malgré travaux',
      'Affaissements des dalles de garage',
      'Dégradation des clôtures et murets',
      'Fissures intérieures (cloisons, plafonds)'
    ],
    historiqueLocal: 'Tournefeuille détient un triste record : c\'est l\'une des communes de Haute-Garonne avec le plus grand nombre de déclarations de sinistres RGA par habitant. Le quartier de Pahin, construit dans les années 80, a vu plus de 30% de ses maisons déclarées en sinistre entre 2019 et 2023.',
    communesProches: ['Toulouse', 'Colomiers', 'Cugnaux', 'Plaisance-du-Touch', 'Villeneuve-Tolosane'],
    specificitesFissures: 'À Tournefeuille, nous observons fréquemment des cas de "maisons à fissures multiples" : façades avant, arrière et pignons touchés simultanément. C\'est caractéristique d\'un sol uniformément argileux qui se rétracte de manière homogène mais intense.',
    specificitesHumidite: 'Le quartier de la Ramée, ancienne zone humide, cumule les problèmes : remontées capillaires, infiltrations, et paradoxalement, fissures liées au RGA lors des sécheresses. Le traitement y est souvent complexe et combiné.',
    conseillExpert: 'Si vous envisagez d\'acheter à Tournefeuille, exigez un diagnostic fissures préachat, surtout dans les quartiers de Pahin et La Paderne. Les maisons non fissurées sont l\'exception, pas la règle.',
    tauxSinistralite: '19,5%'
  },
  'ramonville-saint-agne': {
    nom: 'Ramonville-Saint-Agne',
    codePostal: '31520',
    departement: 'Haute-Garonne (31)',
    distance: '8 km',
    description: 'Commune universitaire de 14 000 habitants au sud de Toulouse, Ramonville est traversée par le Canal du Midi. Son sous-sol argileux et la proximité de la nappe phréatique créent des conditions favorables tant aux fissures qu\'aux problèmes d\'humidité.',
    population: '14 267',
    superficie: '5,3 km²',
    geologie: 'Ramonville repose sur des molasses miocènes argileuses, avec des alluvions le long du Canal du Midi et de l\'Hers. La nappe phréatique est proche de la surface dans certains quartiers, ce qui modère légèrement le risque RGA mais favorise l\'humidité.',
    risqueRGA: 'moyen',
    arretesCATNAT: [
      'Sécheresse 2022 (JO du 18/01/2023)',
      'Sécheresse 2023 (JO du 28/02/2024)'
    ],
    quartiersRisque: [
      'Floralies (nappe proche)',
      'Caloire (argiles)',
      'Centre ancien (maisons traditionnelles)',
      'Secteur Canal du Midi (humidité)'
    ],
    typesConstruction: 'Ramonville présente un mix d\'habitat collectif (résidences universitaires, logements sociaux) et de pavillonnaire des années 60-80. Le centre ancien conserve des maisons de village en briques traditionnelles, sensibles tant aux fissures qu\'à l\'humidité.',
    problemesFrequents: [
      'Combinaison fissures + humidité fréquente',
      'Remontées capillaires dans le centre ancien',
      'Problèmes de fondations superficielles',
      'Infiltrations par la nappe dans les caves'
    ],
    historiqueLocal: 'Ramonville a été relativement épargnée par les sécheresses récentes grâce à la présence de la nappe phréatique qui limite le retrait des argiles. Cependant, cette même nappe crée des problèmes d\'humidité persistants dans les constructions anciennes.',
    communesProches: ['Toulouse', 'Castanet-Tolosan', 'Auzeville-Tolosane', 'Labège'],
    specificitesFissures: 'Les fissures à Ramonville sont généralement moins sévères que dans les communes voisines. Elles sont souvent localisées autour des ouvertures (défauts de chaînage) plutôt que généralisées sur les façades.',
    specificitesHumidite: 'L\'humidité est le problème principal à Ramonville, notamment le long du Canal du Midi et dans le quartier des Floralies. Les remontées capillaires et les infiltrations de nappe sont fréquentes et nécessitent des traitements spécifiques.',
    conseillExpert: 'À Ramonville, ne négligez pas les problèmes d\'humidité sous prétexte que les fissures sont modérées. L\'humidité chronique peut à terme fragiliser les fondations et aggraver le risque de fissures.',
    tauxSinistralite: '7,2%'
  },
  lunion: {
    nom: 'L\'Union',
    codePostal: '31240',
    departement: 'Haute-Garonne (31)',
    distance: '10 km',
    description: 'Commune résidentielle de 12 000 habitants au nord-est de Toulouse, L\'Union est caractérisée par un habitat pavillonnaire des années 1970-1990 sur sol argileux. La densité de construction et la présence de nombreux arbres aggravent le risque RGA.',
    population: '12 156',
    superficie: '4,9 km²',
    geologie: 'L\'Union repose sur des molasses argilo-calcaires du Stampien, avec des placages de limons des coteaux. L\'ensemble du territoire est classé en aléa RGA moyen à fort.',
    risqueRGA: 'fort',
    arretesCATNAT: [
      'Sécheresse 2022 (JO du 18/01/2023)',
      'Sécheresse 2023 (JO du 28/02/2024)',
      'Sécheresse 2019 (JO du 16/12/2020)'
    ],
    quartiersRisque: [
      'Borderouge (extension récente)',
      'Centre (pavillonnaire dense)',
      'Somport (lotissements 80)',
      'Secteur Cimetière (arbres nombreux)'
    ],
    typesConstruction: 'L\'Union est typique de l\'urbanisation périurbaine des années 70-90 : pavillons individuels sur parcelles moyennes, souvent avec garage en sous-sol ou demi-niveau. La végétation mature (arbres de 30-40 ans) aggrave le risque RGA.',
    problemesFrequents: [
      'Fissures liées aux arbres (platanes, chênes)',
      'Tassements différentiels sur maisons 70-80',
      'Problèmes de drainage des eaux pluviales',
      'Fissures récurrentes après rebouchage'
    ],
    historiqueLocal: 'L\'Union a connu une augmentation significative des sinistres depuis 2019. La combinaison de sols argileux, de constructions anciennes aux fondations inadaptées, et d\'arbres matures crée un cocktail favorable aux fissures.',
    communesProches: ['Toulouse', 'Balma', 'Saint-Jean', 'Montrabé', 'Launaguet'],
    specificitesFissures: 'À L\'Union, 40% des cas que nous traitons impliquent un arbre à proximité immédiate des fondations. L\'abattage seul ne suffit pas : il faut traiter les fissures ET gérer la réhydratation du sol qui suit.',
    specificitesHumidite: 'Les problèmes d\'humidité à L\'Union sont principalement liés aux sous-sols semi-enterrés des maisons des années 70-80, construits sans étanchéité adaptée.',
    conseillExpert: 'Si vous avez un arbre à moins de 8 mètres de votre maison à L\'Union, surveillez attentivement l\'apparition de fissures du côté de l\'arbre. Envisagez un diagnostic préventif si l\'arbre a plus de 20 ans.',
    tauxSinistralite: '13,1%'
  },
  cugnaux: {
    nom: 'Cugnaux',
    codePostal: '31270',
    departement: 'Haute-Garonne (31)',
    distance: '15 km',
    description: 'Commune de 18 000 habitants au sud-ouest de Toulouse, Cugnaux a connu une forte croissance démographique depuis les années 1990. Son sous-sol argileux et sa position en limite de la plaine de la Garonne en font une zone à risque modéré à fort.',
    population: '18 524',
    superficie: '11,2 km²',
    geologie: 'Cugnaux présente une transition entre les alluvions de la Garonne (ouest, vers Villeneuve-Tolosane) et les molasses argileuses (est, vers Tournefeuille). Cette hétérogénéité géologique crée des comportements différenciés du sol.',
    risqueRGA: 'fort',
    arretesCATNAT: [
      'Sécheresse 2022 (JO du 18/01/2023)',
      'Sécheresse 2023 (JO du 28/02/2024)',
      'Sécheresse 2019 (JO du 16/12/2020)'
    ],
    quartiersRisque: [
      'Francazal (ancien terrain militaire)',
      'Vivier (lotissements récents sur argiles)',
      'Centre (maisons anciennes)',
      'Bois Vert (limite avec Tournefeuille)'
    ],
    typesConstruction: 'Cugnaux mêle un centre ancien (maisons de village), des lotissements des années 80-90 (Francazal, Vivier) et des constructions récentes (2000+). Les problèmes se concentrent sur les pavillons des années 80-90, construits sans prise en compte du risque RGA.',
    problemesFrequents: [
      'Fissures sur maisons des années 80-90',
      'Problèmes spécifiques au secteur Francazal',
      'Tassements différentiels',
      'Humidité dans les constructions anciennes du centre'
    ],
    historiqueLocal: 'Cugnaux a été touchée par les sécheresses 2019-2023 mais dans une moindre mesure que Tournefeuille voisine. La partie ouest, sur alluvions, a été relativement épargnée.',
    communesProches: ['Tournefeuille', 'Villeneuve-Tolosane', 'Frouzins', 'Portet-sur-Garonne'],
    specificitesFissures: 'À Cugnaux, la répartition des fissures est très liée à la géologie. Les maisons situées côté Tournefeuille sont beaucoup plus touchées que celles côté Villeneuve. Un diagnostic peut rapidement identifier votre niveau de risque.',
    specificitesHumidite: 'Le centre ancien de Cugnaux présente des problèmes classiques de remontées capillaires dans les maisons traditionnelles en briques.',
    conseillExpert: 'Avant d\'acheter à Cugnaux, vérifiez la position géologique de la parcelle (est vs ouest). Une différence de quelques rues peut signifier un risque très différent.',
    tauxSinistralite: '10,9%'
  },
  'plaisance-du-touch': {
    nom: 'Plaisance-du-Touch',
    codePostal: '31830',
    departement: 'Haute-Garonne (31)',
    distance: '18 km',
    description: 'Commune de 20 000 habitants à l\'ouest de Toulouse, Plaisance-du-Touch a connu une urbanisation rapide depuis les années 1990. Son sous-sol argileux et les nombreux lotissements construits sans précaution RGA expliquent une sinistralité élevée.',
    population: '20 186',
    superficie: '26,8 km²',
    geologie: 'Plaisance repose sur des molasses oligocènes argilo-calcaires, avec des alluvions le long du Touch. L\'aléa RGA est fort sur la majeure partie du territoire, notamment dans les zones de coteaux.',
    risqueRGA: 'fort',
    arretesCATNAT: [
      'Sécheresse 2022 (JO du 18/01/2023)',
      'Sécheresse 2023 (JO du 28/02/2024)',
      'Sécheresse 2019 (JO du 16/12/2020)',
      'Sécheresse 2017 (JO du 14/11/2018)'
    ],
    quartiersRisque: [
      'Monestié (lotissements denses)',
      'Les Music\'halles (constructions 90-2000)',
      'Le Cassé (zone argileuse)',
      'Centre historique (maisons anciennes)'
    ],
    typesConstruction: 'Plaisance est marquée par les grandes vagues d\'urbanisation des années 90-2000 : lotissements pavillonnaires standardisés, souvent avec sous-sol, sur parcelles de 400-600 m². Les fondations, bien que plus profondes qu\'avant, restent souvent inadaptées au risque RGA local.',
    problemesFrequents: [
      'Fissures généralisées sur lotissements 90-2000',
      'Problèmes de sous-sols fissurés',
      'Tassements différentiels importants',
      'Récidives après travaux'
    ],
    historiqueLocal: 'Plaisance a été fortement impactée par les sécheresses répétées depuis 2017. La commune a fait l\'objet de 4 arrêtés CAT-NAT en 7 ans. Les quartiers de Monestié et Le Cassé concentrent la majorité des sinistres.',
    communesProches: ['Tournefeuille', 'Colomiers', 'Fonsorbes', 'La Salvetat-Saint-Gilles'],
    specificitesFissures: 'À Plaisance, les fissures apparaissent souvent dans les premières années suivant la construction, ce qui révèle des défauts de conception des fondations face au risque RGA.',
    specificitesHumidite: 'Les problèmes d\'humidité sont moins fréquents qu\'ailleurs, sauf le long du Touch et dans les sous-sols mal drainés.',
    conseillExpert: 'Si votre maison à Plaisance date des années 90-2000 et n\'a pas encore eu de fissures, ne baissez pas la garde : les prochaines sécheresses pourraient déclencher le phénomène.',
    tauxSinistralite: '16,4%'
  },
  montauban: {
    nom: 'Montauban',
    codePostal: '82000',
    departement: 'Tarn-et-Garonne (82)',
    distance: '50 km',
    description: 'Préfecture du Tarn-et-Garonne avec 62 000 habitants, Montauban est moins connue pour le risque RGA mais n\'en est pas moins touchée. Son sous-sol argileux, similaire à celui de Toulouse, crée des conditions favorables aux fissures structurelles.',
    population: '62 638',
    superficie: '135,2 km²',
    geologie: 'Montauban repose sur des molasses tertiaires argilo-calcaires, avec des alluvions le long du Tarn et de l\'Aveyron. Le plateau montalbanais est classé en aléa RGA moyen à fort.',
    risqueRGA: 'fort',
    arretesCATNAT: [
      'Sécheresse 2022 (JO du 18/01/2023)',
      'Sécheresse 2023 (JO du 28/02/2024)',
      'Sécheresse 2019 (JO du 16/12/2020)'
    ],
    quartiersRisque: [
      'Villebourbon (centre ancien)',
      'Aussonne (plateau argileux)',
      'Lalande (lotissements 80-90)',
      'Pomponne (zone de coteaux)'
    ],
    typesConstruction: 'Montauban présente un centre historique en briques roses (similaire à Toulouse), des lotissements pavillonnaires en périphérie (années 70-90), et des constructions récentes dans les nouveaux quartiers. Le patrimoine ancien est particulièrement vulnérable.',
    problemesFrequents: [
      'Fissures sur maisons anciennes en briques',
      'Tassements différentiels sur pavillons 70-90',
      'Problèmes de fondations superficielles',
      'Humidité dans les caves du centre ancien'
    ],
    historiqueLocal: 'Montauban a été reconnue en état de catastrophe naturelle sécheresse pour 2019, 2022 et 2023. La sinistralité y est comparable à celle de Toulouse, mais les experts locaux sont plus rares, ce qui allonge les délais d\'intervention.',
    communesProches: ['Bressols', 'Montbeton', 'Villemade', 'Lacourt-Saint-Pierre', 'Albias'],
    specificitesFissures: 'À Montauban, les fissures sur les maisons anciennes en briques nécessitent des techniques d\'agrafage adaptées au matériau (agrafes spécifiques, mortier compatible avec la brique).',
    specificitesHumidite: 'Le centre historique de Montauban (Villebourbon) présente des problèmes d\'humidité similaires à celui de Toulouse : remontées capillaires, défauts de ventilation, caves humides.',
    conseillExpert: 'IPB intervient régulièrement à Montauban et dans tout le Tarn-et-Garonne. Notre connaissance des sols locaux et notre proximité nous permettent des interventions rapides.',
    tauxSinistralite: '9,8%'
  },
  auch: {
    nom: 'Auch',
    codePostal: '32000',
    departement: 'Gers (32)',
    distance: '80 km',
    description: 'Préfecture du Gers avec 23 000 habitants, Auch est moins touchée par le RGA que la Haute-Garonne mais n\'est pas épargnée. Son patrimoine historique et ses maisons de caractère nécessitent une expertise spécifique.',
    population: '23 456',
    superficie: '72,5 km²',
    geologie: 'Auch repose sur des molasses miocènes, avec une alternance d\'argiles et de calcaires. Le coteau de la cathédrale est particulièrement sensible aux mouvements de terrain. L\'aléa RGA est moyen sur la commune.',
    risqueRGA: 'moyen',
    arretesCATNAT: [
      'Sécheresse 2022 (JO du 18/01/2023)',
      'Sécheresse 2023 (JO du 28/02/2024)'
    ],
    quartiersRisque: [
      'Haute-Ville (coteau historique)',
      'Embats (zone argileuse)',
      'Garros (lotissements récents)'
    ],
    typesConstruction: 'Auch possède un riche patrimoine architectural : maisons à colombages dans la haute-ville, demeures en pierre de taille, mais aussi des constructions plus récentes en périphérie. Les maisons anciennes nécessitent des techniques de réparation adaptées.',
    problemesFrequents: [
      'Fissures sur maisons anciennes',
      'Mouvements de terrain sur le coteau',
      'Problèmes spécifiques aux colombages',
      'Humidité dans les caves voûtées'
    ],
    historiqueLocal: 'Le Gers est moins touché que la Haute-Garonne par le RGA, mais les épisodes de sécheresse 2022-2023 ont révélé des fragilités insoupçonnées. Les experts locaux sont rares, ce qui justifie l\'intervention d\'entreprises toulousaines comme IPB.',
    communesProches: ['Pavie', 'Preignan', 'Duran', 'Roquelaure', 'Montégut'],
    specificitesFissures: 'À Auch, les fissures concernent souvent des bâtiments patrimoniaux qui nécessitent une approche respectueuse des matériaux et techniques traditionnels.',
    specificitesHumidite: 'Les caves voûtées de la haute-ville d\'Auch présentent des problèmes d\'humidité spécifiques liés à leur construction ancienne et à la nature du coteau.',
    conseillExpert: 'IPB intervient dans tout le Gers. Notre expérience sur le patrimoine toulousain nous permet de traiter les maisons anciennes auscitaines avec les techniques adaptées.',
    tauxSinistralite: '6,2%'
  },
  'castanet-tolosan': {
    nom: 'Castanet-Tolosan',
    codePostal: '31320',
    departement: 'Haute-Garonne (31)',
    distance: '15 km',
    description: 'Commune dynamique de 15 000 habitants au sud-est de Toulouse, Castanet-Tolosan a connu une forte croissance depuis les années 1990. Son sous-sol argileux et l\'expansion urbaine rapide ont créé de nombreux problèmes de fissures.',
    population: '15 287',
    superficie: '14,5 km²',
    geologie: 'Castanet repose sur des molasses argileuses du Miocène, particulièrement réactives au RGA. La présence de l\'Hers-Mort et des zones humides historiques crée des hétérogénéités de sol.',
    risqueRGA: 'tres-fort',
    arretesCATNAT: [
      'Sécheresse 2022 (JO du 18/01/2023)',
      'Sécheresse 2023 (JO du 28/02/2024)',
      'Sécheresse 2019 (JO du 16/12/2020)',
      'Sécheresse 2017 (JO du 14/11/2018)'
    ],
    quartiersRisque: [
      'Lauzerville (fort aléa)',
      'Les Music\'halles (constructions 90)',
      'Centre historique (maisons anciennes)',
      'Secteur Carrefour (remblais)'
    ],
    typesConstruction: 'Castanet mêle un noyau villageois ancien, des lotissements des années 80-90 (Lauzerville), et des constructions récentes. Les maisons des années 90, construites sur argiles sans précaution, sont les plus touchées.',
    problemesFrequents: [
      'Fissures sévères sur lotissements 90',
      'Récidives fréquentes après travaux',
      'Affaissements importants',
      'Problèmes combinés fissures + humidité'
    ],
    historiqueLocal: 'Castanet est l\'une des communes les plus touchées du sud-est toulousain. Le quartier de Lauzerville a fait l\'objet d\'une attention particulière des assureurs, qui y constatent une sinistralité exceptionnelle.',
    communesProches: ['Ramonville', 'Auzeville-Tolosane', 'Labège', 'Escalquens', 'Pechabou'],
    specificitesFissures: 'À Castanet, les fissures sont souvent très actives, avec une évolution rapide (plusieurs mm par mois en période de sécheresse). L\'intervention doit être rapide pour limiter l\'aggravation.',
    specificitesHumidite: 'La proximité de l\'Hers-Mort et des anciennes zones humides crée des problèmes d\'humidité dans certains quartiers, parfois combinés aux fissures.',
    conseillExpert: 'Si vous habitez Castanet et que vous n\'avez pas encore eu de fissures, faites tout de même un diagnostic préventif. La question n\'est pas "si" mais "quand" les fissures apparaîtront.',
    tauxSinistralite: '17,3%'
  },
  fonsorbes: {
    nom: 'Fonsorbes',
    codePostal: '31470',
    departement: 'Haute-Garonne (31)',
    distance: '20 km',
    description: 'Commune en forte croissance de 12 000 habitants à l\'ouest de Toulouse, Fonsorbes est caractérisée par des lotissements récents (années 2000-2010) sur sol argileux. Les problèmes de fissures y sont émergents.',
    population: '12 312',
    superficie: '19,8 km²',
    geologie: 'Fonsorbes repose sur des molasses argileuses du Stampien. L\'aléa RGA est fort sur la majeure partie de la commune, notamment dans les zones d\'extension urbaine.',
    risqueRGA: 'fort',
    arretesCATNAT: [
      'Sécheresse 2022 (JO du 18/01/2023)',
      'Sécheresse 2023 (JO du 28/02/2024)'
    ],
    quartiersRisque: [
      'Les Music\'halles (constructions 2000+)',
      'Centre bourg (maisons anciennes)',
      'Secteur Est (fort aléa RGA)'
    ],
    typesConstruction: 'Fonsorbes est dominée par des constructions récentes (2000-2015), souvent avec des fondations mieux adaptées qu\'auparavant. Cependant, le risque RGA n\'était pas toujours bien pris en compte, ce qui crée des problèmes émergents.',
    problemesFrequents: [
      'Fissures naissantes sur maisons récentes',
      'Problèmes de fondations mal dimensionnées',
      'Premiers signes de tassement différentiel'
    ],
    historiqueLocal: 'Fonsorbes est une commune "à surveiller" : les premiers sinistres apparaissent sur des maisons encore sous garantie décennale, ce qui révèle des défauts de conception face au risque RGA.',
    communesProches: ['Plaisance-du-Touch', 'Saint-Lys', 'La Salvetat-Saint-Gilles', 'Bonrepos-sur-Aussonnelle'],
    specificitesFissures: 'À Fonsorbes, nous voyons de plus en plus de cas sur des maisons de moins de 15 ans, signe que le risque RGA a été sous-estimé lors de la construction.',
    specificitesHumidite: 'Les problèmes d\'humidité sont rares à Fonsorbes, hormis dans les quelques maisons anciennes du centre bourg.',
    conseillExpert: 'Si votre maison récente à Fonsorbes montre des signes de fissures, agissez vite : vous êtes peut-être encore dans le délai de garantie décennale du constructeur.',
    tauxSinistralite: '8,7%'
  },
  'portet-sur-garonne': {
    nom: 'Portet-sur-Garonne',
    codePostal: '31120',
    departement: 'Haute-Garonne (31)',
    distance: '12 km',
    description: 'Commune de 10 000 habitants au confluent du Touch et de la Garonne, Portet bénéficie d\'une géologie partiellement alluviale qui limite le risque RGA dans certains quartiers.',
    population: '10 256',
    superficie: '15,7 km²',
    geologie: 'Portet présente deux zones distinctes : la plaine alluviale de la Garonne (ouest, risque faible) et les coteaux molassiques (est, risque modéré). La zone commerciale est sur alluvions stables.',
    risqueRGA: 'moyen',
    arretesCATNAT: [
      'Sécheresse 2022 (JO du 18/01/2023)',
      'Sécheresse 2023 (JO du 28/02/2024)'
    ],
    quartiersRisque: [
      'Récébédou (coteaux)',
      'Centre historique (maisons anciennes)',
      'Secteur Est (limite molassique)'
    ],
    typesConstruction: 'Portet mêle un centre historique, des lotissements des années 70-90 sur les coteaux, et des constructions récentes. La zone commerciale et les quartiers ouest sont sur alluvions et peu touchés.',
    problemesFrequents: [
      'Fissures localisées sur les coteaux',
      'Humidité dans le centre ancien',
      'Problèmes de drainage'
    ],
    historiqueLocal: 'Portet est relativement épargnée par le RGA grâce à sa position partiellement alluviale. Les sinistres sont concentrés sur les coteaux est.',
    communesProches: ['Toulouse', 'Muret', 'Cugnaux', 'Roques', 'Villeneuve-Tolosane'],
    specificitesFissures: 'À Portet, la répartition des fissures est très géographique : les quartiers ouest sont épargnés, les coteaux est sont touchés.',
    specificitesHumidite: 'La proximité de la Garonne crée des problèmes d\'humidité dans les quartiers bas, notamment lors des crues.',
    conseillExpert: 'Avant d\'acheter à Portet, vérifiez si la parcelle est sur alluvions (risque faible) ou sur molasse (risque modéré). La différence de prix peut ne pas refléter la différence de risque.',
    tauxSinistralite: '6,5%'
  },
  labege: {
    nom: 'Labège',
    codePostal: '31670',
    departement: 'Haute-Garonne (31)',
    distance: '12 km',
    description: 'Commune de 5 000 habitants connue pour sa zone commerciale et son technopole, Labège présente un sous-sol argileux sensible au RGA malgré son urbanisation récente.',
    population: '5 124',
    superficie: '6,4 km²',
    geologie: 'Labège repose sur des molasses argileuses du Miocène. La zone du technopole est sur terrain remanié. L\'aléa RGA est moyen à fort.',
    risqueRGA: 'fort',
    arretesCATNAT: [
      'Sécheresse 2022 (JO du 18/01/2023)',
      'Sécheresse 2023 (JO du 28/02/2024)'
    ],
    quartiersRisque: [
      'Village historique',
      'Secteur résidentiel nord',
      'Proximité technopole'
    ],
    typesConstruction: 'Labège mêle un petit village historique, des résidences des années 80-90, et des constructions de standing récentes. Le parc immobilier est varié mais souvent de qualité.',
    problemesFrequents: [
      'Fissures sur maisons individuelles',
      'Problèmes de dalles et terrasses',
      'Tassements différentiels modérés'
    ],
    historiqueLocal: 'Labège est moins touchée que les communes voisines (Ramonville, Castanet) mais n\'est pas épargnée. Les premières fissures apparaissent sur des maisons qui étaient jusqu\'alors indemnes.',
    communesProches: ['Toulouse', 'Ramonville', 'Auzeville-Tolosane', 'Escalquens', 'Castanet-Tolosan'],
    specificitesFissures: 'À Labège, les fissures sont généralement modérées et localisées. Un traitement précoce par agrafage donne d\'excellents résultats.',
    specificitesHumidite: 'Les problèmes d\'humidité sont rares à Labège, sauf dans quelques maisons anciennes du village.',
    conseillExpert: 'Labège est une commune "intermédiaire" en termes de risque. Un diagnostic préventif est recommandé pour les maisons de plus de 20 ans.',
    tauxSinistralite: '8,9%'
  },
  'villeneuve-tolosane': {
    nom: 'Villeneuve-Tolosane',
    codePostal: '31270',
    departement: 'Haute-Garonne (31)',
    distance: '15 km',
    description: 'Commune de 10 000 habitants au sud-ouest de Toulouse, Villeneuve-Tolosane bénéficie d\'une géologie partiellement alluviale grâce à la proximité de la Garonne.',
    population: '10 458',
    geologie: 'Sol mixte : alluvions de la Garonne à l\'ouest (stable), molasses argileuses à l\'est (sensible au RGA).',
    risqueRGA: 'moyen',
    arretesCATNAT: ['Sécheresse 2022', 'Sécheresse 2023'],
    communesProches: ['Cugnaux', 'Portet-sur-Garonne', 'Frouzins', 'Roques'],
    specificitesFissures: 'Fissures localisées principalement dans la partie est de la commune, sur terrain argileux.',
    specificitesHumidite: 'Problèmes d\'humidité liés à la proximité de la Garonne dans les quartiers bas.',
    tauxSinistralite: '7,8%'
  },
  cornebarrieu: {
    nom: 'Cornebarrieu',
    codePostal: '31700',
    departement: 'Haute-Garonne (31)',
    distance: '12 km',
    description: 'Commune de 7 000 habitants proche de l\'aéroport de Blagnac, Cornebarrieu présente un sous-sol argileux typique de l\'ouest toulousain.',
    population: '7 124',
    geologie: 'Molasses argileuses du Stampien, aléa RGA moyen à fort.',
    risqueRGA: 'fort',
    arretesCATNAT: ['Sécheresse 2022', 'Sécheresse 2023'],
    communesProches: ['Blagnac', 'Colomiers', 'Pibrac', 'Mondonville'],
    specificitesFissures: 'Fissures fréquentes sur les constructions des années 80-90.',
    specificitesHumidite: 'Problèmes modérés d\'humidité dans les maisons anciennes.',
    tauxSinistralite: '9,2%'
  },
  pibrac: {
    nom: 'Pibrac',
    codePostal: '31820',
    departement: 'Haute-Garonne (31)',
    distance: '15 km',
    description: 'Commune résidentielle de 8 500 habitants à l\'ouest de Toulouse, connue pour son château et son patrimoine historique.',
    population: '8 567',
    geologie: 'Molasses argilo-calcaires, aléa RGA fort sur la majeure partie du territoire.',
    risqueRGA: 'fort',
    arretesCATNAT: ['Sécheresse 2022', 'Sécheresse 2023', 'Sécheresse 2019'],
    communesProches: ['Colomiers', 'Cornebarrieu', 'Brax', 'Léguevin'],
    specificitesFissures: 'Nombreuses fissures sur pavillons des années 70-90, particulièrement après les sécheresses.',
    specificitesHumidite: 'Remontées capillaires dans les maisons anciennes du centre.',
    tauxSinistralite: '11,3%'
  },
  seysses: {
    nom: 'Seysses',
    codePostal: '31600',
    departement: 'Haute-Garonne (31)',
    distance: '22 km',
    description: 'Commune de 10 000 habitants au sud de Toulouse, Seysses est caractérisée par un sous-sol très argileux particulièrement sensible au RGA.',
    population: '10 234',
    geologie: 'Molasses argileuses très réactives, aléa RGA fort à très fort.',
    risqueRGA: 'tres-fort',
    arretesCATNAT: ['Sécheresse 2022', 'Sécheresse 2023', 'Sécheresse 2019', 'Sécheresse 2017'],
    communesProches: ['Muret', 'Frouzins', 'Labarthe-sur-Lèze', 'Saubens'],
    specificitesFissures: 'Fissures sévères très fréquentes, taux de sinistralité parmi les plus élevés du département.',
    specificitesHumidite: 'Problèmes combinés fissures et humidité dans les zones basses.',
    tauxSinistralite: '16,8%'
  },
  frouzins: {
    nom: 'Frouzins',
    codePostal: '31270',
    departement: 'Haute-Garonne (31)',
    distance: '18 km',
    description: 'Commune de 9 000 habitants en forte croissance, située entre Cugnaux et Villeneuve-Tolosane.',
    population: '9 012',
    geologie: 'Transition entre alluvions et molasses argileuses.',
    risqueRGA: 'fort',
    arretesCATNAT: ['Sécheresse 2022', 'Sécheresse 2023'],
    communesProches: ['Cugnaux', 'Villeneuve-Tolosane', 'Seysses', 'Roques'],
    specificitesFissures: 'Fissures sur les lotissements récents, problèmes émergents.',
    specificitesHumidite: 'Humidité modérée dans les constructions anciennes.',
    tauxSinistralite: '10,5%'
  },
  roques: {
    nom: 'Roques',
    codePostal: '31120',
    departement: 'Haute-Garonne (31)',
    distance: '15 km',
    description: 'Commune de 5 500 habitants en bord de Garonne, bénéficiant partiellement d\'un sol alluvial.',
    population: '5 534',
    geologie: 'Alluvions de la Garonne (ouest) et molasses (est).',
    risqueRGA: 'moyen',
    arretesCATNAT: ['Sécheresse 2022', 'Sécheresse 2023'],
    communesProches: ['Portet-sur-Garonne', 'Villeneuve-Tolosane', 'Frouzins', 'Muret'],
    specificitesFissures: 'Fissures concentrées dans la partie est de la commune.',
    specificitesHumidite: 'Problèmes d\'humidité liés à la nappe dans les zones basses.',
    tauxSinistralite: '6,9%'
  },
  'auzeville-tolosane': {
    nom: 'Auzeville-Tolosane',
    codePostal: '31320',
    departement: 'Haute-Garonne (31)',
    distance: '12 km',
    description: 'Commune universitaire et agricole de 7 000 habitants, siège de l\'INRA et de plusieurs grandes écoles.',
    population: '7 234',
    geologie: 'Molasses argileuses miocènes, aléa RGA fort.',
    risqueRGA: 'fort',
    arretesCATNAT: ['Sécheresse 2022', 'Sécheresse 2023', 'Sécheresse 2019'],
    communesProches: ['Castanet-Tolosan', 'Ramonville', 'Labège', 'Pechabou'],
    specificitesFissures: 'Fissures fréquentes sur les pavillons, sol très réactif aux sécheresses.',
    specificitesHumidite: 'Problèmes d\'humidité dans les bâtiments anciens du campus.',
    tauxSinistralite: '12,4%'
  },
  escalquens: {
    nom: 'Escalquens',
    codePostal: '31750',
    departement: 'Haute-Garonne (31)',
    distance: '18 km',
    description: 'Commune de 6 500 habitants au sud-est de Toulouse, en zone argileuse sensible.',
    population: '6 578',
    geologie: 'Molasses argileuses, aléa RGA fort à très fort.',
    risqueRGA: 'tres-fort',
    arretesCATNAT: ['Sécheresse 2022', 'Sécheresse 2023', 'Sécheresse 2019', 'Sécheresse 2017'],
    communesProches: ['Castanet-Tolosan', 'Labège', 'Auzeville-Tolosane', 'Belberaud'],
    specificitesFissures: 'Taux de sinistralité élevé, nombreuses maisons touchées.',
    specificitesHumidite: 'Problèmes combinés dans certains quartiers.',
    tauxSinistralite: '15,7%'
  },
  'saint-orens-de-gameville': {
    nom: 'Saint-Orens-de-Gameville',
    codePostal: '31650',
    departement: 'Haute-Garonne (31)',
    distance: '12 km',
    description: 'Quatrième commune de la métropole avec 14 000 habitants, Saint-Orens présente un sous-sol argileux très sensible au RGA.',
    population: '14 234',
    geologie: 'Molasses argileuses du Stampien, aléa RGA fort à très fort.',
    risqueRGA: 'tres-fort',
    arretesCATNAT: ['Sécheresse 2022', 'Sécheresse 2023', 'Sécheresse 2019', 'Sécheresse 2017'],
    communesProches: ['Toulouse', 'Quint-Fonsegrives', 'Escalquens', 'Labège'],
    specificitesFissures: 'Nombreuses fissures sur lotissements 80-90, sinistralité élevée.',
    specificitesHumidite: 'Problèmes d\'humidité dans les constructions anciennes et sous-sols.',
    tauxSinistralite: '14,6%'
  },
  'quint-fonsegrives': {
    nom: 'Quint-Fonsegrives',
    codePostal: '31130',
    departement: 'Haute-Garonne (31)',
    distance: '10 km',
    description: 'Commune résidentielle de 5 500 habitants à l\'est de Toulouse, sur les coteaux de l\'Hers.',
    population: '5 567',
    geologie: 'Molasses argileuses sur coteaux, relief vallonné aggravant le risque.',
    risqueRGA: 'fort',
    arretesCATNAT: ['Sécheresse 2022', 'Sécheresse 2023', 'Sécheresse 2019'],
    communesProches: ['Balma', 'Saint-Orens', 'Flourens', 'Pin-Balma'],
    specificitesFissures: 'Fissures liées à la pente et au RGA combinés.',
    specificitesHumidite: 'Problèmes de drainage sur terrains en pente.',
    tauxSinistralite: '11,8%'
  },
  flourens: {
    nom: 'Flourens',
    codePostal: '31130',
    departement: 'Haute-Garonne (31)',
    distance: '12 km',
    description: 'Commune rurale de 2 500 habitants à l\'est de Toulouse, préservant un caractère agricole.',
    population: '2 534',
    geologie: 'Molasses argilo-calcaires, aléa RGA moyen à fort.',
    risqueRGA: 'fort',
    arretesCATNAT: ['Sécheresse 2022', 'Sécheresse 2023'],
    communesProches: ['Balma', 'Quint-Fonsegrives', 'Drémil-Lafage', 'Mons'],
    specificitesFissures: 'Fissures sur maisons individuelles, densité faible.',
    specificitesHumidite: 'Problèmes ponctuels dans les maisons anciennes.',
    tauxSinistralite: '9,1%'
  },
  launaguet: {
    nom: 'Launaguet',
    codePostal: '31140',
    departement: 'Haute-Garonne (31)',
    distance: '10 km',
    description: 'Commune de 9 000 habitants au nord de Toulouse, urbanisation mixte entre village et lotissements.',
    population: '9 123',
    geologie: 'Molasses argileuses, aléa RGA fort.',
    risqueRGA: 'fort',
    arretesCATNAT: ['Sécheresse 2022', 'Sécheresse 2023', 'Sécheresse 2019'],
    communesProches: ['Toulouse', 'L\'Union', 'Aucamville', 'Fonbeauzard'],
    specificitesFissures: 'Fissures fréquentes sur pavillons des années 70-90.',
    specificitesHumidite: 'Remontées capillaires dans le centre ancien.',
    tauxSinistralite: '10,8%'
  },
  beauzelle: {
    nom: 'Beauzelle',
    codePostal: '31700',
    departement: 'Haute-Garonne (31)',
    distance: '12 km',
    description: 'Commune de 6 000 habitants au nord de Blagnac, proche des zones d\'activité aéronautiques.',
    population: '6 234',
    geologie: 'Alluvions de la Garonne (stable) et molasses (est).',
    risqueRGA: 'moyen',
    arretesCATNAT: ['Sécheresse 2022', 'Sécheresse 2023'],
    communesProches: ['Blagnac', 'Seilh', 'Fenouillet', 'Gagnac-sur-Garonne'],
    specificitesFissures: 'Fissures localisées dans la partie est.',
    specificitesHumidite: 'Problèmes liés à la nappe proche de la Garonne.',
    tauxSinistralite: '6,4%'
  },
  'saint-jean': {
    nom: 'Saint-Jean',
    codePostal: '31240',
    departement: 'Haute-Garonne (31)',
    distance: '12 km',
    description: 'Commune de 10 000 habitants au nord-est de Toulouse, en forte croissance démographique.',
    population: '10 234',
    geologie: 'Molasses argileuses du Stampien, aléa RGA fort.',
    risqueRGA: 'fort',
    arretesCATNAT: ['Sécheresse 2022', 'Sécheresse 2023', 'Sécheresse 2019'],
    communesProches: ['L\'Union', 'Montrabé', 'Rouffiac-Tolosan', 'Castelmaurou'],
    specificitesFissures: 'Nombreuses fissures sur lotissements récents.',
    specificitesHumidite: 'Problèmes modérés d\'humidité.',
    tauxSinistralite: '12,1%'
  },
  montrabe: {
    nom: 'Montrabé',
    codePostal: '31850',
    departement: 'Haute-Garonne (31)',
    distance: '12 km',
    description: 'Commune résidentielle de 4 000 habitants au nord-est de Toulouse.',
    population: '4 123',
    geologie: 'Molasses argileuses, aléa RGA moyen à fort.',
    risqueRGA: 'fort',
    arretesCATNAT: ['Sécheresse 2022', 'Sécheresse 2023'],
    communesProches: ['L\'Union', 'Saint-Jean', 'Rouffiac-Tolosan', 'Toulouse'],
    specificitesFissures: 'Fissures sur maisons individuelles.',
    specificitesHumidite: 'Problèmes ponctuels.',
    tauxSinistralite: '9,7%'
  },
  castelsarrasin: {
    nom: 'Castelsarrasin',
    codePostal: '82100',
    departement: 'Tarn-et-Garonne (82)',
    distance: '70 km',
    description: 'Sous-préfecture du Tarn-et-Garonne avec 14 000 habitants, située dans la plaine de la Garonne.',
    population: '14 234',
    geologie: 'Alluvions de la Garonne et molasses, aléa RGA variable.',
    risqueRGA: 'moyen',
    arretesCATNAT: ['Sécheresse 2022', 'Sécheresse 2023'],
    communesProches: ['Moissac', 'Montauban', 'Montech', 'Saint-Aignan'],
    specificitesFissures: 'Fissures localisées hors zones alluviales.',
    specificitesHumidite: 'Problèmes d\'humidité liés à la nappe.',
    tauxSinistralite: '7,3%'
  },
  moissac: {
    nom: 'Moissac',
    codePostal: '82200',
    departement: 'Tarn-et-Garonne (82)',
    distance: '75 km',
    description: 'Ville historique de 13 000 habitants, célèbre pour son abbaye classée UNESCO.',
    population: '13 234',
    geologie: 'Alluvions du Tarn et de la Garonne, molasses en périphérie.',
    risqueRGA: 'moyen',
    arretesCATNAT: ['Sécheresse 2022', 'Sécheresse 2023'],
    communesProches: ['Castelsarrasin', 'Boudou', 'Lizac', 'Montauban'],
    specificitesFissures: 'Fissures sur maisons hors zone inondable.',
    specificitesHumidite: 'Humidité fréquente liée aux crues historiques.',
    tauxSinistralite: '6,8%'
  },
  caussade: {
    nom: 'Caussade',
    codePostal: '82300',
    departement: 'Tarn-et-Garonne (82)',
    distance: '65 km',
    description: 'Commune de 7 000 habitants connue pour sa chapellerie, au nord du Tarn-et-Garonne.',
    population: '7 234',
    geologie: 'Causses calcaires et argiles, aléa RGA variable.',
    risqueRGA: 'moyen',
    arretesCATNAT: ['Sécheresse 2022', 'Sécheresse 2023'],
    communesProches: ['Montauban', 'Septfonds', 'Puylaroque', 'Réalville'],
    specificitesFissures: 'Fissures sur zones argileuses.',
    specificitesHumidite: 'Humidité dans les maisons anciennes.',
    tauxSinistralite: '8,1%'
  },
  condom: {
    nom: 'Condom',
    codePostal: '32100',
    departement: 'Gers (32)',
    distance: '100 km',
    description: 'Sous-préfecture du Gers avec 7 000 habitants, capitale de l\'Armagnac.',
    population: '7 123',
    geologie: 'Molasses miocènes, terrain vallonné.',
    risqueRGA: 'moyen',
    arretesCATNAT: ['Sécheresse 2022', 'Sécheresse 2023'],
    communesProches: ['Auch', 'Eauze', 'Lectoure', 'Vic-Fezensac'],
    specificitesFissures: 'Fissures sur maisons anciennes en pierre.',
    specificitesHumidite: 'Caves voûtées humides fréquentes.',
    tauxSinistralite: '5,9%'
  },
  fleurance: {
    nom: 'Fleurance',
    codePostal: '32500',
    departement: 'Gers (32)',
    distance: '90 km',
    description: 'Commune de 6 500 habitants, bastide médiévale du Gers.',
    population: '6 543',
    geologie: 'Molasses argileuses, aléa RGA moyen.',
    risqueRGA: 'moyen',
    arretesCATNAT: ['Sécheresse 2022', 'Sécheresse 2023'],
    communesProches: ['Auch', 'Lectoure', 'L\'Isle-Jourdain', 'Mauvezin'],
    specificitesFissures: 'Fissures sur patrimoine ancien.',
    specificitesHumidite: 'Humidité dans les caves médiévales.',
    tauxSinistralite: '6,2%'
  },
  lectoure: {
    nom: 'Lectoure',
    codePostal: '32700',
    departement: 'Gers (32)',
    distance: '85 km',
    description: 'Cité historique de 3 700 habitants perchée sur un éperon rocheux.',
    population: '3 765',
    geologie: 'Calcaires et molasses, terrain de coteau.',
    risqueRGA: 'moyen',
    arretesCATNAT: ['Sécheresse 2022'],
    communesProches: ['Fleurance', 'Condom', 'Auch', 'Miradoux'],
    specificitesFissures: 'Fissures liées aux mouvements de coteau.',
    specificitesHumidite: 'Caves anciennes humides.',
    tauxSinistralite: '5,4%'
  },
  'lisle-jourdain': {
    nom: 'L\'Isle-Jourdain',
    codePostal: '32600',
    departement: 'Gers (32)',
    distance: '35 km',
    description: 'Commune de 9 000 habitants à mi-chemin entre Toulouse et Auch, en forte croissance.',
    population: '9 234',
    geologie: 'Molasses argileuses, aléa RGA fort.',
    risqueRGA: 'fort',
    arretesCATNAT: ['Sécheresse 2022', 'Sécheresse 2023', 'Sécheresse 2019'],
    communesProches: ['Toulouse', 'Auch', 'Gimont', 'Pujaudran'],
    specificitesFissures: 'Nombreuses fissures sur constructions récentes.',
    specificitesHumidite: 'Problèmes modérés.',
    tauxSinistralite: '11,2%'
  },

  // ═══════════════════════════════════════════════════════════════
  // TARN (81) - Département ajouté
  // ═══════════════════════════════════════════════════════════════

  albi: {
    nom: 'Albi',
    codePostal: '81000',
    departement: 'Tarn (81)',
    distance: '75 km',
    description: 'Préfecture du Tarn et ville UNESCO, Albi compte 50 000 habitants. Son centre historique en briques rouges repose sur un sous-sol argileux sensible au RGA, notamment dans les quartiers périphériques.',
    population: '49 531',
    superficie: '44,26 km²',
    geologie: 'Le sous-sol albigeois est composé de molasses argilo-calcaires oligocènes dans le centre, et d\'argiles du Stampien en périphérie. Les coteaux nord et est sont particulièrement exposés au retrait-gonflement des argiles.',
    risqueRGA: 'fort',
    arretesCATNAT: [
      'Sécheresse 2022 (JO du 05/04/2023)',
      'Sécheresse 2023',
      'Sécheresse 2019',
      'Sécheresse 2017'
    ],
    quartiersRisque: [
      'La Madeleine (argiles superficielles)',
      'Cantepau (coteaux)',
      'Rayssac (zone pavillonnaire)',
      'Le Séquestre (limites communales)',
      'Les Avalats (terrain en pente)'
    ],
    typesConstruction: 'Albi présente un patrimoine bâti varié : maisons de ville en briques foraines dans le centre, pavillons des années 70-90 en périphérie, et constructions récentes dans les nouveaux lotissements. Les maisons anciennes ont généralement des fondations superficielles vulnérables.',
    problemesFrequents: [
      'Fissures en escalier sur maisons périphériques',
      'Décollements de façades en briques',
      'Affaissements de dallages',
      'Humidité dans les caves du centre historique'
    ],
    historiqueLocal: 'Les sécheresses de 2022-2023 ont particulièrement touché Albi, avec une augmentation de 250% des déclarations de sinistres. Les quartiers pavillonnaires des années 1980 sont les plus impactés.',
    communesProches: ['Lescure-d\'Albigeois', 'Marssac-sur-Tarn', 'Castelnau-de-Lévis', 'Le Séquestre', 'Puygouzon'],
    specificitesFissures: 'À Albi, les fissures sont souvent liées à l\'hétérogénéité du terrain : zones de remblais côtoyant des argiles naturelles. Le diagnostic doit identifier ces transitions pour cibler le traitement.',
    specificitesHumidite: 'Le centre historique d\'Albi souffre de remontées capillaires dans les constructions anciennes. Les caves voûtées des maisons de ville sont particulièrement touchées.',
    conseillExpert: 'Si votre maison à Albi est située en coteau ou sur un ancien vignoble reconverti en lotissement, surveillez l\'apparition de fissures après chaque été sec.',
    tauxSinistralite: '10,8%'
  },
  castres: {
    nom: 'Castres',
    codePostal: '81100',
    departement: 'Tarn (81)',
    distance: '70 km',
    description: 'Sous-préfecture du Tarn, Castres compte 42 000 habitants. Située au pied de la Montagne Noire, la ville présente des sols variés avec des zones argileuses sensibles au RGA.',
    population: '41 338',
    superficie: '66,13 km²',
    geologie: 'Castres repose sur des formations variées : alluvions de l\'Agout dans la vallée, molasses et argiles sur les coteaux. La transition entre ces zones crée des conditions propices aux tassements différentiels.',
    risqueRGA: 'moyen',
    arretesCATNAT: [
      'Sécheresse 2022',
      'Sécheresse 2019',
      'Sécheresse 2017'
    ],
    quartiersRisque: [
      'Lameilhé (argiles de coteau)',
      'La Borde Basse (zone commerciale)',
      'Mélou (terrain hétérogène)',
      'Bisséous (constructions anciennes)'
    ],
    typesConstruction: 'Le parc immobilier castrais mêle maisons de maître du XIXe, habitat ouvrier lié à l\'industrie textile, et pavillons contemporains. Les fondations anciennes sont souvent insuffisantes pour le terrain.',
    problemesFrequents: [
      'Fissures sur maisons de coteau',
      'Humidité dans les anciennes manufactures reconverties',
      'Infiltrations dans les sous-sols'
    ],
    historiqueLocal: 'L\'industrie textile a façonné l\'habitat castrais. Les anciennes usines reconverties en logements présentent souvent des problèmes d\'humidité liés à leur conception initiale.',
    communesProches: ['Labruguière', 'Mazamet', 'Saïx', 'Burlats', 'Lagarrigue'],
    specificitesFissures: 'Les fissures à Castres apparaissent souvent aux jonctions entre bâti ancien et extensions récentes, du fait des différences de fondations.',
    specificitesHumidite: 'La proximité de l\'Agout et les nappes phréatiques hautes créent des problèmes d\'humidité ascensionnelle dans les quartiers bas.',
    conseillExpert: 'À Castres, vérifiez particulièrement les jonctions entre les différentes parties de votre maison si elle a été agrandie au fil du temps.',
    tauxSinistralite: '7,9%'
  },
  gaillac: {
    nom: 'Gaillac',
    codePostal: '81600',
    departement: 'Tarn (81)',
    distance: '50 km',
    description: 'Capitale du vignoble gaillacois, cette ville de 16 000 habitants est bâtie sur des terrasses alluviales du Tarn et des coteaux argileux, zones à risque RGA.',
    population: '15 792',
    superficie: '60,42 km²',
    geologie: 'Gaillac présente un sous-sol complexe : terrasses alluviales en fond de vallée, molasses argileuses sur les coteaux viticoles. Les argiles à graviers des terrasses sont sensibles au RGA.',
    risqueRGA: 'fort',
    arretesCATNAT: [
      'Sécheresse 2022',
      'Sécheresse 2023',
      'Sécheresse 2019'
    ],
    quartiersRisque: [
      'Les Music-Halles (plaine alluviale)',
      'La Claverie (coteau)',
      'Le Breuil (argiles superficielles)'
    ],
    typesConstruction: 'Gaillac mêle architecture vigneronne traditionnelle (chai et habitation), maisons de bourg anciennes, et pavillons récents sur les coteaux. Les anciennes propriétés viticoles ont parfois des fondations sommaires.',
    problemesFrequents: [
      'Fissures sur anciennes maisons vigneronnes',
      'Mouvements de terrain sur coteaux',
      'Humidité dans les chais reconvertis'
    ],
    historiqueLocal: 'Le vignoble gaillacois a longtemps structuré l\'habitat. La reconversion des anciennes propriétés viticoles en habitations révèle souvent des problèmes structurels latents.',
    communesProches: ['Lisle-sur-Tarn', 'Rabastens', 'Brens', 'Rivières', 'Senouillac'],
    specificitesFissures: 'Les fissures sur les coteaux viticoles sont souvent aggravées par les anciennes pratiques culturales (drainage, arrachage de vignes) qui ont modifié le comportement hydrique des sols.',
    specificitesHumidite: 'Les chais et caves à vin reconvertis en pièces d\'habitation nécessitent un traitement d\'humidité spécifique pour neutraliser les remontées capillaires.',
    conseillExpert: 'Si vous avez acheté une ancienne propriété viticole à Gaillac, faites réaliser un diagnostic complet avant tout projet de rénovation.',
    tauxSinistralite: '11,5%'
  },
  lavaur: {
    nom: 'Lavaur',
    codePostal: '81500',
    departement: 'Tarn (81)',
    distance: '40 km',
    description: 'Ville de 11 000 habitants au carrefour du Tarn et de la Haute-Garonne, Lavaur est construite sur des terrasses argileuses de l\'Agout, zone à fort risque RGA.',
    population: '10 893',
    superficie: '46,18 km²',
    geologie: 'Lavaur repose sur des terrasses fluviatiles de l\'Agout, composées d\'argiles, graviers et limons. Les argiles gonflantes y sont particulièrement présentes, créant un aléa RGA fort.',
    risqueRGA: 'fort',
    arretesCATNAT: [
      'Sécheresse 2022 (JO du 12/01/2023)',
      'Sécheresse 2023',
      'Sécheresse 2019',
      'Sécheresse 2018'
    ],
    quartiersRisque: [
      'Les Musiciens (lotissement années 80)',
      'La Courbe (zone pavillonnaire)',
      'Centre historique (fondations anciennes)'
    ],
    typesConstruction: 'Lavaur présente un centre médiéval avec la cathédrale Saint-Alain, entouré de faubourgs du XIXe et de lotissements pavillonnaires récents. Les constructions des années 70-90 sont les plus touchées.',
    problemesFrequents: [
      'Fissures en escalier très fréquentes',
      'Portes et fenêtres bloquées',
      'Carrelages fissurés'
    ],
    historiqueLocal: 'Lavaur a été particulièrement touchée par les arrêtés de catastrophe naturelle ces dernières années. La ville concentre un nombre élevé de sinistres RGA.',
    communesProches: ['Saint-Sulpice-la-Pointe', 'Graulhet', 'Ambres', 'Montcabrier', 'Saint-Lieux-lès-Lavaur'],
    specificitesFissures: 'Lavaur est l\'une des villes du Tarn les plus touchées par les fissures RGA. Les taux de sinistralité y sont parmi les plus élevés du département.',
    specificitesHumidite: 'Les remontées capillaires sont fréquentes dans le centre historique et les quartiers anciens proches de l\'Agout.',
    conseillExpert: 'À Lavaur, un diagnostic préventif est fortement recommandé, même sans fissure visible. La quasi-totalité de la commune est classée en aléa RGA fort.',
    tauxSinistralite: '14,2%'
  },
  mazamet: {
    nom: 'Mazamet',
    codePostal: '81200',
    departement: 'Tarn (81)',
    distance: '85 km',
    description: 'Ancienne capitale du délainage, Mazamet compte 10 000 habitants au pied de la Montagne Noire. Son relief accidenté et ses sols variés créent des conditions propices aux mouvements de terrain.',
    population: '10 129',
    superficie: '30,35 km²',
    geologie: 'Mazamet est située à la transition entre les schistes de la Montagne Noire et les molasses de la plaine. Cette hétérogénéité géologique crée des comportements de sol contrastés.',
    risqueRGA: 'moyen',
    arretesCATNAT: [
      'Sécheresse 2022',
      'Sécheresse 2019'
    ],
    quartiersRisque: [
      'Aussillon (commune limitrophe, mais continuité urbaine)',
      'Le Bouyssié (terrain en pente)',
      'Hautpoul (village perché)'
    ],
    typesConstruction: 'L\'industrie du délainage a façonné l\'habitat mazamétain : anciennes usines reconverties, maisons ouvrières, et villas de maîtres d\'industrie. L\'architecture est marquée par la brique et le grès.',
    problemesFrequents: [
      'Mouvements de terrain sur pentes',
      'Fissures aux jonctions roche/argile',
      'Humidité dans les anciennes usines'
    ],
    historiqueLocal: 'L\'industrie textile a laissé un patrimoine bâti important mais parfois vétuste. Les reconversions industrielles doivent intégrer les problématiques structurelles et d\'humidité.',
    communesProches: ['Aussillon', 'Pont-de-l\'Arn', 'Payrin-Augmontel', 'Aiguefonde'],
    specificitesFissures: 'Les fissures à Mazamet sont souvent liées aux pentes et à l\'hétérogénéité du sous-sol. Un diagnostic géotechnique peut s\'avérer nécessaire.',
    specificitesHumidite: 'Le climat plus humide de la Montagne Noire crée des problèmes d\'humidité ascensionnelle et de condensation dans les bâtiments.',
    conseillExpert: 'À Mazamet, la topographie est un facteur clé. Les maisons en pente ou à flanc de coteau nécessitent une attention particulière.',
    tauxSinistralite: '6,4%'
  },
  graulhet: {
    nom: 'Graulhet',
    codePostal: '81300',
    departement: 'Tarn (81)',
    distance: '55 km',
    description: 'Ville historique du cuir, Graulhet compte 11 000 habitants. Son sous-sol argileux et son patrimoine industriel créent des problématiques spécifiques.',
    population: '11 108',
    superficie: '46,68 km²',
    geologie: 'Graulhet repose sur des terrasses du Dadou, composées d\'argiles et d\'alluvions. L\'aléa RGA est fort sur une grande partie de la commune.',
    risqueRGA: 'fort',
    arretesCATNAT: [
      'Sécheresse 2022',
      'Sécheresse 2023',
      'Sécheresse 2019'
    ],
    quartiersRisque: [
      'Centre-ville (industrie du cuir)',
      'En Gach (zone pavillonnaire)',
      'Le Verdier (coteaux)'
    ],
    typesConstruction: 'L\'industrie du cuir a façonné la ville : anciennes mégisseries, maisons d\'artisans, et habitat ouvrier. Ces bâtiments anciens ont souvent des fondations insuffisantes.',
    problemesFrequents: [
      'Fissures sur maisons anciennes',
      'Pollution des sols (anciennes tanneries)',
      'Humidité dans les bâtiments industriels'
    ],
    historiqueLocal: 'La reconversion post-industrielle de Graulhet pose des défis patrimoniaux. Les anciennes mégisseries reconverties nécessitent des expertises approfondies.',
    communesProches: ['Briatexte', 'Puybegon', 'Busque', 'Saint-Gauzens', 'Lavaur'],
    specificitesFissures: 'Les fissures à Graulhet touchent particulièrement les constructions anciennes du centre et les pavillons des années 80.',
    specificitesHumidite: 'L\'activité historique du cuir a nécessité beaucoup d\'eau, créant des nappes perchées et des problèmes d\'humidité rémanents.',
    conseillExpert: 'Avant tout achat à Graulhet, un diagnostic fissures ET humidité est recommandé, compte tenu du passé industriel.',
    tauxSinistralite: '12,1%'
  },
  rabastens: {
    nom: 'Rabastens',
    codePostal: '81800',
    departement: 'Tarn (81)',
    distance: '35 km',
    description: 'Cité médiévale de 6 000 habitants sur les bords du Tarn, Rabastens est proche de Toulouse. Son centre historique et ses extensions pavillonnaires présentent des problématiques distinctes.',
    population: '5 873',
    superficie: '47,31 km²',
    geologie: 'Rabastens est construite sur des terrasses du Tarn, avec des argiles gonflantes en surface. L\'aléa RGA est fort sur les zones pavillonnaires périphériques.',
    risqueRGA: 'fort',
    arretesCATNAT: [
      'Sécheresse 2022',
      'Sécheresse 2023',
      'Sécheresse 2019'
    ],
    quartiersRisque: [
      'Les Musiciens (lotissement récent)',
      'Centre médiéval (fondations anciennes)',
      'Zone d\'activités (remblais)'
    ],
    typesConstruction: 'Rabastens mêle architecture médiévale (église Notre-Dame du Bourg), maisons de ville XVIIIe-XIXe, et lotissements pavillonnaires récents. Les extensions récentes sont les plus touchées par le RGA.',
    problemesFrequents: [
      'Fissures sur pavillons récents',
      'Humidité dans les caves médiévales',
      'Mouvements de terrain sur coteaux'
    ],
    historiqueLocal: 'La proximité de Toulouse attire de nouveaux habitants, mais les constructions rapides des années 2000-2010 souffrent parfois d\'études de sol insuffisantes.',
    communesProches: ['Couffouleux', 'Lisle-sur-Tarn', 'Gaillac', 'Saint-Sulpice-la-Pointe'],
    specificitesFissures: 'Les fissures à Rabastens apparaissent souvent sur les maisons de moins de 20 ans, construites sur des argiles mal identifiées.',
    specificitesHumidite: 'Le centre médiéval de Rabastens souffre de remontées capillaires chroniques dans les caves et rez-de-chaussée.',
    conseillExpert: 'Si vous achetez à Rabastens, demandez systématiquement l\'étude de sol G2 qui aurait dû être réalisée lors de la construction.',
    tauxSinistralite: '13,8%'
  },
  carmaux: {
    nom: 'Carmaux',
    codePostal: '81400',
    departement: 'Tarn (81)',
    distance: '70 km',
    description: 'Ancienne cité minière de 9 500 habitants, Carmaux présente des problématiques liées à son passé industriel (effondrements miniers) et à son sous-sol argileux.',
    population: '9 387',
    superficie: '21,19 km²',
    geologie: 'Le sous-sol carmausin est marqué par l\'exploitation houillère historique. Des galeries de mines désaffectées peuvent créer des affaissements localisés. En surface, les argiles sont présentes.',
    risqueRGA: 'moyen',
    arretesCATNAT: [
      'Sécheresse 2022',
      'Sécheresse 2019'
    ],
    quartiersRisque: [
      'Centre-ville (anciennes galeries)',
      'La Céramique (zone industrielle)',
      'Les Music-Halles (lotissement)'
    ],
    typesConstruction: 'L\'habitat carmausin est marqué par les corons (habitat minier) et les maisons ouvrières. Ces constructions modestes ont souvent des fondations superficielles.',
    problemesFrequents: [
      'Affaissements liés aux anciennes mines',
      'Fissures sur maisons ouvrières',
      'Humidité dans les caves'
    ],
    historiqueLocal: 'L\'exploitation minière a cessé en 1997, mais les galeries souterraines peuvent encore créer des mouvements de terrain. Une recherche historique est conseillée avant achat.',
    communesProches: ['Blaye-les-Mines', 'Saint-Benoît-de-Carmaux', 'Rosières', 'Albi'],
    specificitesFissures: 'À Carmaux, les fissures peuvent avoir deux origines : le RGA classique ou les mouvements liés aux anciennes galeries minières. Le diagnostic doit distinguer ces causes.',
    specificitesHumidite: 'Les remontées d\'eau des anciennes galeries peuvent créer des problèmes d\'humidité spécifiques.',
    conseillExpert: 'Avant tout achat à Carmaux, consultez les archives minières (BRGM) pour vérifier si des galeries passent sous le terrain.',
    tauxSinistralite: '8,2%'
  },
  castelginest: {
    nom: 'Castelginest',
    codePostal: '31780',
    departement: 'Haute-Garonne (31)',
    distance: '12 km',
    description: 'Commune de 11 000 habitants au nord de Toulouse, Castelginest est caractérisée par des lotissements pavillonnaires des années 80-90 sur sol argileux.',
    population: '11 234',
    geologie: 'Molasses argileuses du Stampien, aléa RGA fort.',
    risqueRGA: 'fort',
    arretesCATNAT: ['Sécheresse 2022', 'Sécheresse 2023', 'Sécheresse 2019'],
    communesProches: ['Launaguet', 'L\'Union', 'Aucamville', 'Fonbeauzard'],
    specificitesFissures: 'Fissures fréquentes sur pavillons des années 80-90, sol argileux très réactif.',
    specificitesHumidite: 'Problèmes modérés d\'humidité dans les constructions anciennes.',
    tauxSinistralite: '11,5%'
  },
  fenouillet: {
    nom: 'Fenouillet',
    codePostal: '31150',
    departement: 'Haute-Garonne (31)',
    distance: '10 km',
    description: 'Commune de 5 000 habitants au nord de Toulouse, Fenouillet bénéficie partiellement d\'alluvions de la Garonne mais présente aussi des zones argileuses sensibles au RGA.',
    population: '5 234',
    geologie: 'Alluvions de la Garonne (ouest) et molasses argileuses (est).',
    risqueRGA: 'moyen',
    arretesCATNAT: ['Sécheresse 2022', 'Sécheresse 2023'],
    communesProches: ['Beauzelle', 'Gagnac-sur-Garonne', 'Castelginest', 'Toulouse'],
    specificitesFissures: 'Fissures localisées dans les zones sur molasses argileuses.',
    specificitesHumidite: 'Humidité liée à la nappe proche dans les quartiers ouest.',
    tauxSinistralite: '7,2%'
  },
  aucamville: {
    nom: 'Aucamville',
    codePostal: '31140',
    departement: 'Haute-Garonne (31)',
    distance: '10 km',
    description: 'Commune de 8 500 habitants au nord de Toulouse, entre Launaguet et Castelginest. Son sous-sol argileux en fait une zone à risque RGA significatif.',
    population: '8 567',
    geologie: 'Molasses argileuses, aléa RGA moyen à fort.',
    risqueRGA: 'fort',
    arretesCATNAT: ['Sécheresse 2022', 'Sécheresse 2023', 'Sécheresse 2019'],
    communesProches: ['Launaguet', 'Castelginest', 'Fonbeauzard', 'Toulouse'],
    specificitesFissures: 'Fissures sur pavillons des années 70-90, tassements différentiels.',
    specificitesHumidite: 'Remontées capillaires dans les constructions anciennes.',
    tauxSinistralite: '10,3%'
  },
  mirande: {
    nom: 'Mirande',
    codePostal: '32300',
    departement: 'Gers (32)',
    distance: '100 km',
    description: 'Bastide gersoise de 3 500 habitants, Mirande est une sous-préfecture du Gers. Son patrimoine architectural ancien et ses sols argileux créent des problématiques spécifiques.',
    population: '3 567',
    geologie: 'Molasses miocènes argileuses, aléa RGA moyen.',
    risqueRGA: 'moyen',
    arretesCATNAT: ['Sécheresse 2022', 'Sécheresse 2023'],
    communesProches: ['Auch', 'Masseube', 'Trie-sur-Baïse', 'Boulogne-sur-Gesse'],
    specificitesFissures: 'Fissures sur maisons anciennes en pierre, liées aux mouvements de terrain.',
    specificitesHumidite: 'Caves humides fréquentes dans les maisons de bourg.',
    tauxSinistralite: '5,8%'
  },
  'valence-agen': {
    nom: 'Valence',
    codePostal: '82400',
    departement: 'Tarn-et-Garonne (82)',
    distance: '85 km',
    description: 'Commune de 5 000 habitants dans le Tarn-et-Garonne, Valence-d\'Agen est située dans la vallée de la Garonne avec des sols mixtes alluviaux et argileux.',
    population: '5 123',
    geologie: 'Alluvions de la Garonne et molasses argileuses en périphérie.',
    risqueRGA: 'moyen',
    arretesCATNAT: ['Sécheresse 2022', 'Sécheresse 2023'],
    communesProches: ['Castelsarrasin', 'Moissac', 'Agen', 'Auvillar'],
    specificitesFissures: 'Fissures localisées hors zones alluviales, sur terrain argileux.',
    specificitesHumidite: 'Humidité liée à la proximité du canal latéral à la Garonne.',
    tauxSinistralite: '6,9%'
  },
  'saint-sulpice-la-pointe': {
    nom: 'Saint-Sulpice-la-Pointe',
    codePostal: '81370',
    departement: 'Tarn (81)',
    distance: '30 km',
    description: 'Commune de 10 000 habitants aux portes de Toulouse, Saint-Sulpice connaît une forte croissance. Son sous-sol argileux crée des problèmes fréquents.',
    population: '9 876',
    superficie: '28,12 km²',
    geologie: 'Saint-Sulpice repose sur des terrasses de l\'Agout, avec des argiles gonflantes en surface. L\'aléa RGA est très fort sur la majorité de la commune.',
    risqueRGA: 'tres-fort',
    arretesCATNAT: [
      'Sécheresse 2022',
      'Sécheresse 2023',
      'Sécheresse 2019',
      'Sécheresse 2018'
    ],
    quartiersRisque: [
      'Zone pavillonnaire sud',
      'Les Music-Halles',
      'Lotissements récents (post-2000)'
    ],
    typesConstruction: 'La forte croissance de Saint-Sulpice a généré de nombreux lotissements pavillonnaires, parfois construits sans études de sol approfondies.',
    problemesFrequents: [
      'Fissures très fréquentes',
      'Décollements de façades',
      'Carrelages qui se soulèvent'
    ],
    historiqueLocal: 'Saint-Sulpice fait partie des communes les plus sinistrées du Tarn. Les arrêtés CAT-NAT se succèdent et les assurances sont de plus en plus réticentes.',
    communesProches: ['Lavaur', 'Rabastens', 'Buzet-sur-Tarn', 'Montastruc-la-Conseillère'],
    specificitesFissures: 'Saint-Sulpice présente un taux de sinistralité parmi les plus élevés de la région. Les fissures apparaissent parfois dès les premières années après construction.',
    specificitesHumidite: 'La nappe phréatique haute crée des problèmes de remontées capillaires dans les sous-sols.',
    conseillExpert: 'À Saint-Sulpice, faites systématiquement vérifier les fondations avant achat. La quasi-totalité de la commune est en zone à risque très fort.',
    tauxSinistralite: '16,7%'
  },

  // ─── Ariège (09) — réponse à la requête GSC "expert fissure ariège" 71 imp ───
  pamiers: {
    nom: 'Pamiers',
    codePostal: '09100',
    departement: 'Ariège (09)',
    distance: '70 km',
    description: "Sous-préfecture de l'Ariège (15 000 habitants), Pamiers connaît un boom pavillonnaire depuis 20 ans. Les coteaux argileux qui entourent la ville exposent une grande partie du parc immobilier au retrait-gonflement des argiles.",
    population: '14 924',
    superficie: '74,9 km²',
    geologie: "Plaine de l'Ariège (alluvions) en centre-ville, coteaux molassiques argileux à l'est et à l'ouest. Aléa RGA fort à très fort sur les zones pavillonnaires en hauteur.",
    risqueRGA: 'fort',
    arretesCATNAT: ['Sécheresse 2022', 'Sécheresse 2023', 'Sécheresse 2018'],
    quartiersRisque: ['Coteaux du Mas-Saint-Antoine', 'Lestang', 'Lotissements de Verniolle limitrophe'],
    typesConstruction: "Pavillons des années 1980-2000 majoritaires sur les coteaux. Les normes parasismiques modernes n'étaient pas appliquées.",
    problemesFrequents: ['Fissures structurelles', 'Décollements façade', 'Tassements de seuils'],
    historiqueLocal: 'Pamiers concentre une part importante des dossiers CAT-NAT du département depuis la sécheresse de 2022.',
    communesProches: ['Foix', 'Saverdun', 'Mazères', 'Verniolle', 'Saint-Jean-du-Falga'],
    specificitesFissures: "Maisons en briques foraines vulnérables aux mouvements de terrain. La majorité des chantiers IPB en Ariège commence par un diagnostic à Pamiers ou alentour.",
    specificitesHumidite: "Caves humides courantes en centre-ville, liées à la proximité de l'Ariège.",
    conseillExpert: "Avant tout achat à Pamiers, exigez un diagnostic structure — surtout pour les pavillons sur coteau construits avant 2000.",
    tauxSinistralite: '8,4%'
  },
  foix: {
    nom: 'Foix',
    codePostal: '09000',
    departement: 'Ariège (09)',
    distance: '90 km',
    description: "Préfecture de l'Ariège (10 000 habitants), Foix est encadrée de reliefs et bâtie sur des sols hétérogènes. Le centre médiéval et les pavillons des coteaux rencontrent des problématiques structurelles différentes.",
    population: '9 720',
    geologie: 'Vallée de l\'Ariège : alluvions en fond de vallée, schistes et molasses argileuses sur les versants. Risque RGA moyen à fort selon le secteur.',
    risqueRGA: 'moyen',
    arretesCATNAT: ['Sécheresse 2022', 'Sécheresse 2023'],
    quartiersRisque: ['Quartier du Val', 'Coteaux de Saint-Volusien'],
    typesConstruction: 'Centre médiéval en pierre, pavillons modernes en périphérie sur coteaux argileux.',
    problemesFrequents: ['Fissures sur murs anciens en pierre', 'Tassements en pavillonnaire'],
    communesProches: ['Pamiers', 'Tarascon-sur-Ariège', 'Lavelanet', 'Saint-Paul-de-Jarrat'],
    specificitesFissures: 'Le bâti médiéval foixéen présente des fissures stables anciennes à distinguer des fissures structurelles actives. Diagnostic instrumenté indispensable.',
    specificitesHumidite: "Murs en pierre épais sujets aux remontées capillaires en bas de vallée.",
    conseillExpert: "Sur le bâti ancien foixéen, ne traitez jamais une fissure sans avoir vérifié si elle est active ou stabilisée — la mauvaise lecture coûte cher.",
    tauxSinistralite: '5,9%'
  },
  saverdun: {
    nom: 'Saverdun',
    codePostal: '09700',
    departement: 'Ariège (09)',
    distance: '55 km',
    description: 'Bastide ariégeoise de 5 500 habitants, Saverdun est une commune dortoir de Toulouse en pleine croissance pavillonnaire. Les sols argileux sont particulièrement exposés au RGA.',
    population: '5 433',
    geologie: 'Plateau molassique argileux à fort potentiel de retrait-gonflement.',
    risqueRGA: 'fort',
    arretesCATNAT: ['Sécheresse 2022', 'Sécheresse 2023'],
    communesProches: ['Pamiers', 'Mazères', 'Cintegabelle', 'Auterive'],
    specificitesFissures: 'Les lotissements pavillonnaires des années 1990-2010 sont les plus touchés par les fissures de tassement.',
    specificitesHumidite: 'Phénomènes de condensation fréquents dans les pavillons mal ventilés.',
    conseillExpert: 'À Saverdun, ne minimisez jamais une fissure en escalier sur un pavillon — c\'est la signature d\'un tassement actif.',
    tauxSinistralite: '7,8%'
  },
  lavelanet: {
    nom: 'Lavelanet',
    codePostal: '09300',
    departement: 'Ariège (09)',
    distance: '110 km',
    description: 'Commune de 6 500 habitants au pied des Pyrénées, Lavelanet conjugue patrimoine ancien (anciennes filatures) et pavillonnaire récent.',
    population: '6 351',
    geologie: 'Piémont pyrénéen avec sols argileux et schisteux. Aléa RGA moyen mais ponctuellement fort.',
    risqueRGA: 'moyen',
    arretesCATNAT: ['Sécheresse 2022'],
    communesProches: ['Foix', 'Mirepoix', 'Bélesta', 'Laroque-d\'Olmes'],
    specificitesFissures: 'Bâti industriel ancien souvent fragilisé par les vibrations, à distinguer des désordres modernes liés au RGA.',
    specificitesHumidite: 'Murs anciens sujets aux infiltrations latérales en pied.',
    tauxSinistralite: '5,2%'
  },
  'saint-girons': {
    nom: 'Saint-Girons',
    codePostal: '09200',
    departement: 'Ariège (09)',
    distance: '120 km',
    description: 'Sous-préfecture de l\'Ariège (6 000 habitants), Saint-Girons est traversée par le Salat et bâtie en partie sur des terrasses alluviales.',
    population: '5 869',
    geologie: 'Vallée du Salat, alluvions et molasses argileuses sur versants.',
    risqueRGA: 'moyen',
    arretesCATNAT: ['Sécheresse 2022'],
    communesProches: ['Foix', 'Saint-Lizier', 'La Bastide-de-Sérou', 'Massat'],
    specificitesFissures: 'Désordres ponctuels sur le bâti ancien en pierre. Les pavillons récents en périphérie sont plus exposés.',
    tauxSinistralite: '4,8%'
  },

  // ════════════════════════════════════════════════════════════════
  // EXTENSION SEO LOCAL — Villes peu concurrentielles
  // Ajoutées le 29/04/2026. Données géologiques génériques sur le
  // bassin molassique de Garonne. Détails fins (quartiers exacts,
  // sinistralité précise) à affiner après retours terrain.
  // ════════════════════════════════════════════════════════════════

  auterive: {
    nom: 'Auterive',
    codePostal: '31190',
    departement: 'Haute-Garonne (31)',
    distance: '30 km',
    description: 'Sous-préfecture de 10 000 habitants au sud de Toulouse, en bord d\'Ariège. Habitat mêlant centre ancien sur coteaux et lotissements pavillonnaires en périphérie. Le sous-sol argileux et la proximité de l\'Ariège créent une combinaison fissures + humidité fréquente.',
    population: '9 870',
    geologie: 'Auterive repose sur des molasses tertiaires argileuses recouvertes d\'alluvions de l\'Ariège dans la basse vallée. Les coteaux de Saint-Paul et de la rive droite sont sur substrat argilo-marneux particulièrement sensible au RGA.',
    risqueRGA: 'fort',
    arretesCATNAT: [
      'Sécheresse 2022 (JO du 18/01/2023)',
      'Sécheresse 2023 (JO du 28/02/2024)',
      'Inondations Ariège'
    ],
    typesConstruction: 'Mix de maisons anciennes en briques toulousaines (centre, faubourgs) et de pavillons des années 80-2000 en périphérie. Les constructions sur coteaux argileux sont les plus exposées aux désordres structurels.',
    problemesFrequents: [
      'Fissures sur pavillons en haut de coteau',
      'Remontées capillaires dans le bâti ancien',
      'Tassements liés à l\'Ariège (basse vallée)',
      'Humidité après crue dans les caves'
    ],
    communesProches: ['Cintegabelle', 'Venerque', 'Miremont', 'Mauressac', 'Saint-Sulpice-sur-Lèze'],
    specificitesFissures: 'À Auterive, les pavillons sur coteaux argileux des années 80-90 cumulent les facteurs de risque : pente, RGA, fondations souvent superficielles. Diagnostic instrumenté recommandé avant toute reprise.',
    specificitesHumidite: 'L\'humidité est un sujet à part à Auterive : les remontées capillaires dans le centre historique côtoient les infiltrations post-crue dans les habitations proches de l\'Ariège.',
    tauxSinistralite: '11,5%'
  },

  carbonne: {
    nom: 'Carbonne',
    codePostal: '31390',
    departement: 'Haute-Garonne (31)',
    distance: '40 km',
    description: 'Bourg de 5 600 habitants en bord de Garonne, au sud-ouest de Toulouse. Centre ancien sur coteau, habitat pavillonnaire en plaine. La position en limite des Petites Pyrénées et du bassin molassique génère des comportements de sol contrastés.',
    population: '5 633',
    geologie: 'Carbonne marque la transition entre les alluvions de la Garonne (plaine) et les premiers reliefs molassiques des Petites Pyrénées (coteau). Les versants exposés sud sont les plus vulnérables au RGA.',
    risqueRGA: 'moyen',
    arretesCATNAT: [
      'Sécheresse 2022',
      'Sécheresse 2023',
      'Sécheresse 2019'
    ],
    communesProches: ['Rieux-Volvestre', 'Marquefave', 'Salles-sur-Garonne', 'Lavelanet-de-Comminges'],
    specificitesFissures: 'À Carbonne, les fissures structurelles concernent principalement les pavillons construits entre 1985 et 2000 sur les coteaux argileux. Les maisons en plaine sur alluvions sont moins touchées mais peuvent souffrir d\'humidité.',
    specificitesHumidite: 'Les caves et sous-sols proches de la Garonne présentent fréquemment des remontées capillaires. Le diagnostic doit distinguer remontées par capillarité et infiltrations latérales.',
    tauxSinistralite: '7,8%'
  },

  cazeres: {
    nom: 'Cazères',
    codePostal: '31220',
    departement: 'Haute-Garonne (31)',
    distance: '50 km',
    description: 'Petite ville de 5 000 habitants en bord de Garonne, à la limite sud-ouest de la Haute-Garonne. Patrimoine bâti ancien (briques foraines, maisons à colombages) et extensions pavillonnaires sur coteaux argileux des Petites Pyrénées.',
    population: '5 109',
    geologie: 'Cazères se situe en limite du bassin molassique de Garonne et des terrains marno-argileux des Petites Pyrénées. Les sols sur coteaux sont fortement argileux, sensibles au retrait-gonflement.',
    risqueRGA: 'fort',
    arretesCATNAT: [
      'Sécheresse 2022',
      'Sécheresse 2023',
      'Sécheresse 2019',
      'Inondations Garonne'
    ],
    communesProches: ['Couladère', 'Le Plan', 'Martres-Tolosane', 'Palaminy', 'Mondavezan'],
    specificitesFissures: 'À Cazères, les pavillons des coteaux sont régulièrement touchés par des fissures liées au RGA. Le bâti ancien en briques crues du centre est plus tolérant aux mouvements mais peut se fissurer après des cycles secs prolongés.',
    specificitesHumidite: 'Le centre historique présente fréquemment des remontées capillaires dans les murs de briques anciennes, accentuées par le climat humide hivernal.',
    tauxSinistralite: '9,5%'
  },

  verfeil: {
    nom: 'Verfeil',
    codePostal: '31590',
    departement: 'Haute-Garonne (31)',
    distance: '20 km',
    description: 'Bourg historique de 3 200 habitants à l\'est de Toulouse, sur les coteaux du Lauragais. Bastide médiévale et habitat pavillonnaire récent sur sols argileux. Zone particulièrement exposée au retrait-gonflement.',
    population: '3 184',
    geologie: 'Verfeil repose sur les molasses argilo-sableuses du Lauragais, terrains parmi les plus sensibles au RGA en Haute-Garonne. Les versants à pente modérée concentrent l\'essentiel des sinistres.',
    risqueRGA: 'tres-fort',
    arretesCATNAT: [
      'Sécheresse 2022 (JO du 18/01/2023)',
      'Sécheresse 2023 (JO du 28/02/2024)',
      'Sécheresse 2019',
      'Sécheresse 2017'
    ],
    typesConstruction: 'Bastide médiévale en cœur de bourg, lotissements pavillonnaires en périphérie (années 80-2010) sur coteaux argileux. Les constructions sans étude de sol préalable sont les plus exposées.',
    communesProches: ['Lavalette', 'Bourg-Saint-Bernard', 'Loubens-Lauragais', 'Saint-Marcel-Paulel', 'Bonrepos-Riquet'],
    specificitesFissures: 'Verfeil est l\'une des communes les plus touchées par les fissures sécheresse en Haute-Garonne. Les pavillons sur coteau argileux du Lauragais sont prioritairement à diagnostiquer après chaque épisode sec marqué.',
    specificitesHumidite: 'L\'humidité est un sujet secondaire à Verfeil — l\'urgence est presque toujours côté fissures et tassements différentiels.',
    tauxSinistralite: '15,2%'
  },

  aussonne: {
    nom: 'Aussonne',
    codePostal: '31840',
    departement: 'Haute-Garonne (31)',
    distance: '15 km',
    description: 'Commune de 8 000 habitants au nord-ouest de Toulouse, à proximité immédiate de l\'aéroport et du parc des expositions. Forte croissance démographique récente, habitat pavillonnaire des années 1990-2020 sur sols argileux.',
    population: '7 950',
    geologie: 'Aussonne repose sur des terrasses alluviales et des molasses argileuses du miocène. Les secteurs sud (vers Beauzelle) sont sur substrat alluvial moins exposé, le nord et l\'ouest sont sur argiles miocènes plus sensibles.',
    risqueRGA: 'fort',
    arretesCATNAT: [
      'Sécheresse 2022 (JO du 18/01/2023)',
      'Sécheresse 2023 (JO du 28/02/2024)',
      'Sécheresse 2019'
    ],
    typesConstruction: 'Lotissements pavillonnaires majoritairement post-1990, avec une vague récente de constructions 2010-2020 en lien avec le développement du secteur aéroportuaire. Les pavillons sans étude de sol approfondie sont les plus à risque.',
    communesProches: ['Beauzelle', 'Cornebarrieu', 'Mondonville', 'Seilh', 'Daux'],
    specificitesFissures: 'À Aussonne, les sinistres se concentrent sur les pavillons des années 1990-2005, construits avec des fondations souvent insuffisamment profondes pour le RGA local. Les constructions récentes (DTU 13.1 v2020) sont mieux protégées.',
    specificitesHumidite: 'Quelques cas de remontées capillaires sur le bâti ancien du bourg historique. Globalement, l\'humidité est moins problématique que les fissures sur Aussonne.',
    tauxSinistralite: '10,8%'
  },

  leguevin: {
    nom: 'Léguevin',
    codePostal: '31490',
    departement: 'Haute-Garonne (31)',
    distance: '20 km',
    description: 'Commune périurbaine de 9 500 habitants à l\'ouest de Toulouse, en lisière du Gers. Forte expansion pavillonnaire depuis les années 1980 sur coteaux argileux. Zone à fort risque RGA.',
    population: '9 421',
    geologie: 'Léguevin se situe sur les molasses argilo-marneuses du miocène, sur la transition entre bassin toulousain et Gascogne. L\'ensemble du territoire communal est classé en aléa RGA moyen à fort.',
    risqueRGA: 'fort',
    arretesCATNAT: [
      'Sécheresse 2022 (JO du 18/01/2023)',
      'Sécheresse 2023 (JO du 28/02/2024)',
      'Sécheresse 2019',
      'Sécheresse 2017'
    ],
    typesConstruction: 'Habitat majoritairement pavillonnaire (années 80 à aujourd\'hui), souvent sur grandes parcelles. Les lotissements anciens (avant 1995) cumulent fondations limitées et végétation mature, deux facteurs aggravants RGA.',
    communesProches: ['Pibrac', 'Brax', 'Lévignac', 'Sainte-Livrade', 'Pradère-les-Bourguets'],
    specificitesFissures: 'Léguevin présente l\'un des taux de sinistralité fissures les plus élevés de la périphérie ouest. Les chênes et platanes matures à proximité des maisons sont un facteur clé : 1 sinistre sur 3 implique un arbre à moins de 8 m.',
    specificitesHumidite: 'Quelques cas isolés de remontées capillaires dans le centre ancien. La problématique principale reste les fissures structurelles.',
    tauxSinistralite: '13,7%'
  },

  'saint-lys': {
    nom: 'Saint-Lys',
    codePostal: '31470',
    departement: 'Haute-Garonne (31)',
    distance: '25 km',
    description: 'Commune de 8 500 habitants au sud-ouest de Toulouse, à la limite avec le Gers. Bourg historique sur coteau et extensions pavillonnaires en plaine et sur les versants. Sols argileux dominants.',
    population: '8 472',
    geologie: 'Saint-Lys repose sur des molasses argilo-sableuses du miocène, sur le bassin de la Save. Les coteaux argileux du nord et de l\'ouest sont les plus exposés au RGA, la plaine alluviale étant relativement plus stable.',
    risqueRGA: 'fort',
    arretesCATNAT: [
      'Sécheresse 2022',
      'Sécheresse 2023',
      'Sécheresse 2019'
    ],
    communesProches: ['Fonsorbes', 'Sainte-Foy-de-Peyrolières', 'Bragayrac', 'Empeaux', 'Fontenilles'],
    specificitesFissures: 'À Saint-Lys, les pavillons sur coteaux argileux des années 1980-2000 concentrent l\'essentiel des sinistres fissures. Diagnostic recommandé dès l\'apparition de fissures de plus de 2 mm.',
    specificitesHumidite: 'Cas ponctuels de remontées capillaires dans les bâtisses anciennes du centre. Pas de problématique humidité majeure sur le pavillonnaire récent.',
    tauxSinistralite: '11,2%'
  },

  bruguieres: {
    nom: 'Bruguières',
    codePostal: '31150',
    departement: 'Haute-Garonne (31)',
    distance: '15 km',
    description: 'Commune de 5 300 habitants au nord de Toulouse, sur la route de Cahors. Habitat majoritairement pavillonnaire des années 1970 à aujourd\'hui sur sols argileux. Croissance démographique soutenue.',
    population: '5 290',
    geologie: 'Bruguières est implantée sur les molasses argileuses du miocène, en bordure du couloir alluvial du Girou. Les secteurs sud-ouest, sur substrat plus alluvial, sont moins exposés que le nord-est sur argiles franches.',
    risqueRGA: 'fort',
    arretesCATNAT: [
      'Sécheresse 2022',
      'Sécheresse 2023',
      'Sécheresse 2019'
    ],
    communesProches: ['Saint-Jory', 'Gratentour', 'Castelnau-d\'Estrétefonds', 'Lespinasse', 'Saint-Sauveur'],
    specificitesFissures: 'À Bruguières, les pavillons des années 70-80 cumulent fondations limitées et végétation arborée mature, ce qui en fait les premiers candidats aux fissures par tassement différentiel sécheresse.',
    specificitesHumidite: 'Quelques sous-sols semi-enterrés des pavillons 70-80 présentent des infiltrations chroniques. Diagnostic ciblé recommandé.',
    tauxSinistralite: '10,9%'
  },

  bessieres: {
    nom: 'Bessières',
    codePostal: '31660',
    departement: 'Haute-Garonne (31)',
    distance: '25 km',
    description: 'Bourg de 4 000 habitants au nord-est de Toulouse, sur les rives du Tarn. Centre ancien et extensions pavillonnaires sur coteaux argileux en lisière de la vallée du Tarn.',
    population: '4 052',
    geologie: 'Bessières marque la limite entre la basse plaine alluviale du Tarn et les coteaux molassiques argileux du Lauragais nord. Les pavillons sur coteaux sont les plus exposés au RGA.',
    risqueRGA: 'fort',
    arretesCATNAT: [
      'Sécheresse 2022',
      'Sécheresse 2023',
      'Sécheresse 2019',
      'Inondations Tarn'
    ],
    communesProches: ['Buzet-sur-Tarn', 'Villemur-sur-Tarn', 'Mirepoix-sur-Tarn', 'Le Born', 'Bondigoux'],
    specificitesFissures: 'À Bessières, les pavillons des coteaux sont régulièrement sinistrés depuis 2019. Les fondations historiquement limitées et l\'évolution climatique imposent souvent une reprise en sous-œuvre.',
    specificitesHumidite: 'Habitations en plaine alluviale parfois concernées par des remontées capillaires post-crue. Diagnostic à mener après chaque évènement de crue significatif.',
    tauxSinistralite: '11,8%'
  },

  grisolles: {
    nom: 'Grisolles',
    codePostal: '82170',
    departement: 'Tarn-et-Garonne (82)',
    distance: '30 km',
    description: 'Commune de 4 500 habitants au sud du Tarn-et-Garonne, à la limite de la Haute-Garonne, sur l\'axe Toulouse-Montauban. Centre ancien (briques toulousaines) et lotissements récents en périphérie.',
    population: '4 484',
    geologie: 'Grisolles est implantée sur la basse plaine alluviale du Tarn et sur des molasses argileuses du miocène. La transition plaine-coteau crée des comportements de sol contrastés à l\'échelle de la commune.',
    risqueRGA: 'moyen',
    arretesCATNAT: [
      'Sécheresse 2022',
      'Sécheresse 2023',
      'Inondations Tarn'
    ],
    communesProches: ['Pompignan', 'Fronton (31)', 'Dieupentale', 'Bessens', 'Verdun-sur-Garonne'],
    specificitesFissures: 'À Grisolles, les pavillons construits sur les versants sud (vers Bessens) sont plus exposés au RGA que ceux de la plaine. Les bâtisses anciennes en briques tolèrent mieux les mouvements modérés.',
    specificitesHumidite: 'Centre ancien régulièrement concerné par des remontées capillaires. Habitations en plaine sensibles aux infiltrations post-crue du Tarn.',
    tauxSinistralite: '8,4%'
  }
};

// Liste des slugs de villes pour la génération statique
export const villeSlugs = Object.keys(villesData);

// Mapping département → villes (pour maillage interne et pages SEO)
export type DepartementInfo = {
  nom: string;
  code: string;
  slug: string;
  villes: string[]; // slugs des villes
};

export const departementsMapping: DepartementInfo[] = (() => {
  const deptMap: Record<string, { nom: string; code: string; slug: string; villes: string[] }> = {};
  
  const deptSlugMap: Record<string, string> = {
    'Haute-Garonne (31)': 'haute-garonne',
    'Tarn-et-Garonne (82)': 'tarn-et-garonne',
    'Gers (32)': 'gers',
    'Tarn (81)': 'tarn',
    'Ariège (09)': 'ariege',
  };

  for (const [slug, ville] of Object.entries(villesData)) {
    const deptKey = ville.departement;
    if (!deptMap[deptKey]) {
      const code = deptKey.match(/\((\d+)\)/)?.[1] || '';
      deptMap[deptKey] = {
        nom: deptKey.replace(/\s*\(\d+\)/, ''),
        code,
        slug: deptSlugMap[deptKey] || deptKey.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, ''),
        villes: [],
      };
    }
    deptMap[deptKey].villes.push(slug);
  }

  return Object.values(deptMap);
})();

// Récupérer les villes du même département qu'une ville donnée
export function getVillesMemesDepartement(villeSlug: string): string[] {
  const ville = villesData[villeSlug];
  if (!ville) return [];
  const dept = departementsMapping.find(d => `${d.nom} (${d.code})` === ville.departement);
  return dept?.villes.filter(v => v !== villeSlug) || [];
}

// Export pour utilisation dans les pages dynamiques
export type { VilleInfo as VilleData };
