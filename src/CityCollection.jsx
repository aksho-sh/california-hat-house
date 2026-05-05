import React, { useLayoutEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft, ArrowRight, ShoppingCart, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// -------------------------------------------------------------
// CITIES DATA MAP
// -------------------------------------------------------------
const CITIES = {
  'los-angeles': {
    name: 'Los Angeles',
    tagline: 'Made in the sun. Built to be seen.',
    heroImg: '/assets/hero_cap_one.png',
    heroCopy:
      'Los Angeles doesn\'t ask for your attention — it commands it. Every block is a stage, every corner a cast of thousands chasing the same impossible dream. We built this collection for the ones who show up anyway: the creatives, the strivers, the after-midnight believers who know the city rewards those who wear their ambition loud.',
    moodTags: ['Golden Hour', '405 at Midnight', 'Venice Drift', 'Sunset Strip', 'LA Grit'],
    products: [
      { name: 'Venice Beach Trucker', price: 40, img: '/assets/hero_cap_one.png' },
      { name: 'Sunset Strip Dad Hat', price: 35, img: '/assets/feature_cap_two.png' },
      { name: 'Hollywood Sign 5-Panel', price: 40, img: '/assets/hero_cap_two.png' },
      { name: 'Silver Lake Snapback', price: 42, img: '/assets/storefront_cap_one.png' },
      { name: 'Echo Park Corduroy Cap', price: 40, img: '/assets/feature_cap_one.png' },
      { name: 'Malibu Washed Trucker', price: 38, img: '/assets/hero_cap_one.png' },
      { name: 'Crenshaw Flat Bill', price: 40, img: '/assets/feature_cap_two.png' },
      { name: 'Fairfax Ave Foam Trucker', price: 35, img: '/assets/hero_cap_two.png' },
    ],
    companions: ['san-francisco', 'san-diego', 'oakland'],
  },
  'san-francisco': {
    name: 'San Francisco',
    tagline: "The city doesn't sleep. Neither does your hustle.",
    heroImg: '/assets/hero_cap_two.png',
    heroCopy:
      'San Francisco is a city that moves at two speeds: fog-slow mornings over the bay and sprint-to-the-top every other waking hour. It smells like salt and ambition all at once. This collection is for the early risers and the late-night coders, the Mission regulars and the ferry riders — everyone who\'s let this city get inside them and refused to let it go.',
    moodTags: ['Bay Fog', 'Mission Heat', 'Ferry Building Dawn', 'BART Rush', 'Twin Peaks'],
    products: [
      { name: 'Bay Bridge Snapback', price: 40, img: '/assets/hero_cap_two.png' },
      { name: '"SF" Embroidered Dad Hat', price: 36, img: '/assets/feature_cap_one.png' },
      { name: 'Mission District 5-Panel', price: 40, img: '/assets/hero_cap_one.png' },
      { name: 'Haight-Ashbury Corduroy', price: 44, img: '/assets/feature_cap_two.png' },
      { name: 'Fog City Trucker', price: 38, img: '/assets/storefront_cap_one.png' },
      { name: 'Embarcadero Flat Bill', price: 40, img: '/assets/hero_cap_two.png' },
      { name: 'Twin Peaks Foam Cap', price: 35, img: '/assets/feature_cap_one.png' },
      { name: 'Golden Gate Golf Rope', price: 40, img: '/assets/hero_cap_one.png' },
    ],
    companions: ['los-angeles', 'oakland', 'san-diego'],
  },
  'san-diego': {
    name: 'San Diego',
    tagline: 'Born coastal. Forever 72°.',
    heroImg: '/assets/feature_cap_two.png',
    heroCopy:
      'San Diego moves different — deliberate, unhurried, rooted in the idea that living well is the whole point. The sun hits the water at an angle no other California city can claim. Our San Diego line is built for people who know the tide schedule by heart, who can name every taco spot from Barrio Logan to Pacific Beach, who never left because they never needed to.',
    moodTags: ['SD Slow Life', 'Pacific Swell', 'Coronado Dusk', 'Barrio Flavor', 'Endless Summer'],
    products: [
      { name: '"San Diego" 5-Panel Cap', price: 40, img: '/assets/feature_cap_two.png' },
      { name: 'Coronado Trucker', price: 38, img: '/assets/hero_cap_one.png' },
      { name: 'Pacific Beach Foam Cap', price: 35, img: '/assets/hero_cap_two.png' },
      { name: 'Gaslamp Snapback', price: 40, img: '/assets/feature_cap_one.png' },
      { name: 'Balboa Park Corduroy', price: 44, img: '/assets/storefront_cap_one.png' },
      { name: 'Barrio Logan Dad Hat', price: 36, img: '/assets/feature_cap_two.png' },
      { name: 'OB Washed Trucker', price: 38, img: '/assets/hero_cap_one.png' },
      { name: 'Mission Bay Golf Rope', price: 40, img: '/assets/hero_cap_two.png' },
    ],
    companions: ['los-angeles', 'san-francisco', 'oakland'],
  },
  'oakland': {
    name: 'Oakland',
    tagline: 'The Town raised you. Wear it proud.',
    heroImg: '/assets/storefront_cap_one.png',
    heroCopy:
      'Oakland has never needed anyone\'s validation. The Town built its own scene, its own sound, its own swagger long before anyone across the bay started paying attention. This collection was made for the people who carry Oakland with them everywhere — not as a badge, not as nostalgia, but as an identity so bone-deep it requires no explanation.',
    moodTags: ['Oakland Grit', 'Uptown After Dark', 'Lake Merritt Gold', 'Fruitvale Soul', 'The Town Always'],
    products: [
      { name: 'Oakland Originals 5-Panel', price: 40, img: '/assets/storefront_cap_one.png' },
      { name: 'The Town Snapback', price: 42, img: '/assets/feature_cap_one.png' },
      { name: 'Lake Merritt Trucker', price: 38, img: '/assets/hero_cap_one.png' },
      { name: 'Uptown Dad Hat', price: 36, img: '/assets/hero_cap_two.png' },
      { name: 'Fruitvale Corduroy Cap', price: 44, img: '/assets/feature_cap_two.png' },
      { name: 'Telegraph Ave Flat Bill', price: 40, img: '/assets/storefront_cap_one.png' },
      { name: 'East Bay Foam Trucker', price: 35, img: '/assets/feature_cap_one.png' },
      { name: 'Coliseum Golf Rope', price: 40, img: '/assets/hero_cap_two.png' },
    ],
    companions: ['san-francisco', 'los-angeles', 'san-diego'],
  },
  'norcal': {
    name: 'NorCal',
    tagline: 'The north side of legendary.',
    heroImg: '/assets/feature_cap_one.png',
    heroCopy:
      'NorCal is a state within a state — redwoods, reservoirs, and a culture that has always done things its own way. From the Bay up to the mountains, this collection carries the spirit of the north side: self-made, unhyped, and absolutely inevitable. Wear it as proof you know the difference between California and California.',
    moodTags: ['Redwood Canopy', 'Bay Area Born', 'Sierra High', 'Delta Slow', 'North Side Only'],
    products: [
      { name: 'NorCal Snapback', price: 40, img: '/assets/feature_cap_one.png' },
      { name: 'Redwood Forest Trucker', price: 40, img: '/assets/hero_cap_one.png' },
      { name: 'Sierra Nevada 5-Panel', price: 40, img: '/assets/hero_cap_two.png' },
      { name: 'Sacramento Corduroy Cap', price: 44, img: '/assets/feature_cap_two.png' },
      { name: 'Tahoe Blue Foam Trucker', price: 35, img: '/assets/storefront_cap_one.png' },
      { name: 'Napa Valley Golf Rope', price: 40, img: '/assets/feature_cap_one.png' },
      { name: 'Fresno Flat Bill', price: 40, img: '/assets/hero_cap_one.png' },
      { name: 'Delta Wind Dad Hat', price: 36, img: '/assets/hero_cap_two.png' },
    ],
    companions: ['los-angeles', 'san-francisco', 'oakland'],
  },
  'socal': {
    name: 'SoCal',
    tagline: 'The other side of perfect.',
    heroImg: '/assets/feature_cap_two.png',
    heroCopy:
      'SoCal is sun-bleached mythology made real: the highway that never ends, the coast that stretches past reason, the warm air that makes people believe anything is possible. This collection is for the ones who live south of the Grapevine and north of the border — people who know that perfect isn\'t a place, it\'s a way of carrying yourself.',
    moodTags: ['Sunset Boulevard', 'SoCal Sunday', 'Pacific Heat', 'Beach Break', 'Highway 1 Forever'],
    products: [
      { name: 'SoCal Classic Snapback', price: 40, img: '/assets/feature_cap_two.png' },
      { name: 'Pacific Coast Trucker', price: 38, img: '/assets/hero_cap_one.png' },
      { name: 'Malibu 5-Panel', price: 40, img: '/assets/hero_cap_two.png' },
      { name: 'Long Beach Corduroy', price: 44, img: '/assets/feature_cap_one.png' },
      { name: 'Surf City Foam Cap', price: 35, img: '/assets/storefront_cap_one.png' },
      { name: 'Inland Empire Dad Hat', price: 36, img: '/assets/feature_cap_two.png' },
      { name: 'Coachella Flat Bill', price: 40, img: '/assets/hero_cap_one.png' },
      { name: 'Desert Bloom Golf Rope', price: 40, img: '/assets/hero_cap_two.png' },
    ],
    companions: ['los-angeles', 'san-diego', 'oakland'],
  },
};

const DEFAULT_CITY = {
  name: 'California',
  tagline: 'Born on the Coast. Built for Every Head.',
  heroImg: '/assets/hero_cap_one.png',
  heroCopy:
    'California is not just one place — it\'s every place at once. The coast and the mountains, the midnight city and the golden valley. Whatever city brought you here, this collection speaks to the whole of it: one state, one identity, worn on your head like a declaration.',
  moodTags: ['Golden State', 'Coast to Coast', 'California Always', 'The Dream', 'Rep Your City'],
  products: [
    { name: 'Cali Vibes Garment-Washed Cap', price: 40, img: '/assets/hero_cap_one.png' },
    { name: 'Golden State Foam Trucker', price: 35, img: '/assets/feature_cap_two.png' },
    { name: 'Pacific Highway 5-Panel', price: 40, img: '/assets/hero_cap_two.png' },
    { name: 'Classic California Snapback', price: 42, img: '/assets/storefront_cap_one.png' },
    { name: 'Bear Republic Corduroy', price: 44, img: '/assets/feature_cap_one.png' },
    { name: 'Coastal Drift Dad Hat', price: 36, img: '/assets/feature_cap_two.png' },
  ],
  companions: ['los-angeles', 'san-francisco', 'san-diego'],
};

const CITY_DISPLAY_NAMES = {
  'los-angeles': 'Los Angeles',
  'san-francisco': 'San Francisco',
  'san-diego': 'San Diego',
  'oakland': 'Oakland',
  'norcal': 'NorCal',
  'socal': 'SoCal',
};

// -------------------------------------------------------------
// CITY COLLECTION PAGE
// -------------------------------------------------------------
const CityCollection = () => {
  const { city: citySlug } = useParams();
  const cityData = CITIES[citySlug] || DEFAULT_CITY;

  const pageRef = useRef(null);
  const heroRef = useRef(null);
  const introRef = useRef(null);
  const gridRef = useRef(null);
  const companionRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // ---- Hero entrance: stagger 0.08 ----
      gsap.fromTo(
        '.city-hero-anim',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          stagger: 0.08,
          ease: 'power3.out',
          delay: 0.15,
        }
      );

      // ---- Intro section reveal ----
      gsap.fromTo(
        '.city-intro-anim',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: introRef.current,
            start: 'top 72%',
          },
        }
      );

      // ---- Mood tags strip ----
      gsap.fromTo(
        '.mood-tag',
        { x: -20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.mood-strip',
            start: 'top 80%',
          },
        }
      );

      // ---- Product grid: stagger 0.12 ----
      gsap.fromTo(
        '.product-card',
        { y: 50, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 75%',
          },
        }
      );

      // ---- Companion cards ----
      gsap.fromTo(
        '.companion-card',
        { y: 40, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: companionRef.current,
            start: 'top 75%',
          },
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, [citySlug]);

  return (
    <div ref={pageRef} className="bg-background min-h-screen text-text">

      {/* ---- STICKY NAVBAR ---- */}
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <div className="pointer-events-auto w-full max-w-5xl flex justify-between items-center px-6 py-4 rounded-full bg-background/80 backdrop-blur-xl border border-text/10 shadow-lg">
          {/* Logo */}
          <Link
            to="/"
            className="font-drama font-bold text-xl tracking-wider text-text hover:text-accent transition-colors duration-300"
          >
            CALIFORNIA HAT HOUSE
          </Link>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-8 font-sans text-sm font-semibold text-text">
            <Link to="/" className="link-hover hover:text-accent transition-colors">Home</Link>
            <Link to="/shop" className="link-hover hover:text-accent transition-colors">Shop</Link>
            <Link to="/about" className="link-hover hover:text-accent transition-colors">About</Link>
            <Link to="/contact" className="link-hover hover:text-accent transition-colors">Contact</Link>
          </nav>

          {/* Back arrow */}
          <Link
            to="/"
            className="flex items-center gap-2 font-sans text-sm font-semibold text-text hover:text-accent transition-colors link-hover"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Back to Home</span>
          </Link>
        </div>
      </div>

      {/* ---- CINEMATIC HERO ---- */}
      <section
        ref={heroRef}
        className="relative h-[100dvh] w-full flex items-end pb-20 md:pb-32 px-6 md:px-16 overflow-hidden"
      >
        {/* Full-bleed hero image */}
        <div className="absolute inset-0 z-0">
          <img
            src={cityData.heroImg}
            alt={cityData.name}
            className="w-full h-full object-cover"
          />
          {/* primary-to-black gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a2730] via-primary/60 to-primary/10"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-primary/50 via-transparent to-transparent"></div>
        </div>

        {/* Hero content — bottom-left */}
        <div className="relative z-10 max-w-3xl">
          <p className="city-hero-anim flex items-center gap-2 font-data text-accent text-xs uppercase tracking-widest mb-5">
            <MapPin size={13} />
            California Hat House — City Collection
          </p>

          {/* Massive city name */}
          <h1 className="city-hero-anim font-sans font-black uppercase leading-[0.85] text-background mb-4">
            <span className="block text-[clamp(3rem,10vw,8rem)] tracking-tight">
              {cityData.name}
            </span>
          </h1>

          {/* Oswald italic tagline in accent */}
          <p className="city-hero-anim font-drama italic text-accent text-2xl md:text-3xl lg:text-4xl mb-10 leading-snug max-w-xl">
            {cityData.tagline}
          </p>

          {/* CTA */}
          <div className="city-hero-anim flex flex-col sm:flex-row gap-4">
            <button className="btn-magnetic bg-accent text-background rounded-full px-8 py-4 font-sans font-bold text-base">
              <div className="btn-magnetic-layer bg-primary"></div>
              <span className="btn-text flex items-center gap-2">
                Shop This Collection <ArrowRight size={16} />
              </span>
            </button>
            <Link
              to="/about"
              className="btn-magnetic border border-background/30 text-background rounded-full px-8 py-4 font-sans font-semibold text-base hover:border-background/60 transition-colors"
            >
              <div className="btn-magnetic-layer bg-background/10"></div>
              <span className="btn-text">Our Story</span>
            </Link>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute right-8 bottom-10 z-10 flex flex-col items-center gap-2 opacity-40">
          <div className="w-px h-16 bg-background animate-pulse"></div>
          <span className="font-data text-background text-[10px] uppercase tracking-widest rotate-90 origin-center translate-x-4">Scroll</span>
        </div>
      </section>

      {/* ---- EDITORIAL INTRO ---- */}
      <section ref={introRef} className="py-28 md:py-36 px-6 md:px-16 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 md:gap-24 items-start">
            {/* Left: label + heading */}
            <div className="city-intro-anim sticky top-32">
              <p className="font-data text-accent text-xs uppercase tracking-widest mb-4">
                The Collection
              </p>
              <h2 className="font-sans font-black uppercase text-3xl md:text-4xl text-primary leading-tight">
                {cityData.name}
                <br />
                <span className="font-drama italic text-accent text-4xl md:text-5xl">Heritage</span>
              </h2>
            </div>

            {/* Right: blurb + mood tags */}
            <div>
              <p className="city-intro-anim font-sans text-text/80 text-lg md:text-xl leading-relaxed mb-8">
                {cityData.heroCopy}
              </p>
              <p className="city-intro-anim font-sans text-text/60 text-base leading-relaxed mb-12">
                Every piece in this collection runs through one filter: does it feel like {cityData.name}? If we have to ask, the answer is no. Premium quality, city-first embroidery, and the kind of fit that signals something to everyone who knows.
              </p>

              {/* Heritage / mood tag strip */}
              <div className="mood-strip city-intro-anim">
                <p className="font-data text-text/40 text-xs uppercase tracking-widest mb-4">Mood</p>
                <div className="flex flex-wrap gap-3">
                  {cityData.moodTags.map((tag) => (
                    <span
                      key={tag}
                      className="mood-tag font-data text-xs uppercase tracking-widest px-4 py-2 rounded-full border border-primary/20 text-primary/70 bg-primary/5 hover:bg-primary hover:text-background transition-all duration-300 cursor-default"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---- PRODUCT GRID ---- */}
      <section ref={gridRef} className="py-24 px-6 md:px-16 bg-text">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div>
              <p className="font-data text-accent text-xs uppercase tracking-widest mb-3">
                {cityData.products.length} pieces — limited runs
              </p>
              <h2 className="font-sans font-black uppercase text-4xl md:text-5xl text-background">
                The <span className="font-drama italic text-accent">{cityData.name}</span> Line
              </h2>
            </div>
            <button className="btn-magnetic bg-accent text-background rounded-full px-7 py-3 font-sans font-bold text-sm shrink-0">
              <div className="btn-magnetic-layer bg-white/20"></div>
              <span className="btn-text flex items-center gap-2">
                View All <ArrowRight size={14} />
              </span>
            </button>
          </div>

          {/* 3-col desktop / 2-col mobile grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {cityData.products.map((prod, i) => (
              <div key={i} className="product-card group cursor-pointer">
                {/* Card image */}
                <div className="relative h-[260px] md:h-[360px] rounded-[2rem] overflow-hidden bg-[#d6d1c4] mb-5">
                  <img
                    src={prod.img}
                    alt={prod.name}
                    className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  {prod.salePrice && (
                    <div className="absolute top-4 left-4 bg-accent text-white font-sans font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                      Sale
                    </div>
                  )}
                  {/* Hover overlay — Add to Cart */}
                  <div className="absolute bottom-4 left-4 right-4 translate-y-16 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out">
                    <button className="w-full bg-white text-text py-3 rounded-xl font-sans font-bold text-sm shadow-xl hover:bg-accent hover:text-white transition-colors flex justify-center items-center gap-2">
                      Add to Cart <ShoppingCart size={15} />
                    </button>
                  </div>
                </div>

                {/* Card meta */}
                <div>
                  <h3 className="font-sans font-bold text-base md:text-lg text-background mb-1 group-hover:text-accent transition-colors duration-300">
                    {prod.name}
                  </h3>
                  <div className="flex items-center gap-3 font-data text-sm">
                    {prod.salePrice ? (
                      <>
                        <span className="text-accent">${prod.salePrice.toFixed(2)}</span>
                        <span className="text-background/30 line-through">${prod.price.toFixed(2)}</span>
                      </>
                    ) : (
                      <span className="text-background/60">${prod.price.toFixed(2)}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- MORE FROM CALIFORNIA — companion cities ---- */}
      <section ref={companionRef} className="py-28 md:py-36 px-6 md:px-16 bg-background">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-16">
            <p className="font-data text-accent text-xs uppercase tracking-widest mb-3">
              Rep Your City
            </p>
            <h2 className="font-sans font-black uppercase text-4xl md:text-5xl text-primary">
              More from <span className="font-drama italic text-accent">California</span>
            </h2>
          </div>

          {/* Companion city cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cityData.companions.map((slug) => {
              const companion = CITIES[slug];
              if (!companion) return null;
              return (
                <Link
                  key={slug}
                  to={`/collections/${slug}`}
                  className="companion-card group relative h-[280px] md:h-[340px] rounded-[2rem] overflow-hidden bg-text cursor-pointer shadow-lg transition-transform duration-500 hover:-translate-y-1"
                >
                  <div className="absolute inset-0 z-0">
                    <img
                      src={companion.heroImg}
                      alt={companion.name}
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-all duration-700 group-hover:scale-105 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-text/90 via-text/30 to-transparent"></div>
                  </div>
                  <div className="relative z-10 p-8 h-full flex flex-col justify-end">
                    <p className="font-data text-accent text-xs uppercase tracking-widest mb-2">
                      Collection
                    </p>
                    <h3 className="font-sans font-black uppercase text-2xl md:text-3xl text-background mb-1">
                      {companion.name}
                    </h3>
                    <p className="font-drama italic text-accent text-base mb-5 leading-snug">
                      {companion.tagline}
                    </p>
                    <span className="inline-flex items-center gap-2 font-sans font-bold text-xs text-background/70 group-hover:text-accent transition-colors duration-300">
                      Shop Collection <ArrowRight size={13} />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---- CTA BAND ---- */}
      <section className="py-24 px-6 md:px-16 bg-primary text-background text-center">
        <div className="max-w-3xl mx-auto">
          <p className="font-data text-accent text-xs uppercase tracking-widest mb-4">
            Wear California Wherever You Go
          </p>
          <h2 className="font-sans font-black uppercase text-4xl md:text-5xl mb-4">
            Rep Your City.
          </h2>
          <p className="font-drama italic text-2xl text-background/70 mb-10">
            Because where you're from is worth wearing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="btn-magnetic inline-flex bg-accent text-background rounded-full px-10 py-4 font-sans font-bold text-lg"
            >
              <div className="btn-magnetic-layer bg-white/20"></div>
              <span className="btn-text flex items-center gap-2">
                Shop All Collections <ArrowRight size={16} />
              </span>
            </Link>
            <Link
              to="/about"
              className="btn-magnetic inline-flex border border-background/30 text-background rounded-full px-10 py-4 font-sans font-semibold text-lg hover:border-background/60 transition-colors"
            >
              <div className="btn-magnetic-layer bg-background/10"></div>
              <span className="btn-text">Our Story</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ---- FOOTER ---- */}
      <footer className="bg-primary text-background pt-24 pb-12 px-6 md:px-16 relative overflow-hidden border-t border-background/10">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="md:col-span-2">
              <h2 className="font-sans font-black uppercase text-4xl mb-4">
                California <br />Hat House
              </h2>
              <p className="font-sans text-background/60 max-w-sm">
                Premium California themed hats and embroidered baseball caps celebrating the Golden State.
              </p>
            </div>
            <div>
              <h4 className="font-sans font-bold uppercase text-accent mb-6">Collections</h4>
              <ul className="space-y-3 font-sans text-sm text-background/80">
                <li>
                  <Link to="/collections/los-angeles" className="hover:text-white transition-colors link-hover">
                    Los Angeles
                  </Link>
                </li>
                <li>
                  <Link to="/collections/san-francisco" className="hover:text-white transition-colors link-hover">
                    San Francisco
                  </Link>
                </li>
                <li>
                  <Link to="/collections/san-diego" className="hover:text-white transition-colors link-hover">
                    San Diego
                  </Link>
                </li>
                <li>
                  <Link to="/collections/oakland" className="hover:text-white transition-colors link-hover">
                    Oakland
                  </Link>
                </li>
                <li>
                  <Link to="/collections/norcal" className="hover:text-white transition-colors link-hover">
                    NorCal
                  </Link>
                </li>
                <li>
                  <Link to="/collections/socal" className="hover:text-white transition-colors link-hover">
                    SoCal
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-sans font-bold uppercase text-accent mb-6">Connect</h4>
              <ul className="space-y-3 font-sans text-sm text-background/80">
                <li>
                  <Link to="/about" className="hover:text-white transition-colors link-hover">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-white transition-colors link-hover">
                    Contact
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors link-hover">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors link-hover">
                    TikTok
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center border-t border-background/10 pt-8 gap-4">
            <p className="font-data text-xs text-background/40">
              &copy; {new Date().getFullYear()} California Hat House. All rights reserved.
            </p>
            <div className="flex items-center gap-2 bg-text/20 px-4 py-2 rounded-full border border-background/5">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="font-data text-xs text-background/80 uppercase tracking-widest">
                System Operational
              </span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default CityCollection;
