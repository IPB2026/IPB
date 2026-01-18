import React from 'react';
import Link from 'next/link';
import Script from 'next/script';
import { Metadata } from 'next';
import { ArrowLeft, Calendar, Clock, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { Breadcrumbs } from '@/components/blog/Breadcrumbs';
import { TableOfContents } from '@/components/blog/TableOfContents';
import { InternalLinks } from '@/components/seo/InternalLinks';
import {
  extractTocFromContent,
  addIdsToHeadings,
  generateArticleJsonLd,
  generateBreadcrumbJsonLd,
} from '@/lib/blog-helpers';

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
    title: 'Fissures sur ma maison à Toulouse : Que faire ? Guide complet 2024',
    excerpt: 'Vous avez découvert des fissures sur votre maison toulousaine ? Ne paniquez pas. Voici comment distinguer une fissure bénigne d\'une urgence structurelle, et surtout : comment agir pour protéger votre patrimoine sans vous ruiner.',
    date: '2025-06-12',
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
    date: '2025-07-04',
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
    date: '2025-08-20',
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
    title: 'Fissures en escalier : Signe de tassement différentiel ?',
    excerpt: 'Vos fissures suivent les joints de mortier en crémaillère ? C\'est le signe caractéristique d\'un tassement différentiel. Voici ce que cela signifie, pourquoi c\'est grave, et surtout : comment le réparer.',
    date: '2025-09-10',
    readTime: '7 min',
    category: 'fissures',
    author: 'Expert IPB',
    metaDescription: 'Fissures en escalier (crémaillère) : signe de tassement différentiel des fondations. Causes, gravité, solutions (agrafage). Expert Toulouse Haute-Garonne.',
    keywords: ['fissures escalier', 'tassement différentiel', 'crémaillère', 'fondations', 'agrafage'],
    content: `
      <h2>Vos fissures suivent les joints ? C'est grave, mais réparable</h2>
      
      <p>Vous avez remarqué que vos fissures ne sont pas droites. Elles <strong>suivent les joints de mortier</strong>, formant un motif en escalier (ou "crémaillère"). C'est le signe caractéristique d'un <strong>tassement différentiel des fondations</strong>.</p>

      <p>Traduction simple : <strong>une partie de votre maison s'enfonce plus vite que l'autre</strong>. C'est grave ? Oui, si vous n'agissez pas. Mais c'est réparable ? <strong>Oui, dans 90% des cas avec l'agrafage.</strong></p>

      <h2>Pourquoi les fissures suivent-elles les joints ?</h2>
      
      <p>Quand une maison subit un tassement différentiel, les forces de cisaillement se concentrent aux points faibles : <strong>les joints de mortier</strong>. C'est là que la maçonnerie cède en premier, créant ce motif en escalier caractéristique.</p>

      <p>Si vos fissures étaient droites (verticales ou horizontales), ce serait plutôt un problème de dilatation thermique ou de défaut de chaînage. Mais le motif en escalier, c'est <strong>la signature du tassement différentiel</strong>.</p>

      <h2>Qu'est-ce qu'un tassement différentiel ?</h2>
      
      <p>Imaginez votre maison posée sur un sol qui n'est pas uniforme. Une partie du sol (sous le coin de votre maison, par exemple) est plus instable que l'autre. Cette partie s'enfonce, créant un dénivelé.</p>

      <p><strong>Résultat</strong> : Votre maison se "tord". Les murs se fissurent en escalier, les portes coincent, les sols se déforment. C'est ce qu'on appelle un tassement différentiel.</p>

      <h2>Pourquoi ça arrive à Toulouse ?</h2>
      
      <p>Le sol toulousain est composé d'<strong>argile gonflante</strong>. En période de sécheresse (comme en 2022-2023), l'argile se rétracte. Si votre maison est construite sur un sol argileux non uniforme, certaines parties se rétractent plus que d'autres, créant le tassement différentiel.</p>

      <p><strong>Facteurs aggravants</strong> :</p>
      <ul>
        <li>Un arbre trop proche qui assèche le sol sous une partie de la maison</li>
        <li>Des travaux de voirie qui perturbent le sol</li>
        <li>Une construction sur un terrain en pente</li>
        <li>Des fondations peu profondes (maisons anciennes)</li>
      </ul>

      <h2>Comment savoir si c'est grave ?</h2>
      
      <p>Le tassement différentiel est <strong>toujours préoccupant</strong>, mais son degré de gravité varie :</p>

      <ul>
        <li><strong>Modéré</strong> : Fissures < 2 mm, dénivelé < 2 cm. L'agrafage suffit généralement.</li>
        <li><strong>Important</strong> : Fissures 2-5 mm, dénivelé 2-5 cm. Agrafage nécessaire, peut nécessiter un complément de matage.</li>
        <li><strong>Critique</strong> : Fissures > 5 mm, dénivelé > 10 cm. Micropieux peuvent être nécessaires.</li>
      </ul>

      <h2>La solution : l'agrafage (dans 90% des cas)</h2>
      
      <p>L'agrafage consiste à "recoudre" votre mur avec des aciers torsadés. Ces aciers relient les deux parties du mur qui se séparaient, lui redonnant sa cohérence monolithique et stoppant le tassement différentiel.</p>

      <p><strong>Pourquoi ça fonctionne</strong> : En créant une structure rigide, l'agrafage empêche les deux parties de la maison de continuer à "s'écarter". Le tassement différentiel est stabilisé.</p>

      <h2>Conclusion</h2>
      
      <p>Les fissures en escalier sont le signe d'un tassement différentiel. C'est grave si vous n'agissez pas, mais <strong>réparable dans 90% des cas avec l'agrafage</strong>. Ne laissez pas la situation s'aggraver.</p>
    `
  },
  'garantie-decennale-travaux-structure': {
    slug: 'garantie-decennale-travaux-structure',
    title: 'Garantie décennale : Ce que vous devez savoir',
    excerpt: 'Vous faites des travaux de réparation structurelle ? La garantie décennale est obligatoire. Voici ce qu\'elle couvre, combien elle coûte, et surtout : comment vous protéger.',
    date: '2025-10-05',
    readTime: '5 min',
    category: 'conseils',
    author: 'Expert IPB',
    metaDescription: 'Garantie décennale travaux structure : obligation, couverture, coût, protection. Tout savoir sur la garantie décennale pour réparation fissures et fondations.',
    keywords: ['garantie décennale', 'travaux structure', 'assurance', 'protection', 'fissures'],
    content: `
      <h2>La garantie décennale : votre protection sur 10 ans</h2>
      
      <p>Vous faites des travaux de réparation structurelle (agrafage, micropieux, injection résine) ? <strong>La garantie décennale est obligatoire</strong>. Voici ce qu'elle couvre et comment vous protéger.</p>

      <h2>Qu'est-ce que la garantie décennale ?</h2>
      
      <p>La garantie décennale est une <strong>assurance obligatoire</strong> qui couvre les dommages affectant la solidité de votre maison pendant 10 ans après les travaux. Elle protège contre les défauts de conception, de réalisation ou de matériaux qui compromettent la solidité de l'ouvrage.</p>

      <h2>Qu'est-ce qui est couvert ?</h2>
      
      <ul>
        <li><strong>Les défauts de solidité</strong> : Si les travaux ne tiennent pas, si la structure se dégrade</li>
        <li><strong>Les défauts de réalisation</strong> : Erreurs de mise en œuvre, malfaçons</li>
        <li><strong>Les défauts de matériaux</strong> : Matériaux défectueux ou inadaptés</li>
      </ul>

      <h2>Qui paie la garantie décennale ?</h2>
      
      <p><strong>C'est l'entreprise qui paie</strong> l'assurance garantie décennale. Vous ne devez rien payer en plus. C'est une obligation légale pour tous les travaux structurels.</p>

      <h2>Comment vérifier que votre entreprise est assurée ?</h2>
      
      <p>Demandez à voir <strong>l'attestation de garantie décennale</strong> avant de signer le devis. Une entreprise sérieuse vous la fournira sans problème. Si elle refuse ou temporise, <strong>fuyez</strong>.</p>

      <h2>Conclusion</h2>
      
      <p>La garantie décennale est votre protection sur 10 ans. Vérifiez toujours que votre entreprise est bien assurée avant de signer un devis. C'est votre droit, et c'est leur obligation.</p>
    `
  },
  'ventilation-humidite-condensation': {
    slug: 'ventilation-humidite-condensation',
    title: 'VMC et humidité : L\'importance de la ventilation',
    excerpt: 'Vous avez de l\'humidité dans vos murs ? Avant de penser à l\'injection résine, vérifiez votre ventilation. Parfois, une simple VMC résout le problème... et vous fait économiser des milliers d\'euros.',
    date: '2025-11-02',
    readTime: '6 min',
    category: 'humidite',
    author: 'Expert IPB',
    metaDescription: 'VMC et humidité : différence entre condensation et remontée capillaire. Quand la ventilation suffit, quand l\'injection résine est nécessaire. Expert Toulouse.',
    keywords: ['VMC', 'ventilation', 'humidité', 'condensation', 'remontée capillaire'],
    content: `
      <h2>Humidité dans vos murs ? Vérifiez d'abord votre ventilation</h2>
      
      <p>Vous voyez de l'humidité, des moisissures, des taches noires ? Avant de penser à l'injection résine (qui coûte cher), <strong>vérifiez votre ventilation</strong>. Parfois, une simple VMC résout le problème... et vous fait économiser des milliers d'euros.</p>

      <h2>Condensation vs Remontée capillaire : comment faire la différence ?</h2>
      
      <p>Il y a deux types d'humidité dans les murs, et le traitement est complètement différent :</p>

      <ul>
        <li><strong>Condensation</strong> : Vapeur d'eau qui se condense sur les murs froids. <strong>Traitement</strong> : Ventilation (VMC)</li>
        <li><strong>Remontée capillaire</strong> : Eau qui remonte du sol dans les murs. <strong>Traitement</strong> : Injection résine</li>
      </ul>

      <h2>Comment savoir si c'est de la condensation ?</h2>
      
      <p><strong>Signes caractéristiques</strong> :</p>
      <ul>
        <li>Humidité en <strong>haut de mur</strong> ou sur les fenêtres</li>
        <li><strong>Buée</strong> sur les fenêtres le matin</li>
        <li>Moisissures dans les <strong>angles</strong> (plafonds, fenêtres)</li>
        <li><strong>Pas de salpêtre</strong> (poudre blanche)</li>
        <li>Problème plus marqué en <strong>hiver</strong></li>
      </ul>

      <h2>La solution : la VMC (Ventilation Mécanique Contrôlée)</h2>
      
      <p>Si c'est de la condensation, une VMC suffit. Elle renouvelle l'air, évacue l'humidité, et résout le problème. Coût : 2 000€ - 4 000€ (vs 8 000€ - 15 000€ pour l'injection résine).</p>

      <h2>Quand l'injection résine est-elle nécessaire ?</h2>
      
      <p>Si vous voyez du <strong>salpêtre</strong> (poudre blanche) en bas de mur, c'est une remontée capillaire. La VMC ne suffira pas. Il faut l'injection résine.</p>

      <h2>Conclusion</h2>
      
      <p>Avant de penser à l'injection résine, vérifiez votre ventilation. Un diagnostic précis vous dira si c'est de la condensation (VMC suffit) ou une remontée capillaire (injection nécessaire). Cette expertise vous évitera soit une dépense inutile, soit un traitement insuffisant.</p>
    `
  },
  'fissure-ouverture-porte-fenetre': {
    slug: 'fissure-ouverture-porte-fenetre',
    title: 'Portes qui coincent et fissures : pourquoi la structure bouge ?',
    excerpt: 'Quand une porte frotte et qu’une fissure apparaît, ce n’est jamais un hasard. Voici comment relier ces signes et déterminer si la maison travaille.',
    date: '2025-05-20',
    readTime: '7 min',
    category: 'fissures',
    author: 'Expert IPB',
    metaDescription: 'Porte qui coince + fissures : signes d’un mouvement structurel. Comment diagnostiquer et stabiliser avant que ça s’aggrave.',
    keywords: ['portes qui coincent', 'fissures', 'mouvement structurel', 'toulouse', 'diagnostic maison'],
    content: `
      <h2>Quand une porte frotte, la maison parle</h2>
      <p>Une porte qui coince, une fenêtre qui ne ferme plus, un carrelage qui se soulève… Ces signes ne sont pas des détails. Ils indiquent souvent que la structure n’est plus d’équerre.</p>

      <h2>Le lien direct avec les fissures</h2>
      <p>Quand une fondation bouge, le mur se déforme. Les menuiseries, fixées dans la maçonnerie, subissent cette déformation. Résultat : elles frottent ou se bloquent.</p>

      <h2>Comment confirmer le diagnostic</h2>
      <ul>
        <li>Observer si la fissure évolue (repère + mesure).</li>
        <li>Vérifier si le frottement est récent.</li>
        <li>Contrôler d’autres signes (joints ouverts, fissures plafond).</li>
      </ul>

      <h2>La bonne réaction</h2>
      <p>Si la fissure est active, le rebouchage ne suffit pas. Il faut stabiliser la structure (agrafage) avant les finitions.</p>
    `
  },
  'secheresse-argile-haute-garonne': {
    slug: 'secheresse-argile-haute-garonne',
    title: 'Sécheresse et sol argileux : le vrai risque pour votre maison en Haute‑Garonne',
    excerpt: 'Les sols argileux se rétractent en été et gonflent en hiver. Ce cycle fragilise les fondations. On vous explique comment l’anticiper.',
    date: '2025-06-28',
    readTime: '8 min',
    category: 'expertise',
    author: 'Expert IPB',
    metaDescription: 'Sol argileux et sécheresse : pourquoi les fondations bougent et comment sécuriser durablement la maison.',
    keywords: ['sol argileux', 'sécheresse', 'haute-garonne', 'fondations', 'fissures'],
    content: `
      <h2>Le cycle argileux : retrait / gonflement</h2>
      <p>En période sèche, l’argile se rétracte. En période humide, elle gonfle. Ce mouvement vertical peut atteindre plusieurs centimètres.</p>

      <h2>Pourquoi c’est dangereux</h2>
      <p>Les fondations perdent leur appui uniforme. La maison travaille : fissures en escalier, joints qui s’ouvrent, menuiseries déformées.</p>

      <h2>Comment limiter le risque</h2>
      <ul>
        <li>Éviter les grands arbres trop proches.</li>
        <li>Surveiller les fissures après sécheresse.</li>
        <li>Faire un diagnostic si les signes s’installent.</li>
      </ul>
    `
  },
  'fissure-facade-reboucher-ou-reparer': {
    slug: 'fissure-facade-reboucher-ou-reparer',
    title: 'Fissure en façade : reboucher ou réparer ? La méthode professionnelle',
    excerpt: 'Reboucher sans traiter la cause, c’est retarder l’inévitable. Découvrez quand un simple enduit suffit et quand il faut intervenir structurellement.',
    date: '2025-07-22',
    readTime: '6 min',
    category: 'conseils',
    author: 'Expert IPB',
    metaDescription: 'Fissure façade : quand reboucher, quand réparer ? Méthode pro pour éviter les réparations inutiles.',
    keywords: ['fissure façade', 'reboucher fissure', 'agrafage', 'ravalement', 'diagnostic'],
    content: `
      <h2>Reboucher n’est pas réparer</h2>
      <p>Un rebouchage masquera la fissure… jusqu’à sa réapparition. Si la cause est structurelle, elle reviendra plus large.</p>

      <h2>Quand un rebouchage suffit</h2>
      <ul>
        <li>Faïençage superficiel</li>
        <li>Fissure stable et fine</li>
        <li>Absence de signes collatéraux</li>
      </ul>

      <h2>Quand il faut réparer</h2>
      <ul>
        <li>Fissure en escalier</li>
        <li>Ouverture > 2 mm</li>
        <li>Évolution rapide</li>
      </ul>
    `
  },
  'humidite-salpetre-traitement': {
    slug: 'humidite-salpetre-traitement',
    title: 'Salpêtre : comprendre l’origine et choisir le bon traitement',
    excerpt: 'Le salpêtre signe presque toujours une remontée capillaire. Voici comment confirmer le diagnostic et choisir un traitement durable.',
    date: '2025-08-06',
    readTime: '7 min',
    category: 'humidite',
    author: 'Expert IPB',
    metaDescription: 'Salpêtre sur les murs : origine, diagnostic et traitement par injection résine.',
    keywords: ['salpêtre', 'remontée capillaire', 'murs humides', 'injection résine'],
    content: `
      <h2>Le salpêtre : un marqueur fiable</h2>
      <p>La poudre blanche qui apparaît au bas des murs indique très souvent une remontée capillaire.</p>

      <h2>Le bon traitement</h2>
      <p>Injection de résine hydrophobe pour créer une barrière étanche, puis assèchement progressif.</p>
    `
  },
  'condensation-ou-infiltration': {
    slug: 'condensation-ou-infiltration',
    title: 'Condensation ou infiltration : comment faire la différence ?',
    excerpt: 'Taches noires en haut des murs, buée sur les fenêtres… Ce n’est pas toujours une fuite. Voici un diagnostic clair pour ne pas se tromper.',
    date: '2025-08-30',
    readTime: '6 min',
    category: 'humidite',
    author: 'Expert IPB',
    metaDescription: 'Différence condensation vs infiltration : symptômes et traitement adapté.',
    keywords: ['condensation', 'infiltration', 'humidite', 'diagnostic'],
    content: `
      <h2>Deux causes, deux traitements</h2>
      <p>La condensation vient d’un air intérieur trop humide. L’infiltration vient d’une entrée d’eau (toiture, façade, sol).</p>

      <h2>Signes de condensation</h2>
      <ul>
        <li>Buée sur les vitres</li>
        <li>Taches en haut des murs</li>
      </ul>

      <h2>Signes d’infiltration</h2>
      <ul>
        <li>Humidité localisée et persistante</li>
        <li>Salpêtre en pied de mur</li>
      </ul>
    `
  },
  'diagnostic-structurel-maison': {
    slug: 'diagnostic-structurel-maison',
    title: 'Diagnostic structurel : ce que regarde un expert sur place',
    excerpt: 'Fissuromètre, laser, hygromètre… Un diagnostic sérieux repose sur des mesures. Découvrez ce que l’expert observe vraiment.',
    date: '2025-09-18',
    readTime: '9 min',
    category: 'expertise',
    author: 'Expert IPB',
    metaDescription: 'Diagnostic structurel maison : méthodologie, outils et étapes.',
    keywords: ['diagnostic structurel', 'expertise', 'fissuromètre', 'mesures'],
    content: `
      <h2>Une expertise ne se fait pas à l’œil nu</h2>
      <p>Un expert mesure l’ouverture des fissures, le niveau des sols et l’humidité des murs pour établir un diagnostic fiable.</p>

      <h2>Le livrable</h2>
      <p>Un rapport clair avec conclusions, causes probables et solutions adaptées.</p>
    `
  },
  'traitement-humidite-injection-resine': {
    slug: 'traitement-humidite-injection-resine',
    title: 'Injection de résine : comment fonctionne la barrière étanche ?',
    excerpt: 'C’est la solution la plus fiable contre les remontées capillaires. Voici le principe, le délai de séchage et les garanties.',
    date: '2025-10-14',
    readTime: '7 min',
    category: 'humidite',
    author: 'Expert IPB',
    metaDescription: 'Injection résine : principe, efficacité, délai de séchage et garanties.',
    keywords: ['injection résine', 'barrière étanche', 'remontées capillaires', 'humidité'],
    content: `
      <h2>Le principe</h2>
      <p>On injecte une résine hydrophobe qui se solidifie et bloque la remontée d’eau.</p>

      <h2>Le délai de séchage</h2>
      <p>La barrière est active en 48h, mais le mur met plusieurs mois à sécher.</p>
    `
  },
  'revente-maison-fissuree': {
    slug: 'revente-maison-fissuree',
    title: 'Revente d’une maison fissurée : risques, décote et solutions',
    excerpt: 'Une fissure peut faire perdre 20 à 30% de valeur. Avec un traitement garanti, la revente redevient possible.',
    date: '2025-11-12',
    readTime: '6 min',
    category: 'conseils',
    author: 'Expert IPB',
    metaDescription: 'Revente maison fissurée : risques, décote, et solutions pour rassurer les acheteurs.',
    keywords: ['revente maison fissurée', 'décote', 'garantie décennale', 'agrafage'],
    content: `
      <h2>La décote est réelle</h2>
      <p>Les acheteurs appliquent une décote quand une fissure est visible.</p>

      <h2>La solution</h2>
      <p>Un traitement structurel garanti + attestation décennale rassurent les acheteurs.</p>
    `
  },
  'fissure-plafond-que-faire': {
    slug: 'fissure-plafond-que-faire',
    title: 'Fissures au plafond : faut‑il s’inquiéter ?',
    excerpt: 'Toutes les fissures au plafond ne sont pas graves. Voici comment distinguer un simple retrait d’enduit d’un mouvement structurel.',
    date: '2025-12-05',
    readTime: '6 min',
    category: 'fissures',
    author: 'Expert IPB',
    metaDescription: 'Fissures plafond : causes, gravité, et solutions adaptées.',
    keywords: ['fissures plafond', 'fissures maison', 'diagnostic', 'structure'],
    content: `
      <h2>Fissure fine ou structurelle ?</h2>
      <p>Une micro‑fissure horizontale est souvent liée au retrait de l’enduit. Une fissure large ou évolutive indique un mouvement.</p>
    `
  },
  'humidite-cave-sous-sol': {
    slug: 'humidite-cave-sous-sol',
    title: 'Humidité en cave : diagnostic fiable et solutions durables',
    excerpt: 'Cuvelage, injection, ventilation… Chaque cave a son traitement. On vous guide vers la bonne stratégie.',
    date: '2026-01-10',
    readTime: '8 min',
    category: 'humidite',
    author: 'Expert IPB',
    metaDescription: 'Humidité en cave : diagnostic et solutions durables (cuvelage, injection, ventilation).',
    keywords: ['humidité cave', 'cuvelage', 'injection résine', 'ventilation'],
    content: `
      <h2>Identifier l’origine</h2>
      <p>En cave, l’humidité peut venir du sol, des murs enterrés ou d’un défaut de ventilation.</p>

      <h2>Solutions efficaces</h2>
      <ul>
        <li>Cuvelage époxy pour les murs enterrés</li>
        <li>Injection résine si remontées capillaires</li>
        <li>VMI/VMC pour évacuer l’humidité</li>
      </ul>
    `
  }
};

const categoryColors = {
  fissures: 'bg-orange-100 text-orange-700 border-orange-200',
  humidite: 'bg-blue-100 text-blue-700 border-blue-200',
  conseils: 'bg-slate-100 text-slate-700 border-slate-200',
  expertise: 'bg-purple-100 text-purple-700 border-purple-200'
};

const categoryLabels = {
  fissures: 'Fissures',
  humidite: 'Humidité',
  conseils: 'Conseils',
  expertise: 'Expertise'
};

/**
 * Génération dynamique des metadata SEO
 */
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> | { slug: string } }
): Promise<Metadata> {
  const slug = typeof params === 'object' && 'then' in params 
    ? (await params).slug 
    : params.slug;
  
  const post = blogPosts[slug];
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ipb-expertise.fr';
  const url = `${baseUrl}/blog/${slug}`;

  if (!post) {
    return {
      title: 'Article non trouvé - IPB Expertise',
      description: 'Cet article n\'existe pas ou a été supprimé.',
    };
  }

  return {
    title: `${post.title} | IPB Expertise`,
    description: post.metaDescription,
    keywords: post.keywords,
    authors: [{ name: post.author }],
    category: categoryLabels[post.category],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      url,
      siteName: 'IPB - Institut de Pathologie du Bâtiment',
      locale: 'fr_FR',
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.date,
      authors: [post.author],
      images: [
        {
          url: `${baseUrl}/images/IPB_Logo_HD.png`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.metaDescription,
      images: [`${baseUrl}/images/IPB_Logo_HD.png`],
      creator: '@IPBExpertise',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-snippet': -1,
        'max-image-preview': 'large',
        'max-video-preview': -1,
      },
    },
  };
}

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {
  const slug = typeof params === 'object' && 'then' in params ? null : params.slug;
  
  if (!slug) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Chargement...</h1>
        </div>
      </div>
    );
  }
  
  const post = blogPosts[slug];

  if (!post) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Article non trouvé</h1>
          <Link href="/blog" className="text-orange-600 font-bold hover:text-orange-700">
            Retour au blog
          </Link>
        </div>
      </div>
    );
  }

  // Enrichissement du contenu avec IDs
  const enrichedContent = addIdsToHeadings(post.content);
  
  // Extraction du sommaire
  const tocItems = extractTocFromContent(post.content);
  
  // Génération des JSON-LD
  const articleJsonLd = generateArticleJsonLd(post);
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Accueil', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: categoryLabels[post.category], url: `/blog?category=${post.category}` },
    { name: post.title, url: `/blog/${post.slug}` },
  ]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* JSON-LD pour SEO */}
      <Script
        id="article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <TopBar />
      <Navbar />
      
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-orange-600 font-bold transition-colors"
          >
            <ArrowLeft size={18} />
            Retour au blog
          </Link>
        </div>
      </div>

      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: 'Blog', href: '/blog' },
            { label: categoryLabels[post.category], href: `/blog?category=${post.category}` },
            { label: post.title },
          ]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Contenu principal */}
          <div className="lg:col-span-8">
            {/* En-tête de l'article */}
            <div className="mb-8">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border mb-4 ${categoryColors[post.category]}`}>
                {categoryLabels[post.category]}
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
                {post.title}
              </h1>
          <div className="flex flex-wrap items-center gap-6 text-slate-600 mb-6">
            <span className="flex items-center gap-2">
              <Calendar size={16} />
              {new Date(post.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
            <span className="flex items-center gap-2">
              <Clock size={16} />
              {post.readTime} de lecture
            </span>
            <span>Par {post.author}</span>
          </div>
          
          {/* Boutons de partage */}
          <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
            <span className="text-sm font-bold text-slate-600">Partager :</span>
            <button className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              <Facebook size={18} />
            </button>
            <button className="p-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition">
              <Twitter size={18} />
            </button>
            <button className="p-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition">
              <Linkedin size={18} />
            </button>
          </div>
        </div>

            {/* Contenu de l'article */}
            <div
              className="prose max-w-none prose-slate prose-headings:font-extrabold prose-headings:text-slate-900 prose-p:text-slate-700 prose-p:leading-7 prose-p:my-4 prose-li:text-slate-700 prose-li:my-1 prose-strong:text-slate-900 prose-strong:font-bold prose-h2:mt-10 prose-h2:mb-5 prose-h3:mt-6 prose-h3:mb-3 prose-h2:scroll-mt-24 prose-h3:scroll-mt-24 md:prose-lg md:prose-p:leading-8"
              dangerouslySetInnerHTML={{ __html: enrichedContent }}
            />

            <div className="mt-8 bg-slate-50 border border-slate-200 rounded-2xl p-6">
              <h3 className="text-xl font-extrabold text-slate-900 mb-4">À lire aussi</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <Link href="/expertise/fissures" className="bg-white border border-slate-200 rounded-xl p-4 hover:border-orange-300 hover:shadow-sm transition">
                  <h4 className="font-bold text-slate-900 mb-1">Expertise fissures</h4>
                  <p className="text-sm text-slate-600">Agrafage et stabilisation des fondations.</p>
                </Link>
                <Link href="/expertise/humidite" className="bg-white border border-slate-200 rounded-xl p-4 hover:border-orange-300 hover:shadow-sm transition">
                  <h4 className="font-bold text-slate-900 mb-1">Traitement humidité</h4>
                  <p className="text-sm text-slate-600">Injection résine et cuvelage durable.</p>
                </Link>
              </div>
              <div className="mt-4">
                <Link href="/diagnostic" className="text-orange-600 font-bold hover:text-orange-700">
                  Lancer un diagnostic gratuit →
                </Link>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-12 bg-slate-900 rounded-2xl p-8 text-center text-white relative overflow-hidden">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-500 via-slate-900 to-slate-900"></div>
              <div className="relative z-10">
                <h2 className="text-2xl font-extrabold mb-4">Cet article vous a aidé ?</h2>
                <p className="text-slate-300 mb-6">
                  Obtenez un diagnostic personnalisé pour votre situation. 149€ déductibles sur travaux.
                </p>
                <Link
                  href="/diagnostic"
                  className="inline-flex items-center gap-2 bg-orange-600 text-white px-8 py-4 rounded-xl font-bold shadow-xl hover:bg-orange-500 transition-all transform hover:-translate-y-1"
                >
                  Lancer mon diagnostic gratuit
                </Link>
              </div>
            </div>
          </div>

          <InternalLinks variant="blog" />

          {/* Sommaire (sidebar) */}
          {tocItems.length > 0 && (
            <aside className="lg:col-span-4">
              <TableOfContents items={tocItems} />
            </aside>
          )}
        </div>
      </article>

      {/* Articles similaires */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-slate-200">
        <h2 className="text-2xl font-extrabold text-slate-900 mb-8">Articles similaires</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.values(blogPosts)
            .filter(p => p.category === post.category && p.slug !== post.slug)
            .slice(0, 3)
            .map((relatedPost) => (
              <Link
                key={relatedPost.slug}
                href={`/blog/${relatedPost.slug}`}
                className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden hover:shadow-lg transition-all"
              >
                <div className="h-40 bg-gradient-to-br from-slate-200 to-slate-300"></div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2">
                    {relatedPost.title}
                  </h3>
                  <p className="text-sm text-slate-600 line-clamp-2">
                    {relatedPost.excerpt}
                  </p>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
