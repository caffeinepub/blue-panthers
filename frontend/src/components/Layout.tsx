import { ReactNode, useState } from 'react';
import { Link, useRouter } from '@tanstack/react-router';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const currentPath = router.state.location.pathname;

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Join the Team', path: '/signup' },
    { label: 'Admin', path: '/admin' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-navy shadow-navy border-b-2 border-gold">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-full bg-gold flex items-center justify-center shadow-gold flex-shrink-0">
                <span className="font-display text-navy text-lg leading-none">BP</span>
              </div>
              <span className="font-display text-2xl text-white tracking-widest group-hover:text-gold transition-colors duration-200">
                BLUE PANTHERS
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 font-body font-600 text-sm tracking-wide transition-all duration-200 rounded-sm ${
                    currentPath === link.path
                      ? 'text-gold border-b-2 border-gold'
                      : 'text-white/80 hover:text-gold hover:border-b-2 hover:border-gold/50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link to="/signup">
                <Button
                  size="sm"
                  className="ml-4 bg-gold text-navy font-body font-bold hover:bg-gold-light transition-all duration-200 shadow-gold rounded-sm uppercase tracking-wider"
                >
                  Sign Up Now
                </Button>
              </Link>
            </nav>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-white hover:text-gold transition-colors p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="md:hidden bg-navy-dark border-t border-gold/30">
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={`px-4 py-3 font-body font-semibold text-sm tracking-wide transition-colors rounded-sm ${
                    currentPath === link.path
                      ? 'text-gold bg-navy-light'
                      : 'text-white/80 hover:text-gold hover:bg-navy-light'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link to="/signup" onClick={() => setMobileOpen(false)}>
                <Button
                  className="w-full mt-2 bg-gold text-navy font-body font-bold hover:bg-gold-light rounded-sm uppercase tracking-wider"
                >
                  Sign Up Now
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-navy border-t-2 border-gold/40">
        <div className="container mx-auto px-4 sm:px-6 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Brand */}
            <div className="flex flex-col items-center md:items-start gap-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center">
                  <span className="font-display text-navy text-base leading-none">BP</span>
                </div>
                <span className="font-display text-xl text-white tracking-widest">BLUE PANTHERS</span>
              </div>
              <p className="text-white/50 text-xs font-body">Basketball Team · Est. 2024</p>
            </div>

            {/* Links */}
            <div className="flex gap-6">
              <Link to="/" className="text-white/60 hover:text-gold text-sm font-body transition-colors">Home</Link>
              <Link to="/signup" className="text-white/60 hover:text-gold text-sm font-body transition-colors">Join Us</Link>
              <Link to="/admin" className="text-white/60 hover:text-gold text-sm font-body transition-colors">Admin</Link>
            </div>

            {/* Attribution */}
            <div className="text-center md:text-right">
              <p className="text-white/40 text-xs font-body">
                © {new Date().getFullYear()} Blue Panthers. All rights reserved.
              </p>
              <p className="text-white/40 text-xs font-body mt-1">
                Built with{' '}
                <span className="text-gold">♥</span>
                {' '}using{' '}
                <a
                  href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== 'undefined' ? window.location.hostname : 'blue-panthers')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold hover:text-gold-light underline underline-offset-2 transition-colors"
                >
                  caffeine.ai
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
