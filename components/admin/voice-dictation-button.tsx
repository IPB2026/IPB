'use client';

import { useEffect, useRef, useState } from 'react';
import { Mic, Square, Loader2 } from 'lucide-react';

/**
 * Dictée vocale terrain → texte, sans dépendance npm. Deux moteurs, choisis
 * automatiquement selon le navigateur :
 *
 *  1. API Web Speech (reconnaissance INSTANTANÉE, gratuite) — disponible sur
 *     Chrome/Edge desktop, Chrome Android et **Safari iOS**.
 *  2. Repli ENREGISTREMENT + transcription serveur (`/api/admin/transcribe`,
 *     Whisper) — pour les navigateurs sans Web Speech, notamment **Chrome sur
 *     iPhone** (WebKit). Actif si la transcription est configurée côté serveur.
 *
 * NB : la dictée et le micro exigent HTTPS (ou localhost). En http:// simple,
 * le navigateur bloque l'accès — un message explicite le signale.
 *
 * Chaque segment de texte reconnu est remonté via `onAppend`.
 */

// ── Types minimaux de l'API Web Speech (non typée par TS) ──
type SpeechResult = { 0: { transcript: string }; isFinal: boolean };
interface SpeechEvent {
  resultIndex: number;
  results: { length: number; [i: number]: SpeechResult };
}
interface SpeechRecognitionLike {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start(): void;
  stop(): void;
  onresult: ((e: SpeechEvent) => void) | null;
  onerror: ((e: { error?: string }) => void) | null;
  onend: (() => void) | null;
}

function getRecognitionCtor(): (new () => SpeechRecognitionLike) | null {
  if (typeof window === 'undefined') return null;
  const w = window as unknown as {
    SpeechRecognition?: new () => SpeechRecognitionLike;
    webkitSpeechRecognition?: new () => SpeechRecognitionLike;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

function canRecord(): boolean {
  return (
    typeof window !== 'undefined' &&
    typeof navigator !== 'undefined' &&
    !!navigator.mediaDevices?.getUserMedia &&
    typeof window.MediaRecorder !== 'undefined'
  );
}

/** HTTPS (ou localhost) requis pour le micro / Web Speech. */
function isSecure(): boolean {
  if (typeof window === 'undefined') return true;
  const h = window.location.hostname;
  return (
    window.location.protocol === 'https:' ||
    h === 'localhost' ||
    h === '127.0.0.1' ||
    h === '[::1]'
  );
}

type Mode = 'idle' | 'listening' | 'recording' | 'transcribing';

export function VoiceDictationButton({
  onAppend,
  className = '',
}: {
  onAppend: (text: string) => void;
  className?: string;
}) {
  const [engine, setEngine] = useState<'speech' | 'record' | 'none'>('none');
  const [mode, setMode] = useState<Mode>('idle');
  const [note, setNote] = useState<string | null>(null);
  const recRef = useRef<SpeechRecognitionLike | null>(null);
  const mediaRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  // Refs pour les closures Web Speech (onend/onerror capturent un `mode` figé).
  const modeRef = useRef<Mode>('idle');
  const wantListeningRef = useRef(false); // l'utilisateur veut-il continuer à dicter ?
  const erroredRef = useRef(false); // une erreur fatale a-t-elle eu lieu ?
  // Miroir synchrone de `engine` : `onClick` le lit au moment du clic, ce qui
  // évite un double-déclenchement si on clique pendant le re-rendu qui suit un
  // basculement de moteur (setEngine est asynchrone).
  const engineRef = useRef<'speech' | 'record' | 'none'>('none');

  const changeMode = (m: Mode) => {
    modeRef.current = m;
    setMode(m);
  };
  const switchEngine = (e: 'speech' | 'record' | 'none') => {
    engineRef.current = e;
    setEngine(e);
  };

  useEffect(() => {
    if (getRecognitionCtor()) switchEngine('speech');
    else if (canRecord()) switchEngine('record');
    else switchEngine('none');
    return () => {
      wantListeningRef.current = false;
      try {
        recRef.current?.stop();
        mediaRef.current?.stop();
      } catch {
        /* no-op */
      }
    };
  }, []);

  // Onglet inactif pendant la dictée : Web Speech se coupe silencieusement.
  useEffect(() => {
    const onHide = () => {
      if (document.hidden && modeRef.current === 'listening') {
        wantListeningRef.current = false;
        try {
          recRef.current?.stop();
        } catch {
          /* no-op */
        }
        setNote('Dictée suspendue (onglet inactif). Touchez pour reprendre.');
      }
    };
    document.addEventListener('visibilitychange', onHide);
    return () => document.removeEventListener('visibilitychange', onHide);
  }, []);

  if (engine === 'none') return null;

  // ── Moteur 1 : reconnaissance instantanée (Web Speech) ──
  const toggleSpeech = () => {
    if (modeRef.current === 'listening') {
      wantListeningRef.current = false; // arrêt volontaire → pas de redémarrage auto
      recRef.current?.stop();
      return;
    }
    if (!isSecure()) {
      setNote('Connexion non sécurisée — la dictée nécessite HTTPS.');
      return;
    }
    const Ctor = getRecognitionCtor();
    if (!Ctor) return;
    const rec = new Ctor();
    rec.lang = 'fr-FR';
    rec.continuous = true;
    rec.interimResults = true;
    rec.onresult = (e) => {
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const r = e.results[i];
        if (r.isFinal) {
          const text = r[0].transcript.trim();
          if (text) onAppend(text);
        }
      }
    };
    rec.onerror = (e) => {
      const err = e.error || '';
      if (err === 'no-speech' || err === 'aborted') return; // normal en continu
      const messages: Record<string, string> = {
        'not-allowed': 'Micro refusé — autorisez le microphone dans les réglages du navigateur.',
        'service-not-allowed':
          'Micro refusé — autorisez le microphone dans les réglages du navigateur.',
        'audio-capture': 'Micro indisponible (déjà utilisé par une autre application ?).',
        'network': 'Dictée instantanée indisponible (réseau).',
      };
      const fatal =
        err === 'not-allowed' ||
        err === 'service-not-allowed' ||
        err === 'audio-capture' ||
        err === 'network';
      if (fatal) {
        wantListeningRef.current = false;
        erroredRef.current = true;
      }
      let msg = messages[err] || 'Reconnaissance vocale indisponible.';
      // Repli : proposer le mode enregistrement + transcription serveur.
      if (fatal && canRecord()) {
        switchEngine('record');
        msg += ' Basculé en mode enregistrement — touchez pour enregistrer puis transcrire.';
      }
      setNote(msg);
    };
    rec.onend = () => {
      // Le navigateur coupe la session après un silence : on relance tant que
      // l'utilisateur n'a pas arrêté volontairement et qu'aucune erreur fatale.
      if (wantListeningRef.current && !erroredRef.current) {
        try {
          rec.start();
          return;
        } catch {
          wantListeningRef.current = false;
        }
      }
      changeMode('idle');
    };
    recRef.current = rec;
    wantListeningRef.current = true;
    erroredRef.current = false;
    try {
      rec.start();
      changeMode('listening');
      setNote(null);
    } catch {
      wantListeningRef.current = false;
      changeMode('idle');
      setNote('Impossible de démarrer la dictée. Réessayez.');
    }
  };

  // ── Moteur 2 : enregistrement + transcription serveur ──
  const startRecording = async () => {
    if (!isSecure()) {
      setNote('Connexion non sécurisée — le micro nécessite HTTPS.');
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(stream);
      chunksRef.current = [];
      mr.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      mr.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop());
        const blob = new Blob(chunksRef.current, {
          type: mr.mimeType || 'audio/mp4',
        });
        if (!navigator.onLine) {
          setNote('Hors ligne — la transcription nécessite une connexion.');
          changeMode('idle');
          return;
        }
        changeMode('transcribing');
        try {
          const fd = new FormData();
          const ext = (mr.mimeType || 'audio/mp4').includes('webm') ? 'webm' : 'm4a';
          fd.set('audio', blob, `dictee.${ext}`);
          const res = await fetch('/api/admin/transcribe', {
            method: 'POST',
            body: fd,
          });
          if (res.ok) {
            const data = (await res.json()) as { text?: string };
            const text = (data.text ?? '').trim();
            if (text) onAppend(text);
            else setNote('Aucune parole reconnue — réessayez en parlant plus près du micro.');
          } else if (res.status === 501) {
            setNote(
              'Dictée non configurée pour ce navigateur — utilisez Safari, ou activez la transcription serveur.'
            );
          } else if (res.status === 429) {
            setNote('Quota de transcription atteint — réessayez dans quelques minutes.');
          } else {
            let detail = '';
            try {
              const data = (await res.json()) as { detail?: string };
              detail = (data.detail ?? '').slice(0, 120);
            } catch {
              /* corps non JSON */
            }
            setNote(detail ? `Échec transcription (${res.status}) : ${detail}` : `Échec de la transcription (${res.status}). Réessayez.`);
          }
        } catch {
          setNote('Échec de la transcription — vérifiez votre connexion et réessayez.');
        } finally {
          if (modeRef.current === 'transcribing') changeMode('idle');
        }
      };
      mediaRef.current = mr;
      mr.start();
      changeMode('recording');
      setNote(null);
    } catch {
      setNote("Micro indisponible — autorisez l'accès au microphone.");
      changeMode('idle');
    }
  };

  const toggleRecord = () => {
    if (modeRef.current === 'recording') {
      mediaRef.current?.stop();
      return;
    }
    if (modeRef.current === 'transcribing') return;
    void startRecording();
  };

  const onClick = () => {
    if (engineRef.current === 'speech') toggleSpeech();
    else toggleRecord();
  };
  const active = mode === 'listening' || mode === 'recording';
  const busy = mode === 'transcribing';

  return (
    <span className="inline-flex flex-col items-end gap-1">
      <button
        type="button"
        onClick={onClick}
        disabled={busy}
        aria-pressed={active}
        title={active ? 'Arrêter la dictée' : 'Dicter les observations'}
        className={
          (active
            ? 'border-red-300 bg-red-50 text-red-700'
            : 'border-slate-300 bg-white text-slate-600 hover:bg-slate-50') +
          ' inline-flex min-h-[44px] sm:min-h-[36px] items-center gap-1.5 rounded-lg border px-3 py-2 sm:px-2.5 sm:py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 disabled:opacity-60 ' +
          className
        }
      >
        {busy ? (
          <>
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            Transcription…
          </>
        ) : active ? (
          <>
            <Square className="h-3.5 w-3.5 animate-pulse fill-current" />
            {mode === 'recording' ? 'Enregistre…' : 'En écoute…'}
          </>
        ) : (
          <>
            <Mic className="h-3.5 w-3.5" />
            Dicter
          </>
        )}
      </button>
      {note && <span className="max-w-[240px] text-right text-[11px] text-amber-600">{note}</span>}
    </span>
  );
}
