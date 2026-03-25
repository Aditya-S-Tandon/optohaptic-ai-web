/**
 * DESIGN: Synaptic Dark — Bioluminescent Noir
 * Navigation: Frosted glass bar, fixed top, minimal with glow accents.
 * Orbitron for brand, Inter for nav links. Cyan glow on active state.
 */
import { useState, useEffect } from 'react';

const NAV_ITEMS = [
  { id: 'hero', label: 'Home' },
  { id: 'problem', label: 'Problem' },
  { id: 'solution', label: 'Solution' },
  { id: 'pipeline', label: 'How It Works' },
  { id: 'results', label: 'Results' },
  { id: 'device', label: 'Device' },
  { id: 'forehead', label: 'Science' },
  { id: 'comparison', label: 'Compare' },
  { id: 'team', label: 'Team' },
  { id: 'roadmap', label: 'Vision' },
];

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = NAV_ITEMS.map(item => {
        const el = document.getElementById(item.id);
        if (!el) return { id: item.id, top: Infinity };
        return { id: item.id, top: el.getBoundingClientRect().top };
      });

      const current = sections.reduce((closest, section) => {
        if (section.top <= 200 && section.top > closest.top) return section;
        return closest;
      }, { id: 'hero', top: -Infinity });

      setActiveSection(current.id);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMobileOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass-panel shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between h-16 lg:h-18">
        {/* Brand */}
        <button
          onClick={() => scrollTo('hero')}
          className="font-display font-bold text-lg tracking-wider text-white hover:text-cyan transition-colors"
          style={{ color: activeSection === 'hero' ? '#00B4D8' : undefined }}
        >
          OPTOHAPTIC<span className="text-cyan" style={{ color: '#00B4D8' }}> AI</span>
        </button>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {NAV_ITEMS.slice(1).map(item => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-300 ${
                activeSection === item.id
                  ? 'text-white bg-white/10'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
              style={activeSection === item.id ? { textShadow: '0 0 10px rgba(0,180,216,0.5)' } : {}}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle navigation"
        >
          <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-opacity duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden glass-panel border-t border-white/10 py-4 px-4">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`block w-full text-left px-4 py-3 text-sm rounded-lg transition-colors ${
                activeSection === item.id
                  ? 'text-white bg-white/10'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
