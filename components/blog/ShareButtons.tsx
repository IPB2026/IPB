"use client";

import { useState } from 'react';
import { Facebook, Linkedin, Link2, Check, Mail } from 'lucide-react';

interface ShareButtonsProps {
  title: string;
  url: string;
}

/**
 * Boutons de partage interactifs pour les articles blog.
 *
 * - Facebook / LinkedIn / Email : ouvre l'URL de partage native
 * - Copy link : copie l'URL dans le presse-papiers + feedback visuel
 *
 * Note : Twitter/X retiré de l'UI (faible engagement éditorial FR).
 * Web Share API mobile non utilisée — préférence pour les boutons
 * explicites + visibles + trackables.
 */
export function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareTargets = [
    {
      name: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      Icon: Facebook,
      ariaLabel: 'Partager sur Facebook',
    },
    {
      name: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      Icon: Linkedin,
      ariaLabel: 'Partager sur LinkedIn',
    },
    {
      name: 'Email',
      href: `mailto:?subject=${encodedTitle}&body=${encodedTitle}%0A%0A${encodedUrl}`,
      Icon: Mail,
      ariaLabel: 'Partager par email',
    },
  ];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback : sélection manuelle si clipboard indisponible
      const textarea = document.createElement('textarea');
      textarea.value = url;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        // Silencieux si rien ne marche
      }
      document.body.removeChild(textarea);
    }
  };

  return (
    <div className="share-buttons">
      <span className="share-label">Partager :</span>
      {shareTargets.map(({ name, href, Icon, ariaLabel }) => (
        <a
          key={name}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="share-btn"
          aria-label={ariaLabel}
          title={ariaLabel}
        >
          <Icon size={18} />
        </a>
      ))}
      <button
        type="button"
        onClick={handleCopy}
        className="share-btn"
        aria-label={copied ? 'Lien copié' : 'Copier le lien'}
        title={copied ? 'Lien copié' : 'Copier le lien'}
      >
        {copied ? <Check size={18} /> : <Link2 size={18} />}
      </button>
      {copied && (
        <span className="share-feedback" role="status" aria-live="polite">
          Lien copié
        </span>
      )}
    </div>
  );
}
