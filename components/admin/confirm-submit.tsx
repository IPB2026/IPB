'use client';

/**
 * Bouton de soumission avec confirmation native, pour les actions irréversibles
 * ou destructrices (envoi au client, suppression). Le clic ouvre une confirmation
 * et n'envoie le formulaire qu'en cas d'accord.
 */
export function ConfirmSubmit({
  message,
  children,
  className,
}: {
  message: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="submit"
      className={className}
      onClick={(e) => {
        if (!window.confirm(message)) e.preventDefault();
      }}
    >
      {children}
    </button>
  );
}
