const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});

const setObserver = (): void => {
  const hiddenElements = document.querySelectorAll(".animationHidden");

  hiddenElements.forEach((element) => {
    observer.observe(element);
  });
};

setObserver();

document.addEventListener("astro:after-swap", () => {
  setObserver();
});
