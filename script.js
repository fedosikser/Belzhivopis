const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".site-menu");
const menuLinks = document.querySelectorAll(".site-menu a");
const revealItems = document.querySelectorAll(".reveal");

const syncHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 20);
};

const closeMenu = () => {
  menu?.classList.remove("is-open");
  menu?.setAttribute("aria-hidden", "true");
  menuToggle?.setAttribute("aria-expanded", "false");
  document.body.classList.remove("menu-open");
};

menuToggle?.addEventListener("click", () => {
  const open = menu?.classList.toggle("is-open");
  menu?.setAttribute("aria-hidden", String(!open));
  menuToggle.setAttribute("aria-expanded", String(open));
  document.body.classList.toggle("menu-open", open);
});

menuLinks.forEach((link) => link.addEventListener("click", closeMenu));

window.addEventListener("scroll", syncHeader, { passive: true });
syncHeader();

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.12 },
);

revealItems.forEach((item) => revealObserver.observe(item));
