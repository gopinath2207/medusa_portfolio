import { Link } from 'react-router-dom';
import { ArrowRight, Palette, Award, Clock } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { artworkAPI } from '../services/api';
import ArtCard from '../components/gallery/ArtCard';
import { useModal } from '../hooks/useModal';
import ImageModal from '../components/gallery/ImageModal';
import Spinner from '../components/ui/Spinner';
import { HERO_IMAGE_PLACEHOLDER, ARTIST_PORTRAIT_PLACEHOLDER } from '../utils/placeholders';

const stats = [
  { icon: Palette, value: '200+', label: 'Artworks Created' },
  { icon: Award, value: '50+', label: 'Happy Clients' },
  { icon: Clock, value: '5+', label: 'Years of Craft' },
];

const Home = () => {
  const modal = useModal();

  const { data: featuredData, isLoading } = useQuery({
    queryKey: ['artworks', 'featured'],
    queryFn: () => artworkAPI.getAll({ featured: true }),
    select: (res) => res.data.data.slice(0, 6),
  });

  const featuredArtworks = featuredData || [];

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-tertiary" />
        <div className="absolute inset-0 bg-gradient-radial from-accent/5 via-transparent to-transparent" style={{ backgroundSize: '60% 60%', backgroundPosition: '80% 40%' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-28 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — Text */}
          <div className="animate-fade-up">
            <p className="text-accent text-xs font-semibold tracking-[0.3em] uppercase mb-6">
              Graphite · Monochromatic · Fine Art
            </p>
            <h1 className="font-heading text-4xl sm:text-5xl xl:text-6xl font-bold text-text-primary leading-tight mb-6">
              Captivating Artistry
              <br />
              <span className="italic text-accent">by Medusa</span>
              <br />
              <span className="text-text-secondary text-3xl sm:text-4xl xl:text-5xl font-normal">
                Gopika Sureshkumar
              </span>
            </h1>

            <div className="accent-divider" />

            <p className="text-text-secondary text-lg leading-relaxed max-w-lg mb-10">
              Where graphite meets emotion. Specialising in hyperrealistic monochromatic portraits and automotive art that captures every intricate detail — from the soul in a subject's eyes to the gleam on a chrome surface.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/commissions"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent text-bg-primary font-semibold rounded hover:bg-accent-hover transition-all duration-200 shadow-lg shadow-accent/20 hover:shadow-accent/30 hover:shadow-xl active:scale-95 group"
              >
                Commission a Masterpiece
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/gallery"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-border text-text-secondary rounded hover:border-accent/50 hover:text-text-primary transition-all duration-200 active:scale-95"
              >
                View Gallery
              </Link>
            </div>
          </div>

          {/* Right — Artwork */}
          <div className="relative animate-fade-in hidden lg:block">
            <div className="absolute -inset-4 bg-accent/5 rounded-2xl blur-2xl" />
            <div className="relative rounded-xl overflow-hidden border border-border shadow-2xl shadow-black/60 animate-glow-pulse">
              <img
                src={HERO_IMAGE_PLACEHOLDER}
                alt="Featured artwork by Medusa - Gopika Sureshkumar"
                className="w-full h-[560px] object-cover"
                loading="eager"
              />
              <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-bg-primary/90 to-transparent">
                <p className="text-text-muted text-xs uppercase tracking-widest">Featured Work</p>
                <p className="font-heading text-text-primary text-lg font-semibold">Graphite Portrait Study</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <div className="w-px h-10 bg-gradient-to-b from-transparent to-accent/50" />
          <span className="text-text-muted text-xs tracking-widest uppercase">Scroll</span>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="py-14 border-y border-border bg-bg-secondary">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-3 gap-8 divide-x divide-border">
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex flex-col items-center text-center gap-2 px-4">
                <Icon size={22} className="text-accent" />
                <p className="font-heading text-3xl md:text-4xl font-bold text-text-primary">{value}</p>
                <p className="text-text-muted text-xs md:text-sm tracking-wide">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED WORKS ─── */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-accent text-xs font-semibold tracking-[0.25em] uppercase mb-2">Portfolio</p>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary">Featured Works</h2>
            </div>
            <Link
              to="/gallery"
              className="hidden sm:flex items-center gap-2 text-text-secondary text-sm hover:text-accent transition-colors group"
            >
              View All
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-20">
              <Spinner size="lg" />
            </div>
          ) : featuredArtworks.length > 0 ? (
            <div className="masonry-grid animate-fade-in">
              {featuredArtworks.map((art) => (
                <ArtCard key={art._id} artwork={art} onClick={modal.open} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-text-muted">
              <p>Artworks coming soon. Check back shortly!</p>
            </div>
          )}

          <div className="mt-10 text-center sm:hidden">
            <Link to="/gallery" className="inline-flex items-center gap-2 text-accent text-sm font-medium">
              View Full Gallery <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── ABOUT TEASER ─── */}
      <section className="section-padding bg-bg-secondary">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -inset-2 bg-accent/5 rounded-2xl blur-xl" />
            <img
              src={ARTIST_PORTRAIT_PLACEHOLDER}
              alt="Gopika Sureshkumar — Medusa"
              className="relative rounded-xl w-full max-w-md mx-auto border border-border shadow-xl shadow-black/50 object-cover h-96"
            />
          </div>
          <div className="animate-fade-up">
            <p className="text-accent text-xs font-semibold tracking-[0.3em] uppercase mb-4">The Artist</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Gopika Sureshkumar
            </h2>
            <div className="accent-divider" />
            <p className="text-text-secondary leading-relaxed mb-4">
              Known artistically as <em className="text-accent not-italic font-medium">Medusa</em>, Gopika is a self-taught graphite artist from India whose work explores the full tonal range of monochromatic art — from the subtlest pencil whisper to the deepest graphite shadow.
            </p>
            <p className="text-text-secondary leading-relaxed mb-8">
              Specialising in hyperrealistic portraits and automotive art, every piece is a labour of love — rendered with meticulous attention to texture, light, and emotion.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-accent font-semibold text-sm hover:gap-3 transition-all duration-200"
            >
              Read Full Story <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── COMMISSION CTA BANNER ─── */}
      <section className="section-padding border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl border border-accent/30 bg-bg-card p-12 md:p-16 text-center">
            {/* Subtle glow */}
            <div className="absolute inset-0 bg-gradient-radial from-accent/8 via-transparent to-transparent pointer-events-none" />
            <div className="relative">
              <p className="text-accent text-xs font-semibold tracking-[0.3em] uppercase mb-4">Limited Slots Available</p>
              <h2 className="font-heading text-3xl md:text-5xl font-bold text-text-primary mb-5 text-balance">
                Ready to Own a Unique Piece of Art?
              </h2>
              <p className="text-text-secondary text-lg max-w-xl mx-auto mb-10">
                Commission a custom graphite or monochromatic artwork tailored exclusively to your vision. Every commission is a one-of-a-kind creation.
              </p>
              <Link
                to="/commissions"
                className="inline-flex items-center gap-2 px-10 py-4 bg-accent text-bg-primary font-semibold rounded hover:bg-accent-hover transition-all duration-200 shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30 active:scale-95 group text-base"
              >
                Start Your Commission
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Image Modal */}
      <ImageModal
        isOpen={modal.isOpen}
        artwork={modal.data}
        onClose={modal.close}
        artworks={featuredArtworks}
      />
    </>
  );
};

export default Home;
