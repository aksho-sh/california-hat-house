import React, { useLayoutEffect, useRef, useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShoppingCart, ChevronDown, X, ArrowRight, Search } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const LOCAL_IMGS = [
  '/assets/hero_cap_one.png',
  '/assets/hero_cap_two.png',
  '/assets/feature_cap_one.png',
  '/assets/feature_cap_two.png',
  '/assets/storefront_cap_one.png',
];

const ALL_PRODUCTS = [
  // 5-Panel
  { id: 1,  name: '"San Diego" 5-Panel Cap',         category: '5-Panel',  city: 'San Diego', price: 40, salePrice: null,   img: LOCAL_IMGS[0] },
  { id: 2,  name: '"Los Angeles" 5-Panel Cap',        category: '5-Panel',  city: 'LA',        price: 40, salePrice: null,   img: LOCAL_IMGS[1] },
  { id: 3,  name: '"San Francisco" 5-Panel Cap',      category: '5-Panel',  city: 'SF',        price: 35, salePrice: null,   img: LOCAL_IMGS[2] },
  { id: 4,  name: '"Oakland" 5-Panel Cap',            category: '5-Panel',  city: 'Oakland',   price: 40, salePrice: 32,     img: LOCAL_IMGS[3] },
  // Trucker
  { id: 5,  name: 'Snapback Trucker — Charcoal',      category: 'Trucker',  city: 'LA',        price: 35, salePrice: null,   img: LOCAL_IMGS[4] },
  { id: 6,  name: '"LBC" Trucker Cap',               category: 'Trucker',  city: 'LBC',       price: 40, salePrice: null,   img: LOCAL_IMGS[0] },
  { id: 7,  name: '"Fresno" Foam Trucker',            category: 'Trucker',  city: 'Fresno',    price: 35, salePrice: 28,     img: LOCAL_IMGS[1] },
  { id: 8,  name: 'Camouflage Trucker Hat',           category: 'Trucker',  city: 'Oakland',   price: 35, salePrice: null,   img: LOCAL_IMGS[2] },
  // Dad Hat
  { id: 9,  name: 'Distressed Dad Hat — Khaki',       category: 'Dad Hat',  city: 'SF',        price: 40, salePrice: null,   img: LOCAL_IMGS[3] },
  { id: 10, name: 'Cali Vibes Garment-Washed Cap',    category: 'Dad Hat',  city: 'LA',        price: 40, salePrice: 34,     img: LOCAL_IMGS[4] },
  // Bucket
  { id: 11, name: 'Organic Bucket Hat — Natural',     category: 'Bucket',   city: 'Napa',      price: 35, salePrice: null,   img: LOCAL_IMGS[0] },
  { id: 12, name: 'Distressed Denim Bucket Hat',      category: 'Bucket',   city: 'San Diego', price: 35, salePrice: 28,     img: LOCAL_IMGS[1] },
  // Beanie
  { id: 13, name: 'Pom-Pom Beanie — Golden State',    category: 'Beanie',   city: 'SF',        price: 30, salePrice: null,   img: LOCAL_IMGS[2] },
  { id: 14, name: 'Cuffed Beanie — Ocean Midnight',   category: 'Beanie',   city: 'Oakland',   price: 30, salePrice: null,   img: LOCAL_IMGS[3] },
  // Corduroy
  { id: 15, name: 'Vintage Corduroy Cap — Olive',     category: 'Corduroy', city: 'Napa',      price: 40, salePrice: null,   img: LOCAL_IMGS[4] },
  // Golf Rope
  { id: 16, name: 'Golf Rope Cap — Lt. Gray / Navy',  category: 'Golf Rope',city: 'LA',        price: 40, salePrice: null,   img: LOCAL_IMGS[0] },
];

const CATEGORIES = ['5-Panel', 'Trucker', 'Dad Hat', 'Bucket', 'Beanie', 'Corduroy', 'Golf Rope'];
const CITIES     = ['LA', 'SF', 'San Diego', 'Oakland', 'Napa', 'LBC', 'Fresno'];
const SORT_OPTIONS = [
  { label: 'Featured',  value: 'featured' },
  { label: 'Price ↑',   value: 'price_asc' },
  { label: 'Price ↓',   value: 'price_desc' },
  { label: 'New',       value: 'new' },
];

// ---------------------------------------------------------------------------
// Navbar
// ---------------------------------------------------------------------------
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav
        className={`pointer-events-auto flex items-center justify-between px-6 py-4 rounded-full transition-all duration-500 ease-magnetic w-full max-w-5xl bg-background/80 backdrop-blur-xl border border-text/10 shadow-lg`}
      >
        {/* Logo */}
        <Link
          to="/"
          className="font-drama font-bold text-xl tracking-wider text-text hover:text-accent transition-colors"
        >
          CALIFORNIA HAT HOUSE
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8 font-sans text-sm font-semibold tracking-wide text-text">
          <Link to="/" className="link-hover hover:text-accent transition-colors">Home</Link>
          <Link to="/about" className="link-hover hover:text-accent transition-colors">About</Link>
          <Link to="/shop" className="link-hover text-accent">Shop</Link>
          <Link to="/contact" className="link-hover hover:text-accent transition-colors">Contact</Link>
        </div>

        {/* Cart */}
        <div className="flex items-center gap-3">
          <button className="btn-magnetic bg-primary text-background rounded-full px-5 py-2.5 font-sans text-sm font-bold tracking-wide">
            <div className="btn-magnetic-layer bg-accent"></div>
            <span className="btn-text flex items-center gap-2">
              <ShoppingCart size={16} />
              <span className="hidden sm:inline">Cart</span>
            </span>
          </button>
        </div>
      </nav>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Hero Strip
// ---------------------------------------------------------------------------
const ShopHero = () => {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        '.shop-hero-anim',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.08, ease: 'power3.out', delay: 0.15 }
      );
      gsap.fromTo(
        '.shop-hero-line',
        { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
        { clipPath: 'inset(0 0% 0 0)', opacity: 1, duration: 1.2, ease: 'power3.inOut', delay: 0.5 }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative pt-40 pb-20 px-6 md:px-12 bg-text text-background overflow-hidden"
    >
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'url("/assets/storefront_cap_one.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          mixBlendMode: 'luminosity',
        }}
      />

      {/* Decorative horizontal rule that wipes in */}
      <div className="shop-hero-line absolute top-0 left-0 right-0 h-px bg-accent/40" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <p className="shop-hero-anim font-data text-accent text-xs uppercase tracking-widest mb-6">
          Wear California Wherever You Go
        </p>
        <h1 className="shop-hero-anim font-sans font-black uppercase leading-[0.85] mb-4">
          <span className="block text-6xl md:text-8xl lg:text-[9rem] tracking-tight">SHOP</span>
          <span className="font-drama italic font-bold text-5xl md:text-7xl lg:text-8xl text-accent mt-1 block">
            All.
          </span>
        </h1>
        <p className="shop-hero-anim font-drama italic text-background/60 text-xl md:text-2xl mt-6 max-w-lg">
          Every Head. Every City. Every Vibe.
        </p>
      </div>
    </section>
  );
};

// ---------------------------------------------------------------------------
// Filter / Sort Bar
// ---------------------------------------------------------------------------
const FilterBar = ({ activeCategories, activeCities, sortBy, onToggleCategory, onToggleCity, onSetSort, productCount }) => {
  const [sortOpen, setSortOpen] = useState(false);
  const currentSortLabel = SORT_OPTIONS.find(o => o.value === sortBy)?.label ?? 'Featured';

  const clearAll = () => {
    activeCategories.forEach(c => onToggleCategory(c));
    activeCities.forEach(c => onToggleCity(c));
  };
  const hasFilters = activeCategories.length > 0 || activeCities.length > 0;

  return (
    <div className="sticky top-[88px] z-40 bg-background/95 backdrop-blur-md border-b border-text/10 px-6 md:px-12 py-5">
      <div className="max-w-7xl mx-auto flex flex-col gap-4">
        {/* Row 1: category chips + sort */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Category label */}
          <span className="font-data text-xs text-text/40 uppercase tracking-widest mr-1 hidden sm:inline">
            Style
          </span>

          {CATEGORIES.map(cat => {
            const active = activeCategories.includes(cat);
            return (
              <button
                key={cat}
                onClick={() => onToggleCategory(cat)}
                className={`font-sans text-xs font-bold uppercase tracking-wide px-4 py-2 rounded-full border transition-all duration-200 ease-magnetic ${
                  active
                    ? 'bg-primary text-background border-primary'
                    : 'bg-transparent text-text border-text/20 hover:border-primary/60 hover:text-primary'
                }`}
              >
                {cat}
                {active && <X size={11} className="inline ml-1.5 -mt-0.5" />}
              </button>
            );
          })}

          {/* Spacer */}
          <div className="flex-1" />

          {/* Sort dropdown */}
          <div className="relative">
            <button
              onClick={() => setSortOpen(p => !p)}
              className="flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-wide px-4 py-2 rounded-full border border-text/20 hover:border-primary/60 transition-all duration-200 ease-magnetic text-text"
            >
              {currentSortLabel}
              <ChevronDown size={13} className={`transition-transform duration-200 ${sortOpen ? 'rotate-180' : ''}`} />
            </button>
            {sortOpen && (
              <div className="absolute right-0 top-full mt-2 bg-background border border-text/10 rounded-[1.25rem] shadow-xl overflow-hidden z-50 min-w-[140px]">
                {SORT_OPTIONS.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => { onSetSort(opt.value); setSortOpen(false); }}
                    className={`w-full text-left px-5 py-3 font-sans text-xs font-bold uppercase tracking-wide transition-colors duration-150 ${
                      sortBy === opt.value
                        ? 'bg-primary text-background'
                        : 'text-text hover:bg-primary/10'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Row 2: city chips + count + clear */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-data text-xs text-text/40 uppercase tracking-widest mr-1 hidden sm:inline">
            City
          </span>

          {CITIES.map(city => {
            const active = activeCities.includes(city);
            return (
              <button
                key={city}
                onClick={() => onToggleCity(city)}
                className={`font-sans text-xs font-bold uppercase tracking-wide px-4 py-2 rounded-full border transition-all duration-200 ease-magnetic ${
                  active
                    ? 'bg-accent text-background border-accent'
                    : 'bg-transparent text-text border-text/20 hover:border-accent/60 hover:text-accent'
                }`}
              >
                {city}
                {active && <X size={11} className="inline ml-1.5 -mt-0.5" />}
              </button>
            );
          })}

          {/* Spacer */}
          <div className="flex-1" />

          {/* Count + clear */}
          <div className="flex items-center gap-3">
            <span className="font-data text-xs text-text/50 uppercase tracking-widest">
              {productCount} {productCount === 1 ? 'product' : 'products'}
            </span>
            {hasFilters && (
              <button
                onClick={clearAll}
                className="font-sans text-xs font-bold uppercase tracking-wide text-accent hover:text-primary transition-colors link-hover flex items-center gap-1"
              >
                <X size={11} /> Clear
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Product Card
// ---------------------------------------------------------------------------
const ProductCard = ({ product, index }) => {
  return (
    <div
      className="product-card group cursor-pointer"
      style={{ opacity: 0 }} // GSAP will animate this in
    >
      {/* Image container */}
      <div className="relative h-[280px] md:h-[360px] rounded-3xl overflow-hidden bg-[#e0dccc] mb-5">
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Sale badge */}
        {product.salePrice && (
          <div className="absolute top-4 left-4 bg-accent text-background font-sans font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
            Sale
          </div>
        )}

        {/* City tag */}
        <div className="absolute top-4 right-4 bg-primary/80 backdrop-blur-sm text-background font-data text-[10px] px-2.5 py-1 rounded-full uppercase tracking-widest">
          {product.city}
        </div>

        {/* Quick add overlay */}
        <div className="absolute bottom-4 left-4 right-4 translate-y-14 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out">
          <button className="w-full bg-background text-text py-3 rounded-2xl font-sans font-bold text-sm shadow-xl hover:bg-accent hover:text-background transition-colors duration-200 flex justify-center items-center gap-2">
            Quick Add <ShoppingCart size={15} />
          </button>
        </div>
      </div>

      {/* Info */}
      <div>
        <p className="font-data text-[10px] text-text/40 uppercase tracking-widest mb-1">{product.category}</p>
        <h3 className="font-sans font-bold text-base text-primary mb-2 leading-snug">{product.name}</h3>
        <div className="flex items-center gap-3 font-data text-sm">
          {product.salePrice ? (
            <>
              <span className="text-accent">${product.salePrice.toFixed(2)}</span>
              <span className="text-text/40 line-through">${product.price.toFixed(2)}</span>
            </>
          ) : (
            <span className="text-primary">${product.price.toFixed(2)}</span>
          )}
        </div>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Product Grid
// ---------------------------------------------------------------------------
const ProductGrid = ({ products }) => {
  const gridRef = useRef(null);

  // Re-animate whenever the product list changes
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        '.product-card',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
            once: false,
          },
        }
      );
    }, gridRef);
    return () => ctx.revert();
  }, [products]);

  if (products.length === 0) {
    return (
      <div className="py-32 flex flex-col items-center gap-4 text-center">
        <Search size={40} className="text-text/20" />
        <p className="font-sans font-bold text-xl text-primary">No products match your filters.</p>
        <p className="font-drama italic text-text/50 text-lg">Try a different combination of styles or cities.</p>
      </div>
    );
  }

  return (
    <div
      ref={gridRef}
      className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-7"
    >
      {products.map((prod, i) => (
        <ProductCard key={prod.id} product={prod} index={i} />
      ))}
    </div>
  );
};

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------
const Footer = () => (
  <footer className="bg-primary text-background pt-24 pb-12 px-6 md:px-12 relative overflow-hidden">
    <div className="max-w-7xl mx-auto relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
        {/* Brand */}
        <div className="md:col-span-2">
          <h2 className="font-sans font-black uppercase text-4xl mb-4 leading-tight">
            California <br />Hat House
          </h2>
          <p className="font-sans text-background/60 max-w-sm">
            Premium California themed hats and embroidered baseball caps celebrating the Golden State.
          </p>
        </div>

        {/* Collections */}
        <div>
          <h4 className="font-sans font-bold uppercase text-accent mb-6">Collections</h4>
          <ul className="space-y-3 font-sans text-sm text-background/80">
            <li><Link to="/shop" className="hover:text-white transition-colors">Los Angeles</Link></li>
            <li><Link to="/shop" className="hover:text-white transition-colors">San Francisco</Link></li>
            <li><Link to="/shop" className="hover:text-white transition-colors">San Diego</Link></li>
            <li><Link to="/shop" className="hover:text-white transition-colors">Oakland</Link></li>
          </ul>
        </div>

        {/* Connect */}
        <div>
          <h4 className="font-sans font-bold uppercase text-accent mb-6">Connect</h4>
          <ul className="space-y-3 font-sans text-sm text-background/80">
            <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
            <li><a href="#" className="hover:text-white transition-colors">TikTok</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex flex-col md:flex-row justify-between items-center border-t border-background/10 pt-8 gap-4">
        <p className="font-data text-xs text-background/40">
          &copy; {new Date().getFullYear()} California Hat House. All rights reserved.
        </p>
        <div className="flex items-center gap-2 bg-text/20 px-4 py-2 rounded-full border border-background/5">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="font-data text-xs text-background/80 uppercase tracking-widest">System Operational</span>
        </div>
      </div>
    </div>
  </footer>
);

// ---------------------------------------------------------------------------
// Main Shop Component
// ---------------------------------------------------------------------------
const Shop = () => {
  const [activeCategories, setActiveCategories] = useState([]);
  const [activeCities, setActiveCities]         = useState([]);
  const [sortBy, setSortBy]                     = useState('featured');

  const toggleCategory = (cat) =>
    setActiveCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );

  const toggleCity = (city) =>
    setActiveCities(prev =>
      prev.includes(city) ? prev.filter(c => c !== city) : [...prev, city]
    );

  // Filtered + sorted products
  const visibleProducts = useMemo(() => {
    let list = [...ALL_PRODUCTS];

    // Category filter (OR across selected categories)
    if (activeCategories.length > 0) {
      list = list.filter(p => activeCategories.includes(p.category));
    }

    // City filter (OR across selected cities — but applied on top of category)
    if (activeCities.length > 0) {
      list = list.filter(p => activeCities.includes(p.city));
    }

    // Sort
    switch (sortBy) {
      case 'price_asc':
        list.sort((a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price));
        break;
      case 'price_desc':
        list.sort((a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price));
        break;
      case 'new':
        list.sort((a, b) => b.id - a.id);
        break;
      default:
        // featured — keep original order
        break;
    }

    return list;
  }, [activeCategories, activeCities, sortBy]);

  return (
    <div className="bg-background min-h-screen text-text">
      <Navbar />
      <ShopHero />

      <FilterBar
        activeCategories={activeCategories}
        activeCities={activeCities}
        sortBy={sortBy}
        onToggleCategory={toggleCategory}
        onToggleCity={toggleCity}
        onSetSort={setSortBy}
        productCount={visibleProducts.length}
      />

      {/* Grid section */}
      <section className="py-16 px-6 md:px-12 bg-background min-h-[60vh]">
        <div className="max-w-7xl mx-auto">
          <ProductGrid products={visibleProducts} />
        </div>
      </section>

      {/* Promo strip */}
      <section className="py-20 px-6 md:px-12 bg-text text-background">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-data text-accent text-xs uppercase tracking-widest mb-4">Free Shipping Offer</p>
          <h2 className="font-sans font-black uppercase text-4xl md:text-5xl mb-4">
            Grab 2 or More Hats &amp;
          </h2>
          <p className="font-drama italic text-3xl md:text-4xl text-accent mb-10">
            Get Free Shipping.
          </p>
          <Link
            to="/shop"
            className="btn-magnetic inline-flex bg-accent text-background rounded-full px-10 py-4 font-sans font-bold text-base"
          >
            <div className="btn-magnetic-layer bg-primary" />
            <span className="btn-text flex items-center gap-2">
              Keep Shopping <ArrowRight size={18} />
            </span>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Shop;
