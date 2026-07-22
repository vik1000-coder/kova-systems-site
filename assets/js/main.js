(() => {
  const config = window.KOVA_CONFIG || {};

  const legalDisplayName = config.entityFormed
    ? (config.legalName || config.companyName || "Kova Systems")
    : (config.companyName || "Kova Systems");

  document.querySelectorAll("[data-company-name]").forEach((el) => {
    el.textContent = config.companyName || "Kova Systems";
  });
  document.querySelectorAll("[data-legal-name]").forEach((el) => {
    el.textContent = legalDisplayName;
  });
  document.querySelectorAll("[data-effective-date]").forEach((el) => {
    el.textContent = config.effectiveDate || "July 21, 2026";
  });
  document.querySelectorAll("[data-current-year]").forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });
  const contactEmail = config.contactEmail || "contact@kovasystemsllc.com";
  document.querySelectorAll("[data-contact-email], [data-security-email]").forEach((el) => {
    el.textContent = contactEmail;
    if (el.tagName === "A") el.href = `mailto:${contactEmail}`;
  });

  const siteUrl = String(config.siteUrl || "https://kovasystemsllc.com").replace(/\/$/, "");
  const fileName = (window.location.pathname.split("/").pop() || "index.html").split("?")[0];
  const canonicalPath = !fileName || fileName === "index.html" ? "/" : `/${fileName}`;
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.rel = "canonical";
    document.head.appendChild(canonical);
  }
  // Keep externally owned product pages (e.g. PrepIEP) if already set.
  if (!canonical.getAttribute("href") || !/^https?:\/\//i.test(canonical.getAttribute("href") || "") || canonical.getAttribute("href").includes("kovasystems")) {
    canonical.href = `${siteUrl}${canonicalPath}`;
  }
  let ogUrl = document.querySelector('meta[property="og:url"]');
  if (!ogUrl) {
    ogUrl = document.createElement("meta");
    ogUrl.setAttribute("property", "og:url");
    document.head.appendChild(ogUrl);
  }
  ogUrl.setAttribute("content", canonical.href);

  const menuButton = document.querySelector("[data-menu-button]");
  const mobileNav = document.querySelector("[data-mobile-nav]");
  if (menuButton && mobileNav) {
    menuButton.addEventListener("click", () => {
      const expanded = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!expanded));
      mobileNav.hidden = expanded;
      document.body.classList.toggle("nav-open", !expanded);
    });
  }

  const contactForm = document.querySelector("[data-contact-form]");
  if (contactForm) {
    const requestedTopic = new URLSearchParams(window.location.search).get("topic");
    const topicSelect = contactForm.querySelector('select[name="topic"]');
    const topicMap = {
      Aver: "Aver",
      PrepIEP: "PrepIEP",
      Security: "Security"
    };
    if (topicSelect && requestedTopic && topicMap[requestedTopic]) {
      topicSelect.value = topicMap[requestedTopic];
    }

    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(contactForm);
      const name = String(data.get("name") || "").trim();
      const email = String(data.get("email") || "").trim();
      const topic = String(data.get("topic") || "General inquiry").trim();
      const message = String(data.get("message") || "").trim();
      const recipient = contactEmail;
      const subject = encodeURIComponent(`[${topic}] Website inquiry from ${name || "visitor"}`);
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nTopic: ${topic}\n\n${message}`
      );
      window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
    });
  }

  const observer = "IntersectionObserver" in window
    ? new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 })
    : null;

  document.querySelectorAll("[data-reveal]").forEach((el) => {
    if (observer) observer.observe(el);
    else el.classList.add("is-visible");
  });
})();
