import { useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowLeft,
  Mail,
  MapPin,
  Clock,
  Send,
  ChevronDown,
  Camera as Instagram,
  Globe as Facebook,
  Music,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// ------------------------------------------------------------------
// FAQ DATA
// ------------------------------------------------------------------
const FAQ_ITEMS = [
  {
    q: 'How long does shipping take?',
    a: 'Standard domestic shipping takes 5–8 business days. We ship Monday through Friday from the Bay Area. Expedited options are available at checkout. Once your hat leaves the garage, you\'ll get a tracking link via email.',
  },
  {
    q: 'What\'s your return policy?',
    a: 'We stand behind every stitch. If something isn\'t right, reach out within 30 days of delivery. Unworn hats in original condition ship back on us. Custom embroidery orders are final — you designed it, you own it.',
  },
  {
    q: 'Do you do custom embroidery?',
    a: 'Yes, and we love it. Minimum order is 12 units for custom runs. Hit us at wholesale@californiahathouse.com with your logo, colorway, and timeline. We\'ll tell you straight whether it\'s doable.',
  },
  {
    q: 'Where are the hats made?',
    a: 'Blanks are sourced from trusted North American and global suppliers we\'ve tested obsessively. Embroidery and finishing happen here, in California. We don\'t hand anything to a stranger we haven\'t shaken hands with.',
  },
  {
    q: 'Wholesale inquiries?',
    a: 'If you run a shop, a boutique, a concept store, or even a very well-organized flea market stall — we want to hear about it. Email wholesale@californiahathouse.com and tell us the story. We read everything.',
  },
];

// ------------------------------------------------------------------
// CONTACT PAGE
// ------------------------------------------------------------------
const Contact = () => {
  // Refs for animation targets
  const heroRef = useRef(null);
  const formSectionRef = useRef(null);
  const faqRef = useRef(null);
  const socialRef = useRef(null);

  // Form state
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: 'General',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  // FAQ open index
  const [openFaq, setOpenFaq] = useState(null);

  // ------------------------------------------------------------------
  // ANIMATIONS
  // ------------------------------------------------------------------
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Hero entrance — stagger fade-up
      gsap.fromTo(
        '.contact-hero-anim',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.08, ease: 'power3.out', delay: 0.2 }
      );

      // Form + info cards — parallel ScrollTrigger reveal
      gsap.fromTo(
        '.contact-form-anim',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: formSectionRef.current, start: 'top 72%' },
        }
      );

      gsap.fromTo(
        '.info-card',
        { y: 50, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: formSectionRef.current, start: 'top 72%' },
        }
      );

      // FAQ items stagger in
      gsap.fromTo(
        '.faq-item',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: faqRef.current, start: 'top 75%' },
        }
      );

      // Social strip
      gsap.fromTo(
        '.social-anim',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: socialRef.current, start: 'top 78%' },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  // ------------------------------------------------------------------
  // HANDLERS
  // ------------------------------------------------------------------
  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const toggleFaq = (index) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  // ------------------------------------------------------------------
  // SHARED INPUT CLASSES
  // ------------------------------------------------------------------
  const inputClass =
    'w-full rounded-2xl bg-background border border-text/10 focus:border-accent focus:outline-none transition-colors duration-300 px-5 py-4 font-sans text-text placeholder:text-text/40 text-sm';

  // ------------------------------------------------------------------
  // RENDER
  // ------------------------------------------------------------------
  return (
    <div className="bg-background min-h-screen text-text">
      {/* ============================================================
          STICKY NAVBAR
      ============================================================ */}
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <div className="pointer-events-auto w-full max-w-5xl flex justify-between items-center px-6 py-4 rounded-full bg-background/80 backdrop-blur-xl border border-text/10 shadow-lg">
          <Link to="/" className="font-drama font-bold text-xl tracking-wider text-text">
            CALIFORNIA HAT HOUSE
          </Link>

          <nav className="hidden md:flex items-center gap-8 font-sans text-sm font-semibold text-text/70">
            <Link to="/" className="link-hover hover:text-accent transition-colors">
              Home
            </Link>
            <Link to="/shop" className="link-hover hover:text-accent transition-colors">
              Shop
            </Link>
            <Link to="/about" className="link-hover hover:text-accent transition-colors">
              About
            </Link>
          </nav>

          <Link
            to="/"
            className="flex items-center gap-2 font-sans text-sm font-semibold text-text hover:text-accent transition-colors link-hover"
          >
            <ArrowLeft size={16} /> Back to Home
          </Link>
        </div>
      </div>

      {/* ============================================================
          HERO
      ============================================================ */}
      <section
        ref={heroRef}
        className="relative pt-40 pb-24 px-6 md:px-12 bg-text text-background overflow-hidden"
      >
        {/* Background image overlay — luminosity, low opacity */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: 'url("/assets/feature_cap_one.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            mixBlendMode: 'luminosity',
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto">
          <p className="contact-hero-anim font-data text-accent text-sm uppercase tracking-widest mb-6">
            Get in touch
          </p>
          <h1 className="contact-hero-anim font-sans font-black uppercase text-5xl md:text-7xl lg:text-8xl leading-[0.9] mb-6">
            Drop us
            <br />
            a line.
          </h1>
          <p className="contact-hero-anim font-drama italic text-accent text-2xl md:text-3xl mb-4">
            We read everything.
          </p>
          <p className="contact-hero-anim font-sans text-background/60 text-lg md:text-xl max-w-xl leading-relaxed">
            Questions, wholesale, press, or just want to talk hats — land in our inbox and
            we'll get back to you, usually within 48 hours.
          </p>
        </div>
      </section>

      {/* ============================================================
          FORM + INFO CARDS — two-column
      ============================================================ */}
      <section
        ref={formSectionRef}
        className="py-24 px-6 md:px-12 bg-background"
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 lg:gap-16 items-start">
          {/* ---- LEFT: Contact Form ---- */}
          <div className="contact-form-anim">
            {submitted ? (
              /* Success state */
              <div className="rounded-[2rem] bg-primary text-background p-12 md:p-16 flex flex-col gap-6 min-h-[400px] justify-center">
                <Send size={40} className="text-accent" />
                <h2 className="font-sans font-black uppercase text-3xl md:text-4xl">
                  Message sent.
                </h2>
                <p className="font-sans text-background/70 text-lg leading-relaxed max-w-sm">
                  We'll get back to you within 48h. We read everything — yours included.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: '', email: '', subject: 'General', message: '' });
                  }}
                  className="btn-magnetic mt-4 bg-accent text-background rounded-full px-8 py-4 font-sans font-bold text-sm w-max"
                >
                  <div className="btn-magnetic-layer bg-white/20" />
                  <span className="btn-text">Send another</span>
                </button>
              </div>
            ) : (
              /* Form */
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <h2 className="font-sans font-black uppercase text-2xl text-primary mb-2">
                  Send a message
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="font-data text-xs text-text/50 uppercase tracking-widest">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      className={inputClass}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-data text-xs text-text/50 uppercase tracking-widest">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="you@email.com"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-data text-xs text-text/50 uppercase tracking-widest">
                    Subject
                  </label>
                  <select
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className={inputClass + ' appearance-none cursor-pointer'}
                  >
                    <option value="General">General</option>
                    <option value="Order Help">Order Help</option>
                    <option value="Wholesale">Wholesale</option>
                    <option value="Press">Press</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-data text-xs text-text/50 uppercase tracking-widest">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={7}
                    placeholder="Tell us what's on your mind."
                    className={inputClass + ' resize-none'}
                  />
                </div>

                <button
                  type="submit"
                  className="btn-magnetic bg-accent text-background rounded-full px-10 py-4 font-sans font-bold text-base w-max mt-2"
                >
                  <div className="btn-magnetic-layer bg-primary" />
                  <span className="btn-text flex items-center gap-2">
                    Send it <Send size={16} />
                  </span>
                </button>
              </form>
            )}
          </div>

          {/* ---- RIGHT: Info Card Stack ---- */}
          <div className="flex flex-col gap-6">
            {/* Card 1 — Customer Care */}
            <div className="info-card rounded-[2rem] bg-primary text-background p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                  <Mail size={18} className="text-accent" />
                </div>
                <span className="font-data text-xs text-background/50 uppercase tracking-widest">
                  Customer Care
                </span>
              </div>
              <h3 className="font-sans font-black uppercase text-lg mb-2">Need help with an order?</h3>
              <a
                href="mailto:support@californiahathouse.com"
                className="font-sans text-accent hover:text-white transition-colors text-sm break-all"
              >
                support@californiahathouse.com
              </a>
              <div className="flex items-center gap-2 mt-4">
                <Clock size={14} className="text-background/40" />
                <span className="font-data text-xs text-background/50 uppercase tracking-wider">
                  Mon–Fri · 9a–5p PT
                </span>
              </div>
            </div>

            {/* Card 2 — Wholesale & Press */}
            <div className="info-card rounded-[2rem] bg-text/5 border border-text/10 p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <Send size={18} className="text-accent" />
                </div>
                <span className="font-data text-xs text-text/40 uppercase tracking-widest">
                  Wholesale &amp; Press
                </span>
              </div>
              <h3 className="font-sans font-black uppercase text-lg text-primary mb-2">
                Let's work together.
              </h3>
              <a
                href="mailto:wholesale@californiahathouse.com"
                className="font-sans text-accent hover:text-primary transition-colors text-sm break-all"
              >
                wholesale@californiahathouse.com
              </a>
              <p className="font-sans text-text/60 text-sm mt-4 leading-relaxed">
                Tell us about the shop, the magazine, the project. We'll take it from there.
              </p>
            </div>

            {/* Card 3 — HQ */}
            <div className="info-card rounded-[2rem] bg-text/5 border border-text/10 p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <MapPin size={18} className="text-accent" />
                </div>
                <span className="font-data text-xs text-text/40 uppercase tracking-widest">HQ</span>
              </div>
              <h3 className="font-sans font-black uppercase text-lg text-primary mb-2">
                Bay Area, California
              </h3>
              <p className="font-sans text-text/60 text-sm leading-relaxed">
                No retail. Just a garage and a lot of thread.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          FAQ ACCORDION
      ============================================================ */}
      <section ref={faqRef} className="py-24 px-6 md:px-12 bg-text text-background">
        <div className="max-w-4xl mx-auto">
          <p className="font-data text-accent text-sm uppercase tracking-widest mb-4">
            Frequently asked
          </p>
          <h2 className="font-sans font-black uppercase text-4xl md:text-5xl mb-16">
            Got questions?<br />
            <span className="font-drama italic text-accent">We've got answers.</span>
          </h2>

          <div className="flex flex-col divide-y divide-background/10">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={index} className="faq-item">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between gap-6 py-7 text-left group"
                    aria-expanded={isOpen}
                  >
                    <span className="font-sans font-bold text-lg group-hover:text-accent transition-colors duration-300">
                      {item.q}
                    </span>
                    <ChevronDown
                      size={22}
                      className={`shrink-0 text-accent transition-transform duration-400 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
                        isOpen ? 'rotate-180' : 'rotate-0'
                      }`}
                    />
                  </button>

                  {/* Smooth max-height transition */}
                  <div
                    className="overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
                    style={{ maxHeight: isOpen ? '400px' : '0px' }}
                  >
                    <p className="font-sans text-background/60 text-base leading-relaxed pb-8 pr-10">
                      {item.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================
          SOCIAL CONNECT STRIP
      ============================================================ */}
      <section ref={socialRef} className="py-24 px-6 md:px-12 bg-background">
        <div className="max-w-5xl mx-auto">
          <div className="social-anim mb-4">
            <span className="font-data text-xs text-text/40 uppercase tracking-widest">
              Follow along
            </span>
          </div>
          <h2 className="social-anim font-sans font-black uppercase text-4xl md:text-5xl text-primary mb-14">
            Catch us <span className="font-drama italic text-accent">elsewhere.</span>
          </h2>

          <div className="flex flex-col sm:flex-row gap-5">
            {/* Instagram */}
            <a
              href="https://instagram.com/californiahathouse"
              target="_blank"
              rel="noopener noreferrer"
              className="social-anim btn-magnetic group flex-1 bg-text text-background rounded-[2rem] px-8 py-8 flex items-center gap-5 hover:bg-accent transition-colors duration-300"
            >
              <div className="btn-magnetic-layer bg-accent" />
              <Instagram size={28} className="relative z-10 shrink-0" />
              <div className="relative z-10">
                <p className="font-sans font-black uppercase text-xl tracking-tight">Instagram</p>
                <p className="font-data text-xs text-background/50 uppercase tracking-widest mt-0.5">
                  @californiahathouse
                </p>
              </div>
            </a>

            {/* TikTok */}
            <a
              href="https://tiktok.com/@californiahathouse"
              target="_blank"
              rel="noopener noreferrer"
              className="social-anim btn-magnetic group flex-1 bg-text text-background rounded-[2rem] px-8 py-8 flex items-center gap-5"
            >
              <div className="btn-magnetic-layer bg-accent" />
              <Music size={28} className="relative z-10 shrink-0" />
              <div className="relative z-10">
                <p className="font-sans font-black uppercase text-xl tracking-tight">TikTok</p>
                <p className="font-data text-xs text-background/50 uppercase tracking-widest mt-0.5">
                  @californiahathouse
                </p>
              </div>
            </a>

            {/* Facebook */}
            <a
              href="https://facebook.com/californiahathouse"
              target="_blank"
              rel="noopener noreferrer"
              className="social-anim btn-magnetic group flex-1 bg-text text-background rounded-[2rem] px-8 py-8 flex items-center gap-5"
            >
              <div className="btn-magnetic-layer bg-accent" />
              <Facebook size={28} className="relative z-10 shrink-0" />
              <div className="relative z-10">
                <p className="font-sans font-black uppercase text-xl tracking-tight">Facebook</p>
                <p className="font-data text-xs text-background/50 uppercase tracking-widest mt-0.5">
                  California Hat House
                </p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* ============================================================
          FOOTER — matching App.jsx Footer
      ============================================================ */}
      <footer className="bg-primary text-background pt-24 pb-12 px-6 md:px-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="md:col-span-2">
              <h2 className="font-sans font-black uppercase text-4xl mb-4">
                California <br />Hat House
              </h2>
              <p className="font-sans text-background/60 max-w-sm">
                Premium California themed hats and embroidered baseball caps celebrating the
                Golden State.
              </p>
            </div>
            <div>
              <h4 className="font-sans font-bold uppercase text-accent mb-6">Collections</h4>
              <ul className="space-y-3 font-sans text-sm text-background/80">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Los Angeles
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    San Francisco
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    San Diego
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Oakland
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-sans font-bold uppercase text-accent mb-6">Connect</h4>
              <ul className="space-y-3 font-sans text-sm text-background/80">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Login / Account
                  </a>
                </li>
                <li>
                  <Link to="/about" className="hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Instagram
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
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
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

export default Contact;
