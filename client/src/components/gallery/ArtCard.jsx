import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { buildThumbnailUrl } from '../../utils/cloudinaryUrl';

const FALLBACK = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="#1a1a1a"/><text x="200" y="155" font-family="Georgia,serif" font-size="13" fill="#404040" text-anchor="middle">Image unavailable</text></svg>'
)}`;

const categoryLabels = {
  portraits: 'Portraits',
  automotive: 'Automotive',
  custom: 'Custom',
  other: 'Other',
};

const ArtCard = ({ artwork, onClick }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: '200px' });

  const thumbnailUrl = buildThumbnailUrl(artwork.imageUrl, 600);

  return (
    <div
      ref={ref}
      onClick={() => onClick(artwork)}
      className="masonry-item group relative overflow-hidden rounded-lg bg-bg-card cursor-pointer border border-border hover:border-border-hover transition-all duration-300 hover:shadow-xl hover:shadow-black/40 hover:-translate-y-0.5"
    >
      {/* Skeleton */}
      {(!loaded && !error) && (
        <div className="skeleton w-full h-64" />
      )}

      {/* Lazy image */}
      {inView && (
        <img
          src={error ? FALLBACK : thumbnailUrl}
          alt={artwork.title}
          onLoad={() => setLoaded(true)}
          onError={() => { setError(true); setLoaded(true); }}
          className={`w-full h-auto block transition-all duration-500 group-hover:scale-[1.02] ${
            loaded ? 'opacity-100' : 'opacity-0 absolute inset-0'
          }`}
          loading="lazy"
        />
      )}

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/90 via-bg-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        <p className="text-text-primary font-heading font-semibold text-base leading-tight">
          {artwork.title}
        </p>
        {artwork.category && (
          <span className="inline-block mt-1 text-xs text-accent font-medium tracking-wide uppercase">
            {categoryLabels[artwork.category] || artwork.category}
          </span>
        )}
      </div>

      {/* Featured badge */}
      {artwork.featured && (
        <div className="absolute top-2 right-2 bg-accent/90 text-bg-primary text-xs font-bold px-2 py-0.5 rounded uppercase tracking-wide">
          Featured
        </div>
      )}
    </div>
  );
};

export default ArtCard;
