"use strict";

/* =========================================================
   KAAMSETU
   Frontend-only prototype
   ========================================================= */


/* =========================================================
   NEXORA BRANDING
   ========================================================= */

const nexoraLogoURL = atob(
  "aHR0cHM6Ly9pLmliYi5jby9NeGROVGd2Ri9DaGF0LUdQVC1JbWFnZS1TZXAtMjQtMjAyNi0wMy0zMC01Ni1QTS5wbmc="
);

const nexoraPageURL = atob(
  "aHR0cHM6Ly9pYmIuY28vZnpKMFJYZ2o="
);

const nexoraLogo = document.getElementById("nexoraLogo");
const nexoraLogoLink = document.getElementById("nexoraLogoLink");

if (nexoraLogo) nexoraLogo.src = nexoraLogoURL;
if (nexoraLogoLink) nexoraLogoLink.href = nexoraPageURL;

document.getElementById("copyrightYear").textContent =
  new Date().getFullYear();


/* =========================================================
   HELPERS
   ========================================================= */

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

const esc = s =>
  String(s ?? "").replace(/[&<>"']/g, c => (
    { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]
  ));

const icon = (name, cls = "") =>
  `<svg class="i ${cls}" aria-hidden="true"><use href="#i-${name}"/></svg>`;

const ICON_NAMES = new Set([
  "home","clock","heart","activity","plus","chat","sun","moon","bell","mic","search","pin",
  "filter","star","check","x","shield","compare","send","trash","share","back","bolt","menu",
  "user","camera","calendar","target","sparkle","phone"
]);

const rupee = n => "₹" + Number(n).toLocaleString("en-IN");

const prefersReducedMotion =
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function timeAgo(iso) {
  const s = Math.max(0, (Date.now() - new Date(iso).getTime()) / 1000);
  if (s < 45) return "just now";
  if (s < 3600) return `${Math.round(s / 60)} min ago`;
  if (s < 86400) return `${Math.round(s / 3600)} hr ago`;
  if (s < 604800) return `${Math.round(s / 86400)} d ago`;
  return new Date(iso).toLocaleDateString();
}

const clockTime = iso =>
  iso ? new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "";

function debounce(fn, ms) {
  let t;
  return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); };
}

function countTo(el, to, { dec = 0, dur = 800 } = {}) {

  const from = parseFloat(el.dataset.v || 0);
  el.dataset.v = to;

  if (prefersReducedMotion || from === to) {
    el.textContent = to.toFixed(dec);
    return;
  }

  const t0 = performance.now();

  const step = now => {
    const p = Math.min(1, (now - t0) / dur);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = (from + (to - from) * eased).toFixed(dec);
    if (p < 1) requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
}

function starsHTML(n) {
  return `<span class="stars" aria-label="${n} out of 5">` +
    [1, 2, 3, 4, 5].map(i => icon("star", i <= Math.round(n) ? "" : "off")).join("") +
    `</span>`;
}


/* =========================================================
   WORKER DATA
   ========================================================= */

const CITIES = {
  "Ghaziabad": ["Raj Nagar", "Indirapuram", "Vaishali"],
  "Noida": ["Sector 18", "Sector 62", "Sector 137"],
  "Greater Noida": ["Alpha 1", "Pari Chowk", "Knowledge Park"],
  "Delhi": ["Dwarka", "Rohini", "Saket"],
  "Gurugram": ["DLF Phase 3", "Sohna Road", "Sector 56"]
};

const CATEGORY_NAMES = {
  home: "Home repair",
  tech: "Technology",
  personal: "Personal services",
  cleaning: "Cleaning",
  transport: "Transport",
  education: "Education"
};

const workerList = [

  {
    id: "rohit", name: "Rohit Kumar", initials: "RK",
    role: "Wi-Fi & Network Technician", category: "tech",
    rating: 4.9, jobs: 128, distance: 1.8, verified: true, available: true,
    availability: "Available now", response: 8, experience: "6 years",
    languages: "Hindi, English", hours: "9 AM – 9 PM",
    pos: { x: 38, y: 38 },
    skills: ["Wi-Fi", "Router", "CCTV", "Broadband", "Networking"],
    intents: ["wifi", "cctv"],
    services: [
      { name: "Wi-Fi / router setup", price: 250 },
      { name: "Broadband troubleshooting", price: 300 },
      { name: "CCTV camera installation", price: 600 },
      { name: "Network cabling (per point)", price: 450 }
    ],
    bio: "Helps with home Wi-Fi, router setup, broadband issues, CCTV and basic networking. Focused on quick home visits and clear explanations.",
    reviews: [
      { name: "Neha", rating: 5, text: "Fixed my router quickly and explained the issue clearly." },
      { name: "Arjun", rating: 5, text: "Good communication and arrived on time." }
    ]
  },

  {
    id: "priya", name: "Priya Sharma", initials: "PS",
    role: "Tailoring & Alterations", category: "personal",
    rating: 4.8, jobs: 94, distance: 2.4, verified: true, available: true,
    availability: "Available today", response: 15, experience: "5 years",
    languages: "Hindi, English", hours: "10 AM – 7 PM",
    pos: { x: 67, y: 30 },
    skills: ["Tailoring", "Alterations", "Stitching", "Custom"],
    intents: ["tailoring"],
    services: [
      { name: "Clothing alterations", price: 150 },
      { name: "Zip / button replacement", price: 180 },
      { name: "Blouse stitching", price: 450 },
      { name: "Suit / kurta stitching", price: 900 }
    ],
    bio: "Provides clothing alterations, stitching and custom tailoring for everyday wear and special occasions.",
    reviews: [
      { name: "Meera", rating: 5, text: "Very neat stitching and delivered when promised." },
      { name: "Riya", rating: 5, text: "Great alteration work and friendly service." }
    ]
  },

  {
    id: "amit", name: "Amit Meena", initials: "AM",
    role: "Electrician & Home Repair", category: "home",
    rating: 4.7, jobs: 76, distance: 3.1, verified: true, available: false,
    availability: "Busy right now", response: 25, experience: "7 years",
    languages: "Hindi", hours: "8 AM – 8 PM",
    pos: { x: 57, y: 69 },
    skills: ["Electrical", "Fan repair", "Wiring", "Switches", "Sockets"],
    intents: ["electrical"],
    services: [
      { name: "Fan repair", price: 200 },
      { name: "Switch / socket replacement", price: 220 },
      { name: "Wiring inspection", price: 350 },
      { name: "MCB / inverter fix", price: 400 }
    ],
    bio: "Handles everyday electrical repairs including fans, switches, sockets, wiring and small home maintenance jobs.",
    reviews: [
      { name: "Rahul", rating: 5, text: "Solved a difficult fan issue without wasting time." },
      { name: "Karan", rating: 4, text: "Professional and explained the repair before starting." }
    ]
  },

  {
    id: "sunil", name: "Sunil Verma", initials: "SV",
    role: "AC & Appliance Technician", category: "home",
    rating: 4.8, jobs: 112, distance: 4.2, verified: true, available: true,
    availability: "Available now", response: 12, experience: "8 years",
    languages: "Hindi, English", hours: "8 AM – 9 PM",
    pos: { x: 24, y: 64 },
    skills: ["AC", "Cooler", "Appliances", "Maintenance"],
    intents: ["ac"],
    services: [
      { name: "Cooler service", price: 350 },
      { name: "AC general service", price: 499 },
      { name: "AC gas refill", price: 1800 },
      { name: "Appliance repair visit", price: 400 }
    ],
    bio: "Home appliance technician specialising in AC servicing, cooler maintenance and common appliance problems.",
    reviews: [
      { name: "Vivek", rating: 5, text: "Quick AC service and fair pricing." }
    ]
  },

  {
    id: "neha", name: "Neha Singh", initials: "NS",
    role: "Home Tutor", category: "education",
    rating: 4.9, jobs: 63, distance: 2.9, verified: true, available: true,
    availability: "Available evenings", response: 30, experience: "4 years",
    languages: "Hindi, English", hours: "4 PM – 8 PM",
    pos: { x: 78, y: 58 },
    skills: ["Maths", "Science", "Class 5–8", "Homework"],
    intents: ["education"],
    services: [
      { name: "Home tuition (1 hour)", price: 300 },
      { name: "Exam preparation (1 hour)", price: 350 },
      { name: "Monthly package (12 hours)", price: 3200 }
    ],
    bio: "Provides personalised tutoring support for school students with a focus on clear explanations and practice.",
    reviews: [
      { name: "Ananya", rating: 5, text: "Explains difficult topics in a very simple way." }
    ]
  },

  {
    id: "mohit", name: "Mohit Yadav", initials: "MY",
    role: "Local Delivery & Transport", category: "transport",
    rating: 4.6, jobs: 87, distance: 1.5, verified: false, available: true,
    availability: "Available now", response: 6, experience: "3 years",
    languages: "Hindi", hours: "7 AM – 10 PM",
    pos: { x: 44, y: 21 },
    skills: ["Local delivery", "Pickup", "Small transport"],
    intents: ["transport"],
    services: [
      { name: "Local delivery", price: 180 },
      { name: "Parcel pickup", price: 200 },
      { name: "Errand run", price: 220 },
      { name: "Small load transport", price: 450 }
    ],
    bio: "Helps with local pickups, deliveries and small transport requirements around the city.",
    reviews: [
      { name: "Aman", rating: 5, text: "Fast local delivery and good communication." }
    ]
  },

  {
    id: "imran", name: "Imran Khan", initials: "IK",
    role: "Plumber", category: "home",
    rating: 4.8, jobs: 101, distance: 2.2, verified: true, available: true,
    availability: "Available now", response: 10, experience: "9 years",
    languages: "Hindi, Urdu", hours: "7 AM – 9 PM",
    pos: { x: 32, y: 55 },
    skills: ["Plumbing", "Leakage", "Taps", "Bathroom fitting", "Water tank"],
    intents: ["plumbing"],
    services: [
      { name: "Tap / leakage repair", price: 220 },
      { name: "Drain unblocking", price: 350 },
      { name: "Bathroom fitting", price: 600 },
      { name: "Water tank cleaning", price: 700 }
    ],
    bio: "Fixes leaks, blocked drains and bathroom fittings quickly, and tidies up after every job.",
    reviews: [
      { name: "Sana", rating: 5, text: "Stopped a leak that two others couldn't find." },
      { name: "Pankaj", rating: 5, text: "Came within the hour and charged exactly what he quoted." }
    ]
  },

  {
    id: "deepak", name: "Deepak Rawat", initials: "DR",
    role: "Carpenter", category: "home",
    rating: 4.7, jobs: 69, distance: 3.6, verified: true, available: true,
    availability: "Available tomorrow", response: 35, experience: "10 years",
    languages: "Hindi", hours: "9 AM – 6 PM",
    pos: { x: 72, y: 80 },
    skills: ["Carpentry", "Furniture", "Door repair", "Wardrobe", "Shelves"],
    intents: ["carpentry"],
    services: [
      { name: "Door / lock repair", price: 300 },
      { name: "Furniture assembly", price: 400 },
      { name: "Wardrobe repair", price: 500 },
      { name: "Custom shelf", price: 1200 }
    ],
    bio: "Repairs and builds furniture, doors, shelves and wardrobes with clean finishing.",
    reviews: [
      { name: "Isha", rating: 5, text: "Built a shelf that fits the wall perfectly." }
    ]
  },

  {
    id: "suresh", name: "Suresh Patel", initials: "SP",
    role: "Painter", category: "home",
    rating: 4.6, jobs: 54, distance: 4.8, verified: false, available: true,
    availability: "Available this week", response: 45, experience: "12 years",
    languages: "Hindi, Gujarati", hours: "8 AM – 6 PM",
    pos: { x: 14, y: 30 },
    skills: ["Painting", "Wall touch-up", "Waterproofing", "Whitewash"],
    intents: ["painting"],
    services: [
      { name: "Wall touch-up", price: 600 },
      { name: "Waterproofing patch", price: 900 },
      { name: "Single room painting", price: 3500 }
    ],
    bio: "Interior painting, touch-ups and damp-patch treatment with neat edges and minimal mess.",
    reviews: [
      { name: "Gaurav", rating: 4, text: "Good finish, took a day longer than planned." }
    ]
  },

  {
    id: "kavita", name: "Kavita Devi", initials: "KD",
    role: "Home Cleaning Specialist", category: "cleaning",
    rating: 4.9, jobs: 140, distance: 2.7, verified: true, available: true,
    availability: "Available today", response: 14, experience: "7 years",
    languages: "Hindi", hours: "8 AM – 6 PM",
    pos: { x: 85, y: 40 },
    skills: ["Deep cleaning", "Kitchen", "Bathroom", "Sofa cleaning"],
    intents: ["cleaning"],
    services: [
      { name: "Bathroom deep clean", price: 350 },
      { name: "Kitchen deep clean", price: 600 },
      { name: "Sofa / carpet cleaning", price: 700 },
      { name: "Full home cleaning", price: 1800 }
    ],
    bio: "Thorough, reliable home cleaning with eco-friendly products and a team that arrives on time.",
    reviews: [
      { name: "Tanya", rating: 5, text: "The kitchen looked brand new. Highly recommend." },
      { name: "Mohan", rating: 5, text: "Very punctual and polite." }
    ]
  },

  {
    id: "anjali", name: "Anjali Gupta", initials: "AG",
    role: "Beautician (at home)", category: "personal",
    rating: 4.8, jobs: 88, distance: 3.3, verified: true, available: false,
    availability: "Busy till 5 PM", response: 20, experience: "6 years",
    languages: "Hindi, English", hours: "10 AM – 8 PM",
    pos: { x: 60, y: 14 },
    skills: ["Haircut", "Facial", "Makeup", "Manicure"],
    intents: ["beauty"],
    services: [
      { name: "Haircut at home", price: 300 },
      { name: "Manicure / pedicure", price: 500 },
      { name: "Facial", price: 600 },
      { name: "Party / bridal makeup", price: 4500 }
    ],
    bio: "Salon-quality beauty services at your doorstep, with hygienic, sealed kits.",
    reviews: [
      { name: "Pooja", rating: 5, text: "Loved my makeup and she was so patient." }
    ]
  },

  {
    id: "vikram", name: "Vikram Singh", initials: "VS",
    role: "Bike & Car Mechanic", category: "transport",
    rating: 4.7, jobs: 96, distance: 3.9, verified: true, available: true,
    availability: "Available now", response: 18, experience: "11 years",
    languages: "Hindi, Punjabi", hours: "8 AM – 8 PM",
    pos: { x: 18, y: 78 },
    skills: ["Bike service", "Puncture", "Battery", "Car check-up"],
    intents: ["mechanic"],
    services: [
      { name: "Puncture repair", price: 100 },
      { name: "Battery jump-start", price: 250 },
      { name: "Bike general service", price: 400 },
      { name: "Car check-up", price: 600 }
    ],
    bio: "Roadside and doorstep help for two-wheelers and cars: punctures, batteries and routine servicing.",
    reviews: [
      { name: "Harsh", rating: 5, text: "Reached me in 15 minutes when my bike died." }
    ]
  }
];

const workers = Object.fromEntries(
  workerList.map(w => {
    w.price = Math.min(...w.services.map(s => s.price));
    return [w.id, w];
  })
);


/* =========================================================
   STORAGE
   ========================================================= */

const STORAGE = {
  requests: "ks_requests",
  saved: "ks_saved",
  activity: "ks_activity",
  jobs: "ks_jobs",
  messages: "ks_messages",
  reviews: "ks_reviews",
  settings: "ks_settings",
  recent: "ks_recent",
  seen: "ks_notif_seen",
  theme: "ks_theme"
};

let storageWarned = false;

function load(key, fallback = []) {
  try {
    const data = JSON.parse(localStorage.getItem(key));
    return data ?? fallback;
  } catch {
    return fallback;
  }
}

function save(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    if (!storageWarned) {
      storageWarned = true;
      toast("Couldn't save to this browser (storage full or blocked).", { type: "warn", icon: "shield" });
    }
  }
}

const DEFAULT_SETTINGS = { name: "Blade", lang: "EN", city: "Ghaziabad", address: "" };

let requests = load(STORAGE.requests);
let savedWorkers = load(STORAGE.saved);
let activity = load(STORAGE.activity);
let postedJobs = load(STORAGE.jobs);
let messages = load(STORAGE.messages, {});
let reviewsStore = load(STORAGE.reviews, {});
let recentSearches = load(STORAGE.recent);
let notifSeen = load(STORAGE.seen, 0);
let settings = { ...DEFAULT_SETTINGS, ...load(STORAGE.settings, {}) };

// old versions stored messages in an array, which lost data on reload
if (Array.isArray(messages)) messages = {};
if (!CITIES[settings.city]) settings.city = DEFAULT_SETTINGS.city;

// re-apply saved reviews to worker ratings
function applyReview(workerId, review) {
  const w = workers[workerId];
  if (!w) return;
  const n = w.jobs;
  w.rating = Math.round(((w.rating * n + review.rating) / (n + 1)) * 10) / 10;
  w.reviews.unshift(review);
}

Object.entries(reviewsStore).forEach(([id, list]) => {
  [...list].reverse().forEach(r => applyReview(id, r));
});


/* =========================================================
   TOASTS
   ========================================================= */

function toast(message, opts = {}) {

  const el = document.createElement("div");
  el.className = `toast ${opts.type || ""}`;
  el.setAttribute("role", "status");

  el.innerHTML = `
    <span class="t-icon">${icon(opts.icon || "check")}</span>
    <span>${esc(message)}</span>
  `;

  const remove = () => {
    el.classList.add("out");
    setTimeout(() => el.remove(), 300);
  };

  if (opts.action) {
    const b = document.createElement("button");
    b.textContent = opts.action.label;
    b.addEventListener("click", () => { opts.action.fn(); remove(); });
    el.appendChild(b);
  }

  $("#toasts").appendChild(el);
  setTimeout(remove, opts.action ? 5500 : 3300);
}


/* =========================================================
   MODALS
   ========================================================= */

let lastFocus = null;

function openModal(id) {
  const m = document.getElementById(id);
  if (!m) return;
  lastFocus = document.activeElement;
  m.classList.remove("hidden", "closing");
  document.body.style.overflow = "hidden";
  m.querySelector(".modal")?.focus({ preventScroll: true });
}

function closeModal(id) {

  const m = document.getElementById(id);
  if (!m || m.classList.contains("hidden")) return;

  m.classList.add("closing");

  setTimeout(() => {
    m.classList.add("hidden");
    m.classList.remove("closing");
    if (!$$(".modal-backdrop:not(.hidden)").length) {
      document.body.style.overflow = "";
    }
    lastFocus?.focus?.({ preventScroll: true });
  }, 200);
}

function closeAllModals() {
  $$(".modal-backdrop:not(.hidden)").forEach(m => {
    m.classList.add("hidden");
    m.classList.remove("closing");
  });
  document.body.style.overflow = "";
}

$$(".modal").forEach(m => {
  m.setAttribute("tabindex", "-1");
  m.setAttribute("role", "dialog");
  m.setAttribute("aria-modal", "true");
});


/* =========================================================
   THEME
   ========================================================= */

function applyTheme(theme, animate = false) {

  const root = document.documentElement;

  if (animate && !prefersReducedMotion) {
    root.classList.add("theme-transition");
    setTimeout(() => root.classList.remove("theme-transition"), 550);
  }

  root.dataset.theme = theme;

  $("#themeColorMeta").content = theme === "light" ? "#f3f5fa" : "#080b10";

  $$("[data-theme-opt]").forEach(b =>
    b.classList.toggle("active", b.dataset.themeOpt === theme)
  );
}

function setTheme(theme) {
  applyTheme(theme, true);
  save(STORAGE.theme, theme);
}

$("#themeToggle").addEventListener("click", () => {
  const next = document.documentElement.dataset.theme === "light" ? "dark" : "light";
  setTheme(next);
});

window.matchMedia("(prefers-color-scheme: light)").addEventListener("change", e => {
  if (!localStorage.getItem(STORAGE.theme)) applyTheme(e.matches ? "light" : "dark", true);
});


/* =========================================================
   LANGUAGE (English + Hindi UI strings)
   ========================================================= */

const I18N = {

  EN: {
    nav_discover: "Discover", nav_discover_s: "Find local help",
    nav_requests: "My Requests", nav_requests_s: "Track your jobs",
    nav_saved: "Saved Workers", nav_saved_s: "Your favourites",
    nav_activity: "Activity", nav_activity_s: "Recent updates",
    nav_jobs: "Post a Job", nav_jobs_s: "Let workers find you",
    nav_messages: "Messages", nav_messages_s: "Talk to workers",
    trust_t: "Built for local trust",
    trust_p: "Discover nearby workers, compare skills and track your requests.",
    nearby: "Nearby",
    eyebrow: "LOCAL HELP, SIMPLIFIED",
    heroA: "Tell us what you need.",
    heroB: "KaamSetu finds the match.",
    heroP: "Describe your problem naturally and discover nearby workers with the right skills.",
    search_ph: "e.g. My Wi-Fi keeps disconnecting...",
    find: "Find help",
    popular: "Popular services",
    workers_near: "Workers around you",
    recommended: "Recommended workers",
    best_matches: "Best matches for your problem",
    title_discover: "Discover", sub_discover: "Find trusted help around you.",
    title_requests: "My Requests", sub_requests: "Track your jobs from request to completion.",
    title_saved: "Saved Workers", sub_saved: "Your trusted local workers.",
    title_activity: "Activity", sub_activity: "Your recent KaamSetu activity.",
    title_jobs: "Post a Job", sub_jobs: "Let local workers discover your work.",
    title_messages: "Messages", sub_messages: "Talk directly with workers."
  },

  HI: {
    nav_discover: "खोजें", nav_discover_s: "स्थानीय मदद ढूँढें",
    nav_requests: "मेरे अनुरोध", nav_requests_s: "अपने काम ट्रैक करें",
    nav_saved: "सेव किए कारीगर", nav_saved_s: "आपके पसंदीदा",
    nav_activity: "गतिविधि", nav_activity_s: "ताज़ा अपडेट",
    nav_jobs: "काम पोस्ट करें", nav_jobs_s: "कारीगर आपको खोजें",
    nav_messages: "संदेश", nav_messages_s: "कारीगरों से बात करें",
    trust_t: "स्थानीय भरोसे के लिए बना",
    trust_p: "पास के कारीगर खोजें, हुनर की तुलना करें और अनुरोध ट्रैक करें।",
    nearby: "पास में",
    eyebrow: "स्थानीय मदद, आसान",
    heroA: "बताइए आपको क्या चाहिए।",
    heroB: "KaamSetu सही कारीगर ढूँढेगा।",
    heroP: "अपनी समस्या सामान्य भाषा में बताइए और सही हुनर वाले आस-पास के कारीगर पाइए।",
    search_ph: "जैसे: मेरा वाई-फाई बार-बार कट रहा है...",
    find: "मदद खोजें",
    popular: "लोकप्रिय सेवाएँ",
    workers_near: "आपके आस-पास कारीगर",
    recommended: "सुझाए गए कारीगर",
    best_matches: "आपकी समस्या के लिए सबसे अच्छे विकल्प",
    title_discover: "खोजें", sub_discover: "अपने आस-पास भरोसेमंद मदद खोजें।",
    title_requests: "मेरे अनुरोध", sub_requests: "अनुरोध से काम पूरा होने तक ट्रैक करें।",
    title_saved: "सेव किए कारीगर", sub_saved: "आपके भरोसेमंद स्थानीय कारीगर।",
    title_activity: "गतिविधि", sub_activity: "आपकी हालिया KaamSetu गतिविधि।",
    title_jobs: "काम पोस्ट करें", sub_jobs: "स्थानीय कारीगर आपका काम खोजें।",
    title_messages: "संदेश", sub_messages: "कारीगरों से सीधे बात करें।"
  }
};

function t(key) {
  return (I18N[settings.lang] || I18N.EN)[key] ?? I18N.EN[key] ?? key;
}

const VOICE_LANG = { EN: "en-IN", HI: "hi-IN", BN: "bn-IN", TA: "ta-IN" };

function applyLang() {

  $$("[data-i18n]").forEach(el => { el.textContent = t(el.dataset.i18n); });
  $$("[data-i18n-ph]").forEach(el => { el.placeholder = t(el.dataset.i18nPh); });

  $("#languageButton").textContent = settings.lang;
  document.documentElement.lang = settings.lang === "HI" ? "hi" : "en";

  updatePageHeader(currentView);
  $("#workerHeading").textContent =
    searchInput.value.trim() ? t("best_matches") : t("recommended");
}


/* =========================================================
   NAVIGATION
   ========================================================= */

const navItems = $$(".nav-item");
const views = $$(".view");
const pageTitle = $("#pageTitle");
const pageSubtitle = $("#pageSubtitle");

let currentView = "discover";

function updatePageHeader(view) {
  pageTitle.textContent = t(`title_${view}`);
  pageSubtitle.textContent = t(`sub_${view}`);
}

function showView(viewName) {

  currentView = viewName;

  views.forEach(v => v.classList.remove("active"));

  const target = document.getElementById(`${viewName}View`);
  if (target) target.classList.add("active");

  navItems.forEach(item => {
    item.classList.toggle("active", item.dataset.view === viewName);
  });

  updatePageHeader(viewName);

  if (viewName !== "messages") $("#messagesLayout").classList.remove("chat-open");

  if (viewName === "requests") renderRequests();
  if (viewName === "saved") renderSaved();
  if (viewName === "activity") renderActivity();
  if (viewName === "jobs") renderJobs();
  if (viewName === "messages") renderConversations();

  window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });

  closeSidebar();
}

navItems.forEach(item => {
  item.addEventListener("click", () => showView(item.dataset.view));
});


/* MOBILE SIDEBAR */

const sidebar = $("#sidebar");
const mobileMenu = $("#mobileMenu");
const sidebarOverlay = $("#sidebarOverlay");

function openSidebar() {
  sidebar.classList.add("open");
  sidebarOverlay.classList.add("show");
  mobileMenu.setAttribute("aria-expanded", "true");
}

function closeSidebar() {
  sidebar.classList.remove("open");
  sidebarOverlay.classList.remove("show");
  mobileMenu.setAttribute("aria-expanded", "false");
}

mobileMenu.addEventListener("click", openSidebar);
sidebarOverlay.addEventListener("click", closeSidebar);


/* =========================================================
   SEARCH / SMART MATCH
   ========================================================= */

const aliases = {

  wifi: ["wifi", "wi-fi", "wfi", "internet", "network", "router", "rounter", "broadband", "modem", "disconnecting", "connection", "वाईफाई", "इंटरनेट"],

  electrical: ["fan", "electric", "electrician", "socket", "switch", "wire", "wiring", "power", "light", "mcb", "inverter", "bijli", "बिजली", "पंखा"],

  tailoring: ["tailor", "tailoring", "stitching", "stitch", "clothes", "dress", "blouse", "alteration", "alterations", "kurta", "silai", "सिलाई"],

  cctv: ["cctv", "camera", "security camera"],

  ac: ["ac", "air conditioner", "cooler", "cooling", "refrigerator", "fridge", "washing machine", "एसी"],

  education: ["tutor", "teacher", "maths", "math", "science", "homework", "study", "tuition", "exam"],

  transport: ["delivery", "pickup", "transport", "parcel", "move", "courier", "errand"],

  plumbing: ["plumber", "plumbing", "pipe", "leak", "leakage", "tap", "drain", "flush", "geyser", "water tank", "nal", "नल", "पानी"],

  carpentry: ["carpenter", "carpentry", "furniture", "door", "wood", "wardrobe", "shelf", "bed", "lock", "almirah"],

  painting: ["paint", "painting", "painter", "wall", "whitewash", "damp", "seepage"],

  cleaning: ["clean", "cleaning", "sofa", "kitchen", "deep clean", "dust", "maid", "carpet", "safai", "सफाई"],

  beauty: ["salon", "haircut", "hair", "facial", "makeup", "beautician", "parlour", "parlor", "manicure", "pedicure"],

  mechanic: ["bike", "car", "puncture", "mechanic", "scooter", "tyre", "tire", "battery", "motorcycle"]
};

const INTENT_NAMES = {
  wifi: "Wi-Fi / networking",
  electrical: "electrical repair",
  tailoring: "tailoring",
  cctv: "CCTV / security",
  ac: "AC & appliances",
  education: "tuition & learning",
  transport: "local transport",
  plumbing: "plumbing",
  carpentry: "carpentry",
  painting: "painting",
  cleaning: "home cleaning",
  beauty: "beauty & grooming",
  mechanic: "vehicle repair"
};

const STOPWORDS = new Set([
  "the", "and", "for", "with", "need", "want", "help", "please", "not", "working", "work",
  "fix", "repair", "service", "my", "keeps", "get", "have", "has", "can", "you", "are",
  "there", "some", "someone", "who", "any", "new", "old"
]);

const SUGGESTIONS = [
  "Wi-Fi keeps disconnecting", "Install a CCTV camera", "Fan not working", "AC not cooling",
  "Switch board sparking", "Tap is leaking", "Bathroom drain blocked", "Need sofa cleaning",
  "Kitchen deep cleaning", "Stitch a blouse", "Alter my trousers", "Maths tutor for class 8",
  "Bike puncture", "Car battery dead", "Paint my bedroom wall", "Door lock repair",
  "Haircut at home", "Bridal makeup", "Water tank cleaning", "Pickup a parcel"
];

function normalize(text) {
  return String(text)
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function hasPhrase(q, phrase) {
  const safe = phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(^|[^\\p{L}\\p{N}])${safe}($|[^\\p{L}\\p{N}])`, "u").test(q);
}

function lev(a, b) {
  if (Math.abs(a.length - b.length) > 1) return 2;
  const dp = Array.from({ length: a.length + 1 }, (_, i) => [i]);
  for (let j = 1; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
    }
  }
  return dp[a.length][b.length];
}

function detectIntent(query) {

  const q = normalize(query);
  const tokens = q.split(" ");
  const detected = [];

  Object.entries(aliases).forEach(([intent, words]) => {

    const hit = words.some(word => {
      if (hasPhrase(q, word)) return true;
      // forgive one typo on longer single words ("rounter", "plumer")
      if (word.length >= 5 && !/[\s-]/.test(word)) {
        return tokens.some(tk => tk.length >= 5 && lev(tk, word) <= 1);
      }
      return false;
    });

    if (hit) detected.push(intent);
  });

  return detected;
}

function scoreWorker(worker, query) {

  const q = normalize(query);
  const intents = detectIntent(q);
  const tokens = q.split(" ").filter(tk => tk.length > 2 && !STOPWORDS.has(tk));

  let relevance = 0;

  worker.intents.forEach(i => { if (intents.includes(i)) relevance += 45; });

  worker.skills.forEach(skill => {
    if (hasPhrase(q, skill.toLowerCase())) relevance += 14;
  });

  const text = `${worker.role} ${worker.skills.join(" ")}`.toLowerCase();
  tokens.forEach(tk => { if (text.includes(tk)) relevance += 6; });

  worker.services.forEach(s => {
    const name = s.name.toLowerCase();
    tokens.forEach(tk => { if (name.includes(tk)) relevance += 4; });
  });

  if (!relevance) return { score: 0, relevant: false };

  let score = 30 + Math.min(relevance, 55);
  if (worker.available) score += 4;
  if (worker.verified) score += 3;
  score += (worker.rating - 4.5) * 10;

  return {
    score: Math.round(Math.min(99, Math.max(25, score))),
    relevant: true
  };
}

function guessCategory(query) {
  const intents = detectIntent(query);
  const w = workerList.find(x => x.intents.some(i => intents.includes(i)));
  return w ? w.category : "home";
}


/* =========================================================
   FILTER STATE + VISIBLE WORKERS
   ========================================================= */

const searchInput = $("#searchInput");
const workerGrid = $("#workerGrid");

let currentCategory = "all";
let skeletonTimer = null;

function getFilters() {
  return {
    sort: $("#sortFilter").value,
    minRating: parseFloat($("#ratingFilter").value),
    maxPrice: parseInt($("#priceFilter").value, 10),
    verified: $("#verifiedFilter").checked,
    available: $("#availableFilter").checked
  };
}

function getVisibleWorkers() {

  const query = searchInput.value.trim();
  const f = getFilters();

  let list = workerList.map(worker => ({ worker, match: 0 }));

  if (currentCategory !== "all") {
    list = list.filter(i => i.worker.category === currentCategory);
  }

  if (query) {
    list = list
      .map(i => {
        const r = scoreWorker(i.worker, query);
        return { worker: i.worker, match: r.score, relevant: r.relevant };
      })
      .filter(i => i.relevant);
  }

  if (f.verified) list = list.filter(i => i.worker.verified);
  if (f.available) list = list.filter(i => i.worker.available);
  if (f.minRating) list = list.filter(i => i.worker.rating >= f.minRating);
  if (f.maxPrice < 1000) list = list.filter(i => i.worker.price <= f.maxPrice);

  const sorters = {
    rating: (a, b) => b.worker.rating - a.worker.rating,
    price: (a, b) => a.worker.price - b.worker.price,
    distance: (a, b) => a.worker.distance - b.worker.distance,
    jobs: (a, b) => b.worker.jobs - a.worker.jobs,
    recommended: (a, b) => {
      if (query) return b.match - a.match;
      const s = i => i.worker.rating * 10 + (i.worker.available ? 5 : 0) - i.worker.distance;
      return s(b) - s(a);
    }
  };

  list.sort(sorters[f.sort] || sorters.recommended);

  return list;
}

function updateFilterCount() {

  const f = getFilters();

  const n =
    (currentCategory !== "all" ? 1 : 0) +
    (f.minRating ? 1 : 0) +
    (f.maxPrice < 1000 ? 1 : 0) +
    (f.verified ? 1 : 0) +
    (f.available ? 1 : 0);

  const badge = $("#filterCount");
  badge.textContent = n;
  badge.classList.toggle("hidden", !n);

  $("#priceValue").textContent = f.maxPrice < 1000 ? rupee(f.maxPrice) : "any";
}

function setCategory(cat) {

  currentCategory = cat;

  $("#categoryFilter").value = cat;

  $$(".category").forEach(b =>
    b.classList.toggle("active", b.dataset.category === cat)
  );
}

function resetAllFilters() {

  searchInput.value = "";
  $("#clearSearch").hidden = true;

  setCategory("all");

  $("#sortFilter").value = "recommended";
  $("#ratingFilter").value = "0";
  $("#priceFilter").value = "1000";
  $("#verifiedFilter").checked = false;
  $("#availableFilter").checked = false;

  renderWorkers();
}


/* =========================================================
   RENDER WORKERS
   ========================================================= */

function skeletonCard() {
  return `
    <div class="skeleton-card">
      <div style="display:flex;gap:12px;margin-bottom:16px">
        <div class="sk round"></div>
        <div style="flex:1"><div class="sk w60"></div><div class="sk w80"></div></div>
      </div>
      <div class="sk w40"></div>
      <div class="sk"></div>
      <div class="sk w80"></div>
    </div>`;
}

function renderWorkers({ skeleton = false } = {}) {

  clearTimeout(skeletonTimer);

  const query = searchInput.value.trim();
  const list = getVisibleWorkers();
  const empty = $("#emptyWorkers");

  $("#workerHeading").textContent = query ? t("best_matches") : t("recommended");

  updateFilterCount();
  updateSmartMatch(list, query);
  renderMap(list);

  if (skeleton) {

    workerGrid.innerHTML = Array(6).fill(skeletonCard()).join("");
    empty.classList.add("hidden");

    skeletonTimer = setTimeout(() => renderWorkers(), prefersReducedMotion ? 0 : 600);
    return;
  }

  workerGrid.innerHTML = "";

  if (!list.length) {
    empty.classList.remove("hidden");
    return;
  }

  empty.classList.add("hidden");

  list.forEach((item, i) => {
    workerGrid.appendChild(createWorkerCard(item.worker, item.match, query, i));
  });

  requestAnimationFrame(() => {
    $$(".match-bar i", workerGrid).forEach(bar => {
      bar.style.width = `${bar.dataset.w}%`;
    });
  });
}


/* =========================================================
   WORKER CARD
   ========================================================= */

function createWorkerCard(worker, match = 0, query = "", index = 0) {

  const card = document.createElement("article");

  const isSaved = savedWorkers.includes(worker.id);
  const inCompare = compare.includes(worker.id);

  card.className = `worker-card ${inCompare ? "in-compare" : ""}`;
  card.dataset.id = worker.id;
  card.style.setProperty("--i", Math.min(index, 11));

  card.innerHTML = `

    <div class="card-tools">

      <button
        class="compare-toggle ${inCompare ? "on" : ""}"
        data-act="compare" data-id="${worker.id}"
        aria-label="Compare ${esc(worker.name)}" title="Add to compare"
      >${icon("compare")}</button>

      <button
        class="save-worker ${isSaved ? "saved" : ""}"
        data-act="save" data-id="${worker.id}"
        aria-label="${isSaved ? "Remove from saved" : "Save worker"}" title="Save"
      >${icon("heart")}</button>

    </div>

    <div class="worker-top">

      <div class="worker-avatar av-${worker.category}">${worker.initials}</div>

      <div class="worker-info">
        <h4>${esc(worker.name)}</h4>
        <p>${esc(worker.role)}</p>
        ${worker.verified ? `<span class="verified">${icon("shield")} Verified worker</span>` : ""}
      </div>

    </div>

    <div class="worker-meta">
      <span>${icon("star")} <strong>${worker.rating}</strong></span>
      <span>${worker.jobs} jobs</span>
      <span>${worker.distance} km</span>
      <span>~${worker.response} min reply</span>
    </div>

    <div class="worker-skills">
      ${worker.skills.slice(0, 4).map(s => `<span class="skill">${esc(s)}</span>`).join("")}
    </div>

    ${query ? `
      <div class="match-score">
        <div class="match-score-head">
          <span>Problem match</span>
          <strong>${match}% match</strong>
        </div>
        <div class="match-bar"><i data-w="${match}"></i></div>
      </div>` : ""}

    <div class="card-foot">
      <div class="availability ${worker.available ? "" : "busy"}">
        <span></span>${esc(worker.availability)}
      </div>
      <div class="price-from">from <b>${rupee(worker.price)}</b></div>
    </div>

    <div class="worker-actions">
      <button data-act="profile" data-id="${worker.id}">View profile</button>
      <button class="primary" data-act="request" data-id="${worker.id}">Request</button>
    </div>
  `;

  return card;
}


/* =========================================================
   SMART MATCH
   ========================================================= */

const smartMatch = $("#smartMatch");

function updateSmartMatch(list, query) {

  if (!query) {
    smartMatch.classList.add("hidden");
    return;
  }

  const intents = detectIntent(query);

  smartMatch.classList.remove("hidden");

  $("#smartTitle").textContent =
    intents.length
      ? `We understood: ${INTENT_NAMES[intents[0]] || "local service"}`
      : "We found relevant local help";

  const best = list[0];

  $("#smartDescription").textContent = list.length
    ? `Best match: ${best.worker.name} (${best.match}%). ${list.length} nearby worker${list.length === 1 ? "" : "s"} can help.`
    : "No workers match this yet — try other words, or post it as a job.";

  countTo($("#matchCount"), list.length, { dur: 450 });
}


/* =========================================================
   STATS + SERVICE TILES
   ========================================================= */

function renderStats() {

  const total = workerList.length;
  const avail = workerList.filter(w => w.available).length;
  const rating = workerList.reduce((s, w) => s + w.rating, 0) / total;
  const resp = workerList.reduce((s, w) => s + w.response, 0) / total;

  countTo($("#statWorkers"), total);
  countTo($("#statAvailable"), avail);
  countTo($("#statRating"), rating, { dec: 1 });
  countTo($("#statResponse"), resp);
}

const SERVICE_TILES = [
  ["❄️", "AC repair", "AC not cooling"],
  ["⚡", "Electrician", "fan not working"],
  ["🚰", "Plumber", "tap is leaking"],
  ["🧹", "Cleaning", "need sofa cleaning"],
  ["🪚", "Carpenter", "door lock repair"],
  ["🎨", "Painter", "paint my bedroom wall"],
  ["📶", "Wi-Fi", "wifi keeps disconnecting"],
  ["🧵", "Tailor", "need clothes stitching"],
  ["🎓", "Tutor", "maths tutor for class 8"],
  ["🚚", "Delivery", "pickup a parcel"],
  ["🔧", "Mechanic", "bike puncture"],
  ["💇", "Beauty", "haircut at home"]
];

function renderServiceTiles() {
  $("#serviceTiles").innerHTML = SERVICE_TILES.map(([emoji, label, q]) => `
    <button class="service-tile" data-act="quick" data-q="${esc(q)}">
      <span class="emoji" aria-hidden="true">${emoji}</span>${esc(label)}
    </button>
  `).join("");
}


/* =========================================================
   SEARCH EVENTS, SUGGESTIONS, RECENT, VOICE
   ========================================================= */

const suggestionsEl = $("#suggestions");
let sgIndex = -1;

function hideSuggestions() {
  suggestionsEl.classList.add("hidden");
  searchInput.setAttribute("aria-expanded", "false");
  sgIndex = -1;
}

function renderSuggestions() {

  const q = normalize(searchInput.value);

  let items, label, ic;

  if (!q) {
    items = recentSearches.slice(0, 5);
    label = "RECENT";
    ic = "clock";
  } else {
    const parts = q.split(" ");
    items = SUGGESTIONS
      .filter(s => parts.every(p => normalize(s).includes(p)))
      .slice(0, 6);
    label = "SUGGESTIONS";
    ic = "search";
  }

  if (!items.length) { hideSuggestions(); return; }

  suggestionsEl.innerHTML =
    `<div class="sg-label">${label}</div>` +
    items.map(s => `
      <button type="button" role="option" data-act="pick" data-q="${esc(s)}">
        ${icon(ic)} ${esc(s)}
      </button>`).join("");

  suggestionsEl.classList.remove("hidden");
  searchInput.setAttribute("aria-expanded", "true");
  sgIndex = -1;
}

function rememberSearch(q) {
  q = q.trim();
  if (!q) return;
  recentSearches = [q, ...recentSearches.filter(x => x.toLowerCase() !== q.toLowerCase())].slice(0, 6);
  save(STORAGE.recent, recentSearches);
  renderRecent();
}

function renderRecent() {

  const box = $("#recentSearches");

  if (!recentSearches.length) {
    box.classList.add("hidden");
    return;
  }

  box.classList.remove("hidden");
  box.innerHTML =
    `<span>Recent:</span>` +
    recentSearches.slice(0, 4).map(q =>
      `<button data-act="quick" data-q="${esc(q)}">${icon("clock")} ${esc(q)}</button>`
    ).join("") +
    `<button class="link" data-act="clear-recent">Clear</button>`;
}

function performSearch() {

  hideSuggestions();
  rememberSearch(searchInput.value);
  $("#clearSearch").hidden = !searchInput.value;

  renderWorkers({ skeleton: !!searchInput.value.trim() });

  $("#workersSection").scrollIntoView({
    behavior: prefersReducedMotion ? "auto" : "smooth",
    block: "start"
  });
}

function runQuery(q) {
  if (currentView !== "discover") showView("discover");
  searchInput.value = q;
  performSearch();
}

const liveSearch = debounce(() => renderWorkers(), 120);

searchInput.addEventListener("input", () => {
  $("#clearSearch").hidden = !searchInput.value;
  renderSuggestions();
  liveSearch();
});

searchInput.addEventListener("focus", renderSuggestions);

searchInput.addEventListener("keydown", e => {

  const items = $$("button", suggestionsEl);
  const open = !suggestionsEl.classList.contains("hidden") && items.length;

  if (e.key === "ArrowDown" && open) {
    e.preventDefault();
    sgIndex = (sgIndex + 1) % items.length;
  } else if (e.key === "ArrowUp" && open) {
    e.preventDefault();
    sgIndex = (sgIndex - 1 + items.length) % items.length;
  } else if (e.key === "Enter") {
    e.preventDefault();
    if (open && sgIndex >= 0) searchInput.value = items[sgIndex].dataset.q;
    performSearch();
    return;
  } else if (e.key === "Escape") {
    hideSuggestions();
    return;
  } else {
    return;
  }

  items.forEach((b, i) => b.classList.toggle("active", i === sgIndex));
});

$("#searchButton").addEventListener("click", performSearch);

$("#clearSearch").addEventListener("click", () => {
  searchInput.value = "";
  $("#clearSearch").hidden = true;
  hideSuggestions();
  renderWorkers();
  searchInput.focus();
});

$$("[data-search]").forEach(button => {
  button.addEventListener("click", () => runQuery(button.dataset.search));
});

/* voice search */

const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
const voiceButton = $("#voiceButton");

if (!SpeechRec) {

  voiceButton.hidden = true;

} else {

  let rec = null;

  voiceButton.addEventListener("click", () => {

    if (rec) { rec.stop(); return; }

    rec = new SpeechRec();
    rec.lang = VOICE_LANG[settings.lang] || "en-IN";
    rec.interimResults = false;

    voiceButton.classList.add("listening");
    toast("Listening… describe your problem", { icon: "mic" });

    rec.onresult = e => {
      searchInput.value = e.results[0][0].transcript;
      performSearch();
    };

    rec.onerror = () => toast("Couldn't hear that — please try again.", { type: "warn", icon: "mic" });

    rec.onend = () => {
      voiceButton.classList.remove("listening");
      rec = null;
    };

    rec.start();
  });
}


/* =========================================================
   FILTER CONTROLS
   ========================================================= */

$("#filterButton").addEventListener("click", () => {
  const panel = $("#filtersPanel");
  panel.classList.toggle("hidden");
  $("#filterButton").setAttribute("aria-expanded", String(!panel.classList.contains("hidden")));
});

$("#categoryFilter").addEventListener("change", e => {
  setCategory(e.target.value);
  renderWorkers();
});

["sortFilter", "ratingFilter", "priceFilter", "verifiedFilter", "availableFilter"].forEach(id => {
  $(`#${id}`).addEventListener("input", () => renderWorkers());
});

$$(".category").forEach(button => {
  button.addEventListener("click", () => {
    setCategory(button.dataset.category);
    renderWorkers();
  });
});

$("#resetFilters").addEventListener("click", resetAllFilters);
$("#resetFiltersPanel").addEventListener("click", resetAllFilters);

$("#postFromSearch").addEventListener("click", () => {
  const q = searchInput.value.trim();
  showView("jobs");
  openJobModal(q ? { title: q.charAt(0).toUpperCase() + q.slice(1), category: guessCategory(q) } : {});
});


/* =========================================================
   MAP
   ========================================================= */

const mapViewport = $("#mapViewport");
const mapStage = $("#mapStage");
const mapPins = $("#mapPins");
const mapPopup = $("#mapPopup");

let mapZ = 1, mapX = 0, mapY = 0;
let selectedPin = null;
let lastPinKey = "";

function applyMap() {
  mapStage.style.transform = `translate(${mapX}px, ${mapY}px) scale(${mapZ})`;
  mapStage.style.setProperty("--z", mapZ);
}

function clampMap() {
  const r = mapViewport.getBoundingClientRect();
  const mx = (mapZ - 1) * r.width / 2 + 40;
  const my = (mapZ - 1) * r.height / 2 + 40;
  mapX = Math.max(-mx, Math.min(mx, mapX));
  mapY = Math.max(-my, Math.min(my, mapY));
}

function renderMap(list) {

  const key = list.map(i => i.worker.id).join(",") + "|" + selectedPin;
  if (key === lastPinKey) return;
  lastPinKey = key;

  mapPins.innerHTML = list.map((item, i) => {
    const w = item.worker;
    return `
      <button
        class="map-pin pin-${w.category} ${w.available ? "free" : "busy"} ${selectedPin === w.id ? "sel" : ""}"
        style="left:${w.pos.x}%; top:${w.pos.y}%; --i:${i}"
        data-act="pin" data-id="${w.id}" data-worker="${w.id}"
        title="${esc(w.name)} · ${esc(w.role)}" aria-label="${esc(w.name)}, ${esc(w.role)}"
      ><span>${w.initials}</span></button>`;
  }).join("");

  if (selectedPin && !list.some(i => i.worker.id === selectedPin)) closePopup();
}

function selectPin(id) {

  selectedPin = id;
  const w = workers[id];

  $$(".map-pin", mapPins).forEach(p => p.classList.toggle("sel", p.dataset.id === id));

  mapPopup.innerHTML = `
    <button class="ghost-btn mp-close" data-act="close-popup" aria-label="Close">${icon("x")}</button>
    <div class="mp-top">
      <div class="worker-avatar av-${w.category}">${w.initials}</div>
      <div>
        <h4>${esc(w.name)}</h4>
        <p>${esc(w.role)}</p>
      </div>
    </div>
    <div class="mp-meta">
      <span>★ ${w.rating}</span>
      <span>${w.distance} km</span>
      <span>from ${rupee(w.price)}</span>
    </div>
    <div class="mp-actions">
      <button class="secondary-btn" data-act="profile" data-id="${w.id}">Profile</button>
      <button class="primary-btn" data-act="request" data-id="${w.id}">Request</button>
    </div>
  `;

  mapPopup.classList.remove("hidden");
}

function closePopup() {
  selectedPin = null;
  mapPopup.classList.add("hidden");
  $$(".map-pin.sel", mapPins).forEach(p => p.classList.remove("sel"));
}

/* drag to pan */

let drag = null;

mapViewport.addEventListener("pointerdown", e => {
  if (e.target.closest("button, .map-popup")) return;
  drag = { x: e.clientX, y: e.clientY, ox: mapX, oy: mapY };
  mapViewport.classList.add("dragging");
  mapViewport.setPointerCapture(e.pointerId);
});

mapViewport.addEventListener("pointermove", e => {
  if (!drag) return;
  mapX = drag.ox + e.clientX - drag.x;
  mapY = drag.oy + e.clientY - drag.y;
  clampMap();
  applyMap();
});

["pointerup", "pointercancel"].forEach(ev => {
  mapViewport.addEventListener(ev, () => {
    drag = null;
    mapViewport.classList.remove("dragging");
  });
});

$("#zoomIn").addEventListener("click", () => {
  mapZ = Math.min(2, mapZ + 0.25);
  clampMap();
  applyMap();
});

$("#zoomOut").addEventListener("click", () => {
  mapZ = Math.max(1, mapZ - 0.25);
  clampMap();
  applyMap();
});

$("#centerMap").addEventListener("click", () => {
  mapZ = 1; mapX = 0; mapY = 0;
  applyMap();
  const me = $(".user-location");
  me.classList.remove("ping");
  void me.offsetWidth;
  me.classList.add("ping");
});

function setCityAreas() {
  const [a, b, c] = CITIES[settings.city];
  $("#areaOne").textContent = a;
  $("#areaTwo").textContent = b;
  $("#areaThree").textContent = c;
  $("#locationLabel").textContent = settings.city;
}

// hovering a card highlights its pin
document.addEventListener("mouseover", e => {
  const card = e.target.closest(".worker-card");
  $$(".map-pin.hl", mapPins).forEach(p => p.classList.remove("hl"));
  if (card) mapPins.querySelector(`[data-id="${card.dataset.id}"]`)?.classList.add("hl");
});


/* =========================================================
   SAVE / COMPARE
   ========================================================= */

function toggleSave(id) {

  const w = workers[id];

  if (savedWorkers.includes(id)) {

    savedWorkers = savedWorkers.filter(x => x !== id);
    addActivity("Removed saved worker", `${w.name} was removed from your saved workers.`, "heart");
    toast(`${w.name} removed from saved`, { icon: "heart" });

  } else {

    savedWorkers.push(id);
    addActivity("Saved worker", `${w.name} was added to your saved workers.`, "heart");
    toast(`${w.name} saved`, { type: "success", icon: "heart" });
  }

  save(STORAGE.saved, savedWorkers);

  $$(`.save-worker[data-id="${id}"]`).forEach(btn =>
    btn.classList.toggle("saved", savedWorkers.includes(id))
  );

  updateBadge();

  if (currentView === "saved") renderSaved();
}

let compare = [];

function toggleCompare(id) {

  if (compare.includes(id)) {
    compare = compare.filter(x => x !== id);
  } else {
    if (compare.length >= 3) {
      toast("You can compare up to 3 workers.", { type: "warn", icon: "compare" });
      return;
    }
    compare.push(id);
  }

  $$(".worker-card").forEach(card => {
    const on = compare.includes(card.dataset.id);
    card.classList.toggle("in-compare", on);
    card.querySelector(".compare-toggle")?.classList.toggle("on", on);
  });

  renderCompareBar();
}

function renderCompareBar() {

  const bar = $("#compareBar");

  bar.classList.toggle("hidden", !compare.length);

  $("#compareChips").innerHTML = compare.map(id => `
    <span class="compare-chip">
      ${esc(workers[id].name)}
      <button data-act="compare" data-id="${id}" aria-label="Remove ${esc(workers[id].name)}">${icon("x")}</button>
    </span>`).join("");
}

function openCompare() {

  if (compare.length < 2) {
    toast("Pick at least 2 workers to compare.", { type: "warn", icon: "compare" });
    return;
  }

  const list = compare.map(id => workers[id]);

  const rows = [
    ["Rating", w => `★ ${w.rating}`, w => w.rating, "max"],
    ["Jobs done", w => w.jobs, w => w.jobs, "max"],
    ["Starting price", w => rupee(w.price), w => w.price, "min"],
    ["Distance", w => `${w.distance} km`, w => w.distance, "min"],
    ["Replies in", w => `~${w.response} min`, w => w.response, "min"],
    ["Experience", w => w.experience],
    ["Verified", w => (w.verified ? "Yes" : "No")],
    ["Availability", w => w.availability],
    ["Working hours", w => w.hours]
  ];

  const body = rows.map(([label, show, val, mode]) => {

    let best = null;
    if (val) {
      const nums = list.map(val);
      best = mode === "max" ? Math.max(...nums) : Math.min(...nums);
    }

    return `<tr><th>${label}</th>${list.map(w =>
      `<td class="${val && val(w) === best ? "best" : ""}">${esc(show(w))}</td>`
    ).join("")}</tr>`;
  }).join("");

  $("#compareContent").innerHTML = `
    <div class="table-scroll">
      <table class="compare-table">
        <tr>
          <th></th>
          ${list.map(w => `
            <td><div class="ct-head">
              <div class="worker-avatar av-${w.category}">${w.initials}</div>${esc(w.name)}
            </div></td>`).join("")}
        </tr>
        ${body}
        <tr>
          <th></th>
          ${list.map(w => `<td><button class="primary-btn" data-act="request" data-id="${w.id}">Request</button></td>`).join("")}
        </tr>
      </table>
    </div>`;

  openModal("compareModal");
}

$("#openCompare").addEventListener("click", openCompare);

$("#clearCompare").addEventListener("click", () => {
  compare = [];
  $$(".worker-card").forEach(c => {
    c.classList.remove("in-compare");
    c.querySelector(".compare-toggle")?.classList.remove("on");
  });
  renderCompareBar();
});


/* =========================================================
   PROFILE MODAL
   ========================================================= */

function openProfile(id) {

  const w = workers[id];
  if (!w) return;

  $("#profileContent").innerHTML = `

    <div class="profile-cover"></div>

    <div class="profile-main">

      <div class="profile-big-avatar av-${w.category}">${w.initials}</div>

      <h2>${esc(w.name)}</h2>
      <div class="profile-role">${esc(w.role)}</div>

      <div class="profile-badges">
        ${w.verified ? `<span class="badge">${icon("shield")} Verified</span>` : ""}
        <span class="badge">${icon("star")} ${w.rating}</span>
        <span class="badge neutral">${esc(w.experience)} experience</span>
        <span class="badge neutral">${esc(w.availability)}</span>
      </div>

    </div>

    <div class="profile-stats">
      <div class="profile-stat"><strong>${w.jobs}</strong><span>Jobs</span></div>
      <div class="profile-stat"><strong>${rupee(w.price)}</strong><span>Starting</span></div>
      <div class="profile-stat"><strong>${w.distance} km</strong><span>Away</span></div>
      <div class="profile-stat"><strong>~${w.response}m</strong><span>Reply</span></div>
    </div>

    <div class="profile-section">
      <h4>About</h4>
      <p class="profile-bio">${esc(w.bio)}</p>
      <p class="profile-bio" style="margin-top:8px">
        ${icon("clock")} ${esc(w.hours)} &nbsp;·&nbsp; ${icon("chat")} ${esc(w.languages)}
      </p>
    </div>

    <div class="profile-section">
      <h4>Skills</h4>
      <div class="worker-skills">
        ${w.skills.map(s => `<span class="skill">${esc(s)}</span>`).join("")}
      </div>
    </div>

    <div class="profile-section">
      <h4>Services &amp; prices</h4>
      <div class="service-list">
        ${w.services.map((s, i) => `
          <div class="service-row">
            <b>${esc(s.name)}</b>
            <em>${rupee(s.price)}</em>
            <button data-act="request" data-id="${w.id}" data-service="${i}">Book</button>
          </div>`).join("")}
      </div>
    </div>

    <div class="profile-section">
      <h4>Recent reviews</h4>
      ${w.reviews.slice(0, 6).map(r => `
        <div class="review">
          <strong>${esc(r.name)} ${starsHTML(r.rating ?? 5)}</strong>
          ${r.tags?.length ? `<div class="tags">${r.tags.map(tg => `<span>${esc(tg)}</span>`).join("")}</div>` : ""}
          ${r.text ? `<p>${esc(r.text)}</p>` : ""}
        </div>`).join("")}
    </div>

    <div class="profile-actions">
      <button class="primary-btn" data-act="request" data-id="${w.id}">Request worker</button>
      <button class="secondary-btn" data-act="chat" data-id="${w.id}">Message</button>
      <button class="icon-only" data-act="share" data-id="${w.id}" aria-label="Share profile" title="Share profile">${icon("share")}</button>
    </div>
  `;

  openModal("profileModal");
}


/* =========================================================
   REQUEST MODAL
   ========================================================= */

function dateOptions() {
  const out = [];
  for (let d = 0; d < 5; d++) {
    const date = new Date();
    date.setDate(date.getDate() + d);
    const label = date.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" });
    out.push(d === 0 ? `Today · ${label}` : d === 1 ? `Tomorrow · ${label}` : label);
  }
  return out;
}

function openRequestModal(id, serviceIdx = 0, prefill) {

  const w = workers[id];
  if (!w) return;

  closeAllModals();

  $("#requestWorkerId").value = id;
  $("#requestWorkerName").textContent = `Request ${w.name}`;

  $("#requestService").innerHTML = w.services.map((s, i) =>
    `<option value="${i}" ${i === Number(serviceIdx) ? "selected" : ""}>${esc(s.name)} — ${rupee(s.price)}</option>`
  ).join("");

  $("#requestDescription").value = prefill ?? searchInput.value ?? "";
  $("#requestDate").innerHTML = dateOptions().map(d => `<option>${esc(d)}</option>`).join("");
  $("#requestAddress").value = settings.address || "";
  $("#emergencyRequest").checked = false;
  $("#requestPhoto").value = "";
  $("#photoPreview").classList.add("hidden");

  const notice = $("#requestNotice");
  if (!w.available) {
    notice.textContent = `${w.name} is busy right now (${w.availability.toLowerCase()}). Your request will be queued.`;
    notice.classList.remove("hidden");
  } else {
    notice.classList.add("hidden");
  }

  updateEstimate();
  openModal("requestModal");
}

function updateEstimate() {

  const w = workers[$("#requestWorkerId").value];
  if (!w) return;

  const svc = w.services[Number($("#requestService").value)] || w.services[0];
  const fee = $("#emergencyRequest").checked ? 100 : 0;

  $("#requestEstimate").innerHTML = `
    <div class="est-row"><span>${esc(svc.name)}</span><span>${rupee(svc.price)}</span></div>
    ${fee ? `<div class="est-row"><span>Emergency priority fee</span><span>${rupee(fee)}</span></div>` : ""}
    <div class="est-row est-total"><span>Estimated total</span><span>${rupee(svc.price + fee)}</span></div>
    <div class="est-row" style="font-size:12px;margin-top:4px"><span>Final price is confirmed by the worker after seeing the job.</span></div>
  `;
}

$("#requestService").addEventListener("change", updateEstimate);
$("#emergencyRequest").addEventListener("change", updateEstimate);

function readPhoto(file) {
  return new Promise(resolve => {
    if (!file) return resolve(null);
    const fr = new FileReader();
    fr.onerror = () => resolve(null);
    fr.onload = () => {
      const img = new Image();
      img.onerror = () => resolve(null);
      img.onload = () => {
        const scale = Math.min(1, 320 / Math.max(img.width, img.height));
        const c = document.createElement("canvas");
        c.width = Math.round(img.width * scale);
        c.height = Math.round(img.height * scale);
        c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
        resolve(c.toDataURL("image/jpeg", 0.7));
      };
      img.src = fr.result;
    };
    fr.readAsDataURL(file);
  });
}

$("#requestPhoto").addEventListener("change", async e => {
  const data = await readPhoto(e.target.files[0]);
  const prev = $("#photoPreview");
  if (data) { prev.src = data; prev.classList.remove("hidden"); }
  else prev.classList.add("hidden");
});

$("#requestForm").addEventListener("submit", async event => {

  event.preventDefault();

  const workerId = $("#requestWorkerId").value;
  const w = workers[workerId];
  const svc = w.services[Number($("#requestService").value)] || w.services[0];
  const emergency = $("#emergencyRequest").checked;
  const address = $("#requestAddress").value.trim();

  const photo = await readPhoto($("#requestPhoto").files[0]);

  const request = {
    id: Date.now().toString(),
    workerId,
    service: svc.name,
    price: svc.price,
    fee: emergency ? 100 : 0,
    description: $("#requestDescription").value.trim(),
    date: $("#requestDate").value,
    time: $("#requestTime").value,
    address,
    photo,
    emergency,
    status: "sent",
    otp: String(Math.floor(1000 + Math.random() * 9000)),
    paid: false,
    reviewed: false,
    createdAt: new Date().toISOString()
  };

  requests.unshift(request);
  save(STORAGE.requests, requests);

  settings.address = address;
  save(STORAGE.settings, settings);

  addActivity(
    emergency ? "Emergency request sent" : "Request sent",
    `Your request for “${svc.name}” was sent to ${w.name}.`,
    emergency ? "bolt" : "check"
  );

  closeAllModals();
  $("#requestForm").reset();

  updateBadge();
  showView("requests");

  toast(`Request sent to ${w.name}`, { type: "success", icon: "send" });

  scheduleAutoAccept(request.id);
});


/* =========================================================
   REQUEST STATUS
   ========================================================= */

const statusFlow = ["sent", "accepted", "onway", "progress", "completed"];

const statusNames = {
  sent: "Request sent",
  accepted: "Accepted",
  onway: "On the way",
  progress: "In progress",
  completed: "Completed",
  cancelled: "Cancelled"
};

const progressLabels = ["Sent", "Accepted", "On the way", "In progress", "Completed"];

const getStatusIndex = s => statusFlow.indexOf(s);

const fillMap = {};

function setStatus(request, status) {

  request.status = status;
  save(STORAGE.requests, requests);

  const w = workers[request.workerId];

  addActivity(
    "Request updated",
    `${w.name}: ${statusNames[status]}.`,
    status === "completed" ? "check" : "activity"
  );

  updateBadge();
  if (currentView === "requests") renderRequests(false);
}

function advanceRequest(id) {

  const request = requests.find(r => r.id === id);
  if (!request) return;

  const index = getStatusIndex(request.status);
  if (index < 0 || index >= statusFlow.length - 1) return;

  const next = statusFlow[index + 1];
  setStatus(request, next);

  const w = workers[request.workerId];

  if (next === "onway") {
    toast(`${w.name} is on the way — share OTP ${request.otp} on arrival`, { icon: "pin" });
  } else if (next === "completed") {
    toast("Job completed! You can pay and leave a review.", { type: "success", icon: "check" });
  }
}

function scheduleAutoAccept(id) {

  const request = requests.find(r => r.id === id);
  if (!request) return;

  setTimeout(() => {
    const r = requests.find(x => x.id === id);
    if (r && r.status === "sent") {
      setStatus(r, "accepted");
      toast(`${workers[r.workerId].name} accepted your request`, { type: "success", icon: "check" });
    }
  }, request.emergency ? 2500 : 5000);
}

function cancelRequest(id) {

  const r = requests.find(x => x.id === id);
  if (!r || r.status === "completed" || r.status === "cancelled") return;

  const previous = r.status;
  setStatus(r, "cancelled");

  toast("Request cancelled", {
    icon: "x",
    action: {
      label: "Undo",
      fn: () => { r.status = previous; save(STORAGE.requests, requests); updateBadge(); renderRequests(false); }
    }
  });
}

let requestFilter = "all";

function matchesFilter(r) {
  const finished = r.status === "completed" || r.status === "cancelled";
  return requestFilter === "all" || (requestFilter === "active" ? !finished : finished);
}

function requestCardHTML(r) {

  const w = workers[r.workerId];
  const cancelled = r.status === "cancelled";
  const done = r.status === "completed";
  const cur = getStatusIndex(r.status);
  const price = (r.price ?? w.price) + (r.fee || 0);
  const serviceIndex = Math.max(0, w.services.findIndex(s => s.name === r.service));

  const statusClass = done ? "completed" : cancelled ? "cancelled" : "";

  return `

    <div class="request-card-top">

      <div class="request-worker">
        <div class="worker-avatar av-${w.category}">${w.initials}</div>
        <div>
          <h4>${esc(w.name)}</h4>
          <p>${esc(w.role)}</p>
        </div>
      </div>

      <div class="badges">
        ${r.emergency ? `<span class="status-badge emergency">${icon("bolt")} Emergency</span>` : ""}
        <span class="status-badge ${statusClass}">${statusNames[r.status]}</span>
        ${r.paid ? `<span class="status-badge paid">Paid</span>` : ""}
      </div>

    </div>

    <div class="req-service">${esc(r.service || "General help")}</div>
    <p class="request-description">${esc(r.description)}</p>

    <div class="req-details">
      <span>${icon("calendar")} <b>${esc(r.date || "Flexible")}</b> · ${esc(r.time || "")}</span>
      ${r.address ? `<span>${icon("pin")} ${esc(r.address)}</span>` : ""}
      <span>${rupee(price)}${r.tip ? ` + ${rupee(r.tip)} tip` : ""}</span>
    </div>

    ${r.photo ? `<img class="req-photo" src="${r.photo}" alt="Attached photo">` : ""}

    ${(r.status === "accepted" || r.status === "onway") && r.otp ? `
      <div class="otp-box">
        <span>Share this code with the worker when they arrive:</span>
        <strong>${esc(r.otp)}</strong>
      </div>` : ""}

    ${cancelled ? "" : `
      <div class="progress" style="--fill:${fillMap[r.id] ?? (cur / 4) * 80}%" data-fill="${(cur / 4) * 80}">
        ${progressLabels.map((label, i) => `
          <div class="progress-step ${cur >= i ? "active" : ""} ${cur === i && !done ? "current" : ""}">${label}</div>
        `).join("")}
      </div>`}

    <div class="request-actions" style="${cancelled ? "margin-top:14px" : ""}">

      ${!done && !cancelled ? `
        <button data-act="advance" data-id="${r.id}">${icon("activity")} Simulate next update</button>
        <button class="danger" data-act="cancel" data-id="${r.id}">Cancel</button>` : ""}

      ${done && !r.paid ? `<button class="pay" data-act="pay" data-id="${r.id}">Pay ${rupee(price)}</button>` : ""}
      ${done && !r.reviewed ? `<button data-act="review" data-id="${r.id}">${icon("star")} Leave review</button>` : ""}
      ${done || cancelled ? `<button data-act="request" data-id="${r.workerId}" data-service="${serviceIndex}">Book again</button>` : ""}

      <button data-act="chat" data-id="${r.workerId}">${icon("chat")} Message</button>

    </div>
  `;
}

function renderRequests(animate = true) {

  const list = $("#requestsList");
  const empty = $("#emptyRequests");

  list.innerHTML = "";

  const shown = requests.filter(matchesFilter);

  if (!shown.length) {
    empty.classList.remove("hidden");
    updateBadge();
    return;
  }

  empty.classList.add("hidden");

  shown.forEach((r, i) => {

    if (!workers[r.workerId]) return;

    const card = document.createElement("article");
    card.className = "request-card";
    card.style.setProperty("--i", Math.min(i, 8));
    if (!animate) card.style.animation = "none";
    card.innerHTML = requestCardHTML(r);
    list.appendChild(card);

    // animate the progress line from its old position to the new one
    const bar = $(".progress", card);
    if (bar) {
      const target = bar.dataset.fill;
      requestAnimationFrame(() => requestAnimationFrame(() => {
        bar.style.setProperty("--fill", `${target}%`);
      }));
      fillMap[r.id] = Number(target);
    }
  });

  updateBadge();
}

$$("[data-rfilter]").forEach(tab => {
  tab.addEventListener("click", () => {
    requestFilter = tab.dataset.rfilter;
    $$("[data-rfilter]").forEach(t => t.classList.toggle("active", t === tab));
    renderRequests();
  });
});

$("#newRequestButton").addEventListener("click", () => {
  showView("discover");
  setTimeout(() => searchInput.focus(), 350);
});

$("#discoverFromRequests").addEventListener("click", () => showView("discover"));


/* =========================================================
   SAVED
   ========================================================= */

function renderSaved() {

  const grid = $("#savedGrid");
  grid.innerHTML = "";

  const list = savedWorkers.map(id => workers[id]).filter(Boolean);

  $("#emptySaved").classList.toggle("hidden", !!list.length);

  list.forEach((w, i) => grid.appendChild(createWorkerCard(w, 0, "", i)));
}


/* =========================================================
   ACTIVITY + NOTIFICATIONS
   ========================================================= */

function addActivity(title, description, iconName = "check") {

  activity.unshift({
    id: Date.now().toString() + Math.random().toString(36).slice(2, 5),
    title,
    description,
    icon: iconName,
    createdAt: new Date().toISOString()
  });

  activity = activity.slice(0, 40);
  save(STORAGE.activity, activity);

  if (currentView === "activity") renderActivity();
  updateNotifDot();
}

const activityIcon = ic => (ICON_NAMES.has(ic) ? icon(ic) : esc(ic || "•"));

function renderActivity() {

  const list = $("#activityList");
  list.innerHTML = "";

  $("#emptyActivity").classList.toggle("hidden", !!activity.length);

  activity.forEach((item, i) => {

    const el = document.createElement("div");
    el.className = "timeline-item";
    el.style.setProperty("--i", Math.min(i, 12));

    el.innerHTML = `
      <div class="timeline-icon">${activityIcon(item.icon)}</div>
      <div class="timeline-content">
        <strong>${esc(item.title)}</strong>
        <p>${esc(item.description)}</p>
        <small>${timeAgo(item.createdAt)} · ${new Date(item.createdAt).toLocaleString()}</small>
      </div>`;

    list.appendChild(el);
  });
}

$("#clearActivity").addEventListener("click", () => {
  if (!activity.length) return;
  activity = [];
  save(STORAGE.activity, activity);
  renderActivity();
  updateNotifDot();
  toast("Activity cleared", { icon: "trash" });
});

const notifPanel = $("#notifPanel");

function unreadCount() {
  return activity.filter(a => new Date(a.createdAt).getTime() > notifSeen).length;
}

function updateNotifDot() {
  $("#notifDot").classList.toggle("hidden", unreadCount() === 0);
}

function renderNotifPanel() {

  const items = activity.slice(0, 6);

  notifPanel.innerHTML = `
    <div class="popover-head">
      <strong>Notifications</strong>
      <button class="text-btn" data-act="mark-read">Mark all read</button>
    </div>
    ${items.length ? items.map(a => `
      <div class="popover-item ${new Date(a.createdAt).getTime() > notifSeen ? "unread" : ""}">
        <div class="timeline-icon">${activityIcon(a.icon)}</div>
        <div>
          <strong>${esc(a.title)}</strong>
          <p>${esc(a.description)}</p>
          <small style="color:var(--muted-2);font-size:11.5px">${timeAgo(a.createdAt)}</small>
        </div>
      </div>`).join("") : `<div class="popover-empty">You're all caught up.</div>`}
    <div class="popover-foot">
      <button class="secondary-btn" data-act="view-activity">View all activity</button>
    </div>`;
}

$("#notifButton").addEventListener("click", e => {
  e.stopPropagation();
  const opening = notifPanel.classList.contains("hidden");
  if (opening) renderNotifPanel();
  notifPanel.classList.toggle("hidden", !opening);
});

function markAllRead() {
  notifSeen = Date.now();
  save(STORAGE.seen, notifSeen);
  updateNotifDot();
}


/* =========================================================
   POST JOB
   ========================================================= */

function openJobModal(prefill = {}) {

  closeAllModals();

  $("#jobTitle").value = prefill.title || "";
  $("#jobDescription").value = prefill.description || "";
  $("#jobCategory").value = prefill.category || "home";
  $("#jobBudget").value = "";
  $("#jobArea").value = settings.city;
  $("#jobUrgency").value = "Flexible";

  openModal("jobModal");
}

$("#postJobButton").addEventListener("click", () => openJobModal());

$("#jobForm").addEventListener("submit", event => {

  event.preventDefault();

  const job = {
    id: Date.now().toString(),
    title: $("#jobTitle").value.trim(),
    description: $("#jobDescription").value.trim(),
    category: $("#jobCategory").value,
    budget: $("#jobBudget").value.trim() || "Negotiable",
    area: $("#jobArea").value.trim(),
    urgency: $("#jobUrgency").value,
    createdAt: new Date().toISOString()
  };

  postedJobs.unshift(job);
  save(STORAGE.jobs, postedJobs);

  addActivity("Job posted", `${job.title} was added to your jobs.`, "plus");

  closeAllModals();
  event.target.reset();

  showView("jobs");
  toast("Job posted — nearby workers can see it now", { type: "success", icon: "check" });
});

function jobMatches(job) {

  const text = `${job.title} ${job.description}`;

  return workerList
    .filter(w => w.category === job.category)
    .map(w => ({ w, s: scoreWorker(w, text).score }))
    .sort((a, b) => b.s - a.s || b.w.rating - a.w.rating)
    .slice(0, 3)
    .map(x => x.w);
}

function renderJobs() {

  const box = $("#postedJobs");
  box.innerHTML = "";

  if (!postedJobs.length) {
    box.innerHTML = `
      <div class="empty-large">
        <div class="empty-icon">${icon("plus")}</div>
        <h3>No jobs posted</h3>
        <p>Post your first job and let nearby workers discover it.</p>
      </div>`;
    return;
  }

  postedJobs.forEach(job => {

    const matches = jobMatches(job);

    const el = document.createElement("article");
    el.className = "posted-job";

    el.innerHTML = `
      <div class="posted-job-head">
        <div>
          <h4>${esc(job.title)}</h4>
          <p>${esc(job.description)}</p>
        </div>
        <button class="icon-only" data-act="delete-job" data-id="${job.id}" aria-label="Delete job">${icon("trash")}</button>
      </div>

      <div class="job-tags">
        <span>${icon("pin")} ${esc(job.area)}</span>
        <span>₹ ${esc(job.budget)}</span>
        <span>${esc(CATEGORY_NAMES[job.category] || job.category)}</span>
        ${job.urgency ? `<span>${icon("clock")} ${esc(job.urgency)}</span>` : ""}
        <span>${timeAgo(job.createdAt)}</span>
      </div>

      ${matches.length ? `
        <div class="job-matches">
          <h5>WORKERS WHO CAN HELP</h5>
          <div class="job-match-row">
            ${matches.map(w => `
              <button class="job-match" data-act="profile" data-id="${w.id}">
                <div class="worker-avatar av-${w.category}">${w.initials}</div>
                <div style="text-align:left"><b>${esc(w.name)}</b><small>★ ${w.rating} · from ${rupee(w.price)}</small></div>
              </button>`).join("")}
          </div>
        </div>` : ""}
    `;

    box.appendChild(el);
  });
}

function deleteJob(id) {

  const idx = postedJobs.findIndex(j => j.id === id);
  if (idx < 0) return;

  const [job] = postedJobs.splice(idx, 1);
  save(STORAGE.jobs, postedJobs);
  renderJobs();

  toast("Job deleted", {
    icon: "trash",
    action: {
      label: "Undo",
      fn: () => {
        postedJobs.splice(idx, 0, job);
        save(STORAGE.jobs, postedJobs);
        renderJobs();
      }
    }
  });
}


/* =========================================================
   MESSAGES
   ========================================================= */

let activeChat = null;
let typingTimer = null;

function getConversation(workerId) {

  if (!messages[workerId]) {
    messages[workerId] = [{
      from: "worker",
      text: `Hi! Thanks for reaching out. How can I help?`,
      at: new Date().toISOString()
    }];
    save(STORAGE.messages, messages);
  }

  return messages[workerId];
}

function renderConversations() {

  const q = ($("#convSearch").value || "").toLowerCase();

  const items = workerList
    .filter(w => !q || w.name.toLowerCase().includes(q) || w.role.toLowerCase().includes(q))
    .map(w => ({ w, last: messages[w.id]?.slice(-1)[0] }))
    .sort((a, b) =>
      (b.last ? new Date(b.last.at || 0).getTime() : -1) -
      (a.last ? new Date(a.last.at || 0).getTime() : -1)
    );

  $("#conversationList").innerHTML = items.map(({ w, last }) => `
    <div class="conversation ${activeChat === w.id ? "active" : ""} ${last ? "" : "new"}" data-act="chat" data-id="${w.id}">
      <div class="conversation-avatar av-${w.category}">${w.initials}</div>
      <div>
        <strong>${esc(w.name)} <small>${last?.at ? clockTime(last.at) : ""}</small></strong>
        <p>${last ? (last.from === "me" ? "You: " : "") + esc(last.text) : "Start a conversation"}</p>
      </div>
    </div>`).join("");
}

$("#convSearch").addEventListener("input", renderConversations);

function bubbleHTML(m) {
  return `${esc(m.text)}${m.at ? `<small>${clockTime(m.at)}</small>` : ""}`;
}

function appendBubble(m) {
  const box = $("#chatMessages");
  if (!box) return;
  const el = document.createElement("div");
  el.className = `message ${m.from === "me" ? "mine" : ""}`;
  el.innerHTML = bubbleHTML(m);
  const typing = $(".typing", box);
  box.insertBefore(el, typing || null);
  box.scrollTo({ top: box.scrollHeight, behavior: prefersReducedMotion ? "auto" : "smooth" });
}

function openChat(workerId) {

  activeChat = workerId;

  closeAllModals();
  showView("messages");

  const w = workers[workerId];
  const conversation = getConversation(workerId);

  $("#messagesLayout").classList.add("chat-open");

  $("#chatPanel").innerHTML = `

    <div class="chat-header">
      <button class="ghost-btn chat-back" data-act="chat-back" aria-label="Back">${icon("back")}</button>
      <div class="conversation-avatar av-${w.category}">${w.initials}</div>
      <div>
        <strong>${esc(w.name)}</strong>
        <span style="color:${w.available ? "var(--green)" : "var(--yellow)"}">${w.available ? "Available" : "Busy"} · ${esc(w.role)}</span>
      </div>
      <div class="spacer"></div>
      <button class="ghost-btn" data-act="profile" data-id="${w.id}" aria-label="View profile">${icon("user")}</button>
    </div>

    <div class="chat-messages" id="chatMessages">
      ${conversation.map(m => `<div class="message ${m.from === "me" ? "mine" : ""}">${bubbleHTML(m)}</div>`).join("")}
    </div>

    <div class="quick-replies">
      <button data-act="quick-reply" data-text="Are you available today?">Available today?</button>
      <button data-act="quick-reply" data-text="What is your price for this job?">What's the price?</button>
      <button data-act="quick-reply" data-text="Could you visit this evening?">Visit this evening?</button>
    </div>

    <form class="chat-composer" id="chatForm">
      <input id="chatInput" placeholder="Write a message..." autocomplete="off" aria-label="Message">
      <button aria-label="Send">${icon("send")}</button>
    </form>
  `;

  const box = $("#chatMessages");
  box.scrollTop = box.scrollHeight;

  $("#chatForm").addEventListener("submit", event => {
    event.preventDefault();
    const input = $("#chatInput");
    const text = input.value.trim();
    if (!text) return;
    input.value = "";
    sendMessage(workerId, text);
  });

  renderConversations();
}

function sendMessage(workerId, text) {

  const m = { from: "me", text, at: new Date().toISOString() };

  getConversation(workerId).push(m);
  save(STORAGE.messages, messages);

  appendBubble(m);
  renderConversations();

  scheduleReply(workerId, text);
}

function autoReply(w, text) {

  const q = text.toLowerCase();

  if (/price|cost|charge|rate|kitna|how much|fee/.test(q)) {
    return `My visits start at ${rupee(w.price)}. The final price depends on the work — I can confirm once I see the problem.`;
  }

  if (/available|when|today|tomorrow|evening|morning|abhi|time|visit/.test(q)) {
    return w.available
      ? `Yes, I can come ${/evening/.test(q) ? "this evening" : "today"}. Please share your address and a good time.`
      : `I'm busy right now, but I can fit you in later. ${w.availability}.`;
  }

  if (/address|location|where|area/.test(q)) {
    return "Please send your area and a nearby landmark, and I'll check how soon I can reach you.";
  }

  if (/thank/.test(q)) return "Happy to help! 🙂";

  return "Got it. Could you share a photo or a few more details so I can plan the visit properly?";
}

function scheduleReply(workerId, text) {

  const w = workers[workerId];

  const showTyping = activeChat === workerId && currentView === "messages";

  if (showTyping) {
    const box = $("#chatMessages");
    if (box && !$(".typing", box)) {
      const el = document.createElement("div");
      el.className = "message typing";
      el.innerHTML = "<i></i><i></i><i></i>";
      box.appendChild(el);
      box.scrollTo({ top: box.scrollHeight });
    }
  }

  clearTimeout(typingTimer);

  typingTimer = setTimeout(() => {

    const reply = { from: "worker", text: autoReply(w, text), at: new Date().toISOString() };

    messages[workerId].push(reply);
    save(STORAGE.messages, messages);

    $(".typing")?.remove();

    if (activeChat === workerId && currentView === "messages") {
      appendBubble(reply);
    } else {
      toast(`${w.name}: ${reply.text.slice(0, 60)}${reply.text.length > 60 ? "…" : ""}`, { icon: "chat" });
      addActivity("New message", `${w.name} replied to you.`, "chat");
    }

    renderConversations();

  }, 1100 + Math.random() * 900);
}


/* =========================================================
   PAYMENT
   ========================================================= */

let payment = { id: null, tip: 0, upi: null };

function paymentBase(r) {
  return (r.price ?? workers[r.workerId].price) + (r.fee || 0);
}

function updatePaymentAmount() {

  const r = requests.find(x => x.id === payment.id);
  if (!r) return;

  const base = paymentBase(r);

  $("#paymentAmount").textContent = rupee(base + payment.tip);

  $("#paymentBreakdown").textContent =
    `${r.service || "Service"} ${rupee(r.price ?? base)}` +
    (r.fee ? ` + priority ${rupee(r.fee)}` : "") +
    (payment.tip ? ` + tip ${rupee(payment.tip)}` : "");
}

function openPayment(id) {

  const r = requests.find(x => x.id === id);
  if (!r) return;

  payment = { id, tip: 0, upi: null };

  $("#paymentForm").classList.remove("hidden");
  $("#paymentDone").classList.add("hidden");

  $$("#tipOptions button").forEach(b => b.classList.toggle("active", b.dataset.tip === "0"));
  $$("#upiOptions button").forEach(b => b.classList.remove("active"));

  const btn = $("#simulatePayment");
  btn.disabled = false;
  btn.textContent = "Simulate payment";

  updatePaymentAmount();
  openModal("paymentModal");
}

$("#tipOptions").addEventListener("click", e => {
  const b = e.target.closest("button");
  if (!b) return;
  payment.tip = Number(b.dataset.tip);
  $$("#tipOptions button").forEach(x => x.classList.toggle("active", x === b));
  updatePaymentAmount();
});

$("#upiOptions").addEventListener("click", e => {
  const b = e.target.closest("button");
  if (!b) return;
  payment.upi = b.dataset.upi;
  $$("#upiOptions button").forEach(x => x.classList.toggle("active", x === b));
});

$("#simulatePayment").addEventListener("click", () => {

  const r = requests.find(x => x.id === payment.id);
  if (!r) return;

  if (!payment.upi) {
    const box = $("#upiOptions");
    box.classList.remove("shake");
    void box.offsetWidth;
    box.classList.add("shake");
    toast("Choose a UPI app first", { type: "warn", icon: "shield" });
    return;
  }

  const btn = $("#simulatePayment");
  btn.disabled = true;
  btn.innerHTML = `<span class="spinner"></span> Processing…`;

  setTimeout(() => {

    const total = paymentBase(r) + payment.tip;
    const w = workers[r.workerId];

    r.paid = true;
    r.tip = payment.tip;
    r.receipt = "KS" + r.id.slice(-6);
    save(STORAGE.requests, requests);

    addActivity("Payment completed", `Demo payment of ${rupee(total)} via ${payment.upi} recorded for ${w.name}.`, "check");

    $("#receiptText").textContent =
      `${rupee(total)} paid to ${w.name} via ${payment.upi}. Receipt #${r.receipt}. (Demo only — no real money moved.)`;

    $("#paymentForm").classList.add("hidden");
    $("#paymentDone").classList.remove("hidden");

    renderRequests(false);

  }, 1500);
});


/* =========================================================
   REVIEW
   ========================================================= */

let reviewRating = 0;

function setStars(n) {
  reviewRating = n;
  $$("#starInput button").forEach(b => b.classList.toggle("on", Number(b.dataset.star) <= n));
}

function openReview(requestId) {

  const r = requests.find(x => x.id === requestId);
  if (!r) return;

  const w = workers[r.workerId];

  $("#reviewRequestId").value = requestId;
  $("#reviewTitle").textContent = `Review ${w.name}`;
  $("#reviewText").value = "";
  $$("#reviewTags button").forEach(b => b.classList.remove("on"));
  setStars(0);

  openModal("reviewModal");
}

$("#starInput").addEventListener("click", e => {
  const b = e.target.closest("button");
  if (b) setStars(Number(b.dataset.star));
});

$("#reviewTags").addEventListener("click", e => {
  const b = e.target.closest("button");
  if (b) b.classList.toggle("on");
});

$("#reviewForm").addEventListener("submit", event => {

  event.preventDefault();

  if (!reviewRating) {
    toast("Tap a star to rate first", { type: "warn", icon: "star" });
    return;
  }

  const r = requests.find(x => x.id === $("#reviewRequestId").value);
  if (!r) return;

  const w = workers[r.workerId];

  const review = {
    name: settings.name,
    rating: reviewRating,
    text: $("#reviewText").value.trim(),
    tags: $$("#reviewTags button.on").map(b => b.textContent)
  };

  (reviewsStore[w.id] = reviewsStore[w.id] || []).unshift(review);
  save(STORAGE.reviews, reviewsStore);

  applyReview(w.id, review);

  r.reviewed = true;
  save(STORAGE.requests, requests);

  addActivity("Review added", `You rated ${w.name} ${reviewRating}★.`, "star");

  closeAllModals();
  renderRequests(false);
  renderWorkers();

  toast("Thanks! Your review was added.", { type: "success", icon: "star" });
});


/* =========================================================
   SETTINGS, LOCATION, LANGUAGE
   ========================================================= */

function applyProfile() {
  $("#profileName").textContent = settings.name;
  $("#profileAvatar").textContent = settings.name.trim().charAt(0).toUpperCase() || "B";
}

$("#profileSettings").addEventListener("click", () => {
  $("#settingsName").value = settings.name;
  applyTheme(document.documentElement.dataset.theme);
  openModal("settingsModal");
});

$("#themeSegment").addEventListener("click", e => {
  const b = e.target.closest("[data-theme-opt]");
  if (b) setTheme(b.dataset.themeOpt);
});

$("#settingsForm").addEventListener("submit", event => {
  event.preventDefault();
  settings.name = $("#settingsName").value.trim() || DEFAULT_SETTINGS.name;
  save(STORAGE.settings, settings);
  applyProfile();
  closeModal("settingsModal");
  toast("Settings saved", { type: "success" });
});

$("#resetData").addEventListener("click", () => {
  if (!confirm("This clears your requests, saved workers, jobs, messages and settings on this device. Continue?")) return;
  Object.values(STORAGE).forEach(k => localStorage.removeItem(k));
  location.reload();
});

$("#locationButton").addEventListener("click", () => {
  $("#locationOptions").innerHTML = Object.keys(CITIES).map(c =>
    `<button data-act="city" data-city="${esc(c)}" class="${c === settings.city ? "active" : ""}">${icon("pin")} ${esc(c)}</button>`
  ).join("");
  openModal("locationModal");
});

$("#languageButton").addEventListener("click", () => {
  $$("[data-lang]").forEach(b => b.classList.toggle("active", b.dataset.lang === settings.lang));
  openModal("languageModal");
});

$$("[data-lang]").forEach(button => {
  button.addEventListener("click", () => {

    settings.lang = button.dataset.lang;
    save(STORAGE.settings, settings);
    applyLang();
    closeModal("languageModal");

    if (!I18N[settings.lang]) {
      toast("This language is coming soon — showing English for now.", { icon: "chat" });
    }
  });
});


/* =========================================================
   BADGES
   ========================================================= */

function updateBadge() {

  const isActive = r => r.status !== "completed" && r.status !== "cancelled";
  const active = requests.filter(isActive).length;

  $("#requestBadge").textContent = active;
  $("#tabAll").textContent = requests.length;
  $("#tabActive").textContent = active;
  $("#tabDone").textContent = requests.length - active;

  const saved = $("#savedBadge");
  saved.textContent = savedWorkers.length;
  saved.classList.toggle("hidden", !savedWorkers.length);
}


/* =========================================================
   GLOBAL EVENT DELEGATION
   ========================================================= */

document.addEventListener("click", event => {

  const el = event.target.closest("[data-act]");

  // click-ripple on primary buttons
  const rippleHost = event.target.closest(".primary-btn, .search-submit");
  if (rippleHost && !prefersReducedMotion) {
    const rect = rippleHost.getBoundingClientRect();
    const dot = document.createElement("span");
    dot.className = "ripple-dot";
    dot.style.cssText =
      `left:${event.clientX - rect.left}px;top:${event.clientY - rect.top}px;width:60px;height:60px;margin:-30px 0 0 -30px`;
    rippleHost.appendChild(dot);
    setTimeout(() => dot.remove(), 600);
  }

  // close popovers / dropdowns when clicking elsewhere
  if (!event.target.closest("#notifWrap")) notifPanel.classList.add("hidden");
  if (!event.target.closest(".search-wrap")) hideSuggestions();

  // modal close buttons + backdrop
  const closeBtn = event.target.closest("[data-close]");
  if (closeBtn) closeModal(closeBtn.dataset.close);

  if (event.target.classList.contains("modal-backdrop")) closeModal(event.target.id);

  if (!el) return;

  const id = el.dataset.id;

  switch (el.dataset.act) {

    case "save": toggleSave(id); break;
    case "compare": toggleCompare(id); break;
    case "profile": closeAllModals(); openProfile(id); break;
    case "request": openRequestModal(id, el.dataset.service || 0); break;
    case "chat": openChat(id); break;
    case "chat-back": $("#messagesLayout").classList.remove("chat-open"); activeChat = null; renderConversations(); break;
    case "quick-reply": sendMessage(activeChat, el.dataset.text); break;

    case "advance": advanceRequest(id); break;
    case "cancel": cancelRequest(id); break;
    case "pay": openPayment(id); break;
    case "review": openReview(id); break;

    case "delete-job": deleteJob(id); break;

    case "pin": selectPin(id); break;
    case "close-popup": closePopup(); break;

    case "quick": runQuery(el.dataset.q); break;
    case "pick": searchInput.value = el.dataset.q; performSearch(); break;
    case "clear-recent":
      recentSearches = [];
      save(STORAGE.recent, recentSearches);
      renderRecent();
      break;

    case "mark-read": markAllRead(); renderNotifPanel(); break;
    case "view-activity": markAllRead(); notifPanel.classList.add("hidden"); showView("activity"); break;

    case "city":
      settings.city = el.dataset.city;
      save(STORAGE.settings, settings);
      setCityAreas();
      closeModal("locationModal");
      toast(`Showing workers near ${settings.city}`, { icon: "pin" });
      break;

    case "share": {
      const url = `${location.href.split("#")[0]}#${id}`;
      (navigator.clipboard?.writeText(url) || Promise.reject())
        .then(() => toast("Profile link copied", { type: "success", icon: "share" }))
        .catch(() => toast(url, { icon: "share" }));
      break;
    }
  }
});

document.addEventListener("keydown", event => {

  if (event.key === "Escape") {

    const open = $$(".modal-backdrop:not(.hidden)").pop();

    if (open) closeModal(open.id);
    else if (!notifPanel.classList.contains("hidden")) notifPanel.classList.add("hidden");
    else if (sidebar.classList.contains("open")) closeSidebar();
    else if (selectedPin) closePopup();

    return;
  }

  const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName);

  if (event.key === "/" && !typing) {
    event.preventDefault();
    if (currentView !== "discover") showView("discover");
    searchInput.focus();
  }
});


/* =========================================================
   SCROLL REVEAL
   ========================================================= */

if ("IntersectionObserver" in window) {

  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        en.target.classList.add("in");
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.08 });

  $$(".reveal").forEach(el => io.observe(el));

} else {
  $$(".reveal").forEach(el => el.classList.add("in"));
}


/* =========================================================
   INITIAL LOAD
   ========================================================= */

applyTheme(document.documentElement.dataset.theme);
applyProfile();
setCityAreas();
applyLang();

renderStats();
renderServiceTiles();
renderRecent();
renderWorkers({ skeleton: true });
renderSaved();
renderRequests();
renderActivity();
renderJobs();
renderConversations();
renderCompareBar();
updateBadge();
updateNotifDot();
applyMap();

// open a shared profile link (…/index.html#rohit)
if (workers[location.hash.slice(1)]) {
  setTimeout(() => openProfile(location.hash.slice(1)), 700);
}

// resume the "accepted" step for requests created just before a reload
requests
  .filter(r => r.status === "sent" && Date.now() - Number(r.id) < 20000)
  .forEach(r => scheduleAutoAccept(r.id));
