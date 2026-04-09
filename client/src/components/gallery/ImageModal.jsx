import { useEffect, useState, useCallback } from 'react';
import { X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from 'lucide-react';
import { buildCloudinaryUrl } from '../../utils/cloudinaryUrl';

const ImageModal = ({ isOpen, artwork, onClose, artworks = [] }) => {
  const [zoom, setZoom] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Find index of current artwork in the list
  useEffect(() => {
    if (artwork && artworks.length) {
      const idx = artworks.findIndex((a) => a._id === artwork._id);
      setCurrentIndex(idx >= 0 ? idx : 0);
    }
    setZoom(1);
  }, [artwork, artworks]);

  const currentArtwork = artworks[currentIndex] || artwork;

  const handlePrev = useCallback(() => {
    setZoom(1);
    setCurrentIndex((i) => (i > 0 ? i - 1 : artworks.length - 1));
  }, [artworks.length]);

  const handleNext = useCallback(() => {
    setZoom(1);
    setCurrentIndex((i) => (i < artworks.length - 1 ? i + 1 : 0));
  }, [artworks.length]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose, handlePrev, handleNext]);

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen || !currentArtwork) return null;

  const highResUrl = buildCloudinaryUrl(currentArtwork.imageUrl);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      {/* Modal container */}
      <div
        className="relative max-w-6xl max-h-[90vh] w-full mx-4 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Controls bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-bg-secondary/80 rounded-t-lg border border-border">
          <div>
            <h2 className="font-heading text-text-primary font-semibold text-lg leading-tight">
              {currentArtwork.title}
            </h2>
            {currentArtwork.category && (
              <span className="text-accent text-xs uppercase tracking-widest">
                {currentArtwork.category}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {/* Zoom controls */}
            <button
              onClick={() => setZoom((z) => Math.max(1, z - 0.25))}
              className="p-2 text-text-secondary hover:text-accent hover:bg-white/5 rounded transition-colors"
              disabled={zoom <= 1}
            >
              <ZoomOut size={18} />
            </button>
            <span className="text-text-muted text-xs w-12 text-center">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={() => setZoom((z) => Math.min(3, z + 0.25))}
              className="p-2 text-text-secondary hover:text-accent hover:bg-white/5 rounded transition-colors"
              disabled={zoom >= 3}
            >
              <ZoomIn size={18} />
            </button>
            <div className="w-px h-5 bg-border mx-1" />
            <button
              onClick={onClose}
              className="p-2 text-text-secondary hover:text-red-400 hover:bg-red-900/20 rounded transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Image area */}
        <div className="relative overflow-auto bg-bg-card rounded-b-lg border-x border-b border-border flex items-center justify-center min-h-[60vh] max-h-[80vh]">
          <img
            src={highResUrl}
            alt={currentArtwork.title}
            style={{ transform: `scale(${zoom})`, transformOrigin: 'center', transition: 'transform 0.2s ease' }}
            className="max-w-full max-h-[78vh] object-contain"
            draggable={false}
          />

          {/* Navigation arrows */}
          {artworks.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 glass-card p-3 rounded-full text-text-secondary hover:text-accent hover:border-accent transition-all duration-200"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 glass-card p-3 rounded-full text-text-secondary hover:text-accent hover:border-accent transition-all duration-200"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}
        </div>

        {/* Counter */}
        {artworks.length > 1 && (
          <p className="text-center text-text-muted text-xs mt-2">
            {currentIndex + 1} / {artworks.length}
          </p>
        )}
      </div>
    </div>
  );
};

export default ImageModal;
