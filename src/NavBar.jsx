import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Search, User, ChevronDown, ArrowRight, ArrowLeft } from 'lucide-react';

export const COLLECTION_LINKS = [
  { name: 'Los Angeles', slug: 'los-angeles', tagline: 'Made in the sun.' },
  { name: 'San Francisco', slug: 'san-francisco', tagline: 'Salt and ambition.' },
  { name: 'San Diego', slug: 'san-diego', tagline: 'Forever 72°.' },
  { name: 'Oakland', slug: 'oakland', tagline: 'The Town raised you.' },
  { name: 'NorCal', slug: 'norcal', tagline: 'North side of legendary.' },
  { name: 'SoCal', slug: 'socal', tagline: 'The other side of perfect.' },
];

/**
 * Shared NavBar.
 * variant:
 *   - 'morph'  (default for landing): transparent at top → solid pill on scroll
 *   - 'solid'  (subpages): always solid pill
 * showBackHome: shows a "Back to Home" button on the right (subpage style)
 */
const NavBar = ({ variant = 'morph', showBackHome = false }) => {
  const [isScrolled, setIsScrolled] = useState(variant === 'solid');
  const [isCollectionsOpen, setIsCollectionsOpen] = useState(false);
  const closeTimer = useRef(null);

  useEffect(() => {
    if (variant === 'solid') return;
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [variant]);

  const openCollections = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setIsCollectionsOpen(true);
  };
  const scheduleCloseCollections = () => {
    closeTimer.current = setTimeout(() => setIsCollectionsOpen(false), 120);
  };

  const isLight = !isScrolled && variant === 'morph';
  const textColor = isLight ? 'text-background' : 'text-text';

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav
        className={`pointer-events-auto flex items-center justify-between px-6 py-4 rounded-full transition-all duration-500 ease-magnetic ${
          isLight
            ? 'bg-transparent w-full max-w-7xl'
            : 'bg-background/80 backdrop-blur-xl border border-text/10 shadow-lg w-full max-w-5xl'
        }`}
      >
        <Link to="/" className={`font-drama font-bold text-xl tracking-wider transition-colors ${textColor}`}>
          CALIFORNIA HAT HOUSE
        </Link>

        <div className={`hidden md:flex items-center gap-8 font-sans text-sm font-semibold tracking-wide transition-colors ${textColor}`}>
          <div
            className="relative"
            onMouseEnter={openCollections}
            onMouseLeave={scheduleCloseCollections}
          >
            <Link to="/collections" className="link-hover flex items-center gap-1">
              Collections
              <ChevronDown size={14} className={`transition-transform duration-300 ${isCollectionsOpen ? 'rotate-180' : ''}`} />
            </Link>
            <div
              className={`absolute left-1/2 -translate-x-1/2 top-full pt-4 w-[480px] transition-all duration-300 ${
                isCollectionsOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
              }`}
            >
              <div className="bg-background/95 backdrop-blur-xl border border-text/10 shadow-2xl rounded-[2rem] p-6 grid grid-cols-2 gap-2">
                {COLLECTION_LINKS.map((c) => (
                  <Link
                    key={c.slug}
                    to={`/collections/${c.slug}`}
                    className="group rounded-2xl px-4 py-3 hover:bg-text/5 transition-colors"
                  >
                    <div className="font-sans font-bold uppercase text-sm text-text group-hover:text-accent transition-colors tracking-tight">
                      {c.name}
                    </div>
                    <div className="font-drama italic text-xs text-text/50 mt-0.5">{c.tagline}</div>
                  </Link>
                ))}
                <Link
                  to="/collections"
                  className="col-span-2 mt-2 px-4 py-3 rounded-2xl bg-text text-background font-sans font-bold text-sm uppercase tracking-wide flex items-center justify-between hover:bg-accent transition-colors"
                >
                  View all collections <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
          <Link to="/shop" className="link-hover">Shop All</Link>
          <Link to="/about" className="link-hover">About Us</Link>
          <Link to="/contact" className="link-hover">Contact</Link>
        </div>

        <div className="flex items-center gap-3">
          {showBackHome ? (
            <Link to="/" className={`hidden md:flex items-center gap-2 font-sans text-sm font-semibold transition-colors link-hover ${textColor} hover:text-accent`}>
              <ArrowLeft size={16} /> Home
            </Link>
          ) : (
            <div className={`flex items-center rounded-full border transition-colors ${isLight ? 'border-background/20 bg-background/10' : 'border-text/10 bg-white/50'}`}>
              <button className={`p-2.5 rounded-full transition-colors link-hover ${textColor} hover:text-accent`}>
                <Search size={17} />
              </button>
              <div className={`w-px h-4 ${isLight ? 'bg-background/20' : 'bg-text/10'}`}></div>
              <button className={`p-2.5 rounded-full transition-colors link-hover ${textColor} hover:text-accent`}>
                <User size={17} />
              </button>
            </div>
          )}
          <button className={`btn-magnetic rounded-full px-5 py-2.5 font-sans text-sm font-bold tracking-wide transition-colors ${
            isLight ? 'bg-background text-text' : 'bg-primary text-background'
          }`}>
            <div className={`btn-magnetic-layer ${isLight ? 'bg-accent/20' : 'bg-accent'}`}></div>
            <span className="btn-text flex items-center gap-2">
              <ShoppingCart size={16} />
            </span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
