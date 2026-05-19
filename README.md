# Ecofriends Trading OÜ — corporate website

A single-page corporate website for **Ecofriends Trading OÜ**, a fully online
digital studio registered in Tallinn (Estonia) and delivering web development,
e-commerce, design and technical support across the EU.

Built as a static site — no build step, no dependencies. Open `index.html`
in any modern browser, or drop the whole folder onto any static host
(Netlify, Vercel, GitHub Pages, S3, your own nginx, etc).

## Structure

```
ecofriends-trading/
├── index.html              # All page markup
├── README.md
└── assets/
    ├── css/
    │   └── styles.css      # Full design system (dark editorial theme)
    ├── js/
    │   └── main.js         # Nav, scroll progress, reveal, FAQ, form
    └── img/
        └── favicon.svg
```

## Sections

1. **Hero** — tagline, primary CTAs, trust bullets
2. **Trust strip** — quick credibility numbers
3. **About** — who we are
4. **Services** — six numbered service cards
5. **Approach** — four guiding principles
6. **Process** — discovery → design → build → launch & care
7. **Mission band** — quote
8. **FAQ** — six expandable questions
9. **Contact** — company info + form (mailto fallback)
10. **Footer** — legal info, sitemap, address

## Company details (already filled in)

- Legal name: **Ecofriends Trading OÜ**
- Registry code: **16122372**
- VAT number: **EE102487026**
- Registered address: Kadaka tee 7, Mustamäe linnaosa, 12915 Tallinn, Harju maakond, Estonia
- Email: **ecofriendstrading@mail.ee**
- Delivery model: **online only**, EU-wide remote

To update any of these later, search the repo for the value and replace it —
they only appear in `index.html`.

## Local preview

Just double-click `index.html`, or run any static server, e.g.:

```bash
# Python 3
python -m http.server 8080
# then open http://localhost:8080
```

## Design notes

- **Palette** — deep forest-green surfaces (`#0a1c16` → `#194036`) with a sage
  mint accent (`#9fe3b8`) and cream type (`#f3ecdb`).
- **Typography** — *Fraunces* (editorial serif) for headlines, *Inter* for UI
  and body. Both loaded from Google Fonts.
- **Motion** — `IntersectionObserver`-driven reveal-on-scroll, with full
  `prefers-reduced-motion` support.
- **Accessibility** — semantic landmarks, focus-visible styles via the
  browser default, keyboard-operable accordion (`<details>`), labelled form
  fields.
- **Performance** — no JS framework, ~12 KB JS, ~14 KB CSS, only one external
  request (fonts).

## Contact form

The form does NOT submit to a server. It opens the visitor's email client
pre-filled with their message to `ecofriendstrading@mail.ee`. If you'd like a
real backend (Formspree, Resend, custom webhook, etc.), wire it into the
`submit` handler in `assets/js/main.js`.
