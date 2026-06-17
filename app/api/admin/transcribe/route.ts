import type { NextRequest } from 'next/server';
import { requireUser } from '@/lib/auth-helpers';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

/**
 * Transcription audio → texte pour la dictée terrain des diagnostiqueurs sur
 * navigateurs SANS reconnaissance vocale native (notamment Chrome sur iPhone,
 * qui tourne sous WebKit et n'expose pas l'API Web Speech).
 *
 * Le client enregistre l'audio (MediaRecorder) et le poste ici ; on relaie vers
 * une API Whisper compatible OpenAI. Activé uniquement si `TRANSCRIBE_API_KEY`
 * est défini (par défaut Groq, dont le free tier suffit). Sinon : 501 explicite
 * (le client invite alors à utiliser Safari ou à configurer la clé).
 *
 * Variables d'env :
 *  - TRANSCRIBE_API_KEY   (requis pour activer)
 *  - TRANSCRIBE_BASE_URL  (def. https://api.groq.com/openai/v1)
 *  - TRANSCRIBE_MODEL     (def. whisper-large-v3)
 */

/** Indique au composant de dictée si la transcription serveur (Whisper) est
 *  disponible → il la PRÉFÈRE alors à la reconnaissance navigateur (qualité). */
export async function GET() {
  try {
    await requireUser();
  } catch {
    return new Response('Non autorisé', { status: 401 });
  }
  return Response.json({ configured: Boolean(process.env.TRANSCRIBE_API_KEY) });
}

export async function POST(req: NextRequest) {
  try {
    await requireUser();
  } catch {
    return new Response('Non autorisé', { status: 401 });
  }

  const key = process.env.TRANSCRIBE_API_KEY;
  if (!key) {
    return Response.json(
      { error: 'not-configured' },
      { status: 501 }
    );
  }
  const baseUrl = (process.env.TRANSCRIBE_BASE_URL || 'https://api.groq.com/openai/v1').replace(/\/$/, '');
  const model = process.env.TRANSCRIBE_MODEL || 'whisper-large-v3';

  const form = await req.formData().catch(() => null);
  const file = form?.get('audio');
  if (!(file instanceof File)) {
    return Response.json({ error: 'no-audio' }, { status: 400 });
  }

  // Corps reconstruit À CHAQUE essai : une FormData passée à fetch ne doit pas
  // être réutilisée telle quelle sur un 2e envoi (corps déjà extrait).
  const buildBody = () => {
    const fd = new FormData();
    fd.set('file', file, file.name || 'audio.m4a');
    fd.set('model', model);
    fd.set('language', 'fr');
    fd.set('response_format', 'json');
    return fd;
  };

  // Un seul retry sur erreur transitoire (5xx / réseau) pour rester dans le
  // budget maxDuration=60 s. On distingue le 429 (quota Groq) pour un message dédié.
  const maxRetries = 1;
  let lastDetail = '';
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const r = await fetch(`${baseUrl}/audio/transcriptions`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${key}` },
        body: buildBody(),
      });
      if (r.ok) {
        const data = (await r.json()) as { text?: string };
        return Response.json({ text: (data.text ?? '').trim() });
      }
      if (r.status === 429) {
        const detail = (await r.text().catch(() => '')).slice(0, 300);
        return Response.json({ error: 'quota', detail }, { status: 429 });
      }
      lastDetail = (await r.text().catch(() => '')).slice(0, 300);
      console.error('[transcribe] réponse non-OK du fournisseur:', r.status, lastDetail);
      // 4xx : inutile de retenter. 5xx : on retente tant qu'il reste des essais.
      if (r.status < 500 || attempt === maxRetries) {
        return Response.json({ error: 'upstream', detail: lastDetail }, { status: 502 });
      }
    } catch (e) {
      lastDetail = e instanceof Error ? e.message : 'err';
      console.error('[transcribe] échec d\'appel au fournisseur:', lastDetail);
      if (attempt === maxRetries) {
        return Response.json({ error: 'fetch', detail: lastDetail }, { status: 502 });
      }
    }
    await new Promise((resolve) => setTimeout(resolve, 800 * 2 ** attempt));
  }
  return Response.json({ error: 'upstream', detail: lastDetail }, { status: 502 });
}
