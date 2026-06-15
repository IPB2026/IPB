'use client';

import { useEffect, useRef, useState } from 'react';
import { Mic, Square } from 'lucide-react';

/**
 * Dictée vocale (terrain) → texte, sans dépendance : utilise l'API Web Speech
 * du navigateur (Chrome / Edge, Android inclus). Chaque segment finalisé est
 * remonté via `onAppend` pour être ajouté aux observations de la zone.
 *
 * Le diagnostiqueur parle, le texte se remplit ; il complète ensuite à l'écrit
 * si besoin, puis l'IA structure le rapport à partir de ces observations.
 */

// Types minimaux de l'API Web Speech (non typée par TS).
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

export function VoiceDictationButton({
  onAppend,
  className = '',
}: {
  onAppend: (text: string) => void;
  className?: string;
}) {
  const [supported, setSupported] = useState(false);
  const [listening, setListening] = useState(false);
  const recRef = useRef<SpeechRecognitionLike | null>(null);

  useEffect(() => {
    setSupported(getRecognitionCtor() !== null);
    return () => {
      try {
        recRef.current?.stop();
      } catch {
        /* no-op */
      }
    };
  }, []);

  if (!supported) return null;

  const toggle = () => {
    if (listening) {
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
    rec.onerror = () => setListening(false);
    rec.onend = () => setListening(false);
    recRef.current = rec;
    try {
      rec.start();
      setListening(true);
    } catch {
      setListening(false);
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={listening}
      title={listening ? 'Arrêter la dictée' : 'Dicter les observations'}
      className={
        (listening
          ? 'border-red-300 bg-red-50 text-red-700'
          : 'border-slate-300 bg-white text-slate-600 hover:bg-slate-50') +
        ' inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors ' +
        className
      }
    >
      {listening ? (
        <>
          <Square className="h-3.5 w-3.5 animate-pulse fill-current" />
          En écoute…
        </>
      ) : (
        <>
          <Mic className="h-3.5 w-3.5" />
          Dicter
        </>
      )}
    </button>
  );
}
