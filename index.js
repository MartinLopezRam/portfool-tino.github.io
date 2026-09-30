// Tema claro/oscuro (se recuerda en el navegador)
const root = document.documentElement;
try { const saved = localStorage.getItem('theme'); if (saved) root.dataset.theme = saved; } catch (e) {}
document.getElementById('theme').addEventListener('click', () => {
  const dark = root.dataset.theme
    ? root.dataset.theme === 'dark'
    : matchMedia('(prefers-color-scheme: dark)').matches;
  root.dataset.theme = dark ? 'light' : 'dark';
  try { localStorage.setItem('theme', root.dataset.theme); } catch (e) {}
});

// Filtro de proyectos por tecnología
const filters = document.querySelectorAll('.filter');
const cases = document.querySelectorAll('.case');
filters.forEach(btn => btn.addEventListener('click', () => {
  filters.forEach(b => { b.classList.toggle('is-on', b === btn); b.setAttribute('aria-pressed', b === btn); });
  cases.forEach(c => { c.hidden = btn.dataset.filter !== 'all' && c.dataset.stack !== btn.dataset.filter; });
}));

// Ampliar capturas
const box = document.getElementById('lightbox');
const lbImg = document.getElementById('lb-img');
document.querySelectorAll('.zoom').forEach(z => z.addEventListener('click', () => {
  lbImg.src = z.dataset.full; lbImg.alt = z.dataset.alt; box.showModal();
}));
document.getElementById('close').addEventListener('click', () => box.close());
box.addEventListener('click', e => { if (e.target === box) box.close(); });

// Copiar correo
document.getElementById('copy').addEventListener('click', async () => {
  const msg = document.getElementById('copy-msg');
  try { await navigator.clipboard.writeText('martinjlr8@gmail.com'); msg.textContent = '¡Copiado!'; }
  catch (e) { msg.textContent = 'Cópialo a mano: martinjlr8@gmail.com'; }
  setTimeout(() => msg.textContent = '', 2500);
});

// Resalta la sección actual en el menú
const links = document.querySelectorAll('.top nav a');
const io = new IntersectionObserver(entries => entries.forEach(en => {
  if (en.isIntersecting) links.forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + en.target.id));
}), { rootMargin: '-40% 0px -55% 0px' });
document.querySelectorAll('#proyectos,#como-trabajo,#contacto').forEach(s => io.observe(s));
