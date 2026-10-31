// Keep the first six complete messages visible as text wraps across screen sizes.
const newsBox = document.querySelector('.news-box');
if (newsBox) {
  const list = newsBox.querySelector('.news-list');
  const sizeNewsBox = () => {
    const items = list.children;
    if (items.length <= 6) return;
    const height = items[5].getBoundingClientRect().bottom - list.getBoundingClientRect().top;
    const style = getComputedStyle(newsBox);
    const padding = parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
    newsBox.style.setProperty('--news-height', `${Math.ceil(height + padding)}px`);
  };
  new ResizeObserver(sizeNewsBox).observe(list);
  document.fonts.ready.then(sizeNewsBox);
  sizeNewsBox();
}
