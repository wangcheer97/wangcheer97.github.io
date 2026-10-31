// Build the side table of contents from the page headings and entries marked with data-toc.
const toc = document.querySelector('.page-toc');
const content = document.querySelector('.page-content');
if (toc && content) {
  const targets = [...content.querySelectorAll('h2, h3, [data-toc]')];
  const list = toc.querySelector('.page-toc-list');
  const slug = (text) => text.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  const links = targets.map((target) => {
    const label = target.dataset.toc || target.textContent.trim();
    if (!target.id) target.id = slug(label) || `section-${targets.indexOf(target) + 1}`;
    const item = document.createElement('li');
    item.className = target.tagName === 'H2' ? 'toc-major' : 'toc-minor';
    const link = document.createElement('a');
    link.href = `#${target.id}`;
    link.textContent = label;
    link.addEventListener('click', (event) => {
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', link.hash);
    });
    item.appendChild(link);
    list.appendChild(item);
    return link;
  });

  if (links.length) {
    toc.hidden = false;
    // Highlight the last section whose top has passed the fixed navbar.
    const markActive = () => {
      let active = 0;
      targets.forEach((target, index) => {
        if (target.getBoundingClientRect().top <= 120) active = index;
      });
      if (window.scrollY > 0 && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) active = targets.length - 1;
      links.forEach((link, index) => link.classList.toggle('active', index === active));
    };
    // Section ids are created here, so jump to a linked section once they exist.
    const linked = location.hash && document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (linked) linked.scrollIntoView({ block: 'start' });
    window.addEventListener('scroll', markActive, { passive: true });
    window.addEventListener('resize', markActive);
    markActive();
  }
}
