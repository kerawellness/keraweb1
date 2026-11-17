(function () {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealEls = document.querySelectorAll("[data-reveal]");
  const nav = document.querySelector("nav");

  if (prefersReduced) {
    revealEls.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const delay = Number(el.dataset.revealDelay || 0);
        if (delay > 0) {
          setTimeout(() => el.classList.add("is-visible"), delay);
        } else {
          el.classList.add("is-visible");
        }
        revealObserver.unobserve(el);
      });
    },
    { threshold: 0.02, rootMargin: "0px 0px 80px 0px" }
  );

  revealEls.forEach((el) => revealObserver.observe(el));

  const onScroll = () => {
    nav?.classList.toggle("nav-scrolled", window.scrollY > 120);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();
