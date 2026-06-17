import { guardAdminPage } from '@/lib/auth-helpers';
import { PageHeader } from '@/components/admin/page-header';
import { CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';

export const dynamic = 'force-dynamic';

/** Nom de la variable d'env qui porte le token Vercel Blob (valeur masquée). */
function blobTokenVar(): string | null {
  if (process.env.BLOB_READ_WRITE_TOKEN) return 'BLOB_READ_WRITE_TOKEN';
  for (const [k, v] of Object.entries(process.env)) {
    if (typeof v === 'string' && v.startsWith('vercel_blob_rw_')) return k;
  }
  return null;
}

/** Teste EN DIRECT la transcription : clé valide ? modèle disponible ? + erreur exacte. */
async function checkTranscribe(): Promise<{
  keySet: boolean;
  status: number | null; // statut HTTP de l'appel /models
  modelOk: boolean | null; // le modèle configuré existe-t-il chez le fournisseur ?
  detail: string; // message d'erreur EXACT ou liste des modèles whisper dispo
  baseUrl: string;
  model: string;
}> {
  const key = process.env.TRANSCRIBE_API_KEY;
  const baseUrl = (process.env.TRANSCRIBE_BASE_URL || 'https://api.groq.com/openai/v1').replace(/\/$/, '');
  const model =
    process.env.TRANSCRIBE_MODEL ||
    (/openai\.com/i.test(baseUrl) ? 'whisper-1' : 'whisper-large-v3');
  if (!key) {
    return { keySet: false, status: null, modelOk: null, detail: 'TRANSCRIBE_API_KEY absente du déploiement en cours.', baseUrl, model };
  }
  try {
    const r = await fetch(`${baseUrl}/models`, {
      headers: { Authorization: `Bearer ${key}` },
      signal: AbortSignal.timeout(8000),
    });
    if (!r.ok) {
      const body = (await r.text().catch(() => '')).replace(/\s+/g, ' ').slice(0, 220);
      return { keySet: true, status: r.status, modelOk: null, detail: body || `HTTP ${r.status}`, baseUrl, model };
    }
    const data = (await r.json().catch(() => null)) as { data?: { id: string }[] } | null;
    const ids = (data?.data ?? []).map((m) => m.id);
    const modelOk = ids.includes(model);
    const whisper = ids.filter((id) => id.toLowerCase().includes('whisper'));
    return {
      keySet: true,
      status: 200,
      modelOk,
      detail: modelOk ? '' : `Modèle « ${model} » introuvable. Modèles audio dispo : ${whisper.join(', ') || '(aucun)'}.`,
      baseUrl,
      model,
    };
  } catch (e) {
    return { keySet: true, status: null, modelOk: null, detail: e instanceof Error ? e.message : 'injoignable', baseUrl, model };
  }
}

function Row({
  ok,
  warn,
  label,
  detail,
}: {
  ok: boolean;
  warn?: boolean;
  label: string;
  detail: string;
}) {
  const Icon = ok ? CheckCircle2 : warn ? AlertTriangle : XCircle;
  const tone = ok ? 'text-emerald-600' : warn ? 'text-amber-600' : 'text-red-600';
  return (
    <li className="flex items-start gap-3 px-5 py-3">
      <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${tone}`} />
      <div className="min-w-0">
        <p className="text-sm font-medium text-slate-900">{label}</p>
        <p className="text-xs text-slate-500">{detail}</p>
      </div>
    </li>
  );
}

export default async function DiagnosticPage() {
  await guardAdminPage();

  const blobVar = blobTokenVar();
  const transcribe = await checkTranscribe();
  const has = (k: string) => Boolean(process.env[k]);
  const smtpOk = has('SMTP_USER') && (has('SMTP_PASS') || has('SMTP_PASSWORD'));
  const googleOk = has('GOOGLE_CLIENT_ID') && has('GOOGLE_CLIENT_SECRET') && has('GOOGLE_REFRESH_TOKEN');

  return (
    <div className="space-y-5">
      <PageHeader
        title="Diagnostic technique"
        subtitle="État réel des intégrations côté serveur (production). Les valeurs des secrets ne sont jamais affichées."
      />

      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="border-b border-slate-200 px-5 py-3">
          <h2 className="text-sm font-semibold text-slate-900">Photos terrain (Vercel Blob)</h2>
        </div>
        <ul className="divide-y divide-slate-100">
          <Row
            ok={Boolean(blobVar)}
            label={blobVar ? 'Stockage photos ACTIF' : 'Stockage photos NON configuré'}
            detail={
              blobVar
                ? `Token détecté via la variable « ${blobVar} ». Le bouton « Ajouter des photos » s'affiche (sur un rapport en brouillon/soumis).`
                : 'Aucune variable de token Blob trouvée. Connectez un store Vercel Blob au projet (Storage → Blob) puis redéployez. Le bouton d\'ajout de photos reste masqué tant que c\'est absent.'
            }
          />
        </ul>
      </section>

      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="border-b border-slate-200 px-5 py-3">
          <h2 className="text-sm font-semibold text-slate-900">Dictée vocale (transcription serveur)</h2>
        </div>
        <ul className="divide-y divide-slate-100">
          <Row
            ok={transcribe.keySet && transcribe.status === 200 && transcribe.modelOk === true}
            warn={transcribe.keySet && transcribe.status === 200 && transcribe.modelOk === false}
            label={
              !transcribe.keySet
                ? 'Transcription serveur NON configurée'
                : transcribe.status === 200 && transcribe.modelOk
                  ? 'Transcription serveur ACTIVE et valide'
                  : transcribe.status === 200 && !transcribe.modelOk
                    ? 'Clé valide, mais MODÈLE introuvable'
                    : transcribe.status
                      ? `Clé REFUSÉE par le fournisseur (HTTP ${transcribe.status})`
                      : 'Service de transcription injoignable'
            }
            detail={
              !transcribe.keySet
                ? `Définissez TRANSCRIBE_API_KEY (Groq, free tier) sur Vercel PUIS redéployez. Sans elle, la dictée n'utilise que la reconnaissance du navigateur — médiocre en français.`
                : transcribe.status === 200 && transcribe.modelOk
                  ? `${transcribe.model} via ${transcribe.baseUrl} — la dictée bascule sur Whisper (qualité française supérieure, et fonctionne sur Chrome iPhone).`
                  : `Erreur exacte : « ${transcribe.detail} »  —  (point d'accès ${transcribe.baseUrl}, modèle « ${transcribe.model} »). Régénérez TRANSCRIBE_API_KEY chez Groq, ou ajustez TRANSCRIBE_MODEL / TRANSCRIBE_BASE_URL, puis redéployez.`
            }
          />
        </ul>
      </section>

      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="border-b border-slate-200 px-5 py-3">
          <h2 className="text-sm font-semibold text-slate-900">Autres intégrations</h2>
        </div>
        <ul className="divide-y divide-slate-100">
          <Row ok={has('DATABASE_URL')} label="Base de données (Neon)" detail={has('DATABASE_URL') ? 'DATABASE_URL définie.' : 'DATABASE_URL absente — le CRM ne fonctionne pas.'} />
          <Row ok={has('AUTH_SECRET')} label="Authentification" detail={has('AUTH_SECRET') ? 'AUTH_SECRET définie (login + tokens signés).' : 'AUTH_SECRET absente.'} />
          <Row ok={has('ANTHROPIC_API_KEY')} label="Génération des rapports (Claude)" detail={has('ANTHROPIC_API_KEY') ? 'ANTHROPIC_API_KEY définie.' : 'ANTHROPIC_API_KEY absente — génération IA indisponible.'} />
          <Row ok={smtpOk} label="Envoi d'e-mails (SMTP)" detail={smtpOk ? 'SMTP configuré (devis, factures, relances).' : 'SMTP_USER / SMTP_PASS manquants — aucun e-mail ne part.'} />
          <Row ok={has('CRON_SECRET')} label="Tâches automatiques (cron)" detail={has('CRON_SECRET') ? 'CRON_SECRET définie (relances + facturation J+1 actives).' : 'CRON_SECRET absente — le cron est désactivé (503).'} />
          <Row ok={googleOk} warn={!googleOk} label="Google Agenda (optionnel)" detail={googleOk ? 'Synchronisation agenda active.' : 'Non connecté — l\'agenda reste interne (sans invitations Google).'} />
        </ul>
      </section>
    </div>
  );
}
