let currentImageIndex = 0;
let navDotContainer;

const section = document.querySelector("section");
const carousel = document.querySelector(".container");
const imgArray = Array.from(carousel.querySelectorAll("img"));

const autoSlideToggle = document.getElementById("auto-carousel");
const leftArrowBtn = document.querySelector(".arrow-left");
const rightArrowBtn = document.querySelector(".arrow-right");

const setupNavigationDots = () => {
  navDotContainer = document.createElement("div");
  navDotContainer.classList.add("nav-dots-container");

  for (let i = 0; i < imgArray.length; i++) {
    const navDot = document.createElement("div");
    navDot.classList.add("nav-dot");
    navDot.dataset.index = i;
    navDotContainer.appendChild(navDot);
  }

  section.appendChild(navDotContainer);
  navDotContainer.addEventListener("click", handleNavigationDotLink);
};

const setActiveDot = (index) => {
  const navDots = navDotContainer.querySelectorAll(".nav-dot");
  navDots.forEach((dot) => dot.classList.remove("active"));
  const activeDot = navDots[index];
  if (!activeDot) return;
  activeDot.classList.add("active");
};

const handleNavigationDotLink = (e) => {
  if (!e.target.classList.contains("nav-dot")) return;
  const imgIndex = e.target.dataset.index;
  currentImageIndex = imgIndex;
  scrollToImg(currentImageIndex);
  setActiveDot(currentImageIndex);
};

const scrollToImg = (index) => {
  const containerWidth = carousel.offsetWidth;
  const scrollAmount = containerWidth;
  const newScrollLeft = index * scrollAmount;
  carousel.scrollLeft = newScrollLeft;
};

const updateCarousel = (direction) => {
  // Handle underflow and overflow of image cycle
  if (direction === "right") {
    currentImageIndex = (currentImageIndex + 1) % imgArray.length;
  } else {
    currentImageIndex =
      (currentImageIndex - 1 + imgArray.length) % imgArray.length;
  }
  scrollToImg(currentImageIndex);
  setActiveDot(currentImageIndex);
};

const startAutoSlide = () => {
  const autoSlideInterval = setInterval(() => updateCarousel("right"), 5000);
  autoSlideToggle.dataset.intervalId = autoSlideInterval;
};

const stopAutoSlide = () => {
  clearInterval(autoSlideToggle.dataset.intervalId);
};

rightArrowBtn.addEventListener("click", () => updateCarousel("right"));
leftArrowBtn.addEventListener("click", () => updateCarousel("left"));

autoSlideToggle.addEventListener("change", (e) => {
  e.target.checked ? startAutoSlide() : stopAutoSlide();
});

setupNavigationDots();
setActiveDot(0);
