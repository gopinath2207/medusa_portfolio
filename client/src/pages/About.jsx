import { Link } from 'react-router-dom';
import { Instagram, Mail, ArrowRight } from 'lucide-react';
import { ARTIST_PORTRAIT_PLACEHOLDER } from '../utils/placeholders';

const specialties = [
  { title: 'Hyperrealistic Portraits', desc: 'Capturing the essence and emotion of the human form in graphite, from fine expression lines to the depth in eyes.' },
  { title: 'Automotive Art', desc: 'Rendering the beauty and precision of machines — chrome, curves, and reflections in meticulous monochromatic detail.' },
  { title: 'Custom Commissions', desc: 'Translating your unique vision into a one-of-a-kind artwork, with full creative collaboration throughout the process.' },
];

const About = () => {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-tertiary to-bg-primary pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="animate-fade-up">
            <p className="text-accent text-xs font-semibold tracking-[0.3em] uppercase mb-4">The Artist Behind Medusa</p>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-text-primary mb-5">
              Gopika Sureshkumar
            </h1>
            <div className="accent-divider" />
            <p className="text-text-secondary leading-relaxed mt-6 mb-4">
              Gopika Sureshkumar, known by her artistic alias <span className="text-accent font-semibold not-italic">Medusa</span>, is a self-taught graphite and monochromatic artist based in India. Her journey began not in a formal art school, but in the quiet hours of night with a single pencil and an obsession with light.
            </p>
            <p className="text-text-secondary leading-relaxed mb-4">
              What started as personal exploration evolved into a body of work characterised by its breathtaking realism — every strand of hair, every droplet, every reflective surface meticulously rendered to push graphite to its expressive limits.
            </p>
            <p className="text-text-secondary leading-relaxed mb-10">
              Today, Medusa accepts commissions from clients worldwide, creating heirloom-quality portraits and automotive works that are as emotionally resonant as they are technically precise.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/commissions" className="inline-flex items-center gap-2 px-7 py-3 bg-accent text-bg-primary font-semibold rounded hover:bg-accent-hover transition-all active:scale-95 group">
                Commission Work <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href="mailto:gopika@medusa.art" className="inline-flex items-center gap-2 px-7 py-3 border border-border text-text-secondary rounded hover:border-accent/50 hover:text-text-primary transition-all">
                <Mail size={14} /> Get in Touch
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-accent/5 rounded-3xl blur-2xl" />
            <img
              src={ARTIST_PORTRAIT_PLACEHOLDER}
              alt="Gopika Sureshkumar — Medusa, graphite artist"
              className="relative rounded-2xl border border-border shadow-2xl shadow-black/60 w-full max-w-md mx-auto object-cover h-[500px]"
            />
          </div>
        </div>
      </section>

      {/* Specialties */}
      <section className="section-padding bg-bg-secondary">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-accent text-xs font-semibold tracking-[0.3em] uppercase mb-3">Expertise</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary">Areas of Speciality</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {specialties.map((s, i) => (
              <div key={s.title} className="p-7 bg-bg-card rounded-xl border border-border hover:border-accent/40 transition-all duration-300">
                <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center mb-4 border border-accent/20">
                  <span className="text-accent text-sm font-bold font-heading">0{i + 1}</span>
                </div>
                <h3 className="font-heading font-semibold text-text-primary text-lg mb-2">{s.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social */}
      <section className="section-padding">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-2xl font-bold text-text-primary mb-4">Follow the Journey</h2>
          <p className="text-text-secondary text-sm mb-8">
            See works-in-progress, behind-the-scenes videos, and finished pieces on Instagram.
          </p>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 border border-border text-text-secondary rounded-xl hover:border-accent hover:text-accent transition-all duration-200"
          >
            <Instagram size={20} />
            Follow @medusa.art on Instagram
          </a>
        </div>
      </section>
    </>
  );
};

export default About;
