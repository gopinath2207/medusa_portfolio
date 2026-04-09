import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/commissions', label: 'Commissions' },
  { to: '/about', label: 'About' },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on route change
  const handleNavClick = () => setMenuOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-bg-primary/90 backdrop-blur-md border-b border-border shadow-lg shadow-black/30'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="font-heading text-2xl font-bold tracking-widest text-text-primary hover:text-accent transition-colors duration-200"
          onClick={handleNavClick}
        >
          MEDUSA
          <span className="text-accent">.</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `text-sm font-medium tracking-wide transition-all duration-200 relative group ${
                  isActive
                    ? 'text-accent'
                    : 'text-text-secondary hover:text-text-primary'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {label}
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-accent transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
          <button
            onClick={() => navigate('/commissions')}
            className="ml-4 px-5 py-2 text-sm font-semibold bg-accent text-bg-primary rounded hover:bg-accent-hover transition-all duration-200 hover:shadow-lg hover:shadow-accent/20 active:scale-95"
          >
            Commission a Masterpiece
          </button>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden text-text-primary hover:text-accent transition-colors"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden animate-slide-down bg-bg-secondary border-b border-border">
          <div className="flex flex-col px-6 py-6 gap-5">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                onClick={handleNavClick}
                className={({ isActive }) =>
                  `text-base font-medium tracking-wide transition-colors duration-200 ${
                    isActive ? 'text-accent' : 'text-text-secondary'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
            <button
              onClick={() => { navigate('/commissions'); handleNavClick(); }}
              className="mt-2 w-full py-3 text-sm font-semibold bg-accent text-bg-primary rounded hover:bg-accent-hover transition-colors"
            >
              Commission a Masterpiece
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
