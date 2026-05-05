import { useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft, ArrowRight, ShoppingCart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const COLLECTIONS = [
  {
    slug: 'los-angeles',
    name: 'Los Angeles',
    tagline: 'Made in the sun. Built to be seen.',
    blurb: 'Sunset Strip swagger, Venice Beach saltwater, the 405 humming under the freeway lights — every LA piece carries a little piece of the city that never quite cools off.',
    img: '/assets/hero_cap_one.png',
    count: 14,
    region: 'SoCal',
  },
  {
    slug: 'san-francisco',
    name: 'San Francisco',
    tagline: 'The city doesn\'t sleep. Neither does your hustle.',
    blurb: 'Fog-soaked mornings on Ocean Beach, Mission burrito Fridays, salt and ambition all at once. SF caps are stitched for people who walk fast and mean it.',
    img: '/assets/hero_cap_two.png',
    count: 12,
    region: 'NorCal',
  },
  {
    slug: 'san-diego',
    name: 'San Diego',
    tagline: 'Born coastal. Forever 72°.',
    blurb: 'A permanent slow exhale. SD pieces are washed, broken-in, and built for tide-and-taco-truck weekends. Nothing here is in a rush.',
    img: '/assets/feature_cap_two.png',
    count: 9,
    region: 'SoCal',
  },
  {
    slug: 'oakland',
    name: 'Oakland',
    tagline: 'The Town raised you. Wear it proud.',
    blurb: 'Lake Merritt at dusk, Oracle echoes, a city that doesn\'t cosplay anything. Oakland caps are the loudest quiet thing in the room.',
    img: '/assets/storefront_cap_one.png',
    count: 10,
    region: 'NorCal',
  },
  {
    slug: 'norcal',
    name: 'NorCal',
    tagline: 'The north side of legendary.',
    blurb: 'Redwoods, Highway 1, fog rolling over the bridge. The whole northern half of the state, distilled into one mood and stitched into a brim.',
    img: '/assets/feature_cap_one.png',
    count: 16,
    region: 'NorCal',
  },
  {
    slug: 'socal',
    name: 'SoCal',
    tagline: 'The other side of perfect.',
    blurb: 'Palm shadows, valley heat, beach-town garages cranking out culture. SoCal caps wear their golden hour like a medal.',
    img: '/assets/feature_cap_two.png',
    count: 18,
    region: 'SoCal',
  },
];

const Collections = () => {
  const heroRef = useRef(null);
  const listRef = useRef(null);
  const previewRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [filter, setFilter] = useState('All');

  const filtered = filter === 'All' ? COLLECTIONS : COLLECTIONS.filter(c => c.region === filter);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.collections-hero-anim',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.08, ease: 'power3.out', delay: 0.15 }
      );

      gsap.fromTo(
        '.collection-row',
        { y: 24, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: listRef.current, start: 'top 80%' },
        }
      );
    });
    return () => ctx.revert();
  }, [filter]);

  return (
    <div className="bg-background min-h-screen text-text">
      {/* Sticky pill nav */}
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <div className="pointer-events-auto w-full max-w-5xl flex justify-between items-center px-6 py-4 rounded-full bg-background/80 backdrop-blur-xl border border-text/10 shadow-lg">
          <Link to="/" className="font-drama font-bold text-xl tracking-wider text-text">
            CALIFORNIA HAT HOUSE
          </Link>
          <div className="hidden md:flex items-center gap-8 font-sans text-sm font-semibold tracking-wide text-text">
            <Link to="/shop" className="link-hover hover:text-accent transition-colors">Shop All</Link>
            <Link to="/about" className="link-hover hover:text-accent transition-colors">About</Link>
            <Link to="/contact" className="link-hover hover:text-accent transition-colors">Contact</Link>
          </div>
          <Link to="/" className="flex items-center gap-2 font-sans text-sm font-semibold text-text hover:text-accent transition-colors link-hover">
            <ArrowLeft size={16} /> Home
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section ref={heroRef} className="relative pt-40 pb-20 px-6 md:px-12 bg-text text-background overflow-hidden">
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: 'url("/assets/hero_cap_two.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            mixBlendMode: 'luminosity'
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto">
          <p className="collections-hero-anim font-data text-accent text-sm uppercase tracking-widest mb-6">
            Index · {COLLECTIONS.length} Collections
          </p>
          <h1 className="collections-hero-anim font-sans font-black uppercase text-6xl md:text-8xl lg:text-9xl leading-[0.85] mb-8">
            Every City. <br />
            <span className="font-drama italic text-accent">A whole feeling.</span>
          </h1>
          <p className="collections-hero-anim font-sans text-background/70 text-xl md:text-2xl max-w-2xl leading-relaxed">
            Six collections. Six versions of the same state. Pick the one that already feels like you.
          </p>

          {/* Filter chips */}
          <div className="collections-hero-anim flex flex-wrap gap-3 mt-12">
            {['All', 'NorCal', 'SoCal'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-5 py-2 rounded-full font-data text-xs uppercase tracking-widest border transition-all duration-300 ${
                  filter === f
                    ? 'bg-accent text-background border-accent'
                    : 'border-background/20 text-background/70 hover:border-background hover:text-background'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial list — hover reveals floating preview */}
      <section
        ref={listRef}
        className="relative py-24 px-6 md:px-12 bg-background"
        onMouseLeave={() => setActiveIndex(null)}
      >
        <div className="max-w-7xl mx-auto">
          <div className="hidden md:grid grid-cols-12 gap-6 pb-6 mb-2 border-b border-text/10 font-data text-xs uppercase tracking-widest text-text/40">
            <div className="col-span-1">No.</div>
            <div className="col-span-3">Collection</div>
            <div className="col-span-5">Tagline</div>
            <div className="col-span-2">Region</div>
            <div className="col-span-1 text-right">Pieces</div>
          </div>

          <ul className="relative">
            {filtered.map((c, i) => (
              <li
                key={c.slug}
                className="collection-row group border-b border-text/10"
                onMouseEnter={() => setActiveIndex(i)}
              >
                <Link
                  to={`/collections/${c.slug}`}
                  className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 py-8 md:py-10 items-center transition-colors duration-500"
                >
                  <div className="hidden md:block col-span-1 font-data text-sm text-text/40 group-hover:text-accent transition-colors">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div className="md:col-span-3">
                    <h3 className="font-sans font-black uppercase text-3xl md:text-4xl text-primary group-hover:text-accent transition-colors">
                      {c.name}
                    </h3>
                  </div>
                  <div className="md:col-span-5">
                    <p className="font-drama italic text-xl md:text-2xl text-text/80">{c.tagline}</p>
                    <p className="font-sans text-sm text-text/50 mt-2 max-w-md md:hidden">{c.blurb}</p>
                  </div>
                  <div className="md:col-span-2">
                    <span className="font-data text-xs uppercase tracking-widest text-text/50">{c.region}</span>
                  </div>
                  <div className="md:col-span-1 flex md:justify-end items-center gap-2">
                    <span className="font-data text-sm text-text/60">{c.count}</span>
                    <ArrowRight size={18} className="text-text/40 group-hover:text-accent group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          {/* Floating preview image — desktop only */}
          {activeIndex !== null && filtered[activeIndex] && (
            <div
              ref={previewRef}
              className="hidden md:block pointer-events-none fixed top-1/2 right-12 -translate-y-1/2 w-[320px] h-[420px] rounded-[2rem] overflow-hidden shadow-2xl z-30"
              style={{ animation: 'fadeSlideUp 0.4s ease-out forwards' }}
            >
              <img
                src={filtered[activeIndex].img}
                alt={filtered[activeIndex].name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-text/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-background">
                <p className="font-data text-xs uppercase tracking-widest text-accent mb-2">{filtered[activeIndex].region}</p>
                <h4 className="font-sans font-black uppercase text-2xl">{filtered[activeIndex].name}</h4>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Editorial mosaic — alternating blocks for tactile contrast */}
      <section className="py-24 px-6 md:px-12 bg-text text-background">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div>
              <p className="font-data text-accent text-xs uppercase tracking-widest mb-3">Editor's Picks</p>
              <h2 className="font-sans font-black uppercase text-4xl md:text-6xl">
                The shortlist <span className="font-drama italic text-accent">— for the indecisive.</span>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {COLLECTIONS.slice(0, 3).map((c) => (
              <Link
                key={c.slug}
                to={`/collections/${c.slug}`}
                className="group relative h-[420px] rounded-[2rem] overflow-hidden block"
              >
                <img src={c.img} alt={c.name} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-text via-text/40 to-transparent" />
                <div className="relative z-10 p-8 h-full flex flex-col justify-end">
                  <p className="font-data text-accent text-xs uppercase tracking-widest mb-2">{c.region}</p>
                  <h3 className="font-sans font-black uppercase text-3xl mb-2">{c.name}</h3>
                  <p className="font-drama italic text-background/70">{c.tagline}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 md:px-12 bg-primary text-background text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-sans font-black uppercase text-4xl md:text-5xl mb-4">Or just browse it all.</h2>
          <p className="font-drama italic text-2xl text-background/70 mb-10">Every cap. Every city. One feed.</p>
          <Link
            to="/shop"
            className="btn-magnetic inline-flex bg-accent text-background rounded-full px-10 py-4 font-sans font-bold text-lg"
          >
            <div className="btn-magnetic-layer bg-white/20"></div>
            <span className="btn-text flex items-center gap-2">Shop All <ShoppingCart size={18} /></span>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-text text-background pt-16 pb-8 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 border-t border-background/10 pt-8">
          <p className="font-data text-xs text-background/40">
            &copy; {new Date().getFullYear()} California Hat House. All rights reserved.
          </p>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-background/10">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="font-data text-xs text-background/80 uppercase tracking-widest">System Operational</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Collections;
