'use strict';
(function () {
  const menuButton = document.querySelector('#menuButton');
  const nav = document.querySelector('#siteNav');
  if (menuButton && nav) {
    function closeMenu() { nav.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false'); }
    menuButton.addEventListener('click', () => { const open = nav.classList.toggle('open'); menuButton.setAttribute('aria-expanded', String(open)); });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
    document.addEventListener('click', e => { if (!nav.contains(e.target) && !menuButton.contains(e.target)) closeMenu(); });
  }
  const buttons = document.querySelectorAll('.pub-filter');
  const pubs = document.querySelectorAll('.pub-item');
  const count = document.querySelector('#publicationCount');
  buttons.forEach(button => button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    buttons.forEach(b => { b.classList.toggle('active', b === button); b.setAttribute('aria-pressed', String(b === button)); });
    let visible = 0;
    pubs.forEach(pub => { const show = filter === 'all' || pub.dataset.topic.split(' ').includes(filter); pub.hidden = !show; if (show) visible++; });
    if (count) count.textContent = String(visible);
  }));
  const dialog = document.querySelector('#videoDialog');
  const player = document.querySelector('#demoPlayer');
  const dialogTitle = document.querySelector('#videoDialogTitle');
  const close = document.querySelector('#videoClose');
  if (dialog && player && dialogTitle && close) {
    const closeVideo = () => { player.pause(); player.removeAttribute('src'); player.load(); if (dialog.open) dialog.close(); };
    document.querySelectorAll('[data-video]').forEach(button => button.addEventListener('click', () => {
      dialogTitle.textContent = button.dataset.title || 'CogAD demonstration';
      player.src = button.dataset.video;
      dialog.showModal();
      player.play().catch(() => {});
    }));
    close.addEventListener('click', closeVideo);
    dialog.addEventListener('close', () => { player.pause(); player.removeAttribute('src'); player.load(); });
    dialog.addEventListener('click', e => { if (e.target === dialog) closeVideo(); });
  }
  const year = document.querySelector('#year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
