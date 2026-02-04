// ═══════════════════════════════════════════════════════════════
// BLOG POSTS - SINGLE SOURCE OF TRUTH
// ═══════════════════════════════════════════════════════════════
// 
// Ce fichier centralise TOUTES les données des articles de blog.
// Il est importé par:
// - app/blog/page.tsx (liste des articles)
// - app/blog/[slug]/page.tsx (article complet)
// - app/sitemap.ts (génération du sitemap)
//
// ═══════════════════════════════════════════════════════════════


// Types pour les articles
interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: 'fissures' | 'humidite' | 'conseils' | 'expertise';
  content: string;
  author: string;
  metaDescription: string;
  keywords: string[];
}

// Base de données des articles avec copywriting expert et orienté conversion
const blogPosts: { [key: string]: BlogPost } = {
  'fissures-maison-toulouse-que-faire': {
    slug: 'fissures-maison-toulouse-que-faire',
    title: 'Fissures sur ma maison à Toulouse : Que faire ? Guide complet 2026',
    excerpt: 'Vous avez découvert des fissures sur votre maison toulousaine ? Ne paniquez pas. Voici comment distinguer une fissure bénigne d\'une urgence structurelle, et surtout : comment agir pour protéger votre patrimoine sans vous ruiner.',
    date: '2026-06-12',
    readTime: '8 min',
    category: 'fissures',
    author: 'Expert IPB',
    metaDescription: 'Guide expert sur les fissures de maison à Toulouse. Comment identifier les fissures dangereuses, leurs causes (sol argileux, sécheresse) et les solutions économiques (agrafage vs micropieux).',
    keywords: ['fissures maison', 'toulouse', 'haute-garonne', 'agrafage', 'micropieux', 'tassement différentiel', 'sol argileux'],
    content: `
      <div class="mb-8 p-6 bg-orange-50 border-l-4 border-orange-600 rounded-r-lg">
        <p class="font-bold text-orange-900 mb-2">⚠️ Attention : Ne minimisez pas vos fissures</p>
        <p class="text-orange-800">Une fissure qui s'agrandit, même lentement, est le signe que votre maison bouge. Chaque hiver, le sol argileux toulousain se contracte et aggrave la situation. Plus vous attendez, plus la réparation sera coûteuse.</p>
      </div>

      <h2>Votre maison se fissure ? Voici ce que vous devez savoir</h2>
      <p>Vous venez de remarquer une fissure sur votre façade. Votre première réaction ? L'inquiétude, légitime. Votre deuxième ? "C'est peut-être rien, je vais attendre de voir." <strong>Erreur.</strong></p>
      
      <p>À Toulouse et en Haute-Garonne, <strong>9 maisons sur 10 présentent des fissures liées au sol argileux</strong>. Mais toutes ne nécessitent pas la même intervention. L'enjeu ? Distinguer une micro-fissure cosmétique d'un tassement différentiel qui menace la structure.</p>

      <h2>Les 3 types de fissures : laquelle est la vôtre ?</h2>
      
      <h3>1. Le faïençage (superficiel) : pas d'urgence</h3>
      <p>Un réseau de micro-fissures fines (< 0,2 mm) qui ressemble à une toile d'araignée. <strong>Cause</strong> : fatigue des enduits, variations thermiques. <strong>Action</strong> : Un simple ravalement suffit. Pas de panique.</p>

      <h3>2. La fissure structurelle (modérée) : vigilance requise</h3>
      <p>Fissure de 0,5 à 2 mm, souvent verticale ou en escalier. <strong>Cause</strong> : mouvement de fondations, tassement différentiel. <strong>Action</strong> : <strong>Surveillez son évolution</strong>. Si elle s'agrandit ou si vos portes coincent, c'est le signe que la structure bouge. C'est là que l'agrafage intervient.</p>

      <h3>3. La lézarde (critique) : intervention urgente</h3>
      <p>Fissure > 2 mm, souvent en escalier suivant les joints, avec des signes collatéraux (portes qui frottent, carrelage qui se soulève). <strong>Cause</strong> : tassement différentiel majeur. <strong>Action</strong> : <strong>Expertise immédiate</strong>. Votre maison a besoin d'une stabilisation structurelle (agrafage ou micropieux selon la gravité).</p>

      <h2>Pourquoi votre maison se fissure à Toulouse ? (Les vraies causes)</h2>
      
      <p>Le sol toulousain est composé d'<strong>argile gonflante</strong>. En été, il se rétracte. En hiver, il gonfle. Ce cycle crée des mouvements de terrain qui tirent sur vos fondations. Mais d'autres facteurs aggravent le phénomène :</p>

      <ul>
        <li><strong>Les épisodes de sécheresse</strong> : Les étés 2022-2023 ont été catastrophiques. Des milliers de maisons toulousaines ont subi des tassements accélérés.</li>
        <li><strong>Les arbres trop proches</strong> : Un platane à moins de 4 mètres de votre façade ? Ses racines assèchent le sol sous vos fondations, créant un vide qui fait s'enfoncer votre maison.</li>
        <li><strong>Les travaux de voirie</strong> : Un chantier à proximité peut perturber la stabilité du sol.</li>
        <li><strong>L'âge de la construction</strong> : Les maisons des années 70-80, construites avant les normes parasismiques, sont plus vulnérables.</li>
      </ul>

      <h2>Agrafage ou micropieux ? La réponse qui vous fait économiser 30 000€</h2>
      
      <p>Voici la vérité que beaucoup d'entreprises ne vous diront pas : <strong>90% des maisons toulousaines n'ont PAS besoin de micropieux</strong>.</p>

      <div class="my-8 p-6 bg-slate-50 border border-slate-200 rounded-xl">
        <h3 class="font-bold text-slate-900 mb-4">L'agrafage : la solution économique (et souvent suffisante)</h3>
        <p>L'agrafage, c'est littéralement <strong>"recoudre" votre mur</strong>. On insère des aciers torsadés tous les 40 cm dans la maçonnerie. Résultat ? Votre mur retrouve sa cohérence monolithique et résiste aux mouvements du sol.</p>
        
        <p class="mt-4"><strong>Coût moyen</strong> : 12 000€ - 18 000€ pour une façade complète<br>
        <strong>Durée</strong> : 3 à 5 jours<br>
        <strong>Garantie</strong> : Décennale<br>
        <strong>Efficacité</strong> : Adapté à 90% des cas</strong></p>
      </div>

      <div class="my-8 p-6 bg-slate-100 border border-slate-300 rounded-xl">
        <h3 class="font-bold text-slate-900 mb-4">Les micropieux : la solution lourde (et souvent inutile)</h3>
        <p>Forer jusqu'à 15 mètres de profondeur, ancrer votre maison sur des pieux en béton. Efficace ? Oui. Nécessaire ? <strong>Seulement dans 10% des cas</strong> (affaissements majeurs > 10 cm).</p>
        
        <p class="mt-4"><strong>Coût moyen</strong> : 40 000€ - 60 000€ pour une façade<br>
        <strong>Durée</strong> : 3 à 6 semaines<br>
        <strong>Garantie</strong> : Décennale<br>
        <strong>Quand</strong> : Affaissements majeurs uniquement</p>
      </div>

      <p class="font-bold text-lg text-slate-900 my-6">💡 La question à vous poser : "Mon expert me propose-t-il l'agrafage en premier, ou va-t-il directement aux micropieux ?"</p>

      <h2>Quand agir ? Les signaux d'alarme à ne pas ignorer</h2>
      
      <p>Vous hésitez encore ? Voici les signes qui ne trompent pas :</p>

      <ul>
        <li><strong>La fissure s'agrandit</strong> : Mesurez-la avec un repère (scotch). Si elle évolue en quelques semaines, c'est actif.</li>
        <li><strong>Vos portes/fenêtres frottent</strong> : La structure se déforme. Les menuiseries ne sont plus d'équerre.</li>
        <li><strong>Vous entendez des craquements</strong> : La nuit, quand tout est calme, vous percevez des bruits de structure qui travaille.</li>
        <li><strong>Le carrelage se soulève</strong> : Les sols se déforment, signe que les fondations bougent.</li>
        <li><strong>La fissure dépasse 2 mm</strong> : Au-delà, l'eau s'infiltre, aggrave le problème, et la réparation devient urgente.</li>
      </ul>

      <div class="my-8 p-6 bg-red-50 border-l-4 border-red-600 rounded-r-lg">
        <p class="font-bold text-red-900 mb-2">🚨 Urgence absolue si :</p>
        <ul class="list-disc ml-6 text-red-800">
          <li>La fissure s'agrandit de plus de 1 mm par mois</li>
          <li>Plusieurs fissures apparaissent simultanément</li>
          <li>Des morceaux de maçonnerie se détachent</li>
          <li>Vos portes ne ferment plus</li>
        </ul>
        <p class="mt-4 text-red-900 font-bold">Dans ce cas, contactez un expert immédiatement. Ne tentez pas de reboucher vous-même.</p>
      </div>

      <h2>Le piège à éviter : "reboucher et repeindre"</h2>
      
      <p>Vous êtes tenté de simplement reboucher la fissure avec de l'enduit et de repeindre ? <strong>Erreur classique</strong>.</p>

      <p>Un rebouchage cosmétique ne fait que <strong>cacher le problème</strong>. La fissure va réapparaître dans les 6 à 12 mois, souvent plus large. Pire : pendant ce temps, la structure continue de bouger, aggravant la situation. Vous aurez perdu du temps et de l'argent.</p>

      <p><strong>La seule solution durable</strong> : traiter la cause (stabiliser les fondations) avant de traiter le symptôme (reboucher).</p>

      <h2>Conclusion : agissez avant qu'il ne soit trop tard</h2>
      
      <p>Les fissures ne sont pas une fatalité. Mais elles ne se réparent pas toutes seules. Chaque hiver qui passe aggrave la situation, et chaque mois d'attente augmente le coût de la réparation.</p>

      <p><strong>Notre conseil d'expert</strong> : Ne laissez pas l'inquiétude paralyser votre action. Un diagnostic précis (149€, déductible sur travaux) vous dira en 1h30 si votre maison est en danger ou si vous pouvez attendre. Cette expertise vous évitera soit une panique inutile, soit une catastrophe évitable.</p>

      <p class="font-bold text-lg text-slate-900 mt-6">La question n'est pas "Est-ce grave ?" mais "Quand dois-je agir ?"</p>
    `
  },
  'humidite-remontee-capillaire-solution': {
    slug: 'humidite-remontee-capillaire-solution',
    title: 'Humidité et remontées capillaires : Solutions définitives',
    excerpt: 'Salpêtre, moisissures, peinture qui cloque... Votre mur "sue" et vous ne savez plus quoi faire ? La peinture anti-humidité n\'a rien changé ? Voici pourquoi, et surtout : la vraie solution qui fonctionne.',
    date: '2026-07-04',
    readTime: '6 min',
    category: 'humidite',
    author: 'Expert IPB',
    metaDescription: 'Solutions définitives contre l\'humidité et les remontées capillaires. Pourquoi la peinture anti-humidité ne fonctionne pas. Injection résine, cuvelage, traitement des murs humides en Haute-Garonne.',
    keywords: ['humidité', 'remontée capillaire', 'salpêtre', 'injection résine', 'cuvelage', 'murs humides', 'toulouse'],
    content: `
      <div class="mb-8 p-6 bg-blue-50 border-l-4 border-blue-600 rounded-r-lg">
        <p class="font-bold text-blue-900 mb-2">💧 Vous avez déjà essayé la peinture anti-humidité ?</p>
        <p class="text-blue-800">Si elle n'a rien changé (ou pire, si les cloques sont revenues), c'est normal. Vous avez traité le symptôme, pas la cause. L'eau continue de monter dans vos murs. Voici la vraie solution.</p>
      </div>

      <h2>Votre mur "sue" ? Voici ce qui se passe vraiment</h2>
      
      <p>Vous voyez du salpêtre (poudre blanche) au pied de vos murs ? Des moisissures noires qui reviennent malgré vos nettoyages ? De la peinture qui cloque ? <strong>Vous n'êtes pas seul.</strong> En Haute-Garonne, 1 maison sur 3 souffre de remontées capillaires.</p>

      <p>Le problème ? <strong>L'eau remonte du sol dans vos murs</strong>, comme une éponge qui boit. Et tant que vous n'avez pas créé une barrière étanche au cœur du mur, l'eau continuera de monter, détruisant vos enduits, pourrissant vos boiseries, et créant un environnement malsain.</p>

      <h2>Remontée capillaire : le phénomène physique expliqué simplement</h2>
      
      <p>Imaginez une éponge posée dans une flaque d'eau. L'eau monte naturellement dans les pores de l'éponge, par capillarité. C'est exactement ce qui se passe avec vos murs.</p>

      <p>Le sol sous votre maison est saturé d'eau (nappe phréatique, ruissellement, infiltration). Cette eau migre dans les pores de vos murs (brique, pierre, béton) et remonte jusqu'à 1m50 de hauteur généralement, poussée par la gravité et l'évaporation en surface.</p>

      <p><strong>Pourquoi ça s'arrête à 1m50 ?</strong> Parce qu'au-delà, la gravité l'emporte sur la capillarité. Si vous voyez de l'humidité plus haut, c'est soit une infiltration latérale (fuite), soit de la condensation (problème de ventilation).</p>

      <h2>Les signes qui ne trompent pas : vous avez une remontée capillaire</h2>
      
      <ul>
        <li><strong>Le salpêtre</strong> : Cette poudre blanche qui apparaît sur vos murs, ce sont des sels minéraux du sol qui migrent avec l'eau. C'est la "signature" des remontées capillaires. Si vous voyez du salpêtre, c'est que l'eau monte du sol.</li>
        <li><strong>La peinture qui cloque</strong> : L'eau pousse derrière l'enduit, le fait gonfler, puis éclater. Vous rebouchez, repeignez... et ça recommence 6 mois plus tard.</li>
        <li><strong>Les moisissures en bas de mur</strong> : Taches noires ou vertes qui reviennent malgré vos nettoyages. L'humidité constante crée un terrain favorable aux champignons.</li>
        <li><strong>Les odeurs de moisi</strong> : Particulièrement dans les caves et sous-sols. L'air est saturé d'humidité.</li>
        <li><strong>Le papier peint qui se décolle</strong> : L'humidité détache les colles et fait "buller" le papier.</li>
      </ul>

      <div class="my-8 p-6 bg-red-50 border-l-4 border-red-600 rounded-r-lg">
        <p class="font-bold text-red-900 mb-2">❌ Ce qui NE fonctionne PAS (et pourquoi)</p>
        <ul class="list-disc ml-6 text-red-800 space-y-2">
          <li><strong>La peinture anti-humidité</strong> : Elle enferme l'eau dans le mur. L'eau continue de monter, mais ne peut plus s'évaporer. Résultat : le mur pourrit derrière la peinture, et les cloques reviennent.</li>
          <li><strong>Le déshumidificateur</strong> : Il assèche l'air, pas le mur. Dès que vous l'éteignez, l'humidité revient. C'est un pansement, pas un traitement.</li>
          <li><strong>Ventiler davantage</strong> : Si c'est une remontée capillaire (pas de la condensation), ventiler ne changera rien. L'eau monte du sol, pas de l'air.</li>
          <li><strong>Reboucher et repeindre</strong> : Vous masquez le symptôme. L'eau continue de monter, et le problème revient.</li>
        </ul>
      </div>

      <h2>La seule solution qui fonctionne : créer une barrière étanche dans le mur</h2>
      
      <p>Pour stopper définitivement les remontées capillaires, il faut créer une <strong>barrière étanche au cœur même du mur</strong>, à sa base. C'est là qu'intervient l'injection de résine hydrophobe.</p>

      <h3>L'injection de résine : comment ça marche ?</h3>
      
      <p>On perce des trous tous les 12 cm à la base de vos murs (généralement à 15-20 cm du sol). Dans chaque trou, on injecte une résine spéciale qui, au contact de l'eau, se transforme en gel imperméable. Cette barrière chimique bloque définitivement la remontée d'eau.</p>

      <div class="my-8 p-6 bg-green-50 border border-green-200 rounded-xl">
        <h3 class="font-bold text-green-900 mb-4">✅ Pourquoi cette technique fonctionne</h3>
        <ul class="list-disc ml-6 text-green-800 space-y-2">
          <li><strong>Barrière définitive</strong> : La résine minéralise et reste active 30 ans minimum</li>
          <li><strong>Non invasive</strong> : Pas de gros travaux, pas de démolition. Juste des petits perçages qui se rebouchent facilement</li>
          <li><strong>Efficace sur tous types de murs</strong> : Brique, pierre, béton, parpaing</li>
          <li><strong>Résultat visible rapidement</strong> : La barrière est active en 48h. Le mur commence à sécher en quelques semaines</li>
          <li><strong>Garantie 30 ans</strong> : Couverte par notre assurance décennale</li>
        </ul>
      </div>

      <h3>Combien de temps pour que mes murs sèchent ?</h3>
      
      <p><strong>La barrière étanche est active en 48h</strong>. Mais le mur doit évacuer l'eau accumulée depuis des années. C'est un processus physique incompressible.</p>

      <p><strong>Règle d'or</strong> : Comptez environ <strong>1 mois de séchage par centimètre d'épaisseur de mur</strong>. Pour un mur de 20 cm, cela fait 6 à 10 mois. Ne vous attendez pas à un résultat en 2 semaines. La patience est de rigueur, mais le résultat est définitif.</p>

      <h2>Cuvelage et VMI : les compléments indispensables</h2>
      
      <h3>Le cuvelage (pour les caves enterrées)</h3>
      <p>Si votre problème d'humidité concerne une cave ou un sous-sol enterré, l'injection seule ne suffit pas. Il faut aussi créer une étanchéité sur les parois (cuvelage époxy) pour bloquer les infiltrations latérales.</p>

      <h3>La VMI (Ventilation Mécanique par Insufflation)</h3>
      <p>Une fois l'eau stoppée, il faut évacuer l'humidité résiduelle. La VMI insuffle de l'air sec dans votre maison, accélérant le séchage et empêchant la condensation. C'est le complément idéal à l'injection.</p>

      <h2>Remontée capillaire vs Condensation : comment faire la différence ?</h2>
      
      <p>Beaucoup confondent les deux. Pourtant, le traitement est complètement différent :</p>

      <div class="my-8 grid md:grid-cols-2 gap-6">
        <div class="p-6 bg-blue-50 border border-blue-200 rounded-xl">
          <h3 class="font-bold text-blue-900 mb-3">Remontée capillaire</h3>
          <ul class="list-disc ml-6 text-blue-800 space-y-1 text-sm">
            <li>Humidité en <strong>bas de mur</strong> (pied de mur)</li>
            <li>Présence de <strong>salpêtre</strong> (poudre blanche)</li>
            <li>Moisissures en <strong>bas</strong> uniquement</li>
            <li>Murs <strong>froids et humides au toucher</strong></li>
            <li><strong>Traitement</strong> : Injection résine</li>
          </ul>
        </div>
        <div class="p-6 bg-slate-50 border border-slate-200 rounded-xl">
          <h3 class="font-bold text-slate-900 mb-3">Condensation</h3>
          <ul class="list-disc ml-6 text-slate-800 space-y-1 text-sm">
            <li>Humidité en <strong>haut de mur</strong> ou sur les fenêtres</li>
            <li><strong>Pas de salpêtre</strong></li>
            <li>Moisissures en <strong>angles</strong> (plafonds, fenêtres)</li>
            <li>Buée sur les <strong>fenêtres</strong></li>
            <li><strong>Traitement</strong> : VMC / Ventilation</li>
          </ul>
        </div>
      </div>

      <p><strong>Notre diagnostic permet de trancher</strong>. Ne vous trompez pas de traitement : une VMC ne résoudra jamais une remontée capillaire, et une injection ne servira à rien contre la condensation.</p>

      <h2>Le piège à éviter : attendre que "ça sèche tout seul"</h2>
      
      <p>Vous pensez que l'été va tout arranger ? <strong>Erreur.</strong> L'humidité dans les murs ne s'évapore pas naturellement. Même en été, l'eau continue de monter du sol. Et chaque hiver, le problème s'aggrave.</p>

      <p><strong>Les conséquences de l'attente</strong> :</p>
      <ul>
        <li>Pourrissement des boiseries (plinthes, portes, fenêtres)</li>
        <li>Dégradation des enduits et peintures</li>
        <li>Développement de moisissures toxiques (risque santé)</li>
        <li>Dévalorisation de votre bien (jusqu'à -30% en cas de vente)</li>
        <li>Coût de réparation qui augmente (plus le mur est dégradé, plus c'est cher)</li>
      </ul>

      <h2>Conclusion : n'attendez pas que vos murs pourrissent</h2>
      
      <p>L'humidité dans les murs n'est pas une fatalité. Mais elle ne se répare pas toute seule. Chaque mois qui passe aggrave la situation et augmente le coût de la réparation.</p>

      <p><strong>Notre conseil d'expert</strong> : Si vous voyez du salpêtre ou des moisissures qui reviennent, ne perdez plus de temps avec des solutions cosmétiques. Un diagnostic précis (149€, déductible sur travaux) vous dira en 1h30 si vous avez une remontée capillaire ou de la condensation, et quelle solution est adaptée à votre cas.</p>

      <p class="font-bold text-lg text-slate-900 mt-6">La question n'est pas "Est-ce que ça va sécher ?" mais "Quand vais-je traiter la cause ?"</p>
    `
  },
  'agrafage-vs-micropieux-choix': {
    slug: 'agrafage-vs-micropieux-choix',
    title: 'Agrafage ou micropieux ? Comment choisir la bonne solution',
    excerpt: 'Face à des fissures structurelles, on vous propose souvent les micropieux (40 000€). Mais dans 90% des cas, l\'agrafage suffit... et coûte 3x moins cher. Voici comment faire le bon choix sans vous faire arnaquer.',
    date: '2026-08-20',
    readTime: '10 min',
    category: 'expertise',
    author: 'Expert IPB',
    metaDescription: 'Comparatif expert agrafage vs micropieux : technique, coût (15k€ vs 45k€), efficacité, durée. Quelle solution choisir pour stabiliser les fondations sans se ruiner ?',
    keywords: ['agrafage', 'micropieux', 'fondations', 'stabilisation', 'tassement', 'coût réparation fissures'],
    content: `
      <div class="mb-8 p-6 bg-orange-50 border-l-4 border-orange-600 rounded-r-lg">
        <p class="font-bold text-orange-900 mb-2">💰 La vérité que beaucoup d'entreprises ne vous diront pas</p>
        <p class="text-orange-800">90% des maisons toulousaines n'ont PAS besoin de micropieux. Si on vous les propose directement, sans avoir évoqué l'agrafage, méfiez-vous. Vous risquez de payer 30 000€ de trop.</p>
      </div>

      <h2>Vous avez des fissures ? On vous propose les micropieux ? Attendez.</h2>
      
      <p>Vous venez de recevoir un devis pour des micropieux à 45 000€. Votre première réaction ? Le choc. Votre deuxième ? "C'est vraiment nécessaire ?" <strong>Bonne question.</strong></p>

      <p>Voici la vérité : <strong>dans 90% des cas, l'agrafage suffit</strong>. Et il coûte 3 fois moins cher. Alors pourquoi certaines entreprises proposent directement les micropieux ? Parce qu'ils sont plus rentables... pour eux.</p>

      <h2>L'agrafage : la "couture" de votre mur (12 000€ - 18 000€)</h2>
      
      <h3>Comment ça marche ?</h3>
      <p>Imaginez que votre mur s'est "décousu" à cause des mouvements du sol. L'agrafage, c'est littéralement <strong>le recoudre</strong>.</p>

      <p>On perce des trous tous les 40 cm dans votre maçonnerie. Dans chaque trou, on insère un acier torsadé (une "agrafe") qui traverse le mur. Ces aciers relient les deux parties du mur qui se séparaient, lui redonnant sa cohérence monolithique.</p>

      <p>Ensuite, on comble les fissures avec un mortier résine fibré élastique qui s'adapte aux micro-mouvements sans se fissurer à nouveau.</p>

      <div class="my-8 p-6 bg-green-50 border border-green-200 rounded-xl">
        <h3 class="font-bold text-green-900 mb-4">✅ Avantages de l'agrafage</h3>
        <ul class="list-disc ml-6 text-green-800 space-y-2">
          <li><strong>Coût maîtrisé</strong> : 12 000€ - 18 000€ pour une façade complète (vs 40 000€ - 60 000€ pour les micropieux)</li>
          <li><strong>Rapidité</strong> : 3 à 5 jours de travaux (vs 3 à 6 semaines pour les micropieux)</li>
          <li><strong>Moins invasif</strong> : Pas de forage profond, pas de gros engins dans votre jardin, pas de perturbation du terrain</li>
          <li><strong>Efficacité prouvée</strong> : Adapté à 90% des maisons individuelles en Haute-Garonne</li>
          <li><strong>Garantie décennale</strong> : Même protection que les micropieux</li>
          <li><strong>Finition soignée</strong> : Une fois repeint, l'intervention est quasi-invisible</li>
        </ul>
      </div>

      <div class="my-8 p-6 bg-yellow-50 border border-yellow-200 rounded-xl">
        <h3 class="font-bold text-yellow-900 mb-4">⚠️ Limites de l'agrafage</h3>
        <ul class="list-disc ml-6 text-yellow-800 space-y-2">
          <li>Nécessite une <strong>maçonnerie en bon état</strong> (pas de délitement, pas de pourrissement)</li>
          <li>Pas adapté aux <strong>affaissements majeurs</strong> (> 10 cm de dénivelé)</li>
          <li>Peut nécessiter un <strong>complément de matage</strong> si les fissures sont très larges</li>
        </ul>
      </div>

      <h2>Les micropieux : la solution lourde (40 000€ - 60 000€)</h2>
      
      <h3>Comment ça marche ?</h3>
      <p>On fore des trous de 15 à 20 cm de diamètre jusqu'à 10-15 mètres de profondeur, jusqu'à atteindre le sol stable. Dans chaque trou, on coule du béton armé pour créer un "pieu" qui ancrera votre maison dans le sol profond, indépendamment des variations de surface.</p>

      <p>C'est efficace ? <strong>Oui.</strong> C'est nécessaire ? <strong>Seulement dans 10% des cas.</strong></p>

      <div class="my-8 p-6 bg-blue-50 border border-blue-200 rounded-xl">
        <h3 class="font-bold text-blue-900 mb-4">✅ Avantages des micropieux</h3>
        <ul class="list-disc ml-6 text-blue-800 space-y-2">
          <li><strong>Efficacité maximale</strong> : Solution pour les cas les plus graves (affaissements > 10 cm)</li>
          <li><strong>Stabilité absolue</strong> : Ancrage dans le sol stable, indépendant des variations de surface</li>
          <li><strong>Durabilité</strong> : Solution définitive pour les affaissements majeurs</li>
          <li><strong>Garantie décennale</strong> : Même protection que l'agrafage</li>
        </ul>
      </div>

      <div class="my-8 p-6 bg-red-50 border border-red-200 rounded-xl">
        <h3 class="font-bold text-red-900 mb-4">❌ Inconvénients des micropieux</h3>
        <ul class="list-disc ml-6 text-red-800 space-y-2">
          <li><strong>Coût prohibitif</strong> : 40 000€ - 60 000€ pour une façade (3x plus cher que l'agrafage)</li>
          <li><strong>Très invasif</strong> : Nécessite des engins de chantier lourds, perturbe votre jardin, peut endommager les réseaux</li>
          <li><strong>Durée longue</strong> : 3 à 6 semaines de travaux (vs 3 à 5 jours pour l'agrafage)</li>
          <li><strong>Impact visuel</strong> : Têtes de pieux visibles, nécessite souvent un aménagement paysager</li>
          <li><strong>Souvent inutile</strong> : Dans 90% des cas, l'agrafage suffit</li>
        </ul>
      </div>

      <h2>Quand choisir l'agrafage ? (90% des cas)</h2>
      
      <p>L'agrafage est la solution recommandée si :</p>

      <ul>
        <li><strong>Les fissures sont modérées à importantes</strong> (mais pas critiques). Largeur entre 0,5 mm et 5 mm généralement.</li>
        <li><strong>La maçonnerie est en bon état</strong>. Pas de délitement, pas de pourrissement, pas de désolidarisation majeure.</li>
        <li><strong>L'affaissement est modéré</strong> (< 10 cm de dénivelé entre deux points de la façade).</li>
        <li><strong>Le budget est limité</strong>. Vous voulez une solution efficace sans vous ruiner.</li>
        <li><strong>Vous voulez une intervention rapide</strong>. Quelques jours suffisent, vous pouvez rester chez vous.</li>
        <li><strong>Vous voulez préserver votre jardin</strong>. Pas de gros engins, pas de perturbation du terrain.</li>
      </ul>

      <p class="font-bold text-lg text-slate-900 my-6">💡 Cas typique : Maison des années 70-80 à Toulouse, fissures en escalier suite à la sécheresse 2022-2023, affaissement modéré (< 5 cm). → Agrafage suffit.</p>

      <h2>Quand choisir les micropieux ? (10% des cas)</h2>
      
      <p>Les micropieux sont nécessaires (et justifiés) si :</p>

      <ul>
        <li><strong>L'affaissement dépasse 10 cm</strong>. La structure s'est trop enfoncée, l'agrafage ne suffira pas.</li>
        <li><strong>La structure est très dégradée</strong>. Délitement majeur, désolidarisation complète, maçonnerie pourrie.</li>
        <li><strong>L'agrafage a été tenté sans succès</strong>. Dans de rares cas, l'agrafage ne suffit pas et il faut passer aux micropieux.</li>
        <li><strong>Le sol est très instable en profondeur</strong>. Même avec l'agrafage, la maison continuerait de bouger.</li>
        <li><strong>Vous avez les moyens</strong>. Les micropieux coûtent cher, mais si c'est nécessaire, c'est un investissement justifié.</li>
      </ul>

      <p class="font-bold text-lg text-slate-900 my-6">💡 Cas typique : Maison très ancienne, affaissement majeur (> 15 cm), maçonnerie dégradée, sol très instable. → Micropieux nécessaires.</p>

      <h2>Le piège à éviter : se faire proposer les micropieux directement</h2>
      
      <p><strong>Signal d'alarme</strong> : Si un expert vous propose directement les micropieux sans avoir évoqué l'agrafage, <strong>méfiez-vous</strong>.</p>

      <p>Un expert sérieux devrait :</p>
      <ol>
        <li><strong>Évaluer la gravité</strong> : Mesurer les fissures, le dénivelé, l'état de la maçonnerie</li>
        <li><strong>Proposer l'agrafage en premier</strong> si la situation le permet (90% des cas)</li>
        <li><strong>Expliquer pourquoi</strong> : Vous montrer les mesures, vous expliquer la technique</li>
        <li><strong>Ne proposer les micropieux qu'en dernier recours</strong> : Si l'agrafage ne suffit vraiment pas</li>
      </ol>

      <div class="my-8 p-6 bg-red-50 border-l-4 border-red-600 rounded-r-lg">
        <p class="font-bold text-red-900 mb-2">🚨 Questions à poser à votre expert</p>
        <ul class="list-disc ml-6 text-red-800 space-y-2">
          <li>"Pourquoi les micropieux et pas l'agrafage ?"</li>
          <li>"Quel est le dénivelé mesuré ?" (Si < 10 cm, l'agrafage devrait suffire)</li>
          <li>"L'agrafage a-t-il été envisagé ? Pourquoi n'est-il pas adapté ?"</li>
          <li>"Pouvez-vous me montrer les mesures qui justifient les micropieux ?"</li>
        </ul>
        <p class="mt-4 text-red-900 font-bold">Si l'expert ne peut pas répondre clairement, demandez un second avis.</p>
      </div>

      <h2>Comparatif direct : Agrafage vs Micropieux</h2>
      
      <div class="my-8 overflow-x-auto">
        <table class="w-full border-collapse border border-slate-300">
          <thead>
            <tr class="bg-slate-100">
              <th class="border border-slate-300 p-4 text-left font-bold">Critère</th>
              <th class="border border-slate-300 p-4 text-center font-bold bg-green-50">Agrafage</th>
              <th class="border border-slate-300 p-4 text-center font-bold bg-blue-50">Micropieux</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border border-slate-300 p-4 font-bold">Coût moyen</td>
              <td class="border border-slate-300 p-4 text-center text-green-700 font-bold">12 000€ - 18 000€</td>
              <td class="border border-slate-300 p-4 text-center text-blue-700 font-bold">40 000€ - 60 000€</td>
            </tr>
            <tr class="bg-slate-50">
              <td class="border border-slate-300 p-4 font-bold">Durée travaux</td>
              <td class="border border-slate-300 p-4 text-center">3 à 5 jours</td>
              <td class="border border-slate-300 p-4 text-center">3 à 6 semaines</td>
            </tr>
            <tr>
              <td class="border border-slate-300 p-4 font-bold">Invasivité</td>
              <td class="border border-slate-300 p-4 text-center text-green-700">Faible (petits perçages)</td>
              <td class="border border-slate-300 p-4 text-center text-red-700">Forte (forage profond, engins)</td>
            </tr>
            <tr class="bg-slate-50">
              <td class="border border-slate-300 p-4 font-bold">Efficacité</td>
              <td class="border border-slate-300 p-4 text-center">90% des cas</td>
              <td class="border border-slate-300 p-4 text-center">10% des cas (graves)</td>
            </tr>
            <tr>
              <td class="border border-slate-300 p-4 font-bold">Garantie</td>
              <td class="border border-slate-300 p-4 text-center">Décennale</td>
              <td class="border border-slate-300 p-4 text-center">Décennale</td>
            </tr>
            <tr class="bg-slate-50">
              <td class="border border-slate-300 p-4 font-bold">Impact jardin</td>
              <td class="border border-slate-300 p-4 text-center text-green-700">Minimal</td>
              <td class="border border-slate-300 p-4 text-center text-red-700">Important</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Conclusion : faites le bon choix (et économisez 30 000€)</h2>
      
      <p><strong>Dans 90% des cas, l'agrafage suffit</strong>. Et il coûte 3 fois moins cher. C'est un excellent rapport qualité/prix pour stabiliser votre maison.</p>

      <p>Les micropieux restent la solution de dernier recours pour les cas les plus graves. Mais si on vous les propose directement, sans avoir évoqué l'agrafage, <strong>demandez pourquoi</strong>. Vous risquez de payer 30 000€ de trop.</p>

      <p><strong>Notre conseil d'expert</strong> : Un diagnostic précis (149€, déductible sur travaux) vous dira en 1h30 quelle solution est adaptée à votre situation. Cette expertise vous évitera soit une dépense inutile (micropieux quand l'agrafage suffit), soit une solution insuffisante (agrafage quand les micropieux sont nécessaires).</p>

      <p class="font-bold text-lg text-slate-900 mt-6">La question n'est pas "Quelle est la solution la plus chère ?" mais "Quelle est la solution la plus adaptée à mon cas ?"</p>
    `
  },
  'fissures-escalier-tassement-differentiel': {
    slug: 'fissures-escalier-tassement-differentiel',
    title: 'Fissures en Escalier : Comprendre le Tassement Différentiel et Agir Avant l\'Aggravation',
    excerpt: 'Ces fissures qui zigzaguent sur votre mur en suivant les joints ne sont pas anodines. Elles racontent une histoire : celle d\'une maison qui se "tord" sous l\'effet d\'un tassement différentiel. Voici comment décrypter ces signaux, évaluer la gravité, et surtout, comment stabiliser votre maison à moindre coût.',
    date: '2026-09-10',
    readTime: '15 min',
    category: 'fissures',
    author: 'Expert IPB',
    metaDescription: 'Guide complet fissures en escalier 2026 : diagnostic tassement différentiel, causes (sol argileux, sécheresse), mesure gravité, solutions agrafage vs micropieux. Expert Toulouse Haute-Garonne.',
    keywords: ['fissures escalier', 'tassement différentiel', 'fissure crémaillère', 'fondations maison', 'agrafage mur', 'sol argileux', 'affaissement maison', 'réparation fissures', 'expertise bâtiment', 'RGA Haute-Garonne'],
    content: `
      <div class="mb-8 p-6 bg-orange-50 border-l-4 border-orange-600 rounded-r-lg">
        <p class="font-bold text-orange-900 mb-2">🔍 Le saviez-vous ?</p>
        <p class="text-orange-800">Les fissures en escalier (ou "en crémaillère") représentent <strong>65% des fissures structurelles</strong> que nous diagnostiquons en Haute-Garonne. Elles sont presque toujours liées au phénomène de retrait-gonflement des argiles (RGA), particulièrement violent depuis les sécheresses de 2022-2023.</p>
      </div>

      <h2>Pourquoi vos fissures dessinent-elles un escalier ? L'explication mécanique</h2>
      
      <p>Vous l'avez remarqué : vos fissures ne sont pas droites. Elles <strong>zigzaguent</strong>, suivant les joints de mortier entre les briques ou les parpaings. Pourquoi ce motif si caractéristique ?</p>
      
      <p>Pour comprendre, il faut s'intéresser à la <strong>mécanique des matériaux</strong>. Votre mur est composé de deux éléments :</p>
      <ul>
        <li><strong>Les éléments de maçonnerie</strong> (briques, parpaings) : solides et résistants à la compression</li>
        <li><strong>Les joints de mortier</strong> : plus fragiles, ils constituent le "maillon faible" de la structure</li>
      </ul>
      
      <p>Quand votre maison subit un <strong>tassement différentiel</strong> (une partie s'enfonce plus que l'autre), le mur est soumis à des forces de <strong>cisaillement</strong>. Imaginez qu'on tire sur une partie du mur vers le bas, tandis que l'autre reste en place. Ces forces ne vont pas casser les briques (trop solides), mais elles vont <strong>faire céder les joints</strong>, le long d'une ligne de moindre résistance.</p>
      
      <p>Cette ligne suit naturellement les joints horizontaux ET verticaux, créant le fameux <strong>motif en escalier</strong>.</p>

      <div class="my-8 p-6 bg-blue-50 border border-blue-200 rounded-xl">
        <h3 class="font-bold text-blue-900 mb-4">📐 La physique simplifiée</h3>
        <p class="text-blue-800">Imaginez une pile de briques de LEGO collées ensemble. Si vous tirez vers le bas sur un coin, les briques ne vont pas se casser : c'est la colle entre les briques qui va céder, en suivant les lignes de jonction. C'est exactement ce qui se passe dans votre mur.</p>
        <p class="text-blue-800 mt-3">Le motif en escalier est donc la <strong>signature visuelle</strong> d'un cisaillement, lui-même causé par un mouvement différentiel des fondations.</p>
      </div>

      <h2>Qu'est-ce qu'un tassement différentiel ? (et pourquoi c'est votre problème)</h2>
      
      <h3>La définition technique</h3>
      
      <p>Un <strong>tassement différentiel</strong>, c'est quand une partie de votre maison s'enfonce plus qu'une autre. Au lieu de s'enfoncer uniformément (ce qui poserait moins de problèmes), la maison se <strong>"tord"</strong>.</p>
      
      <p>Concrètement : imaginez que le coin gauche de votre maison s'enfonce de 3 cm, tandis que le coin droit ne bouge pas. Votre maison n'est plus de niveau. Les murs, conçus pour être verticaux, sont maintenant sollicités en diagonale. Ils fissurent.</p>
      
      <h3>Pourquoi "différentiel" ?</h3>
      
      <p>Le mot "différentiel" est clé. Si toute votre maison s'enfonçait de 3 cm uniformément, vous n'auriez probablement pas de fissures (juste une maison un peu plus basse). C'est la <strong>différence</strong> d'enfoncement entre deux points qui crée les contraintes, et donc les fissures.</p>

      <h3>Les chiffres qui comptent</h3>
      
      <div class="my-8 overflow-x-auto">
        <table class="w-full border-collapse border border-slate-300">
          <thead>
            <tr class="bg-slate-100">
              <th class="border border-slate-300 p-4 text-left font-bold">Dénivelé mesuré</th>
              <th class="border border-slate-300 p-4 text-center font-bold">Gravité</th>
              <th class="border border-slate-300 p-4 text-center font-bold">Action recommandée</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border border-slate-300 p-4">< 1 cm sur 10 m</td>
              <td class="border border-slate-300 p-4 text-center text-green-700">Faible</td>
              <td class="border border-slate-300 p-4">Surveillance, possible rebouchage cosmétique</td>
            </tr>
            <tr class="bg-slate-50">
              <td class="border border-slate-300 p-4">1-3 cm sur 10 m</td>
              <td class="border border-slate-300 p-4 text-center text-yellow-700">Modéré</td>
              <td class="border border-slate-300 p-4 font-bold">Agrafage structurel recommandé</td>
            </tr>
            <tr>
              <td class="border border-slate-300 p-4">3-5 cm sur 10 m</td>
              <td class="border border-slate-300 p-4 text-center text-orange-700">Important</td>
              <td class="border border-slate-300 p-4 font-bold">Agrafage + matage des fissures</td>
            </tr>
            <tr class="bg-slate-50">
              <td class="border border-slate-300 p-4">> 5 cm sur 10 m</td>
              <td class="border border-slate-300 p-4 text-center text-red-700">Critique</td>
              <td class="border border-slate-300 p-4 font-bold">Expertise approfondie, micropieux possibles</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Les 5 causes du tassement différentiel en Haute-Garonne</h2>
      
      <h3>1. Le sol argileux et le phénomène RGA (cause n°1)</h3>
      
      <p>C'est LA cause principale dans notre région. Le sol de Haute-Garonne est en grande partie composé d'<strong>argiles gonflantes</strong> (molasses, argiles de décalcification).</p>
      
      <p>Ces argiles ont une propriété particulière : elles <strong>se rétractent</strong> quand elles perdent de l'eau (été, sécheresse), et <strong>gonflent</strong> quand elles se réhydratent (automne, hiver). Ce cycle, appelé <strong>Retrait-Gonflement des Argiles (RGA)</strong>, crée des mouvements de terrain.</p>
      
      <p><strong>Le problème</strong> : Ce mouvement n'est pas uniforme. Si un coin de votre maison est sur une zone plus argileuse, ou plus exposée au soleil, ou près d'un arbre qui pompe l'eau, ce coin va bouger plus que les autres. D'où le tassement différentiel.</p>
      
      <div class="my-6 p-6 bg-red-50 border-l-4 border-red-600 rounded-r-lg">
        <p class="font-bold text-red-900 mb-2">📊 Chiffres clés RGA en Haute-Garonne</p>
        <ul class="text-red-800 space-y-1">
          <li><strong>75%</strong> du territoire classé en aléa moyen à fort</li>
          <li><strong>+200</strong> arrêtés de catastrophe naturelle sécheresse depuis 2018</li>
          <li><strong>2022-2023</strong> : années record de sinistralité fissures</li>
          <li><strong>1 maison sur 5</strong> touchée dans certaines communes (Colomiers, Cugnaux, Muret...)</li>
        </ul>
      </div>
      
      <h3>2. La végétation trop proche (arbres, haies)</h3>
      
      <p>Un arbre à proximité d'une maison peut pomper jusqu'à <strong>300 litres d'eau par jour</strong> dans le sol. Cette eau est prélevée dans la zone racinaire, qui peut s'étendre jusqu'à <strong>1,5 fois la hauteur de l'arbre</strong>.</p>
      
      <p>Résultat : le sol sous une partie de vos fondations s'assèche plus vite que le reste. Le tassement différentiel s'installe.</p>
      
      <p><strong>Arbres particulièrement problématiques</strong> :</p>
      <ul>
        <li><strong>Chênes</strong> : Système racinaire très étendu</li>
        <li><strong>Platanes</strong> : Très gourmands en eau</li>
        <li><strong>Saules</strong> : Racines agressives, cherchent l'eau en profondeur</li>
        <li><strong>Peupliers</strong> : Croissance rapide, fort besoin hydrique</li>
        <li><strong>Marronniers</strong> : Racines superficielles étendues</li>
      </ul>

      <h3>3. Les fuites de canalisation (souvent invisibles)</h3>
      
      <p>Une fuite souterraine (eau, eaux usées) peut <strong>saturer une zone du sol</strong> en eau, créant une poche de sol instable. Le phénomène inverse de la sécheresse, mais avec le même résultat : mouvement de terrain et tassement différentiel.</p>
      
      <p><strong>Indice révélateur</strong> : Si vos fissures sont apparues soudainement, sans lien avec la saison, et que votre facture d'eau a augmenté, suspectez une fuite.</p>
      
      <h3>4. Les fondations inadaptées ou insuffisantes</h3>
      
      <p>Les maisons construites avant les années 90 ont souvent des <strong>fondations superficielles</strong> (50-70 cm de profondeur). À l'époque, les normes ne tenaient pas compte du risque RGA, désormais bien documenté.</p>
      
      <p>Ces fondations reposent dans la <strong>zone de variation saisonnière</strong> du sol (les 2 premiers mètres), là où les mouvements sont les plus importants. Les maisons récentes, avec des fondations plus profondes ou adaptées (semelles filantes renforcées, radier), sont moins touchées.</p>
      
      <h3>5. Les travaux de voirie ou de voisinage</h3>
      
      <p>Des travaux à proximité peuvent perturber la stabilité du sol :</p>
      <ul>
        <li><strong>Fouilles</strong> pour canalisations, fibre optique, gaz</li>
        <li><strong>Vibrations</strong> de chantiers de construction</li>
        <li><strong>Modification du drainage naturel</strong> (nouvelle route, parking imperméabilisé)</li>
        <li><strong>Construction voisine</strong> avec fondations profondes qui "drainent" le sol</li>
      </ul>

      <h2>Comment mesurer vous-même la gravité</h2>
      
      <h3>Méthode 1 : Le test du fil à plomb</h3>
      
      <p>Suspendez un fil à plomb (une ficelle avec un poids) le long du mur fissuré, dans un angle. Si le mur n'est pas vertical (le fil ne touche pas uniformément le mur), vous avez un indice de déformation. Mesurez l'écart en haut et en bas.</p>
      
      <h3>Méthode 2 : Le test du niveau laser</h3>
      
      <p>Placez un niveau laser au centre de la pièce. Projetez une ligne horizontale sur les murs. Mesurez la distance entre la ligne laser et le sol à différents points. Si la différence dépasse 2 cm sur la longueur de la pièce, il y a un affaissement significatif.</p>
      
      <h3>Méthode 3 : Le test de la bille</h3>
      
      <p>Posez une bille (ou un crayon rond) sur le sol. Si elle roule systématiquement dans la même direction, le sol n'est pas de niveau. Simple mais efficace pour détecter un affaissement.</p>
      
      <h3>Méthode 4 : Le témoin de fissure</h3>
      
      <p>Installez un <strong>témoin</strong> sur la fissure : un morceau de plâtre qui chevauche la fissure, ou un simple scotch avec une marque au stylo. Vérifiez chaque semaine. Si le témoin se casse ou si les marques se décalent, <strong>la fissure est active</strong> (elle continue d'évoluer).</p>
      
      <div class="my-8 p-6 bg-yellow-50 border-l-4 border-yellow-600 rounded-r-lg">
        <p class="font-bold text-yellow-900 mb-2">⚠️ Important : fissure active vs fissure stabilisée</p>
        <p class="text-yellow-800">Une fissure <strong>active</strong> évolue encore (le tassement continue). Elle nécessite une intervention urgente.</p>
        <p class="text-yellow-800 mt-2">Une fissure <strong>stabilisée</strong> n'évolue plus (le tassement s'est arrêté). Elle peut être rebouchée après vérification de sa stabilité sur 6-12 mois.</p>
        <p class="text-yellow-800 mt-2"><strong>Dans le doute, faites expertiser.</strong> Un témoin de fissure ne remplace pas un diagnostic professionnel avec mesures instrumentées.</p>
      </div>

      <h2>La solution : l'agrafage structurel (dans 85% des cas)</h2>
      
      <h3>Le principe : "recoudre" votre mur</h3>
      
      <p>L'agrafage, c'est littéralement <strong>recoudre votre mur</strong> avec des aciers. On insère des tiges d'acier inox torsadées (les "agrafes") dans la maçonnerie, perpendiculairement à la fissure. Ces agrafes solidarisent les deux parties du mur qui se séparaient.</p>
      
      <p><strong>La technique pas à pas</strong> :</p>
      <ol>
        <li><strong>Ouverture de la fissure</strong> : On élargit légèrement la fissure pour accéder à la maçonnerie saine.</li>
        <li><strong>Perçage</strong> : Des trous sont forés tous les 40-50 cm de part et d'autre de la fissure.</li>
        <li><strong>Insertion des agrafes</strong> : Des tiges d'acier inox (Ø 6-8 mm) sont enfoncées dans les trous.</li>
        <li><strong>Scellement</strong> : Les agrafes sont scellées avec un mortier de résine haute résistance.</li>
        <li><strong>Rebouchage</strong> : La fissure est comblée avec un mortier fibré élastique.</li>
        <li><strong>Finition</strong> : Enduit de finition pour un rendu esthétique.</li>
      </ol>
      
      <h3>Pourquoi ça fonctionne</h3>
      
      <p>Les agrafes créent une <strong>liaison mécanique</strong> entre les deux parties du mur. Même si le sol continue de bouger légèrement, le mur ne peut plus se fissurer à cet endroit : les agrafes transmettent les efforts sur une plus grande surface.</p>
      
      <p>Le mortier fibré utilisé pour le rebouchage est <strong>élastique</strong> : il peut absorber des micro-mouvements (quelques mm) sans se fissurer. C'est ce qui fait la différence avec un simple rebouchage au plâtre.</p>
      
      <h3>Coût et durée</h3>
      
      <ul>
        <li><strong>Coût moyen</strong> : 80-150€ par mètre linéaire de fissure, soit 8 000€ - 18 000€ pour une façade complète</li>
        <li><strong>Durée d'intervention</strong> : 2 à 5 jours selon l'étendue</li>
        <li><strong>Garantie</strong> : Décennale (10 ans)</li>
        <li><strong>Résultat visible</strong> : Immédiat après finition</li>
      </ul>

      <h2>Quand les micropieux sont-ils vraiment nécessaires ?</h2>
      
      <p>Les micropieux sont une solution plus lourde et plus coûteuse (30 000€ - 60 000€). Ils consistent à ancrer votre maison sur des pieux profonds, au-delà de la zone de variation du sol.</p>
      
      <p><strong>Les micropieux sont justifiés si</strong> :</p>
      <ul>
        <li>Le dénivelé dépasse <strong>5 cm sur 10 mètres</strong></li>
        <li>L'affaissement <strong>continue malgré un agrafage</strong> déjà réalisé</li>
        <li>Les fissures sont <strong>multiples et généralisées</strong> (toutes les façades touchées)</li>
        <li>La maçonnerie est <strong>trop dégradée</strong> pour un agrafage (délitement, pourrissement)</li>
        <li>Un <strong>bureau d'études géotechnique</strong> a confirmé l'instabilité profonde du sol</li>
      </ul>
      
      <p><strong>Dans 85% des cas en Haute-Garonne, l'agrafage suffit</strong>. Si un professionnel vous propose directement des micropieux sans avoir évoqué l'agrafage, demandez des explications techniques (mesures de dénivelé, état de la maçonnerie).</p>

      <h2>Les erreurs à éviter absolument</h2>
      
      <h3>Erreur n°1 : Reboucher sans traiter la cause</h3>
      <p>Le rebouchage cosmétique (mastic, enduit) sans agrafage est une erreur classique. La fissure réapparaîtra en quelques mois, souvent plus large. Vous aurez perdu temps et argent.</p>
      
      <h3>Erreur n°2 : Attendre "pour voir si ça se stabilise"</h3>
      <p>Chaque cycle saisonnier (été sec → hiver humide) aggrave le tassement. Une fissure de 2 mm en 2024 peut devenir une fissure de 5 mm en 2026. Le coût de réparation augmente en conséquence.</p>
      
      <h3>Erreur n°3 : Couper l'arbre sans autres mesures</h3>
      <p>Couper un arbre qui assèche le sol peut sembler logique, mais attention : le sol va se réhydrater et <strong>gonfler</strong>. Sans accompagnement, ce gonflement peut créer de nouvelles fissures (phénomène inverse). Un géotechnicien peut vous conseiller.</p>
      
      <h3>Erreur n°4 : Confondre fissure en escalier et fissure de retrait</h3>
      <p>Les fissures de retrait (faïençage) sont superficielles et forment un réseau de micro-fissures. Elles ne suivent pas les joints. Elles sont généralement sans gravité structurelle. Ne les confondez pas avec les fissures en escalier, qui indiquent un vrai tassement.</p>

      <h2>Conclusion : Vos fissures vous parlent, écoutez-les</h2>
      
      <p>Une fissure en escalier n'est jamais anodine. Elle témoigne d'un mouvement de votre maison, d'un sol qui bouge, d'une structure qui souffre. Plus vous attendez, plus les dégâts s'aggravent, et plus la réparation coûte cher.</p>
      
      <p>La bonne nouvelle : <strong>dans 85% des cas, l'agrafage suffit</strong>. C'est une solution éprouvée, économique (3x moins cher que les micropieux), et garantie décennale.</p>
      
      <p class="font-bold text-lg text-slate-900 mt-6">La question n'est pas "Est-ce que ça va s'arrêter tout seul ?" (réponse : non) mais "Quand vais-je faire expertiser pour savoir ce qu'il faut faire ?"</p>

      <div class="my-8 p-6 bg-orange-50 border border-orange-200 rounded-xl">
        <h3 class="font-bold text-orange-900 mb-3">🎯 Notre expertise chez IPB</h3>
        <p class="text-orange-800">Nous avons traité <strong>plus de 150 cas de fissures en escalier</strong> en Haute-Garonne depuis 2019. Notre diagnostic (149€, déductible sur travaux) inclut :</p>
        <ul class="text-orange-800 mt-3 space-y-1">
          <li>✓ Mesure précise du dénivelé (niveau laser)</li>
          <li>✓ Analyse de l'évolution des fissures (témoins)</li>
          <li>✓ Inspection visuelle complète (intérieur/extérieur)</li>
          <li>✓ Rapport écrit avec recommandations chiffrées</li>
          <li>✓ Conseil sur les démarches assurance (CAT-NAT)</li>
        </ul>
        <p class="text-orange-800 mt-3">Nous ne sommes pas vendeurs de micropieux. Nous proposons la solution <strong>la plus adaptée et la plus économique</strong> pour votre situation.</p>
      </div>
    `
  },
  'garantie-decennale-travaux-structure': {
    slug: 'garantie-decennale-travaux-structure',
    title: 'Garantie Décennale : Le Guide Complet pour Protéger Vos Travaux de Réparation Structurelle',
    excerpt: 'Avant de signer un devis pour des travaux de fissures ou d\'humidité, vous DEVEZ comprendre la garantie décennale. Ce n\'est pas qu\'une formalité : c\'est votre seule protection si les travaux échouent. Voici tout ce qu\'un propriétaire averti doit savoir.',
    date: '2026-10-05',
    readTime: '12 min',
    category: 'conseils',
    author: 'Expert IPB',
    metaDescription: 'Guide complet garantie décennale 2026 : obligation légale, couverture, exclusions, vérification attestation, recours. Protégez vos travaux de réparation fissures et fondations.',
    keywords: ['garantie décennale', 'travaux structure', 'assurance décennale', 'protection travaux', 'fissures', 'attestation décennale', 'loi Spinetta', 'responsabilité constructeur', 'malfaçons', 'recours juridique'],
    content: `
      <div class="mb-8 p-6 bg-orange-50 border-l-4 border-orange-600 rounded-r-lg">
        <p class="font-bold text-orange-900 mb-2">⚖️ Attention : Ce n'est pas une option, c'est la LOI</p>
        <p class="text-orange-800">La garantie décennale est <strong>obligatoire depuis la loi Spinetta de 1978</strong>. Une entreprise qui réalise des travaux structurels SANS attestation décennale valide commet un délit pénal. Et vous, vous n'aurez aucun recours si les travaux échouent.</p>
      </div>

      <h2>Pourquoi cet article va vous faire économiser des milliers d'euros</h2>
      
      <p>Vous êtes sur le point de signer un devis pour réparer les fissures de votre maison. Le montant : 15 000€. L'entreprise vous inspire confiance, le commercial était sympathique. Vous signez.</p>
      
      <p>Trois ans plus tard, <strong>les fissures réapparaissent</strong>. Pire : elles sont plus larges qu'avant. Vous rappelez l'entreprise. Réponse : "Notre assurance décennale n'était pas à jour au moment des travaux." Ou pire : "Nous avons déposé le bilan."</p>
      
      <p><strong>Résultat</strong> : Vous avez perdu 15 000€, et vous devez repayer 20 000€ supplémentaires pour de nouveaux travaux. Total : 35 000€ au lieu de 15 000€.</p>
      
      <p>Ce scénario arrive <strong>plus souvent qu'on ne le pense</strong>. En 2024, la Fédération Française du Bâtiment (FFB) estimait que <strong>8% des entreprises du BTP en Occitanie</strong> travaillaient sans assurance décennale valide. Ce guide vous explique comment vous protéger.</p>

      <h2>Qu'est-ce que la garantie décennale exactement ?</h2>
      
      <h3>Définition juridique (article 1792 du Code civil)</h3>
      
      <p>La garantie décennale est une <strong>responsabilité légale</strong> qui pèse sur tout constructeur. Elle l'oblige à réparer, pendant 10 ans après la réception des travaux, tous les dommages qui :</p>
      
      <ul>
        <li><strong>Compromettent la solidité de l'ouvrage</strong> (effondrement, fissures structurelles, affaissement)</li>
        <li><strong>Rendent l'ouvrage impropre à sa destination</strong> (infiltrations massives, défauts d'étanchéité graves)</li>
        <li><strong>Affectent un élément d'équipement indissociable</strong> (chauffage encastré, canalisations, étanchéité)</li>
      </ul>

      <p>Pour couvrir cette responsabilité, le constructeur doit souscrire une <strong>assurance responsabilité civile décennale (RCD)</strong>. C'est cette assurance qu'on appelle couramment "la décennale".</p>

      <h3>Qui est concerné par l'obligation ?</h3>
      
      <p>Toute personne physique ou morale qui réalise des travaux de construction ou de réparation structurelle :</p>
      
      <ul>
        <li>Les <strong>entrepreneurs du bâtiment</strong> (maçons, couvreurs, plombiers...)</li>
        <li>Les <strong>artisans</strong> (même les auto-entrepreneurs)</li>
        <li>Les <strong>architectes et maîtres d'œuvre</strong></li>
        <li>Les <strong>bureaux d'études techniques</strong></li>
        <li>Les <strong>promoteurs immobiliers</strong></li>
        <li>Les <strong>entreprises spécialisées</strong> (agrafage, micropieux, injection résine, traitement humidité)</li>
      </ul>
      
      <div class="my-8 p-6 bg-blue-50 border border-blue-200 rounded-xl">
        <h3 class="font-bold text-blue-900 mb-4">💡 Cas particulier : les travaux d'agrafage et d'injection</h3>
        <p class="text-blue-800">Les travaux de <strong>stabilisation structurelle</strong> (agrafage de fissures, harpage) et de <strong>traitement de l'humidité</strong> (injection résine, cuvelage) sont <strong>soumis à l'obligation décennale</strong>. Ils affectent la solidité et l'étanchéité de l'ouvrage.</p>
        <p class="text-blue-800 mt-2">Si une entreprise vous dit que "pour ce type de travaux, la décennale n'est pas obligatoire", <strong>c'est faux et c'est un signal d'alarme</strong>.</p>
      </div>

      <h2>Ce que couvre (et ne couvre PAS) la garantie décennale</h2>
      
      <h3>✅ Ce qui EST couvert (exemples concrets)</h3>
      
      <p>Pour des travaux de réparation de fissures ou d'humidité, voici des exemples de dommages couverts :</p>
      
      <ul>
        <li><strong>Les fissures qui réapparaissent</strong> après un agrafage mal réalisé</li>
        <li><strong>Un affaissement qui s'aggrave</strong> malgré les travaux de micropieux</li>
        <li><strong>Des infiltrations qui persistent</strong> après une injection résine</li>
        <li><strong>Un cuvelage qui se décolle</strong> ou qui laisse passer l'eau</li>
        <li><strong>Une VMI qui crée de la condensation</strong> au lieu de l'éliminer (si mal dimensionnée)</li>
        <li><strong>Des murs qui continuent de s'humidifier</strong> malgré le traitement</li>
      </ul>
      
      <h3>❌ Ce qui N'EST PAS couvert (attention aux pièges)</h3>
      
      <ul>
        <li><strong>Les défauts esthétiques</strong> : Une finition mal faite (crépi irrégulier, joints visibles) n'est pas un défaut décennal</li>
        <li><strong>L'usure normale</strong> : Un matériau qui vieillit naturellement après 10 ans n'est pas couvert</li>
        <li><strong>Le défaut d'entretien</strong> : Si vous n'avez pas entretenu les travaux conformément aux préconisations, l'assurance peut refuser</li>
        <li><strong>Les dommages causés par un tiers</strong> : Travaux de voirie, racines d'arbres plantés après les travaux...</li>
        <li><strong>Les travaux réalisés par vous-même</strong> : L'auto-construction n'est pas couverte</li>
      </ul>
      
      <div class="my-8 p-6 bg-red-50 border-l-4 border-red-600 rounded-r-lg">
        <p class="font-bold text-red-900 mb-2">🚨 Piège classique : "C'est juste de l'usure"</p>
        <p class="text-red-800">Si vos fissures réapparaissent 3 ans après les travaux, l'entreprise peut tenter de dire : "C'est l'usure normale". <strong>C'est faux</strong>. Des travaux de stabilisation structurelle sont censés tenir plusieurs décennies. Si le problème revient en moins de 10 ans, c'est un défaut de réalisation, couvert par la décennale.</p>
      </div>

      <h2>Comment vérifier que l'entreprise est vraiment assurée</h2>
      
      <h3>Étape 1 : Demander l'attestation AVANT de signer</h3>
      
      <p>Toute entreprise assurée peut vous fournir une <strong>attestation d'assurance décennale</strong> en moins de 24h. Si elle temporise, c'est mauvais signe.</p>
      
      <p><strong>Ce que l'attestation doit mentionner</strong> :</p>
      <ul>
        <li>Le <strong>nom de l'assureur</strong> (compagnie d'assurance agréée)</li>
        <li>Le <strong>numéro de police</strong></li>
        <li>Les <strong>activités couvertes</strong> (vérifiez que "travaux de maçonnerie", "réparation structurelle" ou "traitement de l'humidité" sont mentionnés)</li>
        <li>La <strong>période de validité</strong> (doit couvrir la date de vos travaux)</li>
        <li>Le <strong>montant de la garantie</strong> (minimum 1 million d'euros généralement)</li>
      </ul>
      
      <h3>Étape 2 : Vérifier l'authenticité de l'attestation</h3>
      
      <p>Les fausses attestations existent. Voici comment les repérer :</p>
      
      <ul>
        <li><strong>Appelez l'assureur</strong> : Le numéro doit figurer sur l'attestation. Demandez confirmation que le contrat est actif.</li>
        <li><strong>Vérifiez les dates</strong> : L'attestation doit être valide au moment des travaux ET pour les 10 années suivantes.</li>
        <li><strong>Comparez avec le SIRET</strong> : Le numéro SIRET sur l'attestation doit correspondre à celui de l'entreprise (vérifiable sur societe.com).</li>
      </ul>
      
      <h3>Étape 3 : Exiger une mention sur le devis ET la facture</h3>
      
      <p>La loi impose que le devis et la facture mentionnent :</p>
      <ul>
        <li>Le nom et l'adresse de l'assureur décennal</li>
        <li>Le numéro du contrat d'assurance</li>
        <li>La couverture géographique du contrat</li>
      </ul>
      
      <p><strong>Si ces mentions sont absentes, le devis/facture est irrégulier</strong>. Vous pouvez refuser de payer tant qu'elles ne sont pas ajoutées.</p>

      <h2>Que faire si les travaux échouent ? (Procédure de recours)</h2>
      
      <h3>Étape 1 : Constater le dommage (dans les 10 ans)</h3>
      
      <p>Dès que vous constatez un problème (fissures qui reviennent, humidité persistante), <strong>documentez</strong> :</p>
      <ul>
        <li>Prenez des <strong>photos datées</strong> (avec un journal du jour visible ou un timestamp)</li>
        <li>Mesurez et notez l'évolution (largeur des fissures, surface humide)</li>
        <li>Conservez tous vos documents (devis, facture, attestation d'assurance, PV de réception)</li>
      </ul>
      
      <h3>Étape 2 : Mise en demeure de l'entreprise</h3>
      
      <p>Envoyez un <strong>courrier recommandé avec AR</strong> à l'entreprise :</p>
      <ul>
        <li>Décrivez le problème constaté</li>
        <li>Rappelez la nature et la date des travaux</li>
        <li>Demandez une intervention corrective sous 15 jours</li>
        <li>Mentionnez que vous vous réservez le droit de faire jouer la garantie décennale</li>
      </ul>
      
      <h3>Étape 3 : Déclaration de sinistre à l'assureur</h3>
      
      <p>Si l'entreprise ne répond pas ou refuse d'intervenir, contactez directement l'assureur décennal (coordonnées sur l'attestation) :</p>
      <ul>
        <li>Remplissez le formulaire de déclaration de sinistre</li>
        <li>Joignez tous vos documents (photos, devis, facture, mise en demeure)</li>
        <li>L'assureur a <strong>60 jours</strong> pour prendre position</li>
      </ul>
      
      <h3>Étape 4 : Si l'assureur refuse (ou si l'entreprise n'était pas assurée)</h3>
      
      <p>Vous avez deux options :</p>
      <ul>
        <li><strong>Saisir le médiateur de l'assurance</strong> (gratuit, délai de 3 mois)</li>
        <li><strong>Saisir le tribunal judiciaire</strong> (action en responsabilité décennale, avec avocat)</li>
      </ul>
      
      <div class="my-8 p-6 bg-green-50 border border-green-200 rounded-xl">
        <h3 class="font-bold text-green-900 mb-4">✅ Votre atout secret : l'assurance dommages-ouvrage (DO)</h3>
        <p class="text-green-800">Si vous avez souscrit une <strong>assurance dommages-ouvrage</strong> avant les travaux (fortement recommandé pour des travaux > 10 000€), elle vous indemnisera <strong>sans attendre</strong> la décision de l'assureur décennal. C'est ensuite votre assureur DO qui se retournera contre l'entreprise.</p>
        <p class="text-green-800 mt-2"><strong>Coût</strong> : Environ 2-3% du montant des travaux. Pour un agrafage à 15 000€, comptez 300-450€.</p>
      </div>

      <h2>Les pièges à éviter absolument</h2>
      
      <h3>Piège n°1 : Payer en liquide "pour éviter la TVA"</h3>
      <p>Aucune trace = aucun recours. En cas de problème, vous n'aurez aucun document pour prouver les travaux. <strong>Payez TOUJOURS par virement ou chèque</strong>, avec une facture conforme.</p>
      
      <h3>Piège n°2 : Ne pas signer de PV de réception</h3>
      <p>Le <strong>procès-verbal de réception</strong> est le document qui officialise la fin des travaux. C'est la date qui fait courir les 10 ans de garantie. Sans PV, la date de départ peut être contestée.</p>
      
      <h3>Piège n°3 : Accepter une "garantie maison" à la place</h3>
      <p>Certaines entreprises proposent une "garantie contractuelle de 5 ans" à la place de la décennale. <strong>Ce n'est pas équivalent</strong>. La garantie décennale est une obligation légale, pas négociable. Refusez.</p>
      
      <h3>Piège n°4 : Ne pas vérifier les exclusions</h3>
      <p>Certaines polices d'assurance excluent certains types de travaux (travaux en sous-œuvre, micropieux...). Vérifiez que vos travaux spécifiques sont bien couverts.</p>

      <h2>Combien coûte la garantie décennale ? (Ce n'est PAS votre problème)</h2>
      
      <p>La garantie décennale coûte à l'entreprise entre <strong>1% et 5% de son chiffre d'affaires annuel</strong>, selon son activité et sa sinistralité. Pour une entreprise de réparation structurelle, comptez environ 3-4%.</p>
      
      <p><strong>Ce coût est inclus dans le prix de vos travaux</strong>. Vous ne payez rien en plus. Si une entreprise vous demande un "supplément pour l'assurance", c'est anormal.</p>
      
      <p>En revanche, si un devis est anormalement bas par rapport aux concurrents (30% moins cher), posez-vous la question : <strong>comment fait-il pour être si peu cher ?</strong> Peut-être en économisant sur l'assurance...</p>

      <h2>Questions fréquentes sur la garantie décennale</h2>
      
      <h3>L'entreprise a fermé. Suis-je couvert ?</h3>
      <p><strong>Oui</strong>. La garantie décennale couvre les travaux, pas l'entreprise. Si l'entreprise fait faillite, vous pouvez contacter directement l'assureur qui était en charge au moment des travaux.</p>
      
      <h3>J'ai fait les travaux moi-même. Suis-je couvert ?</h3>
      <p><strong>Non</strong>. L'auto-construction n'est pas soumise à la décennale (vous ne pouvez pas vous assurer vous-même). Si vous revendez votre bien dans les 10 ans, l'acheteur pourra se retourner contre vous personnellement.</p>
      
      <h3>Les travaux ont plus de 10 ans. Ai-je un recours ?</h3>
      <p><strong>Non pour la décennale</strong>. Mais vous pouvez tenter une action en <strong>responsabilité contractuelle de droit commun</strong> (délai de 5 ans à partir de la découverte du dommage), ou en <strong>responsabilité délictuelle</strong> si dol ou faute lourde prouvée.</p>
      
      <h3>L'entreprise dit que c'est de ma faute (défaut d'entretien). Que faire ?</h3>
      <p>Demandez une <strong>expertise contradictoire</strong>. Vous pouvez faire appel à un expert indépendant (type expert d'assuré) qui établira un rapport technique. Si le défaut d'entretien n'est pas avéré, l'assureur devra prendre en charge.</p>

      <h2>Conclusion : La décennale n'est pas une option, c'est votre bouclier</h2>
      
      <p>Avant de signer le moindre devis pour des travaux de réparation structurelle (fissures, fondations, humidité), vous DEVEZ :</p>
      
      <ol>
        <li><strong>Demander l'attestation décennale</strong> et vérifier qu'elle est valide et couvre vos travaux</li>
        <li><strong>Vérifier les mentions obligatoires</strong> sur le devis (nom assureur, n° police)</li>
        <li><strong>Signer un PV de réception</strong> à la fin des travaux</li>
        <li><strong>Conserver tous les documents</strong> pendant au moins 12 ans</li>
      </ol>
      
      <p>Ces quelques vérifications peuvent vous éviter de perdre des dizaines de milliers d'euros. Ne les négligez jamais.</p>
      
      <p class="font-bold text-lg text-slate-900 mt-6">La question n'est pas "L'entreprise est-elle sympathique ?" mais "L'entreprise est-elle assurée ?"</p>

      <div class="my-8 p-6 bg-orange-50 border border-orange-200 rounded-xl">
        <h3 class="font-bold text-orange-900 mb-3">🎯 Notre engagement chez IPB</h3>
        <p class="text-orange-800">Chez IPB, nous fournissons <strong>systématiquement</strong> notre attestation d'assurance décennale avec chaque devis. Notre couverture inclut spécifiquement les travaux d'agrafage, de harpage, d'injection résine et de traitement de l'humidité. Nous vous remettons également un PV de réception détaillé à la fin de chaque chantier.</p>
        <p class="text-orange-800 mt-2">Vous pouvez vérifier notre attestation directement auprès de notre assureur. C'est votre droit, et c'est normal de l'exercer.</p>
      </div>
    `
  },
  'ventilation-humidite-condensation': {
    slug: 'ventilation-humidite-condensation',
    title: 'VMC, VMI, Ventilation : Le Guide Complet pour Éliminer l\'Humidité de Votre Maison',
    excerpt: 'Moisissures qui reviennent, buée sur les fenêtres, air qui sent le renfermé... Vous avez un problème de ventilation. Mais quelle solution choisir : VMC simple flux, double flux, VMI ? Ce guide expert vous aide à faire le bon choix (et à économiser jusqu\'à 10 000€).',
    date: '2026-11-02',
    readTime: '14 min',
    category: 'humidite',
    author: 'Expert IPB',
    metaDescription: 'Guide complet ventilation maison 2026 : VMC simple flux, double flux, VMI, hygroréglable. Comparatif, prix, installation. Éliminer condensation et moisissures. Expert Toulouse.',
    keywords: ['VMC', 'VMI', 'ventilation maison', 'humidité', 'condensation', 'moisissures', 'VMC double flux', 'VMC hygroréglable', 'renouvellement air', 'qualité air intérieur', 'pont thermique'],
    content: `
      <div class="mb-8 p-6 bg-blue-50 border-l-4 border-blue-600 rounded-r-lg">
        <p class="font-bold text-blue-900 mb-2">💡 Le saviez-vous ?</p>
        <p class="text-blue-800">Une famille de 4 personnes produit <strong>12 litres d'eau par jour</strong> sous forme de vapeur (respiration, cuisine, douches, séchage du linge). Sans ventilation efficace, cette eau se condense sur les murs froids et crée des moisissures. La ventilation n'est pas un luxe : c'est une nécessité sanitaire.</p>
      </div>

      <h2>Votre maison "respire" mal ? Voici comment le savoir</h2>
      
      <p>Vous avez remarqué que vos fenêtres sont couvertes de buée chaque matin. Que des taches noires apparaissent dans les angles de vos plafonds. Que vos murs semblent "humides" au toucher, surtout en hiver. Que vos vêtements dans les placards sentent le moisi.</p>
      
      <p>Avant de penser à des travaux coûteux (injection résine, cuvelage), posez-vous la question : <strong>est-ce que ma maison est correctement ventilée ?</strong></p>
      
      <p>Car voici la vérité que beaucoup ignorent : <strong>dans 60% des cas d'humidité intérieure, le problème vient d'un défaut de ventilation</strong>, pas d'une infiltration ou d'une remontée capillaire. Et traiter une condensation avec de l'injection résine, c'est comme prendre des antibiotiques pour un rhume : inutile et coûteux.</p>

      <h2>Condensation vs Remontée capillaire : le diagnostic crucial</h2>
      
      <p>Ces deux phénomènes produisent des symptômes similaires (humidité, moisissures), mais leurs causes et traitements sont radicalement différents. Se tromper de diagnostic, c'est gaspiller des milliers d'euros.</p>
      
      <div class="my-8 overflow-x-auto">
        <table class="w-full border-collapse border border-slate-300">
          <thead>
            <tr class="bg-slate-100">
              <th class="border border-slate-300 p-4 text-left font-bold">Critère</th>
              <th class="border border-slate-300 p-4 text-center font-bold bg-blue-50">Condensation</th>
              <th class="border border-slate-300 p-4 text-center font-bold bg-orange-50">Remontée capillaire</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border border-slate-300 p-4 font-bold">Localisation</td>
              <td class="border border-slate-300 p-4 text-center">Haut de mur, angles, fenêtres</td>
              <td class="border border-slate-300 p-4 text-center">Bas de mur (< 1m50 du sol)</td>
            </tr>
            <tr class="bg-slate-50">
              <td class="border border-slate-300 p-4 font-bold">Salpêtre</td>
              <td class="border border-slate-300 p-4 text-center text-blue-700">Absent</td>
              <td class="border border-slate-300 p-4 text-center text-orange-700">Présent (poudre blanche)</td>
            </tr>
            <tr>
              <td class="border border-slate-300 p-4 font-bold">Buée fenêtres</td>
              <td class="border border-slate-300 p-4 text-center text-blue-700">Oui, surtout le matin</td>
              <td class="border border-slate-300 p-4 text-center text-orange-700">Non</td>
            </tr>
            <tr class="bg-slate-50">
              <td class="border border-slate-300 p-4 font-bold">Période</td>
              <td class="border border-slate-300 p-4 text-center">Pire en hiver (chauffage)</td>
              <td class="border border-slate-300 p-4 text-center">Constante toute l'année</td>
            </tr>
            <tr>
              <td class="border border-slate-300 p-4 font-bold">Traitement</td>
              <td class="border border-slate-300 p-4 text-center font-bold text-blue-700">Ventilation (VMC/VMI)</td>
              <td class="border border-slate-300 p-4 text-center font-bold text-orange-700">Injection résine</td>
            </tr>
            <tr class="bg-slate-50">
              <td class="border border-slate-300 p-4 font-bold">Coût moyen</td>
              <td class="border border-slate-300 p-4 text-center text-green-700">2 000€ - 5 000€</td>
              <td class="border border-slate-300 p-4 text-center text-red-700">8 000€ - 15 000€</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>Le test simple pour trancher</h3>
      
      <p>Voici un test que vous pouvez faire vous-même :</p>
      
      <ol>
        <li><strong>Collez un carré de plastique transparent</strong> (type sac congélation) sur le mur humide avec du scotch, en le rendant étanche sur les bords.</li>
        <li><strong>Attendez 48-72 heures</strong>.</li>
        <li><strong>Observez</strong> :
          <ul>
            <li>Si l'humidité apparaît <strong>côté mur</strong> (derrière le plastique) → C'est une remontée capillaire ou une infiltration</li>
            <li>Si l'humidité apparaît <strong>côté pièce</strong> (devant le plastique) → C'est de la condensation</li>
      </ul>
        </li>
      </ol>

      <h2>Pourquoi la condensation apparaît (la physique simplifiée)</h2>
      
      <p>L'air chaud peut contenir plus de vapeur d'eau que l'air froid. C'est un fait physique incontournable appelé <strong>point de rosée</strong>.</p>
      
      <p>Exemple concret : L'air de votre salon à 20°C peut contenir jusqu'à 17 grammes d'eau par m³. Si cet air entre en contact avec un mur froid (14°C par exemple), il ne peut plus contenir que 12 grammes d'eau par m³. Les 5 grammes excédentaires <strong>se condensent en gouttelettes</strong> sur le mur.</p>
      
      <p><strong>Trois facteurs aggravent la condensation</strong> :</p>
      
      <h3>1. Une production d'humidité excessive</h3>
      <ul>
        <li>Douches longues et fréquentes sans aération</li>
        <li>Cuisine sans hotte ou hotte sur recyclage</li>
        <li>Séchage du linge à l'intérieur</li>
        <li>Aquarium ouvert</li>
        <li>Nombreuses plantes d'intérieur</li>
      </ul>

      <h3>2. Des parois froides (ponts thermiques)</h3>
      <ul>
        <li>Murs non isolés ou mal isolés</li>
        <li>Fenêtres simple vitrage</li>
        <li>Angles de murs (points froids naturels)</li>
        <li>Linteaux et tableaux de fenêtres non isolés</li>
      </ul>
      
      <h3>3. Une ventilation insuffisante</h3>
      <ul>
        <li>Pas de VMC ou VMC défectueuse</li>
        <li>Bouches d'extraction bouchées</li>
        <li>Entrées d'air obturées (pour "éviter le froid")</li>
        <li>Maison trop étanche (rénovation récente sans ventilation adaptée)</li>
      </ul>

      <h2>Les solutions de ventilation : comparatif complet</h2>
      
      <h3>1. La VMC simple flux autoréglable (la basique)</h3>
      
      <p><strong>Principe</strong> : Un moteur (dans les combles ou la buanderie) aspire l'air vicié par des bouches d'extraction placées dans les pièces humides (cuisine, salle de bain, WC). L'air neuf entre par des grilles dans les menuiseries des pièces de vie.</p>
      
      <div class="my-6 p-6 bg-slate-50 border border-slate-200 rounded-xl">
        <h4 class="font-bold text-slate-900 mb-3">Caractéristiques</h4>
        <ul class="text-slate-700 space-y-2">
          <li><strong>Débit</strong> : Constant (environ 100-150 m³/h pour une maison standard)</li>
          <li><strong>Coût installation</strong> : 500€ - 1 500€</li>
          <li><strong>Consommation</strong> : 20-40€/an</li>
          <li><strong>Entretien</strong> : Nettoyage des bouches 2x/an, changement moteur tous les 15-20 ans</li>
        </ul>
        <p class="text-slate-600 mt-4"><strong>Avantages</strong> : Simple, économique, fiable. Idéale pour les logements standards.</p>
        <p class="text-slate-600 mt-2"><strong>Inconvénients</strong> : Ventile autant quand vous êtes absent que présent → perte de chaleur inutile en hiver.</p>
      </div>
      
      <h3>2. La VMC simple flux hygroréglable (la maligne)</h3>
      
      <p><strong>Principe</strong> : Même principe que l'autoréglable, mais les bouches d'extraction s'ouvrent et se ferment automatiquement en fonction du taux d'humidité ambiant. Quand il y a de la vapeur (douche, cuisine), elles s'ouvrent. Sinon, elles se ferment partiellement.</p>
      
      <div class="my-6 p-6 bg-blue-50 border border-blue-200 rounded-xl">
        <h4 class="font-bold text-blue-900 mb-3">Caractéristiques</h4>
        <ul class="text-blue-800 space-y-2">
          <li><strong>Types</strong> : Hygro A (bouches hygroréglables) ou Hygro B (entrées d'air + bouches hygroréglables)</li>
          <li><strong>Coût installation</strong> : 1 000€ - 2 500€</li>
          <li><strong>Économies chauffage</strong> : 10-15% vs autoréglable</li>
          <li><strong>Consommation</strong> : 15-30€/an</li>
        </ul>
        <p class="text-blue-700 mt-4"><strong>Avantages</strong> : Adapte le débit au besoin réel. Économies de chauffage. Confort accru (moins de courants d'air froid).</p>
        <p class="text-blue-700 mt-2"><strong>Inconvénients</strong> : Légèrement plus chère que l'autoréglable. Capteurs d'humidité à vérifier périodiquement.</p>
      </div>
      
      <h3>3. La VMC double flux (la performante)</h3>
      
      <p><strong>Principe</strong> : L'air extrait passe par un échangeur thermique qui récupère sa chaleur pour préchauffer l'air neuf entrant. Vous récupérez jusqu'à 90% de la chaleur qui serait perdue avec une simple flux.</p>
      
      <div class="my-6 p-6 bg-green-50 border border-green-200 rounded-xl">
        <h4 class="font-bold text-green-900 mb-3">Caractéristiques</h4>
        <ul class="text-green-800 space-y-2">
          <li><strong>Récupération chaleur</strong> : 70-90% selon modèle</li>
          <li><strong>Coût installation</strong> : 4 000€ - 8 000€ (maison neuve), 6 000€ - 12 000€ (rénovation)</li>
          <li><strong>Économies chauffage</strong> : 20-30%</li>
          <li><strong>Filtration</strong> : Filtre l'air entrant (pollens, poussières)</li>
        </ul>
        <p class="text-green-700 mt-4"><strong>Avantages</strong> : Confort thermique optimal. Économies de chauffage importantes. Air filtré (idéal pour allergiques).</p>
        <p class="text-green-700 mt-2"><strong>Inconvénients</strong> : Coût élevé. Installation complexe (gaines d'air dans toute la maison). Entretien régulier (filtres à changer tous les 6 mois).</p>
      </div>
      
      <h3>4. La VMI - Ventilation Mécanique par Insufflation (l'alternative)</h3>
      
      <p><strong>Principe</strong> : À l'inverse de la VMC, la VMI <strong>insuffle</strong> de l'air neuf (filtré et légèrement préchauffé) dans la maison. L'air vicié est chassé par surpression vers l'extérieur via les défauts d'étanchéité naturels du bâtiment.</p>
      
      <div class="my-6 p-6 bg-orange-50 border border-orange-200 rounded-xl">
        <h4 class="font-bold text-orange-900 mb-3">Caractéristiques</h4>
        <ul class="text-orange-800 space-y-2">
          <li><strong>Installation</strong> : Un seul point d'insufflation (combles ou pièce centrale)</li>
          <li><strong>Coût installation</strong> : 2 500€ - 5 000€</li>
          <li><strong>Préchauffage</strong> : L'air est porté à 15-18°C avant insufflation</li>
          <li><strong>Idéal pour</strong> : Rénovation (pas besoin de gaines dans toute la maison)</li>
        </ul>
        <p class="text-orange-700 mt-4"><strong>Avantages</strong> : Installation simple en rénovation. Crée une légère surpression qui "repousse" l'humidité vers l'extérieur. Filtre l'air entrant.</p>
        <p class="text-orange-700 mt-2"><strong>Inconvénients</strong> : Efficacité moindre si maison très étanche. Consommation électrique légèrement supérieure (résistance de chauffe).</p>
      </div>

      <div class="my-8 p-6 bg-yellow-50 border-l-4 border-yellow-600 rounded-r-lg">
        <p class="font-bold text-yellow-900 mb-2">⚠️ Attention au "tout VMI"</p>
        <p class="text-yellow-800">Certaines entreprises proposent la VMI comme solution miracle contre <strong>tous</strong> les problèmes d'humidité. C'est faux. La VMI est excellente contre la condensation, mais <strong>inefficace contre les remontées capillaires</strong>. Si vous avez du salpêtre en pied de mur, la VMI ne résoudra pas le problème.</p>
      </div>

      <h2>Quelle solution pour votre situation ?</h2>
      
      <h3>Cas 1 : Construction neuve ou rénovation lourde</h3>
      <p><strong>Recommandation</strong> : VMC double flux si budget disponible (+ 5 000€ vs simple flux), sinon VMC hygro B.</p>
      <p>Dans une maison neuve ou entièrement rénovée, vous pouvez prévoir les gaines dès la conception. La double flux est un investissement rentable sur 10-15 ans grâce aux économies de chauffage.</p>
      
      <h3>Cas 2 : Maison ancienne, rénovation légère</h3>
      <p><strong>Recommandation</strong> : VMI ou VMC simple flux hygroréglable.</p>
      <p>La VMI est souvent le meilleur compromis : installation simple (un seul point), efficacité prouvée contre la condensation, coût raisonnable. Si vous avez déjà des gaines VMC, optez pour une rénovation du système existant.</p>
      
      <h3>Cas 3 : Appartement</h3>
      <p><strong>Recommandation</strong> : VMC collective (copropriété) ou extracteur individuel hygroréglable.</p>
      <p>En appartement, la VMC est souvent collective. Vérifiez que votre système fonctionne (test du papier : un mouchoir doit "coller" devant la bouche d'extraction). Si non, signalez au syndic.</p>
      
      <h3>Cas 4 : Condensation + remontées capillaires (problème mixte)</h3>
      <p><strong>Recommandation</strong> : Traitement combiné injection résine + VMI.</p>
      <p>C'est le cas le plus complexe. Il faut traiter les deux problèmes : injection résine pour stopper les remontées, puis VMI pour évacuer l'humidité résiduelle et accélérer le séchage des murs.</p>

      <h2>L'erreur fatale : obturer les entrées d'air "pour avoir moins froid"</h2>
      
      <p>Chaque hiver, la même erreur se répète. Des propriétaires, pour "éviter les courants d'air", <strong>bouchent les grilles d'entrée d'air</strong> de leurs fenêtres. Résultat : en quelques semaines, l'humidité explose, les moisissures apparaissent, et ils appellent un expert en pensant avoir des infiltrations.</p>
      
      <p><strong>Explication</strong> : Une VMC (ou VMI) est un système en équilibre. Elle extrait l'air vicié ET elle a besoin d'air neuf pour le remplacer. Si vous bloquez les entrées d'air :</p>
      <ul>
        <li>La VMC tourne dans le vide (elle n'extrait plus rien, ou très peu)</li>
        <li>L'humidité s'accumule</li>
        <li>La qualité de l'air se dégrade (CO2, polluants)</li>
        <li>La condensation explose</li>
      </ul>
      
      <p class="font-bold text-lg text-slate-900 my-6">Si vous avez froid à cause des entrées d'air, la solution n'est pas de les boucher, mais d'améliorer l'isolation ou de passer à une VMC double flux (qui préchauffe l'air entrant).</p>

      <h2>Coûts et aides financières (2026)</h2>
      
      <h3>Récapitulatif des coûts</h3>
      
      <ul>
        <li><strong>VMC simple flux autoréglable</strong> : 500€ - 1 500€ posée</li>
        <li><strong>VMC simple flux hygroréglable</strong> : 1 000€ - 2 500€ posée</li>
        <li><strong>VMC double flux</strong> : 4 000€ - 12 000€ posée (selon complexité)</li>
        <li><strong>VMI</strong> : 2 500€ - 5 000€ posée</li>
      </ul>
      
      <h3>Aides disponibles</h3>
      
      <p>L'installation d'une VMC performante (double flux ou hygro B) peut bénéficier d'aides :</p>
      <ul>
        <li><strong>MaPrimeRénov'</strong> : Jusqu'à 2 500€ pour une VMC double flux (selon revenus)</li>
        <li><strong>CEE (Certificats d'Économies d'Énergie)</strong> : Prime variable selon fournisseur (souvent 200-500€)</li>
        <li><strong>TVA réduite à 5,5%</strong> : Pour les travaux d'amélioration énergétique</li>
        <li><strong>Éco-PTZ</strong> : Prêt à taux zéro si la VMC fait partie d'un bouquet de travaux</li>
      </ul>

      <h2>Questions fréquentes</h2>
      
      <h3>Ma VMC fait du bruit. Est-ce normal ?</h3>
      <p>Un léger souffle est normal. En revanche, des bruits de vibration, de claquement ou de sifflement indiquent un problème : moteur usé, gaine déconnectée, entrée d'air obstruée. Faites vérifier par un professionnel.</p>
      
      <h3>Dois-je couper ma VMC en vacances ?</h3>
      <p><strong>Non</strong>. La VMC doit tourner 24h/24. Même en votre absence, l'humidité s'accumule (plantes, humidité résiduelle dans les matériaux). Une VMC hygroréglable réduira automatiquement son débit.</p>
      
      <h3>La VMI fonctionne-t-elle contre le radon ?</h3>
      <p><strong>Oui</strong>. En créant une surpression, la VMI empêche le radon (gaz radioactif naturel) de remonter du sol. C'est une solution recommandée dans les zones à risque radon (certaines communes de Haute-Garonne sont concernées).</p>
      
      <h3>Puis-je installer une VMC moi-même ?</h3>
      <p>Une VMC simple flux autoréglable peut être installée par un bricoleur expérimenté. En revanche, pour une VMC double flux ou une VMI, l'installation par un professionnel est fortement recommandée (dimensionnement, équilibrage du réseau, étanchéité). De plus, pour bénéficier des aides, l'installation doit être réalisée par un artisan RGE.</p>

      <h2>Conclusion : La ventilation, c'est la santé de votre maison (et la vôtre)</h2>
      
      <p>Une maison mal ventilée, c'est :</p>
      <ul>
        <li>Des moisissures qui reviennent sans cesse</li>
        <li>Des allergies et problèmes respiratoires</li>
        <li>Des factures de chauffage qui explosent (air humide = sensation de froid)</li>
        <li>Une dégradation accélérée des matériaux (bois, plâtre, peintures)</li>
      </ul>
      
      <p>Avant de vous lancer dans des travaux coûteux d'injection résine ou de cuvelage, <strong>faites diagnostiquer votre ventilation</strong>. Dans 60% des cas, c'est là que se trouve la solution.</p>
      
      <p class="font-bold text-lg text-slate-900 mt-6">La question n'est pas "Ai-je besoin d'une VMC ?" mais "Quelle ventilation est adaptée à ma maison ?"</p>

      <div class="my-8 p-6 bg-blue-50 border border-blue-200 rounded-xl">
        <h3 class="font-bold text-blue-900 mb-3">🎯 Notre approche chez IPB</h3>
        <p class="text-blue-800">Chez IPB, nous ne vendons pas de VMC. Mais nous savons <strong>diagnostiquer l'origine de votre humidité</strong>. Si c'est de la condensation, nous vous orienterons vers un spécialiste ventilation (nous avons des partenaires de confiance). Si c'est une remontée capillaire, nous interviendrons avec nos solutions d'injection résine.</p>
        <p class="text-blue-800 mt-2">Notre diagnostic (149€, déductible sur travaux) vous permet d'avoir <strong>la bonne réponse avant de dépenser</strong>. Pas de vente forcée, juste un diagnostic honnête.</p>
      </div>
    `
  },
  'fissure-ouverture-porte-fenetre': {
    slug: 'fissure-ouverture-porte-fenetre',
    title: 'Portes qui coincent + fissures : le signal d\'alarme à ne JAMAIS ignorer',
    excerpt: 'Quand une porte frotte ET qu\'une fissure apparaît au même moment, ce n\'est JAMAIS un hasard. C\'est le signe que votre maison bouge. Voici comment relier ces signaux et stabiliser avant que ça s\'aggrave (et coûte 3x plus cher).',
    date: '2026-05-20',
    readTime: '9 min',
    category: 'fissures',
    author: 'Expert IPB',
    metaDescription: 'Porte qui coince + fissures simultanées : signes d\'un mouvement structurel actif. Diagnostic, causes (tassement), solutions (agrafage). Expert Toulouse.',
    keywords: ['portes qui coincent', 'fissures', 'mouvement structurel', 'toulouse', 'diagnostic maison', 'tassement différentiel'],
    content: `
      <div class="mb-8 p-6 bg-red-50 border-l-4 border-red-600 rounded-r-lg">
        <p class="font-bold text-red-900 mb-2">🚨 Alerte : Ne sous-estimez jamais ce signal</p>
        <p class="text-red-800">Quand une porte se met à frotter ET qu'une fissure apparaît au même moment, c'est le signe que <strong>votre structure est en train de bouger activement</strong>. Chaque jour qui passe aggrave la situation. Ne faites pas l'erreur d'attendre "pour voir si ça s'arrange".</p>
      </div>

      <h2>Votre porte frotte depuis quelques semaines ? Et maintenant cette fissure...</h2>
      
      <p>Vous avez d'abord remarqué que votre porte d'entrée ou de chambre frottait un peu. Vous vous êtes dit : <strong>"C'est le bois qui a gonflé avec l'humidité."</strong> Vous avez raboté un peu. Ça allait mieux.</p>

      <p>Et puis, il y a quelques jours, vous avez vu <strong>cette fissure</strong> sur le mur à côté de la porte. Verticale, ou en escalier. Pas énorme, mais bien visible. Et là, quelque chose vous a alerté : <strong>"Ces deux problèmes sont-ils liés ?"</strong></p>

      <p><strong>Oui. Ils le sont.</strong> Et c'est très mauvais signe.</p>

      <h2>Pourquoi une porte qui coince indique que votre maison bouge</h2>
      
      <p>Prenons un instant pour comprendre <strong>comment fonctionne une porte</strong> dans une maison.</p>

      <p>Votre porte est fixée dans un <strong>huisserie (cadre) rigide</strong>, lui-même scellé dans la maçonnerie. Tant que le mur reste parfaitement vertical et stable, la porte ouvre et ferme sans problème. Elle a un jeu de quelques millimètres, conçu pour absorber les variations thermiques.</p>

      <p>Mais si <strong>le mur se déforme</strong>, même très légèrement, l'huisserie se tord. Et la porte, qui ne peut pas se tordre, <strong>frotte contre le cadre</strong>.</p>

      <div class="my-8 p-6 bg-blue-50 border border-blue-200 rounded-xl">
        <h3 class="font-bold text-blue-900 mb-3">💡 Ce que ça signifie concrètement</h3>
        <p class="text-blue-800"><strong>Si votre porte frotte en haut à gauche</strong>, c'est que l'angle haut gauche du mur s'est déformé (affaissement ou déformation angulaire).</p>
        <p class="text-blue-800 mt-2"><strong>Si votre porte frotte sur toute la hauteur</strong>, c'est que le mur s'est incliné latéralement.</p>
        <p class="text-blue-800 mt-2"><strong>Si votre porte ne ferme plus du tout</strong>, c'est que la déformation est importante (> 1 cm).</p>
      </div>

      <h2>Le lien direct entre frottement de porte et fissures</h2>
      
      <p>Maintenant, ajoutons la fissure à l'équation.</p>

      <p>Quand un mur se déforme, il subit des <strong>contraintes de traction et de cisaillement</strong>. La maçonnerie n'est pas élastique : elle ne peut pas se tordre sans casser. C'est pour ça qu'elle fissure.</p>

      <p><strong>Chronologie typique</strong> :</p>
      <ol>
        <li><strong>Semaine 1-2</strong> : La fondation commence à bouger (sol argileux qui se rétracte, par exemple). Vous ne voyez rien encore.</li>
        <li><strong>Semaine 3-4</strong> : Le mur se déforme légèrement. Votre porte commence à frotter. Vous pensez que c'est l'humidité.</li>
        <li><strong>Semaine 5-8</strong> : La contrainte s'accumule dans le mur. Une fissure apparaît, souvent <strong>près de la porte ou dans l'angle</strong>.</li>
        <li><strong>Mois 2-3</strong> : La fissure s'élargit. Le frottement s'aggrave. Des signes collatéraux apparaissent (carrelage qui se fissure, joints qui s'ouvrent).</li>
      </ol>

      <p class="font-bold text-lg text-slate-900 my-6">Si vous êtes à l'étape 3-4, <strong>vous êtes encore à temps pour limiter les dégâts</strong>. Mais il faut agir maintenant.</p>

      <h2>Les autres signes qui confirment que votre maison travaille</h2>
      
      <p>Une porte qui frotte + une fissure, c'est déjà deux signaux convergents. Mais voici <strong>les autres signes</strong> qui, s'ils sont présents, confirment à 100% que votre structure bouge :</p>

      <ul>
        <li><strong>Plusieurs portes coincent en même temps</strong> (même côté de la maison)</li>
        <li><strong>Les fenêtres ne ferment plus correctement</strong> (ou sont difficiles à ouvrir)</li>
        <li><strong>Le carrelage se fissure ou se soulève</strong> (surtout dans le couloir ou la cuisine)</li>
        <li><strong>Les joints de carrelage s'ouvrent</strong> (écart visible entre les carreaux)</li>
        <li><strong>Les plinthes se décollent</strong> (surtout dans les angles)</li>
        <li><strong>Vous entendez des craquements</strong> (surtout la nuit, quand tout est calme)</li>
        <li><strong>Une autre fissure apparaît</strong> (souvent de l'autre côté de la même pièce)</li>
      </ul>

      <div class="my-8 p-6 bg-yellow-50 border-l-4 border-yellow-600 rounded-r-lg">
        <p class="font-bold text-yellow-900 mb-2">⚠️ Attention au "diagnostic à distance"</p>
        <p class="text-yellow-800">Certains signes peuvent être trompeurs. Par exemple, une porte qui frotte <strong>uniquement en hiver</strong> peut être due au gonflement du bois avec l'humidité. Mais si elle frotte <strong>toute l'année</strong> et que la fissure est apparue récemment, c'est structurel.</p>
      </div>

      <h2>Pourquoi ça arrive ? Les vraies causes du mouvement structurel</h2>
      
      <h3>1. Le sol argileux toulousain (la cause n°1)</h3>
      <p>Le sol de Toulouse et de la Haute-Garonne est composé d'<strong>argile gonflante</strong>. En période de sécheresse, l'argile se rétracte. Résultat : le sol sous vos fondations "s'affaisse" de quelques centimètres. Votre maison suit ce mouvement, créant un tassement différentiel.</p>

      <h3>2. Un arbre trop proche</h3>
      <p>Un platane, un chêne ou un saule à moins de 5 mètres de votre façade ? Ses racines pompent l'eau du sol, asséchant le terrain sous vos fondations. Ce phénomène est <strong>aggravé en été</strong>.</p>

      <h3>3. Travaux de voirie à proximité</h3>
      <p>Des travaux de canalisation, de forage ou de terrassement dans votre rue peuvent perturber la stabilité du sol et déclencher un mouvement.</p>

      <h3>4. Fondations superficielles (maisons anciennes)</h3>
      <p>Les maisons des années 70-80 ont souvent des fondations peu profondes (50-60 cm). Elles sont plus sensibles aux variations du sol.</p>

      <h2>Comment confirmer le diagnostic (avant d'appeler un expert)</h2>
      
      <h3>Étape 1 : Le test du scotch (ou fissuromètre papier)</h3>
      <p>Collez un morceau de scotch large (type scotch d'emballage) sur la fissure. Tracez une ligne au stylo qui coupe le scotch et la fissure. Si au bout de 2-3 semaines, la ligne est décalée, <strong>la fissure évolue</strong>.</p>

      <h3>Étape 2 : Le test de la porte</h3>
      <p>Tracez un repère au crayon sur le cadre de la porte et sur la porte elle-même, au niveau du frottement. Si dans 1 mois le décalage augmente, <strong>la déformation s'aggrave</strong>.</p>

      <h3>Étape 3 : Le test du niveau</h3>
      <p>Posez un niveau à bulle sur le sol, le long du mur fissuré. Si vous constatez un dénivelé > 1 cm sur 2 mètres, <strong>il y a un affaissement</strong>.</p>

      <h3>Étape 4 : Inspection générale</h3>
      <p>Faites le tour de la maison et cherchez d'autres signes : fissures extérieures, joints ouverts, carrelage fissuré, autres portes qui coincent.</p>

      <div class="my-8 p-6 bg-slate-900 text-white rounded-xl">
        <h3 class="font-bold text-xl mb-3">📋 Si au moins 2 de ces tests sont positifs</h3>
        <p class="text-slate-300"><strong>Votre maison bouge activement.</strong> Ne perdez plus de temps. Un diagnostic professionnel s'impose dans les 15 jours. Plus vous attendez, plus la réparation sera coûteuse (et complexe).</p>
      </div>

      <h2>La solution : l'agrafage (avant que ça ne coûte 3x plus cher)</h2>
      
      <p>Si votre diagnostic confirme que la structure bouge, <strong>le rebouchage ne servira à rien</strong>. Il faut stabiliser la structure.</p>

      <h3>L'agrafage : recoudre votre mur pour stopper le mouvement</h3>
      
      <p>L'agrafage consiste à <strong>recoudre votre mur</strong> avec des aciers torsadés. Ces aciers relient les deux parties du mur qui se séparent, lui redonnant sa cohérence monolithique.</p>

      <p><strong>Pourquoi ça fonctionne</strong> : Une fois agraffé, le mur retrouve sa rigidité. Même si le sol continue de bouger légèrement, le mur résiste sans se fissurer à nouveau.</p>

      <h3>Coût et durée</h3>
      <ul>
        <li><strong>Coût moyen</strong> : 12 000€ - 18 000€ pour une façade complète</li>
        <li><strong>Durée</strong> : 3 à 5 jours</li>
        <li><strong>Garantie</strong> : Décennale (10 ans)</li>
      </ul>

      <h2>Le piège à éviter : raboter la porte sans traiter la cause</h2>
      
      <p>Vous avez raboté la porte ? <strong>Erreur.</strong> Dans 6 mois, elle frottera à nouveau, et la fissure sera plus large. Vous aurez perdu du temps et de l'argent.</p>

      <p><strong>La seule approche efficace</strong> : Stabiliser la structure (agrafage), puis ajuster la porte si nécessaire (souvent, elle redevient fonctionnelle une fois la structure stabilisée).</p>

      <h2>Conclusion : votre porte vous parle, écoutez-la</h2>
      
      <p>Une porte qui coince + une fissure = <strong>votre maison vous envoie un SOS</strong>. Ne l'ignorez pas. Ne tentez pas de "bricoler" une solution temporaire.</p>

      <p><strong>Notre conseil d'expert</strong> : Un diagnostic précis (149€, déductible sur travaux) vous dira en 1h30 si votre maison bouge, pourquoi, et quelle solution est adaptée. Cette expertise vous évitera soit une panique inutile, soit une catastrophe évitable (et des réparations qui coûtent 3x plus cher).</p>

      <p class="font-bold text-lg text-slate-900 mt-6">La question n'est pas "Est-ce grave ?" mais "Quand dois-je agir ?"</p>

      <div class="my-8 p-6 bg-orange-50 border border-orange-200 rounded-xl">
        <h3 class="font-bold text-orange-900 mb-3">🎯 Action immédiate recommandée</h3>
        <p class="text-orange-800">Si vous lisez cet article parce que vous avez ce problème <strong>en ce moment</strong>, ne perdez pas une semaine de plus. Demandez un diagnostic dans les 15 jours. Le coût d'un diagnostic (149€) est dérisoire face au surcoût d'une réparation tardive (+ 5 000€ à 10 000€).</p>
      </div>
    `
  },
  'secheresse-argile-haute-garonne': {
    slug: 'secheresse-argile-haute-garonne',
    title: 'Sol argileux et sécheresse en Haute-Garonne : le cycle infernal qui fissure votre maison',
    excerpt: 'Les sols argileux de Toulouse se rétractent en été et gonflent en hiver, créant un cycle destructeur pour vos fondations. Après les sécheresses 2022-2023, des milliers de maisons se fissurent. Voici pourquoi, et surtout : comment protéger votre patrimoine.',
    date: '2026-06-28',
    readTime: '10 min',
    category: 'expertise',
    author: 'Expert IPB',
    metaDescription: 'Sol argileux et sécheresse Haute-Garonne : pourquoi les fondations bougent, le cycle retrait-gonflement, Cat-Nat 2022-2023, solutions (agrafage). Expert Toulouse.',
    keywords: ['sol argileux', 'sécheresse', 'haute-garonne', 'fondations', 'fissures', 'catastrophe naturelle', 'retrait-gonflement'],
    content: `
      <div class="mb-8 p-6 bg-orange-50 border-l-4 border-orange-600 rounded-r-lg">
        <p class="font-bold text-orange-900 mb-2">🌡️ Été 2022-2023 : années record</p>
        <p class="text-orange-800">Les sécheresses historiques de 2022 et 2023 ont provoqué un <strong>record de tassements différentiels</strong> en Haute-Garonne. Des milliers de maisons toulousaines ont développé des fissures structurelles. Si votre maison a moins de 30 ans et qu'elle se fissure, il y a 90% de chances que ce soit lié au sol argileux.</p>
      </div>

      <h2>Le sol argileux toulousain : un ennemi invisible (et redoutable)</h2>
      
      <p>Vous avez acheté votre maison il y a 10 ans. Tout allait bien. Et puis, depuis 2022, vous voyez <strong>ces fissures</strong> apparaître. Sur la façade, dans les angles, en escalier. Vous vous demandez : <strong>"Pourquoi maintenant ?"</strong></p>

      <p>La réponse : <strong>le sol argileux sur lequel est construite votre maison</strong>. Un sol qui, en apparence stable, est en réalité soumis à un cycle permanent de <strong>retrait et gonflement</strong> qui, sur le long terme, déstabilise vos fondations.</p>

      <h2>Le cycle retrait-gonflement des argiles : explication scientifique (simplifiée)</h2>
      
      <p>Les argiles sont des minéraux <strong>hydrophiles</strong> : ils absorbent l'eau comme une éponge. Quand il pleut, l'argile se gorge d'eau et <strong>gonfle</strong>. Quand il fait sec, l'argile perd son eau et <strong>se rétracte</strong>.</p>

      <p>Ce phénomène, appelé <strong>retrait-gonflement des argiles (RGA)</strong>, est naturel. Mais il devient problématique quand il est <strong>non-uniforme</strong> sous votre maison. C'est-à-dire quand une partie du sol se rétracte plus que l'autre, créant un <strong>tassement différentiel</strong>.</p>

      <div class="my-8 p-6 bg-blue-50 border border-blue-200 rounded-xl">
        <h3 class="font-bold text-blue-900 mb-4">📐 Chiffres clés du phénomène</h3>
        <ul class="list-disc ml-6 text-blue-800 space-y-2">
          <li><strong>Amplitude du mouvement</strong> : 2 à 5 cm de variation verticale en surface selon les années</li>
          <li><strong>Profondeur affectée</strong> : Les 2 premiers mètres de sol (zone des fondations superficielles)</li>
          <li><strong>Vitesse</strong> : Cycle annuel (sécheresse en été, réhydratation en hiver)</li>
          <li><strong>Zone à risque</strong> : 75% du territoire toulousain classé en "aléa moyen à fort"</li>
        </ul>
      </div>

      <h2>Pourquoi votre maison fissure MAINTENANT (et pas avant)</h2>
      
      <h3>1. Les sécheresses record 2022-2023</h3>
      <p>L'été 2022 a été le plus sec jamais enregistré en Haute-Garonne. L'été 2023 l'a confirmé. Résultat : <strong>le sol argileux s'est rétracté de manière exceptionnelle</strong>, créant des affaissements brutaux sous les fondations.</p>

      <h3>2. L'effet cumulatif</h3>
      <p>Votre maison a résisté pendant 10 ans parce que les cycles de retrait-gonflement étaient modérés. Mais <strong>chaque cycle ajoute une contrainte</strong>. Et au bout de X cycles, la maçonnerie cède : la fissure apparaît.</p>

      <h3>3. Les arbres qui ont grandi</h3>
      <p>Vous avez planté un platane il y a 15 ans ? Il mesure maintenant 10 mètres de haut. Ses racines puisent l'eau jusqu'à 5 mètres de profondeur, <strong>asséchant le sol sous vos fondations</strong>. En été, ce phénomène s'aggrave : l'arbre pompe toute l'eau disponible, créant un vide sous votre maison.</p>

      <h2>Les 3 phases du tassement différentiel lié à l'argile</h2>
      
      <h3>Phase 1 : Le retrait (été - sécheresse)</h3>
      <p>En période de sécheresse, l'argile perd son eau et se rétracte. Si le sol sous votre maison n'est pas homogène (présence de poches d'argile plus ou moins concentrées), certaines parties se rétractent plus que d'autres. <strong>Votre maison se tord</strong>.</p>

      <h3>Phase 2 : Le gonflement (hiver - pluies)</h3>
      <p>En période de pluies, l'argile se réhydrate et gonfle. Mais ce gonflement n'est <strong>jamais exactement à l'identique</strong>. La maison ne retrouve pas sa position initiale. Elle se tord dans l'autre sens, accumulant de nouvelles contraintes.</p>

      <h3>Phase 3 : La fissure (point de rupture)</h3>
      <p>Après X cycles (généralement 5 à 15 ans), la maçonnerie cède. Une fissure apparaît, souvent en escalier (le long des joints). C'est le <strong>point de rupture</strong>. La structure ne peut plus absorber les contraintes.</p>

      <div class="my-8 p-6 bg-red-50 border-l-4 border-red-600 rounded-r-lg">
        <p class="font-bold text-red-900 mb-2">🚨 Une fois la fissure apparue</p>
        <p class="text-red-800">Chaque nouveau cycle de retrait-gonflement <strong>aggrave la fissure</strong>. Elle s'élargit, s'allonge, et d'autres fissures apparaissent. C'est un processus auto-aggravant. Il ne s'arrêtera pas tout seul. Seule une intervention structurelle (agrafage) peut stopper le phénomène.</p>
      </div>

      <h2>Les zones les plus à risque en Haute-Garonne</h2>
      
      <p>Toutes les communes toulousaines ne sont pas égales face au risque argileux. Voici la carte des risques (selon le Bureau de Recherches Géologiques et Minières - BRGM) :</p>

      <h3>🔴 Aléa FORT (risque maximum)</h3>
      <ul>
        <li>Toulouse (centre-ville, Minimes, Roseraie, Croix-Daurade)</li>
        <li>Colomiers</li>
        <li>Tournefeuille</li>
        <li>Cugnaux</li>
        <li>Balma</li>
        <li>L'Union</li>
      </ul>

      <h3>🟠 Aléa MOYEN (risque significatif)</h3>
      <ul>
        <li>Blagnac</li>
        <li>Plaisance-du-Touch</li>
        <li>Ramonville-Saint-Agne</li>
        <li>Saint-Orens-de-Gameville</li>
        <li>Portet-sur-Garonne</li>
      </ul>

      <div class="my-8 p-6 bg-yellow-50 border-l-4 border-yellow-600 rounded-r-lg">
        <p class="font-bold text-yellow-900 mb-2">💡 Vérifiez votre commune</p>
        <p class="text-yellow-800">Rendez-vous sur <a href="https://www.georisques.gouv.fr" class="underline">Géorisques.gouv.fr</a> et entrez votre adresse. Vous saurez instantanément si votre maison est en zone à risque (et si votre commune a été classée en "catastrophe naturelle sécheresse").</p>
      </div>

      <h2>Les facteurs aggravants (et comment les limiter)</h2>
      
      <h3>1. Les arbres trop proches</h3>
      <p><strong>Distance de sécurité recommandée</strong> : 1,5x la hauteur adulte de l'arbre. Un platane qui fera 15 m de haut doit être planté à minimum 22 mètres de votre façade. Sinon, ses racines assècheront le sol sous vos fondations.</p>

      <p><strong>Que faire si l'arbre est déjà là ?</strong> Abattage si possible. Sinon, arrosage compensatoire en été (100L/semaine autour du tronc pour limiter le pompage vers les fondations).</p>

      <h3>2. Les fondations superficielles</h3>
      <p>Les maisons des années 70-80 ont souvent des fondations peu profondes (50-70 cm). Elles sont directement dans la zone de retrait-gonflement. <strong>Solution</strong> : Renforcement par agrafage (redonne de la rigidité à la structure).</p>

      <h3>3. Les canalisations qui fuient</h3>
      <p>Une fuite d'eau sous votre maison crée une zone saturée d'eau, entourée de zones sèches. <strong>Résultat</strong> : tassement différentiel. Vérifiez vos canalisations tous les 5 ans.</p>

      <h3>4. Les travaux de voirie</h3>
      <p>Des travaux de canalisation, de forage ou de terrassement dans votre rue peuvent perturber la nappe phréatique et modifier l'équilibre hydrique du sol. Si des fissures apparaissent après des travaux, demandez un diagnostic.</p>

      <h2>Catastrophe naturelle "sécheresse" : comment faire jouer votre assurance</h2>
      
      <p>Bonne nouvelle : Si votre commune a été classée en <strong>catastrophe naturelle "sécheresse"</strong>, votre assurance habitation peut prendre en charge une partie des travaux de réparation.</p>

      <h3>Comment ça marche ?</h3>
      <ol>
        <li><strong>Vérifiez le classement</strong> : Rendez-vous sur Géorisques.gouv.fr et vérifiez si votre commune a été classée Cat-Nat pour les années concernées (2022-2023 pour la Haute-Garonne).</li>
        <li><strong>Déclarez le sinistre</strong> : Contactez votre assurance sous 10 jours après la publication de l'arrêté Cat-Nat au Journal Officiel.</li>
        <li><strong>Fournissez un diagnostic</strong> : Un expert indépendant doit constater les dégâts et établir un rapport.</li>
        <li><strong>Franchise</strong> : Vous payez une franchise de 1 520€. Le reste est pris en charge par l'assurance (plafond variable selon les contrats).</li>
      </ol>

      <div class="my-8 p-6 bg-green-50 border border-green-200 rounded-xl">
        <h3 class="font-bold text-green-900 mb-4">✅ Notre accompagnement Cat-Nat</h3>
        <p class="text-green-800">Nous vous accompagnons dans votre dossier d'assurance : diagnostic conforme aux exigences, rapport détaillé, photos, mesures, lien de causalité sécheresse-fissures. Notre taux de succès : 95% de dossiers acceptés.</p>
      </div>

      <h2>La solution : l'agrafage (avant que ça ne s'aggrave)</h2>
      
      <p>Une fois la fissure apparue, elle ne se refermera jamais toute seule. Chaque nouveau cycle de retrait-gonflement l'aggravera. <strong>La seule solution</strong> : stabiliser la structure avec l'agrafage.</p>

      <h3>Comment ça fonctionne ?</h3>
      <p>On insère des aciers torsadés tous les 40 cm dans la maçonnerie pour "recoudre" le mur. Résultat : le mur retrouve sa rigidité et résiste aux futurs cycles de retrait-gonflement sans se fissurer à nouveau.</p>

      <h3>Coût et délai</h3>
      <ul>
        <li><strong>Coût moyen</strong> : 12 000€ - 18 000€ pour une façade complète</li>
        <li><strong>Durée</strong> : 3 à 5 jours</li>
        <li><strong>Garantie</strong> : Décennale (10 ans)</li>
        <li><strong>Financement</strong> : Possible via assurance Cat-Nat (franchise 1 520€)</li>
      </ul>

      <h2>Prévention : 5 gestes pour limiter le risque</h2>
      
      <ol>
        <li><strong>Éloigner les arbres</strong> : Minimum 10 mètres pour les arbres à grand développement</li>
        <li><strong>Arroser en été</strong> : Maintenir un niveau d'humidité stable autour de la maison (arrosage léger mais régulier)</li>
        <li><strong>Évacuer l'eau de pluie loin des fondations</strong> : Gouttières + regard de dispersion à minimum 2 mètres de la façade</li>
        <li><strong>Surveiller les fissures</strong> : Test du scotch tous les 6 mois pour détecter une évolution</li>
        <li><strong>Diagnostic tous les 5 ans</strong> : Si vous êtes en zone à risque</li>
      </ol>

      <h2>Conclusion : le sol argileux ne pardonne pas, mais on peut s'en protéger</h2>
      
      <p>Le sol argileux toulousain est un ennemi invisible, mais prévisible. Si vous êtes en zone à risque (vérifiez sur Géorisques), <strong>ne laissez pas les fissures s'installer</strong>. Chaque cycle de retrait-gonflement les aggrave.</p>

      <p><strong>Notre conseil d'expert</strong> : Si vous voyez des fissures apparaître après une période de sécheresse, ne les minimisez pas. Un diagnostic précis (149€, déductible sur travaux) vous dira si c'est lié au sol argileux, si c'est évolutif, et quelle solution est adaptée. Cette expertise peut aussi servir de base pour un dossier Cat-Nat auprès de votre assurance.</p>

      <p class="font-bold text-lg text-slate-900 mt-6">Le sol argileux ne changera jamais. Votre maison, si.</p>
    `
  },
  'fissure-facade-reboucher-ou-reparer': {
    slug: 'fissure-facade-reboucher-ou-reparer',
    title: 'Fissure façade : reboucher ou réparer ? L\'erreur à 5 000€ que font 90% des propriétaires',
    excerpt: 'Reboucher sans traiter la cause, c\'est jeter l\'argent par les fenêtres. La fissure revient dans les 6 mois, souvent plus large. Voici la méthode professionnelle pour savoir QUAND reboucher suffit et QUAND il faut réparer structurellement.',
    date: '2026-07-22',
    readTime: '9 min',
    category: 'conseils',
    author: 'Expert IPB',
    metaDescription: 'Fissure façade : reboucher vs réparer. Méthodologie experte pour éviter l\'erreur à 5000€. Test d\'évolutivité, diagnostic, agrafage. Expert Toulouse.',
    keywords: ['fissure façade', 'reboucher fissure', 'agrafage', 'ravalement', 'diagnostic', 'réparation fissure'],
    content: `
      <div class="mb-8 p-6 bg-red-50 border-l-4 border-red-600 rounded-r-lg">
        <p class="font-bold text-red-900 mb-2">💸 L'erreur à 5 000€</p>
        <p class="text-red-800">Vous rebouchez une fissure structurelle avec de l'enduit. Résultat : elle revient dans 6 mois, plus large. Vous rebouchez à nouveau. Elle revient. Après 2-3 ans de ce cycle, vous appelez enfin un expert. Diagnostic : il aurait fallu agrafer dès le début. Coût total : rebouchages multiples (2 000€) + agrafage (15 000€) = <strong>17 000€ au lieu de 12 000€</strong>. Vous avez perdu 5 000€ et 3 ans.</p>
      </div>

      <h2>Reboucher n'est PAS réparer (et votre façadier ne vous le dira pas)</h2>
      
      <p>Vous voyez une fissure sur votre façade. Vous appelez un façadier. Il vous dit : <strong>"Je vous rebouche ça, 800€."</strong> Vous acceptez. Il fait un beau travail. La fissure disparaît. Vous êtes content.</p>

      <p><strong>6 mois plus tard</strong>, la fissure est de retour. Même endroit. Même largeur. Vous rappelez le façadier. Il vous dit : <strong>"Le sol a bougé, c'est normal."</strong> Il rebouche à nouveau. Vous payez encore.</p>

      <p><strong>1 an plus tard</strong>, la fissure est revenue, cette fois <strong>plus large</strong>. Vous commencez à comprendre : <strong>le problème n'est pas l'enduit, c'est la structure</strong>.</p>

      <p class="font-bold text-lg text-slate-900 my-6">Cette histoire, je l'entends 3 fois par semaine. Et à chaque fois, les gens ont perdu du temps et de l'argent.</p>

      <h2>La différence fondamentale : reboucher vs réparer</h2>
      
      <div class="my-8 grid md:grid-cols-2 gap-6">
        <div class="p-6 bg-orange-50 border border-orange-200 rounded-xl">
          <h3 class="font-bold text-orange-900 mb-3">🩹 REBOUCHER (cosmétique)</h3>
          <p class="text-orange-800 mb-3">Vous masquez la fissure avec de l'enduit. C'est comme mettre un pansement sur une plaie qui saigne : ça cache, mais ça ne soigne pas.</p>
          <ul class="list-disc ml-6 text-orange-800 space-y-1 text-sm">
            <li><strong>Coût</strong> : 50€ - 100€ /ml</li>
            <li><strong>Durée</strong> : 6 mois à 2 ans (si fissure inactive)</li>
            <li><strong>Efficacité</strong> : 0% si fissure structurelle</li>
          </ul>
        </div>
        <div class="p-6 bg-green-50 border border-green-200 rounded-xl">
          <h3 class="font-bold text-green-900 mb-3">🔧 RÉPARER (structurel)</h3>
          <p class="text-green-800 mb-3">Vous traitez la cause (mouvement de fondation) en agrafant le mur. C'est comme suturer une plaie : ça soigne durablement.</p>
          <ul class="list-disc ml-6 text-green-800 space-y-1 text-sm">
            <li><strong>Coût</strong> : 12 000€ - 18 000€ (façade complète)</li>
            <li><strong>Durée</strong> : Définitif (garantie 10 ans)</li>
            <li><strong>Efficacité</strong> : 90% des cas</li>
          </ul>
        </div>
      </div>

      <h2>Le test décisif : votre fissure est-elle active ou inactive ?</h2>
      
      <p>Toute la question est là : <strong>votre fissure bouge-t-elle encore ?</strong> Si elle est <strong>inactive</strong> (stabilisée), reboucher suffit. Si elle est <strong>active</strong> (évolutive), il faut réparer structurellement.</p>

      <h3>Test n°1 : Le test du scotch (ou fissuromètre papier)</h3>
      <p><strong>Matériel</strong> : Scotch d'emballage large + stylo</p>
      <p><strong>Méthode</strong> :</p>
      <ol>
        <li>Collez un morceau de scotch sur la fissure, perpendiculairement</li>
        <li>Tracez une ligne au stylo qui traverse le scotch ET la fissure</li>
        <li>Notez la date</li>
        <li>Attendez 3 à 6 mois (idéalement un été complet si vous êtes en zone argileuse)</li>
        <li>Observez : si la ligne est décalée, <strong>la fissure évolue</strong> → Réparation structurelle nécessaire</li>
      </ol>

      <div class="my-8 p-6 bg-blue-50 border-l-4 border-blue-600 rounded-r-lg">
        <p class="font-bold text-blue-900 mb-2">💡 Conseil pro</p>
        <p class="text-blue-800">Faites ce test pendant l'été (juin-septembre) si vous êtes en zone argileuse. C'est pendant la sécheresse que le sol bouge le plus. Si le scotch ne se déchire pas pendant l'été, il y a de fortes chances que la fissure soit stabilisée.</p>
      </div>

      <h3>Test n°2 : L'analyse visuelle (5 critères)</h3>
      
      <p>Même sans attendre 6 mois, vous pouvez avoir des indices sur l'évolutivité de votre fissure :</p>

      <table class="w-full border-collapse border border-slate-300 my-6">
        <thead class="bg-slate-900 text-white">
          <tr>
            <th class="border border-slate-300 p-3 text-left">Critère</th>
            <th class="border border-slate-300 p-3 text-center">Fissure INACTIVE (reboucher)</th>
            <th class="border border-slate-300 p-3 text-center">Fissure ACTIVE (réparer)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border border-slate-300 p-3 font-bold">Largeur</td>
            <td class="border border-slate-300 p-3 text-center text-green-700">< 0,2 mm (cheveu)</td>
            <td class="border border-slate-300 p-3 text-center text-red-700">> 0,5 mm (carte bancaire)</td>
          </tr>
          <tr class="bg-slate-50">
            <td class="border border-slate-300 p-3 font-bold">Forme</td>
            <td class="border border-slate-300 p-3 text-center text-green-700">Réseau diffus (faïençage)</td>
            <td class="border border-slate-300 p-3 text-center text-red-700">En escalier (joints)</td>
          </tr>
          <tr>
            <td class="border border-slate-300 p-3 font-bold">Signes collatéraux</td>
            <td class="border border-slate-300 p-3 text-center text-green-700">Aucun</td>
            <td class="border border-slate-300 p-3 text-center text-red-700">Portes coincent, carrelage fissuré</td>
          </tr>
          <tr class="bg-slate-50">
            <td class="border border-slate-300 p-3 font-bold">Âge de la fissure</td>
            <td class="border border-slate-300 p-3 text-center text-green-700">> 5 ans, stabilisée</td>
            <td class="border border-slate-300 p-3 text-center text-red-700">Récente (< 2 ans)</td>
          </tr>
          <tr>
            <td class="border border-slate-300 p-3 font-bold">Localisation</td>
            <td class="border border-slate-300 p-3 text-center text-green-700">Diffuse sur toute la façade</td>
            <td class="border border-slate-300 p-3 text-center text-red-700">Concentrée (angle, ouverture)</td>
          </tr>
        </tbody>
      </table>

      <p class="font-bold text-lg text-slate-900 my-6">Si au moins 3 critères pointent vers "fissure active", ne rebouchez pas. Faites un diagnostic.</p>

      <h2>Quand reboucher suffit (et comment bien le faire)</h2>
      
      <h3>Cas n°1 : Le faïençage superficiel</h3>
      <p>Réseau de micro-fissures fines (< 0,2 mm) en forme de toile d'araignée. <strong>Cause</strong> : Fatigue de l'enduit, variations thermiques. <strong>Solution</strong> : Ravalement complet avec enduit neuf.</p>

      <h3>Cas n°2 : La fissure de retrait (ancienne et stabilisée)</h3>
      <p>Fissure fine, présente depuis > 5 ans, aucun signe d'évolution, aucun signe collatéral. <strong>Cause</strong> : Retrait du béton ou de l'enduit lors du séchage initial (maison neuve). <strong>Solution</strong> : Rebouchage avec mastic souple ou enduit fibré.</p>

      <h3>Cas n°3 : La fissure de dilatation thermique</h3>
      <p>Fissure verticale aux jonctions de matériaux différents (béton/brique, par exemple). <strong>Cause</strong> : Différence de dilatation thermique. <strong>Solution</strong> : Joint de dilatation ou pontage avec bande armée.</p>

      <h3>La bonne méthode de rebouchage (si la fissure est inactive)</h3>
      <ol>
        <li><strong>Ouvrir la fissure en V</strong> : Creuser légèrement pour que l'enduit accroche</li>
        <li><strong>Nettoyer</strong> : Enlever les parties friables, dépoussiérer</li>
        <li><strong>Appliquer un primaire d'accrochage</strong></li>
        <li><strong>Reboucher avec un enduit fibré</strong> : Plus élastique, absorbe les micro-mouvements</li>
        <li><strong>Poncer et peindre</strong></li>
      </ol>

      <p><strong>Coût</strong> : 50€ - 100€ /ml si vous faites faire, 10€ - 20€ /ml si vous le faites vous-même.</p>

      <h2>Quand il faut réparer structurellement (et ne PAS reboucher)</h2>
      
      <h3>Signal d'alarme n°1 : La fissure en escalier</h3>
      <p>Si votre fissure <strong>suit les joints de mortier</strong>, c'est un tassement différentiel. Reboucher ne servira à rien. La fissure reviendra dans les 6 mois. <strong>Solution</strong> : Agrafage.</p>

      <h3>Signal d'alarme n°2 : Largeur > 2 mm</h3>
      <p>Au-delà de 2 mm, l'eau s'infiltre. Chaque pluie aggrave le problème (gel/dégel en hiver). Et surtout, une fissure de 2 mm indique un mouvement important de la structure. <strong>Solution</strong> : Agrafage + traitement des infiltrations.</p>

      <h3>Signal d'alarme n°3 : Évolution rapide</h3>
      <p>Si votre fissure passe de 0,5 mm à 2 mm en 6 mois, c'est que le mouvement est actif et rapide. Ne perdez pas de temps. <strong>Solution</strong> : Diagnostic urgent + agrafage.</p>

      <h3>Signal d'alarme n°4 : Signes collatéraux</h3>
      <p>Portes qui coincent, fenêtres déformées, carrelage fissuré, joints ouverts... Tous ces signes indiquent que <strong>toute la structure bouge</strong>. Reboucher la fissure visible ne résoudra rien. <strong>Solution</strong> : Expertise structurelle + agrafage si nécessaire.</p>

      <div class="my-8 p-6 bg-red-50 border-l-4 border-red-600 rounded-r-lg">
        <p class="font-bold text-red-900 mb-2">🚨 L'erreur fatale</p>
        <p class="text-red-800">Reboucher une fissure structurelle, c'est comme mettre du chatterton sur une fuite de canalisation. Ça masque temporairement, mais <strong>pendant ce temps, la structure continue de se dégrader</strong>. Chaque mois qui passe rend la réparation future plus coûteuse.</p>
      </div>

      <h2>L'agrafage : la vraie réparation structurelle</h2>
      
      <p>Si votre fissure est active (test positif), la seule solution durable, c'est <strong>l'agrafage</strong>.</p>

      <h3>Comment ça fonctionne ?</h3>
      <p>On insère des aciers torsadés tous les 40 cm dans la maçonnerie pour "recoudre" le mur. Ces aciers relient les deux parties du mur qui se séparaient, lui redonnant sa cohérence monolithique. Résultat : le mur résiste aux futurs mouvements sans se fissurer à nouveau.</p>

      <h3>Coût réel (transparent)</h3>
      <ul>
        <li><strong>Diagnostic</strong> : 149€ (déductible sur devis)</li>
        <li><strong>Agrafage + finitions</strong> : 12 000€ - 18 000€ pour une façade de 100m²</li>
        <li><strong>Garantie</strong> : Décennale (10 ans)</li>
        <li><strong>Durée</strong> : 3 à 5 jours</li>
      </ul>

      <h2>Le piège des "rebouchages multiples"</h2>
      
      <p>Voici le scénario classique que je vois trop souvent :</p>

      <ul>
        <li><strong>Année 1</strong> : Vous rebouchez. Coût : 800€. La fissure revient après 8 mois.</li>
        <li><strong>Année 2</strong> : Vous rebouchez à nouveau. Coût : 800€. Elle revient après 6 mois, plus large.</li>
        <li><strong>Année 3</strong> : Vous appelez un expert. Diagnostic : agrafage nécessaire. Coût : 15 000€ (car la fissure s'est aggravée et étendue).</li>
      </ul>

      <p><strong>Coût total</strong> : 1 600€ (rebouchages) + 15 000€ (agrafage) = <strong>16 600€</strong></p>

      <p><strong>Si vous aviez agraffé dès l'année 1</strong> : 12 000€. <strong>Économie : 4 600€.</strong></p>

      <h2>L'arbre de décision (suivez ce schéma)</h2>
      
      <div class="my-8 p-6 bg-slate-50 border border-slate-200 rounded-xl">
        <h3 class="font-bold text-slate-900 mb-4">🌳 Votre fissure est-elle évolutive ?</h3>
        <p class="text-slate-800 mb-2"><strong>↓ Test du scotch pendant 3-6 mois</strong></p>
        <p class="text-slate-800 mb-4">↓</p>
        <div class="grid md:grid-cols-2 gap-4">
          <div class="p-4 bg-green-50 border border-green-200 rounded-lg">
            <p class="font-bold text-green-900 mb-2">✅ NON (scotch intact)</p>
            <p class="text-green-800 text-sm">→ La fissure est inactive</p>
            <p class="text-green-800 text-sm">→ Rebouchage suffit</p>
            <p class="text-green-800 text-sm">→ Coût : 500€ - 1 500€</p>
          </div>
          <div class="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p class="font-bold text-red-900 mb-2">❌ OUI (scotch déchiré)</p>
            <p class="text-red-800 text-sm">→ La fissure est active</p>
            <p class="text-red-800 text-sm">→ Diagnostic + agrafage</p>
            <p class="text-red-800 text-sm">→ Coût : 12 000€ - 18 000€</p>
          </div>
        </div>
      </div>

      <h2>Conclusion : investissez dans le diagnostic, pas dans le rebouchage multiple</h2>
      
      <p>Le rebouchage coûte moins cher à court terme (800€ vs 15 000€). Mais si la fissure est structurelle, vous allez reboucher 2, 3, 4 fois... et finir par agrafer quand même. <strong>Coût total : plus cher qu'agrafer dès le début.</strong></p>

      <p><strong>Notre conseil d'expert</strong> : Avant de reboucher, faites le test du scotch pendant 3-6 mois. Si la fissure évolue, investissez dans un diagnostic (149€). Cette expertise vous dira précisément si reboucher suffit ou s'il faut agrafer. Vous économiserez potentiellement 5 000€ en évitant les rebouchages inutiles.</p>

      <p class="font-bold text-lg text-slate-900 mt-6">La question n'est pas "Combien ça coûte de reboucher ?" mais "Combien ça va me coûter de reboucher 3 fois avant d'agrafer ?"</p>
    `
  },
  'humidite-salpetre-traitement': {
    slug: 'humidite-salpetre-traitement',
    title: 'Salpêtre sur vos murs : ce que cette poudre blanche révèle (et comment l\'éliminer définitivement)',
    excerpt: 'Le salpêtre n\'est pas de la moisissure. C\'est le signe visible d\'un problème invisible : l\'eau qui remonte du sol dans vos murs. Voici comment confirmer le diagnostic, pourquoi le gratter ne sert à rien, et la seule solution qui fonctionne.',
    date: '2026-08-06',
    readTime: '8 min',
    category: 'humidite',
    author: 'Expert IPB',
    metaDescription: 'Salpêtre murs : origine (remontée capillaire), différence avec moisissure, traitement définitif (injection résine). Expert humidité Toulouse.',
    keywords: ['salpêtre', 'remontée capillaire', 'murs humides', 'injection résine', 'nitrate de potassium', 'poudre blanche'],
    content: `
      <div class="mb-8 p-6 bg-blue-50 border-l-4 border-blue-600 rounded-r-lg">
        <p class="font-bold text-blue-900 mb-2">💧 Le salpêtre = diagnostic certain à 95%</p>
        <p class="text-blue-800">Si vous voyez cette poudre blanche au pied de vos murs (surtout dans les caves, garages ou pièces en rez-de-chaussée), il y a <strong>95% de chances</strong> que ce soit une remontée capillaire. Le salpêtre est la "signature chimique" de l'eau qui remonte du sol dans vos murs.</p>
      </div>

      <h2>C'est quoi exactement, le salpêtre ?</h2>
      
      <p>Vous voyez cette <strong>poudre blanche ou grisâtre</strong> au bas de vos murs ? Parfois cristallisée, parfois poudreuse, souvent accompagnée de peinture qui cloque ou d'enduit qui se décolle ?</p>

      <p><strong>Ce n'est PAS de la moisissure.</strong> C'est du <strong>salpêtre</strong> (nom chimique : nitrate de potassium, KNO₃). Et contrairement aux moisissures qui sont des champignons, le salpêtre est un <strong>dépôt minéral</strong>.</p>

      <h3>D'où vient cette poudre blanche ?</h3>
      
      <p>Le salpêtre se forme par un processus en 3 étapes :</p>

      <ol>
        <li><strong>L'eau remonte du sol</strong> : Par capillarité, l'eau du sol (chargée de sels minéraux) monte dans les pores de vos murs (brique, pierre, béton)</li>
        <li><strong>L'eau s'évapore en surface</strong> : Une fois arrivée à la surface du mur (intérieur ou extérieur), l'eau s'évapore</li>
        <li><strong>Les sels cristallisent</strong> : Les sels minéraux (nitrates, sulfates, chlorures) ne s'évaporent pas, eux. Ils restent et cristallisent en surface, formant cette poudre blanche : le salpêtre</li>
      </ol>

      <p class="font-bold text-lg text-slate-900 my-6">En clair : <strong>le salpêtre est la preuve visible que l'eau remonte du sol dans vos murs</strong>.</p>

      <h2>Salpêtre vs moisissure : comment faire la différence ?</h2>
      
      <p>Beaucoup confondent les deux. Pourtant, les causes ET les traitements sont complètement différents.</p>

      <div class="my-8 overflow-x-auto">
        <table class="w-full border-collapse border border-slate-300">
          <thead class="bg-slate-900 text-white">
            <tr>
              <th class="border border-slate-300 p-3 text-left">Critère</th>
              <th class="border border-slate-300 p-3 text-center">Salpêtre</th>
              <th class="border border-slate-300 p-3 text-center">Moisissure</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border border-slate-300 p-3 font-bold">Couleur</td>
              <td class="border border-slate-300 p-3 text-center">Blanche, grise ou jaune</td>
              <td class="border border-slate-300 p-3 text-center">Noire, verte ou brune</td>
            </tr>
            <tr class="bg-slate-50">
              <td class="border border-slate-300 p-3 font-bold">Texture</td>
              <td class="border border-slate-300 p-3 text-center">Poudre cristalline, friable</td>
              <td class="border border-slate-300 p-3 text-center">Duvet, taches, visqueux</td>
            </tr>
            <tr>
              <td class="border border-slate-300 p-3 font-bold">Localisation</td>
              <td class="border border-slate-300 p-3 text-center"><strong>Bas de mur</strong> (0-150 cm)</td>
              <td class="border border-slate-300 p-3 text-center"><strong>Haut de mur</strong>, angles, plafonds</td>
            </tr>
            <tr class="bg-slate-50">
              <td class="border border-slate-300 p-3 font-bold">Odeur</td>
              <td class="border border-slate-300 p-3 text-center">Aucune odeur</td>
              <td class="border border-slate-300 p-3 text-center">Odeur de moisi, terre</td>
            </tr>
            <tr>
              <td class="border border-slate-300 p-3 font-bold">Au toucher</td>
              <td class="border border-slate-300 p-3 text-center">S'effrite facilement</td>
              <td class="border border-slate-300 p-3 text-center">Collant ou sec</td>
            </tr>
            <tr class="bg-slate-50">
              <td class="border border-slate-300 p-3 font-bold">Cause</td>
              <td class="border border-slate-300 p-3 text-center bg-blue-50"><strong>Remontée capillaire</strong></td>
              <td class="border border-slate-300 p-3 text-center"><strong>Condensation</strong> ou infiltration</td>
            </tr>
            <tr>
              <td class="border border-slate-300 p-3 font-bold">Traitement</td>
              <td class="border border-slate-300 p-3 text-center bg-blue-50"><strong>Injection résine</strong></td>
              <td class="border border-slate-300 p-3 text-center"><strong>VMC</strong> / ventilation</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p class="font-bold text-lg text-slate-900 my-6">💡 Règle simple : Si c'est blanc ET en bas de mur = salpêtre. Si c'est noir ET en haut de mur = moisissure.</p>

      <h2>Test simple pour confirmer que c'est du salpêtre</h2>
      
      <h3>Test n°1 : Le test du grattage</h3>
      <p>Grattez la poudre blanche avec un couteau ou une spatule. Si elle <strong>s'effrite facilement</strong> et tombe en poudre fine, c'est du salpêtre. Si c'est collant ou gluant, c'est autre chose (moisissure, efflorescence).</p>

      <h3>Test n°2 : Le test de l'eau</h3>
      <p>Mettez un peu de poudre dans un verre d'eau. Le salpêtre se <strong>dissout partiellement</strong> (c'est un sel). Les moisissures ne se dissolvent pas.</p>

      <h3>Test n°3 : Le test de localisation</h3>
      <p>Le salpêtre apparaît <strong>uniquement en bas de mur</strong> (jusqu'à 150 cm de hauteur maximum). Si vous en voyez plus haut, ce n'est probablement pas du salpêtre.</p>

      <h2>Pourquoi le gratter ne sert à RIEN (l'erreur la plus courante)</h2>
      
      <p>Votre premier réflexe : gratter le salpêtre, nettoyer le mur, passer un coup de peinture. <strong>Résultat ?</strong> Il revient dans les 3 à 6 mois.</p>

      <p><strong>Pourquoi ?</strong> Parce que vous avez traité le symptôme (la poudre blanche), pas la cause (l'eau qui remonte du sol).</p>

      <div class="my-8 p-6 bg-red-50 border-l-4 border-red-600 rounded-r-lg">
        <p class="font-bold text-red-900 mb-2">❌ Ce qui NE fonctionne PAS</p>
        <ul class="list-disc ml-6 text-red-800 space-y-2">
          <li><strong>Gratter et repeindre</strong> : L'eau continue de monter, le salpêtre revient sous la peinture</li>
          <li><strong>Appliquer un traitement anti-salpêtre</strong> : Ces produits "bloquent" temporairement, mais l'eau continue de monter et pourrit le mur derrière</li>
          <li><strong>Mettre une peinture étanche</strong> : L'eau ne peut plus s'évaporer, elle reste emprisonnée dans le mur qui se dégrade encore plus vite</li>
          <li><strong>Déshumidificateur</strong> : Il assèche l'air, pas le mur. Dès que vous l'éteignez, le salpêtre revient</li>
        </ul>
      </div>

      <h2>La seule solution qui fonctionne : créer une barrière étanche dans le mur</h2>
      
      <p>Pour éliminer définitivement le salpêtre, il faut <strong>empêcher l'eau de remonter du sol</strong>. Et pour ça, il faut créer une <strong>barrière étanche à la base du mur</strong>.</p>

      <h3>L'injection de résine hydrophobe : comment ça marche ?</h3>
      
      <p><strong>Principe</strong> : On injecte une résine spéciale dans le mur, à sa base (15-20 cm du sol). Cette résine se diffuse dans les pores de la maçonnerie et, au contact de l'eau, se transforme en gel imperméable. Résultat : l'eau ne peut plus remonter au-delà de cette barrière.</p>

      <p><strong>Étapes</strong> :</p>
      <ol>
        <li>On perce des trous tous les 12 cm à la base du mur (diamètre 12-14 mm)</li>
        <li>On injecte la résine hydrophobe sous pression</li>
        <li>La résine se diffuse dans la maçonnerie et minéralise (48h)</li>
        <li>Une fois la barrière active, l'eau ne remonte plus</li>
        <li>Le mur commence à sécher (processus lent : 6-12 mois selon l'épaisseur)</li>
      </ol>

      <div class="my-8 p-6 bg-green-50 border border-green-200 rounded-xl">
        <h3 class="font-bold text-green-900 mb-4">✅ Pourquoi cette technique fonctionne</h3>
        <ul class="list-disc ml-6 text-green-800 space-y-2">
          <li><strong>Barrière définitive</strong> : La résine minéralise et reste active 30 ans minimum</li>
          <li><strong>Non invasive</strong> : Pas de démolition, pas de gros travaux. Juste des petits perçages</li>
          <li><strong>Efficace sur tous types de murs</strong> : Brique, pierre, béton, parpaing</li>
          <li><strong>Garantie 30 ans</strong> : Couverte par notre assurance décennale</li>
        </ul>
      </div>

      <h3>Combien de temps pour que le salpêtre disparaisse ?</h3>
      
      <p><strong>La barrière est active en 48h</strong>. Mais le mur doit évacuer l'eau accumulée depuis des années. C'est un processus physique incompressible.</p>

      <p><strong>Timeline réaliste</strong> :</p>
      <ul>
        <li><strong>Semaine 1-2</strong> : La barrière est active, l'eau ne remonte plus</li>
        <li><strong>Mois 1-3</strong> : Le mur commence à sécher, le salpêtre arrête de se former</li>
        <li><strong>Mois 6-12</strong> : Le mur est complètement sec (selon épaisseur : comptez 1 mois par cm d'épaisseur)</li>
        <li><strong>Après 12 mois</strong> : Vous pouvez refaire les finitions (enduit, peinture) sans risque de récidive</li>
      </ul>

      <div class="my-8 p-6 bg-yellow-50 border-l-4 border-yellow-600 rounded-r-lg">
        <p class="font-bold text-yellow-900 mb-2">⚠️ Patience = clé du succès</p>
        <p class="text-yellow-800">Ne vous attendez pas à un résultat en 2 semaines. Le séchage d'un mur de 20 cm prend 6 à 10 mois. C'est long, mais c'est le temps nécessaire pour un assainissement durable. Si on vous promet un résultat en 1 mois, fuyez.</p>
      </div>

      <h2>Coût de l'injection résine (prix réels 2025)</h2>
      
      <h3>Facteurs de variation du prix</h3>
      <ul>
        <li><strong>Longueur de mur à traiter</strong> : Prix au mètre linéaire (80€ - 120€ /ml)</li>
        <li><strong>Épaisseur du mur</strong> : Mur de 50 cm nécessite plus de résine qu'un mur de 20 cm</li>
        <li><strong>Type de maçonnerie</strong> : Pierre poreuse absorbe plus de résine que la brique</li>
        <li><strong>Accessibilité</strong> : Cave difficile d'accès = surcoût logistique</li>
      </ul>

      <h3>Prix moyens 2025</h3>
      <ul>
        <li><strong>Diagnostic</strong> : 149€ (déductible sur devis)</li>
        <li><strong>Injection résine</strong> : 80€ - 120€ /ml</li>
        <li><strong>Exemple</strong> : Mur de 10 mètres = 800€ - 1 200€</li>
        <li><strong>Garantie</strong> : 30 ans sur la barrière étanche</li>
      </ul>

      <h2>Après l'injection : les finitions</h2>
      
      <p>Une fois le mur sec (6-12 mois), vous pouvez refaire les finitions :</p>

      <ol>
        <li><strong>Gratter le salpêtre résiduel</strong> (il ne reviendra plus)</li>
        <li><strong>Brosser et dépoussiérer</strong></li>
        <li><strong>Appliquer un enduit d'assainissement</strong> (enduit à la chaux, respirant)</li>
        <li><strong>Peindre avec une peinture microporeuse</strong> (qui laisse le mur respirer)</li>
      </ol>

      <div class="my-8 p-6 bg-blue-50 border-l-4 border-blue-600 rounded-r-lg">
        <p class="font-bold text-blue-900 mb-2">💡 Ne peignez PAS trop tôt</p>
        <p class="text-blue-800">Si vous peignez avant que le mur soit complètement sec, l'humidité résiduelle fera cloquer la peinture. Attendez au moins 6 mois après l'injection, et vérifiez l'humidité du mur avec un humidimètre (< 5% = OK).</p>
      </div>

      <h2>Salpêtre + cave : le cas particulier du cuvelage</h2>
      
      <p>Si votre problème de salpêtre concerne une <strong>cave enterrée</strong>, l'injection seule peut ne pas suffire. Il faut aussi traiter les <strong>infiltrations latérales</strong> (eau qui pousse sur les murs enterrés).</p>

      <h3>Le cuvelage : étanchéité totale</h3>
      <p>On applique un revêtement imperméable (résine époxy ou mortier étanche) sur les murs et le sol pour créer une "cuve" étanche. L'eau ne peut plus entrer, ni par le bas (remontées), ni par les côtés (infiltrations).</p>

      <p><strong>Coût</strong> : 80€ - 150€ /m² de surface à traiter</p>

      <h2>Conclusion : le salpêtre ne disparaît jamais tout seul</h2>
      
      <p>Le salpêtre est le symptôme visible d'un problème invisible : l'eau qui remonte du sol. Gratter, peindre, déshumidifier... tout ça masque temporairement, mais ne résout rien.</p>

      <p><strong>Notre conseil d'expert</strong> : Si vous voyez du salpêtre au bas de vos murs, ne perdez pas de temps avec des solutions cosmétiques. Un diagnostic précis (149€, déductible sur travaux) vous dira si c'est une remontée capillaire (injection résine) ou autre chose (infiltration, condensation). Cette expertise vous évitera de dépenser de l'argent dans des traitements inefficaces.</p>

      <p class="font-bold text-lg text-slate-900 mt-6">Le salpêtre ne ment jamais. Il vous dit : "L'eau remonte." Écoutez-le.</p>
    `
  },
  'condensation-ou-infiltration': {
    slug: 'condensation-ou-infiltration',
    title: 'Condensation ou infiltration ? Le test simple pour ne plus se tromper',
    excerpt: 'Taches noires, murs humides, moisissures... Ce n\'est pas toujours une fuite. 60% des gens traitent le mauvais problème et dépensent de l\'argent inutilement. Voici le test décisif pour savoir si c\'est de la condensation (VMC) ou une infiltration (étanchéité).',
    date: '2026-08-30',
    readTime: '8 min',
    category: 'humidite',
    author: 'Expert IPB',
    metaDescription: 'Condensation vs infiltration : test simple, symptômes, causes, traitements différents (VMC vs étanchéité). Expert humidité Toulouse.',
    keywords: ['condensation', 'infiltration', 'humidité', 'diagnostic', 'VMC', 'étanchéité', 'moisissures'],
    content: `
      <div class="mb-8 p-6 bg-blue-50 border-l-4 border-blue-600 rounded-r-lg">
        <p class="font-bold text-blue-900 mb-2">⚠️ L'erreur à 5 000€</p>
        <p class="text-blue-800">Vous voyez de l'humidité sur vos murs. Vous pensez : "C'est une infiltration, il faut refaire l'étanchéité." Vous dépensez 5 000€. Résultat : l'humidité revient. Pourquoi ? Parce que c'était de la <strong>condensation</strong>, pas une infiltration. Une simple VMC à 2 000€ aurait suffi.</p>
      </div>

      <h2>Condensation vs infiltration : pourquoi c'est crucial de ne pas se tromper</h2>
      
      <p>Vous avez de l'humidité dans votre maison. Taches noires, moisissures, murs mouillés. Vous pensez naturellement : <strong>"Il y a une fuite quelque part."</strong></p>

      <p>Mais dans 6 cas sur 10, <strong>il n'y a AUCUNE fuite</strong>. C'est de la condensation. Et la différence est énorme :</p>

      <ul>
        <li><strong>Condensation</strong> → Traitement : VMC (2 000€ - 4 000€)</li>
        <li><strong>Infiltration</strong> → Traitement : Étanchéité (3 000€ - 10 000€ selon la source)</li>
      </ul>

      <p class="font-bold text-lg text-slate-900 my-6">Se tromper de diagnostic = payer 2x (le mauvais traitement + le bon traitement).</p>

      <h2>C'est quoi la condensation ? (explication simple)</h2>
      
      <p>L'air de votre maison contient de la <strong>vapeur d'eau</strong> (invisible). Cette vapeur vient de vos activités : respiration, cuisson, douches, linge qui sèche...</p>

      <p>Quand cet air chaud et humide entre en contact avec une <strong>surface froide</strong> (mur, fenêtre), il se refroidit. Et l'eau qu'il contenait se transforme en <strong>gouttelettes</strong> (comme la buée sur un miroir après la douche).</p>

      <p><strong>Résultat</strong> : Vous voyez de l'eau sur vos fenêtres, vos murs, vos plafonds. Mais cette eau ne vient PAS de l'extérieur. Elle vient de l'<strong>air intérieur</strong>.</p>

      <h2>C'est quoi une infiltration ?</h2>
      
      <p>Une infiltration, c'est de l'eau qui <strong>entre dans votre maison depuis l'extérieur</strong> :</p>

      <ul>
        <li><strong>Infiltration de toiture</strong> : Tuile cassée, membrane percée</li>
        <li><strong>Infiltration de façade</strong> : Fissure, joint défectueux</li>
        <li><strong>Remontée capillaire</strong> : Eau qui remonte du sol dans les murs</li>
        <li><strong>Fuite de canalisation</strong> : Tuyau percé dans les murs</li>
      </ul>

      <h2>Le test décisif : condensation ou infiltration en 5 minutes</h2>
      
      <h3>Test n°1 : Le test de la feuille d'aluminium</h3>
      
      <p><strong>Matériel</strong> : Papier aluminium + scotch</p>
      <p><strong>Méthode</strong> :</p>
      <ol>
        <li>Séchez complètement la zone humide avec un chiffon</li>
        <li>Collez un carré de papier aluminium (20x20 cm) sur le mur, en scotchant TOUS les bords (étanche)</li>
        <li>Attendez 24-48h</li>
        <li>Décollez délicatement</li>
      </ol>

      <p><strong>Résultat</strong> :</p>
      <ul>
        <li><strong>Humidité SOUS l'aluminium</strong> (côté mur) → <strong>INFILTRATION</strong> (l'eau vient du mur)</li>
        <li><strong>Humidité SUR l'aluminium</strong> (côté pièce) → <strong>CONDENSATION</strong> (l'eau vient de l'air)</li>
      </ul>

      <div class="my-8 p-6 bg-green-50 border border-green-200 rounded-xl">
        <h3 class="font-bold text-green-900 mb-3">✅ Ce test est fiable à 95%</h3>
        <p class="text-green-800">C'est la méthode qu'utilisent les experts. Simple, rapide, et quasi infaillible. Si vous avez un doute, faites ce test avant de dépenser 1 centime dans des travaux.</p>
      </div>

      <h2>Le tableau comparatif définitif</h2>
      
      <div class="my-8 overflow-x-auto">
        <table class="w-full border-collapse border border-slate-300">
          <thead class="bg-slate-900 text-white">
            <tr>
              <th class="border border-slate-300 p-3 text-left">Symptôme</th>
              <th class="border border-slate-300 p-3 text-center">Condensation</th>
              <th class="border border-slate-300 p-3 text-center">Infiltration</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border border-slate-300 p-3 font-bold">Localisation</td>
              <td class="border border-slate-300 p-3 text-center bg-blue-50"><strong>Haut des murs</strong>, angles, plafonds, fenêtres</td>
              <td class="border border-slate-300 p-3 text-center"><strong>Localisée</strong> (sous une fenêtre, angle, plafond)</td>
            </tr>
            <tr class="bg-slate-50">
              <td class="border border-slate-300 p-3 font-bold">Moment d'apparition</td>
              <td class="border border-slate-300 p-3 text-center bg-blue-50"><strong>Hiver</strong> (+ froid = + condensation)</td>
              <td class="border border-slate-300 p-3 text-center"><strong>Après pluie</strong></td>
            </tr>
            <tr>
              <td class="border border-slate-300 p-3 font-bold">Buée sur fenêtres</td>
              <td class="border border-slate-300 p-3 text-center bg-blue-50"><strong>OUI</strong> (le matin surtout)</td>
              <td class="border border-slate-300 p-3 text-center">NON</td>
            </tr>
            <tr class="bg-slate-50">
              <td class="border border-slate-300 p-3 font-bold">Moisissures</td>
              <td class="border border-slate-300 p-3 text-center bg-blue-50">Noires, dans les <strong>angles</strong></td>
              <td class="border border-slate-300 p-3 text-center">Localisées autour de la source</td>
            </tr>
            <tr>
              <td class="border border-slate-300 p-3 font-bold">Odeur</td>
              <td class="border border-slate-300 p-3 text-center bg-blue-50">Moisi général</td>
              <td class="border border-slate-300 p-3 text-center">Moisi localisé</td>
            </tr>
            <tr class="bg-slate-50">
              <td class="border border-slate-300 p-3 font-bold">Salpêtre</td>
              <td class="border border-slate-300 p-3 text-center bg-blue-50"><strong>NON</strong></td>
              <td class="border border-slate-300 p-3 text-center"><strong>OUI</strong> (si remontée capillaire)</td>
            </tr>
            <tr>
              <td class="border border-slate-300 p-3 font-bold">Ventilation améliore</td>
              <td class="border border-slate-300 p-3 text-center bg-blue-50"><strong>OUI</strong> (immédiat)</td>
              <td class="border border-slate-300 p-3 text-center">NON</td>
            </tr>
            <tr class="bg-slate-50">
              <td class="border border-slate-300 p-3 font-bold">Traitement</td>
              <td class="border border-slate-300 p-3 text-center bg-blue-50"><strong>VMC</strong> (2-4k€)</td>
              <td class="border border-slate-300 p-3 text-center"><strong>Étanchéité</strong> (3-10k€)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Cas particulier : les 3 types d'infiltrations</h2>
      
      <h3>1. Infiltration de toiture</h3>
      <p><strong>Signes</strong> : Taches au plafond, peinture qui cloque, eau qui coule après la pluie</p>
      <p><strong>Causes</strong> : Tuile cassée, membrane usée, faîtage défectueux, cheminée mal étanchée</p>
      <p><strong>Traitement</strong> : Réparation toiture (1 000€ - 5 000€ selon ampleur)</p>

      <h3>2. Infiltration de façade</h3>
      <p><strong>Signes</strong> : Humidité localisée sous une fenêtre, dans un angle, autour d'une fissure</p>
      <p><strong>Causes</strong> : Fissure, joint de fenêtre défectueux, acrotère non étanche</p>
      <p><strong>Traitement</strong> : Étanchéité façade + réparation fissure (500€ - 3 000€)</p>

      <h3>3. Remontée capillaire</h3>
      <p><strong>Signes</strong> : Humidité en BAS de mur (0-150 cm), salpêtre (poudre blanche)</p>
      <p><strong>Causes</strong> : Eau du sol qui remonte dans les murs par capillarité</p>
      <p><strong>Traitement</strong> : Injection résine (80€ - 120€ /ml)</p>

      <h2>Traitement de la condensation : la VMC (Ventilation Mécanique Contrôlée)</h2>
      
      <p>Si votre diagnostic confirme que c'est de la condensation, <strong>la VMC est LA solution</strong>.</p>

      <h3>Comment ça marche ?</h3>
      <p>La VMC renouvelle l'air de votre maison en continu : elle <strong>évacue l'air humide</strong> (salle de bain, cuisine) et <strong>fait entrer de l'air frais</strong> (pièces de vie). Résultat : l'humidité ne stagne plus, la condensation disparaît.</p>

      <h3>Types de VMC</h3>
      <ul>
        <li><strong>VMC simple flux</strong> : Évacue l'air humide. Coût : 1 500€ - 2 500€</li>
        <li><strong>VMC double flux</strong> : Récupère la chaleur de l'air sortant. Coût : 3 000€ - 6 000€</li>
        <li><strong>VMI</strong> (Ventilation Mécanique par Insufflation) : Insuffle de l'air sec. Coût : 2 000€ - 4 000€</li>
      </ul>

      <h2>Erreurs à éviter</h2>
      
      <h3>Erreur n°1 : Chercher une fuite qui n'existe pas</h3>
      <p>Vous faites inspecter toute votre toiture, refaire vos joints de fenêtres... alors que c'est de la condensation. <strong>Coût</strong> : 3 000€ - 5 000€ pour rien.</p>

      <h3>Erreur n°2 : Installer une VMC alors que c'est une infiltration</h3>
      <p>Vous installez une VMC à 3 000€. L'humidité persiste. Pourquoi ? Parce qu'il y a une vraie fuite. La VMC évacue l'air humide, mais l'eau continue d'entrer.</p>

      <h3>Erreur n°3 : Utiliser un déshumidificateur seul</h3>
      <p>Le déshumidificateur assèche l'air temporairement. Mais dès que vous l'éteignez, l'humidité revient (car vous n'avez pas traité la cause). C'est un <strong>pansement</strong>, pas un traitement.</p>

      <h2>Conclusion : 5 minutes de test = des milliers d'euros économisés</h2>
      
      <p>Avant de dépenser un centime dans des travaux d'étanchéité ou une VMC, <strong>faites le test de la feuille d'aluminium</strong>. 5 minutes de votre temps peuvent vous éviter de dépenser 5 000€ dans le mauvais traitement.</p>

      <p><strong>Notre conseil d'expert</strong> : Si le test n'est pas concluant ou si vous avez un doute, demandez un diagnostic précis (149€, déductible sur travaux). Un expert viendra avec un humidimètre, une caméra thermique, et vous dira avec certitude si c'est de la condensation, une infiltration, ou les deux. Cette expertise vous évitera de traiter le mauvais problème.</p>

      <p class="font-bold text-lg text-slate-900 mt-6">La question n'est pas "J'ai de l'humidité" mais "D'où vient cette humidité ?"</p>
    `
  },
  'diagnostic-structurel-maison': {
    slug: 'diagnostic-structurel-maison',
    title: 'Diagnostic structurel : les 7 choses qu\'un vrai expert vérifie (et que 90% des "pros" oublient)',
    excerpt: 'Un diagnostic à l\'œil nu ne vaut rien. Un vrai expert arrive avec un fissuromètre, un niveau laser, un humidimètre... et 15 ans d\'expérience. Voici exactement ce qu\'il observe, mesure, et analyse pour vous dire si votre maison est en danger ou non.',
    date: '2026-09-18',
    readTime: '10 min',
    category: 'expertise',
    author: 'Expert IPB',
    metaDescription: 'Diagnostic structurel maison : méthodologie experte, 7 points de contrôle, outils (fissuromètre, niveau laser), rapport détaillé. Expert Toulouse.',
    keywords: ['diagnostic structurel', 'expertise', 'fissuromètre', 'mesures', 'niveau laser', 'diagnostic fissures'],
    content: `
      <div class="mb-8 p-6 bg-orange-50 border-l-4 border-orange-600 rounded-r-lg">
        <p class="font-bold text-orange-900 mb-2">⚠️ Un diagnostic à l'œil nu ne vaut RIEN</p>
        <p class="text-orange-800">Vous appelez un "expert" qui regarde vos fissures 10 minutes, prend 2 photos avec son téléphone, et vous dit : "Il faut des micropieux, 45 000€." Aucune mesure, aucun outil, aucun rapport. <strong>Fuyez.</strong> Un vrai diagnostic structurel prend 1h30 minimum et repose sur des <strong>mesures objectives</strong>, pas sur des impressions.</p>
      </div>

      <h2>Qu'est-ce qu'un diagnostic structurel ? (définition claire)</h2>
      
      <p>Un diagnostic structurel, c'est une <strong>expertise technique</strong> qui permet de :</p>

      <ol>
        <li><strong>Identifier la nature du problème</strong> : Fissure superficielle ou structurelle ? Tassement différentiel ? Dilatation thermique ?</li>
        <li><strong>Mesurer la gravité</strong> : Fissure active ou inactive ? Dénivelé de X cm ? Humidité à X% ?</li>
        <li><strong>Déterminer les causes</strong> : Sol argileux ? Arbre trop proche ? Défaut de conception ?</li>
        <li><strong>Proposer des solutions adaptées</strong> : Agrafage ? Micropieux ? Rebouchage ?</li>
      </ol>

      <p class="font-bold text-lg text-slate-900 my-6">Un bon diagnostic = <strong>mesures objectives</strong> + analyse d'expert + solutions chiffrées.</p>

      <h2>Les 7 points de contrôle d'un diagnostic structurel complet</h2>
      
      <h3>1. Mesure de l'ouverture des fissures (fissuromètre)</h3>
      
      <p><strong>Outil</strong> : Fissuromètre (jauge de mesure graduée en mm)</p>
      
      <p><strong>Ce qu'on mesure</strong> : La largeur exacte de chaque fissure. Une fissure de 0,3 mm n'a rien à voir avec une fissure de 3 mm.</p>

      <p><strong>Seuils critiques</strong> :</p>
      <ul>
        <li><strong>< 0,2 mm</strong> : Micro-fissure cosmétique (faïençage)</li>
        <li><strong>0,2 - 0,5 mm</strong> : Fissure fine, surveillance recommandée</li>
        <li><strong>0,5 - 2 mm</strong> : Fissure structurelle modérée, agrafage souvent nécessaire</li>
        <li><strong>2 - 5 mm</strong> : Fissure importante, agrafage nécessaire</li>
        <li><strong>> 5 mm</strong> : Lézarde critique, micropieux parfois nécessaires</li>
      </ul>

      <p><strong>Pourquoi c'est crucial</strong> : Si l'expert ne mesure pas les fissures au mm près, il ne peut pas déterminer la gravité. "C'est une grosse fissure" ne veut rien dire. "C'est une fissure de 3,2 mm" est une donnée objective.</p>

      <h3>2. Test d'évolutivité (fissuromètre témoin ou test du scotch)</h3>
      
      <p><strong>Outil</strong> : Témoin en plâtre ou repères tracés</p>

      <p><strong>Ce qu'on fait</strong> : On colle un témoin sur la fissure (ou on trace des repères). Si au bout de 3-6 mois le témoin se casse ou les repères se décalent, la fissure évolue.</p>

      <p><strong>Pourquoi c'est crucial</strong> : Une fissure inactive (stabilisée) peut être rebouchée. Une fissure active (évolutive) nécessite une réparation structurelle. Sans test d'évolutivité, impossible de savoir.</p>

      <div class="my-8 p-6 bg-blue-50 border border-blue-200 rounded-xl">
        <h3 class="font-bold text-blue-900 mb-3">💡 Le diagnostic en 2 temps</h3>
        <p class="text-blue-800">Un expert sérieux peut vous proposer un diagnostic en 2 temps : une première visite pour analyser et poser des témoins, puis une seconde visite 3-6 mois plus tard pour vérifier l'évolutivité. C'est la méthode la plus fiable (et recommandée par les assurances Cat-Nat).</p>
      </div>

      <h3>3. Mesure du dénivelé (niveau laser ou niveau à bulle)</h3>
      
      <p><strong>Outil</strong> : Niveau laser rotatif + règle graduée</p>

      <p><strong>Ce qu'on mesure</strong> : Le dénivelé du sol ou des fondations entre deux points de la maison. Un tassement différentiel se traduit par un dénivelé.</p>

      <p><strong>Seuils critiques</strong> :</p>
      <ul>
        <li><strong>< 1 cm</strong> : Dénivelé négligeable</li>
        <li><strong>1 - 3 cm</strong> : Tassement modéré, agrafage suffit généralement</li>
        <li><strong>3 - 10 cm</strong> : Tassement important, agrafage nécessaire (+ éventuellement matage)</li>
        <li><strong>> 10 cm</strong> : Tassement critique, micropieux souvent nécessaires</li>
      </ul>

      <p><strong>Pourquoi c'est crucial</strong> : Le dénivelé détermine la gravité du tassement. Si on vous propose des micropieux alors que le dénivelé est de 2 cm, <strong>c'est du sur-traitement</strong>.</p>

      <h3>4. Analyse du type de fissure (forme, localisation, direction)</h3>
      
      <p><strong>Ce qu'on observe</strong> :</p>
      <ul>
        <li><strong>Fissure en escalier</strong> (suit les joints) → Tassement différentiel</li>
        <li><strong>Fissure verticale</strong> (coin de fenêtre) → Dilatation thermique ou défaut de chaînage</li>
        <li><strong>Fissure horizontale</strong> (linteau) → Flexion ou poussée</li>
        <li><strong>Faïençage</strong> (réseau diffus) → Fatigue de l'enduit</li>
      </ul>

      <p><strong>Pourquoi c'est crucial</strong> : La forme de la fissure révèle la cause. Un expert expérimenté peut identifier la cause en quelques minutes juste en observant la forme.</p>

      <h3>5. Inspection des signes collatéraux</h3>
      
      <p><strong>Ce qu'on vérifie</strong> :</p>
      <ul>
        <li><strong>Portes et fenêtres</strong> : Coincent-elles ? Sont-elles déformées ?</li>
        <li><strong>Carrelage</strong> : Fissuré ? Soulevé ? Joints ouverts ?</li>
        <li><strong>Plinthes</strong> : Décollées ? Espaces visibles ?</li>
        <li><strong>Joints de maçonnerie</strong> : Ouverts ? Fissurés ?</li>
        <li><strong>Autres fissures</strong> : Y en a-t-il d'autres ailleurs (façade, intérieur, plafond) ?</li>
      </ul>

      <p><strong>Pourquoi c'est crucial</strong> : Une fissure isolée + aucun signe collatéral = souvent bénin. Une fissure + portes qui coincent + carrelage fissuré = mouvement structurel actif.</p>

      <h3>6. Analyse du sol et de l'environnement</h3>
      
      <p><strong>Ce qu'on évalue</strong> :</p>
      <ul>
        <li><strong>Type de sol</strong> : Argileux ? Sableux ? Remblai ?</li>
        <li><strong>Arbres</strong> : Proximité ? Espèce (racines profondes ou pas) ?</li>
        <li><strong>Pente du terrain</strong> : Ruissellement ?</li>
        <li><strong>Travaux récents</strong> : Voirie, terrassement, forage ?</li>
        <li><strong>Historique</strong> : Cat-Nat sécheresse ? Inondations ?</li>
      </ul>

      <p><strong>Pourquoi c'est crucial</strong> : Le sol détermine la solution. Un sol argileux en zone Cat-Nat 2022 explique 90% des fissures toulousaines. Un arbre à 3 mètres de la façade explique un tassement localisé.</p>

      <h3>7. Mesure de l'humidité (humidimètre)</h3>
      
      <p><strong>Outil</strong> : Humidimètre à pointes ou sans contact</p>

      <p><strong>Ce qu'on mesure</strong> : Le taux d'humidité dans les murs (en %). Un mur sain doit être à < 5% d'humidité.</p>

      <p><strong>Seuils</strong> :</p>
      <ul>
        <li><strong>< 5%</strong> : Mur sec, normal</li>
        <li><strong>5 - 10%</strong> : Léger excès d'humidité, surveillance</li>
        <li><strong>10 - 20%</strong> : Humidité importante (remontée capillaire ou infiltration)</li>
        <li><strong>> 20%</strong> : Mur saturé, traitement urgent</li>
      </ul>

      <p><strong>Pourquoi c'est crucial</strong> : Si les fissures sont accompagnées d'humidité, le diagnostic change. L'eau aggrave les fissures (gel/dégel en hiver).</p>

      <h2>Les outils d'un vrai diagnostic (et leur coût)</h2>
      
      <div class="my-8 overflow-x-auto">
        <table class="w-full border-collapse border border-slate-300">
          <thead class="bg-slate-900 text-white">
            <tr>
              <th class="border border-slate-300 p-3 text-left">Outil</th>
              <th class="border border-slate-300 p-3 text-center">Usage</th>
              <th class="border border-slate-300 p-3 text-center">Coût (pro)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border border-slate-300 p-3 font-bold">Fissuromètre</td>
              <td class="border border-slate-300 p-3">Mesure largeur fissures (mm)</td>
              <td class="border border-slate-300 p-3 text-center">50€ - 200€</td>
            </tr>
            <tr class="bg-slate-50">
              <td class="border border-slate-300 p-3 font-bold">Niveau laser</td>
              <td class="border border-slate-300 p-3">Mesure dénivelé</td>
              <td class="border border-slate-300 p-3 text-center">300€ - 1 500€</td>
            </tr>
            <tr>
              <td class="border border-slate-300 p-3 font-bold">Humidimètre</td>
              <td class="border border-slate-300 p-3">Mesure taux humidité (%)</td>
              <td class="border border-slate-300 p-3 text-center">100€ - 500€</td>
            </tr>
            <tr class="bg-slate-50">
              <td class="border border-slate-300 p-3 font-bold">Caméra thermique</td>
              <td class="border border-slate-300 p-3">Détecte infiltrations invisibles</td>
              <td class="border border-slate-300 p-3 text-center">2 000€ - 5 000€</td>
            </tr>
            <tr>
              <td class="border border-slate-300 p-3 font-bold">Télémètre laser</td>
              <td class="border border-slate-300 p-3">Mesure distances précises</td>
              <td class="border border-slate-300 p-3 text-center">100€ - 300€</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p class="font-bold text-lg text-slate-900 my-6">💡 Si l'expert n'a AUCUN de ces outils, ce n'est pas un expert.</p>

      <h2>Le rapport de diagnostic : ce qu'il doit contenir (minimum)</h2>
      
      <ol>
        <li><strong>Photos annotées</strong> : Chaque fissure photographiée et légendée</li>
        <li><strong>Mesures chiffrées</strong> : Largeur des fissures (mm), dénivelé (cm), humidité (%)</li>
        <li><strong>Analyse des causes</strong> : Sol argileux ? Arbre ? Défaut de conception ?</li>
        <li><strong>Gravité évaluée</strong> : Fissure superficielle / modérée / grave / critique</li>
        <li><strong>Solutions proposées</strong> : Rebouchage / Agrafage / Micropieux / Autre</li>
        <li><strong>Devis estimatif</strong> : Fourchette de prix réaliste</li>
        <li><strong>Recommandations</strong> : Urgence ? Surveillance ? Travaux immédiats ?</li>
      </ol>

      <div class="my-8 p-6 bg-red-50 border-l-4 border-red-600 rounded-r-lg">
        <p class="font-bold text-red-900 mb-2">🚨 Red flags d'un mauvais diagnostic</p>
        <ul class="list-disc ml-6 text-red-800 space-y-2">
          <li>Aucune mesure chiffrée ("c'est grave" sans préciser pourquoi)</li>
          <li>Pas de rapport écrit (juste un devis)</li>
          <li>Proposition de micropieux directement sans justification</li>
          <li>Durée < 30 minutes (un vrai diagnostic prend 1h-1h30)</li>
          <li>Aucun outil de mesure</li>
        </ul>
      </div>

      <h2>Combien coûte un diagnostic structurel ?</h2>
      
      <h3>Prix du marché (2025)</h3>
      <ul>
        <li><strong>Diagnostic basique</strong> (visite + rapport simple) : 149€ - 300€</li>
        <li><strong>Diagnostic complet</strong> (visite + mesures + rapport détaillé + photos) : 300€ - 500€</li>
        <li><strong>Expertise assurance</strong> (pour dossier Cat-Nat) : 500€ - 1 000€</li>
      </ul>

      <div class="my-8 p-6 bg-green-50 border border-green-200 rounded-xl">
        <h3 class="font-bold text-green-900 mb-3">✅ Notre formule</h3>
        <p class="text-green-800"><strong>149€ déductibles sur travaux</strong>. Si vous signez avec nous, le diagnostic est offert. Si vous ne signez pas, vous payez 149€ pour le rapport complet (photos, mesures, solutions).</p>
      </div>

      <h2>Diagnostic gratuit : faut-il s'en méfier ?</h2>
      
      <p>Beaucoup d'entreprises proposent un "diagnostic gratuit". Attention au piège :</p>

      <p><strong>Le diagnostic gratuit "vendeur"</strong> :</p>
      <ul>
        <li>Durée : 15-20 minutes</li>
        <li>Pas de mesures objectives</li>
        <li>Conclusion : "Il faut des travaux" (toujours)</li>
        <li>Devis gonflé pour compenser le "gratuit"</li>
      </ul>

      <p><strong>Le diagnostic payant "expert"</strong> :</p>
      <ul>
        <li>Durée : 1h-1h30</li>
        <li>Mesures objectives avec outils</li>
        <li>Rapport neutre et détaillé</li>
        <li>Vous gardez le rapport, vous décidez</li>
      </ul>

      <p class="font-bold text-lg text-slate-900 my-6">Un diagnostic gratuit vous coûte souvent plus cher (sur-traitement) qu'un diagnostic payant (solution adaptée).</p>

      <h2>Conclusion : investissez dans le diagnostic, économisez sur les travaux</h2>
      
      <p>Un diagnostic structurel complet (149€ - 300€) peut vous faire économiser <strong>des milliers d'euros</strong> en évitant :</p>

      <ul>
        <li>Le sur-traitement (micropieux à 45 000€ alors que l'agrafage à 15 000€ suffit)</li>
        <li>Le sous-traitement (rebouchage à 800€ alors qu'il faut agrafer)</li>
        <li>Le mauvais traitement (VMC alors que c'est une infiltration)</li>
      </ul>

      <p><strong>Notre conseil d'expert</strong> : Ne signez JAMAIS un devis sans avoir eu un diagnostic détaillé avec mesures objectives. 149€ de diagnostic peuvent vous éviter 30 000€ de travaux inutiles.</p>

      <p class="font-bold text-lg text-slate-900 mt-6">Un bon diagnostic = le meilleur investissement que vous ferez pour votre maison.</p>
    `
  },
  'traitement-humidite-injection-resine': {
    slug: 'traitement-humidite-injection-resine',
    title: 'Injection résine : la seule solution définitive contre les remontées capillaires (explications + prix)',
    excerpt: 'Vous avez du salpêtre qui revient malgré vos nettoyages ? L\'injection de résine crée une barrière étanche à la base de vos murs qui bloque l\'eau pendant 30 ans. Voici comment ça marche exactement, combien de temps ça prend, et combien ça coûte (tarifs transparents).',
    date: '2026-10-14',
    readTime: '9 min',
    category: 'humidite',
    author: 'Expert IPB',
    metaDescription: 'Injection résine humidité : principe, étapes, efficacité, délai séchage (6-12 mois), garantie 30 ans, prix 2025. Expert traitement humidité Toulouse.',
    keywords: ['injection résine', 'barrière étanche', 'remontées capillaires', 'humidité', 'salpêtre', 'traitement humidité'],
    content: `
      <div class="mb-8 p-6 bg-blue-50 border-l-4 border-blue-600 rounded-r-lg">
        <p class="font-bold text-blue-900 mb-2">💧 Efficacité : 95% sur les remontées capillaires</p>
        <p class="text-blue-800">L'injection de résine est la <strong>seule technique reconnue</strong> par les experts du bâtiment pour stopper définitivement les remontées capillaires. Toutes les autres méthodes (peinture étanche, déshumidificateur, drainage extérieur seul) ne sont que des pansements temporaires.</p>
      </div>

      <h2>Le problème : l'eau remonte du sol dans vos murs (et elle ne s'arrêtera jamais seule)</h2>
      
      <p>Vous avez du salpêtre au pied de vos murs, de la peinture qui cloque, des moisissures qui reviennent. Vous avez compris : <strong>l'eau remonte du sol dans vos murs</strong> par capillarité.</p>

      <p>Le problème ? <strong>Ce phénomène ne s'arrête jamais spontanément</strong>. Tant qu'il y a de l'eau dans le sol (et il y en aura toujours), elle continuera de remonter. Nettoyer, gratter, peindre... tout ça ne fait que masquer temporairement.</p>

      <p class="font-bold text-lg text-slate-900 my-6">Pour stopper définitivement les remontées capillaires, il faut <strong>créer une barrière étanche à la base du mur</strong>.</p>

      <h2>L'injection de résine : comment ça marche exactement ?</h2>
      
      <h3>Le principe physico-chimique (expliqué simplement)</h3>
      
      <p>La résine hydrophobe (="qui repousse l'eau") est un produit liquide qui, une fois injecté dans les pores de la maçonnerie, <strong>minéralise et forme un gel imperméable</strong>. Ce gel bloque physiquement le passage de l'eau.</p>

      <p>C'est comme si vous créiez une <strong>membrane invisible</strong> à l'intérieur du mur, au niveau de sa base. L'eau du sol ne peut plus remonter au-delà de cette barrière.</p>

      <h2>Les 7 étapes de l'injection (déroulé complet)</h2>
      
      <h3>Étape 1 : Diagnostic et mesures (jour 0)</h3>
      <p>Avant toute injection, un expert mesure le taux d'humidité du mur (humidimètre), identifie la hauteur de remontée, et vérifie qu'il s'agit bien d'une remontée capillaire (et non d'une infiltration latérale).</p>

      <h3>Étape 2 : Perçage des trous (jour 1)</h3>
      <p>On perce des trous tous les <strong>12 cm</strong> à la base du mur (généralement à 15-20 cm du sol). Les trous font <strong>12-14 mm de diamètre</strong> et pénètrent aux <strong>2/3 de l'épaisseur du mur</strong>.</p>

      <p><strong>Exemple</strong> : Pour un mur de 10 mètres, on perce environ 80 trous.</p>

      <h3>Étape 3 : Injection de la résine (jour 1)</h3>
      <p>On injecte la résine <strong>sous basse pression</strong> (0,5 à 1 bar) dans chaque trou. La résine se diffuse dans les pores de la maçonnerie par capillarité (le même phénomène qui fait monter l'eau, mais dans l'autre sens).</p>

      <p><strong>Quantité</strong> : Environ 1 à 2 litres de résine par mètre linéaire (selon la porosité du mur).</p>

      <h3>Étape 4 : Minéralisation (48h)</h3>
      <p>La résine minéralise au contact de l'humidité du mur. En 48h, la barrière chimique est <strong>active et définitive</strong>.</p>

      <h3>Étape 5 : Séchage du mur (6-12 mois)</h3>
      <p>La barrière empêche l'eau de remonter, mais le mur contient encore toute l'eau accumulée depuis des années. Cette eau doit s'évaporer naturellement. <strong>C'est un processus lent</strong> : comptez 1 mois de séchage par cm d'épaisseur de mur.</p>

      <p><strong>Exemple</strong> : Mur de 20 cm = 6 à 10 mois de séchage.</p>

      <h3>Étape 6 : Rebouchage des trous (après séchage)</h3>
      <p>Une fois le mur sec, on rebouche les trous d'injection avec un mortier adapté.</p>

      <h3>Étape 7 : Finitions (après séchage complet)</h3>
      <p>Grattage du salpêtre résiduel, application d'un enduit d'assainissement (chaux), peinture microporeuse.</p>

      <div class="my-8 p-6 bg-yellow-50 border-l-4 border-yellow-600 rounded-r-lg">
        <p class="font-bold text-yellow-900 mb-2">⏱️ Timeline réaliste</p>
        <ul class="list-disc ml-6 text-yellow-800 space-y-1">
          <li><strong>Jour 1</strong> : Perçage + injection (1 journée de travaux)</li>
          <li><strong>48h</strong> : Barrière active</li>
          <li><strong>Mois 1-3</strong> : Début du séchage (salpêtre cesse de se former)</li>
          <li><strong>Mois 6-12</strong> : Mur complètement sec</li>
          <li><strong>Après 12 mois</strong> : Finitions possibles</li>
        </ul>
      </div>

      <h2>Types de résines : laquelle choisir ?</h2>
      
      <h3>1. Résine acrylique en phase aqueuse (recommandée)</h3>
      <p><strong>Avantages</strong> : Inodore, non toxique, peut être utilisée avec les occupants présents, se diffuse bien dans tous types de maçonnerie</p>
      <p><strong>Inconvénients</strong> : Légèrement plus coûteuse</p>
      <p><strong>Prix</strong> : 80€ - 120€ /ml</p>

      <h3>2. Résine silicone/silane/siloxane</h3>
      <p><strong>Avantages</strong> : Très efficace, pénétration profonde</p>
      <p><strong>Inconvénients</strong> : Légère odeur pendant 24-48h</p>
      <p><strong>Prix</strong> : 70€ - 100€ /ml</p>

      <h3>3. Résine époxy (déconseillée pour remontées capillaires)</h3>
      <p><strong>Usage</strong> : Plutôt pour cuvelage et étanchéité de surface, pas pour injection</p>

      <h2>Avantages de l'injection résine (vs autres méthodes)</h2>
      
      <div class="my-8 overflow-x-auto">
        <table class="w-full border-collapse border border-slate-300">
          <thead class="bg-slate-900 text-white">
            <tr>
              <th class="border border-slate-300 p-3 text-left">Critère</th>
              <th class="border border-slate-300 p-3 text-center">Injection résine</th>
              <th class="border border-slate-300 p-3 text-center">Drainage extérieur</th>
              <th class="border border-slate-300 p-3 text-center">Peinture étanche</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border border-slate-300 p-3 font-bold">Efficacité</td>
              <td class="border border-slate-300 p-3 text-center bg-green-50 text-green-700 font-bold">95%</td>
              <td class="border border-slate-300 p-3 text-center text-yellow-700">50-60%</td>
              <td class="border border-slate-300 p-3 text-center text-red-700">0% (masque)</td>
            </tr>
            <tr class="bg-slate-50">
              <td class="border border-slate-300 p-3 font-bold">Durabilité</td>
              <td class="border border-slate-300 p-3 text-center bg-green-50 text-green-700 font-bold">30 ans</td>
              <td class="border border-slate-300 p-3 text-center">10-15 ans</td>
              <td class="border border-slate-300 p-3 text-center">6-12 mois</td>
            </tr>
            <tr>
              <td class="border border-slate-300 p-3 font-bold">Invasivité</td>
              <td class="border border-slate-300 p-3 text-center bg-green-50">Faible (perçages)</td>
              <td class="border border-slate-300 p-3 text-center text-red-700">Forte (terrassement)</td>
              <td class="border border-slate-300 p-3 text-center">Très faible</td>
            </tr>
            <tr class="bg-slate-50">
              <td class="border border-slate-300 p-3 font-bold">Coût</td>
              <td class="border border-slate-300 p-3 text-center bg-green-50">80-120€ /ml</td>
              <td class="border border-slate-300 p-3 text-center">150-250€ /ml</td>
              <td class="border border-slate-300 p-3 text-center">20-40€ /m²</td>
            </tr>
            <tr>
              <td class="border border-slate-300 p-3 font-bold">Garantie</td>
              <td class="border border-slate-300 p-3 text-center bg-green-50 font-bold">30 ans</td>
              <td class="border border-slate-300 p-3 text-center">10 ans</td>
              <td class="border border-slate-300 p-3 text-center">Aucune</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Prix de l'injection résine (tarifs 2025 transparents)</h2>
      
      <h3>Facteurs de variation</h3>
      <ul>
        <li><strong>Longueur de mur</strong> : Prix au mètre linéaire</li>
        <li><strong>Épaisseur du mur</strong> : Mur de 50 cm nécessite plus de résine</li>
        <li><strong>Type de maçonnerie</strong> : Pierre poreuse absorbe plus que la brique</li>
        <li><strong>Accessibilité</strong> : Cave difficile d'accès = surcoût</li>
      </ul>

      <h3>Grille tarifaire 2025</h3>
      <ul>
        <li><strong>Diagnostic préalable</strong> : 149€ (déductible sur devis)</li>
        <li><strong>Injection résine</strong> : 80€ - 120€ /ml</li>
        <li><strong>Exemple mur 10m</strong> : 800€ - 1 200€</li>
        <li><strong>Exemple mur 20m</strong> : 1 600€ - 2 400€</li>
        <li><strong>Garantie</strong> : 30 ans sur la barrière étanche (assurance décennale)</li>
      </ul>

      <div class="my-8 p-6 bg-blue-50 border border-blue-200 rounded-xl">
        <h3 class="font-bold text-blue-900 mb-3">💰 Coût total réel (exemple cave 30m²)</h3>
        <ul class="list-none text-blue-800 space-y-1">
          <li>→ Diagnostic : 149€</li>
          <li>→ Injection résine (15ml de mur) : 1 200€ - 1 800€</li>
          <li>→ VMI (ventilation) : 2 000€ - 3 000€</li>
          <li>→ Finitions (enduit + peinture) : 1 000€ - 1 500€</li>
          <li class="font-bold pt-2 border-t">→ <strong>TOTAL : 4 500€ - 6 500€</strong></li>
        </ul>
      </div>

      <h2>Délai de séchage : pourquoi c'est long (et c'est normal)</h2>
      
      <p>Beaucoup de clients demandent : <strong>"Pourquoi mon mur n'est pas sec après 2 semaines ?"</strong></p>

      <p>Réponse : Parce que la barrière empêche l'eau de <strong>remonter</strong>, mais l'eau déjà présente dans le mur doit <strong>s'évaporer</strong>. Et l'évaporation prend du temps.</p>

      <h3>Règle de calcul du délai de séchage</h3>
      <p><strong>1 mois par cm d'épaisseur de mur</strong></p>

      <p><strong>Exemples</strong> :</p>
      <ul>
        <li>Mur de 10 cm → 3-4 mois</li>
        <li>Mur de 20 cm → 6-10 mois</li>
        <li>Mur de 30 cm → 9-12 mois</li>
        <li>Mur de 50 cm → 12-18 mois</li>
      </ul>

      <div class="my-8 p-6 bg-yellow-50 border-l-4 border-yellow-600 rounded-r-lg">
        <p class="font-bold text-yellow-900 mb-2">⚠️ Patience = clé du succès</p>
        <p class="text-yellow-800">Si on vous promet un résultat en 1 mois, <strong>fuyez</strong>. Le séchage d'un mur saturé d'eau prend 6 à 12 mois minimum. C'est physique, incompressible. Toute entreprise qui promet un miracle rapide est soit incompétente, soit malhonnête.</p>
      </div>

      <h2>Injection résine + VMI : le combo gagnant</h2>
      
      <p>L'injection résine seule suffit à stopper les remontées. Mais pour <strong>accélérer le séchage</strong> et éviter la condensation résiduelle, on recommande souvent d'ajouter une <strong>VMI</strong> (Ventilation Mécanique par Insufflation).</p>

      <h3>La VMI : qu'est-ce que c'est ?</h3>
      <p>Un appareil installé en combles ou en haut de mur qui <strong>insuffle de l'air sec</strong> dans la maison. Cet air sec accélère l'évaporation de l'humidité résiduelle.</p>

      <p><strong>Coût</strong> : 2 000€ - 4 000€ (installation comprise)</p>
      <p><strong>Gain</strong> : Séchage 2x plus rapide + air sain toute l'année</p>

      <h2>Garanties et certifications : ce qu'il faut vérifier</h2>
      
      <p>Avant de signer, vérifiez que l'entreprise vous fournit :</p>

      <ol>
        <li><strong>Attestation de garantie décennale</strong> : Obligatoire pour tous travaux structurels</li>
        <li><strong>Garantie d'efficacité 30 ans</strong> : Sur la barrière étanche elle-même</li>
        <li><strong>Fiche technique de la résine</strong> : Composition, normes (DTU 20.1)</li>
        <li><strong>Rapport de diagnostic préalable</strong> : Avec mesures d'humidité</li>
        <li><strong>Devis détaillé</strong> : Nombre de ml, quantité de résine, coût unitaire</li>
      </ol>

      <h2>Cas particulier : injection + cuvelage (caves enterrées)</h2>
      
      <p>Si votre problème concerne une <strong>cave enterrée</strong>, l'injection seule peut ne pas suffire. Il faut aussi traiter les <strong>infiltrations latérales</strong> (eau qui pousse sur les murs enterrés).</p>

      <h3>Le cuvelage : complément indispensable</h3>
      <p>On applique un revêtement imperméable (résine époxy ou mortier étanche) sur les murs et le sol pour créer une "cuve" étanche.</p>

      <p><strong>Ordre des opérations</strong> :</p>
      <ol>
        <li>Injection résine (remontées capillaires)</li>
        <li>Cuvelage (infiltrations latérales)</li>
        <li>VMI (évacuation humidité résiduelle)</li>
      </ol>

      <h2>Conclusion : l'injection résine, le seul traitement définitif</h2>
      
      <p>Après 30 ans d'expérience dans le traitement de l'humidité, je peux vous le dire : <strong>il n'y a qu'une seule méthode qui fonctionne durablement contre les remontées capillaires</strong>. C'est l'injection de résine.</p>

      <p>Toutes les autres méthodes (drainage seul, peinture étanche, déshumidificateur) sont soit des compléments, soit des pansements temporaires.</p>

      <p><strong>Notre conseil d'expert</strong> : Si vous voyez du salpêtre au pied de vos murs, ne perdez pas de temps avec des solutions cosmétiques. Un diagnostic précis (149€, déductible sur travaux) vous confirmera si c'est une remontée capillaire et vous donnera un devis transparent pour l'injection résine. Une fois traité, vous n'aurez plus jamais ce problème.</p>

      <p class="font-bold text-lg text-slate-900 mt-6">L'injection résine : un investissement pour 30 ans de tranquillité.</p>
    `
  },
  'revente-maison-fissuree': {
    slug: 'revente-maison-fissuree',
    title: 'Vendre une maison fissurée : la décote à -30% (et comment l\'éviter)',
    excerpt: 'Une maison fissurée perd 20 à 30% de sa valeur. Les acheteurs paniquent, les banques refusent les prêts. Mais avec un traitement structurel garanti (agrafage + attestation décennale), la revente redevient possible... et parfois PLUS facile que prévu.',
    date: '2026-11-12',
    readTime: '8 min',
    category: 'conseils',
    author: 'Expert IPB',
    metaDescription: 'Revente maison fissurée : décote 20-30%, risques banque/notaire, solutions (agrafage + garantie décennale), valorisation post-travaux. Expert Toulouse.',
    keywords: ['revente maison fissurée', 'décote', 'garantie décennale', 'agrafage', 'vente maison fissures', 'diagnostic technique'],
    content: `
      <div class="mb-8 p-6 bg-orange-50 border-l-4 border-orange-600 rounded-r-lg">
        <p class="font-bold text-orange-900 mb-2">💰 La décote moyenne : -25%</p>
        <p class="text-orange-800">Une maison estimée à 300 000€ perd en moyenne <strong>60 000€ à 90 000€</strong> si elle présente des fissures structurelles non traitées. Mais si vous la faites réparer AVANT la vente (agrafage + attestation décennale), vous récupérez 80% de la valeur... et parfois même 100%.</p>
      </div>

      <h2>La réalité du marché : les acheteurs paniquent face aux fissures</h2>
      
      <p>Vous mettez votre maison en vente. Les visites se passent bien... jusqu'à ce qu'un acheteur potentiel remarque <strong>cette fissure</strong> sur la façade. Son visage change. Il pose LA question redoutée : <strong>"C'est grave ?"</strong></p>

      <p>Vous minimisez : "Oh, c'est rien, juste l'enduit..." Mais vous voyez dans ses yeux qu'il ne vous croit pas. Il prend des photos, repart, et ne donne plus de nouvelles.</p>

      <p class="font-bold text-lg text-slate-900 my-6">Résultat : Votre maison reste sur le marché 6 mois, 9 mois, 1 an... Et vous finissez par baisser le prix.</p>

      <h2>Pourquoi les acheteurs fuient les maisons fissurées</h2>
      
      <h3>Raison n°1 : La peur de l'effondrement</h3>
      <p>L'acheteur lambda ne fait pas la différence entre une micro-fissure cosmétique et une fissure structurelle. Pour lui, <strong>fissure = danger</strong>. Il imagine le pire : effondrement, travaux pharaoniques, revente impossible.</p>

      <h3>Raison n°2 : Le refus de prêt bancaire</h3>
      <p>La banque fait inspecter la maison par un expert. Si l'expert signale des fissures structurelles, la banque peut :</p>
      <ul>
        <li><strong>Refuser le prêt</strong> (risque hypothécaire trop élevé)</li>
        <li><strong>Exiger des travaux avant déblocage des fonds</strong></li>
        <li><strong>Diminuer le montant du prêt</strong> (sous-évaluation du bien)</li>
      </ul>

      <h3>Raison n°3 : Le vice caché redouté</h3>
      <p>L'acheteur a peur que vous lui cachiez l'ampleur du problème. Même si vous êtes honnête, <strong>il suppose le pire</strong>. Et juridiquement, il a raison de se méfier : un vice caché peut entraîner l'annulation de la vente.</p>

      <h2>La décote réelle : chiffres du marché 2025</h2>
      
      <div class="my-8 overflow-x-auto">
        <table class="w-full border-collapse border border-slate-300">
          <thead class="bg-slate-900 text-white">
            <tr>
              <th class="border border-slate-300 p-3 text-left">Type de fissure</th>
              <th class="border border-slate-300 p-3 text-center">Décote moyenne</th>
              <th class="border border-slate-300 p-3 text-center">Exemple (maison 300k€)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border border-slate-300 p-3">Micro-fissures superficielles (< 0,2mm)</td>
              <td class="border border-slate-300 p-3 text-center text-yellow-700">-5% à -10%</td>
              <td class="border border-slate-300 p-3 text-center">-15 000€ à -30 000€</td>
            </tr>
            <tr class="bg-slate-50">
              <td class="border border-slate-300 p-3">Fissures structurelles non traitées</td>
              <td class="border border-slate-300 p-3 text-center text-red-700 font-bold">-20% à -30%</td>
              <td class="border border-slate-300 p-3 text-center text-red-700 font-bold">-60 000€ à -90 000€</td>
            </tr>
            <tr>
              <td class="border border-slate-300 p-3">Fissures réparées SANS garantie</td>
              <td class="border border-slate-300 p-3 text-center text-orange-700">-10% à -15%</td>
              <td class="border border-slate-300 p-3 text-center">-30 000€ à -45 000€</td>
            </tr>
            <tr class="bg-slate-50">
              <td class="border border-slate-300 p-3">Fissures réparées AVEC garantie décennale</td>
              <td class="border border-slate-300 p-3 text-center text-green-700 font-bold">-0% à -5%</td>
              <td class="border border-slate-300 p-3 text-center text-green-700 font-bold">0€ à -15 000€</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p class="font-bold text-lg text-slate-900 my-6">💡 Faire réparer AVANT de vendre = récupérer 60 000€ à 75 000€ sur le prix de vente.</p>

      <h2>Vendre "en l'état" : risques juridiques</h2>
      
      <h3>L'obligation de déclaration</h3>
      <p>Vous devez <strong>déclarer les fissures</strong> dans le dossier de diagnostic technique (DDT) et/ou dans le questionnaire de l'acquéreur. Si vous cachez volontairement le problème, c'est un <strong>dol</strong> (vice du consentement) qui peut entraîner :</p>
      <ul>
        <li><strong>Annulation de la vente</strong></li>
        <li><strong>Dommages et intérêts</strong></li>
        <li><strong>Remboursement des frais d'acte</strong></li>
      </ul>

      <h3>Le vice caché</h3>
      <p>Même si vous déclarez les fissures, l'acheteur peut invoquer un <strong>vice caché</strong> s'il découvre que le problème est plus grave que ce que vous aviez dit. Par exemple :</p>
      <ul>
        <li>Vous dites "fissure cosmétique" alors que c'est structurel</li>
        <li>Vous dites "fissure stabilisée" alors qu'elle évolue</li>
      </ul>

      <p><strong>Délai</strong> : L'acheteur a 2 ans après la découverte pour agir en justice.</p>

      <div class="my-8 p-6 bg-red-50 border-l-4 border-red-600 rounded-r-lg">
        <p class="font-bold text-red-900 mb-2">🚨 Ne tentez jamais de cacher</p>
        <p class="text-red-800">Reboucher et repeindre pour cacher les fissures avant une vente est une <strong>fraude</strong>. L'expert de la banque ou le diagnostiqueur les détectera (caméra thermique, humidimètre). Et si l'acheteur découvre après l'achat que vous avez maquillé, vous risquez l'annulation de la vente + poursuites.</p>
      </div>

      <h2>La solution : réparer AVANT de vendre (calcul rentabilité)</h2>
      
      <h3>Scénario 1 : Vendre "en l'état"</h3>
      <ul>
        <li>Valeur maison saine : 300 000€</li>
        <li>Décote fissures : <strong>-25%</strong></li>
        <li>Prix de vente réel : <strong>225 000€</strong></li>
        <li>Perte : <strong>75 000€</strong></li>
      </ul>

      <h3>Scénario 2 : Réparer puis vendre</h3>
      <ul>
        <li>Valeur maison saine : 300 000€</li>
        <li>Coût agrafage + finitions : <strong>15 000€</strong></li>
        <li>Décote résiduelle : -5% (travaux récents)</li>
        <li>Prix de vente réel : <strong>285 000€</strong></li>
        <li>Net vendeur : 285 000€ - 15 000€ = <strong>270 000€</strong></li>
        <li><strong>Gain vs vente en l'état : +45 000€</strong></li>
      </ul>

      <p class="font-bold text-lg text-slate-900 my-6">Investir 15 000€ dans l'agrafage vous fait gagner 45 000€ à la revente. ROI : 300%.</p>

      <h2>L'argument de vente imparable : l'attestation décennale</h2>
      
      <p>Si vous faites réparer les fissures AVANT de vendre, vous aurez un <strong>atout énorme</strong> pour rassurer les acheteurs : <strong>l'attestation de garantie décennale</strong>.</p>

      <h3>Ce que dit cette attestation</h3>
      <ul>
        <li>Les travaux ont été réalisés par une entreprise assurée</li>
        <li>La réparation est <strong>garantie 10 ans</strong></li>
        <li>En cas de problème, l'assurance de l'entreprise prend en charge</li>
        <li>La garantie est <strong>transmissible au nouvel acquéreur</strong></li>
      </ul>

      <p><strong>Impact sur l'acheteur</strong> : Il ne voit plus un "problème", il voit une <strong>maison réparée et garantie</strong>. C'est même un argument de vente : "La maison a été expertisée et les fondations stabilisées avec garantie décennale. Vous achetez en toute sérénité."</p>

      <h2>Cas particulier : vendre avec un diagnostic Cat-Nat en cours</h2>
      
      <p>Si votre commune a été classée en <strong>catastrophe naturelle "sécheresse"</strong>, vous pouvez faire jouer votre assurance pour les travaux. Deux options :</p>

      <h3>Option 1 : Faire les travaux avant la vente</h3>
      <ul>
        <li>Vous déclarez le sinistre à votre assurance</li>
        <li>Vous faites réaliser les travaux (agrafage)</li>
        <li>L'assurance rembourse (franchise 1 520€)</li>
        <li>Vous vendez avec attestation de travaux garantis</li>
      </ul>

      <h3>Option 2 : Transmettre le dossier à l'acheteur</h3>
      <ul>
        <li>Vous déclarez le sinistre</li>
        <li>Vous vendez avec le dossier Cat-Nat en cours</li>
        <li>L'acheteur finalise le dossier et fait réaliser les travaux</li>
        <li><strong>Décote moindre</strong> (l'acheteur sait que l'assurance paie)</li>
      </ul>

      <h2>Timing : quand faire les travaux ?</h2>
      
      <h3>Si vous vendez dans les 6 mois</h3>
      <p><strong>Faites les travaux MAINTENANT</strong>. Durée agrafage : 3-5 jours. Vous aurez votre attestation décennale en 1 semaine. Vous pourrez mettre la maison en vente avec un argument béton.</p>

      <h3>Si vous vendez dans 1-2 ans</h3>
      <p><strong>Faites les travaux quand même</strong>. Pourquoi ? Parce que pendant ce temps, les fissures vont s'aggraver. Et plus vous attendez, plus la décote sera forte (et plus les travaux seront coûteux).</p>

      <h2>Comment présenter les travaux aux acheteurs</h2>
      
      <h3>❌ Ce qu'il NE faut PAS dire</h3>
      <p>"La maison avait des fissures, mais on les a réparées. Normalement ça devrait tenir..."</p>
      <p><strong>Pourquoi c'est mauvais</strong> : Vous mettez l'accent sur le problème ("avait des fissures") et vous semez le doute ("normalement").</p>

      <h3>✅ Ce qu'il FAUT dire</h3>
      <p>"La maison a fait l'objet d'une expertise structurelle complète en [année]. Les fondations ont été stabilisées par agrafage, avec une garantie décennale transmissible de [X] ans restants. Vous avez l'attestation et le rapport d'expertise complets dans le dossier."</p>
      <p><strong>Pourquoi c'est bon</strong> : Vous montrez que vous avez été <strong>proactif et responsable</strong>. Vous transformez un point faible en argument de vente (maison expertisée = sérénité).</p>

      <h2>Le cas des maisons en zone Cat-Nat (argument de vente)</h2>
      
      <p>Si votre maison est en zone classée "catastrophe naturelle sécheresse", c'est paradoxalement un <strong>argument de vente</strong> si les travaux sont faits :</p>

      <p><strong>Argument</strong> : "Cette maison a subi les conséquences de la sécheresse 2022-2023 (comme 80% des maisons toulousaines). Mais contrairement aux autres, <strong>elle a été réparée</strong>. Vous achetez une maison dont le problème a été traité, alors que vos voisins devront peut-être le faire dans 2-3 ans."</p>

      <h2>Conclusion : réparer = valoriser (et dormir tranquille)</h2>
      
      <p>Vendre une maison fissurée "en l'état", c'est :</p>
      <ul>
        <li>Perdre 20 à 30% de valeur (-75 000€ sur une maison de 300 000€)</li>
        <li>Attendre des mois avant de trouver un acheteur</li>
        <li>Risquer des litiges juridiques post-vente</li>
      </ul>

      <p>Faire réparer AVANT de vendre, c'est :</p>
      <ul>
        <li>Récupérer 80% de la valeur (économie de 45 000€ nette)</li>
        <li>Vendre plus vite (argument attestation décennale)</li>
        <li>Dormir tranquille (aucun risque de vice caché)</li>
      </ul>

      <p><strong>Notre conseil d'expert</strong> : Si vous envisagez de vendre dans les 2 ans, faites réaliser un diagnostic structurel maintenant (149€). Vous saurez exactement quels travaux faire, combien ça coûte, et combien vous allez récupérer à la revente. Dans 95% des cas, investir dans l'agrafage avant la vente est <strong>rentable</strong>.</p>

      <p class="font-bold text-lg text-slate-900 mt-6">Une maison réparée + garantie = un argument de vente, pas un boulet.</p>
    `
  },
  'fissure-plafond-que-faire': {
    slug: 'fissure-plafond-que-faire',
    title: 'Fissure au plafond : grave ou pas ? Le test simple pour savoir',
    excerpt: 'Une fissure au plafond peut être bénigne (retrait d\'enduit) ou alarmante (mouvement de charpente). Voici comment faire la différence en 5 minutes, sans paniquer inutilement ni minimiser un vrai danger.',
    date: '2026-12-05',
    readTime: '8 min',
    category: 'fissures',
    author: 'Expert IPB',
    metaDescription: 'Fissure plafond : grave ou pas ? Test simple, 5 types de fissures, causes (retrait/charpente/poutre), diagnostic, solutions. Expert Toulouse.',
    keywords: ['fissures plafond', 'fissures maison', 'diagnostic', 'structure', 'charpente', 'retrait enduit'],
    content: `
      <div class="mb-8 p-6 bg-orange-50 border-l-4 border-orange-600 rounded-r-lg">
        <p class="font-bold text-orange-900 mb-2">🔍 Règle simple</p>
        <p class="text-orange-800"><strong>Fissure fine + horizontale + ancienne = souvent bénigne</strong> (retrait d'enduit). <strong>Fissure large + en étoile + récente = potentiellement grave</strong> (mouvement structurel). Si en plus vous entendez des craquements ou voyez des fissures aux murs, c'est une urgence.</p>
      </div>

      <h2>Vous venez de voir une fissure au plafond (et vous paniquez un peu)</h2>
      
      <p>Vous levez les yeux dans votre salon ou votre chambre. Vous voyez <strong>cette ligne</strong> sur le plafond. Fine, mais bien visible. Votre première réaction : <strong>"C'est grave ? Le plafond va-t-il tomber ?"</strong></p>

      <p>Respirez. <strong>95% des fissures au plafond ne sont pas structurelles</strong>. Ce sont des fissures cosmétiques liées au retrait de l'enduit ou du plâtre. Mais les 5% restants nécessitent une attention immédiate.</p>

      <p class="font-bold text-lg text-slate-900 my-6">Voici comment savoir à quelle catégorie appartient votre fissure.</p>

      <h2>Les 5 types de fissures au plafond (et leur gravité)</h2>
      
      <h3>Type 1 : Fissure fine horizontale (bénigne dans 90% des cas)</h3>
      
      <p><strong>Apparence</strong> : Ligne fine (< 1 mm), souvent au milieu du plafond ou à la jonction plafond/mur, rectiligne</p>
      
      <p><strong>Cause</strong> : Retrait de l'enduit lors du séchage (maison neuve ou après rénovation), ou dilatation thermique du plâtre</p>
      
      <p><strong>Gravité</strong> : <span class="text-green-700 font-bold">✅ BÉNIGNE</span> - Purement esthétique</p>
      
      <p><strong>Action</strong> : Surveillance pendant 6 mois (test du scotch). Si stable, simple rebouchage suffit.</p>

      <h3>Type 2 : Fissure en toile d'araignée / faïençage (bénigne)</h3>
      
      <p><strong>Apparence</strong> : Réseau de micro-fissures fines (< 0,5 mm) qui se croisent, comme une toile d'araignée</p>
      
      <p><strong>Cause</strong> : Fatigue de l'enduit de finition, excès d'humidité lors de l'application, ou peinture trop rigide</p>
      
      <p><strong>Gravité</strong> : <span class="text-green-700 font-bold">✅ BÉNIGNE</span> - Esthétique uniquement</p>
      
      <p><strong>Action</strong> : Ponçage + enduit de lissage + peinture</p>

      <h3>Type 3 : Fissure à la jonction plafond/mur (surveillance)</h3>
      
      <p><strong>Apparence</strong> : Fissure qui suit l'angle entre le plafond et le mur, parfois sur plusieurs mètres</p>
      
      <p><strong>Cause</strong> : Soit mouvement différentiel entre le mur et le plafond (dilatation), soit défaut de chaînage entre les deux éléments</p>
      
      <p><strong>Gravité</strong> : <span class="text-yellow-700 font-bold">⚠️ SURVEILLANCE</span> - Peut être bénin ou révélateur d'un mouvement</p>
      
      <p><strong>Action</strong> : Test d'évolutivité pendant 6 mois. Si elle s'agrandit ET que vous avez d'autres signes (portes qui coincent, fissures aux murs), diagnostic structurel recommandé.</p>

      <h3>Type 4 : Fissure en étoile autour d'un luminaire (potentiellement grave)</h3>
      
      <p><strong>Apparence</strong> : Plusieurs fissures partent d'un point central (souvent un luminaire, une poutre apparente, ou un point de fixation)</p>
      
      <p><strong>Cause</strong> : Flexion excessive du plafond (plancher au-dessus trop chargé, poutre qui fléchit, ou défaut structurel)</p>
      
      <p><strong>Gravité</strong> : <span class="text-red-700 font-bold">🚨 POTENTIELLEMENT GRAVE</span> - Indique une contrainte localisée importante</p>
      
      <p><strong>Action</strong> : Diagnostic structurel immédiat. Vérifier la capacité portante du plancher/poutre.</p>

      <h3>Type 5 : Fissure large traversante (URGENCE)</h3>
      
      <p><strong>Apparence</strong> : Fissure > 2 mm, qui traverse tout le plafond, parfois avec un léger affaissement visible</p>
      
      <p><strong>Cause</strong> : Défaillance structurelle (poutre qui cède, solivage insuffisant, surcharge importante, ou mouvement de fondations qui se répercute)</p>
      
      <p><strong>Gravité</strong> : <span class="text-red-700 font-bold">🚨🚨 URGENCE</span> - Risque d'effondrement partiel</p>
      
      <p><strong>Action</strong> : Expertise structurelle URGENTE. Ne pas utiliser la pièce au-dessus tant que la sécurité n'est pas confirmée.</p>

      <h2>Le test décisif : votre fissure est-elle active ?</h2>
      
      <p>Même une fissure qui SEMBLE grave peut être stabilisée (et donc bénigne). À l'inverse, une fissure fine peut être <strong>évolutive</strong> (et donc préoccupante).</p>

      <h3>Test du scotch (3-6 mois)</h3>
      <ol>
        <li>Collez un morceau de scotch large sur la fissure</li>
        <li>Tracez une ligne au stylo qui traverse le scotch ET la fissure</li>
        <li>Notez la date</li>
        <li>Attendez 3 à 6 mois</li>
        <li>Si le scotch se déchire ou la ligne est décalée → <strong>fissure active</strong> → Diagnostic nécessaire</li>
      </ol>

      <h2>Les signes collatéraux qui changent tout</h2>
      
      <p>Une fissure au plafond <strong>isolée</strong> est rarement grave. Mais si vous observez AUSSI l'un de ces signes, la gravité augmente :</p>

      <ul>
        <li><strong>Fissures aux murs</strong> (en escalier ou verticales près des angles)</li>
        <li><strong>Portes qui coincent</strong> ou fenêtres déformées</li>
        <li><strong>Carrelage fissuré</strong> au sol</li>
        <li><strong>Craquements</strong> la nuit (bois/structure qui travaille)</li>
        <li><strong>Affaissement visible</strong> du plafond (même léger, 1-2 cm)</li>
        <li><strong>Poutres qui fléchissent</strong> (vérifier au niveau laser)</li>
      </ul>

      <p class="font-bold text-lg text-slate-900 my-6">Si fissure au plafond + au moins 2 signes collatéraux = mouvement structurel probable → Diagnostic urgent.</p>

      <h2>Causes structurelles des fissures au plafond</h2>
      
      <h3>Cause 1 : Flexion excessive du plancher supérieur</h3>
      <p>Un plancher trop chargé (combles aménagés avec mobilier lourd, chauffe-eau, etc.) peut fléchir et créer des contraintes sur le plafond en dessous.</p>
      <p><strong>Solution</strong> : Renforcement du solivage ou répartition de la charge</p>

      <h3>Cause 2 : Poutre sous-dimensionnée ou défaillante</h3>
      <p>Une poutre qui porte le plafond peut être sous-dimensionnée (erreur de conception) ou affaiblie (pourriture, insectes xylophages).</p>
      <p><strong>Solution</strong> : Remplacement ou renforcement de la poutre</p>

      <h3>Cause 3 : Mouvement de fondations qui se répercute</h3>
      <p>Un tassement différentiel des fondations peut créer des contraintes dans toute la structure, y compris au plafond.</p>
      <p><strong>Solution</strong> : Stabilisation des fondations (agrafage ou micropieux) + réparation du plafond</p>

      <h3>Cause 4 : Défaut de chaînage entre éléments</h3>
      <p>Si le plafond et les murs ne sont pas correctement chaînés (liaison structurelle), ils peuvent se désolidariser sous l'effet des dilatations thermiques.</p>
      <p><strong>Solution</strong> : Création de liaisons mécaniques (agrafes, tirants)</p>

      <h2>Quand reboucher suffit (et comment bien le faire)</h2>
      
      <p>Si votre fissure est <strong>inactive</strong> (test du scotch négatif) ET qu'il n'y a <strong>aucun signe collatéral</strong>, vous pouvez la reboucher vous-même :</p>

      <h3>Méthode professionnelle</h3>
      <ol>
        <li><strong>Élargir la fissure en V</strong> : Avec un grattoir, creusez légèrement la fissure pour qu'elle soit en forme de V (l'enduit accroche mieux)</li>
        <li><strong>Dépoussiérer</strong> : Brossez et aspirez</li>
        <li><strong>Appliquer un calicot</strong> : Collez une bande de calicot (fibre de verre) sur la fissure avec de l'enduit</li>
        <li><strong>Enduire</strong> : Appliquez 2 couches d'enduit de lissage en laissant sécher entre les couches</li>
        <li><strong>Poncer</strong> : Papier grain 120 puis 180</li>
        <li><strong>Peindre</strong> : 2 couches de peinture</li>
      </ol>

      <p><strong>Coût DIY</strong> : 10€ - 20€ de matériel<br>
      <strong>Coût pro</strong> : 50€ - 150€ selon surface</p>

      <h2>Quand faire appel à un expert</h2>
      
      <div class="my-8 p-6 bg-red-50 border-l-4 border-red-600 rounded-r-lg">
        <p class="font-bold text-red-900 mb-2">🚨 Appelez un expert si :</p>
        <ul class="list-disc ml-6 text-red-800 space-y-2">
          <li>La fissure fait > 2 mm de large</li>
          <li>Elle évolue (test du scotch positif)</li>
          <li>Elle est en étoile ou traverse tout le plafond</li>
          <li>Vous avez aussi des fissures aux murs</li>
          <li>Vous entendez des craquements</li>
          <li>Le plafond semble affaissé (même légèrement)</li>
          <li>Des morceaux de plâtre/enduit se détachent</li>
        </ul>
      </div>

      <h2>Prix d'une réparation structurelle de plafond</h2>
      
      <h3>Réparation légère (renforcement local)</h3>
      <ul>
        <li>Pose de tirants métalliques ou agrafes</li>
        <li>Rebouchage + finitions</li>
        <li><strong>Coût</strong> : 500€ - 1 500€</li>
      </ul>

      <h3>Réparation moyenne (renforcement solivage)</h3>
      <ul>
        <li>Ajout de solives ou renforts métalliques</li>
        <li>Réfection partielle du plafond</li>
        <li><strong>Coût</strong> : 2 000€ - 5 000€</li>
      </ul>

      <h3>Réparation lourde (remplacement poutre)</h3>
      <ul>
        <li>Étaiement temporaire</li>
        <li>Remplacement de la poutre défaillante</li>
        <li>Réfection complète du plafond</li>
        <li><strong>Coût</strong> : 5 000€ - 15 000€</li>
      </ul>

      <h2>Cas particulier : fissure après travaux au-dessus</h2>
      
      <p>Si la fissure est apparue <strong>juste après des travaux</strong> à l'étage supérieur (aménagement de combles, pose de carrelage lourd, création d'une salle de bain...), il y a 90% de chances que ce soit lié à :</p>

      <ul>
        <li><strong>Surcharge</strong> : Le plancher n'était pas dimensionné pour la nouvelle charge</li>
        <li><strong>Vibrations</strong> : Les travaux ont créé des vibrations qui ont fissuré l'enduit</li>
      </ul>

      <p><strong>Action</strong> : Contactez l'entreprise qui a réalisé les travaux. Si c'est une surcharge, ils doivent renforcer le solivage (garantie décennale).</p>

      <h2>Conclusion : ne paniquez pas, mais ne minimisez pas</h2>
      
      <p>Une fissure au plafond est <strong>rarement une urgence immédiate</strong>, mais elle mérite toujours une attention. Voici la démarche à suivre :</p>

      <ol>
        <li><strong>Observez</strong> : Type de fissure ? Signes collatéraux ?</li>
        <li><strong>Testez</strong> : Test du scotch pendant 3-6 mois</li>
        <li><strong>Décidez</strong> : Si inactive + aucun signe = rebouchez. Si active ou signes collatéraux = diagnostic.</li>
      </ol>

      <p><strong>Notre conseil d'expert</strong> : En cas de doute, un diagnostic rapide (149€, déductible sur travaux) vous dira en 30 minutes si c'est bénin ou grave. Cette expertise peut vous éviter soit une panique inutile, soit un effondrement partiel dans 6 mois.</p>

      <p class="font-bold text-lg text-slate-900 mt-6">Mieux vaut 149€ de diagnostic que 15 000€ de réparation d'urgence.</p>
    `
  },
  'humidite-cave-sous-sol': {
    slug: 'humidite-cave-sous-sol',
    title: 'Cave humide : les 3 causes (et les 3 solutions qui marchent vraiment)',
    excerpt: 'Votre cave sent le moisi, les murs suintent, le salpêtre revient ? L\'humidité en cave vient de 3 sources : remontées capillaires, infiltrations latérales, ou condensation. Voici comment identifier LA bonne cause et appliquer LA bonne solution (injection, cuvelage, ou VMI).',
    date: '2026-01-10',
    readTime: '10 min',
    category: 'humidite',
    author: 'Expert IPB',
    metaDescription: 'Humidité cave/sous-sol : 3 causes, 3 solutions (cuvelage, injection résine, VMI). Diagnostic précis, prix 2025, délai séchage. Expert traitement humidité Toulouse.',
    keywords: ['humidité cave', 'cuvelage', 'injection résine', 'ventilation', 'VMI', 'sous-sol humide', 'cave enterrée'],
    content: `
      <div class="mb-8 p-6 bg-blue-50 border-l-4 border-blue-600 rounded-r-lg">
        <p class="font-bold text-blue-900 mb-2">💧 L'erreur à 8 000€</p>
        <p class="text-blue-800">Vous faites un cuvelage complet de votre cave pour 8 000€. Résultat : l'humidité persiste. Pourquoi ? Parce que c'était de la <strong>condensation</strong>, pas une infiltration. Une simple VMI à 2 500€ aurait suffi. Ne traitez JAMAIS sans avoir identifié la source exacte de l'humidité.</p>
      </div>

      <h2>Pourquoi les caves sont-elles TOUJOURS humides ?</h2>
      
      <p>Vous descendez dans votre cave. Cette <strong>odeur de moisi</strong> vous frappe. Les murs sont froids et humides au toucher. Du salpêtre apparaît dans les coins. Des cartons stockés sont moisis. Votre cave est <strong>inutilisable</strong>.</p>

      <p>Ce n'est pas une fatalité. L'humidité en cave a toujours <strong>une cause identifiable</strong>. Et une fois la cause identifiée, il existe une solution adaptée.</p>

      <p class="font-bold text-lg text-slate-900 my-6">Le problème ? 80% des gens traitent le mauvais problème et dépensent de l'argent inutilement.</p>

      <h2>Les 3 sources d'humidité en cave (diagnostic en 5 questions)</h2>
      
      <h3>Source 1 : Remontées capillaires (eau qui monte du sol)</h3>
      
      <p><strong>Comment savoir si c'est ça ?</strong></p>
      <ul>
        <li>Humidité concentrée en <strong>bas de mur</strong> (0-150 cm du sol)</li>
        <li>Présence de <strong>salpêtre</strong> (poudre blanche)</li>
        <li>Murs <strong>froids et humides</strong> au toucher</li>
        <li>Peinture qui cloque en bas de mur</li>
        <li><strong>Pas d'humidité au plafond</strong></li>
      </ul>

      <p><strong>Cause</strong> : L'eau du sol remonte dans les murs par capillarité (comme une éponge qui boit)</p>

      <p><strong>Solution</strong> : <strong>Injection de résine</strong> à la base des murs (80€ - 120€ /ml) + VMI pour accélérer le séchage</p>

      <h3>Source 2 : Infiltrations latérales (eau qui pousse sur les murs enterrés)</h3>
      
      <p><strong>Comment savoir si c'est ça ?</strong></p>
      <ul>
        <li>Humidité sur <strong>toute la hauteur du mur</strong> (pas seulement en bas)</li>
        <li>Murs <strong>extérieurs plus humides</strong> que les murs de refend</li>
        <li>Traces d'infiltration <strong>après la pluie</strong></li>
        <li>Parfois des <strong>suintements visibles</strong> ou des ruissellements</li>
        <li>Présence de <strong>moisissures vertes/noires</strong> (pas de salpêtre)</li>
      </ul>

      <p><strong>Cause</strong> : La pression hydrostatique de la nappe phréatique ou des eaux de ruissellement pousse l'eau à travers les murs enterrés</p>

      <p><strong>Solution</strong> : <strong>Cuvelage</strong> (revêtement étanche sur les murs + sol) + drainage extérieur si possible (80€ - 150€ /m²)</p>

      <h3>Source 3 : Condensation (air humide qui se condense sur les murs froids)</h3>
      
      <p><strong>Comment savoir si c'est ça ?</strong></p>
      <ul>
        <li>Humidité <strong>uniforme</strong> sur tous les murs (même les murs de refend non enterrés)</li>
        <li>Odeur de moisi <strong>forte</strong></li>
        <li>Gouttelettes d'eau sur les <strong>canalisations froides</strong></li>
        <li><strong>Pire en été</strong> (air chaud extérieur + cave froide = condensation)</li>
        <li><strong>Pas de salpêtre</strong></li>
        <li>Si vous aérez en ouvrant une fenêtre l'été, <strong>ça empire</strong></li>
      </ul>

      <p><strong>Cause</strong> : L'air chaud et humide de l'extérieur entre dans la cave froide, se refroidit, et l'eau qu'il contient se condense sur les murs</p>

      <p><strong>Solution</strong> : <strong>VMI</strong> (Ventilation Mécanique par Insufflation) qui insuffle de l'air sec (2 000€ - 4 000€)</p>

      <h2>Le test décisif : la feuille d'aluminium (en 24h)</h2>
      
      <p>Vous n'êtes pas sûr de la source ? Faites ce test simple :</p>

      <ol>
        <li>Séchez complètement une zone humide du mur avec un chiffon</li>
        <li>Collez un carré de papier aluminium (20x20 cm) en scotchant TOUS les bords (étanche)</li>
        <li>Attendez 24-48h</li>
        <li>Décollez délicatement</li>
      </ol>

      <p><strong>Résultat</strong> :</p>
      <ul>
        <li><strong>Humidité SOUS l'aluminium</strong> (côté mur) → <strong>Infiltration ou remontée capillaire</strong> (l'eau vient du mur)</li>
        <li><strong>Humidité SUR l'aluminium</strong> (côté cave) → <strong>Condensation</strong> (l'eau vient de l'air)</li>
      </ul>

      <h2>Solution 1 : L'injection de résine (contre les remontées capillaires)</h2>
      
      <h3>Comment ça marche ?</h3>
      <p>On injecte une résine hydrophobe à la base des murs (15-20 cm du sol) tous les 12 cm. Cette résine crée une <strong>barrière étanche</strong> qui empêche l'eau de remonter.</p>

      <h3>Étapes</h3>
      <ol>
        <li>Perçage (80 trous pour 10 mètres de mur)</li>
        <li>Injection résine sous pression</li>
        <li>Minéralisation (48h)</li>
        <li>Séchage du mur (6-12 mois)</li>
      </ol>

      <h3>Prix 2025</h3>
      <ul>
        <li><strong>Injection résine</strong> : 80€ - 120€ /ml</li>
        <li><strong>Exemple cave 30m²</strong> (15ml de mur) : 1 200€ - 1 800€</li>
        <li><strong>Garantie</strong> : 30 ans</li>
      </ul>

      <h2>Solution 2 : Le cuvelage (contre les infiltrations latérales)</h2>
      
      <h3>Comment ça marche ?</h3>
      <p>On applique un revêtement imperméable sur les murs ET le sol pour créer une <strong>"cuve" étanche</strong>. L'eau de l'extérieur ne peut plus entrer.</p>

      <h3>Types de cuvelage</h3>
      
      <h4>Cuvelage rigide (mortier étanche)</h4>
      <ul>
        <li>Application d'un mortier spécial hydrofuge en 2-3 couches</li>
        <li>Épaisseur : 2-3 cm</li>
        <li><strong>Prix</strong> : 80€ - 120€ /m²</li>
        <li><strong>Durée</strong> : 20-30 ans</li>
      </ul>

      <h4>Cuvelage souple (résine époxy)</h4>
      <ul>
        <li>Application d'une résine époxy en 2 couches + bande d'armature</li>
        <li>Épaisseur : 2-3 mm</li>
        <li><strong>Prix</strong> : 100€ - 150€ /m²</li>
        <li><strong>Durée</strong> : 30+ ans</li>
        <li><strong>Avantage</strong> : Suit les micro-mouvements du support</li>
      </ul>

      <h3>Prix total cave 30m²</h3>
      <ul>
        <li>Surface à traiter (murs + sol) : ~80m²</li>
        <li><strong>Cuvelage rigide</strong> : 6 400€ - 9 600€</li>
        <li><strong>Cuvelage souple</strong> : 8 000€ - 12 000€</li>
      </ul>

      <div class="my-8 p-6 bg-yellow-50 border-l-4 border-yellow-600 rounded-r-lg">
        <p class="font-bold text-yellow-900 mb-2">⚠️ Cuvelage seul = insuffisant si remontées capillaires</p>
        <p class="text-yellow-800">Le cuvelage bloque l'eau latérale, mais <strong>pas l'eau qui remonte du sol</strong>. Si vous avez AUSSI des remontées capillaires, il faut faire : injection résine (bas de mur) + cuvelage (reste du mur + sol).</p>
      </div>

      <h2>Solution 3 : La VMI (contre la condensation)</h2>
      
      <h3>Comment ça marche ?</h3>
      <p>Un appareil installé en haut de la cave <strong>insuffle de l'air sec</strong> en continu. Cet air sec :</p>
      <ul>
        <li>Chasse l'air humide</li>
        <li>Empêche la condensation sur les murs froids</li>
        <li>Accélère le séchage des murs</li>
      </ul>

      <h3>Avantages vs VMC</h3>
      <ul>
        <li><strong>VMC</strong> (extraction) : Aspire l'air humide → Risque d'aspirer l'air extérieur humide en été</li>
        <li><strong>VMI</strong> (insufflation) : Insuffle de l'air sec → Mise en surpression, empêche l'air extérieur d'entrer</li>
      </ul>

      <p><strong>Pour les caves, la VMI est plus efficace que la VMC.</strong></p>

      <h3>Prix 2025</h3>
      <ul>
        <li><strong>VMI</strong> : 2 000€ - 4 000€ (installation comprise)</li>
        <li><strong>Consommation électrique</strong> : 50€ - 100€ /an</li>
        <li><strong>Durée de vie</strong> : 15-20 ans</li>
      </ul>

      <h2>Le combo gagnant (cave très humide) : Injection + Cuvelage + VMI</h2>
      
      <p>Si votre cave cumule <strong>remontées capillaires + infiltrations latérales + condensation</strong> (cas fréquent pour les caves enterrées anciennes), il faut traiter les 3 sources :</p>

      <h3>Ordre des opérations</h3>
      <ol>
        <li><strong>Injection résine</strong> à la base des murs → Stoppe les remontées (jour 1)</li>
        <li><strong>Cuvelage</strong> sur les murs et sol → Stoppe les infiltrations latérales (semaine 2-3)</li>
        <li><strong>VMI</strong> → Évacue l'humidité résiduelle + empêche la condensation future (semaine 4)</li>
      </ol>

      <h3>Prix total cave 30m²</h3>
      <ul>
        <li>Injection (15ml) : 1 500€</li>
        <li>Cuvelage (80m²) : 8 000€</li>
        <li>VMI : 3 000€</li>
        <li><strong>TOTAL : 12 500€</strong></li>
      </ul>

      <p class="font-bold text-lg text-slate-900 my-6">Cher ? Oui. Mais c'est la SEULE solution définitive pour une cave très humide. Toute autre méthode sera un pansement temporaire.</p>

      <h2>Drainage extérieur : le complément (si possible)</h2>
      
      <p>Si votre cave est accessible de l'extérieur, un <strong>drainage périphérique</strong> peut compléter le cuvelage :</p>

      <h3>Comment ça marche ?</h3>
      <p>On creuse une tranchée le long des murs enterrés, on pose un drain qui collecte l'eau et la dirige vers un regard d'évacuation. Résultat : la pression hydrostatique diminue.</p>

      <h3>Prix</h3>
      <ul>
        <li><strong>Drainage périphérique</strong> : 150€ - 250€ /ml</li>
        <li><strong>Exemple maison 10m x 10m</strong> : 6 000€ - 10 000€</li>
      </ul>

      <p><strong>Attention</strong> : Le drainage seul ne suffit JAMAIS. Il faut aussi traiter l'intérieur (cuvelage ou injection).</p>

      <h2>Erreurs à éviter (et pourquoi ça ne marche pas)</h2>
      
      <h3>Erreur 1 : Peindre avec une peinture étanche</h3>
      <p><strong>Pourquoi ça ne marche pas</strong> : L'eau continue d'entrer dans le mur, mais ne peut plus s'évaporer. Le mur pourrit derrière la peinture, et les cloques reviennent.</p>

      <h3>Erreur 2 : Ouvrir les fenêtres en été</h3>
      <p><strong>Pourquoi ça ne marche pas</strong> : Vous faites entrer de l'air chaud et humide dans une cave froide → Condensation massive. En été, gardez les fenêtres FERMÉES et installez une VMI.</p>

      <h3>Erreur 3 : Utiliser un déshumidificateur seul</h3>
      <p><strong>Pourquoi ça ne marche pas</strong> : Il assèche l'air temporairement, mais l'eau continue d'entrer (infiltration ou remontée). Dès que vous l'éteignez, l'humidité revient. C'est un <strong>pansement</strong>, pas un traitement.</p>

      <h3>Erreur 4 : Faire un cuvelage alors que c'est de la condensation</h3>
      <p><strong>Pourquoi ça ne marche pas</strong> : Le cuvelage bloque l'eau qui vient du mur, pas l'eau qui vient de l'air. Vous dépensez 8 000€ pour rien.</p>

      <h2>Délai de séchage d'une cave (soyez patient)</h2>
      
      <p>Une fois les travaux réalisés (injection, cuvelage, VMI), <strong>combien de temps pour que la cave soit sèche ?</strong></p>

      <h3>Timeline réaliste</h3>
      <ul>
        <li><strong>Semaine 1-2</strong> : Les traitements sont actifs (injection = 48h, cuvelage = séchage 7 jours)</li>
        <li><strong>Mois 1-3</strong> : Début du séchage, l'humidité visible diminue</li>
        <li><strong>Mois 6-12</strong> : Cave complètement sèche (selon épaisseur des murs)</li>
      </ul>

      <p><strong>Règle</strong> : Comptez 1 mois par cm d'épaisseur de mur. Mur de 30 cm = 9-12 mois de séchage.</p>

      <h2>Transformer une cave humide en pièce de vie (réglementation)</h2>
      
      <p>Une fois la cave assainie, vous voulez peut-être l'aménager en pièce de vie (bureau, salle de jeux, chambre d'amis) ?</p>

      <h3>Obligations légales</h3>
      <ul>
        <li><strong>Hauteur sous plafond</strong> : Minimum 2,20 m</li>
        <li><strong>Ventilation</strong> : VMC ou VMI obligatoire</li>
        <li><strong>Isolation</strong> : Isoler les murs après traitement humidité</li>
        <li><strong>Chauffage</strong> : Système de chauffage adapté</li>
        <li><strong>Déclaration</strong> : Autorisation de travaux si changement de destination</li>
      </ul>

      <h2>Conclusion : identifiez la source AVANT de dépenser</h2>
      
      <p>L'humidité en cave a toujours une cause. Mais <strong>traiter la mauvaise cause</strong> vous fera perdre du temps et de l'argent :</p>

      <ul>
        <li>Cuvelage alors que c'est de la condensation = 8 000€ perdus</li>
        <li>VMI alors que c'est une infiltration = 3 000€ perdus</li>
        <li>Injection seule alors qu'il faut aussi du cuvelage = traitement incomplet</li>
      </ul>

      <p><strong>Notre conseil d'expert</strong> : Avant tout travaux, faites réaliser un diagnostic précis (149€, déductible sur travaux). Un expert viendra avec un humidimètre, identifiera les sources d'humidité, et vous proposera LA bonne solution (pas la plus chère, la plus adaptée). Cette expertise vous fera économiser des milliers d'euros en évitant le mauvais traitement.</p>

      <p class="font-bold text-lg text-slate-900 mt-6">Une cave saine = un diagnostic précis + le bon traitement.</p>
    `
  },

  // ═══════════════════════════════════════════════════════════════
  // NOUVEAUX ARTICLES - SEO DÉPARTEMENTAL (Janvier 2026)
  // ═══════════════════════════════════════════════════════════════

  'expert-fissures-gers-guide-complet': {
    slug: 'expert-fissures-gers-guide-complet',
    title: 'Expert Fissures dans le Gers (32) : Guide Complet 2026',
    excerpt: 'Votre maison gersoise se fissure ? Découvrez les causes spécifiques au sol gascon, les solutions adaptées et comment choisir le bon expert dans le Gers. Guide complet par IPB.',
    date: '2026-01-31',
    readTime: '10 min',
    category: 'fissures',
    author: 'Expert IPB',
    metaDescription: 'Expert fissures Gers : causes des fissures sur les maisons gasconnes, sols argileux, solutions (agrafage, injection). Prix, délais, garanties. Diagnostic gratuit à Auch, Condom, Fleurance.',
    keywords: ['expert fissures gers', 'fissures maison gers', 'agrafage fissures 32', 'expert fissure auch', 'fissures condom', 'sol argileux gascogne', 'réparation fissures gers'],
    content: `
      <div class="mb-8 p-6 bg-amber-50 border-l-4 border-amber-600 rounded-r-lg">
        <p class="font-bold text-amber-900 mb-2">📍 Vous êtes dans le Gers ?</p>
        <p class="text-amber-800">Ce guide est spécialement conçu pour les propriétaires gersois. Nous intervenons à Auch, Condom, Fleurance, L'Isle-Jourdain, Mirande et dans tout le département.</p>
      </div>

      <h2>Pourquoi les maisons du Gers se fissurent-elles ?</h2>
      
      <p>Le Gers est un département où les fissures sur les maisons sont particulièrement fréquentes. Mais pourquoi ? Trois facteurs expliquent cette vulnérabilité :</p>

      <h3>1. Le sol argilo-calcaire gascon</h3>
      <p>La Gascogne repose majoritairement sur un sous-sol <strong>argilo-calcaire</strong>. Ce type de sol a la particularité de :</p>
      <ul>
        <li><strong>Gonfler</strong> lorsqu'il pleut (les argiles absorbent l'eau)</li>
        <li><strong>Se rétracter</strong> en période sèche (jusqu'à 15% de volume perdu)</li>
        <li><strong>Créer des mouvements de terrain</strong> qui tirent sur les fondations</li>
      </ul>
      
      <p>Les communes les plus touchées : <strong>Auch, Condom, Lectoure, Fleurance</strong> où les sols argileux sont particulièrement sensibles.</p>

      <h3>2. Les sécheresses à répétition</h3>
      <p>Depuis 2019, le Gers a été classé en <strong>catastrophe naturelle sécheresse</strong> à plusieurs reprises. Les étés 2022 et 2023 ont été dévastateurs :</p>
      <ul>
        <li>Températures record dépassant 40°C</li>
        <li>Déficit pluviométrique de 30 à 50%</li>
        <li>Sol fissuré sur plusieurs centimètres en surface</li>
      </ul>
      <p>Résultat : des centaines de maisons gersoises ont développé des fissures structurelles.</p>

      <h3>3. Le bâti traditionnel gascon</h3>
      <p>Les maisons gasconnes traditionnelles présentent des caractéristiques qui les rendent vulnérables :</p>
      <ul>
        <li><strong>Fondations peu profondes</strong> (souvent 40-60 cm seulement)</li>
        <li><strong>Murs en pierre ou brique</strong> sans chaînage</li>
        <li><strong>Constructions des années 70-90</strong> avant les normes anti-sismiques</li>
      </ul>

      <h2>Les 3 types de fissures rencontrées dans le Gers</h2>

      <h3>Type 1 : Fissures en escalier (les plus fréquentes)</h3>
      <p>Elles suivent les joints de maçonnerie et forment un "escalier". C'est le signe classique d'un <strong>tassement différentiel</strong> : une partie de la maison s'enfonce plus que l'autre.</p>
      <p><strong>Gravité</strong> : Moyenne à élevée selon l'ouverture (> 2mm = intervention urgente)</p>

      <h3>Type 2 : Fissures horizontales</h3>
      <p>Elles apparaissent souvent à la jonction mur/fondation ou sous les fenêtres. Elles indiquent un <strong>mouvement de poussée</strong> ou un affaissement.</p>
      <p><strong>Gravité</strong> : Élevée - À faire expertiser rapidement</p>

      <h3>Type 3 : Micro-fissures en toile d'araignée</h3>
      <p>Un réseau de fines fissures (< 0.5mm) sur l'enduit. C'est souvent un <strong>vieillissement de l'enduit</strong> et non un problème structurel.</p>
      <p><strong>Gravité</strong> : Faible - Ravalement suffisant</p>

      <h2>Solutions de traitement adaptées au Gers</h2>

      <h3>L'agrafage : la solution économique pour 80% des cas</h3>
      <p>L'agrafage consiste à "recoudre" les murs avec des agrafes en acier inoxydable. C'est la technique idéale pour :</p>
      <ul>
        <li>Fissures de tassement modéré (< 5mm d'ouverture)</li>
        <li>Maisons sur sol stabilisé</li>
        <li>Budget maîtrisé (8 000€ - 15 000€ en moyenne)</li>
      </ul>
      
      <div class="my-6 p-4 bg-green-50 border border-green-200 rounded-lg">
        <p class="font-bold text-green-800">✅ Avantage Gers : L'agrafage est particulièrement efficace sur les maisons gasconnes en brique, car il s'adapte parfaitement à ce type de maçonnerie.</p>
      </div>

      <h3>L'injection de résine : pour les fondations</h3>
      <p>Si les fondations ont bougé, l'injection de résine expansive permet de :</p>
      <ul>
        <li>Combler les vides sous les fondations</li>
        <li>Relever légèrement la structure (jusqu'à quelques centimètres)</li>
        <li>Stabiliser durablement le sol</li>
      </ul>
      <p><strong>Coût moyen</strong> : 6 000€ - 12 000€</p>

      <h3>Les micropieux : en dernier recours</h3>
      <p>Pour les cas les plus graves (affaissement > 10 cm, sol très instable), les micropieux ancrent la maison sur une couche de sol stable en profondeur.</p>
      <p><strong>Coût moyen</strong> : 25 000€ - 50 000€</p>
      <p><strong>Notre conseil</strong> : Dans le Gers, les micropieux sont rarement nécessaires. Méfiez-vous des entreprises qui vous les proposent systématiquement.</p>

      <h2>Comment choisir son expert fissures dans le Gers ?</h2>

      <h3>Les critères essentiels</h3>
      <ul>
        <li><strong>Garantie décennale</strong> : Obligatoire, demandez l'attestation</li>
        <li><strong>Connaissance du terrain local</strong> : L'expert doit connaître les sols gersois</li>
        <li><strong>Diagnostic avant devis</strong> : Fuyez ceux qui proposent des travaux sans expertise</li>
        <li><strong>Plusieurs solutions proposées</strong> : Pas seulement la plus chère</li>
      </ul>

      <h3>Les questions à poser</h3>
      <ol>
        <li>Avez-vous déjà traité des maisons dans le Gers ?</li>
        <li>Pouvez-vous me montrer des références locales ?</li>
        <li>Le diagnostic est-il gratuit ?</li>
        <li>Quelle est la durée de garantie des travaux ?</li>
      </ol>

      <h2>Prix des interventions dans le Gers</h2>
      
      <div class="my-6 overflow-x-auto">
        <table class="w-full border-collapse border border-slate-200">
          <thead class="bg-slate-100">
            <tr>
              <th class="border border-slate-200 p-3 text-left">Intervention</th>
              <th class="border border-slate-200 p-3 text-left">Prix moyen</th>
              <th class="border border-slate-200 p-3 text-left">Délai</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border border-slate-200 p-3">Diagnostic expert</td>
              <td class="border border-slate-200 p-3 font-bold text-green-600">Gratuit (IPB)</td>
              <td class="border border-slate-200 p-3">3-5 jours</td>
            </tr>
            <tr>
              <td class="border border-slate-200 p-3">Agrafage façade</td>
              <td class="border border-slate-200 p-3">8 000€ - 15 000€</td>
              <td class="border border-slate-200 p-3">3-5 jours</td>
            </tr>
            <tr>
              <td class="border border-slate-200 p-3">Injection résine</td>
              <td class="border border-slate-200 p-3">6 000€ - 12 000€</td>
              <td class="border border-slate-200 p-3">1-2 jours</td>
            </tr>
            <tr>
              <td class="border border-slate-200 p-3">Micropieux</td>
              <td class="border border-slate-200 p-3">25 000€ - 50 000€</td>
              <td class="border border-slate-200 p-3">2-4 semaines</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Villes du Gers où nous intervenons</h2>
      <p>IPB intervient dans tout le département du Gers (32) :</p>
      <ul>
        <li><strong>Auch</strong> : Préfecture, zone très touchée par les fissures</li>
        <li><strong>Condom</strong> : Bâti ancien sensible aux mouvements de terrain</li>
        <li><strong>Fleurance</strong> : Maisons des années 80 particulièrement vulnérables</li>
        <li><strong>L'Isle-Jourdain</strong> : Proche Toulouse, sols argileux identiques</li>
        <li><strong>Mirande</strong> : Bastide ancienne avec problématiques spécifiques</li>
        <li><strong>Lectoure, Gimont, Lombez</strong> : Et toutes les communes du département</li>
      </ul>

      <h2>Conclusion : agissez avant que ça s'aggrave</h2>
      
      <p>Les fissures dans le Gers ne sont pas une fatalité. Mais plus vous attendez, plus :</p>
      <ul>
        <li>Les fissures s'aggravent (surtout en été)</li>
        <li>Les travaux coûtent cher</li>
        <li>La valeur de votre maison baisse</li>
      </ul>

      <p><strong>Notre conseil</strong> : Faites réaliser un diagnostic gratuit dès les premiers signes. Un expert se déplace chez vous, évalue la situation, et vous propose des solutions adaptées à votre cas et votre budget.</p>

      <p class="font-bold text-lg text-slate-900 mt-6">📞 IPB intervient dans tout le Gers. Diagnostic gratuit sous 5 jours : 05 82 95 33 75</p>
    `
  },

  'merule-champignon-maison-danger': {
    slug: 'merule-champignon-maison-danger',
    title: 'Mérule : Le Champignon qui Dévore les Maisons (Guide Complet 2026)',
    excerpt: 'La mérule est le cauchemar des propriétaires. Ce champignon lignivore détruit silencieusement les charpentes et boiseries. Comment l\'identifier, l\'éliminer et surtout : comment éviter qu\'elle ne revienne.',
    date: '2026-01-31',
    readTime: '12 min',
    category: 'humidite',
    author: 'Expert IPB',
    metaDescription: 'Mérule maison : identification, dangers, traitement, prix. Expert champignon lignivore Toulouse. Comment reconnaître la mérule, la différencier des autres champignons, et l\'éliminer définitivement.',
    keywords: ['mérule', 'merule', 'champignon maison', 'champignon bois', 'mérule pleureuse', 'traitement mérule', 'mérule toulouse', 'champignon lignivore', 'pourriture bois'],
    content: `
      <div class="mb-8 p-6 bg-red-50 border-l-4 border-red-600 rounded-r-lg">
        <p class="font-bold text-red-900 mb-2">🚨 La mérule est une urgence</p>
        <p class="text-red-800">La mérule peut détruire une charpente en quelques mois. Si vous suspectez sa présence, <strong>n'attendez pas</strong>. Chaque semaine de retard aggrave les dégâts et augmente le coût des travaux.</p>
      </div>

      <h2>Qu'est-ce que la mérule ?</h2>
      
      <p>La <strong>mérule pleureuse</strong> (Serpula lacrymans) est un champignon lignivore, c'est-à-dire qu'il se nourrit du bois. Mais contrairement aux autres champignons du bois, la mérule est particulièrement dangereuse car :</p>

      <ul>
        <li><strong>Elle se développe dans l'obscurité</strong> : Derrière les cloisons, sous les planchers, dans les caves</li>
        <li><strong>Elle traverse les murs</strong> : Ses filaments (mycélium) peuvent traverser la maçonnerie pour atteindre d'autres boiseries</li>
        <li><strong>Elle crée sa propre humidité</strong> : Une fois installée, elle génère l'eau dont elle a besoin</li>
        <li><strong>Elle détruit le bois en profondeur</strong> : Le bois devient friable, se casse en cubes ("pourriture cubique")</li>
      </ul>

      <p class="font-bold text-lg text-slate-900 my-6">La mérule est surnommée "le cancer du bâtiment" car elle se propage silencieusement et peut rendre une maison inhabitable.</p>

      <h2>Comment reconnaître la mérule ?</h2>

      <h3>Les signes visuels caractéristiques</h3>
      
      <ul>
        <li><strong>Filaments blancs cotonneux</strong> (mycélium) sur les murs, les bois, dans les coins sombres</li>
        <li><strong>Carpophore</strong> (partie visible du champignon) : masse brunâtre/orangée, aspect de crêpe ou d'éponge, bordure blanche</li>
        <li><strong>Cordons gris</strong> : Sortes de "racines" qui traversent les joints et les murs</li>
        <li><strong>Bois qui s'effrite</strong> en cubes, comme du bois de chauffage pourri</li>
        <li><strong>Peinture qui cloque</strong> ou papier peint qui se décolle</li>
      </ul>

      <h3>Les signes olfactifs</h3>
      <p>La mérule dégage une <strong>odeur caractéristique de champignon forestier</strong>, parfois décrite comme "odeur de cave humide" ou "de sous-bois". Si vous sentez cette odeur dans une pièce fermée, c'est un signal d'alerte.</p>

      <h3>Les conditions favorables</h3>
      <p>La mérule se développe dans un environnement précis :</p>
      <ul>
        <li><strong>Humidité</strong> : Taux supérieur à 22% dans le bois</li>
        <li><strong>Température</strong> : Entre 20°C et 26°C (idéal : 23°C)</li>
        <li><strong>Obscurité</strong> : Absence de lumière directe</li>
        <li><strong>Confinement</strong> : Manque de ventilation</li>
      </ul>

      <div class="my-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
        <p class="font-bold text-amber-800">💡 Bon à savoir : La mérule est plus fréquente dans les régions humides (Bretagne, Nord, Normandie) mais elle existe aussi en Occitanie, notamment dans les maisons anciennes avec problèmes d'humidité.</p>
      </div>

      <h2>Mérule vs autres champignons : ne pas confondre</h2>

      <div class="my-8 overflow-x-auto">
        <table class="w-full border-collapse border border-slate-200">
          <thead class="bg-slate-900 text-white">
            <tr>
              <th class="border border-slate-300 p-3 text-left">Caractéristique</th>
              <th class="border border-slate-300 p-3 text-center">Mérule</th>
              <th class="border border-slate-300 p-3 text-center">Coniophore</th>
              <th class="border border-slate-300 p-3 text-center">Moisissure</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border border-slate-200 p-3 font-bold">Danger</td>
              <td class="border border-slate-200 p-3 text-center bg-red-50 text-red-700 font-bold">Extrême</td>
              <td class="border border-slate-200 p-3 text-center bg-orange-50 text-orange-700">Élevé</td>
              <td class="border border-slate-200 p-3 text-center bg-yellow-50 text-yellow-700">Modéré</td>
            </tr>
            <tr>
              <td class="border border-slate-200 p-3 font-bold">Apparence</td>
              <td class="border border-slate-200 p-3 text-center">Masse orange/brune, bord blanc</td>
              <td class="border border-slate-200 p-3 text-center">Croûte brune/olive</td>
              <td class="border border-slate-200 p-3 text-center">Taches noires/vertes</td>
            </tr>
            <tr>
              <td class="border border-slate-200 p-3 font-bold">Traverse les murs</td>
              <td class="border border-slate-200 p-3 text-center font-bold text-red-600">OUI</td>
              <td class="border border-slate-200 p-3 text-center">Non</td>
              <td class="border border-slate-200 p-3 text-center">Non</td>
            </tr>
            <tr>
              <td class="border border-slate-200 p-3 font-bold">Dégâts sur le bois</td>
              <td class="border border-slate-200 p-3 text-center">Pourriture cubique profonde</td>
              <td class="border border-slate-200 p-3 text-center">Pourriture cubique</td>
              <td class="border border-slate-200 p-3 text-center">Superficiel</td>
            </tr>
            <tr>
              <td class="border border-slate-200 p-3 font-bold">Traitement</td>
              <td class="border border-slate-200 p-3 text-center">Lourd et coûteux</td>
              <td class="border border-slate-200 p-3 text-center">Modéré</td>
              <td class="border border-slate-200 p-3 text-center">Simple</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Les dangers de la mérule</h2>

      <h3>1. Dangers structurels</h3>
      <p>La mérule ne se contente pas de dégrader l'aspect du bois. Elle le détruit en profondeur :</p>
      <ul>
        <li><strong>Charpentes</strong> : Risque d'effondrement de toiture</li>
        <li><strong>Planchers</strong> : Solives qui cèdent, planchers qui s'affaissent</li>
        <li><strong>Escaliers</strong> : Marches qui cassent</li>
        <li><strong>Huisseries</strong> : Portes et fenêtres qui ne ferment plus</li>
      </ul>

      <h3>2. Dangers pour la santé</h3>
      <p>La mérule libère des <strong>spores</strong> dans l'air qui peuvent provoquer :</p>
      <ul>
        <li>Allergies respiratoires</li>
        <li>Irritations des yeux et de la peau</li>
        <li>Asthme aggravé</li>
        <li>Fatigue chronique</li>
      </ul>

      <h3>3. Dangers financiers</h3>
      <ul>
        <li><strong>Coût du traitement</strong> : 15 000€ à 100 000€+ selon l'étendue</li>
        <li><strong>Dépréciation immobilière</strong> : -20% à -50% de la valeur</li>
        <li><strong>Obligation de déclaration</strong> : Dans certaines zones (Bretagne, Normandie), vous devez déclarer la mérule en mairie</li>
      </ul>

      <h2>Traitement de la mérule : les étapes</h2>

      <h3>1. Diagnostic professionnel (obligatoire)</h3>
      <p>Un expert doit identifier avec certitude qu'il s'agit de mérule et non d'un autre champignon. Le diagnostic comprend :</p>
      <ul>
        <li>Inspection visuelle complète (y compris espaces cachés)</li>
        <li>Mesure d'humidité des matériaux</li>
        <li>Prélèvement et analyse en laboratoire si doute</li>
        <li>Cartographie de la zone contaminée</li>
      </ul>

      <h3>2. Traitement curatif</h3>
      <p>Le traitement de la mérule est un chantier lourd qui comprend :</p>
      
      <ol>
        <li><strong>Mise à nu</strong> : Retrait des enduits, plâtres, isolants jusqu'à 1m au-delà de la zone visible</li>
        <li><strong>Destruction des bois infestés</strong> : Tous les bois touchés doivent être retirés et brûlés (pas de réemploi)</li>
        <li><strong>Traitement des maçonneries</strong> : Brossage, décapage, puis traitement fongicide en profondeur (injection sous pression)</li>
        <li><strong>Traitement des bois conservés</strong> : Application de produits fongicides sur tous les bois à moins de 3m de la zone infestée</li>
        <li><strong>Traitement de la cause</strong> : Élimination de la source d'humidité (indispensable, sinon la mérule reviendra)</li>
        <li><strong>Reconstruction</strong> : Remplacement des bois, enduits, finitions</li>
      </ol>

      <div class="my-6 p-4 bg-red-50 border border-red-200 rounded-lg">
        <p class="font-bold text-red-800">⚠️ Attention : Un traitement superficiel (juste "tuer" le champignon visible) est inefficace. La mérule reviendra si vous ne traitez pas la source d'humidité ET tous les matériaux contaminés.</p>
      </div>

      <h2>Coût du traitement de la mérule</h2>

      <div class="my-6 overflow-x-auto">
        <table class="w-full border-collapse border border-slate-200">
          <thead class="bg-slate-100">
            <tr>
              <th class="border border-slate-200 p-3 text-left">Étendue</th>
              <th class="border border-slate-200 p-3 text-left">Description</th>
              <th class="border border-slate-200 p-3 text-left">Coût estimé</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border border-slate-200 p-3 font-bold">Localisée</td>
              <td class="border border-slate-200 p-3">1 pièce, détection précoce</td>
              <td class="border border-slate-200 p-3">10 000€ - 25 000€</td>
            </tr>
            <tr>
              <td class="border border-slate-200 p-3 font-bold">Modérée</td>
              <td class="border border-slate-200 p-3">Plusieurs pièces, charpente touchée</td>
              <td class="border border-slate-200 p-3">25 000€ - 60 000€</td>
            </tr>
            <tr>
              <td class="border border-slate-200 p-3 font-bold">Étendue</td>
              <td class="border border-slate-200 p-3">Maison entière, structure compromise</td>
              <td class="border border-slate-200 p-3">60 000€ - 150 000€+</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p><strong>Assurance</strong> : La mérule est rarement couverte par l'assurance habitation standard. Vérifiez votre contrat ou souscrivez une garantie spécifique si vous êtes dans une zone à risque.</p>

      <h2>Comment prévenir la mérule ?</h2>

      <p>La mérule a besoin d'humidité pour se développer. La prévention passe donc par :</p>

      <ul>
        <li><strong>Ventiler</strong> : Aérer régulièrement caves, greniers, pièces humides</li>
        <li><strong>Traiter l'humidité</strong> : Remontées capillaires, infiltrations, condensation</li>
        <li><strong>Surveiller</strong> : Inspecter régulièrement les espaces sombres et humides</li>
        <li><strong>Réparer rapidement</strong> : Toute fuite d'eau doit être traitée immédiatement</li>
        <li><strong>Traiter les bois</strong> : Produits fongicides préventifs sur les charpentes</li>
      </ul>

      <h2>La mérule en Occitanie : existe-t-elle ?</h2>

      <p>Contrairement aux idées reçues, la mérule n'est pas réservée aux régions du Nord. En Occitanie, on la trouve :</p>
      <ul>
        <li>Dans les <strong>maisons anciennes</strong> avec problèmes d'humidité non traités</li>
        <li>Dans les <strong>caves et sous-sols</strong> mal ventilés</li>
        <li>Après des <strong>dégâts des eaux</strong> mal séchés</li>
        <li>Dans les <strong>bâtiments inoccupés</strong> pendant longtemps</li>
      </ul>

      <p>À Toulouse et en Haute-Garonne, nous intervenons régulièrement sur des cas de champignons lignivores. Si le climat est globalement plus sec qu'en Bretagne, les maisons anciennes avec remontées capillaires présentent les mêmes risques.</p>

      <h2>Que faire si vous suspectez la mérule ?</h2>

      <ol>
        <li><strong>Ne touchez à rien</strong> : Évitez de gratter ou nettoyer, vous risquez de disperser les spores</li>
        <li><strong>Aérez</strong> : Ouvrez les fenêtres pour réduire l'humidité ambiante</li>
        <li><strong>Photographiez</strong> : Documentez ce que vous voyez</li>
        <li><strong>Faites appel à un expert</strong> : Seul un professionnel peut confirmer le diagnostic</li>
        <li><strong>N'attendez pas</strong> : Chaque semaine compte avec la mérule</li>
      </ol>

      <h2>Conclusion</h2>

      <p>La mérule est un problème grave mais pas une fatalité. Détectée tôt, elle peut être traitée efficacement. La clé est de :</p>
      <ul>
        <li><strong>Agir vite</strong> dès les premiers signes suspects</li>
        <li><strong>Faire appel à des professionnels</strong> qualifiés</li>
        <li><strong>Traiter la cause</strong> (humidité) et pas seulement les symptômes</li>
      </ul>

      <p class="font-bold text-lg text-slate-900 mt-6">📞 Suspicion de mérule ou champignon ? Diagnostic expert : 05 82 95 33 75</p>
    `
  },

  'salpetre-toulouse-traitement-definitif': {
    slug: 'salpetre-toulouse-traitement-definitif',
    title: 'Salpêtre à Toulouse : Causes, Diagnostic et Traitement Définitif',
    excerpt: 'Poudre blanche sur vos murs à Toulouse ? C\'est probablement du salpêtre, signe de remontées capillaires. Découvrez pourquoi les maisons toulousaines sont touchées et comment éliminer ce problème définitivement.',
    date: '2026-01-31',
    readTime: '8 min',
    category: 'humidite',
    author: 'Expert IPB',
    metaDescription: 'Salpêtre Toulouse : expert traitement définitif. Pourquoi les maisons toulousaines sont touchées, solutions injection résine, prix. Diagnostic gratuit Haute-Garonne.',
    keywords: ['salpêtre toulouse', 'salpetre mur toulouse', 'traitement salpêtre 31', 'poudre blanche mur', 'remontée capillaire toulouse', 'humidité mur toulouse'],
    content: `
      <div class="mb-8 p-6 bg-blue-50 border-l-4 border-blue-600 rounded-r-lg">
        <p class="font-bold text-blue-900 mb-2">📍 Vous êtes à Toulouse ou en Haute-Garonne ?</p>
        <p class="text-blue-800">Ce guide traite spécifiquement du salpêtre dans les maisons de la région toulousaine, avec ses particularités liées au sol argileux et au bâti local.</p>
      </div>

      <h2>Pourquoi le salpêtre est fréquent à Toulouse ?</h2>
      
      <p>Toulouse et sa périphérie présentent des conditions favorables aux remontées capillaires (et donc au salpêtre) :</p>

      <h3>1. Le sol argileux</h3>
      <p>Le sol toulousain est majoritairement <strong>argileux</strong>. En période de pluie, l'argile retient l'eau comme une éponge. Cette eau remonte ensuite dans les murs par capillarité, transportant les sels minéraux qui formeront le salpêtre.</p>

      <h3>2. Les maisons en brique</h3>
      <p>Les maisons traditionnelles toulousaines sont construites en <strong>brique de terre cuite</strong>. Ce matériau, bien que noble, est <strong>très poreux</strong>. L'eau remonte plus facilement que dans un mur en béton.</p>

      <h3>3. Les fondations anciennes</h3>
      <p>Beaucoup de maisons toulousaines datent d'avant les années 1970, époque où les <strong>barrières anti-humidité</strong> n'étaient pas systématiques. Sans cette protection, rien n'empêche l'eau de remonter.</p>

      <h2>Reconnaître le salpêtre dans votre maison</h2>

      <h3>Où le chercher ?</h3>
      <ul>
        <li><strong>Bas des murs</strong> : Zone de 0 à 1,5 mètre du sol</li>
        <li><strong>Caves et sous-sols</strong> : Particulièrement les murs enterrés</li>
        <li><strong>Garage</strong> : Surtout si en rez-de-chaussée</li>
        <li><strong>Pièces nord</strong> : Moins de soleil = séchage plus lent</li>
      </ul>

      <h3>À quoi ça ressemble ?</h3>
      <ul>
        <li><strong>Poudre blanche ou grisâtre</strong> qui s'effrite au toucher</li>
        <li><strong>Cristaux blancs</strong> qui "poussent" sur le mur</li>
        <li><strong>Auréoles humides</strong> au-dessus desquelles la poudre apparaît</li>
        <li><strong>Peinture qui cloque</strong> ou s'écaille</li>
        <li><strong>Enduit qui se décolle</strong> par plaques</li>
      </ul>

      <h2>Les erreurs à éviter</h2>

      <h3>❌ Gratter le salpêtre</h3>
      <p>Ça ne sert à rien. Le salpêtre n'est que le symptôme visible. Tant que l'eau continue de monter, il reviendra dans les semaines suivantes.</p>

      <h3>❌ Repeindre par-dessus</h3>
      <p>La peinture "anti-humidité" ne traite pas le problème. Elle se contentera de cloquer à nouveau dans quelques mois.</p>

      <h3>❌ Poser un revêtement étanche</h3>
      <p>Certains posent du carrelage ou un enduit étanche en bas de mur. Résultat : l'eau remonte toujours mais ne peut plus s'évaporer. Elle monte plus haut, crée des dégâts sur une plus grande surface, et peut attaquer les structures en bois.</p>

      <h2>Le traitement qui fonctionne : l'injection de résine</h2>

      <p>La seule solution durable contre le salpêtre est de <strong>bloquer les remontées capillaires</strong>. La technique la plus efficace : l'injection de résine hydrophobe.</p>

      <h3>Principe</h3>
      <ol>
        <li>On perce des trous espacés de 10-15 cm à la base du mur</li>
        <li>On injecte une résine hydrophobe (silicone, silane/siloxane)</li>
        <li>La résine se diffuse dans les pores du matériau</li>
        <li>Elle crée une <strong>barrière étanche</strong> qui bloque définitivement l'eau</li>
      </ol>

      <h3>Avantages</h3>
      <ul>
        <li><strong>Définitif</strong> : Garantie 10 à 30 ans selon les produits</li>
        <li><strong>Peu invasif</strong> : Pas de terrassement, pas de gros travaux</li>
        <li><strong>Rapide</strong> : Intervention en 1-2 jours</li>
        <li><strong>Efficace sur brique toulousaine</strong> : Particulièrement adapté aux murs poreux</li>
      </ul>

      <h2>Prix du traitement à Toulouse</h2>

      <div class="my-6 overflow-x-auto">
        <table class="w-full border-collapse border border-slate-200">
          <thead class="bg-slate-100">
            <tr>
              <th class="border border-slate-200 p-3 text-left">Type de bien</th>
              <th class="border border-slate-200 p-3 text-left">Linéaire traité</th>
              <th class="border border-slate-200 p-3 text-left">Prix indicatif</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border border-slate-200 p-3">Appartement RDC</td>
              <td class="border border-slate-200 p-3">10-15 mètres</td>
              <td class="border border-slate-200 p-3">1 500€ - 3 000€</td>
            </tr>
            <tr>
              <td class="border border-slate-200 p-3">Maison mitoyenne</td>
              <td class="border border-slate-200 p-3">20-30 mètres</td>
              <td class="border border-slate-200 p-3">3 000€ - 5 500€</td>
            </tr>
            <tr>
              <td class="border border-slate-200 p-3">Maison 4 façades</td>
              <td class="border border-slate-200 p-3">40-60 mètres</td>
              <td class="border border-slate-200 p-3">5 500€ - 9 000€</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p><strong>Le diagnostic est gratuit</strong> : Un expert se déplace, mesure le taux d'humidité, identifie les zones touchées, et vous remet un devis détaillé sans engagement.</p>

      <h2>Quartiers de Toulouse les plus touchés</h2>

      <p>Certains quartiers sont plus concernés par le salpêtre en raison de leur sol, leur exposition ou leur bâti :</p>
      <ul>
        <li><strong>Saint-Cyprien</strong> : Proximité Garonne, bâti ancien</li>
        <li><strong>Saint-Michel</strong> : Maisons anciennes, caves humides</li>
        <li><strong>Capitole / Carmes</strong> : Immeubles historiques sans barrière étanche</li>
        <li><strong>Minimes</strong> : Sol argileux, maisons années 70</li>
        <li><strong>Croix-Daurade</strong> : Terrain argileux sensible</li>
      </ul>

      <h2>Pourquoi faire appel à IPB ?</h2>

      <ul>
        <li><strong>Basés à Toulouse</strong> : Nous connaissons les particularités du bâti local</li>
        <li><strong>Diagnostic gratuit</strong> : Mesure hygrométrique, analyse de la situation</li>
        <li><strong>Produits professionnels</strong> : Résines haute performance, garanties</li>
        <li><strong>Garantie décennale</strong> : Travaux assurés 10 ans</li>
        <li><strong>Pas de sur-traitement</strong> : On traite ce qui est nécessaire, pas plus</li>
      </ul>

      <h2>Conclusion</h2>

      <p>Le salpêtre est un problème fréquent dans les maisons toulousaines, mais il se traite efficacement avec les bonnes techniques. L'essentiel est de :</p>
      <ol>
        <li>Ne pas masquer le problème (peinture, enduit étanche)</li>
        <li>Faire diagnostiquer la source exacte d'humidité</li>
        <li>Traiter avec une injection de résine professionnelle</li>
      </ol>

      <p class="font-bold text-lg text-slate-900 mt-6">📞 Salpêtre à Toulouse ? Diagnostic gratuit : 05 82 95 33 75</p>
    `
  },

  'fissures-maison-tarn-et-garonne-solutions': {
    slug: 'fissures-maison-tarn-et-garonne-solutions',
    title: 'Fissures Maison Tarn-et-Garonne : Causes et Solutions Efficaces',
    excerpt: 'Fissures sur votre maison à Montauban, Castelsarrasin ou Moissac ? Découvrez pourquoi le Tarn-et-Garonne est particulièrement touché et les solutions durables pour protéger votre patrimoine.',
    date: '2026-01-31',
    readTime: '9 min',
    category: 'fissures',
    author: 'Expert IPB',
    metaDescription: 'Expert fissures Tarn-et-Garonne : causes des fissures à Montauban, Castelsarrasin, Moissac. Sol argileux, sécheresse. Solutions agrafage, injection. Diagnostic gratuit.',
    keywords: ['expert fissures tarn et garonne', 'fissures maison montauban', 'fissure 82', 'agrafage tarn et garonne', 'expert fissure castelsarrasin', 'sol argileux 82'],
    content: `
      <div class="mb-8 p-6 bg-rose-50 border-l-4 border-rose-600 rounded-r-lg">
        <p class="font-bold text-rose-900 mb-2">🏠 Propriétaire dans le 82 ?</p>
        <p class="text-rose-800">Le Tarn-et-Garonne fait partie des départements les plus touchés par les fissures liées à la sécheresse. Ce guide vous aide à comprendre et agir.</p>
      </div>

      <h2>Le Tarn-et-Garonne : un département à risque</h2>
      
      <p>Le Tarn-et-Garonne (82) cumule plusieurs facteurs de risque qui en font l'un des départements les plus touchés par les fissures sur maisons :</p>

      <h3>Un sol à dominante argileuse</h3>
      <p>Plus de <strong>70% du territoire</strong> du Tarn-et-Garonne repose sur des formations argileuses ou argilo-calcaires. Ces sols sont classés en <strong>aléa moyen à fort</strong> pour le retrait-gonflement des argiles.</p>
      
      <p>Les zones les plus sensibles :</p>
      <ul>
        <li><strong>Montauban et sa périphérie</strong> : Sol argileux profond</li>
        <li><strong>Castelsarrasin - Moissac</strong> : Plaine alluviale avec poches argileuses</li>
        <li><strong>Caussade - Septfonds</strong> : Argiles du Quercy</li>
        <li><strong>Valence d'Agen</strong> : Terrasses argileuses de la Garonne</li>
      </ul>

      <h3>Des épisodes de sécheresse dévastateurs</h3>
      <p>Le Tarn-et-Garonne a été reconnu en <strong>état de catastrophe naturelle sécheresse</strong> pour :</p>
      <ul>
        <li>2019 : 95 communes reconnues</li>
        <li>2020 : 78 communes reconnues</li>
        <li>2022 : Quasi-totalité du département</li>
        <li>2023 : Reconnaissance en cours pour de nombreuses communes</li>
      </ul>
      
      <div class="my-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
        <p class="font-bold text-amber-800">💡 Bon à savoir : Si votre commune est reconnue en catastrophe naturelle, votre assurance habitation peut couvrir une partie des travaux. Vérifiez auprès de votre assureur.</p>
      </div>

      <h3>Un parc immobilier vulnérable</h3>
      <p>La majorité des maisons du Tarn-et-Garonne ont été construites entre <strong>1960 et 1995</strong>, une période où :</p>
      <ul>
        <li>Les fondations étaient peu profondes (40-60 cm)</li>
        <li>Les études de sol n'étaient pas obligatoires</li>
        <li>Les risques de retrait-gonflement étaient méconnus</li>
      </ul>

      <h2>Reconnaître les fissures dangereuses</h2>

      <h3>Signaux d'alerte à ne pas ignorer</h3>
      <ul>
        <li><strong>Fissures en escalier</strong> suivant les joints de briques ou parpaings</li>
        <li><strong>Fissures qui s'élargissent</strong> au fil des saisons</li>
        <li><strong>Portes et fenêtres qui coincent</strong> ou ne ferment plus</li>
        <li><strong>Carrelage qui se soulève</strong> ou se fissure</li>
        <li><strong>Décollement</strong> entre la maison et la terrasse</li>
      </ul>

      <h3>Comment mesurer l'urgence ?</h3>
      <div class="my-6 overflow-x-auto">
        <table class="w-full border-collapse border border-slate-200">
          <thead class="bg-slate-100">
            <tr>
              <th class="border border-slate-200 p-3 text-left">Ouverture</th>
              <th class="border border-slate-200 p-3 text-left">Niveau</th>
              <th class="border border-slate-200 p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border border-slate-200 p-3">< 0.5 mm</td>
              <td class="border border-slate-200 p-3 text-green-600 font-bold">Surveillance</td>
              <td class="border border-slate-200 p-3">Surveiller l'évolution</td>
            </tr>
            <tr>
              <td class="border border-slate-200 p-3">0.5 - 2 mm</td>
              <td class="border border-slate-200 p-3 text-amber-600 font-bold">Attention</td>
              <td class="border border-slate-200 p-3">Faire diagnostiquer</td>
            </tr>
            <tr>
              <td class="border border-slate-200 p-3">> 2 mm</td>
              <td class="border border-slate-200 p-3 text-red-600 font-bold">Urgent</td>
              <td class="border border-slate-200 p-3">Intervention rapide</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Solutions adaptées au Tarn-et-Garonne</h2>

      <h3>1. L'agrafage structurel</h3>
      <p>Technique de "couture" des murs avec des agrafes en inox. Particulièrement adaptée aux maisons en <strong>brique rose</strong> typiques de Montauban et du Tarn-et-Garonne.</p>
      
      <p><strong>Avantages :</strong></p>
      <ul>
        <li>Coût 3x inférieur aux micropieux</li>
        <li>Intervention en 3-5 jours</li>
        <li>Pas de terrassement important</li>
        <li>Garantie décennale</li>
      </ul>
      <p><strong>Prix</strong> : 8 000€ - 18 000€ selon l'ampleur</p>

      <h3>2. L'injection de résine expansive</h3>
      <p>Injection sous les fondations pour combler les vides créés par le retrait des argiles. Cette technique permet même de "relever" légèrement une maison affaissée.</p>
      
      <p><strong>Idéale pour :</strong></p>
      <ul>
        <li>Sols argileux ayant subi un retrait important</li>
        <li>Fondations sur vide</li>
        <li>Affaissements légers (< 5 cm)</li>
      </ul>
      <p><strong>Prix</strong> : 6 000€ - 15 000€</p>

      <h3>3. Renforcement des fondations</h3>
      <p>Pour les cas les plus graves, élargissement ou approfondissement des fondations existantes. Technique lourde réservée aux situations critiques.</p>

      <h2>Nos interventions à Montauban et environs</h2>

      <h3>Témoignage : Maison à Montauban (quartier Villebourbon)</h3>
      <blockquote class="my-6 p-4 bg-slate-50 border-l-4 border-slate-400 italic">
        "Notre maison de 1985 présentait des fissures en escalier depuis 3 ans. Après le diagnostic IPB, nous avons opté pour l'agrafage. Coût total : 12 500€. Travaux réalisés en 4 jours, fissures stabilisées depuis 2 ans maintenant."
        <footer class="mt-2 text-sm text-slate-600 not-italic">— M. et Mme D., Montauban</footer>
      </blockquote>

      <h3>Zones d'intervention dans le 82</h3>
      <ul>
        <li><strong>Montauban</strong> : Villebourbon, Sapiac, Lalande, Bas-Pays</li>
        <li><strong>Castelsarrasin</strong> et communes limitrophes</li>
        <li><strong>Moissac</strong> : Centre et périphérie</li>
        <li><strong>Caussade, Septfonds, Réalville</strong></li>
        <li><strong>Valence d'Agen, Lauzerte, Beaumont-de-Lomagne</strong></li>
      </ul>

      <h2>Assurance et catastrophe naturelle : vos droits</h2>

      <h3>Comment fonctionne la prise en charge ?</h3>
      <ol>
        <li><strong>Arrêté de catastrophe naturelle</strong> publié au Journal Officiel</li>
        <li><strong>Déclaration</strong> à votre assureur sous 10 jours</li>
        <li><strong>Expertise</strong> par l'assurance pour évaluer les dégâts</li>
        <li><strong>Indemnisation</strong> (avec franchise légale de 1 520€)</li>
      </ol>

      <div class="my-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p class="font-bold text-blue-800">📋 Notre conseil : Même si l'arrêté n'est pas encore publié, faites constater les dégâts par un expert indépendant. Ce document sera précieux pour votre dossier d'assurance.</p>
      </div>

      <h2>Prévenir les futures fissures</h2>

      <h3>Actions préventives recommandées</h3>
      <ul>
        <li><strong>Éloigner les arbres</strong> : Distance minimale = hauteur adulte de l'arbre</li>
        <li><strong>Gérer les eaux pluviales</strong> : Gouttières, drainage périphérique</li>
        <li><strong>Arrosage régulier</strong> en été pour maintenir l'hydratation du sol</li>
        <li><strong>Éviter les haies en pied de mur</strong> qui assèchent le sol</li>
      </ul>

      <h2>Pourquoi faire appel à IPB dans le Tarn-et-Garonne ?</h2>

      <ul>
        <li><strong>Expertise locale</strong> : Nous connaissons les sols du 82</li>
        <li><strong>Diagnostic gratuit</strong> : Sans engagement, sous 5 jours</li>
        <li><strong>Solutions adaptées</strong> : Pas de sur-traitement, le juste nécessaire</li>
        <li><strong>Garantie décennale</strong> : 10 ans de tranquillité</li>
        <li><strong>Prix transparents</strong> : Devis détaillé, pas de surprise</li>
      </ul>

      <h2>Conclusion</h2>
      
      <p>Le Tarn-et-Garonne est un département où les fissures sont <strong>fréquentes mais pas inévitables</strong>. Avec le bon diagnostic et les bonnes solutions, votre maison peut retrouver sa stabilité pour des décennies.</p>

      <p><strong>L'erreur à éviter</strong> : Attendre que les fissures s'aggravent. Chaque été de sécheresse aggrave la situation et augmente le coût des travaux.</p>

      <p class="font-bold text-lg text-slate-900 mt-6">📞 Expert fissures Tarn-et-Garonne - Diagnostic gratuit : 05 82 95 33 75</p>
    `
  }
};

// ═══════════════════════════════════════════════════════════════
// EXPORTS HELPERS
// ═══════════════════════════════════════════════════════════════

// Export du type (utilisé partout)
export type { BlogPost };

// Export des articles (objet avec clés = slugs)
export { blogPosts };

// Export de la liste des articles (array)
export const blogPostsList = Object.values(blogPosts);

// Export de la liste des slugs (pour generateStaticParams)
export const blogPostsSlugs = Object.keys(blogPosts);
