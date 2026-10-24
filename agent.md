# Togo Hybrid Travel Site

## Purpose

Coursework travel-tour booking site for Vietnam's coast, visually combining Togo Home 03, Home 06, Visa, and Home 08. Keep Togo's clean visual identity; adapt the Visa page's search/process patterns to tour booking only. Read `design.md` before changing a UI page.

## Source-of-truth design

- Use `design.md` as the canonical brief for tokens, layout, content, imagery, responsive rules, accessibility, and QA.
- Keep DM Sans body text, Jost section/UI headings, and Marcellus as a limited display accent; use Togo coral/orange, lime, white, and pale blue.
- Reuse local image and marine-art assets from `assets/`; use additional verified Togo media or openly licensed travel imagery saved locally.
- Do not reintroduce a different brand, alter the previous WEB1014 project, invent ratings/awards/years/discounts, or add Visa services/content.

## Required pages and behaviors

1. `index.html` — hybrid homepage, labelled destination/trip-style finder, manually controlled three-scene hero, dynamic tours, and interactions for the carousel, categories, sample notes, and FAQ.
2. `tours.html` — array/object-driven catalogue with search, category filter, sort, detail, and add-to-booking actions.
3. `tour.html` — selected tour details, photo gallery, data-backed highlights, day timeline, date/guest pricing, favourites, and booking action.
4. `booking.html` — four-step progress, editable trip rows, date/guest totals, remove/clear actions, and recommendations when empty.
5. `checkout.html` — four-step progress, validate contact details and a sample payment choice, show an editable order summary, then save a local demonstration booking.
6. `register.html` — validate name, email, phone, password length, and confirmation.
7. `login.html` — validate demo credentials and retain the local sign-in state.
8. `contact.html` — validate fields, count/limit message text, clear and confirm submission.
9. `about.html` — introduce Togo Travel's sample tour service and demo contact flow.
10. `search.html` — search/filter/sort sample tour data with an empty state.
11. `favorites.html` — add/remove/list saved tours.
12. `history.html` — display local booking ID, date, tour, guests, total, and status.
13. `success.html` — display the selected completed demo booking.

## Implementation rules

- Use semantic HTML, plain CSS, and vanilla JavaScript. Do not add a framework or build step.
- `tour-data.js` is the shared tour dataset (`COAST_TOURS`); `state.js` owns browser storage (localStorage for cart, bookings and accounts; sessionStorage for favorites); `js/shared.js` contains common helpers; `js/site.js` renders shared Togo chrome and handles global actions; `js/*.js` files own page features; `app.js` starts the correct feature from `data-page`; `style.css` contains shared tokens and responsive components.
- Keep the JavaScript at the level of the WEB1044 lectures: classic scripts loaded at the end of `<body>` (no `defer`), plain top-level `function` declarations and `const` values that share the global scope. No IIFE, namespace object, classes, modules, `async/await`, or browser APIs beyond DOM, events, timers, `location` and localStorage. Every top-level name must be unique across all scripts (a duplicate `function` silently replaces the earlier one). `Giai-thich-JS-Togo.docx` explains the code in Vietnamese; keep it in step with the code.
- Keep relative page links and query IDs working. Do not add real payment collection.
- Do not add individual passenger identity fields, card details, seat scarcity, discount claims, or unverified reviews. Checkout and totals remain a browser-only coursework demonstration.
- Preserve Togo's existing logo and locally copied assets; do not overwrite the earlier WEB1014 project.
- Keep visible focus, labelled inputs, inline validation, meaningful empty states, alt text, and reduced-motion behavior. The hero does not autoplay; Escape closes menus and returns focus to the menu trigger.
- Motion: hero entrance, heart pop / header count bump (`is-popping`, `is-bumping` in `site.js`) and the success checkmark draw are short, run once, and collapse to their final state under `prefers-reduced-motion`.
- Run `node --check` for `app.js`, `state.js`, `tour-data.js` and each file under `js/`, check for duplicate top-level names, then verify every page in a browser (served over a local web server) with no console errors after code changes.
