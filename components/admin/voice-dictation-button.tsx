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

  useEffect(() => {
    if (getRecognitionCtor()) setEngine('speech');
    else if (canRecord()) setEngine('record');
    else setEngine('none');
    return () => {
      try {
        recRef.current?.stop();
        mediaRef.current?.stop();
      } catch {
        /* no-op */
      }
    };
  }, []);

  if (engine === 'none') return null;

  // ── Moteur 1 : reconnaissance instantanée ──
  const toggleSpeech = () => {
    if (mode === 'listening') {
      recRef.current?.stop();
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
    rec.onerror = () => setMode('idle');
    rec.onend = () => setMode('idle');
    recRef.current = rec;
    try {
      rec.start();
      setMode('listening');
      setNote(null);
    } catch {
      setMode('idle');
    }
  };

  // ── Moteur 2 : enregistrement + transcription serveur ──
  const startRecording = async () => {
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
        setMode('transcribing');
        try {
          const fd = new FormData();
          const ext = (mr.mimeType || 'audio/mp4').includes('webm') ? 'webm' : 'm4a';
          fd.set('audio', blob, `dictee.${ext}`);
          const res = await fetch('/api/admin/transcribe', {
            method: 'POST',
            body: fd,
          });
          if (res.status === 501) {
            setNote('Dictée non configurée pour ce navigateur — utilisez Safari, ou activez la transcription.');
          } else if (!res.ok) {
            setNote("Échec de la transcription. Réessayez.");
          } else {
            const data = (await res.json()) as { text?: string };
            const text = (data.text ?? '').trim();
            if (text) onAppend(text);
          }
        } catch {
          setNote('Échec de la transcription. Réessayez.');
        } finally {
          setMode('idle');
        }
      };
      mediaRef.current = mr;
      mr.start();
      setMode('recording');
      setNote(null);
    } catch {
      setNote("Micro indisponible — autorisez l'accès au microphone.");
      setMode('idle');
    }
  };

  const toggleRecord = () => {
    if (mode === 'recording') {
      mediaRef.current?.stop();
      return;
    }
    if (mode === 'transcribing') return;
    void startRecording();
  };

  const onClick = engine === 'speech' ? toggleSpeech : toggleRecord;
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
          ' inline-flex min-h-[36px] items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 disabled:opacity-60 ' +
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
      {note && <span className="max-w-[220px] text-right text-[11px] text-amber-600">{note}</span>}
    </span>
  );
}
