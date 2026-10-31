// Show the full name when it fits on one line, otherwise fall back to the data-short version.
const fitItems = [...document.querySelectorAll('[data-short]')].map((element) => ({ element, full: element.textContent }));
if (fitItems.length) {
  const fitText = () => {
    fitItems.forEach(({ element, full }) => {
      element.textContent = full;
      const lineHeight = parseFloat(getComputedStyle(element).lineHeight);
      if (element.getBoundingClientRect().height > lineHeight * 1.5) element.textContent = element.dataset.short;
    });
  };
  new ResizeObserver(fitText).observe(document.querySelector('.page-content') || document.body);
  document.fonts.ready.then(fitText);
}
