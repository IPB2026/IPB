'use client';

import { useFormStatus } from 'react-dom';
import { Loader2 } from 'lucide-react';

/**
 * Bouton de soumission partagé : se désactive et change de libellé pendant
 * l'envoi du formulaire (anti double-clic + feedback). À utiliser dans tout
 * `<form action={serverAction}>`. `pendingLabel` remplace le contenu pendant
 * l'envoi ; `spinner` ajoute un petit loader.
 */
export function SubmitButton({
  children,
  pendingLabel,
  className = '',
  spinner = false,
  disabled,
  ...props
}: React.ComponentProps<'button'> & {
  pendingLabel?: React.ReactNode;
  spinner?: boolean;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending || disabled}
      aria-busy={pending}
      className={`${className} inline-flex items-center justify-center gap-1.5 disabled:opacity-60 disabled:cursor-not-allowed`}
      {...props}
    >
      {pending ? (
        <>
          {spinner && <Loader2 className="h-4 w-4 animate-spin" />}
          {pendingLabel ?? children}
        </>
      ) : (
        children
      )}
    </button>
  );
}
