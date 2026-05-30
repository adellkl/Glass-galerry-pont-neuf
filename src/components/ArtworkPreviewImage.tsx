import { useState, useCallback, type SyntheticEvent } from 'react';

interface ArtworkPreviewImageProps {
  src: string;
  alt: string;
  aspect?: 'portrait' | 'square' | 'landscape';
  size?: 'md' | 'sm';
  onClick?: () => void;
  className?: string;
}

function objectPositionForRatio(ratio: number): string {
  if (ratio < 0.72) return 'center 12%';
  if (ratio < 0.95) return 'center 18%';
  if (ratio > 1.45) return 'center center';
  return 'center center';
}

export default function ArtworkPreviewImage({
  src,
  alt,
  aspect = 'portrait',
  size = 'md',
  onClick,
  className = '',
}: ArtworkPreviewImageProps) {
  const [objectPosition, setObjectPosition] = useState('center center');

  const aspectClass =
    aspect === 'landscape'
      ? size === 'sm'
        ? 'aspect-[5/4]'
        : 'aspect-[4/3]'
      : aspect === 'square'
        ? 'aspect-square'
        : size === 'sm'
          ? 'aspect-[5/6]'
          : 'aspect-[4/5]';

  const onImageLoad = useCallback((e: SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    if (!img.naturalWidth || !img.naturalHeight) return;
    setObjectPosition(objectPositionForRatio(img.naturalWidth / img.naturalHeight));
  }, []);

  return (
    <div
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
      className={`artwork-preview ${aspectClass} ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        loading="lazy"
        onLoad={onImageLoad}
        style={{ objectPosition }}
        className="artwork-preview__img art-image-zoom"
      />
    </div>
  );
}
