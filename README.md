# Portfolio Website

A modern, responsive single-page portfolio website built with plain **HTML, CSS, and JavaScript** — no frameworks or build tools required.

## Features

- Dark theme with neon/gradient accents
- Fully responsive (desktop, tablet, mobile with hamburger menu)
- Sticky navbar with active-link highlighting on scroll
- Typing text effect in the hero section
- Scroll-reveal animations & animated stat counters
- Projects showcase grid with tech tags
- Contact form with client-side validation (front-end only)
- Back-to-top button

## How to Run

Just open `index.html` in your browser — that's it.

For a local dev server (optional):

```bash
# Using Python
python -m http.server 5500

# Or using Node
npx serve .
```

Then visit `http://localhost:5500`.

## How to Customize

| What | Where |
|------|-------|
| Name / roles typed in hero | `index.html` hero section + `roles` array in `script.js` |
| About text & stats | `index.html` — "About" section |
| Skills | `index.html` — "Skills" section |
| Projects | `index.html` — "Projects" section (edit titles, descriptions, tech tags, links) |
| Contact details | `index.html` — "Contact" section |
| Colors / theme | CSS variables at the top of `style.css` (`--accent-1`, `--accent-2`, etc.) |
| Project thumbnails | Replace `.project-thumb` gradients in `style.css` with real images |

## Connecting the Contact Form

The form currently simulates a successful submission. To actually receive emails, you can wire it up with a free service like [Formspree](https://formspree.io) or [Web3Forms](https://web3forms.com) — just point the `<form>` action at their endpoint and remove the simulated submit handler in `script.js`.

## Deploying

This site can be deployed for free on:

- **GitHub Pages** – push the folder to a repo, enable Pages in settings
- **Netlify / Vercel** – drag & drop the folder, done
- **Cloudflare Pages** – connect a repo
