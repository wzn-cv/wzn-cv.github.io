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
  const galleryToggle = document.querySelector('#cogadGalleryToggle');
  const gallery = document.querySelector('#cogad-demos');
  if (galleryToggle && gallery) {
    galleryToggle.addEventListener('click', () => {
      const expanded = galleryToggle.getAttribute('aria-expanded') === 'true';
      gallery.hidden = expanded;
      galleryToggle.setAttribute('aria-expanded', String(!expanded));
      const arrow = galleryToggle.querySelector('span');
      if (arrow) arrow.textContent = expanded ? '↓' : '↑';
      if (!expanded) gallery.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }
  const dialog = document.querySelector('#videoDialog');
  const player = document.querySelector('#demoPlayer');
  const dialogTitle = document.querySelector('#videoDialogTitle');
  const close = document.querySelector('#videoClose');
  if (dialog && player && dialogTitle && close) {
    const status = document.querySelector('#videoStatus');
    const resetPlayer = () => {
      player.pause();
      player.removeAttribute('src');
      player.load();
      player.hidden = false;
      if (status) status.textContent = '';
    };
    const closeVideo = () => { if (dialog.open) dialog.close(); };
    document.querySelectorAll('[data-video]').forEach(button => button.addEventListener('click', async () => {
      resetPlayer();
      const filename = button.dataset.video;
      dialogTitle.textContent = button.dataset.title || 'CogAD demonstration';
      if (status) status.textContent = 'Checking video availability…';
      dialog.showModal();
      const missingMessage = 'This video has not been uploaded to the GitHub repository yet. Upload the new MP4 files into the videos/ folder to enable playback.';
      try {
        const response = await fetch(filename, { method: 'HEAD', cache: 'no-store' });
        if (!response.ok) {
          player.hidden = true;
          if (status) status.textContent = missingMessage;
          return;
        }
      } catch (_) {
        // The file might be opened locally; the player will report any playback error.
      }
      if (!dialog.open) return;
      player.src = filename;
      player.load();
      if (status) status.textContent = '';
      player.play().catch(() => {
        if (dialog.open && status && player.error) status.textContent = 'Unable to play this file. Please check that the MP4 was uploaded correctly and uses H.264 video.';
      });
    }));
    player.addEventListener('error', () => {
      if (status) status.textContent = 'Unable to load this video. Confirm that its MP4 file exists in the videos/ directory on GitHub.';
    });
    close.addEventListener('click', closeVideo);
    dialog.addEventListener('close', resetPlayer);
    dialog.addEventListener('click', e => { if (e.target === dialog) closeVideo(); });
  }
  const year = document.querySelector('#year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
