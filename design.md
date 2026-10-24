# Togo travel booking design guide

## Context and goals

This coursework site presents sample coastal tours in Vietnam through the visual language of Togo Travel. Its core action is to help a traveller find a tour, choose a date and party size, review the booking, and complete a demo checkout. All displayed prices, accounts, reviews, and bookings are coursework sample data. Checkout does not collect or transmit payment details.

The design is a deliberate blend of four live Togo references, not a copy of one page:

| Reference | Patterns carried into this build |
|---|---|
| [Home 08](https://togo.uxper.co/home-08/) | Vinh Hy focus, sea-life illustrations, coastal introduction, photographic feature, destination carousel, FAQ, and photographic CTA/footer. |
| [Home 03](https://togo.uxper.co/home-03/) | Two-tier utility/navigation header, a destination-led hero, trip-finder affordance, trending tour cards, and travel-category browsing. |
| [Home 06](https://togo.uxper.co/home-06/) | A calmer beach-story hero, a reserved display-serif moment, wave-shaped section transition, travel editorial imagery, and “travel your way” treatment. |
| [Visa](https://togo.uxper.co/visa/) | A compact search bar, grouped offer cards, and a clear four-step process, adapted to tour booking rather than visa services. |

### Design thesis

**Plan an open-air coastal day in a few clear steps, then leave the rest of the page to the photographs.**

## Foundations and tokens

### Color roles

| Token | Value | Use |
|---|---|---|
| `--togo-text` | `#111111` | Main headings and text. |
| `--togo-body` | `#555555` | Body copy and secondary labels. |
| `--togo-white` | `#ffffff` | Main page and card surfaces. |
| `--togo-orange` | `#fd4621` | Togo brand accent, highlights, and artwork. |
| `--togo-action` | `#d63b1b` | Primary filled controls with white labels. It stays in the Togo orange family and clears text contrast. |
| `--togo-green` | `#85a42e` | Decorative accent and supporting illustration details. Do not use for small white-on-green text. |
| `--togo-focus` | `#526820` | Focus ring and state-carrying outline. |
| `--togo-light-blue` | `#f0f8ff` | Soft content panels. |
| `--togo-line` | `#e8e8e8` | Decorative dividers only. |

Contrast was checked with Tastemaker's contrast script. `#111111` on white is 18.88:1; `#555555` on white is 7.46:1; `#111111` on Togo orange is 5.46:1; white on the adjusted orange action fill `#d63b1b` is 4.67:1; `#526820` focus on white is 6.25:1. Original Togo orange `#fd4621` with white text is 3.46:1, so use a dark label on that fill or use `--togo-action` for a white-label CTA. Green `#85a42e` against white and pale hairlines are decorative only, not text/focus indicators.

### Typography

- **Body and navigation:** DM Sans, 16px base, 400 weight, 24px line height.
- **Section and UI headings:** Jost, medium weight, with reference-sized section headings around 34px.
- **Display accent:** Marcellus for the main photographic hero and at most one editorial quote. Keep other headings in Jost.
- **Tour names and small labels:** use Jost rather than introducing another family. The page stays within three font families.
- Headings use a responsive `clamp()` scale; long copy stays comfortably readable. Do not italicize display headings.

### Shape and spacing

- Primary actions: pill controls, approximately 24px radius and 11px × 24px padding.
- Search panels: rounded white surface, with clear input dividers and soft tinted shadow.
- Feature/tour images: approximately 20–30px corners where the Togo reference uses card framing.
- Spacing is based on a 4px step scale. Section gaps are generous and vary with the section's role; field and card gaps remain compact.
- Togo's coral, lime, pale-blue, and white treatment stays consistent across all routes.

## Page composition

### Home page

1. Togo utility strip and floating pill navigation.
2. Three manually controlled coastal hero scenes with a destination headline and compact search for destination/trip style.
3. Small reassurance row using tour facts, not invented statistics.
4. Home 08-style coastal introduction and four sea-life feature tiles.
5. Home 08-style destination carousel, followed by Home 03-style trending tour cards rendered from `tour-data.js`.
6. Visa-style four-step booking process: choose a tour, select date/guests, review, confirm.
7. Home 06-style editorial story using local coastal and reef photographs.
8. Coastal activity/category browsing, explicitly labelled sample traveller note, FAQ, and Togo photographic CTA/footer.

### Assignment pages

All 13 pages share the Togo header, dropdown navigation, color/type tokens, rounded forms, image treatment, and footer. Catalogue, search, detail, favourites, booking, checkout, registration, login, contact, about, history, and success retain their distinct task structures and states. Do not add visa services or make Visa offers appear as real products.

JavaScript is organized by feature in `js/`. Read `JS-GUIDE.md` for the file map, script order, and a student-level explanation of the shared object and browser APIs.

### Tour detail, booking, and checkout

- **Tour detail:** keep the coastal image gallery and a compact facts row near the title; surface three data-backed highlights before the day timeline; retain included items, suitability notes, and a sticky date/guest/price panel.
- **Booking cart:** show a four-step progress track, editable trip rows with date, adult/child counts and per-trip sample subtotals, plus an order summary. When the cart is empty, offer two data-backed coastal favourites as a useful starting point.
- **Checkout:** show the same progress track, the existing contact form, and only the sample payment choices. Keep an editable order summary with a link back to the booking page. With no trip selected, hide the checkout form and show a clear browse-tours state.
- Keep this coursework flow intentionally light: do not collect passenger identity documents or card details, or imply real payment, a held reservation, limited seats, live discounts, verified reviews, or service guarantees.

## Component rules

- **Header/navigation:** desktop utility strip, floating white pill navigation, Togo logo, Destinations and Pages menus, help contact link, wishlist and booking access. Menus support pointer hover, click, visible focus, Escape, and touch opening; Escape returns focus to the menu trigger. Mobile collapses into a labelled hamburger and single-column menu.
- **Hero:** one active destination photo from a manually controlled set of three scenes, headline, short subhead, primary action, and trip finder. Keep finder controls labelled and submit their supported destination/category values to `search.html`.
- **Tour cards:** real destination image, title, place, trip style/duration, sample price, one detail link, one add-to-booking action, and one accessible favourite toggle. Images have meaningful alt text; cards do not nest interactive elements inside links.
- **Journey progress:** use the same four-step track on tour detail, booking, and checkout. Mark the current step with both shape and text; completed steps remain links only when they lead to a useful previous page.
- **Booking rows and order summary:** keep the trip image, editable date/guest counts, sample subtotal, and remove action together. The checkout summary must include an edit-booking route and a clear empty state.
- **Booking process:** four numbered, labelled stages with current/complete state conveyed by text and shape as well as color. It must reflow to a vertical sequence on narrow screens.
- **Forms:** persistent labels, correct input type/autocomplete, inline errors, visible focus, disabled state where appropriate, and a live status for submit feedback. Never rely on placeholder text as a label.
- **Empty/error states:** explain what is missing and link back to a useful action. Search with zero results and empty booking/favourites/history must remain composed.
- **Motion:** short Togo-like fades/slides for feedback and image transitions only. Hero scenes advance only when the traveller uses the previous/next controls; there is no autoplay. Scroll reveals and carousels respect `prefers-reduced-motion`; do not add motion to core form controls.

## Accessibility acceptance criteria

- WCAG 2.2 AA contrast for body text, buttons, links, errors, and focus. The orange/white and lime/white exceptions above are not used for normal-size text.
- Every action is a native link or button and works with keyboard and touch.
- Menus expose `aria-expanded`, close with Escape, and remain operable without hover.
- Forms associate errors with their fields, focus the first invalid field on submit, and announce status changes through a live region.
- Images set width/height or a reserved aspect ratio; meaningful images have alt text and decorative marine artwork has empty alt text.
- No horizontal overflow at 320px, 390px, 768px, 1024px, and 1440px. Touch targets remain at least 44px for primary interactions.
- Reduced-motion preferences disable reveal movement and smooth scrolling while preserving manual controls and state feedback. The hero never autoplays.

## Asset plan and source notes

The local `assets/` directory contains the Togo logo and illustration set, the existing Togo destination photographs, and locally saved reference imagery selected after checking the supplied pages: `home03-adventure-hero.webp`, `home06-beach-story.webp`, `home06-island-category.webp`, and `togo-wave-divider.svg`. The Home 03 image source returned HTTP 200 at `https://togo.uxper.co/wp-content/uploads/2025/04/rectangle_2880-3.webp`; the Home 06 images were saved from its public media URLs. Keep new images local where practical for a portable submission.

More matching photographs may be sourced from the Togo reference pages or from openly licensed photo sources. Verify each image loads and its reuse terms before including it. Credit the source in code/docs, not as a visible overlay. Do not invent team/member/customer proof or quantitative claims.

## Copy and prohibited patterns

- Use concise, travel-specific labels and clear actions such as “Find a trip,” “Choose a date,” and “Continue to checkout.”
- Label illustrative prices/content as samples; do not imply live availability, scarcity, discounts, awards, ratings, verified reviews, service guarantees, or company metrics.
- Do not request passport/ID data or card details in the coursework checkout; the sample payment choice is only a flow demonstration.
- No purple gradients, new fictional brand, generic unrelated stock photos, or Visa application content.
- Avoid duplicate CTA intent, unlabeled fields, dead `#` links, emoji in place of controls, or cards that imitate an interaction without working.

## QA checklist

- [ ] Homepage sequence, manual hero controls, destination finder, tour cards, and all shared Togo assets render correctly.
- [ ] Tour detail, booking cart, checkout, empty states, and the tour-to-booking-to-checkout-to-success-to-history journey render correctly.
- [ ] Search, category filter, sorting, favourites, account forms, contact counter, FAQ/tabs, and mobile navigation work.
- [ ] `node --test state.test.js`, `node --check app.js`, `node --check state.js`, and `node --check tour-data.js` pass.
- [ ] Browser console and failed image requests are clear at desktop and mobile sizes.
