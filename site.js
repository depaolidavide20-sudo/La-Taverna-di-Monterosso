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

if ("scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

const resetInitialHeroScroll = () => {
  const hash = window.location.hash;
  const isMobileViewport = window.matchMedia?.("(max-width: 760px)")?.matches ?? window.innerWidth <= 760;
  if (hash && hash !== "#top") {
    if (!isMobileViewport) return;
    window.history.replaceState(null, document.title, `${window.location.pathname}${window.location.search}`);
  }
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
};

const scheduleInitialHeroScrollReset = () => {
  resetInitialHeroScroll();
  window.requestAnimationFrame(resetInitialHeroScroll);
  window.setTimeout(resetInitialHeroScroll, 80);
  window.setTimeout(resetInitialHeroScroll, 260);
};

scheduleInitialHeroScrollReset();
window.addEventListener("pageshow", scheduleInitialHeroScrollReset);
window.addEventListener("load", scheduleInitialHeroScrollReset, { once: true });

const translations = {
  it: {
    skip: "Vai al contenuto",
    "nav.story": "Storia",
    "nav.restaurant": "Ristorante",
    "nav.location": "Location",
    "nav.luggage": "Deposito bagagli",
    "nav.reviews": "Recensioni",
    "nav.contacts": "Contatti",
    "cta.book": "Prenota",
    "cta.bookTable": "Prenota un tavolo",
    "cta.menu": "Scopri il nostro menù",
    "cta.wine": "Carta dei Vini",
    "cta.call": "Chiama ora",
    "card.food": "Menù",
    "card.wine": "Carta dei Vini",
    "card.note": "Coperto 4 euro. In caso di allergie o intolleranze, prima di ordinare informa il personale di sala. Alcuni prodotti possono essere sottoposti ad abbattimento rapido della temperatura. La carta può variare secondo stagione e disponibilità.",
    "card.wineNote": "Etichette e annate possono variare secondo disponibilità. Chiedi al personale il suggerimento del giorno.",
    "hero.overline": "Ristorante - Pizzeria",
    "hero.hours": "<span>PRANZO, CENA &amp; CONVIVIALITÀ</span> CUCINA ITALIANA - PESCE - CARNE - PIZZA",
    "hero.edge": "Cucina italiana & sapori liguri",
    "hero.discover": "Scopri La Taverna",
    "story.kicker": "01 STORIA",
    "story.title": "La nostra storia",
    "story.copy1": "La mia storia in cucina inizia nel lontano <strong>1982</strong>. Dopo aver appreso i segreti della cucina siciliana e della tradizione italiana, ho trasformato questa passione in un viaggio che mi ha accompagnato per oltre quarant'anni.",
    "story.copy2": "Nel corso degli anni ho dato vita a <strong>cinque ristoranti</strong>. Il primo a <strong>Milazzo, in Sicilia</strong>, con una cucina incentrata sul pesce. Successivamente sono arrivati altri quattro locali: uno a Sarzana, dedicato alla carne, e tre nelle Cinque Terre, tra Riomaggiore e Monterosso, fino ad arrivare a <strong>La Taverna</strong>.",
    "story.copy3": "La mia cucina è rimasta fedele a un principio semplice: <strong>rispettare la materia prima e lasciare che siano i suoi sapori autentici a parlare</strong>. Una cucina tradizionale, fatta di esperienza, cura e attenzione.",
    "story.quote": "<strong>“Solo osservando tutti i piccoli dettagli si possono ottenere grandi cose.”</strong>",
    "story.copy4": "È questa filosofia, insieme all'amore e alla passione per il mio lavoro, che ancora oggi mi spinge a continuare il viaggio iniziato tanti anni fa.",
    "restaurant.kicker": "02 Ristorante",
    "restaurant.copy1": "Piatti italiani, specialità di mare e sapori liguri in un ristorante accogliente nel cuore di Monterosso.",
    "restaurant.copy2": "Una tavola semplice, curata e generosa per vivere pranzo e cena tra le Cinque Terre.",
    "restaurant.mobileCopy": "Cucina italiana, pesce e sapori liguri nel cuore di Monterosso.",
    "food.catch": "Il polpo",
    "food.pizza": "La tartare",
    "food.seafood": "I gamberi rossi",
    "food.pasta": "Il risotto di mare",
    "food.ligurian": "Gli spaghetti alle vongole",
    "food.meatCellar": "La selezione di carne",
    "food.frittoMisto": "La frittura",
    "food.fiorentina": "La fiorentina",
    "food.ribs": "Le costolette",
    "food.semifreddo": "Il semifreddo",
    "food.houseDessert": "Il dolce della casa",
    "location.kicker": "03 Location",
    "location.copy1": "Via Molinelli 39, a pochi passi dal ritmo luminoso di Monterosso al Mare.",
    "location.copy2": "Sala, tavoli all'aperto e atmosfera informale per una sosta di gusto nelle Cinque Terre.",
    "location.front": "La tavola",
    "location.exterior": "L'esterno",
    "location.outdoor": "La tavola",
    "location.room": "La sala",
    "location.table": "I dettagli",
    "location.details": "I dettagli",
    "location.terrace1": "La terrazza",
    "location.terrace2": "Il dehors",
    "location.terrace3": "L'atmosfera",
    "luggage.kicker": "04 BAGAGLI",
    "luggage.title": "Deposito bagagli",
    "luggage.copy": "Lascia le valigie e gli zaini in un punto comodo nel cuore di Monterosso e goditi mare, vicoli e partenza senza peso.",
    "luggage.badge": "Servizio turistico",
    "luggage.large": "Bagaglio/valigia grande",
    "luggage.medium": "Bagaglio/valigia media",
    "luggage.backpack": "Zaino",
    "luggage.book": "Prenota deposito",
    "luggage.formKicker": "Scrivici su WhatsApp",
    "luggage.formTitle": "Prenota<br><em>il deposito.</em>",
    "luggage.formIntro": "Scegli il tipo di bagaglio: prepareremo il messaggio e ti chiederemo il consenso prima di aprire WhatsApp.",
    "luggage.type": "Tipo bagaglio *",
    "luggage.quantity": "Quantità",
    "luggage.optionLarge": "Bagaglio/valigia grande - 5€",
    "luggage.optionMedium": "Bagaglio/valigia media - 3€",
    "luggage.optionBackpack": "Zaino - 2€",
    "luggage.placeholder": "Orario di ritiro o informazioni utili",
    "reviews.kicker": "05 Recensioni",
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
    "contacts.kicker": "06 Contatti",
    "contacts.title": "Contatti",
    "contacts.where": "Dove siamo",
    "contacts.hoursLabel": "Orari",
    "contacts.hours": "Pranzo e cena<br>tutti i giorni",
    "contacts.phone": "Telefono",
    "contacts.email": "Email",
    "contacts.socialLabel": "Email",
    "contacts.mapLabel": "Monterosso al Mare · Cinque Terre",
    "contacts.openMap": "Apri su Google Maps",
    "footer.tagline": "La cucina italiana,<br>il respiro del mare.",
    "footer.top": "Torna su",
    "legal.privacy": "Privacy",
    "legal.cookies": "Cookie",
    "legal.notes": "Note legali",
    "legal.manageCookies": "Gestisci cookie",
    "cookie.title": "Privacy e servizi esterni",
    "cookie.copy": "Usiamo solo strumenti tecnici. Per aprire WhatsApp dai form o caricare Google Maps ti chiediamo prima il consenso ai servizi esterni.",
    "cookie.necessary": "Solo necessari",
    "cookie.accept": "Accetta servizi esterni",
    "cookie.preferences": "Dettagli",
    "map.notice": "La mappa di Google viene caricata solo dopo il consenso ai servizi esterni.",
    "map.load": "Carica la mappa",
    "form.kicker": "Scrivici su WhatsApp",
    "form.title": "Raccontaci<br><em>cosa desideri.</em>",
    "form.intro": "Compila i campi: prepareremo il messaggio e ti chiederemo il consenso prima di aprire WhatsApp.",
    "form.name": "Nome e cognome *",
    "form.date": "Data",
    "form.time": "Orario",
    "form.guests": "Persone",
    "form.choose": "Scegli",
    "form.message": "Messaggio",
    "form.placeholder": "Richieste o informazioni utili",
    "form.submit": "Continua su WhatsApp",
    "form.note": "Nessun dato viene salvato sul sito: prima di aprire WhatsApp ti chiediamo il consenso ai servizi esterni.",
  },
  en: {
    skip: "Skip to content",
    "nav.story": "Story",
    "nav.restaurant": "Restaurant",
    "nav.location": "Location",
    "nav.luggage": "Luggage storage",
    "nav.reviews": "Reviews",
    "nav.contacts": "Contacts",
    "cta.book": "Book now",
    "cta.bookTable": "Book a table",
    "cta.menu": "Discover our menu",
    "cta.wine": "Wine list",
    "cta.call": "Call now",
    "card.food": "Menu",
    "card.wine": "Wine list",
    "card.note": "Table charge 4 euros. In case of allergies or intolerances, please inform our staff before ordering. Some products may be blast chilled. The menu may vary according to season and availability.",
    "card.wineNote": "Labels and vintages may vary according to availability. Ask our staff for today's recommendation.",
    "hero.overline": "Restaurant - Pizzeria",
    "hero.hours": "<span>LUNCH, DINNER &amp; CONVIVIALITY</span> ITALIAN CUISINE - SEAFOOD - MEAT - PIZZA",
    "hero.edge": "Italian cuisine & Ligurian flavours",
    "hero.discover": "Discover La Taverna",
    "story.kicker": "01 STORY",
    "story.title": "Our story",
    "story.copy1": "My story in the kitchen began back in <strong>1982</strong>. After learning the secrets of Sicilian cuisine and Italian tradition, I turned this passion into a journey that has stayed with me for more than forty years.",
    "story.copy2": "Over the years I opened <strong>five restaurants</strong>. The first was in <strong>Milazzo, Sicily</strong>, with cuisine focused on seafood. Later came four more places: one in Sarzana dedicated to meat, and three in the Cinque Terre, between Riomaggiore and Monterosso, leading to <strong>La Taverna</strong>.",
    "story.copy3": "My cuisine has remained faithful to a simple principle: <strong>respecting the raw ingredient and letting its authentic flavours speak</strong>. Traditional cooking, shaped by experience, care and attention.",
    "story.quote": "<strong>“Only by observing every small detail can great things be achieved.”</strong>",
    "story.copy4": "This philosophy, together with love and passion for my work, is what still drives me to continue the journey that began so many years ago.",
    "restaurant.kicker": "02 Restaurant",
    "restaurant.copy1": "Italian dishes, seafood specialities and Ligurian flavours in a welcoming restaurant in the heart of Monterosso.",
    "restaurant.copy2": "A simple, curated and generous table for lunch and dinner in the Cinque Terre.",
    "restaurant.mobileCopy": "Italian cuisine, seafood and Ligurian flavours in the heart of Monterosso.",
    "food.catch": "Octopus",
    "food.pizza": "Tartare",
    "food.seafood": "Red prawns",
    "food.pasta": "Seafood risotto",
    "food.ligurian": "Spaghetti with clams",
    "food.meatCellar": "Meat selection",
    "food.frittoMisto": "Mixed fried seafood",
    "food.fiorentina": "Fiorentina steak",
    "food.ribs": "Grilled ribs",
    "food.semifreddo": "Semifreddo",
    "food.houseDessert": "House dessert",
    "location.kicker": "03 Location",
    "location.copy1": "Via Molinelli 39, close to the bright rhythm of Monterosso al Mare.",
    "location.copy2": "Dining room, outdoor tables and an informal mood for a tasteful stop in the Cinque Terre.",
    "location.front": "The table",
    "location.exterior": "The outdoor terrace",
    "location.outdoor": "The table",
    "location.room": "The dining room",
    "location.table": "The details",
    "location.details": "The details",
    "location.terrace1": "The terrace",
    "location.terrace2": "The outdoor dining area",
    "location.terrace3": "The atmosphere",
    "luggage.kicker": "04 LUGGAGE",
    "luggage.title": "Luggage storage",
    "luggage.copy": "Leave your suitcases and backpacks in a convenient spot in the heart of Monterosso and enjoy the sea, lanes and departure hands-free.",
    "luggage.badge": "Tourist service",
    "luggage.large": "Large bag/suitcase",
    "luggage.medium": "Medium bag/suitcase",
    "luggage.backpack": "Backpack",
    "luggage.book": "Book storage",
    "luggage.formKicker": "Message us on WhatsApp",
    "luggage.formTitle": "Book<br><em>storage.</em>",
    "luggage.formIntro": "Choose the luggage type: we will prepare your message and ask for consent before opening WhatsApp.",
    "luggage.type": "Luggage type *",
    "luggage.quantity": "Quantity",
    "luggage.optionLarge": "Large bag/suitcase - €5",
    "luggage.optionMedium": "Medium bag/suitcase - €3",
    "luggage.optionBackpack": "Backpack - €2",
    "luggage.placeholder": "Pick-up time or useful information",
    "reviews.kicker": "05 Reviews",
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
    "contacts.kicker": "06 Contacts",
    "contacts.title": "Contacts",
    "contacts.where": "Find us",
    "contacts.hoursLabel": "Opening hours",
    "contacts.hours": "Lunch and dinner<br>every day",
    "contacts.phone": "Phone",
    "contacts.email": "Email",
    "contacts.socialLabel": "Email",
    "contacts.mapLabel": "Monterosso al Mare · Cinque Terre",
    "contacts.openMap": "Open in Google Maps",
    "footer.tagline": "Italian cuisine,<br>the breath of the sea.",
    "footer.top": "Back to top",
    "legal.privacy": "Privacy",
    "legal.cookies": "Cookies",
    "legal.notes": "Legal notes",
    "legal.manageCookies": "Manage cookies",
    "cookie.title": "Privacy and external services",
    "cookie.copy": "We only use technical tools. To open WhatsApp from forms or load Google Maps, we ask for your consent to external services first.",
    "cookie.necessary": "Necessary only",
    "cookie.accept": "Accept external services",
    "cookie.preferences": "Details",
    "map.notice": "Google Maps is loaded only after consent to external services.",
    "map.load": "Load map",
    "form.kicker": "Message us on WhatsApp",
    "form.title": "Tell us<br><em>what you need.</em>",
    "form.intro": "Complete the fields: we will prepare your message and ask for consent before opening WhatsApp.",
    "form.name": "Full name *",
    "form.date": "Date",
    "form.time": "Time",
    "form.guests": "Guests",
    "form.choose": "Select",
    "form.message": "Message",
    "form.placeholder": "Requests or useful information",
    "form.submit": "Continue on WhatsApp",
    "form.note": "No data is stored on this website: we ask for consent to external services before opening WhatsApp.",
  },
};

const menuCatalogs = {
  food: {
    intro: {
      it: {
        kicker: "La Taverna · Menu 2026",
        title: "Il nostro<br><em>menù.</em>",
        description: "Antipasti, primi, secondi, contorni e dessert. Coperto 4 euro. La carta può variare secondo stagione e disponibilità.",
      },
      en: {
        kicker: "La Taverna · 2026 menu",
        title: "Our<br><em>menu.</em>",
        description: "Starters, first courses, second courses, side dishes and desserts. Table charge 4 euros. The menu may vary according to season and availability.",
      },
    },
    sections: [
      {
        it: "Antipasti", en: "Starters",
        items: [
          { it: "Degustazione di antipasti", en: "Appetizer tasting", price: "€ 40,00" },
          { it: "Frittelle di baccalà con crema di patate", en: "Cod fritters with potato cream", price: "€ 18,00" },
          { it: "Tartara di tonno al sapore mediterraneo", en: "Tuna tartare", price: "€ 22,00" },
          { it: "Cozze ripiene alla ligure", en: "Stuffed mussels Ligurian style", price: "€ 16,00" },
          { it: "Acciughe ripiene", en: "Stuffed anchovies", price: "€ 16,00" },
          { it: "Insalata di polpo su crema di patate", en: "Octopus salad on potato cream", price: "€ 16,00" },
          { it: "Ostriche S.Q. (1 pezzo)", en: "Oyster S.Q. (1 piece)", price: "€ 6,00" },
          { it: "Acciughe al limone e pomodorini", en: "Anchovies with lemon and cherry tomatoes", price: "€ 16,00" },
          { it: "Caprese (pomodoro, mozzarella, basilico)", en: "Tomato, mozzarella and basil", price: "€ 15,00" },
        ],
      },
      {
        it: "Secondi di pesce", en: "Fish second courses",
        items: [
          { it: "Astice alla griglia o gratinata", en: "Grilled or au gratin lobster", price: "€ 40,00" },
          { it: "Orata alla griglia", en: "Grilled sea bream", price: "€ 25,00" },
          { it: "Gamberoni, scampi e astice alla griglia", en: "Grilled prawns, scampi and lobster", price: "€ 45,00" },
          { it: "Branzino in crosta di sale con crema limone", en: "Sea bass in salt crust with lemon cream", price: "€ 35,00" },
          { it: "Pesce spada alla griglia o marinara", en: "Grilled swordfish or marinara sauce", price: "€ 22,00" },
          { it: "Pesce al forno con verdure miste", en: "Baked local fish with mixed vegetables", price: "€ 30,00" },
          { it: "Frittura mista di pesce", en: "Mixed fried seafood", price: "€ 22,00" },
          { it: "Tonno alle erbe liguri con crema balsamica", en: "Tuna steak with Ligurian herbs and balsamic cream", price: "€ 25,00" },
          { it: "Acciughe fritte", en: "Fried local anchovies", price: "€ 18,00" },
        ],
      },
      {
        it: "Primi piatti", en: "Pasta and rice",
        items: [
          { it: "Risotto con frutti di mare", en: "Seafood risotto", price: "€ 22,00" },
          { it: "Spaghetti alle vongole veraci", en: "Spaghetti with clams", price: "€ 22,00" },
          { it: "Spaghetti alla Taverna con frutti di mare", en: "Seafood spaghetti in foil", price: "€ 22,00" },
          { it: "Ravioli ricotta e spinaci con burro e salvia", en: "Ricotta and spinach ravioli with butter and sage", price: "€ 18,00" },
          { it: "Trofie al pesto e patate", en: "Trofie with pesto and potatoes", price: "€ 18,00" },
          { it: "Penne con gamberi, tartufo e zucchine", en: "Penne with shrimps, truffle and courgettes", price: "€ 22,00" },
          { it: "Spaghetti alla carbonara", en: "Spaghetti carbonara", price: "€ 18,00" },
          { it: "Penne al salmone", en: "Penne with smoked salmon", price: "€ 22,00" },
          { it: "Pasta al ragù", en: "Pasta with meat sauce", price: "€ 15,00" },
        ],
      },
      {
        it: "Selezione di carne", en: "Meat selection",
        items: [
          { it: "Picanha Argentina alla griglia", en: "Grilled Argentinian picanha", price: "€ 28,00" },
          { it: "Fiorentina 18/24 mesi dry age, al kg", en: "Dry-aged Fiorentina steak, per kg", price: "€ 60,00" },
          { it: "Cowboy steak, al kg", en: "Cowboy steak, per kg", price: "€ 60,00" },
          { it: "Costata di manzo di scottona, 500 g", en: "Scottona beef rib steak, 500 g", price: "€ 35,00" },
          { it: "Angus di scottona Irlanda/Scozia, al kg", en: "Irish/Scottish Angus beef, per kg", price: "€ 70,00" },
          { it: "Tomahawk alla griglia, al kg", en: "Grilled tomahawk steak, per kg", price: "€ 60,00" },
          { it: "Controfiletto di scottona, 300 g", en: "Grilled sirloin steak, 300 g", price: "€ 28,00" },
          { it: "Tartara di filetto al coltello con salsine", en: "Hand-cut fillet tartare with sauces", price: "€ 22,00" },
          { it: "Spiedini di manzo alla griglia", en: "Grilled beef skewers", price: "€ 22,00" },
          { it: "Costolette di agnello alla griglia", en: "Grilled lamb chops", price: "€ 22,00" },
        ],
      },
      {
        it: "Pizze", en: "Pizza",
        items: [
          { it: "Margherita (pomodoro e mozzarella)", en: "Tomato and mozzarella", price: "€ 11,00" },
          { it: "Marinara (pomodoro, aglio e origano)", en: "Tomato, garlic and oregano", price: "€ 10,00" },
          { it: "Napoli (mozzarella, acciughe, capperi)", en: "Tomato, mozzarella, anchovies and capers", price: "€ 14,00" },
          { it: "4 Stagioni (pomodoro, mozzarella, funghi, carciofi, prosciutto cotto)", en: "Tomato, mozzarella, mushrooms, artichokes and baked ham", price: "€ 16,00" },
          { it: "Pizza prosciutto crudo (pomodoro, mozzarella, prosciutto crudo)", en: "Tomato, mozzarella and Parma ham", price: "€ 16,00" },
          { it: "4 Formaggi (mozzarella, mascarpone, gorgonzola, formaggio fuso)", en: "Mozzarella, mascarpone, gorgonzola and melted cheese", price: "€ 18,00" },
          { it: "Pizza salame (pomodoro, mozzarella, salame piccante)", en: "Tomato, mozzarella and spicy salami", price: "€ 14,00" },
          { it: "Pizza vegetariana (pomodoro, mozzarella, verdure miste)", en: "Tomato, mozzarella and mixed vegetables", price: "€ 16,00" },
          { it: "Pizza alla Taverna (pomodoro, mozzarella, bufala, olive, tartufo, carciofi, rucola, pancetta)", en: "Tomato, mozzarella, buffalo mozzarella, olives, truffle, artichokes, rocket and bacon", price: "€ 18,00" },
          { it: "Pizza ai funghi porcini (pomodorini, mozzarella, porcini)", en: "Cherry tomatoes, mozzarella and porcini mushrooms", price: "€ 16,00" },
          { it: "Pizza wurstel e patatine (pomodoro, mozzarella, wurstel, patatine fritte)", en: "Tomato, mozzarella, wurstel and french fries", price: "€ 15,00" },
        ],
      },
      {
        it: "Contorni", en: "Side dishes",
        items: [
          { it: "Patatine fritte", en: "French fries", price: "€ 6,00" },
          { it: "Insalata mista", en: "Mixed salad", price: "€ 8,00" },
          { it: "Verdure miste al forno", en: "Mixed baked vegetables", price: "€ 8,00" },
          { it: "Spinaci in padella", en: "Pan-fried spinach", price: "€ 8,00" },
        ],
      },
      {
        it: "Dessert", en: "Desserts",
        items: [
          { it: "Tiramisù della casa", en: "Homemade tiramisu", price: "€ 8,00" },
          { it: "Panna cotta con caramello o cioccolato", en: "Homemade panna cotta with caramel or chocolate", price: "€ 7,00" },
          { it: "Sorbetto al limone", en: "Lemon sorbet", price: "€ 8,00" },
          { it: "Mousse di maracuja", en: "Passion fruit cream", price: "€ 7,00" },
          { it: "Ananas", en: "Pineapple", price: "€ 8,00" },
          { it: "Crema catalana", en: "Catalan cream", price: "€ 8,00" },
        ],
      },
    ],
  },
  wine: {
    intro: {
      it: {
        kicker: "La Taverna · Carta 2026",
        title: "Carta<br><em>dei Vini.</em>",
        description: "Rossi, bianchi e bollicine. Etichette e annate possono variare secondo disponibilità.",
      },
      en: {
        kicker: "La Taverna · 2026 wine list",
        title: "Wine<br><em>list.</em>",
        description: "Red wines, white wines and sparkling wines. Labels and vintages may vary according to availability.",
      },
    },
    sections: [
      {
        it: "Bollicine", en: "Sparkling",
        items: [
          { it: "Champagne Pierre Le Gras", price: "€ 80,00" },
          { it: "Champagne Grand Cru Seconde-Simon", price: "€ 80,00" },
          { it: "Champagne Théophile", price: "€ 120,00" },
          { it: "Quadra Franciacorta Brut Qblack Metodo Champenoise", price: "€ 50,00" },
          { it: "Quadra Franciacorta Brut Qsaten Metodo Champenoise", price: "€ 50,00" },
          { it: "Turra Franciacorta Brut", price: "€ 50,00" },
          { it: "Follador Valdobbiadene Prosecco Superiore Extra Brut", price: "€ 30,00" },
          { it: "Belcanto Valdobbiadene Prosecco Superiore DOCG Brut", price: "€ 35,00" },
          { it: "Belcanto Millesimato Dry Vino Spumante VSQ", price: "€ 25,00" },
          { it: "Planeta Spumante Brut Metodo Classico DOC", price: "€ 30,00" },
          { it: "Le Contesse Brut DOC", price: "€ 25,00" },
          { it: "Le Contesse Extra Brut", price: "€ 22,00" },
          { it: "Grande Bellussi Cuvée Vino Spumante Extra Dry", price: "€ 25,00" },
          { it: "Montù Beccaria Moscato Spumante Dolce", price: "€ 35,00" },
          { it: "Ca' Ernesto Prosecco Rosé DOC", price: "€ 25,00" },
          { it: "Rosa Mara Rosé DOC", price: "€ 30,00" },
        ],
      },
      {
        it: "Vini bianchi", en: "White wines",
        items: [
          { it: "Cantina Sassarini Monterosso al Mare DOC 5 Terre", price: "€ 32,00" },
          { it: "Etna Planeta Sicilia", price: "€ 30,00" },
          { it: "Cooperativa Riomaggiore DOC 5 Terre", price: "€ 32,00" },
          { it: "Pinot Grigio Cantina Livon", price: "€ 30,00" },
          { it: "Cantina Siddura Vermentino Sardegna", price: "€ 32,00" },
          { it: "Cooperativa di Riomaggiore Costa de Campu 5 Terre DOC", price: "€ 40,00" },
          { it: "Cooperativa Riomaggiore Costa di Posa DOC", price: "€ 40,00" },
          { it: "Cooperativa di Riomaggiore Costa di Serra", price: "€ 40,00" },
          { it: "Vino Frizzante Riesling", price: "€ 30,00" },
          { it: "Cantina Livon Chardonnay", price: "€ 28,00" },
          { it: "Vino Dolce Moscato", price: "€ 28,00" },
        ],
      },
      {
        it: "Vini rossi", en: "Red wines",
        items: [
          { it: "Negro Amaro Calice Rosso", price: "€ 25,00" },
          { it: "Cantina della Corte Sangue Nero", price: "€ 40,00" },
          { it: "Rosso di Autore Perla Nera", price: "€ 35,00" },
          { it: "Cantina della Corte Valpolicella Ripasso", price: "€ 30,00" },
          { it: "Nero d'Avola", price: "€ 25,00" },
          { it: "Morellino di Scansano", price: "€ 28,00" },
          { it: "Negro Amaro", price: "€ 25,00" },
          { it: "Ripasso Valpolicella Fra Libri+", price: "€ 30,00" },
          { it: "Cantina della Corte Cabernet", price: "€ 25,00" },
          { it: "Pinot Nero", price: "€ 30,00" },
          { it: "Cantina Solander Lagrein", price: "€ 30,00" },
          { it: "Serna Borgo Molino 932 Tre Venezie", price: "€ 45,00" },
          { it: "Chianti Classico", price: "€ 30,00" },
          { it: "Aglianico Puglia", price: "€ 25,00" },
          { it: "Vino imbottigliato per La Taverna", en: "House wine bottled for La Taverna", price: "€ 24,00" },
          { it: "Cantina della Corte Syrah", price: "€ 25,00" },
        ],
      },
      {
        it: "Vini rossi speciali", en: "Special red wines",
        items: [
          { it: "Toraccia del Pian di Vigna Ghemme", price: "€ 50,00" },
          { it: "Toraccia del Pian di Vigna Gattinara", price: "€ 50,00" },
          { it: "Amarone della Valpolicella Eleva", price: "€ 90,00" },
          { it: "Amarone Cantina Zenato DOCG", price: "€ 110,00" },
          { it: "Amarone Valpolicella DOCG Villa Maria", price: "€ 90,00" },
          { it: "Amarone Cantina della Corte DOCG", price: "€ 80,00" },
          { it: "Amarone Valpolicella Classico Strie", price: "€ 90,00" },
          { it: "Brunello di Montalcino", price: "€ 90,00" },
          { it: "Barolo Tenuta Garetta", price: "€ 80,00" },
          { it: "Barolo Tenuta Rocca", price: "€ 80,00" },
        ],
      },
      {
        it: "Bevande, birre e calici", en: "Drinks, beers and glasses",
        items: [
          { it: "Coca Cola, Cola Zero, Fanta, Sprite, Estathé", price: "€ 4,50" },
          { it: "Birra Peroni cl 66", price: "€ 8,00" },
          { it: "Birra Moretti / Peroni cl 33", price: "€ 4,50" },
          { it: "Birra Ichnusa non filtrata cl 50", price: "€ 8,00" },
          { it: "Calice Prosecco", en: "Glass of Prosecco", price: "€ 8,00" },
          { it: "Calice vino", en: "Glass of local white or red wine", price: "€ 8,00" },
          { it: "Aperol Spritz", price: "€ 10,00" },
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
  menuToggle?.setAttribute("aria-label", open ? "Chiudi il menù" : "Apri il menù");
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

const mobileStickyBook = document.querySelector(".mobile-sticky-book");
const stickyBookSections = [
  { element: document.querySelector("#top"), theme: "dark" },
  { element: document.querySelector("#storia"), theme: "dark" },
  { element: document.querySelector("#ristorante"), theme: "dark" },
  { element: document.querySelector("#location"), theme: "light" },
  { element: document.querySelector("#deposito-bagagli"), theme: "dark" },
  { element: document.querySelector("#recensioni"), theme: "light" },
  { element: document.querySelector("#contatti"), theme: "light" },
  { element: document.querySelector(".site-footer"), theme: "dark" },
].filter(({ element }) => element);

const setStickyBookTheme = (theme) => {
  if (!mobileStickyBook) return;
  const isOnLight = theme === "light";
  mobileStickyBook.classList.toggle("is-on-light", isOnLight);
  mobileStickyBook.classList.toggle("is-on-dark", !isOnLight);
};

const updateStickyBookTheme = () => {
  if (!stickyBookSections.length) return;
  const footerSection = stickyBookSections.find(({ element }) => element.matches(".site-footer"));
  const footerRect = footerSection?.element.getBoundingClientRect();
  if (footerRect && footerRect.top <= window.innerHeight * 0.72 && footerRect.bottom > 0) {
    setStickyBookTheme("dark");
    return;
  }

  const isAtPageEnd = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 12;
  if (isAtPageEnd) {
    setStickyBookTheme("dark");
    return;
  }

  const sampleY = Math.max(96, Math.min(window.innerHeight - 96, window.innerHeight * 0.64));
  const sampleElement = document.elementFromPoint(window.innerWidth / 2, sampleY);
  const activeSection = stickyBookSections.find(({ element }) => element.contains(sampleElement))
    || stickyBookSections.reduce((current, section) => {
      const rect = section.element.getBoundingClientRect();
      const distance = Math.abs(rect.top - sampleY);
      return distance < current.distance ? { section, distance } : current;
    }, { section: stickyBookSections[0], distance: Number.POSITIVE_INFINITY }).section;

  setStickyBookTheme(activeSection.theme);
};

if (mobileStickyBook) {
  setStickyBookTheme("dark");
  updateStickyBookTheme();
  window.addEventListener("scroll", updateStickyBookTheme, { passive: true });
  window.addEventListener("resize", updateStickyBookTheme);
}

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

const findSection = (sections, label) => sections.find((section) => section.it === label);

const getOrderedCatalogSections = (type, sections) => {
  if (type === "food") {
    const starters = findSection(sections, "Antipasti");
    const firstCourses = findSection(sections, "Primi piatti");
    const fishSeconds = findSection(sections, "Secondi di pesce");
    const meatSeconds = findSection(sections, "Selezione di carne");
    const sideDishes = findSection(sections, "Contorni");
    const desserts = findSection(sections, "Dessert");
    const secondCourses = {
      it: "Secondi",
      en: "Second courses",
      items: [...(fishSeconds?.items || []), ...(meatSeconds?.items || [])],
    };

    return [
      starters,
      firstCourses ? { ...firstCourses, it: "Primi", en: "First courses" } : null,
      secondCourses.items.length ? secondCourses : null,
      sideDishes,
      desserts,
    ].filter(Boolean);
  }

  if (type === "wine") {
    const sparkling = findSection(sections, "Bollicine");
    const whites = findSection(sections, "Vini bianchi");
    const reds = findSection(sections, "Vini rossi");
    const specialReds = findSection(sections, "Vini rossi speciali");
    const redWines = {
      it: "Rossi",
      en: "Reds",
      items: [...(reds?.items || []), ...(specialReds?.items || [])],
    };

    return [
      redWines.items.length ? redWines : null,
      whites ? { ...whites, it: "Bianchi", en: "Whites" } : null,
      sparkling ? { ...sparkling, it: "Bollicine", en: "Sparkling" } : null,
    ].filter(Boolean);
  }

  return sections;
};

const renderCatalog = () => {
  if (!cardContent || !cardKicker || !cardTitle || !cardDescription) return;
  const catalog = menuCatalogs[activeCardType];
  const intro = catalog.intro[currentLanguage];
  const sections = getOrderedCatalogSections(activeCardType, catalog.sections);
  cardKicker.textContent = intro.kicker;
  cardTitle.innerHTML = intro.title;
  cardDescription.textContent = intro.description;
  if (catalogNote) catalogNote.textContent = translations[currentLanguage][activeCardType === "food" ? "card.note" : "card.wineNote"];
  cardContent.innerHTML = sections.map((section) => `
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

const luggageModal = document.querySelector("[data-luggage-modal]");
const luggageDialog = luggageModal?.querySelector(".luggage-dialog");
const luggageForm = luggageModal?.querySelector("[data-luggage-form]");
const luggageDateInput = luggageForm?.querySelector("input[name='date']");
let luggageCloseTimer;

if (luggageDateInput) luggageDateInput.min = new Date().toISOString().split("T")[0];

const openLuggageModal = (trigger) => {
  if (!luggageModal || !luggageDialog) return;
  window.clearTimeout(luggageCloseTimer);
  lastFocusedElement = trigger;
  setMenu(false, false);
  luggageModal.hidden = false;
  luggageModal.setAttribute("aria-hidden", "false");
  body.classList.add("modal-open");
  setBackgroundInert(true);
  requestAnimationFrame(() => luggageModal.classList.add("is-open"));
  window.setTimeout(() => luggageForm?.querySelector("input[name='name']")?.focus(), 420);
};

const closeLuggageModal = () => {
  if (!luggageModal || luggageModal.hidden) return;
  luggageModal.classList.remove("is-open");
  luggageModal.setAttribute("aria-hidden", "true");
  body.classList.remove("modal-open");
  setBackgroundInert(false);
  luggageCloseTimer = window.setTimeout(() => {
    luggageModal.hidden = true;
    lastFocusedElement?.focus();
  }, 500);
};

document.querySelectorAll("[data-luggage-trigger]").forEach((trigger) => {
  trigger.addEventListener("click", (event) => {
    event.preventDefault();
    openLuggageModal(trigger);
  });
});

luggageModal?.querySelectorAll("[data-luggage-close]").forEach((button) => {
  button.addEventListener("click", closeLuggageModal);
});

const legalModal = document.querySelector("[data-legal-modal]");
const legalDialog = legalModal?.querySelector(".legal-dialog");
let legalCloseTimer;

const setLegalTab = (tab = "privacy") => {
  const nextTab = legalModal?.querySelector(`[data-legal-tab="${tab}"]`) ? tab : "privacy";
  legalModal?.querySelectorAll("[data-legal-tab]").forEach((button) => {
    const active = button.dataset.legalTab === nextTab;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-selected", String(active));
  });
  legalModal?.querySelectorAll("[data-legal-panel]").forEach((panel) => {
    const active = panel.dataset.legalPanel === nextTab;
    panel.classList.toggle("is-active", active);
  });
};

const openLegalModal = (tab, trigger) => {
  if (!legalModal || !legalDialog) return;
  window.clearTimeout(legalCloseTimer);
  lastFocusedElement = trigger || document.activeElement;
  setMenu(false, false);
  setLegalTab(tab);
  legalModal.hidden = false;
  legalModal.setAttribute("aria-hidden", "false");
  body.classList.add("modal-open");
  setBackgroundInert(true);
  requestAnimationFrame(() => {
    legalModal.classList.add("is-open");
    window.setTimeout(() => legalModal.querySelector("[data-legal-close]")?.focus(), 260);
  });
};

const closeLegalModal = () => {
  if (!legalModal || legalModal.hidden) return;
  legalModal.classList.remove("is-open");
  legalModal.setAttribute("aria-hidden", "true");
  body.classList.remove("modal-open");
  setBackgroundInert(false);
  legalCloseTimer = window.setTimeout(() => {
    legalModal.hidden = true;
    lastFocusedElement?.focus();
  }, 450);
};

document.querySelectorAll("[data-legal-trigger]").forEach((trigger) => {
  trigger.addEventListener("click", (event) => {
    event.preventDefault();
    openLegalModal(trigger.dataset.legalTrigger, trigger);
  });
});

legalModal?.querySelectorAll("[data-legal-close]").forEach((button) => {
  button.addEventListener("click", closeLegalModal);
});

legalModal?.querySelectorAll("[data-legal-tab]").forEach((button) => {
  button.addEventListener("click", () => setLegalTab(button.dataset.legalTab));
});

const consentStorageKey = "laTavernaExternalServicesConsent";
const cookieBanner = document.querySelector("[data-cookie-banner]");
const mapFrame = document.querySelector("[data-map-src]");
const mapConsent = document.querySelector("[data-map-consent]");
const mapFrameWrap = mapFrame?.closest(".map-frame");
let externalServicesAllowed = false;
let pendingExternalAction = null;

const readConsent = () => {
  try {
    return JSON.parse(window.localStorage.getItem(consentStorageKey) || "null");
  } catch {
    return null;
  }
};

const saveConsent = (externalServices) => {
  try {
    window.localStorage.setItem(consentStorageKey, JSON.stringify({ externalServices, savedAt: new Date().toISOString() }));
  } catch {
    // Consent still applies for this page view even when storage is unavailable.
  }
};

const showCookieBanner = () => {
  if (!cookieBanner) return;
  cookieBanner.hidden = false;
  requestAnimationFrame(() => cookieBanner.classList.add("is-visible"));
};

const hideCookieBanner = () => {
  if (!cookieBanner) return;
  cookieBanner.classList.remove("is-visible");
  window.setTimeout(() => {
    cookieBanner.hidden = true;
  }, 220);
};

const hasExternalServicesConsent = () => externalServicesAllowed || readConsent()?.externalServices === true;

const openExternalUrl = (url) => window.open(url, "_blank", "noopener,noreferrer");

const requestExternalUrl = (url) => {
  if (hasExternalServicesConsent()) {
    openExternalUrl(url);
    return true;
  }

  pendingExternalAction = () => openExternalUrl(url);
  showCookieBanner();
  return false;
};

const loadExternalMap = ({ persist = true } = {}) => {
  if (!mapFrame) return;
  if (!mapFrame.getAttribute("src")) mapFrame.setAttribute("src", mapFrame.dataset.mapSrc || "");
  mapFrameWrap?.classList.add("map-loaded");
  if (mapConsent) mapConsent.hidden = true;
  if (persist) saveConsent(true);
};

const unloadExternalMap = () => {
  mapFrame?.removeAttribute("src");
  mapFrameWrap?.classList.remove("map-loaded");
  if (mapConsent) mapConsent.hidden = false;
};

const setExternalConsent = (externalServices) => {
  externalServicesAllowed = externalServices;
  saveConsent(externalServices);
  if (externalServices) loadExternalMap({ persist: false });
  else unloadExternalMap();
  hideCookieBanner();

  const action = externalServices ? pendingExternalAction : null;
  pendingExternalAction = null;
  action?.();
};

document.querySelector("[data-cookie-accept]")?.addEventListener("click", () => setExternalConsent(true));
document.querySelector("[data-cookie-necessary]")?.addEventListener("click", () => setExternalConsent(false));
document.querySelector("[data-map-load]")?.addEventListener("click", () => {
  setExternalConsent(true);
});

document.querySelectorAll("a[href*='google.com/maps']").forEach((link) => {
  link.addEventListener("click", (event) => {
    if (hasExternalServicesConsent()) return;
    event.preventDefault();
    requestExternalUrl(link.href);
  });
});

document.querySelectorAll("[data-cookie-manage]").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    showCookieBanner();
  });
});

const initialConsent = readConsent();
externalServicesAllowed = initialConsent?.externalServices === true;
if (initialConsent?.externalServices) {
  loadExternalMap({ persist: false });
} else if (initialConsent) {
  unloadExternalMap();
} else {
  unloadExternalMap();
  showCookieBanner();
}

document.addEventListener("keydown", (event) => {
  if (bookingModal?.classList.contains("is-open")) trapFocus(event, bookingDialog);
  else if (luggageModal?.classList.contains("is-open")) trapFocus(event, luggageDialog);
  else if (cardModal?.classList.contains("is-open")) trapFocus(event, cardDialog);
  else if (legalModal?.classList.contains("is-open")) trapFocus(event, legalDialog);
  else if (body.classList.contains("menu-open")) trapFocus(event, mobileMenuPanel);

  if (event.key !== "Escape") return;
  if (cardModal?.classList.contains("is-open")) closeCardModal();
  else if (bookingModal?.classList.contains("is-open")) closeBookingModal();
  else if (luggageModal?.classList.contains("is-open")) closeLuggageModal();
  else if (legalModal?.classList.contains("is-open")) closeLegalModal();
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

  requestExternalUrl(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`);
});

luggageForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(luggageForm);
  const isEnglish = currentLanguage === "en";
  const name = String(data.get("name") || "").trim();
  const date = String(data.get("date") || "").trim();
  const time = String(data.get("time") || "").trim();
  const item = String(data.get("item") || "").trim();
  const quantity = String(data.get("quantity") || "1").trim() || "1";
  const note = String(data.get("message") || "").trim();
  const formattedDate = date
    ? new Intl.DateTimeFormat(isEnglish ? "en-GB" : "it-IT", { day: "2-digit", month: "2-digit", year: "numeric" }).format(new Date(`${date}T12:00:00`))
    : "";

  const details = isEnglish
    ? [
        item ? `Type: ${item}.` : "",
        quantity ? `Quantity: ${quantity}.` : "",
        formattedDate ? `Date: ${formattedDate}.` : "",
        time ? `Time: ${time}.` : "",
      ].filter(Boolean).join(" ")
    : [
        item ? `Tipo: ${item}.` : "",
        quantity ? `Quantità: ${quantity}.` : "",
        formattedDate ? `Giorno: ${formattedDate}.` : "",
        time ? `Orario: ${time}.` : "",
      ].filter(Boolean).join(" ");

  const message = isEnglish
    ? [
        `Hello La Taverna, my name is ${name} and I would like to book luggage storage.`,
        details ? `\n${details}` : "",
        note ? `\n${note}` : "",
      ].join("")
    : [
        `Ciao La Taverna, sono ${name} e vorrei prenotare il deposito bagagli.`,
        details ? `\n${details}` : "",
        note ? `\n${note}` : "",
      ].join("");

  requestExternalUrl(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`);
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
