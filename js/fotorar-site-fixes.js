(() => {
  const contactButtons = [
    ...document.querySelectorAll('.button.is-nav[href="#footer"]'),
  ];

  contactButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      const footer = document.querySelector('#footer');

      if (!footer) {
        return;
      }

      event.preventDefault();
      history.pushState(null, '', '#footer');

      const reducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches;
      const alignFooter = (behavior) => {
        footer.scrollIntoView({ behavior, block: 'start' });
      };

      alignFooter(reducedMotion ? 'auto' : 'smooth');

      // Lazy images can change the footer's offset while the page is moving.
      window.setTimeout(() => alignFooter('auto'), 700);
      window.setTimeout(() => alignFooter('auto'), 1500);
      window.setTimeout(() => alignFooter('auto'), 3000);
    });
  });

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
