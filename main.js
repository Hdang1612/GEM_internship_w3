const slider = document.querySelector(".slider");
const dots = document.querySelectorAll(".dot");
const menuIconBtn = document.querySelector(".header__menu-icon");
const menuContent = document.querySelector(".header__menu-hidden");
const menuCloseBtn = document.querySelector(".header__close-btn");

let currentSlide = 0;
const totalSlides = 3;
function goToSlide(n) {
  currentSlide = n;
  updateSlider();
  resetInterval();
}

function updateSlider() {
  slider.style.transform = `translateX(-${
    (currentSlide / totalSlides) * 100
  }%)`;

  dots.forEach((dot) => dot.classList.remove("slider__dot--active"));
  dots[currentSlide].classList.add("slider__dot--active");
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  updateSlider();
}
let slideInterval = setInterval(nextSlide, 5000);

function resetInterval() {
  clearInterval(slideInterval);
  slideInterval = setInterval(nextSlide, 5000);
}
updateSlider();

//menu
menuIconBtn.addEventListener("click", () => {
  if (menuContent.classList.contains("header__menu-hidden--active")) {
    menuContent.classList.remove("header__menu-hidden--active");
  } else {
    menuContent.classList.add("header__menu-hidden--active");
    document.getElementsByTagName("body")[0].style.overflow = "hidden";
  }
});

menuCloseBtn.addEventListener("click", function () {
  if (menuContent.classList.contains("header__menu-hidden--active")) {
    menuContent.classList.remove("header__menu-hidden--active");
    document.getElementsByTagName("body")[0].style.overflow = "auto";
  } else {
    menuContent.classList.add("header__menu-hidden--active");
  }
});
window.addEventListener("click", function (event) {
  if (
    !menuContent.contains(event.target) &&
    !menuIconBtn.contains(event.target)
  ) {
    menuContent.classList.remove("header__menu-hidden--active");
    document.getElementsByTagName("body")[0].style.overflow = "auto";
  }
});
