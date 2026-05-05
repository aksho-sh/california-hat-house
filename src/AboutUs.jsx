import React, { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const AboutUs = () => {
  const heroRef = useRef(null);
  const storyRef = useRef(null);
  const valuesRef = useRef(null);
  const signalRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Hero entrance
      gsap.fromTo(
        '.about-hero-anim',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power3.out', delay: 0.2 }
      );

      // Story paragraphs
      gsap.fromTo(
        '.story-text',
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: storyRef.current, start: 'top 70%' }
        }
      );

      // Value cards
      gsap.fromTo(
        '.value-card',
        { y: 50, opacity: 0, scale: 0.95 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: valuesRef.current, start: 'top 70%' }
        }
      );

      // Signal section
      gsap.fromTo(
        '.signal-text',
        { clipPath: 'inset(0 0 100% 0)', opacity: 0 },
        {
          clipPath: 'inset(0 0 0% 0)', opacity: 1, duration: 1, stagger: 0.2, ease: 'power3.inOut',
          scrollTrigger: { trigger: signalRef.current, start: 'top 65%' }
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-background min-h-screen text-text">
      {/* Sticky back nav */}
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <div className="pointer-events-auto w-full max-w-5xl flex justify-between items-center px-6 py-4 rounded-full bg-background/80 backdrop-blur-xl border border-text/10 shadow-lg">
          <Link to="/" className="font-drama font-bold text-xl tracking-wider text-text">
            CALIFORNIA HAT HOUSE
          </Link>
          <Link to="/" className="flex items-center gap-2 font-sans text-sm font-semibold text-text hover:text-accent transition-colors link-hover">
            <ArrowLeft size={16} /> Back to Home
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section ref={heroRef} className="relative pt-40 pb-24 px-6 md:px-12 bg-text text-background overflow-hidden">
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: 'url("/assets/feature_cap_one.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            mixBlendMode: 'luminosity'
          }}
        ></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <p className="about-hero-anim font-data text-accent text-sm uppercase tracking-widest mb-6">Our Story</p>
          <h1 className="about-hero-anim font-sans font-black uppercase text-5xl md:text-7xl lg:text-8xl leading-[0.9] mb-8">
            It started in <br />
            <span className="font-drama italic text-accent">a garage.</span>
          </h1>
          <p className="about-hero-anim font-sans text-background/70 text-xl md:text-2xl max-w-2xl leading-relaxed">
            Not with a business plan. Not with investors. With a half-open garage door, the smell of pressed cotton, and the Bay Area fog rolling in at dusk.
          </p>
        </div>
      </section>

      {/* The Origin Story */}
      <section ref={storyRef} className="py-32 px-6 md:px-12 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 md:gap-20 items-start">
            <div>
              <h2 className="story-text font-sans font-black uppercase text-3xl text-primary sticky top-32">
                The<br />Beginning
              </h2>
            </div>
            <div className="space-y-8">
              <p className="story-text font-sans text-text/80 text-lg leading-relaxed">
                We weren't trying to build a brand. We were just trying to make something we actually wanted to wear. Something that felt like us. Something that said where we came from without having to say a word.
              </p>
              <p className="story-text font-sans text-text/80 text-lg leading-relaxed">
                Because California isn't just a place — it's something you carry in you. The way the late afternoon light hits the Bay Bridge. The way Oakland hits different after dark. The way San Francisco smells like salt and ambition all at once.
              </p>
              <blockquote className="story-text border-l-4 border-accent pl-8 py-4 my-12">
                <p className="font-drama italic text-2xl md:text-3xl text-primary leading-snug">
                  "We're not selling headwear. We're selling a feeling — and every Californian already knows exactly what that feels like."
                </p>
              </blockquote>
              <p className="story-text font-sans text-text/80 text-lg leading-relaxed">
                You can leave California. California doesn't leave you. So we stitched it into a hat.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values — Three Pillars */}
      <section ref={valuesRef} className="py-32 px-6 md:px-12 bg-text text-background">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-sans font-black uppercase text-4xl md:text-5xl text-center mb-20">
            What We <span className="font-drama italic text-accent">Stand For</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="value-card rounded-[2rem] bg-background/5 border border-background/10 p-10 hover:bg-background/10 transition-colors duration-500">
              <span className="font-data text-accent text-sm uppercase tracking-widest">01</span>
              <h3 className="font-sans font-black uppercase text-2xl mt-4 mb-4">The Garage Years</h3>
              <p className="font-sans text-background/70 leading-relaxed">
                No shortcuts. No manufacturers handed to us. We figured out every stitch, every color match, every trucker mesh weight the hard way — order samples, test them, hate them, try again. The Bay Area taught us one thing: if you can't build it yourself, you don't really know what you're building.
              </p>
            </div>
            {/* Card 2 */}
            <div className="value-card rounded-[2rem] bg-background/5 border border-background/10 p-10 hover:bg-background/10 transition-colors duration-500">
              <span className="font-data text-accent text-sm uppercase tracking-widest">02</span>
              <h3 className="font-sans font-black uppercase text-2xl mt-4 mb-4">City First, Always</h3>
              <p className="font-sans text-background/70 leading-relaxed">
                SF. Oakland. LA. San Diego. These aren't just cities to us — they're personalities, histories, attitudes. Every colorway, every embroidery placement, every design decision runs through one filter: does this feel like that city? If we have to ask, the answer is no.
              </p>
            </div>
            {/* Card 3 */}
            <div className="value-card rounded-[2rem] bg-background/5 border border-background/10 p-10 hover:bg-background/10 transition-colors duration-500">
              <span className="font-data text-accent text-sm uppercase tracking-widest">03</span>
              <h3 className="font-sans font-black uppercase text-2xl mt-4 mb-4">Real People, Real Pride</h3>
              <p className="font-sans text-background/70 leading-relaxed">
                We didn't grow this with ads. We grew it one person at a time — people who put it on and immediately understood. That's still the test. If you put on a CHH hat and something clicks — some wordless recognition of where you're from — then we did our job right.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Signal */}
      <section ref={signalRef} className="relative py-48 px-6 md:px-12 bg-background overflow-hidden">
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: 'url("/assets/hero_cap_two.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            mixBlendMode: 'luminosity'
          }}
        ></div>
        <div className="relative z-10 max-w-5xl mx-auto">
          <h2 className="signal-text font-sans font-black uppercase text-4xl md:text-6xl text-primary mb-8">
            It's Not A Hat. <br />
            <span className="font-drama italic text-accent text-5xl md:text-7xl">It's A Signal.</span>
          </h2>
          <p className="signal-text font-sans text-text/70 text-xl md:text-2xl max-w-3xl leading-relaxed mb-8">
            When someone across the room sees your CHH hat, they don't think "nice hat." They think — that person is from somewhere real. Somewhere with culture. With coastline. With something to say.
          </p>
          <p className="signal-text font-sans text-text/70 text-xl md:text-2xl max-w-3xl leading-relaxed mb-12">
            That moment of recognition? That's what we've been building since day one in that garage. Not a product. A conversation starter. An identity you wear.
          </p>
          <div className="signal-text flex flex-col sm:flex-row gap-6 items-start">
            <div className="flex flex-col">
              <span className="font-drama italic text-accent text-3xl md:text-4xl">Born on the Coast.</span>
              <span className="font-drama italic text-accent text-3xl md:text-4xl">Built for Every Head.</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 md:px-12 bg-primary text-background text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-sans font-black uppercase text-4xl md:text-5xl mb-4">Rep Your City.</h2>
          <p className="font-drama italic text-2xl text-background/70 mb-10">Because where you're from is worth wearing.</p>
          <Link
            to="/"
            className="btn-magnetic inline-flex bg-accent text-background rounded-full px-10 py-4 font-sans font-bold text-lg"
          >
            <div className="btn-magnetic-layer bg-white/20"></div>
            <span className="btn-text">Shop the Collection</span>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-text text-background pt-16 pb-8 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 border-t border-background/10 pt-8">
          <p className="font-data text-xs text-background/40">
            &copy; {new Date().getFullYear()} California Hat House. All rights reserved.
          </p>
          <Link to="/" className="font-sans text-sm text-background/60 hover:text-white transition-colors">
            Back to Home
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default AboutUs;
