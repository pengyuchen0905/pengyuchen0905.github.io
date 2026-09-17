(() => {
  const viewer = document.querySelector('.image-viewer');
  if (!viewer || typeof viewer.showModal !== 'function') return;
  const image = viewer.querySelector('#viewer-image');
  const caption = viewer.querySelector('#viewer-caption');
  const original = viewer.querySelector('#viewer-original');
  let previouslyFocused;
  document.querySelectorAll('[data-view-image]').forEach(link => {
    link.addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      previouslyFocused = link;
      image.src = link.href;
      image.alt = link.dataset.caption;
      caption.textContent = link.dataset.caption;
      original.href = link.href;
      viewer.showModal();
      document.documentElement.classList.add('viewer-open');
    });
  });
  viewer.querySelector('.viewer-close').addEventListener('click', () => viewer.close());
  viewer.addEventListener('click', event => { if (event.target === viewer) viewer.close(); });
  viewer.addEventListener('close', () => {
    document.documentElement.classList.remove('viewer-open');
    previouslyFocused?.focus({preventScroll:true});
  });
})();
