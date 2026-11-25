import { useState } from 'react';
import { ArrowRight, FlaskConical, Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenPortal: () => void;
  enrolledName?: string | null;
}

const NAV_LINKS = [
  { href: '#results', label: 'Results' },
  { href: '#method', label: 'Method' },
  { href: '#recordings', label: 'Recordings' },
  { href: '#timetable', label: 'Timetable' },
  { href: '#reviews', label: 'Reviews' },
  { href: '#faq', label: 'FAQ' },
];

export function Navbar({ onOpenPortal, enrolledName }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-light-surface-bright/95 backdrop-blur-sm border-b border-light-outline-variant/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#home"
          className="flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-light-primary rounded-md whitespace-nowrap shrink-0"
        >
          <span className="w-9 h-9 rounded-md bg-light-inverse-surface text-energetic-cyan flex items-center justify-center shrink-0">
            <FlaskConical className="w-5 h-5" aria-hidden="true" />
          </span>
          <span className="font-headline text-base font-bold text-light-on-surface tracking-tight whitespace-nowrap shrink-0">
            HIRUSHA BANDARA
          </span>
        </a>

        {/* Zone 2: Single-line Navigation Links */}
        <nav aria-label="Primary Navigation" className="hidden lg:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-light-on-surface-variant hover:text-light-on-surface hover:underline underline-offset-4 transition-colors duration-150 whitespace-nowrap shrink-0"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Single Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenPortal}
            className="hidden sm:inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md bg-light-primary-container text-white text-sm font-semibold hover:bg-light-primary transition-colors duration-150 shadow-sm cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue focus-visible:ring-offset-2"
          >
            <span>{enrolledName ? `Portal · ${enrolledName.split(' ')[0]}` : 'Student Portal'}</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>

          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-md bg-light-surface-bright text-light-on-surface border border-light-outline-variant hover:bg-light-surface-container-low transition-colors duration-150 cursor-pointer"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-light-outline-variant/60 bg-light-surface-bright px-6 py-4">
          <nav aria-label="Mobile Navigation" className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="py-2.5 text-sm font-semibold text-light-on-surface-variant hover:text-light-on-surface"
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onOpenPortal();
              }}
              className="mt-2 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-md bg-light-primary-container text-white text-sm font-semibold cursor-pointer"
            >
              <span>{enrolledName ? `Student Portal (${enrolledName.split(' ')[0]})` : 'Student Portal'}</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
