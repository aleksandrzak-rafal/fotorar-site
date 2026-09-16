(() => {
  const galleryImages = [...document.querySelectorAll(".waves-image-gallery-1")];

  if (!galleryImages.length) {
    return;
  }

  const reveal = (image) => {
    image.classList.add("is-gallery-visible");
  };

  if (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    !("IntersectionObserver" in window)
  ) {
    galleryImages.forEach(reveal);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          reveal(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px 12% 0px", threshold: 0.01 },
  );

  galleryImages.forEach((image) => observer.observe(image));
})();
