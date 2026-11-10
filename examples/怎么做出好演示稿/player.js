/* deck-craft · 放映器
   键盘：← → 空格 PageDown 翻页 / Home End 首尾 / F 全屏 / Esc 退出全屏
   点击：右半屏下一页，左半屏上一页
   URL：#3 可直接打开第 3 页 */
(function () {
  const deck = document.getElementById('deck');
  if (!deck) return;
  const slides = [...deck.querySelectorAll('.slide')];
  if (!slides.length) return;

  const count = document.getElementById('count');
  const bar = document.getElementById('progress');
  let i = slides.findIndex(s => s.classList.contains('on'));
  if (i < 0) i = 0;

  function fit() {
    const s = Math.min(window.innerWidth / 1280, window.innerHeight / 720);
    deck.style.transform = 'scale(' + s + ')';
  }

  function show(n) {
    i = Math.max(0, Math.min(slides.length - 1, n));
    slides.forEach((s, k) => s.classList.toggle('on', k === i));
    if (count) count.textContent = (i + 1) + ' / ' + slides.length;
    if (bar) bar.style.width = ((i + 1) / slides.length * 100) + '%';
    try { history.replaceState(null, '', '#' + (i + 1)); } catch (e) {}
  }

  function toggleFull() {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen?.();
    else document.exitFullscreen?.();
  }

  addEventListener('resize', fit);
  addEventListener('keydown', e => {
    if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') { e.preventDefault(); show(i + 1); }
    else if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); show(i - 1); }
    else if (e.key === 'Home') show(0);
    else if (e.key === 'End') show(slides.length - 1);
    else if (e.key === 'f' || e.key === 'F') toggleFull();
    else if (e.key === 'Escape' && document.fullscreenElement) document.exitFullscreen?.();
  });

  const prev = document.getElementById('prev');
  const next = document.getElementById('next');
  const full = document.getElementById('full');
  if (prev) prev.onclick = () => show(i - 1);
  if (next) next.onclick = () => show(i + 1);
  if (full) full.onclick = toggleFull;

  deck.addEventListener('click', e => {
    if (e.target.closest('.hud')) return;
    show(e.clientX > window.innerWidth / 2 ? i + 1 : i - 1);
  });

  const start = parseInt(location.hash.slice(1), 10);
  fit();
  show(Number.isFinite(start) ? start - 1 : i);
})();
