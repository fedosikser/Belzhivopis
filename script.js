const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".site-menu");
const menuLinks = document.querySelectorAll(".site-menu a");
const revealItems = document.querySelectorAll(".reveal");

const showcaseImage = document.querySelector("#showcase-image");
const showcaseTitle = document.querySelector("#showcase-title");
const showcaseText = document.querySelector("#showcase-text");
const showcaseTabs = document.querySelectorAll(".showcase-tab");

const showcaseMap = {
  "Билеты": {
    title: "Входной билет как продолжение айдентики",
    text:
      "Билет не выглядит утилитарным элементом. Он работает как полноценный артефакт выставки: с крупной типографикой, штрихкодом, цветовым кодом и портретной графикой.",
  },
  "Плакаты": {
    title: "Плакаты художников как модульная серия",
    text:
      "Система легко подстраивается под разных авторов. Портрет, текстовые блоки, цветовые полосы и даты собираются в единый плакатный язык.",
  },
  "Навигация": {
    title: "Навигация делает пространство частью истории",
    text:
      "Даже указатель поддерживает бренд: знак становится ориентиром, а цветовые точки и жёсткая геометрия помогают сохранить узнаваемость вне печатных носителей.",
  },
  "Мерч": {
    title: "Мерч переносит выставку в повседневность",
    text:
      "Шопер и другие носители работают как мобильная афиша. Орнамент и крупная графика связывают проект с белорусским культурным кодом.",
  },
};

const syncHeader = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 20);
};

const closeMenu = () => {
  menu.classList.remove("is-open");
  menu.setAttribute("aria-hidden", "true");
  menuToggle.setAttribute("aria-expanded", "false");
  document.body.classList.remove("menu-open");
};

menuToggle?.addEventListener("click", () => {
  const open = menu.classList.toggle("is-open");
  menu.setAttribute("aria-hidden", String(!open));
  menuToggle.setAttribute("aria-expanded", String(open));
  document.body.classList.toggle("menu-open", open);
});

menuLinks.forEach((link) => link.addEventListener("click", closeMenu));

window.addEventListener("scroll", syncHeader, { passive: true });
syncHeader();

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
  },
);

revealItems.forEach((item) => revealObserver.observe(item));

showcaseTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    showcaseTabs.forEach((button) => button.classList.remove("is-active"));
    tab.classList.add("is-active");

    const label = tab.textContent.trim();
    const copy = showcaseMap[label];
    const image = tab.dataset.image;
    const alt = tab.dataset.alt;

    showcaseImage.src = image;
    showcaseImage.alt = alt;
    showcaseTitle.textContent = copy.title;
    showcaseText.textContent = copy.text;
  });
});
