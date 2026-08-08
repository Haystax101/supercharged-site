# Supercharged — marketing site

Landing site for [Supercharged](https://superchargedai.app), the agentic outreach
tool for students recruiting into finance, trading and consulting.

React 19 + Vite 7, plain CSS (no framework), Framer Motion for animation,
React Router for the About / Manifesto / legal routes.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
```

```bash
npm run build    # -> dist/ (also writes 404.html for SPA deep links)
npm run preview  # serve the production build locally
npm run lint
```

## Environment

Copy `.env.example` to `.env.local` and fill in what you have. **Every variable
is optional** — without them the site renders fine, the waitlist just stops
reading/writing and analytics stays off.

Anything prefixed `VITE_` is inlined into the public JS bundle at build time, so
only publishable/anon keys belong here.

## Deploying

Pushing to `main` builds and publishes to GitHub Pages via
`.github/workflows/deploy.yml`. Secrets are read from the repository's Actions
secrets; see that workflow for the names.

`vite.config.js` reads `BASE_PATH` so the build works both at a project-page
subpath (`/<repo>/`, what the workflow sets) and at a domain root (leave unset).

## Layout

```
src/
  App.jsx                 routes + waitlist count
  pages/Home.jsx          landing page composition
  components/
    Hero.jsx              nav, headline rotator, product mockup
    ProblemSection.jsx    the old way vs Supercharged
    Features.jsx          Discover / Outreach overview
    Discover.jsx          deep dive: natural-language people search
    Inbox.jsx             deep dive: outreach drafting + tracking
    Privacy.jsx           data-handling cards
    WaitlistFlow.jsx      multi-step waitlist modal
    AppMock.jsx           product-UI pieces shared by the mockups
  lib/appMockData.js      compat dimensions + pipeline stages
  index.css               the whole design system
```

`AppMock.jsx` and `lib/appMockData.js` mirror components and values from the
product app (`supercharged-app`) so the marketing mockups stay faithful to it —
score-ring colour thresholds, avatar gradients, pipeline stage colours, and the
five compatibility dimensions are copied, not approximated.
