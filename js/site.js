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
