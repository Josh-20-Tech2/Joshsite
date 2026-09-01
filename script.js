/* =============================
   Portfolio Website Script
   ============================= */

/* Mark that JS is running — CSS only hides .reveal content when this class exists */
document.documentElement.classList.add("js");

document.addEventListener("DOMContentLoaded", () => {
  /* ---------- Footer Year ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Header scroll style ---------- */
  const header = document.getElementById("header");
  const backToTop = document.getElementById("back-to-top");

  const onScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    if (window.scrollY > 400) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }

    updateActiveNavLink();
  };

  window.addEventListener("scroll", onScroll);

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ---------- Mobile Nav Toggle ---------- */
  const navToggle = document.getElementById("nav-toggle");
  const navLinks = document.getElementById("nav-links");

  navToggle.addEventListener("click", () => {
    navToggle.classList.toggle("open");
    navLinks.classList.toggle("open");
  });

  navLinks.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.classList.remove("open");
      navLinks.classList.remove("open");
    });
  });

  /* ---------- Active nav link on scroll ---------- */
  const sections = document.querySelectorAll("main section[id]");
  const navLinkEls = document.querySelectorAll(".nav-link");

  function updateActiveNavLink() {
    let currentId = sections[0] ? sections[0].id : "";
    const offset = 120;

    sections.forEach((section) => {
      const top = section.offsetTop - offset;
      if (window.scrollY >= top) {
        currentId = section.id;
      }
    });

    navLinkEls.forEach((link) => {
      link.classList.toggle(
        "active-link",
        link.getAttribute("href") === `#${currentId}`
      );
    });
  }

  /* ---------- Scroll Reveal Animation ---------- */
  const revealEls = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealEls.forEach((el) => revealObserver.observe(el));

  /* ---------- Typed Role Text Effect ---------- */
  const roles = [
    "Full-Stack Developer",
    "UI/UX Enthusiast",
    "Open Source Contributor",
    "Problem Solver",
  ];
  const typedEl = document.getElementById("typed-text");
  let roleIndex = 0;
  let charIndex = roles[0].length;
  let deleting = false;

  function typeLoop() {
    if (!typedEl) return;
    const currentRole = roles[roleIndex];

    if (!deleting) {
      charIndex++;
      if (charIndex > currentRole.length) {
        deleting = true;
        setTimeout(typeLoop, 1800);
        return;
      }
    } else {
      charIndex--;
      if (charIndex < 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        charIndex = 0;
      }
    }

    typedEl.textContent = roles[roleIndex].substring(0, charIndex);
    setTimeout(typeLoop, deleting ? 45 : 90);
  }

  setTimeout(typeLoop, 2200);

  /* ---------- Animated Counters ---------- */
  const statNumbers = document.querySelectorAll(".stat-number");

  const countObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          countObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );

  statNumbers.forEach((el) => countObserver.observe(el));

  function animateCount(el) {
    const target = parseInt(el.getAttribute("data-count"), 10) || 0;
    const duration = 1200;
    const startTime = performance.now();

    function step(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const value = Math.floor(progress * target);
      el.textContent = value + (progress >= 1 && target >= 20 ? "+" : "");
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target + (target >= 20 ? "+" : "");
      }
    }

    requestAnimationFrame(step);
  }

  /* ---------- Contact Form Validation ---------- */
  const form = document.getElementById("contact-form");
  const successMsg = document.getElementById("form-success");

  function setError(fieldId, message) {
    const errorEl = document.querySelector(`.error-message[data-for="${fieldId}"]`);
    const inputEl = document.getElementById(fieldId);
    if (errorEl) errorEl.textContent = message;
    if (inputEl) inputEl.classList.toggle("invalid", Boolean(message));
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  if (form) {
    const errorMsg = document.getElementById("form-error");
    const submitBtn = form.querySelector(".form-submit");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      successMsg.classList.remove("show");

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const subject = document.getElementById("subject").value.trim();
      const message = document.getElementById("message").value.trim();

      let isValid = true;

      if (!name) {
        setError("name", "Please enter your name.");
        isValid = false;
      } else {
        setError("name", "");
      }

      if (!email) {
        setError("email", "Please enter your email.");
        isValid = false;
      } else if (!isValidEmail(email)) {
        setError("email", "Please enter a valid email address.");
        isValid = false;
      } else {
        setError("email", "");
      }

      if (!subject) {
        setError("subject", "Please enter a subject.");
        isValid = false;
      } else {
        setError("subject", "");
      }

      if (!message) {
        setError("message", "Please enter a message.");
        isValid = false;
      } else if (message.length < 10) {
        setError("message", "Message should be at least 10 characters.");
        isValid = false;
      } else {
        setError("message", "");
      }

      if (!isValid) return;

      /* ---------- Send to Formspree ---------- */
      const originalBtnText = submitBtn ? submitBtn.textContent : "";
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending...";
      }

      try {
        const response = await fetch(form.action, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" },
        });

        if (response.ok) {
          successMsg.classList.add("show");
          form.reset();

          setTimeout(() => {
            successMsg.classList.remove("show");
          }, 5000);
        } else {
          const data = await response.json().catch(() => null);
          const detail =
            data && data.errors
              ? data.errors.map((err) => err.message).join(", ")
              : data && data.error
                ? data.error
                : "";

          console.error("Formspree submission failed:", response.status, data);

          if (errorMsg) {
            errorMsg.textContent =
              detail ||
              `Oops! Something went wrong (error ${response.status}). Please try again.`;
            errorMsg.classList.add("show");
          }
        }
      } catch (err) {
        console.error("Formspree network error:", err);
        if (errorMsg) {
          errorMsg.textContent =
            "Network error — please check your connection and try again.";
          errorMsg.classList.add("show");
        }
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalBtnText;
        }
      }
    });
  }

  /* ---------- Initial UI state (must run AFTER all declarations above) ---------- */
  onScroll();
});
