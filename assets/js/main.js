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
  document.querySelectorAll("[data-contact-email]").forEach((el) => {
    const email = config.contactEmail || "hello@example.com";
    el.textContent = email;
    if (el.tagName === "A") el.href = `mailto:${email}`;
  });
  document.querySelectorAll("[data-security-email]").forEach((el) => {
    const email = config.securityEmail || config.contactEmail || "security@example.com";
    el.textContent = email;
    if (el.tagName === "A") el.href = `mailto:${email}`;
  });

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
      Aver: "Aver pilot",
      PrePIEP: "PrePIEP parent research",
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
      const recipient = config.contactEmail || "hello@example.com";
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
