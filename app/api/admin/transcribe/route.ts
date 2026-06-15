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

  const upstream = new FormData();
  upstream.set('file', file, file.name || 'audio.m4a');
  upstream.set('model', model);
  upstream.set('language', 'fr');
  upstream.set('response_format', 'json');

  try {
    const r = await fetch(`${baseUrl}/audio/transcriptions`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}` },
      body: upstream,
    });
    if (!r.ok) {
      const detail = (await r.text().catch(() => '')).slice(0, 300);
      return Response.json({ error: 'upstream', detail }, { status: 502 });
    }
    const data = (await r.json()) as { text?: string };
    return Response.json({ text: (data.text ?? '').trim() });
  } catch (e) {
    return Response.json(
      { error: 'fetch', detail: e instanceof Error ? e.message : 'err' },
      { status: 502 }
    );
  }
}
