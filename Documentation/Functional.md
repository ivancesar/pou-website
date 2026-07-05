# Functional Specification

## Project Overview

The website is a static public prototype for POUZ, Pu&#269;ko otvoreno u&#269;ili&#353;te Zagreb. It presents education, culture, projects, vouchers, news, documents, and webshop content through standalone HTML pages, shared CSS, shared JavaScript, and a small JSON data source.

The prototype does not include a backend, CMS, checkout, authentication, persistent form submission, document upload workflow, or production translations.

## Site Map

- `index.html`: landing page with full initial-viewport hero, latest five news items, testimonials, and newsletter form.
- `nakladnistvo.html`: culture child page with description, `15 dana` product feature, and publishing news.
- `galerije.html`: culture child page for Galerija Cekao and Galerija Bernardo Bernardi, plus gallery news.
- `kreativne-radionice.html`: culture child page for Ples, Umjetni&#269;ke produkcije, and Fotografija, plus workshop news.
- `koncerti.html`: culture child page with descriptive text and concert news.
- `obrazovanje.html`: education page with four program sections and related news.
- `erasmus.html`: Erasmus+ page with descriptive text and related news.
- `projekti.html`: projects page with descriptive text and related news.
- `vauceri.html`: HZZ voucher page with application flow, FAQ, and related news.
- `vijesti.html`: searchable and filterable news archive.
- `dokumenti.html`: searchable and filterable document archive.
- `webshop.html`: existing webshop/catalog page.
- `kontakt.html`: secondary contact page linked from CTAs and footers.

## Global Navigation

The primary navigation contains:

- Po&#269;etna.
- Kultura as an organizational dropdown with no standalone page.
- Obrazovanje.
- Erasmus+.
- Projekti.
- Vau&#269;eri.
- Vijesti.
- Webshop.

The HR/EN language toggle remains in the header. HR points to the current page and EN remains a placeholder. `Kontakt` and `Dokumenti` are intentionally excluded from the primary navigation and remain available through footer links and page calls to action.

## Shared Data

`assets/site-data.json` stores the editable source data, and `assets/site-data.js` exposes the same data to browsers that open the static HTML files directly from the folder.

- News items with category, date, summary, and image metadata.
- Document archive entries with type, date, summary, and placeholder links.
- The `15 dana` product reference used by the Nakladni&#353;tvo page.

`script.js` uses the browser-ready data object first, falls back to loading the JSON over HTTP, and renders latest news, category news, the all-news archive, the document archive, and the `15 dana` price/buy link.

## Interactions

- Mobile navigation opens and closes with the menu button, outside click, Escape, or link selection.
- Active navigation state is based on the current filename; culture child pages activate `Kultura`.
- `Vijesti` supports text search and category filtering.
- `Dokumenti` supports text search and document-type filtering.
- Newsletter and contact forms are demo-only and show local validation/status messages.
- FAQ content uses native `details` and `summary` elements.

## Acceptance Criteria

- All public navigation links resolve to existing local pages.
- `Kultura` is a dropdown/organizational item and does not link to `kultura.html`.
- `Dokumenti` is available from the shared footer, not from the header.
- Homepage latest news shows exactly five newest items from the JSON data.
- Category pages render only related news.
- `Vijesti` and `Dokumenti` filters display matching items and an empty state.
- The `Nakladni&#353;tvo` `15 dana` price matches the webshop product price.
- The site remains readable and usable on desktop, tablet, and mobile widths.
