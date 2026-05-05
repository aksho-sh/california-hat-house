import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShoppingCart, ArrowRight, ChevronLeft, ChevronRight, Search, User, ChevronDown } from 'lucide-react';

const COLLECTION_LINKS = [
  { name: 'Los Angeles', slug: 'los-angeles', tagline: 'Made in the sun.' },
  { name: 'San Francisco', slug: 'san-francisco', tagline: 'Salt and ambition.' },
  { name: 'San Diego', slug: 'san-diego', tagline: 'Forever 72°.' },
  { name: 'Oakland', slug: 'oakland', tagline: 'The Town raised you.' },
  { name: 'NorCal', slug: 'norcal', tagline: 'North side of legendary.' },
  { name: 'SoCal', slug: 'socal', tagline: 'The other side of perfect.' },
];

gsap.registerPlugin(ScrollTrigger);

// -------------------------------------------------------------
// A. NAVBAR — "The Floating Island"
// -------------------------------------------------------------
const Navbar = () => {
  const navRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCollectionsOpen, setIsCollectionsOpen] = useState(false);
  const closeTimer = useRef(null);

  const openCollections = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setIsCollectionsOpen(true);
  };
  const scheduleCloseCollections = () => {
    closeTimer.current = setTimeout(() => setIsCollectionsOpen(false), 120);
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav
        ref={navRef}
        className={`pointer-events-auto flex items-center justify-between px-6 py-4 rounded-full transition-all duration-500 ease-magnetic ${
          isScrolled
            ? 'bg-background/80 backdrop-blur-xl border border-text/10 shadow-lg w-full max-w-5xl'
            : 'bg-transparent w-full max-w-7xl'
        }`}
      >
        <Link to="/" className={`font-drama font-bold text-xl tracking-wider transition-colors ${isScrolled ? 'text-text' : 'text-background'}`}>
          CALIFORNIA HAT HOUSE
        </Link>

        <div className={`hidden md:flex items-center gap-8 font-sans text-sm font-semibold tracking-wide transition-colors ${isScrolled ? 'text-text' : 'text-background'}`}>
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
          {/* Icon toolbar pill */}
          <div className={`flex items-center rounded-full border transition-colors ${isScrolled ? 'border-text/10 bg-white/50' : 'border-background/20 bg-background/10'}`}>
            <button className={`p-2.5 rounded-full transition-colors link-hover ${isScrolled ? 'text-text hover:text-accent' : 'text-background hover:text-accent'}`}>
              <Search size={17} />
            </button>
            <div className={`w-px h-4 ${isScrolled ? 'bg-text/10' : 'bg-background/20'}`}></div>
            <button className={`p-2.5 rounded-full transition-colors link-hover ${isScrolled ? 'text-text hover:text-accent' : 'text-background hover:text-accent'}`}>
              <User size={17} />
            </button>
          </div>
          {/* Cart button */}
          <button className={`btn-magnetic rounded-full px-5 py-2.5 font-sans text-sm font-bold tracking-wide transition-colors ${
            isScrolled ? 'bg-primary text-background' : 'bg-background text-text'
          }`}>
            <div className={`btn-magnetic-layer ${isScrolled ? 'bg-accent' : 'bg-accent/20'}`}></div>
            <span className="btn-text flex items-center gap-2">
              <ShoppingCart size={16} />
            </span>
          </button>
        </div>
      </nav>
    </div>
  );
};

// -------------------------------------------------------------
// B. HERO SECTION — Carousel
// -------------------------------------------------------------
const Hero = () => {
  const container = useRef(null);
  
  const images = [
    "/assets/hero_cap_one.png",
    "/assets/hero_cap_two.png",
    "/assets/feature_cap_one.png"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-anim',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.08, ease: 'power3.out', delay: 0.2 }
      );
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={container} className="relative h-[100dvh] w-full flex items-end pb-24 md:pb-32 px-6 md:px-12 bg-text overflow-hidden">
      {/* Background Image Carousel */}
      <div className="absolute inset-0 z-0">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Hero Cap ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? 'opacity-60 mix-blend-luminosity' : 'opacity-0'
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-text via-text/50 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-4xl w-full">
        <p className="hero-anim font-sans text-background/80 font-bold tracking-widest uppercase mb-4 text-sm md:text-base">
          Premium everyday headwear
        </p>
        <h1 className="hero-anim text-background flex flex-col gap-0 leading-[0.85] mb-8">
          <span className="font-sans font-black uppercase text-5xl md:text-7xl lg:text-8xl tracking-tight">
            CALIFORNIA state of
          </span>
          <span className="font-drama italic font-bold text-6xl md:text-8xl lg:text-[10rem] text-accent mt-2 md:mt-0">
            MIND.
          </span>
        </h1>
        <div className="hero-anim flex flex-col sm:flex-row gap-4">
          <Link to="/shop" className="btn-magnetic bg-accent text-background rounded-full px-8 py-4 font-sans font-bold text-lg">
            <div className="btn-magnetic-layer bg-primary"></div>
            <span className="btn-text">Shop Collection</span>
          </Link>
        </div>
      </div>

      {/* Carousel Dots */}
      <div className="absolute right-12 bottom-24 z-10 flex flex-col gap-3">
        {images.map((_, i) => (
          <button 
            key={i} 
            onClick={() => setCurrentIndex(i)}
            className={`w-2 rounded-full transition-all duration-500 ${i === currentIndex ? 'h-8 bg-accent' : 'h-2 bg-background/30 hover:bg-background/50'}`}
          />
        ))}
      </div>
    </section>
  );
};

// -------------------------------------------------------------
// C. COLLECTIONS — Asymmetric Editorial Grid
// -------------------------------------------------------------
const Collections = () => {
  const container = useRef(null);

  const collections = [
    { name: 'Los Angeles', slug: 'los-angeles', subtitle: 'Made in the sun. Built to be seen.', img: '/assets/hero_cap_one.png' },
    { name: 'San Francisco', slug: 'san-francisco', subtitle: 'The city doesn\'t sleep. Neither does your hustle.', img: '/assets/hero_cap_two.png' },
    { name: 'San Diego', slug: 'san-diego', subtitle: 'Born coastal. Forever 72°.', img: '/assets/feature_cap_two.png' },
    { name: 'Oakland', slug: 'oakland', subtitle: 'The Town raised you. Wear it proud.', img: '/assets/storefront_cap_one.png' },
  ];

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: 'top 75%',
        }
      });

      // 1. Header rises in smoothly
      tl.fromTo(
        '.collections-header > *',
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.08, ease: 'power3.out' }
      );

      // 2. Tagline strip fades up right after
      tl.fromTo(
        '.collections-tagline',
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
        '-=0.5'
      );

      // 3. Hero card — scale up from slightly smaller + reveal
      tl.fromTo(
        '.collection-hero',
        { scale: 0.92, opacity: 0, filter: 'blur(8px)' },
        { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 1, ease: 'power3.out' },
        '-=0.2'
      );

      // 4. Side cards cascade in one-by-one
      tl.fromTo(
        '.collection-side',
        { y: 40, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out' },
        '-=0.6'
      );
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={container} id="collections" className="py-32 px-6 md:px-12 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header with Value Prop Strip */}
        <div className="collections-header flex flex-col md:flex-row justify-between items-start md:items-end mb-6 gap-6">
          <div>
            <h2 className="font-sans font-black uppercase text-5xl md:text-6xl text-primary mb-3">Shop The State</h2>
          </div>
          <Link to="/shop" className="btn-magnetic bg-text text-background rounded-full px-8 py-3 font-sans font-bold shrink-0">
            <div className="btn-magnetic-layer bg-primary"></div>
            <span className="btn-text flex items-center gap-2">View All <ArrowRight size={16} /></span>
          </Link>
        </div>

        {/* Value Prop Tagline Strip */}
        <div className="collections-tagline flex flex-wrap gap-x-8 gap-y-2 mb-16 border-b border-text/10 pb-8">
          <span className="font-data text-sm text-text/50 uppercase tracking-widest">California Pride</span>
          <span className="text-text/20">·</span>
          <span className="font-data text-sm text-text/50 uppercase tracking-widest">Bay Area Culture</span>
          <span className="text-text/20">·</span>
          <span className="font-data text-sm text-text/50 uppercase tracking-widest">Premium Quality</span>
        </div>

        {/* Asymmetric Grid: 1 large left + 3 stacked right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Large Feature Card — LA */}
          <Link to={`/collections/${collections[0].slug}`} className="collection-hero group relative h-[500px] md:h-[820px] rounded-[2rem] overflow-hidden bg-text cursor-pointer shadow-lg transition-transform duration-500 hover:-translate-y-1 block">
            <div className="absolute inset-0 z-0">
              <img src={collections[0].img} alt={collections[0].name} className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-all duration-700 group-hover:scale-105 ease-out" />
              <div className="absolute inset-0 bg-gradient-to-t from-text/90 via-text/30 to-transparent"></div>
            </div>
            <div className="relative z-10 p-8 md:p-12 h-full flex flex-col justify-end">
              <span className="font-data text-accent text-xs uppercase tracking-widest mb-3">Featured Collection</span>
              <h3 className="font-sans font-black uppercase text-4xl md:text-5xl text-background mb-2">{collections[0].name}</h3>
              <p className="font-drama italic text-background/70 text-xl md:text-2xl mb-8 max-w-sm">{collections[0].subtitle}</p>
              <span className="btn-magnetic inline-block bg-accent text-background rounded-full px-6 py-3 font-sans font-bold text-sm w-max">
                <div className="btn-magnetic-layer bg-white/20"></div>
                <span className="btn-text flex items-center gap-2">Explore Collection <ArrowRight size={16}/></span>
              </span>
            </div>
          </Link>

          {/* Right Column — 3 stacked cards */}
          <div className="flex flex-col gap-6">
            {collections.slice(1).map((col, i) => (
              <Link
                key={i}
                to={`/collections/${col.slug}`}
                className="collection-side group relative h-[250px] rounded-[2rem] overflow-hidden bg-text cursor-pointer shadow-lg transition-transform duration-500 hover:-translate-y-1 block"
              >
                <div className="absolute inset-0 z-0">
                  <img src={col.img} alt={col.name} className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-all duration-700 group-hover:scale-105 ease-out" />
                  <div className="absolute inset-0 bg-gradient-to-t from-text/90 via-text/30 to-transparent"></div>
                </div>
                <div className="relative z-10 p-8 h-full flex flex-col justify-end">
                  <h3 className="font-sans font-black uppercase text-2xl md:text-3xl text-background mb-1">{col.name}</h3>
                  <p className="font-drama italic text-accent text-lg mb-4">{col.subtitle}</p>
                  <span className="btn-magnetic inline-block bg-accent/90 text-background rounded-full px-5 py-2.5 font-sans font-bold text-xs w-max">
                    <div className="btn-magnetic-layer bg-white/20"></div>
                    <span className="btn-text flex items-center gap-2">Explore <ArrowRight size={14}/></span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// -------------------------------------------------------------
// D. PRODUCT SLIDER (Daily & Clearance Sales)
// -------------------------------------------------------------
const ProductSlider = ({ title, subtitle, products }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const isPaused = useRef(false);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const goNext = () => setCurrentPage((prev) => (prev + 1) % totalPages);
  const goPrev = () => setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);

  // Auto-advance every 3 seconds, pause on hover
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused.current) goNext();
    }, 3000);
    return () => clearInterval(interval);
  }, [totalPages]);

  const visibleProducts = products.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  return (
    <section
      className="py-24 px-6 md:px-12 bg-background relative border-b border-text/5"
      onMouseEnter={() => (isPaused.current = true)}
      onMouseLeave={() => (isPaused.current = false)}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="font-sans font-black uppercase text-4xl text-primary mb-2">{title}</h2>
            <p className="font-sans text-text/60">{subtitle}</p>
          </div>
          <div className="flex items-center gap-3">
            {/* Page indicators */}
            <div className="hidden md:flex items-center gap-1.5 mr-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === currentPage ? 'w-6 h-2 bg-accent' : 'w-2 h-2 bg-text/20 hover:bg-text/40'
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={goPrev} className="w-12 h-12 rounded-full border border-text/20 flex items-center justify-center hover:bg-text hover:text-background transition-colors">
                <ChevronLeft size={24} />
              </button>
              <button onClick={goNext} className="w-12 h-12 rounded-full border border-text/20 flex items-center justify-center hover:bg-text hover:text-background transition-colors">
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {visibleProducts.map((prod, i) => {
            const handle = prod.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
            return (
            <Link to={`/products/${handle}`} key={`${currentPage}-${i}`} className="group cursor-pointer block animate-[fadeSlideUp_0.4s_ease-out_forwards]" style={{ animationDelay: `${i * 0.08}s`, opacity: 0 }}>
              <div className="relative h-[300px] md:h-[380px] rounded-3xl overflow-hidden bg-[#e0dccc] mb-6">
                <img src={prod.img} alt={prod.name} className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-700 ease-out" />
                {prod.salePrice && (
                  <div className="absolute top-4 left-4 bg-accent text-white font-sans font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                    Sale
                  </div>
                )}
                {/* Quick Add Button Overlay */}
                <div className="absolute bottom-4 left-4 right-4 translate-y-16 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out">
                  <span className="w-full bg-white text-text py-3 rounded-xl font-sans font-bold text-sm shadow-xl hover:bg-accent hover:text-white transition-colors flex justify-center items-center gap-2">
                    Add to Cart <ShoppingCart size={16} />
                  </span>
                </div>
              </div>
              <div>
                <h3 className="font-sans font-bold text-lg text-primary mb-1">{prod.name}</h3>
                <div className="flex items-center gap-3 font-data text-sm">
                  {prod.salePrice ? (
                    <>
                      <span className="text-accent">${prod.salePrice.toFixed(2)}</span>
                      <span className="text-text/40 line-through">${prod.price.toFixed(2)}</span>
                    </>
                  ) : (
                    <span className="text-primary">${prod.price.toFixed(2)}</span>
                  )}
                </div>
              </div>
            </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// -------------------------------------------------------------
// E. PHILOSOPHY — "The Manifesto"
// -------------------------------------------------------------
const Philosophy = () => {
  const container = useRef(null);
  const bgRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.to(bgRef.current, {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: container.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });

      gsap.fromTo(
        '.phil-text',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: container.current,
            start: 'top 60%',
          }
        }
      );
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={container} className="relative py-48 px-6 md:px-12 bg-text text-background overflow-hidden">
      <div 
        ref={bgRef} 
        className="absolute -top-[20%] left-0 w-full h-[140%] opacity-15 pointer-events-none"
        style={{
          backgroundImage: 'url("/assets/feature_cap_one.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          mixBlendMode: 'luminosity'
        }}
      ></div>

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col gap-12">
        <p className="phil-text font-sans text-xl md:text-3xl text-background/60 font-medium max-w-2xl">
          Most headwear focuses on: basic utility and fast fashion.
        </p>
        <h2 className="phil-text font-drama italic font-bold text-5xl md:text-7xl lg:text-8xl leading-tight">
          We focus on: <br />
          <span className="text-accent">Golden State</span> heritage.
        </h2>
      </div>
    </section>
  );
};

// -------------------------------------------------------------
// F. FOOTER
// -------------------------------------------------------------
const Footer = () => {
  return (
    <footer className="bg-primary text-background pt-24 pb-12 px-6 md:px-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="md:col-span-2">
            <h2 className="font-sans font-black uppercase text-4xl mb-4">California <br/>Hat House</h2>
            <p className="font-sans text-background/60 max-w-sm">
              Premium California themed hats and embroidered baseball caps celebrating the Golden State.
            </p>
          </div>
          <div>
            <h4 className="font-sans font-bold uppercase text-accent mb-6">Collections</h4>
            <ul className="space-y-3 font-sans text-sm text-background/80">
              <li><Link to="/collections/los-angeles" className="hover:text-white transition-colors">Los Angeles</Link></li>
              <li><Link to="/collections/san-francisco" className="hover:text-white transition-colors">San Francisco</Link></li>
              <li><Link to="/collections/san-diego" className="hover:text-white transition-colors">San Diego</Link></li>
              <li><Link to="/collections/oakland" className="hover:text-white transition-colors">Oakland</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-sans font-bold uppercase text-accent mb-6">Connect</h4>
            <ul className="space-y-3 font-sans text-sm text-background/80">
              <li><Link to="/shop" className="hover:text-white transition-colors">Shop All</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center border-t border-background/10 pt-8 gap-4">
          <p className="font-data text-xs text-background/40">
            &copy; {new Date().getFullYear()} California Hat House. All rights reserved.
          </p>
          <div className="flex items-center gap-2 bg-text/20 px-4 py-2 rounded-full border border-background/5">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="font-data text-xs text-background/80 uppercase tracking-widest">System Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

// -------------------------------------------------------------
// MAIN APP COMPONENT
// -------------------------------------------------------------
function App() {
  const dailyProducts = [
    { name: '"San Diego" 5 Panel Cap', price: 40, salePrice: 35, img: '/assets/hero_cap_one.png' },
    { name: 'Classic Dad Hat - Sand', price: 35, salePrice: 28, img: '/assets/feature_cap_two.png' },
    { name: 'Vintage Trucker - Navy', price: 45, salePrice: 38, img: '/assets/storefront_cap_one.png' },
    { name: 'LA Edition Strapback', price: 42, salePrice: 34, img: '/assets/hero_cap_two.png' },
    { name: 'Oakland Originals Beanie', price: 30, salePrice: 24, img: '/assets/feature_cap_one.png' },
    { name: 'Bay Bridge Snapback', price: 38, salePrice: 30, img: '/assets/storefront_cap_one.png' },
    { name: '"SF" Embroidered Dad Hat', price: 36, salePrice: 29, img: '/assets/hero_cap_two.png' },
    { name: 'Pacific Coast 5 Panel', price: 44, salePrice: 36, img: '/assets/feature_cap_one.png' },
    { name: 'Cali Bear Corduroy Cap', price: 48, salePrice: 39, img: '/assets/hero_cap_one.png' },
    { name: 'Venice Beach Trucker', price: 40, salePrice: 32, img: '/assets/feature_cap_two.png' },
  ];

  const clearanceProducts = [
    { name: 'Summer Breeze Bucket Hat', price: 38, salePrice: 19, img: '/assets/feature_cap_one.png' },
    { name: 'NorCal Snapback', price: 40, salePrice: 22, img: '/assets/storefront_cap_one.png' },
    { name: 'Retro Surf Corduroy Cap', price: 45, salePrice: 25, img: '/assets/hero_cap_two.png' },
    { name: 'Golden State Foam Trucker', price: 35, salePrice: 18, img: '/assets/hero_cap_one.png' },
    { name: 'Sunset Gradient 5 Panel', price: 42, salePrice: 21, img: '/assets/feature_cap_two.png' },
    { name: 'Mission District Beanie', price: 32, salePrice: 16, img: '/assets/storefront_cap_one.png' },
    { name: 'Malibu Washed Dad Hat', price: 36, salePrice: 18, img: '/assets/feature_cap_one.png' },
    { name: 'Haight-Ashbury Snapback', price: 44, salePrice: 22, img: '/assets/hero_cap_two.png' },
    { name: 'Redwood Forest Trucker', price: 40, salePrice: 20, img: '/assets/hero_cap_one.png' },
    { name: 'Highway 1 Bucket Hat', price: 38, salePrice: 19, img: '/assets/feature_cap_two.png' },
  ];

  return (
    <div className="bg-background min-h-screen text-text">
      <Navbar />
      <Hero />
      <Collections />
      <ProductSlider title="Daily Offers" subtitle="Daily sales offers everyday" products={dailyProducts} />
      <Philosophy />
      <ProductSlider title="Clearance Sales" subtitle="Last chance to grab these styles" products={clearanceProducts} />
      <Footer />
    </div>
  );
}

export default App;
