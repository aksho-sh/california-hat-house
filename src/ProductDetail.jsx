import React, { useLayoutEffect, useRef, useState, useEffect, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ShoppingCart,
  Heart,
  Plus,
  Minus,
  ChevronDown,
  ArrowLeft,
  ArrowRight,
  Star,
  Truck,
  Shield,
  Ruler,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────────
// PRODUCT DATA MAP
// ─────────────────────────────────────────────────────────────
const PRODUCTS = {
  'san-diego-5-panel': {
    name: '"San Diego" 5 Panel Cap',
    price: 40,
    city: 'San Diego',
    type: '5-Panel Cap',
    description:
      'Born coastal, Forever 72°. This 5-panel pulls the Pacific blues and sandstone golds of San Diego into a silhouette you can wear everywhere from the boardwalk to the block. Structured yet light, it sits clean without trying too hard — because SD never does. Every stitch carries that laid-back certainty that the sun is always coming back out.',
    tagline: 'Born coastal. Forever 72°.',
    bullets: [
      'Fabric: 100% structured cotton twill front, nylon mesh back',
      'Closure: Snapback with micro-adjustable ratchet',
      'Crown: Mid-profile 5-panel construction',
      'Fit: Universal fit, wears true for most head sizes',
      'Origin: Designed in California, ethically manufactured',
    ],
    images: [
      '/assets/hero_cap_one.png',
      '/assets/feature_cap_one.png',
      '/assets/hero_cap_two.png',
      '/assets/storefront_cap_one.png',
    ],
    colorways: [
      { name: 'Ocean Navy', hex: '#0F3D4C' },
      { name: 'Sand', hex: '#C9B99A' },
      { name: 'Sunset Coral', hex: '#F26B38' },
      { name: 'Asphalt', hex: '#222222' },
    ],
    sizes: ['One Size'],
    storyCity: 'San Diego',
    storyParagraph1:
      'San Diego doesn\'t announce itself. It just is. Wide open, salt-aired, perpetually golden — a city that figured out decades ago that the best version of yourself is the one that doesn\'t hustle harder than necessary. This edition carries that spirit in every thread. From Pacific Beach to Barrio Logan, from the cliffs of La Jolla to the taquerias of National City — this cap is built for the whole city, not just the postcard version.',
    storyParagraph2:
      'We spent a weekend driving every zip code before we locked the colorway. Navy for the bay. Sand for the breaks. The embroidery placement — slightly off-center, deliberately imperfect — that\'s intentional. San Diego\'s charm has always lived in what\'s slightly off-script.',
    storyPullQuote: 'The coastline raised you. The cap just makes it official.',
  },

  'cali-vibes-garment-washed': {
    name: 'Cali Vibes Garment-Washed Cap',
    price: 40,
    city: 'California',
    type: 'Garment-Washed Baseball Cap',
    description:
      'Washed, broken-in, and already lived-in before it hits your head — this is the cap for people who don\'t need new to feel real. The garment-wash process gives every single unit a unique fade, meaning no two caps are exactly alike. It\'s the hat that looks like it\'s been through something, because it has. Embroidered "CHH" arc sits low and clean on the front panel.',
    tagline: 'Worn-in from day one.',
    bullets: [
      'Fabric: 100% garment-washed brushed cotton',
      'Closure: Brass slider adjustable strap',
      'Crown: Unstructured low-profile dad hat silhouette',
      'Fit: Relaxed, one size with easy adjustability',
      'Origin: Designed in California, ethically manufactured',
    ],
    images: [
      '/assets/feature_cap_two.png',
      '/assets/hero_cap_one.png',
      '/assets/storefront_cap_one.png',
      '/assets/hero_cap_two.png',
    ],
    colorways: [
      { name: 'Faded Olive', hex: '#6B7A5C' },
      { name: 'Stone Wash', hex: '#A89880' },
      { name: 'Dusty Navy', hex: '#2C4A5A' },
      { name: 'Vintage Black', hex: '#1A1A1A' },
    ],
    sizes: ['One Size'],
    storyCity: 'California',
    storyParagraph1:
      'California has a texture. Not the glossy version you see in Instagram reels — the real one. Worn edges, salt film on the window, afternoon light that hits like it\'s specifically meant for you. That\'s what garment-washing does to cotton. It removes the newness and leaves only the character. This cap was made to feel like it\'s been your co-pilot through every highway, every rooftop, every late-night drive down the 405.',
    storyParagraph2:
      'The fade is intentional. The softness is earned — just not by you. We do the hard part so you get straight to the good part.',
    storyPullQuote: 'Some things get better the more they go through. This is one of them.',
  },

  'vintage-corduroy-olive': {
    name: 'Vintage Corduroy Cap — Olive',
    price: 30,
    city: 'California',
    type: 'Vintage Corduroy Cap',
    description:
      'Textured, earthy, and unapologetically old-school — the Vintage Corduroy in Olive is the cap for people who know quality by feel. Wide-wale corduroy gives it a tactile richness that flat twills can\'t match. The olive colorway nods to NorCal\'s redwood hills and rolling wine country, grounded and real without trying to be anything else.',
    tagline: 'Old school texture. Golden State soul.',
    bullets: [
      'Fabric: Wide-wale 100% cotton corduroy',
      'Closure: Self-fabric strapback with antique brass hardware',
      'Crown: Unstructured low-crown with pre-curved bill',
      'Fit: Relaxed one size, slightly roomier than structured caps',
      'Origin: Designed in California, ethically manufactured',
    ],
    images: [
      '/assets/storefront_cap_one.png',
      '/assets/feature_cap_two.png',
      '/assets/hero_cap_one.png',
      '/assets/feature_cap_one.png',
    ],
    colorways: [
      { name: 'Olive', hex: '#6B7A5C' },
      { name: 'Burnt Sienna', hex: '#A0522D' },
      { name: 'Vintage Navy', hex: '#1B3A5C' },
      { name: 'Oat', hex: '#D4C5A0' },
    ],
    sizes: ['One Size'],
    storyCity: 'NorCal',
    storyParagraph1:
      'There\'s a version of California that doesn\'t live on the coast. It lives in the foothills, in the rows of vine, in the smell of oak and dried grass at the end of summer. NorCal\'s interior — from Napa to the Sierra foothills — shaped this colorway. Olive isn\'t just a color, it\'s a landscape. This cap carries that terrain.',
    storyParagraph2:
      'Corduroy was the choice because it demands to be touched. It has presence. You notice it. In an era of technical fabrics and synthetic performance, there\'s something genuinely subversive about a cap that just feels like it came from somewhere honest.',
    storyPullQuote: 'The kind of quality you notice with your hands first, your eyes second.',
  },

  'fisherman-beanie': {
    name: 'Fisherman Beanie',
    price: 30,
    city: 'San Francisco',
    type: 'Fisherman Beanie',
    description:
      'Tight-knit, close-fitting, and built for the fog — the Fisherman Beanie is the SF essential. Worn rolled or pulled low, it sits clean against the skull without bulk, so it works under a hood or over a fade with equal authority. The embroidered "CHH" logo is small and deliberate. This is not a statement piece. It\'s a foundation piece.',
    tagline: 'Built for the fog. Worn for the city.',
    salePrice: 24,
    bullets: [
      'Fabric: 100% acrylic tight-knit, pill-resistant',
      'Closure: N/A — pull-on beanie construction',
      'Crown: Fisherman / rolled-cuff short crown',
      'Fit: Close-fit, available in S/M and L/XL',
      'Origin: Designed in California, ethically manufactured',
    ],
    images: [
      '/assets/feature_cap_one.png',
      '/assets/hero_cap_two.png',
      '/assets/storefront_cap_one.png',
      '/assets/feature_cap_two.png',
    ],
    colorways: [
      { name: 'Fog Grey', hex: '#9AA0A6' },
      { name: 'Ocean Navy', hex: '#0F3D4C' },
      { name: 'Asphalt', hex: '#222222' },
      { name: 'Cream', hex: '#F0EAD6' },
    ],
    sizes: ['S/M', 'L/XL'],
    storyCity: 'San Francisco',
    storyParagraph1:
      'San Francisco summers are a lie and everyone who lives there knows it. The fog rolls in by 2pm, the wind off the Bay hits like a reminder, and you need a hat that works without taking up space in your head — literally or figuratively. The Fisherman Beanie is the answer the city already arrived at decades ago. We just made it ours.',
    storyParagraph2:
      'This colorway — Fog Grey — was chosen deliberately. Not because it\'s subtle (though it is). Because it\'s the exact color of the marine layer at 7am over the Sunset District. If you know, you know.',
    storyPullQuote: 'The fog was here before the gold rush. Dress accordingly.',
  },

  'distressed-denim-bucket': {
    name: 'Distressed Denim Bucket Hat',
    price: 35,
    city: 'Los Angeles',
    type: 'Distressed Denim Bucket Hat',
    description:
      'LA doesn\'t do clean — it does lived-in with intention. The Distressed Denim Bucket takes that ethos and runs it through a wash cycle three times until the denim sits exactly right: broken-in on the brim, raw on the crown, perfect everywhere. Wide brim blocks the Westside sun. The CHH woven patch at front is understated — a co-sign, not a billboard.',
    tagline: 'Westside sun blocker. East LA heart.',
    bullets: [
      'Fabric: 12 oz enzyme-washed denim, 100% cotton',
      'Closure: N/A — bucket construction with wide-brim profile',
      'Crown: Medium-structured with wide all-around brim',
      'Fit: One size fits most with flexible brim',
      'Origin: Designed in California, ethically manufactured',
    ],
    images: [
      '/assets/hero_cap_two.png',
      '/assets/feature_cap_one.png',
      '/assets/hero_cap_one.png',
      '/assets/storefront_cap_one.png',
    ],
    colorways: [
      { name: 'Mid Wash', hex: '#5B7FA6' },
      { name: 'Dark Indigo', hex: '#1A2D5A' },
      { name: 'Light Rinse', hex: '#9EB4CC' },
      { name: 'Overdyed Black', hex: '#1C1C2E' },
    ],
    sizes: ['One Size'],
    storyCity: 'Los Angeles',
    storyParagraph1:
      'Los Angeles was built on the audacity of showing up and looking like you belong. From Boyle Heights to Bel Air, the uniform changes but the confidence doesn\'t. The Distressed Denim Bucket carries that same audacity — a shape that was workwear once, streetwear next, and now something harder to name. Something LA.',
    storyParagraph2:
      'The distressing is done by hand before the enzyme wash. Every hat comes out slightly different. Yours might have a more pronounced fade at the brim, or a softer crown. That\'s not a defect — that\'s the point. LA was never supposed to be uniform.',
    storyPullQuote: 'Made in the sun. Built to be seen.',
  },

  'los-angeles-golf-rope': {
    name: '"Los Angeles" Golf Rope Cap',
    price: 40,
    city: 'Los Angeles',
    type: 'Golf Rope Cap',
    description:
      'The golf rope is having its moment — and this one earns it. Structured front, foam snapback, and a braided rope detail across the crown that hits clean without being costume. The "LOS ANGELES" arc embroidery on the front is tight and precise. This cap works at golden hour on the course or at midnight in the parking lot. It doesn\'t care where you wear it. That\'s the LA way.',
    tagline: 'For the fairway and everywhere after.',
    bullets: [
      'Fabric: Poly-cotton blend front panels, nylon mesh back',
      'Closure: Foam snapback for clean all-day hold',
      'Crown: High-profile structured front with rope accent',
      'Fit: Universal fit snapback, one size with adjustable back',
      'Origin: Designed in California, ethically manufactured',
    ],
    images: [
      '/assets/feature_cap_two.png',
      '/assets/hero_cap_one.png',
      '/assets/feature_cap_one.png',
      '/assets/hero_cap_two.png',
    ],
    colorways: [
      { name: 'White / Navy', hex: '#FFFFFF' },
      { name: 'Heather Grey', hex: '#B0B8C1' },
      { name: 'Black / Gold', hex: '#1A1A1A' },
      { name: 'Khaki / Brown', hex: '#C4A882' },
    ],
    sizes: ['One Size'],
    storyCity: 'Los Angeles',
    storyParagraph1:
      'Golf rope caps were born on the course and lost their way to the suburb. LA took them back. Now they live where they always belonged — anywhere that deserves a clean silhouette and a bit of swagger. This edition leans into that reclamation. The architecture is classic. The energy is anything but.',
    storyParagraph2:
      'The rope detail is braided in a contrasting color that pulls from LA\'s light — that specific late afternoon bleaching that turns every surface golden for forty minutes before sunset. You\'ve seen it. You know exactly the moment we mean.',
    storyPullQuote: 'No team. No league. No permission needed.',
  },
};

const DEFAULT_HANDLE = 'san-diego-5-panel';

// ─────────────────────────────────────────────────────────────
// STICKY NAVBAR WITH BREADCRUMB
// ─────────────────────────────────────────────────────────────
const ProductNav = ({ productName }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav
        className={`pointer-events-auto w-full max-w-5xl flex items-center justify-between px-6 py-4 rounded-full transition-all duration-500 ease-magnetic ${
          isScrolled
            ? 'bg-background/80 backdrop-blur-xl border border-text/10 shadow-lg'
            : 'bg-background/60 backdrop-blur-md border border-text/5 shadow-sm'
        }`}
      >
        {/* Logo */}
        <Link to="/" className="font-drama font-bold text-xl tracking-wider text-text shrink-0">
          CALIFORNIA HAT HOUSE
        </Link>

        {/* Breadcrumbs — hidden on mobile */}
        <div className="hidden md:flex items-center gap-2 font-sans text-xs font-semibold tracking-wide text-text/50">
          <Link to="/" className="hover:text-accent transition-colors link-hover">Home</Link>
          <span className="text-text/20">/</span>
          <Link to="/" className="hover:text-accent transition-colors link-hover">Shop</Link>
          <span className="text-text/20">/</span>
          <span className="text-text truncate max-w-[180px]">{productName}</span>
        </div>

        {/* Cart */}
        <button className="btn-magnetic bg-primary text-background rounded-full px-5 py-2.5 font-sans text-sm font-bold tracking-wide">
          <div className="btn-magnetic-layer bg-accent"></div>
          <span className="btn-text flex items-center gap-2">
            <ShoppingCart size={16} />
            <span className="hidden sm:inline">Cart</span>
          </span>
        </button>
      </nav>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// ACCORDION ITEM
// ─────────────────────────────────────────────────────────────
const Accordion = ({ title, children, icon: Icon }) => {
  const [open, setOpen] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    if (!contentRef.current) return;
    gsap.to(contentRef.current, {
      height: open ? 'auto' : 0,
      opacity: open ? 1 : 0,
      duration: 0.35,
      ease: 'power3.inOut',
    });
  }, [open]);

  return (
    <div className="border-t border-text/10">
      <button
        className="w-full flex items-center justify-between py-5 font-sans font-bold text-sm uppercase tracking-widest text-text hover:text-accent transition-colors"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="flex items-center gap-3">
          {Icon && <Icon size={16} className="text-accent" />}
          {title}
        </span>
        <ChevronDown
          size={18}
          className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <div ref={contentRef} className="overflow-hidden h-0 opacity-0">
        <div className="pb-6 font-sans text-sm text-text/70 leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// STAR RATING
// ─────────────────────────────────────────────────────────────
const StarRating = ({ rating = 4.8, count = 142 }) => (
  <div className="flex items-center gap-2">
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={13}
          className={star <= Math.round(rating) ? 'text-accent fill-accent' : 'text-text/20'}
        />
      ))}
    </div>
    <span className="font-data text-xs text-text/50">{rating} ({count} reviews)</span>
  </div>
);

// ─────────────────────────────────────────────────────────────
// "YOU MIGHT ALSO LIKE" PRODUCT CARD
// ─────────────────────────────────────────────────────────────
const RelatedProductCard = ({ handle, product, index }) => (
  <Link
    to={`/products/${handle}`}
    className="group cursor-pointer animate-[fadeSlideUp_0.4s_ease-out_forwards]"
    style={{ animationDelay: `${index * 0.08}s`, opacity: 0 }}
  >
    <div className="relative h-[280px] md:h-[340px] rounded-[2rem] overflow-hidden bg-[#e0dccc] mb-5">
      <img
        src={product.images[0]}
        alt={product.name}
        className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-700 ease-out"
      />
      {product.salePrice && (
        <div className="absolute top-4 left-4 bg-accent text-white font-sans font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
          Sale
        </div>
      )}
      <div className="absolute bottom-4 left-4 right-4 translate-y-16 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out">
        <button className="w-full bg-white text-text py-3 rounded-xl font-sans font-bold text-sm shadow-xl hover:bg-accent hover:text-white transition-colors flex justify-center items-center gap-2">
          Quick Add <ShoppingCart size={15} />
        </button>
      </div>
    </div>
    <div>
      <span className="font-data text-[10px] uppercase tracking-widest text-accent mb-1 block">
        {product.city} · {product.type}
      </span>
      <h3 className="font-sans font-bold text-base text-primary mb-1.5 leading-snug">{product.name}</h3>
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
  </Link>
);

// ─────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────
const ProductDetail = () => {
  const { handle } = useParams();
  const product = PRODUCTS[handle] || PRODUCTS[DEFAULT_HANDLE];

  const [activeImage, setActiveImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [savedForLater, setSavedForLater] = useState(false);

  // Refs for animation
  const pageRef = useRef(null);
  const galleryRef = useRef(null);
  const infoRef = useRef(null);
  const storyRef = useRef(null);
  const relatedRef = useRef(null);
  const mainImgRef = useRef(null);
  const thumbRefs = useRef([]);

  // Reset state when handle changes
  useEffect(() => {
    setActiveImage(0);
    setSelectedColor(0);
    setSelectedSize(0);
    setQuantity(1);
    setSavedForLater(false);
  }, [handle]);

  // Cross-fade main image when thumbnail clicked
  const handleThumbClick = useCallback((idx) => {
    if (idx === activeImage) return;
    if (!mainImgRef.current) return;
    gsap.to(mainImgRef.current, {
      opacity: 0,
      scale: 0.98,
      duration: 0.22,
      ease: 'power2.in',
      onComplete: () => {
        setActiveImage(idx);
        gsap.to(mainImgRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.35,
          ease: 'power3.out',
        });
      },
    });
  }, [activeImage]);

  // Entrance animations
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Gallery thumbnails stagger
      gsap.fromTo(
        '.thumb-item',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out', delay: 0.3 }
      );

      // Main image reveal
      gsap.fromTo(
        '.main-gallery',
        { scale: 0.96, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.1 }
      );

      // Info panel slides up
      gsap.fromTo(
        '.info-panel',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.2 }
      );

      // Story strip ScrollTrigger
      gsap.fromTo(
        '.story-reveal',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: storyRef.current,
            start: 'top 72%',
          },
        }
      );

      // Related cards ScrollTrigger
      gsap.fromTo(
        '.related-header',
        { clipPath: 'inset(0 0 100% 0)', opacity: 0 },
        {
          clipPath: 'inset(0 0 0% 0)',
          opacity: 1,
          duration: 0.7,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: relatedRef.current,
            start: 'top 78%',
          },
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, [handle]);

  // Related products (all except current, capped at 4)
  const relatedEntries = Object.entries(PRODUCTS)
    .filter(([h]) => h !== (handle || DEFAULT_HANDLE))
    .slice(0, 4);

  const decreaseQty = () => setQuantity((q) => Math.max(1, q - 1));
  const increaseQty = () => setQuantity((q) => Math.min(99, q + 1));

  return (
    <div ref={pageRef} className="bg-background min-h-screen text-text">
      <ProductNav productName={product.name} />

      {/* ── MAIN PRODUCT SECTION ── */}
      <main className="pt-36 pb-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-10 xl:gap-16 items-start">

            {/* ── LEFT: GALLERY ── */}
            <div ref={galleryRef} className="flex flex-col gap-5">
              {/* Main Image */}
              <div className="main-gallery group relative h-[480px] md:h-[620px] rounded-[2rem] overflow-hidden bg-[#e0dccc] shadow-lg">
                <img
                  ref={mainImgRef}
                  src={product.images[activeImage]}
                  alt={product.name}
                  className="w-full h-full object-cover mix-blend-multiply transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* Sale badge */}
                {product.salePrice && (
                  <div className="absolute top-5 left-5 bg-accent text-white font-sans font-bold text-xs px-3 py-1.5 rounded-full uppercase tracking-wider shadow">
                    Sale
                  </div>
                )}
                {/* Arrow nav for mobile */}
                <button
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur flex items-center justify-center shadow hover:bg-white transition-colors lg:hidden"
                  onClick={() => handleThumbClick((activeImage - 1 + product.images.length) % product.images.length)}
                >
                  <ArrowLeft size={16} className="text-text" />
                </button>
                <button
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur flex items-center justify-center shadow hover:bg-white transition-colors lg:hidden"
                  onClick={() => handleThumbClick((activeImage + 1) % product.images.length)}
                >
                  <ArrowRight size={16} className="text-text" />
                </button>
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-3 gap-4">
                {product.images.slice(1, 4).map((img, i) => {
                  const realIdx = i + 1;
                  return (
                    <button
                      key={realIdx}
                      ref={(el) => (thumbRefs.current[i] = el)}
                      className={`thumb-item relative h-[120px] md:h-[150px] rounded-[1.25rem] overflow-hidden bg-[#e0dccc] transition-all duration-300 ${
                        activeImage === realIdx
                          ? 'ring-2 ring-accent ring-offset-2 ring-offset-background'
                          : 'ring-1 ring-text/10 hover:ring-accent/60'
                      }`}
                      onClick={() => handleThumbClick(realIdx)}
                    >
                      <img
                        src={img}
                        alt={`${product.name} view ${realIdx + 1}`}
                        className="w-full h-full object-cover mix-blend-multiply"
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ── RIGHT: INFO PANEL ── */}
            <div className="info-panel flex flex-col gap-6">
              {/* Data label */}
              <div>
                <span className="font-data text-[11px] uppercase tracking-widest text-accent">
                  {product.city} · {product.type}
                </span>
              </div>

              {/* Name */}
              <h1 className="font-sans font-black uppercase text-3xl md:text-4xl leading-[0.9] text-primary">
                {product.name}
              </h1>

              {/* Star rating */}
              <StarRating />

              {/* Price */}
              <div className="flex items-baseline gap-4">
                {product.salePrice ? (
                  <>
                    <span className="font-data text-2xl text-accent">${product.salePrice.toFixed(2)}</span>
                    <span className="font-data text-lg text-text/30 line-through">${product.price.toFixed(2)}</span>
                    <span className="font-sans text-xs font-bold uppercase tracking-wider text-white bg-accent px-2.5 py-0.5 rounded-full">
                      Save ${(product.price - product.salePrice).toFixed(0)}
                    </span>
                  </>
                ) : (
                  <span className="font-data text-2xl text-primary">${product.price.toFixed(2)}</span>
                )}
              </div>

              {/* Tagline */}
              <p className="font-drama italic text-xl text-text/60 border-l-4 border-accent pl-4 leading-snug">
                {product.tagline}
              </p>

              {/* Color swatches */}
              <div>
                <p className="font-sans text-xs font-bold uppercase tracking-widest text-text/50 mb-3">
                  Color — <span className="text-text">{product.colorways[selectedColor].name}</span>
                </p>
                <div className="flex items-center gap-3 flex-wrap">
                  {product.colorways.map((cw, i) => (
                    <button
                      key={i}
                      title={cw.name}
                      onClick={() => setSelectedColor(i)}
                      className={`w-8 h-8 rounded-full transition-all duration-200 ${
                        selectedColor === i
                          ? 'ring-2 ring-accent ring-offset-2 ring-offset-background scale-110'
                          : 'ring-1 ring-text/20 hover:scale-105'
                      }`}
                      style={{
                        backgroundColor: cw.hex,
                        border: cw.hex === '#FFFFFF' ? '1px solid rgba(0,0,0,0.1)' : 'none',
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Size pills */}
              <div>
                <p className="font-sans text-xs font-bold uppercase tracking-widest text-text/50 mb-3">Size</p>
                <div className="flex items-center gap-3 flex-wrap">
                  {product.sizes.map((sz, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedSize(i)}
                      className={`px-5 py-2.5 rounded-full font-sans font-bold text-sm transition-all duration-200 ${
                        selectedSize === i
                          ? 'bg-primary text-background scale-105'
                          : 'border border-text/20 text-text/70 hover:border-accent hover:text-accent'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity stepper */}
              <div>
                <p className="font-sans text-xs font-bold uppercase tracking-widest text-text/50 mb-3">Quantity</p>
                <div className="inline-flex items-center gap-0 rounded-full border border-text/20 overflow-hidden">
                  <button
                    onClick={decreaseQty}
                    className="w-11 h-11 flex items-center justify-center hover:bg-text hover:text-background transition-colors"
                  >
                    <Minus size={15} />
                  </button>
                  <span className="w-10 text-center font-data text-sm font-bold">{quantity}</span>
                  <button
                    onClick={increaseQty}
                    className="w-11 h-11 flex items-center justify-center hover:bg-text hover:text-background transition-colors"
                  >
                    <Plus size={15} />
                  </button>
                </div>
              </div>

              {/* Add to Cart — btn-magnetic */}
              <button className="btn-magnetic w-full bg-primary text-background rounded-full py-4 font-sans font-bold text-base tracking-wide">
                <div className="btn-magnetic-layer bg-accent"></div>
                <span className="btn-text flex items-center justify-center gap-3">
                  <ShoppingCart size={18} />
                  Add to Cart
                </span>
              </button>

              {/* Save for Later */}
              <button
                onClick={() => setSavedForLater((v) => !v)}
                className="btn-magnetic w-full border-2 border-text/20 text-text rounded-full py-3.5 font-sans font-semibold text-sm tracking-wide hover:border-accent hover:text-accent transition-colors"
              >
                <div className="btn-magnetic-layer bg-accent/5"></div>
                <span className="btn-text flex items-center justify-center gap-2">
                  <Heart size={16} className={savedForLater ? 'fill-accent text-accent' : ''} />
                  {savedForLater ? 'Saved for Later' : 'Save for Later'}
                </span>
              </button>

              {/* Shipping trust badge */}
              <div className="flex items-center gap-3 bg-primary/5 rounded-2xl px-5 py-4 border border-primary/10">
                <Truck size={18} className="text-primary shrink-0" />
                <p className="font-sans text-sm text-text/70">
                  <span className="font-bold text-primary">Free shipping</span> when you grab 2+ hats.
                </p>
              </div>

              {/* Spec bullets */}
              <div className="mt-2">
                <p className="font-sans text-xs font-bold uppercase tracking-widest text-text/40 mb-4">Specifications</p>
                <ul className="space-y-2.5">
                  {product.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-3 font-sans text-sm text-text/70">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-[6px]" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Accordions */}
              <div className="mt-4">
                <Accordion title="Materials & Care" icon={Shield}>
                  <p>This cap is built from premium materials selected for durability and comfort. Spot clean with a damp cloth and mild detergent. Do not machine wash structured caps — the crown will thank you. Air dry only. Iron never.</p>
                </Accordion>
                <Accordion title="Shipping & Returns" icon={Truck}>
                  <p>Standard shipping 3–5 business days. Expedited 1–2 business days. Free shipping on orders of 2+ hats — no code needed. We accept returns within 30 days of delivery for unworn, unaltered items in original condition. Final sale items are not returnable.</p>
                </Accordion>
                <Accordion title="Sizing Guide" icon={Ruler}>
                  <p className="mb-3">Most of our caps are one-size-fits-most via snapback or strap adjustment. For beanies and fitted styles:</p>
                  <div className="grid grid-cols-2 gap-2 font-data text-xs">
                    <div className="bg-primary/5 rounded-xl p-3">
                      <p className="font-bold text-primary mb-1">S/M</p>
                      <p className="text-text/60">Head circumference 21.5″ – 22.5″</p>
                    </div>
                    <div className="bg-primary/5 rounded-xl p-3">
                      <p className="font-bold text-primary mb-1">L/XL</p>
                      <p className="text-text/60">Head circumference 22.5″ – 24″</p>
                    </div>
                  </div>
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ── STORY STRIP ── */}
      <section ref={storyRef} className="py-28 px-6 md:px-12 bg-text text-background relative overflow-hidden">
        {/* Subtle background texture */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: 'url("/assets/feature_cap_one.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            mixBlendMode: 'luminosity',
          }}
        />
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 md:gap-20 items-start">
            {/* Label column */}
            <div>
              <span className="story-reveal font-data text-accent text-xs uppercase tracking-widest block mb-4">
                The {product.storyCity} Edition
              </span>
              <h2 className="story-reveal font-sans font-black uppercase text-3xl md:text-4xl leading-tight">
                The Story <br />
                <span className="font-drama italic text-accent">Behind It</span>
              </h2>
            </div>

            {/* Copy column */}
            <div className="space-y-8">
              <p className="story-reveal font-sans text-background/70 text-lg leading-relaxed">
                {product.storyParagraph1}
              </p>
              <blockquote className="story-reveal border-l-4 border-accent pl-8 py-2">
                <p className="font-drama italic text-2xl md:text-3xl text-accent leading-snug">
                  "{product.storyPullQuote}"
                </p>
              </blockquote>
              <p className="story-reveal font-sans text-background/70 text-lg leading-relaxed">
                {product.storyParagraph2}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── YOU MIGHT ALSO LIKE ── */}
      <section ref={relatedRef} className="py-28 px-6 md:px-12 bg-background border-t border-text/5">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="related-header flex flex-col md:flex-row justify-between items-end mb-14 gap-6">
            <div>
              <p className="font-data text-xs uppercase tracking-widest text-accent mb-3">More from CHH</p>
              <h2 className="font-sans font-black uppercase text-4xl md:text-5xl text-primary">
                You Might Also Like
              </h2>
            </div>
            <Link
              to="/"
              className="btn-magnetic bg-text text-background rounded-full px-7 py-3 font-sans font-bold text-sm shrink-0"
            >
              <div className="btn-magnetic-layer bg-primary"></div>
              <span className="btn-text flex items-center gap-2">
                Shop All <ArrowRight size={15} />
              </span>
            </Link>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedEntries.map(([h, p], i) => (
              <RelatedProductCard key={h} handle={h} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
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
                <li><Link to="/" className="hover:text-white transition-colors">Los Angeles</Link></li>
                <li><Link to="/" className="hover:text-white transition-colors">San Francisco</Link></li>
                <li><Link to="/" className="hover:text-white transition-colors">San Diego</Link></li>
                <li><Link to="/" className="hover:text-white transition-colors">Oakland</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-sans font-bold uppercase text-accent mb-6">Connect</h4>
              <ul className="space-y-3 font-sans text-sm text-background/80">
                <li><Link to="/" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/" className="hover:text-white transition-colors">Contact</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-white transition-colors">TikTok</a></li>
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
    </div>
  );
};

export default ProductDetail;
