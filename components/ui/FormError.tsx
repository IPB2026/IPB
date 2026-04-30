/**
 * FormError — composant d'affichage d'erreur de formulaire accessible.
 *
 * Conformité WCAG :
 * - 1.4.1 Use of color : l'erreur n'est pas signalée que par la couleur
 *   rouge ; elle inclut une icône (sémantique 'danger') et le mot
 *   "Erreur" en gras
 * - 4.1.3 Status messages : role="alert" + aria-live="polite" pour
 *   annonce immédiate par les lecteurs d'écran
 * - 1.4.3 Contrast : red-700 (#B91C1C) sur red-50 (#FEF2F2) > 5:1
 */

import { AlertCircle } from 'lucide-react';

interface FormErrorProps {
  message: string;
  className?: string;
}

export function FormError({ message, className = '' }: FormErrorProps) {
  if (!message) return null;

  return (
    <div
      role="alert"
      aria-live="polite"
      className={`bg-red-50 border border-red-200 text-red-700 text-[13px] rounded-[3px] px-4 py-3 leading-[1.5] flex items-start gap-2.5 ${className}`}
    >
      <AlertCircle size={18} aria-hidden="true" className="flex-shrink-0 mt-0.5" />
      <span>
        <strong className="font-semibold">Erreur :</strong> {message}
      </span>
    </div>
  );
}
