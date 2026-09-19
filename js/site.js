const menu = document.getElementById("navbarSupportedContent");
const toggle = document.querySelector(".navbar-toggler");
const sectionLinks = [...document.querySelectorAll("#sideNav .nav-link")];

function closeMenu() {
  if (!menu || !toggle) {
    return;
  }

  menu.classList.remove("show");
  toggle.classList.add("collapsed");
  toggle.setAttribute("aria-expanded", "false");
}

if (menu && toggle) {
  toggle.addEventListener("click", function () {
    const isOpen = menu.classList.toggle("show");
    toggle.classList.toggle("collapsed", !isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  sectionLinks.forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && menu.classList.contains("show")) {
      closeMenu();
      toggle.focus();
    }
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth >= 992) {
      closeMenu();
    }
  });
}

if ("IntersectionObserver" in window) {
  const sections = sectionLinks
    .map(function (link) {
      return document.querySelector(link.getAttribute("href"));
    })
    .filter(Boolean);

  const observer = new IntersectionObserver(function (entries) {
    const visible = entries.find(function (entry) {
      return entry.isIntersecting;
    });

    if (!visible) {
      return;
    }

    sectionLinks.forEach(function (link) {
      const isCurrent = link.getAttribute("href") === `#${visible.target.id}`;
      link.classList.toggle("active", isCurrent);

      if (isCurrent) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }, {
    rootMargin: "-20% 0px -65% 0px",
    threshold: 0
  });

  sections.forEach(function (section) {
    observer.observe(section);
  });
}

const outputFilters = [...document.querySelectorAll(".output-filter")];
const outputEntries = [...document.querySelectorAll(".output-entry")];
const releasePanel = document.querySelector(".release-panel");
const releaseLinks = [...document.querySelectorAll(".release-links a[data-output-type]")];

outputFilters.forEach(function (filter) {
  filter.addEventListener("click", function () {
    const selected = filter.dataset.filter;

    outputFilters.forEach(function (button) {
      const active = button === filter;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });

    outputEntries.forEach(function (entry) {
      const visible = selected === "all" || entry.dataset.outputType.split(" ").includes(selected);
      entry.classList.toggle("is-hidden", !visible);
    });

    if (releasePanel) {
      releasePanel.classList.toggle("is-hidden", selected === "paper");
    }

    releaseLinks.forEach(function (link) {
      const visible = selected === "all" || link.dataset.outputType === selected;
      link.classList.toggle("is-hidden", !visible);
    });
  });
});

if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const revealObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".programme-panel, .project-card, .contribution-item, .output-entry, .release-panel, .background-block, .contact-band")
    .forEach(function (element) {
      element.classList.add("reveal-item");
      revealObserver.observe(element);
    });
}
