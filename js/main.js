document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const header = document.querySelector(".site-header");
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");
  const menuOverlay = document.querySelector(".menu-overlay");
  const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll("a") : [];
  const allAnchorLinks = document.querySelectorAll('a[href^="#"]');
  const form = document.getElementById("contact-form");
  const formStatus = document.querySelector(".form-status");
  const yearEl = document.getElementById("year");

  let menuOpen = false;

  const headerOffset = () => (header ? header.offsetHeight + 10 : 80);

  const toggleMenu = (open) => {
    if (!menuToggle || !mobileMenu || !menuOverlay) {
      return;
    }

    menuOpen = open;
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
    mobileMenu.classList.toggle("is-open", open);
    menuOverlay.classList.toggle("is-visible", open);
    mobileMenu.setAttribute("aria-hidden", String(!open));
    menuOverlay.setAttribute("aria-hidden", String(!open));
    body.classList.toggle("menu-open", open);
  };

  const closeMenu = () => toggleMenu(false);

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      toggleMenu(!menuOpen);
    });
  }

  if (menuOverlay) {
    menuOverlay.addEventListener("click", closeMenu);
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuOpen) {
      closeMenu();
      if (menuToggle) {
        menuToggle.focus();
      }
    }
  });

  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  allAnchorLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");
      if (!href || href === "#" || href === "#top") {
        return;
      }

      const target = document.querySelector(href);
      if (!target) {
        return;
      }

      event.preventDefault();
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerOffset();
      window.scrollTo({
        top: Math.max(0, targetPosition),
        behavior: "smooth",
      });
    });
  });

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        if (formStatus) {
          formStatus.textContent = "Please fill out all required fields correctly.";
          formStatus.classList.remove("success");
          formStatus.classList.add("error");
        }
        return;
      }

      if (formStatus) {
        formStatus.textContent = "Thanks! Your estimate request has been received. We will contact you shortly.";
        formStatus.classList.remove("error");
        formStatus.classList.add("success");
      }
      form.reset();
    });
  }

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
});
