/**
 * script.js - Core Portfolio Application Logic
 * Candidate: Menna Allah El-Sayed (Aspiring DevOps Engineer)
 * Features: Bilingual (EN/AR) Engine, Dark/Light Theme Switcher,
 *           Project Modal, Certificate Lightbox Viewer, Active Nav Observer,
 *           Clipboard Toast, Smooth Navigation.
 */

document.addEventListener("DOMContentLoaded", () => {
  // --------------------------------------------------------------------------
  // 1. Initial State & Storage Retrieval
  // --------------------------------------------------------------------------
  const STORAGE_KEYS = {
    THEME: "menna_portfolio_theme",
    LANG: "menna_portfolio_lang"
  };

  // Determine Initial Theme
  const systemPrefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME);
  let currentTheme = savedTheme ? savedTheme : (systemPrefersDark ? "dark" : "light");

  // Determine Initial Language
  const savedLang = localStorage.getItem(STORAGE_KEYS.LANG);
  let currentLang = (savedLang === "ar" || savedLang === "en") ? savedLang : "en";

  // --------------------------------------------------------------------------
  // 2. DOM Elements Selection
  // --------------------------------------------------------------------------
  const htmlRoot = document.documentElement;
  const themeToggleBtn = document.getElementById("theme-toggle-btn");
  const langToggleBtn = document.getElementById("lang-toggle-btn");
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const navLinksContainer = document.getElementById("nav-links");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id]");
  const projectDetailModal = document.getElementById("project-modal");
  const modalCloseBtn = document.getElementById("modal-close-btn");
  const certModal = document.getElementById("cert-modal");
  const certModalCloseBtn = document.getElementById("cert-modal-close-btn");
  const toastContainer = document.getElementById("toast-container");
  const contactForm = document.getElementById("contact-form");

  // --------------------------------------------------------------------------
  // 3. Theme Switching Logic
  // --------------------------------------------------------------------------
  function applyTheme(theme) {
    currentTheme = theme;
    htmlRoot.setAttribute("data-theme", theme);
    localStorage.setItem(STORAGE_KEYS.THEME, theme);

    // Update Theme Meta Color for mobile status bars
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute("content", theme === "dark" ? "#0b0f19" : "#ffffff");
    }

    // Update Theme Button ARIA label
    if (themeToggleBtn) {
      const label = theme === "dark" 
        ? (currentLang === "ar" ? "التبديل إلى الوضع الفاتح" : "Switch to Light Mode")
        : (currentLang === "ar" ? "التبديل إلى الوضع الداكن" : "Switch to Dark Mode");
      themeToggleBtn.setAttribute("aria-label", label);
      themeToggleBtn.setAttribute("title", label);
    }
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const nextTheme = currentTheme === "dark" ? "light" : "dark";
      applyTheme(nextTheme);
    });
  }

  // --------------------------------------------------------------------------
  // 4. Bilingual Engine (English <-> Arabic / LTR <-> RTL)
  // --------------------------------------------------------------------------
  function applyLanguage(lang) {
    currentLang = lang;
    htmlRoot.setAttribute("lang", lang);
    htmlRoot.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
    localStorage.setItem(STORAGE_KEYS.LANG, lang);

    // Update Language Button label
    if (langToggleBtn) {
      const btnTextSpan = langToggleBtn.querySelector(".lang-label");
      if (btnTextSpan) {
        btnTextSpan.textContent = lang === "en" ? "العربية" : "English";
      }
      const ariaLabel = lang === "en" ? "تبديل إلى اللغة العربية" : "Switch to English";
      langToggleBtn.setAttribute("aria-label", ariaLabel);
      langToggleBtn.setAttribute("title", ariaLabel);
    }

    // Refresh Theme Button Label in active language
    applyTheme(currentTheme);

    // Translate all standard text nodes with data-i18n attribute
    const transMap = (typeof translations !== "undefined" && translations[lang]) ? translations[lang] : {};
    
    document.querySelectorAll("[data-i18n]").forEach(elem => {
      const key = elem.getAttribute("data-i18n");
      if (transMap[key]) {
        elem.textContent = transMap[key];
      }
    });

    // Translate placeholders
    document.querySelectorAll("[data-i18n-placeholder]").forEach(elem => {
      const key = elem.getAttribute("data-i18n-placeholder");
      if (transMap[key]) {
        elem.setAttribute("placeholder", transMap[key]);
      }
    });

    // Translate element titles / aria-labels
    document.querySelectorAll("[data-i18n-aria]").forEach(elem => {
      const key = elem.getAttribute("data-i18n-aria");
      if (transMap[key]) {
        elem.setAttribute("aria-label", transMap[key]);
      }
    });
  }

  if (langToggleBtn) {
    langToggleBtn.addEventListener("click", () => {
      const nextLang = currentLang === "en" ? "ar" : "en";
      applyLanguage(nextLang);
    });
  }

  // --------------------------------------------------------------------------
  // 5. Mobile Drawer Navigation
  // --------------------------------------------------------------------------
  if (mobileMenuBtn && navLinksContainer) {
    mobileMenuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = navLinksContainer.classList.toggle("mobile-open");
      mobileMenuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Close mobile menu when a nav link is clicked
    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        navLinksContainer.classList.remove("mobile-open");
        mobileMenuBtn.setAttribute("aria-expanded", "false");
      });
    });

    // Close when clicking outside of nav
    document.addEventListener("click", (e) => {
      if (!navLinksContainer.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        navLinksContainer.classList.remove("mobile-open");
        mobileMenuBtn.setAttribute("aria-expanded", "false");
      }
    });
  }

  // --------------------------------------------------------------------------
  // 6. Scroll Spy & Active Nav Highlight
  // --------------------------------------------------------------------------
  const observerOptions = {
    root: null,
    rootMargin: "-25% 0px -65% 0px",
    threshold: 0
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach(link => {
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(sec => navObserver.observe(sec));

  // --------------------------------------------------------------------------
  // 7. Interactive Project Modal Dialog
  // --------------------------------------------------------------------------
  window.openProjectModal = function(projectId) {
    if (!projectDetailModal || typeof projectDetails === "undefined" || !projectDetails[projectId]) return;

    const data = projectDetails[projectId][currentLang] || projectDetails[projectId]["en"];
    if (!data) return;

    // Populate Modal Content
    const catElem = document.getElementById("modal-project-category");
    const titleElem = document.getElementById("modal-project-title");
    const subElem = document.getElementById("modal-project-subtitle");
    const overviewElem = document.getElementById("modal-project-overview");
    const highlightsList = document.getElementById("modal-project-highlights");
    const techList = document.getElementById("modal-project-tech");
    const repoBtn = document.getElementById("modal-project-repo");

    if (catElem) catElem.textContent = data.category;
    if (titleElem) titleElem.textContent = data.title;
    if (subElem) subElem.textContent = data.subtitle;
    if (overviewElem) overviewElem.textContent = data.overview;

    if (highlightsList) {
      highlightsList.innerHTML = "";
      data.highlights.forEach(h => {
        const li = document.createElement("li");
        li.textContent = h;
        highlightsList.appendChild(li);
      });
    }

    if (techList) {
      techList.innerHTML = "";
      data.technologies.forEach(t => {
        const span = document.createElement("span");
        span.className = "tech-tag";
        span.textContent = t;
        techList.appendChild(span);
      });
    }

    if (repoBtn) {
      repoBtn.href = data.githubUrl || "https://github.com/menahanoon512006-spec";
    }

    // Open Modal
    projectDetailModal.classList.add("active");
    document.body.style.overflow = "hidden";
    if (modalCloseBtn) modalCloseBtn.focus();
  };

  window.closeProjectModal = function() {
    if (!projectDetailModal) return;
    projectDetailModal.classList.remove("active");
    document.body.style.overflow = "";
  };

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", closeProjectModal);
  }

  if (projectDetailModal) {
    projectDetailModal.addEventListener("click", (e) => {
      if (e.target === projectDetailModal) {
        closeProjectModal();
      }
    });
  }

  // --------------------------------------------------------------------------
  // 8. Interactive Certificate Lightbox Modal Viewer
  // --------------------------------------------------------------------------
  window.openCertificateModal = function(certId) {
    if (!certModal || typeof certificatesData === "undefined" || !certificatesData[certId]) return;

    const cert = certificatesData[certId];
    const data = cert[currentLang] || cert["en"];
    if (!data) return;

    const imgElem = document.getElementById("cert-modal-img");
    const titleElem = document.getElementById("cert-modal-title");
    const issuerElem = document.getElementById("cert-modal-issuer");
    const dateElem = document.getElementById("cert-modal-date");
    const badgeElem = document.getElementById("cert-modal-badge");
    const descElem = document.getElementById("cert-modal-desc");
    const openFullBtn = document.getElementById("cert-modal-open-full");

    if (imgElem) {
      imgElem.src = cert.image;
      imgElem.alt = data.title;
    }
    if (titleElem) titleElem.textContent = data.title;
    if (issuerElem) issuerElem.textContent = data.issuer;
    if (dateElem) dateElem.textContent = data.date;
    if (badgeElem) badgeElem.textContent = data.badge;
    if (descElem) descElem.textContent = data.details;
    if (openFullBtn) openFullBtn.href = cert.image;

    certModal.classList.add("active");
    document.body.style.overflow = "hidden";
    if (certModalCloseBtn) certModalCloseBtn.focus();
  };

  window.closeCertificateModal = function() {
    if (!certModal) return;
    certModal.classList.remove("active");
    document.body.style.overflow = "";
  };

  if (certModalCloseBtn) {
    certModalCloseBtn.addEventListener("click", closeCertificateModal);
  }

  if (certModal) {
    certModal.addEventListener("click", (e) => {
      if (e.target === certModal) {
        closeCertificateModal();
      }
    });
  }

  // Close modals on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (certModal && certModal.classList.contains("active")) {
        closeCertificateModal();
      } else if (projectDetailModal && projectDetailModal.classList.contains("active")) {
        closeProjectModal();
      }
    }
  });

  // --------------------------------------------------------------------------
  // 9. Clipboard Copy & Toast Notifications
  // --------------------------------------------------------------------------
  window.showToast = function(message) {
    if (!toastContainer) return;

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `
      <svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      <span>${message}</span>
    `;

    toastContainer.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.add("show");
    });

    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 300);
    }, 3200);
  };

  window.copyToClipboard = function(text, successMsg) {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(successMsg || (currentLang === "ar" ? "تم النسخ بنجاح!" : "Copied to clipboard!"));
      }).catch(() => {
        fallbackCopy(text, successMsg);
      });
    } else {
      fallbackCopy(text, successMsg);
    }
  };

  function fallbackCopy(text, successMsg) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand("copy");
      showToast(successMsg || (currentLang === "ar" ? "تم النسخ بنجاح!" : "Copied to clipboard!"));
    } catch (err) {
      showToast(currentLang === "ar" ? "فشل النسخ التلقائي" : "Could not copy");
    }
    document.body.removeChild(textArea);
  }

  // --------------------------------------------------------------------------
  // 10. Contact Form Submission Handling
  // --------------------------------------------------------------------------
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const origText = submitBtn ? submitBtn.textContent : "";

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = currentLang === "ar" ? "جاري الإرسال..." : "Sending...";
      }

      setTimeout(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = origText;
        }
        contactForm.reset();
        const successMsg = currentLang === "ar"
          ? "شكراً لتواصلك يا باشمهندس! تم إرسال رسالتك بنجاح."
          : "Thank you! Your message has been received.";
        showToast(successMsg);
      }, 900);
    });
  }

  // --------------------------------------------------------------------------
  // 11. Initial Application Execution
  // --------------------------------------------------------------------------
  applyTheme(currentTheme);
  applyLanguage(currentLang);
});
