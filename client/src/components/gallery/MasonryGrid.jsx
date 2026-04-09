import ArtCard from './ArtCard';

const SkeletonCard = ({ height = 'h-64' }) => (
  <div className={`masonry-item skeleton rounded-lg ${height}`} />
);

const MasonryGrid = ({ artworks, onArtworkClick, loading }) => {
  if (loading) {
    return (
      <div className="masonry-grid">
        {Array.from({ length: 9 }).map((_, i) => (
          <SkeletonCard key={i} height={i % 3 === 0 ? 'h-96' : i % 2 === 0 ? 'h-72' : 'h-56'} />
        ))}
      </div>
    );
  }

  if (!artworks || artworks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-28 gap-4">
        <div className="w-16 h-16 rounded-full border border-border flex items-center justify-center">
          <span className="text-text-muted text-2xl">🎨</span>
        </div>
        <p className="text-text-muted font-medium">No artworks found in this category.</p>
        <p className="text-text-muted text-sm">Check back soon — new work is always in progress.</p>
      </div>
    );
  }

  return (
    <div className="masonry-grid animate-fade-in">
      {artworks.map((artwork) => (
        <ArtCard
          key={artwork._id}
          artwork={artwork}
          onClick={onArtworkClick}
        />
      ))}
    </div>
  );
};

export default MasonryGrid;
