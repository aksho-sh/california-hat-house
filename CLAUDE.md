# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

California Hat House — a cinematic e-commerce landing page for premium California-themed hats and embroidered baseball caps. Built as a high-fidelity, animation-heavy single-page site with an About Us page.

## Source
The current production webpage is hosted at californiahathouse.com.

## Commands

- `npm run dev` — Start Vite dev server with HMR
- `npm run build` — Production build
- `npm run lint` — Run ESLint
- `npm run preview` — Preview production build

## Tech Stack

- **React 19** with JSX (no TypeScript)
- **Vite 8** for bundling
- **Tailwind CSS v3.4** with PostCSS + Autoprefixer
- **GSAP 3** with ScrollTrigger for all scroll-driven and entrance animations
- **React Router DOM v7** for client-side routing
- **Lucide React** for icons
- **Google Fonts**: Montserrat (sans), Oswald (drama/display), Space Mono (data/monospace)

## Architecture

### File Structure
- `src/App.jsx` — Main landing page with all components defined inline (Navbar, Hero, Collections, ProductSlider, Philosophy, Footer)
- `src/AboutUs.jsx` — Standalone About Us page with its own nav, hero, story sections, and footer
- `src/main.jsx` — Entry point with BrowserRouter; routes: `/` → App, `/about` → AboutUs
- `src/index.css` — Tailwind directives + custom utilities (`btn-magnetic`, `link-hover`, `ease-magnetic`, `fadeSlideUp` keyframe)
- `src/App.css` — Legacy Vite template styles (largely unused)
- `index.html` — Includes Google Fonts links, SVG noise filter overlay at 0.05 opacity, body classes

### Design System (from `tailwind.config.js`)
Preset C — "Golden State Heritage" (Coastal Streetwear):
- **Colors**: `background` (#F5F2EB Sand), `primary` (#0F3D4C Ocean), `accent` (#F26B38 Sunset), `text` (#222222 Asphalt)
- **Fonts**: `font-sans` (Montserrat), `font-drama` (Oswald), `font-data` (Space Mono)
- All containers use `rounded-[2rem]` to `rounded-[3rem]` — no sharp corners

### Animation Patterns
- All GSAP animations use `gsap.context()` inside `useLayoutEffect`, returning `ctx.revert()` for cleanup
- Default easing: `power3.out` for entrances, `power3.inOut` for clip-path reveals
- Stagger: `0.08` for text, `0.12–0.15` for cards
- Buttons use a "magnetic" hover pattern: `scale(1.03) translateY(-1px)` with sliding background layer (`btn-magnetic` class)

### Key Design Directives (from `GEMINI.md`)
- Every scroll should feel intentional, every animation weighted and professional
- Use real Unsplash URLs for images (matching preset's imageMood), never placeholder URLs
- Product images are served from `/assets/` (hero_cap_one.png, hero_cap_two.png, feature_cap_one.png, feature_cap_two.png, storefront_cap_one.png)
- Mobile-first responsive: stack cards vertically, reduce hero font sizes
- Global CSS noise overlay via inline SVG `<feTurbulence>` filter already in `index.html`

### Presets
`presets.md` contains aesthetic preset definitions (Organic Tech, Midnight Luxe, Golden State Heritage). The active preset is C — "Golden State Heritage". `GEMINI.md` contains the full component architecture spec and build instructions for the cinematic landing page pattern.
