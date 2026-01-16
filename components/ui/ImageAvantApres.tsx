"use client";

import Image from 'next/image';
import { useState } from 'react';

interface ImageAvantApresProps {
  src: string;
  alt: string;
  fallbackIcon?: React.ReactNode;
  fallbackText?: string;
  className?: string;
}

export function ImageAvantApres({ 
  src, 
  alt, 
  fallbackIcon, 
  fallbackText,
  className = ""
}: ImageAvantApresProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className={`absolute inset-0 bg-gradient-to-b from-slate-300 to-slate-200 flex items-center justify-center text-slate-500 font-medium ${className}`}>
        <div className="text-center">
          {fallbackIcon}
          <div className="text-xs mt-2">{fallbackText || '[Image non disponible]'}</div>
        </div>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={`object-cover ${className}`}
      sizes="(max-width: 768px) 100vw, 50vw"
      priority={false}
      onError={() => setHasError(true)}
    />
  );
}

