const headerComponent = document.querySelector(".header-container");
fetch("/w3_30-6/component/header.html")
  .then((res) => res.text())
  .then((data) => {
    headerComponent.innerHTML = data;
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
      resetInterval();
    }
    function prevSlide() {
      if (currentSlide === 0) currentSlide = 2;
      else {
        currentSlide = (currentSlide - 1) % totalSlides;
      }
      updateSlider();
      resetInterval();
    }
    let slideInterval = setInterval(nextSlide, 5000);

    function resetInterval() {
      clearInterval(slideInterval);
      slideInterval = setInterval(nextSlide, 5000);
    }
    updateSlider();

    //mobile slider behavior
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    slider.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
    });

    slider.addEventListener("touchmove", (e) => {
      if (!isDragging) return;
      currentX = e.touches[0].clientX;
    });

    slider.addEventListener("touchend", () => {
      if (!isDragging) return;
      const diff = startX - currentX;
      if (diff > 50) {
        currentSlide = (currentSlide + 1) % totalSlides;
      } else if (diff < -50) {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      }

      updateSlider();
      resetInterval();
      isDragging = false;
    });

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
    document.querySelector(".next-btn").addEventListener("click", nextSlide);
    document.querySelector(".pre-btn").addEventListener("click", prevSlide);
    dots.forEach((dot, i) => {
      dot.addEventListener("click", () => goToSlide(i));
    });
  });
