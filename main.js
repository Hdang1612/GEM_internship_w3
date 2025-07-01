const slider = document.querySelector(".slider");
const dots = document.querySelectorAll(".dot");

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
