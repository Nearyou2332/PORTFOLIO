const burger = document.querySelector(".burger");
const menu = document.querySelector(".header__menu");
const body = document.body;
const menuLinks = document.querySelectorAll(".menu__link");

function toggleMenu() {
  const isExpanded = burger.getAttribute("aria-expanded") === "true";
  burger.setAttribute("aria-expanded", !isExpanded);
  // остальная логика
}

// Функция открытия/закрытия меню
function toggleMenu() {
  burger.classList.toggle("active");
  menu.classList.toggle("active");
  body.classList.toggle("menu-open");
}

// Функция закрытия меню
function closeMenu() {
  burger.classList.remove("active");
  menu.classList.remove("active");
  body.classList.remove("menu-open");
}

// Открытие/закрытие по клику на бургер
burger.addEventListener("click", (e) => {
  e.stopPropagation(); // Предотвращаем всплытие события
  toggleMenu();
});

// Закрытие по клику вне меню и бургера
document.addEventListener("click", (e) => {
  const isMobile = window.innerWidth <= 670;
  const isMenuOpen = menu.classList.contains("active");

  // Проверяем, открыто ли мобильное меню и кликнули ли вне меню и вне бургера
  if (isMobile && isMenuOpen) {
    if (!menu.contains(e.target) && !burger.contains(e.target)) {
      closeMenu();
    }
  }
});

// Закрытие по клику на ссылки в меню
menuLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    if (window.innerWidth <= 670 && menu.classList.contains("active")) {
      e.preventDefault();

      const targetId = link.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        closeMenu();

        setTimeout(() => {
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 300);
      }
    }
  });
});

// Закрытие по нажатию на Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && menu.classList.contains("active")) {
    closeMenu();
  }
});

// Закрытие при изменении размера окна
window.addEventListener("resize", () => {
  if (window.innerWidth > 670 && menu.classList.contains("active")) {
    closeMenu();
  }
});

// Плавный скролл для десктопа
menuLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    if (window.innerWidth > 670) {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  });
});

// Предотвращаем всплытие кликов внутри меню
menu.addEventListener("click", (e) => {
  e.stopPropagation();
});
