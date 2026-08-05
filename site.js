const body = document.body;
const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
const mobileMenuPanel = mobileMenu?.querySelector(".menu-panel");
const mobileLinks = mobileMenu?.querySelectorAll("a[href^='#']") ?? [];
const whatsappNumber = "393899215920";
const focusableSelector = "a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex='-1'])";
const backgroundRegions = [document.querySelector("main"), document.querySelector(".site-footer")].filter(Boolean);
let lastFocusedElement = null;

const translations = {
  it: {
    skip: "Vai al contenuto",
    "nav.restaurant": "Ristorante",
    "nav.location": "Location",
    "nav.reviews": "Recensioni",
    "nav.contacts": "Contatti",
    "cta.book": "Prenota",
    "cta.bookTable": "Prenota un tavolo",
    "cta.menu": "Scopri il nostro menu",
    "cta.wine": "Carta dei Vini",
    "cta.call": "Chiama ora",
    "card.food": "Menu",
    "card.wine": "Carta dei Vini",
    "card.note": "In caso di allergie o intolleranze, prima di ordinare informa il personale di sala. La carta puo variare secondo stagione e disponibilita.",
    "card.wineNote": "Etichette e annate possono variare secondo disponibilita. Chiedi al personale il suggerimento del giorno.",
    "hero.overline": "Ristorante · Pizzeria",
    "hero.hours": "<span>Pranzo, cena &amp; convivialita</span> Cucina italiana · pesce · pizza · Liguria",
    "hero.edge": "Cucina italiana & sapori liguri",
    "hero.discover": "Scopri La Taverna",
    "restaurant.kicker": "01 · La nostra cucina",
    "restaurant.copy1": "Piatti italiani, specialita di mare e sapori liguri in un ristorante accogliente nel cuore di Monterosso.",
    "restaurant.copy2": "Una tavola semplice, curata e generosa per vivere pranzo e cena tra le Cinque Terre.",
    "restaurant.mobileCopy": "Cucina italiana, pesce e sapori liguri nel cuore di Monterosso.",
    "food.catch": "Il polpo",
    "food.pizza": "La tartare",
    "food.seafood": "I gamberi rossi",
    "food.pasta": "Il risotto di mare",
    "food.ligurian": "Gli spaghetti alle vongole",
    "food.wine": "Il dolce della casa",
    "location.kicker": "02 · A Monterosso",
    "location.copy1": "Via Molinelli 39, a pochi passi dal ritmo luminoso di Monterosso al Mare.",
    "location.copy2": "Sala, tavoli all'aperto e atmosfera informale per una sosta di gusto nelle Cinque Terre.",
    "location.front": "La tavola",
    "location.outdoor": "La tavola",
    "location.room": "La sala",
    "location.table": "I dettagli",
    "location.details": "I dettagli",
    "reviews.kicker": "03 · Recensioni",
    "reviews.title": "Cosa dicono di noi",
    "reviews.awards": "Canali recensioni",
    "reviews.cardLabel1": "Cucina",
    "reviews.cardLabel2": "Accoglienza",
    "reviews.cardLabel3": "Cinque Terre",
    "reviews.quote1": "Pesce, pizza e piatti italiani pensati per una pausa piena di gusto a Monterosso.",
    "reviews.author1": "La Taverna · Ristorante",
    "reviews.quote2": "Servizio diretto, ambiente conviviale e tavoli pronti ad accogliere pranzi e cene.",
    "reviews.author2": "Monterosso al Mare · SP",
    "reviews.quote3": "Una tappa semplice e generosa tra mare, vicoli e profumi della Riviera ligure.",
    "reviews.author3": "Via Molinelli 39",
    "reviews.read": "Leggi le recensioni",
    "reviews.leave": "Lascia una recensione",
    "contacts.kicker": "04 · Contatti",
    "contacts.title": "Contatti",
    "contacts.where": "Dove siamo",
    "contacts.hoursLabel": "Orari",
    "contacts.hours": "Pranzo e cena<br>tutti i giorni",
    "contacts.phone": "Telefono",
    "contacts.socialLabel": "Email",
    "contacts.mapLabel": "Monterosso al Mare · Cinque Terre",
    "contacts.openMap": "Apri su Google Maps",
    "footer.tagline": "La cucina italiana,<br>il respiro del mare.",
    "footer.top": "Torna su",
    "form.kicker": "Scrivici su WhatsApp",
    "form.title": "Raccontaci<br><em>cosa desideri.</em>",
    "form.intro": "Compila i campi: prepareremo il messaggio e apriremo direttamente la chat WhatsApp con La Taverna.",
    "form.name": "Nome e cognome *",
    "form.date": "Data",
    "form.time": "Orario",
    "form.guests": "Persone",
    "form.choose": "Scegli",
    "form.message": "Messaggio",
    "form.placeholder": "Richieste o informazioni utili",
    "form.submit": "Continua su WhatsApp",
    "form.note": "Nessun dato viene salvato sul sito.",
  },
  en: {
    skip: "Skip to content",
    "nav.restaurant": "Restaurant",
    "nav.location": "Location",
    "nav.reviews": "Reviews",
    "nav.contacts": "Contacts",
    "cta.book": "Book now",
    "cta.bookTable": "Book a table",
    "cta.menu": "Discover our menu",
    "cta.wine": "Wine list",
    "cta.call": "Call now",
    "card.food": "Menu",
    "card.wine": "Wine list",
    "card.note": "In case of allergies or intolerances, please inform our staff before ordering. The menu may vary according to season and availability.",
    "card.wineNote": "Labels and vintages may vary according to availability. Ask our staff for today's recommendation.",
    "hero.overline": "Restaurant · Pizzeria",
    "hero.hours": "<span>Lunch, dinner &amp; conviviality</span> Italian cuisine · seafood · pizza · Liguria",
    "hero.edge": "Italian cuisine & Ligurian flavours",
    "hero.discover": "Discover La Taverna",
    "restaurant.kicker": "01 · Our cuisine",
    "restaurant.copy1": "Italian dishes, seafood specialities and Ligurian flavours in a welcoming restaurant in the heart of Monterosso.",
    "restaurant.copy2": "A simple, curated and generous table for lunch and dinner in the Cinque Terre.",
    "restaurant.mobileCopy": "Italian cuisine, seafood and Ligurian flavours in the heart of Monterosso.",
    "food.catch": "Octopus",
    "food.pizza": "Tartare",
    "food.seafood": "Red prawns",
    "food.pasta": "Seafood risotto",
    "food.ligurian": "Spaghetti with clams",
    "food.wine": "House dessert",
    "location.kicker": "02 · In Monterosso",
    "location.copy1": "Via Molinelli 39, close to the bright rhythm of Monterosso al Mare.",
    "location.copy2": "Dining room, outdoor tables and an informal mood for a tasteful stop in the Cinque Terre.",
    "location.front": "The table",
    "location.outdoor": "The table",
    "location.room": "The dining room",
    "location.table": "The details",
    "location.details": "The details",
    "reviews.kicker": "03 · Reviews",
    "reviews.title": "What guests say",
    "reviews.awards": "Review channels",
    "reviews.cardLabel1": "Cuisine",
    "reviews.cardLabel2": "Hospitality",
    "reviews.cardLabel3": "Cinque Terre",
    "reviews.quote1": "Seafood, pizza and Italian dishes designed for a flavourful stop in Monterosso.",
    "reviews.author1": "La Taverna · Restaurant",
    "reviews.quote2": "Direct service, a convivial setting and tables ready for lunch and dinner.",
    "reviews.author2": "Monterosso al Mare · SP",
    "reviews.quote3": "A simple and generous stop between the sea, narrow streets and scents of the Ligurian Riviera.",
    "reviews.author3": "Via Molinelli 39",
    "reviews.read": "Read reviews",
    "reviews.leave": "Leave a review",
    "contacts.kicker": "04 · Contacts",
    "contacts.title": "Contacts",
    "contacts.where": "Find us",
    "contacts.hoursLabel": "Opening hours",
    "contacts.hours": "Lunch and dinner<br>every day",
    "contacts.phone": "Phone",
    "contacts.socialLabel": "Email",
    "contacts.mapLabel": "Monterosso al Mare · Cinque Terre",
    "contacts.openMap": "Open in Google Maps",
    "footer.tagline": "Italian cuisine,<br>the breath of the sea.",
    "footer.top": "Back to top",
    "form.kicker": "Message us on WhatsApp",
    "form.title": "Tell us<br><em>what you need.</em>",
    "form.intro": "Complete the fields: we will prepare your message and open a direct WhatsApp chat with La Taverna.",
    "form.name": "Full name *",
    "form.date": "Date",
    "form.time": "Time",
    "form.guests": "Guests",
    "form.choose": "Select",
    "form.message": "Message",
    "form.placeholder": "Requests or useful information",
    "form.submit": "Continue on WhatsApp",
    "form.note": "No data is stored on this website.",
  },
};

const menuCatalogs = {
  food: {
    intro: {
      it: {
        kicker: "La Taverna · Cucina italiana",
        title: "Il nostro<br><em>menu.</em>",
        description: "Proposte italiane, cucina ligure, pesce, pizza e piatti vegetariani. La carta puo variare secondo stagione e disponibilita.",
      },
      en: {
        kicker: "La Taverna · Italian cuisine",
        title: "Our<br><em>menu.</em>",
        description: "Italian dishes, Ligurian cuisine, seafood, pizza and vegetarian options. The menu may vary according to season and availability.",
      },
    },
    sections: [
      {
        it: "Dal mare", en: "From the sea",
        items: [
          { it: "Pescato del giorno con profumi mediterranei", en: "Catch of the day with Mediterranean notes" },
          { it: "Frutti di mare e specialita liguri", en: "Seafood and Ligurian specialities" },
          { it: "Frittura e piatti semplici da condividere", en: "Fried seafood and simple dishes to share" },
        ],
      },
      {
        it: "Cucina italiana", en: "Italian kitchen",
        items: [
          { it: "Pasta fresca e primi della tradizione", en: "Fresh pasta and traditional first courses" },
          { it: "Pizza, focacce e proposte da forno", en: "Pizza, focaccia and oven-baked proposals" },
          { it: "Opzioni vegetariane secondo stagione", en: "Seasonal vegetarian options" },
        ],
      },
      {
        it: "Taverna", en: "Taverna",
        items: [
          { it: "Antipasti e piatti conviviali", en: "Starters and convivial dishes" },
          { it: "Calici, birre e aperitivi", en: "Wine by the glass, beers and aperitifs" },
          { it: "Dolci e chiusure classiche", en: "Desserts and classic finishes" },
        ],
      },
    ],
  },
  wine: {
    intro: {
      it: {
        kicker: "La Taverna · La cantina",
        title: "Carta<br><em>dei Vini.</em>",
        description: "Una selezione pensata per pizza, pesce e cucina italiana, con spazio ai bianchi liguri e alle etichette nazionali.",
      },
      en: {
        kicker: "La Taverna · The cellar",
        title: "Wine<br><em>list.</em>",
        description: "A selection designed for pizza, seafood and Italian cuisine, with room for Ligurian whites and national labels.",
      },
    },
    sections: [
      {
        it: "Bollicine", en: "Sparkling",
        items: [
          { it: "Prosecco e bollicine per aperitivo", en: "Prosecco and sparkling wines for aperitif" },
          { it: "Metodo classico italiano", en: "Italian traditional method" },
          { it: "Cuvée speciali secondo disponibilita", en: "Special cuvees according to availability" },
        ],
      },
      {
        it: "Bianchi e rosati", en: "Whites and roses",
        items: [
          { it: "Vermentino, Pigato e vini della Riviera", en: "Vermentino, Pigato and Riviera wines" },
          { it: "Bianchi italiani per piatti di mare", en: "Italian whites for seafood dishes" },
          { it: "Rosati freschi e gastronomici", en: "Fresh gastronomic rose wines" },
        ],
      },
      {
        it: "Rossi e fine pasto", en: "Reds and after dinner",
        items: [
          { it: "Rossi italiani per cucina e pizza", en: "Italian reds for food and pizza" },
          { it: "Amari e distillati", en: "Bitters and spirits" },
          { it: "Cocktail classici", en: "Classic cocktails" },
        ],
      },
    ],
  },
};

let currentLanguage = "it";

const getFocusableElements = (container) => {
  if (!container) return [];
  return [...container.querySelectorAll(focusableSelector)].filter((element) => element.offsetParent !== null);
};

const setBackgroundInert = (inert) => {
  backgroundRegions.forEach((region) => {
    if (inert) region.setAttribute("inert", "");
    else region.removeAttribute("inert");
  });
};

const trapFocus = (event, container) => {
  if (event.key !== "Tab") return;
  const focusableElements = getFocusableElements(container);
  if (!focusableElements.length) {
    event.preventDefault();
    container?.focus();
    return;
  }

  const first = focusableElements[0];
  const last = focusableElements[focusableElements.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
};

const setMenu = (open, restoreFocus = true) => {
  const wasOpen = body.classList.contains("menu-open");
  if (open && !wasOpen) lastFocusedElement = document.activeElement;
  body.classList.toggle("menu-open", open);
  mobileMenu?.classList.toggle("is-open", open);
  mobileMenu?.setAttribute("aria-hidden", String(!open));
  menuToggle?.setAttribute("aria-expanded", String(open));
  menuToggle?.setAttribute("aria-label", open ? "Chiudi il menu" : "Apri il menu");
  setBackgroundInert(open);

  if (open) {
    window.setTimeout(() => (getFocusableElements(mobileMenuPanel)[0] || mobileMenuPanel)?.focus(), 260);
  } else if (wasOpen && restoreFocus) {
    lastFocusedElement?.focus();
  }
};

menuToggle?.addEventListener("click", () => setMenu(!body.classList.contains("menu-open")));
mobileMenu?.querySelector("[data-menu-close]")?.addEventListener("click", () => setMenu(false));
mobileLinks.forEach((link) => link.addEventListener("click", () => setMenu(false)));

const updateHeader = () => header?.classList.toggle("is-scrolled", window.scrollY > 32);
updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

const setupCarousel = ({ trackSelector, cardSelector, currentSelector, prevSelector, nextSelector }) => {
  const track = document.querySelector(trackSelector);
  const cards = [...document.querySelectorAll(cardSelector)];
  const current = document.querySelector(currentSelector);
  const previous = document.querySelector(prevSelector);
  const next = document.querySelector(nextSelector);

  if (!track || !cards.length) return;

  const step = () => {
    const styles = getComputedStyle(track);
    return cards[0].getBoundingClientRect().width + parseFloat(styles.columnGap || styles.gap || 0);
  };

  const updateCounter = () => {
    if (!current) return;
    const cardStep = step();
    const index = cardStep ? Math.round(track.scrollLeft / cardStep) + 1 : 1;
    current.textContent = String(Math.min(cards.length, Math.max(1, index))).padStart(2, "0");
  };

  previous?.addEventListener("click", () => track.scrollBy({ left: -step(), behavior: "smooth" }));
  next?.addEventListener("click", () => track.scrollBy({ left: step(), behavior: "smooth" }));
  track.addEventListener("scroll", updateCounter, { passive: true });
};

setupCarousel({
  trackSelector: "[data-food-track]",
  cardSelector: ".food-card",
  currentSelector: "[data-food-current]",
  prevSelector: "[data-food-prev]",
  nextSelector: "[data-food-next]",
});

setupCarousel({
  trackSelector: "[data-location-track]",
  cardSelector: ".location-card",
  currentSelector: "[data-location-current]",
  prevSelector: "[data-location-prev]",
  nextSelector: "[data-location-next]",
});

const cardModal = document.querySelector("[data-card-modal]");
const cardDialog = cardModal?.querySelector(".card-dialog");
const cardBody = cardModal?.querySelector(".card-body");
const cardContent = cardModal?.querySelector("[data-card-content]");
const cardKicker = cardModal?.querySelector("[data-card-kicker]");
const cardTitle = cardModal?.querySelector("[data-card-title]");
const cardDescription = cardModal?.querySelector("[data-card-description]");
const catalogNote = cardModal?.querySelector(".catalog-note");
let activeCardType = "food";
let cardCloseTimer;

const renderCatalog = () => {
  if (!cardContent || !cardKicker || !cardTitle || !cardDescription) return;
  const catalog = menuCatalogs[activeCardType];
  const intro = catalog.intro[currentLanguage];
  cardKicker.textContent = intro.kicker;
  cardTitle.innerHTML = intro.title;
  cardDescription.textContent = intro.description;
  if (catalogNote) catalogNote.textContent = translations[currentLanguage][activeCardType === "food" ? "card.note" : "card.wineNote"];
  cardContent.innerHTML = catalog.sections.map((section) => `
    <section class="catalog-section">
      <h3>${section[currentLanguage]}<small>${section[currentLanguage === "it" ? "en" : "it"]}</small></h3>
      <div class="catalog-items">
        ${section.items.map((item) => `
          <article class="catalog-item">
            <div>
              <h4>${item[currentLanguage] || item.it}</h4>
              ${(item.sub || item[currentLanguage === "it" ? "en" : "it"]) ? `<p>${item.sub || item[currentLanguage === "it" ? "en" : "it"]}</p>` : ""}
            </div>
            ${item.price ? `<span>${item.price}</span>` : ""}
          </article>
        `).join("")}
      </div>
    </section>
  `).join("");
};

const applyLanguage = (language) => {
  currentLanguage = translations[language] ? language : "it";
  const dictionary = translations[currentLanguage];
  document.documentElement.lang = currentLanguage;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const value = dictionary[element.dataset.i18n];
    if (value !== undefined) element.textContent = value;
  });

  document.querySelectorAll("[data-i18n-html]").forEach((element) => {
    const value = dictionary[element.dataset.i18nHtml];
    if (value !== undefined) element.innerHTML = value;
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    const value = dictionary[element.dataset.i18nPlaceholder];
    if (value !== undefined) element.placeholder = value;
  });

  document.querySelectorAll("[data-lang]").forEach((button) => {
    const active = button.dataset.lang === currentLanguage;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  renderCatalog();
};

document.querySelectorAll("[data-lang]").forEach((button) => {
  button.addEventListener("click", () => applyLanguage(button.dataset.lang));
});

const setCardType = (type) => {
  activeCardType = menuCatalogs[type] ? type : "food";
  cardModal?.querySelectorAll("[data-card-tab]").forEach((button) => {
    const active = button.dataset.cardTab === activeCardType;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-selected", String(active));
  });
  renderCatalog();
  if (cardBody) cardBody.scrollTop = 0;
};

const openCardModal = (type, trigger) => {
  if (!cardModal || !cardDialog) return;
  window.clearTimeout(cardCloseTimer);
  lastFocusedElement = trigger || document.activeElement;
  setMenu(false, false);
  setCardType(type);
  cardModal.hidden = false;
  cardModal.setAttribute("aria-hidden", "false");
  body.classList.add("modal-open");
  setBackgroundInert(true);
  requestAnimationFrame(() => {
    cardModal.classList.add("is-open");
    window.setTimeout(() => cardModal.querySelector("[data-card-close]")?.focus(), 260);
  });
};

const closeCardModal = () => {
  if (!cardModal || cardModal.hidden) return;
  cardModal.classList.remove("is-open");
  cardModal.setAttribute("aria-hidden", "true");
  body.classList.remove("modal-open");
  setBackgroundInert(false);
  cardCloseTimer = window.setTimeout(() => {
    cardModal.hidden = true;
    lastFocusedElement?.focus();
  }, 450);
};

document.querySelectorAll("[data-card-trigger]").forEach((trigger) => {
  trigger.addEventListener("click", (event) => {
    event.preventDefault();
    openCardModal(trigger.dataset.cardTrigger, trigger);
  });
});

cardModal?.querySelector("[data-card-close]")?.addEventListener("click", closeCardModal);
cardModal?.querySelectorAll("[data-card-tab]").forEach((button) => {
  button.addEventListener("click", () => setCardType(button.dataset.cardTab));
});

const bookingModal = document.querySelector("[data-booking-modal]");
const bookingDialog = bookingModal?.querySelector(".booking-dialog");
const bookingForm = bookingModal?.querySelector("[data-contact-form]");
const contextInput = bookingForm?.querySelector("input[name='context']");
const dateInput = bookingForm?.querySelector("input[name='date']");
let closeModalTimer;

if (dateInput) dateInput.min = new Date().toISOString().split("T")[0];

const openBookingModal = (trigger) => {
  if (!bookingModal || !bookingDialog) return;
  window.clearTimeout(closeModalTimer);
  lastFocusedElement = trigger;
  if (contextInput) contextInput.value = trigger.dataset.context || "Prenotazione tavolo";
  setMenu(false, false);
  bookingModal.hidden = false;
  bookingModal.setAttribute("aria-hidden", "false");
  body.classList.add("modal-open");
  setBackgroundInert(true);
  requestAnimationFrame(() => bookingModal.classList.add("is-open"));
  window.setTimeout(() => bookingForm?.querySelector("input[name='name']")?.focus(), 420);
};

const closeBookingModal = () => {
  if (!bookingModal || bookingModal.hidden) return;
  bookingModal.classList.remove("is-open");
  bookingModal.setAttribute("aria-hidden", "true");
  body.classList.remove("modal-open");
  setBackgroundInert(false);
  closeModalTimer = window.setTimeout(() => {
    bookingModal.hidden = true;
    lastFocusedElement?.focus();
  }, 500);
};

document.querySelectorAll("[data-booking-trigger]").forEach((trigger) => {
  trigger.addEventListener("click", (event) => {
    event.preventDefault();
    openBookingModal(trigger);
  });
});

bookingModal?.querySelectorAll("[data-booking-close]").forEach((button) => {
  button.addEventListener("click", closeBookingModal);
});

document.addEventListener("keydown", (event) => {
  if (bookingModal?.classList.contains("is-open")) trapFocus(event, bookingDialog);
  else if (cardModal?.classList.contains("is-open")) trapFocus(event, cardDialog);
  else if (body.classList.contains("menu-open")) trapFocus(event, mobileMenuPanel);

  if (event.key !== "Escape") return;
  if (cardModal?.classList.contains("is-open")) closeCardModal();
  else if (bookingModal?.classList.contains("is-open")) closeBookingModal();
  else setMenu(false);
});

bookingForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(bookingForm);
  const isEnglish = currentLanguage === "en";
  const name = String(data.get("name") || "").trim();
  const date = String(data.get("date") || "").trim();
  const time = String(data.get("time") || "").trim();
  const guests = String(data.get("guests") || "").trim();
  const note = String(data.get("message") || "").trim();
  const formattedDate = date
    ? new Intl.DateTimeFormat(isEnglish ? "en-GB" : "it-IT", { day: "2-digit", month: "2-digit", year: "numeric" }).format(new Date(`${date}T12:00:00`))
    : "";

  const details = isEnglish
    ? [
        guests ? `for ${guests} ${guests === "1" ? "person" : "people"}` : "",
        formattedDate ? `on ${formattedDate}` : "",
        time ? `at ${time}` : "",
      ].filter(Boolean).join(" ")
    : [
        guests ? `per ${guests} ${guests === "1" ? "persona" : "persone"}` : "",
        formattedDate ? `per il giorno ${formattedDate}` : "",
        time ? `alle ${time}` : "",
      ].filter(Boolean).join(" ");

  const message = isEnglish
    ? [
        `Hello La Taverna, my name is ${name} and I would like to book a table${details ? ` ${details}` : ""}.`,
        note ? `\n${note}` : "",
      ].join("")
    : [
        `Ciao La Taverna, sono ${name} e vorrei prenotare un tavolo${details ? ` ${details}` : ""}.`,
        note ? `\n${note}` : "",
      ].join("");

  window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
});

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const hero = document.querySelector(".hero");
const heroImage = document.querySelector(".hero-image");
const heroTitle = document.querySelector(".hero-title-wrap");
const heroSocials = document.querySelector(".hero-socials");
const scrollCue = document.querySelector(".scroll-cue");
let heroMotionFrame = null;

const updateHeroMotion = () => {
  heroMotionFrame = null;
  if (!hero || !heroImage || !heroTitle || reduceMotion) return;
  const progress = Math.min(1, Math.max(0, window.scrollY / hero.offsetHeight));

  if (progress < 0.002) {
    heroImage.style.removeProperty("transform");
    heroTitle.style.removeProperty("transform");
    heroTitle.style.removeProperty("opacity");
    heroSocials?.style.removeProperty("opacity");
    scrollCue?.style.removeProperty("opacity");
    return;
  }

  heroImage.style.transform = `translate3d(0, ${progress * 7}%, 0) scale(${1 + progress * 0.12})`;
  heroTitle.style.transform = `translate3d(0, ${progress * -11}vh, 0) scale(${1 - progress * 0.045})`;
  heroTitle.style.opacity = String(Math.max(0, 1 - progress * 1.22));
  if (heroSocials) heroSocials.style.opacity = String(Math.max(0, 1 - progress * 1.7));
  if (scrollCue) scrollCue.style.opacity = String(Math.max(0, 1 - progress * 2.1));
};

if (!reduceMotion) {
  window.addEventListener("scroll", () => {
    if (heroMotionFrame !== null) return;
    heroMotionFrame = requestAnimationFrame(updateHeroMotion);
  }, { passive: true });
}

const reveals = document.querySelectorAll(".reveal");

if (reduceMotion || !("IntersectionObserver" in window)) {
  reveals.forEach((element) => element.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.1 }
  );

  reveals.forEach((element) => revealObserver.observe(element));
}

applyLanguage("it");
renderCatalog();

const year = document.querySelector("[data-year]");
if (year) year.textContent = new Date().getFullYear();
