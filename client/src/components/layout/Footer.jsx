import { Link } from 'react-router-dom';
import { Instagram, Mail, Heart } from 'lucide-react';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-bg-secondary border-t border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <h2 className="font-heading text-2xl font-bold tracking-widest text-text-primary mb-3">
              MEDUSA<span className="text-accent">.</span>
            </h2>
            <p className="text-text-muted text-sm leading-relaxed max-w-xs">
              Graphite & monochromatic fine art by Gopika Sureshkumar. Each stroke a story, each shade a world.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-semibold tracking-widest uppercase text-text-muted mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { to: '/', label: 'Home' },
                { to: '/gallery', label: 'Gallery' },
                { to: '/commissions', label: 'Commissions' },
                { to: '/about', label: 'About' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-text-secondary text-sm hover:text-accent transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-semibold tracking-widest uppercase text-text-muted mb-4">
              Connect
            </h3>
            <div className="flex flex-col gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-text-secondary text-sm hover:text-accent transition-colors duration-200"
              >
                <Instagram size={16} />
                @medusa.art
              </a>
              <a
                href="mailto:gopika@medusa.art"
                className="flex items-center gap-2 text-text-secondary text-sm hover:text-accent transition-colors duration-200"
              >
                <Mail size={16} />
                gopika@medusa.art
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-text-muted text-xs">
            © {year} Gopika Sureshkumar — Medusa Art. All rights reserved.
          </p>
          <p className="text-text-muted text-xs flex items-center gap-1">
            Made with <Heart size={11} className="text-accent fill-accent" /> in India
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
