# Functional Specification

## Project Overview

The website is a redesigned static public website for POUZ, Pucko otvoreno uciliste Zagreb. Its purpose is to help visitors quickly understand the institution, discover available education and cultural programs, learn about HZZ vouchers, follow news and blog content, contact the organization, and browse webshop items.

The current implementation is a front-end prototype made of standalone HTML pages, a shared stylesheet, a shared JavaScript file, and a logo asset. It does not include a backend, CMS, payment processing, user accounts, or persistent form submission.

## Primary Goals

- Present POUZ as a clear, approachable institution focused on lifelong learning, culture, publishing, and projects.
- Split major user needs into dedicated pages instead of relying on a long single-page layout.
- Give visitors fast routes to active programs, HZZ voucher information, contact details, news, and webshop items.
- Provide a responsive navigation system that works on desktop and mobile.
- Demonstrate key interactions such as program filtering, menu toggling, active navigation states, demo form feedback, cart behavior, and restrained micro animations.

## Target Users

- Prospective adult learners looking for education or training programs.
- Visitors interested in creative workshops, culture, publishing, or programs for the third age.
- Users researching HZZ voucher eligibility and application steps.
- Existing participants looking for updates, dates, and institutional information.
- Buyers interested in POUZ publications, the magazine "15 dana", calendars, or related materials.
- Partners, media, and institutions looking for organizational information, projects, or contacts.

## Site Map

The website contains the following pages:

- `index.html`: homepage and high-level entry point.
- `programi.html`: searchable and filterable program overview.
- `vauceri.html`: HZZ voucher explanation and application flow.
- `o-ucilistu.html`: institutional overview, documents, projects, and Erasmus+ information.
- `novosti.html`: news listing with dated updates and categories.
- `blog.html`: editorial article listing with sidebar categories and archive links.
- `kontakt.html`: contact details, department overview, inquiry form, and embedded map.
- `webshop.html`: simulated webshop listing for publications, materials, programs, and workshops.
- `proizvod.html`: one-product detail page for Casopis 15 dana.
- `kosarica.html`: simulated cart review and checkout page.

## Global Layout And Navigation

Every main page uses a shared header with:

- POUZ logo and institution name linking to the homepage.
- Primary navigation links for Homepage, Programi, Vauceri, O ucilistu, Novosti, Kontakt, and Webshop.
- Dropdown submenus that expose important page sections and related links.
- A highlighted Webshop navigation call-to-action.
- HR and EN language links. HR points to the current page; EN is currently a placeholder.
- A mobile menu toggle controlled by JavaScript.
- A skip link that allows keyboard users to jump directly to main content.

The navigation script marks the current page as active. When the user is on `blog.html`, the Novosti navigation item is treated as active because blog content belongs to the news/content area.

Selected pages can also include a shared promotional banner directly below the header. The current banner announces a demo 15 EUR discount for new users and appears on the homepage, Programi page, and Webshop page.

## Homepage Requirements

The homepage must act as a routing and orientation page for the whole website.

Functional content:

- Promotional banner for a demo new-user discount.
- Hero section introducing education, culture, and community.
- Primary calls to action:
  - Find a program.
  - View HZZ voucher information.
  - Send an inquiry.
- Quick action links for active programs, vouchers, workshops, and webshop.
- Featured information cards for Programi, Vauceri, and Novosti.
- Testimonials section with three static learner quotes.
- Newsletter sign-up form.
- Full footer with address, quick links, social links, and document/privacy link.

Current behavior:

- Newsletter submission is intercepted by JavaScript.
- Invalid email input triggers browser validity handling and a demo error/status message.
- Successful submission resets the form and displays a demo confirmation message.

## Programi Page Requirements

The Programi page must help users discover and narrow programs.

Functional content:

- Page hero explaining the program section.
- Program filters:
  - Text search.
  - Category selector.
  - Status selector.
- Program card grid.
- Program category overview.

Current program cards:

- Srednja skola.
- Administrativni poslovi, marked as an HZZ voucher-compatible education program.
- Keramika i rad s glinom.
- Sveuciliste za trecu zivotnu dob.

Current categories:

- Obrazovanje.
- Radionice.
- Kultura.
- Treca dob.
- Vauceri.

Current statuses:

- Upisi otvoreni.
- Uskoro.

Current behavior:

- Search checks the visible text of each program card.
- Category filtering uses each card's `data-category` values.
- Status filtering uses each card's `data-status` value.
- Cards that do not match are hidden.
- Matching cards replay a short staggered entrance animation after filters are applied.
- If no cards match the active filters, an empty-state message appears.
- The empty-state message uses the same restrained filter feedback animation.

## Vauceri Page Requirements

The Vauceri page must serve users who are specifically looking for HZZ voucher information.

Functional content:

- Dedicated red hero section for HZZ vouchers.
- Explanation of the application route.
- Ordered application steps:
  - Choose a voucher-supported program.
  - Check conditions and documentation.
  - Submit an application or inquiry.
  - Track status and enrollment deadlines.
- Primary call to action leading to the Contact page.
- FAQ area using native expandable `details` elements.

Expected user outcome:

- The user understands what to do next and can continue to program discovery or contact.

## O Ucilistu Page Requirements

The O ucilistu page must move institutional content out of the homepage and into a focused section.

Functional content:

- Institutional hero.
- Overview of POUZ activities in adult education, culture, publishing, and international projects.
- Key stats such as years of experience, active programs, and yearly participants.
- Institutional link cards for:
  - Documents.
  - Projects.
  - Erasmus+.
  - Organization.

Expected user outcome:

- The visitor can understand the institution and find document/project-related entry points.

## Novosti Page Requirements

The Novosti page must provide a dedicated location for updates and dated announcements.

Functional content:

- News hero.
- News listing with category tags, dates, titles, and summaries.
- Section anchors for content categories such as Obrazovanje, Erasmus+, and Projekti.
- Linkage to the Blog page through the global navigation submenu.

Current news items:

- Upisi u nove programe su otvoreni.
- Novi Erasmus+ projekt i fokus grupa.
- Superstudio, umjetnost i nove aktivnosti.

## Blog Page Requirements

The Blog page must support longer editorial content connected to POUZ themes.

Functional content:

- Blog hero.
- List of article-style blog posts with images, category tags, dates, titles, and article body text.
- Sidebar for categories and archive months.
- Links from sidebar categories back to relevant sections of Novosti or Programi.

Current limitation:

- Blog posts use placeholder body copy and are static. There is no individual article detail route or CMS.

## Kontakt Page Requirements

The Kontakt page must provide contact information and a simple inquiry path.

Functional content:

- Contact hero.
- General contact card with address, email, and working hours.
- Department overview.
- Inquiry form with required name, email, and message fields.
- Embedded Google Map for the POUZ location.

Current behavior:

- Form submission is intercepted by JavaScript.
- Invalid forms display a demo error/status message.
- Valid forms reset and show a demo confirmation message.
- No message is sent to an email address or server in the current implementation.

## Webshop Page Requirements

The Webshop area must simulate a functional purchase flow while remaining a static front-end prototype.

Functional content:

- Dedicated red hero section on `webshop.html`.
- Product groups for physical products and programs/workshops.
- Product cards with image, category tag, title, description, price, and add-to-cart button.
- One detailed product page, `proizvod.html`, for Casopis 15 dana.
- Shared cart badge in the header on all pages.
- `kosarica.html` for cart review, quantity changes, item removal, checkout fields, totals, and demo confirmation.

Current physical products:

- Casopis 15 dana, 12.00 EUR.
- Biblioteka Majstori, 18.00 EUR.
- Kalendar POUZ, 9.00 EUR.

Current program/workshop products:

- Engleski jezik (online), 120.00 EUR.
- Keramicka radionica, 65.00 EUR.
- Vodoinstalatersko osposobljavanje, 490.00 EUR.

Current cart and checkout behavior:

- Cart state is stored in browser `localStorage` under `pouzCartV1`.
- Physical products support quantity changes and checkout fulfillment by pickup or delivery.
- Delivery address fields appear only when delivery is selected for physical products.
- Program/workshop products are fixed to one participant per cart line.
- Program/workshop checkout shows participant fields and product-specific optional fields.
- Checkout validates required fields, clears the cart on success, and displays a demo confirmation number.

Current limitation:

- The webshop is a clickable simulation. It does not include real payment, backend order submission, stock management, shipping integration, tax calculation, accounts, or email notifications.

## Shared Interactions

### Active Navigation

The JavaScript identifies the current filename from the URL and applies the active state to the matching primary navigation item. `blog.html` maps to the Novosti navigation item. `proizvod.html` and `kosarica.html` map to the Webshop navigation item.

### Cart Simulation

The JavaScript manages the static webshop cart:

- Add-to-cart buttons update `localStorage`, pulse the shared cart badge, and briefly confirm the button action.
- Cart quantities, removals, totals, delivery visibility, and participant fields are rendered on `kosarica.html`.
- The checkout form is excluded from the generic demo form handler and uses a custom submit handler.
- A successful checkout displays an animated demo-only confirmation message and removes cart data from `localStorage`.

### Mobile Navigation

The mobile menu toggle:

- Adds or removes the `nav-open` class on the header.
- Updates `aria-expanded` on the toggle button.
- Closes the navigation when the user clicks outside the header.
- Closes the navigation when the Escape key is pressed.
- Closes the navigation after selecting a primary navigation link.

### Language Toggle

The HR language link updates to the current page URL. Placeholder language links with `href="#"` are prevented from navigating.

### Forms

All forms are demo-only:

- Submit events are prevented.
- Required fields and email format are validated through browser form validity.
- Demo status messages are displayed in each form's `.form-message` element.
- Successful submission resets the form.
- Demo status messages reveal with a short motion treatment when motion is allowed.

### Micro Animations

The shared CSS and JavaScript provide a restrained motion layer:

- Hover and focus transitions for navigation links, buttons, cards, form controls, FAQ rows, cart rows, product cards, blog cards, news cards, and testimonial cards.
- Scroll-triggered reveal animations for heroes, sections, headings, repeated cards, forms, cart panels, and newsletter areas.
- Staggered reveal timing for repeated content, capped to avoid slow or distracting page entry.
- Program filter animations for matching cards and the empty-results message.
- Cart badge pulse, add-to-cart confirmation, and form/checkout message reveal effects.
- No looping decorative animation, parallax, or motion that blocks reading.

## Accessibility Requirements

Implemented accessibility features include:

- Semantic HTML structure with header, navigation, main content, sections, articles, aside, and footer.
- Skip link to main content.
- `aria-label` values for navigation and grouped areas.
- `aria-current` on active navigation items.
- `aria-expanded` and `aria-controls` on the mobile menu button.
- Screen-reader-only text for non-visible labels where needed.
- Native HTML controls for forms, selects, buttons, links, details, and summaries.
- Reduced-motion media query support in CSS. When reduced motion is requested, reveal targets are shown immediately and hover/filter/cart animations are removed or reduced to near-instant behavior.

## Responsive Behavior

The site must work across desktop, tablet, and mobile widths.

Current responsive behavior includes:

- Desktop horizontal navigation with dropdown submenus.
- Mobile menu controlled by the hamburger button.
- Responsive grids for features, programs, products, blog layout, contact content, and footer.
- Reduced hero sizing and stacked layouts on smaller screens.

## Visual And Content Direction

The design uses:

- A clean institutional layout suited to a public education organization.
- Shared page heroes to make each page feel distinct.
- Red accent treatment for high-priority sections such as HZZ vouchers and webshop.
- Card grids for repeated content such as programs, features, products, news, and institutional links.
- Promotional and testimonial sections that demonstrate reusable content bands for campaign and social-proof content.
- Placeholder images for hero media, program cards, blog posts, products, and institutional imagery.

Future production work should replace placeholder images and placeholder article body text with approved real content.

## Current Technical Scope

Technology:

- Static HTML.
- Shared CSS in `styles.css`.
- Shared JavaScript in `script.js`.
- SVG logo asset in `assets/pou-logo.svg`.
- External placeholder images from `placehold.co`.
- Embedded Google Maps iframe on the contact page.

No current backend features:

- No CMS.
- No persistent newsletter storage.
- No contact form delivery.
- No ecommerce checkout.
- No authentication.
- No server-side search.
- No analytics integration.

## Acceptance Criteria

- Users can navigate between all primary pages using the global navigation.
- Dropdown submenu links lead to the relevant page sections.
- The mobile navigation opens, closes, and updates accessibility state correctly.
- The active navigation item reflects the current page.
- Program search, category filtering, and status filtering hide and show cards correctly.
- Program filter changes animate visible result cards without breaking filtering behavior.
- Empty program search/filter results display an animated empty-state message.
- Newsletter and contact forms validate required fields and show demo confirmation messages.
- Webshop product buttons add items to the cart and update the shared cart badge.
- Add-to-cart interactions provide brief visual feedback on the button and cart badge.
- Product detail quantity selection adds the requested number of Casopis 15 dana items to the cart.
- Cart review supports physical product quantity changes, item removal, and persisted state after refresh.
- Checkout displays delivery fields for physical products and participant fields for program/workshop products.
- Successful checkout clears the cart and displays a demo confirmation message.
- Contact page displays general contact details, department list, inquiry form, and location map.
- Pages remain readable and usable on desktop and mobile screen sizes.
- Motion respects reduced-motion preferences and does not hide content permanently.

## Recommended Future Enhancements

- Connect newsletter and inquiry forms to real backend services.
- Add a CMS or structured data source for programs, news, blog posts, documents, products, and staff contacts.
- Add individual detail pages for programs, news items, blog posts, and products.
- Add real ecommerce functionality if online purchase is required.
- Implement EN language pages or hide inactive language options until translations exist.
- Replace placeholder imagery with approved photography and product images.
- Add analytics and conversion tracking for program inquiries, voucher interest, and webshop clicks.
- Add structured SEO metadata and sitemap generation.
