/* =====================================================
   ELITE CREATIVES — APPLICATION LOGIC
===================================================== */

// =================== PRELOADER ===================
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  setTimeout(() => preloader.classList.add("hide"), 600);
});
// Safety: hide preloader even if load event is delayed by slow video
setTimeout(() => {
  const preloader = document.getElementById("preloader");
  if (preloader) preloader.classList.add("hide");
}, 2500);

// =================== HERO VIDEO FALLBACK ===================
const heroVideo = document.querySelector(".hero-video");
const heroFallback = document.getElementById("heroFallback");
if (heroVideo && heroVideo.tagName === "VIDEO") {
  heroVideo.addEventListener("error", () => {
    heroVideo.style.display = "none";
    heroFallback.classList.remove("hidden");
  });
  setTimeout(() => {
    if (heroVideo.readyState === 0) {
      heroVideo.style.display = "none";
      heroFallback.classList.remove("hidden");
    }
  }, 3000);
}

// =================== CUSTOM CURSOR ===================
const cursorDot = document.getElementById("cursorDot");
const cursorRing = document.getElementById("cursorRing");
const isFinePointer = window.matchMedia("(pointer: fine)").matches;

if (cursorDot && cursorRing && isFinePointer) {
  let ringX = 0, ringY = 0, mouseX = 0, mouseY = 0;
  let ringActive = false;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX; mouseY = e.clientY;
    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;
    if (!ringActive) { ringActive = true; cursorRing.classList.add("show"); }
  });
  document.addEventListener("mouseleave", () => {
    ringActive = false;
    cursorRing.classList.remove("show");
  });
  document.addEventListener("mousedown", () => cursorDot.classList.add("click"));
  document.addEventListener("mouseup", () => cursorDot.classList.remove("click"));

  // Smoothly trailing ring (lerp toward the dot each frame)
  function animateRing() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    cursorRing.style.left = `${ringX}px`;
    cursorRing.style.top = `${ringY}px`;
    requestAnimationFrame(animateRing);
  }
  animateRing();

  function bindCursorTargets() {
    document.querySelectorAll("a, button, .mason-item, .cal-day:not(.empty):not(.disabled)").forEach((el) => {
      if (el.dataset.cursorBound) return;
      el.dataset.cursorBound = "true";
      el.addEventListener("mouseenter", () => {
        cursorDot.classList.add("grow");
        cursorRing.classList.add("grow");
      });
      el.addEventListener("mouseleave", () => {
        cursorDot.classList.remove("grow");
        cursorRing.classList.remove("grow");
      });
    });
  }
  bindCursorTargets();
  // Re-bind whenever dynamic content (portfolio grid, etc.) re-renders
  window.bindCursorTargets = bindCursorTargets;
}

// =================== NAVBAR SCROLL STATE ===================
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 30);
});

// =================== ACTIVE NAV LINK TRACKING ===================
const navSections = ["services", "portfolio", "why", "pricing", "contact"]
  .map((id) => document.getElementById(id))
  .filter(Boolean);
const navLinkMap = new Map();
document.querySelectorAll(".nav-link").forEach((link) => {
  const id = link.getAttribute("href")?.replace("#", "");
  if (id) navLinkMap.set(id, link);
});

const navSectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const link = navLinkMap.get(entry.target.id);
      if (!link) return;
      if (entry.isIntersecting) {
        document.querySelectorAll(".nav-link").forEach((l) => l.classList.remove("nav-active"));
        link.classList.add("nav-active");
      }
    });
  },
  { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
);
navSections.forEach((sec) => navSectionObserver.observe(sec));

// =================== MAGNETIC BUTTONS ===================
function initMagneticButtons() {
  document.querySelectorAll(".btn-gold, .chat-toggle-btn, .floating-booking, .floating-whatsapp").forEach((btn) => {
    if (btn.dataset.magnetic) return;
    btn.dataset.magnetic = "true";
    const strength = 0.22;
    const lift = btn.classList.contains("btn-gold") ? "translateY(-3px) scale(1.015)" : "";
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * strength}px, ${y * strength}px) ${lift}`;
    });
    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "";
    });
  });
}
initMagneticButtons();

// =================== TILT-ON-HOVER (pricing + portfolio cards) ===================
function initTiltEffect(selector, intensity = 8) {
  document.querySelectorAll(selector).forEach((card) => {
    if (card.dataset.tiltBound) return;
    card.dataset.tiltBound = "true";
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(900px) rotateX(${-py * intensity}deg) rotateY(${px * intensity}deg) translateY(-6px)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}
// =================== HERO PARALLAX ===================
const heroContent = document.querySelector("#home .relative.z-10");
const heroSection = document.getElementById("home");
if (heroContent && heroSection) {
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const heroHeight = heroSection.offsetHeight;
    if (scrollY < heroHeight) {
      const progress = scrollY / heroHeight;
      heroContent.style.transform = `translateY(${scrollY * 0.25}px)`;
      heroContent.style.opacity = String(Math.max(1 - progress * 1.4, 0));
    }
  });
}

// =================== MOBILE MENU ===================
document.getElementById("mobileMenuBtn").addEventListener("click", () => {
  let nav = document.getElementById("mobileNav");
  if (nav) { nav.remove(); return; }
  nav = document.createElement("div");
  nav.id = "mobileNav";
  nav.innerHTML = `
    <a href="#services">Services</a>
    <a href="#portfolio">Portfolio</a>
    <a href="#why">Why Us</a>
    <a href="#pricing">Pricing</a>
    <a href="#contact">Contact</a>
  `;
  navbar.appendChild(nav);
  nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => nav.remove()));
});

// =================== DARK / LIGHT MODE ===================
const themeToggle = document.getElementById("themeToggle");
const THEME_KEY = "ec_theme";

function applyTheme(theme) {
  // Default is light — dark mode gets a class added
  document.body.classList.toggle("dark-mode", theme === "dark");
  themeToggle.innerHTML = theme === "dark"
    ? '<i class="fa-solid fa-sun text-xs"></i>'
    : '<i class="fa-solid fa-moon text-xs"></i>';
}
const savedTheme = localStorage.getItem(THEME_KEY) || "light";
applyTheme(savedTheme);

themeToggle.addEventListener("click", () => {
  const next = document.body.classList.contains("dark-mode") ? "light" : "dark";
  localStorage.setItem(THEME_KEY, next);
  applyTheme(next);
});

// =================== SCROLL REVEAL ===================
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll("[data-animate]").forEach((el) => revealObserver.observe(el));

// =================== ANIMATED COUNTERS ===================
function formatCounterValue(value, prefix, suffix) {
  let display;
  if (suffix === "B+") {
    display = (value / 1000).toFixed(1).replace(/\.0$/, "");
  } else {
    display = Math.round(value).toLocaleString();
  }
  return `${prefix || ""}${display}${suffix || ""}`;
}

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

document.querySelectorAll("[data-counter]").forEach((el) => {
  const target = parseFloat(el.dataset.counter);
  const prefix = el.dataset.prefix || "";
  const suffix = el.dataset.suffix || "";
  const scaledTarget = suffix === "B+" ? target * 1000 : target; // internal "millions" granularity for B+ smoothing
  const duration = 1800;

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        let startTime = null;
        function tick(now) {
          if (startTime === null) startTime = now;
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = easeOutCubic(progress);
          el.textContent = formatCounterValue(scaledTarget * eased, prefix, suffix);
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        counterObserver.unobserve(el);
      }
    });
  });
  counterObserver.observe(el);
});

// =================== SERVICES LIST ===================
const servicesList = document.getElementById("servicesList");
SERVICES.forEach((s, i) => {
  const row = document.createElement("div");
  row.className = "service-row";
  row.setAttribute("data-animate", "");
  row.style.setProperty("--reveal-delay", `${Math.min(i * 70, 420)}ms`);
  row.innerHTML = `
    <div class="service-left">
      <span class="service-index">${String(i + 1).padStart(2, "0")}</span>
      <div>
        <p class="service-name">${s.name}</p>
        <p class="service-desc">${s.desc}</p>
      </div>
    </div>
    <div class="service-icon"><i class="fa-solid ${s.icon}"></i></div>
  `;
  servicesList.appendChild(row);
});
// Re-observe newly created animate elements
document.querySelectorAll("#servicesList [data-animate]").forEach((el) => revealObserver.observe(el));

// =================== PORTFOLIO MASONRY ===================
const masonryGrid = document.getElementById("masonryGrid");
let currentPfFilter = "all";

function typeLabel(type) {
  return { photo: "Photography", video: "Film", drone: "Drone", "3d": "3D Tour" }[type] || type;
}

function renderMasonry() {
  masonryGrid.innerHTML = "";
  const items = PORTFOLIO.filter((p) => currentPfFilter === "all" || p.type === currentPfFilter);
  items.forEach((p, i) => {
    const item = document.createElement("div");
    item.className = `mason-item ${p.tall ? "tall" : ""}`;
    item.style.animation = "none";
    item.style.animationDelay = `${i * 60}ms`;
    item.innerHTML = `
      <span class="mason-badge">${typeLabel(p.type)}</span>
      <img src="${p.img}" alt="${escapeHtml(p.title)}" loading="lazy" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=900&auto=format&fit=crop'" />
      <div class="mason-overlay">
        <p class="mason-title">${escapeHtml(p.title)}</p>
        <p class="mason-loc"><i class="fa-solid fa-location-dot mr-1"></i>${escapeHtml(p.location)}</p>
      </div>
    `;
    item.addEventListener("click", () => showToast(`Opening "${p.title}" — demo project preview.`));
    masonryGrid.appendChild(item);
    // restart the CSS entrance animation on every render (filter switch included)
    requestAnimationFrame(() => { item.style.animation = `masonIn 0.7s var(--ease-luxury) ${i * 60}ms both`; });
  });
  if (window.bindCursorTargets) window.bindCursorTargets();
  initTiltEffect(".mason-item", 5);
}
renderMasonry();

document.getElementById("portfolioFilters").addEventListener("click", (e) => {
  const btn = e.target.closest(".pf-tab");
  if (!btn) return;
  document.querySelectorAll(".pf-tab").forEach((b) => b.classList.remove("active-pf"));
  btn.classList.add("active-pf");
  currentPfFilter = btn.dataset.filter;
  renderMasonry();
});

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str ?? "";
  return div.innerHTML;
}

// =================== BEFORE / AFTER SLIDER ===================
const baSlider = document.getElementById("baSlider");
const baAfterImg = document.querySelector(".ba-img-after");
const baDivider = document.getElementById("baDivider");
let baDragging = false;

function setBaPosition(clientX) {
  const rect = baSlider.getBoundingClientRect();
  let pct = ((clientX - rect.left) / rect.width) * 100;
  pct = Math.max(0, Math.min(100, pct));
  baAfterImg.style.clipPath = `inset(0 0 0 ${pct}%)`;
  baDivider.style.left = `${pct}%`;
}
baSlider.addEventListener("mousedown", (e) => { baDragging = true; setBaPosition(e.clientX); });
window.addEventListener("mousemove", (e) => { if (baDragging) setBaPosition(e.clientX); });
window.addEventListener("mouseup", () => (baDragging = false));
baSlider.addEventListener("touchstart", (e) => setBaPosition(e.touches[0].clientX));
baSlider.addEventListener("touchmove", (e) => setBaPosition(e.touches[0].clientX));

// =================== WHY CHOOSE US ===================
const whyList = document.getElementById("whyList");
WHY_US.forEach((w, i) => {
  const card = document.createElement("div");
  card.className = "why-card";
  card.setAttribute("data-animate", "");
  card.style.setProperty("--reveal-delay", `${Math.min(i * 80, 400)}ms`);
  card.innerHTML = `
    <div class="why-icon"><i class="fa-solid ${w.icon}"></i></div>
    <p class="why-title">${w.title}</p>
    <p class="why-desc">${w.desc}</p>
  `;
  whyList.appendChild(card);
});
document.querySelectorAll("#whyList [data-animate]").forEach((el) => revealObserver.observe(el));
initTiltEffect(".why-card", 4);

// =================== TESTIMONIALS ===================
const testimonialTrack = document.getElementById("testimonialTrack");
TESTIMONIALS.forEach((t, i) => {
  const card = document.createElement("div");
  card.className = "testimonial-card";
  card.setAttribute("data-animate", "scale");
  card.style.setProperty("--reveal-delay", `${i * 90}ms`);
  card.innerHTML = `
    <div class="testimonial-stars">★★★★★</div>
    <p class="testimonial-quote">"${escapeHtml(t.quote)}"</p>
    <p class="testimonial-author">${escapeHtml(t.author)}</p>
    <p class="testimonial-role">${escapeHtml(t.role)}</p>
  `;
  testimonialTrack.appendChild(card);
});
document.querySelectorAll("#testimonialTrack [data-animate]").forEach((el) => revealObserver.observe(el));

// =================== PRICING ===================
const pricingGrid = document.getElementById("pricingGrid");
PRICING.forEach((p, i) => {
  const card = document.createElement("div");
  card.className = `pricing-card ${p.featured ? "featured" : ""}`;
  card.setAttribute("data-animate", "");
  card.style.setProperty("--reveal-delay", `${i * 100}ms`);
  card.innerHTML = `
    ${p.badge ? `<span class="pricing-badge">${p.badge}</span>` : ""}
    <p class="pricing-name">${p.name}</p>
    <p class="pricing-tagline">${p.tagline}</p>
    <p class="pricing-price">$${p.price.toLocaleString()}<span> / project</span></p>
    <ul class="pricing-features">
      ${p.features.map((f) => `<li><i class="fa-solid fa-check"></i> ${f}</li>`).join("")}
    </ul>
    <a href="#booking" class="pricing-cta">Select ${p.name}</a>
  `;
  pricingGrid.appendChild(card);
});
document.querySelectorAll("#pricingGrid [data-animate]").forEach((el) => revealObserver.observe(el));
initTiltEffect(".pricing-card", 6);

// =================== QUOTE CALCULATOR ===================
const quotePackage = document.getElementById("quotePackage");
const quoteAddons = document.querySelectorAll(".quote-addon");
const quoteTotal = document.getElementById("quoteTotal");

function updateQuote() {
  let total = parseInt(quotePackage.value, 10);
  quoteAddons.forEach((cb) => { if (cb.checked) total += parseInt(cb.value, 10); });
  quoteTotal.textContent = `$${total.toLocaleString()}`;
}
quotePackage.addEventListener("change", updateQuote);
quoteAddons.forEach((cb) => cb.addEventListener("change", updateQuote));

// =================== BOOKING CALENDAR ===================
const calMonthLabel = document.getElementById("calMonthLabel");
const calGrid = document.getElementById("calGrid");
const calPrev = document.getElementById("calPrev");
const calNext = document.getElementById("calNext");
const bookingFormWrap = document.getElementById("bookingFormWrap");
const selectedDateLabel = document.getElementById("selectedDateLabel");

let calDate = new Date();
calDate.setDate(1);
let selectedDate = null;
const today = new Date();
today.setHours(0, 0, 0, 0);

const MONTH_NAMES = ["January","February","March","April","May","June","July","August","September","October","November","December"];

function renderCalendar() {
  calMonthLabel.textContent = `${MONTH_NAMES[calDate.getMonth()]} ${calDate.getFullYear()}`;
  calGrid.innerHTML = "";

  const firstDay = new Date(calDate.getFullYear(), calDate.getMonth(), 1).getDay();
  const daysInMonth = new Date(calDate.getFullYear(), calDate.getMonth() + 1, 0).getDate();

  for (let i = 0; i < firstDay; i++) {
    const empty = document.createElement("div");
    empty.className = "cal-day empty";
    calGrid.appendChild(empty);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const dayEl = document.createElement("div");
    const thisDate = new Date(calDate.getFullYear(), calDate.getMonth(), d);
    thisDate.setHours(0, 0, 0, 0);
    const isPast = thisDate < today;
    const isSunday = thisDate.getDay() === 0;

    dayEl.className = "cal-day" + (isPast || isSunday ? " disabled" : "");
    dayEl.textContent = d;

    if (
      selectedDate &&
      selectedDate.getDate() === d &&
      selectedDate.getMonth() === calDate.getMonth() &&
      selectedDate.getFullYear() === calDate.getFullYear()
    ) {
      dayEl.classList.add("selected");
    }

    if (!isPast && !isSunday) {
      dayEl.addEventListener("click", () => {
        selectedDate = thisDate;
        renderCalendar();
        bookingFormWrap.classList.remove("hidden");
        selectedDateLabel.textContent = thisDate.toLocaleDateString("en-US", {
          weekday: "long", year: "numeric", month: "long", day: "numeric",
        });
        bookingFormWrap.scrollIntoView({ behavior: "smooth", block: "nearest" });
      });
    }
    calGrid.appendChild(dayEl);
  }
}
renderCalendar();

calPrev.addEventListener("click", () => {
  calDate.setMonth(calDate.getMonth() - 1);
  renderCalendar();
});
calNext.addEventListener("click", () => {
  calDate.setMonth(calDate.getMonth() + 1);
  renderCalendar();
});

document.getElementById("bookingForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("bookName").value.trim();
  showToast(`Thank you, ${name}! Your booking request for ${selectedDateLabel.textContent} has been received.`);
  e.target.reset();
  bookingFormWrap.classList.add("hidden");
  selectedDate = null;
  renderCalendar();
});

// =================== AGENT GROWTH ===================
const growthTipsEl = document.getElementById("growthTips");
GROWTH_TIPS.forEach((t, i) => {
  const tip = document.createElement("div");
  tip.className = "growth-tip";
  tip.setAttribute("data-animate", "left");
  tip.style.setProperty("--reveal-delay", `${i * 100}ms`);
  tip.innerHTML = `
    <div class="growth-tip-icon"><i class="fa-solid ${t.icon}"></i></div>
    <div>
      <p class="growth-tip-title">${t.title}</p>
      <p class="growth-tip-desc">${t.desc}</p>
    </div>
  `;
  growthTipsEl.appendChild(tip);
});
document.querySelectorAll(".growth-tip[data-animate]").forEach((el) => revealObserver.observe(el));

// Growth chart bars
const growthChart = document.getElementById("growthChart");
const CHART_DATA = [
  { label: "Views", standard: 35, gold: 95 },
  { label: "Saves", standard: 20, gold: 80 },
  { label: "Inquiries", standard: 28, gold: 88 },
  { label: "Days to Offer", standard: 55, gold: 30 },
];
CHART_DATA.forEach((d) => {
  const group = document.createElement("div");
  group.style.display = "flex";
  group.style.flexDirection = "column";
  group.style.flex = "1";
  group.style.height = "100%";

  const bars = document.createElement("div");
  bars.className = "growth-bar-group";
  bars.innerHTML = `
    <div class="growth-bar standard" data-h="${d.standard}"></div>
    <div class="growth-bar gold" data-h="${d.gold}"></div>
  `;
  const label = document.createElement("p");
  label.className = "growth-bar-label";
  label.textContent = d.label;

  group.appendChild(bars);
  group.appendChild(label);
  growthChart.appendChild(group);
});

const chartObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      document.querySelectorAll(".growth-bar-group").forEach((group, groupIndex) => {
        group.querySelectorAll(".growth-bar").forEach((bar, barIndex) => {
          const delay = groupIndex * 90 + barIndex * 120;
          setTimeout(() => { bar.style.height = `${bar.dataset.h}%`; }, delay);
        });
      });
      chartObserver.unobserve(entry.target);
    }
  });
});
chartObserver.observe(growthChart);

// =================== NEWSLETTER ===================
document.getElementById("newsletterForm").addEventListener("submit", (e) => {
  e.preventDefault();
  showToast("You're subscribed. Welcome to the inner circle.");
  e.target.reset();
});

// =================== TOAST ===================
function showToast(message) {
  const toast = document.getElementById("toast");
  document.getElementById("toastMsg").textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3200);
}

// =================== AI CHATBOT (rule-based simulation) ===================
const chatToggleBtn = document.getElementById("chatToggleBtn");
const chatWindow = document.getElementById("chatWindow");
const closeChatBtn = document.getElementById("closeChatBtn");
const chatMessages = document.getElementById("chatMessages");
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
const chatQuickReplies = document.getElementById("chatQuickReplies");

let chatOpened = false;

chatToggleBtn.addEventListener("click", () => {
  chatWindow.classList.toggle("hidden");
  if (!chatOpened && !chatWindow.classList.contains("hidden")) {
    chatOpened = true;
    addBotMessage("Welcome to Elite Creatives. I'm your concierge — ask me about pricing, services, or booking a shoot.");
    renderQuickReplies(["Pricing", "Book a shoot", "Our services"]);
  }
});
closeChatBtn.addEventListener("click", () => chatWindow.classList.add("hidden"));

function addBotMessage(text) {
  const bubble = document.createElement("div");
  bubble.className = "chat-bubble bot";
  bubble.textContent = text;
  chatMessages.appendChild(bubble);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}
function addUserMessage(text) {
  const bubble = document.createElement("div");
  bubble.className = "chat-bubble user";
  bubble.textContent = text;
  chatMessages.appendChild(bubble);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}
function showTypingIndicator() {
  const typing = document.createElement("div");
  typing.className = "chat-bubble bot chat-typing";
  typing.id = "chatTypingIndicator";
  typing.innerHTML = "<span></span><span></span><span></span>";
  chatMessages.appendChild(typing);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}
function removeTypingIndicator() {
  const typing = document.getElementById("chatTypingIndicator");
  if (typing) typing.remove();
}
function renderQuickReplies(options) {
  chatQuickReplies.innerHTML = "";
  options.forEach((opt) => {
    const btn = document.createElement("button");
    btn.className = "chat-quick-reply";
    btn.textContent = opt;
    btn.addEventListener("click", () => handleChatQuery(opt));
    chatQuickReplies.appendChild(btn);
  });
}

function handleChatQuery(query) {
  addUserMessage(query);
  chatQuickReplies.innerHTML = "";
  const q = query.toLowerCase();
  let response = CHAT_RESPONSES.default;
  if (q.includes("price") || q.includes("cost") || q.includes("pricing")) response = CHAT_RESPONSES.pricing;
  else if (q.includes("book")) response = CHAT_RESPONSES.booking;
  else if (q.includes("service")) response = CHAT_RESPONSES.services;

  showTypingIndicator();
  setTimeout(() => {
    removeTypingIndicator();
    addBotMessage(response);
    renderQuickReplies(["Pricing", "Book a shoot", "Our services"]);
  }, 850);
}

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const val = chatInput.value.trim();
  if (!val) return;
  handleChatQuery(val);
  chatInput.value = "";
});
