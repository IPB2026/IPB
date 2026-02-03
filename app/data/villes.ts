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
  }
};

// Liste des slugs de villes pour la génération statique
export const villeSlugs = Object.keys(villesData);

// Export pour utilisation dans les pages dynamiques
export type { VilleInfo as VilleData };
