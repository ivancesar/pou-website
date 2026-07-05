const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const forms = document.querySelectorAll("form");
const languageLinks = document.querySelectorAll(".language-toggle .lang-link");

const culturePages = new Set([
  "nakladnistvo.html",
  "galerije.html",
  "kreativne-radionice.html",
  "koncerti.html",
]);

function currentFileName() {
  return window.location.pathname.split("/").pop() || "index.html";
}

function currentNavKey(fileName) {
  if (culturePages.has(fileName)) {
    return "kultura";
  }

  const map = {
    "index.html": "pocetna",
    "obrazovanje.html": "obrazovanje",
    "erasmus.html": "erasmus",
    "projekti.html": "projekti",
    "vauceri.html": "vauceri",
    "vijesti.html": "vijesti",
    "novosti.html": "vijesti",
    "blog.html": "vijesti",
    "dokumenti.html": "dokumenti",
    "webshop.html": "webshop",
    "programi.html": "obrazovanje",
    "o-ucilistu.html": "dokumenti",
  };

  return map[fileName] || "";
}

function markCurrentNavigation() {
  const activeKey = currentNavKey(currentFileName());

  document.querySelectorAll(".primary-nav .nav-link").forEach((link) => {
    const isCurrent = link.dataset.nav === activeKey;

    link.classList.toggle("is-active", isCurrent);
    if (isCurrent && link.tagName === "A") {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

function setupLanguageToggle() {
  const currentFile = currentFileName();
  const hrLink = document.querySelector('.language-toggle .lang-link[hreflang="hr"]');

  if (hrLink) {
    hrLink.setAttribute("href", currentFile);
  }

  languageLinks.forEach((link) => {
    if (link.getAttribute("href") === "#") {
      link.addEventListener("click", (event) => {
        event.preventDefault();
      });
    }
  });
}

function closeNavigation() {
  if (!header || !menuToggle) {
    return;
  }

  header.classList.remove("nav-open");
  menuToggle.setAttribute("aria-expanded", "false");
}

if (header) {
  markCurrentNavigation();
  setupLanguageToggle();
}

if (header && menuToggle) {
  menuToggle.addEventListener("click", () => {
    const isOpen = header.classList.toggle("nav-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  document.addEventListener("click", (event) => {
    if (!header.contains(event.target)) {
      closeNavigation();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeNavigation();
    }
  });

  document.querySelectorAll(".primary-nav a").forEach((link) => {
    link.addEventListener("click", closeNavigation);
  });
}

forms.forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const message = form.querySelector(".form-message");

    if (!message) {
      return;
    }

    if (!form.checkValidity()) {
      message.textContent = "Provjerite obavezna polja i pokusajte ponovno.";
      message.classList.add("is-error");
      return;
    }

    form.reset();
    message.textContent = "Hvala. Vasa poruka je zaprimljena u ovoj demo verziji.";
    message.classList.remove("is-error");
  });
});

function parseDate(value) {
  return new Date(`${value}T00:00:00`);
}

function formatDate(value) {
  return parseDate(value).toLocaleDateString("hr-HR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function sortByNewest(items) {
  return [...items].sort((a, b) => parseDate(b.date) - parseDate(a.date));
}

function articleTemplate(item, useLarge = false) {
  const image = item.image || "https://placehold.co/960x520/f4f4f4/777777?text=POUZ";
  const titleTag = useLarge ? "h2" : "h3";

  return `
    <article class="${useLarge ? "blog-post" : ""}">
      ${useLarge ? `<img src="${image}" alt="" />` : ""}
      <div class="${useLarge ? "blog-post-body" : ""}">
        <div class="blog-meta">
          <span class="tag">${item.categoryLabel}</span>
          <time datetime="${item.date}">${formatDate(item.date)}</time>
        </div>
        <${titleTag}>${item.title}</${titleTag}>
        <p>${item.summary}</p>
      </div>
    </article>
  `;
}

function renderNewsList(container, items, options = {}) {
  const limit = Number(container.dataset.newsLimit || options.limit || items.length);
  const useLarge = options.useLarge || container.dataset.newsStyle === "blog";
  const visibleItems = sortByNewest(items).slice(0, limit);

  container.innerHTML = visibleItems.map((item) => articleTemplate(item, useLarge)).join("");
}

function renderLatestNews(data) {
  document.querySelectorAll("[data-news-latest]").forEach((container) => {
    renderNewsList(container, data.news);
  });
}

function renderCategoryNews(data) {
  document.querySelectorAll("[data-news-category]").forEach((container) => {
    const categories = container.dataset.newsCategory.split(" ");
    const items = data.news.filter((item) => categories.includes(item.category));
    renderNewsList(container, items);
  });
}

function setupNewsArchive(data) {
  const list = document.querySelector("#all-news-list");
  const search = document.querySelector("#news-search");
  const category = document.querySelector("#news-category");
  const empty = document.querySelector("#empty-news");

  if (!list || !search || !category) {
    return;
  }

  function render() {
    const query = search.value.trim().toLowerCase();
    const selectedCategory = category.value;
    const items = data.news.filter((item) => {
      const searchable = `${item.title} ${item.summary} ${item.categoryLabel}`.toLowerCase();
      const matchesQuery = !query || searchable.includes(query);
      const matchesCategory = selectedCategory === "sve" || item.category === selectedCategory;
      return matchesQuery && matchesCategory;
    });

    renderNewsList(list, items);
    if (empty) {
      empty.hidden = items.length !== 0;
    }
  }

  search.addEventListener("input", render);
  category.addEventListener("input", render);
  category.addEventListener("change", render);
  render();
}

function documentTemplate(item) {
  return `
    <article class="document-card">
      <div>
        <time datetime="${item.date}">${formatDate(item.date)}</time>
      </div>
      <h3>${item.title}</h3>
      <p>${item.summary}</p>
      <a class="text-link" href="${item.href}">Otvori dokument</a>
    </article>
  `;
}

function setupDocumentArchive(data) {
  const list = document.querySelector("#document-list");
  const search = document.querySelector("#document-search");
  const type = document.querySelector("#document-type");
  const empty = document.querySelector("#empty-documents");

  if (!list || !search || !type) {
    return;
  }

  function render() {
    const query = search.value.trim().toLowerCase();
    const selectedType = type.value;
    const items = data.documents.filter((item) => {
      const searchable = `${item.title} ${item.summary} ${item.typeLabel}`.toLowerCase();
      const matchesQuery = !query || searchable.includes(query);
      const matchesType = selectedType === "sve" || item.type === selectedType;
      return matchesQuery && matchesType;
    });

    list.innerHTML = sortByNewest(items).map(documentTemplate).join("");
    if (empty) {
      empty.hidden = items.length !== 0;
    }
  }

  search.addEventListener("input", render);
  type.addEventListener("input", render);
  type.addEventListener("change", render);
  render();
}

function renderFifteenDaysProduct(data) {
  const product = data.products.find((item) => item.id === "fifteen-days");

  if (!product) {
    return;
  }

  document.querySelectorAll("[data-product-price='fifteen-days']").forEach((element) => {
    element.textContent = product.price;
  });

  document.querySelectorAll("[data-product-buy='fifteen-days']").forEach((element) => {
    element.setAttribute("href", product.buyHref);
  });
}

async function loadSiteData() {
  if (window.POUZ_SITE_DATA) {
    return window.POUZ_SITE_DATA;
  }

  const response = await fetch("assets/site-data.json");

  if (!response.ok) {
    throw new Error("Site data could not be loaded.");
  }

  return response.json();
}

loadSiteData()
  .then((data) => {
    renderLatestNews(data);
    renderCategoryNews(data);
    setupNewsArchive(data);
    setupDocumentArchive(data);
    renderFifteenDaysProduct(data);
  })
  .catch(() => {
    document.querySelectorAll("[data-dynamic-status]").forEach((element) => {
      element.textContent = "Sadrzaj nije moguce ucitati u ovoj demo verziji.";
    });
  });
