const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const programSearch = document.querySelector("#program-search");
const categoryFilter = document.querySelector("#category-filter");
const statusFilter = document.querySelector("#status-filter");
const programCards = document.querySelectorAll("#program-list .program-card");
const emptyPrograms = document.querySelector("#empty-programs");
const forms = document.querySelectorAll("form");
const languageLinks = document.querySelectorAll(".language-toggle .lang-link");

const CART_STORAGE_KEY = "pouzCartV1";
const DELIVERY_PRICE = 4;
const products = {
  "casopis-15-dana": {
    name: "\u010casopis 15 dana",
    category: "\u010casopis",
    price: 12,
    type: "physical",
  },
  "biblioteka-majstori": {
    name: "Biblioteka Majstori",
    category: "Publikacija",
    price: 18,
    type: "physical",
  },
  "kalendar-pouz": {
    name: "Kalendar POUZ",
    category: "Kalendar",
    price: 9,
    type: "physical",
  },
  "engleski-online": {
    name: "Engleski jezik (online)",
    category: "Online program",
    price: 120,
    type: "program",
    extra: "level",
  },
  "keramicka-radionica": {
    name: "Kerami\u010dka radionica",
    category: "Radionica",
    price: 65,
    type: "program",
    extra: "experience",
  },
  "vodoinstalatersko-osposobljavanje": {
    name: "Vodoinstalatersko osposobljavanje",
    category: "Osposobljavanje",
    price: 490,
    type: "program",
    extra: "voucher",
  },
};

function markCurrentNavigation() {
  const currentFile = window.location.pathname.split("/").pop() || "index.html";
  const shopFiles = ["proizvod.html", "kosarica.html"];
  let activeFile = currentFile === "blog.html" ? "novosti.html" : currentFile;

  if (shopFiles.includes(currentFile)) {
    activeFile = "webshop.html";
  }

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

function formatPrice(value) {
  return `${value.toLocaleString("hr-HR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} EUR`;
}

function readCart() {
  try {
    const parsed = JSON.parse(localStorage.getItem(CART_STORAGE_KEY));
    if (Array.isArray(parsed)) {
      return parsed.filter((item) => products[item.id]);
    }
  } catch (error) {
    return [];
  }

  return [];
}

function writeCart(cart) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  updateCartCount();
}

function getCartCount(cart = readCart()) {
  return cart.reduce((total, item) => total + item.quantity, 0);
}

function updateCartCount() {
  const cart = readCart();
  const count = getCartCount(cart);

  document.querySelectorAll("[data-cart-count]").forEach((badge) => {
    badge.textContent = String(count);
  });
}

function addToCart(productId, quantity = 1) {
  const product = products[productId];

  if (!product) {
    return;
  }

  const cart = readCart();
  const existingItem = cart.find((item) => item.id === productId);
  const nextQuantity = product.type === "program" ? 1 : Math.max(1, Number(quantity) || 1);

  if (existingItem) {
    existingItem.quantity = product.type === "program" ? 1 : existingItem.quantity + nextQuantity;
  } else {
    cart.push({ id: productId, quantity: nextQuantity });
  }

  writeCart(cart);
}

function setCartQuantity(productId, quantity) {
  const product = products[productId];
  const nextQuantity = Math.max(1, Number(quantity) || 1);
  const cart = readCart().map((item) => {
    if (item.id !== productId) {
      return item;
    }

    return {
      ...item,
      quantity: product && product.type === "program" ? 1 : nextQuantity,
    };
  });

  writeCart(cart);
  renderCartPage();
}

function removeFromCart(productId) {
  const cart = readCart().filter((item) => item.id !== productId);
  writeCart(cart);
  renderCartPage();
}

function getCartTotals(cart = readCart()) {
  const subtotal = cart.reduce((total, item) => total + products[item.id].price * item.quantity, 0);
  const hasPhysical = cart.some((item) => products[item.id].type === "physical");
  const deliveryChoice = document.querySelector('input[name="fulfillment"]:checked');
  const delivery = hasPhysical && deliveryChoice && deliveryChoice.value === "delivery" ? DELIVERY_PRICE : 0;

  return {
    subtotal,
    delivery,
    total: subtotal + delivery,
    hasPhysical,
    hasPrograms: cart.some((item) => products[item.id].type === "program"),
  };
}

function getExtraFields(product, fieldPrefix) {
  if (product.extra === "level") {
    return `
      <label>
        Trenutna razina engleskog jezika
        <select name="${fieldPrefix}Level">
          <option value="">Odaberite razinu</option>
          <option>Po\u010detna</option>
          <option>Srednja</option>
          <option>Napredna</option>
        </select>
      </label>
    `;
  }

  if (product.extra === "experience") {
    return `
      <label>
        Iskustvo s keramikom
        <select name="${fieldPrefix}Experience">
          <option value="">Odaberite iskustvo</option>
          <option>Bez iskustva</option>
          <option>Osnovno iskustvo</option>
          <option>Napredno iskustvo</option>
        </select>
      </label>
    `;
  }

  if (product.extra === "voucher") {
    return `
      <label>
        Razina obrazovanja
        <select name="${fieldPrefix}Education">
          <option value="">Odaberite razinu</option>
          <option>Osnovna skola</option>
          <option>Srednja skola</option>
          <option>Visoko obrazovanje</option>
        </select>
      </label>
      <label class="choice-row">
        <input type="checkbox" name="${fieldPrefix}Voucher" />
        Zainteresiran/a sam za HZZ vaucer
      </label>
    `;
  }

  return "";
}

function renderParticipantFields(cart) {
  const participantFields = document.querySelector("#participant-fields");

  if (!participantFields) {
    return;
  }

  const programItems = cart.filter((item) => products[item.id].type === "program");

  participantFields.innerHTML = programItems
    .map((item, index) => {
      const product = products[item.id];
      const fieldPrefix = `participant${index}`;

      return `
        <div class="participant-card">
          <h3>${product.name}</h3>
          <label>
            Ime i prezime polaznika
            <input type="text" name="${fieldPrefix}Name" required />
          </label>
          <label>
            E-posta polaznika
            <input type="email" name="${fieldPrefix}Email" required />
          </label>
          <label>
            Telefon polaznika
            <input type="tel" name="${fieldPrefix}Phone" required />
          </label>
          <label>
            Datum rodenja
            <input type="date" name="${fieldPrefix}BirthDate" required />
          </label>
          <label>
            OIB
            <input type="text" name="${fieldPrefix}Oib" inputmode="numeric" required />
          </label>
          ${getExtraFields(product, fieldPrefix)}
          <label>
            Napomena za program
            <textarea name="${fieldPrefix}Note" rows="3"></textarea>
          </label>
        </div>
      `;
    })
    .join("");
}

function updateCheckoutVisibility(cart) {
  const deliveryOptions = document.querySelector("#delivery-options");
  const deliveryAddressFields = document.querySelector("#delivery-address-fields");
  const participantSection = document.querySelector("#participant-section");
  const checkoutForm = document.querySelector("#checkout-form");
  const totals = getCartTotals(cart);

  if (deliveryOptions) {
    deliveryOptions.hidden = !totals.hasPhysical;
  }

  if (participantSection) {
    participantSection.hidden = !totals.hasPrograms;
  }

  if (checkoutForm) {
    checkoutForm.hidden = cart.length === 0;
  }

  if (deliveryAddressFields) {
    const deliveryChoice = document.querySelector('input[name="fulfillment"]:checked');
    const needsAddress = totals.hasPhysical && deliveryChoice && deliveryChoice.value === "delivery";
    deliveryAddressFields.hidden = !needsAddress;
    deliveryAddressFields.querySelectorAll("input").forEach((input) => {
      input.required = needsAddress;
    });
  }
}

function updateSummary(cart = readCart()) {
  const totals = getCartTotals(cart);
  const subtotalEl = document.querySelector("[data-cart-subtotal]");
  const deliveryEl = document.querySelector("[data-cart-delivery]");
  const totalEl = document.querySelector("[data-cart-total]");

  if (subtotalEl) {
    subtotalEl.textContent = formatPrice(totals.subtotal);
  }

  if (deliveryEl) {
    deliveryEl.textContent = totals.hasPhysical ? formatPrice(totals.delivery) : "Nije potrebno";
  }

  if (totalEl) {
    totalEl.textContent = formatPrice(totals.total);
  }
}

function renderCartPage() {
  const cartItems = document.querySelector("#cart-items");
  const emptyCart = document.querySelector("#cart-empty");
  const cartLayout = document.querySelector("#cart-layout");
  const confirmation = document.querySelector("#checkout-confirmation");

  if (!cartItems) {
    return;
  }

  const cart = readCart();
  const isEmpty = cart.length === 0;

  if (emptyCart) {
    emptyCart.hidden = !isEmpty;
  }

  if (confirmation && !isEmpty) {
    confirmation.hidden = true;
    confirmation.textContent = "";
  }

  if (cartLayout) {
    cartLayout.hidden = isEmpty;
  }

  cartItems.innerHTML = cart
    .map((item) => {
      const product = products[item.id];
      const lineTotal = product.price * item.quantity;
      const quantityControl =
        product.type === "program"
          ? `<span class="fixed-quantity">1 polaznik</span>`
          : `
            <label class="quantity-control">
              <span>Kolicina</span>
              <input type="number" min="1" max="20" value="${item.quantity}" data-cart-quantity="${item.id}" />
            </label>
          `;

      return `
        <article class="cart-item">
          <div>
            <span class="tag">${product.category}</span>
            <h3>${product.name}</h3>
            <p>${product.type === "program" ? "Podaci o polazniku unose se u checkoutu." : "Fizicki proizvod za dostavu ili preuzimanje."}</p>
          </div>
          ${quantityControl}
          <strong>${formatPrice(lineTotal)}</strong>
          <button class="button small secondary-action" type="button" data-remove-from-cart="${item.id}">Ukloni</button>
        </article>
      `;
    })
    .join("");

  renderParticipantFields(cart);
  updateCheckoutVisibility(cart);
  updateSummary(cart);
}

document.querySelectorAll("[data-add-to-cart]").forEach((button) => {
  const detailForm = button.closest("[data-product-detail-form]");

  if (detailForm) {
    return;
  }

  button.addEventListener("click", () => {
    addToCart(button.dataset.addToCart);
    button.textContent = "Dodano";
    window.setTimeout(() => {
      button.textContent = "Dodaj u ko\u0161aricu";
    }, 1100);
  });
});

const detailForm = document.querySelector("[data-product-detail-form]");
if (detailForm) {
  detailForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const button = detailForm.querySelector("[data-add-to-cart]");
    const quantityInput = detailForm.querySelector('input[name="quantity"]');
    const message = detailForm.querySelector(".form-message");

    addToCart(button.dataset.addToCart, quantityInput.value);

    if (message) {
      message.textContent = "Proizvod je dodan u ko\u0161aricu.";
      message.classList.remove("is-error");
    }
  });
}

document.addEventListener("input", (event) => {
  const quantityInput = event.target.closest("[data-cart-quantity]");

  if (quantityInput) {
    setCartQuantity(quantityInput.dataset.cartQuantity, quantityInput.value);
  }
});

document.addEventListener("click", (event) => {
  const removeButton = event.target.closest("[data-remove-from-cart]");

  if (removeButton) {
    removeFromCart(removeButton.dataset.removeFromCart);
  }
});

document.querySelectorAll('input[name="fulfillment"]').forEach((input) => {
  input.addEventListener("change", () => {
    const cart = readCart();
    updateCheckoutVisibility(cart);
    updateSummary(cart);
  });
});

const checkoutForm = document.querySelector("#checkout-form");
if (checkoutForm) {
  checkoutForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const message = checkoutForm.querySelector(".form-message");
    const confirmation = document.querySelector("#checkout-confirmation");
    const cart = readCart();

    if (!cart.length) {
      if (message) {
        message.textContent = "Kosarica je prazna. Dodajte proizvod prije checkouta.";
        message.classList.add("is-error");
      }
      return;
    }

    updateCheckoutVisibility(cart);

    if (!checkoutForm.checkValidity()) {
      checkoutForm.reportValidity();
      if (message) {
        message.textContent = "Provjerite obavezna polja i pokusajte ponovno.";
        message.classList.add("is-error");
      }
      return;
    }

    const confirmationNumber = `POUZ-${Date.now().toString().slice(-6)}`;
    localStorage.removeItem(CART_STORAGE_KEY);
    updateCartCount();
    renderCartPage();
    checkoutForm.reset();

    if (message) {
      message.textContent = "";
      message.classList.remove("is-error");
    }

    if (confirmation) {
      confirmation.hidden = false;
      confirmation.textContent = `Demo narudzba ${confirmationNumber} je prikazana kao zaprimljena. Placanje nije provedeno i narudzba nije poslana.`;
    }
  });
}

forms.forEach((form) => {
  if (form.id === "checkout-form" || form.matches("[data-product-detail-form]")) {
    return;
  }

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

updateCartCount();
renderCartPage();
