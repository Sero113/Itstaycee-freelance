const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");
const mobileMenuBreakpoint = window.matchMedia("(max-width: 768px)");

let navBackdrop = null;
let mobileNavDrawer = null;

function isMobileMenuView() {
  return mobileMenuBreakpoint.matches;
}

function closeMenu() {
  if (!hamburger) {
    return;
  }

  hamburger.classList.remove("active");
  hamburger.setAttribute("aria-expanded", "false");
  document.body.classList.remove("menu-open");

  if (mobileNavDrawer) {
    mobileNavDrawer.classList.remove("active");
    mobileNavDrawer.setAttribute("aria-hidden", "true");
  }

  if (navBackdrop) {
    navBackdrop.classList.remove("active");
  }
}

function mobileMenu() {
  if (!hamburger || !mobileNavDrawer || !isMobileMenuView()) {
    return;
  }

  const isOpen = !mobileNavDrawer.classList.contains("active");

  hamburger.classList.toggle("active", isOpen);
  hamburger.setAttribute("aria-expanded", String(isOpen));
  document.body.classList.toggle("menu-open", isOpen);
  mobileNavDrawer.classList.toggle("active", isOpen);
  mobileNavDrawer.setAttribute("aria-hidden", String(!isOpen));

  if (navBackdrop) {
    navBackdrop.classList.toggle("active", isOpen);
  }
}

function buildMobileMenuDrawer() {
  if (!navMenu || mobileNavDrawer) {
    return;
  }

  const drawerLinks = Array.from(navMenu.querySelectorAll(".nav-link"))
    .map((link) => {
      const href = link.getAttribute("href") || "#";
      const label = link.textContent.trim();
      const target = link.getAttribute("target");
      const rel = link.getAttribute("rel");

      return `<li><a class="mobile-nav-link" href="${href}"${target ? ` target="${target}"` : ""}${rel ? ` rel="${rel}"` : ""}>${label}</a></li>`;
    })
    .join("");

  mobileNavDrawer = document.createElement("aside");
  mobileNavDrawer.className = "mobile-nav-drawer";
  mobileNavDrawer.setAttribute("aria-hidden", "true");
  mobileNavDrawer.innerHTML = `
    <div class="mobile-nav-drawer-inner">
      <p class="mobile-nav-kicker">Menu</p>
      <nav class="mobile-nav-links" aria-label="Mobile navigation">
        <ul>${drawerLinks}</ul>
      </nav>
      <div class="mobile-nav-footer">
        <div class="mobile-nav-section">
          <p class="mobile-nav-label">Let's Talk</p>
          <a class="mobile-nav-email" href="mailto:Itstaycee@protonmail.com">Itstaycee@protonmail.com</a>
        </div>
        <div class="mobile-nav-section">
          <p class="mobile-nav-label">Socials</p>
          <div class="mobile-nav-social-links">
            <a href="https://www.instagram.com/itstaycee/?hl=en" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://www.tiktok.com/@tayycee__?lang=en" target="_blank" rel="noopener noreferrer">TikTok</a>
          </div>
        </div>
      </div>
    </div>
  `;

  mobileNavDrawer.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  document.body.appendChild(mobileNavDrawer);
}

function ensureMobileMenuBackdrop() {
  if (navBackdrop) {
    return;
  }

  navBackdrop = document.createElement("button");
  navBackdrop.type = "button";
  navBackdrop.className = "nav-backdrop";
  navBackdrop.setAttribute("aria-label", "Close menu");
  navBackdrop.addEventListener("click", closeMenu);
  document.body.appendChild(navBackdrop);
}

if (hamburger && navMenu) {
  hamburger.setAttribute("aria-expanded", "false");
  hamburger.setAttribute("aria-controls", "site-mobile-drawer");

  buildMobileMenuDrawer();
  ensureMobileMenuBackdrop();

  if (mobileNavDrawer) {
    mobileNavDrawer.id = "site-mobile-drawer";
  }

  hamburger.addEventListener("click", mobileMenu);
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    closeMenu();
  });
});

mobileMenuBreakpoint.addEventListener("change", (event) => {
  if (!event.matches) {
    closeMenu();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;

  let clock = navbar.querySelector(".nav-clock");
  if (!clock) {
    clock = document.createElement("span");
    clock.className = "nav-clock";
    clock.setAttribute("aria-live", "polite");
    navbar.appendChild(clock);
  }

  const updateClock = () => {
    const now = new Date();
    const time = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    });
    if (clock) {
      clock.textContent = time;
    }
  };

  updateClock();
  setInterval(updateClock, 1000);
});

document.addEventListener('DOMContentLoaded', function () {
  const sections = document.querySelectorAll('.fade-in-section');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, { threshold: 0.1 });

  sections.forEach(section => {
    observer.observe(section);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const videos = document.querySelectorAll("video[autoplay], .autoplay-video, .homevid, .preloader-video");
  const tryPlay = (video) => {
    video.muted = true;
    video.defaultMuted = true;
    video.autoplay = true;
    video.loop = true;
    video.playsInline = true;
    video.controls = false;
    video.setAttribute("muted", "");
    video.setAttribute("autoplay", "");
    video.setAttribute("loop", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");
    video.setAttribute("preload", "auto");
    video.setAttribute("disablepictureinpicture", "");
    video.setAttribute("controlslist", "nodownload nofullscreen noremoteplayback");
    video.setAttribute("x-webkit-airplay", "deny");
    video.removeAttribute("controls");

    const playPromise = video.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => {});
    }
  };

  videos.forEach((video) => {
    tryPlay(video);
    video.addEventListener("loadedmetadata", () => tryPlay(video), { once: true });
    video.addEventListener("canplay", () => tryPlay(video), { once: true });
  });

  const kickstartPlayback = () => videos.forEach((video) => tryPlay(video));
  window.addEventListener("pageshow", kickstartPlayback);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      kickstartPlayback();
    }
  });
  document.addEventListener("touchstart", kickstartPlayback, { once: true, passive: true });
  document.addEventListener("click", kickstartPlayback, { once: true });
});

// Smooth scrolling for anchor links
document.querySelectorAll('.mini-nav a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    document.querySelector(targetId).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
});

window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.mini-nav a');

  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
      const id = section.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const section = document.querySelector(".mainwrapper-2");
  const miniNav = document.querySelector(".mini-nav");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          miniNav.classList.add("active");
        } else {
          miniNav.classList.remove("active");
        }
      });
    },
    {
      root: null,
      threshold: 0.2,
    }
  );

  observer.observe(section);
});

document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll('.uxui-work');
  const miniNav = document.querySelector('.mini-nav');

  if (sections && miniNav) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            miniNav.classList.add('active');
          } else {
            miniNav.classList.remove('active');
          }
        });
      },
      {
        root: null,
        threshold: 0.0010,
      }
    );

    sections.forEach((section) => observer.observe(section));
  } else {
    console.error("Unable to find the specified sections or mini-nav in the DOM.");
  }
});

window.addEventListener("load", function () {
  const preloader = document.getElementById("preloader");
  if (!preloader) {
    return;
  }

  setTimeout(() => {
    preloader.style.opacity = "0";
    preloader.style.pointerEvents = "none";
  }, 2000);

  setTimeout(() => {
    preloader.style.display = "none";
  }, 2200);
});

document.addEventListener("DOMContentLoaded", function () {
  const elements = document.querySelectorAll(".fade-in-element");
  elements.forEach((element, index) => {
    setTimeout(() => {
      element.classList.add("visible");
    }, index * 3000);
  });
});

document.addEventListener("scroll", function () {
  const backButton = document.querySelector(".back-button");
  if (!backButton) {
    return;
  }
  if (window.scrollY > 0) {
    backButton.classList.add("active");
  } else {
    backButton.classList.remove("active");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const currentLocation = window.location.pathname.split("/").pop();
  const navLinks = document.querySelectorAll(".nav-link");
  const isProjectDetailPage = document.body.classList.contains("project-page");
  let isActive = false;

  navLinks.forEach(link => {
    const linkPath = link.getAttribute("href").split("/").pop();

    if (currentLocation === linkPath || (isProjectDetailPage && linkPath === "index.html")) {
      link.classList.add("active");
      isActive = true;
    } else {
      link.classList.remove("active");
    }
  });

  if (!isActive) {
    navLinks.forEach(link => link.classList.remove("active"));
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".project-tab");
  const panels = document.querySelectorAll(".project-panel");
  const introTitle = document.getElementById("projects-intro-title");
  const introCopy = document.getElementById("projects-intro-copy");

  if (!tabs.length || !panels.length) {
    return;
  }

  const updateIntro = (tab) => {
    if (introTitle && tab.dataset.introTitle) {
      introTitle.textContent = tab.dataset.introTitle;
    }

    if (introCopy && tab.dataset.introCopy) {
      introCopy.textContent = tab.dataset.introCopy;
    }
  };

  const activeTab = document.querySelector(".project-tab.active");
  if (activeTab) {
    updateIntro(activeTab);
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const targetId = tab.getAttribute("data-tab-target");

      tabs.forEach((item) => {
        item.classList.remove("active");
        item.setAttribute("aria-selected", "false");
      });

      panels.forEach((panel) => {
        panel.classList.remove("active");
        panel.hidden = true;
      });

      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");
      updateIntro(tab);

      const activePanel = document.getElementById(targetId);
      if (activePanel) {
        activePanel.hidden = false;
        activePanel.classList.add("active");
      }
    });
  });
});

// Contact Modal Functionality
document.addEventListener("DOMContentLoaded", () => {
  const openBtn = document.getElementById("openModal");
  const modal = document.querySelector(".contact-modal");
  const closeBtn = document.querySelector(".close-modal");

  if (!openBtn || !modal || !closeBtn) {
    return;
  }

  openBtn.addEventListener("click", () => {
    modal.classList.add("active");
  });

  closeBtn.addEventListener("click", () => {
    modal.classList.remove("active");
  });

  modal.addEventListener("click", (e) => {
    // Close when clicking outside modal content
    if (e.target === modal) {
      modal.classList.remove("active");
    }
  });
});
