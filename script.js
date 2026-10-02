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
   WORKER DATA
   ========================================================= */

const workers = {

  rohit: {
    id: "rohit",
    name: "Rohit Kumar",
    initials: "RK",
    role: "Wi-Fi & Network Technician",
    category: "tech",

    rating: 4.9,
    jobs: 128,
    price: 250,
    distance: 1.8,

    verified: true,
    available: true,

    availability: "Available now",

    skills: [
      "Wi-Fi",
      "Router",
      "CCTV",
      "Broadband",
      "Networking"
    ],

    bio:
      "Helps with home Wi-Fi, router setup, broadband issues, CCTV and basic networking. Focused on quick home visits and clear explanations.",

    experience: "6 years",

    reviews: [
      {
        name: "Neha",
        text:
          "Fixed my router quickly and explained the issue clearly."
      },
      {
        name: "Arjun",
        text:
          "Good communication and arrived on time."
      }
    ]
  },

  priya: {
    id: "priya",
    name: "Priya Sharma",
    initials: "PS",
    role: "Tailoring & Alterations",
    category: "personal",

    rating: 4.8,
    jobs: 94,
    price: 150,
    distance: 2.4,

    verified: true,
    available: true,

    availability: "Available today",

    skills: [
      "Tailoring",
      "Alterations",
      "Stitching",
      "Custom"
    ],

    bio:
      "Provides clothing alterations, stitching and custom tailoring for everyday wear and special occasions.",

    experience: "5 years",

    reviews: [
      {
        name: "Meera",
        text:
          "Very neat stitching and delivered when promised."
      },
      {
        name: "Riya",
        text:
          "Great alteration work and friendly service."
      }
    ]
  },

  amit: {
    id: "amit",
    name: "Amit Meena",
    initials: "AM",
    role: "Electrician & Home Repair",
    category: "home",

    rating: 4.7,
    jobs: 76,
    price: 200,
    distance: 3.1,

    verified: true,
    available: false,

    availability: "Busy right now",

    skills: [
      "Electrical",
      "Fan repair",
      "Wiring",
      "Switches",
      "Sockets"
    ],

    bio:
      "Handles everyday electrical repairs including fans, switches, sockets, wiring and small home maintenance jobs.",

    experience: "7 years",

    reviews: [
      {
        name: "Rahul",
        text:
          "Solved a difficult fan issue without wasting time."
      },
      {
        name: "Karan",
        text:
          "Professional and explained the repair before starting."
      }
    ]
  },

  sunil: {
    id: "sunil",
    name: "Sunil Verma",
    initials: "SV",
    role: "AC & Appliance Technician",
    category: "home",

    rating: 4.8,
    jobs: 112,
    price: 350,
    distance: 4.2,

    verified: true,
    available: true,

    availability: "Available now",

    skills: [
      "AC",
      "Cooler",
      "Appliances",
      "Maintenance"
    ],

    bio:
      "Home appliance technician specialising in AC servicing, cooler maintenance and common appliance problems.",

    experience: "8 years",

    reviews: [
      {
        name: "Vivek",
        text:
          "Quick AC service and fair pricing."
      }
    ]
  },

  neha: {
    id: "neha",
    name: "Neha Singh",
    initials: "NS",
    role: "Home Tutor",
    category: "education",

    rating: 4.9,
    jobs: 63,
    price: 300,
    distance: 2.9,

    verified: true,
    available: true,

    availability: "Available evenings",

    skills: [
      "Maths",
      "Science",
      "Class 5–8",
      "Homework"
    ],

    bio:
      "Provides personalised tutoring support for school students with a focus on clear explanations and practice.",

    experience: "4 years",

    reviews: [
      {
        name: "Ananya",
        text:
          "Explains difficult topics in a very simple way."
      }
    ]
  },

  mohit: {
    id: "mohit",
    name: "Mohit Yadav",
    initials: "MY",
    role: "Local Delivery & Transport",
    category: "transport",

    rating: 4.6,
    jobs: 87,
    price: 180,
    distance: 1.5,

    verified: false,
    available: true,

    availability: "Available now",

    skills: [
      "Local delivery",
      "Pickup",
      "Small transport"
    ],

    bio:
      "Helps with local pickups, deliveries and small transport requirements around the city.",

    experience: "3 years",

    reviews: [
      {
        name: "Aman",
        text:
          "Fast local delivery and good communication."
      }
    ]
  }
};


/* =========================================================
   STORAGE
   ========================================================= */

const STORAGE = {
  requests: "ks_requests",
  saved: "ks_saved",
  activity: "ks_activity",
  jobs: "ks_jobs",
  messages: "ks_messages"
};

function load(key, fallback = []) {

  try {

    const data = JSON.parse(
      localStorage.getItem(key)
    );

    return data ?? fallback;

  } catch {

    return fallback;
  }
}

function save(key, value) {
  localStorage.setItem(
    key,
    JSON.stringify(value)
  );
}

let requests = load(STORAGE.requests);
let savedWorkers = load(STORAGE.saved);
let activity = load(STORAGE.activity);
let postedJobs = load(STORAGE.jobs);
let messages = load(STORAGE.messages);


/* =========================================================
   ELEMENTS
   ========================================================= */

const workerGrid =
  document.getElementById("workerGrid");

const savedGrid =
  document.getElementById("savedGrid");

const requestsList =
  document.getElementById("requestsList");

const activityList =
  document.getElementById("activityList");

const postedJobsContainer =
  document.getElementById("postedJobs");

const requestBadge =
  document.getElementById("requestBadge");

const searchInput =
  document.getElementById("searchInput");

const smartMatch =
  document.getElementById("smartMatch");

const smartTitle =
  document.getElementById("smartTitle");

const smartDescription =
  document.getElementById("smartDescription");

const matchCount =
  document.getElementById("matchCount");


/* =========================================================
   NAVIGATION
   ========================================================= */

const navItems =
  document.querySelectorAll(".nav-item");

const views =
  document.querySelectorAll(".view");

const pageTitle =
  document.getElementById("pageTitle");

const pageSubtitle =
  document.getElementById("pageSubtitle");

const pageInfo = {

  discover: [
    "Discover",
    "Find trusted help around you."
  ],

  requests: [
    "My Requests",
    "Track your jobs from request to completion."
  ],

  saved: [
    "Saved Workers",
    "Your trusted local workers."
  ],

  activity: [
    "Activity",
    "Your recent KaamSetu activity."
  ],

  jobs: [
    "Post a Job",
    "Let local workers discover your work."
  ],

  messages: [
    "Messages",
    "Talk directly with workers."
  ]
};

function showView(viewName) {

  views.forEach(view => {
    view.classList.remove("active");
  });

  const target =
    document.getElementById(
      `${viewName}View`
    );

  if (target) {
    target.classList.add("active");
  }

  navItems.forEach(item => {
    item.classList.toggle(
      "active",
      item.dataset.view === viewName
    );
  });

  if (pageInfo[viewName]) {

    pageTitle.textContent =
      pageInfo[viewName][0];

    pageSubtitle.textContent =
      pageInfo[viewName][1];
  }

  if (viewName === "requests")
    renderRequests();

  if (viewName === "saved")
    renderSaved();

  if (viewName === "activity")
    renderActivity();

  if (viewName === "jobs")
    renderJobs();

  if (viewName === "messages")
    renderConversations();

  closeSidebar();
}

navItems.forEach(item => {

  item.addEventListener("click", () => {

    showView(item.dataset.view);

  });

});


/* =========================================================
   MOBILE SIDEBAR
   ========================================================= */

const sidebar =
  document.getElementById("sidebar");

const mobileMenu =
  document.getElementById("mobileMenu");

const sidebarOverlay =
  document.getElementById("sidebarOverlay");

function openSidebar() {
  sidebar.classList.add("open");
  sidebarOverlay.classList.add("show");
}

function closeSidebar() {
  sidebar.classList.remove("open");
  sidebarOverlay.classList.remove("show");
}

mobileMenu.addEventListener(
  "click",
  openSidebar
);

sidebarOverlay.addEventListener(
  "click",
  closeSidebar
);


/* =========================================================
   SEARCH / SMART MATCH
   ========================================================= */

const aliases = {

  wifi: [
    "wifi",
    "wi-fi",
    "wfi",
    "internet",
    "network",
    "router",
    "rounter",
    "broadband",
    "modem",
    "disconnecting",
    "connection"
  ],

  electrical: [
    "fan",
    "electric",
    "electrician",
    "socket",
    "switch",
    "wire",
    "wiring",
    "power",
    "light"
  ],

  tailoring: [
    "tailor",
    "tailoring",
    "stitching",
    "stitch",
    "clothes",
    "dress",
    "alteration",
    "alterations"
  ],

  cctv: [
    "cctv",
    "camera",
    "security camera"
  ],

  ac: [
    "ac",
    "air conditioner",
    "cooler",
    "cooling"
  ],

  education: [
    "tutor",
    "teacher",
    "maths",
    "math",
    "science",
    "homework",
    "study"
  ],

  transport: [
    "delivery",
    "pickup",
    "transport",
    "parcel",
    "move"
  ]
};

function normalize(text) {

  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function detectIntent(query) {

  const q = normalize(query);

  const detected = [];

  Object.entries(aliases)
    .forEach(([intent, words]) => {

      if (
        words.some(word =>
          q.includes(word)
        )
      ) {
        detected.push(intent);
      }

    });

  return detected;
}

function calculateMatch(worker, query) {

  if (!query) return 0;

  const q = normalize(query);

  const intents =
    detectIntent(q);

  let score = 35;

  const workerText =
    [
      worker.role,
      worker.category,
      ...worker.skills
    ]
      .join(" ")
      .toLowerCase();

  worker.skills.forEach(skill => {

    if (
      q.includes(
        skill.toLowerCase()
      )
    ) {
      score += 13;
    }

  });

  if (
    intents.includes("wifi") &&
    worker.id === "rohit"
  ) {
    score += 38;
  }

  if (
    intents.includes("electrical") &&
    worker.category === "home"
  ) {
    score += 28;
  }

  if (
    intents.includes("tailoring") &&
    worker.id === "priya"
  ) {
    score += 42;
  }

  if (
    intents.includes("cctv") &&
    worker.id === "rohit"
  ) {
    score += 35;
  }

  if (
    intents.includes("ac") &&
    worker.id === "sunil"
  ) {
    score += 42;
  }

  if (
    intents.includes("education") &&
    worker.id === "neha"
  ) {
    score += 45;
  }

  if (
    intents.includes("transport") &&
    worker.id === "mohit"
  ) {
    score += 45;
  }

  if (worker.available)
    score += 4;

  if (worker.verified)
    score += 3;

  return Math.min(
    99,
    Math.max(20, score)
  );
}


/* =========================================================
   RENDER WORKERS
   ========================================================= */

let currentCategory = "all";

function getVisibleWorkers() {

  const query =
    searchInput.value.trim();

  const category =
    document.getElementById(
      "categoryFilter"
    ).value;

  const sort =
    document.getElementById(
      "sortFilter"
    ).value;

  const verifiedOnly =
    document.getElementById(
      "verifiedFilter"
    ).checked;

  const availableOnly =
    document.getElementById(
      "availableFilter"
    ).checked;

  let list =
    Object.values(workers);

  const selectedCategory =
    currentCategory !== "all"
      ? currentCategory
      : category;

  if (selectedCategory !== "all") {

    list =
      list.filter(
        worker =>
          worker.category ===
          selectedCategory
      );
  }

  if (query) {

    list =
      list
        .map(worker => ({
          worker,
          match: calculateMatch(
            worker,
            query
          )
        }))
        .filter(item =>
          item.match >= 35
        );

  } else {

    list =
      list.map(worker => ({
        worker,
        match: 0
      }));

  }

  if (verifiedOnly) {

    list =
      list.filter(
        item => item.worker.verified
      );
  }

  if (availableOnly) {

    list =
      list.filter(
        item => item.worker.available
      );
  }

  switch (sort) {

    case "rating":

      list.sort(
        (a,b) =>
          b.worker.rating -
          a.worker.rating
      );

      break;

    case "price":

      list.sort(
        (a,b) =>
          a.worker.price -
          b.worker.price
      );

      break;

    case "distance":

      list.sort(
        (a,b) =>
          a.worker.distance -
          b.worker.distance
      );

      break;

    case "jobs":

      list.sort(
        (a,b) =>
          b.worker.jobs -
          a.worker.jobs
      );

      break;

    default:

      list.sort(
        (a,b) =>
          b.match -
          a.match
      );
  }

  return list;
}

function renderWorkers() {

  const query =
    searchInput.value.trim();

  const list =
    getVisibleWorkers();

  workerGrid.innerHTML = "";

  if (!list.length) {

    document
      .getElementById("emptyWorkers")
      .classList.remove("hidden");

    return;

  }

  document
    .getElementById("emptyWorkers")
    .classList.add("hidden");

  list.forEach(item => {

    workerGrid.appendChild(
      createWorkerCard(
        item.worker,
        item.match,
        query
      )
    );

  });

  updateSmartMatch(list, query);
}


/* =========================================================
   WORKER CARD
   ========================================================= */

function createWorkerCard(
  worker,
  match = 0,
  query = ""
) {

  const card =
    document.createElement("article");

  card.className =
    "worker-card";

  const isSaved =
    savedWorkers.includes(
      worker.id
    );

  card.innerHTML = `

    <button
      class="save-worker ${isSaved ? "saved" : ""}"
      data-save="${worker.id}"
      aria-label="Save worker"
    >
      ${isSaved ? "♥" : "♡"}
    </button>

    <div class="worker-top">

      <div class="worker-avatar">
        ${worker.initials}
      </div>

      <div class="worker-info">

        <h4>${worker.name}</h4>

        <p>${worker.role}</p>

        ${
          worker.verified
            ? `
              <span class="verified">
                ✓ Verified worker
              </span>
            `
            : ""
        }

      </div>

    </div>

    <div class="worker-meta">

      <span>
        ★ <strong>${worker.rating}</strong>
      </span>

      <span>
        ${worker.jobs} jobs
      </span>

      <span>
        ${worker.distance} km
      </span>

    </div>

    <div class="worker-skills">

      ${worker.skills
        .slice(0,4)
        .map(
          skill =>
            `<span class="skill">${skill}</span>`
        )
        .join("")}

    </div>

    ${
      query
        ? `
          <div class="match-score">
            <span>Problem match</span>
            <strong>${match}% match</strong>
          </div>
        `
        : ""
    }

    <div class="
      availability
      ${worker.available ? "" : "busy"}
    ">

      <span></span>

      ${worker.availability}

    </div>

    <div class="worker-actions">

      <button
        data-profile="${worker.id}"
      >
        View profile
      </button>

      <button
        class="primary"
        data-request="${worker.id}"
      >
        Request
      </button>

    </div>
  `;

  return card;
}


/* =========================================================
   SMART MATCH
   ========================================================= */

function updateSmartMatch(list, query) {

  if (!query) {

    smartMatch.classList.add("hidden");
    return;

  }

  const intents =
    detectIntent(query);

  smartMatch.classList.remove("hidden");

  smartTitle.textContent =
    intents.length
      ? `We understood: ${formatIntent(intents[0])}`
      : "We found relevant local help";

  smartDescription.textContent =
    `KaamSetu matched your description with ${list.length} nearby worker${list.length === 1 ? "" : "s"}.`;

  matchCount.textContent =
    list.length;
}

function formatIntent(intent) {

  const names = {
    wifi: "Wi-Fi / networking",
    electrical: "electrical repair",
    tailoring: "tailoring",
    cctv: "CCTV / security",
    ac: "AC & cooling",
    education: "education",
    transport: "local transport"
  };

  return names[intent] || "local service";
}


/* =========================================================
   SAVE WORKER
   ========================================================= */

document.addEventListener(
  "click",
  event => {

    const button =
      event.target.closest(
        "[data-save]"
      );

    if (!button) return;

    const id =
      button.dataset.save;

    if (
      savedWorkers.includes(id)
    ) {

      savedWorkers =
        savedWorkers.filter(
          item => item !== id
        );

      addActivity(
        "Removed saved worker",
        `${workers[id].name} was removed from your saved workers.`,
        "♡"
      );

    } else {

      savedWorkers.push(id);

      addActivity(
        "Saved worker",
        `${workers[id].name} was added to your saved workers.`,
        "♥"
      );

    }

    save(
      STORAGE.saved,
      savedWorkers
    );

    renderWorkers();
    renderSaved();

  }
);


/* =========================================================
   PROFILE MODAL
   ========================================================= */

document.addEventListener(
  "click",
  event => {

    const button =
      event.target.closest(
        "[data-profile]"
      );

    if (!button) return;

    openProfile(
      button.dataset.profile
    );

  }
);

function openProfile(id) {

  const worker =
    workers[id];

  const modal =
    document.getElementById(
      "profileModal"
    );

  const content =
    document.getElementById(
      "profileContent"
    );

  content.innerHTML = `

    <div class="profile-cover"></div>

    <div class="profile-main">

      <div class="profile-big-avatar">
        ${worker.initials}
      </div>

      <h2>${worker.name}</h2>

      <div class="profile-role">
        ${worker.role}
      </div>

      <div class="profile-badges">

        ${
          worker.verified
            ? `<span class="badge">✓ Verified</span>`
            : ""
        }

        <span class="badge">
          ★ ${worker.rating}
        </span>

        <span class="badge">
          ${worker.experience} experience
        </span>

      </div>

    </div>

    <div class="profile-stats">

      <div class="profile-stat">
        <strong>${worker.jobs}</strong>
        <span>Jobs</span>
      </div>

      <div class="profile-stat">
        <strong>₹${worker.price}</strong>
        <span>Starting</span>
      </div>

      <div class="profile-stat">
        <strong>${worker.distance} km</strong>
        <span>Nearby</span>
      </div>

    </div>

    <div class="profile-section">

      <h4>About</h4>

      <p class="profile-bio">
        ${worker.bio}
      </p>

    </div>

    <div class="profile-section">

      <h4>Skills</h4>

      <div class="worker-skills">

        ${worker.skills
          .map(
            skill =>
              `<span class="skill">${skill}</span>`
          )
          .join("")}

      </div>

    </div>

    <div class="profile-section">

      <h4>Recent reviews</h4>

      ${worker.reviews
        .map(
          review => `
            <div class="review">
              <strong>${review.name} · ★★★★★</strong>
              <p>${review.text}</p>
            </div>
          `
        )
        .join("")}

    </div>

    <div class="profile-actions">

      <button
        class="primary-btn"
        data-request="${worker.id}"
      >
        Request worker
      </button>

      <button
        class="primary-btn"
        data-chat="${worker.id}"
      >
        Message
      </button>

    </div>

  `;

  modal.classList.remove("hidden");
}


/* =========================================================
   REQUEST MODAL
   ========================================================= */

document.addEventListener(
  "click",
  event => {

    const button =
      event.target.closest(
        "[data-request]"
      );

    if (!button) return;

    const workerId =
      button.dataset.request;

    openRequestModal(workerId);

  }
);

function openRequestModal(id) {

  const worker =
    workers[id];

  document.getElementById(
    "requestWorkerId"
  ).value = id;

  document.getElementById(
    "requestWorkerName"
  ).textContent =
    `Request ${worker.name}`;

  document.getElementById(
    "requestDescription"
  ).value =
    searchInput.value || "";

  document.getElementById(
    "requestModal"
  ).classList.remove("hidden");

}


/* =========================================================
   REQUEST SUBMIT
   ========================================================= */

document
  .getElementById("requestForm")
  .addEventListener(
    "submit",
    event => {

      event.preventDefault();

      const workerId =
        document.getElementById(
          "requestWorkerId"
        ).value;

      const worker =
        workers[workerId];

      const description =
        document.getElementById(
          "requestDescription"
        ).value;

      const time =
        document.getElementById(
          "requestTime"
        ).value;

      const emergency =
        document.getElementById(
          "emergencyRequest"
        ).checked;

      const request = {

        id:
          Date.now().toString(),

        workerId,

        description,

        time,

        emergency,

        status: "sent",

        createdAt:
          new Date().toISOString()

      };

      requests.unshift(request);

      save(
        STORAGE.requests,
        requests
      );

      addActivity(
        emergency
          ? "Emergency request sent"
          : "Request sent",
        `Your request was sent to ${worker.name}.`,
        emergency ? "!" : "✓"
      );

      closeModal("requestModal");

      document
        .getElementById("requestForm")
        .reset();

      updateBadge();

      showView("requests");

    }
  );


/* =========================================================
   REQUEST STATUS
   ========================================================= */

const statusFlow = [
  "sent",
  "accepted",
  "onway",
  "progress",
  "completed"
];

const statusNames = {
  sent: "Request sent",
  accepted: "Accepted",
  onway: "On the way",
  progress: "In progress",
  completed: "Completed"
};

function getStatusIndex(status) {

  return statusFlow.indexOf(
    status
  );
}

function advanceRequest(id) {

  const request =
    requests.find(
      item => item.id === id
    );

  if (!request) return;

  const index =
    getStatusIndex(
      request.status
    );

  if (
    index <
    statusFlow.length - 1
  ) {

    request.status =
      statusFlow[index + 1];

    save(
      STORAGE.requests,
      requests
    );

    const worker =
      workers[request.workerId];

    addActivity(
      "Request updated",
      `${worker.name}: ${statusNames[request.status]}.`,
      "↗"
    );

    renderRequests();
  }

}

function renderRequests() {

  requestsList.innerHTML = "";

  if (!requests.length) {

    document
      .getElementById("emptyRequests")
      .classList.remove("hidden");

    updateBadge();

    return;

  }

  document
    .getElementById("emptyRequests")
    .classList.add("hidden");

  requests.forEach(request => {

    const worker =
      workers[request.workerId];

    const card =
      document.createElement("article");

    card.className =
      "request-card";

    const current =
      getStatusIndex(
        request.status
      );

    card.innerHTML = `

      <div class="request-card-top">

        <div class="request-worker">

          <div class="worker-avatar">
            ${worker.initials}
          </div>

          <div>

            <h4>${worker.name}</h4>

            <p>${worker.role}</p>

          </div>

        </div>

        <span class="
          status-badge
          ${request.status === "completed" ? "completed" : ""}
          ${request.emergency ? "emergency" : ""}
        ">

          ${
            request.emergency
              ? "Emergency"
              : statusNames[request.status]
          }

        </span>

      </div>

      <p class="request-description">
        ${request.description}
      </p>

      <div class="progress">

        ${[
          ["sent","Sent"],
          ["accepted","Accepted"],
          ["onway","On the way"],
          ["completed","Completed"]
        ]
        .map(([key,label],index) => {

          return `
            <div class="
              progress-step
              ${current >= index ? "active" : ""}
            ">
              ${label}
            </div>
          `;

        })
        .join("")}

      </div>

      <div class="request-actions">

        ${
          request.status !== "completed"
            ? `
              <button
                data-advance="${request.id}"
              >
                Simulate next update
              </button>
            `
            : `
              <button
                data-payment="${request.workerId}"
              >
                Pay ₹${worker.price}
              </button>

              <button
                data-review="${request.workerId}"
              >
                Leave review
              </button>
            `
        }

        <button
          data-chat="${request.workerId}"
        >
          Message
        </button>

      </div>
    `;

    requestsList.appendChild(card);

  });

  updateBadge();
}


/* =========================================================
   REQUEST EVENTS
   ========================================================= */

document.addEventListener(
  "click",
  event => {

    const advance =
      event.target.closest(
        "[data-advance]"
      );

    if (advance) {

      advanceRequest(
        advance.dataset.advance
      );

      return;
    }

    const payment =
      event.target.closest(
        "[data-payment]"
      );

    if (payment) {

      openPayment(
        payment.dataset.payment
      );

      return;
    }

    const review =
      event.target.closest(
        "[data-review]"
      );

    if (review) {

      leaveReview(
        review.dataset.review
      );

      return;
    }

    const chat =
      event.target.closest(
        "[data-chat]"
      );

    if (chat) {

      openChat(
        chat.dataset.chat
      );

    }

  }
);


/* =========================================================
   SAVED
   ========================================================= */

function renderSaved() {

  savedGrid.innerHTML = "";

  const list =
    savedWorkers
      .map(id => workers[id])
      .filter(Boolean);

  if (!list.length) {

    document
      .getElementById("emptySaved")
      .classList.remove("hidden");

    return;
  }

  document
    .getElementById("emptySaved")
    .classList.add("hidden");

  list.forEach(worker => {

    savedGrid.appendChild(
      createWorkerCard(worker)
    );

  });
}


/* =========================================================
   ACTIVITY
   ========================================================= */

function addActivity(
  title,
  description,
  icon = "•"
) {

  activity.unshift({

    id: Date.now().toString(),

    title,
    description,
    icon,

    createdAt:
      new Date().toISOString()

  });

  activity =
    activity.slice(0,30);

  save(
    STORAGE.activity,
    activity
  );

  renderActivity();

}

function renderActivity() {

  activityList.innerHTML = "";

  if (!activity.length) {

    document
      .getElementById("emptyActivity")
      .classList.remove("hidden");

    return;
  }

  document
    .getElementById("emptyActivity")
    .classList.add("hidden");

  activity.forEach(item => {

    const el =
      document.createElement("div");

    el.className =
      "timeline-item";

    const date =
      new Date(
        item.createdAt
      );

    el.innerHTML = `

      <div class="timeline-icon">
        ${item.icon}
      </div>

      <div class="timeline-content">

        <strong>${item.title}</strong>

        <p>${item.description}</p>

        <small>
          ${date.toLocaleString()}
        </small>

      </div>

    `;

    activityList.appendChild(el);

  });
}


/* =========================================================
   POST JOB
   ========================================================= */

document
  .getElementById("postJobButton")
  .addEventListener(
    "click",
    () => {

      document
        .getElementById("jobModal")
        .classList.remove("hidden");

    }
  );

document
  .getElementById("jobForm")
  .addEventListener(
    "submit",
    event => {

      event.preventDefault();

      const job = {

        id:
          Date.now().toString(),

        title:
          document.getElementById(
            "jobTitle"
          ).value,

        description:
          document.getElementById(
            "jobDescription"
          ).value,

        category:
          document.getElementById(
            "jobCategory"
          ).value,

        budget:
          document.getElementById(
            "jobBudget"
          ).value || "Negotiable",

        area:
          document.getElementById(
            "jobArea"
          ).value,

        createdAt:
          new Date().toISOString()

      };

      postedJobs.unshift(job);

      save(
        STORAGE.jobs,
        postedJobs
      );

      addActivity(
        "Job posted",
        `${job.title} was added to your jobs.`,
        "+"
      );

      closeModal("jobModal");

      event.target.reset();

      renderJobs();

      showView("jobs");

    }
  );

function renderJobs() {

  postedJobsContainer.innerHTML = "";

  if (!postedJobs.length) {

    postedJobsContainer.innerHTML = `

      <div class="empty-large">

        <div class="empty-icon">
          ＋
        </div>

        <h3>No jobs posted</h3>

        <p>
          Post your first job and let nearby
          workers discover it.
        </p>

      </div>
    `;

    return;
  }

  postedJobs.forEach(job => {

    const el =
      document.createElement("article");

    el.className =
      "posted-job";

    el.innerHTML = `

      <h4>${job.title}</h4>

      <p>
        ${job.description}
      </p>

      <p style="margin-top:8px;">
        📍 ${job.area}
        · 💰 ${job.budget}
      </p>

    `;

    postedJobsContainer.appendChild(el);

  });
}


/* =========================================================
   MESSAGES
   ========================================================= */

function getConversation(workerId) {

  if (!messages[workerId]) {

    messages[workerId] = [

      {
        from: "worker",
        text:
          "Hi! Thanks for reaching out."
      }

    ];

    save(
      STORAGE.messages,
      messages
    );
  }

  return messages[workerId];
}

function renderConversations() {

  const container =
    document.getElementById(
      "conversationList"
    );

  container.innerHTML = "";

  Object.keys(workers)
    .forEach(id => {

      const worker =
        workers[id];

      const conversation =
        messages[id];

      const last =
        conversation?.[
          conversation.length - 1
        ]?.text ||
        "Start a conversation";

      const el =
        document.createElement("div");

      el.className =
        "conversation";

      el.dataset.chatWorker =
        id;

      el.innerHTML = `

        <div class="conversation-avatar">
          ${worker.initials}
        </div>

        <div>

          <strong>${worker.name}</strong>

          <p>${last}</p>

        </div>

      `;

      container.appendChild(el);

    });

}

document.addEventListener(
  "click",
  event => {

    const conversation =
      event.target.closest(
        "[data-chat-worker]"
      );

    if (!conversation) return;

    openChat(
      conversation.dataset.chatWorker
    );

  }
);

function openChat(workerId) {

  showView("messages");

  const worker =
    workers[workerId];

  const conversation =
    getConversation(workerId);

  const panel =
    document.getElementById(
      "chatPanel"
    );

  panel.innerHTML = `

    <div class="chat-header">

      <div class="conversation-avatar">
        ${worker.initials}
      </div>

      <div>

        <strong>${worker.name}</strong>

        <span>
          ${worker.available ? "Available" : "Busy"}
        </span>

      </div>

    </div>

    <div class="chat-messages" id="chatMessages">

      ${conversation
        .map(
          message => `
            <div class="
              message
              ${message.from === "me" ? "mine" : ""}
            ">
              ${message.text}
            </div>
          `
        )
        .join("")}

    </div>

    <form class="chat-composer" id="chatForm">

      <input
        id="chatInput"
        placeholder="Write a message..."
        autocomplete="off"
      >

      <button>
        ↑
      </button>

    </form>

  `;

  document
    .getElementById("chatForm")
    .addEventListener(
      "submit",
      event => {

        event.preventDefault();

        const input =
          document.getElementById(
            "chatInput"
          );

        const text =
          input.value.trim();

        if (!text) return;

        messages[workerId].push({
          from: "me",
          text
        });

        save(
          STORAGE.messages,
          messages
        );

        openChat(workerId);

      }
    );

}


/* =========================================================
   PAYMENT
   ========================================================= */

let paymentWorkerId = null;

function openPayment(workerId) {

  paymentWorkerId =
    workerId;

  document.getElementById(
    "paymentAmount"
  ).textContent =
    `₹${workers[workerId].price}`;

  document
    .getElementById("paymentModal")
    .classList.remove("hidden");

}

document
  .getElementById("simulatePayment")
  .addEventListener(
    "click",
    () => {

      if (!paymentWorkerId)
        return;

      addActivity(
        "Payment completed",
        `Demo payment of ₹${workers[paymentWorkerId].price} recorded for ${workers[paymentWorkerId].name}.`,
        "₹"
      );

      closeModal("paymentModal");

      alert(
        "Demo payment completed successfully."
      );

    }
  );


/* =========================================================
   REVIEW
   ========================================================= */

function leaveReview(workerId) {

  const worker =
    workers[workerId];

  const review =
    prompt(
      `Leave a review for ${worker.name}:`
    );

  if (!review?.trim())
    return;

  worker.reviews.unshift({

    name: "You",

    text:
      review.trim()

  });

  addActivity(
    "Review added",
    `You reviewed ${worker.name}.`,
    "★"
  );

  alert(
    "Thanks! Your prototype review was added."
  );

}


/* =========================================================
   FILTERS
   ========================================================= */

document
  .getElementById("filterButton")
  .addEventListener(
    "click",
    () => {

      document
        .getElementById("filtersPanel")
        .classList.toggle("hidden");

    }
  );

document
  .getElementById("categoryFilter")
  .addEventListener(
    "change",
    renderWorkers
  );

document
  .getElementById("sortFilter")
  .addEventListener(
    "change",
    renderWorkers
  );

document
  .getElementById("verifiedFilter")
  .addEventListener(
    "change",
    renderWorkers
  );

document
  .getElementById("availableFilter")
  .addEventListener(
    "change",
    renderWorkers
  );


/* CATEGORY BUTTONS */

document
  .querySelectorAll(".category")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        currentCategory =
          button.dataset.category;

        document
          .querySelectorAll(".category")
          .forEach(
            item =>
              item.classList.remove(
                "active"
              )
          );

        button.classList.add(
          "active"
        );

        document.getElementById(
          "categoryFilter"
        ).value =
          currentCategory;

        renderWorkers();

      }
    );

  });


/* RESET FILTERS */

document
  .getElementById("resetFilters")
  .addEventListener(
    "click",
    () => {

      searchInput.value = "";

      currentCategory =
        "all";

      document.getElementById(
        "categoryFilter"
      ).value = "all";

      document.getElementById(
        "sortFilter"
      ).value = "recommended";

      document.getElementById(
        "verifiedFilter"
      ).checked = false;

      document.getElementById(
        "availableFilter"
      ).checked = false;

      document
        .querySelectorAll(".category")
        .forEach(
          item =>
            item.classList.remove(
              "active"
            )
        );

      document
        .querySelector('[data-category="all"]')
        .classList.add("active");

      renderWorkers();

    }
  );


/* =========================================================
   SEARCH EVENTS
   ========================================================= */

function performSearch() {

  renderWorkers();

  document
    .querySelector(".workers-section")
    .scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

}

document
  .getElementById("searchButton")
  .addEventListener(
    "click",
    performSearch
  );

searchInput.addEventListener(
  "input",
  () => {

    document.getElementById(
      "clearSearch"
    ).style.display =
      searchInput.value
        ? "block"
        : "none";

    renderWorkers();

  }
);

searchInput.addEventListener(
  "keydown",
  event => {

    if (event.key === "Enter") {
      performSearch();
    }

  }
);

document
  .getElementById("clearSearch")
  .addEventListener(
    "click",
    () => {

      searchInput.value = "";

      renderWorkers();

    }
  );


/* QUICK SEARCH */

document
  .querySelectorAll(
    "[data-search]"
  )
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        searchInput.value =
          button.dataset.search;

        performSearch();

      }
    );

  });


/* =========================================================
   MAP
   ========================================================= */

document
  .querySelectorAll(".map-pin")
  .forEach(pin => {

    pin.addEventListener(
      "click",
      () => {

        openProfile(
          pin.dataset.worker
        );

      }
    );

  });

document
  .getElementById("zoomIn")
  .addEventListener(
    "click",
    () => {

      document.querySelector(
        ".fake-map"
      ).style.transform =
        "scale(1.06)";

    }
  );

document
  .getElementById("zoomOut")
  .addEventListener(
    "click",
    () => {

      document.querySelector(
        ".fake-map"
      ).style.transform =
        "scale(1)";

    }
  );

document
  .getElementById("centerMap")
  .addEventListener(
    "click",
    () => {

      document.querySelector(
        ".user-location"
      ).animate(
        [
          { transform:"scale(1)" },
          { transform:"scale(1.4)" },
          { transform:"scale(1)" }
        ],
        {
          duration:600
        }
      );

    }
  );


/* =========================================================
   LANGUAGE
   ========================================================= */

document
  .getElementById("languageButton")
  .addEventListener(
    "click",
    () => {

      document
        .getElementById("languageModal")
        .classList.remove("hidden");

    }
  );

document
  .querySelectorAll("[data-lang]")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        document.getElementById(
          "languageButton"
        ).textContent =
          button.dataset.lang;

        closeModal(
          "languageModal"
        );

      }
    );

  });


/* =========================================================
   NEW REQUEST
   ========================================================= */

document
  .getElementById("newRequestButton")
  .addEventListener(
    "click",
    () => {

      showView("discover");

      searchInput.focus();

    }
  );

document
  .getElementById("discoverFromRequests")
  .addEventListener(
    "click",
    () => {

      showView("discover");

    }
  );


/* =========================================================
   CLOSE MODALS
   ========================================================= */

document.addEventListener(
  "click",
  event => {

    const closeButton =
      event.target.closest(
        "[data-close]"
      );

    if (closeButton) {

      closeModal(
        closeButton.dataset.close
      );

    }

    if (
      event.target.classList.contains(
        "modal-backdrop"
      )
    ) {

      event.target.classList.add(
        "hidden"
      );

    }

  }
);

function closeModal(id) {

  const modal =
    document.getElementById(id);

  if (modal)
    modal.classList.add("hidden");

}


/* =========================================================
   BADGE
   ========================================================= */

function updateBadge() {

  const active =
    requests.filter(
      request =>
        request.status !==
        "completed"
    ).length;

  requestBadge.textContent =
    active;

}


/* =========================================================
   PROFILE SETTINGS
   ========================================================= */

document
  .getElementById("profileSettings")
  .addEventListener(
    "click",
    () => {

      alert(
        "Profile settings can be connected to a real account system later."
      );

    }
  );


/* =========================================================
   INITIAL LOAD
   ========================================================= */

renderWorkers();
renderSaved();
renderRequests();
renderActivity();
renderJobs();
renderConversations();
updateBadge();