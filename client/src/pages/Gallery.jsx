import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { artworkAPI } from '../services/api';
import FilterTabs from '../components/gallery/FilterTabs';
import MasonryGrid from '../components/gallery/MasonryGrid';
import ImageModal from '../components/gallery/ImageModal';
import { useModal } from '../hooks/useModal';

const Gallery = () => {
  const [category, setCategory] = useState('all');
  const modal = useModal();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['artworks', category],
    queryFn: () => artworkAPI.getAll(category !== 'all' ? { category } : {}),
    select: (res) => res.data.data,
    staleTime: 3 * 60 * 1000,
  });

  const artworks = data || [];

  return (
    <>
      {/* Page header */}
      <section className="pt-32 pb-12 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="animate-fade-up">
          <p className="text-accent text-xs font-semibold tracking-[0.3em] uppercase mb-3">Portfolio</p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Art Gallery
          </h1>
          <div className="accent-divider" />
          <p className="text-text-secondary max-w-xl mt-4">
            Every piece is rendered by hand using graphite and charcoal — no filters, no shortcuts. Browse the full collection below.
          </p>
        </div>
      </section>

      {/* Filter tabs */}
      <div className="px-6 md:px-12 max-w-7xl mx-auto mb-10">
        <FilterTabs active={category} onChange={setCategory} />
      </div>

      {/* Error state */}
      {isError && (
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 text-center">
          <p className="text-red-400 text-sm">{error?.message || 'Failed to load artworks.'}</p>
        </div>
      )}

      {/* Masonry grid */}
      <section className="px-6 md:px-12 pb-20 max-w-7xl mx-auto">
        <MasonryGrid
          artworks={artworks}
          loading={isLoading}
          onArtworkClick={modal.open}
        />
      </section>

      {/* Modal */}
      <ImageModal
        isOpen={modal.isOpen}
        artwork={modal.data}
        onClose={modal.close}
        artworks={artworks}
      />
    </>
  );
};

export default Gallery;
