const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const programSearch = document.querySelector("#program-search");
const categoryFilter = document.querySelector("#category-filter");
const statusFilter = document.querySelector("#status-filter");
const programCards = document.querySelectorAll("#program-list .program-card");
const emptyPrograms = document.querySelector("#empty-programs");
const forms = document.querySelectorAll("form");
const languageLinks = document.querySelectorAll(".language-toggle .lang-link");

function markCurrentNavigation() {
  const currentFile = window.location.pathname.split("/").pop() || "index.html";
  const activeFile = currentFile === "blog.html" ? "novosti.html" : currentFile;

  document.querySelectorAll(".primary-nav .nav-link").forEach((link) => {
    const linkFile = link.getAttribute("href").split("#")[0];
    const isCurrent = linkFile === activeFile;

    link.classList.toggle("is-active", isCurrent);
    if (isCurrent) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

function setupLanguageToggle() {
  const currentFile = window.location.pathname.split("/").pop() || "index.html";
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

if (header && menuToggle) {
  markCurrentNavigation();
  setupLanguageToggle();

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

function filterPrograms() {
  const query = programSearch.value.trim().toLowerCase();
  const category = categoryFilter.value;
  const status = statusFilter.value;
  let visibleCount = 0;

  programCards.forEach((card) => {
    const text = card.textContent.toLowerCase();
    const categories = card.dataset.category.split(" ");
    const cardStatus = card.dataset.status;
    const matchesQuery = !query || text.includes(query);
    const matchesCategory = category === "sve" || categories.includes(category);
    const matchesStatus = status === "sve" || cardStatus === status;
    const isVisible = matchesQuery && matchesCategory && matchesStatus;

    card.hidden = !isVisible;
    if (isVisible) {
      visibleCount += 1;
    }
  });

  if (emptyPrograms) {
    emptyPrograms.hidden = visibleCount !== 0;
  }
}

if (programSearch && categoryFilter && statusFilter && programCards.length) {
  [programSearch, categoryFilter, statusFilter].forEach((control) => {
    control.addEventListener("input", filterPrograms);
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
