// Minimal interactivity for the Hebrew site
(function () {
  // Smooth scroll for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  function smoothScroll(targetId) {
    const el = document.querySelector(targetId);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  
  anchorLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        smoothScroll(href);
      }
    });
  });

  // Calendly is now integrated via embed widget
  // No form submission handler needed
})();
