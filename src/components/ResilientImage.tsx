import { useState } from 'react';
import { FlaskConical } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
  fallbackSubtitle?: string;
}

export function ResilientImage({
  src,
  alt,
  className = '',
  fallbackTitle = 'A/L Science for Technology',
  fallbackSubtitle = 'Hirusha Bandara',
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-light-surface-container via-light-surface-container-low to-light-secondary-container p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-light-surface-bright text-electric-blue shadow-sm border border-light-outline-variant/60">
          <FlaskConical className="h-6 w-6" aria-hidden="true" />
        </div>
        <span className="font-headline text-sm font-semibold text-light-on-surface">
          {fallbackTitle}
        </span>
        <span className="mt-1 font-mono text-xs text-light-on-surface-variant">
          {fallbackSubtitle}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
