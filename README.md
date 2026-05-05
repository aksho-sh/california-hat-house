# California Hat House

A cinematic e-commerce landing page for premium California-themed hats and embroidered baseball caps. Built as a high-fidelity, animation-heavy React site with full multi-page navigation.

Production: [californiahathouse.com](https://californiahathouse.com)

## Tech Stack

- **React 19** with JSX (no TypeScript)
- **Vite 8** for bundling and dev server (HMR)
- **Tailwind CSS v3.4** with PostCSS + Autoprefixer
- **GSAP 3** + ScrollTrigger for scroll-driven and entrance animations
- **React Router DOM v7** for client-side routing
- **Lucide React** for icons
- **Google Fonts**: Montserrat, Oswald, Space Mono

## Prerequisites

- **Node.js 20+** (Vite 8 requires Node 20.19+ or 22.12+)
- **npm 10+** (ships with Node 20)

Check your versions:

```bash
node --version
npm --version
```

If you need to manage multiple Node versions, [nvm](https://github.com/nvm-sh/nvm) is recommended:

```bash
nvm install 20
nvm use 20
```

## Getting Started

Clone the repo and install dependencies:

```bash
git clone <repo-url> california-hat-house
cd california-hat-house
npm install
```

Start the dev server:

```bash
npm run dev
```

The site will be available at `http://localhost:5173` with hot module reload.

## Available Scripts

| Command           | Description                                  |
| ----------------- | -------------------------------------------- |
| `npm run dev`     | Start Vite dev server with HMR               |
| `npm run build`   | Production build to `dist/`                  |
| `npm run preview` | Preview the production build locally         |
| `npm run lint`    | Run ESLint across the project                |

## Project Structure

```
california-hat-house/
├── public/                  # Static assets served as-is
├── src/
│   ├── App.jsx              # Landing page (Hero, Collections, ProductSlider, Philosophy, Footer)
│   ├── AboutUs.jsx          # About Us page
│   ├── Shop.jsx             # Shop All page with filter bar
│   ├── Collections.jsx      # Magazine-style collections index
│   ├── CityCollection.jsx   # Per-city collection (parametric route)
│   ├── ProductDetail.jsx    # Single product page
│   ├── Contact.jsx          # Contact form + FAQ
│   ├── NavBar.jsx           # Shared navbar component (morph + solid variants)
│   ├── main.jsx             # Entry point + React Router setup
│   ├── index.css            # Tailwind directives + custom utilities
│   └── App.css              # Legacy template styles (mostly unused)
├── index.html               # Root HTML, fonts, SVG noise overlay
├── tailwind.config.js       # Design tokens (colors, fonts)
├── postcss.config.js
├── eslint.config.js
├── vite.config.js
├── CLAUDE.md                # Guidance for Claude Code
├── GEMINI.md                # Component architecture spec
├── PRODUCTION_REFERENCE.md  # Snapshot of production catalog/copy
└── presets.md               # Aesthetic preset definitions
```

## Routes

| Path                       | Component        | Description                          |
| -------------------------- | ---------------- | ------------------------------------ |
| `/`                        | App              | Landing page                         |
| `/about`                   | AboutUs          | About / brand story                  |
| `/shop`                    | Shop             | Full catalog with filter bar         |
| `/collections`             | Collections      | All city collections, magazine view  |
| `/collections/:city`       | CityCollection   | Single-city collection page          |
| `/products/:handle`        | ProductDetail    | Single product page                  |
| `/contact`                 | Contact          | Contact form + FAQ                   |

Valid `:city` slugs: `los-angeles`, `san-francisco`, `san-diego`, `oakland`, `norcal`, `socal`.

## Design System

**Preset C — "Golden State Heritage"** (Coastal Streetwear):

| Token        | Value     | Use                       |
| ------------ | --------- | ------------------------- |
| `background` | `#F5F2EB` | Sand — page background    |
| `primary`    | `#0F3D4C` | Ocean — buttons, accents  |
| `accent`     | `#F26B38` | Sunset — hover, highlight |
| `text`       | `#222222` | Asphalt — body copy       |

| Font Family   | Family       | Use                         |
| ------------- | ------------ | --------------------------- |
| `font-sans`   | Montserrat   | Body, UI                    |
| `font-drama`  | Oswald       | Display, headings           |
| `font-data`   | Space Mono   | Numbers, captions, metadata |

All containers use `rounded-[2rem]` to `rounded-[3rem]` — no sharp corners.

## Animation Conventions

- All GSAP animations live inside `useLayoutEffect` + `gsap.context()`, returning `ctx.revert()` for cleanup.
- Default easing: `power3.out` for entrances, `power3.inOut` for clip-path reveals.
- Stagger: `0.08` for text, `0.12–0.15` for cards.
- Buttons use the magnetic hover pattern (`btn-magnetic` class) with a sliding background layer.

## Production Build

```bash
npm run build
npm run preview
```

The build outputs to `dist/`. Preview serves it at `http://localhost:4173`.

## Deployment

The site is a fully static SPA — `dist/` can be deployed to any static host (Vercel, Netlify, Cloudflare Pages, S3+CloudFront, GitHub Pages, etc.).

Make sure the host rewrites unknown routes to `index.html` so client-side routing works (e.g. Netlify `_redirects` or Vercel `rewrites`).

## Roadmap

- [ ] Wire up Shopify Storefront API for live product data
- [ ] Cart state + checkout flow
- [ ] Search backend integration
- [ ] Containerize (Dockerfile + compose) once a backend is added
- [ ] CI for lint + build on PRs

## License

Proprietary — California Hat House. All rights reserved.
